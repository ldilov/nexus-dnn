# Spec 025 — Checkpoint (2026-04-20)

Handoff document for continuing implementation in a future session.

## Status

- **85 / 95 tasks done** (89 %)
- **0 CRITICAL, 0 HIGH, 0 MEDIUM findings** (last `/speckit-analyze`)
- All P1/P2/P3 user-story functional work complete + contract-tested
- Host + frontend live, end-to-end verified (search / variants / download / pause / resume / rehydration / token invalidation / install-mapping)

## Branch

`025-models-search-refactor` (based on `main`).

## What's shipped

### Backend (Rust)

New modules in `crates/nexus-models-store/src/`:

| Path | Purpose |
|---|---|
| `ids.rs` | Newtype ids: `FamilyId`, `ArtifactId`, `VariantId`, `BackendId`, `JobId` (UUIDv7) |
| `types.rs` | `#[non_exhaustive]` enums: `Format`, `Precision`, `PrecisionSource`, `Modality`, `DependencyRole`, `Requirement`, `VariantType`, `CompatibilityStatus`, `DownloadState` |
| `model.rs` | Domain structs: `ModelRepository`, `ModelFamily`, `Artifact`, `Variant`, `Dependency`, `BackendCapability`, `BackendStatus`, `SourceProvider`, `ExternalDependencyRef` |
| `normalize/classify.rs` | `classify_format`, `classify_modality` (pure fns) |
| `normalize/variants.rs` | `detect_variants` — 29 canonical GGUF quant tokens + `Q4_K_M → Q5_K_M → Q8_0` default fallback |
| `normalize/precision.rs` | `infer_precision` — returns `(Precision, PrecisionSource)`; never lies about explicit-vs-inferred |
| `normalize/deps.rs` | `classify_role`, `resolve_dependencies` (VAE / tokenizer / text encoder / controlnet / lora / scheduler) |
| `normalize/compat.rs` | `classify_compat` — SINGLE-CHOICE owner of `CompatibilityStatus` derivation |
| `normalize/mod.rs` | `normalize_family` integrator — pure function `(HfSearchResult, &CapabilityRegistry) -> ModelFamily` |
| `capabilities/mod.rs` | Sealed `BackendAdapter` trait, `CapabilityRegistry`, `LlamaCppAdapter`, `TestAdapter` (for integration tests) |
| `downloads/auth.rs` | `TokenStore` — `Arc<RwLock<Option<String>>>` + `broadcast::Sender<TokenEvent>`; redacted Debug |
| `downloads/store.rs` | `JobStore` — SQLite-backed CRUD for `download_jobs` + `download_job_artifacts`; duplicate detection; startup rehydration |
| `downloads/orchestrator.rs` | `DownloadOrchestrator` — `tokio::Semaphore(2)` FIFO, RAII `DownloadSlot`, resumable `Range:`, pause/resume via `watch::Sender<bool>`, auth-change re-queue, install-map write on terminal |
| `downloads/install_map.rs` | `InstallMap` — FR-086 reverse mapping `artifact_id → (family_id, variant_id, format, source_provider, source_repo, …)` |

New handlers in `crates/nexus-api/src/handlers/model_store/`:

| Path | Route |
|---|---|
| `backends.rs` | `GET /api/v1/model-store/backends` |
| `search.rs` | `GET /api/v1/model-store/search` with `sort=compatible_first` support |
| `detail.rs` | `GET /api/v1/model-store/models/:family_id` |
| `downloads.rs` | `POST /downloads`, `GET /downloads/:jobId`, `POST /downloads/:jobId/pause`, `POST /downloads/:jobId/resume` |
| `settings.rs` | `GET/PUT/DELETE /settings/hf-token` |

Migrations:
- `migrations/013_model_store_download_jobs.sql` — `download_jobs` + `download_job_artifacts`
- `migrations/014_model_store_installed_artifacts.sql` — `model_store_installed_artifacts`

Also: `/huggingface/search` + `/huggingface/repos/*` now emit `Deprecation: true` / `Sunset: Sun, 19 Jul 2026 00:00:00 GMT` / `Link: </api/v1/model-store/search>; rel="successor-version"` headers.

### Frontend (React/TS)

| Path | Purpose |
|---|---|
| `apps/web/src/services/model_store.ts` | Sole I/O boundary — types + fetchers + `parseSearchParams` / `serializeSearchParams` |
| `apps/web/src/constants/feature_flags.ts` | `compatibleFirstSort: true` flag |
| `apps/web/src/views/models-search/models_search.{view,ui,css}.ts{x}` | Smart container + presentational root + vanilla-extract styles |
| `apps/web/src/views/models-search/components/*.tsx` | `ModelCard`, `VariantList`, `FilterBar`, `SortMenu`, `Paginator`, `SkeletonGrid` (+EmptyState/ErrorState), `CompatibilityBadge`, `DependencyStrip` |
| `apps/web/src/routes.tsx` | `path: "models-search"` route entry with `lazy: () => import("./views/models-search")` |

### Test coverage

- 82 lib unit tests (`nexus-models-store`)
- 5 integration tests covering the 50-repo fixture sweep (`tests/normalize_fixtures.rs`) — SC-002 + SC-009
- 32 pre-existing integration tests still green
- 22 REST contract tests across `contract_model_store_{backends,search,detail,downloads}.rs`:
  - T-B1 / T-B2 / T-B3 (backends)
  - T-S1 / T-S2 / T-S3 / T-S4 / T-S5 / T-S6 / T-S7 / T-S8 (search)
  - T-D1 / T-D2 / T-D3 (detail)
  - T-J1 / T-J2 / T-J3 / T-J3b / T-J3c / T-J7 / T-J8 (downloads)
- 9 vitest cases for `parseSearchParams ↔ serializeSearchParams` round-trip (SC-008)
- **Total: 150 tests green**

### Constitution scans

All clean: `scan:terminology`, `scan:cdn`, `scan:noop`, `scan:constitution`. (`scan:theme` has 1 pre-existing hit in `views/workflows/` — not in spec 025 scope.)

## What's left (10 tasks, all polish)

Pre-merge (~30 min mechanical):
- **T115** — `cargo clippy --workspace --all-targets -- -D warnings` pass
- **T120** — write `specs/025-models-search-refactor/scripts/sc003_grep.sh` with allow-list comment
- **T007 + T118** — write + wire `specs/025-models-search-refactor/scripts/scope_check.sh`
- **T119** — final `/speckit-analyze` rerun after above

Follow-up sprint:
- **T096** — HF cursor translation + 60 s in-memory cache (currently uses HF's `page` param directly)
- **T015** — typed `ModelStoreError` enum + axum `IntoResponse` mapping (handlers currently inline string codes)
- **T116** — mirror the design-heavy-UI carve-out paragraph from `plan.md` into `spec.md § Test Strategy`
- **T117** — Playwright a11y spec (`models-search.a11y.spec.ts`) covering keyboard nav + non-color status indicators

Housekeeping:
- **T030** — already satisfied by existing `search.rs` (`full=true` already in the URL builder). Can be closed.

## Session-resumption guide

```bash
cd D:/Workspace/repos/nexus-dnn
git checkout 025-models-search-refactor
cargo test -p nexus-models-store           # should show 82 lib + fixture sweep green
cargo test -p nexus-api --test contract_model_store_backends \
                       --test contract_model_store_search \
                       --test contract_model_store_detail \
                       --test contract_model_store_downloads  # 22 green
cd apps/web && pnpm tsc --noEmit && pnpm test model_store  # TS 0 errors, 9 vitest green
pnpm scan:constitution && pnpm scan:cdn && pnpm scan:terminology && pnpm scan:noop  # all clean
```

To start the live host + verify UI:

```bash
cargo build --bin nexus-dnn
./target/debug/nexus-dnn.exe &
# Browse: http://localhost:3000/#/models-search?q=llama&format=gguf
```

## Key design decisions (for future readers)

1. **Normalization is pure** — `normalize::normalize_family(raw, &registry) -> ModelFamily`. No I/O, no async, no logging-with-side-effects. Makes it trivial to fuzz / fixture-sweep.
2. **Compat is single-owner** — only `normalize::compat::classify_compat` computes `CompatibilityStatus`. Frontend renders the enum; never re-derives.
3. **`BackendAdapter` is sealed** — new backends land inside the host (Principle V). `TestAdapter` in the crate preserves the seal for integration tests.
4. **Fixed concurrency cap** — `MAX_CONCURRENT_DOWNLOADS = 2`, single named const. Raising the limit is a 1-line edit.
5. **Pause/resume uses `tokio::sync::watch`** — the worker selects between `pause_rx.changed()` and `stream.next()`; rolls cleanly between chunks.
6. **Resumable transfers** — orchestrator pre-flights on-disk size vs persisted `downloaded_bytes`, reconciles, sends `Range: bytes=N-`. Honours `206` vs `200` (server ignored Range → restart from 0).
7. **Startup rehydration** — `recover_startup_state()` flips every stranded `downloading` row to `paused` so user explicitly resumes (no reconnect storm).
8. **Token store** — `Arc<RwLock<Option<String>>>` + broadcast events. `TokenEvent::Set` / `Cleared` drives FR-114 invalidation: all `auth_required` jobs re-queue on any change.
9. **Install-mapping is a separate table** — `model_store_installed_artifacts` (migration 014), not the extension-oriented `host_models`. Different lifecycle (no leases, artifact-grain).
10. **Feature flag via module constant** — `FEATURE_FLAGS.compatibleFirstSort = true`. No runtime config surface; flip requires dev-server restart.
11. **Legacy `apps/web/src/models/`** — 5 orphans deleted (T110). 5 files remain because they have external non-spec-025 callers (`ModelsPanel` via extension layout system; `HfSearchPanel` via `views/models/models.ui.tsx`). Documented in `apps/web/src/models/README.md`.

## References

- Spec: `specs/025-models-search-refactor/spec.md`
- Plan: `specs/025-models-search-refactor/plan.md`
- Tasks: `specs/025-models-search-refactor/tasks.md`
- Research: `specs/025-models-search-refactor/research.md`
- Data model: `specs/025-models-search-refactor/data-model.md`
- Contracts: `specs/025-models-search-refactor/contracts/`
- Quickstart: `specs/025-models-search-refactor/quickstart.md`
- Fixture corpus README: `crates/nexus-models-store/tests/fixtures/hf/README.md`
- Crate README: `crates/nexus-models-store/README.md`
