use std::sync::Arc;
use std::time::Duration;

use nexus_backend_runtimes::models_store::install::test_support::FakeFetcher;
use nexus_backend_runtimes::models_store::{
    InstallModelRequest, ModelStoreCtx, PlannedFile, install_model, run_reclaim_pass,
};
use sha2::{Digest, Sha256};
use sqlx::Row;
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

fn priv_request(bytes: &[u8]) -> InstallModelRequest {
    InstallModelRequest {
        family: "f".into(),
        version: "v".into(),
        quantization: None,
        variant: "default".into(),
        sha256_root: sha(bytes),
        source_revision: sha(bytes),
        source_kind: "direct_url".into(),
        source_url: Some("http://x/f".into()),
        private: true,
        owner_extension_id: Some("ext-gone".into()),
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
    }
}

#[tokio::test]
async fn private_install_reclaimed_when_owner_inactive_and_no_leases() {
    let tmp = tempfile::TempDir::new().unwrap();
    let bytes = b"dead-owner" as &[u8];
    let ctx = ctx_for(&tmp, bytes).await;
    install_model(&ctx, priv_request(bytes)).await.unwrap();

    let predicate = |_ext: &str| false;
    let reclaimed = run_reclaim_pass(&ctx.pool, &predicate, Duration::from_millis(0))
        .await
        .unwrap();
    assert_eq!(reclaimed, 1);
    let state: String = sqlx::query("SELECT state FROM host_model_installs LIMIT 1")
        .fetch_one(&ctx.pool)
        .await
        .unwrap()
        .try_get("state")
        .unwrap();
    assert_eq!(state, "reclaimed");
}

#[tokio::test]
async fn private_install_kept_when_owner_still_active() {
    let tmp = tempfile::TempDir::new().unwrap();
    let bytes = b"live-owner" as &[u8];
    let ctx = ctx_for(&tmp, bytes).await;
    install_model(&ctx, priv_request(bytes)).await.unwrap();

    let predicate = |_ext: &str| true;
    let reclaimed = run_reclaim_pass(&ctx.pool, &predicate, Duration::from_millis(0))
        .await
        .unwrap();
    assert_eq!(reclaimed, 0);
    let state: String = sqlx::query("SELECT state FROM host_model_installs LIMIT 1")
        .fetch_one(&ctx.pool)
        .await
        .unwrap()
        .try_get("state")
        .unwrap();
    assert_eq!(state, "ready");
}

#[tokio::test]
async fn private_install_kept_when_active_lease_exists() {
    let tmp = tempfile::TempDir::new().unwrap();
    let bytes = b"leased" as &[u8];
    let ctx = ctx_for(&tmp, bytes).await;
    let dto = install_model(&ctx, priv_request(bytes)).await.unwrap();
    sqlx::query(
        "INSERT INTO host_model_leases (lease_id, install_id, extension_id, device, \
         vram_reserved_bytes, acquired_at) VALUES ('L',$1,'ext-gone','cuda:0',0,$2)",
    )
    .bind(&dto.install_id)
    .bind(chrono::Utc::now().to_rfc3339())
    .execute(&ctx.pool)
    .await
    .unwrap();

    let predicate = |_ext: &str| false;
    let reclaimed = run_reclaim_pass(&ctx.pool, &predicate, Duration::from_millis(0))
        .await
        .unwrap();
    assert_eq!(reclaimed, 0);
}

#[tokio::test]
async fn public_install_never_reclaimed() {
    let tmp = tempfile::TempDir::new().unwrap();
    let bytes = b"public" as &[u8];
    let ctx = ctx_for(&tmp, bytes).await;
    let mut req = priv_request(bytes);
    req.private = false;
    req.owner_extension_id = None;
    install_model(&ctx, req).await.unwrap();
    let predicate = |_ext: &str| false;
    let reclaimed = run_reclaim_pass(&ctx.pool, &predicate, Duration::from_millis(0))
        .await
        .unwrap();
    assert_eq!(reclaimed, 0);
}
