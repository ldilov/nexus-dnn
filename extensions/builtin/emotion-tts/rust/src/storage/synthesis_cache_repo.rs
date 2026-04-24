use async_trait::async_trait;
use sqlx::{Row, SqlitePool};

use crate::domain::{ContentHash, EmotionTtsError};
use crate::storage::repo_traits::{RepoResult, SynthesisCacheRepo, SynthesisCacheRow};

pub struct SqliteSynthesisCacheRepo {
    pool: SqlitePool,
}

impl SqliteSynthesisCacheRepo {
    #[must_use]
    pub const fn new(pool: SqlitePool) -> Self {
        Self { pool }
    }
}

fn to_err(e: sqlx::Error) -> EmotionTtsError {
    e.into()
}

fn map_row(row: &sqlx::sqlite::SqliteRow) -> RepoResult<SynthesisCacheRow> {
    let hash: String = row.try_get("content_hash").map_err(to_err)?;
    Ok(SynthesisCacheRow {
        content_hash: ContentHash::try_from(hash.as_str())?,
        audio_artifact_ref: row.try_get("audio_artifact_ref").map_err(to_err)?,
        extension_version: row.try_get("extension_version").map_err(to_err)?,
        runtime_version: row.try_get("runtime_version").map_err(to_err)?,
        model_version: row.try_get("model_version").map_err(to_err)?,
        size_bytes: row.try_get("size_bytes").map_err(to_err)?,
        hit_count: row.try_get("hit_count").map_err(to_err)?,
        created_at: row.try_get("created_at").map_err(to_err)?,
        last_hit_at: row.try_get("last_hit_at").map_err(to_err)?,
    })
}

#[async_trait]
impl SynthesisCacheRepo for SqliteSynthesisCacheRepo {
    async fn get(&self, hash: &ContentHash) -> RepoResult<Option<SynthesisCacheRow>> {
        let row = sqlx::query("SELECT * FROM ext_emotion_tts__synthesis_cache WHERE content_hash = ?")
            .bind(hash.as_str())
            .fetch_optional(&self.pool)
            .await
            .map_err(to_err)?;
        row.as_ref().map(map_row).transpose()
    }

    async fn insert(&self, row: &SynthesisCacheRow) -> RepoResult<()> {
        sqlx::query(
            "INSERT INTO ext_emotion_tts__synthesis_cache \
             (content_hash, audio_artifact_ref, extension_version, runtime_version, model_version, \
              size_bytes, hit_count, created_at, last_hit_at) \
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) \
             ON CONFLICT(content_hash) DO UPDATE SET \
               last_hit_at = excluded.last_hit_at",
        )
        .bind(row.content_hash.as_str())
        .bind(&row.audio_artifact_ref)
        .bind(&row.extension_version)
        .bind(&row.runtime_version)
        .bind(&row.model_version)
        .bind(row.size_bytes)
        .bind(row.hit_count)
        .bind(row.created_at)
        .bind(row.last_hit_at)
        .execute(&self.pool)
        .await
        .map_err(to_err)?;
        Ok(())
    }

    async fn record_hit(&self, hash: &ContentHash, at: i64) -> RepoResult<()> {
        sqlx::query(
            "UPDATE ext_emotion_tts__synthesis_cache SET hit_count = hit_count + 1, last_hit_at = ? \
             WHERE content_hash = ?",
        )
        .bind(at)
        .bind(hash.as_str())
        .execute(&self.pool)
        .await
        .map_err(to_err)?;
        Ok(())
    }

    async fn total_size_bytes(&self) -> RepoResult<i64> {
        let row = sqlx::query("SELECT COALESCE(SUM(size_bytes), 0) AS total FROM ext_emotion_tts__synthesis_cache")
            .fetch_one(&self.pool)
            .await
            .map_err(to_err)?;
        Ok(row.try_get::<i64, _>("total").map_err(to_err)?)
    }

    async fn evict_lru(&self, target_bytes: i64) -> RepoResult<Vec<ContentHash>> {
        let rows = sqlx::query(
            "SELECT content_hash, size_bytes FROM ext_emotion_tts__synthesis_cache ORDER BY last_hit_at ASC",
        )
        .fetch_all(&self.pool)
        .await
        .map_err(to_err)?;

        let mut freed: i64 = 0;
        let mut victims: Vec<ContentHash> = Vec::new();
        for row in &rows {
            if freed >= target_bytes {
                break;
            }
            let hash: String = row.try_get("content_hash").map_err(to_err)?;
            let size: i64 = row.try_get("size_bytes").map_err(to_err)?;
            let h = ContentHash::try_from(hash.as_str())?;
            sqlx::query("DELETE FROM ext_emotion_tts__synthesis_cache WHERE content_hash = ?")
                .bind(h.as_str())
                .execute(&self.pool)
                .await
                .map_err(to_err)?;
            freed += size;
            victims.push(h);
        }
        Ok(victims)
    }
}
