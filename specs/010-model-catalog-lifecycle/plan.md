# Implementation Plan: Model Catalog & Backend Lifecycle

**Branch**: `009-workflow-extension-catalog` (spec carries number `010-model-catalog-lifecycle`; see Complexity Tracking) | **Date**: 2026-04-15 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/010-model-catalog-lifecycle/spec.md`
**Post-implementation note (2026-04-15)**: Spec was scope-trimmed (Path A) after `/speckit.analyze`. Items marked `→ 011` were moved to spec 011 (`host-runtime-pool`). See "Reconciliation with shipped code" at the bottom of this file for divergences from the original plan that stuck.

## Summary

Fix the backend-runtime state drift on reload (phantom "Not Installed" and phantom "Model loaded") by treating durable storage as the single source of truth on hydration and a lightweight filesystem presence probe as a *reconciler* — never an implicit installer. Then build a unified Model Catalog surface that lists locally-installed models and searches the Hugging Face Hub, installs GGUF artifacts for Llama.cpp (with checksum verification, cancellable downloads, and progress streaming over existing event bus), badges TensorRT-LLM-compatible repos conservatively (prebuilt engine artifact present OR architecture in a known-supported allowlist), and exposes per-model hyperparameter profiles persisted in `ext_local_llm_backend_profiles.generation_defaults`.

Technical approach: **introduce a new host crate `nexus-huggingface`** owning all Hugging Face Hub integration (search, resumable download, checksum, ETag cache, token resolution, progress streaming) exposed to extensions via a `HuggingFaceCapability` trait. Catalog cache lives in a **host-owned** `host_hf_catalog_cache` table (not extension-namespaced), while per-extension registries (`ext_local_llm_model_installs`) stay extension-namespaced and call the shared capability. Extend `ext_local_llm_model_installs` with `model_limits`, `hyperparameters`, `routed_backend`, `routing_signal` columns. Expose four new REST endpoints under the existing extension reveal router (`GET /extensions/local-llm/models/catalog`, `GET /extensions/local-llm/models/catalog/search`, `POST /extensions/local-llm/models`, `POST /extensions/local-llm/models/:id/load` + `PATCH .../hyperparameters`) — the `local-llm` handlers consume the shared HF capability, they do not speak HTTP to Hugging Face directly. Rebuild the frontend `backends/` surface into a `models/` panel that reads via Suspense + `use()` and streams progress via the existing ServiceWorker broadcast channel.

**Why a shared crate now**: future extensions (video-gen, image-gen, embeddings, TTS/STT) will all need the same HF plumbing. Implementing it inside `nexus-local-llm` and later lifting it out would require a live cache-table migration and rewriting every caller. The split is ~2 hours of scope this sprint, zero data migration, and satisfies constitution §I (Ecosystem-First) and §III (Extendability). The shared crate stays narrow — a *Hugging Face client* only (search/download/cache/token). Domain concepts (routing, registries, hyperparameters) stay in each consuming extension, to be promoted only when a second consumer demands them (YAGNI).

## Technical Context

**Language/Version**: Rust (stable, 2024 edition) on the host; TypeScript 5.7 (strict) on the frontend.
**Primary Dependencies**: `tokio 1.48`, `axum 0.8`, `sqlx 0.8` (SQLite), `reqwest` (already present for `download.rs`), `serde`/`serde_json`, `tracing 0.1`, `thiserror 2.x`, `sha2 0.10`, `semver 1.0`; React 19 + `@xyflow/react 12` + `vanilla-extract` on the frontend. New additions: **`nexus-huggingface` host crate** (this sprint) and `hf-hub 0.4` (candle-rs / Hugging Face ecosystem, Apache-2.0) for resumable HF downloads with auth-token support.
**Storage**: SQLite via `nexus-storage`. **Two migrations** — (1) host migration `crates/nexus-storage/migrations/NNN_host_hf_catalog.sql` creating `host_hf_catalog_cache` owned by `nexus-huggingface`; (2) extension migration `extensions/builtin/local-llm/storage/migrations/006_model_hyperparameters.sql` extending `ext_local_llm_model_installs` with the new columns and the backend-state audit log. No new database.
**Testing**: `cargo test` (unit + integration in `crates/nexus-local-llm/tests/` and `crates/nexus-api/tests/`); contract tests in `specs/010-.../contracts/` verify envelope shape; frontend Vitest + `@testing-library/react` for the Models panel; Playwright smoke test for the reload-persistence journey.
**Target Platform**: Linux/macOS/Windows desktop (Tauri-agnostic, host + local web UI). GPU detection reuses `nexus-local-llm/detect.rs`.
**Project Type**: Web application (Rust backend + React frontend) — Option 2 structure.
**Performance Goals**: Models panel first paint < 400 ms with 50 installed + 25 HF results cached; HF search p95 < 1.2 s end-to-end with a warm cache, < 3 s cold; install progress updates at ≥ 2 Hz; backend-state hydration on reload < 150 ms (single SQL query + presence check in parallel).
**Constraints**: Offline-capable for the *installed* catalog (HF search degrades gracefully, distinguishing "no results" vs "unreachable"); cancellable downloads MUST clean up partial files within 500 ms; no new global state stores on the frontend — Suspense + `use()` per constitution §X.
**Scale/Scope**: Expect up to ~200 installed models and HF search pagination up to 100 results/page. Hyperparameter profiles: one per (user, model) pair, ≤ 2 KB JSON each.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Note |
|-----------|--------|------|
| I. Ecosystem-First | ✅ | `hf-hub` crate for HF downloads; `reqwest` for search API; existing `download.rs`/`checksum.rs`/`extract.rs` reused. No hand-rolled download manager. |
| II. Pure Functions, SOLID & Design Patterns | ✅ | Catalog query layer exposed as pure functions on `HfCatalogClient` (Strategy); routing decision as a pure `BackendRouter::route(model_meta) -> BackendTarget` (Strategy + Factory). State hydration uses Repository pattern on `InstallsStore`. |
| III. Extendability | ✅ | `BackendRouter` is trait-based so TensorRT-LLM can plug in when its stub graduates; `ModelSource` trait (HF now, local-import and custom registries later) keeps the catalog open/closed. |
| IV. Self-Documenting Code | ✅ | No inline comments; module-level doc attributes explain invariants (e.g., state hydration contract). |
| V. Git-Flow Branching | ⚠️ | See Complexity Tracking — working on existing `009-workflow-extension-catalog` branch instead of cutting `feature/010-*` because 009 has uncommitted sprint work; will rebase/split at merge time. |
| VI. Living Documentation | ✅ | `README.md`, `extensions/builtin/local-llm/README.md`, and `specs/010-.../quickstart.md` updated as artifacts of this plan. |
| VII. Clean Provenance | ✅ | All generated scaffolding manually reviewed before commit. |
| VIII. Memory Safety | ✅ | No `unsafe`; all fallible ops return typed errors (`LocalLlmError` variants extended). |
| IX. Parallelism-First | ✅ | HF search + installed-list hydration dispatched concurrently; download + checksum run in overlapped pipeline; presence probe runs in parallel with DB hydration. |
| X. Modern React Patterns | ✅ | `use(catalogPromise)` inside Suspense; no `useMemo`/`useCallback`/`React.memo`; ServiceWorker broadcasts `model:progress` events; `useEffectEvent` for cancel-button handler. |

**Result**: PASS with one justified deviation (branching, see below).

## Project Structure

### Documentation (this feature)

```text
specs/010-model-catalog-lifecycle/
├── plan.md              # This file
├── research.md          # Phase 0 — HF API shape, TRT-LLM compat detection, state-hydration audit
├── data-model.md        # Phase 1 — schema delta + entity relationships
├── contracts/
│   ├── catalog_list.http        # GET /extensions/local-llm/models/catalog
│   ├── catalog_search.http      # GET /extensions/local-llm/models/catalog/search
│   ├── install_model.http       # POST /extensions/local-llm/models
│   ├── load_model.http          # POST /extensions/local-llm/models/:id/load
│   └── patch_hyperparameters.http
├── quickstart.md        # Manual E2E walk-through for QA
├── checklists/
│   └── requirements.md  # From /speckit.specify
└── tasks.md             # Phase 2 output (/speckit.tasks — not created here)
```

### Source Code (repository root)

```text
crates/
├── nexus-huggingface/                       # NEW host crate — shared HF client capability
│   ├── src/
│   │   ├── lib.rs                           # HuggingFaceClient + HuggingFaceCapability trait
│   │   ├── search.rs                        # /api/models search, filter builder, pagination
│   │   ├── detail.rs                        # /api/models/{repo_id} + siblings[]
│   │   ├── download.rs                      # hf-hub wrapper, resumable, LFS-aware, cancellable
│   │   ├── checksum.rs                      # MOVED from nexus-local-llm
│   │   ├── cache.rs                         # ETag + body cache over host_hf_catalog_cache
│   │   ├── progress.rs                      # emits on shared event bus channel
│   │   ├── token.rs                         # HF_TOKEN env resolution only (never UI-collected)
│   │   └── error.rs                         # HfError with API/transport/cache variants
│   └── Cargo.toml
├── nexus-api/
│   └── src/
│       ├── dto/
│       │   └── models.rs                    # NEW: HfSearchResultDto, InstalledModelDto, HyperparameterProfileDto
│       └── handlers/
│           └── local_llm_models.rs          # NEW: consumes HuggingFaceCapability; catalog/install/load/hyperparameters
├── nexus-local-llm/
│   └── src/
│       ├── manifest/
│       │   ├── hf_routing.rs                # NEW: BackendRouter (GGUF → llamacpp, TRT signals → trt)
│       │   ├── hyperparameters.rs           # NEW: validated profile struct + repo
│       │   └── install.rs                   # NEW: ModelInstaller orchestrating capability.download → route → commit
│       ├── installs_store.rs                # EXTEND: hyperparameter + routing column CRUD; state-log writes
│       ├── state.rs                         # EXTEND: 3-state hydration (NotInstalled/Installed/NeedsRepair)
│       ├── validator.rs                     # EXTEND: presence-only probe vs full validation
│       └── launch_spec.rs                   # EXTEND: merge hyperparameter profile into launch args
└── nexus-storage/
    └── migrations/
        └── NNN_host_hf_catalog.sql          # NEW: host_hf_catalog_cache (owned by nexus-huggingface)

extensions/builtin/local-llm/
└── storage/migrations/
    └── 006_model_hyperparameters.sql        # NEW: hyperparameters + model_limits + routed_backend columns + state log

apps/web/
└── src/
    ├── api/
    │   └── generated/
    │       ├── HfSearchResultDto.ts         # NEW (generated from ts-rs)
    │       ├── InstalledModelDto.ts         # NEW
    │       └── HyperparameterProfileDto.ts  # NEW
    ├── backends/                            # EXISTING — backend runtime panel
    │   ├── backend_card.tsx                 # MODIFY: render 3-state (NotInstalled/Installed/NeedsRepair)
    │   └── hooks/use_backend_status.ts      # MODIFY: read-from-store-first, probe reconciler in background
    ├── models/                              # NEW: unified catalog surface
    │   ├── ModelsPanel.tsx
    │   ├── InstalledList.tsx
    │   ├── CatalogSearch.tsx
    │   ├── ModelCard.tsx
    │   ├── InstallProgress.tsx
    │   ├── HyperparameterForm.tsx
    │   ├── backend_compat_badge.tsx
    │   └── models.css.ts
    └── service-workers/
        └── model_progress_sw.ts             # EXTEND: forward model:progress events to subscribers

tests/
├── integration/
│   ├── backend_state_reload.rs              # US1 — reload-persistence journey
│   ├── hf_catalog_search.rs                 # US2 — unified catalog + search
│   ├── backend_routing.rs                   # US3 — format-aware routing
│   └── load_and_hyperparameters.rs          # US4 — load + persistence
└── contract/
    └── local_llm_models_contracts.rs        # envelope + status-code contract tests
```

**Structure Decision**: Option 2 — web application with `crates/` (Rust backend + extension host) and `apps/web/` (React frontend). **One new host crate `nexus-huggingface`** owns all Hugging Face integration and is exposed to extensions via a capability trait. Per-extension domain logic (routing, registries, hyperparameters) remains inside each extension's crate. Host-owned SQL lives under `crates/nexus-storage/migrations/`; extension-owned SQL stays under `extensions/builtin/<ext>/storage/migrations/` per spec 004 namespacing rules.

## Approach Per User Story

### US1 — Backend install/activation state persists (P1, bug fix)

**Root cause hypothesis** (validated in Phase 0 research): the frontend `useBackendStatus` hook currently calls a probe-first path that treats "binary not visible yet" as "not installed" and overwrites the DB-backed state. On reload, the probe races the DB hydration and wins. Secondary: the "Model loaded" toast fires on *backend-ready*, not on *model-present-in-backend*, so an empty model registry still displays the message.

**Approach**:

1. **Hydration-first, probe-second.** On app start, `GET /extensions/local-llm/backends` reads `ext_local_llm_runtime_installs` and returns the persisted state verbatim. A *separate* presence probe runs in parallel and, if it detects drift (binary missing where `state = 'installed'`), transitions the row to a new `needs_repair` state rather than `not_installed`. Settings are preserved.
2. **Install path atomicity.** The `install_pipeline.rs` flow updates `state` to `installed` *after* all verification steps complete and inside the same `sqlx::Transaction` as binary-path registration. No intermediate commit can leave a half-installed row.
3. **Model-loaded truth source.** Replace the client-side "Model loaded" toast with a derived value from `GET /extensions/local-llm/backends/:id/load-state`, which queries the running process's current model. If no model is loaded, the UI renders "No model loaded — select one".
4. **Observability.** Extend `tracing` spans in `installs_store.rs` to emit `backend.state.transition` with `{from, to, trigger}` for every state change so the phantom-state class of bugs is diagnosable going forward.

**Automated verification**: integration test `backend_state_reload.rs` installs a backend against a mocked runtime, kills the process, reloads via fresh axum router, and asserts `state == installed` + zero probe-triggered overwrites.

### US2 — Unified Model Catalog with HF search (P1, feature)

**Approach**:

1. **`HuggingFaceCapability`** trait in the new `nexus-huggingface` crate exposes `search(req) -> Stream<SearchResult>`, `detail(repo_id, revision) -> RepoMetadata`, `download(spec) -> ProgressStream`. The `local-llm` handlers accept an injected `Arc<dyn HuggingFaceCapability>` — no HTTP to Hugging Face leaks into the extension crate. Cache is host-owned (`host_hf_catalog_cache`, 10-min TTL, ETag/`If-None-Match`); token resolution is env-only (`$HF_TOKEN`), never UI-collected.
2. **Unified endpoint** `GET /extensions/local-llm/models/catalog` returns both installed models (from `ext_local_llm_model_installs`) and (optionally, with `?q=...`) HF results via the capability, in a single envelope so the frontend hydrates both sections in one Suspense boundary.
3. **Search filters**: format (`gguf` | `safetensors` | `trt-engine`), license, approximate size, backend compatibility. Filters applied server-side against HF's `filter=` parameter plus post-filter for compatibility (done in the `local-llm` handler after `BackendRouter::route` annotates results).
4. **Install flow** delegates bytes-on-the-wire to `capability.download(spec)`; `local-llm`'s `ModelInstaller` inserts a `ModelDownloadTask` row before first byte, consumes the capability's progress stream, runs backend routing at commit time, and commits a `model_installs` row only after checksum verification — all inside a single `sqlx::Transaction`. On cancel: capability drops partial file, installer marks task `cancelled`, no `ext_local_llm_model_installs` row ever committed. Progress is re-emitted on the existing extension event bus (same channel the backend installer uses).
5. **Frontend**: `ModelsPanel` is a Suspense boundary that reads `catalogPromise` via `use()`. `CatalogSearch` debounces (300 ms) and re-resolves the promise via a new key. `InstallProgress` subscribes to the ServiceWorker `model:progress` topic and renders a `<progress>` + cancel button.

**Automated verification**: integration test `hf_catalog_search.rs` mocks HF with `wiremock`, installs a small fake GGUF, asserts it surfaces under "Installed" within the same response as the next search result set.

### US3 — Format-aware backend routing (P2)

**Approach**:

1. **`BackendRouter` trait** in `hf_routing.rs`:
   ```text
   Trait → route(meta) -> Result<BackendTarget, RoutingError>
   Impls  → GgufToLlamacpp, TrtPrebuiltEngine, TrtSupportedArchitecture, NoRoute
   Composition → a chain-of-responsibility (first impl that returns Ok wins)
   ```
2. **TRT-LLM compatibility** uses conservative signals, documented in `research.md`:
   - *Strong*: a file matching `*.engine` or a `trt_llm_*` subdirectory in the HF repo file list → `TrtPrebuiltEngine`.
   - *Medium*: `config.json` `architectures[]` intersects the TRT-LLM supported-architecture allowlist (ships as a YAML file under `extensions/builtin/local-llm/backends/trt-llm/supported_architectures.yaml`, user-editable) → `TrtSupportedArchitecture`.
   - *Otherwise*: `NoRoute` if no other backend can claim it. Never falsely "compatible" — the UI displays `compat: unknown` badge.
3. **Block install** when `NoRoute` returns; the UI surfaces the router's explanation (`RoutingError::Reason`) verbatim.

**Automated verification**: `backend_routing.rs` table-driven tests with fixture metadata for 6 representative HF repos (GGUF, safetensors-only llama, pre-built TRT engine, unsupported arch, gated-no-files, mixed).

### US4 — Load model & configure hyperparameters (P2)

**Approach**:

1. **Load endpoint** `POST /extensions/local-llm/models/:id/load` merges the hyperparameter profile (from the new `hyperparameters` column) into the launch spec and asks the active backend's process supervisor (existing `ManagedProcess`) to swap models. Returns a streaming `LoadProgress` (queued/loading/ready/error).
2. **Hyperparameter profile schema** (serde-validated):
   - Common: `temperature`, `top_p`, `top_k`, `repetition_penalty`, `max_context_length`.
   - Llama.cpp: `n_gpu_layers`, `n_batch`, `mlock`, `mmap`.
   - TRT-LLM: `max_input_len`, `max_output_len`, `enable_kv_cache_reuse`.
   - Validation: each field validated against a per-model `limits` descriptor pulled at install time (model's declared max ctx, max vocab) and persisted alongside the install.
3. **Persistence** on `PATCH /extensions/local-llm/models/:id/hyperparameters` — upsert into `ext_local_llm_model_installs.hyperparameters`. Frontend form shows current values, displays validation errors from the API inline.
4. **Truth source** for "is this model loaded right now" is the same endpoint as US1's `load-state` — the UI never assumes based on a prior click.

**Automated verification**: `load_and_hyperparameters.rs` — install → patch hyperparameters → load → reload host process → `GET /load-state` returns stale (`ready_before_reload: true`) → UI offers re-load → new `GET` returns `ready`; hyperparameters persisted across host restart.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Working on `009-workflow-extension-catalog` branch instead of cutting `feature/010-model-catalog-lifecycle` (Principle V) | Branch 009 has ~30 uncommitted modified files of sprint-in-progress work that this feature directly builds on (catalog surface, workflow DTOs). Cutting a fresh branch would either strand that work or force a disruptive mid-sprint rebase. | Fresh `feature/010-*` from `develop` would force either (a) stashing 30 files and reapplying across two branches — high merge-conflict risk in `App.tsx`, `right_inspector.tsx`, and router files both features touch, or (b) duplicating the in-progress 009 changes onto 010. Chose single-branch continuity; will split into two commits (bug-fix + feature) at PR time so review stays scoped. |
| Introducing `hf-hub` dependency rather than hand-rolling HF download via `reqwest` | Constitution Principle I (Ecosystem-First) mandates using existing crates; `hf-hub` handles resumable downloads, token auth, and LFS redirect chains that `reqwest` alone does not. | Hand-rolled `reqwest` would re-implement redirect handling, `Range` retries, and HF's LFS flow — exactly the kind of custom code §I forbids without justification. |

## Phase 0 — Research Topics

Research is tracked in [research.md](./research.md) (generated by this command). Open questions resolved before Phase 1:

1. **HF Hub API**: exact query parameters for `filter=gguf`, license filters, pagination behavior, ETag semantics.
2. **TRT-LLM compatibility detection**: empirical survey of 20 popular HF repos → which signals are reliable?
3. **Backend state drift**: audit of existing `use_backend_status` + `installs_store` interaction to confirm the probe-races-DB hypothesis before implementing.
4. **`hf-hub` crate evaluation**: license (Apache-2.0 — GPL-3.0 compatible ✅), release cadence, known issues with Windows long paths.
5. **Progress streaming**: reuse the existing extension event bus channel (`spec 007`) vs. a new per-install SSE stream — decision captured in research.md.
6. **Hyperparameter limit discovery**: which fields can be auto-derived from `config.json` at install time (max_position_embeddings, vocab_size) vs. user-declared.

## Phase 1 — Design Artifacts

Produced by this command:

- [data-model.md](./data-model.md) — schema delta + entity ER diagram (textual).
- [contracts/](./contracts/) — five `.http` contract examples, one per endpoint, with envelope + status codes.
- [quickstart.md](./quickstart.md) — manual QA walk-through covering all four user stories end-to-end.
- Agent context update: run `.specify/scripts/powershell/update-agent-context.ps1 -AgentType claude`.

## Re-evaluation after Phase 1

After writing Phase 1 artifacts, re-check constitution gates:

- All gates that passed above remain satisfied — no new stores, no manual memoization, no unsafe, all parallelizable paths parallel.
- Single deviation (branching) unchanged and still justified.

**Result**: PASS. Proceed to `/speckit.tasks` next.

---

## Reconciliation with shipped code (post-implement, Path A scope trim)

Divergences from the original plan that persisted into the merged code:

1. **Option C refactor (mid-sprint)** — host routes changed from `/extensions/local-llm/models/*` to two families: generic `/api/v1/huggingface/*` (no extension id) and per-extension `/api/v1/extensions/{extId}/huggingface/*` (installer keyed by `AppState.extension_model_installers`). Original plan had paths hardcoded to `local-llm`. New plan is correct; contract .http files still carry the old paths and will be updated in spec 011 cleanup.
2. **`BackendRouter` trait (plan) vs. `route_backend()` function (impl)** — plan described a chain-of-responsibility trait with `GgufToLlamacpp`, `TrtPrebuiltEngine`, `TrtSupportedArchitecture`, `NoRoute` impls. Implementation is a single imperative function with the same semantics. No user-visible difference; trait refactor becomes a "second consumer triggers it" task, to land when spec 011 or a real second extension arrives.
3. **`checksum.rs` not moved from `nexus-local-llm` to `nexus-huggingface`** (plan task T004). Left in place to avoid caller churn; `nexus-huggingface` has its own fresh `checksum.rs`. There is now short-lived duplication of the hasher helper. Cleanup lands with spec 011 since `nexus-local-llm` itself is getting renamed/shrunk.
4. **Host migration location** — plan said `crates/nexus-storage/migrations/NNN_host_hf_catalog.sql`; actual is repo-root `migrations/007_host_hf_catalog.sql`, matching existing host migrations 001–006. Plan was wrong about the convention.
5. **`hf-hub` crate brought in as a dep but not used for downloads** — `HuggingFaceClient::download` is a direct `reqwest` streamed implementation. The hf-hub crate stays as a dep for the eventual resumable-download path and LFS redirect handling, which arrives with spec 011's progress-streaming work.
6. **Extension-owned domain logic still lives in the host `nexus-local-llm` crate** — the `ModelInstaller` + routing should move into `extensions/builtin/local-llm/` (or a new extension-owned Rust lib) per spec 011's architecture. Spec 011 explicitly owns this move; spec 010 tasks.md flagged it as a chunk-3 overreach.

**Net**: shipped surface matches spec 010 (scope-trimmed version) plus the Option C architecture agreed mid-sprint. All divergences are captured and owned by spec 011.
