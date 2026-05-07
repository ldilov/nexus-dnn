# Feature Specification: Service Worker SSE Broker + IndexedDB Persistence

**Feature Branch**: `040-service-worker-and-idb`
**Created**: 2026-05-07
**Status**: Draft (Phase 2 — Define output of `/octo:embrace`)
**Input**: User description: Implement client-side platform improvements for nexus-dnn — (1) a Service Worker that brokers LLM SSE streams (single upstream connection per `(deploymentId, threadId)`, fan-out to all open tabs, persist deltas for mid-stream resume, single-leader pattern via Web Locks to fix the duplicate llama-server spawn from spec 039 close-out at the platform level), and (2) IndexedDB persistence for chat history (read-through cache eliminating cold-start flash) and composer drafts (durable autosave surviving browser crashes). Discovery input is the banked 2026-05-07 ServiceWorker research (6 themes + 11 takeaways). Out of Scope: WebWorker offload, OPFS uploads, Background Sync / Push / Periodic Sync, file_handlers, protocol_handlers, WebTransport. Boundary: client-side only — generic primitives in `apps/web/src/sw/` and `apps/web/src/services/idb/`; per-extension wiring in `apps/web/src/layout/local_llm/` and `apps/web/src/services/local_llm_chat.ts`. Backend untouched.

## Overview

Spec 039 close-out (commit `b8272e8`) shipped a per-tab heuristic in `chat_panel_adapter.tsx` to prevent the local-llm runtime from spawning a duplicate `llama-server` when the operator switches threads on a deployment that already has a ready runtime. That fix is correct **for one tab**. The moment a second tab opens against the same deployment, both tabs race to spawn — the heuristic relies on per-tab `liveRuntimeRef` state which is not shared across tabs. Independently, the current `streamMessage` opens one HTTP/1.1 SSE connection per chat tab, hits the browser's six-connection-per-origin cap when the operator has three or more tabs open, and loses tokens whenever a tab is backgrounded (Chrome throttles inactive-tab streams after roughly thirty seconds) or closed mid-generation.

The 2026-05-07 ServiceWorker research banked six themes; the highest-leverage finding was that a Service Worker, in its role as a **persistent connection broker** rather than as a static-asset cache, fixes all four failure modes at the platform level. One Service Worker registration per origin holds at most one upstream SSE connection per `(deploymentId, threadId)` pair, fans the token stream out to every open tab via `BroadcastChannel`, persists each delta to IndexedDB or OPFS as it arrives so a tab closed mid-stream can resume on rejoin, and uses the **Web Locks API** to elect a single leader for the runtime-spawn decision so multi-tab no longer races. A second, smaller win banked from the research: the same IndexedDB store that backs mid-stream resume can serve as a read-through cache for the chat history view, eliminating the cold-start flash the adapter has today, and a separate IndexedDB object store gives composer drafts durability that the current `sessionStorage` autosave cannot.

This spec adds two new client-side subsystems — `apps/web/src/sw/` (the Service Worker source plus registration helper) and `apps/web/src/services/idb/` (the IndexedDB wrappers) — and rewires `apps/web/src/services/local_llm_chat.ts` and `apps/web/src/layout/chat_panel_adapter.tsx` to use them when available, with a full graceful-degradation path when they are not. **No backend changes.** The host SSE protocol is unchanged. The Service Worker is purely a client-side coordinator that intercepts `fetch` calls the page already makes today.

The Service Worker brokers two URL surfaces: the host-mounted route at `/api/v1/extensions/nexus.local-llm/inference/stream` (when a future migration moves `streamMessage` onto the host proxy) **and** the direct cross-origin route at `http://127.0.0.1:<port>/v1/chat/completions` that `streamMessage` calls today. Both patterns are matched in the broker's `fetch` event handler.

The build pipeline MUST allow a hand-written Service Worker source (`vite-plugin-pwa` `injectManifest` is the chosen tool but is not contractual). The Service Worker is verified against `vite preview` builds rather than the dev server (avoids HMR-related lifecycle quirks). A kill-switch Service Worker is shipped before the first production registration so a broken Service Worker can be unregistered without manual user intervention.

## Considered Alternatives (and why they were not chosen)

A 2026-05-07 adversarial review of this spec by Codex (`gpt-5.4`) flagged three architectural alternatives worth addressing in the spec body so future readers do not re-litigate them.

**SharedWorker for multi-tab SSE fan-out.** Originally banked as Bonus #10 in the SW research. Pros: simpler lifecycle, no `fetch` event handler, no scope/registration ceremony, persistent until last tab closes. Cons: cannot intercept `fetch` calls — code that wants the broker has to call into the SharedWorker explicitly via `port.postMessage`, so every SSE call site must be ported. SW intercepts transparently. Decision: **Service Worker primary, SharedWorker NOT a fallback.** A future spec may revisit SharedWorker if SW lifecycle proves too hostile in production.

**Host-side idempotent `setActiveModel` (single-flight on the backend).** This is the architecturally correct fix for the duplicate-spawn bug — the host should reject a second spawn for the same `(deployment, modelKey)` while a first spawn is in flight. Pros: works across any client (tabs, headless, future CLI), no Web Locks complexity, no follower election. Cons: requires backend changes which user choice (1b) explicitly excluded for this spec. Decision: **deferred to a future spec.** This spec's Web Locks single-leader is a client-side workaround; it does not replace the eventual host-side single-flight guard.

**Ship IndexedDB persistence (User Stories 4 + 5) decoupled from the broker (User Stories 1–3).** Codex's recommendation. Pros: smaller blast radius, faster rollback if the broker mis-behaves, IDB infrastructure deliverable independently. Cons: User Story 3 (mid-stream resume) requires both halves; splitting them ships an incomplete US3. Decision: **single spec, but the Plan phase MUST stage delivery**: IDB stores + read-through cache + draft autosave (US4 + US5) ship as the first internal milestone; the broker (US1 + US2 + US3) ships as the second, with kill-switch (US6) shipped first of all.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Multi-tab single-leader llama-server spawn (Priority: P1)

An operator has the local-llm extension active and a Llama 8B deployment with a ready runtime in tab A. They open tab B against the same deployment and create a fresh thread. With the spec-039 per-tab fix in place but no Service Worker, tab B's `chat_panel_adapter` sees its own empty `liveRuntimeRef` and calls `setActiveModel`, which spawns a second `llama-server` process — VRAM doubles, the operator sees their GPU choke. With the Service Worker active, tab B's adapter still calls `setActiveModel`, but the call is intercepted by the Service Worker's `fetch` handler. The handler attempts to acquire the named Web Lock `nexus-runtime:<deploymentId>:<modelKey>`. Tab A already holds the lock (it spawned the process in the first place), so tab B's request short-circuits and returns the existing runtime port from the leader's broadcast — no second spawn happens. The operator sees the same ready runtime in both tabs.

**Why this priority**: this is the highest-leverage win banked from the SW research. The 2026-05-07 spec-039 close-out called out the duplicate-spawn behaviour as a real production hazard and shipped a per-tab patch as the only viable fix without platform support. P1 because it solves the original bug for the multi-tab case the per-tab fix cannot reach.

**Independent Test**: open two browser tabs to the same nexus-dnn deployment with the local-llm extension. In tab A, load a chat model and wait for the ready state. In tab B, open the same deployment and create a fresh thread. With the SW active, tab B reaches ready state without spawning a second `llama-server` (verified by checking `chat/runtime_status` returns the same PID and listening port for both tabs). With the SW disabled (e.g. unregistered for testing), tab B spawns a second process — confirming the SW is the layer doing the work. Tab A is closed; tab B detects the leader vacancy via lock release and elects itself; the runtime stays ready. Tab A re-opens; it joins as a follower without re-spawning.

**Acceptance Scenarios**:

1. **Given** the SW is registered and active and tab A holds the runtime lock for `(deployment-X, llama-8b-Q4_K_M)`, **When** tab B opens the same deployment and triggers `setActiveModel` for the same family/variant, **Then** the SW intercepts the call, attempts to acquire the lock, sees it is held, and returns the leader's cached port from BroadcastChannel — no second `llama-server` process is spawned.
2. **Given** tab A holds the lock and is closed, **When** the lock release event fires, **Then** any remaining tab attempts re-acquisition; the new leader does NOT respawn the process — the existing PID is still ready and the new leader publishes itself as the broadcaster.
3. **Given** the SW is registered but disabled by the operator (`navigator.serviceWorker` returns `null` from a kill-switch state), **When** tab B opens, **Then** the original per-tab heuristic from spec 039 takes over and the system continues to function with the spec-039 behaviour (no regression).
4. **Given** tab A holds the lock and crashes (process killed externally), **When** the heartbeat from the lock-holder stops for more than 30 seconds, **Then** a follower tab times out the lock, re-acquires it, and either re-uses the still-listening port (best case) or respawns (recoverable case) — the operator sees a brief ready-state flash but no permanent failure.

---

### User Story 2 — One upstream SSE per `(deployment, thread)` regardless of tab count (Priority: P1)

An operator is debugging an inference issue and has four browser tabs open to the same thread on the same deployment. Each tab is showing the chat surface. Without the SW, each tab opens its own SSE connection to the llama-server's `/v1/chat/completions`, the browser's six-connection-per-origin cap is approached, and any background tabs see their stream throttled (Chrome reduces background-tab network priority after about thirty seconds). With the SW active, only the **first** tab's `fetch` to the SSE endpoint actually opens an upstream connection. The SW reads the upstream response body once via a `TransformStream`, fans each chunk out via `BroadcastChannel("nexus-sse-broker")`, and returns an in-memory passthrough `Response` to each tab's `fetch` call. All four tabs see the same token stream, the operator's network panel shows one upstream connection rather than four, and switching between tabs no longer drops tokens.

**Why this priority**: the HTTP/1.1 six-connection-per-origin cap is a hard browser ceiling. The background-tab throttling is harder to reproduce but is a real production-hazard for any operator who keeps a chat tab in the background while reading docs in the foreground. P1 because both failure modes are unmitigated today and both have a single platform-level fix.

**Independent Test**: open four tabs to the same `(deployment, thread)`. Issue a single chat request from tab A. With the SW active, the browser network panel shows exactly one outbound `/v1/chat/completions` request originating from the SW context (visible as `?source=ServiceWorker`); tabs B, C, D show synthetic responses tagged as broker passthrough. All four tabs render the same token stream synchronously. Now background tab A and foreground tab D — token flow continues unthrottled in tab D (the foreground tab) and resumes in tab A immediately on focus. Without the SW, four upstream connections appear in the network panel, and backgrounded tabs visibly lag.

**Acceptance Scenarios**:

1. **Given** the SW is active and no upstream connection is open for `(deployment-X, thread-Y)`, **When** tab A's `streamMessage` fires its `fetch`, **Then** the SW opens exactly one upstream connection and returns a passthrough `Response` to tab A.
2. **Given** the SW is active and an upstream connection is already open for `(deployment-X, thread-Y)`, **When** tab B's `streamMessage` fires its `fetch` for the same thread, **Then** the SW does NOT open a second upstream connection; it returns a passthrough `Response` to tab B that is fed from the same `BroadcastChannel`.
3. **Given** four tabs are subscribed to the same upstream and the operator backgrounds two of them, **When** the upstream emits new tokens, **Then** all four tabs receive every token (verified by reconciling the rendered message lengths across tabs after the stream completes).
4. **Given** the upstream connection terminates (server closes the SSE), **When** the SW receives the terminating chunk, **Then** the SW closes the broadcast on `nexus-sse-broker`, all subscribed tabs see their reader resolve naturally, and the SW releases its `(deployment, thread)` slot for the next request.
5. **Given** the operator aborts the request from tab A while tabs B, C, D are also subscribed, **When** the `AbortController` fires, **Then** the SW does NOT cancel the upstream — it only stops feeding tab A. The upstream is only cancelled when the **last** subscribed tab aborts or disconnects.

---

### User Story 3 — Replay partial response after tab close (Priority: P2)

An operator sends a long-form generation request, then accidentally closes the tab a few seconds in. With no SW, the request is dead — the `AbortController` fires, the upstream is severed, the partial assistant response is lost. With the SW active, the SW persists every delta it observes to IndexedDB object store `nexus-stream-deltas` keyed by `(deploymentId, threadId, requestId, sequenceNumber)` **as the upstream emits them, in real time**. The lifecycle of the SW itself is event-driven and the browser MAY terminate the SW after the last controlled client closes — this spec does NOT promise upstream completion after a tab closes; it promises **replay of every delta that was persisted before the tab closed.** When the operator re-opens a new tab to the same thread, the adapter reads `nexus-stream-deltas` on mount. If a row marked `status: "in_progress"` exists for `(deploymentId, threadId, *)`, the adapter replays the persisted deltas, surfaces the response as "interrupted — last token at <timestamp>", and offers a manual retry. If the SW happens to still be alive and the upstream is still open (best case — typically true for 0–60 seconds after last-tab-close on Chromium, less reliable elsewhere), the adapter subscribes to the broker for any further deltas and the response continues seamlessly. Operators see the partial response with zero data loss; whether the stream completes in the background is best-effort.

**Why this priority**: data loss on accidental tab close is real and high-value to recover. Codex's adversarial review correctly flagged that promising upstream survival after the last tab closes is lifecycle-hostile; this story has been re-scoped to "guarantee replay of persisted partial; best-effort upstream continuation". The persisted-replay half is reliable; the best-effort continuation is bonus when the browser cooperates. P2 because the failure mode is rare relative to the multi-tab scenarios.

**Independent Test**: open one tab, send a long generation request, wait for the first ten or so tokens to render, then close the tab. Open a new tab to the same thread within 60 seconds. The new tab's adapter renders the partial response within 200 ms of mount with an "interrupted" affordance. The IDB store `nexus-stream-deltas` contains the persisted delta sequence. Whether the SW kept the upstream open and the stream completed is observable but not asserted as a test contract.

**Acceptance Scenarios**:

1. **Given** the SW has an active upstream and is fanning out to one tab, **When** that tab closes mid-stream, **Then** the SW continues consuming the upstream **as long as the SW remains alive** — no explicit cancellation is fired by the broker. If the browser terminates the SW the IDB row stops growing at the last-persisted delta.
2. **Given** an in-progress request is persisted in `nexus-stream-deltas` with `status: "in_progress"`, **When** the operator opens a new tab to the same thread, **Then** the adapter reads all persisted deltas in sequence-number order, replays them into the message body within 200 ms, and presents the response as "interrupted — last token at <timestamp>" with a manual retry affordance.
3. **Given** the SW is alive AND the upstream is still open AND the operator re-opens a tab, **When** the adapter subscribes to the broker for `(deploymentId, threadId, requestId)`, **Then** new deltas continue to arrive seamlessly and the "interrupted" affordance is replaced with the normal in-progress UI.
4. **Given** the upstream completes successfully **before** the SW is terminated, **When** the SW receives the terminating chunk, **Then** the IDB row is marked `status: "completed"`. Subsequent rejoining tabs render the full response from IDB.
5. **Given** the SW is terminated by the browser before the upstream completes, **When** the operator next opens a tab to the same thread, **Then** the adapter sees `status: "in_progress"` with no live broker, treats the request as "interrupted", and presents the manual retry affordance — there is no silent drop.
6. **Given** an idle-timeout configured at 5 minutes for `status: "in_progress"` rows with no subscribed clients, **When** the timeout elapses on the next IDB sweep, **Then** the row is marked `status: "abandoned"` to prevent stale "interrupted" UI lingering forever.

---

### User Story 4 — IndexedDB read-through cache for chat history (Priority: P2)

An operator opens the chat surface for a deployment they used yesterday. With no IDB cache, `chat_panel_adapter.tsx` mounts, fires `listThreads()` and `listMessages(activeThreadId)` against the host backend, and the operator sees a blank chat surface for 80–300 ms while those round-trips complete. With the IDB cache, the adapter on mount reads from `nexus-chat-threads` and `nexus-chat-messages` synchronously (sub-10 ms typical) and renders immediately from the cached data, then fires the same backend calls in the background and reconciles any divergence (new messages, deletions, edits) by replacing the cached version with the authoritative one. The operator sees the chat surface populated instantly; the reconciliation is invisible unless something has actually changed.

**Why this priority**: not a correctness issue — purely a perceived-latency win. P2 because it is meaningful UX polish that compounds with the multi-tab pattern (each new tab benefits) but is not a regression-grade bug.

**Independent Test**: load a deployment with at least three threads of varying length. Refresh the page. With the IDB cache active, time-to-paint of the message list is under 50 ms (measured with `performance.mark`/`measure`); without the cache, time-to-paint is 80–300 ms depending on backend latency. Modify a message via a second tab; verify the cache reconciles and the modified version surfaces in the first tab on its next refresh.

**Acceptance Scenarios**:

1. **Given** the IDB stores `nexus-chat-threads` and `nexus-chat-messages` are populated from a previous session, **When** the chat surface mounts, **Then** the rendered thread list and active-thread message list paint from cache within 50 ms.
2. **Given** the cache renders, **When** the background `listThreads()` and `listMessages()` complete, **Then** any divergence (added, removed, or edited rows) is reconciled into the rendered state without flashing the chat surface.
3. **Given** the cache is empty (first visit, or operator cleared site data), **When** the chat surface mounts, **Then** the adapter falls back to the existing fetch-then-render path with no error.
4. **Given** the IDB version is incremented (schema migration), **When** the database opens, **Then** the upgrade callback runs and the cache is rebuilt from the next backend fetch — operators never see corrupted data.
5. **Given** an operator deletes a thread in tab A, **When** tab B's chat surface re-mounts, **Then** the reconciliation removes the deleted thread from tab B's cached list and rendered UI.

---

### User Story 5 — Durable composer draft autosave (Priority: P2)

An operator is mid-way through composing a long, carefully-worded prompt. Their browser crashes. With the current `sessionStorage` autosave, the draft is lost the moment the tab closes — `sessionStorage` is per-tab, per-session, and does not survive a hard crash or full browser restart. With the IDB-backed autosave, the draft is persisted to `nexus-composer-drafts` keyed by `(deploymentId, threadId)` on every keystroke (debounced 300 ms). On the next visit, the composer mounts and immediately rehydrates the draft from IDB before the operator types a single character. The operator picks up exactly where they left off.

**Why this priority**: the data loss is real but rare; the recovery experience is delightful when it does happen. P2 because it is a small, isolated change and the IDB infrastructure is already being built for User Story 4.

**Independent Test**: open a chat thread, type a long multi-paragraph message into the composer, do **not** send. Force-quit the browser (or close the tab without sending). Re-open the same thread. The composer renders pre-populated with the entire draft text within 50 ms of mount. Type a new keystroke; the autosave fires and updates IDB.

**Acceptance Scenarios**:

1. **Given** the operator types into the composer, **When** the debounce timer fires (300 ms after last keystroke), **Then** an entry in `nexus-composer-drafts` is upserted with `(deploymentId, threadId, text, updatedAt)`.
2. **Given** the operator sends the message, **When** the send succeeds, **Then** the draft entry for that `(deploymentId, threadId)` is deleted from IDB.
3. **Given** a non-empty draft entry exists for `(deploymentId, threadId)`, **When** the composer mounts for that thread, **Then** the composer's controlled value is initialised from the draft and the operator sees their text within 50 ms.
4. **Given** the operator manually clears the composer (deletes all text), **When** the debounce fires, **Then** the empty entry is deleted from IDB rather than written as an empty string.
5. **Given** the IDB store is unavailable (private browsing, quota exceeded), **When** the composer renders, **Then** the existing `sessionStorage` fallback path takes over with no error visible to the operator.

---

### User Story 6 — Kill switch and graceful degradation (Priority: P1 cross-cutting)

An operator visits the app on a browser that has Service Workers disabled (lockdown mode, enterprise policy, deliberate user setting). Or they visit on Firefox where `BroadcastChannel` is supported but some niche behaviour the broker depends on is not. Or a future deploy ships a broken Service Worker that crash-loops on registration. In every case, the app must still work — degraded but functional. A kill-switch Service Worker (a pre-registered `sw-kill.js` that does nothing except `self.registration.unregister()` then `self.skipWaiting()`) is bundled and can be deployed by changing the Service Worker URL in the registration helper. When the kill switch runs, every controlled tab loses Service Worker control on its next navigation, the broker stops mediating, and `streamMessage` falls back to its current direct-fetch path.

**Why this priority**: this is the safety net for everything else. The 2026-05-07 SW research called out kill-switch shipping as a non-negotiable prerequisite for production registration. P1 because shipping the broker without it is a self-inflicted production hazard.

**Independent Test**: register a deliberately broken Service Worker (one that throws on `fetch`). The app should still function — the SW registration helper detects the failure during `register()` and falls back to a no-SW state without blocking app boot. Switch the registration URL to `sw-kill.js`, redeploy, refresh — the previous Service Worker is unregistered, the app resumes its no-SW path, and the operator sees no error or degraded UX beyond the loss of multi-tab broker behaviour.

**Acceptance Scenarios**:

1. **Given** `navigator.serviceWorker` is `undefined` (browser does not support SWs), **When** the registration helper runs, **Then** it logs a single info-level diagnostic and returns immediately; the app continues to mount and function on the no-SW path.
2. **Given** the SW registration throws (broken script, fetch error during install), **When** the registration helper catches the error, **Then** the app continues to function and the helper records the failure for the diagnostics surface.
3. **Given** the operator has a registered SW from a previous version, **When** the kill-switch SW is deployed and registered at the same URL, **Then** the kill-switch's `install` calls `self.registration.unregister()` and `self.skipWaiting()`, the next navigation runs without any SW, and the next page load no longer registers any SW.
4. **Given** the SW is active and the app calls into the broker, **When** the broker hits an internal error (uncaught exception in `fetch` handler), **Then** the SW's error handler returns a synthetic 503 to the page, and the page's existing fetch error handler surfaces it without crashing the chat surface.
5. **Given** an operator is in private browsing (where IDB is restricted), **When** the IDB wrappers attempt to open the database, **Then** the open promise rejects with a typed error and every consumer falls back to its non-IDB path (`sessionStorage` for drafts, direct fetch for chat history) without surfacing the error to the operator.

---

### Edge Cases

- **Service Worker update mid-stream**: a new Service Worker version is installed while an upstream SSE is in flight. The old SW remains active until all controlled clients release it; the new SW waits in `installing` then `waiting` state. `skipWaiting()` is called only when no upstream connection is open.
- **Cross-origin SSE cookies**: the direct-port `127.0.0.1:<port>/v1/chat/completions` upstream is cross-origin from the page. The Service Worker `fetch` handler must explicitly preserve the `mode: "cors"` and `credentials: "omit"` defaults; if a future migration to the host-mounted route happens, the broker must handle the same-origin variant correctly without leaking cookies cross-origin.
- **IDB schema migration mid-flight**: a tab opens during a schema upgrade. `idb`'s `upgrade` callback runs once on the first connection; subsequent connections see the upgraded schema. Tabs already open during an upgrade receive the `versionchange` event and either reload or close their connection.
- **Quota exceeded**: IDB writes can throw `QuotaExceededError`. Each store has an LRU eviction policy: chat messages older than 90 days are evicted; composer drafts cap at 1 MB per `(deploymentId, threadId)`.
- **Lock holder hangs**: a tab acquires the runtime lock and then becomes unresponsive (slow JS on main thread). A heartbeat field in the lock metadata, written every 5 seconds, lets followers time out the leader after 30 seconds of silence.
- **Two-deployment same-port collision**: two deployments on the same port are not currently a real scenario in nexus-dnn (each deployment leases a distinct port), but the lock key includes the deployment ID so a future collision is impossible.
- **Reverse proxy strips Service-Worker-Allowed header**: if the host is fronted by a reverse proxy (nginx, cloudflare) that strips `Service-Worker-Allowed`, the SW scope is restricted to the directory of the SW file. The SW is served from `/` so the default scope is `/` and no header is required for the standard deployment.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: A hand-written Service Worker source MUST live under `apps/web/src/sw/` and the build pipeline MUST compile it into a single deployable `sw.js` plus an optional kill-switch `sw-kill.js` at the build output root. The chosen build strategy is `vite-plugin-pwa` `injectManifest`, but any equivalent that preserves a hand-written SW source is acceptable.
- **FR-002**: The Service Worker MUST register a `fetch` event handler that intercepts only the two patterns above; any other request MUST pass through untouched (no fetch handler tax for unrelated requests).
- **FR-003**: For each intercepted SSE request, the Service Worker MUST key its broker slot by `(deploymentId, threadId, requestId)` extracted from the request URL (path or query) or the request body's `deployment_id` / `thread_id` / `request_id` fields when the URL does not carry them. Two concurrent requests in the same `(deployment, thread)` (regenerate, edit-and-resend) MUST occupy distinct broker slots and MUST NOT share a single upstream connection.
- **FR-004**: When a broker slot has no active upstream, the Service Worker MUST open exactly one upstream `fetch` to the original URL with the original method, headers, and body, then tee its response body via a `TransformStream`.
- **FR-005**: When a broker slot has an active upstream **for the same `requestId`**, the Service Worker MUST NOT open a second upstream — it MUST return a synthetic `Response` whose body is a `ReadableStream` fed from the same `BroadcastChannel` topic.
- **FR-006**: Each upstream chunk MUST be persisted to IDB store `nexus-stream-deltas` with `(deploymentId, threadId, requestId, sequenceNumber, chunk, timestamp, status: "in_progress")` before being broadcast to subscribers.
- **FR-007**: The Service Worker MUST close a broker slot (mark IDB row `status: "completed"`, close broadcast topic) when the upstream emits its terminating SSE chunk (`data: [DONE]`) or the response stream ends.
- **FR-008**: The Service Worker MUST keep a broker slot's upstream open while at least one tab is subscribed. When the last subscriber leaves, the SW SHOULD continue consuming the upstream best-effort — but the spec does NOT guarantee survival past last-tab-close, since the browser MAY terminate the SW. IDB persistence (FR-006) is the durable contract; upstream survival is best-effort.
- **FR-009**: The Service Worker MUST use the Web Locks API for **mutual exclusion only** — `navigator.locks.request("nexus-runtime:<deploymentId>:<modelKey>", { ifAvailable: true | mode: "exclusive" }, callback)` — and inside the lock callback the leader MUST write its `(port, pid, leaderTabId, claimedAt)` metadata to IDB store `nexus-runtime-leaders` AND broadcast on `BroadcastChannel("nexus-runtime-leader")`. Followers MUST read the leader metadata from IDB and subscribe to the broadcast channel; they MUST NOT attempt to derive metadata from the lock itself.
- **FR-010**: The leader MUST write a heartbeat (`heartbeatAt: number`) to its IDB row in `nexus-runtime-leaders` every 5 seconds while holding the lock. Followers MUST time out a leader whose heartbeat is older than 30 seconds AND whose lock has been released (Web Locks releases automatically on tab close); a follower MUST then re-acquire the lock and become the new leader.
- **FR-011**: A kill-switch Service Worker source MUST live at `apps/web/src/sw/kill_switch.ts` and compile to `apps/web/dist/sw-kill.js`. It MUST do nothing except `self.registration.unregister()` on `install` and `self.skipWaiting()` then `event.waitUntil(self.clients.claim())`.
- **FR-012**: The Service Worker registration helper at `apps/web/src/services/sw_registration.ts` MUST feature-detect `navigator.serviceWorker`, register `sw.js` only when present, catch any registration error, and never block app boot. A configuration switch MUST allow swapping the registered URL to `sw-kill.js` without a code change.
- **FR-013**: The IDB database `nexus-dnn` MUST be opened via the `idb` npm package's `openDB(name, version, { upgrade })` with versioned schema migrations declared in `apps/web/src/services/idb/db.ts`. Initial schema (version 1) MUST contain object stores: `nexus-chat-threads`, `nexus-chat-messages`, `nexus-composer-drafts`, `nexus-stream-deltas`, `nexus-runtime-leaders`.
- **FR-014**: `nexus-chat-threads` MUST key by `(deploymentId, threadId)` and store the thread row plus `cachedAt` timestamp.
- **FR-015**: `nexus-chat-messages` MUST key by `(deploymentId, threadId, messageId)` with a secondary index on `(deploymentId, threadId, createdAt)` for ordered reads.
- **FR-016**: `nexus-composer-drafts` MUST key by `(deploymentId, threadId)` and store `(text, updatedAt)`. Empty drafts MUST be deleted, not stored as empty strings.
- **FR-017**: `nexus-stream-deltas` MUST key by `(deploymentId, threadId, requestId, sequenceNumber)` with a secondary index on `(deploymentId, threadId, requestId)` for ordered replay. Rows older than 24 hours MUST be evicted on next open.
- **FR-018**: `chat_panel_adapter.tsx` MUST read threads and active-thread messages from IDB on mount before firing the backend `listThreads` / `listMessages` calls. The fetched results MUST reconcile against the rendered state (added, removed, edited) without flashing the chat surface.
- **FR-019**: The composer component MUST autosave its value to `nexus-composer-drafts` on a 300 ms debounce, MUST rehydrate from IDB on mount, and MUST delete the draft entry after a successful send.
- **FR-020**: When `streamMessage` is called and the Service Worker is active, the request MUST flow through the broker. When the Service Worker is not active, `streamMessage` MUST take its current direct-fetch path with no behavioural change.
- **FR-021**: When the operator opens a thread that has an in-progress entry in `nexus-stream-deltas`, the adapter MUST replay the persisted deltas in sequence-number order before subscribing to any further deltas via the broker.
- **FR-022**: Verification of SW behaviour MUST be done against a production-mode preview build (e.g. `vite preview`) rather than the dev server, to avoid HMR-related lifecycle surprises. Specific build-tool flags are an implementation choice for the Plan phase.
- **FR-023**: The SW registration helper MUST log all registration events (success, update found, controllerchange, error) to the existing diagnostic surface so operators can troubleshoot a misbehaving SW.
- **FR-024**: All IDB writes MUST be inside transactions; reads MAY be outside transactions when only one store is touched. No raw `IDBRequest` event handling — a Promise-based wrapper is used everywhere.
- **FR-025**: The boundary discipline MUST be respected: `apps/web/src/sw/` and `apps/web/src/services/idb/` are generic primitives consumable by any extension; per-extension wiring (the local-llm-specific lock keys, URL patterns, store schemas extension-side) lives only in the local-llm code paths. The generic `apps/web/src/components/chat/` is NOT touched.

### Key Entities

- **BrokerSlot**: in-memory map entry inside the Service Worker. Fields: `key: (deploymentId, threadId, requestId)`, `upstreamController: AbortController`, `subscribers: Set<MessagePort>`, `lastSeenAt: number`. One per active upstream stream. Distinct concurrent requests in the same `(deployment, thread)` occupy distinct slots.
- **RuntimeLeaderRow**: IDB row in `nexus-runtime-leaders`. Fields: `(deploymentId, modelKey, leaderTabId, port, pid, claimedAt, heartbeatAt)`. Read by followers via IDB (the Web Lock provides exclusion only; the metadata channel is IDB + `BroadcastChannel("nexus-runtime-leader")`).
- **ChatThreadCacheRow**: IDB row in `nexus-chat-threads`. Fields: `(deploymentId, threadId, title, createdAt, updatedAt, lastMessagePreview, cachedAt)`.
- **ChatMessageCacheRow**: IDB row in `nexus-chat-messages`. Fields: `(deploymentId, threadId, messageId, role, content, createdAt, status, cachedAt)`.
- **ComposerDraftRow**: IDB row in `nexus-composer-drafts`. Fields: `(deploymentId, threadId, text, updatedAt)`.
- **StreamDeltaRow**: IDB row in `nexus-stream-deltas`. Fields: `(deploymentId, threadId, requestId, sequenceNumber, chunk, timestamp, status)` where `status ∈ { "in_progress", "completed", "abandoned" }`.

## Success Criteria *(mandatory)*

1. **SC-001 — Multi-tab single-spawn**: with the SW active, opening N tabs (N=2, N=4) against the same deployment and triggering `setActiveModel` on each results in exactly one `llama-server` process. Verified by `chat/runtime_status` returning the same PID across tabs.
2. **SC-002 — One upstream connection regardless of tab count**: with N tabs (N=2, N=4) subscribed to the same `(deployment, thread)`, the network panel shows exactly one upstream `/v1/chat/completions` request originating from `ServiceWorker` source.
3. **SC-003 — Background-tab token continuity**: a backgrounded chat tab shows no token-loss after foregrounding (every token rendered in the foreground tab is rendered in the background tab once it is focused). Measured by reconciling `assistant.content.length` across tabs after the stream completes.
4. **SC-004 — Mid-stream resume**: closing a tab during generation and re-opening another tab to the same thread renders the partial response within 200 ms of mount and continues to receive deltas.
5. **SC-005 — Cold-start chat history paint**: chat surface mounts to first paint of message list within 50 ms when the IDB cache is populated; falls back gracefully to the current 80–300 ms path when empty.
6. **SC-006 — Draft survives crash**: force-quitting the browser with an unsent draft in the composer and reopening the same thread restores the entire draft text within 50 ms of mount.
7. **SC-007 — Kill switch**: replacing the registered SW URL with `sw-kill.js` and reloading the page once unregisters the previous SW; subsequent reloads do not register any SW.
8. **SC-008 — Graceful degradation**: disabling the SW (test harness unregister) does not regress any current functionality — `streamMessage` works, chat history loads, composer drafts persist via `sessionStorage` fallback.
9. **SC-009 — Zero backend changes**: the host SSE protocol, host endpoints, and host SQLite schema are unchanged. `cargo test` baseline is unchanged from spec 039 close-out.
10. **SC-010 — Boundary discipline**: `apps/web/src/components/chat/` literal grep for `local-llm` / `local_llm` returns zero matches. `apps/web/src/sw/` and `apps/web/src/services/idb/` contain no extension-id literals — extension-specific keys live in `apps/web/src/layout/local_llm/` and `apps/web/src/services/local_llm_chat.ts`.
11. **SC-011 — Bundle budget**: SW bundle is under 30 KB gzipped; IDB wrappers under 10 KB gzipped; combined client-bundle delta is under 50 KB gzipped over the spec-039 baseline.

## Out of Scope

- WebWorker offload of GGUF parsing, waveform rendering, search ranking. Tracked for a future spec; explicitly removed per user choice (1b) of `/octo:embrace`.
- OPFS staging for resumable model uploads. SW research Theme 4; Chromium-only.
- File handlers for `.gguf` / `.safetensors` and protocol handlers for `web+nexus://`. SW research Takeaway 7; Chromium-only PWA-installed-only.
- Background Sync, Periodic Sync, Background Fetch. SW research Theme 2; Chromium-only progressive enhancements.
- Push API and OS-level notifications. SW research Bonus 11; covered by `BroadcastChannel + Notification API` for in-browser-only UX.
- WebTransport (HTTP/3 streams) as SSE alternative. SW research gap; not researched.
- Migrating `streamMessage` to use the host-mounted `/api/v1/extensions/nexus.local-llm/inference/stream` route instead of direct `127.0.0.1:<port>`. The broker handles both URL patterns; the migration itself is a separate spec.
- Multi-window across multiple OS users on the same machine. Web Locks are per-origin not per-OS-user; this scenario is rare and not in scope.
- IDB encryption-at-rest. Data is operator-local already; full-disk encryption is the operating system's responsibility.

## Assumptions

- The browser environment supports `navigator.serviceWorker`, `BroadcastChannel`, `LockManager` (`navigator.locks`), and `IndexedDB`. All four are universally supported in Chromium/Edge/Firefox/Safari at the versions nexus-dnn already targets (per spec 037 baseline). Older browsers fall back to the no-SW path automatically.
- The host is served from a single origin under `/`. The Service Worker scope is `/` and `Service-Worker-Allowed` is not required.
- The local llama-server process advertises CORS headers compatible with `mode: "cors"` from a different origin (current behaviour). If a future llama-server version restricts CORS, the broker degrades to direct fetch by feature-detecting the cross-origin response.
- The host SQLite migration baseline at spec 039 close-out (migration 021) is the starting point. No new migrations in this spec.
- `vite-plugin-pwa` `injectManifest` mode is compatible with the current Vite 6 + React 19 + vanilla-extract setup. The 2026-05-07 SW research banked this; verification at first build is part of acceptance.

## Complexity Tracking

| Risk | Mitigation |
|---|---|
| SW lifecycle subtleties (skipWaiting + active-stream interaction) | FR-007/FR-008 explicitly defer slot teardown until last subscriber leaves; SW updates are gated on no-active-streams. |
| IDB schema migrations corrupting user data | `idb`'s `upgrade` callback isolates migrations per version; FR-013 makes the version explicit; users in private browsing fall back to no-cache (FR-024 / SC-008). |
| Web Locks leader crash | FR-010 heartbeat + 30 s timeout in followers. |
| Cross-origin SSE intercept edge cases | Edge Cases section explicitly addresses cookies, CORS, mode flags. |
| Kill switch never tested before first need | FR-011 + SC-007 ship the kill switch alongside the broker, tested in CI. |
| Bundle bloat | SC-011 caps combined delta at 50 KB gzipped; `idb` is ~1.5 KB; `vite-plugin-pwa` overhead measured against budget at first build. |
| Two-sampler-surfaces-style UI confusion | None — this spec adds no UI, only platform plumbing. The chat surface and dialog are unchanged. |

## Revisions from Codex adversarial review (2026-05-07)

Codex `gpt-5.4` returned **DISAGREE-MAJOR** on the initial draft. Three substantive critiques and three over-scoping points were addressed in this revision:

| Critique | Resolution |
|---|---|
| **Web Locks API misuse** — locks provide mutual exclusion only, not a shared metadata channel | FR-009 rewritten: lock for exclusion; metadata via IDB `nexus-runtime-leaders` row + `BroadcastChannel("nexus-runtime-leader")` |
| **Broker key collision** — `(dep, thread)` collapses concurrent requests in the same thread | FR-003/FR-005 rewritten: broker key is `(deploymentId, threadId, requestId)`; concurrent requests get distinct slots |
| **SW lifecycle hostility** — promised upstream survival after last-tab-close not platform-guaranteed | US3 re-scoped: SW persists deltas in real time (durable contract); upstream continuation after last-tab-close is best-effort |
| **FR-001 over-prescriptive** — hardcoded build path/strategy | FR-001 relaxed to "hand-written source under `apps/web/src/sw/`"; `vite-plugin-pwa` cited as chosen tool not contract |
| **FR-022 over-prescriptive** — forced specific plugin flags | FR-022 relaxed to "preview-build verification"; flags are Plan-phase choice |
| **FR-024 was code style not behaviour** — `unknown` + Zod is style policy | FR-024 deleted; original FR-025 renumbered to FR-024; original FR-026 renumbered to FR-025 |

Two missed alternatives — **SharedWorker** and **host-side idempotent `setActiveModel`** — were folded into the new "Considered Alternatives" section.

## Notes

- This spec is the Phase 2 (Define) output of `/octo:embrace` invoked 2026-05-07 against the user request "Implement features useful for nexus-dnn using IndexedDB / ServiceWorker / WebWorkers". Discover input was the banked SW research checkpoint, not a fresh provider dispatch (per user direction).
- Codex challenge against this spec was dispatched 2026-05-07 (`/tmp/codex_challenge_040_v2_response.md`); the debate gate auto-triggered on **DISAGREE-MAJOR** divergence. Critiques were absorbed into the spec rather than running a separate debate round (faster path; user pre-approved auto-divergence handling per `/octo:embrace` choice 4d).
- `/speckit-plan` and `/speckit-tasks` invocation is the Develop-phase entry point after the human approval gate.
