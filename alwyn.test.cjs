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
  const window = {addEventListener() {}, scrollTo() {}, matchMedia: () => ({matches: true}), innerWidth: 390, scrollY: 0};
  const context = {
    document, window, navigator: {}, structuredClone, Math: Object.assign(Object.create(Math), {random}),
    localStorage: {getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value)},
    FormData: class { constructor(node) { return new Map(Object.entries(node.fields)); } },
    setTimeout: () => 1, clearTimeout() {}, confirm: () => true,
  };
  for (const file of ['./rules-data.js', './reference-data.js']) {
    vm.runInNewContext(fs.readFileSync(require.resolve(file), 'utf8'), context);
  }
  vm.runInNewContext(app.replace(/\}\)\(\);\s*$/, 'window.test = {fresh, normalizeImported}; })();'), context);
  return {
    ...window.test,
    state: () => JSON.parse(storage.get('arcanum_dw2_v3_v1')),
    screen: () => document.getElementById('screen').innerHTML,
    element: id => document.getElementById(id),
    swipe({dx, dy, elapsed = 200, scrollDelta = 0, fromInput = false}) {
      const start = {identifier: 1, clientX: 190, clientY: 300};
      const target = {closest: selector => selector.startsWith('.magic-layout') || fromInput};
      events.get('touchstart')({touches: [start], target, timeStamp: 0});
      window.scrollY += scrollDelta;
      const end = {...start, clientX: start.clientX + dx, clientY: start.clientY + dy};
      events.get('touchend')({touches: [], changedTouches: [end], timeStamp: elapsed});
    },
    click(action, extra = {}, fromLibrary = false) {
      const button = {dataset: {action, ...extra}, matches: () => false, closest: () => fromLibrary ? {} : null};
      events.get('click')({preventDefault() {}, target: {closest: () => button}});
    },
    change(selector, values) {
      events.get('change')({target: {matches: candidate => candidate === selector, ...values}});
    },
    input(selector, values) {
      events.get('input')({target: {matches: candidate => candidate === selector, ...values}});
    },
    submit(id, fields, dataset = {}) {
      events.get('submit')({preventDefault() {}, target: {id, fields, dataset}});
    },
  };
}

const item = (id, name) => ({id, name, quantity: 1, details: '', location: ''});

test('mobile workspace switches preserve spell filters, damage mode, and move rolls', () => {
  const app = openApp(null, () => 0.5);
  const selected = name => new RegExp(`data-section="${name}" aria-pressed="true"`);
  app.click('nav', {screen: 'magic'});
  assert.match(app.screen(), selected('spells'));
  app.click('magic-filter', {filter: 'Attack'});
  app.click('workspace-section', {section: 'schools'});
  assert.match(app.screen(), selected('schools'));
  app.click('workspace-section', {section: 'spells'});
  assert.match(app.screen(), /aria-pressed="true"\s+data-action="magic-filter" data-filter="Attack"/);
  assert.doesNotMatch(app.screen(), /Cast Brief Invisibility/);

  app.click('nav', {screen: 'play'});
  assert.match(app.screen(), selected('roll'));
  app.click('roll');
  app.click('workspace-section', {section: 'damage'});
  assert.match(app.screen(), selected('damage'));
  assert.match(app.screen(), /id="play-damage-form"/);
  app.change('', {form: {id: 'play-damage-form'}, name: 'mode', value: 'maximum'});
  app.click('workspace-section', {section: 'status'});
  app.click('hp', {delta: '-1'});
  assert.match(app.screen(), selected('status'));
  assert.equal(app.state().characters[0].hp, 6);
  app.click('workspace-section', {section: 'damage'});
  assert.match(app.screen(), /value="maximum" selected/);
  app.click('workspace-section', {section: 'roll'});
  assert.match(app.screen(), /class="dice-result">10/);

  app.change('[data-bind]', {dataset: {bind: '__diceMode'}, value: 'dex'});
  app.click('workspace-section', {section: 'damage'});
  assert.match(app.screen(), selected('damage'));
  assert.match(app.screen(), /id="play-damage-form"/);
  assert.match(app.screen(), /value="maximum" selected/);
});

test('mobile swipe switches adjacent sections and ignores vertical scrolling and controls', () => {
  const app = openApp();
  const selected = name => new RegExp(`data-section="${name}" aria-pressed="true"`);
  app.click('nav', {screen: 'play'});
  app.swipe({dx: -128, dy: 10});
  assert.match(app.screen(), selected('damage'));
  for (const gesture of [{dx: -90, dy: 140}, {dx: -45, dy: 3}, {dx: -100, dy: 9, scrollDelta: 24},
    {dx: -100, dy: 6, elapsed: 1100}, {dx: -100, dy: 4, fromInput: true}]) app.swipe(gesture);
  assert.match(app.screen(), selected('damage'));
  app.swipe({dx: 115, dy: 18});
  assert.match(app.screen(), selected('roll'));
  app.swipe({dx: 115, dy: 18});
  assert.match(app.screen(), selected('roll'));
  app.click('nav', {screen: 'magic'});
  app.swipe({dx: -105, dy: 12});
  assert.match(app.screen(), selected('schools'));
});

test('quick status updates the active age and backstory stays with its profile', () => {
  const seed = openApp();
  const prodigy = seed.fresh('Alwyn');
  const noble = seed.fresh('Alwyn (Noble)');
  prodigy.backstory = {history: 'Prodigy history', goals: '', events: ''};
  noble.backstory = {history: 'Noble history', goals: '', events: ''};
  const app = openApp({characters: [prodigy, noble], activeId: prodigy.id});
  app.submit('alwyn-form', {'sheet-noble': noble.id});
  assert.match(app.screen(), /Character backstory/);
  assert.match(app.screen(), /Noble history/);
  assert.doesNotMatch(app.screen(), /story-noble-history/);
  app.click('alwyn-edit');
  assert.match(app.element('modal-content').innerHTML, /name="story-noble-history"[^>]*>Noble history/);
  app.submit('alwyn-form', {'story-noble-history': 'Court mage history'});
  assert.match(app.screen(), /Court mage history/);
  assert.match(app.screen(), /Prodigy history/);
  app.click('alwyn-age', {age: 'noble'});
  app.click('nav', {screen: 'notes'});
  assert.doesNotMatch(app.screen(), /Character backstory|Court mage history/);
  app.click('quick-status');
  assert.match(app.element('modal-content').innerHTML, /The Noble/);
  app.click('hp', {delta: '-1'});
  app.click('condition', {condition: 'Insecure', state: 'marked'});
  assert.match(app.element('modal-content').innerHTML, /data-condition="Insecure" data-state="marked" aria-pressed="true"/);
  const saved = app.state().characters[0];
  assert.equal(saved.hp, prodigy.hp - 1);
  assert.equal(saved.alwyn.forms.noble.conditions.Insecure, 'marked');
  assert.equal(saved.conditions.Insecure, 'clear');
  app.click('close-modal');
  assert.equal(app.element('modal').dataset.view, '');
});

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
  assert.ok(profile.spells.some(spell => spell.name === 'Noble spell'));
  assert.ok(profile.spells.some(spell => spell.name === 'Sage spell'));
  assert.equal(profile.alwyn.forms.noble.spells, undefined);
  assert.deepEqual(profile.inventory.map(record => record.name),
    ['Lantern', 'Bejeweled skull cap', 'Adventuring gear', 'Potion of healing', 'Compass', 'Map']);
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
  app.click('nav', {screen: 'equipment'});
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
  app.click('nav', {screen: 'notes'});
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
  assert.match(app.element('modal-content').innerHTML, /<select[^>]*name="mag">[\s\S]*?<option value="0" selected/);
  assert.match(app.element('modal-content').innerHTML, /Normal cast/);

  app.submit('spell-cast-form', {mag: '2', extra: 'normal'}, {id: spell.id});
  assert.match(app.element('cast-summary').innerHTML, /Disadvantage cast/);
  assert.match(app.element('cast-result').innerHTML, /Discarded die/);
  app.submit('spell-cast-form', {mag: '3', extra: 'normal'}, {id: spell.id});
  assert.equal(app.element('cast-roll').disabled, true);
  assert.equal(app.element('cast-result').hidden, true);
  app.submit('spell-cast-form', {mag: '', extra: 'normal'}, {id: spell.id});
  assert.match(app.element('cast-summary').innerHTML, /Choose the MAG/);

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
  app.submit('quick-dice-form', {count: '2', sides: '4', modifier: '-1'});
  assert.match(app.element('quick-dice-result').innerHTML, /<strong>7<\/strong>.*2d4/s);
  assert.deepEqual(app.state(), {...state, age: 'sage'});
});

test('the expanded Spellbook retains Attack and availability filters when returning from a cast', () => {
  const seed = openApp();
  const kid = seed.fresh('Alwyn (Kid)');
  const [available, unavailable] = [
    {id: 'old', name: 'Crosswind', verb: 'Minor channel', sub: 'Elemental energies', category: 'Damage', mag: '0'},
    {id: 'locked', name: 'Unprepared spell', verb: 'Modify emotions', sub: 'Sapient beings', category: 'Attack', mag: '0'},
  ];
  kid.spells = [available, unavailable];
  const app = openApp({characters: [kid], activeId: kid.id});
  app.click('nav', {screen: 'magic'});
  assert.match(app.screen(), /Expand spellbook/);
  app.click('magic-filter', {filter: 'Attack'});
  app.change('[data-hide-unavailable]', {checked: true});
  app.click('spell-library');
  assert.equal(app.element('modal-title').textContent, 'Full spellbook');
  assert.match(app.element('modal-content').innerHTML, /Cast Crosswind/);
  assert.match(app.element('modal-content').innerHTML, /data-filter="Attack"/);
  assert.doesNotMatch(app.element('modal-content').innerHTML, /Unprepared spell/);
  app.click('spell-cast', {id: available.id}, true);
  assert.match(app.element('modal-content').innerHTML, /Roll damage/);
  app.click('close-modal');
  assert.equal(app.element('modal-title').textContent, 'Full spellbook');
  assert.match(app.element('modal-content').innerHTML, /Cast Crosswind/);
  assert.doesNotMatch(app.element('modal-content').innerHTML, /Unprepared spell/);
  assert.equal(app.state().characters[0].spells[0].category, 'Damage');
});

test('a spell can save a damage formula and roll separately from weapon moves', () => {
  const kid = openApp().fresh('Alwyn (Kid)');
  const app = openApp({characters: [kid], activeId: kid.id}, () => 0.5);
  app.submit('spell-form', {
    name: 'Crosswind', verb: 'Minor channel', sub: 'Elemental energies',
    category: 'Attack', mag: '0', effect: 'A gust', note: '', damage: '2D6 + 1',
  });
  const spell = app.state().characters[0].spells[0];
  assert.equal(spell.damage, '2d6+1');
  app.click('spell-cast', {id: spell.id});
  assert.match(app.element('modal-content').innerHTML, /name="formula" value="2d6\+1"/);
  app.submit('spell-damage-form', {formula: spell.damage, mode: 'normal'});
  assert.match(app.element('spell-damage-form-result').innerHTML, /9 damage/);
  app.click('close-modal');
  app.click('nav', {screen: 'play'});
  app.change('[data-bind]', {dataset: {bind: '__diceMode'}, value: 'melee'});
  assert.match(app.screen(), /Damage roll/);
  app.submit('play-damage-form', {formula: 'd8+2', mode: 'minimum'});
  assert.match(app.element('play-damage-form-result').innerHTML, /3 damage/);
  app.click('roll');
  assert.match(app.screen(), /3 damage/);
  app.submit('play-damage-form', {formula: '0d6', mode: 'normal'});
  assert.match(app.element('play-damage-form-result').textContent, /Choose the damage dice/);
  assert.equal(app.state().characters[0].hp, kid.hp);
});

test('legacy age spellbooks merge once, retaining conflicts and independent conditions', () => {
  const kid = openApp().fresh('Alwyn');
  const noble = structuredClone(kid), sage = structuredClone(kid);
  kid.conditions.Angry = 'marked';
  noble.conditions.Distracted = 'locked';
  noble.spells[0].effect = 'A different version of the same spell';
  kid.alwyn = {name:'Alwyn', forms:{noble, sage}, personality:{}, overview:''};
  const app = openApp({characters:[kid], activeId:kid.id});
  const profile = app.state().characters[0];
  assert.equal(profile.alwyn.schemaVersion, 2);
  assert.equal(profile.spells.length, kid.spells.length + 1);
  assert.equal(new Set(profile.spells.map(spell => spell.id)).size, profile.spells.length);
  assert.equal(profile.alwyn.forms.noble.conditions.Distracted, 'locked');
  assert.equal(profile.alwyn.forms.sage.conditions.Distracted, 'clear');
  assert.equal(profile.alwyn.forms.noble.spells, undefined);
  assert.deepEqual(openApp(app.state()).state(), app.state());
  app.click('spell-delete', {id:profile.spells[0].id});
  assert.equal(openApp(app.state()).state().characters[0].spells.length, profile.spells.length - 1);
});

test('all Alwyn ages share spell edits while schools and forgotten schools remain separate', () => {
  const kid = openApp().fresh('Alwyn');
  const app = openApp({characters:[kid], activeId:kid.id});
  app.submit('alwyn-form', {});
  app.submit('spell-form', {name:'Shared gust',verb:'Minor channel',sub:'Elemental energies',category:'Attack',mag:'0',effect:'A gust',note:'',damage:'1d8'});
  const spell = app.state().characters[0].spells[0];
  app.click('forget', {school:'Evocation'});
  app.click('alwyn-age', {age:'noble'});
  app.click('nav', {screen:'magic'});
  assert.match(app.screen(), /Cast Shared gust/);
  assert.doesNotMatch(app.screen(), /Forgotten until Make Camp/);
  app.submit('spell-form', {...spell,name:'Shared storm'}, {id:spell.id});
  app.click('alwyn-age', {age:'sage'});
  app.click('nav', {screen:'magic'});
  assert.match(app.screen(), /Shared storm/);
  assert.match(app.screen(), /School unavailable/);
  const profile = app.state().characters[0];
  assert.equal(profile.spells.filter(entry=>entry.id===spell.id).length, 1);
  assert.deepEqual(profile.forgotten, ['Evocation']);
  assert.deepEqual(profile.alwyn.forms.sage.prepared, ['Illusion','Divination','Abjuration']);
  const imported = app.normalizeImported(profile);
  assert.equal(imported.spells[0].name, 'Shared storm');
  assert.deepEqual(imported.alwyn.forms.sage.prepared, profile.alwyn.forms.sage.prepared);
});

test('permanent conditions belong to one age and survive clearing, camp, outburst, and import', () => {
  const kid = openApp().fresh('Alwyn');
  const app = openApp({characters:[kid],activeId:kid.id});
  app.submit('alwyn-form', {});
  app.submit('permanent-conditions-form', {Angry:'on'});
  app.click('condition', {condition:'Angry',state:'clear'});
  app.element('camp-condition').value='Angry';
  app.click('camp-confirm');
  assert.equal(app.state().characters[0].conditions.Angry,'locked');
  app.click('alwyn-age', {age:'noble'});
  app.submit('permanent-conditions-form', {Insecure:'on'});
  app.click('condition',{condition:'Angry',state:'marked'});
  app.element('limit-condition').value='Exhausted';
  app.click('limit-confirm');
  const profile=app.state().characters[0];
  assert.equal(profile.conditions.Angry,'locked');
  assert.equal(profile.alwyn.forms.noble.conditions.Angry,'clear');
  assert.equal(profile.alwyn.forms.noble.conditions.Insecure,'locked');
  assert.equal(profile.alwyn.forms.sage.conditions.Insecure,'clear');
  const imported=app.normalizeImported(profile);
  assert.deepEqual(Array.from(imported.permanentConditions),['Angry']);
  assert.deepEqual(Array.from(imported.alwyn.forms.noble.permanentConditions),['Insecure']);
  app.click('alwyn-age',{age:'prodigy'});
  app.click('nav',{screen:'play'});
  app.click('roll');
  assert.match(app.screen(),/Discarded die/);
});

test('Play tools rolls saved and legacy spell damage and remembers chosen dice', () => {
  const kid=openApp().fresh('Alwyn');
  const spell=kid.spells.find(spell=>spell.name==='Arcane Dart');
  const app=openApp({characters:[kid],activeId:kid.id},()=>0.5);
  app.click('nav',{screen:'play'});
  assert.match(app.screen(),/Attack spells/);
  assert.match(app.screen(),/>Arcane Dart · 1d4<\/option>/);
  app.change('',{id:'play-damage-preset',value:'spell:'+spell.id});
  assert.match(app.screen(),/name="formula" value="1d4"/);
  assert.match(app.screen(),/<option value="4" selected>d4<\/option>/);
  app.submit('play-damage-form',{formula:'2d4+1',mode:'normal'});
  assert.match(app.element('play-damage-form-result').innerHTML,/7 damage/);
  assert.equal(app.state().characters[0].spells.find(entry=>entry.id===spell.id).damage,spell.damage);
  app.click('roll');
  assert.match(app.screen(),/7 damage/);
  app.click('spell-cast',{id:spell.id});
  assert.match(app.element('modal-content').innerHTML,/name="formula" value="1d4"/);
  app.click('close-modal');
  app.click('forget', {school: 'Evocation'});
  assert.doesNotMatch(app.screen(), /Arcane Dart|School unavailable|Attack spells|7 damage/);
  assert.match(app.screen(), /name="formula" value="1d6"/);
  app.click('remember', {school: 'Evocation'});
  assert.match(app.screen(), />Arcane Dart · 1d4<\/option>/);
  assert.match(app.screen(), /name="formula" value="1d6"/);
});

test('dice selectors contain only 1–5 dice and −1 to +5 without option groups', () => {
  const app = openApp(null, () => 0.5);
  const values = select => [...select.matchAll(/<option value="([^"]+)"/g)].map(match => Number(match[1]));
  const check = (html, count, bonus) => {
    const countSelect = html.match(count)[1];
    const bonusSelect = html.match(bonus)[1];
    assert.deepEqual(values(countSelect), [1, 2, 3, 4, 5]);
    assert.deepEqual(values(bonusSelect), [-1, 0, 1, 2, 3, 4, 5]);
    assert.doesNotMatch(bonusSelect, /optgroup/);
  };
  app.click('quick-roll');
  check(app.element('modal-content').innerHTML, /<select name="count">([\s\S]*?)<\/select>/, /<select name="modifier">([\s\S]*?)<\/select>/);
  const freeSides = app.element('modal-content').innerHTML.match(/<select name="sides">([\s\S]*?)<\/select>/)[1];
  assert.deepEqual(values(freeSides), [3, 4, 6, 8, 10, 12, 20]);
  app.click('nav', {screen: 'play'});
  check(app.screen(), /<select data-damage-count>([\s\S]*?)<\/select>/, /<select data-damage-modifier>([\s\S]*?)<\/select>/);
  const damageSides = app.screen().match(/<select data-damage-sides>([\s\S]*?)<\/select>/)[1];
  assert.deepEqual(values(damageSides), [3, 4, 6, 8, 10, 12, 20]);
  app.submit('play-damage-form', {formula: '6d6', mode: 'normal'});
  assert.match(app.element('play-damage-form-result').textContent, /Choose up to 5 dice/);
});

test('Play tools lists attribute rolls, casting, and Trade Blows', () => {
  const app = openApp(null, () => 0.5);
  app.click('nav', {screen: 'play'});
  const options = app.screen().match(/<select data-bind="__diceMode">([\s\S]*?)<\/select>/)[1];
  assert.deepEqual([...options.matchAll(/<option[^>]*>([^<]+)<\/option>/g)].map(match => match[1]),
    ['STR', 'DEX', 'INT', 'WIS', 'CHA', 'Cast a Spell', 'Trade Blows (STR)', 'Trade Blows (DEX)']);
  const rollType = id => app.change('[data-bind]', {dataset: {bind: '__diceMode'}, value: id});
  const damageShortcut = /class="btn mobile-workspace" data-action="workspace-section" data-section="damage"/;
  const rolls = [['str', 7], ['dex', 9], ['int', 10], ['wis', 8], ['cha', 8],
    ['cast', 10], ['melee', 7], ['ranged', 9]];
  for (const [id, total] of rolls) {
    rollType(id);
    assert.equal(/id="dice-mag"/.test(app.screen()), id === 'cast');
    assert.equal(damageShortcut.test(app.screen()), ['cast', 'melee', 'ranged'].includes(id));
    app.click('roll');
    assert.match(app.screen(), new RegExp(`class="dice-result">${total}<`));
  }
});

test('legacy Alwyn gear migrates once and only equipped items grant effects or presets', () => {
  const kid = openApp().fresh('Alwyn · The Kid');
  kid.equipment = ['potion', 'dagger'];
  kid.used.potion = 1;
  kid.inventory = [{...item('existing', 'Potion of healing'), details: 'From the healer'}];
  const app = openApp({characters: [kid], activeId: kid.id}, () => 0.5);
  app.click('nav', {screen: 'equipment'});
  assert.doesNotMatch(app.screen(), /Equipment &amp; focus|Razor dagger/);
  const get = name => app.state().characters[0].inventory.find(item => item.name === name);
  const potion = get('Potion of healing');
  const needles = get('Small acupuncture needles');
  const skull = get('Bejeweled skull cap');
  assert.equal(potion.details, 'From the healer');
  assert.equal(potion.uses, 0);
  assert.equal(potion.maxUses, 1);
  assert.equal(needles.damage, '1d4');
  assert.ok(needles.equipped && needles.weapon);
  assert.equal(skull.bonuses.armor, 1);
  app.submit('character-record-form', {name: 'Charm Bow', equipped: 'true', weapon: 'true',
    damage: '1d8', keywords: 'precise, #far', uses: '3', maxUses: '4', 'bonus-CHA': '2', 'bonus-hp': '2'},
  {key: 'inventory', id: 'charm-bow'});
  app.click('inventory-use', {id: 'charm-bow'});
  assert.equal(get('Charm Bow').uses, 2);
  assert.deepEqual(get('Charm Bow').keywords, ['#precise', '#far']);
  app.click('nav', {screen: 'play'});
  assert.match(app.screen(), /Small acupuncture needles · 1d4/);
  assert.match(app.screen(), /Charm Bow · 1d8/);
  app.change('', {id: 'play-damage-preset', value: 'weapon:charm-bow'});
  assert.match(app.screen(), /name="formula" value="1d8"/);
  app.change('[data-bind]', {dataset: {bind: '__diceMode'}, value: 'cha'});
  app.click('roll');
  assert.match(app.screen(), /class="dice-result">10</);
  app.click('heal-full');
  assert.equal(app.state().characters[0].hp, 9);
  app.submit('character-record-form', {name: 'Charm Bow', equipped: 'false', weapon: 'true',
    damage: '1d8', 'bonus-CHA': '2'}, {key: 'inventory', id: 'charm-bow'});
  assert.doesNotMatch(app.screen(), /Charm Bow · 1d8/);
  app.click('roll');
  assert.match(app.screen(), /class="dice-result">8</);
  assert.equal(app.state().characters[0].hp, 7);
  app.click('record-delete', {key: 'inventory', id: skull.id});
  const restored = openApp(app.state());
  assert.doesNotMatch(restored.screen(), /1 Armor/);
  assert.equal(restored.state().characters[0].inventory.filter(item => item.name === potion.name).length, 1);
  assert.ok(!restored.state().characters[0].inventory.some(item => item.name === skull.name));
});

test('Alwyn receives the replacement needles once even if a device had no legacy dagger selected', () => {
  const root = openApp().fresh('Alwyn');
  root.inventoryVersion = 1;
  root.inventory = [item('gear', 'Adventuring gear')];
  root.alwyn = {name:'Alwyn', schemaVersion:2, personality:{}, forms:{}};
  const app = openApp({characters: [root], activeId: root.id});
  const getNeedles = profile => profile.characters[0].inventory.filter(item => item.name === 'Small acupuncture needles');
  const needles = getNeedles(app.state());
  assert.equal(needles.length, 1);
  assert.ok(needles[0].equipped && needles[0].weapon);
  assert.ok(app.state().characters[0].inventory.some(item => item.name === 'Adventuring gear'));
  assert.equal(getNeedles(openApp(app.state()).state()).length, 1);
  app.click('record-delete', {key:'inventory', id:needles[0].id});
  assert.equal(getNeedles(openApp(app.state()).state()).length, 0);
});

test('all navigation pages render, Play tools comes second, and quick dice opens from any page', () => {
  const app=openApp();
  const desktop=app.element('nav-desktop').innerHTML;
  assert.ok(desktop.indexOf('data-screen="play"')<desktop.indexOf('data-screen="magic"'));
  for(const screen of ['sheet','play','magic','paths','equipment','notes','rules','characters','saves']){
    app.click('nav',{screen});
    assert.ok(app.screen().includes('pagehead'),screen);
    const stack=[];
    for(const match of app.screen().matchAll(/<(\/?)([a-z][a-z0-9-]*)\b[^>]*>/gi)){
      const tag=match[2].toLowerCase();
      if(['input','img','br','hr','path','circle','rect'].includes(tag)||match[0].endsWith('/>'))continue;
      if(match[1])assert.equal(stack.pop(),tag,screen+' closing '+tag);
      else stack.push(tag);
    }
    assert.equal(stack.length,0,screen+' unclosed tags');
    app.click('quick-roll');
    assert.equal(app.element('modal-title').textContent,'Roll dice');
    app.click('close-modal');
  }
  app.click('nav',{screen:'magic'});
  assert.doesNotMatch(app.screen(),/id="quick-dice-form"/);
  assert.match(app.screen(),/spellbook-scroll/);
  app.click('more-nav');
  assert.match(app.element('modal-content').innerHTML,/data-screen="equipment"/);
});

test('rules reference searches every class and characters can acquire and retain multiclass Paths', () => {
  const app=openApp();
  app.click('nav',{screen:'rules'});
  app.click('rules-category', {category: 'All'});
  assert.match(app.screen(),/Barbarian/);
  assert.match(app.screen(),/Wizard/);
  app.input('[data-rules-search]',{value:'Mirror Image'});
  assert.match(app.element('rules-results').innerHTML,/Mirror Image/);
  assert.doesNotMatch(app.element('rules-results').innerHTML,/Ancestral longsword/);
  app.submit('new-character-form',{name:'Swordsage',className:'Fighter',multiclassPath:'Illusionist'});
  const profile=app.state().characters.find(character=>character.name==='Swordsage');
  assert.equal(profile.hp,10);
  assert.equal(profile.className,'Fighter');
  assert.equal(profile.focus,'');
  assert.deepEqual(profile.paths,['Illusionist']);
  app.click('class-path',{path:'Fighter::bulwark'});
  app.click('class-move',{path:'Fighter::bulwark',move:'Fighter::bulwark::armiger'});
  const restored=app.normalizeImported(app.state().characters.find(character=>character.id===profile.id));
  assert.deepEqual(restored.paths,['Illusionist','Fighter::bulwark']);
  assert.deepEqual(restored.moves,['Fighter::bulwark::armiger']);
  app.click('class-path',{path:'Fighter::bulwark'});
  assert.deepEqual(app.state().characters.find(character=>character.id===profile.id).moves,[]);
});

test('starting choices create editable inventory records for multiple classes', () => {
  const app = openApp();
  app.submit('new-character-form', {name:'Quartermaster', className:'Fighter',
    'starter-main':'starter:Fighter:Yew longbow', 'starter-first':'starter:Fighter:Medicine',
    'starter-second':'starter:Fighter:Medicine'});
  const {inventory} = app.state().characters.find(character => character.name === 'Quartermaster');
  assert.deepEqual(inventory.map(item => item.name), ['Yew longbow', 'Medicine']);
  assert.equal(inventory[0].damage, '1d6');
  assert.equal(inventory[0].equipped, true);
  assert.equal(inventory[1].uses, 2);
});

test('reference dialogs show complete move outcomes, Path abilities, and keywords', () => {
  const app = openApp();
  app.click('nav', {screen:'rules'});
  assert.doesNotMatch(app.screen(), /data-category="Magic"/);
  assert.match(app.screen(), /data-id="move-trade-blows" aria-haspopup="dialog"/);
  app.click('reference-open', {id:'move-trade-blows'});
  const dialog = () => app.element('modal-content').innerHTML;
  assert.match(dialog(), /10\+ · Full success/);
  assert.match(dialog(), /7-9 · Partial success/);
  assert.match(dialog(), /6- · Miss/);
  assert.match(dialog(), /You inflict max dmg/);
  assert.match(dialog(), /After choices have been made/);
  app.click('reference-open', {id:'path-wizard-illusionist'});
  assert.match(dialog(), /Mirror Image/);
  app.click('reference-open', {id:'ability-wizard-illusionist-3'});
  assert.equal(app.element('modal-title').textContent, 'Mirror Image');
  assert.match(dialog(), /mark a Condition/i);
  app.click('reference-open', {id:'tag-piercing'});
  assert.match(dialog(), /ignores armor and shield protection/i);
});

test('equipment catalog adds editable records with dice, uses, armor, and tags', () => {
  const app = openApp();
  app.click('nav', {screen:'rules'});
  app.click('rules-category', {category:'Equipment'});
  app.change('', {id:'rules-family', value:'Artifacts'});
  assert.match(app.element('rules-results').innerHTML, /Lazurite Dragon Orb/);
  assert.doesNotMatch(app.element('rules-results').innerHTML, /Alchemy jug/);
  app.click('reference-open', {id:'starting-ancestral-longsword'});
  assert.match(app.element('modal-content').innerHTML, /Add to inventory/);
  app.click('reference-add-item', {id:'starting-ancestral-longsword'});
  app.click('reference-add-item', {id:'gear-medium-armor'});
  app.click('reference-add-item', {id:'magic-item-potion-of-flying'});
  const inventory = app.state().characters[0].inventory;
  assert.deepEqual(inventory.slice(0, 4).map(item => item.name), ['Potion of flying','Medium armor','Ancestral longsword','Shield']);
  assert.equal(inventory[0].uses, 1);
  assert.equal(inventory[1].bonuses.armor, 2);
  assert.equal(inventory[2].damage, '1d6');
  assert.deepEqual(inventory[2].keywords, ['#close']);
  assert.ok(!inventory[2].equipped);
  assert.equal(inventory[3].uses, 1);
});

test('Amnesia tracking saves across Alwyn’s ages, reloads, and imports', () => {
  const kid = openApp().fresh('Alwyn');
  const app = openApp({characters:[kid],activeId:kid.id});
  app.submit('alwyn-form', {});
  app.click('nav', {screen:'notes'});
  assert.match(app.screen(), /Struggle · Amnesia/);
  assert.match(app.screen(), /Memories 0 \/ 5/);
  assert.match(app.screen(), /mark 1 XP and the GM advances a Threat/);
  app.click('edit-struggle');
  assert.match(app.element('modal-content').innerHTML, /Shards used this session/);
  app.submit('struggle-form', {progress:'2', used:'on', prompts:'A ruined tower', notes:'Remembered the key'});
  app.click('alwyn-age', {age:'sage'});
  assert.match(app.screen(), /Memories 2 \/ 5/);
  assert.match(app.screen(), /Remembered the key/);
  const state = app.state();
  const restored = openApp(state);
  restored.click('nav', {screen:'notes'});
  assert.match(restored.screen(), /Shards used this session/);
  assert.equal(restored.normalizeImported(state.characters[0]).struggle.progress, 2);
});

