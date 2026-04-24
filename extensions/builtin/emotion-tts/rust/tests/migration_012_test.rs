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

async fn voice_asset_column_names(pool: &SqlitePool) -> Vec<String> {
    sqlx::query("PRAGMA table_info(ext_emotion_tts__voice_assets)")
        .fetch_all(pool)
        .await
        .expect("pragma")
        .into_iter()
        .map(|row| row.get::<String, _>("name"))
        .collect()
}

#[tokio::test]
async fn migration_012_adds_preprocessed_artifact_ref_column() {
    let pool = fresh_pool().await;
    let columns = voice_asset_column_names(&pool).await;
    assert!(
        columns.iter().any(|c| c == "preprocessed_artifact_ref"),
        "missing preprocessed_artifact_ref; actual: {columns:?}",
    );
}

#[tokio::test]
async fn migration_012_adds_preprocessing_report_json_column() {
    let pool = fresh_pool().await;
    let columns = voice_asset_column_names(&pool).await;
    assert!(
        columns.iter().any(|c| c == "preprocessing_report_json"),
        "missing preprocessing_report_json; actual: {columns:?}",
    );
}

#[tokio::test]
async fn migration_012_new_columns_are_nullable() {
    let pool = fresh_pool().await;
    sqlx::query(
        "INSERT INTO ext_emotion_tts__deployments
            (deployment_id, host_extension_instance_ref, display_name, created_at, updated_at)
         VALUES ('d1', 'host-1', 'Demo', 0, 0)",
    )
    .execute(&pool)
    .await
    .expect("insert deployment");

    sqlx::query(
        "INSERT INTO ext_emotion_tts__voice_assets
            (voice_asset_id, deployment_id, display_name, kind,
             audio_artifact_ref, content_sha256, source_type,
             duration_ms, sample_rate, created_at, updated_at)
         VALUES ('va1', 'd1', 'Ref', 'speaker',
                 'artifact://mem/x', 'deadbeef', 'upload',
                 1000, 24000, 0, 0)",
    )
    .execute(&pool)
    .await
    .expect("insert voice asset");

    let row = sqlx::query(
        "SELECT preprocessed_artifact_ref, preprocessing_report_json
         FROM ext_emotion_tts__voice_assets WHERE voice_asset_id = 'va1'",
    )
    .fetch_one(&pool)
    .await
    .expect("select");

    assert!(row.get::<Option<String>, _>("preprocessed_artifact_ref").is_none());
    assert!(row.get::<Option<String>, _>("preprocessing_report_json").is_none());
}
