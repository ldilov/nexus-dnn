use serde::{Deserialize, Serialize};
use std::path::Path;

use crate::error::InstallError;
use crate::settings::AcceleratorProfile;
use crate::state::RuntimeCardState;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct InstallManifest {
    pub runtime_install_id: String,
    pub backend: String,
    pub release_id: String,
    pub platform: String,
    pub accelerator_profile: AcceleratorProfile,
    pub source_url: String,
    pub checksum_sha256: Option<String>,
    pub install_path: String,
    pub binary_path: String,
    pub status: InstallStatus,
    pub installed_at: i64,
    pub validated_at: Option<i64>,
    pub last_failure_category: Option<String>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum InstallStatus {
    InstalledUnvalidated,
    Ready,
    Broken,
    Updating,
}

impl From<InstallStatus> for RuntimeCardState {
    fn from(value: InstallStatus) -> Self {
        match value {
            InstallStatus::InstalledUnvalidated => Self::InstalledUnvalidated,
            InstallStatus::Ready => Self::Ready,
            InstallStatus::Broken => Self::Broken,
            InstallStatus::Updating => Self::Updating,
        }
    }
}

impl InstallManifest {
    pub async fn write(&self, path: &Path) -> Result<(), InstallError> {
        let json = serde_json::to_vec_pretty(self)
            .map_err(|e| InstallError::Persistence(format!("serialize manifest: {e}")))?;
        tokio::fs::write(path, json).await?;
        Ok(())
    }

    pub async fn read(path: &Path) -> Result<Self, InstallError> {
        let raw = tokio::fs::read(path).await?;
        serde_json::from_slice(&raw)
            .map_err(|e| InstallError::Persistence(format!("parse manifest: {e}")))
    }
}
