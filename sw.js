const CACHE = 'arcanum-dw2-dice-6';
const RELEASE = '20261125-6';
const ASSETS = ['./', './index.html', './privacy.html', './icon.svg', './manifest.webmanifest',
  ...['styles.css', 'alwyn.css', 'app.js', 'rules-data.js', 'drive-config.js', 'drive-sync.js'].map(path => './' + path + '?v=' + RELEASE)];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE)
    .then(cache => cache.addAll(ASSETS.map(url => new Request(url, {cache:'reload'}))))
    .then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(key => key.startsWith('arcanum-') && key !== CACHE).map(key => caches.delete(key))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  const cacheResponse = response => {
    if (response.ok) {
      const copy = response.clone();
      event.waitUntil(caches.open(CACHE).then(cache => cache.put(event.request, copy)));
    }
    return response;
  };
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(new Request(event.request, {cache:'no-cache'}))
      .then(cacheResponse)
      .catch(async () => (await caches.match(event.request)) || (await caches.match('./index.html'))));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(cacheResponse)));
});
