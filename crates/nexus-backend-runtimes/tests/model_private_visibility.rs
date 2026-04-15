use std::sync::Arc;

use nexus_backend_runtimes::models_store::install::test_support::FakeFetcher;
use nexus_backend_runtimes::models_store::{
    InstallModelRequest, ModelDependency, ModelStoreCtx, PlannedFile, ResolutionContext,
    check_model_dependencies, install_model,
};
use sha2::{Digest, Sha256};
use sqlx::sqlite::SqlitePoolOptions;

fn sha(b: &[u8]) -> String {
    let mut h = Sha256::new();
    h.update(b);
    h.finalize().iter().map(|x| format!("{x:02x}")).collect()
}

#[tokio::test]
async fn private_install_is_invisible_to_other_extensions() {
    let tmp = tempfile::TempDir::new().unwrap();
    let bytes = b"private-weights" as &[u8];
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
    for stmt in include_str!("../../../migrations/010_host_model_store_provenance.sql").split(';') {
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

    install_model(
        &ctx,
        InstallModelRequest {
            family: "llama".into(),
            version: "3-8b".into(),
            quantization: None,
            variant: "default".into(),
            sha256_root: sha(bytes),
            source_revision: sha(bytes),
            source_kind: "direct_url".into(),
            source_url: Some("http://x/f".into()),
            private: true,
            owner_extension_id: Some("ext-alpha".into()),
            license_spdx: Some("apache-2.0".into()),
            license_url: None,
            provenance_note: None,
            param_count: None,
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

    let dep = ModelDependency {
        family: "llama".into(),
        version: "3-8b".into(),
        revision: None,
        allow_unpinned: true,
        min_params: None,
        quantization: None,
        variant: None,
        required: true,
    };

    let owner_ctx = ResolutionContext {
        extension_id: Some("ext-alpha".into()),
    };
    let owner_report = check_model_dependencies(&pool, std::slice::from_ref(&dep), &owner_ctx)
        .await
        .unwrap();
    assert_eq!(owner_report.matched.len(), 1);
    assert!(owner_report.missing.is_empty());

    let other_ctx = ResolutionContext {
        extension_id: Some("ext-beta".into()),
    };
    let other_report = check_model_dependencies(&pool, &[dep], &other_ctx)
        .await
        .unwrap();
    assert!(other_report.matched.is_empty());
    assert_eq!(other_report.missing.len(), 1);
}
