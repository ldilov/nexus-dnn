use std::sync::Arc;

use async_trait::async_trait;
use chrono::Utc;
use sha2::{Digest, Sha256};
use sqlx::Row;
use sqlx::sqlite::SqlitePoolOptions;
use tempfile::TempDir;
use tokio::sync::Semaphore;

use super::dto::{InstallModelRequest, PlannedFile};
use super::fetcher::ModelFetcher;
use super::fetcher::test_support::FakeFetcher;
use super::pipeline::{ModelStoreCtx, install_model, uninstall_model};
use crate::download::DownloadSpec;
use crate::errors::{ModelStoreError, ModelStoreResult};

fn sha(bytes: &[u8]) -> String {
    let mut h = Sha256::new();
    h.update(bytes);
    h.finalize().iter().map(|b| format!("{b:02x}")).collect()
}

async fn make_ctx(fetcher: Arc<dyn ModelFetcher>) -> (ModelStoreCtx, TempDir) {
    let tmp = TempDir::new().unwrap();
    let pool = SqlitePoolOptions::new()
        .max_connections(4)
        .connect("sqlite::memory:")
        .await
        .unwrap();
    for stmt in include_str!("../../../../migrations/009_host_model_store.sql").split(';') {
        let t = stmt.trim();
        if !t.is_empty() {
            sqlx::query(t).execute(&pool).await.unwrap();
        }
    }
    for stmt in
        include_str!("../../../../migrations/010_host_model_store_provenance.sql").split(';')
    {
        let t = stmt.trim();
        if !t.is_empty() {
            sqlx::query(t).execute(&pool).await.unwrap();
        }
    }
    let ctx = ModelStoreCtx::new(
        pool,
        tmp.path().join("installs"),
        tmp.path().join("blobs"),
        2,
        fetcher,
    );
    (ctx, tmp)
}

fn sample_request(url: &str, bytes: &[u8]) -> InstallModelRequest {
    InstallModelRequest {
        family: "llama-cpp-gguf".into(),
        version: "llama-3-8b-instruct".into(),
        quantization: Some("Q4_K_M".into()),
        variant: "default".into(),
        sha256_root: sha(bytes),
        source_revision: sha(bytes),
        source_kind: "direct_url".into(),
        source_url: Some(url.to_string()),
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
            source_url: url.to_string(),
        }],
    }
}

#[tokio::test]
async fn install_new_tuple_creates_ready_row() {
    let bytes = b"hello model" as &[u8];
    let fetcher = FakeFetcher::new(vec![("http://x/f".into(), bytes.to_vec())]);
    let (ctx, _tmp) = make_ctx(fetcher.clone()).await;
    let dto = install_model(&ctx, sample_request("http://x/f", bytes))
        .await
        .unwrap();
    assert_eq!(dto.state, "ready");
    assert_eq!(fetcher.call_count(), 1);
}

#[tokio::test]
async fn install_existing_ready_tuple_returns_existing() {
    let bytes = b"shared" as &[u8];
    let fetcher = FakeFetcher::new(vec![("http://x/f".into(), bytes.to_vec())]);
    let (ctx, _tmp) = make_ctx(fetcher.clone()).await;
    let a = install_model(&ctx, sample_request("http://x/f", bytes))
        .await
        .unwrap();
    let b = install_model(&ctx, sample_request("http://x/f", bytes))
        .await
        .unwrap();
    assert_eq!(a.install_id, b.install_id);
    assert_eq!(fetcher.call_count(), 1, "second call reuses existing row");
}

#[tokio::test]
async fn concurrent_installs_collapse_to_one_row_and_one_fetch() {
    let bytes = b"concurrent" as &[u8];
    let fetcher = FakeFetcher::new(vec![("http://x/f".into(), bytes.to_vec())]);
    let (ctx, _tmp) = make_ctx(fetcher.clone()).await;
    let req = sample_request("http://x/f", bytes);
    let ctx1 = ctx.clone();
    let r1 = req.clone();
    let ctx2 = ctx.clone();
    let r2 = req.clone();
    let (a, b) = tokio::join!(
        tokio::spawn(async move { install_model(&ctx1, r1).await }),
        tokio::spawn(async move { install_model(&ctx2, r2).await }),
    );
    let a = a.unwrap().unwrap();
    let b = b.unwrap().unwrap();
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
async fn corrupt_fetch_marks_row_failed() {
    struct Corrupt;
    #[async_trait]
    impl ModelFetcher for Corrupt {
        async fn fetch_file(
            &self,
            spec: &DownloadSpec,
            _limiter: &Semaphore,
        ) -> ModelStoreResult<()> {
            Err(ModelStoreError::ChecksumMismatch {
                file: spec.destination.clone(),
                expected: spec.expected_sha256.clone(),
                actual: "deadbeef".into(),
            })
        }
    }
    let (ctx, _tmp) = make_ctx(Arc::new(Corrupt)).await;
    let req = sample_request("http://x/f", b"hello");
    let err = install_model(&ctx, req).await.unwrap_err();
    assert!(matches!(err, ModelStoreError::ChecksumMismatch { .. }));
    let state: String = sqlx::query("SELECT state FROM host_model_installs LIMIT 1")
        .fetch_one(&ctx.pool)
        .await
        .unwrap()
        .try_get("state")
        .unwrap();
    assert_eq!(state, "failed");
}

#[tokio::test]
async fn uninstall_without_leases_removes_row() {
    let bytes = b"gone" as &[u8];
    let fetcher = FakeFetcher::new(vec![("http://x/f".into(), bytes.to_vec())]);
    let (ctx, _tmp) = make_ctx(fetcher).await;
    let dto = install_model(&ctx, sample_request("http://x/f", bytes))
        .await
        .unwrap();
    uninstall_model(&ctx, &dto.install_id).await.unwrap();
    let n: i64 = sqlx::query("SELECT COUNT(*) AS n FROM host_model_installs")
        .fetch_one(&ctx.pool)
        .await
        .unwrap()
        .try_get("n")
        .unwrap();
    assert_eq!(n, 0);
}

#[tokio::test]
async fn uninstall_blocked_by_active_lease() {
    let bytes = b"leased" as &[u8];
    let fetcher = FakeFetcher::new(vec![("http://x/f".into(), bytes.to_vec())]);
    let (ctx, _tmp) = make_ctx(fetcher).await;
    let dto = install_model(&ctx, sample_request("http://x/f", bytes))
        .await
        .unwrap();
    sqlx::query(
        "INSERT INTO host_model_leases (lease_id, install_id, extension_id, device, \
         vram_reserved_bytes, acquired_at) VALUES ('l1',$1,'ext-alpha','cuda:0',0,$2)",
    )
    .bind(&dto.install_id)
    .bind(Utc::now().to_rfc3339())
    .execute(&ctx.pool)
    .await
    .unwrap();
    let err = uninstall_model(&ctx, &dto.install_id).await.unwrap_err();
    match err {
        ModelStoreError::LeasedByExtensions { extensions, .. } => {
            assert_eq!(extensions, vec!["ext-alpha".to_string()]);
        }
        other => panic!("expected LeasedByExtensions, got {other:?}"),
    }
}
