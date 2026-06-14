mod support;

use nexus_local_llm_chat_history::chat_history::migrations;
use nexus_local_llm_chat_history::{
    ChatHistoryError, ChatHistoryStore, ChatHistoryStoreSqlx, CreateThreadInput, StoreMode,
};
use sqlx::SqlitePool;
use support::MockHost;

async fn set_stored_version(pool: &SqlitePool, v: &str) {
    sqlx::query(
        "INSERT OR REPLACE INTO ext_local_llm_meta (key, value) VALUES ('schema_version', ?)",
    )
    .bind(v)
    .execute(pool)
    .await
    .unwrap();
}

#[tokio::test]
async fn newer_stored_version_enters_read_only_and_writes_fail() {
    let pool = SqlitePool::connect("sqlite::memory:").await.unwrap();
    migrations::apply_all(&pool).await.unwrap();
    set_stored_version(&pool, "99").await;
    let host = MockHost::new();
    let store = ChatHistoryStoreSqlx::new(pool, host).await.unwrap();
    assert_eq!(store.mode(), StoreMode::ReadOnly);

    let err = store
        .create_thread(CreateThreadInput::default())
        .await
        .unwrap_err();
    assert!(matches!(
        err,
        ChatHistoryError::SchemaVersionMismatch { .. }
    ));
}

#[tokio::test]
async fn matching_version_allows_writes() {
    let pool = SqlitePool::connect("sqlite::memory:").await.unwrap();
    migrations::apply_all(&pool).await.unwrap();
    let host = MockHost::new();
    let store = ChatHistoryStoreSqlx::new(pool, host).await.unwrap();
    assert_eq!(store.mode(), StoreMode::ReadWrite);

    let thread = store
        .create_thread(CreateThreadInput::default())
        .await
        .unwrap();
    assert!(thread.is_unbound);
}

#[tokio::test]
async fn older_stored_version_still_read_write() {
    let pool = SqlitePool::connect("sqlite::memory:").await.unwrap();
    migrations::apply_all(&pool).await.unwrap();
    set_stored_version(&pool, "7").await;
    let host = MockHost::new();
    let store = ChatHistoryStoreSqlx::new(pool, host).await.unwrap();
    assert_eq!(store.mode(), StoreMode::ReadWrite);
}
