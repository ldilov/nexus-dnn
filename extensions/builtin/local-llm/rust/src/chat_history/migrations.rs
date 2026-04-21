use crate::error::Result;
use sqlx::SqlitePool;

const MIGRATION_002: &str = r#"
CREATE TABLE IF NOT EXISTS ext_local_llm_chat_threads (
    id TEXT PRIMARY KEY NOT NULL,
    title TEXT,
    system_prompt TEXT,
    message_count INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    archived_at TEXT
);

CREATE TABLE IF NOT EXISTS ext_local_llm_chat_messages (
    id TEXT PRIMARY KEY NOT NULL,
    thread_id TEXT NOT NULL REFERENCES ext_local_llm_chat_threads(id),
    ordinal INTEGER NOT NULL,
    role TEXT NOT NULL,
    content_text TEXT NOT NULL,
    metadata_json TEXT,
    retry_of_message_id TEXT REFERENCES ext_local_llm_chat_messages(id),
    is_partial INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS ext_local_llm_idx_messages_thread
    ON ext_local_llm_chat_messages(thread_id, ordinal);
"#;

const MIGRATION_008_META: &str = r#"
CREATE TABLE IF NOT EXISTS ext_local_llm_meta (
    key   TEXT PRIMARY KEY NOT NULL,
    value TEXT NOT NULL
);
"#;

const MIGRATION_008_INDEX: &str = r#"
CREATE INDEX IF NOT EXISTS ext_local_llm_idx_threads_deploy
    ON ext_local_llm_chat_threads(deployment_id);
"#;

const ADDITIVE_COLUMNS: &[(&str, &str, &str)] = &[
    ("ext_local_llm_chat_threads", "deployment_id", "TEXT"),
    ("ext_local_llm_chat_threads", "install_id", "TEXT"),
    ("ext_local_llm_chat_threads", "sampler_override", "TEXT"),
    ("ext_local_llm_chat_threads", "title_auto", "TEXT"),
    ("ext_local_llm_chat_messages", "sampler_effective", "TEXT"),
];

pub async fn apply_all(pool: &SqlitePool) -> Result<()> {
    sqlx::query(MIGRATION_002).execute(pool).await?;
    sqlx::query(MIGRATION_008_META).execute(pool).await?;
    for (table, column, ty) in ADDITIVE_COLUMNS {
        add_column_if_missing(pool, table, column, ty).await?;
    }
    sqlx::query(MIGRATION_008_INDEX).execute(pool).await?;
    sqlx::query(
        "INSERT OR REPLACE INTO ext_local_llm_meta (key, value) VALUES ('schema_version', '8')",
    )
    .execute(pool)
    .await?;
    Ok(())
}

async fn add_column_if_missing(
    pool: &SqlitePool,
    table: &str,
    column: &str,
    ty: &str,
) -> Result<()> {
    let existing: Vec<(i64, String)> =
        sqlx::query_as(&format!("PRAGMA table_info({table})"))
            .fetch_all(pool)
            .await
            .unwrap_or_default()
            .into_iter()
            .map(|r: (i64, String, String, i64, Option<String>, i64)| (r.0, r.1))
            .collect();

    if existing.iter().any(|(_, name)| name == column) {
        return Ok(());
    }

    sqlx::query(&format!("ALTER TABLE {table} ADD COLUMN {column} {ty}"))
        .execute(pool)
        .await?;
    Ok(())
}
