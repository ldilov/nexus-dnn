use chrono::Utc;
use emotion_tts_extension::domain::{ChainDigest, DeploymentId, EditChain, EditOp, OperationId};
use emotion_tts_extension::storage::audit_log_repo::{
    AuditEntry, AuditLogRepo, SqliteAuditLogRepo, TargetKind,
};
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

#[tokio::test]
async fn audit_log_returns_entries_in_reverse_chronological_order() {
    let pool = fresh_pool().await;
    let repo = SqliteAuditLogRepo::new(pool);
    let dep = DeploymentId::new();
    let target = "va_01ARZ3NDEKTSV4RRFFQ69G5FA1";

    let d_empty = ChainDigest::EMPTY.clone();
    let d1 = ChainDigest::of(&one_op_chain());
    let d2 = ChainDigest::of(&two_op_chain());
    let d3 = ChainDigest::of(&three_op_chain());

    repo.append(&entry(&dep, target, d_empty.clone(), d1.clone(), 1, 0))
        .await
        .expect("append 1");
    repo.append(&entry(&dep, target, d1.clone(), d2.clone(), 2, 1_000))
        .await
        .expect("append 2");
    repo.append(&entry(&dep, target, d2.clone(), d3.clone(), 3, 2_000))
        .await
        .expect("append 3");
    repo.append(&entry(
        &dep,
        target,
        d3.clone(),
        d_empty.clone(),
        0,
        3_000,
    ))
    .await
    .expect("append clear");

    let listed = repo
        .list_for_target(&dep, TargetKind::VoiceAsset, target, 10)
        .await
        .expect("list");

    assert_eq!(listed.len(), 4, "expected 4 audit entries");
    assert_eq!(listed[0].operation_count, 0);
    assert_eq!(listed[0].digest_after, d_empty);
    assert_eq!(listed[0].digest_before, d3);
    assert_eq!(listed[1].digest_after, d3);
    assert_eq!(listed[1].digest_before, d2);
    assert_eq!(listed[2].digest_after, d2);
    assert_eq!(listed[2].digest_before, d1);
    assert_eq!(listed[3].digest_after, d1);
    assert_eq!(listed[3].digest_before, d_empty);
}

#[tokio::test]
async fn audit_log_survives_target_deletion() {
    let pool = fresh_pool().await;
    let repo = SqliteAuditLogRepo::new(pool);
    let dep = DeploymentId::new();
    let target = "va_orphaned_target_id";

    let d1 = ChainDigest::of(&one_op_chain());
    repo.append(&entry(
        &dep,
        target,
        ChainDigest::EMPTY.clone(),
        d1.clone(),
        1,
        0,
    ))
    .await
    .expect("append");

    let listed = repo
        .list_for_target(&dep, TargetKind::VoiceAsset, target, 10)
        .await
        .expect("list");
    assert_eq!(listed.len(), 1);
    assert_eq!(listed[0].digest_after, d1);
}
