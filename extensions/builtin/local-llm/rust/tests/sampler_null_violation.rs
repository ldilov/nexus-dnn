mod support;

use nexus_local_llm_chat_history::{
    AppendMessageInput, ChatHistoryError, ChatHistoryStore, CreateThreadInput, MessageRole,
};
use support::{make_store, sample_sampler_block};

#[tokio::test]
async fn user_with_sampler_effective_fails() {
    let (store, _host, _pool) = make_store().await;
    let thread = store
        .create_thread(CreateThreadInput::default())
        .await
        .unwrap();
    let err = store
        .append_message(
            &thread.thread_id,
            AppendMessageInput {
                role: MessageRole::User,
                content: "x".into(),
                sampler_effective: Some(sample_sampler_block(1)),
                is_partial: false,
                retry_of_message_id: None,
            },
        )
        .await
        .unwrap_err();
    assert!(matches!(err, ChatHistoryError::ValidationFailed(_)));
}

#[tokio::test]
async fn assistant_without_sampler_effective_fails() {
    let (store, _host, _pool) = make_store().await;
    let thread = store
        .create_thread(CreateThreadInput::default())
        .await
        .unwrap();
    let err = store
        .append_message(
            &thread.thread_id,
            AppendMessageInput {
                role: MessageRole::Assistant,
                content: "x".into(),
                sampler_effective: None,
                is_partial: false,
                retry_of_message_id: None,
            },
        )
        .await
        .unwrap_err();
    assert!(matches!(err, ChatHistoryError::ValidationFailed(_)));
}

#[tokio::test]
async fn system_with_sampler_effective_fails() {
    let (store, _host, _pool) = make_store().await;
    let thread = store
        .create_thread(CreateThreadInput::default())
        .await
        .unwrap();
    let err = store
        .append_message(
            &thread.thread_id,
            AppendMessageInput {
                role: MessageRole::System,
                content: "x".into(),
                sampler_effective: Some(sample_sampler_block(1)),
                is_partial: false,
                retry_of_message_id: None,
            },
        )
        .await
        .unwrap_err();
    assert!(matches!(err, ChatHistoryError::ValidationFailed(_)));
}
