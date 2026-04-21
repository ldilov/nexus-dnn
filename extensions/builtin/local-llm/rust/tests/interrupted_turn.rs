mod support;

use nexus_local_llm_chat_history::{
    AppendMessageInput, ChatHistoryStore, ChatHistoryStoreSqlx, CreateThreadInput, MessageRole,
};
use support::{make_store, sample_sampler_block, MockHost};

#[tokio::test]
async fn partial_assistant_message_persists_across_reopen() {
    let (store, _host, pool) = make_store().await;
    let thread = store
        .create_thread(CreateThreadInput::default())
        .await
        .unwrap();

    store
        .append_message(
            &thread.thread_id,
            AppendMessageInput {
                role: MessageRole::User,
                content: "ask".into(),
                sampler_effective: None,
                is_partial: false,
                retry_of_message_id: None,
            },
        )
        .await
        .unwrap();
    store
        .append_message(
            &thread.thread_id,
            AppendMessageInput {
                role: MessageRole::Assistant,
                content: "partial...".into(),
                sampler_effective: Some(sample_sampler_block(1)),
                is_partial: true,
                retry_of_message_id: None,
            },
        )
        .await
        .unwrap();

    drop(store);

    let host = MockHost::new();
    let store2 = ChatHistoryStoreSqlx::new(pool, host).await.unwrap();
    let page = store2
        .list_messages(&thread.thread_id, None, 100)
        .await
        .unwrap();
    assert_eq!(page.messages.len(), 2);
    assert!(!page.messages[0].is_partial);
    assert!(page.messages[1].is_partial);
    assert_eq!(page.messages[1].role, MessageRole::Assistant);
}
