const CACHE_NAME = 'PakHackerPro-v8'; // Increased version for fresh download
const urlsToCache = [
    '/Pakhacker/', 
    '/Pakhacker/index.html',
    '/Pakhacker/Narowaliya/1.html',
    '/Pakhacker/manifest.json',
    '/Pakhacker/icons/icon-192x192.png',
    '/Pakhacker/icons/icon-512x512.png'
];

self.addEventListener('install', event => {
    self.skipWaiting(); // Force the new Service Worker to start immediately
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
                        // Delete old caches (v7, v6, etc.)
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
                // Return from cache if found
                if (response) {
                    return response;
                }
                // Fetch from network if not in cache
                return fetch(event.request);
            })
    );
});

// Logic to handle the 'skipWaiting' command from the frontend (for "Check for Update" button)
self.addEventListener('message', function(event) {
  if (event.data && event.data.action === 'skipWaiting') {
      console.log('Skip waiting command received.');
    self.skipWaiting();
  }
});
