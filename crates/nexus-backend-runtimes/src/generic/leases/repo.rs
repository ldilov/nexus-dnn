//! Leases repository trait. Concrete impls live under T016; the startup
//! crash-recovery sweep (T027) uses [`flip_non_terminal_to_released`].

use async_trait::async_trait;

use super::LeaseRecord;
use crate::generic::enums::{LeaseState, PipelineFailureCategory};
use crate::generic::errors::GenericRepoError;
use crate::generic::ids::{RuntimeInstallId, RuntimeLeaseId};

/// Storage contract for `backend_runtime_leases`.
///
/// Lease rows are retained for audit after release — callers filter by
/// `state` + `released_at` rather than deleting.
#[async_trait]
pub trait BackendRuntimeLeasesRepo: Send + Sync {
    /// Insert a fresh lease row in `starting` state. The host mints the
    /// `lease_id` at call site (ULID).
    async fn insert(&self, record: &LeaseRecord) -> Result<(), GenericRepoError>;

    async fn get(&self, lease_id: &RuntimeLeaseId)
    -> Result<Option<LeaseRecord>, GenericRepoError>;

    /// Live (non-terminal) leases for a given install — used by the
    /// extension-deactivate drain path (§9).
    async fn list_live_by_install(
        &self,
        install_id: &RuntimeInstallId,
    ) -> Result<Vec<LeaseRecord>, GenericRepoError>;

    /// Move between non-terminal states. Terminal transitions (`released`,
    /// `failed`) use [`record_released`] / [`record_failed`] which also
    /// stamp `released_at`.
    async fn update_state(
        &self,
        lease_id: &RuntimeLeaseId,
        state: LeaseState,
    ) -> Result<(), GenericRepoError>;

    /// Attach a spawned subprocess PID. Called once the worker is running.
    async fn set_pid(
        &self,
        lease_id: &RuntimeLeaseId,
        pid: Option<i32>,
    ) -> Result<(), GenericRepoError>;

    /// Terminal: `state → released`, stamps `released_at`.
    async fn record_released(
        &self,
        lease_id: &RuntimeLeaseId,
        released_at: i64,
    ) -> Result<(), GenericRepoError>;

    /// Terminal: `state → failed → released`, stamps `released_at`,
    /// records the failure category.
    async fn record_failed(
        &self,
        lease_id: &RuntimeLeaseId,
        category: PipelineFailureCategory,
        released_at: i64,
    ) -> Result<(), GenericRepoError>;

    /// Host-startup sweep (R-05). Any row whose `state` is not terminal
    /// is flipped to `released` with `crash_recovered=1` and the supplied
    /// `released_at` timestamp. Returns the count of rows updated.
    async fn flip_non_terminal_to_released(
        &self,
        released_at: i64,
    ) -> Result<u64, GenericRepoError>;
}
