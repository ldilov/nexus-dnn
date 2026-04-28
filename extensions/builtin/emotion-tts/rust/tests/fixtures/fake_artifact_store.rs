use std::collections::HashMap;
use std::sync::Arc;

use async_trait::async_trait;
use emotion_tts_extension::host_contract::{ArtifactPut, HostArtifactStore, HostContractError};
use tokio::sync::RwLock;

#[derive(Default, Clone)]
pub struct FakeArtifactStore {
    inner: Arc<RwLock<HashMap<String, Vec<u8>>>>,
}

impl FakeArtifactStore {
    pub fn new() -> Self {
        Self::default()
    }

    #[allow(dead_code)]
    pub async fn count(&self) -> usize {
        self.inner.read().await.len()
    }
}

#[async_trait]
impl HostArtifactStore for FakeArtifactStore {
    async fn store(
        &self,
        bytes: Vec<u8>,
        display_name: &str,
        _mime_hint: Option<&str>,
    ) -> Result<ArtifactPut, HostContractError> {
        let key = format!("artifact://fake/{}", display_name);
        let len = bytes.len() as u64;
        self.inner.write().await.insert(key.clone(), bytes);
        Ok(ArtifactPut {
            artifact_ref: key,
            content_sha256: "0".repeat(64),
            size_bytes: len,
        })
    }

    async fn resolve_path(&self, _artifact_ref: &str) -> Result<String, HostContractError> {
        Ok("/tmp/fake".into())
    }
}
