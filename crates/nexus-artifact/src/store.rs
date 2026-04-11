use std::path::{Path, PathBuf};

use sha2::{Digest, Sha256};
use tokio::io::AsyncReadExt;

use crate::error::ArtifactError;

#[allow(async_fn_in_trait)]
pub trait ArtifactStore: Send + Sync {
    async fn initialize(&self) -> Result<(), ArtifactError>;
    async fn allocate_write_target(
        &self,
        run_id: &str,
        node_id: &str,
        port_name: &str,
    ) -> Result<PathBuf, ArtifactError>;
    async fn finalize(&self, temp_path: &Path, artifact_id: &str) -> Result<String, ArtifactError>;
    async fn compute_hash(&self, path: &Path) -> Result<(String, u64), ArtifactError>;
    async fn blob_path(&self, artifact_id: &str) -> Result<PathBuf, ArtifactError>;
    async fn delete(&self, artifact_id: &str) -> Result<(), ArtifactError>;
}

pub struct FilesystemArtifactStore {
    base_path: PathBuf,
}

impl FilesystemArtifactStore {
    pub fn new(base_path: PathBuf) -> Self {
        Self { base_path }
    }

    fn blobs_dir(&self) -> PathBuf {
        self.base_path.join("blobs")
    }

    fn temp_dir(&self) -> PathBuf {
        self.base_path.join("temp")
    }

    fn blob_dir_for_artifact(&self, artifact_id: &str) -> PathBuf {
        let prefix = &artifact_id[..2.min(artifact_id.len())];
        self.blobs_dir().join(prefix)
    }

    fn blob_file_for_artifact(&self, artifact_id: &str) -> PathBuf {
        self.blob_dir_for_artifact(artifact_id).join(artifact_id)
    }
}

impl ArtifactStore for FilesystemArtifactStore {
    async fn initialize(&self) -> Result<(), ArtifactError> {
        let dirs = [
            self.blobs_dir(),
            self.base_path.join("manifests"),
            self.temp_dir(),
            self.base_path.join("cache"),
        ];
        for dir in &dirs {
            tokio::fs::create_dir_all(dir).await?;
        }
        Ok(())
    }

    async fn allocate_write_target(
        &self,
        run_id: &str,
        node_id: &str,
        port_name: &str,
    ) -> Result<PathBuf, ArtifactError> {
        let target_dir = self.temp_dir().join(run_id).join(node_id);
        tokio::fs::create_dir_all(&target_dir).await?;
        Ok(target_dir.join(port_name))
    }

    async fn finalize(&self, temp_path: &Path, artifact_id: &str) -> Result<String, ArtifactError> {
        if !temp_path.exists() {
            return Err(ArtifactError::NotFound(temp_path.display().to_string()));
        }

        let dest_dir = self.blob_dir_for_artifact(artifact_id);
        tokio::fs::create_dir_all(&dest_dir).await?;

        let dest_path = dest_dir.join(artifact_id);
        if dest_path.exists() {
            return Err(ArtifactError::AlreadyExists(artifact_id.to_string()));
        }

        tokio::fs::rename(temp_path, &dest_path).await?;

        let prefix = &artifact_id[..2.min(artifact_id.len())];
        Ok(format!("blobs/{prefix}/{artifact_id}"))
    }

    async fn compute_hash(&self, path: &Path) -> Result<(String, u64), ArtifactError> {
        let mut file = tokio::fs::File::open(path).await?;
        let mut hasher = Sha256::new();
        let mut buffer = vec![0u8; 8192];
        let mut total_bytes: u64 = 0;

        loop {
            let bytes_read = file.read(&mut buffer).await?;
            if bytes_read == 0 {
                break;
            }
            hasher.update(&buffer[..bytes_read]);
            total_bytes += bytes_read as u64;
        }

        let hash = format!("{:x}", hasher.finalize());
        Ok((hash, total_bytes))
    }

    async fn blob_path(&self, artifact_id: &str) -> Result<PathBuf, ArtifactError> {
        let path = self.blob_file_for_artifact(artifact_id);
        if !path.exists() {
            return Err(ArtifactError::NotFound(artifact_id.to_string()));
        }
        Ok(path)
    }

    async fn delete(&self, artifact_id: &str) -> Result<(), ArtifactError> {
        let path = self.blob_file_for_artifact(artifact_id);
        if !path.exists() {
            return Err(ArtifactError::NotFound(artifact_id.to_string()));
        }
        tokio::fs::remove_file(&path).await?;
        Ok(())
    }
}
