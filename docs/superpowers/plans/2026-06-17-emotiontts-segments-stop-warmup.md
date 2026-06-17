# emotion-tts: segment progress + Stop-all-workers + warmup

> Execute via superpowers:subagent-driven-development. All changes stay under `extensions/builtin/emotion-tts/` (host↔extension boundary). Three independent surfaces; two backend ones (WS-I) share a pool-threading foundation.

**Goal:** fix three emotion-tts issues observed in Recipe Studio:
1. Storyboard SEGMENT rows + the below-textbox progress bar never advance off `QUEUED` (no live progress/completion), even though audio renders.
2. "Stop runtime" leaves pooled workers alive (VRAM lingers).
3. New feature: WARMUP — preload workers on Start so they're ready (no cold model-load on first generate). **User choice: auto-warm on Start, with an opt-out toggle; non-blocking; reuse `model.load`; warm the active worker count.**

**Grounding:** root causes confirmed by code reads 2026-06-17 (3 parallel investigations). DGX live image = `ldilov/nexusdnn:dgx-heal`.

---

# WS-H — Storyboard segments never show progress (named-SSE-event mismatch)

**Root cause (HIGH conf):** the frontend SSE transport `subscribeSse` binds only `es.onmessage`, which (per WHATWG EventSource) fires ONLY for events whose SSE `event:` field is absent/`message`. But the emotion-tts backend emits **named** events (`segment_started`/`segment_completed`/`segment_failed`/`run_terminal`). So every per-segment frame is dropped by the browser → the `items` map stays frozen at all-`queued` → BOTH UI surfaces (PRE-FLIGHT SEGMENTS grid + below-textbox carousel cards) read that frozen map and never advance. Audio still renders because that path is DB-driven (`run_loop.rs::forward_notification`), not SSE. The test suite missed it by mocking `subscribeRunProgress` at the function boundary (bypassing EventSource).
- Evidence: consumer `extensions/builtin/emotion-tts/web/src/services/http.ts:49-59` (only `es.onmessage`); producer `…/rust/src/router/runs.rs:158,172,192,202,213,225` (all `Event::default().event(name)…`); names from `…/rust/src/dispatcher/events.rs:47-54`. Corroboration: host SSE handlers use UNNAMED events + `onmessage` and work (`crates/nexus-api/src/handlers/host/run_events.rs:97`). Affects single-utterance mode too (same transport).

**Files:** `extensions/builtin/emotion-tts/web/src/services/http.ts`; new test `web/tests/unit/subscribe_sse.test.ts`; (optional contract guard) `extensions/builtin/emotion-tts/rust/src/dispatcher/events.rs` `#[cfg(test)]`; rebuild + commit `web/dist/emotion-tts.{js,css}`.

### Task H1: subscribeSse listens for named events
- [ ] **RED** `web/tests/unit/subscribe_sse.test.ts`: stub `EventSource` (capture `addEventListener(name,…)` + `onmessage`); dispatching a `segment_completed`-named event invokes `onEvent` with the parsed payload. Fails today (only `onmessage` wired).
- [ ] **GREEN** in `http.ts`, `subscribeSse` registers `addEventListener` for `["segment_started","segment_completed","segment_failed","run_terminal"]` (a default list param, overridable) AND keeps `es.onmessage` for forward-compat. Payload carries serde `type` tag, so the reducer's discriminated union is unchanged. Cleanup closes the ES (existing return). Do NOT touch `model_store_client.ts` (its own ES, unnamed events, already works).
- [ ] **Verify** `pnpm vitest run tests/unit/subscribe_sse.test.ts` then full `pnpm vitest run && pnpm tsc --noEmit`. **Commit.**

### Task H2: integration test through real subscribeRunProgress (guard the layer that was mocked away)
- [ ] **RED→GREEN** `web/tests/unit/subscribe_run_progress.test.ts`: wire a fake `EventSource` through `runs_client.subscribeRunProgress` (NOT the function-boundary stub) and assert a `segment_started` named frame flows into `applyEvent` → item becomes `generating`. **Verify** `pnpm vitest run`. **Commit.**

### Task H3 (contract guard): pin emitted event names (Rust)
- [ ] Add/confirm a unit test in `rust/src/dispatcher/events.rs` asserting `sse_event_name()` returns exactly `segment_started|segment_completed|segment_failed|run_terminal` so the frontend's listener list can't silently drift. **Verify** `cargo test -p emotion-tts-extension events`. **Commit.**

### Task H4: rebuild + commit dist
- [ ] `pnpm build`; commit `web/dist/emotion-tts.{js,css}`. **DGX smoke (operator):** Start runtime, cast 2 segments, Generate → SEGMENTS grid + carousel advance QUEUED→generating→done; DevTools EventStream shows named `segment_*` frames consumed.

**Boundary:** extension-only. PASS.

---

# WS-I — Stop kills ALL workers + warm-on-Start (shared: thread the pool into the router)

**Root cause (shared, HIGH conf):** the runtime runs a `LeaseProviderPool` of up to `EMOTIONTTS_MAX_WORKERS` (default 4) providers, but `register.rs:268` builds the router with only the **primary** `Arc<LeaseProvider>` — the pool goes only to the dispatcher + idle-watcher. So `RuntimeState` (`router/runtime.rs:28-32`, `router/mod.rs:110`) can't see the extras. ⇒ (#2) `/runtime/stop` calls `state.provider.stop()` (`runtime.rs:200`) → releases only the primary; pooled extras (spawned for concurrent runs) survive as orphaned workers holding VRAM. ⇒ (#3) `/runtime/start` calls `provider.spawn_if_needed()` (primary only); extras cold-load lazily on first parallel run.
- Releasing a lease DOES kill the process (`stdio_lease.rs:245-304`: shutdown RPC → close stdin → grace → `child.kill()`); no warm-pool reuse — each provider holds one long-lived lease + resident model.
- Model is ALREADY eager-loaded at acquire (`host_adapter.rs:133-229` fires `model.load`, holds `Starting`→`Ready` until VRAM-resident). So warmup = pre-acquire the extras; no new worker RPC — reuse `model.load` via `spawn_if_needed`.
- emotion-tts leases are NOT registered with the host `LeaseManager` (extension-private), so the host `installs_stop` fan-out is a no-op here — the fix is fully extension-side and boundary-clean.

**Files:** `rust/src/dispatcher/pool.rs`, `rust/src/router/runtime.rs`, `rust/src/router/mod.rs`, `rust/src/register.rs`, plus all router-constructing test call-sites; web `src/services/runtime_client.ts`, `src/services/worker_pref.ts` (or equiv), the runtime/header component (`deployment_header.tsx`) + `host_action_bridge.ts`; rebuild + commit `web/dist/emotion-tts.{js,css}`.

## WS-I-rust (one cohesive backend task — pool threading + stop_all + warm + health)

### Task I1: thread `Arc<LeaseProviderPool>` into the router (pure wiring)
- [ ] Add `pool: Arc<LeaseProviderPool>` to `RuntimeState` (`router/runtime.rs:28-32`); add a `pool` param to `build_router_with_families` (+ `build_router`) in `router/mod.rs`; pass `pool.clone()` from `register.rs:268` (pool exists at `register.rs:252`). Keep the primary `provider` for single-provider ops/health. Update ALL test call-sites that build the router (`tests/*`, e.g. `runtime_handshake_test.rs`, `dispatcher_e2e_test.rs`, `http_contract_*`) — use `LeaseProviderPool::single(...)` or the real pool. **Verify** `cargo build -p emotion-tts-extension && cargo test -p emotion-tts-extension --no-run`. **Commit.**

### Task I2 (#2): `LeaseProviderPool::stop_all()` + Stop/restart drain the pool
- [ ] **RED** in `pool.rs` `#[cfg(test)]`: a `CountingLeaseFactory` whose `release()` bumps an `AtomicUsize`; build `with_ceiling(factory, primary, N)`, force all N providers live, assert a (new) `pool.stop_all().await` releases ALL N (counter==N). Also `rust/tests/runtime_stop_pool_test.rs`: build the router (counting factory, ceiling 3), warm all 3, `POST /runtime/stop` → 202 AND counter==3.
- [ ] **GREEN** add `LeaseProviderPool::stop_all()` (iterate all providers, `provider.stop().await` each, best-effort aggregate errors — one failure must not skip the rest). Change `stop_impl` (`runtime.rs:181-205`) to `state.pool.stop_all()` after the queue-cancel cascade. Fix `restart` (`runtime.rs:207-212`) to `pool.stop_all()` then re-spawn (it has the same single-provider bug). **Verify** `cargo test -p emotion-tts-extension --lib dispatcher::pool` + `--test runtime_stop_pool_test`. **Commit.**

### Task I3 (#3): warm-on-Start + health warm counts (default ON, non-blocking)
- [ ] **RED** add `#[serde(default = "default_true")] warmup: bool` to `StartRequest`; `rust/tests/runtime_warmup_test.rs` with a mock factory: `POST /runtime/start {numWorkers:3, warmup:true}` ⇒ `acquire()` called 3× (warm 3); `warmup:false` ⇒ lazy (no extra acquires). `pool.warm_counts()->(warming,warm)` reported; `/runtime/health` JSON carries `workersWarm`/`workersWarming` and badge stays `starting` while any warming.
- [ ] **GREEN** in `start()` (`runtime.rs:155-172`): after `set_max_in_flight(requested)`, if `warmup`, spawn a BACKGROUND task that `join_all`s `spawn_if_needed()` over `pool.providers()[..requested]` (each `spawn_if_needed`→`factory.acquire()`→eager `model.load`). Keep the HTTP response **non-blocking 202** (don't await the warm). Add `pool.warm_counts()` (derive from each provider's lease state); extend `health_impl` to report `workersWarm`/`workersWarming`. **Verify** `cargo test -p emotion-tts-extension --test runtime_warmup_test`. **Commit.**

### Task I4: full backend gate
- [ ] `cargo test -p emotion-tts-extension && cargo clippy -p emotion-tts-extension -- -D warnings && cargo fmt -p emotion-tts-extension --check` + `cargo test -p nexus-extension-deps --test boundary_test` (host boundary clean). **Commit** fixups.

## WS-I-web (warmup UI — depends on WS-I-rust /runtime/start + /runtime/health contract)

### Task I5: client + pref carry warmup
- [ ] `services/runtime_client.ts`: `startRuntime(numWorkers, warmup)` sends `warmup` in the body; `RuntimeHealth` gains `workersWarm?`/`workersWarming?`. `worker_pref.ts` (or equiv): `getDesiredWarmup()/setDesiredWarmup()` (default true). Unit-test the client serialises `warmup`. **Verify** `pnpm vitest run tests/unit && pnpm tsc --noEmit`. **Commit.**

### Task I6: UI toggle + warming badge
- [ ] In the runtime header (`deployment_header.tsx`): a "Preload models on start" checkbox next to the WORKERS selector bound to `setDesiredWarmup`; render `"Warming {workersWarm}/{workers}…"` when `workersWarming>0`. `host_action_bridge.ts:~132` `startRuntime(getDesiredWorkers())` → `startRuntime(getDesiredWorkers(), getDesiredWarmup())`. Preserve the StatusPill pill-padding rule; confirm real token names. **Verify** `pnpm tsc --noEmit && pnpm vitest run`. **Commit.**

### Task I7: rebuild + commit dist
- [ ] `pnpm build`; commit `web/dist/emotion-tts.{js,css}`. **DGX smoke (operator):** Start with WORKERS=2 + warmup on → badge shows "Warming 1/2…→ready"; `docker exec nexusdnn ps` shows 2 warm python workers; first Generate is instant. Stop → ALL workers gone (`ps` empty, VRAM reclaimed). Toggle off → Start spawns without preloading.

**Boundary:** all extension-side; host stop stays generic; no new host coupling; reuses `model.load` (generic protocol method). PASS.
**Defaults locked:** warmup default ON (opt-out toggle); warm = active `numWorkers` (not ceiling); non-blocking 202 Start; no new worker RPC; idle-watcher may still reap warm-idle extras after the idle timeout (acceptable; note in UI copy).
**Risk:** N warm workers = N× model VRAM — the header already hints `~Nx model VRAM`; keep that visible. Health warm-count derivation must read lease state, not parse `model.load.progress` streams.
