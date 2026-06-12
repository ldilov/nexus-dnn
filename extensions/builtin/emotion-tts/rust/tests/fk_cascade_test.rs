use emotion_tts_extension::MIGRATIONS;
use sqlx::sqlite::{SqliteConnectOptions, SqlitePoolOptions};
use sqlx::SqlitePool;
use std::str::FromStr;

async fn fresh_pool_with_fks() -> SqlitePool {
    let opts = SqliteConnectOptions::from_str("sqlite::memory:")
        .expect("memory url")
        .foreign_keys(true);
    let pool = SqlitePoolOptions::new()
        .max_connections(1)
        .connect_with(opts)
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

async fn count(pool: &SqlitePool, table: &str, deployment_id: &str) -> i64 {
    let sql = format!("SELECT COUNT(*) FROM {table} WHERE deployment_id = ?");
    sqlx::query_scalar::<_, i64>(&sql)
        .bind(deployment_id)
        .fetch_one(pool)
        .await
        .expect("count")
}

#[tokio::test]
async fn deleting_deployment_cascades_to_voice_assets() {
    let pool = fresh_pool_with_fks().await;

    sqlx::query(
        "INSERT INTO ext_emotion_tts__deployments
            (deployment_id, host_extension_instance_ref, display_name, created_at, updated_at)
         VALUES ('dep_cascade_a', 'host:test', 'Cascade A', 0, 0)",
    )
    .execute(&pool)
    .await
    .expect("insert deployment");

    sqlx::query(
        "INSERT INTO ext_emotion_tts__voice_assets
            (voice_asset_id, deployment_id, display_name, kind,
             audio_artifact_ref, content_sha256, source_type,
             created_at, updated_at)
         VALUES ('va_cascade_a', 'dep_cascade_a', 'Voice', 'speaker',
                 'artifact://mem/x', 'deadbeef', 'upload', 0, 0)",
    )
    .execute(&pool)
    .await
    .expect("insert voice asset");

    assert_eq!(
        count(&pool, "ext_emotion_tts__voice_assets", "dep_cascade_a").await,
        1
    );

    sqlx::query("DELETE FROM ext_emotion_tts__deployments WHERE deployment_id = 'dep_cascade_a'")
        .execute(&pool)
        .await
        .expect("delete deployment");

    assert_eq!(
        count(&pool, "ext_emotion_tts__voice_assets", "dep_cascade_a").await,
        0,
        "voice assets must be deleted when their deployment is deleted",
    );
}

#[tokio::test]
#[allow(clippy::too_many_lines)]
async fn deleting_deployment_cascades_to_all_child_tables() {
    let pool = fresh_pool_with_fks().await;
    let dep = "dep_cascade_b";

    sqlx::query(
        "INSERT INTO ext_emotion_tts__deployments
            (deployment_id, host_extension_instance_ref, display_name, created_at, updated_at)
         VALUES (?, 'host:test', 'Cascade B', 0, 0)",
    )
    .bind(dep)
    .execute(&pool)
    .await
    .expect("insert deployment");

    sqlx::query(
        "INSERT INTO ext_emotion_tts__voice_assets
            (voice_asset_id, deployment_id, display_name, kind,
             audio_artifact_ref, content_sha256, source_type, created_at, updated_at)
         VALUES ('va_b', ?, 'V', 'speaker', 'artifact://x', 'aa', 'upload', 0, 0)",
    )
    .bind(dep)
    .execute(&pool)
    .await
    .expect("insert voice asset");

    sqlx::query(
        "INSERT INTO ext_emotion_tts__character_mappings
            (mapping_id, deployment_id, character_name, character_name_lower,
             speaker_voice_asset_id, created_at, updated_at)
         VALUES ('m_b', ?, 'Alice', 'alice', 'va_b', 0, 0)",
    )
    .bind(dep)
    .execute(&pool)
    .await
    .expect("insert mapping");

    sqlx::query(
        "INSERT INTO ext_emotion_tts__vector_presets
            (preset_id, deployment_id, preset_name, vector_json, created_at, updated_at)
         VALUES ('p_b', ?, 'Calm', '{}', 0, 0)",
    )
    .bind(dep)
    .execute(&pool)
    .await
    .expect("insert preset");

    sqlx::query(
        "INSERT INTO ext_emotion_tts__runs
            (run_id, deployment_id, kind, script_snapshot, generation_settings_json,
             output_format, extension_version, queued_at)
         VALUES ('r_b', ?, 'batch', '', '{}', 'wav', '0.1.0', 0)",
    )
    .bind(dep)
    .execute(&pool)
    .await
    .expect("insert run");

    sqlx::query(
        "INSERT INTO ext_emotion_tts__utterances
            (utterance_id, run_id, global_index, character_display, character_sanitised,
             character_index, text, source_line_number)
         VALUES ('u_b', 'r_b', 0, 'Alice', 'alice', 0, 'hello', 1)",
    )
    .execute(&pool)
    .await
    .expect("insert utterance");

    sqlx::query(
        "INSERT INTO ext_emotion_tts__export_history
            (export_id, deployment_id, zip_artifact_ref, output_format,
             utterance_count, created_at)
         VALUES ('e_b', ?, 'artifact://zip', 'wav', 0, 0)",
    )
    .bind(dep)
    .execute(&pool)
    .await
    .expect("insert export");

    sqlx::query(
        "INSERT INTO ext_emotion_tts__workflows
            (deployment_id, document_json, updated_at)
         VALUES (?, '{}', 0)",
    )
    .bind(dep)
    .execute(&pool)
    .await
    .expect("insert workflow");

    sqlx::query(
        "INSERT INTO ext_emotion_tts__synthesis_cache
            (content_hash, audio_artifact_ref, extension_version,
             runtime_version, model_version, size_bytes,
             hit_count, created_at, last_hit_at)
         VALUES ('0000000000000000000000000000000000000000000000000000000000000001', 'artifact://audio', '0.1.0',
                 'unknown-runtime', 'unknown-model-version', 0,
                 0, 0, 0)",
    )
    .execute(&pool)
    .await
    .expect("insert synthesis cache row");

    let utt_count = sqlx::query_scalar::<_, i64>(
        "SELECT COUNT(*) FROM ext_emotion_tts__utterances WHERE run_id = 'r_b'",
    )
    .fetch_one(&pool)
    .await
    .expect("count utterances");
    assert_eq!(utt_count, 1, "utterance seeded under run");

    sqlx::query("DELETE FROM ext_emotion_tts__deployments WHERE deployment_id = ?")
        .bind(dep)
        .execute(&pool)
        .await
        .expect("delete deployment");

    for table in [
        "ext_emotion_tts__voice_assets",
        "ext_emotion_tts__character_mappings",
        "ext_emotion_tts__vector_presets",
        "ext_emotion_tts__runs",
        "ext_emotion_tts__export_history",
        "ext_emotion_tts__workflows",
    ] {
        assert_eq!(
            count(&pool, table, dep).await,
            0,
            "{table} should cascade-delete when deployment is removed",
        );
    }

    let utt_count_after = sqlx::query_scalar::<_, i64>(
        "SELECT COUNT(*) FROM ext_emotion_tts__utterances WHERE run_id = 'r_b'",
    )
    .fetch_one(&pool)
    .await
    .expect("count utterances after");
    assert_eq!(
        utt_count_after, 0,
        "utterance should cascade-delete via runs when deployment is removed",
    );

    let cache_count_after = sqlx::query_scalar::<_, i64>(
        "SELECT COUNT(*) FROM ext_emotion_tts__synthesis_cache \
         WHERE content_hash = '0000000000000000000000000000000000000000000000000000000000000001'",
    )
    .fetch_one(&pool)
    .await
    .expect("count synthesis cache after");
    assert_eq!(
        cache_count_after, 1,
        "synthesis_cache rows have no deployment_id and MUST survive a \
         deployment delete (cross-deployment dedup is intentional, audit FR-isolation-7)",
    );
}
