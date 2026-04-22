//! Non-exhaustive state enums for the generic backend-runtime subsystem.
//!
//! Every enum here is `#[non_exhaustive]` per Principle V so future variants
//! can be added without breaking downstream matchers. Wire forms are
//! `snake_case` strings stable across DB columns, JSON, and HTTP (FR-011,
//! FR-012, FR-013, FR-023).

use serde::{Deserialize, Serialize};

/// Status of a catalog entry ([crate::generic::catalog]).
#[non_exhaustive]
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum ImplementationStatus {
    Available,
    Unavailable,
    Deprecated,
    Abandoned,
}

impl ImplementationStatus {
    pub fn as_str(&self) -> &'static str {
        match self {
            Self::Available => "available",
            Self::Unavailable => "unavailable",
            Self::Deprecated => "deprecated",
            Self::Abandoned => "abandoned",
        }
    }
}

/// Status of a single runtime install row ([crate::generic::installs]).
#[non_exhaustive]
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum InstallStatus {
    Pending,
    Downloading,
    Validating,
    Validated,
    Failed,
    Abandoned,
}

impl InstallStatus {
    pub fn as_str(&self) -> &'static str {
        match self {
            Self::Pending => "pending",
            Self::Downloading => "downloading",
            Self::Validating => "validating",
            Self::Validated => "validated",
            Self::Failed => "failed",
            Self::Abandoned => "abandoned",
        }
    }
}

/// Lease lifecycle state machine ([crate::generic::leases]).
///
/// Transitions: `starting → ready → busy ⇄ ready → stopping → released`;
/// any state → `failed → released` on error (FR-044).
#[non_exhaustive]
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum LeaseState {
    Starting,
    Ready,
    Busy,
    Stopping,
    Failed,
    Released,
}

impl LeaseState {
    pub fn as_str(&self) -> &'static str {
        match self {
            Self::Starting => "starting",
            Self::Ready => "ready",
            Self::Busy => "busy",
            Self::Stopping => "stopping",
            Self::Failed => "failed",
            Self::Released => "released",
        }
    }

    /// True when the lease is terminal and no further transitions occur.
    pub fn is_terminal(&self) -> bool {
        matches!(self, Self::Released | Self::Failed)
    }
}

/// Who holds a lease. Caller-supplied opaque [`OwnerRef`](super::ids) attaches
/// the domain identifier (deployment_id, run_id, session uuid).
#[non_exhaustive]
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum OwnerKind {
    Deployment,
    Run,
    PreviewSession,
}

impl OwnerKind {
    pub fn as_str(&self) -> &'static str {
        match self {
            Self::Deployment => "deployment",
            Self::Run => "run",
            Self::PreviewSession => "preview_session",
        }
    }
}

/// Lease transport. v1 supports `stdio` only (FR-043).
#[non_exhaustive]
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum Transport {
    Stdio,
}

impl Transport {
    pub fn as_str(&self) -> &'static str {
        match self {
            Self::Stdio => "stdio",
        }
    }
}

/// Install-pipeline phase failure categories (FR-023).
///
/// Distinct from the grandfathered [`crate::diagnostics::FailureCategory`]
/// which is llama.cpp-specific. The generic pipeline uses this enum; both
/// coexist scoped by module path per Principle III.17 (single-choice within a
/// scope).
#[non_exhaustive]
#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum PipelineFailureCategory {
    PythonBootstrapFailed,
    DependencyInstallFailed,
    CudaProfileMismatch,
    WorkerStartFailed,
    HandshakeFailed,
    ModelMissing,
    ModelLoadFailed,
    RuntimeHealthFailed,
    RuntimeNotInstalled,
    SourceExtensionUnavailable,
    SourceExtensionMissing,
    InvalidVersionManifest,
    InvalidDownload,
    InstallPathCollision,
    Cancelled,
    /// Extension-contributed custom failure category (FR-023 tail).
    /// Wire form: `custom:<inner>` so it round-trips through the
    /// `snake_case` serde rename without collision.
    #[serde(rename = "custom")]
    Custom(String),
}

impl PipelineFailureCategory {
    /// Stable wire form used in DB + JSON. `Custom(s)` emits `custom:<s>`.
    pub fn to_wire(&self) -> String {
        match self {
            Self::PythonBootstrapFailed => "python_bootstrap_failed".into(),
            Self::DependencyInstallFailed => "dependency_install_failed".into(),
            Self::CudaProfileMismatch => "cuda_profile_mismatch".into(),
            Self::WorkerStartFailed => "worker_start_failed".into(),
            Self::HandshakeFailed => "handshake_failed".into(),
            Self::ModelMissing => "model_missing".into(),
            Self::ModelLoadFailed => "model_load_failed".into(),
            Self::RuntimeHealthFailed => "runtime_health_failed".into(),
            Self::RuntimeNotInstalled => "runtime_not_installed".into(),
            Self::SourceExtensionUnavailable => "source_extension_unavailable".into(),
            Self::SourceExtensionMissing => "source_extension_missing".into(),
            Self::InvalidVersionManifest => "invalid_version_manifest".into(),
            Self::InvalidDownload => "invalid_download".into(),
            Self::InstallPathCollision => "install_path_collision".into(),
            Self::Cancelled => "cancelled".into(),
            Self::Custom(inner) => format!("custom:{inner}"),
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn implementation_status_roundtrips() {
        assert_eq!(ImplementationStatus::Available.as_str(), "available");
        let v = serde_json::to_value(ImplementationStatus::Abandoned).unwrap();
        assert_eq!(v, serde_json::json!("abandoned"));
        let back: ImplementationStatus = serde_json::from_value(v).unwrap();
        assert_eq!(back, ImplementationStatus::Abandoned);
    }

    #[test]
    fn lease_state_terminal_detection() {
        assert!(LeaseState::Released.is_terminal());
        assert!(LeaseState::Failed.is_terminal());
        assert!(!LeaseState::Starting.is_terminal());
        assert!(!LeaseState::Ready.is_terminal());
        assert!(!LeaseState::Busy.is_terminal());
    }

    #[test]
    fn owner_kind_preview_session_wire_form() {
        assert_eq!(OwnerKind::PreviewSession.as_str(), "preview_session");
        let v = serde_json::to_value(OwnerKind::PreviewSession).unwrap();
        assert_eq!(v, serde_json::json!("preview_session"));
    }

    #[test]
    fn transport_stdio_only_v1() {
        assert_eq!(Transport::Stdio.as_str(), "stdio");
    }

    #[test]
    fn install_status_wire_forms_stable() {
        let values = [
            InstallStatus::Pending,
            InstallStatus::Downloading,
            InstallStatus::Validating,
            InstallStatus::Validated,
            InstallStatus::Failed,
            InstallStatus::Abandoned,
        ];
        let expected = [
            "pending",
            "downloading",
            "validating",
            "validated",
            "failed",
            "abandoned",
        ];
        for (v, want) in values.iter().zip(expected.iter()) {
            assert_eq!(&v.as_str(), want);
        }
    }

    #[test]
    fn pipeline_failure_wire_forms() {
        assert_eq!(
            PipelineFailureCategory::DependencyInstallFailed.to_wire(),
            "dependency_install_failed"
        );
        assert_eq!(PipelineFailureCategory::Cancelled.to_wire(), "cancelled");
        assert_eq!(
            PipelineFailureCategory::Custom("ffmpeg_missing".into()).to_wire(),
            "custom:ffmpeg_missing"
        );
    }
}
