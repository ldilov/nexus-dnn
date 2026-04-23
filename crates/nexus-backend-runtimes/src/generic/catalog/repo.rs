//! Catalog repository trait. Concrete impls live under T016.
//!
//! The catalog is host-owned; rows are contributed by extensions at manifest
//! activation. Upsert-on-`(runtime_id, contribution_checksum)` provides
//! idempotent re-activation (R-02): identical checksum → no-op update,
//! differing checksum → row refresh with a warning logged one level up.

use async_trait::async_trait;

use super::CatalogEntry;
use crate::generic::enums::ImplementationStatus;
use crate::generic::errors::GenericRepoError;
use crate::generic::ids::{RuntimeId, SourceExtensionId};

/// Storage contract for `backend_runtime_catalog`.
#[async_trait]
pub trait BackendRuntimeCatalogRepo: Send + Sync {
    /// Idempotent upsert keyed by `runtime_id`. If a row already exists with
    /// the same `contribution_checksum`, only `updated_at` is refreshed.
    /// Differing checksum replaces the contribution fields in place.
    async fn upsert(&self, entry: &CatalogEntry) -> Result<(), GenericRepoError>;

    /// Fetch a single entry by `runtime_id`.
    async fn find_by_id(
        &self,
        runtime_id: &RuntimeId,
    ) -> Result<Option<CatalogEntry>, GenericRepoError>;

    /// Every catalog row, ordered by `runtime_id` ascending for stable output.
    async fn list_all(&self) -> Result<Vec<CatalogEntry>, GenericRepoError>;

    /// Rows contributed by the given extension (lifecycle cascade inputs).
    async fn list_by_source_extension(
        &self,
        source_extension_id: &SourceExtensionId,
    ) -> Result<Vec<CatalogEntry>, GenericRepoError>;

    /// Transition `implementation_status`. Updates `updated_at` to now.
    /// Invalid transitions are rejected with
    /// [`GenericRepoError::InvalidTransition`].
    async fn set_status(
        &self,
        runtime_id: &RuntimeId,
        status: ImplementationStatus,
    ) -> Result<(), GenericRepoError>;

    /// Hard delete (host admin path). Normal lifecycle uses `set_status`.
    async fn delete(&self, runtime_id: &RuntimeId) -> Result<(), GenericRepoError>;
}
