// Bilingual cache with EN + PT images, bumped version
const CACHE_NAME = 'thailanderporto-bilingual-v1';
const OFFLINE_URLS = [
  './','./index.html',
  './styles.css?v=lang1',
  './script.js?v=lang1',
  './manifest.webmanifest',
  './icons/app-icon-192.png','./icons/app-icon-512.png',
  // EN images
  './images/01.png','./images/02.png','./images/03.png','./images/04.png',
  './images/05.png','./images/06.png','./images/07.png','./images/08.png',
  // PT images (upload as 01-pt.png ... 08-pt.png)
  './images/01-pt.png','./images/02-pt.png','./images/03-pt.png','./images/04-pt.png',
  './images/05-pt.png','./images/06-pt.png','./images/07-pt.png','./images/08-pt.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(OFFLINE_URLS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(resp => {
      const clone = resp.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(req, clone));
      return resp;
    }).catch(() => caches.match('./index.html')))
  );
});
