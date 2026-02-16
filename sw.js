const CACHE_NAME = 'php-no-cache-v2.1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map(key => caches.delete(key)));
    })
  );
  self.clients.claim();
});

// Network Only Strategy - No Offline Storage
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => null)
  );
});
