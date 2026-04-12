# Contract: Extension Storage API

## Endpoints

### GET /api/v1/extensions/{extension_id}/storage

Returns namespace metadata, migration history, and object inventory for an extension's storage contribution.

**Response** (200):
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
      "uninstall_policy": "retain"
    },
    "migrations": [
      {
        "migration_id": "001_init",
        "status": "applied",
        "path": "storage/migrations/001_init.sql",
        "raw_checksum": "sha256:abc123...",
        "expanded_checksum": "sha256:def456...",
        "applied_at": "2026-04-12T12:10:33Z"
      }
    ],
    "objects": {
      "tables": ["ext_chat_llama_threads", "ext_chat_llama_messages"],
      "indexes": ["ext_chat_llama_idx_threads_updated_at"]
    }
  }
}
```

**Response** (404) if extension has no storage contributions.

---

### POST /api/v1/extensions/{extension_id}/storage/validate

Re-runs static + dry-run validation for the extension's storage.

**Response** (200):
```json
{
  "data": {
    "valid": true,
    "static_report": {
      "statements_checked": 8,
      "objects_found": 4,
      "warnings": []
    },
    "dry_run_report": {
      "tables_created": 4,
      "indexes_created": 4,
      "errors": []
    }
  }
}
```

---

### POST /api/v1/extensions/{extension_id}/storage/apply

Applies the prepared migration plan to the real database.

**Response** (200):
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

---

### POST /api/v1/extensions/{extension_id}/storage/verify

Runs integrity verification comparing recorded inventory against actual database objects.

**Response** (200):
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

---

### POST /api/v1/extensions/{extension_id}/storage/uninstall

Executes the uninstall policy for the extension's storage namespace.

**Request body**:
```json
{
  "policy_override": "drop_namespace_objects"
}
```
(Optional — if omitted, uses the policy declared in manifest)

**Response** (200):
```json
{
  "data": {
    "namespace_id": "extns_01",
    "policy_executed": "drop_namespace_objects",
    "objects_dropped": 8,
    "archive_path": null
  }
}
```

---

### GET /api/v1/storage/namespaces

Lists all extension storage namespaces for diagnostics.

**Response** (200):
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
        "migration_count": 2,
        "object_count": 8
      }
    ]
  }
}
```

---

## Event Payloads

All events published to the existing NexusEvent bus via new variants.

### extension.storage.namespace_reserved
```json
{ "type": "extension.storage.namespace_reserved", "extension_id": "...", "namespace_id": "...", "effective_prefix": "ext_chat_llama_" }
```

### extension.storage.migration_applied
```json
{ "type": "extension.storage.migration_applied", "extension_id": "...", "namespace_id": "...", "migration_id": "001_init", "applied_at": "..." }
```

### extension.storage.apply_failed
```json
{ "type": "extension.storage.apply_failed", "extension_id": "...", "namespace_id": "...", "migration_id": "001_init", "error": "..." }
```

### extension.storage.integrity_drift_detected
```json
{ "type": "extension.storage.integrity_drift_detected", "extension_id": "...", "namespace_id": "...", "objects_drifted": ["ext_chat_llama_threads"] }
```

---

## Rust Traits

```rust
pub trait ExtensionStoragePlanner: Send + Sync {
    async fn build_plan(
        &self,
        extension_root: &Path,
        manifest: &ExtensionManifest,
    ) -> Result<StoragePlan, StorageContributionError>;
}

pub trait ExtensionStorageValidator: Send + Sync {
    async fn validate_static(
        &self,
        plan: &StoragePlan,
    ) -> Result<StaticValidationReport, StorageContributionError>;

    async fn validate_dry_run(
        &self,
        plan: &StoragePlan,
    ) -> Result<DryRunReport, StorageContributionError>;
}

pub trait ExtensionStorageManager: Send + Sync {
    async fn reserve_namespace(
        &self,
        plan: &StoragePlan,
    ) -> Result<NamespaceRecord, StorageContributionError>;

    async fn apply_plan(
        &self,
        plan: &StoragePlan,
    ) -> Result<ApplyReport, StorageContributionError>;

    async fn verify_namespace(
        &self,
        namespace_id: &str,
    ) -> Result<IntegrityReport, StorageContributionError>;

    async fn uninstall_namespace(
        &self,
        namespace_id: &str,
        policy: UninstallPolicy,
    ) -> Result<UninstallReport, StorageContributionError>;
}
```
