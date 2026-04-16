use chrono::Utc;
use nexus_models_store::{ModelStoreError, acquire_lease};
use sqlx::sqlite::SqlitePoolOptions;

async fn setup() -> sqlx::SqlitePool {
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
    let now = Utc::now().to_rfc3339();
    sqlx::query(
        "INSERT INTO host_model_installs (install_id, family, version, variant, install_root, \
         files_manifest, sha256_root, source_revision, state, source_kind, created_at, \
         updated_at) VALUES ('i1','f','v','default','/t','[]','s','s','ready','direct_url',\
         $1,$1)",
    )
    .bind(&now)
    .execute(&pool)
    .await
    .unwrap();
    pool
}

#[tokio::test]
async fn acquire_lease_returns_insufficient_resources_on_budget_exhaustion() {
    let pool = setup().await;
    let budget: u64 = 12 * 1024 * 1024 * 1024;
    acquire_lease(&pool, "i1", "ext-a", "cuda:0", budget, budget)
        .await
        .unwrap();
    let err = acquire_lease(&pool, "i1", "ext-b", "cuda:0", 1, budget)
        .await
        .unwrap_err();
    assert!(matches!(
        err,
        ModelStoreError::InsufficientResources {
            requested: 1,
            available: 0,
            ..
        }
    ));
}
