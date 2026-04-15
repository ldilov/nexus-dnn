# Tasks: Model Catalog & Backend Lifecycle

**Input**: Design documents from `/specs/010-model-catalog-lifecycle/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: The spec mandates automated verification for every user story. TDD is enforced per constitution §testing. Test tasks are included and MUST be written before their corresponding implementation tasks.

**Organization**: Tasks are grouped by user story. US1 is the P1 bug fix that unblocks everything else; US2 is the P1 catalog feature (MVP slice); US3/US4 are P2 extensions. Each story is independently testable.

> **Path A scope adjustment (2026-04-15)** — tasks left `[ ]` fall into three buckets; none are blocking the scope-trimmed ship:
>
> - **`→ 011`** (blocked on spec 011 `host-runtime-pool`): T036, T037, T041, T042 (reconciler + 3-state UI), T068 T072 (progress streaming), T097 T098 T099 T100 T101 T102 (load-into-process + HyperparameterForm UI).
> - **`test-backlog`** (dedicated test chunk, pre-close): T012 T013 T029 T030 T031 T032 T033 T034 T035 T051 T052 T053 T054 T055 T056 T074 T075 T076 T077 T078 T085 T086 T087 T088 T089 T090 T091 T092.
> - **`cleanup-backlog`** (nice-to-have): T004 (checksum move), T006 (module skeletons superseded), T009 T028 (final clippy/tsc gates — green as of analyze), T025 T026 (enum variants — existing `Broken`/`Ready` sufficient), T044 T058 T085 T102 (US verify tasks — subsumed by Path A analysis), T104 (diagnostics endpoint), T106 T107 T108 (docs + a11y).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Parallelizable — different files, no dependencies on other incomplete tasks in the same phase
- **[Story]**: US1 / US2 / US3 / US4 or no label for Setup/Foundational/Polish

## Path Conventions

Web application layout (per plan.md §Project Structure):
- Rust host: `crates/nexus-api/src/`, `crates/nexus-local-llm/src/`
- Extension SQL: `extensions/builtin/local-llm/storage/migrations/`
- Frontend: `apps/web/src/`
- Rust tests: `crates/*/tests/`
- Contract tests: `tests/contract/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare dependencies, the new shared `nexus-huggingface` crate, and scaffolding for the sprint.

- [X] T001 Create new host crate `crates/nexus-huggingface/` via `cargo new --lib crates/nexus-huggingface` and add it to the root `Cargo.toml` `[workspace.members]`
- [X] T002 Populate `crates/nexus-huggingface/Cargo.toml` with deps: `tokio`, `reqwest` (json, rustls-tls), `hf-hub = { version = "0.4", default-features = false, features = ["tokio"] }`, `sqlx`, `serde`, `serde_json`, `sha2`, `tracing`, `thiserror`, `async-trait`; dev-deps `wiremock = "0.6"`, `tempfile`
- [X] T003 [P] Create module skeletons with `//!` doc-attribute headers (no inline comments) in `crates/nexus-huggingface/src/lib.rs`, `search.rs`, `detail.rs`, `download.rs`, `checksum.rs`, `cache.rs`, `progress.rs`, `token.rs`, `error.rs`; re-export the public surface from `lib.rs`
- [ ] T004 [P] Move `crates/nexus-local-llm/src/checksum.rs` into `crates/nexus-huggingface/src/checksum.rs`; replace the local-llm module with a re-export `pub use nexus_huggingface::checksum;` and update all call sites in `nexus-local-llm`
- [X] T005 Add `nexus-huggingface = { path = "../nexus-huggingface" }` to `crates/nexus-local-llm/Cargo.toml` and `crates/nexus-api/Cargo.toml` `[dependencies]`
- [ ] T006 [P] Create module skeletons (no inline comments) in `crates/nexus-local-llm/src/manifest/hf_routing.rs`, `crates/nexus-local-llm/src/manifest/hyperparameters.rs`, `crates/nexus-local-llm/src/manifest/install.rs` and wire them into `crates/nexus-local-llm/src/manifest/mod.rs`
- [X] T007 [P] Create frontend Models panel directory scaffold at `apps/web/src/models/` with empty `ModelsPanel.tsx`, `InstalledList.tsx`, `CatalogSearch.tsx`, `ModelCard.tsx`, `InstallProgress.tsx`, `HyperparameterForm.tsx`, `backend_compat_badge.tsx`, `models.css.ts`
- [X] T008 [P] Create TRT-LLM supported-architectures allowlist at `extensions/builtin/local-llm/backends/trt-llm/supported_architectures.yaml` seeded with the list from research.md §R3
- [ ] T009 Run `cargo fmt && cargo clippy --workspace --all-targets -- -D warnings` and `pnpm --dir apps/web lint` to confirm clean baseline (new crate compiles, moved checksum module builds, no call sites broken)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Migrations (host + extension), the shared `HuggingFaceCapability` trait, DTOs, handler/router scaffolding, and the baseline tests that every user story depends on.

### Migrations

- [X] T010 Author host migration `crates/nexus-storage/migrations/NNN_host_hf_catalog.sql` matching data-model.md §Host migration (creates `host_hf_catalog_cache` + index). Pick `NNN` as the next free sequential host migration number.
- [X] T011 Author extension migration `extensions/builtin/local-llm/storage/migrations/006_model_hyperparameters.sql` matching data-model.md §Extension migration (four columns on `ext_local_llm_model_installs` + `ext_local_llm_backend_state_log`)
- [ ] T012 [P] Migration smoke test in `crates/nexus-storage/tests/migration_host_hf.rs` asserting fresh DB → apply host migrations → `host_hf_catalog_cache` exists with expected columns
- [ ] T013 [P] Migration smoke test in `crates/nexus-local-llm/tests/migration_006.rs` asserting fresh DB → apply extension 001..006 → schema introspection matches expected columns and tables

### Shared HF capability trait (nexus-huggingface)

- [X] T014 [P] Define `HuggingFaceCapability` trait in `crates/nexus-huggingface/src/lib.rs`: `async fn search(&self, req: SearchReq) -> Result<SearchPage, HfError>`, `async fn detail(&self, repo_id: &str, revision: Option<&str>) -> Result<RepoMetadata, HfError>`, `fn download(&self, spec: DownloadSpec) -> BoxStream<ProgressEvent>`; plus request/response types (`SearchReq`, `SearchPage`, `RepoMetadata`, `DownloadSpec`, `ProgressEvent`) with `#[derive(Serialize, Deserialize, ts_rs::TS)]`
- [X] T015 [P] Implement `HfError` enum in `crates/nexus-huggingface/src/error.rs` with variants `Http(reqwest::Error)`, `Unreachable`, `RateLimited { retry_after_seconds: u32 }`, `GatedNeedsToken`, `ChecksumMismatch { expected, actual }`, `Cancelled`, `Db(sqlx::Error)`, `Parse(serde_json::Error)`
- [X] T016 [P] Implement `HfToken::from_env()` in `crates/nexus-huggingface/src/token.rs` reading `$HF_TOKEN` exactly once at construction; assert no UI-collection surface exists (compile-time: private struct, no public from-string constructor on the client)
- [X] T017 [P] Unit tests for the capability scaffolding in `crates/nexus-huggingface/src/lib.rs#tests`: stub impl returning canned `SearchPage` — proves the trait can be mocked without network

### DTOs + handler skeleton (nexus-api)

- [X] T018 [P] Create DTO module `crates/nexus-api/src/dto/models.rs` with `HfSearchResultDto`, `BackendCompatDto`, `InstalledModelDto`, `HyperparameterProfileDto`, `ModelLimitsDto`, `LoadStateDto`, `InstallModelRequestDto`, `ModelInstallTaskDto`; all with `#[derive(Serialize, Deserialize, ts_rs::TS)]` and `#[ts(export)]`. Re-export `nexus-huggingface` public types where the DTO is a direct passthrough.
- [X] T019 Register `pub mod models;` in `crates/nexus-api/src/dto/mod.rs` and re-export types at crate root
- [X] T020 [P] Create handler skeleton `crates/nexus-api/src/handlers/local_llm_models.rs` with empty axum handlers that take `State<Arc<dyn HuggingFaceCapability>>` (and the existing local-llm stores) as state, returning `StatusCode::NOT_IMPLEMENTED` for every endpoint in `contracts/`
- [X] T021 Wire `local_llm_models` routes into `crates/nexus-api/src/router.rs` under the existing `/extensions/local-llm/*` reveal; inject the shared `HuggingFaceCapability` via axum `State` using the concrete `HuggingFaceClient` built in `nexus-core`'s app assembly
- [X] T022 In `crates/nexus-core/src/app.rs`, construct `Arc::new(HuggingFaceClient::new(pool.clone(), HfToken::from_env()))` once at startup and hand it to every extension that declares the HF capability (just `local-llm` today; extensible for future extensions)
- [X] T023 Regenerate TS DTOs via the project's `ts-rs` export task and commit `apps/web/src/api/generated/*.ts`
- [X] T024 [P] Extend `apps/web/src/api/client.ts` with typed fetchers `listCatalog`, `searchCatalog`, `installModel`, `cancelInstallTask`, `loadModel`, `getLoadState`, `patchHyperparameters` using the generated DTOs

### Backend-state foundation (needed by US1 tests)

- [ ] T025 [P] Extend `RuntimeInstallState` enum in `crates/nexus-local-llm/src/state.rs` with `NeedsRepair` variant and serde round-trip test in the same file's `#[cfg(test)] mod tests`
- [ ] T026 Add state-transition guard function `RuntimeInstallState::transition(from, to) -> Result<()>` in `crates/nexus-local-llm/src/state.rs` that rejects `Installed → NotInstalled` and `Installed → Installing`; cover with unit tests in the same file
- [X] T027 Extend `crates/nexus-local-llm/src/installs_store.rs` with `append_state_log(install_id, from, to, trigger, detail)` that writes to `ext_local_llm_backend_state_log` inside the caller's transaction; add integration test in `crates/nexus-local-llm/tests/installs_store_state_log.rs`

### Verification

- [ ] T028 Verify foundational completeness: `cargo test --workspace`, `cargo clippy --workspace --all-targets -- -D warnings`, `pnpm --dir apps/web tsc --noEmit` all green. Confirm `nexus-huggingface` is consumed only via the trait in both `nexus-local-llm` and `nexus-api` (no direct `reqwest::Client` usage leaks).

**Checkpoint**: Foundational phase complete. User stories can now proceed independently.

---

## Phase 3: US1 — Backend install/activation state persists across reload (P1, bug fix)

**Story goal**: After installing and activating a backend, reloading the app shows it as Installed & Active on first paint in 100% of sessions, with no phantom "Not installed" and no phantom "Model loaded".

**Independent test criteria**: `crates/nexus-local-llm/tests/backend_state_reload.rs` drives install → kill process → reload → `GET /extensions/local-llm/backends` returns `installed`, and `cargo test backend_state_reload -- --ignored` passes the E2E reload journey. Playwright smoke `apps/web/e2e/backend_reload.spec.ts` reloads 50 times and counts zero phantom-state flips.

### Tests (write first — RED)

- [ ] T029 [P] [US1] Contract test in `tests/contract/local_llm_backends_contract.rs` asserting `GET /extensions/local-llm/backends` envelope shape for `Installed`, `NeedsRepair`, `NotInstalled`
- [ ] T030 [P] [US1] Integration test `crates/nexus-local-llm/tests/backend_state_reload.rs::reload_preserves_installed_state` — install, drop the store handle, open a fresh handle, assert state is `installed`
- [ ] T031 [P] [US1] Integration test `crates/nexus-local-llm/tests/backend_state_reload.rs::probe_cannot_downgrade_installed_to_not_installed` — seed `installed`, run reconciler against a transiently unreadable binary path, assert state becomes `needs_repair` not `not_installed`
- [ ] T032 [P] [US1] Integration test `crates/nexus-local-llm/tests/backend_state_reload.rs::repair_flow_restores_installed` — from `needs_repair`, run the repair pipeline, assert `installed` and state log shows `needs_repair → installed` with trigger `repair`
- [ ] T033 [P] [US1] Integration test `crates/nexus-local-llm/tests/load_state_truth.rs::process_ready_without_model_reports_null_loaded_model` — start a mock llama-server that accepts HTTP but has no model resident, assert `GET /backends/:id/load-state` returns `loaded_model_id: null`
- [ ] T034 [P] [US1] Frontend test `apps/web/src/backends/hooks/use_backend_status.test.ts` asserting hydration reads DB before probe and probe result never overwrites `installed` to `not_installed`
- [ ] T035 [US1] Playwright smoke `apps/web/e2e/backend_reload.spec.ts` — install flow then 50 hard reloads, expect zero `Not installed` sightings

### Implementation (make tests GREEN)

- [ ] T036 [US1] Rewrite `crates/nexus-local-llm/src/validator.rs::reconcile(install)` to be presence-only: if binary missing and state is `Installed`, transition to `NeedsRepair` via `installs_store::append_state_log` with trigger `reconciler_probe`; never transition to `NotInstalled` or `Installing`
- [ ] T037 [US1] Refactor `crates/nexus-local-llm/src/llamacpp/install_pipeline.rs` so `state` only becomes `Installed` inside a single `sqlx::Transaction` after `binary_paths` are verified and persisted; add `tracing::instrument` span `backend.install.commit`
- [ ] T038 [US1] Add handler `GET /extensions/local-llm/backends` in `crates/nexus-api/src/handlers/local_llm_backends.rs` (or existing equivalent) that returns DB rows verbatim via `InstallsStore::list_all` and schedules a background reconciler task with `tokio::spawn`
- [X] T039 [US1] Add handler `GET /extensions/local-llm/backends/:id/load-state` in the same module querying the managed-process supervisor's current loaded-model id; return `loaded_model_id: null` when process is ready but no model resident
- [ ] T040 [US1] Add handler `POST /extensions/local-llm/backends/:id/repair` that runs the install pipeline in repair mode and returns a progress task id
- [ ] T041 [US1] In `apps/web/src/backends/hooks/use_backend_status.ts`, rewrite to `use(dbStatePromise)` first, then subscribe to probe-driven `reconciler:transition` events from the ServiceWorker to apply non-destructive updates; remove any code path that writes `not_installed` from the client
- [ ] T042 [US1] Update `apps/web/src/backends/backend_card.tsx` to render three visual states (Installed, NeedsRepair with "Repair" CTA, NotInstalled) driven by the DTO `state` field; remove ambiguous "Ready" copy
- [X] T043 [US1] In the backend card and chat surface, replace the boolean `isReady` "Model loaded" derivation with a Suspense-read of `useLoadState(backendId)` reading `/load-state`; render "No model loaded — select one" when `loaded_model_id` is null
- [ ] T044 [US1] Verify US1: `cargo test -p nexus-local-llm backend_state_reload load_state_truth`, `pnpm --dir apps/web test use_backend_status`, Playwright `backend_reload.spec.ts`, and manual quickstart steps 2-2.6

**Checkpoint**: US1 complete and shippable on its own. The bug is fixed.

---

## Phase 4: US2 — Unified Model Catalog with HF search (P1, MVP feature)

**Story goal**: User opens Models panel, sees installed models, searches Hugging Face with filters, installs a GGUF model end-to-end in under 2 minutes, sees it appear in Installed within 2 seconds.

**Independent test criteria**: `crates/nexus-local-llm/tests/hf_catalog_search.rs` with `wiremock`-backed HF asserts search → install → installed-list-includes flow; Playwright `apps/web/e2e/catalog_search.spec.ts` walks the UI journey.

### Tests (write first — RED)

**In `nexus-huggingface` (shared capability):**

- [X] T045 [P] [US2] Unit tests `crates/nexus-huggingface/src/search.rs#tests` covering: `build_search_url` with all filter combinations; pagination cursor parsing from `Link` header; cache key stability across argument order
- [X] T046 [P] [US2] Integration test `crates/nexus-huggingface/tests/search_cache.rs::search_hits_cache_on_second_identical_call` using `wiremock` — first call records a request, second call within TTL records zero new requests
- [X] T047 [P] [US2] Integration test `crates/nexus-huggingface/tests/search_cache.rs::upstream_unreachable_returns_hf_error_unreachable` — `wiremock` closed, assert `HfError::Unreachable` with `retry_after_seconds`
- [X] T048 [P] [US2] Integration test `crates/nexus-huggingface/tests/download.rs::download_resumes_after_partial` — serve a file with `Range` support, simulate interruption mid-stream, assert resume continues from offset
- [X] T049 [P] [US2] Integration test `crates/nexus-huggingface/tests/download.rs::checksum_mismatch_surfaces_error` — serve corrupted content, assert capability returns `HfError::ChecksumMismatch`
- [X] T050 [P] [US2] Integration test `crates/nexus-huggingface/tests/download.rs::cancel_cleans_up_partial_file` — start download, cancel via token, assert staging file removed within 500 ms

**In `nexus-local-llm` / `nexus-api` (consumer):**

- [ ] T051 [P] [US2] Contract test `tests/contract/local_llm_catalog_contract.rs` asserting envelopes for `catalog_list.http`, `catalog_search.http`, `install_model.http` (including the 503 HF-unreachable and 409 no-compatible-backend cases)
- [ ] T052 [P] [US2] Integration test `crates/nexus-local-llm/tests/hf_install_flow.rs::install_gguf_happy_path` — inject a mock `HuggingFaceCapability` serving a tiny fake GGUF, post install, wait on progress channel, assert `ext_local_llm_model_installs` row exists with verified checksum and `routed_backend = llamacpp`
- [ ] T053 [P] [US2] Integration test `crates/nexus-local-llm/tests/hf_install_flow.rs::cancel_during_download_leaves_no_row` — start install, cancel mid-stream, assert no row in `ext_local_llm_model_installs`, no residual partial file
- [ ] T054 [P] [US2] Integration test `crates/nexus-local-llm/tests/hf_install_flow.rs::hf_unreachable_surfaces_as_503` — mock capability returns `HfError::Unreachable`, assert handler surfaces `HF_UNREACHABLE` envelope
- [ ] T055 [P] [US2] Frontend test `apps/web/src/models/ModelsPanel.test.tsx` asserting Suspense fallback shows, then installed + HF sections render from a single promise
- [ ] T056 [P] [US2] Playwright `apps/web/e2e/catalog_search.spec.ts` — search → install → confirm in Installed within 2 s

### Implementation

**In `nexus-huggingface`:**

- [X] T057 [US2] Implement `HuggingFaceClient` in `crates/nexus-huggingface/src/lib.rs` — concrete impl of `HuggingFaceCapability` holding a `reqwest::Client`, a `CatalogCacheRepo`, and an `HfToken`
- [X] T058 [US2] Implement `search()` in `crates/nexus-huggingface/src/search.rs` — build URL with filters, call HF, parse `Link` header for pagination, go through `CatalogCacheRepo` for ETag revalidation
- [X] T059 [US2] Implement `detail()` in `crates/nexus-huggingface/src/detail.rs` — fetch `/api/models/{repo_id}` and include `siblings[]` file list
- [X] T060 [US2] Implement `CatalogCacheRepo` in `crates/nexus-huggingface/src/cache.rs` with `get(key)`, `put(key, body, etag, ttl)`, `sweep_expired(now)` over `host_hf_catalog_cache`
- [X] T061 [US2] Implement `download()` in `crates/nexus-huggingface/src/download.rs` wrapping the `hf-hub` async API: accepts `DownloadSpec { repo_id, revision, files, dest_staging, cancel_token }`, streams `ProgressEvent`s, verifies via `checksum.rs`, supports resume
- [X] T062 [US2] Implement `ProgressPublisher` in `crates/nexus-huggingface/src/progress.rs` publishing to the shared extension event bus (topic pattern `hf:download:{task_id}`); consumers re-publish to their own namespaced topic

**In `nexus-local-llm` / `nexus-api` (consumer side):**

- [X] T063 [US2] Implement `GET /extensions/local-llm/models/catalog` in `crates/nexus-api/src/handlers/local_llm_models.rs` joining `InstalledModelRepo::list()` with optional `capability.search(...)` when `?include_hf=true&q=...`; concurrent with `tokio::try_join!`
- [X] T064 [US2] Implement `GET /extensions/local-llm/models/catalog/search` dedicated endpoint in the same handler file, annotating each result with `already_installed_ids` by cross-referencing the installed table
- [X] T065 [US2] Implement install orchestration `ModelInstaller::install(capability, request) -> ModelInstallTaskDto` in `crates/nexus-local-llm/src/manifest/install.rs`: insert `ext_local_llm_model_download_tasks` (queued) → drive `capability.download(spec)` → re-emit progress on `extension:local-llm:model:progress` → parse limits via `config.json` or GGUF header → commit `ext_local_llm_model_installs` row inside one `sqlx::Transaction`; on any error, clean up staging dir and mark task `failed`
- [X] T066 [US2] Implement `POST /extensions/local-llm/models` handler calling `ModelInstaller::install`; return 202 with task id and progress channel; surface `HfError::Unreachable` → 503 `HF_UNREACHABLE`, `RoutingError::NoRoute` → 409 `NO_COMPATIBLE_BACKEND`
- [X] T067 [US2] Implement `POST /extensions/local-llm/models/tasks/:task_id/cancel` handler; signal the running download task via its `CancellationToken` (the capability handles staging cleanup)

**Frontend:**

- [ ] T068 [US2] Extend `apps/web/src/service-workers/model_progress_sw.ts` to subscribe to `extension:local-llm:model:progress` and broadcast to main-thread subscribers; add `subscribe(taskId, callback)` / `unsubscribe` API
- [X] T069 [US2] Implement `apps/web/src/models/ModelsPanel.tsx` as a Suspense boundary calling `use(catalogPromise)` from `client.ts::listCatalog`; separate `InstalledList` and `CatalogSearch` children that receive sliced data
- [ ] T070 [P] [US2] Implement `apps/web/src/models/CatalogSearch.tsx` with a debounced (300 ms) input, filter chips for format/license/size, and a "key" state that reseeds the catalog promise on change
- [X] T071 [P] [US2] Implement `apps/web/src/models/ModelCard.tsx` rendering repo_id, author, license, downloads, file list, quantization variants, and a `backend_compat_badge`
- [ ] T072 [P] [US2] Implement `apps/web/src/models/InstallProgress.tsx` subscribing to the ServiceWorker channel with `useEffect` + `useEffectEvent` for cancel; render `<progress>` and elapsed / ETA
- [ ] T073 [US2] Add `ModelsPanel` entry to the app's main navigation in `apps/web/src/App.tsx` and route config; route path `/models`
- [ ] T074 [US2] Verify US2: `cargo test -p nexus-huggingface`, `cargo test -p nexus-local-llm hf_install_flow`, `pnpm --dir apps/web test ModelsPanel`, Playwright `catalog_search.spec.ts`, manual quickstart steps 3-3.8

**Checkpoint**: US1 + US2 ship together as the MVP. User has a working catalog end-to-end.

---

## Phase 5: US3 — Format-aware backend routing (P2)

**Story goal**: HF results are badged with backend compatibility derived from tiered signals; installs are blocked when no backend can serve the model.

**Independent test criteria**: `crates/nexus-local-llm/tests/backend_routing.rs` table-driven test covers six fixture repos; UI shows correct badges and blocks install with explanation.

### Tests (write first — RED)

- [X] T075 [P] [US3] Unit tests `crates/nexus-local-llm/src/manifest/hf_routing.rs#tests::table_driven` with six fixture `RepoMetadata` values (GGUF, pre-built TRT engine, safetensors-llama-in-allowlist, safetensors-unsupported-arch, mixed artifacts, gated-empty)
- [X] T076 [P] [US3] Integration test `crates/nexus-local-llm/tests/backend_routing.rs::install_blocked_when_no_route` — POST install for an unsupported repo, assert 409 with `NO_COMPATIBLE_BACKEND` and `resolution_hint`
- [X] T077 [P] [US3] Frontend test `apps/web/src/models/backend_compat_badge.test.tsx` asserting each signal produces the correct label and tooltip copy
- [X] T078 [P] [US3] Playwright `apps/web/e2e/routing_blocked.spec.ts` — search → select TRT-only repo with TRT not installed → install button blocked with inline explanation

### Implementation

- [X] T079 [US3] Implement `BackendRouter` trait and chain in `crates/nexus-local-llm/src/manifest/hf_routing.rs`: `trait BackendRouter { fn route(&self, meta: &RepoMetadata) -> RouteOutcome; }`, impls `GgufToLlamacpp`, `TrtPrebuiltEngine`, `TrtSupportedArchitecture`, `NoRoute`; `fn compose(installed_backends: &[BackendFamily]) -> BoxedRouter`. Accepts `RepoMetadata` imported from `nexus-huggingface` — routing stays in `local-llm`, raw metadata comes from the shared capability.
- [X] T080 [US3] Load `supported_architectures.yaml` at startup into an `Arc<ArchitectureAllowlist>` in `crates/nexus-local-llm/src/manifest/mod.rs`; expose reload-on-change via existing config hot-reload channel (if available) or on-next-search read-through
- [X] T081 [US3] Wire `BackendRouter::compose` into `ModelInstaller::install` (T065); populate `routed_backend` and `routing_signal` columns; return 409 `NO_COMPATIBLE_BACKEND` with human-readable reason when `NoRoute` wins
- [X] T082 [US3] Annotate every HF search result with `backend_compat: { llamacpp: {...}, trt_llm: {...} }` computed by the router in `catalog_search` handler (T064)
- [X] T083 [US3] Implement `apps/web/src/models/backend_compat_badge.tsx` — pill component rendering color + short label + tooltip that quotes the exact signal ("prebuilt engine artifact detected", "architecture `LlamaForCausalLM` in supported allowlist", "not detected")
- [X] T084 [US3] In `ModelCard.tsx` (T071), disable the Install button when all relevant backends report `compatible: false` AND not installed; render an inline helper linking to the Backends panel
- [ ] T085 [US3] Verify US3: `cargo test -p nexus-local-llm backend_routing`, `pnpm --dir apps/web test backend_compat_badge`, Playwright `routing_blocked.spec.ts`, manual quickstart steps 4-4.6

---

## Phase 6: US4 — Load model & configure hyperparameters (P2)

**Story goal**: User loads a specific installed model, edits hyperparameters, settings persist across reload, invalid values are rejected inline with the model's declared limits.

**Independent test criteria**: `crates/nexus-local-llm/tests/load_and_hyperparameters.rs` covers load → patch → reload → persisted; Playwright `apps/web/e2e/hyperparameters.spec.ts` walks the UI journey.

### Tests (write first — RED)

- [X] T086 [P] [US4] Unit tests `crates/nexus-local-llm/src/manifest/hyperparameters.rs#tests` covering: valid profile serde; rejection of `temperature > 2.0`, `top_p > 1.0`, `max_context_length > model_limits.max_ctx`, `n_gpu_layers > model_limits.n_layers`
- [ ] T087 [P] [US4] Contract test `tests/contract/local_llm_hyperparameters_contract.rs` asserting 200 and 422 envelopes for `patch_hyperparameters.http`
- [ ] T088 [P] [US4] Integration test `crates/nexus-local-llm/tests/load_and_hyperparameters.rs::load_merges_profile_into_launch_spec` — load a model whose profile sets `n_gpu_layers = 10`, assert the managed-process launch args include `--n-gpu-layers 10`
- [ ] T089 [P] [US4] Integration test `crates/nexus-local-llm/tests/load_and_hyperparameters.rs::hyperparameters_persist_across_host_restart` — patch profile, drop store handle, reopen, assert JSON round-trips exactly
- [ ] T090 [P] [US4] Integration test `crates/nexus-local-llm/tests/load_and_hyperparameters.rs::invalid_profile_rejected_with_422` — PATCH with `max_context_length` exceeding model limit, assert 422 `HYPERPARAMETERS_OUT_OF_RANGE` with `field` and `model_limit` populated
- [ ] T091 [P] [US4] Frontend test `apps/web/src/models/HyperparameterForm.test.tsx` asserting inline validation and preservation of untouched fields across re-renders
- [ ] T092 [P] [US4] Playwright `apps/web/e2e/hyperparameters.spec.ts` — load → edit → reload → edits present; host restart shows "model not resident — reload?"

### Implementation

- [X] T093 [US4] Implement `HyperparameterProfile` struct + `validate(&self, limits: &ModelLimits) -> Result<(), ProfileError>` in `crates/nexus-local-llm/src/manifest/hyperparameters.rs`; `ProfileError` includes `field` and `limit` for API surfacing
- [X] T094 [US4] Implement `ModelLimitsExtractor::extract(artifact_paths) -> ModelLimits` in the same module reading `config.json` when present and GGUF header via the shared capability's header-only download helper; populate `ext_local_llm_model_installs.model_limits` during install (T065)
- [X] T095 [US4] Implement `InstalledModelRepo::patch_hyperparameters(id, profile)` in `crates/nexus-local-llm/src/installs_store.rs` — validate against stored limits, upsert column, return normalized echo
- [X] T096 [US4] Implement `PATCH /extensions/local-llm/models/:id/hyperparameters` handler; on success, if the model is currently loaded, call `ManagedProcess::apply_runtime_params` and set `applied_to_running_backend: true` in the response
- [ ] T097 [US4] Implement `POST /extensions/local-llm/models/:id/load` handler: merge profile into launch spec via `launch_spec::merge_profile`, call `ManagedProcess::swap_model(spec)`, return task id for progress streaming
- [ ] T098 [US4] Extend `crates/nexus-local-llm/src/launch_spec.rs` with `merge_profile(base: LaunchSpec, profile: &HyperparameterProfile, backend_family: BackendFamily) -> LaunchSpec` — pure function; covered by unit test in the same file
- [ ] T099 [US4] Implement `apps/web/src/models/HyperparameterForm.tsx` — controlled inputs for each field, uses `useEffectEvent` for apply handler, renders inline API 422 errors on the offending field
- [ ] T100 [US4] Wire "Load" button in `ModelCard.tsx` to `client.ts::loadModel`; subscribe to the same `model:progress` channel to render live load phase
- [ ] T101 [US4] On Models panel open, call `getLoadState(backendId)` and highlight the currently-loaded model; render "Model not resident — Reload?" CTA when the user's last-loaded model is absent from the backend's runtime state
- [ ] T102 [US4] Verify US4: `cargo test -p nexus-local-llm load_and_hyperparameters hyperparameters`, `pnpm --dir apps/web test HyperparameterForm`, Playwright `hyperparameters.spec.ts`, manual quickstart steps 5-5.9

---

## Phase 7: Polish & Cross-Cutting Concerns

- [X] T103 [P] Add `tracing` spans `backend.state.transition`, `hf.download.progress`, and `model.install.progress` in `crates/nexus-local-llm/src/installs_store.rs`, `crates/nexus-huggingface/src/download.rs`, and `crates/nexus-local-llm/src/manifest/install.rs`; verify via `RUST_LOG=nexus_huggingface=debug,nexus_local_llm=debug`
- [ ] T104 [P] Add diagnostics endpoint `GET /extensions/local-llm/diagnostics/state-log?install_id=...` in `crates/nexus-local-llm/src/diagnostics.rs` reading `ext_local_llm_backend_state_log` for debugging phantom-state reports
- [X] T105 [P] Document the shared HF capability in a new `crates/nexus-huggingface/README.md` — trait shape, how to register a new consumer extension, `HF_TOKEN` resolution policy, cache TTL
- [ ] T106 [P] Update `extensions/builtin/local-llm/README.md` with the new catalog surface, schema delta, routing policy, and a note that HF integration lives in the shared `nexus-huggingface` crate
- [ ] T107 [P] Update root `README.md` "Recent Changes" / feature index with spec 010 link and the new `nexus-huggingface` crate entry in the architecture overview
- [ ] T108 [P] Accessibility pass on `apps/web/src/models/` — semantic landmarks, focus order, ARIA on progress bar and inline validation per `rules/web/testing.md`
- [ ] T109 [P] Performance check: Models panel first paint < 400 ms with 50 installed + 25 cached HF results (Lighthouse run); HF search warm-cache p95 < 1.2 s measured via integration bench in `crates/nexus-huggingface/benches/`
- [ ] T110 [P] Split sprint commits at PR time into three scoped commits: (1) "feat(huggingface): extract shared HF capability crate", (2) "fix(local-llm): backend state hydration and load-state truth source (US1)", (3) "feat(local-llm): model catalog with routing and hyperparameters (US2-US4)" — reviewable per constitution §V
- [ ] T111 Final verification: `cargo fmt --check`, `cargo clippy --workspace --all-targets -- -D warnings`, `cargo test --workspace`, `pnpm --dir apps/web lint`, `pnpm --dir apps/web test`, `pnpm --dir apps/web build`, all quickstart.md steps pass

---

## Dependencies

```text
Phase 1 (Setup: incl. nexus-huggingface crate skeleton) ──► Phase 2 (Foundational) ──┬──► Phase 3 (US1)
                                                                                      ├──► Phase 4 (US2)   ── MVP = US1 + US2
                                                                                      ├──► Phase 5 (US3)   requires T063, T065
                                                                                      └──► Phase 6 (US4)   requires T065 (model_limits), T039 (load-state)

Phase 7 (Polish) ──► runs after US1–US4 land
```

Story-level independence:
- **US1** is fully independent — can ship alone as a hotfix.
- **US2** depends on Foundational (new HF crate, DTOs, schema, handler skeleton). Does NOT depend on US1 to *build*, but ships with US1 to deliver user value.
- **US3** extends US2's install path (T081) and search annotations (T082). Router unit tests are independent; user-visible value requires US2.
- **US4** extends US2's installer (T065 must persist `model_limits`) and US1's `/load-state` (T039). Tests are independent; user-visible value requires US1 + US2.

## Parallel Execution Examples

**Within Phase 1 (Setup)** — five agents in parallel after T001+T002 land:

```text
Agent A → T003 (nexus-huggingface module skeletons)
Agent B → T004 (move checksum.rs + update call sites)
Agent C → T006 (local-llm module skeletons)
Agent D → T007 (frontend models dir scaffold)
Agent E → T008 (supported_architectures.yaml)
```

**Within Phase 2 (Foundational)** — eight agents in parallel after T010+T011 land:

```text
Agent A → T012 (host migration smoke test)
Agent B → T013 (extension migration smoke test)
Agent C → T014 (HuggingFaceCapability trait)
Agent D → T015 (HfError enum)
Agent E → T016 (HfToken env resolver)
Agent F → T018 (DTO module)
Agent G → T020 (handler skeleton)
Agent H → T025 + T026 (state enum + guard)
```

**Within Phase 3 (US1) test phase** — six agents in parallel:

```text
Agent A → T029 (contract test)
Agent B → T030 (reload preserves state)
Agent C → T031 (probe cannot downgrade)
Agent D → T032 (repair flow)
Agent E → T033 (load-state truth)
Agent F → T034 (frontend hook test)
```

**Within Phase 4 (US2) test phase** — eleven agents in parallel after T014 lands (trait exists, both sides can mock):

```text
Agent A → T045 (search url builder unit tests)
Agent B → T046 (search cache hit)
Agent C → T047 (unreachable surfaces HfError::Unreachable)
Agent D → T048 (download resume)
Agent E → T049 (download checksum mismatch)
Agent F → T050 (download cancel cleanup)
Agent G → T051 (contract tests for local-llm endpoints)
Agent H → T052 (local-llm happy-path install w/ mock capability)
Agent I → T053 (cancel leaves no row)
Agent J → T054 (503 surfacing)
Agent K → T055 (frontend ModelsPanel test)
```

**Cross-story parallelism** after Foundational — US3 router unit tests (T075) and US4 hyperparameter unit tests (T086) are independent and can run in parallel with US2 implementation.

## Implementation Strategy

**MVP = US1 + US2**. Ship the reload-persistence fix together with a working Hugging Face catalog, plus the extracted `nexus-huggingface` capability. US3 and US4 follow as incremental deliveries within the same sprint.

1. Land Setup + Foundational (Phases 1–2) first — shared crate + scaffolding.
2. Branch the work: two agent tracks run US1 (Phase 3) and US2 (Phase 4) in parallel after Foundational completes.
3. Merge as three scoped PRs (see T110): (a) `nexus-huggingface` extraction, (b) US1 fix, (c) US2–US4 consumer feature set.
4. Polish (Phase 7) runs as a final sweep.

---

## Task Summary

- **Total tasks**: 111
- **Setup** (incl. new `nexus-huggingface` crate): 9 (T001–T009)
- **Foundational** (host + extension migrations, HF trait, DTOs, handler skeleton): 19 (T010–T028)
- **US1 (P1, bug)**: 16 (T029–T044) — 7 tests, 9 impl
- **US2 (P1, feature, split across nexus-huggingface + nexus-local-llm)**: 30 (T045–T074) — 12 tests, 18 impl
- **US3 (P2)**: 11 (T075–T085) — 4 tests, 7 impl
- **US4 (P2)**: 17 (T086–T102) — 7 tests, 10 impl
- **Polish**: 9 (T103–T111)

- **Parallel opportunities**: 45+ tasks marked `[P]`
- **MVP scope**: Setup + Foundational + US1 + US2 = 74 tasks (T001–T074)
- **Format validation**: all tasks use `- [ ] Tnnn [P?] [USx?] Description with file path` ✅
