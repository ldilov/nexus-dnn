use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Hash, Eq, PartialEq)]
pub struct IdentityKey {
    pub family: String,
    pub version: String,
    pub quantization: Option<String>,
    pub variant: String,
    pub sha256_root: String,
    pub private_model: bool,
    pub owner_extension_id: Option<String>,
}

#[derive(Debug, Clone)]
pub struct InstallModelRequest {
    pub family: String,
    pub version: String,
    pub quantization: Option<String>,
    pub variant: String,
    pub sha256_root: String,
    pub source_revision: String,
    pub source_kind: String,
    pub source_url: Option<String>,
    pub private: bool,
    pub owner_extension_id: Option<String>,
    pub files: Vec<PlannedFile>,
    pub param_count: Option<u64>,
    pub license_spdx: Option<String>,
    pub license_url: Option<String>,
    pub provenance_note: Option<String>,
}

#[derive(Debug, Clone)]
pub struct PlannedFile {
    pub path: String,
    pub sha256: String,
    pub size_bytes: u64,
    pub source_url: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct InstalledModelDto {
    pub install_id: String,
    pub family: String,
    pub version: String,
    pub quantization: Option<String>,
    pub variant: String,
    pub install_root: String,
    pub sha256_root: String,
    pub source_revision: String,
    pub state: String,
    pub private_model: bool,
    pub owner_extension_id: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct HostModelRow {
    pub install_id: String,
    pub family: String,
    pub version: String,
    pub quantization: Option<String>,
    pub variant: String,
    pub install_root: String,
    pub sha256_root: String,
    pub source_revision: String,
    pub state: String,
    pub source_kind: String,
    pub source_url: Option<String>,
    pub license_spdx: Option<String>,
    pub license_url: Option<String>,
    pub private_model: bool,
    pub owner_extension_id: Option<String>,
    pub created_at: String,
}

pub(super) fn key_of(req: &InstallModelRequest) -> IdentityKey {
    IdentityKey {
        family: req.family.clone(),
        version: req.version.clone(),
        quantization: req.quantization.clone(),
        variant: req.variant.clone(),
        sha256_root: req.sha256_root.clone(),
        private_model: req.private,
        owner_extension_id: req.owner_extension_id.clone(),
    }
}
