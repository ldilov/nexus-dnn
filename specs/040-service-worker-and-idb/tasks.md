# Tasks — Spec 040: Service Worker SSE Broker + IndexedDB Persistence

**Branch:** `040-service-worker-and-idb`
**Total estimate:** 52 tasks across 4 milestones (M1 → M4) + Phase 4 validation.
**TDD discipline:** tests-first inside each milestone; commit at milestone boundaries.

Legend: `[ ]` todo · `[X]` done · `[~]` deferred · `[!]` blocked

---

## M1 — Kill switch + SW registration foundation (US6)

- [ ] **T001** Add `idb`, `vite-plugin-pwa`, `workbox-window`, `fake-indexeddb` (devDep) to `apps/web/package.json`. Run `pnpm install`.
- [ ] **T002** Update `apps/web/vite.config.ts` to include `vite-plugin-pwa` with `injectManifest` strategy, `srcDir: "src/sw"`, `filename: "index.ts"`, `devOptions.enabled: false`.
- [ ] **T003** Write `apps/web/src/sw/kill_switch.ts` — `install` calls `self.registration.unregister()`; activates with `clients.claim()`.
- [ ] **T004** Write `apps/web/src/sw/index.ts` stub — feature-flagged. By default it does nothing (no fetch handler). Real broker logic lands in M4.
- [ ] **T005** Write `apps/web/src/services/sw_registration.ts` — `registerServiceWorker(url: string)` with feature-detect + try/catch + diagnostic logging. Exports also `unregisterAll()`.
- [ ] **T006** Vitest: `sw_registration.test.ts` — mock `navigator.serviceWorker` and `register()`; assert no-op when undefined; assert error is logged not thrown; assert kill-switch URL path works.
- [ ] **T007** Wire registration into `apps/web/src/main.tsx` (or wherever the React root mounts) — register `sw.js` only when `import.meta.env.PROD === true`. Dev never registers.
- [ ] **T008** `pnpm --filter web build` produces `dist/sw.js` and `dist/sw-kill.js`. Verify via `ls dist/`.
- [ ] **T009** Manual smoke: `pnpm --filter web preview`, open DevTools → Application → Service Workers, confirm `sw.js` is registered. Switch registration to `sw-kill.js`, hard-reload, confirm previous SW is unregistered.
- [ ] **T010** Commit M1: `feat(web): SW kill-switch + registration helper + Vite/PWA setup (spec 040 M1)`.

---

## M2 — IndexedDB foundation (5 stores + tests)

- [ ] **T011** Write `apps/web/src/services/idb/db.ts` — `openNexusDb()` using `idb`'s `openDB("nexus-dnn", 1, { upgrade })`. Define version-1 schema: 5 stores with the keyPaths/indexes from plan.md.
- [ ] **T012** Write `apps/web/src/services/idb/schemas.ts` — Zod schemas for each row type (`ChatThreadCacheRow`, `ChatMessageCacheRow`, `ComposerDraftRow`, `StreamDeltaRow`, `RuntimeLeaderRow`).
- [ ] **T013** Write `apps/web/src/services/idb/chat_history.ts` — `getCachedThreads(deploymentId)`, `putCachedThreads(...)`, `getCachedMessages(deploymentId, threadId)`, `putCachedMessages(...)`, `removeCachedThread(...)`.
- [ ] **T014** Write `apps/web/src/services/idb/composer_drafts.ts` — `getDraft(deploymentId, threadId)`, `putDraft(...)`, `deleteDraft(...)`.
- [ ] **T015** Write `apps/web/src/services/idb/stream_deltas.ts` — `appendDelta(row)`, `getDeltasByRequest(deploymentId, threadId, requestId)`, `markCompleted(...)`, `markAbandoned(...)`, `evictOlderThan(timestamp)`.
- [ ] **T016** Write `apps/web/src/services/idb/runtime_leaders.ts` — `getLeader(deploymentId, modelKey)`, `claimLeader(row)`, `updateHeartbeat(...)`, `releaseLeader(...)`.
- [ ] **T017** Vitest: `db.test.ts` — opens fresh DB on `fake-indexeddb`, verifies all 5 stores exist with correct indexes, verifies upgrade idempotency (open twice).
- [ ] **T018** Vitest: `chat_history.test.ts` — round-trip: `putCachedThreads` then `getCachedThreads` returns same rows; `putCachedMessages` ordered by `createdAt` index.
- [ ] **T019** Vitest: `composer_drafts.test.ts` — empty draft is deleted (FR-016); non-empty round-trips; multi-thread isolation.
- [ ] **T020** Vitest: `stream_deltas.test.ts` — append in random sequence-number order, replay returns sorted; `markCompleted` flips status; `evictOlderThan` deletes only old rows.
- [ ] **T021** Vitest: `runtime_leaders.test.ts` — `claimLeader` upserts; `updateHeartbeat` only changes `heartbeatAt`; `releaseLeader` deletes the row.
- [ ] **T022** Commit M2: `feat(web): IDB foundation — 5 stores + Zod schemas + 5 vitest suites (spec 040 M2)`.

---

## M3 — IDB consumers: chat history cache + draft autosave (US4 + US5)

- [ ] **T023** Write `apps/web/src/hooks/use_chat_history_cache.ts` — `useChatHistoryCache(deploymentId, threadId)` hook. On mount: read IDB, return cached state immediately. In background: fire `listThreads`/`listMessages`, reconcile via shallow-diff.
- [ ] **T024** Vitest: `use_chat_history_cache.test.ts` — 50 ms cache paint; reconcile drops removed rows; reconcile adds new rows without flashing.
- [ ] **T025** Modify `apps/web/src/layout/chat_panel_adapter.tsx` — replace bare `listThreads`/`listMessages` calls with `useChatHistoryCache` reads. Preserve existing AbortController + focus-listener.
- [ ] **T026** Write `apps/web/src/hooks/use_composer_draft.ts` — `useComposerDraft(deploymentId, threadId)` returning `[draft, setDraft]`. 300 ms debounce write to IDB; rehydrate on mount; delete on send.
- [ ] **T027** Vitest: `use_composer_draft.test.ts` — debounce fires after 300 ms; empty draft is deleted; rehydration sub-50ms.
- [ ] **T028** Wire `useComposerDraft` into the composer (locate composer in `apps/web/src/components/chat/composer.tsx` — confirm location with grep before editing). Replace any `sessionStorage` draft path. Keep `sessionStorage` as second-tier fallback when IDB is unavailable (private browsing).
- [ ] **T029** Adapter integration test in `chat_panel_adapter.test.tsx` — mock IDB; assert mount paints from cache before backend call resolves; assert reconcile path.
- [ ] **T030** Manual smoke: open chat surface, refresh, confirm sub-50ms paint of message list (DevTools Performance panel `performance.measure`). Close tab mid-draft, reopen, draft survives.
- [ ] **T031** Commit M3: `feat(web): IDB read-through cache for chat history + durable composer drafts (spec 040 M3)`.

---

## M4 — SW broker: SSE fan-out + Web Locks single-leader (US1 + US2 + US3)

- [ ] **T032** Write `apps/web/src/sw/sse_broker.ts` — `handleBrokerFetch(event)` exported from the SW entry. Parses `(deploymentId, threadId, requestId)` from URL/body. Maintains in-memory `Map<topicKey, BrokerSlot>`.
- [ ] **T033** Inside `sse_broker.ts`: when slot is fresh, open upstream via `fetch(originalRequest)`, tee through `TransformStream`, persist each chunk to IDB store `nexus-stream-deltas`, broadcast via `BroadcastChannel("nexus-sse-broker")`.
- [ ] **T034** Inside `sse_broker.ts`: when slot exists, return synthetic `Response(new ReadableStream(...))` fed by the broadcast channel.
- [ ] **T035** Inside `sse_broker.ts`: on upstream `[DONE]`, mark IDB row `completed`, close broadcast topic, clear slot.
- [ ] **T036** Write `apps/web/src/sw/runtime_lock.ts` — `claimRuntimeLeader(deploymentId, modelKey, spawnFn)` using `navigator.locks.request(name, { mode: "exclusive" }, async () => { /* spawn + IDB write + heartbeat loop */ })`.
- [ ] **T037** Inside `runtime_lock.ts`: heartbeat loop writes `heartbeatAt` to `nexus-runtime-leaders` every 5 s while holding the lock; broadcasts on `BroadcastChannel("nexus-runtime-leader")`.
- [ ] **T038** Write `apps/web/src/services/runtime_leader_follower.ts` (page-side) — `useRuntimeLeader(deploymentId, modelKey)` hook. Subscribes to `BroadcastChannel("nexus-runtime-leader")`. Reads IDB on mount. Returns leader metadata or `null`.
- [ ] **T039** Modify `apps/web/src/services/local_llm_chat.ts` `streamMessage` — when SW is controlling, the existing `fetch` flows through the broker automatically (the SW's fetch handler matches the URL pattern). No code change needed in `streamMessage` itself except adding a `requestId` to the URL or body so the broker can key by it.
- [ ] **T040** Modify `apps/web/src/layout/chat_panel_adapter.tsx` `setActiveModel` call site — wrap with `useRuntimeLeader` check: if a leader exists for the same `(deploymentId, modelKey)`, use the leader's port and skip the spawn; otherwise call `setActiveModel` as today (and the SW's lock will elect us as leader).
- [ ] **T041** Vitest: `sse_broker.test.ts` — using `MessageChannel` + `fake-indexeddb` shims, simulate two parallel fetches for the same `(dep, thread, req)`, assert one upstream open + two synthetic responses; simulate distinct `requestId`s, assert two upstream opens.
- [ ] **T042** Vitest: `runtime_lock.test.ts` — mock `navigator.locks.request`; assert lock callback runs spawnFn; assert heartbeat fires every 5 s; assert IDB write inside callback.
- [ ] **T043** Vitest: `runtime_leader_follower.test.ts` — `useRuntimeLeader` returns IDB row; updates on broadcast.
- [ ] **T044** Adapter integration: mock SW active, mock leader present, assert `setActiveModel` is NOT called.
- [ ] **T045** Wire SW entry: `apps/web/src/sw/index.ts` adds `self.addEventListener("fetch", handleBrokerFetch)` matching only the two URL patterns in spec FR-002.
- [ ] **T046** Manual smoke: open two browser tabs to same deployment, load model in tab A, verify tab B sees ready state without spawning a second `llama-server` (check `chat/runtime_status` for PID parity).
- [ ] **T047** Manual smoke: open four tabs to same `(dep, thread)`, send one request from tab A, verify Network panel shows ONE upstream `/v1/chat/completions` from `ServiceWorker` source.
- [ ] **T048** Manual smoke: send request, close tab mid-stream, reopen new tab, verify partial response renders within 200 ms with "interrupted" affordance.
- [ ] **T049** Commit M4: `feat(web): SW SSE broker + Web Locks single-leader runtime spawn (spec 040 M4)`.

---

## Phase 4 — Deliver: validation + code review + checkpoint

- [ ] **T050** Run `pnpm --filter web exec tsc --noEmit` — 0 errors.
- [ ] **T051** Run `pnpm --filter web vitest run` — all M1–M4 tests pass; pre-existing 6 flaky tests untouched.
- [ ] **T052** Boundary audit grep: `grep -rn "local-llm\|local_llm" apps/web/src/components/chat/ apps/web/src/sw/ apps/web/src/services/idb/` returns zero matches. Add result to commit message.
- [ ] **T053** Bundle delta: `pnpm --filter web build`; record gzipped size of `dist/sw.js` + `dist/sw-kill.js` + new IDB chunks. Confirm under 50 KB total per SC-011.
- [ ] **T054** Dispatch `code-reviewer` agent against the diff for code-quality + security; address CRITICAL/HIGH findings before final commit.
- [ ] **T055** Final docs commit: update `apps/web/README.md` "Architecture" section with SW + IDB references; reference `specs/040-service-worker-and-idb/`.
- [ ] **T056** Mark tasks done in this file; final commit `docs(040): mark spec 040 complete (M1-M4 + validation)`.

---

## Carve-outs (deferred to future specs)

- WebWorker offload (user choice 1b excluded).
- OPFS staging for resumable model uploads.
- File handlers / protocol handlers.
- Background Sync / Push API / Periodic Sync.
- Backend single-flight on `setActiveModel`.
- Migrating `streamMessage` to host-mounted route.
- Push notifications.
- WebTransport SSE replacement.
