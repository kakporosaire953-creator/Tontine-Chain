/**
 * TontineChain - Service Worker
 * PWA avec cache strategy pour performance offline
 */

const CACHE_NAME = 'tontinechain-v1.0';
const RUNTIME_CACHE = 'tontinechain-runtime';

// Fichiers à mettre en cache au premier chargement
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/assets/css/global.css',
  '/assets/css/style.css',
  '/assets/css/sections.css',
  '/assets/css/theme.css',
  '/assets/css/logo.css',
  '/assets/js/theme.js',
  '/assets/js/premium-animations.js',
  '/assets/js/main.js',
  '/assets/images/logo-tontinechain.jpeg',
  '/manifest.json'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installation...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Mise en cache des fichiers essentiels');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activation...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log('[Service Worker] Suppression ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Stratégie de cache: Network First avec fallback sur Cache
self.addEventListener('fetch', (event) => {
  // Ignorer les requêtes non-GET
  if (event.request.method !== 'GET') return;
  
  // Ignorer les requêtes externes (CDN, etc.)
  if (!event.request.url.startsWith(self.location.origin)) return;
  
  event.respondWith(
    caches.open(RUNTIME_CACHE).then((cache) => {
      return fetch(event.request)
        .then((response) => {
          // Mettre en cache la réponse si elle est valide
          if (response && response.status === 200) {
            cache.put(event.request, response.clone());
          }
          return response;
        })
        .catch(() => {
          // En cas d'échec réseau, utiliser le cache
          return caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            
            // Si pas de cache, retourner une page offline basique
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }
          });
        });
    })
  );
});

// Gestion des messages du client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Notification de mise à jour disponible
self.addEventListener('controllerchange', () => {
  console.log('[Service Worker] Nouvelle version disponible');
});
