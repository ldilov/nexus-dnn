# Tasks: Extension Storage Contributions

**Input**: Design documents from `/specs/004-extension-storage-contributions/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/storage-api.md

**Tests**: Included inline — this project uses `cargo test` with unit and integration tests per constitution.

**Organization**: Tasks grouped by user story to enable independent implementation and testing. Most infrastructure already exists from prior sessions — tasks focus on verification + gaps identified in the updated specification.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story (US1–US8)
- Exact file paths from plan.md project structure

---

## Phase 1: Setup

**Purpose**: Verify existing infrastructure, add new dependencies, create missing modules.

- [X] T001 Run `cargo test` across full workspace — document current test results and failures in `crates/nexus-extension/`, `crates/nexus-storage/`, `crates/nexus-api/`, `crates/nexus-events/`
- [X] T002 [P] Run `cargo clippy` across full workspace — document warnings
- [X] T003 [P] Verify `sqlparser` and `sha2` dependencies exist in `crates/nexus-extension/Cargo.toml` — add if missing: `sqlparser = "0.55"`, `sha2 = "0.10"`
- [X] T004 [P] Add `zip = "2"` dependency to `crates/nexus-storage/Cargo.toml` for JSONL ZIP archive support
- [X] T005 Create `crates/nexus-extension/src/storage/limits.rs` with `StorageLimits` struct: `max_migrations_per_extension: usize` (default 64), `max_statements_per_migration: usize` (default 128), `max_migration_file_bytes: u64` (default 1_048_576), `quarantine_threshold: u32` (default 3). Implement `Default` trait.
- [X] T006 [P] Add `pub mod limits;` to `crates/nexus-extension/src/storage/mod.rs` and export `StorageLimits`
- [X] T007 [P] Create `crates/nexus-storage/src/archiver.rs` with empty `StorageArchiver` struct and `pub mod archiver;` in `crates/nexus-storage/src/lib.rs`
- [X] T008 Verify `schemas/storage-contribution.schema.json` matches spec — add `maxItems: 64` to `migrations.files` array if missing

**Checkpoint**: Dependencies in place. New modules created. Existing tests documented.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Enhanced error types and configurable limits that ALL user stories depend on.

- [X] T009 Add new `StorageContributionError` variants to `crates/nexus-storage/src/error.rs`: `MigrationFileNotFound`, `MigrationFileEmpty`, `MigrationFileTooLarge`, `MigrationFileNotUtf8`, `MigrationFileInvalidExtension`, `StatementCountExceeded`, `MigrationCountExceeded`, `MigrationOrderViolation`, `ReservedPrefix`, `UnsupportedFkAction`, `DowngradeRejected`, `AliasChangeRejected`, `QuarantineThresholdExceeded`
- [X] T010 [P] Thread `StorageLimits` parameter into `validate_storage_contribution()` in `crates/nexus-extension/src/storage/contribution.rs` — use limits for migration count enforcement
- [X] T011 [P] Thread `StorageLimits` parameter into SQL validator in `crates/nexus-extension/src/storage/sql_validator.rs` — use limits for statement count enforcement
- [X] T012 [P] Thread `StorageLimits` parameter into `build_plan()` in `crates/nexus-extension/src/storage/plan.rs` — use limits for file size enforcement
- [X] T013 [P] Add reserved prefix deny list constant to `crates/nexus-extension/src/storage/contribution.rs`: `["ext_sqlite_", "ext_host_", "ext_nexus_", "ext_core_"]`
- [X] T014 Verify all existing Database trait methods in `crates/nexus-storage/src/database.rs` match `contracts/storage-api.md` — add missing methods: `get_namespace_by_extension`, `list_namespaces_by_status`, `update_namespace_policy`, `update_migration_status`, `list_operations_for_namespace`
- [X] T015 Implement any newly added Database trait methods in `crates/nexus-storage/src/sqlite.rs` with parameterized queries
- [X] T016 Run `cargo test -p nexus-storage` and `cargo clippy -p nexus-storage` — verify PASS

**Checkpoint**: Error types, limits, and database layer ready. All user stories can proceed.

---

## Phase 3: US-1 — Extension Declares Storage in Manifest (Priority: P1) MVP

**Goal**: Parse the optional `storage` block from extension manifests. Validate capability, alias, migration files, and limits. Compute effective prefix.

**Independent Test**: Install an extension with a `storage` block. Host recognizes storage declaration, computes prefix, and includes it in validation report without applying.

### Tests for US-1

- [X] T017 [P] [US1] Write unit test in `crates/nexus-extension/src/storage/contribution.rs`: valid storage block parses correctly, computes effective prefix `ext_<alias>_`
- [X] T018 [P] [US1] Write unit test: missing `storage.schema_contribute` capability → validation error
- [X] T019 [P] [US1] Write unit test: invalid alias (too short, wrong chars) → validation error
- [X] T020 [P] [US1] Write unit test: duplicate migration IDs → validation error
- [X] T021 [P] [US1] Write unit test: path traversal (`../../etc/shadow`) → validation error
- [X] T022 [P] [US1] Write unit test: migration file without `.sql` extension → validation error
- [X] T023 [P] [US1] Write unit test: migration IDs not in ascending order → validation error
- [X] T024 [P] [US1] Write unit test: migration count exceeds `StorageLimits.max_migrations_per_extension` → validation error
- [X] T025 [P] [US1] Write unit test: reserved alias producing `ext_sqlite_` prefix → validation error
- [X] T026 [P] [US1] Write unit test: empty `files` array (0 migrations) → validation error

### Implementation for US-1

- [X] T027 [US1] Add `.sql` extension check for migration file paths in `crates/nexus-extension/src/storage/contribution.rs`
- [X] T028 [US1] Add migration ID ascending order enforcement (lexicographic comparison) in `crates/nexus-extension/src/storage/contribution.rs`
- [X] T029 [US1] Add migration count enforcement against `StorageLimits.max_migrations_per_extension` in `crates/nexus-extension/src/storage/contribution.rs`
- [X] T030 [US1] Add reserved prefix deny list check in `crates/nexus-extension/src/storage/contribution.rs` — reject aliases producing `ext_sqlite_`, `ext_host_`, `ext_nexus_`, `ext_core_`
- [X] T031 [US1] Verify `crates/nexus-extension/src/registry.rs` `process_extension()` checks capability `storage.schema_contribute` when storage block present — fix if missing
- [X] T032 [US1] Run `cargo test -p nexus-extension` — verify all US-1 tests PASS

**Checkpoint**: Manifest parsing complete. Extensions can declare storage blocks and the host validates them with all 17 acceptance scenarios covered.

---

## Phase 4: US-2 — Host Validates and Applies Migrations (Priority: P1)

**Goal**: Multi-stage validation (static SQL + dry-run) then transactional apply with metadata recording.

**Independent Test**: Install extension with valid migrations. Host validates, dry-runs, applies, and records all metadata.

### Tests for US-2

- [X] T033 [P] [US2] Write unit test in `crates/nexus-extension/src/storage/sql_validator.rs`: `CREATE TABLE` allowed
- [X] T034 [P] [US2] Write unit test: `CREATE INDEX` and `CREATE UNIQUE INDEX` allowed
- [X] T035 [P] [US2] Write unit test: `ALTER TABLE ADD COLUMN` allowed
- [X] T036 [P] [US2] Write unit test: `DROP TABLE` rejected
- [X] T037 [P] [US2] Write unit test: `INSERT`, `UPDATE`, `DELETE` rejected
- [X] T038 [P] [US2] Write unit test: `CREATE VIEW`, `CREATE TRIGGER` rejected
- [X] T039 [P] [US2] Write unit test: `ATTACH`, `DETACH`, `PRAGMA`, `VACUUM` rejected
- [X] T040 [P] [US2] Write unit test: statement count exceeding `max_statements_per_migration` → rejected
- [X] T041 [P] [US2] Write unit test: `{{prefix}}` placeholder expansion produces correct SQL
- [X] T042 [P] [US2] Write unit test in `crates/nexus-extension/src/storage/plan.rs`: new install plan has all migrations marked `Apply`
- [X] T043 [P] [US2] Write unit test: migration file not found → `MigrationFileNotFound` error
- [X] T044 [P] [US2] Write unit test: empty migration file (0 bytes) → `MigrationFileEmpty` error
- [X] T045 [P] [US2] Write unit test: migration file exceeding size limit → `MigrationFileTooLarge` error
- [X] T046 [P] [US2] Write unit test: non-UTF-8 migration file → `MigrationFileNotUtf8` error

### Implementation for US-2

- [X] T047 [US2] Verify `crates/nexus-extension/src/storage/sql_validator.rs` rejects all forbidden statement types per `nexus_sqlite_v1` profile — fix any gaps
- [X] T048 [US2] Add statement count enforcement against `StorageLimits.max_statements_per_migration` in `crates/nexus-extension/src/storage/sql_validator.rs`
- [X] T049 [US2] Add UTF-8 encoding check on migration file read in `crates/nexus-extension/src/storage/plan.rs`
- [X] T050 [US2] Add file size limit check against `StorageLimits.max_migration_file_bytes` in `crates/nexus-extension/src/storage/plan.rs`
- [X] T051 [US2] Add non-empty content check (at least one executable statement after stripping comments) in `crates/nexus-extension/src/storage/plan.rs`
- [X] T052 [US2] Verify dry-run validation in `crates/nexus-storage/src/storage_manager.rs` — opens in-memory SQLite, applies host migrations 001-003, then extension migrations, verifies object inventory
- [X] T053 [US2] Verify transactional apply in `crates/nexus-storage/src/storage_manager.rs` — single transaction wrapping namespace reservation + savepoints per migration + metadata recording
- [X] T054 [US2] Verify `process_extension()` in `crates/nexus-extension/src/registry.rs` calls build_plan → validate_static → validate_dry_run → block on error. Emit events at each stage.
- [X] T055 [US2] Verify `persist_discovered_extensions()` in `crates/nexus-api/src/handlers/extensions.rs` calls `apply_plan()` for storage-contributing extensions
- [X] T056 [US2] Write integration test in `crates/nexus-storage/src/storage_manager.rs`: apply creates tables and records metadata in all 5 metadata tables
- [X] T057 [US2] Write integration test: migration failure rolls back cleanly — no partial objects, extension quarantined
- [X] T058 [US2] Run `cargo test` (full workspace) — verify PASS

**Checkpoint**: Full validate → dry-run → apply pipeline works. Extensions with valid storage activate. Invalid storage blocks activation.

---

## Phase 5: US-3 — Namespace Isolation and SQL Safety (Priority: P1)

**Goal**: Strict prefix enforcement and cross-namespace safety. No extension can escape its prefix boundary.

**Independent Test**: Attempt migrations with wrong prefix, host-table FK, cross-extension FK. All fail validation.

### Tests for US-3

- [X] T059 [P] [US3] Write unit test in `crates/nexus-extension/src/storage/sql_validator.rs`: table name missing prefix → rejected
- [X] T060 [P] [US3] Write unit test: index name not matching `^{prefix}idx_[a-z][a-z0-9_]{1,58}$` → rejected
- [X] T061 [P] [US3] Write unit test: FK referencing host core table `workflows(id)` → rejected
- [X] T062 [P] [US3] Write unit test: FK referencing another extension's table `ext_other_sessions` → rejected
- [X] T063 [P] [US3] Write unit test: FK with `ON DELETE SET DEFAULT` → rejected (only CASCADE, RESTRICT, SET NULL allowed)
- [X] T064 [P] [US3] Write integration test: two extensions with same alias → second activation blocked with collision error

### Implementation for US-3

- [X] T065 [US3] Verify index name validation in `crates/nexus-extension/src/storage/sql_validator.rs` enforces `^{prefix}idx_[a-z][a-z0-9_]{1,58}$`
- [X] T066 [US3] Add FK `ON DELETE`/`ON UPDATE` action validation in `crates/nexus-extension/src/storage/sql_validator.rs` — only CASCADE, RESTRICT, SET NULL allowed
- [X] T067 [US3] Verify namespace collision detection in `crates/nexus-storage/src/storage_manager.rs` — queries both `extension_storage_namespaces` and `sqlite_master`
- [X] T068 [US3] Run `cargo test -p nexus-extension` — verify all isolation tests PASS

**Checkpoint**: Namespace isolation proven. No extension can escape its prefix boundary.

---

## Phase 6: US-4 — Extension Upgrade with New Migrations (Priority: P1)

**Goal**: Append new migrations without re-running applied ones. Detect tampering and reordering.

**Independent Test**: Install v0.4.0 with 2 migrations. Upgrade to v0.5.0 with 3 (same first 2 + new third). Only third runs.

### Tests for US-4

- [X] T069 [P] [US4] Write unit test in `crates/nexus-extension/src/storage/plan.rs`: upgrade plan skips applied migrations (checksum match), plans new ones
- [X] T070 [P] [US4] Write unit test: checksum drift on applied migration → `repair_required`
- [X] T071 [P] [US4] Write unit test: alias change after install → rejected
- [X] T072 [P] [US4] Write unit test: migration ID reorder → rejected
- [X] T073 [P] [US4] Write unit test: downgrade (fewer migrations than applied) → `DowngradeRejected`
- [X] T074 [P] [US4] Write unit test: uninstall policy change on upgrade → accepted, recorded

### Implementation for US-4

- [X] T075 [US4] Verify `build_plan()` in `crates/nexus-extension/src/storage/plan.rs` detects and rejects migration ID reordering
- [X] T076 [US4] Verify `build_plan()` detects and rejects alias change after install
- [X] T077 [US4] Verify `build_plan()` detects and rejects downgrade (applied migrations missing from declared list)
- [X] T078 [US4] Add uninstall policy change detection in `build_plan()` in `crates/nexus-extension/src/storage/plan.rs` — flag for namespace policy update on upgrade
- [X] T079 [US4] In apply pipeline, update `extension_storage_namespaces.uninstall_policy` when policy changes on upgrade in `crates/nexus-storage/src/storage_manager.rs`
- [X] T080 [US4] Write integration test: install v1 (2 migrations), upgrade to v2 (3 migrations) → only 3rd applied, all tables intact
- [X] T081 [US4] Run `cargo test` — verify upgrade tests PASS

**Checkpoint**: Upgrades work safely. Tampering, reordering, and downgrades detected.

---

## Phase 7: US-5 — Extension Disable and Uninstall (Priority: P2)

**Goal**: Disable preserves data. Uninstall follows declared policy. Archive format is JSONL ZIP.

**Independent Test**: Disable → tables remain. Uninstall with drop → tables removed. Archive → JSONL ZIP created.

### Tests for US-5

- [X] T082 [P] [US5] Write integration test in `crates/nexus-storage/src/storage_manager.rs`: disable extension → tables remain in `sqlite_master`, namespace status stays `active`
- [X] T083 [P] [US5] Write integration test: re-enable with matching checksums → activates without migrations
- [X] T084 [P] [US5] Write integration test: re-enable with drifted files → blocked with `repair_required`
- [X] T085 [P] [US5] Write integration test: uninstall with `retain` → tables remain, package record removed, namespace status `retained`
- [X] T086 [P] [US5] Write integration test: uninstall with `drop_namespace_objects` → all `ext_<alias>_*` tables/indexes gone from `sqlite_master`, metadata retained with `dropped` status
- [X] T087 [P] [US5] Write integration test: uninstall with `archive_then_drop` → JSONL ZIP archive created, verified, tables dropped

### Implementation for US-5

- [X] T088 [US5] Verify disable behavior in `crates/nexus-extension/src/registry.rs` — does NOT drop namespace objects, keeps migration metadata intact
- [X] T089 [US5] Verify re-enable check — if files/checksums match, re-enable without migrations; if drift, block with `repair_required`
- [X] T090 [US5] Verify `uninstall_namespace()` in `crates/nexus-storage/src/storage_manager.rs` for `retain` policy — removes package registration, keeps objects and metadata, marks namespace `retained`
- [X] T091 [US5] Verify `uninstall_namespace()` for `drop_namespace_objects` — drops tables/indexes in reverse dependency order, updates object status to `dropped`, namespace status to `dropped`
- [X] T092 [US5] Implement `archive_namespace()` in `crates/nexus-storage/src/archiver.rs` — for each table: SELECT all rows → serialize as JSONL (one JSON object per row) → write to temp file
- [X] T093 [US5] Implement ZIP bundling in `crates/nexus-storage/src/archiver.rs` — collect JSONL files into single ZIP, compute SHA-256 content hash
- [X] T094 [US5] Extend `ArchiveRecord` in `crates/nexus-storage/src/records.rs` with `table_count: i64` and `row_count: i64` fields
- [X] T095 [US5] Update `insert_archive()` in `crates/nexus-storage/src/sqlite.rs` to include `table_count` and `row_count`
- [X] T096 [US5] Wire archiver into `uninstall_namespace()` for `ArchiveThenDrop` — archive first, verify hash, then drop. If archive fails, abort drop.
- [X] T097 [US5] Write integration test: archive creation failure → drop aborted, namespace remains `active`
- [X] T098 [US5] Run `cargo test` — verify all uninstall tests PASS

**Checkpoint**: Full lifecycle works: install → disable → re-enable → uninstall with all 3 policies. JSONL ZIP archives verified.

---

## Phase 8: US-6 + US-7 — Storage APIs and Integrity Verification (Priority: P2)

**Goal**: REST endpoints for storage status, admin operations, and integrity verification. Crash recovery detection.

**Independent Test**: Call `GET /extensions/{id}/storage`. Call `/verify` to check integrity. Call `/uninstall` to execute policy.

### Tests for US-6 + US-7

- [X] T099 [P] [US6] Write integration test for `GET /api/v1/extensions/{id}/storage` — response includes namespace, migrations, objects per `contracts/storage-api.md`
- [X] T100 [P] [US6] Write integration test: 404 response for extension without storage
- [X] T101 [P] [US6] Write integration test for `POST /api/v1/extensions/{id}/storage/validate` — returns static + dry-run reports
- [X] T102 [P] [US6] Write integration test for `POST /api/v1/extensions/{id}/storage/verify` — returns healthy IntegrityReport
- [X] T103 [P] [US7] Write integration test: manually DELETE namespace table, call `/verify` → drift detected, namespace `repair_required`
- [X] T104 [P] [US6] Write integration test for `POST /api/v1/extensions/{id}/storage/uninstall` with `policy_override` in request body
- [X] T105 [P] [US6] Write integration test for `GET /api/v1/storage/namespaces` — lists all namespaces

### Implementation for US-6 + US-7

- [X] T106 [US6] Verify `get_storage_status()` handler in `crates/nexus-api/src/handlers/storage_contributions.rs` returns response matching `contracts/storage-api.md` section 1.1
- [X] T107 [US6] Verify `validate_storage()` handler returns combined `StaticValidationReport` + `DryRunReport` per section 1.2
- [X] T108 [US6] Verify `apply_storage()` handler returns `ApplyReport` per section 1.3
- [X] T109 [US6] Verify `verify_storage()` handler returns `IntegrityReport` per section 1.4
- [X] T110 [US6] Verify `uninstall_storage()` handler accepts optional `policy_override` in request body per section 1.5
- [X] T111 [US6] Verify `list_namespaces()` handler supports `status` query parameter filter per section 1.6
- [X] T112 [US7] Verify `verify_namespace()` in `crates/nexus-storage/src/storage_manager.rs` — queries `sqlite_master WHERE name LIKE prefix%`, compares against `extension_storage_objects` where status=`present`, reports missing/unexpected
- [X] T113 [US7] On drift detection: update object status to `drifted`, namespace status to `repair_required`, emit `StorageIntegrityDriftDetected` event
- [X] T114 [US7] Add quarantine behavior — track consecutive failure count, auto-quarantine after `StorageLimits.quarantine_threshold` failures
- [X] T115 [US7] Write integration test: 3 consecutive apply failures → extension quarantined
- [X] T116 [US7] Write integration test: 2 failures then success → counter resets, not quarantined
- [X] T117 [US6] Run `cargo test` (full workspace) — verify PASS

**Checkpoint**: All 6 API endpoints functional. Integrity verification detects and reports drift. Quarantine prevents infinite retries.

---

## Phase 9: US-8 — Chat/LLM Extension Example (Priority: P3)

**Goal**: Worked example demonstrating full lifecycle end-to-end.

**Independent Test**: Install `example.chat.llama` → 4 tables + 4 indexes. Full lifecycle through uninstall.

### Tests for US-8

- [X] T118 [P] [US8] Write E2E test in `tests/integration/extension_storage_test.rs`: discover `example.chat.llama` → validate → apply → verify 4 tables + 4 indexes with `ext_chat_llama_` prefix
- [X] T119 [P] [US8] Write E2E test: disable → tables remain → re-enable → active without migrations
- [X] T120 [P] [US8] Write E2E test: uninstall with `retain` → tables remain
- [X] T121 [P] [US8] Write E2E test: uninstall with `drop_namespace_objects` → tables dropped
- [X] T122 [P] [US8] Write E2E test: uninstall with `archive_then_drop` → JSONL ZIP archive created, tables dropped

### Implementation for US-8

- [X] T123 [US8] Verify `extensions/example-chat-llama/manifest.yaml` matches updated spec — storage block, capabilities, migration paths
- [X] T124 [US8] Verify `extensions/example-chat-llama/storage/migrations/001_init.sql` uses `{{prefix}}` placeholders, creates 4 tables, follows naming conventions
- [X] T125 [US8] Verify `extensions/example-chat-llama/storage/migrations/002_indexes.sql` uses `{{prefix}}` placeholders, creates 4 indexes, follows `{prefix}idx_` naming
- [X] T126 [US8] Run full `cargo test` — verify all E2E tests PASS

**Checkpoint**: Complete lifecycle proven end-to-end with real extension example.

---

## Phase 10: Polish & Cross-Cutting Concerns

- [X] T127 [P] Update `schemas/storage-contribution.schema.json` — add `maxItems: 64` to `migrations.files`, verify all field patterns match spec
- [X] T128 [P] Verify all 11 `NexusEvent` storage variants in `crates/nexus-events/src/types.rs` match `contracts/storage-api.md` event payloads
- [X] T129 Run `cargo fmt --check` across full workspace
- [X] T130 Run `cargo clippy` across full workspace — zero warnings
- [X] T131 Run `cargo test` across full workspace — all tests PASS
- [X] T132 Run `cargo build --release` — verify succeeds

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 — BLOCKS all user stories
- **US-1 (Phase 3)**: Depends on Phase 2 — entry point for storage system
- **US-2 (Phase 4)**: Depends on US-1 (needs manifest parsing)
- **US-3 (Phase 5)**: Depends on US-2 (extends validator)
- **US-4 (Phase 6)**: Depends on US-2 (extends planner) — can parallel with US-3
- **US-5 (Phase 7)**: Depends on US-2 (needs working apply pipeline)
- **US-6+US-7 (Phase 8)**: Depends on US-2 + US-5 (needs manager + uninstall)
- **US-8 (Phase 9)**: Depends on US-6 (needs APIs for full lifecycle test)
- **Polish (Phase 10)**: Depends on all phases complete

### User Story Dependencies

- **US-1 (P1)**: Can start after Foundational — no other story dependencies
- **US-2 (P1)**: Depends on US-1 — core validation/apply pipeline
- **US-3 (P1)**: Depends on US-2 — extends validator. Can parallel with US-4.
- **US-4 (P1)**: Depends on US-2 — extends planner. Can parallel with US-3.
- **US-5 (P2)**: Depends on US-2 — adds lifecycle management
- **US-6+US-7 (P2)**: Depends on US-2 + US-5 — REST API + integrity
- **US-8 (P3)**: Depends on US-6 — end-to-end demonstration

### Parallel Opportunities

| Phase | Parallel Tasks |
|-------|---------------|
| Phase 1 (Setup) | T002, T003, T004, T006, T007 |
| Phase 2 (Foundational) | T010, T011, T012, T013 |
| Phase 3 (US-1) | T017–T026 (all tests), T027–T030 (different validation rules) |
| Phase 4 (US-2) | T033–T046 (all tests), T047–T051 (different validation concerns) |
| Phase 5 (US-3) | T059–T064 (all tests) |
| Phase 6 (US-4) | T069–T074 (all tests) |
| Phase 7 (US-5) | T082–T087 (all tests) |
| Phase 8 (US-6+7) | T099–T105 (all tests), T106–T111 (different handlers) |
| Phase 9 (US-8) | T118–T122 (all E2E tests) |
| Phase 10 (Polish) | T127, T128 |

---

## Parallel Example: Phase 4 (US-2)

```bash
# Launch all US-2 tests in parallel (different test files, no dependencies):
Task T033: "Unit test: CREATE TABLE allowed"
Task T034: "Unit test: CREATE INDEX allowed"
Task T035: "Unit test: ALTER TABLE ADD COLUMN allowed"
Task T036: "Unit test: DROP TABLE rejected"
Task T037: "Unit test: INSERT/UPDATE/DELETE rejected"
Task T042: "Unit test: new install plan has all migrations"
Task T043: "Unit test: file not found error"

# After tests written, implementation in parallel (different files):
Task T047: "Verify sql_validator.rs rejects forbidden statements"
Task T049: "Add UTF-8 check in plan.rs"
Task T050: "Add file size check in plan.rs"
Task T052: "Verify dry-run in storage_manager.rs"
```

---

## Implementation Strategy

### MVP First (US-1 + US-2 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: US-1 (manifest parsing)
4. Complete Phase 4: US-2 (validate + apply)
5. **STOP and VALIDATE**: Extension with storage block installs, validates, and applies
6. This proves the core value proposition

### Incremental Delivery

1. Setup + Foundational → DB + limits ready
2. US-1 (manifest) → parsing works
3. US-2 (validate + apply) → core pipeline works (MVP!)
4. US-3 (isolation) → security proven
5. US-4 (upgrades) → lifecycle management
6. US-5 (uninstall) → cleanup policies + JSONL ZIP archives
7. US-6+US-7 (APIs + integrity) → admin tools + quarantine
8. US-8 (example) → demonstration

### Parallel Team Strategy

With multiple agents after Foundational:
- Agent A: US-1 → US-2 (critical path)
- Agent B: US-5 (uninstall/archive — independent after US-2)
- Agent C: US-6+US-7 (API handlers — independent after US-2)

US-3 and US-4 can parallel with each other after US-2 completes.

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Since much infrastructure already exists, many "implementation" tasks are verification + gap-filling
- Run `cargo check` frequently during implementation
- Run `cargo clippy` before each checkpoint
- Commit after each phase or logical group of related tasks
- The SQL validator is the most complex single component — budget extra verification time
