// sw.js — basic offline cache (workbox 없이 간단 버전)
const CACHE = 'live-quiz-v1-' + (self.registration ? self.registration.scope : Math.random());
const CORE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './firebase.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-1024-maskable.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => (k.startsWith('live-quiz-v1-') && k !== CACHE) ? caches.delete(k) : null)))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  // Network-first for Firestore requests, Cache-first for static
  const isStatic = req.mode === 'navigate' || req.destination === 'document' || req.destination === 'style' || req.destination === 'script' || req.destination === 'image' || req.destination === 'manifest';
  if (isStatic) {
    event.respondWith(
      caches.match(req).then(cached => cached || fetch(req).then(res => {
        const resClone = res.clone();
        caches.open(CACHE).then(c => c.put(req, resClone));
        return res;
      }).catch(() => caches.match('./index.html')))
    );
  } else {
    // Default: try network, fallback cache
    event.respondWith(
      fetch(req).catch(() => caches.match(req))
    );
  }
});
