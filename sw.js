// sw.js — basic offline cache (secrets-safe)
const CACHE = 'live-quiz-v2';
const CORE_ASSETS = [
  './','./index.html','./style.css','./app.js','./firebase.js','./firebase.config.js','./manifest.json',
  './icons/icon-192.png','./icons/icon-512.png','./icons/icon-1024-maskable.png'
];
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c)=>c.addAll(CORE_ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE?caches.delete(k):null))));
  self.clients.claim();
});
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const isStatic = req.mode === 'navigate' || ['style','script','image','manifest','document'].includes(req.destination);
  if (isStatic) {
    event.respondWith(
      caches.match(req).then(cached => cached || fetch(req).then(res => {
        const clone = res.clone(); caches.open(CACHE).then(c=>c.put(req, clone)); return res;
      }).catch(()=>caches.match('./index.html')))
    );
  } else {
    event.respondWith(fetch(req).catch(()=>caches.match(req)));
  }
});
