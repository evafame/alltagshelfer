const CACHE_NAME = 'alltagshelfer-cache-v1';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/styles/base.css',
  '/offline.html'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(CORE_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  const request = e.request;
  if (request.method !== 'GET') return;
  e.respondWith(
    caches.match(request).then((resp) => resp || fetch(request).catch(() => caches.match('/offline.html')))
  );
});
