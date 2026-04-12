# Tasks: Extension Storage Contributions

**Input**: Design documents from `/specs/004-extension-storage-contributions/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/storage-api.md

**Tests**: Included per constitution (cargo test required before merge).

**Organization**: Tasks grouped by user story. US-1/US-2/US-3/US-4 are P1 (MVP), US-5/US-6/US-7 are P2, US-8 is P3.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story (US1-US8)
- Exact file paths from plan.md project structure

---

## Phase 1: Setup

**Purpose**: Add dependencies and copy schemas

- [ ] T001 Add `sqlparser = "0.55"` and `sha2 = "0.10"` to `crates/nexus-extension/Cargo.toml`
- [ ] T002 [P] Copy `storage-contribution.schema.json` from `specs/004-extension-storage-contributions/reference/schemas/` to `schemas/storage-contribution.schema.json`
- [ ] T003 [P] Add optional `storage` field to `schemas/extension-manifest.json` referencing storage-contribution schema
- [ ] T004 Create module directory `crates/nexus-extension/src/storage/` with `mod.rs` exporting submodules

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Host metadata tables and record types that ALL user stories depend on

- [ ] T005 Create `migrations/003_extension_storage.sql` with 5 tables: `extension_storage_namespaces`, `extension_storage_migrations`, `extension_storage_objects`, `extension_storage_operations`, `extension_storage_archives` plus recommended indexes per `data-model.md`
- [ ] T006 [P] Add `NamespaceRecord` struct to `crates/nexus-storage/src/records.rs` with all columns from `extension_storage_namespaces`
- [ ] T007 [P] Add `MigrationRecord` struct to `crates/nexus-storage/src/records.rs` with all columns from `extension_storage_migrations`
- [ ] T008 [P] Add `ObjectRecord` struct to `crates/nexus-storage/src/records.rs` with all columns from `extension_storage_objects`
- [ ] T009 [P] Add `OperationRecord` struct to `crates/nexus-storage/src/records.rs` with all columns from `extension_storage_operations`
- [ ] T010 [P] Add `ArchiveRecord` struct to `crates/nexus-storage/src/records.rs` with all columns from `extension_storage_archives`
- [ ] T011 Add `StorageContributionError` variants to `crates/nexus-storage/src/error.rs`: `NamespaceCollision`, `MigrationChecksum`, `SqlValidation`, `PrefixViolation`, `ApplyFailed`, `DryRunFailed`, `IntegrityDrift`, `ArchiveFailed`
- [ ] T012 Add Database trait methods for namespace CRUD to `crates/nexus-storage/src/database.rs`: `insert_namespace`, `get_namespace`, `get_namespace_by_extension`, `list_namespaces`, `update_namespace_status`
- [ ] T013 Add Database trait methods for migration CRUD to `crates/nexus-storage/src/database.rs`: `insert_migration_record`, `list_migrations_for_namespace`, `get_migration_record`
- [ ] T014 Add Database trait methods for object CRUD to `crates/nexus-storage/src/database.rs`: `insert_object_record`, `list_objects_for_namespace`, `update_object_status`
- [ ] T015 Add Database trait methods for operation/archive CRUD to `crates/nexus-storage/src/database.rs`: `insert_operation`, `update_operation`, `insert_archive`, `list_archives_for_namespace`
- [ ] T016 Implement all new Database trait methods in `crates/nexus-storage/src/sqlite.rs` with parameterized queries
- [ ] T017 Write unit test in `crates/nexus-storage/src/sqlite.rs` `#[cfg(test)]` verifying migration 003 applies cleanly and all CRUD methods work against in-memory SQLite
- [ ] T018 Run `cargo test -p nexus-storage` and `cargo clippy -p nexus-storage` — verify PASS

**Checkpoint**: Database layer ready. All metadata tables exist with typed records and CRUD methods.

---

## Phase 3: US-1 — Extension Declares Storage in Manifest (Priority: P1) MVP

**Goal**: Parse the optional `storage` block from extension manifests and validate capability declaration.

**Independent Test**: Install an extension with a `storage` block. Host recognizes it and includes it in validation report.

- [ ] T019 [P] [US1] Create `crates/nexus-extension/src/storage/contribution.rs` with `StorageContribution`, `NamespaceDeclaration`, `MigrationDeclaration`, `MigrationFileRef`, `SqlProfileDeclaration`, `UninstallDeclaration`, `RuntimeAccessDeclaration` structs with serde Deserialize derives
- [ ] T020 [P] [US1] Add `pub mod storage;` to `crates/nexus-extension/src/lib.rs` and export `StorageContribution` types
- [ ] T021 [US1] Add `storage: Option<StorageContribution>` field to `ExtensionManifest` in `crates/nexus-extension/src/manifest.rs`
- [ ] T022 [US1] Add validation in `crates/nexus-extension/src/registry.rs` `process_extension()`: if manifest has `storage` block, check that `capabilities` includes `storage.schema_contribute` — push validation error if missing
- [ ] T023 [US1] Add validation for namespace alias regex `^[a-z][a-z0-9_]{2,48}$` in `contribution.rs`
- [ ] T024 [US1] Add validation for migration file ID regex `^[0-9]{3}_[a-z0-9_]{2,64}$` and uniqueness check in `contribution.rs`
- [ ] T025 [US1] Add path traversal check for migration file paths (must stay within extension directory) in `contribution.rs`
- [ ] T026 [US1] Add effective prefix computation: `format!("ext_{}_", alias)` in `contribution.rs`
- [ ] T027 [US1] Write unit tests in `crates/nexus-extension/src/storage/contribution.rs` `#[cfg(test)]`: valid storage block parses, missing capability fails, invalid alias fails, duplicate migration IDs fail, path traversal rejected, prefix computed correctly
- [ ] T028 [US1] Run `cargo test -p nexus-extension` and `cargo clippy -p nexus-extension` — verify PASS

**Checkpoint**: Manifest parsing works. Extensions can declare storage blocks and the host validates them.

---

## Phase 4: US-2 — Host Validates and Applies Migrations (Priority: P1) MVP

**Goal**: Multi-stage validation (static SQL + dry-run) then transactional apply with metadata recording.

**Independent Test**: Install an extension with valid migrations. Host validates, dry-runs, applies, and records all metadata.

- [ ] T029 [P] [US2] Create `crates/nexus-extension/src/storage/sql_validator.rs` with `validate_sql_profile()` function: parse SQL with `sqlparser::parser::Parser` using `sqlparser::dialect::SQLiteDialect`, match on `Statement` variants — allow `CreateTable`, `CreateIndex`, `AlterTable` (AddColumn only), reject all others
- [ ] T030 [US2] Add object name extraction to `sql_validator.rs`: from each allowed statement, extract table/index names into a `Vec<ExtractedObject>` with name and type
- [ ] T031 [US2] Add prefix validation to `sql_validator.rs`: every extracted object name MUST match `^{effective_prefix}[a-z][a-z0-9_]{1,62}$`
- [ ] T032 [US2] Add FK validation to `sql_validator.rs`: scan `CreateTable` constraints, any FK reference to a table NOT starting with the effective prefix → reject
- [ ] T033 [US2] Add `{{prefix}}` placeholder expansion function to `sql_validator.rs`: replace all `{{prefix}}` occurrences with the effective prefix string
- [ ] T034 [US2] Write unit tests for `sql_validator.rs` `#[cfg(test)]`: CREATE TABLE allowed, CREATE INDEX allowed, ALTER TABLE ADD COLUMN allowed, DROP TABLE rejected, INSERT rejected, CREATE VIEW rejected, CREATE TRIGGER rejected, ATTACH/DETACH/PRAGMA rejected, prefix violation rejected, cross-namespace FK rejected, placeholder expansion works
- [ ] T035 [P] [US2] Create `crates/nexus-extension/src/storage/plan.rs` with `StoragePlan` struct and `build_plan()` function: read migration files from extension directory, compute SHA-256 checksums (raw + expanded) using `sha2` crate, determine action (new_install/upgrade/noop)
- [ ] T036 [US2] In `plan.rs` add upgrade detection: query existing `MigrationRecord` rows for namespace, compare checksums, skip already-applied, plan new ones, detect checksum drift
- [ ] T037 [US2] Write unit tests for `plan.rs` `#[cfg(test)]`: new install plan has all migrations, upgrade plan skips applied, checksum drift detected
- [ ] T038 [P] [US2] Create `crates/nexus-storage/src/storage_manager.rs` implementing `ExtensionStorageManager` trait with `reserve_namespace()`: insert `NamespaceRecord` with status `reserved`, query `sqlite_master` for prefix collision
- [ ] T039 [US2] Implement `apply_plan()` in `storage_manager.rs`: open transaction, call `reserve_namespace` (if new), for each migration: SAVEPOINT → execute expanded SQL → insert `MigrationRecord` → insert `ObjectRecord` entries → RELEASE, update namespace status to `active`, commit
- [ ] T040 [US2] Implement dry-run validation in `storage_manager.rs`: open `sqlite::memory:` pool (max_connections=1), run host migrations 001-003, then apply extension migrations, verify object inventory, close temp DB
- [ ] T041 [US2] Write integration tests for `storage_manager.rs` `#[cfg(test)]`: namespace reservation succeeds, apply creates tables and records metadata, dry-run validates without affecting real DB, migration failure rolls back cleanly
- [ ] T042 [US2] Add 11 storage event variants to `NexusEvent` enum in `crates/nexus-events/src/types.rs`: `StorageNamespaceReserved`, `StorageValidationStarted`, `StorageValidationFailed`, `StoragePlanReady`, `StorageApplyStarted`, `StorageMigrationApplied`, `StorageApplyFailed`, `StorageIntegrityVerified`, `StorageIntegrityDriftDetected`, `StorageUninstallStarted`, `StorageUninstallCompleted`
- [ ] T043 [US2] Extend `process_extension()` in `crates/nexus-extension/src/registry.rs`: after manifest validation, if storage block present: build plan → validate static → validate dry-run → block activation on error. Store parsed storage contribution in `ActivatedExtension`
- [ ] T044 [US2] Add `storage: Option<StorageContribution>` field to `ActivatedExtension` in `crates/nexus-extension/src/registry.rs`
- [ ] T045 [US2] Extend `persist_discovered_extensions()` in `crates/nexus-api/src/handlers/extensions.rs`: after persisting extension record, if storage plan exists and action is `new_install`, call `apply_plan()` on the storage manager. Emit events at each stage.
- [ ] T046 [US2] Add `storage_manager: Arc<dyn ExtensionStorageManager>` to `AppState` in `crates/nexus-api/src/lib.rs` (or use concrete type)
- [ ] T047 [US2] Run `cargo test` (full workspace) and `cargo clippy` — verify PASS

**Checkpoint**: Full validate → dry-run → apply pipeline works. Extensions with valid storage activate. Invalid storage blocks activation.

---

## Phase 5: US-3 — Namespace Isolation (Priority: P1)

**Goal**: Strict prefix enforcement and cross-namespace safety.

**Independent Test**: Attempt migrations with wrong prefix, host-table FK, or cross-extension FK. All fail validation.

- [ ] T048 [US3] Add reserved prefix deny list to `sql_validator.rs`: `["ext_sqlite_", "ext_host_", "ext_nexus_", "ext_core_"]`. Reject if computed prefix collides.
- [ ] T049 [US3] Add index name validation to `sql_validator.rs`: indexes MUST match `^{effective_prefix}idx_[a-z0-9_]{1,58}$`
- [ ] T050 [US3] Write integration test: extension with table name missing prefix → activation blocked with naming violation
- [ ] T051 [US3] Write integration test: extension with FK referencing host core table `workflows(id)` → activation blocked
- [ ] T052 [US3] Write integration test: two extensions with same alias → second activation blocked with collision error
- [ ] T053 [US3] Run `cargo test -p nexus-extension` — verify all isolation tests PASS

**Checkpoint**: Namespace isolation proven. No extension can escape its prefix boundary.

---

## Phase 6: US-4 — Extension Upgrade with New Migrations (Priority: P1)

**Goal**: Append new migrations without re-running applied ones. Detect tampering.

**Independent Test**: Install v0.4.0 with 2 migrations. Upgrade to v0.5.0 with 3 (same first 2 + new third). Only third runs.

- [ ] T054 [US4] Extend `build_plan()` in `plan.rs` to detect reordered migration IDs → reject upgrade
- [ ] T055 [US4] Extend `build_plan()` to detect alias change after install → reject upgrade
- [ ] T056 [US4] Write integration test: install v1 with 2 migrations, upgrade to v2 with 3 → only 3rd applied, tables intact
- [ ] T057 [US4] Write integration test: upgrade with modified contents of applied migration → blocked with checksum drift
- [ ] T058 [US4] Write integration test: upgrade with reordered migration IDs → blocked
- [ ] T059 [US4] Run `cargo test` — verify upgrade tests PASS

**Checkpoint**: Upgrades work safely. Tampering and reordering detected.

---

## Phase 7: US-5 — Extension Disable and Uninstall (Priority: P2)

**Goal**: Disable preserves data. Uninstall follows declared policy.

**Independent Test**: Disable extension — tables remain. Uninstall with drop — tables removed. Archive — export created.

- [ ] T060 [US5] Implement disable behavior: mark extension inactive but do NOT drop namespace objects. Update namespace status. (May already work if activation pipeline only applies on `new_install`/`upgrade`)
- [ ] T061 [US5] Implement re-enable check: if files/checksums match recorded state, re-enable without running migrations. If drift, block with `repair_required`
- [ ] T062 [US5] Implement `uninstall_namespace()` in `storage_manager.rs` for `retain` policy: remove package registration, keep namespace objects and metadata
- [ ] T063 [US5] Implement `uninstall_namespace()` for `drop_namespace_objects` policy: query `extension_storage_objects` for namespace, DROP tables/indexes in reverse dependency order, update object status to `dropped`, update namespace status to `dropped`
- [ ] T064 [US5] Implement `uninstall_namespace()` for `archive_then_drop` policy: for each namespace table, SELECT all rows → serialize as JSONL → write to ZIP archive file → record in `extension_storage_archives` → then execute drop policy
- [ ] T065 [US5] Write integration test: disable extension → tables remain in sqlite_master, namespace status stays `active`
- [ ] T066 [US5] Write integration test: re-enable with matching checksums → activates without migrations
- [ ] T067 [US5] Write integration test: re-enable with drifted files → blocked with `repair_required`
- [ ] T068 [US5] Write integration test: uninstall with `retain` → tables remain, package record removed
- [ ] T069 [US5] Write integration test: uninstall with `drop_namespace_objects` → all `ext_<alias>_*` tables/indexes gone from sqlite_master
- [ ] T070 [US5] Write integration test: uninstall with `archive_then_drop` → archive file created, then tables dropped
- [ ] T071 [US5] Run `cargo test` — verify all uninstall tests PASS

**Checkpoint**: Full lifecycle works: install → disable → re-enable → uninstall with all 3 policies.

---

## Phase 8: US-6 + US-7 — Storage APIs and Integrity Verification (Priority: P2)

**Goal**: REST endpoints for storage status, admin operations, and integrity verification.

**Independent Test**: Call `GET /extensions/{id}/storage` after install. Call `/verify` to check integrity. Call `/uninstall` to execute policy.

- [ ] T072 [P] [US6] Create `crates/nexus-api/src/handlers/storage_contributions.rs` with `get_storage_status()` handler: query namespace, migrations, objects for extension ID, return combined JSON per `contracts/storage-api.md`
- [ ] T073 [P] [US6] Add `validate_storage()` handler: re-run static + dry-run validation, return report
- [ ] T074 [P] [US6] Add `apply_storage()` handler: apply prepared plan, return apply report
- [ ] T075 [P] [US6] Add `verify_storage()` handler: compare sqlite_master objects vs recorded inventory, return integrity report
- [ ] T076 [P] [US6] Add `uninstall_storage()` handler: execute uninstall policy (with optional override from request body), return uninstall report
- [ ] T077 [P] [US6] Add `list_namespaces()` handler: list all extension storage namespaces for diagnostics
- [ ] T078 [US6] Add `pub mod storage_contributions;` to `crates/nexus-api/src/handlers/mod.rs`
- [ ] T079 [US6] Register 6 routes in `crates/nexus-api/src/router.rs`: `GET /extensions/{id}/storage`, `POST /extensions/{id}/storage/validate`, `POST /extensions/{id}/storage/apply`, `POST /extensions/{id}/storage/verify`, `POST /extensions/{id}/storage/uninstall`, `GET /storage/namespaces`
- [ ] T080 [US7] Implement `verify_namespace()` in `storage_manager.rs`: query `sqlite_master WHERE name LIKE prefix%`, compare against `extension_storage_objects` where status=`present`, report missing (drifted) and unexpected objects
- [ ] T081 [US7] On drift detection: update affected object status to `drifted`, update namespace status to `repair_required`, emit `StorageIntegrityDriftDetected` event
- [ ] T082 [US7] Write integration test: manually DELETE a namespace table from sqlite_master, call verify → drift detected, namespace marked `repair_required`
- [ ] T083 [US7] Write integration test: call verify on healthy namespace → status `healthy`, zero drift
- [ ] T084 [US6] Run `cargo test` (full workspace) and `cargo clippy` — verify PASS

**Checkpoint**: All 6 API endpoints functional. Integrity verification detects and reports drift.

---

## Phase 9: US-8 — Chat/LLM Extension Example (Priority: P3)

**Goal**: Worked example demonstrating the full lifecycle end-to-end.

**Independent Test**: Install chat-llama → 4 tables + 4 indexes created. Disable → tables remain. Upgrade → new migration applies. Uninstall → policy executed.

- [ ] T085 [US8] Add `storage` block to `extensions/example-image-basic/manifest.yaml` OR create a new `extensions/example-chat-llama/manifest.yaml` with storage block, operators, and recipes per `reference/examples/chat-llama/manifest.yaml`
- [ ] T086 [US8] Create `extensions/example-chat-llama/storage/migrations/001_init.sql` with threads, messages, message_attachments, thread_model_profiles tables per `reference/examples/chat-llama/storage/migrations/001_init.sql`
- [ ] T087 [US8] Create `extensions/example-chat-llama/storage/migrations/002_indexes.sql` with 4 indexes per `reference/examples/chat-llama/storage/migrations/002_indexes.sql`
- [ ] T088 [US8] Write E2E integration test in `tests/integration/extension_storage_test.rs`: discover chat-llama → validate → apply → verify 4 tables + 4 indexes with `ext_chat_llama_` prefix → disable → verify tables remain → re-enable → uninstall with retain → verify tables remain
- [ ] T089 [US8] Run full `cargo test` — verify E2E test PASS

**Checkpoint**: Complete worked example proves the system end-to-end.

---

## Phase 10: Polish & Cross-Cutting Concerns

- [ ] T090 [P] Update `docs/extension-guide.md` with storage contributions section: how to declare storage in manifest, SQL profile rules, migration file format
- [ ] T091 [P] Update `docs/database-schema.md` with 5 new metadata tables
- [ ] T092 [P] Update `docs/api-reference.md` with 6 new storage endpoints
- [ ] T093 Run `cargo fmt --check` across full workspace
- [ ] T094 Run `cargo clippy` across full workspace — zero warnings
- [ ] T095 Run `cargo test` across full workspace — all tests PASS
- [ ] T096 Verify `cargo build --release` succeeds

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 — BLOCKS all user stories
- **US-1 (Phase 3)**: Depends on Phase 2 — can start after foundational
- **US-2 (Phase 4)**: Depends on Phase 3 (needs manifest parsing) + Phase 2 (needs DB methods)
- **US-3 (Phase 5)**: Depends on Phase 4 (extends validator)
- **US-4 (Phase 6)**: Depends on Phase 4 (extends plan builder)
- **US-5 (Phase 7)**: Depends on Phase 4 (needs working apply pipeline)
- **US-6+US-7 (Phase 8)**: Depends on Phase 4 + Phase 7 (needs manager + uninstall)
- **US-8 (Phase 9)**: Depends on Phase 8 (needs APIs for full lifecycle test)
- **Polish (Phase 10)**: Depends on all phases complete

### User Story Dependencies

- **US-1 (P1)**: Independent after Foundational
- **US-2 (P1)**: Depends on US-1
- **US-3 (P1)**: Depends on US-2 (extends validator)
- **US-4 (P1)**: Depends on US-2 (extends planner) — can parallel with US-3
- **US-5 (P2)**: Depends on US-2
- **US-6+US-7 (P2)**: Depends on US-2 + US-5
- **US-8 (P3)**: Depends on US-6

### Parallel Opportunities

- T002, T003, T004 in Phase 1 (different files)
- T006-T010 in Phase 2 (all add record structs to same file — but could be one commit)
- T019, T020 in Phase 3 (different files)
- T029, T035 in Phase 4 (sql_validator.rs vs plan.rs)
- T072-T077 in Phase 8 (each handler is independent)
- T090, T091, T092 in Phase 10 (different doc files)

---

## Parallel Example: Phase 4 (US-2)

```bash
# These can run in parallel (different files):
Task T029: "Create sql_validator.rs with validate_sql_profile()"
Task T035: "Create plan.rs with StoragePlan and build_plan()"
Task T038: "Create storage_manager.rs with reserve_namespace()"

# These must be sequential (same file dependencies):
T029 → T030 → T031 → T032 → T033 → T034  (sql_validator build-up)
T035 → T036 → T037                          (plan builder build-up)
T038 → T039 → T040 → T041                  (storage manager build-up)
```

---

## Implementation Strategy

### MVP First (US-1 + US-2 only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (metadata tables + DB methods)
3. Complete Phase 3: US-1 (manifest parsing)
4. Complete Phase 4: US-2 (validate + apply)
5. **STOP and VALIDATE**: Extension with storage block installs, validates, and applies
6. This proves the core value proposition

### Incremental Delivery

1. Setup + Foundational → DB ready
2. US-1 (manifest) → parsing works
3. US-2 (validate + apply) → core pipeline works (MVP!)
4. US-3 (isolation) → security proven
5. US-4 (upgrades) → lifecycle management
6. US-5 (uninstall) → cleanup policies
7. US-6+US-7 (APIs + integrity) → admin tools
8. US-8 (example) → demonstration

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story
- Commit after each task or logical group of 2-3 related tasks
- Run `cargo check` frequently to catch issues early
- Run `cargo clippy` before each checkpoint
- The SQL validator is the most complex single component — budget extra time
