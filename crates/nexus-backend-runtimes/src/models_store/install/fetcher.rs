use async_trait::async_trait;
use tokio::sync::Semaphore;

use crate::models_store::download::{DownloadSpec, download_and_verify};
use crate::models_store::errors::ModelStoreResult;

#[async_trait]
pub trait ModelFetcher: Send + Sync {
    async fn fetch_file(&self, spec: &DownloadSpec, limiter: &Semaphore) -> ModelStoreResult<()>;
}

pub struct HttpFetcher;

#[async_trait]
impl ModelFetcher for HttpFetcher {
    async fn fetch_file(&self, spec: &DownloadSpec, limiter: &Semaphore) -> ModelStoreResult<()> {
        download_and_verify(spec, limiter).await.map(|_| ())
    }
}

pub mod test_support {
    use std::collections::HashMap;
    use std::sync::Arc;
    use std::sync::atomic::{AtomicUsize, Ordering};

    use async_trait::async_trait;
    use sha2::{Digest, Sha256};
    use tokio::sync::Semaphore;

    use super::ModelFetcher;
    use crate::models_store::download::DownloadSpec;
    use crate::models_store::errors::{ModelStoreError, ModelStoreResult};

    pub struct FakeFetcher {
        pub calls: AtomicUsize,
        pub files: std::sync::Mutex<HashMap<String, Vec<u8>>>,
    }

    impl FakeFetcher {
        pub fn new(files: Vec<(String, Vec<u8>)>) -> Arc<Self> {
            Arc::new(Self {
                calls: AtomicUsize::new(0),
                files: std::sync::Mutex::new(files.into_iter().collect()),
            })
        }
        pub fn call_count(&self) -> usize {
            self.calls.load(Ordering::SeqCst)
        }
    }

    #[async_trait]
    impl ModelFetcher for FakeFetcher {
        async fn fetch_file(
            &self,
            spec: &DownloadSpec,
            _limiter: &Semaphore,
        ) -> ModelStoreResult<()> {
            self.calls.fetch_add(1, Ordering::SeqCst);
            let bytes = self
                .files
                .lock()
                .unwrap()
                .get(&spec.source_url)
                .cloned()
                .ok_or_else(|| ModelStoreError::SourceUnreachable {
                    source_url: spec.source_url.clone(),
                    detail: "no stub registered".into(),
                })?;
            if let Some(parent) = spec.destination.parent() {
                tokio::fs::create_dir_all(parent).await?;
            }
            tokio::fs::write(&spec.destination, &bytes).await?;
            let mut h = Sha256::new();
            h.update(&bytes);
            let got: String = h.finalize().iter().map(|b| format!("{b:02x}")).collect();
            if !got.eq_ignore_ascii_case(&spec.expected_sha256) {
                return Err(ModelStoreError::ChecksumMismatch {
                    file: spec.destination.clone(),
                    expected: spec.expected_sha256.clone(),
                    actual: got,
                });
            }
            Ok(())
        }
    }
}
