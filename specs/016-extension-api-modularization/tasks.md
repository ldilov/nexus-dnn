# Tasks: Extension + API Modularization

**Input**: Design documents from `/specs/016-extension-api-modularization/`
**Prerequisites**: spec.md, plan.md; recommend landing specs 014 and 015 first (not hard deps)
**Tests**: existing `nexus-extension` + `nexus-api` suites are the safety net (Principle VI(b)). New tests added for US4 (discover_and_activate), US7 (N+1 via query counter), US8 (exhaustive match, warn log).

## Sequencing invariant

Per Principle IX. Recommended order: US1 (registry file moves) → US2 (semver swap) → US3 (scanner DRY) → US4 (POLA fix) → US5 (backends file moves) → US6 (create_lease split) → US7 (N+1 fix) → US8 (exhaustive + warn log).

---

## Phase 1: Baseline

- [X] T501 Capture baseline: `cargo test -p nexus-extension -p nexus-api --tests` → 149 passed / 0 failed across 9 test binaries.

---

## Phase 2: US1 — `registry.rs` file split (P1)

- [X] T510 Create `crates/nexus-extension/src/registry/` directory; move `registry.rs` → `registry/mod.rs`.
- [X] T511 [P] [US1] Extract `registry/types.rs` (DiscoveryReport, ExtensionStatus + impl, LayoutFile, ActivatedExtension, RegistryState).
- [X] T512 [P] [US1] Extract `registry/scanner.rs` (scan_extensions_dir, scan_builtin_dir, read_extension_dirs, process_extension, process_builtin_extension, rebuild_operator_entries, activate_extension_inner).
- [X] T513 [P] [US1] Extract `registry/loaders.rs` (load_operators, load_recipes, load_ui_contributions, load_layouts, yaml_to_json_value, yaml_to_json_value_for_operator).
- [X] T514 [P] [US1] Extract `registry/storage_validation.rs` (validate_storage_contribution, validate_storage_sql_files).
- [X] T515 [P] [US1] Extract `registry/version_conflict.rs` (detect_intra_manifest_conflicts + VersionInterval et al — semver swap happens in Phase 3).

### Verification

- [X] T516 [US1] `cargo test -p nexus-extension --tests` GREEN; every submodule ≤ 350 LOC.

---

## Phase 3: US2 — `VersionInterval` → `semver::VersionReq` + `LlamaCppBuildReq` (P1)

### Tests (write first — RED)

- [X] T520 [P] [US2] Unit tests in `version_conflict.rs` for existing conflict cases: `[">=b5000", "<b4500"]` → conflict, `[">=b4000", ">=b4970"]` → no conflict, `[">=1.0.0", "<2.0.0"]` → no conflict (semver-happy path).
- [X] T521 [P] [US2] Unit tests for `LlamaCppBuildReq`: parse `>=b4970` / `<b5000` / `=b4970`; `overlaps` / `contains(&str)` helpers.

### Implementation

- [X] T522 [US2] Add `LlamaCppBuildReq` pub(crate) struct in `version_conflict.rs` (≤ 40 LOC per spec US2 edge case): parses `^(>=|<=|=|<|>)?b(\d+)$` with `regex-lite` (already a workspace dep in `nexus-extension/Cargo.toml`); stores `(Op, u64)` where operator-less form means `Op::Eq`. `fn overlaps(&self, other: &Self) -> bool` = classical half-open interval intersection over u64 build numbers; `fn contains(&self, build: u64) -> bool` = direct comparator evaluation.
- [X] T523 [US2] Rewrite `detect_intra_manifest_conflicts`: try `semver::VersionReq::parse` first; on parse error, fall back to `LlamaCppBuildReq::parse`; if BOTH parsers fail, return `ExtensionError::ManifestParse { path: <manifest path>, detail: <offending range + both parser errors> }` per FR-403 (variant already exists in `crates/nexus-extension/src/error.rs`). Overlap check uses `VersionReq::matches(&candidate_versions)` or `LlamaCppBuildReq::overlaps`. Candidate set for `VersionReq::matches` = build numbers present in `host_runtime_installs` at evaluation time (deterministic runtime source).
- [X] T524 [US2] Delete `VersionInterval`, `intervals_all_overlap`, `pair_overlaps`, `value_in_interval`, `choose_tighter_lower`, `choose_tighter_upper`.

### Verification

- [X] T525 [US2] All existing + new conflict tests GREEN; grep for `VersionInterval` in `crates/nexus-extension/src/` returns zero hits.

---

## Phase 4: US3 — Scanner DRY (P2)

- [X] T530a [US3] **Reconcile signatures first**: read `process_extension(path: &Path, host_version: &Version, protocol_version: &Version)` and `process_builtin_extension` current signatures in `registry/scanner.rs`; pick the lowest-common-denominator argument shape (likely `(&Path, &Version, &Version)`) before authoring the helper. Document the chosen `F` shape as a single-line comment above the helper.
- [X] T530b [US3] Add `scan_dir_with<F>(dir: &Path, host_version: &Version, protocol_version: &Version, process_fn: F, label: &'static str) -> Result<ScanResult, ExtensionError>` in `registry/scanner.rs` where `F: Fn(&Path, &Version, &Version) -> Result<Option<(ActivatedExtension, Vec<(String, OperatorDefinition)>)>, ExtensionError>` (final shape pinned by T530a).
- [X] T531 [US3] Rewrite `scan_extensions_dir` and `scan_builtin_dir` as 10-to-15 LOC delegators passing `process_extension` / `process_builtin_extension` respectively.

### Verification

- [X] T532 [US3] `cargo test -p nexus-extension --tests` GREEN.

---

## Phase 5: US4 — `discover_and_activate` POLA fix (P2)

Decision locked per spec.md US4: **branch (a)** — perform real discovery via `refresh`. Trait signature unchanged.

### Tests (write first — RED)

- [X] T540 [P] [US4] Integration test `crates/nexus-extension/tests/discover_and_activate_scans_dir.rs::scans_new_extension`: empty registry + populated temp `extensions_dir` with one valid extension → call `discover_and_activate(dir, host_v, proto_v)` → assert new extension present in `list_extensions()` AND in the returned `DiscoveryReport.activated`.
- [X] T541 [P] [US4] Integration test `discover_and_activate_scans_dir.rs::idempotent_re_invocation`: pre-load registry with extension A; drop extension B into `extensions_dir`; re-invoke `discover_and_activate`; assert {A, B} present, no duplicate, no removal.

### Implementation

- [X] T542 [US4] In `registry/mod.rs::ExtensionRegistry for InMemoryExtensionRegistry::discover_and_activate` (async trait method), replace the current ignore-args body with `let report = self.refresh(extensions_dir, host_version, protocol_version)?; Ok(report)`. Note: `refresh` is a **synchronous** `pub fn` — no `.await`. If FS scanning becomes a blocking concern inside the async context later, wrap with `tokio::task::spawn_blocking` in a follow-up; not required for this spec. Trait signature preserved per US4 acceptance scenario 3.

### Verification

- [X] T543 [US4] Both new tests GREEN; `cargo check -p nexus-core -p nexus-api` passes without edits to callers.

---

## Phase 6: US5 — `handlers/backends.rs` file split (P1)

- [X] T550 Create `crates/nexus-api/src/handlers/backends/` directory; move `backends.rs` → `backends/mod.rs`.
- [X] T551 [P] [US5] Extract `backends/catalog.rs` (list, detail, BackendSummary, BackendListResponse, BackendSummaryChips).
- [X] T552 [P] [US5] Extract `backends/lifecycle.rs` (install, validate, repair, InstallBody, InstallResponse).
- [X] T553 [P] [US5] Extract `backends/settings.rs` (get_settings, put_settings).
- [X] T554 [P] [US5] Extract `backends/observability.rs` (logs, diagnostics, LogQuery, LogsResponse, DiagnosticsResponse).
- [X] T555 [P] [US5] Extract `backends/host_runtimes.rs` (list_host_runtimes, parameter_catalog, HostRuntimeInstallView, HostRuntimesResponse).
- [X] T556 [P] [US5] Extract `backends/lease.rs` (create_lease, release_lease, uninstall_runtime + helpers).
- [X] T557 [US5] `mod.rs` retains registry, map_error, unwired, impl_status_str, ulid_lite, extension_from_headers + re-exports.

### Verification

- [X] T558 [US5] `cargo test -p nexus-api --tests` GREEN; every submodule ≤ 300 LOC.

---

## Phase 7: US6 — `create_lease` split (P2)

- [X] T560 [US6] In `backends/lease.rs`, extract:
  - `fn validate_install_for_lease<'a>(row: Option<&'a RuntimeInstallRow>) -> Result<&'a RuntimeInstallRow, ApiError>` (~20 LOC) — returns a typed `ApiError` (existing in `nexus-api::error`); the calling handler maps via `?` + `IntoResponse`. Helper does NOT depend on `axum::Response` (per analyze pass M3).
  - `fn build_spawn_request(extension_id: String, install_id: String, body: LeaseBody) -> SpawnRuntimeRequest` (~15 LOC)
  - `fn stub_lease(install_id: String, extension_id: String, body: LeaseBody) -> LeaseEnvelope` (~25 LOC)
  - If `nexus-api::error::ApiError` does not exist, sub-task T560a authors a minimal typed-error enum + `IntoResponse` impl in `crates/nexus-api/src/error.rs` before T560 lands.
- [X] T561 [US6] Rewrite `create_lease` to orchestrate the three helpers; body ≤ 40 LOC.

### Verification

- [X] T562 [US6] `cargo test -p nexus-api --test host_backends_lease_contract` GREEN.

---

## Phase 8: US7 — N+1 query fix (P2)

### Tests (write first — RED)

- [X] T570 [US7] Integration test `crates/nexus-api/tests/list_host_runtimes_query_count.rs`: wrap a test pool with a query counter middleware; seed 5 installs + 3 dependent extensions; call `GET /api/v1/host-runtimes`; assert query count = 2 (one list + one batched dependents).

### Implementation

- [X] T571 [US7] Add `installs_store::list_all_with_dependents(pool: &SqlitePool) -> BackendRuntimeResult<Vec<(RuntimeInstallRow, Vec<String>)>>` using one LEFT JOIN query against `host_runtime_leases` (the actual dependents source — current `list_dependents` walks `host_runtime_leases WHERE released_at IS NULL`). Reference SQL: `SELECT i.*, l.extension_id FROM host_runtime_installs i LEFT JOIN host_runtime_leases l ON l.install_id = i.install_id AND l.released_at IS NULL ORDER BY i.install_id, l.extension_id`. Aggregate consecutive `(install_row, extension_id)` rows in Rust into `Vec<(RuntimeInstallRow, Vec<String>)>` with deduplication of `extension_id`s per install.
- [X] T572 [US7] Rewrite `backends/host_runtimes.rs::list_host_runtimes` to call the batched helper; drop the per-install `list_dependents` call inside the loop.

### Verification

- [X] T573 [US7] New test GREEN; all existing `host-runtimes` tests still GREEN.

---

## Phase 9: US8 — Exhaustive match + warn log (P2)

### Tests (write first — RED)

- [X] T580 [P] [US8] Unit test in `spawn/mod.rs` (or wherever `http_status_for` ends up in spec 015's split) asserting every current `BackendRuntimeError` variant maps to a distinct non-500 code where applicable; no `_ =>` wildcard.
- [X] T581 [P] [US8] Unit test in `backends/lease.rs::uninstall_runtime` covering the `remove_binary_directory` failure path: use a read-only temp dir or pre-deleted path; assert `tracing::warn!` with `install_id`, `path`, `error` captured via `tracing_test`.

### Implementation

- [X] T582 [US8] Make `http_status_for` exhaustive: replace `_ => (500, "INTERNAL", error.to_string())` with explicit arms for every current variant. A new variant then requires touching this function.
- [X] T583 [US8] In `uninstall_runtime`, replace `let _ = remove_binary_directory(path).await;` with `if let Err(e) = remove_binary_directory(&path).await { tracing::warn!(install_id = %install_id, path = %path.display(), error = %e, "remove_binary_directory failed") }`.

### Verification

- [X] T584 [US8] Tests GREEN; grep for `let _ =.*\.await` in `crates/nexus-api/src/` returns zero hits outside tests.

---

## Phase 10: Polish

- [X] T590 [P] Update `crates/nexus-extension/README.md` §"Registry module layout" + §"Conflict detection (semver + llama.cpp build numbers)".
- [X] T591 [P] Update `crates/nexus-api/README.md` §"Backends handler submodules".
- [X] T592 [P] Update root `README.md` "Recent Changes" to link spec 016.
- [X] T593 Final verification: `cargo fmt --check`, `cargo clippy --workspace --all-targets -- -D warnings`, `cargo test --workspace`, and SC-401/SC-404/SC-406 grep checks.

---

## Dependencies

```text
Phase 1 (baseline) ──► Phase 2 (registry moves) ──► Phase 3 (semver swap)
                                                         │
                                                         ▼
                                                   Phase 4 (scanner DRY)
                                                         │
                                                         ▼
                                                   Phase 5 (discover_and_activate)
                                                         │
                                                         ▼
                                                   Phase 6 (backends moves)
                                                         │
                                                         ▼
                                                   Phase 7 (create_lease split) ── Phase 8 (N+1) ── Phase 9 (exhaustive + warn) ──► Phase 10 (polish)
```

## Task Summary

- **Total tasks**: 38 (T501–T593)
- **Parallel opportunities**: 13 `[P]` tasks
- **MVP (P1 only)**: US1 + US2 + US5 = 18 tasks
