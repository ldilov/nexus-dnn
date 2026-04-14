use thiserror::Error;

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
