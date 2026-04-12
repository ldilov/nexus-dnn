# Feature Specification: Extension Storage Contributions

**Feature Branch**: `feature/004-extension-storage`
**Created**: 2026-04-12
**Status**: Draft
**Input**: nexus_extension_storage_spec_pack.zip (11 design documents, JSON schema, worked example)

## Overview

Host-owned, extension-declared SQLite schema contribution model for Nexus. Extensions declare namespaced relational storage needs in their manifest. The host remains sole authority over the database file, connections, WAL mode, migrations, integrity checks, and recovery. Extensions never receive direct database access — the host validates, plans, and applies all schema changes before an extension becomes active.

This enables stateful extension categories (chat, retrieval, metadata-heavy integrations) that pure artifacts alone cannot efficiently support, while preserving host authority, namespace isolation, and operational safety.

## User Scenarios & Testing

### User Story 1 — Extension Declares Storage in Manifest (Priority: P1)

An extension developer adds an optional `storage` block to their `manifest.yaml`, declaring a namespace alias, migration files, and SQL profile. The host parses this block during extension discovery and includes it in the validation pipeline.

**Why this priority**: Without manifest parsing, no other storage feature can function. This is the entry point for the entire system.

**Independent Test**: Install an extension with a `storage` block. The host recognizes the storage declaration, computes the effective prefix, and includes it in the validation report without applying anything yet.

**Acceptance Scenarios**:

1. **Given** an extension manifest with a valid `storage` block (spec_version "0.1", engine "sqlite", alias matching `^[a-z][a-z0-9_]{2,48}$`, at least one migration file), **When** the host discovers the extension, **Then** the host parses the storage block, computes the effective prefix (`ext_<alias>_`), and proceeds to validation.
2. **Given** a manifest missing the `storage.schema_contribute` capability but containing a `storage` block, **When** the host validates, **Then** validation fails with an explicit error: capability not declared.
3. **Given** a manifest with duplicate migration IDs, **When** the host validates, **Then** validation fails with an error identifying the duplicate.
4. **Given** a manifest with a migration file path that traverses outside the extension directory (e.g., `../../etc/shadow`), **When** the host validates, **Then** validation fails with a path safety error.
5. **Given** a manifest without a `storage` block, **When** the host discovers the extension, **Then** extension activation proceeds normally without any storage-related validation.

---

### User Story 2 — Host Validates and Applies Migrations (Priority: P1)

The host performs multi-stage validation (static SQL analysis + dry-run against temp DB) before applying migrations transactionally to the real database. The extension transitions to `active` only after all storage operations succeed.

**Why this priority**: This is the core safety mechanism — the entire value proposition depends on the host validating before mutating.

**Independent Test**: Install a storage-contributing extension. Observe the host validate SQL statically, run a dry-run against a temporary database, then apply migrations transactionally, recording each step in metadata tables.

**Acceptance Scenarios**:

1. **Given** a valid extension with two migration files, **When** the host runs static validation, **Then** every SQL statement is checked against the `nexus_sqlite_v1` profile: only `CREATE TABLE`, `CREATE INDEX`, `CREATE UNIQUE INDEX`, and `ALTER TABLE ADD COLUMN` are allowed. `DROP`, `INSERT`, `UPDATE`, `DELETE`, `CREATE VIEW`, `CREATE TRIGGER`, `ATTACH`, `DETACH`, `VACUUM`, `PRAGMA`, and virtual/FTS tables are rejected.
2. **Given** static validation passes, **When** the host runs dry-run validation, **Then** migrations execute against a temporary in-memory SQLite database pre-loaded with host core schema and metadata tables. Object inventory is verified.
3. **Given** dry-run passes, **When** the host applies migrations, **Then** it opens a transaction, reserves the namespace, executes each migration file in manifest order, records migration rows (with raw and expanded checksums), records object inventory, updates namespace status to `active`, and commits.
4. **Given** migration execution fails mid-apply, **When** the transaction rolls back, **Then** no partial objects exist, the extension is marked `quarantined_storage`, and an `extension.storage.apply_failed` event is emitted.
5. **Given** a migration creates a table name that does not start with the effective prefix, **When** static validation runs, **Then** it rejects the migration with a naming violation error.

---

### User Story 3 — Namespace Isolation and SQL Safety (Priority: P1)

The host enforces strict namespace isolation: all extension SQL objects must use the host-derived prefix, foreign keys may only reference tables within the same namespace, and no extension migration may reference host core tables.

**Why this priority**: Isolation is the security model. Without it, extensions could corrupt host state or other extensions' data.

**Independent Test**: Attempt to install an extension whose migration creates a table without the prefix, references a host core table via FK, or references another extension's namespace. All must fail validation.

**Acceptance Scenarios**:

1. **Given** a migration with `CREATE TABLE chat_threads (...)` (missing prefix), **When** static validation runs, **Then** it fails: table name does not match `^{{prefix}}[a-z][a-z0-9_]{1,62}$`.
2. **Given** a migration with a foreign key referencing `workflows(id)` (a host core table), **When** static validation runs, **Then** it fails: cross-namespace FK detected.
3. **Given** a migration with a foreign key referencing another extension's table (`ext_other_sessions`), **When** static validation runs, **Then** it fails: cross-namespace FK detected.
4. **Given** two extensions requesting the same namespace alias, **When** the second extension is validated, **Then** activation is blocked: effective prefix collision.
5. **Given** a migration using `{{prefix}}` placeholders, **When** the host expands them, **Then** `{{prefix}}` is replaced with the effective prefix (e.g., `ext_chat_llama_`). No other placeholder syntax is recognized.

---

### User Story 4 — Extension Upgrade with New Migrations (Priority: P1)

An extension developer publishes a new version that appends additional migration files. The host detects this as an upgrade, validates the new migrations, and applies them without re-running previously applied migrations.

**Why this priority**: Upgrades are inevitable for any living extension. The system must handle them safely.

**Independent Test**: Install v0.4.0 with 2 migrations. Upgrade to v0.5.0 with 3 migrations (same first 2 + new third). Only the third migration runs.

**Acceptance Scenarios**:

1. **Given** v0.4.0 installed with migrations 001_init and 002_indexes applied, **When** v0.5.0 is discovered with migrations 001_init, 002_indexes, and 003_add_tags, **Then** the host computes an upgrade plan: skip 001/002 (checksum match), apply 003.
2. **Given** v0.5.0 changes the contents of 001_init (checksum drift), **When** the host validates, **Then** activation is blocked with `repair_required` status: applied migration contents must not change.
3. **Given** v0.5.0 changes the namespace alias, **When** the host validates, **Then** activation is blocked: alias change after install is forbidden.
4. **Given** v0.5.0 reorders migration IDs (e.g., 002 before 001), **When** the host validates, **Then** activation is blocked: migration order must be preserved.

---

### User Story 5 — Extension Disable and Uninstall with Storage (Priority: P2)

An operator disables or uninstalls a storage-contributing extension. Disabling preserves namespace objects. Uninstalling follows the declared policy: `retain`, `drop_namespace_objects`, or `archive_then_drop`.

**Why this priority**: Important for lifecycle management but less frequent than install/upgrade. The default safe behavior (retain) minimizes risk.

**Independent Test**: Disable an extension — verify tables remain. Uninstall with `drop_namespace_objects` — verify tables are dropped but host metadata retained. Uninstall with `archive_then_drop` — verify archive file created before drop.

**Acceptance Scenarios**:

1. **Given** an active extension with storage, **When** the operator disables it, **Then** the extension becomes inactive, namespace objects remain in the database, migration metadata remains intact, and the namespace status stays `active`.
2. **Given** a disabled extension, **When** the operator re-enables it and files/checksums match recorded state, **Then** the extension re-activates without running any migrations.
3. **Given** a disabled extension whose migration files have drifted, **When** re-enable is attempted, **Then** activation is blocked with `repair_required`.
4. **Given** uninstall policy is `retain`, **When** the operator uninstalls, **Then** package registration is removed but namespace objects and metadata persist for diagnostics.
5. **Given** uninstall policy is `drop_namespace_objects`, **When** the operator uninstalls, **Then** namespace tables and indexes are dropped in reverse dependency order. Host metadata (namespaces, migrations, objects rows) is retained with `dropped` status.
6. **Given** uninstall policy is `archive_then_drop`, **When** the operator uninstalls, **Then** the host exports namespace tables to an archive file, verifies the archive, records it in `extension_storage_archives`, then drops objects. If archive fails, drop is aborted.

---

### User Story 6 — Storage Diagnostics and Admin APIs (Priority: P2)

The operator queries extension storage status, migration history, and object inventory via REST APIs. Admin operations include re-validation, integrity verification, and manual uninstall.

**Why this priority**: Essential for observability and operational safety but not on the critical install path.

**Independent Test**: Call `GET /extensions/{id}/storage` after install. Verify response includes namespace status, applied migrations, and object inventory.

**Acceptance Scenarios**:

1. **Given** an installed extension with storage, **When** `GET /api/v1/extensions/{id}/storage` is called, **Then** the response includes: namespace metadata (alias, prefix, status, engine, profile, policy), migration history (id, status, checksum, applied_at), and object inventory (tables and indexes).
2. **Given** an extension with storage, **When** `POST /api/v1/extensions/{id}/storage/verify` is called, **Then** the host compares actual database objects against recorded inventory and reports: objects present, objects missing (drifted), objects unexpected.
3. **Given** integrity drift is detected, **When** the verification completes, **Then** the namespace is marked `repair_required` and an `extension.storage.integrity_drift_detected` event is emitted.
4. **Given** any storage lifecycle event occurs (namespace reserved, migration applied, apply failed, etc.), **When** the event bus publishes, **Then** the event payload includes: type, extension_id, namespace_id, effective_prefix, and relevant details (migration_id, error, timestamp).

---

### User Story 7 — Integrity Verification and Crash Recovery (Priority: P2)

The host detects drift between declared migrations, recorded metadata, and actual database objects. It can resume or repair state after a crash during validation or migration application.

**Why this priority**: Operational resilience. Crashes during migration are rare but catastrophic without recovery.

**Independent Test**: Simulate a crash after namespace reservation but before migration commit. Restart host. Verify the host detects the incomplete state and can either resume or mark for repair.

**Acceptance Scenarios**:

1. **Given** the host crashes after reserving a namespace but before committing migrations, **When** the host restarts and discovers the extension, **Then** it detects the incomplete state (namespace `reserved` but no `applied` migrations) and can re-attempt the install plan.
2. **Given** the host crashes after applying migration 001 but before applying 002 or committing metadata, **When** the host restarts, **Then** it detects partial apply state and marks the namespace `repair_required`.
3. **Given** a table was manually deleted from the database outside the host, **When** `POST /storage/verify` is called, **Then** the object is reported as `drifted` (recorded as `present` but physically absent).
4. **Given** `POST /api/v1/extensions/{id}/storage/validate` is called on an already-active extension, **When** validation runs, **Then** it re-validates static SQL + checksums without re-applying migrations.

---

### User Story 8 — Chat/LLM Extension Example (Priority: P3)

A worked example demonstrates the storage contribution system end-to-end: a chat-oriented LLM extension (`example.chat.llama`) declares threads, messages, attachments, and model profile tables. The host validates, applies, and the extension can be used for conversational workflows.

**Why this priority**: Proves the system works for the primary motivating use case but is not blocking for the core infrastructure.

**Independent Test**: Install the `example.chat.llama` extension. Verify all 4 tables and 4 indexes are created with the `ext_chat_llama_` prefix. Disable, re-enable, and uninstall to verify full lifecycle.

**Acceptance Scenarios**:

1. **Given** the `example.chat.llama` extension package, **When** installed, **Then** tables `ext_chat_llama_threads`, `ext_chat_llama_messages`, `ext_chat_llama_message_attachments`, `ext_chat_llama_thread_model_profiles` are created, plus 4 indexes.
2. **Given** the chat extension is active, **When** `GET /extensions/example.chat.llama/storage` is called, **Then** the response shows 2 applied migrations, 4 tables, 4 indexes, status `active`.
3. **Given** the chat extension is disabled, **When** querying the database directly, **Then** all `ext_chat_llama_*` tables and indexes remain intact.
4. **Given** the chat extension is upgraded with a new migration adding `ext_chat_llama_tags`, **When** the upgrade applies, **Then** only the new migration runs, previous tables are untouched.

---

### Edge Cases

- What if two extensions race to reserve the same namespace prefix? The host MUST serialize namespace reservation within a database transaction. Second reservation fails with collision error.
- What if a migration SQL file is empty (0 bytes)? The host MUST reject it during static validation: migration files must contain at least one valid statement.
- What if the SQLite database is locked (another process has it open)? The host MUST detect the lock, log the error, and block activation with a clear diagnostic message.
- What if an extension requests namespace alias "sqlite" or "host" or other reserved words? The host MUST maintain a deny list of reserved prefixes and reject collisions.
- What if the extensions directory is read-only? Path validation must catch this before migration file reads.

## Requirements

### Functional Requirements

Derived from the reference spec pack (FR-SC-001 through FR-SC-030). See `reference/02-storage-contribution-requirements.md` for full details.

**Manifest & Declaration:**
- **FR-SC-001**: Manifest MUST allow an optional `storage` block
- **FR-SC-004**: Every extension SQL object MUST begin with host-derived prefix
- **FR-SC-006**: Manifest MUST allow an ordered list of migration files
- **FR-SC-022**: Extension MUST declare `storage.schema_contribute` capability
- **FR-SC-024**: Migration files MUST support only `{{prefix}}` placeholder expansion
- **FR-SC-029**: Storage scoped to current local workspace metadata database (v1)
- **FR-SC-030**: Packaged extension with storage contributions installable via local discovery

**Validation & Safety:**
- **FR-SC-002**: Host MUST be sole authority to open DB, validate, and apply
- **FR-SC-003**: Host MUST reserve effective namespace prefix per extension
- **FR-SC-005**: Host MUST reject activation on collision with existing objects
- **FR-SC-007**: Host MUST validate all storage before extension enters `active`
- **FR-SC-008**: Host MUST record checksum (raw + expanded) of every migration
- **FR-SC-009**: Host MUST compute install/upgrade plan before mutating
- **FR-SC-010**: Host MUST support dry-run validation in temporary SQLite
- **FR-SC-025**: Migrations MUST NOT reference host core tables via FK, triggers, inserts, or views

**Apply & Lifecycle:**
- **FR-SC-011**: Host MUST apply migrations in manifest order
- **FR-SC-012**: Migration failure MUST trigger rollback and quarantine
- **FR-SC-013**: Host MUST record namespace status, schema version, migrations, failures
- **FR-SC-014**: Host MUST support upgrades with compatible migration plans
- **FR-SC-015**: Host MUST reject unsafe downgrades by default
- **FR-SC-017**: Disabling MUST NOT automatically drop namespace objects
- **FR-SC-018**: Historical runs MUST remain inspectable after upgrade/disable

**Uninstall:**
- **FR-SC-016**: Host MUST support policies: `retain`, `drop_namespace_objects`, `archive_then_drop`

**APIs & Events:**
- **FR-SC-019**: Host MUST expose read APIs for namespace metadata, migration history, object inventory
- **FR-SC-020**: Host MUST expose admin operations: validate, apply, repair, uninstall
- **FR-SC-021**: Host MUST emit events on namespace reservation, migration planning/apply/fail/repair/drop

**Integrity:**
- **FR-SC-026**: Host MUST record every object created per namespace
- **FR-SC-027**: Host MUST detect drift between migrations, checksums, and actual objects
- **FR-SC-028**: Host MUST provide integrity verification command/API

### Non-Functional Requirements

- **NFR-SC-001**: Faulty migration MUST NOT corrupt unrelated namespaces or host tables
- **NFR-SC-002**: Validation/application MUST be deterministic for same package/host/state
- **NFR-SC-003**: Every step MUST be logged and surfaced as typed event
- **NFR-SC-004**: Host MUST resume/repair state after crash during migration
- **NFR-SC-005**: MUST be testable with unit tests, temp SQLite DBs, E2E flows
- **NFR-SC-006**: Startup validation MUST be bounded (no re-validating applied migrations)
- **NFR-SC-007**: Prefix and migration history MUST be visible in diagnostics
- **NFR-SC-008**: Storage contract MUST be versioned in manifest schema
- **NFR-SC-009**: SQL profile MUST default to conservative subset
- **NFR-SC-010**: Feature MUST be optional — no impact on extensions without storage

### Key Entities

- **Namespace**: A host-reserved prefix scope for one extension's SQL objects (tables, indexes)
- **Migration**: A SQL file that creates/modifies objects within a namespace, applied in order
- **StoragePlan**: Computed install/upgrade plan with expected actions and checksums
- **ObjectInventory**: Host-maintained record of all SQL objects created per namespace
- **Operation**: Logged admin action (validate, apply, repair, drop, archive)

### Core Tables (Host-Owned)

- `extension_storage_namespaces` — one row per extension namespace (id, extension_id, alias, prefix, status, policy, timestamps)
- `extension_storage_migrations` — one row per applied/attempted migration (id, namespace_id, migration_id, checksums, status, error)
- `extension_storage_objects` — inventory of tables/indexes per namespace (id, namespace_id, object_name, type, status)
- `extension_storage_operations` — admin operation journal (id, namespace_id, operation_type, status, plan, result, timestamps)
- `extension_storage_archives` — archive metadata for `archive_then_drop` (id, namespace_id, format, path, hash, timestamp)

### API Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/v1/extensions/{id}/storage` | Namespace + migration + object status |
| POST | `/api/v1/extensions/{id}/storage/validate` | Re-run validation |
| POST | `/api/v1/extensions/{id}/storage/apply` | Apply prepared plan |
| POST | `/api/v1/extensions/{id}/storage/verify` | Integrity check |
| POST | `/api/v1/extensions/{id}/storage/uninstall` | Execute uninstall policy |
| GET | `/api/v1/storage/namespaces` | All namespaces (diagnostics) |

### Rust Traits

- `ExtensionStoragePlanner` — build install/upgrade plan from manifest + migrations
- `ExtensionStorageValidator` — static SQL validation + dry-run validation
- `ExtensionStorageManager` — reserve namespace, apply plan, verify integrity, uninstall

### Event Types

- `extension.storage.namespace_reserved`
- `extension.storage.validation_started` / `validation_failed`
- `extension.storage.plan_ready`
- `extension.storage.apply_started` / `migration_applied` / `apply_failed`
- `extension.storage.integrity_verified` / `integrity_drift_detected`
- `extension.storage.uninstall_started` / `uninstall_completed`

## Success Criteria

- **SC-001**: A storage-contributing extension installs, upgrades, disables, re-enables, and uninstalls without data corruption
- **SC-002**: Static SQL validation rejects all forbidden statement types from the nexus_sqlite_v1 profile
- **SC-003**: Namespace prefix isolation prevents any cross-namespace object references
- **SC-004**: Dry-run validation catches schema errors before the real database is touched
- **SC-005**: Crash recovery detects and repairs incomplete migration state
- **SC-006**: All lifecycle events are emitted and visible in the event stream
- **SC-007**: The chat-llama example extension completes a full install/upgrade/uninstall cycle
- **SC-008**: `cargo test` passes with unit + integration tests covering all validation paths
- **SC-009**: Extensions without `storage` blocks are completely unaffected

## Assumptions

- SQLite is the only storage engine in v1 (no Postgres, no remote DB)
- Extensions do not need runtime write access to their tables in v1 — only schema declaration. Runtime data access (scoped CRUD APIs) is a future enhancement.
- The host process is the only writer to the metadata database. No concurrent host instances.
- The existing `nexus-storage` crate's migration system can be extended for extension namespaces.
- The SQL validation does not need a full SQL parser — statement-type detection + regex-based name checking is sufficient for the `nexus_sqlite_v1` profile.
- Archive format for `archive_then_drop` is a SQLite dump zip or JSONL zip — format choice deferred to implementation.
