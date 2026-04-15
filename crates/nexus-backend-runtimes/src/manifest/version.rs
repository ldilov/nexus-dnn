use serde::{Deserialize, Serialize};
use std::path::Path;

use crate::error::InstallError;
use crate::settings::AcceleratorProfile;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct VersionManifest {
    pub backend: String,
    #[serde(default)]
    pub default_release_id: Option<String>,
    pub releases: Vec<Release>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Release {
    pub release_id: String,
    #[serde(default)]
    pub release_notes_url: Option<String>,
    pub assets: Vec<ReleaseAsset>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ReleaseAsset {
    pub platform: String,
    pub accelerator_profile: AcceleratorProfile,
    pub url: String,
    #[serde(default)]
    pub archive_kind: Option<ArchiveKind>,
    #[serde(default)]
    pub checksum_sha256: Option<String>,
    #[serde(default)]
    pub size_bytes: Option<u64>,
    #[serde(default)]
    pub binary_relpath: Option<String>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum ArchiveKind {
    Zip,
    #[serde(rename = "tar.gz")]
    TarGz,
}

pub fn parse_yaml(raw: &str) -> Result<VersionManifest, InstallError> {
    serde_saphyr::from_str::<VersionManifest>(raw)
        .map_err(|e| InstallError::AssetResolution(format!("version manifest parse error: {e}")))
}

pub async fn load_from_path(path: &Path) -> Result<VersionManifest, InstallError> {
    let raw = tokio::fs::read_to_string(path).await?;
    parse_yaml(&raw)
}
