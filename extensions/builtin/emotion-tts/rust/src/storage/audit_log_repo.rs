//! Spec 036 — append-only audit log for audio-edit chain transitions.
//!
//! Every chain apply / clear / op-removal records one row capturing the
//! `before → after` digest pair, the operation count after the transition,
//! and the actor (currently always `"system"` until auth lands per FR-029).
//!
//! Soft FK to `deployment_id` only (Constitution Appendix G); rows survive
//! target deletion (FR-030 edge case) so historical edits remain queryable.

use async_trait::async_trait;
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::{Row, SqlitePool};

use crate::domain::{ChainDigest, DeploymentId, EmotionTtsError};

pub type RepoResult<T> = Result<T, EmotionTtsError>;

/// Placeholder actor for audit entries until host auth is wired (FR-029). Used
/// by every Phase 3+ callsite so the eventual auth migration is a single
/// constant change rather than a sweep.
pub const SYSTEM_ACTOR: &str = "system";

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
#[non_exhaustive]
pub enum TargetKind {
    VoiceAsset,
    Utterance,
}

impl TargetKind {
    #[must_use]
    pub const fn as_str(&self) -> &'static str {
        match self {
            Self::VoiceAsset => "voice_asset",
            Self::Utterance => "utterance",
        }
    }

    pub fn parse(value: &str) -> RepoResult<Self> {
        match value {
            "voice_asset" => Ok(Self::VoiceAsset),
            "utterance" => Ok(Self::Utterance),
            other => Err(EmotionTtsError::validation(format!(
                "unknown audit target_kind {other:?}"
            ))),
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct AuditEntry {
    pub entry_id: String,
    pub deployment_id: DeploymentId,
    pub target_id: String,
    pub target_kind: TargetKind,
    pub digest_before: ChainDigest,
    pub digest_after: ChainDigest,
    pub operation_count: u16,
    pub recorded_at: DateTime<Utc>,
    pub actor: String,
}

#[async_trait]
pub trait AuditLogRepo: Send + Sync {
    async fn append(&self, entry: &AuditEntry) -> RepoResult<()>;
    async fn list_for_target(
        &self,
        deployment_id: &DeploymentId,
        target_kind: TargetKind,
        target_id: &str,
        limit: u32,
    ) -> RepoResult<Vec<AuditEntry>>;
}

pub struct SqliteAuditLogRepo {
    pool: SqlitePool,
}

impl SqliteAuditLogRepo {
    #[must_use]
    pub const fn new(pool: SqlitePool) -> Self {
        Self { pool }
    }
}

fn to_err(e: sqlx::Error) -> EmotionTtsError {
    e.into()
}

const RECORDED_AT_FORMAT: &str = "%Y-%m-%dT%H:%M:%S%.3fZ";

fn format_timestamp(ts: DateTime<Utc>) -> String {
    ts.format(RECORDED_AT_FORMAT).to_string()
}

fn parse_timestamp(raw: &str) -> RepoResult<DateTime<Utc>> {
    DateTime::parse_from_rfc3339(raw)
        .map(|dt| dt.with_timezone(&Utc))
        .map_err(|e| EmotionTtsError::internal(format!("invalid recorded_at {raw:?}: {e}")))
}

fn map_row(row: &sqlx::sqlite::SqliteRow) -> RepoResult<AuditEntry> {
    let entry_id: String = row.try_get("entry_id").map_err(to_err)?;
    let deployment_id: String = row.try_get("deployment_id").map_err(to_err)?;
    let target_id: String = row.try_get("target_id").map_err(to_err)?;
    let target_kind_raw: String = row.try_get("target_kind").map_err(to_err)?;
    let digest_before: String = row.try_get("digest_before").map_err(to_err)?;
    let digest_after: String = row.try_get("digest_after").map_err(to_err)?;
    let op_count: i64 = row.try_get("operation_count").map_err(to_err)?;
    let recorded_at_raw: String = row.try_get("recorded_at").map_err(to_err)?;
    let actor: String = row.try_get("actor").map_err(to_err)?;

    Ok(AuditEntry {
        entry_id,
        deployment_id: DeploymentId::try_from(deployment_id.as_str())?,
        target_id,
        target_kind: TargetKind::parse(target_kind_raw.as_str())?,
        digest_before: parse_digest(digest_before.as_str())?,
        digest_after: parse_digest(digest_after.as_str())?,
        operation_count: u16::try_from(op_count).map_err(|_| {
            EmotionTtsError::internal(format!("operation_count out of range: {op_count}"))
        })?,
        recorded_at: parse_timestamp(recorded_at_raw.as_str())?,
        actor,
    })
}

fn parse_digest(value: &str) -> RepoResult<ChainDigest> {
    if value.len() != 64 || !value.chars().all(|c| c.is_ascii_hexdigit() && !c.is_ascii_uppercase())
    {
        return Err(EmotionTtsError::internal(format!(
            "invalid digest {value:?} stored in audit log"
        )));
    }
    Ok(ChainDigest::from_validated_hex(value.to_owned()))
}

#[async_trait]
impl AuditLogRepo for SqliteAuditLogRepo {
    async fn append(&self, entry: &AuditEntry) -> RepoResult<()> {
        sqlx::query(
            "INSERT INTO ext_emotion_tts__audio_edit_log \
             (entry_id, deployment_id, target_id, target_kind, digest_before, digest_after, \
              operation_count, recorded_at, actor) \
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        )
        .bind(&entry.entry_id)
        .bind(entry.deployment_id.as_str())
        .bind(&entry.target_id)
        .bind(entry.target_kind.as_str())
        .bind(entry.digest_before.as_str())
        .bind(entry.digest_after.as_str())
        .bind(i64::from(entry.operation_count))
        .bind(format_timestamp(entry.recorded_at))
        .bind(&entry.actor)
        .execute(&self.pool)
        .await
        .map_err(to_err)?;
        Ok(())
    }

    async fn list_for_target(
        &self,
        deployment_id: &DeploymentId,
        target_kind: TargetKind,
        target_id: &str,
        limit: u32,
    ) -> RepoResult<Vec<AuditEntry>> {
        let rows = sqlx::query(
            "SELECT entry_id, deployment_id, target_id, target_kind, digest_before, digest_after, \
                    operation_count, recorded_at, actor \
             FROM ext_emotion_tts__audio_edit_log \
             WHERE deployment_id = ? AND target_kind = ? AND target_id = ? \
             ORDER BY recorded_at DESC, entry_id DESC \
             LIMIT ?",
        )
        .bind(deployment_id.as_str())
        .bind(target_kind.as_str())
        .bind(target_id)
        .bind(i64::from(limit))
        .fetch_all(&self.pool)
        .await
        .map_err(to_err)?;
        rows.iter().map(map_row).collect()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn target_kind_round_trip() {
        assert_eq!(
            TargetKind::parse(TargetKind::VoiceAsset.as_str()).unwrap(),
            TargetKind::VoiceAsset
        );
        assert_eq!(
            TargetKind::parse(TargetKind::Utterance.as_str()).unwrap(),
            TargetKind::Utterance
        );
    }

    #[test]
    fn target_kind_rejects_unknown() {
        assert!(TargetKind::parse("not_a_kind").is_err());
    }

    #[test]
    fn timestamp_round_trip_preserves_millisecond_precision() {
        let now = Utc::now();
        let formatted = format_timestamp(now);
        let parsed = parse_timestamp(formatted.as_str()).unwrap();
        let delta = (now - parsed).num_milliseconds().abs();
        assert!(delta < 2, "round-trip drift {delta} ms");
    }
}
