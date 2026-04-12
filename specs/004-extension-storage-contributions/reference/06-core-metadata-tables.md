# Core Metadata Tables for Extension Storage

## 1. Overview

These tables are host-owned core metadata tables. They are not part of any extension namespace.

They record reserved namespaces, migration history, object inventory, repair markers, and uninstall state.

## 2. Required tables

### 2.1 `extension_storage_namespaces`

Purpose:
- one row per extension storage namespace

Suggested columns:

| column | type | notes |
|---|---|---|
| `id` | TEXT PK | stable namespace record id |
| `extension_id` | TEXT NOT NULL | FK-like logical reference to extensions.id |
| `extension_version_first_seen` | TEXT NOT NULL | first version that reserved the namespace |
| `namespace_alias` | TEXT NOT NULL | requested alias from manifest |
| `effective_prefix` | TEXT NOT NULL UNIQUE | actual reserved prefix |
| `engine` | TEXT NOT NULL | `sqlite` |
| `storage_spec_version` | TEXT NOT NULL | e.g. `0.1` |
| `sql_profile` | TEXT NOT NULL | e.g. `nexus_sqlite_v1` |
| `status` | TEXT NOT NULL | `reserved`, `active`, `invalid`, `repair_required`, `retained`, `dropped` |
| `uninstall_policy` | TEXT NOT NULL | current policy |
| `created_at` | TEXT NOT NULL | iso timestamp |
| `updated_at` | TEXT NOT NULL | iso timestamp |

### 2.2 `extension_storage_migrations`

Purpose:
- one row per applied or attempted migration file

Suggested columns:

| column | type | notes |
|---|---|---|
| `id` | TEXT PK | stable migration record id |
| `namespace_id` | TEXT NOT NULL | references namespace record |
| `extension_id` | TEXT NOT NULL | denormalized for diagnostics |
| `extension_version` | TEXT NOT NULL | package version that supplied the migration |
| `migration_id` | TEXT NOT NULL | `001_init` style id |
| `path` | TEXT NOT NULL | package-relative file path |
| `raw_checksum_sha256` | TEXT NOT NULL | package file checksum |
| `expanded_checksum_sha256` | TEXT NOT NULL | post-expansion checksum |
| `status` | TEXT NOT NULL | `planned`, `applied`, `failed`, `skipped` |
| `applied_at` | TEXT | nullable until applied |
| `error_json` | TEXT | nullable structured failure payload |

Recommended unique key:
- `(namespace_id, migration_id)`

### 2.3 `extension_storage_objects`

Purpose:
- inventory of tables and indexes created by a namespace

Suggested columns:

| column | type | notes |
|---|---|---|
| `id` | TEXT PK | stable object record id |
| `namespace_id` | TEXT NOT NULL | namespace owner |
| `object_name` | TEXT NOT NULL | table or index name |
| `object_type` | TEXT NOT NULL | `table` or `index` |
| `created_by_migration_id` | TEXT NOT NULL | migration source |
| `sql_hash` | TEXT | optional hash of the object-defining SQL |
| `status` | TEXT NOT NULL | `present`, `dropped`, `drifted` |
| `recorded_at` | TEXT NOT NULL | iso timestamp |

Recommended unique key:
- `(namespace_id, object_name)`

### 2.4 `extension_storage_operations`

Purpose:
- long-running or admin operation journal

Suggested columns:

| column | type | notes |
|---|---|---|
| `id` | TEXT PK | operation id |
| `namespace_id` | TEXT NOT NULL | owner namespace |
| `operation_type` | TEXT NOT NULL | `validate`, `apply`, `repair`, `drop`, `archive` |
| `status` | TEXT NOT NULL | `started`, `completed`, `failed` |
| `plan_json` | TEXT | serialized plan |
| `result_json` | TEXT | serialized outcome |
| `started_at` | TEXT NOT NULL | iso timestamp |
| `completed_at` | TEXT | nullable |

### 2.5 `extension_storage_archives`

Purpose:
- archive metadata when uninstall policy is `archive_then_drop`

Suggested columns:

| column | type | notes |
|---|---|---|
| `id` | TEXT PK | archive record id |
| `namespace_id` | TEXT NOT NULL | namespace owner |
| `archive_format` | TEXT NOT NULL | e.g. `sqlite_dump_zip`, `jsonl_zip` |
| `archive_path` | TEXT NOT NULL | filesystem location |
| `content_hash` | TEXT NOT NULL | hash of archive payload |
| `created_at` | TEXT NOT NULL | iso timestamp |

## 3. Suggested migration file for host core tables

Create a host migration such as:

```text
migrations/003_extension_storage_core.sql
```

This keeps the feature aligned with the existing SQLite migration approach.

## 4. Core table constraints

1. No extension may create or mutate these tables.
2. Only the host writes these tables.
3. These tables are part of host backup and integrity tooling.
4. These tables must exist before any extension storage migration is applied.

## 5. Recommended indexes on core metadata tables

- `idx_ext_storage_ns_extension_id`
- `idx_ext_storage_ns_status`
- `idx_ext_storage_migrations_namespace_migration`
- `idx_ext_storage_objects_namespace_object_name`
- `idx_ext_storage_operations_namespace_started_at`
