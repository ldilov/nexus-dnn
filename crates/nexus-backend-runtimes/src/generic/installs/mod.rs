//! Backend-runtime installs — one row per installed release of a runtime on
//! a particular platform + accelerator profile (data-model.md §3).

pub mod repo;
pub mod sqlite;

pub use sqlite::SqliteInstallsRepo;

use crate::generic::enums::{InstallStatus, PipelineFailureCategory};
use crate::generic::ids::{AcceleratorProfile, PlatformId, ReleaseId, RuntimeId, RuntimeInstallId};

/// In-memory projection of one install row.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct InstallRecord {
    pub runtime_install_id: RuntimeInstallId,
    pub runtime_id: RuntimeId,
    pub release_id: ReleaseId,
    pub platform: PlatformId,
    pub accelerator_profile: AcceleratorProfile,
    /// Absolute install path. During the pipeline this points at the
    /// `.partial/` staging dir; after the atomic rename it resolves to
    /// `{runtime_install_id}/` under the host's install root.
    pub install_path: String,
    pub entrypoint_path: Option<String>,
    pub artifact_hash: Option<String>,
    pub status: InstallStatus,
    pub current_phase: Option<String>,
    pub validated_at: Option<i64>,
    pub last_failure_category: Option<PipelineFailureCategory>,
    pub last_failure_detail: Option<String>,
    pub created_at: i64,
    pub updated_at: i64,
}

pub use repo::BackendRuntimeInstallsRepo;
