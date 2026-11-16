/* Optional Google Drive sync. Authorization tokens live only in this page. */
(() => {
  'use strict';

  const drive = 'https://www.googleapis.com/drive/v3/files';
  const docs = 'https://docs.googleapis.com/v1/documents';
  const scope = 'https://www.googleapis.com/auth/drive.file';
  const docType = 'application/vnd.google-apps.document';
  const format = 'Arcanum Drive Sync';
  const docName = 'Arcanum Character Sync';
  const idPattern = /^[A-Za-z0-9_-]+$/;

  function encode(characters) {
    // Docs strips some Unicode characters from inserted text. ASCII JSON round-trips them.
    return JSON.stringify({format, version: 1, characters})
      .replace(/[^\x20-\x7e]/g, char => '\\u' + char.charCodeAt(0).toString(16).padStart(4, '0'));
  }

  async function digest(text) {
    const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    return Array.from(new Uint8Array(bytes), byte => byte.toString(16).padStart(2, '0')).join('');
  }

  function decode(text) {
    try {
      const data = JSON.parse(text);
      const ids = new Set();
      const valid = data.format === format && data.version === 1 && Array.isArray(data.characters)
        && data.characters.length && data.characters.every(character => {
          if (!character || typeof character.id !== 'string' || ids.has(character.id)
              || typeof character.name !== 'string') return false;
          const objects = ['origins', 'conditions', 'stats', 'used'];
          const arrays = ['paths', 'moves', 'prepared', 'forgotten', 'equipment', 'spells', 'relationships'];
          if (!objects.every(key => character[key] && typeof character[key] === 'object' && !Array.isArray(character[key]))
              || !arrays.every(key => Array.isArray(character[key]))) return false;
          ids.add(character.id);
          return true;
        });
      if (valid) return data.characters;
    } catch {}
    throw new Error('The Drive document is not a valid Arcanum save. Your local characters are still available.');
  }

  function keepBoth(remote, local, newId) {
    const characters = remote.slice();
    const byId = new Map(remote.map(character => [character.id, character]));
    for (const character of local) {
      const other = byId.get(character.id);
      if (!other) characters.push(character);
      else if (encode([other]) !== encode([character])) {
        characters.push({...character, id: newId(), name: character.name + ' (device copy)'});
      }
    }
    return characters;
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = () => {
        script.remove();
        reject(new Error('Google could not load. Check your connection and try again.'));
      };
      document.head.appendChild(script);
    });
  }

  window.createArcanumDriveSync = function createArcanumDriveSync(app) {
    const config = window.arcanumDriveConfig || {};
    const configured = Boolean(config.clientId && config.apiKey && config.projectNumber);
    let token = '';
    let expires = 0;
    let timer;
    let busy = false;
    let conflict = false;
    let preparing = false;
    let pickerReady = false;
    let status = app.link() ? 'Reconnect Google Drive to sync.' : 'Local autosave is active.';

    const authorized = () => Boolean(token && Date.now() < expires);

    function report(message) {
      status = message;
      app.showStatus();
    }

    async function request(url, options = {}) {
      const headers = {Authorization: 'Bearer ' + token};
      if (options.body) headers['Content-Type'] = 'application/json';
      const response = await fetch(url, {...options, headers, cache: 'no-store', signal: AbortSignal.timeout(15000)});
      if (!response.ok) {
        if (response.status === 401) token = '';
        const error = new Error(response.status === 403 || response.status === 404
          ? 'Google could not open this save. Check the Google account and whether the sync document is still in Drive.'
          : 'Google rejected the request (' + response.status + ').');
        error.status = response.status;
        throw error;
      }
      return response.json();
    }

    function reportError(error) {
      if (!authorized()) report('Reconnect Google Drive to sync.');
      else if (error instanceof TypeError || error.name === 'TimeoutError') report('Drive is unavailable. Changes are on this device.');
      else report(error.message);
    }

    async function findDocument(folderId) {
      const folder = await request(drive + '/' + folderId + '?fields=id,mimeType,shared,ownedByMe,trashed');
      if (folder.mimeType !== 'application/vnd.google-apps.folder' || folder.shared
          || !folder.ownedByMe || folder.trashed) {
        throw new Error('Choose a private folder you own in My Drive.');
      }
      const query = new URLSearchParams({
        q: "'" + folderId + "' in parents and trashed = false and mimeType = '" + docType + "'"
          + " and appProperties has { key='arcanumSync' and value='1' }",
        fields: 'nextPageToken,files(id)', pageSize: '2',
      });
      let id;
      do {
        const result = await request(drive + '?' + query);
        for (const file of result.files) {
          if (id) throw new Error('This folder has multiple Arcanum sync documents. Keep one in this folder and move the others before connecting.');
          id = file.id;
        }
        if (!result.nextPageToken) return id;
        query.set('pageToken', result.nextPageToken);
      } while (true);
    }

    async function linkFolder(folderId) {
      let id = await findDocument(folderId);
      if (!id) {
        const created = await request(drive + '?fields=id', {
          method: 'POST',
          body: JSON.stringify({
            name: docName, mimeType: docType, parents: [folderId], appProperties: {arcanumSync: '1'},
          }),
        });
        id = created.id;
        const visibleId = await findDocument(folderId);
        if (visibleId && visibleId !== id) {
          throw new Error('Another device created a sync document at the same time. Check the Arcanum documents in your Drive folder before reconnecting.');
        }
      }
      if (!idPattern.test(id || '')) throw new Error('Google returned an invalid document ID.');
      app.setLink({id, folderId, base: null});
    }

    async function readDocument(id) {
      const doc = await request(docs + '/' + id + '?includeTabsContent=true');
      const tab = doc.tabs?.[0];
      const content = tab?.documentTab?.body?.content;
      if (!doc.revisionId || doc.tabs?.length !== 1 || tab.childTabs?.length || !content?.length) {
        throw new Error('The Arcanum sync document has an unsupported layout.');
      }
      const paragraphs = content.filter(block => !block.sectionBreak);
      if (!paragraphs.length || paragraphs.some(block => !block.paragraph?.elements?.every(element => element.textRun))) {
        throw new Error('The Arcanum sync document contains unsupported content.');
      }
      const text = paragraphs.flatMap(block => block.paragraph.elements)
        .map(element => element.textRun.content).join('');
      const end = paragraphs.at(-1).endIndex;
      if (!text.endsWith('\n') || end !== text.length + 1) {
        throw new Error('The Arcanum sync document has an unexpected text layout.');
      }
      const body = text.slice(0, -1);
      return {
        body, end, revision: doc.revisionId, tabId: tab.tabProperties.tabId,
        characters: body ? decode(body) : null,
        hash: body ? await digest(body) : null,
      };
    }

    async function writeDocument(id, previous, text) {
      if (text.length > 1_020_000) {
        throw new Error('This save exceeds the Drive document size limit. Export a local backup before reducing portrait sizes.');
      }
      const tabId = previous.tabId;
      const requests = [];
      if (previous.end > 2) {
        requests.push({deleteContentRange: {range: {startIndex: 1, endIndex: previous.end - 1, tabId}}});
      }
      requests.push({insertText: {location: {index: 1, tabId}, text}});
      await request(docs + '/' + id + ':batchUpdate', {
        method: 'POST',
        body: JSON.stringify({writeControl: {requiredRevisionId: previous.revision}, requests}),
      });
    }

    async function reconcile(acceptBoth, retry = true) {
      const link = app.link();
      const remote = await readDocument(link.id);
      const local = app.characters();
      let text = encode(local);
      let hash = await digest(text);
      // A character may change while the request or hash is in flight.
      if (text !== encode(app.characters())) return queue();
      if (remote.hash === hash) {
        app.setLink({...link, base: hash});
      } else if (remote.hash && (hash === link.base || (!link.base && app.isBlank()))) {
        if (!app.canApply()) return report('Drive has updates. Finish editing to load them.');
        app.apply(remote.characters, {...link, base: remote.hash});
      } else if (remote.hash === link.base || acceptBoth) {
        let merged;
        if (acceptBoth && remote.hash !== link.base) {
          if (!app.canApply()) return report('Finish editing before combining versions.');
          merged = keepBoth(remote.characters || [], local, app.newId);
          const localText = text;
          text = encode(merged);
          hash = await digest(text);
          if (localText !== encode(app.characters())) return queue();
          if (!app.canApply()) return report('Finish editing before combining versions.');
          // Keep both versions on this device before sending the combined save.
          app.apply(merged, link);
        }
        try {
          await writeDocument(link.id, remote, text);
        } catch (error) {
          if (error.status === 400 && retry) {
            // Docs rejects stale writes atomically. Read the new version before deciding again.
            const latest = await readDocument(link.id);
            if (latest.revision !== remote.revision) return reconcile(false, false);
          }
          throw error;
        }
        app.setLink({...link, base: hash});
        if (text !== encode(app.characters())) {
          report('Saved on this device. Drive sync pending.');
          queue();
          return;
        }
      } else {
        conflict = true;
        return report('Drive and this device have different edits. Open Journal & backups to keep both versions.');
      }
      conflict = false;
      report('Synced to Google Drive.');
    }

    async function sync(acceptBoth = false) {
      if (busy || !app.link() || (conflict && !acceptBoth)) return;
      if (!authorized()) return report('Reconnect Google Drive to sync.');
      if (!navigator.onLine) return report('Offline. Changes are on this device.');
      busy = true;
      report('Syncing with Google Drive…');
      try {
        await reconcile(acceptBoth);
      } catch (error) {
        reportError(error);
      } finally {
        busy = false;
        app.showStatus();
      }
    }

    function queue() {
      if (!app.link()) return;
      if (!authorized()) return report('Reconnect Google Drive to sync.');
      if (conflict) return app.showStatus();
      if (!busy) report('Drive sync pending.');
      clearTimeout(timer);
      timer = setTimeout(() => sync(), 1800);
    }

    function chooseFolder() {
      const picker = google.picker;
      const folders = new picker.DocsView(picker.ViewId.FOLDERS)
        .setIncludeFolders(true).setSelectFolderEnabled(true).setMode(picker.DocsViewMode.LIST);
      const dialog = new picker.PickerBuilder().setTitle('Choose My Drive → DND')
        .setDeveloperKey(config.apiKey).setAppId(config.projectNumber).setOAuthToken(token)
        .setOrigin(location.origin).addView(folders).setCallback(async result => {
          const action = result[picker.Response.ACTION];
          if (action === picker.Action.CANCEL) {
            busy = false;
            return report('Folder selection canceled.');
          }
          if (action !== picker.Action.PICKED) return;
          const folderId = result[picker.Response.DOCUMENTS]?.[0]?.[picker.Document.ID];
          if (!idPattern.test(folderId || '')) {
            busy = false;
            return report('Choose a folder to continue.');
          }
          report('Opening your Arcanum save…');
          try {
            await linkFolder(folderId);
          } catch (error) {
            return reportError(error);
          } finally {
            busy = false;
            app.showStatus();
          }
          await sync();
        }).build();
      dialog.setVisible(true);
      busy = true;
      report('Select your DND folder in Google Drive.');
    }

    async function connect() {
      if (!configured || busy || preparing) return;
      if (!pickerReady) {
        preparing = true;
        report('Loading Google Drive…');
        try {
          await Promise.all([
            window.google?.accounts?.oauth2 || loadScript('https://accounts.google.com/gsi/client'),
            window.gapi || loadScript('https://apis.google.com/js/api.js'),
          ]);
          await new Promise((resolve, reject) => gapi.load('picker', {
            callback: resolve,
            onerror: () => reject(new Error('Google Picker failed to load. Try again.')),
            timeout: 15000,
            ontimeout: () => reject(new Error('Google Picker timed out. Try again.')),
          }));
          pickerReady = true;
          report('Continue with Google to connect.');
        } catch (error) {
          report(error.message);
        } finally {
          preparing = false;
          app.showStatus();
        }
        return;
      }
      if (authorized() && !app.link()) {
        try { chooseFolder(); } catch (error) { report(error.message); }
        return;
      }
      busy = true;
      report('Waiting for Google…');
      try {
        const client = google.accounts.oauth2.initTokenClient({
          client_id: config.clientId, scope, include_granted_scopes: false,
          callback: async response => {
            busy = false;
            if (!response.access_token || !google.accounts.oauth2.hasGrantedAllScopes(response, scope)) {
              return report('Drive access was not granted. Local autosave is active.');
            }
            token = response.access_token;
            expires = Date.now() + Math.max(0, Number(response.expires_in) - 30) * 1000;
            const link = app.link();
            if (link) {
              conflict = false;
              busy = true;
              report('Checking the Drive folder…');
              try {
                if (await findDocument(link.folderId) !== link.id) {
                  throw new Error('The linked save has moved or is unavailable. Disconnect and select its folder again.');
                }
              } catch (error) {
                token = '';
                return report(error.message);
              } finally {
                busy = false;
                app.showStatus();
              }
              await sync();
            }
            else {
              report('Select your DND folder in Google Drive.');
              try { chooseFolder(); } catch (error) { report(error.message); }
            }
          },
          error_callback: () => {
            busy = false;
            report('Google sign-in was interrupted. Try connecting again.');
          },
        });
        client.requestAccessToken({prompt: 'select_account'});
      } catch (error) {
        busy = false;
        report(error.message);
      }
    }

    function backgroundSync() {
      if (app.link() && !document.hidden) sync();
    }

    if (configured) {
      setInterval(backgroundSync, 30000);
      window.addEventListener('online', backgroundSync);
      document.addEventListener('visibilitychange', backgroundSync);
    }

    return {
      connect, queue, sync,
      status: () => status,
      headline() {
        if (conflict) return 'Drive conflict';
        if (!authorized()) return 'Reconnect Drive';
        if (status === 'Synced to Google Drive.') return 'Synced to Drive';
        if (busy) return 'Syncing…';
        return 'Saved locally';
      },
      configured,
      button() {
        if (conflict && authorized()) return 'Keep both versions';
        if (authorized() && app.link()) return 'Sync now';
        if (authorized()) return 'Choose Drive folder';
        return pickerReady ? 'Continue with Google' : 'Connect Google Drive';
      },
      disabled: () => busy || preparing,
      activate() {
        if (!authorized() || !app.link()) return connect();
        if (conflict && !confirm('Keep all characters from Drive and this device? Differing versions of the same character will appear as separate copies.')) return;
        return sync(conflict);
      },
      disconnect() {
        if (busy || !confirm('Disconnect Google Drive on this device? Your local characters and Drive document will be kept.')) return;
        token = '';
        conflict = false;
        app.setLink(null);
        report('Google Drive disconnected. Local autosave is active.');
      },
    };
  };
})();
