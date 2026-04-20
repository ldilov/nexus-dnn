use serde::{Deserialize, Serialize};

use crate::errors::WorkerResult;
use crate::transport::WorkerTransport;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct InstalledArtifact {
    pub artifact_id: String,
    pub family_id: String,
    pub variant_id: Option<String>,
    pub format: String,
    pub filename: String,
    #[serde(default)]
    pub size_bytes: Option<u64>,
    pub source_repo: String,
    #[serde(default)]
    pub source_revision: Option<String>,
    pub installed_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct InstalledIndex {
    pub family_ids: Vec<String>,
    pub installed: Vec<InstalledArtifact>,
    #[serde(default)]
    pub truncated: bool,
}

#[derive(Debug, Serialize)]
struct InstalledRequest {}

pub struct InstalledClient<'a> {
    transport: &'a WorkerTransport,
}

impl<'a> InstalledClient<'a> {
    pub fn new(transport: &'a WorkerTransport) -> Self {
        Self { transport }
    }

    pub async fn list(&self) -> WorkerResult<InstalledIndex> {
        self.transport
            .call("host.models.installed", InstalledRequest {})
            .await
    }
}
