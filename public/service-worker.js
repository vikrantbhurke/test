self.addEventListener("install", () => {
  console.log("ℹ️ [Service Worker] Install");
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  console.log("ℹ️ [Service Worker] Activate");
});

self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
