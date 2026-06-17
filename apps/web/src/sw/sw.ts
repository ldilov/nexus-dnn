/// <reference lib="webworker" />

import { handleBrokerFetch, shouldIntercept } from "./sse_broker";

declare const self: ServiceWorkerGlobalScope & {
  __WB_MANIFEST: ReadonlyArray<{ revision: string | null; url: string }>;
};

const precacheEntries: ReadonlyArray<{ revision: string | null; url: string }> =
  self.__WB_MANIFEST;
self.addEventListener("message", (event) => {
  if (event.data?.type === "PRECACHE_INFO") {
    event.source?.postMessage({
      type: "PRECACHE_INFO",
      count: precacheEntries.length,
    });
  }
});

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Purge caches left by any previous (precaching) worker version so a
      // stale app shell can never be served after an update.
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.clients.claim();
      // Reload every controlled window so a freshly-activated worker shows the
      // new build immediately — even pages whose JS predates the
      const wins = await self.clients.matchAll({ type: "window" });
      await Promise.all(
        wins.map((client) =>
          "navigate" in client
            ? (client as WindowClient).navigate(client.url).catch(() => undefined)
            : Promise.resolve(undefined),
        ),
      );
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (!shouldIntercept(request)) return;
  event.respondWith(handleBrokerFetch(request));
});

