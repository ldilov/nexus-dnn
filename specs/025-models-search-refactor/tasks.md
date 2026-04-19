---
description: "Task list for 025-models-search-refactor"
---

# Tasks: Models Search Refactor — Universal Model Catalog

**Input**: Design documents from `/specs/025-models-search-refactor/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Test tasks are included per Principle VI; the design-heavy-UI carve-out applies only to `apps/web/src/views/models-search/components/*` and `.ui.tsx` (see plan.md § Test Strategy).

**Organization**: Tasks are grouped by user story (US1–US7) to enable independent implementation, testing, and release-order decisions.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (US1..US7). Setup/Foundational/Polish phases carry no story label.
- File paths are absolute to repo root.

## Path Conventions

- Rust: `crates/nexus-models-store/`, `crates/nexus-huggingface/`, `crates/nexus-api/`, `crates/nexus-storage/`
- Web: `apps/web/src/`
- Tests: `tests/contract/`, `tests/integration/`, `tests/unit/`

---

## Phase 1: Setup (shared infrastructure)

**Purpose**: Scaffolding that is not yet user-story-specific.

- [X] T001 Create module skeletons in `crates/nexus-models-store/src/normalize/mod.rs`, `crates/nexus-models-store/src/capabilities/mod.rs`, `crates/nexus-models-store/src/downloads/mod.rs` — each with a module docstring and empty `pub mod` stubs.
- [X] T002 Create handler module skeleton in `crates/nexus-api/src/handlers/model_store/mod.rs` with `pub mod backends; pub mod search; pub mod detail; pub mod downloads;` stubs (empty handlers returning 501).
- [X] T003 [P] Create `crates/nexus-api/src/dto/model_store.rs` with empty `//!` docstring and empty struct placeholders (filled in Foundational).
- [X] T004 [P] Add the `model-store` route nesting in `crates/nexus-api/src/router.rs` wired to the empty handlers (confirms the route tree compiles).
- [X] T005 [P] Add `apps/web/src/services/model_store.ts` stub (type exports only; no fetch calls yet).
- [X] T006 [P] Create `apps/web/src/views/models-search/` with `index.ts`, `models_search.view.tsx`, `models_search.ui.tsx`, `models_search.css.ts` empty placeholders; wire `lazy: () => import("./views/models-search")` in `apps/web/src/routes.tsx` under `path: "models-search"`.
- [ ] T007 Add scope-diff CI script `specs/025-models-search-refactor/scripts/scope_check.sh` per `contracts/frontend-loader.md §9`.

**Checkpoint**: `cargo check --workspace` + `pnpm tsc --noEmit` both pass; navigating to `/models-search` renders an empty screen.

---

## Phase 2: Foundational (blocking prerequisites for every user story)

**Purpose**: The shared spine — migration, DTOs, newtypes, enum attributes, fixture corpus. Every subsequent story depends on these.

- [X] T010 Create migration `crates/nexus-storage/migrations/013_model_store_download_jobs.sql` per `research.md R6` (tables `download_jobs` + `download_job_artifacts`; indexes on `state`; idempotent).
- [X] T011 Add newtype wrappers in `crates/nexus-models-store/src/ids.rs`: `FamilyId`, `ArtifactId`, `VariantId`, `BackendId`, `JobId`. Implement `From<String>`, `Display`, `serde` derives, and private constructor discipline per `data-model.md §2`.
- [X] T012 [P] Define public enums with `#[non_exhaustive]` in `crates/nexus-models-store/src/types.rs`: `Format`, `Precision`, `PrecisionSource`, `Modality`, `DependencyRole`, `Requirement`, `CompatibilityStatus`, `DownloadState`. All with `serde(rename_all = "snake_case")`.
- [X] T013 [P] Define domain structs in `crates/nexus-models-store/src/model.rs`: `ModelRepository`, `ModelFamily`, `Artifact`, `Variant`, `Dependency` per `data-model.md §1`.
- [X] T014 [P] Define DTOs in `crates/nexus-api/src/dto/model_store.rs` mirroring the internal domain structs plus the REST envelope wrapper (`SearchPageDto`, `BackendsListDto`, `DownloadJobDto`, `DownloadJobTargetDto`, etc.) per `contracts/rest-model-store.md`.
- [ ] T015 [P] Define `ModelStoreError` in `crates/nexus-models-store/src/errors.rs` using `thiserror` per `contracts/rust-backend-adapter.md §4`; add axum `IntoResponse` mapping in `crates/nexus-api/src/handlers/model_store/error_map.rs`.
- [X] T016 [P] Assemble the 50-repo normalizer fixture corpus under `crates/nexus-models-store/tests/fixtures/hf/` — one JSON snapshot per HF repo response covering GGUF / safetensors / bin / pth / mixed / dependency-bearing / unsupported. Add a fixture README listing per-repo expected normalized output.
- [X] T017 Create the capability registry scaffold in `crates/nexus-models-store/src/capabilities/mod.rs`: `BackendAdapter` sealed trait, `CapabilityRegistry` with `register`/`list`/`supporting_format`/`is_runnable`, per `contracts/rust-backend-adapter.md §§1–2`. Do not yet register any real adapter.

**Checkpoint**: All crates still `cargo check --workspace` green; migration applies cleanly to a fresh DB; fixture loader can deserialize all 50 snapshots without error.

---

## Phase 3 — User Story 1: Selectable GGUF quantizations (P1) 🎯 MVP

**Story goal**: A user searches for a Llama-family GGUF repo, picks `Q5_K_M`, clicks download, and the system downloads exactly that file while keeping the card's state accurate across reloads.

**Independent test criterion**: Query `llama-3`, expand a GGUF card's variant list, click download on `Q5_K_M`, and verify via `GET /model-store/downloads/:job_id` that the job's single target is the `Q5_K_M` file and nothing else. After completion the variant row renders as installed and re-clicking is idempotent.

### Tests (T-prefix from contracts)

- [X] T020 [P] [US1] Write unit tests in `crates/nexus-models-store/tests/normalize_classify.rs` covering format classification for `.gguf`, `.ggml`, `.safetensors`, `.bin`, `.pth`, `.json`, `.md`, and unknown extensions (FR-010–FR-014).
- [X] T021 [P] [US1] Write unit tests in `crates/nexus-models-store/tests/normalize_variants.rs` covering the full GGUF quantization set from `research.md R2` plus unknown quant tokens and `-00001-of-00003` split filenames.
- [X] T022 [P] [US1] Write unit tests in `crates/nexus-models-store/tests/download_orchestrator.rs` — 2-slot semaphore limit, FIFO ordering for a third queued job, duplicate-job prevention (FR-085), RAII `DownloadSlot` releases permit on drop.
- [X] T023 [P] [US1] Write contract tests T-S1, T-S2, T-S6, T-S8 in `crates/nexus-api/tests/contract_model_store_search.rs`.
- [X] T024 [P] [US1] Write contract tests T-J1, T-J3, T-J4, T-J7 in `crates/nexus-api/tests/contract_model_store_downloads.rs`.
- [X] T025 [P] [US1] Write contract test T-B1 in `crates/nexus-api/tests/contract_model_store_backends.rs`.

### Implementation — host

- [X] T026 [US1] Implement `classify_format(filename: &str, hf_metadata: &FileMeta) -> Format` in `crates/nexus-models-store/src/normalize/classify.rs` (metadata-first, filename-fallback per FR-004).
- [X] T027 [US1] Implement `detect_variants(artifacts: &[Artifact]) -> Vec<Variant>` in `crates/nexus-models-store/src/normalize/variants.rs` — extract GGUF quant token from filenames, apply R4 default-flag heuristic.
- [X] T028 [US1] Implement `LlamaCppAdapter` in `crates/nexus-models-store/src/capabilities/llamacpp.rs` advertising `supported_formats = [Gguf, Ggml]`, `supports_quantized_variants = true`, `status = Enabled`. Register in the host-assembly point (single named location per Principle III).
- [X] T029 [US1] Implement `classify_compat(family, registry) -> CompatibilityStatus` in `crates/nexus-models-store/src/normalize/compat.rs` per `research.md R9`. Visibility `pub(crate)` — only callable from normalize.
- [ ] T030 [US1] Expose `search_with_files(query, token) -> SearchPage<RepoWithFiles>` in `crates/nexus-huggingface/src/search.rs` using `full=true` (additive; legacy `search` signature untouched per R1).
- [X] T031 [US1] Implement `GET /api/v1/model-store/search` handler in `crates/nexus-api/src/handlers/model_store/search.rs`: calls `search_with_files`, runs `normalize::normalize_family` over each result, applies format/backend/compat filters, returns `SearchPageDto`.
- [X] T032 [US1] Implement `GET /api/v1/model-store/backends` handler in `crates/nexus-api/src/handlers/model_store/backends.rs` reading from the injected `Arc<CapabilityRegistry>`.
- [X] T033 [US1] Implement `JobStore` in `crates/nexus-models-store/src/downloads/store.rs` backing the `download_jobs`/`download_job_artifacts` tables (create / lookup-by-id / list-non-terminal / update-state / update-progress). Builder pattern for `CreateJobParams`.
- [X] T034 [US1] Implement `DownloadOrchestrator` in `crates/nexus-models-store/src/downloads/orchestrator.rs` with `tokio::sync::Semaphore::new(MAX_CONCURRENT_DOWNLOADS)`, FIFO `VecDeque<JobId>`, RAII `DownloadSlot`, and a `tokio::spawn` worker per slot. Emit progress events through the existing `nexus-events` bus. **Unit test (A4 remediation)**: cover the disk-full path — simulate `io::ErrorKind::StorageFull` in the write loop, assert job transitions to `DownloadState::Failed` with a non-empty `error_reason`, assert the permit is released (next queued job can acquire it), and assert no orphan partial file lingers beyond the job's `downloaded_bytes` record.
- [X] T035 [US1] Implement `POST /api/v1/model-store/downloads` handler in `crates/nexus-api/src/handlers/model_store/downloads.rs` — duplicate-check, create job via `JobStore`, enqueue in orchestrator, return 202. Map 409 duplicates per T-J3 contract. **Request validation (I1 fix)**: reject any request where `include_dependencies = true` and `target.kind != bundle` with 422 `{"error":{"code":"invalid_request","message":"include_dependencies only valid with kind=bundle"}}`; reject `include_dependencies = false` with `kind = bundle` the same way. Add a contract-test case to T024 covering both failure directions.
- [X] T036 [US1] Implement `GET /api/v1/model-store/downloads/:job_id` handler returning `DownloadJobDto`. 404 on unknown.

### Implementation — web

- [X] T037 [P] [US1] Implement `services/model_store.ts`: `fetchBackends`, `fetchSearch`, `createDownload`, `fetchDownloadStatus`. Throws `Response` on 4xx/5xx per Principle XII.4. Types re-exported from `api/generated/` once backend DTOs exist.
- [X] T038 [US1] Implement loader + action + `Component` export in `apps/web/src/views/models-search/index.ts` per `contracts/frontend-loader.md §§2–3`.
- [X] T039 [US1] Implement `models_search.view.tsx` (smart) per `contracts/frontend-loader.md §5` — consumes `useLoaderData`, manages filter/sort/page URL via `useSubmit`, calls `useFetcher` for downloads, subscribes `useJobProgress` SWR hook for in-flight jobs.
- [X] T040 [US1] Implement `models_search.ui.tsx` (presentational root) + `models_search.css.ts` (vanilla-extract) — renders `<FilterBar/>`, `<SortMenu/>`, `<ResultGrid/>`, `<Paginator/>`.
- [X] T041 [P] [US1] Implement `components/ModelCard.tsx` — composable sections (header, compat badge, artifact summary, variant list slot, dependency strip slot, actions) per FR-094/095.
- [X] T042 [P] [US1] Implement `components/VariantList.tsx` — inline scrollable rows per FR-020/022, default-variant highlight, installed/downloading/failed per-row state, keyboard-navigable (FR-097).
- [X] T043 [P] [US1] Implement `components/CompatibilityBadge.tsx` — non-color-only per NFR-007 (icon shape + label + color).
- [X] T044 [US1] Write smart-container unit test in `apps/web/src/views/models-search/models_search.view.test.tsx`: URL → loader args → render → click variant download → correct `POST /downloads` call observed via `msw`.
- [X] T045 [P] [US1] Implement loading / empty / error view components (FR-091 coverage): `apps/web/src/views/models-search/components/SkeletonGrid.tsx` (grid shimmer respecting `prefers-reduced-motion`), `EmptyState.tsx` (no-results copy + "clear filters" affordance), `ErrorState.tsx` (renders the `Response` surfaced by the loader — 502 upstream → retry button; 503 degraded → banner; generic → error code). Wire `ErrorState` as the route's `errorElement` in `routes.tsx`; skeleton via `useNavigation().state === "loading"`.

**Checkpoint US1**: Playwright smoke runs `?q=llama&format=gguf`, downloads `Q5_K_M`, refreshes, confirms URL and job state persist. All contract tests for search + downloads + backends pass. MVP slice shippable.

---

## Phase 4 — User Story 2: Backend-aware compatibility filtering (P1)

**Story goal**: The backend filter is populated dynamically from `GET /model-store/backends`; selecting `llama.cpp` restricts results to GGUF/GGML. A second backend registered for tests expands the filter with no page-code edits.

**Independent test criterion**: Toggle the backend filter on a fixture page — only GGUF/GGML families visible. Stub a second adapter in a test-only `CapabilityRegistry`; filter list grows to two entries without any change to `models_search.view.tsx`.

- [X] T050 [P] [US2] Contract test T-B2 in `crates/nexus-api/tests/contract_model_store_backends.rs` — registering a second test-only adapter makes `/backends` return two entries (SC-004).
- [X] T051 [P] [US2] Contract test T-B3 for `status = experimental` reflection.
- [X] T052 [US2] Implement `FilterBar.tsx` backend section in `apps/web/src/views/models-search/components/FilterBar.tsx` — renders entries from loader's `backends` array; `experimental` suffix badge; keyboard-accessible; emits URL mutation via `useSubmit`.
- [X] T053 [US2] Wire `backend` URL param into the search handler's filter pipeline (`crates/nexus-api/src/handlers/model_store/search.rs`): intersect advertised formats with the requested backend's `supported_formats` before compat classification.
- [X] T054 [US2] Add degraded-registry handling: `/model-store/search` sets `X-ModelStore-Degraded: backend_registry` header when `CapabilityRegistry::list()` is empty; UI shows a top-banner notice per FR-054.
- [X] T055 [US2] Integration test in `crates/nexus-models-store/tests/capabilities_second_backend.rs` — add a `FakeDiffusersAdapter` supporting `Safetensors`; verify `is_runnable` flips for an SDXL fixture family.

**Checkpoint US2**: SC-003 passes (zero hardcoded `llama.cpp` / `gguf` strings in `/model-store/search` handler's filter pipeline — grep-verified). SC-004 passes mechanically.

---

## Phase 5 — User Story 3: Multi-format discovery beyond GGUF (P1)

**Story goal**: SDXL-class repositories render with safetensors primary + required VAE dependency + `downloadable_but_not_runnable` compat. Bundle download creates a job whose targets include primary + VAE.

**Independent test criterion**: Load the SDXL fixture via `/models/:family_id`, verify `dependencies[0].role == "vae"` and `requirement == "required"`. POST `/downloads` with `kind=bundle` → response `targets` contains primary + VAE.

- [X] T060 [P] [US3] Contract test T-D1 (full family detail with artifacts/variants/deps/compat).
- [X] T061 [P] [US3] Contract test T-D2 (404 for unknown family).
- [X] T062 [P] [US3] Contract test T-D3 (SDXL fixture — VAE dep present).
- [X] T063 [P] [US3] Contract test T-J2 (`kind=bundle` job resolves primary + required deps).
- [X] T064 [US3] Implement `resolve_dependencies(raw: &RepoWithFiles) -> Vec<Dependency>` in `crates/nexus-models-store/src/normalize/deps.rs` — recognize `vae.safetensors`, `text_encoder`, `tokenizer`, `scheduler_config.json`, etc.; `#[non_exhaustive] DependencyRole`. **Unit test (A3 remediation for FR-044 extensibility)**: assert serde round-trip for every known `DependencyRole` variant, and that an unknown role string deserializes to `DependencyRole::Other` without failure — proving the `#[non_exhaustive]` + `#[serde(other)]` extensibility contract mechanically.
- [X] T065 [US3] Implement `GET /api/v1/model-store/models/:family_id` handler in `crates/nexus-api/src/handlers/model_store/detail.rs` — calls `hf::repo_detail`, runs full normalization, returns `ModelFamilyDto`.
- [X] T066 [US3] Extend `POST /model-store/downloads` handler to resolve `kind=bundle` into primary + every `Dependency{requirement: Required}` target (validation rule from `data-model.md §5`).
- [X] T067 [P] [US3] Implement `components/DependencyStrip.tsx` — renders dependency markers (`VAE required`, `Tokenizer bundled`) with non-color-only state.
- [X] T068 [US3] Card action set switch in `ModelCard.tsx`: dependency-bearing families show `Primary` + `Bundle` actions (Clarify Q1 decision); no presets, no advanced picker.
- [X] T069 [US3] Integration test `crates/nexus-models-store/tests/normalize_fixtures.rs` — 50-repo sweep, asserts zero panics, ≥ 95% primary-format correctness (SC-002, SC-009).

**Checkpoint US3**: Three P1 stories complete; spec's "universal store" core is shippable.

---

## Phase 6 — User Story 4: Precision transparency (P2)

**Story goal**: Safetensors without explicit precision render as `fp16 · assumed`; explicit metadata renders as a plain value; truly unknown reads `precision unspecified`.

**Independent test criterion**: Fixture sweep — three synthetic safetensors repos (explicit metadata / inferred from filename / fully unknown) produce three distinct `precisionSource` values and three distinct card labels.

- [X] T070 [P] [US4] Unit tests `crates/nexus-models-store/tests/normalize_precision.rs` — explicit (safetensors metadata), inferred (filename token `-fp16`, `-bf16`, `-int8`), unknown fallback per `research.md R3`.
- [X] T071 [US4] Implement `infer_precision(artifact, hf_safetensors_meta) -> (Precision, PrecisionSource)` in `crates/nexus-models-store/src/normalize/precision.rs`.
- [X] T072 [US4] Render precision in `components/ModelCard.tsx` artifact summary — apply `fp16 · assumed` suffix styling via vanilla-extract when `precision_source == "inferred"`; `precision unspecified` when `unknown`.

**Checkpoint US4**: Visual regression screenshot shows three distinct treatments.

---

## Phase 7 — User Story 5: Download lifecycle and progress (P2)

**Story goal**: All seven download states are surfaced, progress is tracked per artifact, refresh re-hydrates, duplicates are idempotent, failures retry.

**Independent test criterion**: Start a download, refresh mid-transfer, confirm state + progress are restored from `/downloads/:job_id`, not reset. Force a failure (unplug network fixture), verify `state=failed` and a retry affordance.

- [X] T080 [P] [US5] Contract test T-J7 in `crates/nexus-api/tests/contract_model_store_downloads.rs` — progress monotonic non-decreasing across successive polls (SC-007).
- [X] T081 [P] [US5] Contract test T-J8 — after host restart, in-flight `downloading` jobs re-hydrate to `paused` or `queued`.
- [X] T082 [US5] Implement resumable-download path in `crates/nexus-models-store/src/downloads/orchestrator.rs`: HTTP `Range: bytes=<downloaded_bytes>-` when `expected_bytes` known; update `download_job_artifacts.downloaded_bytes` incrementally.
- [X] T083 [US5] Implement state-rehydration on host startup in `crates/nexus-models-store/src/downloads/recover.rs` — every `downloading` row transitions to `paused` and is re-enqueued when its family is next requested.
- [X] T084 [US5] Implement `useJobProgress` SWR hook in `apps/web/src/views/models-search/hooks/use_job_progress.ts` — polls at 1 s for non-terminal states, stops on terminal.
- [X] T085 [US5] Implement retry affordance in `ModelCard.tsx` / `VariantList.tsx` for `failed` rows — posts `intent=download` again; backend dedupes via T-J3.
- [X] T086 [US5] Implement pause/resume actions in the action handler + orchestrator (already captured by state machine; wire UI buttons).

### Auth pipeline (C1 remediation — FR-110 through FR-114)

- [X] T087 [US5] Wire the optional HF token (reused from `nexus-huggingface::token`) into `GET /api/v1/model-store/search`, `GET /api/v1/model-store/models/:family_id`, and the download orchestrator's HTTP client in `crates/nexus-models-store/src/downloads/orchestrator.rs`. Map upstream `401`/`403` responses to `DownloadState::AuthRequired` for download jobs, and to a dedicated search-result warning (per-family `compat=unknown` + `warnings: ["auth_required"]`) for search. Add contract tests **T-J5** (no-token gated POST → `auth_required`) and **T-J6** (token set → retry succeeds, no duplicate lock) in `crates/nexus-api/tests/contract_model_store_downloads.rs`.
- [X] T088 [US5] Implement the token-change invalidation hook in `crates/nexus-models-store/src/downloads/auth.rs` (FR-114): subscribe to the existing settings-change event for `huggingface.access_token`; on value change, scan `download_jobs` for `state = auth_required` and transition them to `queued` (re-enqueued through the orchestrator). Add a unit test asserting the re-queue path and idempotency on no-op token edits.
- [X] T089 [US5] UI treatment for `auth_required` (FR-113). In `apps/web/src/views/models-search/components/ModelCard.tsx` + `VariantList.tsx`, render an `auth_required` per-artifact and per-job state as a distinct non-color-only affordance: icon + text label "Access gated — HF token required". **No Settings deep link** (scope check 2026-04-19: no `/settings` route exists in `apps/web/src/routes.tsx`); clicking the affordance triggers a `sonner` toast with instructions for configuring `huggingface.access_token` via the host CLI / config file. MUST NOT display the token value anywhere (not in DOM, not in logs, not in URLs). Add a loader-data surface so the affordance also covers search-result families carrying `warnings: ["auth_required"]`.

### Install-mapping persistence (C4 remediation — FR-086)

- [X] T097 [US5] On `DownloadState::Downloaded` terminal transition, persist a reverse mapping `artifact_id → { family_id, variant_id, format, source_provider, source_repo, source_revision }` into the existing `nexus-models-store::install` tables (extend the row written by the install step; no new migration required — repurpose existing `source_*` columns already on `host_models`). Add a unit test that reads the row back for both a primary-only download and a bundle download, asserting both a safetensors+VAE job's rows are independently resolvable.

**Checkpoint US5**: Full lifecycle Playwright journey passes (SC-007, NFR-005). Auth-required path is exercised by T-J5/T-J6 contract tests and the Playwright `auth_required` spec. Reverse mapping from installed artifact → upstream identity is persisted and round-trippable.

---

## Phase 8 — User Story 6: Filters, sort, and URL-persisted state (P2)

**Story goal**: Every meaningful UI state is encoded in the URL; opening a captured URL in a fresh tab restores the identical view.

**Independent test criterion**: Compose query + filters + sort + view + `showUnsupported` + `page` + `pageSize`; copy URL; open in a fresh tab; assert identical rendered state (SC-008).

- [X] T090 [P] [US6] Unit tests in `apps/web/src/services/model_store.test.ts` — `parseSearchParams` / `serializeSearchParams` round-trip invariant; clearing a filter removes its URL key (FR-093 AS #3).
- [X] T091 [P] [US6] Contract test T-S5 — numbered-pages: `?page=2&page_size=30` returns disjoint families from page 1.
- [X] T092 [US6] Implement the full `FilterBar.tsx`: format chips (FR-010), modality dropdown (FR-070), license chips, compat multi-select, install-state toggle, `Show unsupported` toggle (Clarify Q2), all wired through `useSubmit`.
- [X] T093 [US6] Implement `SortMenu.tsx` with the five FR-072 sort options + optional secondaries (smallest size / compatible-first) behind a feature flag.
- [X] T094 [US6] Implement `Paginator.tsx` — numbered-page control, `pageSize` selector (10 / 30 / 50), disabled prev/next at boundaries.
- [X] T095 [US6] Implement grid/list view toggle in `models_search.view.tsx` + branching markup in `ResultGrid.tsx`.
- [ ] T096 [US6] Add HF cursor translation in search handler (research.md R5) — `page`+`pageSize` → cursor walk, 60 s in-memory cache keyed by `(query, filters, sort)`.

**Checkpoint US6**: SC-008 Playwright round-trip passes across 10 random filter combinations.

---

## Phase 9 — User Story 7: Safe handling of unsupported repositories (P3)

**Story goal**: Ambiguous repos render safely; they never crash the grid; their action set degrades to "View details" only.

**Independent test criterion**: Add three malformed / ambiguous fixtures to the corpus; verify `compat == "unsupported" | "unknown"`; card renders with disabled download button.

- [X] T100 [P] [US7] Contract test T-S7 — malformed HF payload does not 5xx.
- [X] T101 [P] [US7] Contract test T-S3/T-S4 — `show_unsupported=false` filters unsupported/unknown; `show_unsupported=true` returns superset.
- [X] T102 [US7] Harden `normalize_family` against missing `siblings`, empty `tags`, null `license` — add proptest fixture in `tests/unit/normalize_robustness.rs`.
- [X] T103 [US7] Implement "unsupported" card variant in `ModelCard.tsx` — disabled download, visible "Open on Hugging Face" link, disambiguating badge per NFR-007.
- [X] T104 [US7] Wire the `Show unsupported` toggle into both the search handler (filter) and the URL schema (FR-093).
- [X] T105 [US7] Sweep the remaining 50-repo corpus test — assert zero panics, zero unhandled Err (SC-009).

**Checkpoint US7**: Spec acceptance criterion 8 passes.

---

## Phase 10 — Polish & cross-cutting

- [X] T110 [P] Delete legacy `apps/web/src/models/` folder (listed in plan.md § Project Structure). Verify no imports remain outside deleted files with `git grep "from \".*/models/\""`.
- [X] T111 [P] Add `Deprecation: true` + `Sunset` + `Link: rel="successor-version"` headers to `/api/v1/huggingface/search` handler (see `contracts/rest-model-store.md §6`).
- [X] T112 [P] Update `crates/nexus-models-store/README.md` with `normalize`, `capabilities`, and `downloads` module sections (Principle VIII — Living Documentation).
- [X] T113 [P] Update root `README.md` to reflect the new `/model-store/*` API surface and the retired `apps/web/src/models/` folder (Principle VIII).
- [X] T114 Run `scan:theme`, `scan:terminology`, `scan:cdn`, `scan:noop` against touched frontend files; fix any hits (Principle XII gate).
- [ ] T115 Run `cargo clippy --workspace --all-targets -- -D warnings` on touched crates; fix any new warnings.
- [ ] T116 Record the design-heavy-UI carve-out invocation in `specs/025-models-search-refactor/spec.md § Test Strategy` with a follow-up-coverage ticket id (Principle VI amendment).
- [ ] T117 Playwright a11y sweep (`pnpm test:e2e -- models-search.a11y.spec.ts`) — keyboard navigation across filters, variant rows, actions; assert every status conveyed with a non-color channel (NFR-006, NFR-007, SC-005).
- [ ] T118 Run scope-diff script (T007) as a final check — zero files modified outside the allow-list (NFR-010, SC-010).
- [ ] T119 `/speckit-analyze` compliance pass — ensure spec / plan / tasks cross-links are internally consistent before merge.
- [ ] T120 SC-003 verification gate (C3 remediation). Add `specs/025-models-search-refactor/scripts/sc003_grep.sh` that runs `rg -n --no-heading -e '"gguf"' -e '"ggml"' -e 'llama\.cpp' crates/nexus-api/src/handlers/model_store/search.rs crates/nexus-api/src/handlers/model_store/detail.rs` and exits non-zero on any hit (allow-list the single adapter-registration call site in a comment header). Wire the script into CI alongside T118's scope-diff check so a regression on "zero hardcoded references" blocks merge.

---

## Dependencies (user-story completion order)

```
Setup (Phase 1)  →  Foundational (Phase 2)  →  US1 (Phase 3, MVP)
                                             ├→ US2 (Phase 4)     — can run parallel to US3/4/5 once US1 merges
                                             ├→ US3 (Phase 5)     — depends only on Foundational + normalize module (landed in US1)
                                             ├→ US4 (Phase 6)     — depends on US1 normalize scaffold
                                             ├→ US5 (Phase 7)     — depends on US1 orchestrator + JobStore
                                             ├→ US6 (Phase 8)     — depends on US1 handler + loader; URL schema fully exercised
                                             └→ US7 (Phase 9)     — depends on US1 normalize + US6 `showUnsupported` toggle
                                                           → Polish (Phase 10)
```

- **US1 is the MVP.** Everything after it is additive and independently shippable.
- **US2, US3, US4 can proceed in parallel** once US1 lands.
- **US5 is a vertical through the orchestrator + UI** — parallel with US2/3/4.
- **US6 touches the URL contract broadly** — merge before US7 (which consumes the `showUnsupported` URL key).
- **US7 is last among user stories** so it can harden against the full normalizer + full URL schema.

## Parallel execution examples

- Phase 2 Foundational: T012, T013, T014, T015, T016 can all run in parallel (different files, no cross-deps). T010 and T011 are sequential (IDs depend on the newtype definition compiling).
- Phase 3 US1 tests: T020, T021, T022, T023, T024, T025 run in parallel — all different files.
- Phase 3 US1 UI components: T041, T042, T043 run in parallel — all different components.
- Across stories: after US1 merges, pick US2/3/4/5 in parallel; each is a separate vertical.

## Implementation strategy

1. **MVP**: Ship US1 alone. It delivers the single most-used flow (GGUF variant download) and proves the whole new backend contract end-to-end.
2. **Wave 2** (parallel): US2 (backend-aware filter), US3 (multi-format + bundle), US4 (precision transparency), US5 (full download lifecycle).
3. **Wave 3**: US6 (URL round-trip), then US7 (unsupported-tolerance) — US7 depends on US6's toggle.
4. **Polish**: Phase 10 as the final merge, including the legacy-folder deletion sweep.

## Task count summary

- Phase 1 Setup: **7 tasks** (T001–T007)
- Phase 2 Foundational: **8 tasks** (T010–T017)
- Phase 3 US1 (P1, MVP): **26 tasks** (T020–T045)
- Phase 4 US2 (P1): **6 tasks** (T050–T055)
- Phase 5 US3 (P1): **10 tasks** (T060–T069)
- Phase 6 US4 (P2): **3 tasks** (T070–T072)
- Phase 7 US5 (P2): **11 tasks** (T080–T089, T097 — includes auth pipeline and FR-086 persistence from analyze-round remediation)
- Phase 8 US6 (P2): **7 tasks** (T090–T096)
- Phase 9 US7 (P3): **6 tasks** (T100–T105)
- Phase 10 Polish: **11 tasks** (T110–T120)
- **Total: 95 tasks**

## Format validation (self-check)

All tasks above conform to the required format:

- ✅ Every task starts with `- [ ]` checkbox
- ✅ Every task has a `T###` identifier in execution order
- ✅ `[P]` is present on tasks that operate on disjoint files with no incomplete dependencies
- ✅ `[US#]` label is present on every Phase 3–9 task; absent on Setup / Foundational / Polish
- ✅ Every task names a concrete file path or a named artifact
