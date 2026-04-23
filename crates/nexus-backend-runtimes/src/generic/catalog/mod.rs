//! Backend-runtime catalog — one row per contributed runtime.
//!
//! Data shape mirrors [`backend_runtime_catalog`](../../../../../../migrations/016_backend_runtime_catalog.sql)
//! (data-model.md §2). Storage access is mediated by
//! [`repo::BackendRuntimeCatalogRepo`].

pub mod repo;
pub mod sqlite;

pub use sqlite::SqliteCatalogRepo;

use crate::family::RuntimeFamily;
use crate::generic::enums::{ImplementationStatus, Transport};
use crate::generic::ids::{ContributionChecksum, RuntimeId, SourceExtensionId};

/// In-memory projection of one catalog row.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct CatalogEntry {
    pub runtime_id: RuntimeId,
    pub display_name: String,
    pub source_extension_id: SourceExtensionId,
    pub source_extension_version: String,
    pub contribution_checksum: ContributionChecksum,
    pub runtime_family: RuntimeFamily,
    pub transport: Transport,
    pub implementation_status: ImplementationStatus,
    pub version_manifest_path: String,
    pub worker_entrypoint: String,
    pub capability_tags: Vec<String>,
    pub supported_roles: Vec<String>,
    pub created_at: i64,
    pub updated_at: i64,
}

pub use repo::BackendRuntimeCatalogRepo;
