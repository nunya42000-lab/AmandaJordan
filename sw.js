const CACHE_NAME = 'merger-cache-v1';
const ASSETS_TO_CACHE = [
  './index.html',
  './manifest.json',
  './icon.png'
];

// Install event: Cache the files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Fetch event: Serve from cache if available
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
