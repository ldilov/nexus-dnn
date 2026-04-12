# Implementation Plan: Extension Storage Contributions

**Branch**: `feature/004-extension-storage` | **Date**: 2026-04-12 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/004-extension-storage-contributions/spec.md`

## Summary

Host-owned SQLite namespace model where extensions declare storage needs in their manifest. The host validates SQL against a safe profile, dry-runs against a temp DB, then applies migrations transactionally. Five host-owned metadata tables track namespaces, migrations, objects, operations, and archives. Six REST endpoints expose storage status and admin operations. Eleven event types track the full lifecycle.

## Technical Context

**Language/Version**: Rust (latest stable, 2024 edition)
**Primary Dependencies**: sqlx 0.8 (SQLite), sqlparser (SQL validation), sha2 (checksums), serde/serde_json (serialization), axum 0.8 (API), tokio (async)
**Storage**: SQLite — single metadata database extended with 5 new tables via migration 003
**Testing**: cargo test (unit + integration), temp in-memory SQLite for dry-run tests
**Target Platform**: Local-first desktop (Linux, Windows, macOS)
**Project Type**: Rust library crates (nexus-extension, nexus-storage, nexus-api, nexus-events)
**Performance Goals**: Validation <500ms per extension, apply <1s for typical migration set
**Constraints**: No direct DB access for extensions, SQL profile limited to DDL only, single-writer host
**Scale/Scope**: 4 crates modified, 1 new migration, ~15 new source files, ~2500 LOC

## Constitution Check

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Ecosystem-First | PASS | sqlparser, sha2, sqlx — battle-tested crates |
| II. Pure Functions & SOLID | PASS | Planner/Validator/Manager traits follow ISP and DIP |
| III. Extendability | PASS | Trait-based dispatch, pluggable SQL profiles |
| IV. Self-Documenting Code | PASS | No inline comments |
| V. Git-Flow | PASS | Feature branch from develop |
| VI. Living Documentation | PASS | Spec, data model, contracts documented |
| VII. Clean Provenance | PASS | No generative artifacts |
| VIII. Memory Safety | PASS | No unsafe, Result-based errors |
| IX. Parallelism-First | PASS | Independent extension validations concurrent |

## Project Structure

### Documentation (this feature)

```text
specs/004-extension-storage-contributions/
├── spec.md
├── plan.md               (this file)
├── research.md
├── data-model.md
├── contracts/
│   └── storage-api.md
└── reference/             (11 design docs + schema + examples)
```

### Source Code

```text
crates/nexus-extension/src/
├── manifest.rs            MODIFY: add StorageContribution to ExtensionManifest
├── storage/               CREATE: new module
│   ├── mod.rs             exports
│   ├── contribution.rs    StorageContribution types + parsing
│   ├── plan.rs            StoragePlan builder + checksum computation
│   └── sql_validator.rs   nexus_sqlite_v1 profile validator (sqlparser)

crates/nexus-storage/src/
├── database.rs            MODIFY: add namespace/migration/object trait methods
├── sqlite.rs              MODIFY: implement new Database methods
├── records.rs             MODIFY: add 5 new record types
├── storage_manager.rs     CREATE: ExtensionStorageManager implementation
└── error.rs               MODIFY: add storage contribution error variants

crates/nexus-events/src/
└── types.rs               MODIFY: add 11 storage lifecycle event variants

crates/nexus-api/src/
├── handlers/
│   ├── mod.rs             MODIFY: add storage_contributions module
│   └── storage_contributions.rs  CREATE: 6 endpoint handlers
└── router.rs              MODIFY: register 6 new routes

migrations/
└── 003_extension_storage.sql    CREATE: 5 metadata tables + indexes

schemas/
├── extension-manifest.json      MODIFY: add optional storage field
└── storage-contribution.schema.json  CREATE: from reference pack
```

## Implementation Phases

### Phase A: Schema + Manifest Parsing (US-1)

1. Copy `storage-contribution.schema.json` to `schemas/`
2. Add optional `storage` field to `extension-manifest.json`
3. Create `nexus-extension/src/storage/contribution.rs` with StorageContribution types
4. Add `storage: Option<StorageContribution>` to ExtensionManifest
5. Add `storage.schema_contribute` capability validation
6. Unit tests: valid/invalid manifest, missing capability, path traversal, duplicate IDs

### Phase B: SQL Validator (US-2, US-3)

1. Add `sqlparser` dependency to `nexus-extension`
2. Implement nexus_sqlite_v1 profile in `sql_validator.rs`:
   - Parse with `sqlparser::parser::Parser` + `SQLiteDialect`
   - Allowlist: CreateTable, CreateIndex, AlterTable(AddColumn)
   - Denylist: Drop, Insert, Update, Delete, CreateView, CreateTrigger, Attach, Detach, Pragma
   - Extract object names, validate prefix pattern `^{{prefix}}[a-z][a-z0-9_]{1,62}$`
   - Validate FK references within same namespace only
3. Implement `{{prefix}}` placeholder expansion
4. Unit tests per statement type + prefix violations + cross-namespace FK

### Phase C: Plan Builder (US-2, US-4)

1. Implement StoragePlan builder in `plan.rs`
2. Add `sha2` dependency for checksums
3. Plan logic: read files, compute checksums, query existing state, determine action
4. Upgrade detection: skip applied (checksum match), plan new, detect drift
5. Unit tests: new install, upgrade, drift, reorder rejection

### Phase D: Host Metadata Tables (US-2)

1. Create `migrations/003_extension_storage.sql` with 5 tables + 5 indexes
2. Add NamespaceRecord, MigrationRecord, ObjectRecord, OperationRecord, ArchiveRecord to records.rs
3. Add Database trait methods for CRUD on all 5 tables
4. Implement in sqlite.rs
5. Verify migration applies with `cargo test`

### Phase E: Storage Manager (US-2, US-3, US-5, US-7)

1. Create `storage_manager.rs` implementing ExtensionStorageManager
2. reserve_namespace: insert + collision check via sqlite_master
3. apply_plan: transaction + savepoints per migration
4. verify_namespace: compare sqlite_master vs recorded objects
5. uninstall_namespace: retain / drop (reverse dependency) / archive_then_drop
6. Integration tests with in-memory SQLite

### Phase F: Activation Pipeline (US-2)

1. Extend ActivatedExtension with parsed storage contribution
2. Extend process_extension() to build plan, validate, dry-run, block on error
3. Extend persist_discovered_extensions() to call apply_plan
4. Add 11 NexusEvent variants for storage lifecycle
5. Emit events at each stage

### Phase G: API Endpoints (US-6)

1. Create 6 handlers in storage_contributions.rs
2. Register routes: /extensions/{id}/storage, /storage/namespaces, etc.
3. Wire ExtensionStorageManager to AppState
4. Integration tests per endpoint

### Phase H: Chat Example (US-8)

1. Add storage block to example extension manifest
2. Include migration SQL files
3. E2E test: full lifecycle (discover → apply → verify → disable → re-enable → uninstall)

## Dependency Graph

```
Phase A (manifest) ─┐
Phase B (validator) ─┼─→ Phase C (planner) ─┐
Phase D (tables) ────┼─→ Phase E (manager) ──┼─→ Phase F (integration) → Phase G (API) → Phase H (example)
```

A, B, D are parallelizable. C needs A+B. E needs D. F needs C+E.

## New Dependencies

| Crate | Version | Used In | Purpose |
|-------|---------|---------|---------|
| sqlparser | ^0.55 | nexus-extension | SQL AST parsing for validation |
| sha2 | ^0.10 | nexus-extension | Migration file checksums |
