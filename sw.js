const CACHE = "pc-ac4fb0";
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil((async () => {
  for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k);
  await self.clients.claim();
})()));
// saved copy first (works offline), the network only for what is not saved yet
self.addEventListener("fetch", (e) => e.respondWith((async () => {
  const c = await caches.open(CACHE);
  return (await c.match(e.request, { ignoreSearch:true })) || fetch(e.request);
})()));
