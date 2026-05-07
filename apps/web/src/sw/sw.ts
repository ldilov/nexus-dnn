/// <reference lib="webworker" />

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
  event.waitUntil(self.clients.claim());
});

