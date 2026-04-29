//! T066 — spec 036 / US5 contract for `GET /audit/{target_kind}/{target_id}`.
//!
//! Covers:
//!   * happy-path list returns 200 with reverse-chronological entries
//!   * cross-deployment access returns 404 (FR-016 / SC-008)
//!   * `?limit=` clamps the result count
//!   * 4-entry sequence (3 applies + 1 clear) returns the correct digest pairs
//!   * audit entries persist past target deletion (FR-030)

use axum::body::{to_bytes, Body};
use axum::http::{Method, Request, StatusCode};
use chrono::Utc;
use emotion_tts_extension::domain::{ChainDigest, DeploymentId, EditChain, EditOp, OperationId, VoiceAssetId};
use emotion_tts_extension::router::build_router;
use emotion_tts_extension::storage::audit_log_repo::{AuditEntry, TargetKind};
use emotion_tts_extension::storage::repo_traits::{DeploymentRow, VoiceAssetRow};
use emotion_tts_extension::storage::Repos;
use emotion_tts_extension::queue::RuntimeQueue;
use emotion_tts_extension::MIGRATIONS;
use serde_json::Value;
use sqlx::sqlite::SqlitePoolOptions;
use sqlx::SqlitePool;
use std::sync::Arc;
use tower::ServiceExt;

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

async fn seed_deployment(repos: &Repos, name: &str) -> DeploymentId {
    let id = DeploymentId::new();
    let now = Utc::now().timestamp();
    repos
        .deployments
        .insert(&DeploymentRow {
            deployment_id: id.clone(),
            host_extension_instance_ref: "instance_01".into(),
            display_name: name.into(),
            backend_runtime_preference: Some("indextts.python".into()),
            default_output_format: "mp3".into(),
            default_speed_factor: 1.0,
            default_generation_overrides_json: "{}".into(),
            most_recent_run_id: None,
            partial_run_id: None,
            reference_preprocess_enabled: true,
            oas_enabled: true,
            compile_gpt_enabled: false,
            model_family: "indextts-2".into(),
            oas_threshold_learned: None,
            oas_samples_seen: 0,
            default_voice_asset_id: None,
            created_at: now,
            updated_at: now,
        })
        .await
        .unwrap();
    id
}

async fn seed_voice_asset(repos: &Repos, dep: &DeploymentId, name: &str) -> VoiceAssetId {
    let id = VoiceAssetId::new();
    let now = Utc::now().timestamp();
    repos
        .voice_assets
        .insert(&VoiceAssetRow {
            voice_asset_id: id.clone(),
            deployment_id: dep.clone(),
            display_name: name.into(),
            kind: "speaker".into(),
            audio_artifact_ref: format!("artifact://mem/source/{name}"),
            content_sha256: "a".repeat(64),
            reference_text: None,
            sample_rate: Some(24_000),
            duration_ms: Some(2_000),
            source_type: "upload".into(),
            notes: None,
            is_active: true,
            preprocessed_artifact_ref: None,
            preprocessing_report_json: None,
            edit_chain_json: None,
            derived_artifact_ref: None,
            created_at: now,
            updated_at: now,
        })
        .await
        .unwrap();
    id
}

fn one_op_chain() -> EditChain {
    EditChain {
        version: 1,
        ops: vec![EditOp::Trim {
            id: OperationId::new(),
            start_ms: 0,
            end_ms: 1_000,
        }],
    }
}

fn two_op_chain() -> EditChain {
    EditChain {
        version: 1,
        ops: vec![
            EditOp::Trim {
                id: OperationId::new(),
                start_ms: 0,
                end_ms: 1_000,
            },
            EditOp::Normalize {
                id: OperationId::new(),
                target_lufs: -16.0,
            },
        ],
    }
}

fn three_op_chain() -> EditChain {
    EditChain {
        version: 1,
        ops: vec![
            EditOp::Trim {
                id: OperationId::new(),
                start_ms: 0,
                end_ms: 1_000,
            },
            EditOp::Normalize {
                id: OperationId::new(),
                target_lufs: -16.0,
            },
            EditOp::FadeOut {
                id: OperationId::new(),
                duration_ms: 250,
            },
        ],
    }
}

fn entry(
    deployment_id: &DeploymentId,
    target_id: &str,
    digest_before: ChainDigest,
    digest_after: ChainDigest,
    operation_count: u16,
    offset_ms: i64,
) -> AuditEntry {
    AuditEntry {
        entry_id: ulid::Ulid::new().to_string(),
        deployment_id: deployment_id.clone(),
        target_id: target_id.to_string(),
        target_kind: TargetKind::VoiceAsset,
        digest_before,
        digest_after,
        operation_count,
        recorded_at: Utc::now() + chrono::Duration::milliseconds(offset_ms),
        actor: "system".into(),
    }
}

async fn build_test_router() -> (axum::Router, Repos, DeploymentId, DeploymentId, VoiceAssetId) {
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);
    let queue = Arc::new(RuntimeQueue::new());
    let router = build_router(repos.clone(), queue, "0.0.0-test", None, None);
    let dep_a = seed_deployment(&repos, "Deployment A").await;
    let dep_b = seed_deployment(&repos, "Deployment B").await;
    let asset = seed_voice_asset(&repos, &dep_a, "alice_voice").await;
    (router, repos, dep_a, dep_b, asset)
}

async fn parse_body(resp: axum::response::Response) -> (StatusCode, Value) {
    let status = resp.status();
    let bytes = to_bytes(resp.into_body(), usize::MAX).await.unwrap();
    let body: Value = serde_json::from_slice(&bytes).unwrap_or(Value::Null);
    (status, body)
}

async fn audit_request(
    router: &axum::Router,
    asset: &VoiceAssetId,
    dep: &DeploymentId,
    extra: &str,
) -> (StatusCode, Value) {
    let req = Request::builder()
        .method(Method::GET)
        .uri(format!(
            "/audit/voice_asset/{asset}?deploymentId={dep}{extra}",
            asset = asset.as_str(),
            dep = dep.as_str()
        ))
        .body(Body::empty())
        .unwrap();
    parse_body(router.clone().oneshot(req).await.unwrap()).await
}

#[tokio::test]
async fn audit_lookup_returns_entries_in_reverse_chronological_order() {
    let (router, repos, dep_a, _dep_b, asset) = build_test_router().await;

    let d_empty = ChainDigest::EMPTY.clone();
    let d1 = ChainDigest::of(&one_op_chain());
    let d2 = ChainDigest::of(&two_op_chain());
    let d3 = ChainDigest::of(&three_op_chain());

    repos
        .audio_edit_log
        .append(&entry(&dep_a, asset.as_str(), d_empty.clone(), d1.clone(), 1, 0))
        .await
        .unwrap();
    repos
        .audio_edit_log
        .append(&entry(&dep_a, asset.as_str(), d1.clone(), d2.clone(), 2, 1_000))
        .await
        .unwrap();
    repos
        .audio_edit_log
        .append(&entry(&dep_a, asset.as_str(), d2.clone(), d3.clone(), 3, 2_000))
        .await
        .unwrap();
    repos
        .audio_edit_log
        .append(&entry(
            &dep_a,
            asset.as_str(),
            d3.clone(),
            d_empty.clone(),
            0,
            3_000,
        ))
        .await
        .unwrap();

    let (status, body) = audit_request(&router, &asset, &dep_a, "").await;
    assert_eq!(status, StatusCode::OK, "body: {body}");

    let entries = body["entries"].as_array().expect("entries array");
    assert_eq!(entries.len(), 4);
    assert_eq!(entries[0]["operation_count"], 0);
    assert_eq!(entries[0]["digest_after"], d_empty.as_str());
    assert_eq!(entries[0]["digest_before"], d3.as_str());
    assert_eq!(entries[1]["digest_after"], d3.as_str());
    assert_eq!(entries[2]["digest_after"], d2.as_str());
    assert_eq!(entries[3]["digest_after"], d1.as_str());

    let first = &entries[0];
    assert!(first["entry_id"].as_str().is_some());
    assert_eq!(first["target_id"], asset.as_str());
    assert_eq!(first["target_kind"], "voice_asset");
    assert_eq!(first["actor"], "system");
    assert!(first["recorded_at"].as_str().is_some());
}

#[tokio::test]
async fn audit_lookup_cross_deployment_returns_404() {
    let (router, repos, dep_a, dep_b, asset) = build_test_router().await;
    let d1 = ChainDigest::of(&one_op_chain());
    repos
        .audio_edit_log
        .append(&entry(
            &dep_a,
            asset.as_str(),
            ChainDigest::EMPTY.clone(),
            d1,
            1,
            0,
        ))
        .await
        .unwrap();

    let (status, _body) = audit_request(&router, &asset, &dep_b, "").await;
    assert_eq!(
        status,
        StatusCode::NOT_FOUND,
        "cross-deployment audit lookup must 404 (never 403) — FR-016"
    );
}

#[tokio::test]
async fn audit_lookup_respects_limit_query_param() {
    let (router, repos, dep_a, _dep_b, asset) = build_test_router().await;
    let d_empty = ChainDigest::EMPTY.clone();
    let d1 = ChainDigest::of(&one_op_chain());
    let d2 = ChainDigest::of(&two_op_chain());
    let d3 = ChainDigest::of(&three_op_chain());

    repos
        .audio_edit_log
        .append(&entry(&dep_a, asset.as_str(), d_empty.clone(), d1.clone(), 1, 0))
        .await
        .unwrap();
    repos
        .audio_edit_log
        .append(&entry(&dep_a, asset.as_str(), d1.clone(), d2.clone(), 2, 1_000))
        .await
        .unwrap();
    repos
        .audio_edit_log
        .append(&entry(&dep_a, asset.as_str(), d2.clone(), d3.clone(), 3, 2_000))
        .await
        .unwrap();

    let (status, body) = audit_request(&router, &asset, &dep_a, "&limit=2").await;
    assert_eq!(status, StatusCode::OK);
    assert_eq!(body["entries"].as_array().unwrap().len(), 2);
}

#[tokio::test]
async fn audit_lookup_404s_when_target_row_missing_even_if_log_entries_exist() {
    let (router, repos, dep_a, _dep_b, _asset) = build_test_router().await;
    let orphan_id = VoiceAssetId::new();

    let d1 = ChainDigest::of(&one_op_chain());
    repos
        .audio_edit_log
        .append(&entry(
            &dep_a,
            orphan_id.as_str(),
            ChainDigest::EMPTY.clone(),
            d1,
            1,
            0,
        ))
        .await
        .unwrap();

    let (status, _body) = audit_request(&router, &orphan_id, &dep_a, "").await;
    assert_eq!(
        status,
        StatusCode::NOT_FOUND,
        "scope guard fires before the log query: when the voice-asset row is gone, \
         the endpoint cannot confirm deployment membership and returns 404 — \
         entries persist at the storage layer per FR-030 \
         (see audio_edit_audit_log_sequence_test::audit_log_survives_target_deletion) \
         but are not exposed via the public HTTP surface after target deletion"
    );
}

#[tokio::test]
async fn audit_lookup_unknown_target_kind_returns_400() {
    let (router, _repos, dep_a, _dep_b, asset) = build_test_router().await;
    let req = Request::builder()
        .method(Method::GET)
        .uri(format!(
            "/audit/not_a_kind/{}?deploymentId={}",
            asset.as_str(),
            dep_a.as_str()
        ))
        .body(Body::empty())
        .unwrap();
    let resp = router.oneshot(req).await.unwrap();
    assert_eq!(resp.status(), StatusCode::BAD_REQUEST);
}
