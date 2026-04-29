use async_trait::async_trait;
use sqlx::{Row, SqlitePool};

use crate::domain::{EditChain, EmotionTtsError, MappingId, RunId, UtteranceId, VoiceAssetId};
use crate::storage::repo_traits::{RepoResult, UtteranceRow, UtterancesRepo};

pub struct SqliteUtterancesRepo {
    pool: SqlitePool,
}

impl SqliteUtterancesRepo {
    #[must_use]
    pub const fn new(pool: SqlitePool) -> Self {
        Self { pool }
    }
}

fn to_err(e: sqlx::Error) -> EmotionTtsError {
    e.into()
}

fn map_row(row: &sqlx::sqlite::SqliteRow) -> RepoResult<UtteranceRow> {
    let id: String = row.try_get("utterance_id").map_err(to_err)?;
    let run: String = row.try_get("run_id").map_err(to_err)?;
    let mapping: Option<String> = row.try_get("resolved_mapping_id").map_err(to_err)?;
    let speaker: Option<String> = row
        .try_get("resolved_speaker_voice_asset_id")
        .map_err(to_err)?;
    let source_run: Option<String> = row.try_get("source_run_id").map_err(to_err)?;
    let cache_hit: i64 = row.try_get("cache_hit").map_err(to_err)?;
    Ok(UtteranceRow {
        utterance_id: UtteranceId::try_from(id.as_str())?,
        run_id: RunId::try_from(run.as_str())?,
        global_index: row.try_get("global_index").map_err(to_err)?,
        character_display: row.try_get("character_display").map_err(to_err)?,
        character_sanitised: row.try_get("character_sanitised").map_err(to_err)?,
        character_index: row.try_get("character_index").map_err(to_err)?,
        text: row.try_get("text").map_err(to_err)?,
        source_line_number: row.try_get("source_line_number").map_err(to_err)?,
        inline_overrides_json: row.try_get("inline_overrides_json").map_err(to_err)?,
        legacy_emotion_ref: row.try_get("legacy_emotion_ref").map_err(to_err)?,
        resolved_mapping_id: mapping
            .map(|s| MappingId::try_from(s.as_str()))
            .transpose()?,
        resolved_speaker_voice_asset_id: speaker
            .map(|s| VoiceAssetId::try_from(s.as_str()))
            .transpose()?,
        resolved_emotion_mode: row.try_get("resolved_emotion_mode").map_err(to_err)?,
        resolved_emotion_payload_json: row
            .try_get("resolved_emotion_payload_json")
            .map_err(to_err)?,
        resolved_seed: row.try_get("resolved_seed").map_err(to_err)?,
        resolved_generation_json: row.try_get("resolved_generation_json").map_err(to_err)?,
        content_hash: row.try_get("content_hash").map_err(to_err)?,
        status: row.try_get("status").map_err(to_err)?,
        source_run_id: source_run
            .map(|s| RunId::try_from(s.as_str()))
            .transpose()?,
        audio_artifact_ref: row.try_get("audio_artifact_ref").map_err(to_err)?,
        cache_hit: cache_hit != 0,
        duration_ms: row.try_get("duration_ms").map_err(to_err)?,
        started_at: row.try_get("started_at").map_err(to_err)?,
        finished_at: row.try_get("finished_at").map_err(to_err)?,
        failure_category: row.try_get("failure_category").map_err(to_err)?,
        failure_detail: row.try_get("failure_detail").map_err(to_err)?,
        edit_chain_json: row.try_get("edit_chain_json").map_err(to_err)?,
        derived_artifact_ref: row.try_get("derived_artifact_ref").map_err(to_err)?,
        updated_at: row.try_get("updated_at").map_err(to_err)?,
    })
}

#[async_trait]
impl UtterancesRepo for SqliteUtterancesRepo {
    async fn insert_many(&self, rows: &[UtteranceRow]) -> RepoResult<()> {
        let mut tx = self.pool.begin().await.map_err(to_err)?;
        for row in rows {
            sqlx::query(
                "INSERT INTO ext_emotion_tts__utterances \
                 (utterance_id, run_id, global_index, character_display, character_sanitised, character_index, \
                  text, source_line_number, inline_overrides_json, legacy_emotion_ref, resolved_mapping_id, \
                  resolved_speaker_voice_asset_id, resolved_emotion_mode, resolved_emotion_payload_json, \
                  resolved_seed, resolved_generation_json, content_hash, status, source_run_id, \
                  audio_artifact_ref, cache_hit, duration_ms, started_at, finished_at, failure_category, failure_detail, edit_chain_json) \
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            )
            .bind(row.utterance_id.as_str())
            .bind(row.run_id.as_str())
            .bind(row.global_index)
            .bind(&row.character_display)
            .bind(&row.character_sanitised)
            .bind(row.character_index)
            .bind(&row.text)
            .bind(row.source_line_number)
            .bind(&row.inline_overrides_json)
            .bind(&row.legacy_emotion_ref)
            .bind(row.resolved_mapping_id.as_ref().map(MappingId::as_str))
            .bind(row.resolved_speaker_voice_asset_id.as_ref().map(VoiceAssetId::as_str))
            .bind(&row.resolved_emotion_mode)
            .bind(&row.resolved_emotion_payload_json)
            .bind(row.resolved_seed)
            .bind(&row.resolved_generation_json)
            .bind(&row.content_hash)
            .bind(&row.status)
            .bind(row.source_run_id.as_ref().map(RunId::as_str))
            .bind(&row.audio_artifact_ref)
            .bind(i64::from(row.cache_hit))
            .bind(row.duration_ms)
            .bind(row.started_at)
            .bind(row.finished_at)
            .bind(&row.failure_category)
            .bind(&row.failure_detail)
            .bind(&row.edit_chain_json)
            .execute(&mut *tx)
            .await
            .map_err(to_err)?;
        }
        tx.commit().await.map_err(to_err)?;
        Ok(())
    }

    async fn get(&self, id: &UtteranceId) -> RepoResult<Option<UtteranceRow>> {
        let row = sqlx::query("SELECT * FROM ext_emotion_tts__utterances WHERE utterance_id = ?")
            .bind(id.as_str())
            .fetch_optional(&self.pool)
            .await
            .map_err(to_err)?;
        row.as_ref().map(map_row).transpose()
    }

    async fn list_by_run(&self, run: &RunId) -> RepoResult<Vec<UtteranceRow>> {
        let rows = sqlx::query(
            "SELECT * FROM ext_emotion_tts__utterances WHERE run_id = ? ORDER BY global_index ASC",
        )
        .bind(run.as_str())
        .fetch_all(&self.pool)
        .await
        .map_err(to_err)?;
        rows.iter().map(map_row).collect()
    }

    async fn update_status(&self, id: &UtteranceId, status: &str) -> RepoResult<()> {
        sqlx::query("UPDATE ext_emotion_tts__utterances SET status = ? WHERE utterance_id = ?")
            .bind(status)
            .bind(id.as_str())
            .execute(&self.pool)
            .await
            .map_err(to_err)?;
        Ok(())
    }

    async fn mark_completed(
        &self,
        id: &UtteranceId,
        audio_ref: &str,
        cache_hit: bool,
        duration_ms: Option<i64>,
    ) -> RepoResult<()> {
        sqlx::query(
            "UPDATE ext_emotion_tts__utterances SET \
               status = 'completed', audio_artifact_ref = ?, cache_hit = ?, duration_ms = ?, \
               finished_at = strftime('%s', 'now') \
             WHERE utterance_id = ?",
        )
        .bind(audio_ref)
        .bind(i64::from(cache_hit))
        .bind(duration_ms)
        .bind(id.as_str())
        .execute(&self.pool)
        .await
        .map_err(to_err)?;
        Ok(())
    }

    async fn read_edit_chain(&self, utterance_id: &UtteranceId) -> RepoResult<Option<EditChain>> {
        let row = sqlx::query(
            "SELECT edit_chain_json FROM ext_emotion_tts__utterances WHERE utterance_id = ?",
        )
        .bind(utterance_id.as_str())
        .fetch_optional(&self.pool)
        .await
        .map_err(to_err)?;
        let Some(row) = row else { return Ok(None) };
        let raw: Option<String> = row.try_get("edit_chain_json").map_err(to_err)?;
        match raw {
            None => Ok(None),
            Some(json) => Ok(Some(
                serde_json::from_str(&json).map_err(EmotionTtsError::from)?,
            )),
        }
    }

    async fn write_edit_chain(
        &self,
        utterance_id: &UtteranceId,
        chain: Option<&EditChain>,
    ) -> RepoResult<()> {
        let serialized = match chain {
            None => None,
            Some(c) => Some(serde_json::to_string(c).map_err(EmotionTtsError::from)?),
        };
        sqlx::query(
            "UPDATE ext_emotion_tts__utterances \
             SET edit_chain_json = ?, updated_at = strftime('%s', 'now') \
             WHERE utterance_id = ?",
        )
        .bind(serialized)
        .bind(utterance_id.as_str())
        .execute(&self.pool)
        .await
        .map_err(to_err)?;
        Ok(())
    }

    async fn set_derived_artifact_ref(
        &self,
        utterance_id: &UtteranceId,
        derived_artifact_ref: Option<&str>,
    ) -> RepoResult<()> {
        sqlx::query(
            "UPDATE ext_emotion_tts__utterances \
             SET derived_artifact_ref = ?, updated_at = strftime('%s', 'now') \
             WHERE utterance_id = ?",
        )
        .bind(derived_artifact_ref)
        .bind(utterance_id.as_str())
        .execute(&self.pool)
        .await
        .map_err(to_err)?;
        Ok(())
    }

    async fn write_edit_chain_with_derived(
        &self,
        utterance_id: &UtteranceId,
        chain: Option<&EditChain>,
        derived_artifact_ref: Option<&str>,
    ) -> RepoResult<()> {
        let serialized = match chain {
            None => None,
            Some(c) => Some(serde_json::to_string(c).map_err(EmotionTtsError::from)?),
        };
        sqlx::query(
            "UPDATE ext_emotion_tts__utterances \
             SET edit_chain_json = ?, derived_artifact_ref = ?, \
                 updated_at = strftime('%s', 'now') \
             WHERE utterance_id = ?",
        )
        .bind(serialized)
        .bind(derived_artifact_ref)
        .bind(utterance_id.as_str())
        .execute(&self.pool)
        .await
        .map_err(to_err)?;
        Ok(())
    }
}
