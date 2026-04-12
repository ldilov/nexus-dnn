# APIs, Events, and Rust Service Contracts

## 1. Host-internal Rust service boundaries

### 1.1 Suggested crates

- `crates/nexus-extension`
  - parse manifest storage block
  - discover migration files
  - build validation plan
- `crates/nexus-storage`
  - execute dry-run validation
  - reserve namespaces
  - apply migrations
  - record metadata
  - run integrity checks
- `crates/nexus-api`
  - expose admin/read endpoints
- `crates/nexus-events`
  - publish storage lifecycle events

### 1.2 Suggested Rust traits

```rust
pub trait ExtensionStoragePlanner {
    fn build_plan(&self, extension_root: &Path, manifest: &ExtensionManifest) -> Result<StoragePlan>;
}

pub trait ExtensionStorageValidator {
    fn validate_static(&self, plan: &StoragePlan) -> Result<StaticValidationReport>;
    fn validate_dry_run(&self, plan: &StoragePlan) -> Result<DryRunReport>;
}

pub trait ExtensionStorageManager {
    fn reserve_namespace(&self, plan: &StoragePlan) -> Result<NamespaceReservation>;
    fn apply_plan(&self, plan: &StoragePlan) -> Result<ApplyReport>;
    fn verify_namespace(&self, namespace_id: &str) -> Result<IntegrityReport>;
    fn uninstall_namespace(&self, namespace_id: &str, mode: UninstallMode) -> Result<UninstallReport>;
}
```

## 2. Suggested REST endpoints

These are optional public/admin endpoints, not required for headless correctness, but useful for operations and UI.

### 2.1 `GET /api/v1/extensions/{extension_id}/storage`
Returns namespace metadata, migration history, and object inventory summary.

### 2.2 `POST /api/v1/extensions/{extension_id}/storage/validate`
Triggers or re-runs validation.

### 2.3 `POST /api/v1/extensions/{extension_id}/storage/apply`
Applies a prepared migration plan when the extension is installable.

### 2.4 `POST /api/v1/extensions/{extension_id}/storage/verify`
Runs integrity verification.

### 2.5 `POST /api/v1/extensions/{extension_id}/storage/uninstall`
Executes explicit uninstall policy.

### 2.6 `GET /api/v1/storage/namespaces`
Returns all extension storage namespaces for diagnostics.

## 3. Example response: storage status

```json
{
  "extension_id": "example.chat.llama",
  "namespace": {
    "alias": "chat_llama",
    "effective_prefix": "ext_chat_llama_",
    "status": "active",
    "sql_profile": "nexus_sqlite_v1"
  },
  "migrations": [
    {
      "migration_id": "001_init",
      "status": "applied"
    },
    {
      "migration_id": "002_indexes",
      "status": "applied"
    }
  ],
  "objects": {
    "tables": 4,
    "indexes": 6
  }
}
```

## 4. Event bus contracts

Suggested event types:

- `extension.storage.namespace_reserved`
- `extension.storage.validation_started`
- `extension.storage.validation_failed`
- `extension.storage.plan_ready`
- `extension.storage.apply_started`
- `extension.storage.migration_applied`
- `extension.storage.apply_failed`
- `extension.storage.integrity_verified`
- `extension.storage.integrity_drift_detected`
- `extension.storage.uninstall_started`
- `extension.storage.uninstall_completed`

### Example event payload

```json
{
  "type": "extension.storage.migration_applied",
  "extension_id": "example.chat.llama",
  "namespace_id": "extns_01",
  "effective_prefix": "ext_chat_llama_",
  "migration_id": "001_init",
  "applied_at": "2026-04-12T12:10:33Z"
}
```

## 5. UI considerations

The UI should be able to show:

- namespace status
- prefix and alias
- applied migrations
- validation failures
- integrity drift markers
- uninstall policy

The UI should not edit tables directly. It should surface host-owned diagnostics and operations.
