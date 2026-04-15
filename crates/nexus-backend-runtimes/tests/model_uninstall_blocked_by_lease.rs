use std::sync::Arc;

use chrono::Utc;
use nexus_backend_runtimes::models_store::install::test_support::FakeFetcher;
use nexus_backend_runtimes::models_store::{
    InstallModelRequest, ModelStoreCtx, ModelStoreError, PlannedFile, install_model,
    uninstall_model,
};
use sha2::{Digest, Sha256};
use sqlx::sqlite::SqlitePoolOptions;

fn sha(b: &[u8]) -> String {
    let mut h = Sha256::new();
    h.update(b);
    h.finalize().iter().map(|x| format!("{x:02x}")).collect()
}

#[tokio::test]
async fn uninstall_with_active_lease_returns_leased_by_extensions() {
    let tmp = tempfile::TempDir::new().unwrap();
    let bytes = b"held" as &[u8];
    let fetcher: Arc<dyn nexus_backend_runtimes::models_store::ModelFetcher> =
        FakeFetcher::new(vec![("http://x/f".into(), bytes.to_vec())]);
    let pool = SqlitePoolOptions::new()
        .max_connections(4)
        .connect("sqlite::memory:")
        .await
        .unwrap();
    for stmt in include_str!("../../../migrations/009_host_model_store.sql").split(';') {
        let t = stmt.trim();
        if !t.is_empty() {
            sqlx::query(t).execute(&pool).await.unwrap();
        }
    }
    let ctx = ModelStoreCtx::new(
        pool.clone(),
        tmp.path().join("installs"),
        tmp.path().join("blobs"),
        2,
        fetcher,
    );

    let dto = install_model(
        &ctx,
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
            files: vec![PlannedFile {
                path: "m.bin".into(),
                sha256: sha(bytes),
                size_bytes: bytes.len() as u64,
                source_url: "http://x/f".into(),
            }],
        },
    )
    .await
    .unwrap();

    sqlx::query(
        "INSERT INTO host_model_leases (lease_id, install_id, extension_id, device, \
         vram_reserved_bytes, acquired_at) VALUES ('L',$1,'ext-alpha','cuda:0',0,$2)",
    )
    .bind(&dto.install_id)
    .bind(Utc::now().to_rfc3339())
    .execute(&pool)
    .await
    .unwrap();

    let err = uninstall_model(&ctx, &dto.install_id).await.unwrap_err();
    match err {
        ModelStoreError::LeasedByExtensions {
            install_id,
            extensions,
        } => {
            assert_eq!(install_id, dto.install_id);
            assert_eq!(extensions, vec!["ext-alpha".to_string()]);
        }
        other => panic!("expected LeasedByExtensions, got {other:?}"),
    }
}
