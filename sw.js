const CACHE_NAME = "pakhackerpro-v3"; // Version update
const ASSETS = ["./", "./index.html", "./home.html", "./manifest.json", "./icon/icon-192x192.png", "./icon/icon-512x512.png"];

self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.map((key) => {
    if (key !== CACHE_NAME) return caches.delete(key);
  }))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
