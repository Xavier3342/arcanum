const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const {webcrypto} = require('node:crypto');

const script = fs.readFileSync(require.resolve('./drive-sync.js'), 'utf8');
const copy = value => JSON.parse(JSON.stringify(value));
const waitFor = async (condition) => {
  for (let attempt = 0; attempt < 200 && !condition(); attempt++) {
    await new Promise(resolve => setTimeout(resolve, 5));
  }
  assert.ok(condition(), 'The simulated sync did not finish');
};

function character(id, notes) {
  return {
    id, name: id, notes, origins: {}, conditions: {}, stats: {}, used: {},
    paths: [], moves: [], prepared: [], forgotten: [], equipment: [], spells: [], relationships: [],
  };
}

function googleDrive() {
  let body = '';
  let version = 1;
  let exists = false;
  let beforeWrite;
  return {
    edits: () => JSON.parse(body).characters,
    setBody(text) { body = text; version++; },
    race(next) { beforeWrite = next; },
    fetch: async (url, options) => {
      assert.equal(options.headers.Authorization, 'Bearer test-access-token');
      const ok = data => ({ok: true, json: async () => data});
      if (url.includes('/files/folder-1?')) {
        return ok({id: 'folder-1', mimeType: 'application/vnd.google-apps.folder', ownedByMe: true});
      }
      if (url.includes('/files?') && options.method === 'POST') {
        assert.deepEqual(JSON.parse(options.body).parents, ['folder-1']);
        assert.equal(exists, false);
        exists = true;
        return ok({id: 'document-1'});
      }
      if (url.includes('/files?')) return ok({files: exists ? [{id: 'document-1'}] : []});
      if (url.includes('document-1?')) {
        return ok({
          revisionId: String(version),
          tabs: [{
            tabProperties: {tabId: 't.first'},
            documentTab: {body: {content: [{
              endIndex: body.length + 2,
              paragraph: {elements: [{textRun: {content: body + '\n'}}]},
            }]}},
          }],
        });
      }
      assert.ok(url.endsWith('document-1:batchUpdate'));
      const {writeControl, requests} = JSON.parse(options.body);
      if (beforeWrite) {
        const once = beforeWrite;
        beforeWrite = null;
        await once();
      }
      if (writeControl.requiredRevisionId !== String(version)) return {ok: false, status: 400};
      if (body) {
        assert.deepEqual(requests[0], {
          deleteContentRange: {range: {startIndex: 1, endIndex: body.length + 1, tabId: 't.first'}},
        });
      }
      assert.deepEqual(requests.at(-1).insertText.location, {index: 1, tabId: 't.first'});
      body = requests.at(-1).insertText.text;
      assert.match(body, /^[\x20-\x7e]+$/);
      version++;
      return ok({});
    },
  };
}

function device(drive, initial, initialLink = null) {
  let characters = copy(initial);
  let linked = initialLink && copy(initialLink);
  let id = 0;
  const doc = {addEventListener() {}};
  const navigator = {onLine: true};
  class View {
    setIncludeFolders() { return this; }
    setSelectFolderEnabled() { return this; }
    setMode() { return this; }
  }
  class Picker {
    setTitle() { return this; }
    setDeveloperKey() { return this; }
    setAppId() { return this; }
    setOAuthToken() { return this; }
    setOrigin() { return this; }
    addView() { return this; }
    setCallback(callback) { this.callback = callback; return this; }
    build() { return this; }
    setVisible() {
      queueMicrotask(() => this.callback({action: 'picked', documents: [{id: 'folder-1'}]}));
    }
  }
  const google = {
    accounts: {oauth2: {
      initTokenClient: ({callback}) => ({
        requestAccessToken: () => callback({access_token: 'test-access-token', expires_in: 3600}),
      }),
      hasGrantedAllScopes: () => true,
    }},
    picker: {
      DocsView: View, PickerBuilder: Picker, ViewId: {FOLDERS: 'folders'}, DocsViewMode: {LIST: 'list'},
      Action: {CANCEL: 'cancel', PICKED: 'picked'}, Response: {ACTION: 'action', DOCUMENTS: 'documents'},
      Document: {ID: 'id'},
    },
  };
  const gapi = {load: (_, {callback}) => callback()};
  const window = {
    google, gapi, addEventListener() {},
    arcanumDriveConfig: {clientId: 'client', apiKey: 'picker-key', projectNumber: '123'},
  };
  vm.runInNewContext(script, {
    window, document: doc, navigator, google, gapi, crypto: webcrypto, AbortSignal, TextEncoder,
    URLSearchParams, location: {origin: 'https://example.com'}, fetch: drive.fetch,
    setInterval() {}, setTimeout() {}, clearTimeout() {}, confirm: () => true,
  });
  const sync = window.createArcanumDriveSync({
    characters: () => characters,
    isBlank: () => characters[0]?.id === 'placeholder',
    canApply: () => true,
    link: () => linked,
    setLink: link => { linked = copy(link); },
    apply: (next, link) => { characters = copy(next); linked = copy(link); },
    showStatus() {},
    newId: () => 'local-copy-' + ++id,
  });
  return {
    sync,
    chars: () => characters,
    link: () => linked,
    online: value => { navigator.onLine = value; },
    edit: notes => { characters[0].notes = notes; },
    async connect() {
      await sync.activate();
      await sync.activate();
      await waitFor(() => !sync.disabled());
    },
  };
}

test('copies an existing character and loads the same save on a clean device', async () => {
  const drive = googleDrive();
  const first = device(drive, [character('Alwyn', 'Étoiles ✦ 🧙\n Second line')]);
  await first.connect();
  assert.equal(first.sync.headline(), 'Synced to Drive');
  const second = device(drive, [character('placeholder', '')]);
  await second.connect();
  assert.deepEqual(second.chars(), first.chars());
  assert.equal(second.link().id, first.link().id);
});

test('reconnects after offline editing and propagates the local change', async () => {
  const drive = googleDrive();
  const first = device(drive, [character('Alwyn', 'before')]);
  await first.connect();
  const second = device(drive, [character('placeholder', '')]);
  await second.connect();
  first.online(false);
  first.edit('offline');
  await first.sync.sync();
  assert.match(first.sync.status(), /Offline/);
  assert.equal(drive.edits()[0].notes, 'before');
  const restarted = device(drive, first.chars(), first.link());
  await restarted.connect();
  await second.sync.activate();
  assert.equal(second.chars()[0].notes, 'offline');
});

test('rejects a stale write and lets the user keep both versions', async () => {
  const drive = googleDrive();
  const first = device(drive, [character('Alwyn', 'before')]);
  await first.connect();
  const second = device(drive, [character('placeholder', '')]);
  await second.connect();
  first.edit('first device');
  second.edit('second device');
  drive.race(() => second.sync.activate());
  await first.sync.activate();
  assert.equal(drive.edits()[0].notes, 'second device');
  assert.equal(first.chars()[0].notes, 'first device');
  assert.equal(first.sync.button(), 'Keep both versions');
  await first.sync.activate();
  await second.sync.activate();
  assert.deepEqual(second.chars().map(entry => [entry.name, entry.notes]), [
    ['Alwyn', 'second device'], ['Alwyn (device copy)', 'first device'],
  ]);
});

test('leaves local and remote data alone when the sync document is invalid', async () => {
  const drive = googleDrive();
  const first = device(drive, [character('Alwyn', 'before')]);
  await first.connect();
  drive.setBody('Manually edited document');
  await first.sync.activate();
  assert.match(first.sync.status(), /not a valid Arcanum save/);
  assert.equal(first.chars()[0].notes, 'before');
});

test('round-trips a grouped character and shared inventory to another device', async () => {
  const drive = googleDrive();
  const profile = {
    ...character('Alwyn', 'Prodigy notes'),
    inventory: [{id: 'cloak', name: 'Travel cloak', quantity: 1}],
    alwyn: {
      name: 'Alwyn', overview: 'Three ages',
      forms: {noble: {notes: 'Royal court'}, sage: {notes: 'Arcane study'}},
      personality: {prodigy: 'Playful', noble: 'Theatrical', sage: 'Patient'},
    },
  };
  const first = device(drive, [profile]);
  await first.connect();
  const second = device(drive, [character('placeholder', '')]);
  await second.connect();
  assert.deepEqual(second.chars(), [profile]);
});
