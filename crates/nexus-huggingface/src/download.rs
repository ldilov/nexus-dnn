use std::path::PathBuf;

use serde::{Deserialize, Serialize};
use tokio_util::sync::CancellationToken;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DownloadFileSpec {
    pub path: String,
    pub expected_sha256: Option<String>,
    pub size_bytes: Option<u64>,
}

#[derive(Debug, Clone)]
pub struct DownloadSpec {
    pub task_id: String,
    pub repo_id: String,
    pub revision: String,
    pub files: Vec<DownloadFileSpec>,
    pub staging_dir: PathBuf,
    pub cancel_token: CancellationToken,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DownloadedArtifact {
    pub task_id: String,
    pub repo_id: String,
    pub revision: String,
    pub files: Vec<DownloadedFile>,
    pub total_bytes: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DownloadedFile {
    pub path: String,
    pub local_path: PathBuf,
    pub size_bytes: u64,
    pub sha256: String,
}
