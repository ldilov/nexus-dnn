# Tasks: Storage Modularization

**Input**: Design documents from `/specs/014-storage-modularization/`
**Prerequisites**: spec.md, plan.md
**Tests**: existing `nexus-storage` test suite is the safety net per Principle VI(b) (refactor exception). Two new tests added for warn-log and builder.

**Organization**: Tasks grouped by user story. US1–US2 are P1 (file splits); US3–US5 are P2. Each story is independently testable.

## Sequencing invariant

Per Principle IX, every commit leaves the workspace green-building. Recommended order: US1 (sqlite split) → US5 (migration helper, cleanly folded into US1's commit) → US2 (manager split) → US3 (error propagation) → US4 (builder).

---

## Phase 1: Baseline

- [ ] T301 Capture baseline: `cargo test -p nexus-storage --tests 2>&1 | tee /tmp/014-baseline.txt`. Record passing count for SC-202 regression check.

---

## Phase 2: US1 — `sqlite.rs` → `sqlite/` domain split (P1)

### Preparation

- [ ] T310 Create `crates/nexus-storage/src/sqlite/` directory; `git mv crates/nexus-storage/src/sqlite.rs crates/nexus-storage/src/sqlite/mod.rs` (use `git mv` per analyze-pass L1 — preserves blame history); confirm `cargo check -p nexus-storage` passes.

### Move methods into domain submodules (one commit per submodule within the US1 commit, squashed)

- [ ] T311 [P] [US1] Create `sqlite/extensions.rs` with `impl SqliteDatabase { pub(super) async fn insert_extension_inner, get_extension_inner, list_extensions_inner, update_extension_status_inner }`. Replace trait impl method bodies in `mod.rs` with `self.insert_extension_inner(...)` etc.
- [ ] T312 [P] [US1] Same for `sqlite/operators.rs` (insert_operator, list_operators, list_operators_by_extension, get_operator).
- [ ] T313 [P] [US1] Same for `sqlite/workflows.rs` (insert_workflow, get_workflow, list_workflows, update_workflow, delete_workflow, clear_workflow_user_edit, stamp_workflow_extension, get_canvas_state, set_canvas_state).
- [ ] T314 [P] [US1] Same for `sqlite/runs.rs` (insert_run, get_run, list_runs, update_run_status, insert_node_execution, get_node_executions_for_run, update_node_execution).
- [ ] T315 [P] [US1] Same for `sqlite/artifacts.rs` (insert_artifact, get_artifact, list_artifacts_for_run, list_artifacts_filtered, insert_lineage_edge, get_lineage_for_artifact).
- [ ] T316 [P] [US1] Same for `sqlite/content.rs` (recipe + ui_contribution methods).
- [ ] T317 [P] [US1] Same for `sqlite/namespaces.rs` (namespace + migration_record + object + operation + archive methods).

### Trait delegation (per analyze-pass M5)

- [ ] T317b [US1] In `sqlite/mod.rs`, author the single `impl Database for SqliteDatabase { ... }` trait block whose method bodies are one-line delegates to the inherent `*_inner` methods defined in T311–T317. Verify trait surface unchanged via `cargo check --workspace`.

### Verification

- [ ] T318 [US1] `cargo test -p nexus-storage` GREEN, count matches baseline; `wc -l crates/nexus-storage/src/sqlite/*.rs` all ≤ 400; clippy clean.

---

## Phase 3: US5 — `execute_migration_statements` helper (P2, folded into US1 commit)

- [ ] T320 [US5] In `sqlite/migrations.rs`, add `pub(super) async fn execute_migration_statements(pool: &SqlitePool, sql: &str, ignore_duplicate_column: bool) -> Result<(), StorageError>`. Migration → `ignore_duplicate_column` mapping (per analyze-pass M8, derived from the current `sqlite.rs::run_migrations` body):
  - 001_initial.sql → `false`
  - 002 → `false`
  - 003 → `false`
  - 004 → `false`
  - 005 → `false`
  - 006 → `true` (current code swallows duplicate-column on `ALTER TABLE`)
  - 007 → `true`
  - 008 → `true`
  Re-confirm by reading the existing match arms before authoring T321; the mapping above is a checkpoint, not authoritative.
- [ ] T321 [US5] Rewrite `run_migrations` to call the helper 8 times; verify each include_str!() path unchanged; function body ≤ 40 LOC.
- [ ] T322 [US5] Verify migrations still apply against a clean SQLite via `cargo test -p nexus-storage`.

---

## Phase 4: US2 — `storage_manager.rs` → `manager/` split (P1)

### Preparation

- [ ] T330 Create `crates/nexus-storage/src/manager/` directory; move `storage_manager.rs` → `manager/mod.rs`; update `lib.rs` `pub mod storage_manager` re-export if needed.

### Move methods

- [ ] T331 [P] [US2] Create `manager/types.rs` with `UninstallReport`, `IntegrityReport`, `ApplyReport`, `MigrationInput`, `ObjectInput`, plus local helpers `sha256_bytes`, `chrono_now`.
- [ ] T332 [P] [US2] Create `manager/journal.rs` with `impl StorageManager { async fn journal_start, journal_complete, check_quarantine_threshold }`.
- [ ] T333 [P] [US2] Create `manager/reservation.rs` with `impl StorageManager { pub async fn reserve_namespace }`.
- [ ] T334 [P] [US2] Create `manager/apply.rs` with `impl StorageManager { pub async fn apply_plan, validate_dry_run }` (apply_plan split done in Phase 5).
- [ ] T335a [P] [US2] Create `manager/uninstall/mod.rs` with `impl StorageManager { pub async fn uninstall_namespace }` (policy-dispatch state machine — exempt from ≤25 LOC per Principle III's state-machine carve-out; flag in PR).
- [ ] T335b [P] [US2] Create `manager/uninstall/retain.rs` with `impl StorageManager { async fn uninstall_retain }`.
- [ ] T335c [P] [US2] Create `manager/uninstall/drop.rs` with `impl StorageManager { async fn uninstall_drop }`.
- [ ] T335d [P] [US2] Create `manager/uninstall/archive.rs` with `impl StorageManager { async fn uninstall_archive_then_drop }` (error-propagation fix lands in Phase 6 / US3).
- [ ] T336 [P] [US2] Create `manager/verify.rs` with `impl StorageManager { pub async fn verify_namespace }`.

### Verification

- [ ] T337 [US2] `cargo test -p nexus-storage` GREEN, all submodules ≤ 400 LOC.

---

## Phase 5: Method splits inside `apply_plan` (H-09)

- [ ] T340 [US2] Extract `async fn apply_single_migration(tx, migration) -> Result<usize, StorageError>` (SAVEPOINT/RELEASE/ROLLBACK logic).
- [ ] T341 [US2] Extract `async fn insert_migration_and_objects(tx, migration, now) -> Result<usize, StorageError>`.
- [ ] T342 [US2] `apply_plan` reduced to orchestration ≤ 40 LOC.
- [ ] T343 [US2] Verify `cargo test -p nexus-storage` GREEN, existing apply_plan tests unchanged.

---

## Phase 6: US3 — Error propagation (P2)

### Tests (write first — RED)

- [ ] T350 [P] [US3] Integration test `crates/nexus-storage/tests/uninstall_archive_propagates_err.rs`: close the pool mid-archive to force `fetch_all` to error; assert `Err(StorageError)` returned, not empty `UninstallReport`.
- [ ] T351 [P] [US3] Unit test inside `manager/journal.rs`: close pool before `journal_complete`; capture `tracing::warn!` event via `tracing_test::traced_test`; assert `op_id` and `error` fields present.

### Implementation

- [ ] T352 [US3] Replace `unwrap_or_default()` in `manager/uninstall/archive.rs` with `?` (fetch_all → propagated error). Function already returns `Result`, no signature change.
- [ ] T353 [US3] In `manager/journal.rs::journal_complete`, replace `let _ = ...` with `if let Err(e) = ... { tracing::warn!(op_id, error = %e, "journal_complete failed") }`.

### Verification

- [ ] T354 [US3] Both new tests GREEN; SC-205 grep returns zero hits for `unwrap_or_default` / `let _ =` on `Result`s in `nexus-storage/src/**` (excluding test modules).

---

## Phase 7: US4 — `StorageManagerBuilder` (P2)

### Tests (write first — RED)

- [ ] T360 [P] [US4] Unit test in `manager/builder.rs`: `StorageManager::builder(db).event_bus(bus).data_dir(dir).quarantine_threshold(5).build()` yields a manager with all four fields set.

### Implementation

- [ ] T361 [US4] Create `manager/builder.rs` with `pub struct StorageManagerBuilder` + `event_bus`, `data_dir`, `quarantine_threshold`, `build` methods per Appendix B builder pattern.
- [ ] T362 [US4] In `manager/mod.rs`, replace bodies of `new`, `with_event_bus`, `with_data_dir`, `with_quarantine_threshold` with delegations to `StorageManagerBuilder`. Mark the `with_*` constructors `#[deprecated(note = "use StorageManager::builder(db)")]`.

### Verification

- [ ] T363 [US4] New builder test GREEN; all existing call sites compile without changes; crate README documents the new builder as the recommended entry point.

---

## Phase 8: Polish

- [ ] T370 [P] Update `crates/nexus-storage/README.md` with the new submodule layout and the builder usage example.
- [ ] T371 [P] Update root `README.md` "Recent Changes" to link spec 014.
- [ ] T372 Final verification: `cargo fmt --check`, `cargo clippy --workspace --all-targets -- -D warnings`, `cargo test --workspace` count matches baseline + 3 new tests (T350, T351, T360).
- [ ] T373 Squash into one commit per plan §Implementation Sequencing if desired; otherwise leave as per-phase commits (recommended for bisectability).

---

## Dependencies

```text
Phase 1 (baseline) ──► Phase 2 (sqlite split) ──► Phase 3 (migration helper)
                                                         │
                                                         ▼
                                                   Phase 4 (manager split)
                                                         │
                                                         ▼
                                                   Phase 5 (apply_plan split)
                                                         │
                                                         ▼
                                                   Phase 6 (err propagation)
                                                         │
                                                         ▼
                                                   Phase 7 (builder) ──► Phase 8 (polish)
```

## Task Summary

- **Total tasks**: 32 (T301–T373)
- **Baseline**: 1 (T301)
- **US1 (sqlite split, P1)**: 8 (T310–T318)
- **US5 (migration helper, P2)**: 3 (T320–T322)
- **US2 (manager split + apply_plan, P1)**: 12 (T330–T343)
- **US3 (error propagation, P2)**: 5 (T350–T354)
- **US4 (builder, P2)**: 4 (T360–T363)
- **Polish**: 4 (T370–T373)
- **Parallel opportunities**: 11 `[P]` tasks within each split phase
