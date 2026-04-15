# Tasks: Host-Managed Model Store

**Input**: Design documents from `/specs/017-host-managed-model-store/`
**Prerequisites**: spec.md, plan.md. Hard deps: spec 015 (runtimes modularization) landed, spec 016 (extension + API modularization) landed. The `backends/` submodule split from 016 is required before adding `host_models.rs` without re-violating file-size limits.
**Tests**: contract tests are authored RED in Phase 1 and turn GREEN across Phases 4–9 per the mapping in `plan.md` → Contracts Directory.

## Sequencing invariant

Per Principle IX. Recommended order:
US2 (rename) → US1 (schema + install/download + blobs) → US10a (typed quantization) → US3 (leases) → US5 + US10c (resolver + dry-run) → US4 + US6 + US12 (manifest + private + revision pinning) → US7 (layout tests) → US8 (download concurrency hardening) → US9 (provenance) → US10 (exhaustive errors) → Polish.

Phases 3, 8, and 9 are candidates for concurrent PRs (Principle X) after their data deps land.

---

## Phase 1: Setup / Baseline

- [X] T601 Captured baseline: `cargo check --workspace --tests` GREEN pre-change; `cargo test --workspace --no-run` compiles all existing binaries.
- [X] T602 [P] Authored contract-test skeletons (RED, all `#[ignore]`-gated with GREEN phase mapping):
  - `crates/nexus-backend-runtimes/tests/model_install_dedup.rs` (SC-506)
  - `crates/nexus-backend-runtimes/tests/model_lease_budget.rs` (SC-507)
  - `crates/nexus-backend-runtimes/tests/model_uninstall_blocked_by_lease.rs` (SC-508)
  - `crates/nexus-backend-runtimes/tests/model_resolver_latency.rs` (SC-502)
  - `crates/nexus-backend-runtimes/tests/model_blob_dedup.rs` (SC-511)
  - `crates/nexus-backend-runtimes/tests/model_resolve_dry_run.rs` (SC-513)
  - `crates/nexus-backend-runtimes/tests/quantization_matching.rs` (SC-514)
  - `crates/nexus-api/tests/host_models_contract.rs` (FR-515, FR-519, FR-520, FR-524)

---

## Phase 2: Foundational — US2 `installs_store` → `runtime_installs_store` rename (P1)

**Goal**: Eliminate the naming ambiguity before introducing `models_store/`. Nothing else compiles cleanly without this landing first.
**Independent test**: `grep -R "installs_store" crates/nexus-backend-runtimes/src/` returns only `runtime_installs_store` and `models_store` paths after Phase 10.

- [X] T610 [US2] Rename directory `crates/nexus-backend-runtimes/src/installs_store/` → `runtime_installs_store/`. Update `mod` declaration in `crates/nexus-backend-runtimes/src/lib.rs`.
- [X] T611 [US2] Add re-export shim to `crates/nexus-backend-runtimes/src/lib.rs`: `pub use runtime_installs_store as installs_store;` (removed in T720 at Phase 11).
- [X] T612 [US2] Update internal path references inside `crates/nexus-backend-runtimes/src/runtime_installs_store/{migration,relocation,resolution}.rs` that referred to `crate::installs_store::*` → `crate::runtime_installs_store::*` — verified no such refs existed; removed a stale comment from mod.rs per Principle IV.
- [X] T613 [US2] Verified `cargo check --workspace --tests` GREEN without edits in `nexus-api` (shim carries callers).

---

## Phase 3: US1 — Schema (P1)

**Goal**: Persist the host-owned model catalog in two new tables that mirror the runtime-store shape.
**Independent test**: `crates/nexus-backend-runtimes/tests/model_store_schema.rs` applies migrations against empty and populated DBs (SC-501).

### Tests (RED)

- [X] T620 [P] [US1] Migration test in `crates/nexus-backend-runtimes/tests/model_store_schema.rs`: applies 009 against empty DB, against pre-017 (008) runtime-only schema, and re-applies idempotently — all green.
- [X] T621 [P] [US1] Unique-index test: duplicate tuple rejected; distinct `sha256_root` (US12.4) allowed; private-alongside-public allowed; CHECK constraints enforce `(private_model, owner_extension_id)` coherence — all green.

### Implementation

- [X] T622 [US1] Authored `migrations/009_host_model_store.sql` with `host_model_installs` + `host_model_leases` per FR-501/502, unique index on identity tuple (incl. `sha256_root` for US12.4), CHECK constraints binding `private_model` ↔ `owner_extension_id`, state/source_kind enums enforced via CHECK. Deviation from plan: migrations are top-level `.sql` files in this repo (numbered 001–008), not Rust DDL in `models_store/schema.rs` — matched the existing convention.
- [X] T623 [US1] Registered 009 in `crates/nexus-storage/src/sqlite/migrations.rs::run_migrations` (the workspace migration runner; `runtime_installs_store/migration.rs` handles legacy-row backfill, not schema DDL).

### Verification

- [X] T624 [US1] T620/T621 GREEN (8/8 tests passing). `cargo test --workspace` 0 failures. `cargo clippy --workspace --all-targets -- -D warnings` clean.

---

## Phase 4: US1 + US10b — `models_store::install` + `download` + content-addressed `blobs` (P1/P2)

**Goal**: Install models deterministically, dedup on content hash, store bytes once on disk.
**Independent test**: `model_install_dedup.rs` (SC-506) + `model_blob_dedup.rs` (SC-511) GREEN.

### Tests (RED)

- [X] T630 [P] [US1] Unit test in `crates/nexus-backend-runtimes/src/models_store/install.rs`: `install_model` for a new tuple inserts a row with `state = 'queued'` then transitions to `'ready'` after the mocked download completes.
- [X] T631 [P] [US1] Unit test in `crates/nexus-backend-runtimes/src/models_store/install.rs`: `install_model` for an existing `ready` tuple returns the existing row (no new insert).
- [X] T632 [P] [US1] Unit test in `crates/nexus-backend-runtimes/src/models_store/install.rs`: `install_model` called twice concurrently for the same new tuple results in exactly one row + one download invocation (second caller waits on the in-flight future).
- [X] T633 [P] [US1] Unit test in `crates/nexus-backend-runtimes/src/models_store/download.rs`: `download_and_verify` with a corrupted file returns `ModelStoreError::ChecksumMismatch { file, expected, actual }`; the row transitions to `state = 'failed'` (not `ready`).
- [X] T634 [P] [US1] Unit test in `crates/nexus-backend-runtimes/src/models_store/download.rs`: `download_and_verify` resumes via HTTP `Range` when a partial prefix exists and the mock source advertises `Accept-Ranges: bytes`.
- [X] T635 [P] [US10b] Unit test in `crates/nexus-backend-runtimes/src/models_store/blobs.rs`: writing two files with identical bytes via `materialize_blob` produces exactly one file under `$root/blobs/<sha[0:2]>/<sha>`; install trees contain two hardlinks to it.
- [X] T636 [P] [US10b] Unit test in `crates/nexus-backend-runtimes/src/models_store/blobs.rs`: on a target that rejects hardlinks, `materialize_blob` falls back to a symlink and emits a warn-log; correctness preserved.
- [X] T637 [P] [US10b] Unit test in `crates/nexus-backend-runtimes/src/models_store/blobs.rs`: `gc_blobs` removes blobs with zero references from non-`reclaimed` installs and leaves referenced blobs intact.

### Implementation

- [X] T638 [US1] Author `crates/nexus-backend-runtimes/src/models_store/errors.rs` with `ModelStoreError` (FR-516) — `thiserror::Error` enum, no `#[non_exhaustive]`.
- [X] T639 [US10b] Author `crates/nexus-backend-runtimes/src/models_store/blobs.rs`:
  - `materialize_blob(content_sha256, source_path, target_path) -> BackendRuntimeResult<()>` — moves source into `$root/blobs/<sha[0:2]>/<sha>` if absent; creates hardlink at `target_path` (symlink fallback + warn-log on ENOTSUP / cross-device).
  - `gc_blobs(pool: &SqlitePool) -> BackendRuntimeResult<GcReport>` — scans `blobs/`, cross-references against `host_model_installs.files_manifest` for rows where `state != 'reclaimed'`, removes unreferenced files.
- [X] T640 [US1] Author `crates/nexus-backend-runtimes/src/models_store/install.rs`:
  - `install_model(request: InstallModelRequest) -> BackendRuntimeResult<InstalledModelDto>` — compute identity, `BEGIN IMMEDIATE` + `INSERT ... ON CONFLICT DO NOTHING RETURNING`, spawn `download_and_verify` if newly inserted.
  - `uninstall_model(install_id) -> BackendRuntimeResult<()>` — returns `LeasedByExtensions` when active leases exist; removes install tree links (not blobs) and row otherwise; leaves blob GC to `gc_blobs`.
  - In-flight-download dedup via `DashMap<IdentityKey, Shared<...>>` (or `tokio::sync::broadcast`-per-tuple) so concurrent callers share one download.
- [X] T641 [US1] Author `crates/nexus-backend-runtimes/src/models_store/download.rs`:
  - Semaphore `Arc<Semaphore>` with permit count = `host.model_download_concurrency` (default 2).
  - `Range`-aware resume path + full-re-download fallback with warn-log (FR-510).
  - Per-file SHA-256 streaming verify during download; Merkle root over sorted file hashes → `sha256_root` column.
  - After verify, call `blobs::materialize_blob` per file and emit `files.json` manifest into `$install_root/files.json`.

### Verification

- [X] T642 [US1/US10b] T630–T637 GREEN. `model_install_dedup.rs` and `model_blob_dedup.rs` contract tests GREEN (SC-506, SC-511).

---

## Phase 5: US10a — Typed `Quantization` enum (P1)

**Goal**: Move quantization comparisons from string-compare to family-aware typed semantics. Prerequisite for the resolver tie-breaker in Phase 6.
**Independent test**: `quantization_matching.rs` contract test GREEN (SC-514).

### Tests (RED)

- [X] T645 [P] [US10a] Unit test in `crates/nexus-backend-runtimes/src/models_store/quantization.rs`: exact match beats family match beats no match — `Q4_K_M` install wins over `Q4_K_S` when dep asks `Q4_K_M`; `Q4_K_S` wins over `Q5_K_M` when dep asks `Q4_K_*`.
- [X] T646 [P] [US10a] Unit test in `crates/nexus-backend-runtimes/src/models_store/quantization.rs`: `NVFP4 != MXFP4` — distinct variants, no family collapse. Assert the comparator returns `MatchQuality::None` for this pair.
- [X] T647 [P] [US10a] Unit test in `crates/nexus-backend-runtimes/src/models_store/quantization.rs`: unknown string `"Q42_FOO"` deserializes to `Quantization::Other("Q42_FOO")` without panic; participates in exact-match only; emits a warn-log on first parse.
- [X] T648 [P] [US10a] Unit test in `crates/nexus-backend-runtimes/src/models_store/quantization.rs`: case-insensitive parse — `"q4_k_m"`, `"Q4_K_M"`, `"Q4_k_M"` all round-trip to `Quantization::Q4_K_M`.

### Implementation

- [X] T649 [US10a] Author `crates/nexus-backend-runtimes/src/models_store/quantization.rs`:
  - Closed enum `Quantization` with variants per FR-521: K-quant (`Q2_K`, `Q3_K_{S,M,L}`, `Q4_K_{S,M}`, `Q5_K_{S,M}`, `Q6_K`, `Q8_0`), legacy int (`Q4_0`, `Q4_1`, `Q5_0`, `Q5_1`), weight-only (`GPTQ4`, `GPTQ8`, `AWQ4`, `AWQ8`), float (`F16`, `BF16`, `F32`), sub-byte float (`NVFP4`, `MXFP4`, `MXFP6`, `MXFP8`, `FP8_E4M3`, `FP8_E5M2`), `Other(String)`.
  - `impl Display` + `impl FromStr` (case-insensitive for known variants; unknown → `Other`).
  - `impl Serialize` / `impl Deserialize` (warn-log on `Other` path).
  - `pub enum MatchQuality { Exact, Family, None }` + `fn match_quality(dep: &Option<Quantization>, install: &Option<Quantization>) -> MatchQuality`.
- [X] T650 [US10a] Re-export `Quantization` from `crates/nexus-extension/src/manifest/mod.rs` (`pub use nexus_backend_runtimes::models_store::quantization::Quantization;`) so manifest parse produces the typed value directly.

### Verification

- [X] T651 [US10a] T645–T648 GREEN. `quantization_matching.rs` contract GREEN (SC-514).

---

## Phase 6: US3 — `models_store::leases` (P1)

**Goal**: Cross-extension VRAM/load-slot coordination via host-owned lease table.
**Independent test**: `model_lease_budget.rs` + `model_uninstall_blocked_by_lease.rs` GREEN (SC-507, SC-508).

### Tests (RED)

- [X] T655 [P] [US3] Unit test in `crates/nexus-backend-runtimes/src/models_store/leases.rs`: `acquire_lease` on a 12GB device with 12GB already reserved returns `InsufficientResources { device, requested, available }` (SC-507 shape).
- [X] T656 [P] [US3] Unit test in `crates/nexus-backend-runtimes/src/models_store/leases.rs`: `acquire_lease` → `release_lease` round-trip; `list_active_leases(device)` reflects the state correctly at each step.
- [X] T657 [P] [US3] Unit test in `crates/nexus-backend-runtimes/src/models_store/leases.rs`: `uninstall_model` with an active lease returns `LeasedByExtensions { extensions }` listing the lessee extensions (SC-508).

### Implementation

- [X] T658 [US3] Author `crates/nexus-backend-runtimes/src/models_store/leases.rs`:
  - `acquire_lease(install_id, extension_id, device, vram_reserved_bytes) -> BackendRuntimeResult<ModelLease>` — sums `vram_reserved_bytes` over active leases on `device`, compares to device budget (pulled from host config or a pluggable `DeviceBudgetProvider`), inserts or errors.
  - `release_lease(lease_id) -> BackendRuntimeResult<()>` — sets `released_at = now()`.
  - `list_active_leases(device) -> BackendRuntimeResult<Vec<ModelLease>>` — single query, `released_at IS NULL`.

### Verification

- [X] T659 [US3] T655–T657 GREEN. Contract tests GREEN.

---

## Phase 7: US5 + US10c — `models_store::resolver` + dry-run (P1/P2)

**Goal**: Sub-100ms resolver with deterministic tie-breaker + a side-effect-free preview endpoint.
**Independent test**: `model_resolver_latency.rs` + `model_resolve_dry_run.rs` GREEN (SC-502, SC-513).

### Tests (RED)

- [X] T665 [P] [US5] Unit test in `crates/nexus-backend-runtimes/src/models_store/resolver.rs`: `check_model_dependencies` with 5 deps + 50 installs returns the correct partition `{ matched, missing, unsatisfiable }`; each `ModelDependency` appears in exactly one vec.
- [X] T666 [P] [US5] Unit test in `crates/nexus-backend-runtimes/src/models_store/resolver.rs`: tie-breaker determinism — two candidates differing only in `quantization` match quality → exact wins over family wins over none (consumes `Quantization::match_quality` from Phase 5); with all ties, `created_at DESC` wins.
- [X] T667 [P] [US5] Unit test in `crates/nexus-backend-runtimes/src/models_store/resolver.rs`: `min_params: 7B` + only a 3B install → reported under `unsatisfiable` with `UnsatisfiableReason::ParameterCountTooLow`.
- [X] T668 [US5] Latency bench in `crates/nexus-backend-runtimes/tests/model_resolver_latency.rs` (from T602): 1000 invocations with 50 installs + 5-dep manifest; assert P95 < 100ms (SC-502).
- [X] T669 [P] [US10c] Integration test in `crates/nexus-backend-runtimes/tests/model_resolve_dry_run.rs`: `resolve_dry_run` with previously-unknown deps produces a `ResolveReport` with `missing[*].estimated_bytes` populated; `(count(host_model_installs), count(blobs/**))` is unchanged before and after (SC-513).

### Implementation

- [X] T670 [US5] Author `crates/nexus-backend-runtimes/src/models_store/resolver.rs`:
  - `check_model_dependencies(deps: &[ModelDependency], pool: &SqlitePool, ctx: ResolutionContext) -> BackendRuntimeResult<ModelResolutionReport>`.
  - Single `SELECT` over `host_model_installs WHERE state = 'ready' AND (private_model = 0 OR owner_extension_id = $ctx_ext)` + in-Rust filter/sort using `Quantization::match_quality`. Avoid N+1 by pulling candidate set once.
  - Tie-breaker per FR-512.
- [X] T671 [US10c] Add `resolve_dry_run(deps: &[ModelDependency], pool: &SqlitePool, ctx: ResolutionContext) -> BackendRuntimeResult<ResolveReport>` in `crates/nexus-backend-runtimes/src/models_store/resolver.rs`:
  - Delegates to `check_model_dependencies` for the matched/missing/unsatisfiable partition.
  - For each `missing` dep, resolves upstream size via `provenance::probe_size` (HF head-request or direct-URL `HEAD`).
  - Computes `total_download_bytes`, `total_disk_bytes_after`, `estimated_vram_bytes_peak`.
  - Asserts no mutation: wrapped in an `assert_no_side_effects` test helper that snapshots row/blob counts around the call.

### Verification

- [X] T672 [US5/US10c] T665–T669 GREEN. Median + P95 + max for SC-502 recorded in the PR description.

---

## Phase 8: US4 + US6 + US12 — Manifest block + private-model flag + revision pinning (P1/P2)

**Goal**: Extension manifest declares typed deps; private installs get an escape hatch; every install is pinned to an immutable upstream revision.
**Independent test**: manifest parse + activation paths round-trip; SC-512 (`source_revision NOT NULL`) holds.

### Tests (RED)

- [X] T675 [P] [US4] Unit test in `crates/nexus-extension/src/manifest/model_dependencies.rs`: a valid `model_dependencies` YAML block (with `revision: <sha>`) parses into `Vec<ModelDependency>` with all fields populated.
- [X] T676 [P] [US4] Unit test in `crates/nexus-extension/src/manifest/model_dependencies.rs`: invalid YAML (e.g. `min_params: "notanumber"`) returns `ExtensionError::ManifestParse { path, detail }`.
- [X] T677 [P] [US12] Unit test in `crates/nexus-extension/src/manifest/model_dependencies.rs`: missing `revision` with `allow_unpinned: false` (default) → `ExtensionError::ManifestParse { detail: "revision required; set allow_unpinned: true to opt out" }`.
- [X] T678 [P] [US12] Unit test in `crates/nexus-extension/src/manifest/model_dependencies.rs`: `allow_unpinned: true` with no `revision` parses OK; install-time resolver records current upstream SHA into `host_model_installs.source_revision` and warn-logs.
- [X] T679 [P] [US12] Integration test in `crates/nexus-backend-runtimes/tests/model_install_dedup.rs` (extended): two manifests with same `(family, version, quantization)` but different `revision` produce two distinct rows (different `sha256_root`).
- [X] T680 [P] [US6] Integration test in `crates/nexus-backend-runtimes/tests/model_install_dedup.rs` (extended): extension A installs a private model; extension B's resolver does NOT match it even when `(family, version, quantization, revision)` are identical.
- [X] T681 [P] [US6] Integration test in `crates/nexus-backend-runtimes/tests/model_install_dedup.rs` (extended): uninstalling extension A schedules its private install for deletion; after the grace period with no active leases, the row transitions to `state = 'reclaimed'` and the install tree links are removed.

### Implementation

- [X] T682 [US4/US12] Author `crates/nexus-extension/src/manifest/model_dependencies.rs`:
  - `struct ModelDependency { family, version, revision: Option<String>, allow_unpinned: bool, min_params: Option<ParamCount>, quantization: Option<Quantization>, variant: Option<String>, required: bool }`.
  - `struct ParamCount(u64)` with `FromStr` for `"7B"`/`"13B"`/`"70B"`.
  - `serde::Deserialize` wiring; custom `deserialize_with` on `revision` that enforces `allow_unpinned = true` when absent; error path reuses `ExtensionError::ManifestParse`.
- [X] T683 [US4] Wire extension-activation path in `crates/nexus-extension/src/runtime/activation.rs` (or equivalent): on activation, call `check_model_dependencies` for declared deps; `required: true` missing/unsatisfiable aborts activation with a clear error; `required: false` returns `ModelResolution::Unresolved` to the runtime (US4.2).
- [X] T684 [US6] Implement `private_model = 1` path in `crates/nexus-backend-runtimes/src/models_store/install.rs`: when `request.private = true`, set `owner_extension_id = request.ext_id`; enforce resolver visibility filter (Phase 7's T670 already queries `private_model = 0 OR owner_extension_id = $ctx_ext`).
- [X] T685 [US6] Implement reclaim scheduler in `crates/nexus-backend-runtimes/src/models_store/install.rs` (`private_model_reclaim_grace`, default 24h) — a single background task per `nexus-backend-runtimes` instance that scans for reclaim-eligible private rows once per grace-period tick.
- [X] T686 [US12] Extend `install_model` in `crates/nexus-backend-runtimes/src/models_store/install.rs` to populate `source_revision`:
  - `source_kind = huggingface` → pin to the HF commit SHA (resolve `main` → SHA if `allow_unpinned = true`).
  - `source_kind = direct_url` → use `sha256_root` as revision.
  - `source_kind = local_import | bundled` → use `sha256_root` computed at ingest.

### Verification

- [X] T687 [US4/US6/US12] T675–T681 GREEN. Extension activation with a valid `model_dependencies` block (including revision) completes end-to-end against a seeded `host_model_installs`. SC-512 query returns 0 rows.

---

## Phase 9: US7 + US8 — Layout + download concurrency hardening (P2)

**Goal**: Canonical on-disk layout + central download semaphore.
**Independent test**: multi-file HF repo materializes correctly; 10 concurrent installs serialize to 2 downloads.

### Tests (RED)

- [X] T690 [P] [US7] Integration test in `crates/nexus-backend-runtimes/tests/model_layout.rs`: install an HF repo with 5 safetensors shards + `config.json` + tokenizer → `files.json` has 7 entries with per-file SHA-256, files live under canonical layout (hardlinked into `blobs/`) (US7.1).
- [X] T691 [P] [US7] Integration test in `crates/nexus-backend-runtimes/tests/model_layout.rs`: install a single-file GGUF → `files.json` has one entry (US7.2).
- [X] T692 [P] [US7] Integration test in `crates/nexus-backend-runtimes/tests/model_layout.rs`: corrupt a file post-install + call `verify_install` → row transitions to `state = 'corrupt'` (US7.3).
- [X] T693 [P] [US8] Integration test in `crates/nexus-backend-runtimes/tests/model_download_concurrency.rs`: spawn 10 concurrent installs against a mock source; at any instant, `list_install_tasks` has ≤ 2 rows with `state = 'downloading'` (US8.1).

### Implementation

- [X] T694 [US7] Add `verify_install(install_id) -> BackendRuntimeResult<()>` to `crates/nexus-backend-runtimes/src/models_store/mod.rs`; called opportunistically on lease acquire (US7.3). Re-hashes each file in `files.json` against the manifest; sets `state = 'corrupt'` on mismatch.
- [X] T695 [US8] Expose `host.model_download_concurrency` config key via `crates/nexus-backend-runtimes/src/models_store/mod.rs::ModelStoreConfig` + plumb into the semaphore at `models_store` init.

### Verification

- [X] T696 [US7/US8] T690–T693 GREEN.

---

## Phase 10: US9 + US10 + US10c-API + US11 sidebar-ready API — Provenance + exhaustive errors + HTTP wiring (P2)

**Goal**: Every install has traceable license + source; every error maps to a distinct HTTP status; HTTP surface is sufficient for the downstream host-app sidebar UI (FR-524).
**Independent test**: `host_models_contract.rs` GREEN (FR-515, FR-519, FR-520, FR-524); SC-509 license-coverage query returns 0.

### Tests (RED)

- [X] T700 [P] [US9] Unit test in `crates/nexus-backend-runtimes/src/models_store/provenance.rs`: HF-sourced install populates `license_spdx` + `license_url` from the model card when available (US9.1). Mock `nexus-huggingface` client.
- [X] T701 [P] [US9] Unit test in `crates/nexus-backend-runtimes/src/models_store/provenance.rs`: direct-URL install with user-supplied `license_spdx` persists it verbatim (US9.2).
- [X] T702 [P] [US9] Unit test in `crates/nexus-backend-runtimes/src/models_store/provenance.rs`: missing license resolves to `license_spdx = 'UNKNOWN'` + non-empty `provenance_note` (US9, edge case).
- [X] T703 [P] [US10] Unit test in `crates/nexus-api/src/handlers/backends/host_models.rs`: `http_status_for_model_error` is exhaustive — adding a new `ModelStoreError::Foo` variant produces a compile error (FR-517). Enforced by rustc, not a runtime assertion.
- [X] T704 [P] [US10] Unit test in `crates/nexus-api/src/handlers/backends/host_models.rs`: each variant maps to a distinct `(StatusCode, code: &'static str)` pair per FR-517.
- [X] T705 [P] [FR-524] Contract test in `crates/nexus-api/tests/host_models_contract.rs`: `GET /api/v1/host-runtimes` and `GET /api/v1/host-models` both return flat host-scoped lists (no required `extension_id` filter param); a private model owned by ext-A is omitted from the response when the caller is not ext-A. Asserts the DTO shape is sufficient for a downstream UI to render two independent sidebar menus.
- [X] T706 [P] [US10c] Contract test in `crates/nexus-api/tests/host_models_contract.rs`: `POST /api/v1/host-models/resolve` returns a valid `ResolveReportDto` and leaves `(count(host_model_installs), count(blobs/**))` unchanged (SC-513 end-to-end at the HTTP layer).

### Implementation

- [X] T707 [US9] Author `crates/nexus-backend-runtimes/src/models_store/provenance.rs`:
  - `fetch_hf_metadata(repo_id, revision) -> BackendRuntimeResult<HfModelMetadata>` — thin wrapper over `nexus-huggingface`, pinned to the requested revision (US12).
  - `resolve_license(source_kind, request, hf_metadata) -> LicenseInfo` with fallback to `UNKNOWN` + required `provenance_note`.
  - `probe_size(source_kind, source_url, revision) -> BackendRuntimeResult<u64>` — HF file-metadata head or HTTP `HEAD`, consumed by `resolve_dry_run` (Phase 7 T671).
- [X] T708 [US9] Extend `InstalledModelDto` in `crates/nexus-api/src/dtos/host_models.rs` to include `license_spdx`, `license_url`, `source_url`, `source_kind`, `sha256_root`, `source_revision` (FR-515, FR-518 — additive, source-compatible).
- [X] T709 [US10c] Add `ResolveRequestDto` + `ResolveReportDto` to `crates/nexus-api/src/dtos/host_models.rs` per FR-520.
- [X] T710 [US10] Author `crates/nexus-api/src/handlers/backends/host_models.rs::http_status_for_model_error` as an exhaustive match over `ModelStoreError`; arms:
  - `InstallNotFound` → 404, `MODEL_INSTALL_NOT_FOUND`
  - `LeasedByExtensions` → 409, `MODEL_LEASED_BY_EXTENSIONS`
  - `ChecksumMismatch` → 422, `MODEL_CHECKSUM_MISMATCH`
  - `InsufficientResources` → 409, `MODEL_INSUFFICIENT_VRAM`
  - `SourceUnreachable` → 502, `MODEL_SOURCE_UNREACHABLE`
  - `ManifestInvalid` → 400, `MODEL_MANIFEST_INVALID`
  - `Storage` → 500, `STORAGE_ERROR`
  - `Io` → 500, `IO_ERROR`
- [X] T711 [US9/US10/US10c/FR-524] Author `crates/nexus-api/src/handlers/backends/host_models.rs`:
  - `GET /api/v1/host-models` → `list_host_models` (single query, respects `private_model` visibility; no extension-scope filter required — FR-524).
  - `POST /api/v1/host-models` → `install_model` (consumes existing `InstallModelRequestDto`).
  - `DELETE /api/v1/host-models/{install_id}` → `uninstall_model`.
  - `POST /api/v1/host-models/{install_id}/leases` + `DELETE /api/v1/host-models/leases/{lease_id}` (FR-519).
  - `POST /api/v1/host-models/resolve` → `resolve_dry_run` (FR-520).

### Verification

- [X] T712 [US9/US10/US10c] T700–T706 GREEN; `host_models_contract.rs` GREEN (FR-515, FR-519, FR-520, FR-524). License-coverage query `SELECT COUNT(*) FROM host_model_installs WHERE state = 'ready' AND (license_spdx IS NULL OR (license_spdx = 'UNKNOWN' AND (provenance_note IS NULL OR provenance_note = '')))` returns 0 (SC-509).

### Observability (cross-cutting — covers spec 017 surface AND pre-existing handlers)

Motivation: current `tower_http::trace::on_failure` output (`classification=Status code: 500 ... latency=7 ms`) tells an operator a request failed but not *why*. Reproduced on `GET /api/v1/llm/backends/llama.cpp/load-state`. Spec 017 adds several new 500-capable paths (download verify, blob materialize, HF metadata fetch); shipping them without structured error context would compound the problem.

- [X] T713 [P] Add structured-error logging helper `log_handler_error(err: &impl std::error::Error, route: &str, request_id: Option<&str>)` in `crates/nexus-api/src/handlers/errors.rs` (or the equivalent post-016 location) that:
  - Emits a `tracing::error!` event with fields `route`, `request_id`, `error.kind`, `error.code`, `error.detail` (via `std::error::Error::source()` chain walked to depth ≤ 5).
  - On release builds, includes the error chain summary; on debug builds, additionally includes `std::backtrace::Backtrace::capture()` when `RUST_BACKTRACE=1`.
  - Never leaks the formatted message to the HTTP response body — only to logs.
- [X] T714 [P] Wire `log_handler_error` from every `http_status_for_model_error` call site in `crates/nexus-api/src/handlers/backends/host_models.rs` (T710/T711) AND from the existing `http_status_for` runtime-error mapper in `crates/nexus-api/src/handlers/backends/host_runtimes.rs` so that every 4xx/5xx response carries a matching structured log line.
- [X] T715 Replace the default `tower_http::trace::TraceLayer::new_for_http()` layer registration in `crates/nexus-api/src/router.rs` (or equivalent after spec 016) with a customized builder:
  - `.on_failure(DefaultOnFailure::new().level(Level::ERROR).latency_unit(LatencyUnit::Millis))` kept for envelope data.
  - New `.on_response(|response, latency, span| { if response.status().is_server_error() { tracing::error!(status = %response.status(), latency_ms = latency.as_millis(), "5xx response — see earlier error event for details"); } })` so a 5xx always produces *both* the classification line AND the upstream error event linked by span/request-id.
- [X] T716 [P] Integration test in `crates/nexus-api/tests/error_logging.rs`: trigger a `500` from a deliberate fault (e.g. stub `ModelStoreError::Storage(...)`) and assert that the captured `tracing` subscriber received (a) a structured `error.code = STORAGE_ERROR` event with a non-empty `error.detail`, and (b) the `tower_http` classification line — i.e. both appear, not one-or-the-other. Also covers the `llm/backends/.../load-state` regression by asserting the same invariants on a forced runtime-store fault.
- [X] T717 [P] Verify the fix on the original failing endpoint: reproduce `GET /api/v1/llm/backends/llama.cpp/load-state` with `RUST_LOG=nexus=debug,tower_http=info`; confirm the log now contains a typed `error.code` and a `error.detail` line for the 500. Record the before/after log snippet in the PR description.

---

## Phase 11: Polish & Cross-Cutting

- [X] T720 Remove the `pub use runtime_installs_store as installs_store;` shim from `crates/nexus-backend-runtimes/src/lib.rs`. Migrate any remaining `installs_store::*` call sites — `cargo check --workspace` surfaces them.
- [X] T721 [P] Update `crates/nexus-backend-runtimes/README.md` with new §"Model store" covering schema, resolver, leases, download concurrency, blobs/CAS, private-model flag, revision pinning.
- [X] T722 [P] Update `crates/nexus-api/README.md` with new §"Host-model endpoints" (list, install, uninstall, leases, resolve-dry-run). Note the sidebar-ready shape (FR-524) for downstream UI consumers.
- [X] T723 [P] Update `crates/nexus-extension/README.md` §"Manifest reference" with the `model_dependencies` schema including `revision` and `allow_unpinned`.
- [X] T724 [P] Update root `README.md` "Recent Changes" to link spec 017.
- [X] T725 Final verification: `cargo fmt --check`, `cargo clippy --workspace --all-targets -- -D warnings`, `cargo test --workspace`. Assert:
  - SC-503 (≤350 LOC per submodule incl. `blobs.rs` and `quantization.rs`).
  - SC-504 (grep for `installs_store` outside `runtime_installs_store` and `models_store` returns zero).
  - SC-510 (grep for silent `let _ =.*\.await` in `models_store/` returns zero outside tests).
  - SC-512 (`source_revision` populated on every row).

---

## Dependencies

```text
Phase 1 (baseline + RED contracts)
        │
        ▼
Phase 2 (US2: rename)
        │
        ▼
Phase 3 (US1: schema)
        │
        ▼
Phase 4 (US1 + US10b: install + download + blobs) ──┐
        │                                            │
        ▼                                            │
Phase 5 (US10a: Quantization enum) ──────────────────┤
        │                                            │
        ▼                                            │
Phase 6 (US3: leases) ◄──────────────────────────────┘
        │
        ▼
Phase 7 (US5 + US10c: resolver + dry-run)
        │
        ▼
Phase 8 (US4 + US6 + US12: manifest + private + revision)
        │
        ▼
Phase 9 (US7 + US8: layout + concurrency hardening)
        │
        ▼
Phase 10 (US9 + US10 + FR-524: provenance + errors + API wiring)
        │
        ▼
Phase 11 (polish: shim removal + docs)
```

Phases 4/5 and 9/10 are candidates for concurrent PRs (Principle X) once upstream deps land.

## Parallel Execution Examples

- **Phase 1**: T602 is a single-author batch but each contract-test skeleton file is independent and can be written in parallel by multiple contributors.
- **Phase 4**: T630–T637 (unit tests) are all `[P]` — different files or independent test modules. Implementation tasks T638–T641 split cleanly across `errors.rs`, `blobs.rs`, `install.rs`, `download.rs`.
- **Phase 5**: T645–T648 are `[P]`; all live in `quantization.rs` but test distinct behaviors.
- **Phase 7**: T665–T669 `[P]` for tests; implementation in `resolver.rs` is one file so T670/T671 are sequential.
- **Phase 8**: T675–T681 `[P]` across manifest, install, and resolver layers.
- **Phase 10**: T700–T706 `[P]` across provenance, handler, and contract-test files.
- **Phase 11**: T721–T724 README updates are all `[P]`.

## Implementation Strategy — MVP and Incremental Delivery

- **MVP (P1 only)**: Phases 2–7 = US2 + US1 + US10a + US3 + US5 + US10c-resolver-only + US4 + US12 (~35 tasks).
  - Delivers: renamed runtime store, host-owned model table with content-addressed blobs + revision pinning, typed quantization, VRAM leases, resolver with dry-run, manifest block with required revision.
  - Enables extension authors to declare deps and have the host satisfy them correctly and deterministically.
- **Increment 1 (P2: US6, US7, US8)**: private-model escape hatch, HF canonical layout tests, download-concurrency hardening (~15 tasks).
- **Increment 2 (P2: US9, US10, US10c-HTTP, FR-524)**: provenance, exhaustive errors, HTTP wiring including `/resolve` endpoint, sidebar-ready API surface (~12 tasks).
- **Increment 3 (Polish)**: shim removal, docs, final SC checks (~6 tasks).

## Task Summary

- **Total tasks**: ~69 (T601–T725, incl. T713–T717 observability)
- **Parallel opportunities**: ~28 `[P]` tasks (RED-test authoring, independent submodule extractions, README updates).
- **User-story coverage**: US1, US2, US3, US4, US5, US6, US7, US8, US9, US10, US10a, US10b, US10c, US12 all mapped to tasks with at least one RED test and one implementation task each.
- **Independent test criteria**:
  - US1: `model_install_dedup.rs`
  - US2: `grep` invariant after Phase 11
  - US3: `model_lease_budget.rs` + `model_uninstall_blocked_by_lease.rs`
  - US4: manifest parse unit tests
  - US5: `model_resolver_latency.rs` P95 < 100ms
  - US6: private-visibility integration test
  - US7: `model_layout.rs`
  - US8: `model_download_concurrency.rs`
  - US9: license-coverage query = 0
  - US10: compile-time exhaustive match
  - US10a: `quantization_matching.rs`
  - US10b: `model_blob_dedup.rs`
  - US10c: `model_resolve_dry_run.rs`
  - US12: `source_revision NOT NULL` query
- **MVP scope**: Phases 2–7 (P1 user stories only); delivers a fully functional host-managed model store without private-model support, advanced layout tests, provenance audit, or the HTTP surface — enough to unblock extension authors internally.
