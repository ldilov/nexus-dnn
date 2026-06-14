mod support;

use nexus_local_llm_chat_history::{
    AppendMessageInput, ChatHistoryStore, CreateThreadInput, MessageRole,
};
use sqlx::Row;
use support::make_store;

async fn append_n(
    store: &impl ChatHistoryStore,
    thread_id: &nexus_local_llm_chat_history::ThreadId,
    n: u32,
) {
    for i in 0..n {
        store
            .append_message(
                thread_id,
                AppendMessageInput {
                    role: MessageRole::User,
                    content: format!("msg {i}"),
                    sampler_effective: None,
                    is_partial: false,
                    retry_of_message_id: None,
                },
            )
            .await
            .unwrap();
    }
}

async fn count_messages(pool: &sqlx::SqlitePool, thread_id: &str) -> i64 {
    let row =
        sqlx::query("SELECT COUNT(*) as n FROM ext_local_llm_chat_messages WHERE thread_id = ?")
            .bind(thread_id)
            .fetch_one(pool)
            .await
            .unwrap();
    row.get::<i64, _>(0)
}

#[tokio::test]
async fn delete_cascades_n_1() {
    let (store, _host, pool) = make_store().await;
    let thread = store
        .create_thread(CreateThreadInput::default())
        .await
        .unwrap();
    append_n(&store, &thread.thread_id, 1).await;
    store.delete_thread(&thread.thread_id).await.unwrap();
    assert_eq!(count_messages(&pool, thread.thread_id.as_str()).await, 0);
}

#[tokio::test]
async fn delete_cascades_n_10() {
    let (store, _host, pool) = make_store().await;
    let thread = store
        .create_thread(CreateThreadInput::default())
        .await
        .unwrap();
    append_n(&store, &thread.thread_id, 10).await;
    store.delete_thread(&thread.thread_id).await.unwrap();
    assert_eq!(count_messages(&pool, thread.thread_id.as_str()).await, 0);
}

#[tokio::test]
async fn delete_cascades_n_100() {
    let (store, _host, pool) = make_store().await;
    let thread = store
        .create_thread(CreateThreadInput::default())
        .await
        .unwrap();
    append_n(&store, &thread.thread_id, 100).await;
    store.delete_thread(&thread.thread_id).await.unwrap();
    assert_eq!(count_messages(&pool, thread.thread_id.as_str()).await, 0);
}
