use std::sync::Arc;

use nexus_backend_runtimes::models_store::install::test_support::FakeFetcher;
use nexus_backend_runtimes::models_store::{
    InstallModelRequest, ModelStoreCtx, ModelStoreError, PlannedFile, install_model,
};
use sha2::{Digest, Sha256};
use sqlx::sqlite::SqlitePoolOptions;

fn sha(b: &[u8]) -> String {
    let mut h = Sha256::new();
    h.update(b);
    h.finalize().iter().map(|x| format!("{x:02x}")).collect()
}

async fn ctx_for(tmp: &tempfile::TempDir, bytes: &[u8]) -> ModelStoreCtx {
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
}

fn req(
    bytes: &[u8],
    license_spdx: Option<&str>,
    provenance_note: Option<&str>,
) -> InstallModelRequest {
    InstallModelRequest {
        family: "f".into(),
        version: "v".into(),
        quantization: None,
        variant: "default".into(),
        sha256_root: sha(bytes),
        source_revision: sha(bytes),
        source_kind: "direct_url".into(),
        source_url: Some("http://x/f".into()),
        private: false,
        owner_extension_id: None,
        license_spdx: license_spdx.map(str::to_string),
        license_url: None,
        provenance_note: provenance_note.map(str::to_string),
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
async fn missing_license_rejects_ready_transition() {
    let tmp = tempfile::TempDir::new().unwrap();
    let bytes = b"missing-license" as &[u8];
    let ctx = ctx_for(&tmp, bytes).await;
    let err = install_model(&ctx, req(bytes, None, None))
        .await
        .unwrap_err();
    assert!(matches!(err, ModelStoreError::ManifestInvalid(_)));
}

#[tokio::test]
async fn unknown_license_requires_provenance_note() {
    let tmp = tempfile::TempDir::new().unwrap();
    let bytes = b"unknown-no-note" as &[u8];
    let ctx = ctx_for(&tmp, bytes).await;
    let err = install_model(&ctx, req(bytes, Some("UNKNOWN"), None))
        .await
        .unwrap_err();
    assert!(matches!(err, ModelStoreError::ManifestInvalid(_)));

    let tmp2 = tempfile::TempDir::new().unwrap();
    let bytes2 = b"unknown-with-note" as &[u8];
    let ctx2 = ctx_for(&tmp2, bytes2).await;
    let dto = install_model(
        &ctx2,
        req(
            bytes2,
            Some("UNKNOWN"),
            Some("no license metadata at source"),
        ),
    )
    .await
    .unwrap();
    assert_eq!(dto.state, "ready");
}

#[tokio::test]
async fn valid_spdx_passes_without_note() {
    let tmp = tempfile::TempDir::new().unwrap();
    let bytes = b"valid-license" as &[u8];
    let ctx = ctx_for(&tmp, bytes).await;
    let dto = install_model(&ctx, req(bytes, Some("apache-2.0"), None))
        .await
        .unwrap();
    assert_eq!(dto.state, "ready");
}
