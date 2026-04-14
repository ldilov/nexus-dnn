# Feature Specification: Extension Storage Contributions

**Feature ID**: 004
**Feature Branch**: `feature/004-extension-storage`
**Created**: 2026-04-12
**Updated**: 2026-04-13
**Status**: Draft
**Input**: nexus_extension_storage_spec_pack.zip (11 design documents, JSON schema, worked example)
**ADR**: reference/01-adr-extension-storage-contributions.md

---

## 1. Problem Statement

Nexus already treats the Rust host as the authoritative runtime for workflow state, scheduling, provenance, cache semantics, extension activation, and metadata persistence. SQLite is the metadata store for extension records, workflows, runs, artifact manifests, lineage, and cache metadata.

The current platform supports installable extensions that contribute operators, recipes, UI metadata, and runtime adapters. That model is strong for execution and presentation, but some extension categories need **relational state of their own**:

- Chat threads and messages for local LLM packs
- Retrieval chunk catalogs and embedding metadata
- Model alias catalogs and backend profiles
- Import/export history and sync cursors
- Extension-owned structured caches that are not artifact blobs

Allowing extension code to open the primary SQLite database directly would weaken host authority, blur metadata ownership, complicate upgrades, and make operational recovery harder.

## 2. Solution

Nexus will support **extension-declared schema contributions** under a **host-owned storage model**.

Extensions declare namespaced relational storage needs in their manifest. The host remains sole authority over the database file, connections, WAL mode, migrations, integrity checks, and recovery. Extensions never receive direct database access — the host validates, plans, and applies all schema changes before an extension becomes active.

### 2.1 Design Stance

1. The extension does **not** own the SQLite database.
2. The host owns database files, connections, WAL mode, migrations, integrity checks, and recovery.
3. The extension **requests** a storage namespace and migrations through the manifest.
4. The host validates, plans, and applies storage changes **before** the extension becomes active.
5. Extension tables live in a reserved namespace with a host-controlled prefix.
6. Extensions never write to host core tables directly.
7. Historical runs remain inspectable across extension upgrades.

### 2.2 Scope

**In scope**:
- Manifest declaration of storage needs
- Migration file packaging and validation
- Namespace reservation and prefix enforcement
- Migration validation (static SQL analysis + dry-run) and transactional application
- Host-owned metadata recording (5 core tables)
- Upgrade and uninstall lifecycle
- Admin REST APIs for inspection and operations
- Event bus integration for storage lifecycle
- Integrity verification and crash recovery
- Chat-LLM worked example

**Out of scope**:
- Arbitrary extension access to host core tables
- Distributed databases or remote multi-node schema management
- Unrestricted SQL execution from extension workers
- Vector search engine design beyond metadata representation
- Runtime data access (scoped CRUD APIs) — deferred to v2
- FTS5, views, triggers — deferred to a future SQL profile version

---

## 3. Terminology

| Term | Definition |
|------|-----------|
| **storage contribution** | The manifest-declared `storage` section for an extension |
| **namespace alias** | A human-readable requested namespace token, e.g. `chat_llama` |
| **effective prefix** | The host-approved object prefix used in DB object names, e.g. `ext_chat_llama_` |
| **core table** | Any host-owned table outside extension namespaces |
| **extension object** | A table or index created through an approved extension storage migration |
| **migration profile** | The allowed SQL subset for extension schema migrations (e.g. `nexus_sqlite_v1`) |
| **migration file** | A `.sql` file packaged with the extension, applied in manifest order |
| **storage plan** | A host-computed, immutable plan of actions before any database mutation |
| **object inventory** | Host-maintained record of all SQL objects created per namespace |
| **quarantine** | A state where an extension is blocked from activation due to repeated failures |

---

## 4. User Stories and Acceptance Scenarios

### US-1: Extension Declares Storage in Manifest (P1)

An extension developer adds an optional `storage` block to their `manifest.yaml`, declaring a namespace alias, migration files, and SQL profile. The host parses this block during extension discovery and includes it in the validation pipeline.

**Why P1**: Without manifest parsing, no other storage feature can function. This is the entry point for the entire system.

**Independent Test**: Install an extension with a `storage` block. The host recognizes the storage declaration, computes the effective prefix, and includes it in the validation report without applying anything yet.

**Acceptance Scenarios**:

| # | Given | When | Then |
|---|-------|------|------|
| 1 | Extension manifest with valid `storage` block (`spec_version` "0.1", `engine` "sqlite", alias matching `^[a-z][a-z0-9_]{2,48}$`, at least one migration file) | Host discovers the extension | Host parses the storage block, computes effective prefix `ext_<alias>_`, proceeds to validation |
| 2 | Manifest missing `storage.schema_contribute` capability but containing a `storage` block | Host validates | Validation fails: "capability not declared: storage.schema_contribute" |
| 3 | Manifest with duplicate migration IDs (e.g. two entries with id `001_init`) | Host validates | Validation fails: "duplicate migration id: 001_init" |
| 4 | Manifest with migration file path traversing outside extension directory (e.g. `../../etc/shadow`) | Host validates | Validation fails: "path traversal detected" |
| 5 | Manifest without a `storage` block | Host discovers the extension | Activation proceeds normally; no storage-related validation is triggered |
| 6 | Manifest with `spec_version` other than "0.1" in the storage block | Host validates | Validation fails: "unsupported storage spec_version" |
| 7 | Manifest with `engine` other than "sqlite" | Host validates | Validation fails: "unsupported storage engine" |
| 8 | Manifest with alias shorter than 3 characters (e.g. `ab`) | Host validates | Validation fails: "namespace alias does not match required pattern" |
| 9 | Manifest with migration file path that does not end in `.sql` | Host validates | Validation fails: "migration file must have .sql extension" |
| 10 | Manifest with migration files count exceeding configured `max_migrations_per_extension` limit | Host validates | Validation fails: "migration count N exceeds host limit M" |
| 11 | Manifest with empty `files` array (0 migration files) | Host validates | Validation fails: "at least one migration file required" |
| 12 | Manifest with `sql_profile.profile` other than "nexus_sqlite_v1" | Host validates | Validation fails: "unsupported sql_profile" |
| 13 | Manifest with migration IDs not in lexicographic ascending order (e.g. `002_foo` before `001_bar`) | Host validates | Validation fails: "migration IDs must be in ascending order" |
| 14 | Migration file referenced in manifest does not exist on disk | Host validates | Validation fails: "migration file not found: storage/migrations/001_init.sql" |
| 15 | Migration file exists but is 0 bytes | Host validates | Validation fails: "migration file is empty" |
| 16 | Migration file exceeds configured `max_migration_file_bytes` limit (default: 1 MiB) | Host validates | Validation fails: "migration file exceeds size limit" |
| 17 | Migration file is not valid UTF-8 | Host validates | Validation fails: "migration file is not valid UTF-8" |

---

### US-2: Host Validates and Applies Migrations (P1)

The host performs multi-stage validation (static SQL analysis + dry-run against temp DB) before applying migrations transactionally to the real database. The extension transitions to `active` only after all storage operations succeed.

**Why P1**: This is the core safety mechanism — the entire value proposition depends on the host validating before mutating.

**Independent Test**: Install a storage-contributing extension. Observe the host validate SQL statically, run a dry-run against a temporary database, then apply migrations transactionally, recording each step in metadata tables.

**Validation Pipeline** (4 stages):

1. **Stage A — Manifest Validation**: Schema shape, capability presence, file paths, profile support
2. **Stage B — Static SQL Validation**: Statement types, object names, prefix compliance, cross-namespace safety
3. **Stage C — Dry-Run Validation**: Execute in temp in-memory SQLite pre-loaded with host schema + prior migrations
4. **Stage D — Compatibility Decision**: installable / upgradeable / blocked / repairable

**Acceptance Scenarios**:

| # | Given | When | Then |
|---|-------|------|------|
| 1 | Valid extension with two migration files | Host runs static validation | Every SQL statement is checked against `nexus_sqlite_v1` profile. **Allowed**: `CREATE TABLE [IF NOT EXISTS]`, `CREATE INDEX [IF NOT EXISTS]`, `CREATE UNIQUE INDEX [IF NOT EXISTS]`, `ALTER TABLE ADD COLUMN`. **Rejected**: `DROP`, `INSERT`, `UPDATE`, `DELETE`, `CREATE VIEW`, `CREATE TRIGGER`, `ATTACH`, `DETACH`, `VACUUM`, `PRAGMA`, virtual/FTS tables |
| 2 | Static validation passes | Host runs dry-run validation | Migrations execute against temporary in-memory SQLite pre-loaded with host core schema (migrations 001-003). Object inventory is verified against expectations |
| 3 | Dry-run passes | Host applies migrations to real database | Opens transaction, reserves namespace, executes each migration in manifest order, records migration rows (with raw and expanded checksums), records object inventory, updates namespace status to `active`, commits |
| 4 | Migration execution fails mid-apply | Transaction rolls back | No partial objects exist, extension marked `quarantined_storage`, `extension.storage.apply_failed` event emitted |
| 5 | Migration creates a table name not starting with effective prefix | Static validation runs | Rejected with naming violation error |
| 6 | Migration SQL exceeds `max_statements_per_migration` limit | Static validation runs | Rejected: "statement count N exceeds host limit M" |
| 7 | Migration contains `{{prefix}}` placeholders | Host expands them | `{{prefix}}` replaced with effective prefix (e.g. `ext_chat_llama_`). No other placeholder syntax recognized. `{{unknown}}` treated as literal text |
| 8 | Extension with storage passes all validation | Extension activates | `StorageNamespaceReserved`, `StorageValidationStarted`, `StoragePlanReady`, `StorageApplyStarted`, `StorageMigrationApplied` (per migration), events emitted in order |

---

### US-3: Namespace Isolation and SQL Safety (P1)

The host enforces strict namespace isolation: all extension SQL objects must use the host-derived prefix, foreign keys may only reference tables within the same namespace, and no extension migration may reference host core tables.

**Why P1**: Isolation is the security model. Without it, extensions could corrupt host state or other extensions' data.

**Independent Test**: Attempt to install an extension whose migration creates a table without the prefix, references a host core table via FK, or references another extension's namespace. All must fail validation.

**Acceptance Scenarios**:

| # | Given | When | Then |
|---|-------|------|------|
| 1 | Migration with `CREATE TABLE chat_threads (...)` (missing prefix) | Static validation | Fails: table name does not match `^{prefix}[a-z][a-z0-9_]{1,62}$` |
| 2 | Migration with FK referencing `workflows(id)` (host core table) | Static validation | Fails: cross-namespace foreign key detected |
| 3 | Migration with FK referencing `ext_other_sessions` (another extension) | Static validation | Fails: cross-namespace foreign key detected |
| 4 | Two extensions requesting the same namespace alias | Second extension validated | Activation blocked: effective prefix collision |
| 5 | Extension requests alias "sqlite" or "host" or "nexus" or "core" | Host validates | Rejected: alias produces reserved prefix (`ext_sqlite_`, `ext_host_`, `ext_nexus_`, `ext_core_`) |
| 6 | Migration with `{{prefix}}` placeholders | Host expands them | `{{prefix}}` replaced with effective prefix. No other placeholder recognized |
| 7 | Migration with index name not matching `^{prefix}idx_[a-z][a-z0-9_]{1,58}$` | Static validation | Rejected: index naming convention violated |
| 8 | Migration with `ON DELETE` or `ON UPDATE` action other than CASCADE, RESTRICT, or SET NULL | Static validation | Rejected: unsupported FK action |

**Reserved Prefix Deny List**: `ext_sqlite_`, `ext_host_`, `ext_nexus_`, `ext_core_`

---

### US-4: Extension Upgrade with New Migrations (P1)

An extension developer publishes a new version that appends additional migration files. The host detects this as an upgrade, validates the new migrations, and applies them without re-running previously applied migrations.

**Why P1**: Upgrades are inevitable for any living extension. The system must handle them safely.

**Independent Test**: Install v0.4.0 with 2 migrations. Upgrade to v0.5.0 with 3 migrations (same first 2 + new third). Only the third migration runs.

**Acceptance Scenarios**:

| # | Given | When | Then |
|---|-------|------|------|
| 1 | v0.4.0 installed with migrations 001_init, 002_indexes applied | v0.5.0 discovered with 001_init, 002_indexes, 003_add_tags | Host computes upgrade plan: skip 001/002 (checksum match), apply 003 |
| 2 | v0.5.0 changes the contents of 001_init (checksum drift) | Host validates | Activation blocked with `repair_required`: applied migration contents must not change |
| 3 | v0.5.0 changes the namespace alias | Host validates | Activation blocked: alias change after install is forbidden |
| 4 | v0.5.0 reorders migration IDs (002 before 001) | Host validates | Activation blocked: migration order must be preserved |
| 5 | v0.5.0 removes a previously-applied migration file from the list | Host validates | Activation blocked: cannot remove applied migrations from manifest |
| 6 | v0.5.0 changes `uninstall_policy` from `retain` to `drop_namespace_objects` | Host validates | Accepted: policy change recorded in namespace metadata. Latest manifest policy wins. |
| 7 | Downgrade from v0.5.0 (3 migrations) back to v0.4.0 (2 migrations) | Host validates | Blocked by default: unsafe downgrade. Applied migration 003 has no match in manifest. |

**Upgrade Rules (Allowed)**:
- Append new migration files
- Add new tables, indexes, columns with SQLite-safe defaults or nullability
- Change `uninstall_policy` — latest manifest version wins

**Upgrade Rules (Forbidden)**:
- Reorder prior migration IDs
- Change contents of already-applied migrations
- Change alias or effective prefix
- Remove previously-applied migration files
- Destructive schema mutations without a future explicit repair profile

---

### US-5: Extension Disable and Uninstall with Storage (P2)

An operator disables or uninstalls a storage-contributing extension. Disabling preserves namespace objects. Uninstalling follows the declared policy.

**Why P2**: Important for lifecycle management but less frequent than install/upgrade. The default safe behavior (retain) minimizes risk.

**Independent Test**: Disable an extension — verify tables remain. Uninstall with `drop_namespace_objects` — verify tables dropped. Uninstall with `archive_then_drop` — verify archive created.

**Uninstall Policies**:

| Policy | Behavior |
|--------|----------|
| `retain` (default) | Remove package registration. Preserve namespace objects and metadata. Mark namespace `retained`. |
| `drop_namespace_objects` | Drop namespace tables and indexes in reverse dependency order. Host metadata (namespaces, migrations, objects rows) retained with `dropped` status. |
| `archive_then_drop` | Export namespace tables to JSONL ZIP archive. Verify archive integrity (content hash). Record archive in `extension_storage_archives`. Then execute `drop_namespace_objects`. If archive fails, drop is aborted. |

**Acceptance Scenarios**:

| # | Given | When | Then |
|---|-------|------|------|
| 1 | Active extension with storage | Operator disables it | Extension inactive, namespace objects remain, migration metadata intact, namespace status stays `active` |
| 2 | Disabled extension, files/checksums match recorded state | Operator re-enables | Re-activates without running any migrations |
| 3 | Disabled extension, migration files have drifted | Re-enable attempted | Activation blocked: `repair_required` |
| 4 | Uninstall policy `retain` | Operator uninstalls | Package registration removed, namespace objects and metadata persist, namespace status `retained` |
| 5 | Uninstall policy `drop_namespace_objects` | Operator uninstalls | Namespace tables and indexes dropped in reverse dependency order. Host metadata retained with `dropped` status. |
| 6 | Uninstall policy `archive_then_drop` | Operator uninstalls | JSONL ZIP archive created, verified, recorded in `extension_storage_archives`. Then objects dropped. |
| 7 | Archive creation fails (disk full, IO error) | Operator uninstalls with `archive_then_drop` | Drop aborted. Namespace remains `active`. Error reported. |
| 8 | Uninstall API called with `policy_override` | Override policy used | The override takes precedence over manifest-declared policy for this operation only |

**Archive Format (JSONL ZIP)**:
- One `.jsonl` file per namespace table (one JSON object per row)
- All table files bundled into a single `.zip` archive
- Archive path: `<workspace>/archives/ext_<alias>_<timestamp>.zip`
- Content hash: SHA-256 of the archive file
- Recorded in `extension_storage_archives` table

---

### US-6: Storage Diagnostics and Admin APIs (P2)

The operator queries extension storage status, migration history, and object inventory via REST APIs. Admin operations include re-validation, integrity verification, and manual uninstall.

**Why P2**: Essential for observability and operational safety but not on the critical install path.

**Acceptance Scenarios**:

| # | Given | When | Then |
|---|-------|------|------|
| 1 | Installed extension with storage | `GET /api/v1/extensions/{id}/storage` | Response includes: namespace metadata (alias, prefix, status, engine, profile, policy), migration history (id, status, checksum, applied_at), object inventory (tables, indexes) |
| 2 | Extension with storage | `POST /api/v1/extensions/{id}/storage/verify` | Host compares actual `sqlite_master` objects against recorded inventory. Reports: present, missing (drifted), unexpected |
| 3 | No storage contribution | `GET /api/v1/extensions/{id}/storage` | 404 response |
| 4 | Any storage lifecycle event occurs | Event bus publishes | Payload includes: type, extension_id, namespace_id, effective_prefix, and event-specific details |

---

### US-7: Integrity Verification and Crash Recovery (P2)

The host detects drift between declared migrations, recorded metadata, and actual database objects. It can resume or repair state after a crash during validation or migration application.

**Why P2**: Operational resilience. Crashes during migration are rare but catastrophic without recovery.

**Acceptance Scenarios**:

| # | Given | When | Then |
|---|-------|------|------|
| 1 | Host crashes after reserving namespace but before committing migrations | Host restarts, discovers extension | Detects incomplete state (namespace `reserved`, no `applied` migrations). Re-attempts install plan. |
| 2 | Host crashes after applying migration 001 but before applying 002 or committing | Host restarts | Detects partial apply. Transaction was rolled back (SQLite guarantees). Marks `repair_required`. |
| 3 | Table manually deleted from database outside host | `POST /storage/verify` called | Object reported as `drifted` (recorded `present` but physically absent) |
| 4 | `POST /storage/validate` on already-active extension | Validation runs | Re-validates static SQL + checksums without re-applying. Reports current state. |
| 5 | Namespace status stuck at `reserved` from a previous crash | Host startup discovery | Detects orphaned reservation. Cleans up or re-attempts based on available migration state. |

**Recovery Markers** (stored in `extension_storage_operations`):
- `plan_generated` → `apply_started` → `apply_committed`
- `drop_started` → `drop_committed`
- `archive_started` → `archive_committed`

---

### US-8: Chat/LLM Extension Example (P3)

A worked example demonstrates the storage contribution system end-to-end: a chat-oriented LLM extension (`example.chat.llama`) declares threads, messages, attachments, and model profile tables.

**Why P3**: Proves the system works for the primary motivating use case but is not blocking for core infrastructure.

**Acceptance Scenarios**:

| # | Given | When | Then |
|---|-------|------|------|
| 1 | `example.chat.llama` extension package | Installed | Tables `ext_chat_llama_threads`, `ext_chat_llama_messages`, `ext_chat_llama_message_attachments`, `ext_chat_llama_thread_model_profiles` created. Plus 4 indexes. |
| 2 | Chat extension active | `GET /extensions/example.chat.llama/storage` | Shows 2 applied migrations, 4 tables, 4 indexes, status `active` |
| 3 | Chat extension disabled | Query database directly | All `ext_chat_llama_*` tables and indexes remain intact |
| 4 | Chat extension upgraded with new migration | Upgrade applies | Only new migration runs, previous tables untouched |

---

## 5. Edge Cases

| Edge Case | Expected Behavior |
|-----------|-------------------|
| Two extensions race to reserve the same prefix | Host serializes namespace reservation within a database transaction. Second reservation fails with collision error. |
| Migration SQL file is 0 bytes | Rejected during static validation: migration files must contain at least one valid statement. |
| SQLite database is locked by another process | Host detects lock, logs error, blocks activation with diagnostic message. |
| Extension requests reserved alias ("sqlite", "host", "nexus", "core") | Rejected: reserved prefix deny list. |
| Extensions directory is read-only | Path validation catches this before migration file reads. |
| Migration file contains only comments (no executable SQL) | Rejected: at least one executable statement required after stripping comments. |
| Concurrent host startup discovers multiple storage extensions | Extensions validated and applied sequentially within the discovery pipeline. Namespace reservation serialized via DB transaction. |
| Extension with storage + extension without storage discovered together | Non-storage extension activates normally. Storage extension follows the extended pipeline. No interference. |
| Migration SQL contains `{{prefix}}` inside a string literal | Placeholder expansion is global text replacement. The expanded string inside the literal is harmless but technically incorrect. Documented as a known limitation in v1. |
| Extension upgrades `uninstall_policy` from `retain` to `drop_namespace_objects` | Accepted. Latest manifest policy recorded in namespace metadata. |
| Downgrade attempt (fewer migrations than applied) | Blocked by default. `repair_required` status set. |

---

## 6. Manifest Storage Block

### 6.1 YAML Shape

```yaml
storage:
  spec_version: "0.1"
  engine: "sqlite"
  namespace:
    alias: "chat_llama"
    prefix_mode: "host_derived"
  migrations:
    strategy: "sql_file_list"
    files:
      - id: "001_init"
        path: "storage/migrations/001_init.sql"
      - id: "002_indexes"
        path: "storage/migrations/002_indexes.sql"
  sql_profile:
    profile: "nexus_sqlite_v1"
  uninstall:
    policy: "retain"
  runtime_access:
    mode: "host_api_only"
```

### 6.2 Field Rules

| Field | Required | Type | Validation | Default |
|-------|----------|------|------------|---------|
| `storage.spec_version` | Yes | string | const `"0.1"` | — |
| `storage.engine` | Yes | string | const `"sqlite"` | — |
| `storage.namespace.alias` | Yes | string | regex `^[a-z][a-z0-9_]{2,48}$` | — |
| `storage.namespace.prefix_mode` | Yes | string | const `"host_derived"` | — |
| `storage.migrations.strategy` | Yes | string | const `"sql_file_list"` | — |
| `storage.migrations.files` | Yes | array | min 1, max configurable (default 64) | — |
| `storage.migrations.files[].id` | Yes | string | regex `^[0-9]{3}_[a-z0-9_]{2,64}$`, unique, ascending order | — |
| `storage.migrations.files[].path` | Yes | string | relative to extension dir, no path traversal, `.sql` extension, valid UTF-8, ≤1 MiB | — |
| `storage.sql_profile.profile` | Yes | string | const `"nexus_sqlite_v1"` | — |
| `storage.uninstall.policy` | No | string | enum: `retain`, `drop_namespace_objects`, `archive_then_drop` | `"retain"` |
| `storage.runtime_access.mode` | No | string | enum: `host_api_only` | `"host_api_only"` |

### 6.3 Effective Prefix Derivation

```
effective_prefix = "ext_" + namespace_alias + "_"
```

Example: alias `chat_llama` → prefix `ext_chat_llama_`

### 6.4 Placeholder Expansion

The host expands `{{prefix}}` → effective prefix in migration SQL **before** validation and execution.

No other placeholders are recognized in v1. Unrecognized `{{...}}` sequences are treated as literal text.

### 6.5 Capability Requirement

An extension declaring a `storage` block MUST also declare `storage.schema_contribute` in its `capabilities` list.

---

## 7. SQL Profile: `nexus_sqlite_v1`

### 7.1 Allowed Statements

| Statement | Notes |
|-----------|-------|
| `CREATE TABLE [IF NOT EXISTS]` | Must use effective prefix. `IF NOT EXISTS` recommended. |
| `CREATE INDEX [IF NOT EXISTS]` | Must use `{prefix}idx_` naming. `IF NOT EXISTS` recommended. |
| `CREATE UNIQUE INDEX [IF NOT EXISTS]` | Same rules as `CREATE INDEX`. |
| `ALTER TABLE <table> ADD COLUMN ...` | Table must be in same namespace. |

### 7.2 Conditionally Allowed

- `FOREIGN KEY` referencing only tables within the same effective prefix
- `CHECK` constraints
- Default values that are SQLite-safe and deterministic
- `ON DELETE CASCADE`, `ON DELETE RESTRICT`, `ON DELETE SET NULL`
- `ON UPDATE CASCADE`, `ON UPDATE RESTRICT`, `ON UPDATE SET NULL`

### 7.3 Forbidden Statements

| Statement | Reason |
|-----------|--------|
| `DROP TABLE`, `DROP VIEW`, `DROP TRIGGER`, `DROP INDEX` | Destructive, irreversible |
| `ALTER TABLE ... DROP COLUMN` | Destructive |
| `ALTER TABLE ... RENAME TO` | Breaks prefix enforcement |
| `CREATE VIEW` | Could reference host tables |
| `CREATE TRIGGER` | Implicit side effects, hard to validate |
| `INSERT`, `UPDATE`, `DELETE`, `REPLACE` | No DML at install time |
| `ATTACH`, `DETACH` | Database scope escape |
| `VACUUM` | Global DB operation |
| `PRAGMA` | Configuration escape |
| Virtual tables | Complexity, security concerns |
| FTS tables | Deferred to future profile |
| Generated columns with unsupported features | Risk of non-determinism |
| Foreign keys to host core tables | Cross-namespace boundary violation |
| Foreign keys to other extension namespaces | Cross-namespace boundary violation |

### 7.4 Naming Rules

| Object Type | Pattern | Max Length |
|-------------|---------|------------|
| Table | `^{prefix}[a-z][a-z0-9_]{1,62}$` | 64 chars total |
| Index | `^{prefix}idx_[a-z][a-z0-9_]{1,58}$` | 64 chars total |

### 7.5 Static Validation Pipeline

For each migration file, the host validator:

1. Reads file, verifies UTF-8 encoding and non-empty content
2. Expands `{{prefix}}` placeholder
3. Parses SQL with `sqlparser` crate using `SQLiteDialect`
4. Counts statements, enforces `max_statements_per_migration` limit
5. Matches each `Statement` variant against allowlist/denylist
6. Extracts object names from each allowed statement
7. Validates each object name against prefix pattern
8. Scans `CreateTable` constraints for FK references outside namespace
9. Validates FK `ON DELETE`/`ON UPDATE` actions
10. Builds expected object inventory

### 7.6 Dry-Run Validation Pipeline

After static validation passes:

1. Open in-memory SQLite: `sqlite::memory:` with max_connections=1
2. Apply host core migrations (001_initial, 002_recipes_contributions, 003_extension_storage)
3. If upgrade: apply previously-applied extension migrations for this namespace
4. Apply new extension migrations
5. Query `sqlite_master` to verify object inventory matches expectations
6. Close temp DB (no persistence)

### 7.7 Checksum Policy

Two checksums per migration file:

| Checksum | Input | Purpose |
|----------|-------|---------|
| Raw (SHA-256) | File contents as-is | Package integrity verification |
| Expanded (SHA-256) | SQL after `{{prefix}}` expansion | Execution identity verification |

---

## 8. Extension Activation Lifecycle with Storage

### 8.1 Extended Activation Pipeline

```
discovered
  → validating_manifest           (existing)
  → validating_storage_static     (NEW — Stage B)
  → validating_storage_dry_run    (NEW — Stage C)
  → installable                   (existing)
  → applying_storage              (NEW)
  → active                        (existing)
```

**Failure branches**:
- `invalid_storage` — manifest or static validation failure
- `quarantined_storage` — apply failure (rollback completed)
- `repair_required` — checksum drift, downgrade attempt, or incomplete state

### 8.2 Apply Sequence (Transactional)

```
1. BEGIN TRANSACTION
2. Reserve namespace (INSERT extension_storage_namespaces with status='reserved')
3. Record operation (INSERT extension_storage_operations with status='started')
4. For each migration file:
   a. SAVEPOINT migration_<id>
   b. Execute expanded SQL
   c. INSERT extension_storage_migrations (status='applied')
   d. INSERT extension_storage_objects (one per created table/index)
   e. RELEASE SAVEPOINT migration_<id>
   f. On failure: ROLLBACK TO migration_<id>, record error, ROLLBACK entire transaction
5. UPDATE namespace status → 'active'
6. UPDATE operation status → 'completed'
7. COMMIT
8. Emit StorageApplyStarted, StorageMigrationApplied (per migration) events
```

### 8.3 Quarantine Behavior

If storage validation or application repeatedly fails:
- Mark extension as `quarantined_storage`
- Suppress activation attempts until manual repair or package replacement
- Preserve diagnostic logs and failed plan details
- Quarantine threshold: configurable (default: 3 consecutive failures)

---

## 9. Functional Requirements

Derived from reference/02-storage-contribution-requirements.md. Extended with improvements.

### Manifest & Declaration

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-SC-001 | Manifest MUST allow an optional `storage` block | P1 |
| FR-SC-004 | Every extension SQL object MUST begin with host-derived prefix | P1 |
| FR-SC-006 | Manifest MUST allow an ordered list of migration files | P1 |
| FR-SC-022 | Extension MUST declare `storage.schema_contribute` capability | P1 |
| FR-SC-024 | Migration files MUST support only `{{prefix}}` placeholder expansion | P1 |
| FR-SC-029 | Storage scoped to current local workspace metadata database (v1) | P1 |
| FR-SC-030 | Packaged extension with storage contributions installable via local discovery | P1 |
| FR-SC-031 | Migration files MUST be valid UTF-8 encoded text | P1 |
| FR-SC-032 | Migration files MUST have `.sql` extension | P1 |
| FR-SC-033 | Migration files MUST NOT exceed `max_migration_file_bytes` (default: 1 MiB) | P1 |
| FR-SC-034 | Migration IDs MUST be in lexicographic ascending order within manifest | P1 |

### Validation & Safety

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-SC-002 | Host MUST be sole authority to open DB, validate, and apply | P1 |
| FR-SC-003 | Host MUST reserve effective namespace prefix per extension | P1 |
| FR-SC-005 | Host MUST reject activation on collision with existing objects | P1 |
| FR-SC-007 | Host MUST validate all storage before extension enters `active` | P1 |
| FR-SC-008 | Host MUST record checksum (raw + expanded SHA-256) of every migration | P1 |
| FR-SC-009 | Host MUST compute install/upgrade plan before mutating | P1 |
| FR-SC-010 | Host MUST support dry-run validation in temporary in-memory SQLite | P1 |
| FR-SC-025 | Migrations MUST NOT reference host core tables via FK, triggers, inserts, or views | P1 |
| FR-SC-035 | Host MUST enforce configurable `max_migrations_per_extension` (default: 64) | P1 |
| FR-SC-036 | Host MUST enforce configurable `max_statements_per_migration` (default: 128) | P1 |
| FR-SC-037 | Host MUST maintain reserved prefix deny list: `ext_sqlite_`, `ext_host_`, `ext_nexus_`, `ext_core_` | P1 |

### Apply & Lifecycle

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-SC-011 | Host MUST apply migrations in manifest order within a single transaction | P1 |
| FR-SC-012 | Migration failure MUST trigger full transaction rollback and quarantine | P1 |
| FR-SC-013 | Host MUST record namespace status, schema version, migrations, failures | P1 |
| FR-SC-014 | Host MUST support upgrades with compatible migration plans | P1 |
| FR-SC-015 | Host MUST reject unsafe downgrades by default | P1 |
| FR-SC-017 | Disabling MUST NOT automatically drop namespace objects | P2 |
| FR-SC-018 | Historical runs MUST remain inspectable after upgrade/disable | P2 |
| FR-SC-038 | Upgrade MAY change `uninstall_policy`; latest manifest version wins | P2 |
| FR-SC-039 | Quarantine threshold MUST be configurable (default: 3 consecutive failures) | P2 |

### Uninstall

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-SC-016 | Host MUST support policies: `retain`, `drop_namespace_objects`, `archive_then_drop` | P2 |
| FR-SC-040 | `archive_then_drop` MUST produce JSONL ZIP format archives | P2 |
| FR-SC-041 | Archive MUST be verified (SHA-256 content hash) before proceeding to drop | P2 |
| FR-SC-042 | If archive creation fails, drop MUST be aborted | P2 |
| FR-SC-043 | Uninstall API MUST accept optional `policy_override` to override manifest policy | P2 |

### APIs & Events

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-SC-019 | Host MUST expose read APIs for namespace metadata, migration history, object inventory | P2 |
| FR-SC-020 | Host MUST expose admin operations: validate, apply, verify, uninstall | P2 |
| FR-SC-021 | Host MUST emit events on namespace reservation, migration planning/apply/fail/repair/drop | P2 |

### Integrity

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-SC-026 | Host MUST record every object created per namespace | P1 |
| FR-SC-027 | Host MUST detect drift between migrations, checksums, and actual objects | P2 |
| FR-SC-028 | Host MUST provide integrity verification API | P2 |

---

## 10. Non-Functional Requirements

| ID | Requirement |
|----|-------------|
| NFR-SC-001 | Faulty migration MUST NOT corrupt unrelated namespaces or host tables |
| NFR-SC-002 | Validation/application MUST be deterministic for same package/host/state |
| NFR-SC-003 | Every step MUST be logged and surfaced as typed event |
| NFR-SC-004 | Host MUST resume/repair state after crash during migration |
| NFR-SC-005 | MUST be testable with unit tests, temp SQLite DBs, E2E flows |
| NFR-SC-006 | Startup validation MUST be bounded (no re-validating applied migrations unless checksums change) |
| NFR-SC-007 | Prefix and migration history MUST be visible in diagnostics |
| NFR-SC-008 | Storage contract MUST be versioned in manifest schema (`spec_version`) |
| NFR-SC-009 | SQL profile MUST default to conservative subset (`nexus_sqlite_v1`) |
| NFR-SC-010 | Feature MUST be optional — no impact on extensions without storage |
| NFR-SC-011 | Validation MUST complete in <500ms per extension under normal conditions |
| NFR-SC-012 | Apply MUST complete in <1s for typical migration set (≤10 migrations, ≤50 objects) |

---

## 11. Configurable Host Limits

These limits are configurable via host configuration. Defaults are enforced when no override is set.

| Limit | Default | Config Key | Behavior on Exceed |
|-------|---------|------------|-------------------|
| Max migration files per extension | 64 | `storage.limits.max_migrations_per_extension` | Validation failure |
| Max statements per migration file | 128 | `storage.limits.max_statements_per_migration` | Validation failure |
| Max migration file size | 1 MiB | `storage.limits.max_migration_file_bytes` | Validation failure |
| Max object name length | 64 chars | (enforced by naming regex) | Validation failure |
| Max namespace alias length | 48 chars | (enforced by alias regex) | Validation failure |
| Quarantine threshold | 3 | `storage.limits.quarantine_threshold` | Auto-quarantine after N consecutive failures |

---

## 12. Key Entities

| Entity | Description |
|--------|-------------|
| **Namespace** | A host-reserved prefix scope for one extension's SQL objects (tables, indexes). One per extension. |
| **Migration** | A SQL file that creates/modifies objects within a namespace, applied in manifest order. |
| **StoragePlan** | Computed install/upgrade plan with expected actions, checksums, and object inventory. Immutable once built. Not persisted. |
| **ObjectInventory** | Host-maintained record of all SQL objects created per namespace. |
| **Operation** | Logged admin action (validate, apply, repair, drop, archive) with plan and result JSON. |
| **Archive** | Metadata for a JSONL ZIP archive created during `archive_then_drop` uninstall. |

---

## 13. Core Metadata Tables (Host-Owned)

Five host-owned tables created by migration `003_extension_storage.sql`. See `data-model.md` for full column definitions.

| Table | Purpose | Key |
|-------|---------|-----|
| `extension_storage_namespaces` | One row per extension namespace | PK: `id`, UNIQUE: `effective_prefix` |
| `extension_storage_migrations` | One row per applied/attempted migration | PK: `id`, UNIQUE: `(namespace_id, migration_id)` |
| `extension_storage_objects` | Inventory of tables/indexes per namespace | PK: `id`, UNIQUE: `(namespace_id, object_name)` |
| `extension_storage_operations` | Admin operation journal | PK: `id` |
| `extension_storage_archives` | Archive metadata for `archive_then_drop` | PK: `id` |

**Constraint**: No extension may create or mutate these tables. Only the host writes them.

---

## 14. API Endpoints

| Method | Path | Purpose | User Story |
|--------|------|---------|------------|
| GET | `/api/v1/extensions/{id}/storage` | Namespace + migration + object status | US-6 |
| POST | `/api/v1/extensions/{id}/storage/validate` | Re-run validation | US-6 |
| POST | `/api/v1/extensions/{id}/storage/apply` | Apply prepared plan | US-6 |
| POST | `/api/v1/extensions/{id}/storage/verify` | Integrity check (compare sqlite_master vs inventory) | US-6, US-7 |
| POST | `/api/v1/extensions/{id}/storage/uninstall` | Execute uninstall policy (with optional override) | US-5, US-6 |
| GET | `/api/v1/storage/namespaces` | All namespaces (diagnostics view) | US-6 |

See `contracts/storage-api.md` for full request/response schemas.

---

## 15. Rust Traits

```
ExtensionStoragePlanner   → build install/upgrade plan from manifest + migrations
ExtensionStorageValidator → static SQL validation + dry-run validation
ExtensionStorageManager   → reserve namespace, apply plan, verify integrity, uninstall
```

See `contracts/storage-api.md` for trait signatures and method contracts.

---

## 16. Event Types

| Event | Emitted When |
|-------|-------------|
| `extension.storage.namespace_reserved` | Namespace row inserted with status `reserved` |
| `extension.storage.validation_started` | Static validation begins |
| `extension.storage.validation_failed` | Static or dry-run validation fails |
| `extension.storage.plan_ready` | Plan computed, extension is installable |
| `extension.storage.apply_started` | Transaction opened for migration apply |
| `extension.storage.migration_applied` | Individual migration committed (per migration) |
| `extension.storage.apply_failed` | Migration failed, transaction rolled back |
| `extension.storage.integrity_verified` | Verify API reports healthy namespace |
| `extension.storage.integrity_drift_detected` | Verify API detects missing/unexpected objects |
| `extension.storage.uninstall_started` | Uninstall operation begins |
| `extension.storage.uninstall_completed` | Uninstall operation completes (any policy) |

All events include: `extension_id`, `namespace_id`, `effective_prefix`, and event-specific details.

---

## 17. State Machines

### 17.1 Namespace Status

```
(new) → reserved → active
                  → invalid → (retry) → active
                  → repair_required → (repair) → active
       active → retained (uninstall with retain)
       active → dropped (uninstall with drop/archive)
```

### 17.2 Migration Status

```
(new) → planned → applied
                → failed → (retry via repair) → applied
                → skipped (already applied in upgrade)
```

### 17.3 Object Status

```
(new) → present → dropped (uninstall)
                → drifted (integrity verification)
```

### 17.4 Operation Status

```
(new) → started → completed
                → failed
```

---

## 18. Security Model

### 18.1 Principles

1. The database file is host-owned infrastructure.
2. Extension workers do not own the database file.
3. The host validates all migration content before execution.
4. Namespace isolation is structural, not just conventional.
5. Administrative destructive operations require explicit operator intent.

### 18.2 Capability Gate

`storage.schema_contribute` grants only the right to request host-managed namespace creation and migration application.

It does NOT grant:
- Direct SQL execution against the host DB
- Writes to core host tables
- Unrestricted filesystem access to the DB file

### 18.3 Future Runtime Data Access (v2)

If runtime access is needed later, add a host API layer:
- Scoped row CRUD APIs
- Prepared-statement templates owned by the host
- Query descriptors validated by the host

Never start with raw SQL from workers.

---

## 19. Observability

### 19.1 Structured Logs

| Log Point | Content |
|-----------|---------|
| Plan generation | Extension ID, version, action, migration count |
| Checksum computation | Raw and expanded checksums per migration |
| Dry-run result | Tables created, indexes created, errors |
| Apply per-migration | Migration ID, duration_ms, objects created |
| Drift detection | Objects present, missing, unexpected |
| Uninstall summary | Policy, objects affected, archive path |

### 19.2 Metrics (Future)

| Metric | Type |
|--------|------|
| `nexus_storage_validation_duration_ms` | histogram |
| `nexus_storage_dry_run_duration_ms` | histogram |
| `nexus_storage_apply_duration_ms` | histogram |
| `nexus_storage_namespace_count` | gauge |
| `nexus_storage_failed_operations_total` | counter |

---

## 20. Failure Handling Matrix

| Failure | Host Reaction |
|---------|---------------|
| Invalid SQL profile | Block activation, status `invalid_storage` |
| Name collision (prefix exists) | Block activation, collision error |
| Migration checksum drift | Mark `repair_required`, block upgrade |
| Dry-run failure | Block activation, report errors |
| Apply failure (single migration) | Rollback entire transaction, quarantine if threshold exceeded |
| Uninstall archive failure | Abort drop, keep namespace `active`, report error |
| Integrity drift | Mark `repair_required`, emit drift event |
| DB locked by another process | Block activation, log diagnostic |
| Migration file not found | Block activation, report missing file |
| Migration file not UTF-8 | Block activation, report encoding error |

---

## 21. Success Criteria

| ID | Criterion |
|----|-----------|
| SC-001 | A storage-contributing extension installs, upgrades, disables, re-enables, and uninstalls without data corruption |
| SC-002 | Static SQL validation rejects all forbidden statement types from the `nexus_sqlite_v1` profile |
| SC-003 | Namespace prefix isolation prevents any cross-namespace object references |
| SC-004 | Dry-run validation catches schema errors before the real database is touched |
| SC-005 | Crash recovery detects and repairs incomplete migration state |
| SC-006 | All lifecycle events are emitted and visible in the event stream |
| SC-007 | The `example.chat.llama` extension completes a full install/upgrade/uninstall cycle |
| SC-008 | `cargo test` passes with unit + integration tests covering all validation paths |
| SC-009 | Extensions without `storage` blocks are completely unaffected |
| SC-010 | Configurable host limits are respected and produce clear validation errors when exceeded |

---

## 22. Assumptions

1. SQLite is the only storage engine in v1 (no Postgres, no remote DB).
2. Extensions do not need runtime write access to their tables in v1 — only schema declaration. Runtime data access (scoped CRUD APIs) is a future enhancement.
3. The host process is the only writer to the metadata database. No concurrent host instances.
4. The existing `nexus-storage` crate's migration system can be extended for extension namespaces.
5. The `sqlparser` crate with `SQLiteDialect` is sufficient for statement-type detection and object name extraction.
6. Archive format for `archive_then_drop` is JSONL ZIP.
7. Migration file encoding is UTF-8 only.
8. All timestamps are ISO 8601 in UTC.
9. IDs for namespace, migration, object, operation, and archive records are generated by the host (e.g. UUID or prefixed unique strings).

---

## 23. Deferred to Future Versions

| Feature | Target | Notes |
|---------|--------|-------|
| FTS5 for chat transcript search | v2 profile | Requires new SQL profile version |
| Vector-table integrations | v2 profile | Complex validation requirements |
| Views and read-only helper views | v2 profile | Risk of cross-namespace references |
| Carefully scoped triggers | v2 profile | Implicit side effects |
| Controlled data backfill steps | v2 profile | INSERT/UPDATE at migration time |
| Online repair plans | v2 lifecycle | Automated repair without manual intervention |
| Runtime scoped SQL session | v2 runtime | `scoped_sql_session` access mode |
| Read-only snapshot access | v2 runtime | `read_only_snapshot` access mode |
| Per-namespace row count metrics | v2 observability | Maintenance warnings for large namespaces |
| Per-namespace size estimates | v2 observability | Disk usage tracking |
| Remote/distributed DB support | v3+ | Out of scope for local-first architecture |
