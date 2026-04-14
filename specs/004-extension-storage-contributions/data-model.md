# Data Model: Extension Storage Contributions

---

## 1. Parsed Entities (from manifest)

### StorageContribution

Represents an extension's storage declaration, parsed from the `storage` block in manifest.yaml.

| Field | Type | Source | Validation | Default |
|-------|------|--------|------------|---------|
| spec_version | String | manifest | const "0.1" | — |
| engine | String | manifest | const "sqlite" | — |
| namespace | NamespaceDeclaration | manifest | required | — |
| migrations | MigrationDeclaration | manifest | required | — |
| sql_profile | SqlProfileDeclaration | manifest | required | — |
| uninstall | Option\<UninstallDeclaration\> | manifest | optional | policy="retain" |
| runtime_access | Option\<RuntimeAccessDeclaration\> | manifest | optional | mode="host_api_only" |

### NamespaceDeclaration

| Field | Type | Validation |
|-------|------|------------|
| alias | String | regex `^[a-z][a-z0-9_]{2,48}$`, NOT in reserved deny list |
| prefix_mode | String | const "host_derived" |

**Reserved alias deny list**: aliases producing prefixes `ext_sqlite_`, `ext_host_`, `ext_nexus_`, `ext_core_`

### MigrationDeclaration

| Field | Type | Validation |
|-------|------|------------|
| strategy | String | const "sql_file_list" |
| files | Vec\<MigrationFileRef\> | min 1, max configurable (default 64), ascending ID order |

### MigrationFileRef

| Field | Type | Validation |
|-------|------|------------|
| id | String | regex `^[0-9]{3}_[a-z0-9_]{2,64}$`, unique within extension, ascending order |
| path | String | relative to extension dir, no `..` traversal, `.sql` extension, ≤1 MiB, valid UTF-8, non-empty |

### SqlProfileDeclaration

| Field | Type | Validation |
|-------|------|------------|
| profile | String | const "nexus_sqlite_v1" |

### UninstallDeclaration

| Field | Type | Validation |
|-------|------|------------|
| policy | Option\<String\> | enum: "retain" (default), "drop_namespace_objects", "archive_then_drop" |

### RuntimeAccessDeclaration

| Field | Type | Validation |
|-------|------|------------|
| mode | Option\<String\> | enum: "host_api_only" (default). Future: "scoped_sql_session", "read_only_snapshot" |

---

## 2. Computed Entities (not persisted)

### StoragePlan

Host-computed plan before any database mutation. Immutable once built. Created per extension activation attempt.

| Field | Type | Source |
|-------|------|--------|
| extension_id | String | manifest |
| extension_version | String | manifest |
| namespace_alias | String | manifest |
| effective_prefix | String | computed: `ext_{alias}_` |
| action | PlanAction | computed |
| migrations_to_apply | Vec\<PlannedMigration\> | computed |
| migrations_to_skip | Vec\<PlannedMigration\> | computed (upgrade only) |
| expected_objects | Vec\<ExpectedObject\> | computed from SQL parsing |
| static_report | Option\<StaticValidationReport\> | computed after Stage B |
| dry_run_report | Option\<DryRunReport\> | computed after Stage C |

### PlanAction

| Variant | Meaning |
|---------|---------|
| NewInstall | First installation — all migrations apply |
| Upgrade | Existing namespace — only new migrations apply |
| Noop | All migrations already applied, checksums match |
| RepairOnly | Checksums match but namespace status needs repair |

### PlannedMigration

| Field | Type | Description |
|-------|------|-------------|
| migration_id | String | e.g. "001_init" |
| path | PathBuf | Absolute resolved path to SQL file |
| raw_sql | String | File contents as-is |
| raw_checksum | String | SHA-256 hex of raw file contents |
| expanded_sql | String | SQL after `{{prefix}}` expansion |
| expanded_checksum | String | SHA-256 hex of expanded SQL |
| action | MigrationAction | Apply or Skip |
| extracted_objects | Vec\<ExtractedObject\> | Tables/indexes found by parser |
| statement_count | usize | Number of SQL statements in file |

### MigrationAction

| Variant | Meaning |
|---------|---------|
| Apply | Execute this migration |
| Skip | Already applied (checksum match), skip during upgrade |

### ExtractedObject / ExpectedObject

| Field | Type | Description |
|-------|------|-------------|
| object_name | String | Full qualified name with prefix |
| object_type | ObjectType | "table" or "index" |
| created_by_migration_id | String | Which migration creates this object |

### StaticValidationReport

| Field | Type |
|-------|------|
| statements_checked | usize |
| objects_found | usize |
| warnings | Vec\<String\> |
| errors | Vec\<String\> |
| valid | bool |

### DryRunReport

| Field | Type |
|-------|------|
| tables_created | usize |
| indexes_created | usize |
| errors | Vec\<String\> |
| valid | bool |

### ApplyReport

| Field | Type |
|-------|------|
| namespace_id | String |
| action | PlanAction |
| migrations_applied | usize |
| objects_created | usize |
| status | String |

### IntegrityReport

| Field | Type |
|-------|------|
| namespace_id | String |
| status | String |
| objects_verified | usize |
| objects_missing | Vec\<String\> |
| objects_unexpected | Vec\<String\> |
| checksum_drift | Vec\<String\> |

### UninstallReport

| Field | Type |
|-------|------|
| namespace_id | String |
| policy_executed | String |
| objects_dropped | usize |
| archive_path | Option\<String\> |

---

## 3. Core Metadata Tables (host-owned, persisted)

All tables created by `migrations/003_extension_storage.sql`. These are **host-owned** — no extension may create or mutate them.

### extension_storage_namespaces

One row per extension storage namespace. Namespace is 1:1 with extension.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | TEXT | PRIMARY KEY | Stable namespace record ID (e.g. `extns_<uuid>`) |
| extension_id | TEXT | NOT NULL | Logical reference to extensions.id |
| extension_version_first_seen | TEXT | NOT NULL | First version that reserved this namespace |
| namespace_alias | TEXT | NOT NULL | Requested alias from manifest |
| effective_prefix | TEXT | NOT NULL, UNIQUE | Actual reserved prefix (e.g. `ext_chat_llama_`) |
| engine | TEXT | NOT NULL | "sqlite" |
| storage_spec_version | TEXT | NOT NULL | Storage contract version (e.g. "0.1") |
| sql_profile | TEXT | NOT NULL | e.g. "nexus_sqlite_v1" |
| status | TEXT | NOT NULL | reserved, active, invalid, repair_required, retained, dropped |
| uninstall_policy | TEXT | NOT NULL | Current policy from latest manifest version |
| created_at | TEXT | NOT NULL | ISO 8601 UTC timestamp |
| updated_at | TEXT | NOT NULL | ISO 8601 UTC timestamp |

**Status values and transitions**:
- `reserved` → `active` (after successful apply)
- `reserved` → `invalid` (validation failure)
- `active` → `repair_required` (drift detected, checksum mismatch)
- `active` → `retained` (uninstall with retain policy)
- `active` → `dropped` (uninstall with drop/archive policy)
- `invalid` → `active` (retry after fix)
- `repair_required` → `active` (after successful repair)

**Indexes**:
- `idx_ext_storage_ns_extension_id` ON (extension_id)
- `idx_ext_storage_ns_status` ON (status)

### extension_storage_migrations

One row per applied or attempted migration file.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | TEXT | PRIMARY KEY | Stable migration record ID |
| namespace_id | TEXT | NOT NULL | FK → extension_storage_namespaces.id |
| extension_id | TEXT | NOT NULL | Denormalized for diagnostics |
| extension_version | TEXT | NOT NULL | Package version that supplied this migration |
| migration_id | TEXT | NOT NULL | Migration ID from manifest (e.g. "001_init") |
| path | TEXT | NOT NULL | Package-relative file path |
| raw_checksum_sha256 | TEXT | NOT NULL | SHA-256 of raw file contents |
| expanded_checksum_sha256 | TEXT | NOT NULL | SHA-256 of SQL after prefix expansion |
| status | TEXT | NOT NULL | planned, applied, failed, skipped |
| applied_at | TEXT | NULLABLE | ISO 8601 UTC, set when status becomes `applied` |
| error_json | TEXT | NULLABLE | Structured JSON failure payload (on failure) |

**Unique constraint**: `(namespace_id, migration_id)`

**Status values**:
- `planned` — recorded in plan, not yet applied
- `applied` — successfully executed and committed
- `failed` — execution failed, transaction rolled back
- `skipped` — already applied in prior version (upgrade scenario)

**Indexes**:
- `idx_ext_storage_migrations_namespace_migration` ON (namespace_id, migration_id)

### extension_storage_objects

Inventory of SQL objects (tables and indexes) created per namespace.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | TEXT | PRIMARY KEY | Stable object record ID |
| namespace_id | TEXT | NOT NULL | FK → extension_storage_namespaces.id |
| object_name | TEXT | NOT NULL | Table or index name (with prefix) |
| object_type | TEXT | NOT NULL | "table" or "index" |
| created_by_migration_id | TEXT | NOT NULL | Migration that created this object |
| sql_hash | TEXT | NULLABLE | SHA-256 of the CREATE statement that defined this object |
| status | TEXT | NOT NULL | present, dropped, drifted |
| recorded_at | TEXT | NOT NULL | ISO 8601 UTC timestamp |

**Unique constraint**: `(namespace_id, object_name)`

**Status values**:
- `present` — object exists in database and inventory
- `dropped` — object removed during uninstall
- `drifted` — recorded as present but physically absent (integrity check)

**Indexes**:
- `idx_ext_storage_objects_namespace_object_name` ON (namespace_id, object_name)

### extension_storage_operations

Admin operation journal. Records every validate/apply/repair/drop/archive operation.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | TEXT | PRIMARY KEY | Operation ID |
| namespace_id | TEXT | NOT NULL | FK → extension_storage_namespaces.id |
| operation_type | TEXT | NOT NULL | validate, apply, repair, drop, archive |
| status | TEXT | NOT NULL | started, completed, failed |
| plan_json | TEXT | NULLABLE | Serialized plan (input to operation) |
| result_json | TEXT | NULLABLE | Serialized outcome (output of operation) |
| started_at | TEXT | NOT NULL | ISO 8601 UTC timestamp |
| completed_at | TEXT | NULLABLE | ISO 8601 UTC, set on completion/failure |

**Status values**:
- `started` — operation in progress (crash recovery marker)
- `completed` — operation finished successfully
- `failed` — operation failed

**Indexes**:
- `idx_ext_storage_operations_namespace_started_at` ON (namespace_id, started_at)

### extension_storage_archives

Archive metadata for `archive_then_drop` uninstall policy.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | TEXT | PRIMARY KEY | Archive record ID |
| namespace_id | TEXT | NOT NULL | FK → extension_storage_namespaces.id |
| archive_format | TEXT | NOT NULL | "jsonl_zip" |
| archive_path | TEXT | NOT NULL | Filesystem path to archive file |
| content_hash | TEXT | NOT NULL | SHA-256 of archive file |
| table_count | INTEGER | NOT NULL | Number of tables archived |
| row_count | INTEGER | NOT NULL | Total rows across all tables |
| created_at | TEXT | NOT NULL | ISO 8601 UTC timestamp |

---

## 4. State Machine Diagrams

### 4.1 Namespace Status

```
                    ┌──────────────────────┐
                    │                      │
(new) ──→ reserved ─┤──→ active ──→ retained (uninstall/retain)
                    │     │  ↑      → dropped  (uninstall/drop|archive)
                    │     │  │
                    │     └──→ repair_required ──→ active (after repair)
                    │
                    └──→ invalid ──→ active (after retry/fix)
```

### 4.2 Migration Status

```
(new) ──→ planned ──→ applied
                  └──→ failed ──→ applied (retry via repair)
                  └──→ skipped (already applied in upgrade)
```

### 4.3 Extension Activation with Storage

```
discovered
  → validating_manifest
  → validating_storage_static
  → validating_storage_dry_run
  → installable
  → applying_storage
  → active

Failure branches:
  → invalid_storage (manifest or static validation failure)
  → quarantined_storage (apply failure, rollback completed)
  → repair_required (checksum drift, downgrade, incomplete state)
```

---

## 5. Entity Relationships

```
ExtensionManifest ──1:0..1──→ StorageContribution (optional)

Namespace ──1:1──→ Extension (one namespace per storage-contributing extension)
Namespace ──1:N──→ Migration (ordered sequence)
Namespace ──1:N──→ Object (tables + indexes)
Namespace ──1:N──→ Operation (journal)
Namespace ──1:N──→ Archive (for archive_then_drop)

Object ──N:1──→ Migration (created_by)
```

---

## 6. Rust Type Mapping

### Types in nexus-extension

```rust
pub struct StorageContribution {
    pub spec_version: String,
    pub engine: String,
    pub namespace: NamespaceDeclaration,
    pub migrations: MigrationDeclaration,
    pub sql_profile: SqlProfileDeclaration,
    pub uninstall: Option<UninstallDeclaration>,
    pub runtime_access: Option<RuntimeAccessDeclaration>,
}

pub struct NamespaceDeclaration {
    pub alias: String,
    pub prefix_mode: String,
}

pub struct MigrationDeclaration {
    pub strategy: String,
    pub files: Vec<MigrationFileRef>,
}

pub struct MigrationFileRef {
    pub id: String,
    pub path: String,
}

pub struct SqlProfileDeclaration {
    pub profile: String,
}

pub struct UninstallDeclaration {
    pub policy: Option<String>,
}

pub struct RuntimeAccessDeclaration {
    pub mode: Option<String>,
}
```

### Types in nexus-storage

```rust
pub struct NamespaceRecord {
    pub id: String,
    pub extension_id: String,
    pub extension_version_first_seen: String,
    pub namespace_alias: String,
    pub effective_prefix: String,
    pub engine: String,
    pub storage_spec_version: String,
    pub sql_profile: String,
    pub status: String,
    pub uninstall_policy: String,
    pub created_at: String,
    pub updated_at: String,
}

pub struct MigrationRecord {
    pub id: String,
    pub namespace_id: String,
    pub extension_id: String,
    pub extension_version: String,
    pub migration_id: String,
    pub path: String,
    pub raw_checksum_sha256: String,
    pub expanded_checksum_sha256: String,
    pub status: String,
    pub applied_at: Option<String>,
    pub error_json: Option<String>,
}

pub struct ObjectRecord {
    pub id: String,
    pub namespace_id: String,
    pub object_name: String,
    pub object_type: String,
    pub created_by_migration_id: String,
    pub sql_hash: Option<String>,
    pub status: String,
    pub recorded_at: String,
}

pub struct OperationRecord {
    pub id: String,
    pub namespace_id: String,
    pub operation_type: String,
    pub status: String,
    pub plan_json: Option<String>,
    pub result_json: Option<String>,
    pub started_at: String,
    pub completed_at: Option<String>,
}

pub struct ArchiveRecord {
    pub id: String,
    pub namespace_id: String,
    pub archive_format: String,
    pub archive_path: String,
    pub content_hash: String,
    pub table_count: i64,
    pub row_count: i64,
    pub created_at: String,
}
```

### Error Types in nexus-storage

```rust
pub enum StorageContributionError {
    NamespaceCollision { prefix: String, existing_extension: String },
    MigrationChecksumDrift { migration_id: String, expected: String, actual: String },
    SqlValidationFailed { migration_id: String, errors: Vec<String> },
    PrefixViolation { object_name: String, expected_prefix: String },
    ApplyFailed { migration_id: String, error: String },
    DryRunFailed { errors: Vec<String> },
    IntegrityDrift { objects_missing: Vec<String>, objects_unexpected: Vec<String> },
    ArchiveFailed { reason: String },
    QuarantineThresholdExceeded { extension_id: String, failures: usize },
    MigrationFileNotFound { path: String },
    MigrationFileEmpty { path: String },
    MigrationFileTooLarge { path: String, size: u64, max: u64 },
    MigrationFileNotUtf8 { path: String },
    StatementCountExceeded { migration_id: String, count: usize, max: usize },
    MigrationCountExceeded { count: usize, max: usize },
    ReservedPrefix { alias: String },
    DowngradeRejected { applied_count: usize, declared_count: usize },
    AliasChangeRejected { old_alias: String, new_alias: String },
    MigrationReorderRejected { details: String },
}
```
