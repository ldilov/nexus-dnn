//! Installs repository trait. Concrete impls live under T016.

use async_trait::async_trait;

use super::InstallRecord;
use crate::generic::enums::{InstallStatus, PipelineFailureCategory};
use crate::generic::errors::GenericRepoError;
use crate::generic::ids::{AcceleratorProfile, PlatformId, ReleaseId, RuntimeId, RuntimeInstallId};

/// Storage contract for `backend_runtime_installs`.
///
/// UNIQUE `(runtime_id, release_id, platform, accelerator_profile)` is
/// enforced in SQL; [`insert`] maps the resulting error onto
/// [`GenericRepoError::UniqueViolation`] so callers can short-circuit.
#[async_trait]
pub trait BackendRuntimeInstallsRepo: Send + Sync {
    /// Insert a fresh `pending` row. Returns `UniqueViolation` when the
    /// `(runtime_id, release, platform, profile)` tuple already exists.
    async fn insert(&self, record: &InstallRecord) -> Result<(), GenericRepoError>;

    async fn get(
        &self,
        install_id: &RuntimeInstallId,
    ) -> Result<Option<InstallRecord>, GenericRepoError>;

    async fn list_by_runtime(
        &self,
        runtime_id: &RuntimeId,
    ) -> Result<Vec<InstallRecord>, GenericRepoError>;

    /// Return the already-validated install for the given tuple, if any.
    /// Used by the pipeline to short-circuit redundant installs.
    async fn find_validated(
        &self,
        runtime_id: &RuntimeId,
        release_id: &ReleaseId,
        platform: &PlatformId,
        accelerator_profile: &AcceleratorProfile,
    ) -> Result<Option<InstallRecord>, GenericRepoError>;

    /// Move between non-terminal states (`pending`/`downloading`/`validating`).
    /// Also updates `current_phase`; pass `None` on terminal entry.
    async fn update_status(
        &self,
        install_id: &RuntimeInstallId,
        status: InstallStatus,
        current_phase: Option<&str>,
    ) -> Result<(), GenericRepoError>;

    /// Terminal success: flips status to `validated`, fills success fields,
    /// clears `current_phase` and any prior failure detail.
    async fn record_success(
        &self,
        install_id: &RuntimeInstallId,
        entrypoint_path: Option<&str>,
        artifact_hash: Option<&str>,
        validated_at: i64,
    ) -> Result<(), GenericRepoError>;

    /// Terminal failure: flips status to `failed`, stamps category + detail,
    /// clears `current_phase`. Retryable — caller may later re-insert a new
    /// install row for the same tuple only after explicit cleanup.
    async fn record_failure(
        &self,
        install_id: &RuntimeInstallId,
        category: PipelineFailureCategory,
        detail: &str,
    ) -> Result<(), GenericRepoError>;

    /// Lifecycle cascade: every non-terminal install for `runtime_id`
    /// becomes `abandoned` (source-extension uninstall path, §9).
    async fn mark_abandoned_for_runtime(
        &self,
        runtime_id: &RuntimeId,
    ) -> Result<(), GenericRepoError>;

    async fn delete(&self, install_id: &RuntimeInstallId) -> Result<(), GenericRepoError>;
}
