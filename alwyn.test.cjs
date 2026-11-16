const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const app = fs.readFileSync(require.resolve('./app.js'), 'utf8');

function openApp(saved = null, random = Math.random) {
  const elements = new Map();
  const events = new Map();
  const storage = new Map(saved ? [['arcanum_dw2_v3_v1', JSON.stringify(saved)]] : []);
  const document = {
    body: {style: {}},
    documentElement: {dataset: {}},
    getElementById(id) {
      if (id.startsWith('drive-')) return null;
      if (!elements.has(id)) elements.set(id, {
        dataset: {}, classList: {add() {}, remove() {}}, addEventListener() {},
      });
      return elements.get(id);
    },
    addEventListener(name, listener) { events.set(name, listener); },
    querySelector: () => null,
    querySelectorAll: () => [],
  };
  const window = {addEventListener() {}, scrollTo() {}};
  const context = {
    document, window, navigator: {}, structuredClone, Math: Object.assign(Object.create(Math), {random}),
    localStorage: {getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value)},
    FormData: class { constructor(node) { return new Map(Object.entries(node.fields)); } },
    setTimeout: () => 1, clearTimeout() {}, confirm: () => true,
  };
  vm.runInNewContext(app.replace(/\}\)\(\);\s*$/, 'window.test = {fresh, normalizeImported}; })();'), context);
  return {
    ...window.test,
    state: () => JSON.parse(storage.get('arcanum_dw2_v3_v1')),
    screen: () => document.getElementById('screen').innerHTML,
    element: id => document.getElementById(id),
    click(action, extra = {}) {
      events.get('click')({preventDefault() {}, target: {closest: () => ({dataset: {action, ...extra}})}});
    },
    submit(id, fields, dataset = {}) {
      events.get('submit')({preventDefault() {}, target: {id, fields, dataset}});
    },
  };
}

const item = (id, name) => ({id, name, quantity: 1, details: '', location: ''});

test('consolidates sheets without losing the Prodigy or either imported age sheet', () => {
  const seed = openApp();
  const kid = seed.fresh('Alwyn (Kid)');
  const noble = seed.fresh('Noble draft');
  const sage = seed.fresh('Sage draft');
  kid.hp = 3;
  kid.spells[0].name = 'Existing spell';
  kid.inventory = [item('same', 'Lantern')];
  noble.spells[0].name = 'Noble spell';
  noble.inventory = [item('same', 'Lantern'), item('noble', 'Compass')];
  sage.spells[0].name = 'Sage spell';
  sage.inventory = [item('same', 'Map')];
  const app = openApp({characters: [kid, noble, sage], activeId: kid.id});
  app.click('alwyn-edit');
  app.submit('alwyn-form', {'sheet-noble': noble.id, 'sheet-sage': sage.id, overview: 'A shared history'});

  const [profile] = app.state().characters;
  assert.equal(app.state().characters.length, 1);
  assert.equal(profile.id, kid.id);
  assert.equal(profile.hp, 3);
  assert.equal(profile.spells[0].name, 'Existing spell');
  assert.equal(profile.alwyn.forms.noble.spells[0].name, 'Noble spell');
  assert.equal(profile.alwyn.forms.sage.spells[0].name, 'Sage spell');
  assert.deepEqual(profile.inventory.map(record => record.name), ['Lantern', 'Compass', 'Map']);
  assert.match(app.screen(), /A shared history/);
});

test('switching ages shares inventory and wounds while preserving separate builds and notes', () => {
  const seed = openApp();
  const kid = seed.fresh('Alwyn (Kid)');
  const app = openApp({characters: [kid], activeId: kid.id});
  app.submit('alwyn-form', {noble: 'Diplomatic', sage: 'Patient'});
  app.click('alwyn-age', {age: 'noble'});
  assert.match(app.screen(), /Diplomatic/);
  app.click('hp', {delta: '-1'});
  app.click('stat', {stat: 'CHA', delta: '1'});
  app.click('stat', {stat: 'INT', delta: '-1'});
  app.submit('character-record-form', {...item('', 'Travel cloak'), quantity: '1'}, {key: 'inventory'});
  app.click('alwyn-age', {age: 'sage'});
  assert.match(app.screen(), /Patient/);
  assert.match(app.screen(), /Travel cloak/);
  const profile = app.state().characters[0];
  assert.equal(profile.hp, kid.hp - 1);
  assert.equal(profile.stats.CHA, kid.stats.CHA);
  assert.equal(profile.stats.INT, kid.stats.INT - 1);
  assert.equal(profile.alwyn.forms.noble.stats.CHA, 2);
  assert.equal(profile.alwyn.forms.sage.stats.CHA, 0);
  assert.deepEqual(profile.alwyn.forms.sage.prepared, ['Illusion', 'Divination', 'Abjuration']);

  const restored = app.normalizeImported(profile);
  assert.notEqual(restored.id, profile.id);
  assert.equal(restored.alwyn.personality.noble, 'Diplomatic');
  assert.equal(restored.alwyn.forms.noble.stats.CHA, 2);
  assert.equal(restored.inventory[0].name, 'Travel cloak');
});

test('the overview and every age read the same campaign journal', () => {
  const kid = openApp().fresh('Alwyn (Kid)');
  kid.journalEntries = [{id: 'old', name: 'First session', date: '', details: 'An existing entry'}];
  const app = openApp({characters: [kid], activeId: kid.id});
  app.submit('alwyn-form', {});
  assert.match(app.screen(), /Shared campaign journal.*First session/s);
  app.submit('character-record-form', {name: 'The royal library', date: '', details: 'We met the archivist.'}, {key: 'journalEntries'});
  app.click('alwyn-age', {age: 'sage'});
  app.click('nav', {screen: 'notes'});
  assert.match(app.screen(), /Shared campaign journal.*The royal library/s);
  assert.equal(app.state().characters[0].journalEntries.length, 2);
});

test('spell cards prefill MAG and use the active character’s casting penalty', () => {
  const kid = openApp().fresh('Alwyn (Kid)');
  const spell = kid.spells.find(entry => entry.name === 'Brief Invisibility');
  const app = openApp({characters: [kid], activeId: kid.id}, () => 0.5);
  app.click('nav', {screen: 'magic'});
  assert.match(app.screen(), /aria-label="Cast Brief Invisibility"/);
  app.click('spell-cast', {id: spell.id});
  assert.match(app.element('modal-content').innerHTML, /name="mag" value="0"/);
  assert.match(app.element('modal-content').innerHTML, /Normal cast/);

  app.submit('spell-cast-form', {mag: '2', extra: 'normal'}, {id: spell.id});
  assert.match(app.element('cast-summary').innerHTML, /Disadvantage cast/);
  assert.match(app.element('cast-result').innerHTML, /Discarded die/);
  app.submit('spell-cast-form', {mag: '3', extra: 'normal'}, {id: spell.id});
  assert.equal(app.element('cast-roll').disabled, true);
  assert.equal(app.element('cast-result').hidden, true);
  app.submit('spell-cast-form', {mag: '', extra: 'normal'}, {id: spell.id});
  assert.match(app.element('cast-summary').innerHTML, /Enter the MAG/);

  app.click('condition', {condition: 'Angry', state: 'marked'});
  app.submit('spell-cast-form', {mag: '0', extra: 'normal'}, {id: spell.id});
  assert.match(app.element('cast-summary').innerHTML, /Disadvantage cast.*Angry/s);
  app.submit('spell-cast-form', {mag: '0', extra: 'advantage'}, {id: spell.id});
  assert.match(app.element('cast-summary').innerHTML, /Normal cast/);
});

test('quick dice rolls independently of the saved morning d3', () => {
  const kid = openApp().fresh('Alwyn (Kid)');
  const app = openApp({characters: [kid], activeId: kid.id}, () => 0.76);
  app.submit('alwyn-form', {});
  app.click('morning-roll');
  assert.match(app.screen(), /3 · The Sage.*Play as the sage/s);
  const state = app.state();
  const restored = openApp(state);
  assert.match(restored.screen(), /3 · The Sage.*Play as the sage/s);
  assert.equal(restored.normalizeImported(state.characters[0]).alwyn.morningRoll, 3);
  app.click('alwyn-age', {age: 'sage'});
  assert.match(app.screen(), /The Sage · Roleplay/);
  app.click('nav', {screen: 'magic'});
  app.submit('quick-dice-form', {count: '2', sides: '6', modifier: '-1'});
  assert.match(app.element('quick-dice-result').innerHTML, /<strong>9<\/strong>.*2d6/s);
  assert.deepEqual(app.state(), {...state, age: 'sage'});
});
