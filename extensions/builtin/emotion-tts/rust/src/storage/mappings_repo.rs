use async_trait::async_trait;
use sqlx::{Row, SqlitePool};

use crate::domain::{DeploymentId, EmotionTtsError, MappingId, PresetId, VoiceAssetId};
use crate::storage::repo_traits::{CharacterMappingRow, MappingsRepo, RepoResult};

pub struct SqliteMappingsRepo {
    pool: SqlitePool,
}

impl SqliteMappingsRepo {
    #[must_use]
    pub const fn new(pool: SqlitePool) -> Self {
        Self { pool }
    }
}

fn to_err(e: sqlx::Error) -> EmotionTtsError {
    e.into()
}

fn map_row(row: &sqlx::sqlite::SqliteRow) -> RepoResult<CharacterMappingRow> {
    let id: String = row.try_get("mapping_id").map_err(to_err)?;
    let dep: String = row.try_get("deployment_id").map_err(to_err)?;
    let speaker: String = row.try_get("speaker_voice_asset_id").map_err(to_err)?;
    let emo_va: Option<String> = row
        .try_get("default_emotion_voice_asset_id")
        .map_err(to_err)?;
    let preset: Option<String> = row.try_get("default_vector_preset_id").map_err(to_err)?;
    let is_active: i64 = row.try_get("is_active").map_err(to_err)?;
    Ok(CharacterMappingRow {
        mapping_id: MappingId::try_from(id.as_str())?,
        deployment_id: DeploymentId::try_from(dep.as_str())?,
        character_name: row.try_get("character_name").map_err(to_err)?,
        character_name_lower: row.try_get("character_name_lower").map_err(to_err)?,
        speaker_voice_asset_id: VoiceAssetId::try_from(speaker.as_str())?,
        default_emotion_mode: row.try_get("default_emotion_mode").map_err(to_err)?,
        default_emotion_voice_asset_id: emo_va
            .map(|s| VoiceAssetId::try_from(s.as_str()))
            .transpose()?,
        default_vector_preset_id: preset.map(|s| PresetId::try_from(s.as_str())).transpose()?,
        default_qwen_template: row.try_get("default_qwen_template").map_err(to_err)?,
        default_speed_factor: row.try_get("default_speed_factor").map_err(to_err)?,
        default_generation_overrides_json: row
            .try_get("default_generation_overrides_json")
            .map_err(to_err)?,
        is_active: is_active != 0,
        notes: row.try_get("notes").map_err(to_err)?,
        created_at: row.try_get("created_at").map_err(to_err)?,
        updated_at: row.try_get("updated_at").map_err(to_err)?,
    })
}

#[async_trait]
impl MappingsRepo for SqliteMappingsRepo {
    async fn insert(&self, row: &CharacterMappingRow) -> RepoResult<()> {
        sqlx::query(
            "INSERT INTO ext_emotion_tts__character_mappings \
             (mapping_id, deployment_id, character_name, character_name_lower, speaker_voice_asset_id, \
              default_emotion_mode, default_emotion_voice_asset_id, default_vector_preset_id, \
              default_qwen_template, default_speed_factor, default_generation_overrides_json, \
              is_active, notes, created_at, updated_at) \
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        )
        .bind(row.mapping_id.as_str())
        .bind(row.deployment_id.as_str())
        .bind(&row.character_name)
        .bind(&row.character_name_lower)
        .bind(row.speaker_voice_asset_id.as_str())
        .bind(&row.default_emotion_mode)
        .bind(row.default_emotion_voice_asset_id.as_ref().map(VoiceAssetId::as_str))
        .bind(row.default_vector_preset_id.as_ref().map(PresetId::as_str))
        .bind(&row.default_qwen_template)
        .bind(row.default_speed_factor)
        .bind(&row.default_generation_overrides_json)
        .bind(i64::from(row.is_active))
        .bind(&row.notes)
        .bind(row.created_at)
        .bind(row.updated_at)
        .execute(&self.pool)
        .await
        .map_err(to_err)?;
        Ok(())
    }

    async fn get(&self, id: &MappingId) -> RepoResult<Option<CharacterMappingRow>> {
        let row =
            sqlx::query("SELECT * FROM ext_emotion_tts__character_mappings WHERE mapping_id = ?")
                .bind(id.as_str())
                .fetch_optional(&self.pool)
                .await
                .map_err(to_err)?;
        row.as_ref().map(map_row).transpose()
    }

    async fn list_by_deployment(&self, dep: &DeploymentId) -> RepoResult<Vec<CharacterMappingRow>> {
        let rows = sqlx::query(
            "SELECT * FROM ext_emotion_tts__character_mappings WHERE deployment_id = ? AND is_active = 1 \
             ORDER BY character_name_lower ASC",
        )
        .bind(dep.as_str())
        .fetch_all(&self.pool)
        .await
        .map_err(to_err)?;
        rows.iter().map(map_row).collect()
    }

    async fn find_by_character(
        &self,
        dep: &DeploymentId,
        name_lower: &str,
    ) -> RepoResult<Option<CharacterMappingRow>> {
        let row = sqlx::query(
            "SELECT * FROM ext_emotion_tts__character_mappings \
             WHERE deployment_id = ? AND character_name_lower = ? AND is_active = 1",
        )
        .bind(dep.as_str())
        .bind(name_lower)
        .fetch_optional(&self.pool)
        .await
        .map_err(to_err)?;
        row.as_ref().map(map_row).transpose()
    }

    async fn update(&self, row: &CharacterMappingRow) -> RepoResult<()> {
        sqlx::query(
            "UPDATE ext_emotion_tts__character_mappings SET \
               character_name = ?, character_name_lower = ?, speaker_voice_asset_id = ?, \
               default_emotion_mode = ?, default_emotion_voice_asset_id = ?, default_vector_preset_id = ?, \
               default_qwen_template = ?, default_speed_factor = ?, default_generation_overrides_json = ?, \
               is_active = ?, notes = ?, updated_at = ? \
             WHERE mapping_id = ?",
        )
        .bind(&row.character_name)
        .bind(&row.character_name_lower)
        .bind(row.speaker_voice_asset_id.as_str())
        .bind(&row.default_emotion_mode)
        .bind(row.default_emotion_voice_asset_id.as_ref().map(VoiceAssetId::as_str))
        .bind(row.default_vector_preset_id.as_ref().map(PresetId::as_str))
        .bind(&row.default_qwen_template)
        .bind(row.default_speed_factor)
        .bind(&row.default_generation_overrides_json)
        .bind(i64::from(row.is_active))
        .bind(&row.notes)
        .bind(row.updated_at)
        .bind(row.mapping_id.as_str())
        .execute(&self.pool)
        .await
        .map_err(to_err)?;
        Ok(())
    }

    async fn deactivate(&self, id: &MappingId) -> RepoResult<()> {
        sqlx::query(
            "UPDATE ext_emotion_tts__character_mappings SET is_active = 0, updated_at = strftime('%s', 'now') \
             WHERE mapping_id = ?",
        )
        .bind(id.as_str())
        .execute(&self.pool)
        .await
        .map_err(to_err)?;
        Ok(())
    }
}
