mod support;

use nexus_local_llm_chat_history::chat_history::migrations;
use nexus_local_llm_chat_history::{
    AppendMessageInput, ChatHistoryStore, ChatHistoryStoreSqlx, CreateThreadInput, MessageRole,
};
use sqlx::SqlitePool;
use support::{make_store, sample_sampler_block, MockHost};

#[tokio::test]
async fn roundtrip_five_messages_across_pool_recreate() {
    let (store, _host, pool) = make_store().await;
    let thread = store
        .create_thread(CreateThreadInput::default())
        .await
        .unwrap();

    let pattern = [
        (MessageRole::User, "what is the capital of France?"),
        (MessageRole::Assistant, "Paris."),
        (MessageRole::User, "and of Germany?"),
        (MessageRole::Assistant, "Berlin."),
        (MessageRole::User, "thanks"),
    ];
    for (role, content) in pattern {
        let sampler = if role == MessageRole::Assistant {
            Some(sample_sampler_block(42))
        } else {
            None
        };
        store
            .append_message(
                &thread.thread_id,
                AppendMessageInput {
                    role,
                    content: content.to_owned(),
                    sampler_effective: sampler,
                    is_partial: false,
                    retry_of_message_id: None,
                },
            )
            .await
            .unwrap();
    }

    drop(store);

    let host = MockHost::new();
    let store2 = ChatHistoryStoreSqlx::new(pool.clone(), host).await.unwrap();
    let page = store2
        .list_messages(&thread.thread_id, None, 100)
        .await
        .unwrap();
    assert_eq!(page.messages.len(), 5);
    for (i, (role, content)) in pattern.iter().enumerate() {
        let msg = &page.messages[i];
        assert_eq!(msg.ordinal as usize, i);
        assert_eq!(msg.role, *role);
        assert_eq!(msg.content, *content);
    }
}

#[tokio::test]
async fn thread_title_auto_materialized_on_first_user_message() {
    let (store, _host, _pool) = make_store().await;
    let thread = store
        .create_thread(CreateThreadInput::default())
        .await
        .unwrap();
    assert!(thread.title.is_none());
    assert!(thread.title_auto.is_none());
    assert_eq!(thread.title_resolved, "New chat");

    store
        .append_message(
            &thread.thread_id,
            AppendMessageInput {
                role: MessageRole::User,
                content: "hello Claude, what's new today?".to_owned(),
                sampler_effective: None,
                is_partial: false,
                retry_of_message_id: None,
            },
        )
        .await
        .unwrap();

    let refreshed = store.get_thread(&thread.thread_id).await.unwrap();
    assert_eq!(
        refreshed.title_auto.as_deref(),
        Some("hello Claude, what's new today?")
    );
    assert_eq!(refreshed.title_resolved, "hello Claude, what's new today?");
}

#[tokio::test]
async fn append_assigns_strict_monotone_ordinals() {
    let (store, _host, _pool) = make_store().await;
    let thread = store
        .create_thread(CreateThreadInput::default())
        .await
        .unwrap();
    for i in 0..20 {
        let msg = store
            .append_message(
                &thread.thread_id,
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
        assert_eq!(msg.ordinal, i);
    }
}

#[tokio::test]
async fn migrations_idempotent_across_repeat_application() {
    let pool = SqlitePool::connect("sqlite::memory:").await.unwrap();
    migrations::apply_all(&pool).await.unwrap();
    migrations::apply_all(&pool).await.unwrap();
    migrations::apply_all(&pool).await.unwrap();
    let host = MockHost::new();
    let store = ChatHistoryStoreSqlx::new(pool, host).await.unwrap();
    let _ = store
        .create_thread(CreateThreadInput::default())
        .await
        .unwrap();
}
