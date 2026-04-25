use emotion_tts_extension::MIGRATIONS;
use sqlx::sqlite::SqlitePoolOptions;
use sqlx::Row;
use sqlx::SqlitePool;

async fn fresh_pool() -> SqlitePool {
    let pool = SqlitePoolOptions::new()
        .max_connections(1)
        .connect("sqlite::memory:")
        .await
        .expect("in-memory pool");
    for m in MIGRATIONS {
        sqlx::raw_sql(m.sql)
            .execute(&pool)
            .await
            .unwrap_or_else(|e| panic!("migration {} failed: {}", m.name, e));
    }
    pool
}

async fn deployment_column_names(pool: &SqlitePool) -> Vec<String> {
    sqlx::query("PRAGMA table_info(ext_emotion_tts__deployments)")
        .fetch_all(pool)
        .await
        .expect("pragma")
        .into_iter()
        .map(|row| row.get::<String, _>("name"))
        .collect()
}

#[tokio::test]
async fn migration_011_adds_all_six_columns() {
    let pool = fresh_pool().await;
    let columns = deployment_column_names(&pool).await;

    for expected in [
        "reference_preprocess_enabled",
        "oas_enabled",
        "compile_gpt_enabled",
        "model_family",
        "oas_threshold_learned",
        "oas_samples_seen",
    ] {
        assert!(
            columns.iter().any(|c| c == expected),
            "missing column {expected}; actual columns: {columns:?}",
        );
    }
}

#[tokio::test]
async fn migration_011_creates_partial_index_on_model_family() {
    let pool = fresh_pool().await;
    let indexes: Vec<String> = sqlx::query(
        "SELECT name FROM sqlite_master
         WHERE type = 'index' AND tbl_name = 'ext_emotion_tts__deployments'",
    )
    .fetch_all(&pool)
    .await
    .expect("query")
    .into_iter()
    .map(|row| row.get::<String, _>("name"))
    .collect();

    assert!(
        indexes
            .iter()
            .any(|n| n == "ext_emotion_tts_idx_deployments_model_family"),
        "partial index missing; actual indexes: {indexes:?}",
    );
}

#[tokio::test]
async fn migration_011_oas_samples_seen_defaults_to_zero() {
    let pool = fresh_pool().await;
    sqlx::query(
        "INSERT INTO ext_emotion_tts__deployments
            (deployment_id, host_extension_instance_ref, display_name, created_at, updated_at)
         VALUES ('d1', 'host-1', 'Demo', 0, 0)",
    )
    .execute(&pool)
    .await
    .expect("insert");

    let samples: i64 = sqlx::query_scalar(
        "SELECT oas_samples_seen FROM ext_emotion_tts__deployments WHERE deployment_id = 'd1'",
    )
    .fetch_one(&pool)
    .await
    .expect("select");

    assert_eq!(samples, 0);
}

#[tokio::test]
async fn migration_011_toggle_columns_are_nullable() {
    let pool = fresh_pool().await;
    sqlx::query(
        "INSERT INTO ext_emotion_tts__deployments
            (deployment_id, host_extension_instance_ref, display_name, created_at, updated_at)
         VALUES ('d2', 'host-1', 'Demo', 0, 0)",
    )
    .execute(&pool)
    .await
    .expect("insert");

    let row = sqlx::query(
        "SELECT reference_preprocess_enabled, oas_enabled, compile_gpt_enabled,
                model_family, oas_threshold_learned
         FROM ext_emotion_tts__deployments WHERE deployment_id = 'd2'",
    )
    .fetch_one(&pool)
    .await
    .expect("select");

    assert!(row.get::<Option<i64>, _>("reference_preprocess_enabled").is_none());
    assert!(row.get::<Option<i64>, _>("oas_enabled").is_none());
    assert!(row.get::<Option<i64>, _>("compile_gpt_enabled").is_none());
    assert!(row.get::<Option<String>, _>("model_family").is_none());
    assert!(row.get::<Option<f64>, _>("oas_threshold_learned").is_none());
}
