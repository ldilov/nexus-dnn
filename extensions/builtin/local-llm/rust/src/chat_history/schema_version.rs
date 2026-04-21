use crate::error::{ChatHistoryError, Result};
use sqlx::SqlitePool;

pub const BUNDLED_SCHEMA_VERSION: u32 = 8;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum StoreMode {
    ReadWrite,
    ReadOnly,
}

pub async fn read_stored_version(pool: &SqlitePool) -> Result<Option<u32>> {
    let row: Option<(String,)> =
        sqlx::query_as("SELECT value FROM ext_local_llm_meta WHERE key = 'schema_version'")
            .fetch_optional(pool)
            .await?;

    match row {
        Some((value,)) => value
            .parse::<u32>()
            .map(Some)
            .map_err(|e| ChatHistoryError::ValidationFailed(format!("schema_version not u32: {e}"))),
        None => Ok(None),
    }
}

pub fn assert_compatible(stored: Option<u32>, bundled: u32) -> Result<StoreMode> {
    match stored {
        Some(v) if v > bundled => Err(ChatHistoryError::SchemaVersionMismatch {
            stored: v,
            bundled,
        }),
        _ => Ok(StoreMode::ReadWrite),
    }
}

pub fn classify_mode(stored: Option<u32>, bundled: u32) -> StoreMode {
    match stored {
        Some(v) if v > bundled => StoreMode::ReadOnly,
        _ => StoreMode::ReadWrite,
    }
}
