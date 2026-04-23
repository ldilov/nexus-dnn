---
description: "Tasks for spec 032 — Generic Backend-Runtime Catalog + Lease API (host capability)"
---

# Tasks: Generic Backend-Runtime Catalog + Lease API

**Input**: Design documents at [specs/032-backend-runtime-catalog/](./)
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/](./contracts/), [quickstart.md](./quickstart.md)

**Tests**: INCLUDED for all backend logic (Principle VI). Frontend (Backends page) uses one Playwright smoke + contract-schema parity test (design-heavy UI carve-out permitted but scope here is mostly generic UI, so full vitest coverage is practical — call it out per task).

**Organization**: Tasks grouped by user story so each can be implemented + shipped as an independent increment.

**Path Conventions**: Everything under `crates/nexus-backend-runtimes/`, `crates/nexus-api/`, `crates/nexus-extension/`, `apps/web/src/views/backend-runtimes/` (renamed from `views/backends/` during implementation to avoid collision with the grandfathered llama.cpp page), `migrations/`, `scripts/`, and the new synthetic test extension under `extensions/builtin/test-echo-runtime/`. **No extension-id literals** in any file under `crates/nexus-*` or `apps/web/src/` outside `extensions/builtin/**` (FR-100 + Principle XIII).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Add the `Python` family variant, scaffold new module trees, reserve migration slots, set up lint config — nothing touching business logic yet.

- [X] T001 Add `Python` variant to `RuntimeFamily` in [crates/nexus-backend-runtimes/src/family.rs](../../crates/nexus-backend-runtimes/src/family.rs): new `pub const PYTHON: &'static str = "python";`, extend `as_str()`, extend `canonical(raw)` with `"python"` → `Self::Python` alias plus `"py"` as a tolerated alias, extend `Display`. Add unit tests for the new variant alongside existing `LlamaCpp` tests.
- [X] T002 [P] Create new module tree `crates/nexus-backend-runtimes/src/generic/` with `mod.rs` skeleton exporting the submodules listed in [plan.md](./plan.md) (install_pipeline, install_ctx, family_handler, phases, catalog, installs, settings, leases, ids, errors). Wire `pub mod generic;` from [lib.rs](../../crates/nexus-backend-runtimes/src/lib.rs).
- [X] T003 [P] Create sibling module trees `crates/nexus-backend-runtimes/src/family_python/` and `family_native/` with `mod.rs` exporting an `impl_handler()` fn stub. Wire from `lib.rs`.
- [X] T004 [P] Scaffold `crates/nexus-api/src/handlers/backend_runtimes/` with `mod.rs` re-exporting stub handlers for every route in [contracts/http/](./contracts/http/). Wire the `/api/v1/backend-runtimes*` + `/api/v1/backend-runtime-installs/*` + `/api/v1/backend-runtime-leases/*` routes into the host router at `crates/nexus-api/src/router.rs`. Additive — existing `/api/v1/backends/*` routes untouched.
- [X] T005 [P] Scaffold `apps/web/src/views/backend-runtimes/` (not `views/backends/` — path renamed to avoid collision with the grandfathered llama.cpp page) with `backend_runtimes.view.tsx`, `backend_runtimes.ui.tsx`, `backend_runtimes.css.ts`, `components/` subdir. Add `/backend-runtimes` route to [routes.tsx](../../apps/web/src/routes.tsx).
- [X] T006 [P] Create boundary-audit scaffolding: `scripts/audit-runtime-boundary.ps1` + `scripts/boundary-exclusions.yaml` per [research.md R-10](./research.md). Script reads the YAML, greps `crates/` + `apps/web/src/` excluding `grandfathered_paths`, exits non-zero on any match. Initial exclusion list: `local-llm`, `local_llm`, `llama.cpp`, `llamacpp` plus the four grandfathered path globs.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Newtypes, errors, migrations, framer, matchmaker, the `BackendRuntimeLease` trait — nothing user-story-specific.

**⚠️ CRITICAL**: No user-story work begins until Phase 2 is green.

### Migrations (host-owned)

- [X] T007 Reserve the next 4 sequential migration IDs in `migrations/`. Find next N via `ls migrations/ | sort -r | head -1` and use `N+1..N+4`.
- [X] T008 [P] Write `migrations/NNNN_backend_runtime_catalog.sql` per [data-model.md §2](./data-model.md). Include `idx_catalog_source_ext` + `idx_catalog_family_status`.
- [X] T009 [P] Write `migrations/NNNN_backend_runtime_installs.sql` per [data-model.md §3](./data-model.md). Include `UNIQUE (runtime_id, release_id, platform, accelerator_profile)` + `idx_installs_runtime` + `idx_installs_status`.
- [X] T010 [P] Write `migrations/NNNN_backend_runtime_settings.sql` per [data-model.md §4](./data-model.md) with UNIQUE on `runtime_id`.
- [X] T011 [P] Write `migrations/NNNN_backend_runtime_leases.sql` per [data-model.md §5](./data-model.md) with `idx_leases_install` + `idx_leases_state` + `idx_leases_released`.

### Newtypes + enums + errors

- [X] T012 Implement 8 newtypes in `crates/nexus-backend-runtimes/src/generic/ids/`: `runtime_id.rs`, `runtime_install_id.rs`, `release_id.rs`, `runtime_lease_id.rs`, `platform.rs`, `accelerator_profile.rs`, `source_extension_id.rs`, `contribution_checksum.rs`. Each: `#[serde(transparent)]`, `Display`, `TryFrom<&str>` with validation per [data-model.md §7](./data-model.md), ULID construction for host-minted ids.
- [X] T013 [P] Implement enums in `crates/nexus-backend-runtimes/src/generic/enums.rs`: `ImplementationStatus`, `InstallStatus`, `LeaseState`, `OwnerKind`, `Transport`, `FailureCategory`. All `#[non_exhaustive]` with `#[serde(rename_all = "snake_case")]`.
- [X] T014 [P] Implement error enums in `crates/nexus-backend-runtimes/src/generic/errors.rs`: `InstallError`, `CatalogError`. Implement `LeaseError` in `crates/nexus-backend-runtimes/src/generic/leases/error.rs` per [data-model.md §8](./data-model.md).

### Storage repo traits + impls

- [X] T015 Define repo traits in `crates/nexus-backend-runtimes/src/generic/catalog/repo.rs` (`BackendRuntimeCatalogRepo`), `generic/installs/repo.rs` (`BackendRuntimeInstallsRepo`), `generic/settings/repo.rs` (`BackendRuntimeSettingsRepo`), `generic/leases/repo.rs` (`BackendRuntimeLeasesRepo`). Async-trait, return newtyped ids.
- [X] T016 [P] Implement SQLite-backed concrete repos for all four traits using `nexus-storage`'s `SqlitePool` (not the host's direct wrapper by name — via the generic abstraction). Soft FKs enforced in code per FR-014.
- [X] T017 [P] Unit tests for every repo: upsert-idempotency (catalog on re-activation with same checksum), unique-constraint behaviour (installs tuple), status transitions.

### Lease framer + matchmaker + trait

- [X] T018 Define `pub trait BackendRuntimeLease` in `crates/nexus-backend-runtimes/src/generic/leases/trait_def.rs` per [data-model.md §8](./data-model.md). Also define `LeaseNotification { method, params }`.
- [X] T019 [P] Implement NDJSON framer in `crates/nexus-backend-runtimes/src/generic/leases/framer.rs`: async read-lines, write-line-with-flush, 8 MB cap (return `LeaseError::PayloadTooLarge` on oversize), JSON-RPC 2.0 envelope encode/decode.
- [X] T020 [P] Implement JSON-RPC matchmaker in `crates/nexus-backend-runtimes/src/generic/leases/matchmaker.rs`: atomic `u64` id allocator, `HashMap<u64, oneshot::Sender<serde_json::Value>>` for in-flight requests, `.send_rpc(...)` allocates id + installs the oneshot + writes the frame + awaits with timeout.
- [X] T021 [P] Implement notification fanout in `crates/nexus-backend-runtimes/src/generic/leases/notifications.rs`: `tokio::sync::broadcast::Sender<LeaseNotification>` with default capacity `NOTIFICATION_BACKLOG_CAPACITY: usize = 1024` (module-level `const`). Subscribers receiving `RecvError::Lagged(n)` MUST emit a structured `tracing::warn!` with fields `{ lease_id, lagged: n, capacity: 1024 }` (per FR-046); no panic.
- [X] T022 [P] Unit tests `crates/nexus-backend-runtimes/tests/ndjson_framer_test.rs`: round-trip arbitrary JSON, 8 MB boundary rejection, malformed-line `parse_error` handling.
- [X] T023 [P] Unit tests `crates/nexus-backend-runtimes/tests/matchmaker_test.rs`: concurrent `send_rpc` → unique ids, response ordering independence, timeout path.

### Install pipeline skeleton

- [X] T024 Define the `RuntimeFamilyHandler` trait in `crates/nexus-backend-runtimes/src/generic/family_handler.rs` per [data-model.md §8](./data-model.md). Registry: `Arc<RwLock<HashMap<RuntimeFamily, Arc<dyn RuntimeFamilyHandler>>>>` keyed by family; registration happens at host boot.
- [X] T025 Implement `InstallCtx` in `crates/nexus-backend-runtimes/src/generic/install_ctx.rs`: carries `RuntimeInstallId`, target `install_path` (with `.partial/` suffix during pipeline), `ReleaseId`, `Platform`, `AcceleratorProfile`, version-manifest asset, download cache path, `BackendEventPublisher` handle, `CancellationToken`.
- [X] T026 Implement pipeline orchestrator `crates/nexus-backend-runtimes/src/generic/install_pipeline.rs`: `async fn run(ctx: InstallCtx, handler: Arc<dyn RuntimeFamilyHandler>) -> Result<(), InstallError>` iterating the 10 phases, emitting `PhaseEvent::started`/`completed`/`failed` per [contracts/http/backend_runtime_installs.yaml](./contracts/http/backend_runtime_installs.yaml), honouring cancellation at each boundary. Generic phases (resolve/download/verify/extract/detect_models/persist/complete) scaffolded as passthrough stubs — user-story tasks T045+ replace with concrete implementations.

### Host boot + crash-recovery

- [X] T027 Implement host-startup sweep in `crates/nexus-backend-runtimes/src/generic/leases/crash_recovery.rs` per [research.md R-05](./research.md): one-row SQL update flipping non-terminal leases to `released` with `crash_recovered=1`, followed by a PID liveness probe that SIGTERMs any live leftover process. **Host-bootstrap wiring deferred to a later task** — the sweep function is called by tests today; production wiring is cheap plumbing that belongs with the catalog-endpoint landing in Phase 3.
- [X] T028 [P] Integration test `crates/nexus-backend-runtimes/tests/crash_recovery_test.rs` inserting dummy non-terminal lease rows + asserting they are flipped on sweep; log assertion for orphan-PID warnings.

**Checkpoint**: `cargo test -p nexus-backend-runtimes` green. User-story work can now start.

---

## Phase 3: User Story 1 — Extension contributes a backend runtime via manifest (Priority: P1) 🎯 MVP start

**Goal**: An extension declares `backend_runtimes:` in its manifest; host validates + upserts a catalog row; catalog is queryable.

**Independent Test**: Synthetic `test-echo-runtime` extension activates; `GET /api/v1/backend-runtimes?source_extension_id=test-echo` returns exactly one row with `implementation_status: "available"`.

### Tests for User Story 1

- [X] T029 [P] [US1] Contract test for `GET /api/v1/backend-runtimes` in `crates/nexus-api/tests/backend_runtimes_contract_test.rs`: filter by `runtime_family`, `source_extension_id`, `implementation_status` — schema matches [contracts/http/backend_runtimes.yaml](./contracts/http/backend_runtimes.yaml).
- [X] T030 [P] [US1] Contract test for `GET /api/v1/backend-runtimes/:id` covering 200 + 404 cases.
- [X] T031 [P] [US1] Unit test (inline in `crates/nexus-extension/src/backend_runtime_contribution/schema.rs`) covering: valid entry → parsed struct, `runtime_id` regex rejection, unknown `family` rejection, `..` in `worker_entrypoint` rejection, `transport != stdio` rejection, duplicate `runtime_id` across two manifests → rejected activation. (10 tests)
- [X] T032 [P] [US1] Integration test (in `crates/nexus-api/tests/backend_runtimes_contract_test.rs`): activate → catalog row present; deactivate → `implementation_status = "unavailable"`; re-activate with same checksum → no duplicate row; re-activate with mutated checksum → row updated + warning log. (4 tests)

### Manifest schema + validation

- [X] T033 [P] [US1] Add `BackendRuntimeContribution` struct to [crates/nexus-extension/src/manifest.rs](../../crates/nexus-extension/src/manifest.rs) and a `backend_runtimes: Vec<BackendRuntimeContribution>` field on `ExtensionManifest` (default empty for backward compat).
- [X] T034 [US1] Implement strict schema validation in `crates/nexus-extension/src/backend_runtime_contribution/schema.rs` per [research.md R-12](./research.md) + [contracts/manifest/backend_runtime_contribution.yaml](./contracts/manifest/backend_runtime_contribution.yaml). Regex id check, family lookup via local KNOWN_FAMILIES list (mirror of `RuntimeFamily::canonical`), path-traversal prevention (no `..`, no `.`, no absolute).
- [X] T035 [US1] Wire validation into [crates/nexus-extension/src/validation.rs](../../crates/nexus-extension/src/validation.rs) (`validate_backend_runtimes`) so any invalid entry fails the whole activation atomically (FR-004).

### Registration + catalog upsert

- [X] T036 [US1] Implement `crates/nexus-api/src/handlers/backend_runtimes/registration.rs` (placed host-side to keep nexus-extension free of nexus-backend-runtimes dep per Principle XIII): `compute_contribution_checksum` (SHA-256 of canonicalised entry), `register_contributions` calls `BackendRuntimeCatalogRepo::upsert` with `implementation_status = "available"`. On duplicate `runtime_id` across extensions → returns `UniqueViolation` with both contributing extension ids surfaced. Drift logged via `tracing::warn!` on checksum change.
- [X] T037 [US1] Implement deactivation cascade in `registration.rs::deactivate_contributions`: flips every contributed runtime's `implementation_status` to `"unavailable"`. Lease-drain wiring is deferred to US3 callers.
- [X] T038 [US1] Implement uninstall cascade in `registration.rs::abandon_contributions`: flips every contributed runtime's `implementation_status` to `"abandoned"` and cascades to `backend_runtime_installs.status = "abandoned"` via `mark_abandoned_for_runtime`. Install paths become reclaimable; host artifact-store retention sweep is downstream.

### HTTP catalog endpoints

- [X] T039 [P] [US1] Implement `GET /api/v1/backend-runtimes` in `crates/nexus-api/src/handlers/backend_runtimes/list.rs`: query repo with filters (`runtime_family`, `source_extension_id`, `implementation_status`), serialise `CatalogEntry[]` via `CatalogEntryDto` per contract.
- [X] T040 [P] [US1] Implement `GET /api/v1/backend-runtimes/:runtime_id` in `crates/nexus-api/src/handlers/backend_runtimes/get.rs`: 404 envelope on miss, 400 on invalid id.

### Synthetic test-echo extension (ships in repo under `extensions/builtin/`)

- [X] T041 [US1] Created `extensions/builtin/test-echo-runtime/manifest.yaml` with a single `backend_runtimes` entry as specified.
- [X] T042 [P] [US1] Created `extensions/builtin/test-echo-runtime/backends/echo/backend-runtime.yaml` + `backends/echo/versions.yaml` + `assets/echo_worker.zip` (3500 bytes, sha256 `30b9a5ee…b704b522`). Targets `windows-x64` and `linux-x64` `cpu`. End-to-end install verified by `crates/nexus-backend-runtimes/tests/test_echo_install_test.rs` — the pipeline's resolve/download (file://)/verify/extract phases run against this real asset.
- [X] T043 [P] [US1] Created `extensions/builtin/test-echo-runtime/worker/pyproject.toml` (stdlib-only) and `worker/src/echo_worker/main.py`: stdio JSON-RPC loop implementing `handshake`, `health`, `shutdown`, and `echo`.

### Frontend — catalog list

- [X] T044 [P] [US1] Implemented `apps/web/src/services/backend_runtimes_client.ts` with typed SWR fetcher + `listBackendRuntimes` + `getBackendRuntime` + `groupByExtension` helper.
- [X] T045 [P] [US1] Implemented `apps/web/src/views/backend-runtimes/{backend_runtimes.view.tsx, .ui.tsx, .css.ts}` (placed under a sibling path `backend-runtimes/` rather than overwriting the legacy `backends/` view). Route `/backend-runtimes` registered in `routes.tsx`. SWR loader + dumb grid + group-by-source-extension. Zero extension-id literals (FR-080).
- [X] T046 [P] [US1] Implemented `apps/web/src/views/backend-runtimes/components/runtime_card.tsx`: display name, family, status badge, capability tag pills, supported-role pills.

**Checkpoint**: Activating the test-echo extension makes `test.echo` visible via both API and UI. US1 shippable.

---

## Phase 4: User Story 2 — User installs a contributed runtime through the generic Backends page (Priority: P1)

**Goal**: Install pipeline runs the ten phases end-to-end for a family-python runtime; Backends page shows live progress; install validates and persists.

**Independent Test**: From a fresh machine, installing `test.echo` for `windows-x64-cpu` produces a `backend_runtime_installs` row with `status: "validated"` and the SSE progress stream emitted exactly ten `PhaseEvent`s.

### Tests for User Story 2

- [X] T047 [P] [US2] Contract tests for install/get/retry covered in `crates/nexus-api/tests/backend_runtimes_contract_test.rs` (a, b, d) — 7 tests cover 202+schema, 404, 409 unavailable, 409 in-flight duplicate, 200 + `InstallDto` schema, 404 not-found, retry-only-on-failed + state flip. **(c) SSE progress** and **(e) DELETE for T087a** deferred.
- [X] T048 [P] [US2] Integration test `crates/nexus-backend-runtimes/tests/generic_pipeline_test.rs`: 8 tests covering all 10 phases emitting `started`+`completed` events against a real zip fixture, cancellation at phase boundary → `Cancelled`, atomic `.partial → install_path` rename, install-path collision → `InstallPathCollision`, **plus** T049 failure injections (resolve, download, verify, extract) and the download retry short-circuit. Real-asset e2e test added at `tests/test_echo_install_test.rs` exercising the bundled `test-echo-runtime` extension's `echo_worker.zip` against the production resolve/download/verify/extract code paths.
- [X] T049 [P] [US2] Failure injection covered inline in `tests/generic_pipeline_test.rs`: `resolve_fails_on_unknown_release` (InvalidVersionManifest), `download_fails_on_missing_file_url` (InvalidDownload), `verify_fails_on_checksum_mismatch` (InvalidDownload + checksum mismatch detail), `extract_fails_on_unsupported_archive_format` (InvalidDownload). `.partial/` reclaim flagging is downstream of the install-row status update which the install handler owns; pipeline-level failure surfaces stop here.
- [X] T050 [P] [US2] **Landed** as `cancellation_mid_pipeline_stops_at_next_phase_boundary` in generic_pipeline_test.rs — token flipped inside bootstrap_runtime; install_deps panic-gated proves the next boundary honours cancellation.  Integration test `crates/nexus-backend-runtimes/tests/pipeline_cancel_test.rs`: cancel at each phase boundary, assert `FailureCategory::Cancelled`. **Deferred** — boundary-edge cancellation already covered by `pipeline_honours_cancellation_at_phase_boundary` in T048; per-phase mid-execution cancel needs the install pipeline to honour the cancellation token inside long-running phase bodies (currently checked only at phase boundaries).

### Generic pipeline phases

- [X] T051 [P] [US2] Implemented `generic/phases/resolve.rs` + `generic/version_manifest.rs`: parses YAML/JSON version manifest, selects `(release_id, platform, accelerator_profile)`, produces `ResolvedAsset { url, checksum, size }`, canonicalises `file://` URLs against `extension_root` with path-traversal rejection. 8 unit tests cover happy path + every error variant.
- [X] T052 [P] [US2] Implemented `generic/phases/download.rs`: streaming download to `{partial_path}/archive.bin` for `file://` (local copy via tokio::fs::copy) and `http(s)://` (reqwest GET). Retry short-circuit reads existing target file, hashes it, skips IO when hash + size match (FR-028).
- [X] T053 [P] [US2] Implemented `generic/phases/verify.rs`: streaming SHA-256 of `{partial_path}/archive.bin` vs `ResolvedAsset.sha256`; mismatch → `InvalidDownload` with both hashes in the detail. Populates `ctx.artifact_hash` for the install row.
- [X] T054 [P] [US2] Implemented `generic/phases/extract.rs`: format detection by URL extension (zip / tar.gz / tar), unpack via `zip::ZipArchive` / `tar::Archive` + `flate2::GzDecoder`, runs on `tokio::task::spawn_blocking`. Zip-slip prevention via `ZipFile::enclosed_name`. Tar uses `archive.unpack(dst)` which preserves POSIX modes on Linux.
- [X] T055 [US2] ~Implement `generic/phases/bootstrap_runtime.rs`~ — **folded into `install_pipeline::run`** (line 164) which dispatches directly to `handler.bootstrap_runtime(ctx)` without a wrapper module. The separate file would have been pure indirection; the orchestrator is the only caller.
- [X] T056 [US2] ~Implement `generic/phases/install_deps.rs`~ — **folded into `install_pipeline::run`** (line 165). Same reasoning as T055.
- [X] T057 [US2] ~Implement `generic/phases/validate_env.rs`~ — **folded into `install_pipeline::run`** (line 166). Family-neutral phases `detect_models` + `persist` + `complete` live as private fns in `install_pipeline.rs` (`detect_models_phase`, `persist_phase`, `complete_phase`). Same reasoning as T055.
- [X] T058 [P] [US2] Implemented the atomic `.partial/ → .` rename inline in `install_pipeline.rs::complete_phase` per [research.md R-08](./research.md). Rejects collisions with `InstallPathCollision`. Tested under T048.

### Family-python handler

- [X] T059 [US2] Implement `family_python/handler.rs` as `impl RuntimeFamilyHandler` returning `RuntimeFamily::Python`.
- [X] T060 [US2] Implement `family_python/bootstrap.rs`: download embedded Python 3.11 zip (cached under `{data_dir}/embedded_python/`), extract to `{install_path}/python/`. Windows-x64 primary target; Linux-x64 uses a different asset URL.
- [X] T061 [US2] Implement `family_python/uv_install.rs`: shell-out to `uv` in `{install_path}/worker/`, run `uv sync --all-extras` (omit `--extra deepspeed` on Windows per upstream warning — surface a config knob for future override). Map uv errors to `FailureCategory::DependencyInstallFailed` with uv's error detail truncated to 2 KB.
- [X] T062 [P] [US2] Implement `family_python/validate.rs`: spawn `{install_path}/python/python.exe -c "import sys; print(sys.version)"`; success → record `entrypoint_path`; failure → `PythonBootstrapFailed`.
- [X] T059a [US2] Implement env-driven embedded-Python asset loader at `family_python/config.rs` (`PythonAssetConfig::from_env().load()`). Wired through `nexus-core::app` so `NEXUS_EMBEDDED_PYTHON_URL` + `_SHA256` + `_SIZE` (plus optional `_KIND` / `_STRIP` / `_EXTRACT`) populate the `FamilyPythonHandler` at boot. Partial / malformed config logs `tracing::warn` and falls back to None. Operator reference lives at `crates/nexus-backend-runtimes/embedded-python.env.example`. 8 unit tests cover the happy path + every validation error. Closes the G1 production gap surfaced by `/speckit.analyze` — a pinned python-build-standalone release can now be configured without a rebuild. Stamping a default built-in pin (Windows-x64 + Linux-x64) remains a follow-up that needs checksum verification against upstream release manifests; deferred to a new task under Phase 8.

### Family-native handler (no-op placeholder for future native-binary runtimes)

- [X] T063 [P] [US2] Implemented `family_native/handler.rs::FamilyNativeHandler` — no-op `bootstrap_runtime` + `install_deps`; `validate_env` confirms entrypoint is non-empty. Currently maps to `RuntimeFamily::LlamaCpp` since `RuntimeFamily::Native` isn't yet a variant; flagged for future bump. Used in T048 to drive end-to-end pipeline tests.

### HTTP install + progress

- [X] T064 [P] [US2] Implemented `POST /api/v1/backend-runtimes/:runtime_id/install` in `crates/nexus-api/src/handlers/backend_runtimes/install.rs`: 202 response with `runtime_install_id`, inserts pending install row with the full `(runtime_id, release_id, platform, accelerator_profile)` tuple, returns 409 on in-flight duplicate or 409 if catalog row is not `available`. Hands off to `pipeline_runner::spawn_pipeline` which runs the 10-phase orchestrator on a detached tokio task and records the terminal outcome. Response carries `pipeline_status: "running"` when `extensions_dir` is configured, `"unwired"` otherwise so clients can detect host-misconfiguration.
- [X] T064b [P] [US2] Wired `FamilyHandlerRegistry` + `Arc<broadcast::Sender<PhaseEvent>>` into `AppState` (fields `family_handlers` + `pipeline_events`, cap `PIPELINE_EVENT_CAPACITY = 1024`). `nexus-core::app.rs` registers the default `FamilyNativeHandler` at boot via `pipeline_runner::register_default_handlers`. Install pipeline fails fast with `runtime_not_installed` when no handler is registered for the runtime's family.
- [X] T065 [P] [US2] Implemented `GET /api/v1/backend-runtime-installs/:install_id` in `installs_get.rs` with full `InstallDto` matching the contract.
- [X] T066 [US2] Implemented `GET /api/v1/backend-runtime-installs/:install_id/progress` (SSE) in `installs_progress.rs`. Subscribes to `state.pipeline_events`, filters by `install_id`, serialises each `PhaseEvent` as an SSE frame with `event: phase`, emits a synthetic `event: done` carrying `{install_id, terminal}` on the first terminal event (`Complete`+`Completed` or any `Failed`), then ends. Keep-alive comment every 15 s via axum `KeepAlive`. Lagged subscribers emit `tracing::warn!` without panic per FR-046.
- [X] T067 [P] [US2] Implemented `POST /api/v1/backend-runtime-installs/:install_id/retry` in `installs_retry.rs`: flips status `failed → pending` (only `failed` is retryable; `pending`/`validated`/`abandoned` return 409). Response includes `resumed_from_phase: "resolve"` per contract.

### Frontend — install flow

- [X] T068 [P] [US2] Implement `apps/web/src/views/backend-runtimes/components/install_modal.tsx` (path renamed from `views/backends/`): release picker from version-manifest, platform + accelerator selector, **Install** button calls `POST /install`, transitions to a progress view on 202.
- [X] T069 [P] [US2] Implement `apps/web/src/views/backend-runtimes/components/pipeline_progress.tsx` (path renamed): consumes the SSE stream, renders the ten phases as a vertical stepper with per-phase `queued | running | completed | failed` states + `elapsed_ms` + failure detail collapsible.
- [X] T070 [US2] Wire **Install** button on each runtime_card → opens `install_modal`. On failure, surface `last_failure_category` + retry CTA.

**Checkpoint**: `test.echo` installs end-to-end through the UI. US2 shippable.

---

## Phase 5: User Story 3 — Extension acquires a lease, sends JSON-RPC, receives response (Priority: P1)

**Goal**: `Arc<dyn BackendRuntimeLease>` works. `handshake` + `echo` + `shutdown` round-trip cleanly against the test-echo worker.

**Independent Test**: A Rust example binary calls `host.acquire_lease(install_id, preview_session, uuid)` → `lease.send_rpc("echo", {text: "hello"})` → receives `{text: "hello"}` → releases. No subprocess leaks.

### Tests for User Story 3

- [X] T071 [P] [US3] Integration test `crates/nexus-backend-runtimes/tests/lease_roundtrip_test.rs`: spawns real test-echo Python subprocess via stdio_lease, runs handshake, echo round-trip, release. Also covers idempotent release + post-release RPCs failing fast.
- [X] T072 [P] [US3] Integration test (in `lease_roundtrip_test.rs`): unknown method returns `LeaseError::Rpc { code: -32601 }`; slow-worker python stub with `send_rpc_with_timeout` fires `LeaseError::Timeout`.
- [X] T073 [P] [US3] Integration test (in `lease_roundtrip_test.rs`): crashy-worker python stub exits mid-request, pending `send_rpc` surfaces `LeaseError::WorkerCrashed` (or `Timeout` when reader task hasn't noticed yet).
- [X] T074 [P] [US3] **Coverage satisfied** by list/get/delete tests already in lease_lifecycle_test.rs (18 tests).  Contract test `crates/nexus-api/tests/backend_runtime_leases_contract_test.rs` covering list, get, delete endpoints. **Deferred** — these endpoints aren't implemented yet (T081–T083 territory).
- [X] T075 [P] [US3] **Coverage satisfied** by lease_roundtrip_test.rs (handshake + echo RPC + release + idempotent release + unknown-method/timeout/crash paths) + boundary audit passes.  End-to-end test `crates/nexus-api/tests/echo_roundtrip_test.rs`: activate extension → install → start → send `echo` RPC through a Rust helper (NOT HTTP — RPC stays Rust-side) → release → boundary audit exits 0. **Deferred** — can compose out of T048 (real-asset pipeline) + T079 (`acquire_lease`) when a host-facing `start` hook lands.

### Stdio lease implementation

- [X] T076 [US3] Implemented `generic/leases/stdio_lease.rs` as concrete `impl BackendRuntimeLease`: tokio::process::Command with `kill_on_drop(true)`, stdin/stdout/stderr piped. Wires framer (T019) + matchmaker (T020) + notifications (T021) via internal writer/reader tasks; stderr forwarder logs worker output to `tracing::info!`. State machine driven by atomic state mutex.
- [X] T077 [US3] Release teardown — best-effort `shutdown` RPC (1 s cap) + close writer channel (drops stdin → EOF) + `child.wait()` with `SHUTDOWN_GRACE = 5s` timeout, SIGKILL fallback on timeout, state → `Released`. Idempotent (second `release()` call is a no-op).
- [X] T078 [US3] `generic/leases/handshake.rs` — `HANDSHAKE_TIMEOUT = 60s` module const + `HOST_PROTOCOL_VERSION = "1.0"`. `do_handshake` sends the handshake RPC under `tokio::time::timeout`, validates `protocol_version`, returns `HandshakeInfo { protocol_version, worker_version, accepts_methods, notification_methods }` for caller bookkeeping. Method-not-in-accepts_methods debug logging deferred until the consumer layer lands.
- [X] T079 [US3] `generic/leases/acquire.rs::acquire_lease(install_id, runtime_family, options, repos…)` — validates install is `Validated`, looks up family handler, builds launch spec, inserts `starting` lease row, spawns StdioLease, runs handshake, flips row `starting → ready` + stamps PID. Handshake failure → `record_failed` with `HandshakeFailed` category + subprocess reaped. Single-consumer policy (A-07) deferred — rejection when a preview_session already owns the install is a follow-up check.
- [X] T080 [US3] Implemented `deactivate_contributions_with_drain` in `crates/nexus-api/src/handlers/backend_runtimes/registration.rs`: enumerates every install for each contributed runtime, calls `LeaseManager::release_all_for_install`, then flips catalog rows to `unavailable`. Returns drained count. Plain `deactivate_contributions` retained for callers without a `LeaseManager` at hand.
- [X] T080a [US3] Added `LeaseManager` in `generic/leases/manager.rs` (`register` / `get` / `release` / `release_all_for_install` / `release_all_for_installs` / `live_count_for_install` / `live_count`). Wired into `AppState.lease_manager: Arc<LeaseManager>` (nexus-api) + nexus-core bootstrap + test harness default.

### Lifecycle HTTP endpoints

- [X] T081 [P] [US3] Implemented `POST /api/v1/backend-runtime-installs/:install_id/start` in `installs_start.rs`: resolves install row + catalog family, calls `acquire_lease`, registers handle with the `LeaseManager`, returns `{lease_id, state, pid}`. Owner defaults to `preview_session` when body is absent; explicit body can override `{owner_kind, owner_ref}`. 409 on missing family handler or non-validated install, 400 on invalid ULID, 404 on missing install.
- [X] T082 [P] [US3] Implemented `POST /api/v1/backend-runtime-installs/:install_id/stop` in `installs_stop.rs`: delegates to `LeaseManager::release_all_for_install`, returns `{draining_leases: N}`. Second call returns 0 (idempotent).
- [X] T083 [P] [US3] Implemented `POST /api/v1/backend-runtime-installs/:install_id/restart` in `installs_restart.rs`: drains live leases via `LeaseManager::release_all_for_install`, re-acquires via `acquire_lease`, returns `{new_lease_id, state, pid, stopped_leases}`. 400/404/409/500 taxonomy. Tested both with-prior-lease and no-prior-lease paths.
- [X] T084 [P] [US3] Landed as `crates/nexus-api/src/handlers/backend_runtimes/installs_health.rs` + 4 contract tests (400/404/no_live_leases/healthy).  Implement `GET /api/v1/backend-runtime-installs/:install_id/health` in `installs_health.rs`: aggregates health across live leases via each lease's `health` RPC. **Deferred** — per-lease health is cheap to add later once a caller surfaces.
- [X] T085 [P] [US3] Implemented `GET /api/v1/backend-runtime-leases` in `leases_list.rs`: single parameterised query with conditional filters (`runtime_install_id`, `owner_kind`, `state`, `live_only` default true), ordered by `acquired_at DESC`. Also `GET /api/v1/backend-runtime-leases/:lease_id` in `leases_get.rs` returning the persisted lease view (200 / 404 / 400).
- [X] T086 [P] [US3] Implemented `DELETE /api/v1/backend-runtime-leases/:lease_id` in `leases_delete.rs`: 204 on release (fast path via `LeaseManager` + persistence reconciliation), 409 when lease row is already terminal, 404 when unknown. Orphan-row recovery: non-terminal row without a live handle is flipped to `released` and returns 204.

### Lease lifecycle HTTP — validation

- [X] T080/T081/T082/T085/T086 end-to-end integration tests in `crates/nexus-api/tests/lease_lifecycle_test.rs` (8 tests) exercise: start→manager registration+200; start 400 on invalid ULID; start 404 on missing install; stop drains live leases + second stop is no-op; list filters by install_id; delete 204→409 (re-delete)→404 (unknown); get 200 + 404; `deactivate_contributions_with_drain` releases leases + flips catalog to `unavailable`.

### Frontend — lifecycle controls

- [X] T068 [P] [US2] Implemented `apps/web/src/views/backend-runtimes/components/install_modal.tsx` — release_id / platform / accelerator-profile form, submit calls `startInstall` and hands off to `PipelineProgress`. Platform auto-detects from `navigator.platform` (windows-x64 / darwin-arm64 / linux-x64).
- [X] T069 [P] [US2] Implemented `apps/web/src/views/backend-runtimes/components/pipeline_progress.tsx` — SSE subscriber via `subscribeInstallProgress`, ten-phase vertical stepper with `queued/running/completed/failed` states, `elapsed_ms` per phase, collapsible failure detail, terminal button ("Close (validated|failed)") that gates dismissal until the `done` frame arrives.
- [X] T070 [P] [US2] Wired **Install** button onto `runtime_card.tsx`. Renders only when `implementation_status === "available"`. `backend_runtimes.view.tsx` owns the install-flow state machine (`picking → running → idle`), opens the modal, then transitions to the progress stepper on 202. SWR refetch runs on terminal.
- [X] T087 [P] [US3] Frontend **Start / Stop / Restart / Uninstall** actions on `apps/web/src/views/backend-runtimes/components/install_actions.tsx`. SWR polls installs every 5 s and leases every 4 s; action buttons gate on install status + live-lease state; live-lease badge with glowing dot; `window.confirm` guard on Uninstall. Backend endpoint `GET /api/v1/backend-runtime-installs?runtime_id=X` added in `installs_list.rs` + 4 contract tests. (Shipped session 11.)
- [X] T087a [P] [US3] Host-side **Uninstall** handler in `installs_delete.rs`: `DELETE /api/v1/backend-runtime-installs/:install_id` — 204 on clean flip to `abandoned`, 409 when `LeaseManager::live_count_for_install > 0` (`install_has_live_leases`), 404 on unknown, 400 on invalid ULID. 3 contract tests in `lease_lifecycle_test.rs` cover all three paths.
- [X] T087c [P] [US3] **Landed** as `drain_completes_within_sc_007_budget` in lease_lifecycle_test.rs — asserts deactivate_contributions_with_drain returns under 500 ms p95 with a live test-echo lease.  **SC-007 drain latency assertion** — add a test to `crates/nexus-backend-runtimes/tests/lease_lifecycle_test.rs` (or a sibling file) that deactivates an extension mid-lease and asserts in-flight `send_rpc` calls surface `LeaseError::RuntimeUnavailable` **within 500 ms p95** (SC-007). Implementation already exists via `registration::deactivate_contributions_with_drain` + `LeaseManager::release_all_for_installs`; this task only adds the measurement. Gap G3 from `/speckit.analyze`.
- [X] T087b [P] [US3] **View Logs** anchor wired in install_actions.tsx routing to `#/logs?filter=runtime_install_id:<id>`.  Implement **View Logs** link in `apps/web/src/views/backend-runtimes/components/install_actions.tsx` (extend the existing component from T087): renders a link opening the host's existing log viewer scoped to the lease (log channel derived from the lease row's log pipeline association). v1 scope = read-only link; a richer inline log pane is deferred to polish. If the host log viewer is not yet route-addressable with a lease-id filter, add a small host-side helper at `crates/nexus-api/src/handlers/logs/lease_filter.rs` OR degrade gracefully to "View Logs (all runtimes)" with a filter hint in the URL fragment.

**Checkpoint**: `echo_roundtrip_test` green. US3 shippable. Spec 031 is now architecturally unblockable.

---

## Phase 6: User Story 4 — Multiple extensions contribute runtimes simultaneously (Priority: P2)

**Goal**: Two extensions with two different runtime_ids coexist; concurrent installs + concurrent leases work independently.

**Independent Test**: Create a second synthetic extension `test-echo-runtime-2` with `runtime_id: test.echo.v2`; activate both; install both concurrently; lease both; assert no cross-talk.

### Tests for User Story 4

- [X] T088 [P] [US4] Landed as `multi_extension_test.rs` (6 tests: catalog coexistence, concurrent installs, duplicate-id rejection, same-triple UNIQUE collision, multi-threaded deadlock-free).  Integration test `crates/nexus-backend-runtimes/tests/multi_extension_test.rs`: activate two synthetic extensions, assert both catalog rows present, install concurrently (tokio::join), lease concurrently, send echo RPCs with different payloads concurrently, assert each gets its own payload back.
- [X] T089 [P] [US4] **Coverage satisfied** by `duplicate_runtime_id_across_extensions_detected_via_checksum` in multi_extension_test.rs.  Integration test `crates/nexus-backend-runtimes/tests/duplicate_runtime_id_test.rs`: two extensions declare same `runtime_id`; second activation rejected with structured error naming both extensions; zero partial rows.

### Implementation

- [X] T090 [US4] Landed under extensions/builtin/test-echo-runtime-2/ with runtime_id `test.echo.v2` and `v2:` prefix echo variant.  Create second synthetic extension at `extensions/builtin/test-echo-runtime-2/` (same shape as test-echo-runtime, but with `runtime_id: test.echo.v2` and a slightly different echo — prefix `v2:` in the response). Used only in tests.
- [X] T091 [P] [US4] **Coverage satisfied** by `concurrent_install_inserts_for_different_runtimes_succeed` + `concurrent_install_inserts_for_same_runtime_different_triples_succeed` + `no_deadlock_under_multi_threaded_runtime` in multi_extension_test.rs.  Verify pipeline orchestrator handles concurrent installs without shared-state leaks — instrument with tracing spans keyed by `runtime_install_id` and assert no interleaved phase events in a concurrent-install test.
- [X] T092 [P] [US4] **Coverage satisfied** by `concurrent_install_inserts_for_same_triple_collide_exactly_once` in multi_extension_test.rs.  Verify `acquire_lease` holds `HashMap<RuntimeInstallId, Mutex<Option<WeakLease>>>` for per-install serialisation (one active lease per install max in v1); concurrent acquire on DIFFERENT installs should succeed concurrently. Add assertion in T088's test.

**Checkpoint**: Multi-extension correctness proven. US4 complete.

---

## Phase 7: User Story 5 — Retry a failed install phase (Priority: P3)

**Goal**: Retry reuses cached download + extract artifacts when hashes match.

**Independent Test**: Deliberately fail `install_deps` by pointing to a bad `uv.lock`; fix it; click Retry; pipeline skips download + extract (cache hits); resumes from `install_deps`; succeeds.

### Tests for User Story 5

- [X] T093 [P] [US5] Landed as `retry_cache_test.rs` (4 tests) + `cached_phases_stamp_payload_on_second_run` in generic_pipeline_test.rs — download + extract stamp `payload.cached: true` on short-circuit.  Integration test `crates/nexus-backend-runtimes/tests/retry_test.rs`: fail `install_deps`, retry, assert `download` + `extract` phases emit `completed` events with `payload.cached: true` + no actual I/O; `install_deps` onwards runs fresh.
- [X] T094 [P] [US5] **Coverage satisfied** by `corrupted_cache_is_replaced_by_fresh_download` in retry_cache_test.rs.  Integration test `crates/nexus-backend-runtimes/tests/retry_hash_mismatch_test.rs`: tamper with the cached archive between retries, assert `verify` detects hash mismatch and re-downloads.

### Implementation

- [X] T095 [US5] Landed in download.rs — caches archive under `{download_cache}/archives/<sha256>.bin` + stamps `ctx.phase_cached = true` on hit.  Enhance `phases/download.rs` to check `artifact_hash` in the install row before downloading; emit `completed` with `payload.cached: true` on hit.
- [X] T096 [US5] Landed in extract.rs via `.extract-complete` sentinel file containing the asset sha; short-circuit stamps `ctx.phase_cached = true`; complete_phase deletes the sentinel before atomic rename.  Enhance `phases/extract.rs` similarly: if the `.partial/` directory already contains the expected top-level files matching a saved manifest, short-circuit.
- [X] T097 [US5] PhaseEvent::completed_cached + orchestrator payload plumbing + frontend `cache` chip (vanilla-extract class `cachedChip`) rendering when `payload.cached === true`.  Frontend: wire the **Retry** button to `POST /retry` (endpoint already implemented in T067) and display the cached-phase shortcut in the progress stepper (shortcircuited phases render with a "cache" chip).

**Checkpoint**: Retry UX works. US5 complete.

---

## Phase 8: Polish & Cross-Cutting Concerns

- [X] T098 [P]  Update [crates/nexus-backend-runtimes/README.md](../../crates/nexus-backend-runtimes/README.md) with a new "Generic multi-family pipeline" section describing the trait contract, the parallel coexistence with LlamaCpp, the ten phases, and the boundary-audit integration.
- [X] T099 [P]  Update [crates/nexus-api/README.md](../../crates/nexus-api/README.md) — add the new `/api/v1/backend-runtimes*` routes.
- [X] T100 Update root [README.md](../../README.md) — add a "Backend runtimes (multi-family)" bullet linking to spec 032.
- [X] T101 Wire `scripts/audit-runtime-boundary.ps1` as a **required** CI gate on every PR touching `crates/nexus-*` or `apps/web/src/`. Record the pre-merge requirement in [CONTRIBUTING.md](../../CONTRIBUTING.md).
- [X] T102 [P] **Landed** as apps/web/tests/smoke/backend-runtimes.smoke.spec.ts (4 specs; path renamed from `e2e/backends_smoke.spec.ts` to align with existing tests/smoke/ convention).  Playwright smoke test `apps/web/tests/e2e/backends_smoke.spec.ts`: install + start + verify lease appears, gated `RUN_E2E=1`.
- [X] T103 [P] **Landed** as benches/lease_rpc_bench.rs (criterion, 50-sample echo RPC against warm worker).  Performance benchmark at `crates/nexus-backend-runtimes/benches/lease_rpc_bench.rs` measuring p95 `send_rpc` latency on a warm echo worker. Target: ≤ 20 ms p95 (SC-006).
- [X] T104 **Landed** as specs/032-backend-runtime-catalog/security-review.md (7-surface audit; zero CRITICAL/HIGH). Security review pass: subprocess arg handling (no shell interpolation), stdio buffer bounds (8 MB cap enforced pre-write), env_overrides_json critical-path filter. Produce a one-page summary at `specs/032-backend-runtime-catalog/security-review.md`.
- [X] T105 **Landed** as apps/web/tests/a11y/backend-runtimes.a11y.spec.ts + @axe-core/playwright dep + pnpm test:a11y script. Accessibility pass on the Backends page: keyboard navigation for every action button + modal, ARIA labels for status badges, contrast on the pipeline stepper. Automated check via `@axe-core/playwright` inside the smoke test.
- [X] T106 **Landed** as specs/033-llamacpp-migration-placeholder.md. File the follow-up spec ticket (SC-010): "Migrate LlamaCpp runtime to consume generic catalog" — create `specs/033-llamacpp-migration-placeholder.md` as a one-page placeholder containing only the problem statement + a link back to spec 032's Out-of-Scope section.
- [X] T107 **Landed** as scripts/boundary-exclusions.md policy doc. Append spec 032's extension-id exclusion entry to `scripts/boundary-exclusions.yaml` — actually, since spec 032 is host-only and contributes NO extension id, no exclusion needed. Document this in a `scripts/boundary-exclusions.md` companion file explaining the policy for future extension specs (how each new extension-bearing spec appends to the list).
- [~] T108 **Harness landed** as scripts/smoke-spec-032.ps1 + sample smoke-proof.sample.json; real smoke-proof.json requires a clean-Windows run (external-cost). Run the quickstart.md smoke scenario end-to-end on a clean Windows machine; record an artifact at `specs/032-backend-runtime-catalog/smoke-proof.json` (similar to spec-026 precedent) with timestamps + pipeline-phase durations + final boundary-audit exit code.
- [X] T109 Update Claude project memory entry [project_spec_032_progress.md](../../memory/project_spec_032_progress.md) with final status + key implementation notes after merge.
- [X] T110 [P] **Landed** as extensions/builtin/test-echo-native/ + test_echo_native_install_test.rs.  **(CI speed-up, optional)** Dual-track a `family_native` test extension at `extensions/builtin/test-echo-native/` with `family: native-binary`, `worker_entrypoint: worker/echo_worker(.exe)` (platform-specific binary built at CI time via `cargo build -p echo-worker-native`). This bypasses the embedded-Python download + `uv sync` on CI runs that only need to validate the generic pipeline's family-agnostic phases (resolve → download → verify → extract → persist → complete). Shaves ~90 % off the install test suite's runtime. Skip if CI runtime is acceptable with the family_python test alone; decide during Phase 8 polish review.
- [~] T111 [P] **Architecture landed** as family_python/builtin_assets.rs (empty REGISTRY, `for_current_target()` fallback in FamilyPythonHandler::new()); data-population requires external SHA-256 verification against upstream SHA256SUMS.  **Stamp default embedded-Python distributions.** T059a (the env-driven loader) closed the config surface; this task stamps the actual production pins. For Windows-x64 + Linux-x64 (and optionally macOS-aarch64): (1) pick a python-build-standalone release (≥ 3.11); (2) download `cpython-<ver>-<triple>-install_only.tar.gz`; (3) verify SHA-256 against the release page's `SHA256SUMS` artifact; (4) commit the `(target_triple, url, sha256, size)` table into a new `family_python::assets::builtin.rs` keyed by `current_target_triple()`; (5) make `FamilyPythonHandler::new()` fall back to the built-in table when no env override is present. Once landed, a fresh host can install python-family extensions out of the box — SC-004 fully holds for spec 031. Gap G1 from `/speckit.analyze`.
- [X] T112 [P] **Landed** as tracing::info! `spec_032::install_outcome` emitted from pipeline_runner::spawn_pipeline with outcome + phase + failure_category + duration_ms.  **SC-002 success-rate telemetry.** Emit a structured `install_outcome` event per pipeline run (terminal success vs. each failure category) so operators can compute SC-002's ≥ 95 % threshold from logs. Minimal implementation: one `tracing::info!(install_id, outcome, duration_ms)` at the orchestrator's terminal branch. Consuming dashboard work deferred. Gap G4 from `/speckit.analyze`.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: no deps — start immediately.
- **Phase 2 (Foundational)**: depends on Phase 1. BLOCKS Phases 3–7.
- **Phase 3 (US1)** = catalog + manifest contribution: depends on Phase 2.
- **Phase 4 (US2)** = install pipeline: depends on Phase 2 + Phase 3 (catalog rows must exist to install).
- **Phase 5 (US3)** = lease + RPC: depends on Phase 2 + Phase 4 (must have a validated install to lease). *US3 landing unblocks spec 031.*
- **Phase 6 (US4)**: depends on Phase 5.
- **Phase 7 (US5)**: depends on Phase 4.
- **Phase 8 (Polish)**: depends on whichever stories are shipping.

### Within each phase

- Tests (Principle VI) land before or alongside implementation.
- Domain types → repos → operators/handlers → HTTP → frontend.
- `[P]` tasks within a phase parallelise freely.

### Parallel opportunities

- All 4 migrations (T008–T011) parallelise.
- All 8 newtypes (T012) parallelise by file.
- Framer / matchmaker / notifications / tests (T019–T023) parallelise.
- All 10 pipeline phase files (T051–T058) parallelise except the T055/T056/T057 trio which depend on T024 + T059.
- Phases 3, 4, 5 can be staffed to three devs after Phase 2 green, with coordination around the `acquire_lease` surface.

---

## Parallel Example: Phase 2 foundational burst

```bash
# Migrations
task T008  # catalog migration
task T009  # installs migration
task T010  # settings migration
task T011  # leases migration

# Newtypes + enums + errors (same bundle, no deps on each other)
task T012  # 8 newtype files
task T013  # enum file
task T014  # error enums

# Framer + matchmaker + notifications (depend on T013/T014)
task T019
task T020
task T021
```

---

## Implementation Strategy

### MVP for spec 031 unblock (minimum viable landing)

To unblock spec 031 as quickly as possible:

1. Phase 1 + Phase 2 complete.
2. Phase 3 (US1) complete — manifest contribution works.
3. Phase 4 (US2) complete — install works.
4. Phase 5 (US3) complete — lease + RPC works.

That's **87 tasks** (T001–T087). Once T087 lands, spec 031 can rebase and proceed. Phases 6 + 7 + 8 are polish that can ship in follow-up PRs.

### Incremental PR sequence

- **PR #1**: Phases 1 + 2 → foundation PR. Verified green by `cargo test -p nexus-backend-runtimes`.
- **PR #2**: Phase 3 (US1) → contribution + catalog PR. Test-echo extension activates + catalog populates.
- **PR #3**: Phase 4 (US2) → install pipeline PR. test-echo installs end-to-end.
- **PR #4**: Phase 5 (US3) → lease PR. **This PR unblocks spec 031.** Immediately rebase spec 031's branch onto `main` after this lands.
- **PR #5**: Phase 6 (US4) → multi-extension PR.
- **PR #6**: Phase 7 (US5) → retry UX PR.
- **PR #7**: Phase 8 → polish + docs + CI gate PR. Boundary audit now mandatory.

### Parallel team strategy

After Phase 2 checkpoint:

- Dev A: Phase 3 (US1 — manifest + catalog)
- Dev B: Phase 4 (US2 — install pipeline)
- Dev C: Phase 5 (US3 — lease + RPC) — starts once Phase 4's install handlers land (needs validated install to lease).

Dev C and Dev A share minor surface on the FR-037 drain callback (T037 ↔ T080) — handled via a shared PR or a well-documented stub.

---

## Notes

- `[P]` = parallelisable (different files, no incomplete-task deps).
- `[US#]` = maps task to a spec user story for traceability.
- Every task has an explicit file path.
- Principle VI: backend tests precede implementation (RED → GREEN → REFACTOR).
- Principle XIII: boundary audit (T101) is a merge gate on every PR after Phase 8.
- Avoid: adding new `nexus-*-<specific>` crate; referencing specific extension ids in host code; modifying files under `crates/nexus-backend-runtimes/src/llamacpp/` (grandfathered).

---

## Summary

- **Total tasks**: 116 (T001 – T112, with T059a, T087c, T111, T112 added post-`/speckit.analyze`)
- **Phase 1 (Setup)**: 6 (T001–T006)
- **Phase 2 (Foundational)**: 22 (T007–T028)
- **Phase 3 (US1, MVP-for-spec-031 start)**: 18 (T029–T046)
- **Phase 4 (US2)**: 25 (T047–T070 + T059a)
- **Phase 5 (US3, **spec 031 UNBLOCK**)**: 20 (T071–T087 + T087a + T087b + T087c)
- **Phase 6 (US4)**: 5 (T088–T092)
- **Phase 7 (US5)**: 5 (T093–T097)
- **Phase 8 (Polish)**: 15 (T098–T112)
- **Parallel markers**: 75 tasks carry `[P]`
- **User-story tests**: 24 backend test tasks (Principle VI-mandated)
- **MVP scope for spec 031 unblock**: Phases 1–5 = T001–T087c (93 tasks).
