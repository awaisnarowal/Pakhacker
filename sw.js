const CACHE_NAME = 'PakHackerPro-v3'; 
const urlsToCache = [
    '/Pakhacker/', 
    '/Pakhacker/index.html',
    '/Pakhacker/Narowaliya/1.html',
    '/Pakhacker/manifest.json',
    '/Pakhacker/icons/icon-192x192.png',
    '/Pakhacker/icons/icon-512x512.png'
];

self.addEventListener('install', event => {
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
