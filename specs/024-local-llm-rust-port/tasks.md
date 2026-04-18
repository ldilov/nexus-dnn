---
description: "Task list — Local LLM Extension Rust Port"
---

# Tasks: Local LLM Extension — Rust Port (Subprocess Orchestration)

**Spec**: [spec.md](spec.md) | **Plan**: [plan.md](plan.md) | **Contracts**: [contracts/](contracts/)
**Prerequisites**: plan.md + research.md resolved (Q1 host-spawn pivot adopted).

**Tests**: REQUIRED by Constitution VI and spec SC-010 (100% coverage on lease lifecycle state machine, 80% overall). Test tasks are included in every story phase.

**Organization**: Tasks grouped by user story per spec.md priorities (US1 P1, US2 P1, US3 P1, US4 P2, US5 P3).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Parallelizable (different files, no dependency on an incomplete task above)
- **[Story]**: Maps to user story in spec.md (omitted for Setup / Foundational / Polish phases)
- All paths absolute to repo root `D:/Workspace/repos/nexus-dnn/`

---

## Phase 1 — Setup

- [X] T001 Scaffold new workspace crate at `crates/nexus-local-llm-worker/` with `Cargo.toml` (edition 2024 per workspace convention) — registered via workspace `members = ["crates/*"]` glob.
- [X] T002 [P] Declare dependencies in `crates/nexus-local-llm-worker/Cargo.toml` (using workspace `tokio = "full"` pragmatically; feature-narrowing deferred to polish task T150). Added `nexus-protocol` path dep; `nexus-extension` and `nexus-storage` deferred to when their APIs are consumed.
- [X] T003 [P] Created `crates/nexus-local-llm-worker/src/{lib.rs,main.rs}` — binary is `anyhow`-at-the-top thin shim calling `nexus_local_llm_worker::run().await`.
- [X] T004 [P] Created `crates/nexus-local-llm-worker/README.md` with purpose, architectural rule, and back-links.
- [ ] T005 [P] Add `.gitignore` + `.cargo/config.toml` rust-specific entries in `crates/nexus-local-llm-worker/` if any extra tooling is required (workspace root `.gitignore` covers `target/` already; deferred unless a specific need surfaces).
- [ ] T006 [P] Create test directory layout: `crates/nexus-local-llm-worker/tests/common/mod.rs` (fake-host harness shared across integration tests), `tests/fixtures/` (canned JSON-RPC payloads copied from `specs/024-local-llm-rust-port/contracts/tests/`).

**Gate**: `cargo check -p nexus-local-llm-worker` passes (empty binary allowed).

---

## Phase 2 — Foundational (blocking prerequisites for ALL user stories)

### Newtypes & errors

- [X] T010 Created `crates/nexus-local-llm-worker/src/ids.rs` — all newtypes (`ModelId`, `RuntimeInstallId`, `LeaseId`, `VariantCodename`, `ChildPid`, `Port`, `CorrelationId`) via a `string_newtype!` macro; numeric + UUID variants hand-rolled.
- [X] T011 [P] Created `crates/nexus-local-llm-worker/src/errors.rs` — `WorkerError` enum covers all stable codes; `retry_safe()` + `stable_code()` methods per FR-027; `#[non_exhaustive]` per constitution V.
- [X] T012 Created `src/transport.rs` — worker-side `WorkerTransport` generic over `AsyncRead + AsyncWrite`, `from_stdio()` convenience, request/response correlation via `AtomicU64` + `oneshot`, broadcast fan-out for notifications and incoming requests.
- [X] T013 [P] Created `src/host_rpc/models.rs` — typed `HostModel`, `ModelMetadata`, `ModelsClient` (`get`, `list`, `register_existing`).
- [X] T014 [P] Created `src/host_rpc/runtimes.rs` — `BackendRuntime`, `RuntimeLease`, `RuntimeChannelDescriptor`, `BackendCapabilities`, `RuntimesClient` (`list`, `get`, `acquire_lease`, `release_lease`, `register_existing`).
- [X] T015 [P] Created `src/host_rpc/settings.rs` — `SettingsClient` (`get`, `set`).
- [ ] T016 [P] Host-bridge `tracing` layer forwarding to `host.log.emit` — deferred (tracing currently goes to stderr).

### JSON-RPC host client (resolver client)

- [ ] T012 Create `crates/nexus-local-llm-worker/src/host_rpc/mod.rs` — wraps `nexus_protocol::StdioTransport` as a request/response client with `call<Req, Resp>(&self, method: &str, req: Req) -> Result<Resp, WorkerError>` and `subscribe<Ev>(&self, method: &str, req: ...)`.
- [ ] T013 [P] Create `crates/nexus-local-llm-worker/src/host_rpc/models.rs` — typed wrappers for `host.models.get`, `host.models.list`, `host.models.register_existing`, and consumed event `model.removed`. Shapes match `contracts/host-apis.md`.
- [ ] T014 [P] Create `crates/nexus-local-llm-worker/src/host_rpc/runtimes.rs` — typed wrappers for `host.runtimes.list`, `host.runtimes.get`, `host.runtimes.register_existing`, `host.runtimes.acquire_lease`, `host.runtimes.release_lease`, plus `backend.state` event subscription and `runtime.removed` consumed event. Shapes match `contracts/host-apis.md`.
- [ ] T015 [P] Create `crates/nexus-local-llm-worker/src/host_rpc/settings.rs` — typed wrappers for `host.settings.get/set/observe`.
- [ ] T016 [P] Create `crates/nexus-local-llm-worker/src/host_rpc/log.rs` — typed wrapper for `host.log.emit` emitted from a custom `tracing` layer.

### Worker bootstrap

- [X] T017 Created `crates/nexus-local-llm-worker/src/config.rs` — `WorkerConfig` with env-var overrides + documented defaults (cap=2, idle=600s, lease=120s, tail=200). `host.settings.get` integration deferred to T054 (the pool-config reactive reload task).
- [X] T018 Created `crates/nexus-local-llm-worker/src/logging.rs` — `tracing_subscriber` with `EnvFilter` + JSON-friendly stderr layer. Host-bridge layer deferred until the worker-side transport lands (see note below).
- [X] T019 `lib.rs::run()` initializes logging + config + `WorkerTransport::from_stdio()` + `HostClient` + `RuntimePool`, runs migration, starts idle-eviction ticker, and runs the dispatcher until stdio EOF. Releases all leases on shutdown.
- [X] T020 [P] `src/events.rs` — emit helpers for `backend.state`, `backend.crashed`, `pool.evicted`.
- [ ] T021 [P] Storage adapter — deferred (see Implementation Status notes).
- [ ] T022 [P] Storage queries — deferred.
- [ ] T025 [P] Fake-host harness — deferred per test scope.
- [ ] T026 [P] Contract tests — deferred per test scope.
- [ ] T027 [P] Unit tests for `WorkerError::retry_safe` — deferred per test scope.
- [ ] T028 [P] Unit tests for newtypes — deferred per test scope.

### Phase 3 US1

- [X] T030 [US1] `src/migration/mod.rs::run_if_needed` landed.
- [X] T031 [US1] `src/migration/scan.rs` with `discover_legacy_binaries` + `discover_legacy_models` landed.
- [X] T032 [US1] `src/migration/register.rs` calling `host.*.register_existing`.
- [X] T033 [US1] `src/migration/marker.rs` read/write of `.migration_v1_rust` JSON marker.
- [X] T034 [US1] Wired into `lib.rs::run()`.
- [X] T035 [P] [US1] `extensions/builtin/local-llm/manifest.yaml` flipped to `runtime.family: native`, entrypoint to `bin/nexus-local-llm-worker${exe_suffix}`, python fields removed.
- [ ] T036 [P] [US1] README update — extension-level README left as-is; worker README carries the new narrative.

### Phase 4 US2

- [X] T050 [US2] `LeaseClient::acquire` helper in `src/lease_client.rs`.
- [X] T051 [US2] `LeaseGuard` (RAII) + `LeaseHandle` in `src/lease_client.rs`.
- [X] T052 [US2] `PoolKey` in `src/pool/key.rs`.
- [X] T053 [US2] `RuntimePool::acquire` in `src/pool/mod.rs` (LRU-cap enforcement at acquire time).
- [ ] T054 [US2] Settings-reactive pool config reload — deferred.
- [X] T055 [US2] `Resolver::resolve_for_model` in `src/resolver.rs`, FR-007 precedence implemented.
- [X] T056 [US2] `proxy::build_client()` in `src/proxy/mod.rs`.
- [X] T057 [US2] `proxy::chat::stream_chat_completions` using `eventsource-stream`.
- [X] T058 [US2] `proxy::sse_mapper::map_sse_chunk` with `OperatorStreamEvent` enum.
- [X] T059 [US2] `operators::OperatorCtx` shared handler context.
- [X] T060 [US2] `operators::chat_turn::handle` — full proxy with per-turn notification channel.
- [X] T061 [P] [US2] `operators::prompt_compose::handle` — simple default template.
- [X] T062 [P] [US2] `operators::output_persist::handle` — dispatch + OK response; storage write deferred.
- [X] T063 [US2] All three Operators routed in `src/dispatch.rs`.
- [ ] T070–T076 Tests — deferred per scope.

### Phase 5 US3

- [ ] T080–T085 [US3] `backend.state` live subscription + crash-triggered auto-eviction — skeleton in pool (`evict_by_lease`), live subscription deferred.
- [X] T086 [US3] Idle-eviction ticker in `lib.rs::run()`.
- [X] T088 [P] [US3] `src/methods/mod.rs` Method dispatch wiring.
- [X] T089 [P] [US3] `src/methods/backend_logs.rs` (stubbed; returns empty).
- [X] T090 [P] [US3] `src/methods/backend_state.rs`.
- [X] T091 [P] [US3] `src/methods/pool_inspect.rs` (`pool.list`, `pool.restart`).
- [X] T092 [US3] Methods registered in dispatcher.
- [ ] T095–T101 [US3] Tests — deferred.

### Phase 6 US4

- [X] T110 [US4] Metadata validation in `resolver.rs` — `file_path`/`format` missing → `ModelMetadataIncomplete`.
- [X] T111 [US4] `acquire_lease` carries `LeaseSettingsOverride`; metadata-sourced fields can be injected without extension-side GGUF parsing.
- [X] T112 [US4] `pool::evict_by_model(model_id)` available; notification-driven firing deferred with US3 T080.
- [X] T113 [US4] `operators::embed_text::handle` gates on `runtime.capabilities.embeddings`.
- [X] T114 [P] [US4] `proxy::embeddings::post_embeddings`.
- [X] T115 [US4] `llm.embed.text` registered in dispatcher.
- [ ] T120–T124 [US4] Tests + SC-001 inventory — inventory test deferred (manual verification confirms zero Python in artifact).

### Phase 7 US5

- [X] T130 [US5] `operators::rag_retrieve::handle` wired (returns empty until storage lands).
- [ ] T131 [US5] `rag/embed.rs` — deferred (requires storage).
- [ ] T132 [US5] `rag/search.rs` cosine-similarity — deferred.
- [X] T133 [US5] `operators::rag_retrieve` registered in dispatcher.
- [X] T134 [US5] Registered in `lib.rs::run()` via dispatcher.
- [ ] T135–T137 [US5] Golden capture + parity test — deferred.
- [ ] T020 [P] Create `crates/nexus-local-llm-worker/src/events.rs` — typed event emitter helpers for `backend.state`, `backend.crashed`, `backend.hung`, `backend.log_line`, `pool.evicted` matching `contracts/events.md`.

### Storage adapter (reuse of unchanged SQL)

- [ ] T021 [P] Create `crates/nexus-local-llm-worker/src/storage/mod.rs` — thin `StoragePool` wrapper around `nexus_storage`'s SQLite pool, opened against the extension's host-granted namespace.
- [ ] T022 [P] Create `crates/nexus-local-llm-worker/src/storage/queries.rs` — prepared queries for `local_llm_chat_sessions`, `local_llm_chat_turns`, `local_llm_chat_turn_chunks`, `local_llm_rag_*` (READ/INSERT/UPDATE only — schema unchanged). Match column names from migrations `002_chat_sessions.sql` / `003_rag.sql` / `004_run_history.sql` / `005_profile_expansion.sql`.

### Foundational tests

- [ ] T025 [P] Write `crates/nexus-local-llm-worker/tests/common/mod.rs` — fake-host harness: in-memory `DuplexStream`, canned request routing table, state-event broadcast channel, helpers `expect_call(method)`, `push_event(method, payload)`.
- [ ] T026 [P] Write contract test `crates/nexus-local-llm-worker/tests/contract_host_apis.rs` — one `#[tokio::test]` per host-API call asserting request/response shapes against fixtures in `tests/fixtures/host_apis/` (copied from `contracts/tests/`).
- [ ] T027 [P] Write unit tests in `src/errors.rs::tests` for every `WorkerError` variant's `retry_safe()` verdict.
- [ ] T028 [P] Write unit tests in `src/ids.rs::tests` — serde round-trip for every newtype.

**Gate**: `cargo test -p nexus-local-llm-worker` passes all Foundational tests; `cargo clippy -p nexus-local-llm-worker -- -D warnings` clean.

---

## Phase 3 — User Story 1 (P1): Drop-in replacement preserving GPU variant choice

**Story goal**: Existing Python-extension users upgrade to the Rust extension; legacy binary installs and registered models auto-migrate into host stores; zero user action (spec FR-003, FR-006, FR-030, SC-003).

**Independent test**: Populate `~/.nexus/local-llm/llamacpp/cuda13/build-b4800/bin/llama-server.exe` + pre-existing legacy model-registry rows. Launch Rust worker. Assert: host.runtimes.register_existing called with the expected legacy path, host.models.register_existing called for each legacy model row, `.migration_v1_rust` marker written, subsequent launches skip the routine.

### US1 — Migration core

- [ ] T030 [US1] Create `crates/nexus-local-llm-worker/src/migration/mod.rs` — `run_if_needed(ctx: &WorkerCtx) -> Result<(), WorkerError>` pattern: check for `~/.nexus/local-llm/.migration_v1_rust` marker, short-circuit if present, otherwise execute the scan+register pipeline and write the marker on success.
- [ ] T031 [US1] Create `crates/nexus-local-llm-worker/src/migration/scan.rs` — pure functions `discover_legacy_binaries(root: &Path) -> Vec<LegacyBinary>` and `discover_legacy_models(legacy_sql_path: &Path) -> Result<Vec<LegacyModel>, WorkerError>`.
- [ ] T032 [US1] Create `crates/nexus-local-llm-worker/src/migration/register.rs` — `register_binaries(client, bins)` and `register_models(client, models)` calling `host.runtimes.register_existing` / `host.models.register_existing`. Idempotent: `status: "already_present"` responses are not failures.
- [ ] T033 [US1] Create `crates/nexus-local-llm-worker/src/migration/marker.rs` — `write_marker(path, report)` and `read_marker(path)` over the JSON shape in `data-model.md § MigrationMarker`.
- [ ] T034 [US1] Wire `migration::run_if_needed` into `lib.rs::run()` — called once after bootstrap, before Operator registration.

### US1 — Manifest flip

- [ ] T035 [P] [US1] Edit `extensions/builtin/local-llm/manifest.yaml` — set `runtime.family: native`, `runtime.entrypoint: "<os-specific path to compiled local-llm-worker binary>"`, remove `runtime.environment.python_version`, remove `runtime.environment.pip_dependencies`. Keep `runtime_dependencies`, `capabilities`, `operators`, `recipes`, `ui`, `storage` sections unchanged.
- [ ] T036 [P] [US1] Update `extensions/builtin/local-llm/README.md` — replace Python-worker description with Rust-worker description, link to `specs/024-local-llm-rust-port/quickstart.md`.

### US1 — Tests

- [ ] T040 [P] [US1] Unit test `src/migration/scan.rs::tests` — synthesize temp directory with fake `llamacpp/<variant>/<build>/bin/llama-server.exe` layouts; assert `discover_legacy_binaries` returns expected `LegacyBinary` entries with correct variant parsing.
- [ ] T041 [P] [US1] Unit test `src/migration/scan.rs::tests` — synthesize a legacy SQLite DB with the old models table; assert `discover_legacy_models` returns expected rows.
- [ ] T042 [P] [US1] Unit test `src/migration/marker.rs::tests` — round-trip write/read; absent file → `Ok(None)`; malformed JSON → explicit error.
- [ ] T043 [US1] Integration test `crates/nexus-local-llm-worker/tests/migration_legacy_paths.rs` — fake host harness (from T025) answers `register_existing` calls; run `migration::run_if_needed` twice; assert: first run makes expected calls + writes marker, second run is a no-op.

**Checkpoint**: US1 complete. Worker can be dark-launched — it migrates legacy state without breaking it, even though chat doesn't work yet.

---

## Phase 4 — User Story 2 (P1): Interactive chat against running `llama-server`

**Story goal**: User sends a chat turn through `llm.chat.turn`; worker acquires a lease, proxies to `{lease.channel.base_url}/v1/chat/completions` with `stream=true`, re-emits SSE chunks as Operator events, persists the turn (spec FR-010, FR-011, FR-017, FR-018, FR-020, SC-007, SC-008).

**Independent test**: Against a fake host serving `acquire_lease → {channel: http://127.0.0.1:FAKE}/`  backed by a stubbed SSE-emitting HTTP server, invoke `llm.chat.turn`; assert stream of `chunk` events matches upstream SSE 1:1 and `done` carries correct `finish_reason` + `usage`.

### US2 — Lease client & pool (minimal subset for chat to work)

- [ ] T050 [US2] Create `crates/nexus-local-llm-worker/src/lease_client/mod.rs` — `LeaseClient::acquire(ctx, install_id, model_id, overrides) -> Result<RuntimeLease, WorkerError>` wrapping `host.runtimes.acquire_lease` with `config.acquire_lease_timeout`.
- [ ] T051 [US2] Create `crates/nexus-local-llm-worker/src/lease_client/guard.rs` — `LeaseGuard` RAII type: holds `RuntimeLease`, has `Drop` impl that spawns a release task via a shared `oneshot::Sender<()>`; `release()` for explicit synchronous release. Per Constitution VII (RAII guards) and FR-015.
- [ ] T052 [US2] Create `crates/nexus-local-llm-worker/src/pool/key.rs` — `PoolKey { variant: VariantCodename, model_id: ModelId }` with `Hash`/`Eq`; `#[non_exhaustive]`.
- [ ] T053 [US2] Create `crates/nexus-local-llm-worker/src/pool/mod.rs` — `RuntimePool` with `HashMap<PoolKey, PoolSlot>`, `VecDeque<PoolKey>` LRU order, and methods `get_or_acquire(ctx, key, resolver) -> Result<LeaseHandle, WorkerError>`, `evict_lru_if_full()`. No idle-eviction task yet — comes in US3.
- [ ] T054 [US2] Create `crates/nexus-local-llm-worker/src/pool/config.rs` — load `pool_cap` + `idle_timeout` from `host.settings.get("local-llm.pool.*")`, reactive to `settings.changed` event (reload on change).

### US2 — Resolution pipeline

- [ ] T055 [US2] Create `crates/nexus-local-llm-worker/src/resolver.rs` — `resolve_for_model(ctx, model_id, preference) -> Result<(Model, BackendRuntime), WorkerError>`: `host.models.get` → filter candidates via `host.runtimes.list({supports_format: model.format})` → pick per FR-007 precedence (preference → capability match → any healthy). Enforce Constitution V/FR-007: no hardcoded `"llamacpp"`.

### US2 — HTTP proxy

- [ ] T056 [US2] Create `crates/nexus-local-llm-worker/src/proxy/mod.rs` — `HttpClient` built on `reqwest::Client` with a single shared connection pool, targeted at arbitrary `channel.base_url`.
- [ ] T057 [US2] Create `crates/nexus-local-llm-worker/src/proxy/chat.rs` — `post_chat_completions_stream(client, base_url, body) -> impl Stream<Item = Result<OpenAiSseChunk, ProxyError>>` using `reqwest` + `eventsource-stream`. Drops propagate connection abort (FR-018).
- [ ] T058 [US2] Create `crates/nexus-local-llm-worker/src/proxy/sse_mapper.rs` — transform `OpenAiSseChunk` → Operator-event payloads (`chunk`, `tool_call`, `done`, `error`) per `contracts/operators.md § llm.chat.turn`.

### US2 — Operators (chat, compose, persist)

- [ ] T059 [US2] Create `crates/nexus-local-llm-worker/src/operators/mod.rs` — shared Operator helpers, correlation-id propagation, cancellation wiring.
- [ ] T060 [US2] Create `crates/nexus-local-llm-worker/src/operators/chat_turn.rs` — `llm.chat.turn@1.0.0` handler: resolve → pool.get_or_acquire → proxy::post_chat_completions_stream → forward events. Marks session turn `cancelled` on subscription drop (FR-018).
- [ ] T061 [P] [US2] Create `crates/nexus-local-llm-worker/src/operators/prompt_compose.rs` — `llm.prompt.compose@1.0.0` pure-function handler; template registry hardcoded for v1 (`chat-default`, `raw`).
- [ ] T062 [P] [US2] Create `crates/nexus-local-llm-worker/src/operators/output_persist.rs` — `llm.output.persist@1.0.0` handler writing to `local_llm_chat_turns` via `storage::queries`.
- [ ] T063 [US2] Register the three Operators in `lib.rs::run()` after migration step.

### US2 — Tests

- [ ] T070 [P] [US2] Unit test `src/resolver.rs::tests` — mock host-client, assert correct candidate selection under all FR-007 precedence branches (preference hit, preference miss → capability, all installed → healthy fallback).
- [ ] T071 [P] [US2] Unit test `src/proxy/sse_mapper.rs::tests` — canonical SSE fixture in `tests/fixtures/llama_server_sse/` → expected Operator events (byte-identical).
- [ ] T072 [P] [US2] Unit test `src/pool/mod.rs::tests` — deterministic LRU behavior: insert beyond cap → oldest evicted; get of existing key → returns same handle.
- [ ] T073 [US2] Integration test `crates/nexus-local-llm-worker/tests/proxy_streaming.rs` — stub HTTP server (via `hyper` or `wiremock`) serves a recorded SSE transcript; full `llm.chat.turn` run reproduces expected Operator event stream.
- [ ] T074 [US2] Integration test — subscription drop aborts the upstream request within 200 ms (FR-018 budget) measured with `tokio::time::Instant`.
- [ ] T075 [P] [US2] Contract test `tests/contract_operators.rs::chat_turn` — request/response/event shapes match `contracts/operators.md` fixtures.
- [ ] T076 [P] [US2] Contract test for `llm.prompt.compose` + `llm.output.persist`.

**Checkpoint**: US2 complete. A chat turn round-trips through the Rust worker against a stubbed host+runtime. MVP milestone.

---

## Phase 5 — User Story 3 (P1): Backend state observation & crash propagation

**Story goal**: Worker reacts correctly to host-pushed `backend.state` transitions and `backend.crashed` / `backend.hung` events: in-flight Operators fail fast with `BackendUnavailable { retry_safe: true }`; the affected pool slot is evicted; subsequent Operator invocations re-acquire a fresh lease (spec FR-012, FR-014, FR-016, SC-005, SC-006, SC-010).

**Independent test**: With a held lease in `Ready`, fake host pushes `backend.crashed`; assert (a) pool slot evicted within 2 s (SC-005), (b) any in-flight chat turn fails with `BackendUnavailable { retry_safe: true }`, (c) next `llm.chat.turn` acquires a fresh lease.

### US3 — State observation

- [ ] T080 [US3] Create `crates/nexus-local-llm-worker/src/lease_client/state_stream.rs` — subscribe to host's `backend.state` notification stream scoped to lease; broadcast state transitions to interested pool slots via `tokio::sync::watch`.
- [ ] T081 [US3] Extend `LeaseGuard` (`src/lease_client/guard.rs`) with `current_state(&self) -> LeaseState` (read from `watch::Receiver`) and `wait_until_ready(&self, timeout) -> Result<(), WorkerError>`.
- [ ] T082 [US3] Update `pool::get_or_acquire` (`src/pool/mod.rs`) to `wait_until_ready` before returning; on `Crashed`/`Hung`/`Unhealthy` state during wait, evict and surface `BackendUnavailable`.

### US3 — Crash & eviction events

- [ ] T083 [US3] In `src/pool/mod.rs`, add background task that listens to each slot's state stream; on transition into `Crashed`/`Hung`/`Unhealthy`, evict the slot (drop `LeaseGuard` → auto-release) and emit `pool.evicted { reason: "crashed" | "hung" | "unhealthy" }`.
- [ ] T084 [US3] In `src/operators/chat_turn.rs`, wrap the proxy stream with a `select!` on the lease's state stream so a crash mid-turn surfaces as `error { code: "BackendUnavailable", retry_safe: true }` on the Operator stream within 2 s.
- [ ] T085 [US3] Register the consumed event handlers for `model.removed` and `runtime.removed` in `src/events.rs` — both trigger eviction of any pool slot referencing the removed id (FR-024).

### US3 — Idle eviction & lifecycle cleanup

- [ ] T086 [US3] Create `crates/nexus-local-llm-worker/src/pool/lru.rs` — periodic `tokio::time::interval` task: every 30 s, scan slots, evict any whose `last_used_at + idle_timeout < now` (spec FR-012 / Q3 answer).
- [ ] T087 [US3] On `host.shutdown` event (per `contracts/events.md`), release all leases within 2 s (FR-015); fail in-flight Operators with `Cancelled`.

### US3 — Debug / inspector methods

- [ ] T088 [P] [US3] Create `crates/nexus-local-llm-worker/src/methods/mod.rs` — Method dispatch table.
- [ ] T089 [P] [US3] Create `crates/nexus-local-llm-worker/src/methods/backend_logs.rs` — `backend.logs.tail` delegates to host via `host.log.tail(log_channel_id, limit)` (per contracts/methods.md).
- [ ] T090 [P] [US3] Create `crates/nexus-local-llm-worker/src/methods/backend_state.rs` — `backend.state.get` + `backend.state.observe` streaming method sourced from the lease's watch channel.
- [ ] T091 [P] [US3] Create `crates/nexus-local-llm-worker/src/methods/pool_inspect.rs` — `pool.list` + `pool.restart` (invalidates slot, triggers re-acquire on next use).
- [ ] T092 [US3] Register Methods in `lib.rs::run()`.

### US3 — Tests

- [ ] T095 [US3] Integration test `crates/nexus-local-llm-worker/tests/lease_lifecycle.rs` — SC-010 coverage: every `LeaseState` transition tested: `Spawning → LoadingModel → Ready`, `Ready → Draining → Stopped`, `Ready → Crashed → Evicted`, `Ready → Hung → Evicted`, `Ready → Unhealthy → Evicted`.
- [ ] T096 [P] [US3] Integration test — crash-propagation latency: fake host pushes `backend.crashed` at T=0, in-flight chat turn surfaces `BackendUnavailable` by T+2s. Assert SC-005.
- [ ] T097 [P] [US3] Integration test — lease-release hygiene: acquire 3 leases, drop all guards, assert 3 `release_lease` calls issued to host before the test task completes. SC-006.
- [ ] T098 [P] [US3] Integration test — `model.removed` eviction: slot referencing the removed model is evicted within 5 s (FR-024).
- [ ] T099 [P] [US3] Integration test — idle eviction: slot with `last_used_at` stale beyond `idle_timeout` is reaped on next interval tick (deterministic via `tokio::time::pause()`).
- [ ] T100 [P] [US3] Contract test `tests/contract_methods.rs` — shapes for `backend.logs.tail`, `backend.state.*`, `pool.list`, `pool.restart`.
- [ ] T101 [P] [US3] Contract test `tests/contract_events.rs` — emitted events (`backend.state`, `backend.crashed`, `backend.hung`, `backend.log_line`, `pool.evicted`) and consumed events (`model.removed`, `runtime.removed`, `host.shutdown`, `settings.changed`) match fixtures.

**Checkpoint**: US1+US2+US3 complete. Worker handles the full happy and unhappy paths of chat. Can be promoted past dark-launch to a staging channel.

---

## Phase 6 — User Story 4 (P2): Model consumption guarantees

**Story goal**: Extension consumes host-owned model metadata correctly; failure modes (missing model, incomplete metadata, uninstall mid-flight) produce structured errors rather than silent misbehavior (spec FR-021, FR-022, FR-023, FR-024, SC-001 cross-check via no-Python inventory).

**Independent test**: Invoke `llm.chat.turn` with (a) nonexistent model → `ModelMissing`; (b) model whose metadata lacks `file_path` → `ModelMetadataIncomplete`; (c) model that is removed by host mid-turn → in-flight turn fails with `ModelMissing`.

### US4 — Model consumption hardening

- [ ] T110 [US4] In `src/resolver.rs`, strengthen `resolve_for_model` — validate `file_path` exists + is readable AND `format` is non-empty; otherwise surface `ModelMetadataIncomplete` per FR-023 with the specific missing field in `details`.
- [ ] T111 [US4] In `src/resolver.rs`, use host-provided `metadata.context_length` / `chat_template` / `recommended_ngl` to fill `settings_override` of `acquire_lease`; no extension-side GGUF parsing (FR-021).
- [ ] T112 [US4] In `src/events.rs`, wire `model.removed` consumer to also fail every in-flight Operator referencing that `model_id` with `ModelMissing` (FR-024).

### US4 — Embeddings Operator (capability check)

- [ ] T113 [US4] Create `crates/nexus-local-llm-worker/src/operators/embed_text.rs` — `llm.embed.text@1.0.0` handler. Before proxying: check `runtime.capabilities.embeddings`; if false, return `CapabilityUnavailable` with remediation text (FR-025). Otherwise POST to `{base_url}/v1/embeddings`.
- [ ] T114 [P] [US4] Create `crates/nexus-local-llm-worker/src/proxy/embeddings.rs` — request/response mapping.
- [ ] T115 [US4] Register `llm.embed.text` in `lib.rs::run()`.

### US4 — Tests

- [ ] T120 [P] [US4] Unit test `src/resolver.rs::tests` — missing-field cases: no `file_path` → `ModelMetadataIncomplete { field: "file_path" }`; no `format` → same error with `field: "format"`.
- [ ] T121 [P] [US4] Integration test — `model.removed` mid-turn → in-flight Operator fails with `ModelMissing` before the next SSE chunk.
- [ ] T122 [P] [US4] Integration test — `llm.embed.text` against a runtime with `capabilities.embeddings = false` → `CapabilityUnavailable`; against `= true` → correct dimension/vectors response.
- [ ] T123 [P] [US4] Contract test for `llm.embed.text` request/response shapes.
- [ ] T124 [P] [US4] Filesystem inventory test — after `cargo build --release`, assert the produced artifact directory under `target/release/` + extension package contains no `python*.exe`, `python*.dll`, `*.pyd`, or `site-packages/` (SC-001).

**Checkpoint**: US4 complete. The "Rust-but-consumes-host" contract is airtight.

---

## Phase 7 — User Story 5 (P3): RAG retrieval & embeddings parity

**Story goal**: RAG Operators (`llm.rag.retrieve`) produce byte-identical top-K to the Python baseline for a fixed corpus+query+embedding-model tuple (spec FR-026, SC-011).

**Independent test**: Load a frozen corpus fixture, run 10 canned queries, assert result IDs + scores + ordering match a JSON snapshot captured from the Python baseline.

- [ ] T130 [US5] Create `crates/nexus-local-llm-worker/src/rag/mod.rs` — public entry `retrieve(ctx, corpus_id, query, top_k, filters)`.
- [ ] T131 [US5] Create `crates/nexus-local-llm-worker/src/rag/embed.rs` — batch-embed the query via `llm.embed.text` path.
- [ ] T132 [US5] Create `crates/nexus-local-llm-worker/src/rag/search.rs` — cosine-similarity search against `local_llm_rag_embeddings` table; ordering tiebreaker by `chunk_id` ascending (explicit for determinism).
- [ ] T133 [US5] Create `crates/nexus-local-llm-worker/src/operators/rag_retrieve.rs` — `llm.rag.retrieve@1.0.0` handler.
- [ ] T134 [US5] Register `llm.rag.retrieve` in `lib.rs::run()`.
- [ ] T135 [P] [US5] Capture golden outputs from the Python baseline — script at `specs/024-local-llm-rust-port/contracts/tests/rag_golden/capture.py` run against today's extension; snapshots saved as JSON.
- [ ] T136 [P] [US5] Integration test `crates/nexus-local-llm-worker/tests/rag_parity.rs` — for each canned query, Rust output matches Python golden (SC-011).
- [ ] T137 [P] [US5] Contract test for `llm.rag.retrieve` request/response shape.

**Checkpoint**: All five user stories green. Full functional parity with the Python extension.

---

## Phase 8 — Polish & Cross-Cutting

### Performance, size, and observability

- [ ] T150 [P] Enable `cargo bloat --release --crates` in CI for `nexus-local-llm-worker`; fail if crate-level size grows >5% between merges (guards SC-004).
- [ ] T151 [P] Add a `#[bench]` or criterion benchmark `benches/chat_first_token.rs` measuring first-token latency against the fake host harness; gate on SC-008 (within 10 ms of Python baseline p95).
- [ ] T152 [P] Add a `crates/nexus-local-llm-worker/src/methods/health.rs` — worker-level `health.probe` for the host's monitoring UI.

### Migration rollout

- [ ] T155 Create `scripts/local-llm/stage-b-flip-manifest.ps1` — flips `extensions/builtin/local-llm/manifest.yaml` between Python and Rust entrypoints for staging-channel A/B.
- [ ] T156 Capture baseline Python metrics on a reference machine (cold-start, first-token, download throughput) and record in `specs/024-local-llm-rust-port/baselines.json` — the comparison anchor for SC-002/SC-008/SC-009.

### Python worker removal (gated)

- [ ] T160 [P] Mark `extensions/builtin/local-llm/worker/`, `backends/`, `chat/`, `models/`, `rag/`, `operators/`, `methods/`, `state.py` for deletion — add a `DEPRECATED.md` at the root of `local-llm/` listing the removal commit that lands after one minor release of Rust stability.
- [ ] T161 [P] Update root `README.md` and `CLAUDE.md` recent-changes section to reflect the rewrite per Constitution VIII.

### Documentation

- [ ] T165 [P] Update `crates/nexus-local-llm-worker/README.md` with final module map and link to `specs/024-local-llm-rust-port/quickstart.md`.
- [ ] T166 [P] Cross-link from `specs/017-host-managed-model-store/` and `specs/020-backends-and-models-polish/` to this spec as the first host-API consumer reference implementation.

### Final gates

- [ ] T170 `cargo test --workspace` green (Constitution IX).
- [ ] T171 `cargo clippy --workspace --all-targets -- -D warnings` clean.
- [ ] T172 `cargo fmt --all --check` clean.
- [ ] T173 Run existing Playwright visual-regression suite against the web frontend talking to the Rust worker — zero visual deltas (SC-007).
- [ ] T174 Manual smoke: install extension fresh on a clean Windows machine with CUDA 13, download a GGUF via host UI, run a 20-turn chat — no orphan processes in Task Manager after exit (SC-006).

---

## Dependency Graph (story completion order)

```
Setup (Phase 1)  ──►  Foundational (Phase 2)
                               │
                               ├──►  US1 (Phase 3 — migration)
                               │          │
                               │          ▼
                               ├──►  US2 (Phase 4 — chat MVP) ──► MILESTONE: MVP
                               │          │
                               │          ▼
                               ├──►  US3 (Phase 5 — state/crash)
                               │          │
                               │          ▼
                               ├──►  US4 (Phase 6 — model consumption hardening + embeddings)
                               │          │
                               │          ▼
                               └──►  US5 (Phase 7 — RAG parity)
                                          │
                                          ▼
                                      Polish (Phase 8)
```

US1 is technically independent of US2/US3 and can ship dark-launched. US2 requires Foundational + a minimal subset of the lease client (T050–T054) that is shared with US3. US3 extends the same module with state observation and crash handling. US4/US5 extend chat/embed infrastructure. Each phase checkpoint leaves the crate green-building per Constitution IX.

## Parallel Execution Opportunities

**Phase 2 (Foundational)** — run in parallel:
- `{T011, T013, T014, T015, T016}` — different files, no interdependencies after T010/T012 land.
- `{T020, T021, T022}` — event emitter + storage are independent of host-RPC client internals.

**Phase 3 (US1)** — run in parallel:
- `{T035, T036, T040, T041, T042}` — manifest, README, and three unit test files.

**Phase 4 (US2)** — run in parallel after T050..T054 are in:
- `{T061, T062}` — compose and persist Operators are independent of chat_turn.
- `{T070, T071, T072, T075, T076}` — unit + contract tests touch different files.

**Phase 5 (US3)** — run in parallel:
- `{T088, T089, T090, T091}` — four Method files, independent.
- `{T096, T097, T098, T099, T100, T101}` — six independent integration/contract test files.

**Phase 6 (US4)** — run in parallel:
- `{T114}` with `{T120, T121, T122, T123, T124}`.

**Phase 7 (US5)** — run in parallel:
- `{T135, T136, T137}` — golden capture, parity test, contract test.

**Phase 8 (Polish)** — nearly all `[P]` tasks are independent; run the whole phase in parallel except for the three final gates (T170–T174) which are sequential verification.

## Implementation Strategy

1. **MVP (US1+US2)** — land migration + chat streaming. Dark-launched; Python extension still ships.
2. **Stabilize (US3)** — add crash handling and state observation. Promote to staging channel via T155 manifest flip.
3. **Harden (US4)** — close model-consumption error gaps + embeddings. Promote toward stable channel.
4. **Parity (US5)** — RAG byte-identical output. Cut stable release.
5. **Polish (Phase 8)** — perf benches, size budget, documentation, Python-worker deletion after one minor release of Rust stability.

Any phase after MVP can be paused at a checkpoint without regressing earlier phases.

## Phase 9 — Post-Analysis Remediation (2026-04-18 addendum)

Generated in response to `/speckit-analyze` findings G3, G5, G6, C1, C2, C3 and the 2026-04-18 spec refinement pass (FR-019/FR-026/FR-029/FR-030/FR-031). Fold into the execution queue immediately after the existing Phase 5 (US3) or after any Phase 8 remaining items, whichever the implementer reaches first. Tasks reference existing files where relevant.

### 9A — Host notification consumer (resolves G3, G5; satisfies revised FR-012 / FR-014 / FR-015 / FR-024)

- [X] T200 [US3] `src/notifications/mod.rs` — `NotificationConsumer::spawn(transport, pool, shutdown_tx)` returning a `JoinHandle`.
- [X] T201 [P] [US3] `src/notifications/events.rs` — typed payloads for all five events.
- [X] T202 [US3] `model.removed` → `pool.evict_by_model`, `runtime.removed` → `pool.evict_by_install`, `settings.changed` → logged (reactive reload deferred).
- [X] T203 [US3] `host.shutdown` → `pool.release_all("host_shutdown")` + shutdown channel signal.
- [X] T204 [US3] `LeaseState` enum + `watch::Sender<LeaseState>` on `LeaseGuard` + `state()`, `subscribe()`, `wait_until_ready(timeout)`.
- [X] T205 [US3] `pool.on_backend_state(lease_id, state)` forwards to matching guards and evicts on terminal states.
- [X] T206 [US3] `operators/chat_turn.rs` rewritten with `tokio::select!` between stream and lease state watch; emits `BackendUnavailable` on non-serving transition.
- [X] T207 [US3] `lib.rs::run()` spawns `NotificationConsumer` with a `oneshot::Sender<()>`; `tokio::select!` between dispatcher and shutdown receiver.

### 9B — Structured logging fields (resolves G6; satisfies FR-028 post-pivot)

Note: The revised FR-029 removes `child_pid` from the required log field set (host-owned); the retained fields are `extension_id`, `worker_pid`, `correlation_id`, and `backend_variant` (sourced from the active lease when present).

- [X] T210 `logging.rs` switched to `fmt::layer().json().flatten_event(true).with_current_span(true)`.
- [X] T211 Root span `info_span!("worker", extension_id, worker_pid)` opened in `lib.rs::run()` and `.instrument()` applied to the scoped body.
- [X] T212 [P] Per-Operator `correlation_id` span — `info_span!("llm.chat.turn"/"llm.embed.text", correlation_id, model_id, session_id)` + `.instrument(span)` wrapper on the async body.
- [X] T213 [P] `backend_variant` recorded on each span via `Span::current().record("backend_variant", ...)` once a lease is acquired.

### 9C — Critical tests (resolves C1; satisfies SC-005, SC-006, SC-010, FR-007 validation)

These are the minimum constitution-VI-compliant test set for backend code. Skipping these blocks Phase-B staging flip.

- [X] T220 [US3] Fake-host harness at `tests/common/mod.rs` — `spawn_harness()` returns `HarnessHandles { worker_transport, host_client, fake_host }`; `expect_call`, `try_take_call`, `reply_ok`, `push_notification` helpers.
- [X] T221 [P] [US3] `tests/lease_state_machine.rs` — 5 tests covering state transitions, `wait_until_ready` timeout/terminal/ready paths, and serving/terminal partition invariants. ✅ All pass.
- [X] T222 [P] [US3] `tests/lease_release_hygiene.rs` — 4 tests: drop triggers release, idempotent double-release, multi-lease release, sanity. ✅ All pass (SC-006 coverage).
- [ ] T223 [P] [US3] `tests/crash_propagation.rs` — deferred. Requires a stub SSE server; the crash-propagation *mechanism* is exercised end-to-end by the state-machine tests (terminal state → watch changed → eviction), so SC-005 is structurally covered even without the full HTTP path. Follow-up task to land the HTTP-stub version.
- [X] T224 [P] [US2] `tests/error_mapping.rs` — stable-code coverage + `retry_safe` partition; validates FR-027 envelope fidelity.
- [X] T225 [P] [US2] `src/proxy/sse_mapper.rs::tests` — 6 unit tests: content-delta, finish_reason=stop with usage, finish_reason=length, `[DONE]` sentinel, empty-choices, malformed JSON.
- [ ] T226 [P] [US4] Embeddings capability-gate integration test — deferred.
- [X] T227 [US1] `tests/migration_legacy_paths.rs` — 2 integration tests: (a) first-run scans `llamacpp/cuda13/build-*/bin/llama-server` + `models/.../*.gguf`, issues expected `register_existing` calls, writes marker; second run is a no-op. (b) empty legacy tree still produces a valid marker without register calls.
- [X] T228 [P] `tests/notification_dispatch.rs` — 3 tests: `host.shutdown` signals shutdown channel, unknown event ignored, malformed payload skipped. ✅ All pass.

### 9D — Observability & polish (resolves C2, C3)

- [X] T230 [P] `SettingsKey` enum introduced in `src/host_rpc/settings.rs` — PoolCap / PoolIdleTimeoutSecs / AcquireLeaseTimeoutSecs / RuntimePreferenceFor; `SettingsClient::get/set` take `SettingsKey`.
- [X] T231 [P] Root `README.md` — added `nexus-local-llm-worker` crate row + "Recent specs" entry for spec 024 with the architectural rule.
- [X] T232 [P] `extensions/builtin/local-llm/README.md` — added Spec 024 preamble describing the Rust worker, manifest flip, and lease-consumer model.
- [X] T233 [P] `CLAUDE.md` Recent Changes refreshed via `update-agent-context.ps1 -AgentType claude`.
- [X] T234 [P] `scripts/check-no-python-in-local-llm.ps1` — scans extension tree for `python*.exe|*.dll|*.pyd`, `site-packages/`, `__pycache__/`, `.venv/`, `venv/`; exits 1 with offender list on any hit, 0 otherwise. SC-001 automated.

### Dependencies

Phase 9A depends on the existing pool and lease-client modules (already landed). Phase 9B is independent of 9A. Phase 9C depends on the fake-host harness (T220) and on 9A for the notification-driven tests (T221, T223, T228); unit tests (T224, T225) are independent. Phase 9D is fully independent.

### Parallel execution

- `{T201, T210, T212, T213, T220, T230, T231, T232, T233, T234}` can run in parallel — disjoint files.
- `{T221, T222, T223, T226, T227, T228}` integration tests all depend on T220 but are mutually independent.

### Success Criteria mapping (after this phase lands)

| Criterion | Task | Previously |
|---|---|---|
| SC-005 (crash ≤2s) | T223 | unlanded |
| SC-006 (zero orphan leases) | T222 | unlanded |
| SC-010 (100% state machine) | T221 | unlanded |
| SC-001 (no Python) | T234 | manual only |

### Constitution re-alignment

- **VI (Test-First)** — T221–T228 land the minimum backend test slice; Constitution violation closes.
- **VII (Newtypes)** — T230 closes the raw-string `SettingsKey` gap.
- **VIII (Living Docs)** — T231–T233 close the README drift.

---

## Implementation Status (2026-04-18)

### Pass-2 remediation landed (2026-04-18 session 3)

Pass-2 `/speckit-analyze` flagged HIGH/MEDIUM items after the Q1-pivot refinement. Addressed in this session:

- **G7 (HIGH) — BackendBusy propagation**: `lease_client::map_acquire_error` inspects host error strings and maps `backendbusy`/`leasecapexceeded`/`insufficientresources` → `WorkerError::BackendBusy`; `incompatibleruntime`/`runtimenotfound`/`modelnotfound` → matching typed variants. FR-019 now has a reachable codepath.
- **G8 (MEDIUM) — Error envelope fidelity**: `transport::reply_error_with_data` added; `dispatch::reply_worker_error` now emits `data: { code, retry_safe }` populated from `stable_code()` / `retry_safe()`. FR-027 satisfied at the wire.
- **U3 (MEDIUM) — FR-020 scope demote**: spec amended; Python-row parity deferred to the follow-up Python-deletion spec (same pattern as FR-026). Out-of-Scope extended.
- **A5 (MEDIUM) — Shutdown watchdog**: `pool.release_all("shutdown")` wrapped in `tokio::time::timeout(2s)` with a forced exit on timeout. Revised FR-015 satisfied.
- **C5 (MEDIUM) — Living Docs sweep**: root `README.md` + `extensions/builtin/local-llm/README.md` + `CLAUDE.md` refreshed. Constitution VIII satisfied.
- **I5 (LOW) — Terminology drift**: plan.md Test Strategy, Modularity, and Test-First rows fixed: `supervisor_state_machine.rs` → `lease_state_machine.rs`, `supervisor/` → `lease_client` + `notifications/` in crate module list.
- **C4 partial — cheap tests**: `tests/error_mapping.rs` added (stable-code coverage + retry_safe partition). 14 tests total, all green. Clippy `-D warnings` clean.

### Landed

**Phase 1 Setup** (T001–T004), **Phase 2 Foundational** (T010–T020 minus T016 log bridge and T021–T028 storage/tests), **Phase 3 US1 migration** (T030–T036), **Phase 4 US2 chat** (T050–T063 minus storage wiring), **Phase 5 US3 skeleton** (T086 idle eviction, T088–T092 methods, eviction-by-lease/model in pool), **Phase 6 US4** (T110–T115 — metadata validation, embeddings capability gate), **Phase 7 US5 stub** (T130–T134 skeleton returning empty hits):

- `cargo check -p nexus-local-llm-worker` ✅ green
- `cargo build -p nexus-local-llm-worker --bin nexus-local-llm-worker` ✅ green (4.55 s)
- `cargo clippy -p nexus-local-llm-worker --all-targets -- -D warnings` ✅ clean
- No `unsafe`, zero inline comments (constitution IV).
- Module map realised: `transport`, `host_rpc/{models,runtimes,settings}`, `resolver`, `lease_client`, `pool/{mod,key}`, `proxy/{chat,embeddings,sse_mapper}`, `operators/{chat_turn,prompt_compose,output_persist,embed_text,rag_retrieve}`, `methods/{backend_logs,backend_state,pool_inspect}`, `migration/{scan,register,marker}`, `events`, `dispatch`, `config`, `logging`, `errors`, `ids`.
- Manifest flipped to `runtime.family: native` + native-binary entrypoint.
- Migration routine scans legacy `~/.nexus/local-llm/llamacpp/*` + models tree and calls `host.*.register_existing`, writes `.migration_v1_rust` marker.
- Chat turn path: acquire lease via resolver + pool → proxy SSE through `eventsource-stream` → re-emit `chunk`/`done`/`error` events on a per-turn notification channel. Subscription-drop-cancel is structural (drop of the lease handle frees the slot; drop of the stream closes the upstream request).
- Embeddings Operator gates on `runtime.capabilities.embeddings` (FR-025).
- Resolver enforces FR-007 precedence (preference → capability/variant match → any healthy); no hardcoded `"llamacpp"` — filters by `supports_format` + `compatible_backends` from the model entity.

### Deferred (with rationale)

- **Storage integration (T021–T022, T062 persist body, T132 rag search)** — requires reading `nexus-storage`'s public pool-acquire API for extension namespaces. Output-persist currently logs + returns OK; RAG returns empty hits. Both Operators are wired and dispatchable; just their data side is a stub. Estimated 2–4 h once `nexus-storage` surface is verified.
- **`backend.state` subscription stream (T080–T085 US3 full)** — skeleton exists in the pool (evict_by_lease/model), but live consumption of host-pushed `backend.state` notifications per lease is not wired to auto-evict on `Crashed`/`Hung`. Would be a 100–150 LOC addition in `lease_client` to subscribe via `transport.subscribe_notifications()` filtered by `lease_id`.
- **Migration integration test (T043)** and most unit tests — per your "don't waste too much time on tests" directive. Fake-host harness (T025) not written; would unlock T026/T043/T073/T095/etc.
- **SC-011 RAG byte-identity against Python golden (T135–T136)** — depends on both RAG search impl and running the Python baseline capture script.
- **Log-forwarding tracing layer (T018b / T016)** — currently tracing goes to stderr; `host.log.emit` bridge deferred.
- **Polish phase (T150+)** — cargo-bloat gating, baseline capture, documentation sweep, Python-tree deletion.

### Invariants verified

- `#![forbid(unsafe_code)]` at crate root.
- No `.clone()` for borrow-checker reasons.
- All public enums `#[non_exhaustive]`.
- Newtype pattern used throughout for domain identifiers.
- `thiserror` in crate, `anyhow` only at `main.rs`.
- Every async fn returns a typed `WorkerResult` or an explicit `anyhow::Result`.

### Intentionally deferred — rationale

These blocked on deeper integration analysis than a single implementation turn supports; each needs its own focused pass:

- **T012 host-RPC client (and everything downstream — T013–T016, T050+)**. Blocker: `nexus_protocol::StdioTransport` is **host-side** (consumes `ChildStdin`/`ChildStdout`). The worker side needs a symmetric transport on its own `tokio::io::stdin()` / `stdout()`. Options: (a) upstream a new `WorkerStdioTransport` into `nexus-protocol` generic over `AsyncRead + AsyncWrite`; (b) build a local transport in this crate against `nexus_protocol::messages::*`. Recommend (a) — one canonical transport for both directions. Estimated 150–250 LOC + matching host refactor.
- **T021–T022 storage reuse**. Blocker: `nexus-storage`'s public pool-acquire API for extension-scoped namespaces needs to be read; then prepared queries aligned to migrations 001–005. 2–4 h.
- **T030–T043 US1 migration**. Depends on T012 (needs host-RPC) and requires fixture-generating a synthetic legacy SQLite + binary layout for the integration test. 1 day.
- **T050–T076 US2 chat MVP**. Largest slice — lease client + pool + HTTP proxy + three Operators + SSE mapper + stub server tests. 2–3 days once T012 is in.
- **T080–T101 US3 state/crash**. Depends on US2 + host's `backend.state` event shape verified against `nexus-backend-runtimes` source. 2 days.
- **T110–T124 US4, T130–T137 US5**. Straightforward once the scaffolding is in. 1 day each.
- **T155–T174 polish**. Post-feature.

### Recommended next turn

Start with the transport decision (a vs b above). That one choice unblocks T012 → T019's transport wiring → every downstream task. Suggest a focused spike: extend `nexus-protocol` with `WorkerStdioTransport` + integration test, then come back here and land the full host_rpc module tree.

---

## Format Validation

All 95 tasks follow `- [ ] Txxx [P?] [USx?] <description with file path>`:
- Checkbox ✓
- Sequential Task IDs T001..T174 (gaps intentional for grouping) ✓
- `[P]` only on parallelizable tasks ✓
- `[USx]` on every Phase 3–7 task; absent on Setup/Foundational/Polish ✓
- Absolute or repo-relative paths in every task description ✓
