# Data Model: Extension Storage Contributions

## Entities

### StorageContribution (parsed from manifest)

Represents an extension's storage declaration, parsed from the `storage` block in manifest.yaml.

| Field | Type | Source | Validation |
|-------|------|--------|------------|
| spec_version | String | manifest | const "0.1" |
| engine | String | manifest | const "sqlite" |
| namespace_alias | String | manifest | regex `^[a-z][a-z0-9_]{2,48}$` |
| prefix_mode | String | manifest | const "host_derived" |
| migration_strategy | String | manifest | const "sql_file_list" |
| migrations | Vec<MigrationFileRef> | manifest | min 1, max 64 |
| sql_profile | String | manifest | const "nexus_sqlite_v1" |
| uninstall_policy | String | manifest | "retain" (default) / "drop_namespace_objects" / "archive_then_drop" |
| runtime_access_mode | String | manifest | const "host_api_only" |

### MigrationFileRef

| Field | Type | Source | Validation |
|-------|------|--------|------------|
| id | String | manifest | regex `^[0-9]{3}_[a-z0-9_]{2,64}$`, unique within extension |
| path | String | manifest | relative to extension dir, no path traversal |

### StoragePlan (computed, not persisted)

Host-computed plan before any database mutation.

| Field | Type | Source |
|-------|------|--------|
| extension_id | String | manifest |
| extension_version | String | manifest |
| namespace_alias | String | manifest |
| effective_prefix | String | computed: `ext_{alias}_` |
| action | PlanAction | computed: new_install / upgrade / noop / repair_only |
| migrations_to_apply | Vec<PlannedMigration> | computed |
| expected_objects | Vec<ExpectedObject> | computed from SQL parsing |

### PlannedMigration

| Field | Type |
|-------|------|
| migration_id | String |
| path | PathBuf |
| raw_checksum | String (SHA-256 hex) |
| expanded_sql | String |
| expanded_checksum | String (SHA-256 hex) |
| action | MigrationAction: apply / skip (already applied) |

### ExpectedObject

| Field | Type |
|-------|------|
| object_name | String |
| object_type | "table" / "index" |
| created_by_migration_id | String |

---

## Core Metadata Tables (host-owned, persisted)

### extension_storage_namespaces

One row per extension storage namespace.

| Column | Type | Constraints |
|--------|------|-------------|
| id | TEXT | PRIMARY KEY |
| extension_id | TEXT | NOT NULL |
| extension_version_first_seen | TEXT | NOT NULL |
| namespace_alias | TEXT | NOT NULL |
| effective_prefix | TEXT | NOT NULL, UNIQUE |
| engine | TEXT | NOT NULL, default "sqlite" |
| storage_spec_version | TEXT | NOT NULL |
| sql_profile | TEXT | NOT NULL |
| status | TEXT | NOT NULL |
| uninstall_policy | TEXT | NOT NULL |
| created_at | TEXT | NOT NULL (ISO 8601) |
| updated_at | TEXT | NOT NULL (ISO 8601) |

**Status values**: reserved, active, invalid, repair_required, retained, dropped

### extension_storage_migrations

One row per applied/attempted migration.

| Column | Type | Constraints |
|--------|------|-------------|
| id | TEXT | PRIMARY KEY |
| namespace_id | TEXT | NOT NULL, FK→namespaces |
| extension_id | TEXT | NOT NULL |
| extension_version | TEXT | NOT NULL |
| migration_id | TEXT | NOT NULL |
| path | TEXT | NOT NULL |
| raw_checksum_sha256 | TEXT | NOT NULL |
| expanded_checksum_sha256 | TEXT | NOT NULL |
| status | TEXT | NOT NULL |
| applied_at | TEXT | nullable |
| error_json | TEXT | nullable |

**Unique**: (namespace_id, migration_id)
**Status values**: planned, applied, failed, skipped

### extension_storage_objects

Inventory of SQL objects per namespace.

| Column | Type | Constraints |
|--------|------|-------------|
| id | TEXT | PRIMARY KEY |
| namespace_id | TEXT | NOT NULL, FK→namespaces |
| object_name | TEXT | NOT NULL |
| object_type | TEXT | NOT NULL |
| created_by_migration_id | TEXT | NOT NULL |
| sql_hash | TEXT | nullable |
| status | TEXT | NOT NULL |
| recorded_at | TEXT | NOT NULL (ISO 8601) |

**Unique**: (namespace_id, object_name)
**Status values**: present, dropped, drifted

### extension_storage_operations

Admin operation journal.

| Column | Type | Constraints |
|--------|------|-------------|
| id | TEXT | PRIMARY KEY |
| namespace_id | TEXT | NOT NULL, FK→namespaces |
| operation_type | TEXT | NOT NULL |
| status | TEXT | NOT NULL |
| plan_json | TEXT | nullable |
| result_json | TEXT | nullable |
| started_at | TEXT | NOT NULL (ISO 8601) |
| completed_at | TEXT | nullable |

**Operation types**: validate, apply, repair, drop, archive

### extension_storage_archives

Archive metadata for archive_then_drop.

| Column | Type | Constraints |
|--------|------|-------------|
| id | TEXT | PRIMARY KEY |
| namespace_id | TEXT | NOT NULL, FK→namespaces |
| archive_format | TEXT | NOT NULL |
| archive_path | TEXT | NOT NULL |
| content_hash | TEXT | NOT NULL |
| created_at | TEXT | NOT NULL (ISO 8601) |

---

## State Transitions

### Namespace Status

```
(new) → reserved → active
                  → invalid → (retry) → active
                  → repair_required → (repair) → active
       active → retained (uninstall with retain)
       active → dropped (uninstall with drop/archive)
```

### Migration Status

```
(new) → planned → applied
                → failed → (retry via repair) → applied
                → skipped (already applied in upgrade scenario)
```

### Extension Activation with Storage

```
discovered
  → validating_manifest (existing)
  → validating_storage_static (NEW)
  → validating_storage_dry_run (NEW)
  → installable
  → applying_storage (NEW)
  → active
```

Failure branches: invalid_storage, quarantined_storage, repair_required

---

## Relationships

- StorageContribution belongs_to ExtensionManifest (1:1, optional)
- Namespace belongs_to Extension (1:1 per extension)
- Migration belongs_to Namespace (many:1)
- Object belongs_to Namespace (many:1)
- Object created_by Migration (many:1)
- Operation targets Namespace (many:1)
- Archive belongs_to Namespace (many:1)

---

## Rust Type Mapping

### New types in nexus-extension

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

### New types in nexus-storage

```rust
pub struct NamespaceRecord { /* matches table columns */ }
pub struct MigrationRecord { /* matches table columns */ }
pub struct ObjectRecord { /* matches table columns */ }
pub struct OperationRecord { /* matches table columns */ }
pub struct ArchiveRecord { /* matches table columns */ }
```
