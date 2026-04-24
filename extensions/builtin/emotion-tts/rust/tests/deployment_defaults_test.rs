use emotion_tts_extension::storage::Repos;
use emotion_tts_extension::MIGRATIONS;
use sqlx::sqlite::SqlitePoolOptions;
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

#[tokio::test]
async fn reading_row_with_null_spec_034_columns_applies_documented_defaults() {
    let pool = fresh_pool().await;

    let dep_id = emotion_tts_extension::domain::DeploymentId::new();
    sqlx::query(
        "INSERT INTO ext_emotion_tts__deployments
            (deployment_id, host_extension_instance_ref, display_name,
             default_output_format, default_speed_factor, default_generation_overrides_json,
             created_at, updated_at)
         VALUES (?, 'host-1', 'Defaults',
                 'mp3', 1.0, '{}',
                 0, 0)",
    )
    .bind(dep_id.as_str())
    .execute(&pool)
    .await
    .expect("legacy insert");

    let repos = Repos::from_pool(pool);
    let row = repos
        .deployments
        .get(&dep_id)
        .await
        .expect("repo get")
        .expect("row exists");

    assert!(
        row.reference_preprocess_enabled,
        "reference_preprocess_enabled must default to true per data-model.md §Transitions",
    );
    assert!(row.oas_enabled, "oas_enabled must default to true");
    assert!(
        !row.compile_gpt_enabled,
        "compile_gpt_enabled must default to false",
    );
    assert_eq!(
        row.model_family, "indextts-2",
        "model_family must default to 'indextts-2'",
    );
    assert!(
        row.oas_threshold_learned.is_none(),
        "oas_threshold_learned must stay None until learned",
    );
    assert_eq!(row.oas_samples_seen, 0);
}

#[tokio::test]
async fn reading_row_with_explicit_spec_034_columns_returns_stored_values() {
    let pool = fresh_pool().await;

    let dep_id = emotion_tts_extension::domain::DeploymentId::new();
    sqlx::query(
        "INSERT INTO ext_emotion_tts__deployments
            (deployment_id, host_extension_instance_ref, display_name,
             default_output_format, default_speed_factor, default_generation_overrides_json,
             reference_preprocess_enabled, oas_enabled, compile_gpt_enabled,
             model_family, oas_threshold_learned, oas_samples_seen,
             created_at, updated_at)
         VALUES (?, 'host-1', 'Explicit',
                 'mp3', 1.0, '{}',
                 0, 0, 1,
                 'indextts-2-5', 0.37, 250,
                 0, 0)",
    )
    .bind(dep_id.as_str())
    .execute(&pool)
    .await
    .expect("explicit insert");

    let repos = Repos::from_pool(pool);
    let row = repos
        .deployments
        .get(&dep_id)
        .await
        .expect("repo get")
        .expect("row exists");

    assert!(!row.reference_preprocess_enabled);
    assert!(!row.oas_enabled);
    assert!(row.compile_gpt_enabled);
    assert_eq!(row.model_family, "indextts-2-5");
    assert_eq!(row.oas_threshold_learned, Some(0.37));
    assert_eq!(row.oas_samples_seen, 250);
}
