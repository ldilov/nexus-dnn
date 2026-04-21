mod support;

use nexus_local_llm_chat_history::{
    AppendMessageInput, ChatHistoryStore, CreateThreadInput, DeploymentId, MessageRole,
};
use support::make_store;

#[tokio::test]
async fn open_unbound_thread_does_not_auto_attach_on_read() {
    let (store, host, _pool) = make_store().await;
    host.set_current(Some(DeploymentId::new("deploy-bound")));
    let thread = store.create_thread(CreateThreadInput::default()).await.unwrap();
    assert!(thread.is_unbound);

    for _ in 0..10 {
        let t = store.get_thread(&thread.thread_id).await.unwrap();
        assert!(t.is_unbound);
        assert!(t.deployment_id.is_none());
    }
}

#[tokio::test]
async fn send_on_unbound_thread_does_not_attach() {
    let (store, host, _pool) = make_store().await;
    host.set_current(Some(DeploymentId::new("deploy-bound")));
    let thread = store.create_thread(CreateThreadInput::default()).await.unwrap();

    store
        .append_message(
            &thread.thread_id,
            AppendMessageInput {
                role: MessageRole::User,
                content: "hi".into(),
                sampler_effective: None,
                is_partial: false,
                retry_of_message_id: None,
            },
        )
        .await
        .unwrap();

    let t = store.get_thread(&thread.thread_id).await.unwrap();
    assert!(t.is_unbound);
    assert!(t.deployment_id.is_none());
}
