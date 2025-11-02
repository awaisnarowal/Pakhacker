const CACHE_NAME = 'PakHackerPro-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/Narowaliya/1.html',
    '/manifest.json'
    // Add other critical assets like CSS/JS/icons paths here
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache).catch(err => {
                    console.error('Failed to cache:', err);
                });
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
