use crate::id::{DeploymentId, DeploymentRevisionId};
use crate::state::RestoreState;

#[derive(Debug, thiserror::Error)]
#[non_exhaustive]
pub enum DeploymentError {
    #[error("deployment {0} not found")]
    NotFound(DeploymentId),
    #[error("revision {0} not found")]
    RevisionNotFound(DeploymentRevisionId),
    #[error("slug already exists in workspace")]
    SlugConflict,
    #[error("source asset mutation detected: {0}")]
    SourceMutation(&'static str),
    #[error("restore blocked: {0}")]
    RestoreBlocked(String),
    #[error("execute blocked — restore_state={0:?}")]
    ExecuteBlocked(RestoreState),
    #[error("import missing dependency: {0}")]
    ImportMissingDependency(String),
    #[error("invalid export envelope: {0}")]
    InvalidEnvelope(String),
    #[error("module mismatch: target binding {expected}, envelope binding {found}")]
    ModuleMismatch { expected: String, found: String },
    #[error("secret value detected in export payload")]
    ExportBlockedBySecret,
    #[error("revision is referenced by {0} run(s)")]
    RevisionReferencedByRuns(usize),
    #[error("deployment must be soft-deleted before purge")]
    PurgeRequiresSoftDeleteFirst,
    #[error("hash mismatch")]
    HashMismatch,
    #[error("path outside workspace allow-list: {0}")]
    PathOutsideWorkspace(String),
    #[error("preset {0} not found")]
    PresetNotFound(String),
    #[error("a preset named '{0}' already exists for this recipe")]
    PresetNameConflict(String),
    #[error("presets are not supported for this deployment: {0}")]
    PresetUnsupported(String),
    #[error("storage error: {0}")]
    Storage(#[from] nexus_storage::error::StorageError),
    #[error("serde error: {0}")]
    Serde(#[from] serde_json::Error),
}
