const CACHE_NAME = 'symmetry-pro-v1';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/logo.svg'
];

// Instalar service worker y cachear archivos iniciales
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activar nuevo service worker y limpiar cachés viejos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});

// Interceptar requests y servir desde caché
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Si está en caché, devolverlo
      if (cachedResponse) {
        return cachedResponse;
      }

      // Si no, hacer fetch y cachearlo
      return fetch(event.request).then((response) => {
        // Solo cachear respuestas exitosas
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      }).catch(() => {
        // Si falla el fetch, devolver una página offline básica
        return new Response('Sin conexión. Por favor revisa tu internet.', {
          status: 503,
          statusText: 'Service Unavailable'
        });
      });
    })
  );
});

// Limpiar caché cuando sea necesario
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.delete(CACHE_NAME).then(() => {
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage('CACHE_CLEARED');
        });
      });
    });
  }
});
