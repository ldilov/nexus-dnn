//! Typed errors for runtime pool operations.

use thiserror::Error;

#[derive(Debug, Error)]
pub enum BackendRuntimeError {
    #[error("family not registered: {0}")]
    FamilyUnknown(String),

    #[error("family unavailable: {family} ({reason})")]
    FamilyUnavailable { family: String, reason: String },

    #[error("install not found: {0}")]
    InstallNotFound(String),

    #[error("install already exists: {install_id}")]
    InstallAlreadyExists { install_id: String },

    #[error("install is in needs_repair state: {0}")]
    RuntimeNeedsRepair(String),

    #[error("illegal state transition {from} -> {to}")]
    IllegalTransition { from: String, to: String },

    #[error("reserved launch setting '{flag}' cannot be passed via raw argv/env")]
    ReservedLaunchSetting { flag: String },

    #[error("'{flag}' is managed-spawn-disallowed (exits immediately or inspection-only)")]
    ManagedSpawnDisallowed { flag: String },

    #[error("host-governed flag '{flag}' cannot be passed via raw argv/env")]
    HostGovernedDenied { flag: String },

    #[error("lease '{lease_id}' is owned by extension '{owner}', not '{caller}'")]
    LeaseNotOwned {
        lease_id: String,
        owner: String,
        caller: String,
    },

    #[error("dependency unmet: {family} {version_req:?} acc={acceleration:?}")]
    DependencyUnmet {
        family: String,
        version_req: Option<String>,
        acceleration: Vec<String>,
    },

    #[error("storage error: {0}")]
    Storage(String),

    #[error("io error: {0}")]
    Io(#[from] std::io::Error),

    #[error("no ephemeral port available in allocator range")]
    NoPortAvailable,

    #[error("internal: {0}")]
    Internal(String),
}

impl From<sqlx::Error> for BackendRuntimeError {
    fn from(e: sqlx::Error) -> Self {
        Self::Storage(e.to_string())
    }
}

pub type BackendRuntimeResult<T> = Result<T, BackendRuntimeError>;

use crate::diagnostics::FailureCategory;

#[derive(Debug, Error)]
pub enum RuntimeAdapterError {
    #[error("backend not found: {0}")]
    BackendNotFound(String),
    #[error("backend unavailable: {0}")]
    BackendUnavailable(String),
    #[error("install task already running for backend {0}")]
    InstallInProgress(String),
    #[error("install not found for backend {0}")]
    InstallNotFound(String),
    #[error(transparent)]
    Install(#[from] InstallError),
    #[error(transparent)]
    Validation(#[from] ValidationError),
    #[error(transparent)]
    Settings(#[from] SettingsError),
    #[error(transparent)]
    Io(#[from] std::io::Error),
    #[error("storage error: {0}")]
    Storage(String),
    #[error("unimplemented: {0}")]
    Unimplemented(String),
}

#[derive(Debug, Error)]
pub enum InstallError {
    #[error("asset resolution failed: {0}")]
    AssetResolution(String),
    #[error("download failed: {0}")]
    Download(String),
    #[error("checksum mismatch: expected {expected}, got {actual}")]
    ChecksumMismatch { expected: String, actual: String },
    #[error("extraction failed: {0}")]
    Extraction(String),
    #[error("required binary missing: {0}")]
    BinaryMissing(String),
    #[error("install cancelled")]
    Cancelled,
    #[error("persistence failed: {0}")]
    Persistence(String),
    #[error(transparent)]
    Io(#[from] std::io::Error),
}

impl InstallError {
    pub fn failure_category(&self) -> FailureCategory {
        match self {
            InstallError::AssetResolution(_) => FailureCategory::AssetResolutionFailed,
            InstallError::Download(_) => FailureCategory::DownloadFailed,
            InstallError::ChecksumMismatch { .. } => FailureCategory::ChecksumMismatch,
            InstallError::Extraction(_) => FailureCategory::ExtractionFailed,
            InstallError::BinaryMissing(_) => FailureCategory::RequiredBinaryMissing,
            InstallError::Cancelled => FailureCategory::UnexpectedProcessExit,
            InstallError::Persistence(_) => FailureCategory::InvalidRuntimeSettings,
            InstallError::Io(_) => FailureCategory::ExtractionFailed,
        }
    }
}

#[derive(Debug, Error)]
pub enum ValidationError {
    #[error("binary missing: {0}")]
    BinaryMissing(String),
    #[error("version probe failed: {0}")]
    VersionProbe(String),
    #[error("dependency load failure: {0}")]
    DependencyLoad(String),
    #[error("profile mismatch: {0}")]
    ProfileMismatch(String),
    #[error("probe launch failed: {0}")]
    ProbeLaunch(String),
    #[error("health endpoint unreachable within timeout")]
    HealthTimeout,
    #[error("probe shutdown failed: {0}")]
    ProbeShutdown(String),
    #[error("port bind failure: {0}")]
    PortBind(String),
    #[error("cuda mismatch: {0}")]
    CudaMismatch(String),
}

impl ValidationError {
    pub fn failure_category(&self) -> FailureCategory {
        match self {
            ValidationError::BinaryMissing(_) => FailureCategory::RequiredBinaryMissing,
            ValidationError::VersionProbe(_) => FailureCategory::DependencyLoadFailure,
            ValidationError::DependencyLoad(_) => FailureCategory::DependencyLoadFailure,
            ValidationError::ProfileMismatch(_) => FailureCategory::CudaMismatch,
            ValidationError::ProbeLaunch(_) => FailureCategory::UnexpectedProcessExit,
            ValidationError::HealthTimeout => FailureCategory::RuntimeValidationTimeout,
            ValidationError::ProbeShutdown(_) => FailureCategory::UnexpectedProcessExit,
            ValidationError::PortBind(_) => FailureCategory::PortBindFailure,
            ValidationError::CudaMismatch(_) => FailureCategory::CudaMismatch,
        }
    }
}

#[derive(Debug, Error)]
pub enum SettingsError {
    #[error("invalid settings: {0}")]
    Invalid(String),
    #[error("extra argument conflicts with managed flag: {0}")]
    ConflictWithManagedFlag(String),
}
