use chrono::Utc;
use emotion_tts_extension::domain::{ChainDigest, DeploymentId, EditChain, EditOp, OperationId};
use emotion_tts_extension::storage::audio_edit_atomic::{
    build_audit_entry, commit_voice_asset_apply, CommitOutcome,
};
use emotion_tts_extension::storage::audit_log_repo::TargetKind;
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

async fn insert_voice_asset(pool: &SqlitePool, dep: &DeploymentId, asset_id: &str) {
    let now = Utc::now().timestamp();
    sqlx::query(
        "INSERT INTO ext_emotion_tts__deployments (\
            deployment_id, host_extension_instance_ref, display_name, \
            backend_runtime_preference, default_output_format, default_speed_factor, \
            default_generation_overrides_json, reference_preprocess_enabled, \
            oas_enabled, compile_gpt_enabled, model_family, oas_samples_seen, \
            created_at, updated_at\
         ) VALUES (?, ?, ?, NULL, ?, 1.0, '{}', 1, 1, 0, ?, 0, ?, ?)",
    )
    .bind(dep.as_str())
    .bind("instance_atomicity")
    .bind("test-deployment")
    .bind("mp3")
    .bind("indextts-2")
    .bind(now)
    .bind(now)
    .execute(pool)
    .await
    .expect("seed deployment");

    sqlx::query(
        "INSERT INTO ext_emotion_tts__voice_assets (\
            voice_asset_id, deployment_id, display_name, kind, audio_artifact_ref, \
            content_sha256, source_type, is_active, created_at, updated_at\
         ) VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?)",
    )
    .bind(asset_id)
    .bind(dep.as_str())
    .bind("test-asset")
    .bind("speaker")
    .bind("artifact://mem/source")
    .bind("a".repeat(64))
    .bind("upload")
    .bind(now)
    .bind(now)
    .execute(pool)
    .await
    .expect("seed voice asset");
}

async fn read_persisted_chain_json(pool: &SqlitePool, asset_id: &str) -> Option<String> {
    let row: Option<Option<String>> = sqlx::query_scalar(
        "SELECT edit_chain_json FROM ext_emotion_tts__voice_assets WHERE voice_asset_id = ?",
    )
    .bind(asset_id)
    .fetch_optional(pool)
    .await
    .expect("read chain");
    row.flatten()
}

async fn read_persisted_derived_ref(pool: &SqlitePool, asset_id: &str) -> Option<String> {
    let row: Option<Option<String>> = sqlx::query_scalar(
        "SELECT derived_artifact_ref FROM ext_emotion_tts__voice_assets WHERE voice_asset_id = ?",
    )
    .bind(asset_id)
    .fetch_optional(pool)
    .await
    .expect("read derived");
    row.flatten()
}

async fn count_audit_entries(pool: &SqlitePool, target_id: &str) -> i64 {
    sqlx::query_scalar::<_, i64>(
        "SELECT COUNT(*) FROM ext_emotion_tts__audio_edit_log WHERE target_id = ?",
    )
    .bind(target_id)
    .fetch_one(pool)
    .await
    .expect("count audit")
}

fn sample_chain() -> EditChain {
    EditChain {
        version: 1,
        ops: vec![EditOp::Trim {
            id: OperationId::new(),
            start_ms: 0,
            end_ms: 1_000,
        }],
    }
}

#[tokio::test]
async fn audit_failure_rolls_back_chain_write() {
    let pool = fresh_pool().await;
    let _repos = Repos::from_pool(pool.clone());
    let dep = DeploymentId::new();
    let asset_id = "va_atomicity_check_01";
    insert_voice_asset(&pool, &dep, asset_id).await;

    let collision_entry_id = ulid::Ulid::new().to_string();
    let chain = sample_chain();
    let new_digest = ChainDigest::of(&chain);

    let first_audit = build_audit_entry(
        collision_entry_id.clone(),
        dep.clone(),
        asset_id.to_string(),
        TargetKind::VoiceAsset,
        ChainDigest::EMPTY,
        new_digest.clone(),
        chain.operation_count(),
        "system".to_string(),
    );
    let outcome = commit_voice_asset_apply(
        &pool,
        asset_id,
        &ChainDigest::EMPTY,
        &chain,
        "artifact://mem/derived/v1",
        &first_audit,
    )
    .await
    .expect("first apply");
    assert!(matches!(outcome, CommitOutcome::Committed));
    assert_eq!(count_audit_entries(&pool, asset_id).await, 1);

    let second_chain = EditChain {
        version: 1,
        ops: vec![
            EditOp::Trim {
                id: OperationId::new(),
                start_ms: 100,
                end_ms: 2_000,
            },
            EditOp::Normalize {
                id: OperationId::new(),
                target_lufs: -16.0,
            },
        ],
    };
    let second_digest = ChainDigest::of(&second_chain);

    let colliding_audit = build_audit_entry(
        collision_entry_id,
        dep.clone(),
        asset_id.to_string(),
        TargetKind::VoiceAsset,
        new_digest.clone(),
        second_digest.clone(),
        second_chain.operation_count(),
        "system".to_string(),
    );

    let pre_chain_json = read_persisted_chain_json(&pool, asset_id).await;
    let pre_derived_ref = read_persisted_derived_ref(&pool, asset_id).await;
    let pre_audit_count = count_audit_entries(&pool, asset_id).await;

    let result = commit_voice_asset_apply(
        &pool,
        asset_id,
        &new_digest,
        &second_chain,
        "artifact://mem/derived/v2",
        &colliding_audit,
    )
    .await;

    assert!(
        result.is_err(),
        "duplicate audit entry_id must surface as a transaction error, not silently committed"
    );

    let post_chain_json = read_persisted_chain_json(&pool, asset_id).await;
    let post_derived_ref = read_persisted_derived_ref(&pool, asset_id).await;
    let post_audit_count = count_audit_entries(&pool, asset_id).await;

    assert_eq!(
        pre_chain_json, post_chain_json,
        "chain JSON MUST roll back when the audit append fails"
    );
    assert_eq!(
        pre_derived_ref, post_derived_ref,
        "derived ref MUST roll back when the audit append fails"
    );
    assert_eq!(
        pre_audit_count, post_audit_count,
        "audit count MUST be unchanged when the transaction rolls back"
    );

    let recovery_audit = build_audit_entry(
        ulid::Ulid::new().to_string(),
        dep.clone(),
        asset_id.to_string(),
        TargetKind::VoiceAsset,
        new_digest.clone(),
        second_digest.clone(),
        second_chain.operation_count(),
        "system".to_string(),
    );
    let outcome = commit_voice_asset_apply(
        &pool,
        asset_id,
        &new_digest,
        &second_chain,
        "artifact://mem/derived/v2-retry",
        &recovery_audit,
    )
    .await
    .expect("recovery apply");
    assert!(matches!(outcome, CommitOutcome::Committed));
    assert_eq!(count_audit_entries(&pool, asset_id).await, 2);
    assert_eq!(
        read_persisted_derived_ref(&pool, asset_id).await,
        Some("artifact://mem/derived/v2-retry".to_string())
    );
}

#[tokio::test]
async fn cas_guard_returns_stale_digest_when_persisted_state_changed() {
    let pool = fresh_pool().await;
    let _repos = Repos::from_pool(pool.clone());
    let dep = DeploymentId::new();
    let asset_id = "va_cas_guard_01";
    insert_voice_asset(&pool, &dep, asset_id).await;

    let chain_v1 = sample_chain();
    let digest_v1 = ChainDigest::of(&chain_v1);
    let audit_v1 = build_audit_entry(
        ulid::Ulid::new().to_string(),
        dep.clone(),
        asset_id.to_string(),
        TargetKind::VoiceAsset,
        ChainDigest::EMPTY,
        digest_v1.clone(),
        chain_v1.operation_count(),
        "system".to_string(),
    );
    commit_voice_asset_apply(
        &pool,
        asset_id,
        &ChainDigest::EMPTY,
        &chain_v1,
        "artifact://mem/derived/v1",
        &audit_v1,
    )
    .await
    .expect("apply v1");

    let chain_v2 = EditChain {
        version: 1,
        ops: vec![EditOp::FadeIn {
            id: OperationId::new(),
            duration_ms: 250,
        }],
    };
    let digest_v2 = ChainDigest::of(&chain_v2);
    let audit_v2 = build_audit_entry(
        ulid::Ulid::new().to_string(),
        dep.clone(),
        asset_id.to_string(),
        TargetKind::VoiceAsset,
        ChainDigest::EMPTY,
        digest_v2.clone(),
        chain_v2.operation_count(),
        "system".to_string(),
    );
    let outcome = commit_voice_asset_apply(
        &pool,
        asset_id,
        &ChainDigest::EMPTY,
        &chain_v2,
        "artifact://mem/derived/v2",
        &audit_v2,
    )
    .await
    .expect("v2 apply call");

    match outcome {
        CommitOutcome::StaleDigest { current } => {
            assert_eq!(current, digest_v1, "current digest reflects v1");
        }
        CommitOutcome::Committed => panic!("CAS must reject when expected_digest is stale"),
    }

    let post_chain_json = read_persisted_chain_json(&pool, asset_id).await;
    assert!(
        post_chain_json.unwrap().contains("\"trim\""),
        "chain MUST stay at v1 (trim) when CAS rejects the v2 commit"
    );
    assert_eq!(count_audit_entries(&pool, asset_id).await, 1);
}
