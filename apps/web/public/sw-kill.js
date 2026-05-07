self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      try {
        await self.registration.unregister();
      } catch (_err) {
        /* registration may already be gone */
      }
      const clients = await self.clients.matchAll({ type: "window" });
      for (const client of clients) {
        try {
          if (typeof client.navigate === "function") {
            await client.navigate(client.url);
          }
        } catch (_err) {
          /* navigation may fail across origins; skip */
        }
      }
    })(),
  );
});

self.addEventListener("fetch", () => {
  /* pass-through; do not intercept */
});
