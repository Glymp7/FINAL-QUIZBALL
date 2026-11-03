// Quizball service worker: κρατάει το παιχνίδι διαθέσιμο και offline.
// Άλλαξε τον αριθμό έκδοσης όταν ανεβάζεις νέες ερωτήσεις, για να φορτώσουν σίγουρα.
const CACHE = 'quizball-2026-11-03';
const CORE = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './logos/var.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  // Σελίδα: πρώτα δίκτυο (για να έρχονται οι νέες ερωτήσεις), αλλιώς cache.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(res => { caches.open(CACHE).then(c => c.put('./index.html', res.clone())); return res; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }
  // Εικόνες/γραμματοσειρές/σήματα: πρώτα cache, μετά δίκτυο.
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res && (res.ok || res.type === 'opaque')) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
      }
      return res;
    }).catch(() => hit))
  );
});
