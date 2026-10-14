
const CACHE_NAME = "swapnochura-v1";

const APP_FILES = [
  "./",
  "./index.html",
  "./manifest.webmanifest"
];

// Service Worker ইনস্টল
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_FILES))
      .then(() => self.skipWaiting())
  );
});

// পুরোনো ক্যাশ পরিষ্কার
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// নেটওয়ার্ক না থাকলে ক্যাশ থেকে দেখানোর চেষ্টা
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (
          response.ok &&
          new URL(event.request.url).origin === self.location.origin
        ) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, copy);
          });
        }
        return response;
      })
      .catch(() =>
        caches.match(event.request).then(
          (cached) => cached || (
            event.request.mode === "navigate"
              ? caches.match("./index.html")
              : undefined
          )
        )
      )
  );
});
