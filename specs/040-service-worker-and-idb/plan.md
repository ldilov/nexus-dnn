# Implementation Plan — Spec 040: Service Worker SSE Broker + IndexedDB Persistence

**Branch:** `040-service-worker-and-idb`
**Status:** Plan (Phase 3 — Develop)
**Last updated:** 2026-05-07

## Architecture overview

Two cooperating client-side subsystems plus a thin registration layer.

```
┌─────────────────────────────────────────────────────────────────────┐
│  Page (apps/web)                                                    │
│  ┌──────────────────────────┐    ┌──────────────────────────────┐   │
│  │ chat_panel_adapter.tsx   │    │ composer (in ChatSurface)    │   │
│  │  ├─ useChatHistoryCache  │    │  └─ useComposerDraft         │   │
│  │  ├─ useRuntimeLeader     │    │                              │   │
│  │  └─ streamMessage()  ────┼────┼──→  fetch(/v1/chat/...) ─────┼─┐ │
│  └──────────────────────────┘    └──────────────────────────────┘ │ │
│                                                                    │ │
│  apps/web/src/services/idb/         apps/web/src/services/sw_…/    │ │
│  ├─ db.ts            (openDB)       ├─ sw_registration.ts         │ │
│  ├─ chat_history.ts  (US4)          └─ controller_status.ts        │ │
│  ├─ composer_drafts.ts (US5)                                       │ │
│  ├─ runtime_leaders.ts (US1)                                       │ │
│  └─ stream_deltas.ts (US2/US3)                                     │ │
│                                                                    │ │
│  apps/web/src/sw/                                                  │ │
│  ├─ index.ts         (entry, fetch handler)  ←─────────────────────┘ │
│  ├─ sse_broker.ts    (fan-out, persistence)                          │
│  ├─ runtime_lock.ts  (Web Locks election, IDB metadata pub)          │
│  └─ kill_switch.ts   (separate compiled SW; unregister-only)         │
└─────────────────────────────────────────────────────────────────────┘
```

The Service Worker source files at `apps/web/src/sw/` are compiled by `vite-plugin-pwa` (`injectManifest` strategy) into `sw.js` + `sw-kill.js` at the dist root. The page imports nothing from `apps/web/src/sw/` directly — those files run in the SW context. Communication is via `BroadcastChannel` (one channel per topic: `nexus-sse-broker`, `nexus-runtime-leader`) and IndexedDB.

## Tech choices

| Concern | Pick | Rationale |
|---|---|---|
| IDB Promise wrapper | `idb` (Jake Archibald) | ~1.5 KB gzipped; mature TS types; the de-facto standard. |
| SW build | `vite-plugin-pwa@^0.20` w/ `injectManifest` | Hand-written SW source survives; precache manifest auto-injected. |
| Cross-tab broadcast | `BroadcastChannel` | Universally supported (Chrome/Firefox/Safari/Edge); zero deps. |
| Single-leader election | `navigator.locks.request(name, { mode: "exclusive" }, cb)` | Releases automatically on tab close — solves the heartbeat-only-fails-on-crash problem. |
| Schema validation at IDB boundary | `zod@^3` | Already in repo (added in spec 027); runtime validation of cache rows. |
| Fetch interception | Native `FetchEvent.respondWith` + `TransformStream` | No library; simple. |

No new workspace deps beyond `idb`, `vite-plugin-pwa`, `workbox-window`. Total bundle delta ≈ 10 KB gzipped (`idb` ~1.5 KB; SW source itself ~6 KB after minification per spec SC-011 budget).

## Data contracts (IDB schema v1)

### `nexus-chat-threads`
- `keyPath: ["deploymentId", "threadId"]`
- Value: `{ deploymentId, threadId, title, createdAt, updatedAt, lastMessagePreview, cachedAt }`
- No secondary indexes needed; reads are by primary key or full-scan filtered by `deploymentId`.

### `nexus-chat-messages`
- `keyPath: ["deploymentId", "threadId", "messageId"]`
- Value: `{ deploymentId, threadId, messageId, role, content, createdAt, status, cachedAt }`
- Index `by_thread_created`: `["deploymentId", "threadId", "createdAt"]` for ordered reads.

### `nexus-composer-drafts`
- `keyPath: ["deploymentId", "threadId"]`
- Value: `{ deploymentId, threadId, text, updatedAt }`

### `nexus-stream-deltas`
- `keyPath: ["deploymentId", "threadId", "requestId", "sequenceNumber"]`
- Value: `{ deploymentId, threadId, requestId, sequenceNumber, chunk, timestamp, status }`
- Index `by_request`: `["deploymentId", "threadId", "requestId"]` for ordered replay.

### `nexus-runtime-leaders`
- `keyPath: ["deploymentId", "modelKey"]`
- Value: `{ deploymentId, modelKey, leaderTabId, port, pid, claimedAt, heartbeatAt }`

## Message protocol

### `BroadcastChannel("nexus-sse-broker")`
Messages tagged by `(deploymentId, threadId, requestId)` topic:
- `{ type: "delta", topic, sequenceNumber, chunk }`
- `{ type: "done", topic }`
- `{ type: "error", topic, message }`

### `BroadcastChannel("nexus-runtime-leader")`
- `{ type: "leader_claimed", deploymentId, modelKey, leaderTabId, port, pid }`
- `{ type: "leader_released", deploymentId, modelKey, leaderTabId }`
- `{ type: "heartbeat", deploymentId, modelKey, leaderTabId, heartbeatAt }`

## Staging strategy

Per Codex review, staged delivery in this order to limit blast radius:

| Milestone | Scope | User stories | Risk profile |
|---|---|---|---|
| **M1 — Kill switch first** | Vite/PWA wiring, `sw-kill.js`, registration helper with feature flag, no-op default registration | US6 | Lowest — adds deps + bootstrap, registers nothing |
| **M2 — IDB foundation** | `db.ts` + 5 store wrappers + Zod schemas + tests | (foundation) | Low — pure JS, testable in jsdom |
| **M3 — IDB consumers** | `chat_panel_adapter` cache reads, composer autosave | US4 + US5 | Low — falls back gracefully on IDB unavailable |
| **M4 — SW broker** | SW entry + sse_broker + runtime_lock + streamMessage rewire | US1 + US2 + US3 | Highest — production registration; kill-switch is the safety net |

If M4 misbehaves in any way, swap registration URL to `sw-kill.js` and ship a hotfix; M1–M3 keep working.

## Test plan

Per project rules: ≥80% coverage, TDD where natural, vitest for unit, Playwright for E2E.

- **M1**: vitest unit on `sw_registration.ts` (mocking `navigator.serviceWorker`). No real SW registration in tests.
- **M2**: vitest unit on each IDB store wrapper using `fake-indexeddb` (already in repo via `vitest`'s jsdom). Round-trip every store. Schema upgrade test (v0 → v1).
- **M3**: vitest unit + adapter integration test. Mock IDB; assert read-through + reconcile.
- **M4**: vitest unit on `sse_broker.ts` (use `MessageChannel` polyfill). Playwright E2E for two-tab single-spawn (`chat/runtime_status` PID parity assertion).

## Boundary audit

After M4 lands, run:

```bash
# Generic chat surface unchanged
grep -rn "local-llm\|local_llm" apps/web/src/components/chat/ | wc -l   # MUST be 0

# Generic SW + IDB layers carry no extension IDs
grep -rn "local-llm\|local_llm\|nexus-runtime\|nexus-stream\|nexus-chat\|nexus-composer" apps/web/src/sw/        # MUST be 0
grep -rn "local-llm\|local_llm" apps/web/src/services/idb/                                                       # MUST be 0
```

(The store names `nexus-stream-deltas` etc. are generic — they begin with `nexus-`, not the extension ID.)

## Out of plan scope

- Migrating `streamMessage` from direct `127.0.0.1:<port>` to host-mounted `/api/v1/extensions/nexus.local-llm/inference/stream`.
- Backend single-flight on `setActiveModel`. (Considered alternative; deferred per user choice.)
- WebWorker offload. (User choice 1b excluded.)
- All other items in spec.md "Out of Scope" section.

## Risks and contingencies

- **`idb` package not in dist of Vite 6**: verify `idb` exports correctly under Vite's ESM resolution at first install. If issues, fall back to hand-rolled `IDBRequest` Promise wrapper (~50 LOC).
- **`vite-plugin-pwa` incompatibility with `vanilla-extract` plugin**: the SW research banked compatibility but verify at first build. Contingency: hand-rolled SW build using a separate Vite config + `build.rollupOptions.input` entry.
- **`fake-indexeddb` missing in test deps**: confirm before M2; install as dev-dep if absent.
- **`navigator.locks.request` semantics on Safari**: test with `{ ifAvailable: true }` mode early in M4. If unreliable, fall back to lockless heartbeat-only with a 100 ms acquisition window.

## Quickstart for next contributor

1. `pnpm install` (picks up new deps).
2. `pnpm --filter web dev` works as before — SW NOT registered in dev.
3. `pnpm --filter web build && pnpm --filter web preview` — SW registers; open two browser tabs to verify single-leader behaviour.
4. To unregister a misbehaving SW: visit `chrome://serviceworker-internals` (Chromium) or `about:debugging#workers` (Firefox) and unregister manually. Or change the registered URL to `sw-kill.js` in `sw_registration.ts` and reload.
