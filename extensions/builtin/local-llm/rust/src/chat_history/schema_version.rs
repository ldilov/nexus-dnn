use crate::error::{ChatHistoryError, Result};
use sqlx::SqlitePool;

pub const BUNDLED_SCHEMA_VERSION: u32 = 8;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum StoreMode {
    ReadWrite,
    ReadOnly,
}

pub async fn read_stored_version(pool: &SqlitePool) -> Result<Option<u32>> {
    let outcome = sqlx::query_as::<_, (String,)>(
        "SELECT value FROM ext_local_llm_meta WHERE key = 'schema_version'",
    )
    .fetch_optional(pool)
    .await;

    match outcome {
        Ok(Some((value,))) => value.parse::<u32>().map(Some).map_err(|e| {
            ChatHistoryError::ValidationFailed(format!("schema_version not u32: {e}"))
        }),
        Ok(None) => Ok(None),
        Err(sqlx::Error::Database(db_err)) if db_err.message().contains("no such table") => {
            Ok(None)
        }
        Err(e) => Err(ChatHistoryError::from(e)),
    }
}

pub fn assert_compatible(stored: Option<u32>, bundled: u32) -> Result<StoreMode> {
    match stored {
        Some(v) if v > bundled => {
            Err(ChatHistoryError::SchemaVersionMismatch { stored: v, bundled })
        }
        _ => Ok(StoreMode::ReadWrite),
    }
}

pub fn classify_mode(stored: Option<u32>, bundled: u32) -> StoreMode {
    match stored {
        Some(v) if v > bundled => StoreMode::ReadOnly,
        _ => StoreMode::ReadWrite,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn read_stored_version_returns_none_when_table_missing() {
        let pool = SqlitePool::connect("sqlite::memory:").await.unwrap();
        let result = read_stored_version(&pool).await;
        assert!(matches!(result, Ok(None)));
    }

    #[tokio::test]
    async fn read_stored_version_returns_none_when_row_missing() {
        let pool = SqlitePool::connect("sqlite::memory:").await.unwrap();
        sqlx::query("CREATE TABLE ext_local_llm_meta (key TEXT PRIMARY KEY, value TEXT NOT NULL)")
            .execute(&pool)
            .await
            .unwrap();
        let result = read_stored_version(&pool).await;
        assert!(matches!(result, Ok(None)));
    }

    #[tokio::test]
    async fn read_stored_version_returns_value_when_present() {
        let pool = SqlitePool::connect("sqlite::memory:").await.unwrap();
        sqlx::query("CREATE TABLE ext_local_llm_meta (key TEXT PRIMARY KEY, value TEXT NOT NULL)")
            .execute(&pool)
            .await
            .unwrap();
        sqlx::query("INSERT INTO ext_local_llm_meta (key, value) VALUES ('schema_version', '8')")
            .execute(&pool)
            .await
            .unwrap();
        let result = read_stored_version(&pool).await.unwrap();
        assert_eq!(result, Some(8));
    }

    #[tokio::test]
    async fn read_stored_version_rejects_non_numeric() {
        let pool = SqlitePool::connect("sqlite::memory:").await.unwrap();
        sqlx::query("CREATE TABLE ext_local_llm_meta (key TEXT PRIMARY KEY, value TEXT NOT NULL)")
            .execute(&pool)
            .await
            .unwrap();
        sqlx::query(
            "INSERT INTO ext_local_llm_meta (key, value) VALUES ('schema_version', 'oops')",
        )
        .execute(&pool)
        .await
        .unwrap();
        let result = read_stored_version(&pool).await;
        assert!(matches!(result, Err(ChatHistoryError::ValidationFailed(_))));
    }
}
