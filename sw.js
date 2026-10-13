const CACHE = "combustivel-v17";
const FILES = [
  "./", "./index.html", "./style.css", "./app.js",
  "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  if (new URL(req.url).origin !== self.location.origin) return;

  e.respondWith(
    fetch(req)
      .then(r => {
        if (r && r.status === 200 && r.type === "basic") {
          const copy = r.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return r;
      })
      .catch(() =>
        caches.match(req).then(hit => hit || (req.mode === "navigate" ? caches.match("./index.html") : undefined))
      )
  );
});
