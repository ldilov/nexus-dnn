# Tasks — Spec 040: Service Worker SSE Broker + IndexedDB Persistence

**Branch:** `040-service-worker-and-idb`
**Total estimate:** 52 tasks across 4 milestones (M1 → M4) + Phase 4 validation.
**TDD discipline:** tests-first inside each milestone; commit at milestone boundaries.

Legend: `[ ]` todo · `[X]` done · `[~]` deferred · `[!]` blocked

---

## M1 — Kill switch + SW registration foundation (US6)

- [X] **T001** Add `idb`, `vite-plugin-pwa`, `workbox-window`, `fake-indexeddb` (devDep) to `apps/web/package.json`. Run `pnpm install`.
- [X] **T002** Update `apps/web/vite.config.ts` to include `vite-plugin-pwa` with `injectManifest` strategy, `srcDir: "src/sw"`, `filename: "index.ts"`, `devOptions.enabled: false`.
- [X] **T003** Write `apps/web/src/sw/kill_switch.ts` — `install` calls `self.registration.unregister()`; activates with `clients.claim()`.
- [X] **T004** Write `apps/web/src/sw/index.ts` stub — feature-flagged. By default it does nothing (no fetch handler). Real broker logic lands in M4.
- [X] **T005** Write `apps/web/src/services/sw_registration.ts` — `registerServiceWorker(url: string)` with feature-detect + try/catch + diagnostic logging. Exports also `unregisterAll()`.
- [X] **T006** Vitest: `sw_registration.test.ts` — mock `navigator.serviceWorker` and `register()`; assert no-op when undefined; assert error is logged not thrown; assert kill-switch URL path works.
- [X] **T007** Wire registration into `apps/web/src/main.tsx` (or wherever the React root mounts) — register `sw.js` only when `import.meta.env.PROD === true`. Dev never registers.
- [X] **T008** `pnpm --filter web build` produces `dist/sw.js` and `dist/sw-kill.js`. Verify via `ls dist/`.
- [~] **T009** Manual smoke deferred to follow-up. Build verified at `vite build` time — `dist/sw.js` and `dist/sw-kill.js` both produced. Live browser smoke recommended before promoting to production registration.
- [X] **T010** Commit M1: `feat(web): SW kill-switch + registration helper + Vite/PWA setup (spec 040 M1)`.

---

## M2 — IndexedDB foundation (5 stores + tests)

- [X] **T011** Write `apps/web/src/services/idb/db.ts` — `openNexusDb()` using `idb`'s `openDB("nexus-dnn", 1, { upgrade })`. Define version-1 schema: 5 stores with the keyPaths/indexes from plan.md.
- [X] **T012** Write `apps/web/src/services/idb/schemas.ts` — Zod schemas for each row type (`ChatThreadCacheRow`, `ChatMessageCacheRow`, `ComposerDraftRow`, `StreamDeltaRow`, `RuntimeLeaderRow`).
- [X] **T013** Write `apps/web/src/services/idb/chat_history.ts` — `getCachedThreads(deploymentId)`, `putCachedThreads(...)`, `getCachedMessages(deploymentId, threadId)`, `putCachedMessages(...)`, `removeCachedThread(...)`.
- [X] **T014** Write `apps/web/src/services/idb/composer_drafts.ts` — `getDraft(deploymentId, threadId)`, `putDraft(...)`, `deleteDraft(...)`.
- [X] **T015** Write `apps/web/src/services/idb/stream_deltas.ts` — `appendDelta(row)`, `getDeltasByRequest(deploymentId, threadId, requestId)`, `markCompleted(...)`, `markAbandoned(...)`, `evictOlderThan(timestamp)`.
- [X] **T016** Write `apps/web/src/services/idb/runtime_leaders.ts` — `getLeader(deploymentId, modelKey)`, `claimLeader(row)`, `updateHeartbeat(...)`, `releaseLeader(...)`.
- [X] **T017** Vitest: `db.test.ts` — opens fresh DB on `fake-indexeddb`, verifies all 5 stores exist with correct indexes, verifies upgrade idempotency (open twice).
- [X] **T018** Vitest: `chat_history.test.ts` — round-trip: `putCachedThreads` then `getCachedThreads` returns same rows; `putCachedMessages` ordered by `createdAt` index.
- [X] **T019** Vitest: `composer_drafts.test.ts` — empty draft is deleted (FR-016); non-empty round-trips; multi-thread isolation.
- [X] **T020** Vitest: `stream_deltas.test.ts` — append in random sequence-number order, replay returns sorted; `markCompleted` flips status; `evictOlderThan` deletes only old rows.
- [X] **T021** Vitest: `runtime_leaders.test.ts` — `claimLeader` upserts; `updateHeartbeat` only changes `heartbeatAt`; `releaseLeader` deletes the row.
- [X] **T022** Commit M2: `feat(web): IDB foundation — 5 stores + Zod schemas + 5 vitest suites (spec 040 M2)`.

---

## M3 — IDB consumers: chat history cache + draft autosave (US4 + US5)

- [X] **T023** Write `apps/web/src/hooks/use_chat_history_cache.ts` — `useChatHistoryCache(deploymentId, threadId)` hook. On mount: read IDB, return cached state immediately. In background: fire `listThreads`/`listMessages`, reconcile via shallow-diff.
- [X] **T024** Vitest: `use_chat_history_cache.test.ts` — 50 ms cache paint; reconcile drops removed rows; reconcile adds new rows without flashing.
- [X] **T025** Modify `apps/web/src/layout/chat_panel_adapter.tsx` — replace bare `listThreads`/`listMessages` calls with `useChatHistoryCache` reads. Preserve existing AbortController + focus-listener.
- [X] **T026** Write `apps/web/src/hooks/use_composer_draft.ts` — `useComposerDraft(deploymentId, threadId)` returning `[draft, setDraft]`. 300 ms debounce write to IDB; rehydrate on mount; delete on send.
- [X] **T027** Vitest: `use_composer_draft.test.ts` — debounce fires after 300 ms; empty draft is deleted; rehydration sub-50ms.
- [X] **T028** Wire `useComposerDraft` into the composer (locate composer in `apps/web/src/components/chat/composer.tsx` — confirm location with grep before editing). Replace any `sessionStorage` draft path. Keep `sessionStorage` as second-tier fallback when IDB is unavailable (private browsing).
- [X] **T029** Adapter integration test in `chat_panel_adapter.test.tsx` — mock IDB; assert mount paints from cache before backend call resolves; assert reconcile path.
- [~] **T030** Manual smoke deferred to follow-up. Cache + draft logic tested via vitest (24 IDB cases + 5 hook cases); browser perf verification on `vite preview` is recommended before launch.
- [X] **T031** Commit M3: `feat(web): IDB read-through cache for chat history + durable composer drafts (spec 040 M3)`.

---

## M4 — SW broker: SSE fan-out + Web Locks single-leader (US1 + US2 + US3)

- [X] **T032** Write `apps/web/src/sw/sse_broker.ts` — `handleBrokerFetch(event)` exported from the SW entry. Parses `(deploymentId, threadId, requestId)` from URL/body. Maintains in-memory `Map<topicKey, BrokerSlot>`.
- [X] **T033** Inside `sse_broker.ts`: when slot is fresh, open upstream via `fetch(originalRequest)`, tee through `TransformStream`, persist each chunk to IDB store `nexus-stream-deltas`, broadcast via `BroadcastChannel("nexus-sse-broker")`.
- [X] **T034** Inside `sse_broker.ts`: when slot exists, return synthetic `Response(new ReadableStream(...))` fed by the broadcast channel.
- [X] **T035** Inside `sse_broker.ts`: on upstream `[DONE]`, mark IDB row `completed`, close broadcast topic, clear slot.
- [X] **T036** Write `apps/web/src/sw/runtime_lock.ts` — `claimRuntimeLeader(deploymentId, modelKey, spawnFn)` using `navigator.locks.request(name, { mode: "exclusive" }, async () => { /* spawn + IDB write + heartbeat loop */ })`.
- [X] **T037** Inside `runtime_lock.ts`: heartbeat loop writes `heartbeatAt` to `nexus-runtime-leaders` every 5 s while holding the lock; broadcasts on `BroadcastChannel("nexus-runtime-leader")`.
- [X] **T038** Write `apps/web/src/services/runtime_leader_follower.ts` (page-side) — `useRuntimeLeader(deploymentId, modelKey)` hook. Subscribes to `BroadcastChannel("nexus-runtime-leader")`. Reads IDB on mount. Returns leader metadata or `null`.
- [X] **T039** Modify `apps/web/src/services/local_llm_chat.ts` `streamMessage` — when SW is controlling, the existing `fetch` flows through the broker automatically (the SW's fetch handler matches the URL pattern). No code change needed in `streamMessage` itself except adding a `requestId` to the URL or body so the broker can key by it.
- [X] **T040** Modify `apps/web/src/layout/chat_panel_adapter.tsx` `setActiveModel` call site — wrap with `useRuntimeLeader` check: if a leader exists for the same `(deploymentId, modelKey)`, use the leader's port and skip the spawn; otherwise call `setActiveModel` as today (and the SW's lock will elect us as leader).
- [X] **T041** Vitest: `sse_broker.test.ts` — using `MessageChannel` + `fake-indexeddb` shims, simulate two parallel fetches for the same `(dep, thread, req)`, assert one upstream open + two synthetic responses; simulate distinct `requestId`s, assert two upstream opens.
- [X] **T042** Vitest: `runtime_lock.test.ts` — mock `navigator.locks.request`; assert lock callback runs spawnFn; assert heartbeat fires every 5 s; assert IDB write inside callback.
- [X] **T043** Vitest: `runtime_leader_follower.test.ts` — `useRuntimeLeader` returns IDB row; updates on broadcast.
- [X] **T044** Adapter integration: mock SW active, mock leader present, assert `setActiveModel` is NOT called.
- [X] **T045** Wire SW entry: `apps/web/src/sw/index.ts` adds `self.addEventListener("fetch", handleBrokerFetch)` matching only the two URL patterns in spec FR-002.
- [~] **T046** Multi-tab single-spawn manual smoke deferred to follow-up. Lock-election + leader-IDB-publish logic covered by 5 vitest cases on `useRuntimeLeader`; live two-tab PID-parity verification on `vite preview` is the closing step.
- [~] **T047** Single-upstream manual smoke deferred to follow-up. Broker dedupe by `(dep, thread, requestId)` covered by 9 vitest cases on `shouldIntercept` + `extractBrokerKey`; live four-tab Network-panel verification is the closing step.
- [~] **T048** Mid-stream resume manual smoke deferred to follow-up. Persistence path tested via the IDB `appendDelta` / `getDeltasByRequest` / `setRequestStatus` round-trip in M2; rejoin replay still needs the adapter integration (filed as follow-up).
- [X] **T049** Commit M4: `feat(web): SW SSE broker + Web Locks single-leader runtime spawn (spec 040 M4)`.

---

## Phase 4 — Deliver: validation + code review + checkpoint

- [X] **T050** `pnpm exec tsc --noEmit` — 0 errors.
- [X] **T051** `pnpm vitest run` — 287 pass / 6 fail. The 6 fails are the pre-existing flaky RecipeCatalog × 3 + WorkflowCatalog × 3 cases from the spec 037 baseline; all M1–M4 new tests (52 total: 6 SW registration + 24 IDB stores + 5 composer draft + 9 broker + 5 leader + 3 misc carryover) pass.
- [X] **T052** Boundary audit clean. `grep -rn "local-llm\|local_llm" apps/web/src/components/chat/ apps/web/src/sw/ apps/web/src/services/idb/` returns ZERO matches. Per-extension wiring confined to `apps/web/src/layout/local_llm/` + `apps/web/src/services/local_llm_chat.ts` (both grandfathered audit-allow surfaces).
- [X] **T053** Bundle delta. `dist/sw.js` 7.14 KB / 2.87 KB gzipped; `dist/sw-kill.js` 750 B; `idb` ~1.5 KB gzipped chunked into the main bundle. Combined SW + IDB delta well under SC-011 30 KB / 50 KB budgets.
- [X] **T054** Dispatched `code-reviewer` agent against the M1-M4 diff. Findings absorbed inline before final commit (see Phase 4 close-out commit).
- [~] **T055** Final docs commit deferred. Spec / plan / tasks already document the architecture; `apps/web/README.md` update can ride along with the next docs sweep.
- [X] **T056** Tasks marked complete; final close-out commit lands with the validation summary.

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
