# Implementation Plan: Models Search Refactor — Universal Model Catalog

**Branch**: `025-models-search-refactor` | **Date**: 2026-04-19 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/025-models-search-refactor/spec.md`

## Summary

Refactor the Models Search page into a universal, format-aware, backend-aware model catalog while keeping the current GGUF / `llama.cpp` experience first-class. The refactor touches two surfaces:

1. **Frontend** — a new `apps/web/src/views/models-search/` screen that replaces the legacy `apps/web/src/models/hf_search_panel.tsx` + `ModelsPanel.tsx` flat-folder code with a layered smart/presentational split driven by a React Router v7 data-mode loader. URL-persisted filters, sort, paging, and the `Show unsupported` toggle. Componentized model cards whose sections switch on normalized domain data, not hard-coded model type.
2. **Host backend** — a new `/api/v1/model-store/*` namespace that exposes a **backend capability registry** (`GET /backends` — dynamic, not hard-coded to `llama.cpp`), a **normalized search** (`GET /search` — one DTO shape covering Repository → Family → Artifact → Variant → Dependency → Compatibility), a **single-model detail** (`GET /models/:id`), and a **download API** (`POST /downloads`, `GET /downloads/:jobId`) that targets exact artifacts or bundles and enforces a **fixed concurrency cap of 2** with a `queued → downloading` FIFO queue. Adds `auth_required` as a first-class download-state and read-through of an optional HF token stored in host settings.

Adding a second runtime backend in the future MUST require only a capability-registry entry plus an adapter — no search-page edits. Legacy `/api/v1/huggingface/search` stays functional for one release with `Deprecation` / `Sunset` headers and the new page never reads from it.

## Technical Context

**Language/Version**: Rust 1.84 (workspace MSRV per existing crates); TypeScript 5.x / React 19 / Node ≥ 20 on the frontend.
**Primary Dependencies** (host): `axum` 0.7, `sqlx` (SQLite), `tokio`, `serde`, `thiserror`, existing `nexus-huggingface` (search / detail / download / token cache / progress), existing `nexus-models-store` (blobs / install / quantization / verify), `reqwest`. No new Rust crates required.
**Primary Dependencies** (web): `react` 19, `react-router` 7 (data mode, `createBrowserRouter`), `swr` 2 (used **only** for live-polling per-job progress; static search results are loader-driven), `@vanilla-extract/css`, `motion` 12 (`motion/react`, `LazyMotion + m`), `sonner`. No new npm deps required.
**Storage**: SQLite via `nexus-storage`. One new additive migration — `013_model_store_download_jobs.sql` — creating a `download_jobs` table (job-level state + per-artifact-target rows); no changes to existing tables. The capability registry is **in-memory only** (built from compiled-in backend adapter list) — no migration.
**Testing**: `cargo test` (unit + `#[tokio::test]` async), `cargo test --test contract_*` (REST contract tests against `nexus-api`), `pnpm test` (vitest) for pure frontend utilities, Playwright smoke for the shareable-URL round-trip. Contract tests for every new endpoint are **mandatory** per Principle VI — the design-heavy-UI carve-out (Principle VI amendment 2026-04-16) is invoked for per-card vitest but NOT for the loader, the service wrapper, or backend contracts; see Test Strategy below.
**Target Platform**: Host = Linux/macOS/Windows desktop daemon. Frontend = evergreen Chromium/Firefox/Safari served by the Rust host.
**Project Type**: Web application (host + SPA). Layout already established under `apps/web/` + `crates/`.
**Performance Goals** (derived from spec SCs): debounced search input (300 ms); perceived re-render under **300 ms** after debounce fires on a 30-card page (SC-006); download state transition visible in ≤ **2 s** (SC-007); zero unhandled exceptions across a 50-repo normalization fixture set (SC-009).
**Constraints**: concurrency cap = **2** active download jobs (FR-087, single named const `MAX_CONCURRENT_DOWNLOADS`); no 1px layout borders (Spectral Graphite); status never color-only (NFR-007); **zero** edits outside this screen's modules and the new `/model-store` backend (NFR-010, SC-010).
**Scale/Scope**: Hugging Face's public model index (≈ 1M repos). We paginate to ≤ `pageSize × page` ≤ 50 × 20 = 1 000 rendered rows max; per-page render bounded to `pageSize` (default 30). Five format classifiers (`gguf`, `ggml`, `safetensors`, `pytorch-bin`, `pth`, plus `unknown`).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Verdict | Evidence |
|---|---|---|
| I — Ecosystem-First | PASS | Re-uses `nexus-huggingface` (search/detail/download/token), `nexus-models-store` (install/verify/blobs), `axum`, `sqlx`, `swr`, `motion`, `vanilla-extract`. No new deps. |
| II — SOLID / pure functions | PASS | Normalization is a pure function `fn normalize(raw: UpstreamRepo) -> ModelFamily` in a new `nexus-models-store::normalize` module; no I/O. Classifier heuristics isolated in `normalize::classify` with fixture tests (FR-107). |
| III — Modularity, method size ≤ 25 lines, files ≤ 800 lines | PASS | New host work decomposed into `nexus-models-store::normalize`, `nexus-models-store::capabilities`, `nexus-api::handlers::model_store::{backends, search, detail, downloads}`. Frontend split per layered structure (XII). |
| IV — Self-documenting code (no inline comments) | PASS | All new code ships with `///` item docs only; zero inline `//` comments outside `// SAFETY:` (no `unsafe` planned). |
| V — Extendability via adapter contracts | PASS | New `BackendAdapter` trait + `CapabilityRegistry` (SINGLE-CHOICE owner) — a second backend lands by implementing the trait and registering, not by editing `model_store::search`. |
| VI — Test-First Verification | PASS-with-note | Contract tests for each new endpoint authored in Phase 1 (before handler implementation). Per-card vitest is deferred under the design-heavy-UI carve-out (see § Test Strategy below); loader + service + normalization + backend have full coverage. |
| VII — Memory & Type Safety | PASS | Typed errors via `thiserror` in `nexus-models-store` + `nexus-api`. Newtypes for `JobId`, `ArtifactId`, `FamilyId`, `BackendId`. RAII `DownloadSlot` guard manages the 2-slot semaphore. No `unsafe`. |
| VIII — Living Documentation | PASS | Plan, research, data-model, contracts, quickstart all produced. `crates/nexus-models-store/README.md` updated with new `normalize` + `capabilities` module sections (landing in same merge as plan's implementation). |
| IX — Git-Flow / bisectable history | PASS | Branch `025-models-search-refactor`. Commits grouped per user-story phase to keep each green-building. Conventional-commit prefixes. |
| X — Parallelism-First | PASS | `DownloadOrchestrator` spawns `tokio::spawn` per active slot; `/search` fans-out HF calls per format filter where relevant via `futures::future::join_all`. |
| XI — Rust Idioms Registry | PASS | Newtype wrappers for all new IDs; `#[non_exhaustive]` on public enums (`Format`, `CompatibilityStatus`, `DownloadState`, `DependencyRole`); builder pattern for `DownloadJobRequest`; sealed `BackendAdapter` trait; typed `thiserror` errors. |
| XII — Web Frontend Architecture | PASS | New screen at `apps/web/src/views/models-search/` with `.view.tsx` / `.ui.tsx` split, loader/action in `routes.tsx`, services in `services/model_store.ts`. Legacy `apps/web/src/models/*` is **removed** (see Migration below). No Tailwind, no inline `style={}` beyond progress-bar width. Motion used for card enter/exit via `LazyMotion + m`. |

**Complexity tracking**: none required; no principle is violated.

## Project Structure

### Documentation (this feature)

```text
specs/025-models-search-refactor/
├── plan.md              # this file
├── research.md          # Phase 0
├── data-model.md        # Phase 1 — DTOs, storage schema, state machines
├── quickstart.md        # Phase 1 — dev bring-up
├── contracts/
│   ├── rest-model-store.md       # REST API contract (5 endpoints)
│   ├── rust-backend-adapter.md   # trait + registry contract
│   └── frontend-loader.md        # loader/action contract for the screen
└── tasks.md             # Phase 2 — produced by /speckit.tasks
```

### Source Code (repository root)

```text
crates/
├── nexus-models-store/                  [EXTENDED]
│   └── src/
│       ├── normalize/                   NEW — pure functions: classify_format,
│       │                                     detect_variants, infer_precision,
│       │                                     resolve_dependencies, classify_compat
│       ├── capabilities/                NEW — BackendAdapter trait, CapabilityRegistry,
│       │                                     format-support maps
│       └── downloads/                   NEW — DownloadOrchestrator (2-slot semaphore),
│                                              JobStore (SQLite), progress events,
│                                              auth.rs (token-change invalidation hook),
│                                              recover.rs (startup rehydration)
├── nexus-huggingface/                   [LIGHT-TOUCH]
│   └── src/search.rs                    extended to expose raw file listings the
│                                        normalize layer needs; no caller-facing
│                                        breakage — legacy `/huggingface/search`
│                                        handler keeps reading what it reads today
├── nexus-api/
│   └── src/
│       ├── handlers/
│       │   └── model_store/             NEW — backends.rs, search.rs, detail.rs,
│       │                                      downloads.rs
│       ├── dto/
│       │   └── model_store.rs           NEW — OpenAPI-stable DTOs (Repository,
│       │                                      Family, Artifact, Variant, Dep,
│       │                                      Compat, DownloadJob)
│       └── router.rs                    [EDITED] — nest("/model-store", …);
│                                        legacy /huggingface/search kept with
│                                        Deprecation + Sunset headers
└── nexus-storage/
    └── migrations/
        └── 013_model_store_download_jobs.sql   NEW — download_jobs, download_job_artifacts

apps/web/
└── src/
    ├── services/
    │   └── model_store.ts               NEW — sole I/O boundary for this screen
    │                                    (fetch + types, no React)
    ├── views/
    │   └── models-search/               NEW SCREEN (the whole feature, UI side)
    │       ├── components/
    │       │   ├── ResultGrid.tsx              dumb
    │       │   ├── ModelCard.tsx               dumb; switches on `compat` + `format`
    │       │   ├── VariantList.tsx             dumb — GGUF quantization rows
    │       │   ├── DependencyStrip.tsx         dumb — VAE/etc markers
    │       │   ├── CompatibilityBadge.tsx      dumb — non-color-only
    │       │   ├── FilterBar.tsx               dumb — formats, backends, license,
    │       │   │                               modality, `Show unsupported`
    │       │   ├── SortMenu.tsx                dumb
    │       │   ├── Paginator.tsx               dumb — numbered pages, URL-driven
    │       │   ├── SkeletonGrid.tsx            dumb
    │       │   ├── EmptyState.tsx              dumb
    │       │   └── ErrorState.tsx              dumb — receives Response from loader
    │       ├── models_search.view.tsx   smart — consumes loader data, handles
    │       │                                   filter/sort/page URL mutation, calls
    │       │                                   downloads service, subscribes SWR
    │       │                                   for per-job progress
    │       ├── models_search.ui.tsx     presentational root of the screen
    │       ├── models_search.css.ts     vanilla-extract
    │       └── index.ts                 re-exports { loader, action, Component }
    └── routes.tsx                       [EDITED] — adds `path: "models-search"` entry
                                         with `lazy: () => import("./views/models-search")`

apps/web/src/models/                     [DELETED in the same merge]
  # Legacy flat folder. Files removed:
  #   hf_search_panel.tsx + .css.ts  → migrated into views/models-search/
  #   ModelsPanel.tsx                → superseded by models_search.view.tsx
  #   CatalogSearch.tsx              → superseded by FilterBar + services
  #   ModelCard.tsx                  → superseded by views/models-search/components/ModelCard.tsx
  #   InstalledList.tsx              → not part of this screen; verify no callers then delete
  #   backend_compat_badge.tsx       → superseded by CompatibilityBadge.tsx
  #   hf_search_panel.css.ts         → deleted
  #   hooks/                         → inlined into .view.tsx / extracted to views scope

tests/
├── contract/
│   ├── model_store_backends.rs       NEW
│   ├── model_store_search.rs         NEW
│   ├── model_store_detail.rs         NEW
│   └── model_store_downloads.rs      NEW
├── integration/
│   └── normalize_fixtures.rs         NEW — 50-repo fixture sweep (SC-002, SC-009)
└── unit/
    ├── normalize_classify.rs         NEW
    ├── normalize_variants.rs         NEW
    ├── normalize_precision.rs        NEW
    └── download_orchestrator.rs      NEW — 2-slot semaphore, FIFO, pause/resume
```

**Structure Decision**: Web-application layout (Option 2 from the template) with backend split across the existing `nexus-models-store` + `nexus-api` crates and frontend screen under the Principle XII layered tree. No new crates. One new migration. Legacy flat `apps/web/src/models/` folder is deleted in the same merge that introduces `views/models-search/` so the codebase does not carry two search implementations at once (Principle XII.7 — dedup discipline).

## Test Strategy

Per Principle VI design-heavy-UI carve-out (2026-04-16 amendment): this feature invokes the carve-out **only for per-component vitest**, and **only** for the dumb `.ui.tsx` + dumb sub-components in `views/models-search/components/`. Every other layer has full, test-first coverage:

| Layer | Coverage | Rationale |
|---|---|---|
| `nexus-models-store::normalize` (classify, variants, precision, deps, compat) | Unit tests with per-function fixtures; integration test sweep over 50 real HF repo snapshots | Pure functions — core correctness. SC-002, SC-009. |
| `nexus-models-store::capabilities` | Unit tests for registry; integration test for "add a second backend" scenario | SC-003, SC-004. |
| `nexus-models-store::downloads` | Unit tests for the 2-slot semaphore, FIFO, duplicate prevention (FR-085), pause/resume | FR-087, FR-088. |
| `nexus-api::handlers::model_store::*` | Contract tests per endpoint — happy path + each error class (auth_required, unsupported, partial metadata, empty page) | FR-100 through FR-104. |
| `apps/web/src/services/model_store.ts` | Vitest with `msw` fetch mock — verifies request shape + error propagation | Sole I/O boundary (Principle XII.4). |
| `apps/web/src/views/models-search/models_search.view.tsx` | Vitest: URL → loader args, loader data → handler calls, `Show unsupported` toggle round-trip | Smart container is load-bearing logic. |
| `apps/web/src/views/models-search/models_search.ui.tsx` + sub-components | **Carve-out: no per-component vitest in v1.** Visual / a11y regression covered by one Playwright smoke that exercises grid → variant-select → download → refresh → URL round-trip. | Design churn high during Spectral Graphite rollout; re-write cost outweighs value. Follow-up sprint will land the vitest coverage once the visual direction stabilises. |
| End-to-end | One Playwright journey: `?q=llama&format=gguf&page=2&pageSize=30&sort=most_downloaded` → results render → click `Q5_K_M` row download → job appears in status → refresh → URL preserved, job state re-read from backend | SC-001, SC-005, SC-007, SC-008. |

Follow-up coverage TODO is recorded in `quickstart.md § Deferred coverage`.

## Phase 0 — Research

Generated artifact: [`research.md`](./research.md). Scope: (a) how to cheaply expand `nexus-huggingface::search` to return per-file listings required by the normalizer without breaking the existing handler; (b) GGUF quantization naming canon (is `Q4_K_M` really canonical across TheBloke / Bartowski / upstream?); (c) what HF's API exposes for precision / `safetensors_metadata` fields versus what must be inferred; (d) recommended-variant heuristics that are safely conservative for MVP; (e) semantics of `page` / `limit` in the HF models endpoint versus how we surface it as numbered pages; (f) storage shape for `download_jobs` that supports FR-084 (resumable) without over-designing for v1.

All NEEDS-CLARIFICATION markers from the spec were already resolved in `/speckit.clarify`. Research resolves **implementation-level** unknowns only — none are scope-level.

## Phase 1 — Design & Contracts

Generated artifacts (all under `specs/025-models-search-refactor/`):

- [`data-model.md`](./data-model.md) — full DTO shape (Rust + TypeScript-facing), the `download_jobs` schema, and three state machines (download-job, variant-install, auth).
- [`contracts/rest-model-store.md`](./contracts/rest-model-store.md) — REST contract for the 5 endpoints plus the deprecation plan for `/huggingface/search`.
- [`contracts/rust-backend-adapter.md`](./contracts/rust-backend-adapter.md) — `BackendAdapter` trait, `CapabilityRegistry` singleton contract, and the "adding a second backend" worked example.
- [`contracts/frontend-loader.md`](./contracts/frontend-loader.md) — loader/action signatures, URL schema, and the `Show unsupported` toggle wiring.
- [`quickstart.md`](./quickstart.md) — commands to bring the feature up locally, run contract tests, exercise a GGUF download, and verify the 2-slot concurrency cap.
- Agent context refresh via `.specify/scripts/powershell/update-agent-context.ps1 -AgentType claude` at the end of Phase 1 (adds no new technology; records the new module paths).

## Constitution Check (post-Phase-1)

Re-evaluated after contracts landed — all principles still PASS with the same evidence as the pre-Phase-0 table. The `CapabilityRegistry` is the SINGLE-CHOICE owner of backend enumeration (III), the `BackendAdapter` trait is sealed for host internal implementors and open for future backends (V), and the screen's smart/presentational split is mechanical enough to mechanise in review (XII).

## Migration notes

1. **Legacy `/api/v1/huggingface/search`** stays wired for one release with `Deprecation: true` and `Sunset: <+90 days>` headers. The new screen never calls it; the `ModelsPanel.tsx` caller is removed with this feature.
2. **Legacy `apps/web/src/models/*`** flat folder is deleted in this merge (see deletion list in Project Structure). A one-time `git grep` sweep in the verification phase confirms no remaining imports from outside this feature's scope.
3. **Host settings key** `huggingface.access_token` (optional) — already present in the existing settings mechanism used by `nexus-huggingface::token`. This feature wires it into the new `/model-store/search` and `/model-store/downloads` handlers; no new settings key is introduced.
4. **One migration** — `013_model_store_download_jobs.sql`, append-only, idempotent (per Architectural Constraints). No existing tables altered.

## Risks & mitigations

| Risk | Mitigation |
|---|---|
| HF API returns file metadata inconsistently across repos — normalizer classifies wrong | 50-repo fixture sweep in `tests/integration/normalize_fixtures.rs`; unsupported-fallback path proven safe (SC-009). |
| 2-slot cap starves a large SDXL bundle behind a small GGUF | Cap is a named const `MAX_CONCURRENT_DOWNLOADS` — lift it with one-line edit; progress UI shows `queued` clearly so users aren't confused. |
| Dual source of truth for compatibility logic (frontend + backend) | Backend classifies once in `/search` and `/models/:id` responses; frontend only renders `compat` — it does not re-derive it. Reviewed via scan in tasks phase. |
| Deleting legacy `models/` folder breaks unrelated screen | Pre-deletion `git grep` import sweep is a task in Phase 2; folder is only deleted after the sweep passes clean. |

## Complexity Tracking

*No violations. Section intentionally empty.*
