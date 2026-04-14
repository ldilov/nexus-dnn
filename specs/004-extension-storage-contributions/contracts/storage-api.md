# Contract: Extension Storage API

---

## 1. REST Endpoints

### 1.1 GET /api/v1/extensions/{extension_id}/storage

Returns namespace metadata, migration history, and object inventory for an extension's storage contribution.

**Path Parameters**:
- `extension_id` (string, required) — Extension identifier (e.g. "example.chat.llama")

**Response 200** (storage exists):
```json
{
  "data": {
    "extension_id": "example.chat.llama",
    "namespace": {
      "id": "extns_01",
      "alias": "chat_llama",
      "effective_prefix": "ext_chat_llama_",
      "status": "active",
      "engine": "sqlite",
      "storage_spec_version": "0.1",
      "sql_profile": "nexus_sqlite_v1",
      "uninstall_policy": "retain",
      "created_at": "2026-04-12T12:00:00Z",
      "updated_at": "2026-04-12T12:10:33Z"
    },
    "migrations": [
      {
        "migration_id": "001_init",
        "status": "applied",
        "path": "storage/migrations/001_init.sql",
        "raw_checksum": "sha256:abc123def456...",
        "expanded_checksum": "sha256:789012ghi345...",
        "applied_at": "2026-04-12T12:10:33Z",
        "error_json": null
      },
      {
        "migration_id": "002_indexes",
        "status": "applied",
        "path": "storage/migrations/002_indexes.sql",
        "raw_checksum": "sha256:jkl678mno901...",
        "expanded_checksum": "sha256:pqr234stu567...",
        "applied_at": "2026-04-12T12:10:34Z",
        "error_json": null
      }
    ],
    "objects": {
      "tables": [
        "ext_chat_llama_threads",
        "ext_chat_llama_messages",
        "ext_chat_llama_message_attachments",
        "ext_chat_llama_thread_model_profiles"
      ],
      "indexes": [
        "ext_chat_llama_idx_threads_updated_at",
        "ext_chat_llama_idx_messages_thread_created_at",
        "ext_chat_llama_idx_messages_status",
        "ext_chat_llama_idx_attachments_message_id"
      ]
    }
  }
}
```

**Response 404** (extension has no storage contribution):
```json
{
  "error": {
    "code": "storage_not_found",
    "message": "Extension 'example.utility.echo' has no storage contributions"
  }
}
```

---

### 1.2 POST /api/v1/extensions/{extension_id}/storage/validate

Re-runs static SQL analysis + dry-run validation for the extension's storage. Does NOT mutate the real database.

**Path Parameters**:
- `extension_id` (string, required)

**Request body**: None

**Response 200** (validation succeeded):
```json
{
  "data": {
    "valid": true,
    "plan": {
      "action": "new_install",
      "migrations_to_apply": ["001_init", "002_indexes"],
      "migrations_to_skip": [],
      "expected_objects": {
        "tables": 4,
        "indexes": 4
      }
    },
    "static_report": {
      "statements_checked": 8,
      "objects_found": 8,
      "warnings": [],
      "errors": []
    },
    "dry_run_report": {
      "tables_created": 4,
      "indexes_created": 4,
      "errors": []
    }
  }
}
```

**Response 200** (validation failed):
```json
{
  "data": {
    "valid": false,
    "static_report": {
      "statements_checked": 5,
      "objects_found": 3,
      "warnings": [],
      "errors": [
        "migration 001_init: statement 3: DROP TABLE is forbidden in nexus_sqlite_v1 profile",
        "migration 001_init: table 'chat_threads' does not match prefix pattern 'ext_chat_llama_'"
      ]
    },
    "dry_run_report": null
  }
}
```

---

### 1.3 POST /api/v1/extensions/{extension_id}/storage/apply

Applies the prepared migration plan to the real database. The extension must be in `installable` state (validation passed).

**Path Parameters**:
- `extension_id` (string, required)

**Request body**: None

**Response 200** (apply succeeded):
```json
{
  "data": {
    "namespace_id": "extns_01",
    "action": "new_install",
    "migrations_applied": 2,
    "objects_created": 8,
    "status": "active"
  }
}
```

**Response 409** (apply failed — rollback completed):
```json
{
  "error": {
    "code": "apply_failed",
    "message": "Migration 002_indexes failed: near \"INVALID\": syntax error",
    "details": {
      "namespace_id": "extns_01",
      "failed_migration_id": "002_indexes",
      "migrations_applied_before_failure": 1,
      "rollback_completed": true,
      "extension_status": "quarantined_storage"
    }
  }
}
```

**Response 400** (extension not in installable state):
```json
{
  "error": {
    "code": "not_installable",
    "message": "Extension must pass validation before apply. Current status: invalid_storage"
  }
}
```

---

### 1.4 POST /api/v1/extensions/{extension_id}/storage/verify

Runs integrity verification comparing recorded object inventory against actual `sqlite_master` state.

**Path Parameters**:
- `extension_id` (string, required)

**Request body**: None

**Response 200** (healthy):
```json
{
  "data": {
    "namespace_id": "extns_01",
    "status": "healthy",
    "objects_verified": 8,
    "objects_missing": [],
    "objects_unexpected": [],
    "checksum_drift": []
  }
}
```

**Response 200** (drift detected — namespace marked repair_required):
```json
{
  "data": {
    "namespace_id": "extns_01",
    "status": "drift_detected",
    "objects_verified": 8,
    "objects_missing": ["ext_chat_llama_threads"],
    "objects_unexpected": [],
    "checksum_drift": [],
    "namespace_status_updated_to": "repair_required"
  }
}
```

---

### 1.5 POST /api/v1/extensions/{extension_id}/storage/uninstall

Executes the uninstall policy for the extension's storage namespace.

**Path Parameters**:
- `extension_id` (string, required)

**Request body** (optional):
```json
{
  "policy_override": "drop_namespace_objects"
}
```

If `policy_override` is provided, it overrides the manifest-declared policy for this operation only.

**Response 200** (uninstall completed):
```json
{
  "data": {
    "namespace_id": "extns_01",
    "policy_executed": "drop_namespace_objects",
    "objects_dropped": 8,
    "archive_path": null,
    "namespace_status": "dropped"
  }
}
```

**Response 200** (archive_then_drop completed):
```json
{
  "data": {
    "namespace_id": "extns_01",
    "policy_executed": "archive_then_drop",
    "objects_dropped": 8,
    "archive_path": "/workspace/archives/ext_chat_llama_2026-04-13T10-30-00Z.zip",
    "archive_hash": "sha256:abc123...",
    "archive_tables": 4,
    "archive_rows": 1523,
    "namespace_status": "dropped"
  }
}
```

**Response 500** (archive failed — drop aborted):
```json
{
  "error": {
    "code": "archive_failed",
    "message": "Archive creation failed: disk full. Drop aborted. Namespace remains active.",
    "details": {
      "namespace_id": "extns_01",
      "namespace_status": "active"
    }
  }
}
```

---

### 1.6 GET /api/v1/storage/namespaces

Lists all extension storage namespaces for diagnostics.

**Query Parameters**:
- `status` (string, optional) — Filter by namespace status (e.g. "active", "repair_required")

**Response 200**:
```json
{
  "data": {
    "namespaces": [
      {
        "id": "extns_01",
        "extension_id": "example.chat.llama",
        "alias": "chat_llama",
        "effective_prefix": "ext_chat_llama_",
        "status": "active",
        "uninstall_policy": "retain",
        "migration_count": 2,
        "object_count": 8,
        "created_at": "2026-04-12T12:00:00Z",
        "updated_at": "2026-04-12T12:10:33Z"
      }
    ],
    "total": 1
  }
}
```

---

## 2. Event Payloads

All events published to the existing `NexusEvent` bus via new variants. Events are serialized as JSON with a `type` tag.

### Common Fields (all events)

| Field | Type | Description |
|-------|------|-------------|
| type | String | Event type identifier |
| extension_id | String | Extension that triggered the event |
| namespace_id | String | Namespace record ID (if applicable) |
| effective_prefix | String | Computed prefix (if applicable) |

### Event Definitions

#### extension.storage.namespace_reserved
```json
{
  "type": "extension.storage.namespace_reserved",
  "extension_id": "example.chat.llama",
  "namespace_id": "extns_01",
  "effective_prefix": "ext_chat_llama_"
}
```

#### extension.storage.validation_started
```json
{
  "type": "extension.storage.validation_started",
  "extension_id": "example.chat.llama"
}
```

#### extension.storage.validation_failed
```json
{
  "type": "extension.storage.validation_failed",
  "extension_id": "example.chat.llama",
  "errors": [
    "migration 001_init: DROP TABLE is forbidden",
    "migration 001_init: table 'threads' missing prefix"
  ]
}
```

#### extension.storage.plan_ready
```json
{
  "type": "extension.storage.plan_ready",
  "extension_id": "example.chat.llama",
  "action": "new_install",
  "migrations_to_apply": 2,
  "expected_objects": 8
}
```

#### extension.storage.apply_started
```json
{
  "type": "extension.storage.apply_started",
  "extension_id": "example.chat.llama",
  "namespace_id": "extns_01"
}
```

#### extension.storage.migration_applied
```json
{
  "type": "extension.storage.migration_applied",
  "extension_id": "example.chat.llama",
  "namespace_id": "extns_01",
  "migration_id": "001_init",
  "objects_created": 4,
  "applied_at": "2026-04-12T12:10:33Z"
}
```

#### extension.storage.apply_failed
```json
{
  "type": "extension.storage.apply_failed",
  "extension_id": "example.chat.llama",
  "namespace_id": "extns_01",
  "migration_id": "002_indexes",
  "error": "near \"INVALID\": syntax error",
  "rollback_completed": true
}
```

#### extension.storage.integrity_verified
```json
{
  "type": "extension.storage.integrity_verified",
  "extension_id": "example.chat.llama",
  "namespace_id": "extns_01",
  "status": "healthy",
  "objects_verified": 8
}
```

#### extension.storage.integrity_drift_detected
```json
{
  "type": "extension.storage.integrity_drift_detected",
  "extension_id": "example.chat.llama",
  "namespace_id": "extns_01",
  "objects_drifted": ["ext_chat_llama_threads"],
  "namespace_status_updated_to": "repair_required"
}
```

#### extension.storage.uninstall_started
```json
{
  "type": "extension.storage.uninstall_started",
  "extension_id": "example.chat.llama",
  "namespace_id": "extns_01",
  "policy": "drop_namespace_objects"
}
```

#### extension.storage.uninstall_completed
```json
{
  "type": "extension.storage.uninstall_completed",
  "extension_id": "example.chat.llama",
  "namespace_id": "extns_01",
  "policy_executed": "drop_namespace_objects",
  "objects_dropped": 8
}
```

---

## 3. Rust Trait Contracts

### ExtensionStoragePlanner

Builds an install/upgrade plan from a manifest and its migration files. Pure computation — no database mutations.

```rust
pub trait ExtensionStoragePlanner: Send + Sync {
    /// Build a storage plan by reading migration files, computing checksums,
    /// and comparing against previously applied migrations.
    ///
    /// # Arguments
    /// - `extension_root`: Absolute path to the extension's directory
    /// - `manifest`: The parsed extension manifest with storage block
    /// - `applied_migrations`: Previously applied migrations for this namespace (empty for new install)
    ///
    /// # Returns
    /// - `Ok(StoragePlan)`: Computed plan with action, migrations, and expected objects
    /// - `Err(StorageContributionError)`: On file read failure, checksum drift, reorder, or alias change
    async fn build_plan(
        &self,
        extension_root: &Path,
        manifest: &ExtensionManifest,
        applied_migrations: &[MigrationRecord],
    ) -> Result<StoragePlan, StorageContributionError>;
}
```

### ExtensionStorageValidator

Validates migration SQL against the declared profile. Two stages: static analysis and dry-run.

```rust
pub trait ExtensionStorageValidator: Send + Sync {
    /// Stage B: Static SQL validation.
    /// Parse SQL, check statement types, validate object names, check FK references.
    ///
    /// # Returns
    /// - `Ok(StaticValidationReport)`: Report with statements checked, objects found, errors
    /// - `Err(StorageContributionError)`: On parse failure or critical validation error
    async fn validate_static(
        &self,
        plan: &StoragePlan,
    ) -> Result<StaticValidationReport, StorageContributionError>;

    /// Stage C: Dry-run validation.
    /// Execute migrations against a temporary in-memory SQLite pre-loaded with host schema.
    ///
    /// # Returns
    /// - `Ok(DryRunReport)`: Report with tables/indexes created and any errors
    /// - `Err(StorageContributionError)`: On critical dry-run failure
    async fn validate_dry_run(
        &self,
        plan: &StoragePlan,
    ) -> Result<DryRunReport, StorageContributionError>;
}
```

### ExtensionStorageManager

Manages the lifecycle of extension storage namespaces: reserve, apply, verify, uninstall.

```rust
pub trait ExtensionStorageManager: Send + Sync {
    /// Reserve a namespace prefix in the database.
    /// Checks for prefix collisions against sqlite_master and existing namespaces.
    ///
    /// # Returns
    /// - `Ok(NamespaceRecord)`: The reserved namespace record (status='reserved')
    /// - `Err(StorageContributionError::NamespaceCollision)`: On prefix collision
    async fn reserve_namespace(
        &self,
        plan: &StoragePlan,
    ) -> Result<NamespaceRecord, StorageContributionError>;

    /// Apply the migration plan transactionally.
    /// Opens a single transaction wrapping namespace reservation + all migrations + metadata.
    /// Uses SAVEPOINTs per migration for granular error reporting.
    ///
    /// # Returns
    /// - `Ok(ApplyReport)`: Summary of applied migrations and created objects
    /// - `Err(StorageContributionError::ApplyFailed)`: On failure, transaction fully rolled back
    async fn apply_plan(
        &self,
        plan: &StoragePlan,
    ) -> Result<ApplyReport, StorageContributionError>;

    /// Verify namespace integrity by comparing sqlite_master against recorded object inventory.
    ///
    /// # Returns
    /// - `Ok(IntegrityReport)`: Missing, unexpected, and drifted objects
    /// If drift detected, updates namespace status to 'repair_required' and emits event.
    async fn verify_namespace(
        &self,
        namespace_id: &str,
    ) -> Result<IntegrityReport, StorageContributionError>;

    /// Execute uninstall policy for a namespace.
    ///
    /// - `Retain`: Remove package registration, keep objects and metadata
    /// - `DropNamespaceObjects`: Drop tables/indexes in reverse dependency order
    /// - `ArchiveThenDrop`: Create JSONL ZIP archive, verify, then drop
    ///
    /// # Returns
    /// - `Ok(UninstallReport)`: Summary of uninstall actions
    /// - `Err(StorageContributionError::ArchiveFailed)`: If archive fails (drop aborted)
    async fn uninstall_namespace(
        &self,
        namespace_id: &str,
        policy: UninstallPolicy,
    ) -> Result<UninstallReport, StorageContributionError>;
}

pub enum UninstallPolicy {
    Retain,
    DropNamespaceObjects,
    ArchiveThenDrop,
}
```

---

## 4. Database Trait Extensions

New methods added to the existing `Database` trait in `crates/nexus-storage/src/database.rs`:

```rust
// Namespace CRUD
async fn insert_namespace(&self, record: &NamespaceRecord) -> Result<(), StorageError>;
async fn get_namespace(&self, id: &str) -> Result<NamespaceRecord, StorageError>;
async fn get_namespace_by_extension(&self, extension_id: &str) -> Result<Option<NamespaceRecord>, StorageError>;
async fn list_namespaces(&self) -> Result<Vec<NamespaceRecord>, StorageError>;
async fn list_namespaces_by_status(&self, status: &str) -> Result<Vec<NamespaceRecord>, StorageError>;
async fn update_namespace_status(&self, id: &str, status: &str) -> Result<(), StorageError>;
async fn update_namespace_policy(&self, id: &str, policy: &str) -> Result<(), StorageError>;

// Migration CRUD
async fn insert_migration_record(&self, record: &MigrationRecord) -> Result<(), StorageError>;
async fn list_migrations_for_namespace(&self, namespace_id: &str) -> Result<Vec<MigrationRecord>, StorageError>;
async fn get_migration_record(&self, namespace_id: &str, migration_id: &str) -> Result<Option<MigrationRecord>, StorageError>;
async fn update_migration_status(&self, id: &str, status: &str, error_json: Option<&str>) -> Result<(), StorageError>;

// Object CRUD
async fn insert_object_record(&self, record: &ObjectRecord) -> Result<(), StorageError>;
async fn list_objects_for_namespace(&self, namespace_id: &str) -> Result<Vec<ObjectRecord>, StorageError>;
async fn update_object_status(&self, id: &str, status: &str) -> Result<(), StorageError>;

// Operation CRUD
async fn insert_operation(&self, record: &OperationRecord) -> Result<(), StorageError>;
async fn update_operation(&self, id: &str, status: &str, result_json: Option<&str>) -> Result<(), StorageError>;
async fn list_operations_for_namespace(&self, namespace_id: &str) -> Result<Vec<OperationRecord>, StorageError>;

// Archive CRUD
async fn insert_archive(&self, record: &ArchiveRecord) -> Result<(), StorageError>;
async fn list_archives_for_namespace(&self, namespace_id: &str) -> Result<Vec<ArchiveRecord>, StorageError>;
```
