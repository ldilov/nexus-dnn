use std::sync::Arc;

use async_trait::async_trait;
use nexus_backend_runtimes::models_store::install::test_support::FakeFetcher;
use nexus_backend_runtimes::models_store::{
    HfMetadata, HfProbe, InstallModelRequest, ModelStoreCtx, ModelStoreResult, PlannedFile,
    install_model, list_all_visible,
};
use sha2::{Digest, Sha256};
use sqlx::sqlite::SqlitePoolOptions;

fn sha(b: &[u8]) -> String {
    let mut h = Sha256::new();
    h.update(b);
    h.finalize().iter().map(|x| format!("{x:02x}")).collect()
}

struct StubHfProbe {
    license: Option<String>,
    sha: String,
}

#[async_trait]
impl HfProbe for StubHfProbe {
    async fn fetch_metadata(
        &self,
        _repo_id: &str,
        _revision: Option<&str>,
    ) -> ModelStoreResult<HfMetadata> {
        Ok(HfMetadata {
            revision: self.sha.clone(),
            license: self.license.clone(),
            total_bytes: 0,
        })
    }
}

async fn ctx_with_probe(
    tmp: &tempfile::TempDir,
    bytes: &[u8],
    probe: Arc<dyn HfProbe>,
) -> ModelStoreCtx {
    let fetcher: Arc<dyn nexus_backend_runtimes::models_store::ModelFetcher> =
        FakeFetcher::new(vec![("http://x/f".into(), bytes.to_vec())]);
    let pool = SqlitePoolOptions::new()
        .max_connections(2)
        .connect("sqlite::memory:")
        .await
        .unwrap();
    for stmt in include_str!("../../../migrations/009_host_model_store.sql").split(';') {
        let t = stmt.trim();
        if !t.is_empty() {
            sqlx::query(t).execute(&pool).await.unwrap();
        }
    }
    for stmt in include_str!("../../../migrations/010_host_model_store_provenance.sql").split(';') {
        let t = stmt.trim();
        if !t.is_empty() {
            sqlx::query(t).execute(&pool).await.unwrap();
        }
    }
    ModelStoreCtx::new(
        pool,
        tmp.path().join("installs"),
        tmp.path().join("blobs"),
        2,
        fetcher,
    )
    .with_hf_probe(probe)
}

fn hf_request(bytes: &[u8], revision: &str) -> InstallModelRequest {
    InstallModelRequest {
        family: "llama".into(),
        version: "3-8b".into(),
        quantization: None,
        variant: "default".into(),
        sha256_root: sha(bytes),
        source_revision: revision.into(),
        source_kind: "huggingface".into(),
        source_url: Some("meta-llama/Meta-Llama-3-8B".into()),
        private: false,
        owner_extension_id: None,
        license_spdx: None,
        license_url: None,
        provenance_note: None,
        param_count: None,
        files: vec![PlannedFile {
            path: "m.bin".into(),
            sha256: sha(bytes),
            size_bytes: bytes.len() as u64,
            source_url: "http://x/f".into(),
        }],
    }
}

#[tokio::test]
async fn hf_metadata_populates_license_on_install() {
    let tmp = tempfile::TempDir::new().unwrap();
    let bytes = b"hf-with-license" as &[u8];
    let probe = Arc::new(StubHfProbe {
        license: Some("mit".into()),
        sha: "abc123def456".into(),
    });
    let ctx = ctx_with_probe(&tmp, bytes, probe).await;
    install_model(&ctx, hf_request(bytes, "abc123def456"))
        .await
        .unwrap();

    let rows = list_all_visible(&ctx.pool, None).await.unwrap();
    assert_eq!(rows.len(), 1);
    assert_eq!(rows[0].license_spdx.as_deref(), Some("mit"));
    assert!(rows[0].license_url.is_some());
}

#[tokio::test]
async fn unpinned_hf_install_resolves_revision_to_current_sha() {
    let tmp = tempfile::TempDir::new().unwrap();
    let bytes = b"unpinned" as &[u8];
    let probe = Arc::new(StubHfProbe {
        license: Some("apache-2.0".into()),
        sha: "resolved-sha-xyz".into(),
    });
    let ctx = ctx_with_probe(&tmp, bytes, probe).await;
    let req = hf_request(bytes, "main");
    install_model(&ctx, req).await.unwrap();
    let rows = list_all_visible(&ctx.pool, None).await.unwrap();
    assert_eq!(rows[0].source_revision, "resolved-sha-xyz");
}

#[tokio::test]
async fn missing_license_anywhere_falls_back_to_unknown_with_note() {
    let tmp = tempfile::TempDir::new().unwrap();
    let bytes = b"no-license-anywhere" as &[u8];
    let probe = Arc::new(StubHfProbe {
        license: None,
        sha: "sha-ok".into(),
    });
    let ctx = ctx_with_probe(&tmp, bytes, probe).await;
    install_model(&ctx, hf_request(bytes, "sha-ok"))
        .await
        .unwrap();
    let rows = list_all_visible(&ctx.pool, None).await.unwrap();
    assert_eq!(rows[0].license_spdx.as_deref(), Some("UNKNOWN"));
    // provenance_note is asserted via the license-invariant gate (install succeeded).
}
