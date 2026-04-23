//! Wire DTOs for the catalog HTTP surface. Schema mirrors
//! [`contracts/http/backend_runtimes.yaml#CatalogEntry`].

use serde::Serialize;

use nexus_backend_runtimes::generic::catalog::CatalogEntry;

#[derive(Debug, Serialize)]
pub struct CatalogEntryDto {
    pub runtime_id: String,
    pub display_name: String,
    pub source_extension_id: String,
    pub source_extension_version: String,
    pub runtime_family: &'static str,
    pub transport: &'static str,
    pub implementation_status: &'static str,
    pub version_manifest_path: String,
    pub worker_entrypoint: String,
    pub capability_tags: Vec<String>,
    pub supported_roles: Vec<String>,
    pub created_at: i64,
    pub updated_at: i64,
}

impl From<CatalogEntry> for CatalogEntryDto {
    fn from(e: CatalogEntry) -> Self {
        Self {
            runtime_id: e.runtime_id.as_str().to_string(),
            display_name: e.display_name,
            source_extension_id: e.source_extension_id.as_str().to_string(),
            source_extension_version: e.source_extension_version,
            runtime_family: e.runtime_family.as_str(),
            transport: e.transport.as_str(),
            implementation_status: e.implementation_status.as_str(),
            version_manifest_path: e.version_manifest_path,
            worker_entrypoint: e.worker_entrypoint,
            capability_tags: e.capability_tags,
            supported_roles: e.supported_roles,
            created_at: e.created_at,
            updated_at: e.updated_at,
        }
    }
}

#[derive(Debug, Serialize)]
pub struct CatalogListResponse {
    pub runtimes: Vec<CatalogEntryDto>,
}
