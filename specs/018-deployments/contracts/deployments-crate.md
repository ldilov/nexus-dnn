# Contract — `nexus-deployments` public surface

**Crate role**: own the deployment domain — save/load/execute orchestration, revision + snapshot + source-link + parameter + binding + validation + diagnostic entities, compatibility classification, hashing, event emission.
**Does not own**: HTTP handling (lives in `nexus-api`), migrations (live in `nexus-storage`), runtime-adapter orchestration (stays in `nexus-backend-runtimes`), model file operations (live in `nexus-models-store`).

## Cargo manifest (outline)

```toml
[package]
name = "nexus-deployments"
version = "0.1.0"
edition = "2021"

[dependencies]
nexus-storage = { path = "../nexus-storage" }
nexus-models-store = { path = "../nexus-models-store" }
nexus-provenance = { path = "../nexus-provenance" }
nexus-events = { path = "../nexus-events" }
nexus-core = { path = "../nexus-core" }
serde = { workspace = true, features = ["derive"] }
serde_json = { workspace = true }
thiserror = { workspace = true }
tokio = { workspace = true, features = ["rt", "macros"] }
uuid = { workspace = true, features = ["v7", "serde"] }
sha2 = { workspace = true }
json-canon = "0.3"
tracing = { workspace = true }
async-trait = { workspace = true }

[dev-dependencies]
rstest = { workspace = true }
mockall = { workspace = true }
tokio = { workspace = true, features = ["macros", "rt-multi-thread", "time"] }
```

## Public types

```rust
pub struct DeploymentId(String);
pub struct DeploymentRevisionId(String);

pub struct EffectiveWorkflowHash([u8; 32]);
pub struct PayloadHash([u8; 32]);

#[non_exhaustive]
pub enum DeploymentState { Draft, Saved, Validated, Ready, Degraded, Stale, Archived, Deleted }

#[non_exhaustive]
pub enum RestoreState {
    FullyRestorable,
    RestorableWithRebase,
    RestorableWithDegradedFeatures,
    RestorableReadOnly,
    NotRestorable,
}

pub enum MappingState { FullyMapped, PartiallyMapped, Custom }

#[non_exhaustive]
pub enum ParameterScope {
    WorkflowInput, NodeConfig, Runtime, ModelLoad, Request, UiState, ExecutionPolicy
}

#[non_exhaustive]
pub enum CompatDim {
    HostSchema, WorkflowSchema, RecipeDefinition, Extension,
    OperatorContract, RuntimeSettings, Profile, ModelDescriptor,
}
#[non_exhaustive]
pub enum CompatState { Exact, Compatible, Migrated, Degraded, Incompatible, Missing }

#[non_exhaustive]
pub enum Severity { Info, Warning, Error, Blocking }
#[non_exhaustive]
pub enum Category {
    Source, RecipeMapping, Operator, Extension, Runtime, Model,
    Artifact, Profile, Security, Migration,
}

#[non_exhaustive]
pub enum DeploymentEvent {
    Created       { deployment_id: DeploymentId },
    Updated       { deployment_id: DeploymentId },
    RevisionCreated { deployment_id: DeploymentId, revision_id: DeploymentRevisionId },
    Validated     { deployment_id: DeploymentId, validation_id: String },
    Loaded        { deployment_id: DeploymentId, revision_id: DeploymentRevisionId, restore_state: RestoreState },
    RestoreDegraded { deployment_id: DeploymentId, revision_id: DeploymentRevisionId },
    Archived      { deployment_id: DeploymentId },
    Deleted       { deployment_id: DeploymentId },
    RunCreated    { deployment_id: DeploymentId, revision_id: DeploymentRevisionId, run_id: String, execution_context_hash: EffectiveWorkflowHash },
    CompatibilityChanged { deployment_id: DeploymentId, revision_id: DeploymentRevisionId },
}
```

## Errors (thiserror)

```rust
#[derive(Debug, thiserror::Error)]
#[non_exhaustive]
pub enum DeploymentError {
    #[error("deployment {0} not found")]                  NotFound(DeploymentId),
    #[error("revision {0} not found")]                    RevisionNotFound(DeploymentRevisionId),
    #[error("slug already exists in workspace")]          SlugConflict,
    #[error("source asset mutation detected: {0}")]       SourceMutation(&'static str),
    #[error("restore blocked: {0}")]                      RestoreBlocked(String),
    #[error("execute blocked — restore_state={0:?}")]     ExecuteBlocked(RestoreState),
    #[error("import missing dependency: {0}")]            ImportMissingDependency(String),
    #[error("secret value detected in export payload")]   ExportBlockedBySecret,
    #[error("revision is referenced by {0} run(s)")]      RevisionReferencedByRuns(usize),
    #[error("hash mismatch")]                             HashMismatch,
    #[error(transparent)]                                 Storage(#[from] nexus_storage::error::StorageError),
    #[error(transparent)]                                 Serde(#[from] serde_json::Error),
}
```

## Core traits (DIP)

```rust
#[async_trait::async_trait]
pub trait DeploymentRepository: Send + Sync {
    async fn insert_deployment(&self, row: NewDeployment) -> Result<(), DeploymentError>;
    async fn insert_revision(&self, row: NewRevision) -> Result<(), DeploymentError>;
    async fn insert_snapshot(&self, row: NewSnapshot) -> Result<(), DeploymentError>;
    async fn insert_source_link(&self, row: NewSourceLink) -> Result<(), DeploymentError>;
    async fn insert_parameter_batch(&self, rows: &[NewParameter]) -> Result<(), DeploymentError>;
    async fn insert_runtime_binding(&self, row: NewRuntimeBinding) -> Result<(), DeploymentError>;
    async fn insert_model_binding(&self, row: NewModelBinding) -> Result<(), DeploymentError>;
    async fn insert_artifact_binding_batch(&self, rows: &[NewArtifactBinding]) -> Result<(), DeploymentError>;
    async fn insert_validation(&self, row: NewValidation) -> Result<(), DeploymentError>;
    async fn insert_restore_diagnostic_batch(&self, rows: &[NewRestoreDiagnostic]) -> Result<(), DeploymentError>;
    async fn insert_run_link(&self, row: NewRunLink) -> Result<(), DeploymentError>;
    async fn advance_current_revision(&self, d: &DeploymentId, r: &DeploymentRevisionId) -> Result<(), DeploymentError>;

    async fn fetch_deployment(&self, id: &DeploymentId) -> Result<DeploymentRow, DeploymentError>;
    async fn fetch_revision(&self, id: &DeploymentRevisionId) -> Result<RevisionRow, DeploymentError>;
    async fn list(&self, filter: &ListFilter) -> Result<ListPage, DeploymentError>;
    async fn update_metadata(&self, id: &DeploymentId, patch: &MetadataPatch) -> Result<(), DeploymentError>;
    async fn count_runs_referencing_revision(&self, r: &DeploymentRevisionId) -> Result<usize, DeploymentError>;
}
```

## Services

```rust
pub struct DeploymentSaveService<R: DeploymentRepository, E: nexus_events::Bus> { … }
pub struct DeploymentLoadService<R, E> { … }
pub struct DeploymentValidateService<R, E> { … }
pub struct DeploymentExecuteService<R, E, Runs: nexus_run::RunOrchestrator> { … }
pub struct DeploymentCloneService<R, E> { … }
pub struct DeploymentExportService<R> { … }
pub struct DeploymentImportService<R, E> { … }
```

Each service takes its dependencies by constructor (DIP); no globals, no hidden statics. All service methods are pure orchestration + calls through the repository + event emission.

## Hashing helper (SI-07)

```rust
pub mod hash {
    pub fn sha256_jcs(value: &serde_json::Value) -> [u8; 32] { … }
    pub fn hex(digest: &[u8; 32]) -> String { … }
}
```

Guarantees: `sha256_jcs` serializes `value` via `json_canon::to_string(value)?`, then SHA-256s the result. Byte-stable across platforms, across Rust versions (the behavior depends only on the JSON payload semantics, RFC 8785, and SHA-256).

## Snapshot store trait

```rust
#[async_trait::async_trait]
pub trait DeploymentSnapshotStore: Send + Sync {
    async fn put(&self, kind: SnapshotKind, payload_json: &str) -> Result<(PayloadHash, String), DeploymentError>;
    async fn get(&self, id: &str) -> Result<StoredSnapshot, DeploymentError>;
}
```

(For v1 the store is a thin facade over `deployment_snapshots` rows in `nexus-storage`. Leaving room to back it with a content-addressed store later per R-03/§20.2 without changing callers.)

## Public facade (re-exports from `lib.rs`)

```rust
pub use id::{DeploymentId, DeploymentRevisionId};
pub use state::{DeploymentState, RestoreState, MappingState};
pub use parameter::ParameterScope;
pub use compatibility::{CompatDim, CompatState};
pub use diagnostic::{Severity, Category};
pub use error::DeploymentError;
pub use events::DeploymentEvent;
pub use repository::DeploymentRepository;
pub use snapshot::{DeploymentSnapshotStore, SnapshotKind};
pub use service::{
    DeploymentSaveService, DeploymentLoadService, DeploymentValidateService,
    DeploymentExecuteService, DeploymentCloneService,
    DeploymentExportService, DeploymentImportService,
};
pub mod hash;
```
