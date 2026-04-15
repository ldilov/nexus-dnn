# Feature Specification: Extension + API Handler Modularization

**Feature Branch**: `016-extension-api-modularization`
**Created**: 2026-04-15
**Status**: Draft
**Input**: Close Principle III and Principle I gaps flagged by `/rust-review` in `nexus-extension` and `nexus-api`. Split `registry.rs` (1069 LOC) and `handlers/backends.rs` (845 LOC) into domain submodules. Replace the 155-LOC custom `VersionInterval` with `semver::VersionReq` (Ecosystem-First). Fix near-duplicate `scan_extensions_dir` / `scan_builtin_dir` (DRY). Tighten `http_status_for` exhaustive match, fix `discover_and_activate` POLA violation, fix `let _ = remove_binary_directory` silent error, replace `list_host_runtimes` N+1 query with a JOIN.

## Executive Summary

Two files in the extension + API layers violate the file-size soft limit. Both carry secondary issues surfaced by `/rust-review`:

- `registry.rs` has a 155-LOC custom `VersionInterval` + overlap-detection implementation that duplicates `semver::VersionReq` (already a workspace dep).
- `registry.rs` has near-duplicate `scan_extensions_dir` and `scan_builtin_dir` functions that differ only in a single `process_*` call and a log message.
- `registry.rs::discover_and_activate` is a trait method that takes `extensions_dir`, `host_version`, `protocol_version` and **ignores all three**, returning already-loaded IDs — a POLA violation.
- `registry.rs::process_extension` mixes CQS (reads FS + assigns `ExtensionStatus` based on `validation_errors`) — name misleads.
- `backends.rs::create_lease` is 118 LOC mixing validation, request-building, and stub fallback.
- `backends.rs::list_host_runtimes` does N+1 queries (calls `list_dependents` in a loop).
- `backends.rs::uninstall_runtime` uses `let _ = remove_binary_directory(...)` silencing I/O errors.
- `spawn.rs::http_status_for` has a `_ =>` wildcard hiding new `BackendRuntimeError` variants.

## Architectural Intent

### Core principles applied

- **Ecosystem-First (Principle I)**: `semver::VersionReq` replaces the custom 155-LOC interval implementation.
- **Linguistic-Modular-Units (Appendix A)**: `registry/{scanner,loaders,storage_validation,version_conflict,types}.rs` and `backends/{catalog,lifecycle,settings,observability,host_runtimes,lease}.rs` each own one domain.
- **DRY (Principle II)**: extract `scan_dir_with<F>` covering both scanner functions.
- **POLA (Principle II)**: `discover_and_activate` either performs real discovery or is renamed to reflect its actual behavior.
- **Exhaustive matches (Appendix B)**: remove `_ =>` from `http_status_for`.

### Non-goals

- `ExtensionRegistry` trait surface changes are out of scope. If `discover_and_activate`'s contract must change, it changes behavior only, not signature.
- No UI/frontend changes — the HTTP surface and error envelopes are unchanged.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — `registry.rs` splits into five domain submodules (Priority: P1)

As a maintainer tracking a discovery bug, I open `registry/scanner.rs` and see only the scanning logic.

**Independent Test**: `wc -l crates/nexus-extension/src/registry/*.rs` all ≤ 350 LOC. `cargo test -p nexus-extension` passes.

**Acceptance Scenarios**:

1. **Given** the split, **When** `registry/mod.rs` is read, **Then** it contains `InMemoryExtensionRegistry`, `RegistryState`, the trait impl, and the public methods (`from_directory`, `enable_extension`, `disable_extension`, `refresh`, `scan_builtin_extensions_dir`, `activate_builtin_extension`).
2. **Given** `registry/scanner.rs`, **Then** it owns `scan_extensions_dir`, `scan_builtin_dir`, `read_extension_dirs`, `process_extension`, `process_builtin_extension`, `activate_extension_inner`, `rebuild_operator_entries`, AND the new `scan_dir_with<F>` helper.
3. **Given** `registry/version_conflict.rs`, **Then** it owns `detect_intra_manifest_conflicts` using `semver::VersionReq` — no `VersionInterval` type.

### User Story 2 — Custom `VersionInterval` replaced by `semver::VersionReq` (Priority: P1)

As a contributor maintaining the intra-manifest conflict detector, I use the workspace's existing `semver` crate instead of 155 lines of custom interval math.

**Independent Test**: `VersionInterval`, `intervals_all_overlap`, `pair_overlaps`, `value_in_interval`, `choose_tighter_lower`, `choose_tighter_upper` are all deleted. `detect_intra_manifest_conflicts` uses `semver::VersionReq::parse` + an overlap check on sample candidates from `host_runtime_installs`. All existing conflict-detection tests pass.

**Acceptance Scenarios**:

1. **Given** `semver::VersionReq::parse(">=b5000")`, **When** the parse fails (llama.cpp build numbers are not semver), **Then** the function falls back to documented string-comparison logic in a new `LlamaCppBuildReq` helper (self-contained, < 40 LOC) — the custom interval logic is not retained outside that helper.
2. **Given** two conflicting ranges for the same family, **When** `detect_intra_manifest_conflicts` runs, **Then** it returns `ExtensionError::RuntimeDependencyConflict` naming both ranges.
3. **Given** the existing tests for intra-manifest conflict, **When** run against the refactored code, **Then** all pass without modification.

### User Story 3 — `scan_extensions_dir` / `scan_builtin_dir` deduplicated (Priority: P2)

**Independent Test**: A single `scan_dir_with<F>(dir, host_version, protocol_version, process_fn: F, label: &'static str)` helper exists; both scanner entry points are ≤ 15 LOC each, calling the helper with different `process_fn`.

**Acceptance Scenarios**:

1. **Given** the helper exists, **When** called, **Then** both scanner entry points produce identical `DiscoveryReport` shapes to their pre-refactor versions.
2. **Given** a new scanner variant (hypothetical `scan_external_dir`), **Then** it can be added as a 10-LOC function calling `scan_dir_with` with a new `process_fn`.

### User Story 4 — `discover_and_activate` POLA fix (Priority: P2)

**Independent Test**: When called with a non-empty `extensions_dir` that contains a new extension, the function actually discovers and activates it (not returns already-loaded IDs).

**Decision (per analyze-pass H1)**: Branch (a) — perform real discovery via `refresh`. Branch (b) (rename + signature trim) was rejected because it breaks `ExtensionRegistry` trait LSP and cascades through `nexus-core` and `nexus-api` callers. Preserving the trait contract while fixing the behavior is strictly less invasive.

**Acceptance Scenarios**:

1. **Given** an empty registry + a populated `extensions_dir`, **When** `discover_and_activate(dir, host_version, proto_version)` is called, **Then** the registry state reflects the newly scanned extensions and the returned `DiscoveryReport` lists them under `activated`.
2. **Given** a partially-populated registry + a new extension dropped into `extensions_dir`, **When** `discover_and_activate` is re-invoked, **Then** the new extension joins the existing set without removing or duplicating prior entries (idempotent over already-known IDs).
3. **Given** the trait signature `discover_and_activate(dir, host_version, protocol_version) -> Result<DiscoveryReport, ExtensionError>`, **Then** it remains unchanged after the fix; downstream callers compile without edits.

### User Story 5 — `handlers/backends.rs` splits into six submodules (Priority: P1)

**Independent Test**: `wc -l crates/nexus-api/src/handlers/backends/*.rs` all ≤ 300 LOC. `cargo test -p nexus-api --tests` passes.

**Acceptance Scenarios**:

1. **Given** the split, **When** `backends/mod.rs` is read, **Then** it contains `registry`, `map_error`, `unwired`, `impl_status_str`, `ulid_lite` helpers + re-exports.
2. **Given** `backends/catalog.rs`, **Then** it owns `BackendSummary`, `BackendListResponse`, `BackendSummaryChips`, `list`, `detail`.
3. **Given** `backends/lease.rs`, **Then** it owns `create_lease`, `release_lease`, `uninstall_runtime`, `LeaseBody`, `LeaseEnvelope`, `UninstallQuery`, `spawn_error_response`, `collect_uninstall_blockers`, `block_if_dependents`, `drain_leases`.

### User Story 6 — `create_lease` method split (Priority: P2)

**Independent Test**: `create_lease` body is ≤ 40 LOC (orchestrator only). Extracted helpers: `validate_install_for_lease`, `build_spawn_request`, `stub_lease`.

**Acceptance Scenarios**:

1. **Given** the split, **When** `create_lease` is read, **Then** it reads as a sequence of named helper calls with `?`-propagation.

### User Story 7 — `list_host_runtimes` N+1 fix (Priority: P2)

**Independent Test**: `list_host_runtimes` issues exactly 2 queries (one LIST, one JOINed dependents batch), regardless of the number of installs.

**Acceptance Scenarios**:

1. **Given** 20 installs with varying dependent counts, **When** `list_host_runtimes` is called, **Then** query count (via `sqlx` trace / captured logs) is 2.
2. **Given** the new `installs_store::list_all_with_dependents(pool) -> Vec<(RuntimeInstallRow, Vec<String>)>` (or equivalent batched version), **When** used, **Then** `backends.rs` calls it instead of looping.

### User Story 8 — Silenced errors cleaned (Priority: P2)

**Independent Test**:

- `uninstall_runtime` logs `tracing::warn!(install_id, path, error)` when `remove_binary_directory` fails, rather than discarding the result.
- `http_status_for` is exhaustive — removing a `BackendRuntimeError` variant produces a compile error.

**Acceptance Scenarios**:

1. **Given** `remove_binary_directory` returns `Err(io)`, **When** uninstall runs, **Then** a warn-log is captured with all three structured fields.
2. **Given** `cargo check`, **When** a new `BackendRuntimeError::Foo` variant is added without touching `http_status_for`, **Then** the build fails with a non-exhaustive match error.

## Edge Cases

- The `VersionReq`-based conflict detector must handle llama.cpp build numbers that are non-semver (`b4970`). Either parse them with a dedicated `LlamaCppBuildReq` helper or reject the manifest with a clearer error than the current implementation produces.
- `discover_and_activate`'s behavior decision (US4) must be made explicit in the PR description with a justification.

## Requirements *(mandatory)*

### Functional Requirements

#### registry.rs split

- **FR-401**: `registry.rs` MUST be replaced by `registry/mod.rs` + `scanner`, `loaders`, `storage_validation`, `version_conflict`, `types` submodules.
- **FR-402**: Every submodule MUST be ≤ 350 LOC.
- **FR-403**: The `VersionInterval` + 5 related free functions MUST be deleted. `detect_intra_manifest_conflicts` MUST use `semver::VersionReq` for semver ranges + a documented `LlamaCppBuildReq` helper for non-semver build numbers. When BOTH parsers fail on a given dependency string, the function MUST return `ExtensionError::ManifestParse { path, detail }` where `path` is the manifest file path and `detail` includes the offending range string and both parser errors. (The existing `ManifestParse` variant is reused; no new variant is introduced.)

#### backends.rs split

- **FR-404**: `handlers/backends.rs` MUST be replaced by `handlers/backends/` + `catalog`, `lifecycle`, `settings`, `observability`, `host_runtimes`, `lease` submodules plus `mod.rs`.
- **FR-405**: Every submodule MUST be ≤ 300 LOC.
- **FR-406**: `create_lease` MUST be split into `validate_install_for_lease`, `build_spawn_request`, `stub_lease` helpers; `create_lease` body ≤ 40 LOC.

#### DRY

- **FR-407**: `scan_extensions_dir` and `scan_builtin_dir` MUST delegate to a new `scan_dir_with<F>` helper. Each scanner entry ≤ 15 LOC.

#### POLA

- **FR-408**: `ExtensionRegistry::discover_and_activate` MUST perform real discovery when called, delegating to the existing synchronous `InMemoryExtensionRegistry::refresh(extensions_dir, host_version, protocol_version)`. The async trait signature MUST remain unchanged (LSP preservation for `nexus-core` + `nexus-api` callers). The rename-and-trim alternative is explicitly rejected per US4 decision.

#### N+1

- **FR-409**: `installs_store::list_all_with_dependents(pool) -> BackendRuntimeResult<Vec<(RuntimeInstallRow, Vec<String>)>>` MUST be added using a single LEFT JOIN against `host_runtime_leases` (the actual dependents source — current `list_dependents` walks `host_runtime_leases WHERE released_at IS NULL`). Query shape: `SELECT i.*, l.extension_id FROM host_runtime_installs i LEFT JOIN host_runtime_leases l ON l.install_id = i.install_id AND l.released_at IS NULL ORDER BY i.install_id`. Aggregation into `Vec<(RuntimeInstallRow, Vec<String>)>` happens in Rust.
- **FR-410**: `handlers/backends/host_runtimes.rs::list_host_runtimes` MUST use the new batched query and MUST NOT call `list_dependents` inside a per-install loop.

#### Silenced errors

- **FR-411**: `uninstall_runtime` MUST replace `let _ = remove_binary_directory(...)` with a `tracing::warn!(install_id, path, error)` on failure.
- **FR-412**: `spawn/mod.rs::http_status_for` MUST be an exhaustive match (remove `_ =>` wildcard).

### Key Entities

- **LlamaCppBuildReq** (new): helper type parsing llama.cpp build-number constraints (`>=b4970`, `<b5000`) and evaluating overlap/membership without pretending to be semver.

## Success Criteria *(mandatory)*

- **SC-401**: No file under `crates/nexus-extension/src/registry/*.rs` exceeds 350 LOC; no file under `crates/nexus-api/src/handlers/backends/*.rs` exceeds 300 LOC.
- **SC-402**: `cargo test --workspace` passes with count = baseline + new tests (US4, US7, US8).
- **SC-403**: `cargo clippy --workspace --all-targets -- -D warnings` clean.
- **SC-404**: `VersionInterval` and its helpers are fully deleted.
- **SC-405**: Query count for `list_host_runtimes` with N installs is 2, not N+1 (assert via `sqlx` trace or mock pool counter).
- **SC-406**: Grep for `let _ =` on `Result`-returning calls in `crates/nexus-api/src/` and `crates/nexus-extension/src/` returns zero hits outside tests.
