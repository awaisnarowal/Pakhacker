const CACHE_NAME = 'PakHackerPro-v10.3'; // Version increased for fresh download
const urlsToCache = [
    '/Pakhacker/', 
    '/Pakhacker/index.html',
    '/Pakhacker/Narowaliya/1.html',
    '/Pakhacker/manifest.json',
    '/Pakhacker/icons/icon-192x192.png',
    '/Pakhacker/icons/icon-512x512.png',
    
    // External URL Added for Caching (CORS permitting)
    'https://shadowpaksim.xyz/shadowsim1shadowprivate.php' 
];

self.addEventListener('install', event => {
    self.skipWaiting(); 
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache and adding assets.');
                return cache.addAll(urlsToCache).catch(err => {
                    console.error('Failed to cache all required assets (especially external links):', err);
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

self.addEventListener('message', function(event) {
  if (event.data && event.data.action === 'skipWaiting') {
      console.log('Skip waiting command received.');
    self.skipWaiting();
  }
});
