const CACHE_NAME = 'PakHackerPro-v6'; // Version increased to force re-download
const urlsToCache = [
    '/Pakhacker/', 
    '/Pakhacker/index.html',
    '/Pakhacker/Narowaliya/1.html',
    '/Pakhacker/manifest.json',
    '/Pakhacker/icons/icon-192x192.png',
    '/Pakhacker/icons/icon-512x512.png'
];

self.addEventListener('install', event => {
    // Force the new Service Worker to start immediately instead of waiting
    self.skipWaiting(); 
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache and adding assets.');
                return cache.addAll(urlsToCache).catch(err => {
                    console.error('Failed to cache required assets:', err);
                });
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        // Delete old caches
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// New logic to handle the 'Check for Update' button click
self.addEventListener('message', function(event) {
  if (event.data && event.data.action === 'skipWaiting') {
      console.log('Skip waiting command received.');
    self.skipWaiting();
  }
});
