use chrono::Utc;
use sqlx::SqlitePool;

use crate::domain::{ChainDigest, EditChain};
use crate::storage::audit_log_repo::{format_timestamp, AuditEntry, RepoResult};

const SQL_VOICE_ASSET_READ_CHAIN: &str =
    include_str!("../../../storage/queries/voice_asset_read_chain.sql");
const SQL_VOICE_ASSET_APPLY: &str =
    include_str!("../../../storage/queries/voice_asset_apply_chain.sql");
const SQL_VOICE_ASSET_CLEAR: &str =
    include_str!("../../../storage/queries/voice_asset_clear_chain.sql");
const SQL_UTTERANCE_READ_CHAIN: &str =
    include_str!("../../../storage/queries/utterance_read_chain.sql");
const SQL_UTTERANCE_APPLY: &str =
    include_str!("../../../storage/queries/utterance_apply_chain.sql");
const SQL_RUN_SET_EXPORT_STALE: &str =
    include_str!("../../../storage/queries/run_set_export_stale.sql");
const SQL_AUDIT_LOG_INSERT: &str = include_str!("../../../storage/queries/audit_log_insert.sql");

#[derive(Debug)]
pub enum CommitOutcome {
    Committed,
    StaleDigest { current: ChainDigest },
}

pub async fn commit_voice_asset_apply(
    pool: &SqlitePool,
    asset_id: &str,
    expected_digest: &ChainDigest,
    chain: &EditChain,
    derived_artifact_ref: &str,
    audit: &AuditEntry,
) -> RepoResult<CommitOutcome> {
    let chain_json = serde_json::to_string(chain).map_err(crate::domain::EmotionTtsError::from)?;
    let mut tx = pool.begin().await.map_err(map_sqlx)?;

    if let CommitOutcome::StaleDigest { current } =
        guard_voice_asset_digest(&mut tx, asset_id, expected_digest).await?
    {
        return Ok(CommitOutcome::StaleDigest { current });
    }

    sqlx::query(SQL_VOICE_ASSET_APPLY)
        .bind(&chain_json)
        .bind(derived_artifact_ref)
        .bind(asset_id)
        .execute(&mut *tx)
        .await
        .map_err(map_sqlx)?;
    bind_audit(&mut tx, audit).await?;
    tx.commit().await.map_err(map_sqlx)?;
    Ok(CommitOutcome::Committed)
}

pub async fn commit_voice_asset_clear(
    pool: &SqlitePool,
    asset_id: &str,
    expected_digest: &ChainDigest,
    audit: &AuditEntry,
) -> RepoResult<CommitOutcome> {
    let mut tx = pool.begin().await.map_err(map_sqlx)?;

    if let CommitOutcome::StaleDigest { current } =
        guard_voice_asset_digest(&mut tx, asset_id, expected_digest).await?
    {
        return Ok(CommitOutcome::StaleDigest { current });
    }

    sqlx::query(SQL_VOICE_ASSET_CLEAR)
        .bind(asset_id)
        .execute(&mut *tx)
        .await
        .map_err(map_sqlx)?;
    bind_audit(&mut tx, audit).await?;
    tx.commit().await.map_err(map_sqlx)?;
    Ok(CommitOutcome::Committed)
}

pub async fn commit_utterance_apply(
    pool: &SqlitePool,
    utterance_id: &str,
    run_id: &str,
    expected_digest: &ChainDigest,
    chain: &EditChain,
    derived_artifact_ref: &str,
    audit: &AuditEntry,
) -> RepoResult<CommitOutcome> {
    let chain_json = serde_json::to_string(chain).map_err(crate::domain::EmotionTtsError::from)?;
    let now = Utc::now().timestamp();
    let mut tx = pool.begin().await.map_err(map_sqlx)?;

    if let CommitOutcome::StaleDigest { current } =
        guard_utterance_digest(&mut tx, utterance_id, expected_digest).await?
    {
        return Ok(CommitOutcome::StaleDigest { current });
    }

    sqlx::query(SQL_UTTERANCE_APPLY)
        .bind(&chain_json)
        .bind(derived_artifact_ref)
        .bind(utterance_id)
        .execute(&mut *tx)
        .await
        .map_err(map_sqlx)?;
    sqlx::query(SQL_RUN_SET_EXPORT_STALE)
        .bind(now)
        .bind(run_id)
        .execute(&mut *tx)
        .await
        .map_err(map_sqlx)?;
    bind_audit(&mut tx, audit).await?;
    tx.commit().await.map_err(map_sqlx)?;
    Ok(CommitOutcome::Committed)
}

#[must_use]
#[allow(clippy::too_many_arguments)]
pub fn build_audit_entry(
    entry_id: String,
    deployment_id: crate::domain::DeploymentId,
    target_id: String,
    target_kind: crate::storage::audit_log_repo::TargetKind,
    digest_before: ChainDigest,
    digest_after: ChainDigest,
    operation_count: u16,
    actor: String,
    chain_snapshot_json: Option<String>,
) -> AuditEntry {
    AuditEntry {
        entry_id,
        deployment_id,
        target_id,
        target_kind,
        digest_before,
        digest_after,
        operation_count,
        recorded_at: Utc::now(),
        actor,
        chain_snapshot_json,
    }
}

async fn guard_voice_asset_digest(
    tx: &mut sqlx::Transaction<'_, sqlx::Sqlite>,
    asset_id: &str,
    expected: &ChainDigest,
) -> RepoResult<CommitOutcome> {
    let raw: Option<Option<String>> = sqlx::query_scalar(SQL_VOICE_ASSET_READ_CHAIN)
        .bind(asset_id)
        .fetch_optional(&mut **tx)
        .await
        .map_err(map_sqlx)?;
    digest_outcome(raw.flatten(), expected)
}

async fn guard_utterance_digest(
    tx: &mut sqlx::Transaction<'_, sqlx::Sqlite>,
    utterance_id: &str,
    expected: &ChainDigest,
) -> RepoResult<CommitOutcome> {
    let raw: Option<Option<String>> = sqlx::query_scalar(SQL_UTTERANCE_READ_CHAIN)
        .bind(utterance_id)
        .fetch_optional(&mut **tx)
        .await
        .map_err(map_sqlx)?;
    digest_outcome(raw.flatten(), expected)
}

fn digest_outcome(raw: Option<String>, expected: &ChainDigest) -> RepoResult<CommitOutcome> {
    let current = match raw {
        None => ChainDigest::EMPTY,
        Some(json) => {
            let chain: EditChain =
                serde_json::from_str(&json).map_err(crate::domain::EmotionTtsError::from)?;
            ChainDigest::of(&chain)
        }
    };
    if current == *expected {
        Ok(CommitOutcome::Committed)
    } else {
        Ok(CommitOutcome::StaleDigest { current })
    }
}

async fn bind_audit(
    tx: &mut sqlx::Transaction<'_, sqlx::Sqlite>,
    audit: &AuditEntry,
) -> RepoResult<()> {
    sqlx::query(SQL_AUDIT_LOG_INSERT)
        .bind(&audit.entry_id)
        .bind(audit.deployment_id.as_str())
        .bind(&audit.target_id)
        .bind(audit.target_kind.as_str())
        .bind(audit.digest_before.as_str())
        .bind(audit.digest_after.as_str())
        .bind(i64::from(audit.operation_count))
        .bind(format_timestamp(audit.recorded_at))
        .bind(&audit.actor)
        .bind(audit.chain_snapshot_json.as_deref())
        .execute(&mut **tx)
        .await
        .map_err(map_sqlx)?;
    Ok(())
}

fn map_sqlx(err: sqlx::Error) -> crate::domain::EmotionTtsError {
    err.into()
}
