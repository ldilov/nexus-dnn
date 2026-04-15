# Tasks: Host Runtime Pool — Backend Runtime Capability & Shared Runtime Channel

**Input**: Design documents from `/specs/011-host-runtime-pool/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Spec mandates automated verification for all six user stories; TDD per constitution §testing. Test tasks are included and MUST be written before their implementation counterparts.

**Organization**: Tasks are grouped by user story. US1-US4 are P1 (must all ship together to deliver value). US5-US6 are P2 (extend the architecture). Each story is independently testable.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Parallelizable — different files, no dependencies on other incomplete tasks in the same phase
- **[Story]**: US1 / US2 / US3 / US4 / US5 / US6 or no label for Setup/Foundational/Polish

## Path Conventions

Web application layout (per plan.md §Project Structure):
- Rust host: `crates/nexus-backend-runtimes/src/`, `crates/nexus-api/src/`
- Host migrations: `migrations/`
- Frontend: `apps/web/src/`
- Python extension worker: `extensions/builtin/local-llm/worker/`
- Rust tests: `crates/*/tests/`
- Contract tests: `tests/contract/`

## Sequencing invariant

Per plan.md §"Implementation Sequencing", every commit MUST leave the workspace green-building. No commit is allowed to leave `nexus-local-llm` half-removed. The tasks below are sequenced so a strict top-down walk produces a bisectable history.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the new crate skeleton, the migration file, and the parameter-catalog asset wiring — without moving any code yet.

- [X] T001 Create new host crate `crates/nexus-backend-runtimes/` via `cargo new --lib crates/nexus-backend-runtimes` and add it to the root `Cargo.toml` `[workspace.members]` while leaving `nexus-local-llm` in place
- [X] T002 Populate `crates/nexus-backend-runtimes/Cargo.toml` with deps mirroring `nexus-local-llm` (tokio, tokio-util, serde, serde_json, thiserror, tracing, semver, chrono, reqwest rustls-tls+stream, sha2, zip, tar, flate2, jsonschema, camino, ulid, sqlx runtime-tokio/sqlite/json/chrono, futures-util, async-trait, serde-saphyr 0.0.10) and add `rust-embed = { workspace = true }` for the catalog asset
- [X] T003 [P] Create empty module skeletons with `//!` doc headers (no inline comments) in `crates/nexus-backend-runtimes/src/lib.rs` listing `adapter`, `channel`, `lease`, `spawn`, `reserved_policy`, `parameter_catalog`, `installs_store`, `state`, `state_log`, `validator`, `launch_spec`, `log_pipeline`, `log_store`, `resolver`, `detect`, `settings`, `settings_store`, `events`, `download`, `extract`, `checksum`, `error`, `llamacpp`, `tensorrt_llm`
- [X] T004 [P] Author migration `migrations/008_host_runtime_pool.sql` matching data-model.md §Schema Delta (host_runtime_installs + host_runtime_leases + host_runtime_state_log + indexes)
- [X] T005 [P] Copy the 213-entry llama.cpp parameter catalog from `specs/011-host-runtime-pool/llamacpp-launch-parameter-catalog.json` to `crates/nexus-backend-runtimes/src/assets/llamacpp_parameter_catalog.json` so `rust-embed` can package it
- [X] T006 Register migration 008 in `crates/nexus-storage/src/sqlite.rs::run_migrations` following the existing pattern for migrations 005-007 (split on `;`, ignore `duplicate column` where appropriate)
- [X] T007 Verify clean baseline: `cargo check --workspace` green with the empty new crate + registered migration

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core types + migration runner + parameter catalog loader. Nothing moves from `nexus-local-llm` yet; nothing calls `nexus-backend-runtimes` yet either. Isolated green build.

### Core types (new modules)

- [X] T008 [P] Implement `RuntimeChannelDescriptor`, `RuntimeChannelKind`, `ApiDialect`, `RuntimeAddress`, `RuntimeEndpoint` in `crates/nexus-backend-runtimes/src/channel.rs` with `#[derive(Serialize, Deserialize)]`
- [X] T009 [P] Implement `RuntimeLease`, `RuntimeLeaseId`, `RuntimeLeaseBuildCtx`, `ChannelBuildCtx` in `crates/nexus-backend-runtimes/src/lease.rs`
- [X] T010 [P] Implement `SpawnRuntimeRequest`, `RuntimeBindMode`, `SpawnError` (with `ManagedSpawnDisallowed`, `ReservedLaunchSetting`, `FamilyUnavailable`, `RuntimeNeedsRepair` variants) in `crates/nexus-backend-runtimes/src/spawn.rs`
- [X] T011 [P] Implement `ParameterPolicy` enum (4 tiers) + `ParameterCatalog` + `ParameterCatalogEntry` in `crates/nexus-backend-runtimes/src/parameter_catalog.rs` with `rust-embed`-based loader that decodes the JSON asset into `Arc<ParameterCatalog>` cached via `OnceCell`
- [X] T012 [P] Implement `ReservedPolicy::classify(flag_or_env)` in `crates/nexus-backend-runtimes/src/reserved_policy.rs` consulting the parameter catalog; returns `ParameterPolicy` or `Unknown`; `Unknown` flags pass through (per FR-027, FR-037)
- [X] T013 [P] Define the new `BackendRuntimeCapability` trait in `crates/nexus-backend-runtimes/src/lib.rs` with `ensure_installed`, `list_installed`, `list_families`, `get_parameter_catalog`, `spawn`, `shutdown`, `validate`, `repair`, `uninstall`, `list_dependents`, `subscribe_events` methods

### Migration runner

- [X] T014 Implement `migrate_from_legacy(pool)` in `crates/nexus-backend-runtimes/src/installs_store.rs` that detects the presence of `ext_local_llm_runtime_installs`, copies rows into `host_runtime_installs` with explicit column mapping (backend→family, accelerator_profile→accelerator, install_path→install_root, status→state with `ready → installed`/`installed_unvalidated → installed`/`broken → needs_repair`), and renames the old table to `ext_local_llm_runtime_installs_migrated_008`
- [X] T015 Add `hydrate_on_start(pool)` in the same file that runs `UPDATE host_runtime_leases SET released_at = datetime('now'), ready = 0 WHERE released_at IS NULL` unconditionally (per R3)
- [X] T016 [P] Add `CardState` → new `InstallState` enum in `crates/nexus-backend-runtimes/src/state.rs` with `Installing`, `Installed`, `NeedsRepair`, `Failed` variants and the state-transition guard `InstallState::transition(from, to) -> Result<(), IllegalTransition>` that rejects `Installed → Installing`, `Installed → Failed`, and permits `Installed → NeedsRepair` only via the reconciler path
- [X] T017 [P] Implement `state_log::append` in `crates/nexus-backend-runtimes/src/state_log.rs` writing to `host_runtime_state_log` inside the caller's transaction

### Tests (write first — RED)

- [X] T018 [P] Unit tests `crates/nexus-backend-runtimes/src/parameter_catalog.rs#tests`: load shipped catalog; assert `total_entries == 213`; assert `--port` is `HostInjected`; assert `--ctx-size` is `ExtensionPassthrough`; assert `--novel-future-flag` classifies as `ExtensionPassthrough` (unknown fall-through)
- [X] T019 [P] Unit tests `crates/nexus-backend-runtimes/src/reserved_policy.rs#tests`: table-driven with one flag per tier for llama.cpp (at minimum `--help` managed-spawn-disallowed, `--port` host-injected, `--api-key` host-governed, `--ctx-size` extension-passthrough, `--novel-flag` unknown → passthrough)
- [X] T020 [P] Unit tests `crates/nexus-backend-runtimes/src/state.rs#tests`: exhaustive transition matrix; assert `Installed → Installing` returns `IllegalTransition`; assert `Installed → NeedsRepair` via `reconciler_probe` trigger succeeds
- [ ] T021 [P] Integration test `crates/nexus-backend-runtimes/tests/migration_008.rs` with three fixtures: (a) fresh DB → empty `host_runtime_installs`; (b) one legacy row → exactly one migrated row with correct mapping + old table renamed; (c) migration run twice → idempotent, row count stable
- [ ] T022 [P] Integration test `crates/nexus-backend-runtimes/tests/lease_hydration.rs`: insert active lease row with `released_at IS NULL`, call `hydrate_on_start`, assert `released_at IS NOT NULL` and `ready = 0`

### Verification

- [X] T023 Verify foundational phase: `cargo test -p nexus-backend-runtimes`, `cargo clippy -p nexus-backend-runtimes --all-targets -- -D warnings`, `cargo check --workspace`. New crate is self-contained; nothing else depends on it yet.

**Checkpoint**: Foundational complete. User-story phases can now begin.

---

## Phase 3: US2 — `nexus-local-llm` removed, extension owns domain (P1)

**Story goal**: Generic runtime plumbing lives in `nexus-backend-runtimes`; domain logic lives in `extensions/builtin/local-llm/`; `nexus-local-llm` is deleted.

**Independent test criteria**: `ls crates/nexus-local-llm` fails; `cargo tree -p nexus-backend-runtimes` shows zero extension-crate edges; `grep -rn "nexus_local_llm\|nexus-local-llm" crates/ extensions/ apps/` returns zero hits.

**Note**: This story runs FIRST because US1/US3/US4 all depend on code that currently lives in `nexus-local-llm`. The file moves are a prerequisite for the new contract surfaces.

### Move plumbing (file-by-file, adjusting module paths, zero semantic change)

- [X] T024 [US2] Move `crates/nexus-local-llm/src/adapter.rs` → `crates/nexus-backend-runtimes/src/adapter.rs`; update `use` paths internally; remove from `nexus-local-llm/src/lib.rs` re-exports
- [X] T025 [P] [US2] Move `crates/nexus-local-llm/src/resolver.rs` → `crates/nexus-backend-runtimes/src/resolver.rs`
- [X] T026 [P] [US2] Move `crates/nexus-local-llm/src/detect.rs` → `crates/nexus-backend-runtimes/src/detect.rs`
- [X] T027 [P] [US2] Move `crates/nexus-local-llm/src/settings.rs` and `settings_store.rs` → `crates/nexus-backend-runtimes/src/settings.rs` and `settings_store.rs`
- [X] T028 [P] [US2] Move `crates/nexus-local-llm/src/events.rs` → `crates/nexus-backend-runtimes/src/events.rs`; extend with new variants `ProcessStarted`, `ChannelReady`, `ProcessExited`, `ProcessWithdrawn`, `InstallUnavailable`
- [X] T029 [P] [US2] Move `crates/nexus-local-llm/src/download.rs`, `extract.rs` → `crates/nexus-backend-runtimes/src/download.rs`, `extract.rs`
- [X] T030 [US2] Move `crates/nexus-local-llm/src/checksum.rs` → `crates/nexus-backend-runtimes/src/checksum.rs`; delete the duplicate that lives in `crates/nexus-huggingface/src/checksum.rs` (spec 010 bandaid) and update `nexus-huggingface::lib.rs` to `pub use nexus_backend_runtimes::checksum`
- [X] T031 [P] [US2] Move `crates/nexus-local-llm/src/launch_spec.rs` → `crates/nexus-backend-runtimes/src/launch_spec.rs`
- [X] T032 [P] [US2] Move `crates/nexus-local-llm/src/log_pipeline.rs`, `log_store.rs` → `crates/nexus-backend-runtimes/src/log_pipeline.rs`, `log_store.rs`
- [X] T033 [P] [US2] Move `crates/nexus-local-llm/src/validator.rs` → `crates/nexus-backend-runtimes/src/validator.rs`; add `reconcile(install) -> Option<StateTransition>` returning `None` or `Some(Installed → NeedsRepair)` only (spec 010 US1 invariant finally lands)
- [ ] T034 [US2] Move `crates/nexus-local-llm/src/manifest/version.rs` and `install.rs` and `schemas.rs` → `crates/nexus-backend-runtimes/src/manifest/version.rs`, `install.rs`, `schemas.rs` (create new `manifest/mod.rs` in the target crate)
- [ ] T035 [US2] Move `crates/nexus-local-llm/src/llamacpp/*` → `crates/nexus-backend-runtimes/src/llamacpp/*` (mod.rs, install_pipeline.rs, probe.rs, installs_store.rs). Rewrite `installs_store.rs` to target `host_runtime_installs` instead of `ext_local_llm_runtime_installs` — this is the P1 schema switch
- [X] T036 [US2] Move `crates/nexus-local-llm/src/tensorrt_llm_stub.rs` → `crates/nexus-backend-runtimes/src/tensorrt_llm/mod.rs`; keep stub behavior — returns `ImplementationStatus::Unavailable { reason: "TensorRT-LLM runtime not yet implemented" }` on every method (per R6)
- [X] T037 [US2] Move `crates/nexus-local-llm/src/error.rs` → `crates/nexus-backend-runtimes/src/error.rs`; extend with `ReservedLaunchSetting(flag)`, `ManagedSpawnDisallowed(flag)`, `FamilyUnavailable { family, reason }`, `RuntimeNeedsRepair(install_id)`, `IllegalTransition` variants

### Extract domain into the extension (Python worker — per R1)

- [X] T038 [US2] Port the routing logic from `crates/nexus-local-llm/src/manifest/install_models.rs::route_backend` into `extensions/builtin/local-llm/worker/models/router.py` — tiered signals (GGUF file → llamacpp; `*.engine` file → trt-prebuilt; architecture in allowlist → trt-architecture; else NoRoute); use existing `huggingface_hub` imports
- [X] T039 [US2] Port `ModelInstaller::begin` into `extensions/builtin/local-llm/worker/models/installer.py` — accept repo_id/revision/files, call `HfClient.download`, parse `config.json` for model limits (`max_position_embeddings`, `vocab_size`, etc.), commit to `ext_local_llm_model_installs` via existing extension storage bindings
- [X] T040 [US2] Port hyperparameter validation from `install_models.rs::validate_profile_against_limits` into `extensions/builtin/local-llm/worker/models/hyperparameters.py` — same bounds checks (`temperature ∈ (0, 2]`, `max_context_length ≤ model.max_context`, `n_gpu_layers ≤ model.num_layers`), raise a `HyperparametersOutOfRange` exception with `field` + `model_limit` payload
- [ ] T041 [US2] Register new RPC methods in `extensions/builtin/local-llm/worker/methods/__init__.py`: `llm.install_model`, `llm.cancel_install_task`, `llm.list_models`, `llm.patch_hyperparameters`. Implementations forward to the ported Python modules; the existing `/api/v1/extensions/nexus.local-llm/rpc` dispatch covers them
- [ ] T042 [US2] Update `apps/web/src/api/client.ts` to call the extension RPC surface for model operations: replace `listExtensionModels`/`installExtensionModel`/etc. with RPC POSTs to `/api/v1/extensions/nexus.local-llm/rpc` with `method: "llm.list_models"` etc. Generic `/api/v1/huggingface/search` (spec 010) remains host-level and unchanged

### Callers

- [X] T043 [US2] Rewrite every `use nexus_local_llm::*` → `use nexus_backend_runtimes::*` across `crates/nexus-api/src/`, `crates/nexus-core/src/`, and any tests. Do NOT change type signatures in this pass (that's US3/US4)
- [X] T044 [US2] Delete `crates/nexus-local-llm/src/manifest/install_models.rs` (the chunk-3 domain overreach); delete re-exports in `lib.rs`; delete the whole `nexus-local-llm` directory
- [X] T045 [US2] Remove `"crates/nexus-local-llm"` from `Cargo.toml` workspace members; remove every `nexus-local-llm = { path = ... }` dep line across the workspace

### Tests

- [ ] T046 [P] [US2] Integration test `crates/nexus-backend-runtimes/tests/no_domain_in_host.rs`: greps the crate's `src/` tree for `gguf`, `routing_signal`, `ModelInstaller`, `hyperparameter`, asserts zero matches (case-insensitive)
- [ ] T047 [P] [US2] Integration test `crates/nexus-backend-runtimes/tests/workspace_graph.rs`: asserts via `cargo_metadata` that `nexus-backend-runtimes`'s dependency closure contains no crate whose name starts with `extension` or `local-llm`
- [ ] T048 [US2] Write verification script `scripts/verify-spec-011.sh` that runs (a) `[ ! -d crates/nexus-local-llm ]`; (b) `grep -rn "nexus_local_llm\|nexus-local-llm" crates/ extensions/ apps/ && exit 1 || exit 0`; (c) `cargo check --workspace`. Add to CI instructions in plan notes
- [ ] T049 [US2] Verify US2: `cargo test --workspace`, `bash scripts/verify-spec-011.sh`, workspace compiles, quickstart steps in §"US2 first — workspace sanity" all pass

**Checkpoint**: US2 complete. The host crate is renamed, the extension owns its domain, the old crate is gone. US1/US3/US4 can now build on the new foundation.

---

## Phase 4: US1 — Install llama.cpp once, use from multiple extensions (P1)

**Story goal**: A single `host_runtime_installs` row serves every extension declaring `runtime_dependencies: [llama.cpp]`.

**Independent test criteria**: Install llama.cpp → enable two extensions with matching runtime_dependencies → both see the runtime as available, disk footprint equals a single install.

### Tests (write first — RED)

- [ ] T050 [P] [US1] Contract test `tests/contract/host_backends_list_contract.rs` asserting envelope shape for `GET /api/v1/backends` per `contracts/host_backends_list.http`
- [ ] T051 [P] [US1] Integration test `crates/nexus-backend-runtimes/tests/multi_consumer.rs::two_extensions_share_one_install` — fixture installs llama.cpp, enables two synthetic extensions declaring `runtime_dependencies`, asserts `host_runtime_installs` has exactly 1 row and `list_dependents` returns both extension ids
- [ ] T052 [P] [US1] Integration test `crates/nexus-backend-runtimes/tests/dependency_resolution.rs::enable_rejected_when_unmet` — enable an extension declaring `llama.cpp >=b9999` when the only install is `b4970`, assert enable fails with a clear error citing the Backends panel

### Implementation

- [X] T053 [US1] Implement `list_installed(pool) -> Vec<RuntimeInstall>` in `crates/nexus-backend-runtimes/src/installs_store.rs` (reads from `host_runtime_installs`) — exists as `list_all`
- [X] T054 [US1] Implement `list_dependents(install_id) -> Vec<ExtensionId>` in the same file by joining `host_runtime_leases` with the enabled-extensions registry; include any extension whose manifest declares a matching runtime_dependency
- [X] T055 [US1] Implement `resolve_dependency(dep, pool) -> Result<InstallId>` returning the best-matching install or an error variant `DependencyUnmet { family, version_req, acceleration_options }`
- [X] T056 [US1] Extend `crates/nexus-extension/src/manifest.rs::ExtensionManifest` with optional `runtime_dependencies: Vec<RuntimeDependency>` field; `RuntimeDependency { family, version: Option<String>, acceleration: Vec<AcceleratorProfile> }` with `#[serde(default)]` for additive compat (per R5)
- [ ] T057 [US1] Wire dependency resolution into the extension-enable path: before an extension flips to `enabled`, resolve its `runtime_dependencies` and reject with a structured error if any cannot be satisfied
- [X] T058 [US1] Declare `runtime_dependencies: [{ family: "llama.cpp", version: ">=b4000", acceleration: ["cpu","cuda12","cuda13"] }]` in `extensions/builtin/local-llm/manifest.yaml`
- [ ] T059 [US1] Verify US1: `cargo test -p nexus-backend-runtimes multi_consumer dependency_resolution`, manual quickstart §"US1 — Shared install across extensions"

---

## Phase 5: US3 — Spawn returns a communication channel (P1)

**Story goal**: `spawn()` returns a `RuntimeLease` carrying a `RuntimeChannelDescriptor` declaring transport kind, API dialects, address, and readiness state. `ProcessStarted` distinct from `ChannelReady`.

### Tests (write first — RED)

- [ ] T060 [P] [US3] Integration test `crates/nexus-backend-runtimes/tests/channel_llamacpp.rs::process_started_before_channel_ready` — start a mock HTTP server that takes 2s to bind; call `spawn`; assert `ProcessStarted` event fires within 500 ms; assert `ChannelReady` fires ~2 s later
- [ ] T061 [P] [US3] Integration test `tests/channel_llamacpp.rs::process_exit_invalidates_channel` — kill the spawned process externally; assert `ProcessExited` event fires; assert `RuntimeLease.channel.ready` flips to false on next read
- [ ] T062 [P] [US3] Contract test `tests/contract/host_backends_lease_contract.rs` asserting the `POST /api/v1/backends/{installId}/lease` envelope per `contracts/host_backends_lease.http` including the 202-with-channel happy path and the 409 RUNTIME_NEEDS_REPAIR case
- [X] T063 [P] [US3] Unit test `crates/nexus-backend-runtimes/src/llamacpp/channel_builder.rs#tests` asserting the descriptor has `kind: HttpTcp`, `api_dialects: [OpenAiCompatible, NativeLlamaServer]`, `health: Some("/health")`, `ready: false`

### Implementation

- [ ] T064 [US3] Extend `BackendAdapter` trait in `crates/nexus-backend-runtimes/src/adapter.rs` with `fn build_channel(&self, ctx: &ChannelBuildCtx) -> RuntimeChannelDescriptor`
- [X] T065 [US3] Implement `crates/nexus-backend-runtimes/src/llamacpp/channel_builder.rs` returning the llama-server descriptor (http_tcp, OpenAI+native dialects, `/health`, optional `/metrics` if the host enabled it, `ready: false`)
- [X] T066 [US3] Implement `PortAllocator` in `crates/nexus-backend-runtimes/src/spawn.rs` that tracks claimed ports per live lease and picks the next free port in `[49152, 65535]` on collision; `port_hint` is advisory, not guaranteed
- [ ] T067 [US3] Implement `Spawner::spawn(request) -> Result<RuntimeLease, SpawnError>` in `spawn.rs`: validate via `ReservedPolicy`, allocate port, call adapter's install `launch_spec` + process fork, insert `host_runtime_leases` row, emit `ProcessStarted` within 500ms, start readiness-probe background task (poll health endpoint every 500ms until 2 consecutive 200s, then emit `ChannelReady` + flip `ready` column)
- [ ] T068 [US3] Implement `Spawner::shutdown(lease_id)` — graceful SIGTERM, 10s grace, then `Child::kill`; set `released_at = now()`, emit `ProcessExited`
- [ ] T069 [US3] Implement `Spawner::on_process_exit_watcher` — a background task per lease that awaits `Child::wait`; on exit (unexpected or not), marks lease released and emits `ProcessExited`; channel descriptor's `ready` flag flips false on read
- [ ] T070 [US3] Wire `RuntimeLease` construction in the handler so it carries the channel descriptor in the 202 response body (not just a pid)
- [ ] T071 [US3] Verify US3: `cargo test -p nexus-backend-runtimes channel_llamacpp`, manual quickstart §"US3 — Channel on lease"

---

## Phase 6: US4 — Generic spawn passthrough with explicit host-owned overrides (P1)

**Story goal**: Arbitrary args/env pass through; reserved flags are rejected pre-spawn with a clear error; unknown flags pass through unchanged.

### Tests (write first — RED)

- [ ] T072 [P] [US4] Integration test `crates/nexus-backend-runtimes/tests/reserved_policy.rs::table_driven` — one flag per tier per family; ≥ 3 "unknown" flags asserted to pass through; `--port` asserted to return `SpawnError::ReservedLaunchSetting`
- [ ] T073 [P] [US4] Integration test `tests/spawn_enforcement.rs::user_port_rejected` — `SpawnRuntimeRequest { args: ["--port", "9999"], ... }` returns 422 `RESERVED_LAUNCH_SETTING` naming the field
- [ ] T074 [P] [US4] Integration test `tests/spawn_enforcement.rs::unknown_flag_passes_through` — `args: ["--hypothetical-future-flag", "42"]` spawns successfully; the mock child observes the flag in its argv
- [ ] T075 [P] [US4] Integration test `tests/spawn_enforcement.rs::managed_spawn_disallowed_rejected` — `args: ["--help"]` returns 422 `MANAGED_SPAWN_DISALLOWED`
- [ ] T076 [P] [US4] Integration test `tests/spawn_enforcement.rs::port_hint_collision_reallocates` — request `port_hint: X` while X is already claimed; assert returned lease has a different allocated port

### Implementation

- [X] T077 [US4] Implement `validate_spawn_request(catalog, request)` in `spawn.rs` (T077): walks args and env once, classifies each, returns `BackendRuntimeError::ManagedSpawnDisallowed{flag}` or `BackendRuntimeError::ReservedLaunchSetting{flag}` on first collision; `extension-passthrough` and `Unknown` flow through
- [ ] T078 [US4] Implement `HostPolicy::gate_host_governed(flag, settings) -> HostPolicyDecision` in `reserved_policy.rs` — default-deny for `host-governed` flags; can opt-in only via typed host settings (never raw argv). Log every denial at `tracing::warn!` level
- [ ] T079 [US4] Wire host injection in `spawn.rs`: after validation, append `LLAMA_ARG_HOST` + `LLAMA_ARG_PORT` + log sink envs to the child's env BEFORE fork; host values always win even if extension tried to duplicate
- [X] T080 [US4] Map `SpawnError` → HTTP status helper `http_status_for(&BackendRuntimeError)` in `spawn.rs`: `ReservedLaunchSetting` → 422 with `code: RESERVED_LAUNCH_SETTING`, `ManagedSpawnDisallowed` → 422 with `code: MANAGED_SPAWN_DISALLOWED`, `FamilyUnavailable` → 404, `RuntimeNeedsRepair` → 409 (handler wiring deferred to Phase 9)
- [ ] T081 [US4] Verify US4: `cargo test -p nexus-backend-runtimes reserved_policy spawn_enforcement`, manual quickstart §"US4 — Reserved launch setting enforcement"

---

## Phase 7: US5 — Parameter catalog endpoint (P2)

**Story goal**: `GET /api/v1/backends/{family}/parameters` returns the versioned catalog; UI can consume it for help/autocomplete; unknown flags still pass through (catalog is advisory).

### Tests (write first — RED)

- [ ] T082 [P] [US5] Contract test `tests/contract/host_parameter_catalog_contract.rs` asserting envelope for `GET /api/v1/backends/llama.cpp/parameters` per `contracts/host_backends_parameter_catalog.http`; also asserts 404 for `foo-engine`
- [ ] T083 [P] [US5] Unit test `parameter_catalog.rs#tests::snapshot_date_format` — asserts the loaded catalog's `snapshot_date` parses as ISO-8601

### Implementation

- [ ] T084 [US5] Implement `ParameterCatalogDto` in `crates/nexus-api/src/dto/runtime.rs` with `#[ts(export)]` mirroring the Rust `ParameterCatalog` shape
- [X] T085 [US5] Implement `GET /api/v1/backends/:family/parameters` handler in `crates/nexus-api/src/handlers/backends.rs` calling `capability.get_parameter_catalog(family)`; 404 `FAMILY_UNKNOWN` on unknown family
- [ ] T086 [US5] Regenerate TS DTOs via `cargo test -p nexus-api export_bindings` and commit `apps/web/src/api/generated/ParameterCatalogDto.ts` — deferred (loose-typed client surface used in T087)
- [X] T087 [US5] Add `fetchParameterCatalog(family)` to `apps/web/src/api/client.ts`
- [ ] T088 [US5] Verify US5: `cargo test -p nexus-backend-runtimes parameter_catalog`, `curl http://localhost:7878/api/v1/backends/llama.cpp/parameters | jq '.data.total_entries'` returns 213, manual quickstart §"US5 — Parameter catalog endpoint"

---

## Phase 8: US6 — Clean migration from extension-scoped runtime state (P2)

**Story goal**: Upgrading from a pre-spec-011 database with `ext_local_llm_runtime_installs` rows and binaries at the old path succeeds on first launch without user intervention.

### Tests (write first — RED)

- [X] T089 [P] [US6] Integration test `crates/nexus-backend-runtimes/tests/migration_008_row_migration.rs::legacy_rows_copied_with_field_mapping` — seed `ext_local_llm_runtime_installs` with one row (status=ready, accelerator_profile=cuda12, install_path=/tmp/foo), run `migrate_from_legacy`, assert one row in `host_runtime_installs` with state=installed, accelerator=cuda12, install_root=/tmp/foo (placed inline in installs_store.rs#tests; covers ready/broken/installed_unvalidated → state mapping + table rename)
- [X] T090 [P] [US6] Integration test `tests/migration_008_filesystem.rs::binary_relocated_to_host_path` — seed a legacy row + a fake binary at the old extension-scoped path; run the FS relocator; assert binary now lives at `<data_dir>/runtimes/llama.cpp/<version>/`, `install_root` column rewritten to the new path, binary is executable
- [X] T091 [P] [US6] Integration test `tests/migration_008_row_migration.rs::idempotent_second_run` — run migration twice, assert row count stable and no errors

### Implementation

- [X] T092 [US6] Implement the filesystem relocator in `crates/nexus-backend-runtimes/src/installs_store.rs::relocate_legacy_binaries` — for each row whose `install_root` starts with `<data_dir>/extensions/local-llm/runtimes/`, `fs::rename` the directory to `<data_dir>/runtimes/{family}/{version}/` and UPDATE the row's `install_root` + `binary_paths` JSON
- [ ] T093 [US6] Wire `migrate_from_legacy` + `relocate_legacy_binaries` + `hydrate_on_start` into the host startup sequence in `crates/nexus-core/src/app.rs::run`, BEFORE the API server starts listening
- [ ] T094 [US6] Add a one-shot idempotency guard: the migrator checks whether `ext_local_llm_runtime_installs_migrated_008` exists; if yes and `host_runtime_installs` is non-empty, no-op
- [ ] T095 [US6] Verify US6: `cargo test -p nexus-backend-runtimes migration_008`, manual quickstart §"US6 — Migration from pre-spec-011 state"

---

## Phase 9: Host API surface + frontend lift

**Purpose**: Wire the full HTTP surface `/api/v1/backends/*`, dual-route the deprecated `/api/v1/llm/backends/*` family, and lift the Backends UI from the extension drawer to top-level host navigation.

### Host routes

- [X] T096 Implement `GET /api/v1/backends` handler in `crates/nexus-api/src/handlers/backends.rs` returning `RuntimeInstallDto[]` + `available_families` + `dependents` (per `contracts/host_backends_list.http`)
- [ ] T097 Implement `POST /api/v1/backends/{family}/install` handler returning 202 with `install_id` + `install_task_id` + `progress_channel` (per `contracts/host_backends_install.http`); 409 ALREADY_INSTALLED; 404 FAMILY_UNKNOWN
- [ ] T098 Implement `DELETE /api/v1/backends/{installId}` handler (per `contracts/host_backends_uninstall.http`); 204 on clean removal; 409 RUNTIME_IN_USE when dependents exist and `?force=true` is absent; with `?force=true`, drains active leases first then removes
- [ ] T099 Implement `POST /api/v1/backends/{installId}/lease` handler (per `contracts/host_backends_lease.http`); requires `X-Extension-Id` header; calls `Spawner::spawn`; returns 202 with lease + channel descriptor
- [ ] T100 Implement `DELETE /api/v1/backends/leases/{leaseId}` handler (per `contracts/host_backends_lease_release.http`); enforces `X-Extension-Id` ownership with 403 LEASE_NOT_OWNED
- [ ] T101 Register all new routes in `crates/nexus-api/src/router.rs` under `/api/v1/backends/*`
- [X] T102 Implement dual-route deprecation shim in `crates/nexus-api/src/router.rs` per R7: each `/api/v1/llm/backends/*` path becomes a thin wrapper that calls the new handler and appends `Deprecation: true` + `Sunset: <90 days from merge>` headers + `tracing::warn!("deprecated route …")` — implemented as `from_fn` middleware adding Deprecation/Sunset/Link headers
- [ ] T103 [P] Implement `RuntimeInstallDto`, `RuntimeLeaseDto`, `RuntimeChannelDto`, `ApiDialectDto`, `RuntimeBindModeDto`, `RuntimeAddressDto` in `crates/nexus-api/src/dto/runtime.rs` with `ts-rs` export; regenerate `apps/web/src/api/generated/*.ts`

### Frontend

- [ ] T104 [P] Add a top-level "Backends" nav entry in `apps/web/src/layout/sidebar.tsx` with a `developer_board` icon, routing to view id `backends`
- [ ] T105 Rewrite `apps/web/src/views/backends_view.tsx` to call the new fetchers in `client.ts` (`fetchRuntimes`, `installRuntime`, `uninstallRuntime`) instead of the old `/api/v1/llm/backends/*` family; render three-state cards (Installed / NeedsRepair / NotInstalled); show dependents inline
- [ ] T106 Remove the `backend_selector` entry from `extensions/builtin/local-llm/ui/layouts/chat.yaml` Backend Runtimes drawer OR replace it with a thin "manage backends at host level" link pointing to `/backends` — either choice is acceptable per plan
- [~] T107 Extend `apps/web/src/api/client.ts` with `fetchRuntimes` ✅, `fetchParameterCatalog` ✅, `installRuntime`/`uninstallRuntime`/`spawnLease`/`releaseLease` deferred (handlers not yet built)

### Verification

- [ ] T108 Verify API surface: `cargo test --workspace`, manual quickstart §"Deprecation surface — /llm/backends/*" (Deprecation+Sunset headers observed)
- [ ] T109 Verify frontend: `pnpm --dir apps/web lint && pnpm --dir apps/web tsc --noEmit`; manual navigate to `/backends`, observe install flow, observe install reflecting in Local Chat extension

---

## Phase 10: Polish & Cross-Cutting Concerns

- [ ] T110 [P] Add `#[tracing::instrument(name = "runtime.install", ...)]` span on `Spawner::spawn`, `InstallPipeline::run`, `migrate_from_legacy`, `relocate_legacy_binaries`; verify via `RUST_LOG=nexus_backend_runtimes=debug`
- [ ] T111 [P] Write `crates/nexus-backend-runtimes/README.md` — architecture overview, how to add a new runtime family, how the parameter catalog is sourced
- [ ] T112 [P] Update `extensions/builtin/local-llm/README.md` — extension no longer owns runtime install; domain logic location; how to declare `runtime_dependencies`
- [ ] T113 [P] Update root `README.md` — architecture overview reflects `nexus-backend-runtimes`; spec 011 link in "Recent Changes"; note that `nexus-local-llm` has been retired
- [ ] T114 [P] Accessibility pass on the new `backends_view.tsx` — semantic landmarks, keyboard focus order, ARIA on install-progress indicator
- [ ] T115 [P] Split sprint commits at PR time into four scoped commits aligned with the plan's sequencing: (1) "refactor(runtimes): extract nexus-backend-runtimes crate + domain move to extension [US2]"; (2) "feat(runtimes): channel-first spawn + reserved-policy enforcement [US1+US3+US4]"; (3) "feat(runtimes): parameter catalog + migration from legacy schema [US5+US6]"; (4) "feat(runtimes): host Backends API + top-level frontend [API surface + polish]"
- [ ] T116 Final verification: `cargo fmt --check`, `cargo clippy --workspace --all-targets -- -D warnings`, `cargo test --workspace`, `pnpm --dir apps/web lint`, `pnpm --dir apps/web test`, `pnpm --dir apps/web build`, `bash scripts/verify-spec-011.sh`, all quickstart.md steps pass

---

## Dependencies

```text
Phase 1 (Setup) ──► Phase 2 (Foundational) ──► Phase 3 (US2)
                                                       │
                                  ┌────────────────────┼────────────────────┐
                                  ▼                    ▼                    ▼
                            Phase 4 (US1)        Phase 5 (US3)        Phase 6 (US4)
                                                        │                    │
                                                        └───────┬────────────┘
                                                                ▼
                                                         Phase 7 (US5)
                                                                │
                                                                ▼
                                                         Phase 8 (US6)
                                                                │
                                                                ▼
                                                  Phase 9 (API + frontend)
                                                                │
                                                                ▼
                                                         Phase 10 (Polish)
```

**Hard ordering**: Phase 3 (US2) MUST complete before Phases 4–8 because the other stories all build on types that live in `nexus-backend-runtimes`. Inside US2, the file moves (T024–T037) must land together in one commit to preserve green-build invariant; the domain extract (T038–T042) and the crate removal (T044–T045) are separate commits within the same phase.

Story-level independence (post-US2):

- **US1** (install-once) is fully independent once US2 is done. Can ship alone.
- **US3** (channel-first spawn) depends on US2's types. Independent of US1/US4.
- **US4** (reserved policy) depends on US2's parameter-catalog + spawn types (both in Foundational). Independent of US1/US3.
- **US5** (catalog endpoint) depends on Phase 2 catalog loader + Phase 9 DTO pipeline. Independent of US1/US3/US4.
- **US6** (migration) depends on Phase 2 `migrate_from_legacy` being authored. Independent of every other story.

## Parallel Execution Examples

**Within Phase 2 (Foundational)** — six agents in parallel after T001+T002 land:

```text
Agent A → T008 (channel.rs)
Agent B → T009 (lease.rs)
Agent C → T010 (spawn.rs types only)
Agent D → T011 (parameter_catalog.rs)
Agent E → T012 (reserved_policy.rs)
Agent F → T016 + T017 (state + state_log)
```

**Within Phase 3 (US2) file-moves** — ten agents in parallel after T024 lands as the anchor:

```text
Agents for T025 / T026 / T027 / T028 / T029 / T031 / T032 / T033 — independent file moves
Agent for T030 (checksum — also edits nexus-huggingface)
Agent for T036 (tensorrt stub)
```

**Within Phase 5 (US3) test phase** — four agents in parallel:

```text
Agent A → T060 (process_started timing)
Agent B → T061 (exit invalidates channel)
Agent C → T062 (contract test)
Agent D → T063 (channel_builder unit test)
```

**Within Phase 6 (US4) test phase** — five agents in parallel after T077 lands:

```text
Agent A → T072 (table-driven)
Agent B → T073 (port rejected)
Agent C → T074 (unknown passes through)
Agent D → T075 (managed-spawn-disallowed)
Agent E → T076 (port hint collision)
```

**Cross-story parallelism after US2**: US1 implementation (T053-T058), US3 tests (T060-T063), US4 tests (T072-T076) can proceed concurrently because they touch different modules.

## Implementation Strategy

**The refactor is the whole product here — no partial ships**. US2 is P1 because the rest of the stories are impossible to ship while `nexus-local-llm` still exists. Recommended execution:

1. **Land Setup + Foundational** (Phases 1–2) as one green commit.
2. **Land US2** (Phase 3) as a single large commit containing the file moves + domain extract + crate removal, so no bisect point sees a half-refactored workspace. This is the highest-risk commit; run full test suite before merging.
3. **Land US1 / US3 / US4 in parallel PRs** (Phases 4–6), each small and scoped.
4. **Land US5 + US6** (Phases 7–8) as follow-ups; they don't gate MVP.
5. **Land API surface + frontend lift** (Phase 9) last — it's the user-visible layer.
6. **Polish** (Phase 10) runs as a final sweep.

MVP cut: Phases 1–6 + Phase 9's API routes. That ships the channel-first spawn contract to the `local-llm` extension end-to-end. Parameter catalog and legacy migration can ride in a point-release.

---

## Task Summary

- **Total tasks**: 116
- **Setup**: 7 (T001–T007)
- **Foundational**: 16 (T008–T023)
- **US2 (P1, refactor)**: 26 (T024–T049) — 3 tests, 23 impl (the refactor IS the implementation)
- **US1 (P1, feature)**: 10 (T050–T059) — 3 tests, 7 impl
- **US3 (P1, channel)**: 12 (T060–T071) — 4 tests, 8 impl
- **US4 (P1, policy)**: 10 (T072–T081) — 5 tests, 5 impl
- **US5 (P2, catalog)**: 7 (T082–T088) — 2 tests, 5 impl
- **US6 (P2, migration)**: 7 (T089–T095) — 3 tests, 4 impl
- **API + frontend**: 14 (T096–T109)
- **Polish**: 7 (T110–T116)

- **Parallel opportunities**: 50+ tasks marked `[P]`
- **MVP scope**: Phases 1–6 + Phase 9 API = 90 tasks
- **Format validation**: all tasks use `- [ ] Tnnn [P?] [USx?] Description with file path` ✅
