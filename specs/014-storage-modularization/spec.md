# Feature Specification: Storage Layer Modularization

**Feature Branch**: `014-storage-modularization`
**Created**: 2026-04-15
**Status**: Draft
**Input**: Close Principle III and Principle VII gaps flagged by `/rust-review` after constitution v1.1.0 ratification. Split the two oversized storage files (`nexus-storage/src/sqlite.rs` 1128 LOC, `nexus-storage/src/storage_manager.rs` 1111 LOC) into cohesive domain submodules, shrink methods above the 25-line soft limit, and fix silenced errors in uninstall-archive and journal paths.

## Executive Summary

Two files in `nexus-storage` violate the constitution's 800-LOC file soft limit. `sqlite.rs` packages a single `impl Database for SqliteDatabase` trait implementation covering ~40 methods across 9 distinct domain tables. `storage_manager.rs` mixes journalling, reservation, plan application, uninstall lifecycle, and verification in one struct.

In addition to file-size violations, the review surfaced:

- `apply_plan` at 148 LOC (soft limit 25) mixing per-migration execution, record insertion, and object insertion.
- `uninstall_archive_then_drop` silences `sqlx::query_as(...).unwrap_or_default()` on DB errors during archive enumeration — a data-loss failure mode.
- `journal_complete` silences DB errors with `let _ = ...`.
- `run_migrations` has 8 hand-rolled migration loops that are near-duplicates of each other.
- Three constructor variants on `StorageManager` (`new`, `with_event_bus`, `with_data_dir`) create a non-uniform API that should be a fluent builder.

This spec closes all of the above.

## Architectural Intent

### Core principles applied

- **Linguistic-Modular-Units (Appendix A)**: each new submodule is named after a domain concept (`workflows`, `runs`, `artifacts`), never `utils` or `helpers`.
- **Single Responsibility (Principle II)**: one module, one reason to change. `journal.rs` only changes when the operation journal shape changes.
- **DRY (Principle II)**: the 8 migration loops collapse to one `execute_migration_statements` helper.
- **Typed errors all the way down (Principle VII)**: no `unwrap_or_default` or `let _` on DB results in production paths.
- **Bisectable commits (Principle IX)**: every sub-commit leaves the workspace green-building and all tests passing.

### Non-goals

- The `Database` trait surface and its public methods stay unchanged. Downstream crates (`nexus-core`, `nexus-api`, `nexus-workflow`) see no API diff.
- No schema migrations. This is pure refactoring.
- The ISP-compliant sub-trait split of `Database` (e.g., `ExtensionStore`, `WorkflowStore`, `RunStore`) is deferred to a future spec. Splitting the file without splitting the trait is the right incremental step.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Maintainer can locate a storage method by domain in ≤ 2 clicks (Priority: P1)

As a maintainer hunting for "where do workflow canvas states live?", I open `nexus-storage/src/sqlite/workflows.rs` directly and see only workflow-related methods — not 40 unrelated siblings.

**Independent Test**: After the split, `wc -l crates/nexus-storage/src/sqlite/*.rs` shows every file under 400 LOC. Grepping for any one of the 40 trait methods returns a hit in exactly one submodule. All `cargo test --workspace` tests continue to pass.

**Acceptance Scenarios**:

1. **Given** the split is complete, **When** a contributor greps for `insert_workflow`, **Then** the match lives in `sqlite/workflows.rs`, not `sqlite/mod.rs`.
2. **Given** a maintainer opens `sqlite/runs.rs`, **Then** the file contains only run + node-execution methods plus their imports.
3. **Given** downstream crates (`nexus-core`, `nexus-api`), **When** they call `database.insert_workflow(...)`, **Then** the call compiles without any import changes.

### User Story 2 — `StorageManager` splits by lifecycle stage (Priority: P1)

As a maintainer reading `apply_plan`, I see the plan-application loop dispatched to a small `apply_single_migration` helper, not a 148-line monolith mixing SAVEPOINTs, record insertion, and object insertion.

**Independent Test**: After the split, `apply_plan` is ≤ 40 LOC. `uninstall_namespace` delegates to `uninstall/retain.rs`, `uninstall/drop.rs`, `uninstall/archive.rs`. All existing storage tests pass without modification.

**Acceptance Scenarios**:

1. **Given** the split is complete, **When** `cargo expand -p nexus-storage` is inspected, **Then** `StorageManager` has multiple inherent `impl` blocks, one per submodule.
2. **Given** `manager/apply.rs`, **When** read top-to-bottom, **Then** `apply_plan` reads as sequential named calls (`apply_single_migration` + `insert_migration_and_objects`), not nested loops.
3. **Given** `manager/uninstall/archive.rs`, **When** a DB query errors during archive enumeration, **Then** the function returns `Err(StorageError)`, not an empty `UninstallReport`.

### User Story 3 — Journal + quarantine errors no longer silent (Priority: P2)

As an operator watching logs during a storage apply-plan failure, I see a structured `tracing::warn!` when the journal completion record cannot be written, instead of a mysterious success that masks a broken journal.

**Independent Test**: Inject a DB write failure into `update_operation` during `journal_complete`; observe a `tracing::warn!` event with `op_id`, `error` fields captured by `tracing_test`. Same for `check_quarantine_threshold`.

**Acceptance Scenarios**:

1. **Given** `journal_complete` cannot write to the DB, **When** it fails, **Then** a `tracing::warn!` with `op_id` and `error` is emitted.
2. **Given** an `apply_plan` failure + `check_quarantine_threshold` fails its own DB query, **When** both errors occur, **Then** the outer `ApplyFailed` is returned AND the quarantine failure is logged independently.

### User Story 4 — `StorageManager` construction is a fluent builder (Priority: P2)

As a caller instantiating `StorageManager` with an event bus, a data directory, and a custom quarantine threshold, I use one fluent chain: `StorageManager::builder(db).event_bus(bus).data_dir(dir).quarantine_threshold(5).build()`.

**Independent Test**: All three existing constructors (`new`, `with_event_bus`, `with_data_dir`) delegate to `StorageManagerBuilder`. The builder is used in at least one new test. Existing call sites continue to compile (preserved as thin delegates).

**Acceptance Scenarios**:

1. **Given** the builder exists, **When** called with `.event_bus(...).data_dir(...).build()`, **Then** the resulting `StorageManager` has both set.
2. **Given** the legacy constructors, **When** called, **Then** they internally delegate to the builder and remain source-compatible.

### User Story 5 — `run_migrations` dedupes the 8 migration loops (Priority: P2)

As a maintainer adding migration 009, I add a single `execute_migration_statements(pool, include_str!("...009.sql"), false).await?;` line, not another 12-line loop copied from migration 008.

**Independent Test**: After the change, `run_migrations` is ≤ 40 LOC. Adding a stub migration 009 requires a one-line addition. All existing tests pass.

**Acceptance Scenarios**:

1. **Given** `execute_migration_statements` exists, **When** migration 001–008 call it, **Then** their individual bodies collapse to one line each.
2. **Given** a hypothetical migration 009 with `CREATE TABLE IF NOT EXISTS`, **When** added, **Then** it uses the same helper.

## Edge Cases

- A split submodule in `sqlite/` must not create orphan `pub(crate) use` re-exports. Every domain method stays as a method on `SqliteDatabase` via multiple inherent `impl` blocks inside submodules.
- The trait impl `impl Database for SqliteDatabase` must remain a single block (Rust language constraint). Its methods become thin delegates to inherent methods in the domain submodules.
- Tests inside `#[cfg(test)] mod tests {}` stay in the submodule that owns their target — integration tests in `tests/` are unaffected.
- `StorageManager` constructor deprecation: the `with_*` constructors are kept as `#[deprecated]` but not removed (non-breaking for downstream).

## Requirements *(mandatory)*

### Functional Requirements

#### File split — sqlite.rs

- **FR-201**: `sqlite.rs` MUST be replaced by `sqlite/mod.rs` plus 8 domain submodules: `migrations`, `extensions`, `operators`, `workflows`, `runs`, `artifacts`, `content`, `namespaces`.
- **FR-202**: Every trait method on `impl Database for SqliteDatabase` MUST stay — callers see zero API change.
- **FR-203**: Each submodule MUST be ≤ 400 LOC.
- **FR-204**: The trait impl `impl Database for SqliteDatabase` MUST live in `sqlite/mod.rs` and delegate each method body to a single inherent `impl SqliteDatabase` call defined in the matching submodule.

#### File split — storage_manager.rs

- **FR-205**: `storage_manager.rs` MUST be replaced by `manager/mod.rs` plus submodules: `journal`, `reservation`, `apply`, `uninstall/{retain,drop,archive,mod}`, `verify`, `types`.
- **FR-206**: `StorageManager` MUST retain its public API surface (all currently-pub methods still resolvable at the same paths).
- **FR-207**: Each submodule MUST be ≤ 400 LOC.
- **FR-208**: `apply_plan` MUST be split into `apply_plan` (orchestrator ≤ 40 LOC) + `apply_single_migration` + `insert_migration_and_objects` helpers.

#### Error propagation

- **FR-209**: `uninstall_archive_then_drop` MUST propagate `fetch_all` errors via `?`, not `.unwrap_or_default()`.
- **FR-210**: `journal_complete` MUST log via `tracing::warn!` when `update_operation` errors.
- **FR-211**: `run_migrations` MUST use a single `execute_migration_statements(pool, sql, ignore_duplicate_column) -> Result<(), StorageError>` helper.

#### Builder

- **FR-212**: `StorageManager::builder(db) -> StorageManagerBuilder` MUST exist with `.event_bus`, `.data_dir`, `.quarantine_threshold`, `.build()` methods.
- **FR-213**: The existing `new`, `with_event_bus`, `with_data_dir` constructors MUST remain source-compatible via delegation; they MAY be `#[deprecated]`.

### Key Entities

- **StorageManagerBuilder**: fluent builder for `StorageManager`.
- **MigrationRunner** (internal): the `execute_migration_statements` helper module.

## Success Criteria *(mandatory)*

- **SC-201**: No file under `crates/nexus-storage/src/` exceeds 400 LOC after the split.
- **SC-202**: `cargo test --workspace` passes with `count == baseline + len(new_tests_added_in_this_spec)`. No regressions in baseline tests, no new `#[ignore]`s. (US3 adds 2 tests + US4 adds 1 test — expected delta = +3.)
- **SC-203**: `cargo clippy --workspace --all-targets -- -D warnings` remains clean.
- **SC-204**: `apply_plan`, `journal_complete`, and every method in `manager/uninstall/*.rs` are ≤ 25 **non-blank executable lines** (counted between the `fn`'s opening `{` and matching closing `}`, excluding blank lines, comment-only lines, `#[cfg(...)]` / `#[allow(...)]` / doc attributes, and lines that are only `}` or `};`). Per analyze-pass M9, this measurement aligns with how Constitution Principle III's ≤ 25 SHOULD is read in code review.
- **SC-205**: No `unwrap_or_default` or `let _ =` on `Result` in `nexus-storage/src/**/*.rs` outside `#[cfg(test)]` code.
