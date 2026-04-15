use std::sync::Arc;

use nexus_backend_runtimes::models_store::install::test_support::FakeFetcher;
use nexus_backend_runtimes::models_store::{
    InstallModelRequest, ModelStoreCtx, PlannedFile, install_model,
};
use sha2::{Digest, Sha256};
use sqlx::Row;
use sqlx::sqlite::SqlitePoolOptions;

fn sha(b: &[u8]) -> String {
    let mut h = Sha256::new();
    h.update(b);
    h.finalize().iter().map(|x| format!("{x:02x}")).collect()
}

async fn make_ctx(
    fetcher: Arc<dyn nexus_backend_runtimes::models_store::ModelFetcher>,
    tmp: &tempfile::TempDir,
) -> ModelStoreCtx {
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
    ModelStoreCtx::new(
        pool,
        tmp.path().join("installs"),
        tmp.path().join("blobs"),
        2,
        fetcher,
    )
}

fn req(url: &str, bytes: &[u8], revision: &str) -> InstallModelRequest {
    InstallModelRequest {
        family: "llama-cpp-gguf".into(),
        version: "llama-3-8b-instruct".into(),
        quantization: Some("Q4_K_M".into()),
        variant: "default".into(),
        sha256_root: sha(bytes),
        source_revision: revision.into(),
        source_kind: "direct_url".into(),
        source_url: Some(url.into()),
        private: false,
        owner_extension_id: None,
        license_spdx: Some("apache-2.0".into()),
        license_url: None,
        provenance_note: None,
        param_count: None,
        files: vec![PlannedFile {
            path: "model.gguf".into(),
            sha256: sha(bytes),
            size_bytes: bytes.len() as u64,
            source_url: url.into(),
        }],
    }
}

#[tokio::test]
async fn identical_tuple_installs_collapse_to_one_row() {
    let tmp = tempfile::TempDir::new().unwrap();
    let bytes = b"collapsed" as &[u8];
    let fetcher = FakeFetcher::new(vec![("http://x/m".into(), bytes.to_vec())]);
    let ctx = make_ctx(fetcher.clone(), &tmp).await;

    let req1 = req("http://x/m", bytes, "rev-1");
    let req2 = req("http://x/m", bytes, "rev-1");
    let (a, b) = tokio::join!(install_model(&ctx, req1), install_model(&ctx, req2));
    let a = a.unwrap();
    let b = b.unwrap();
    assert_eq!(a.install_id, b.install_id);
    assert_eq!(fetcher.call_count(), 1);

    let count: i64 = sqlx::query("SELECT COUNT(*) AS n FROM host_model_installs")
        .fetch_one(&ctx.pool)
        .await
        .unwrap()
        .try_get("n")
        .unwrap();
    assert_eq!(count, 1);
}

#[tokio::test]
async fn distinct_sha_roots_produce_distinct_rows() {
    let tmp = tempfile::TempDir::new().unwrap();
    let bytes_a = b"variant-a" as &[u8];
    let bytes_b = b"variant-b" as &[u8];
    let fetcher = FakeFetcher::new(vec![
        ("http://x/a".into(), bytes_a.to_vec()),
        ("http://x/b".into(), bytes_b.to_vec()),
    ]);
    let ctx = make_ctx(fetcher, &tmp).await;

    let a = install_model(&ctx, req("http://x/a", bytes_a, "rev-a"))
        .await
        .unwrap();
    let b = install_model(&ctx, req("http://x/b", bytes_b, "rev-b"))
        .await
        .unwrap();
    assert_ne!(a.install_id, b.install_id);
}
