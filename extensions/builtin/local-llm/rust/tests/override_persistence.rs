mod support;

use nexus_local_llm_chat_history::{
    ChatHistoryStore, ChatHistoryStoreSqlx, CreateThreadInput, PatchThreadInput, SamplerOverride,
};
use support::{make_store, MockHost};

#[tokio::test]
async fn override_persists_across_pool_reopen() {
    let (store, _host, pool) = make_store().await;
    let thread = store
        .create_thread(CreateThreadInput::default())
        .await
        .unwrap();

    let ov = SamplerOverride::empty().with_temperature(1.2);
    store
        .patch_thread(
            &thread.thread_id,
            PatchThreadInput {
                sampler_override: Some(ov),
                ..Default::default()
            },
        )
        .await
        .unwrap();

    drop(store);

    let host = MockHost::new();
    let store2 = ChatHistoryStoreSqlx::new(pool, host).await.unwrap();
    let refreshed = store2.get_thread(&thread.thread_id).await.unwrap();
    assert_eq!(
        refreshed
            .sampler_override
            .as_ref()
            .and_then(|o| o.temperature),
        Some(1.2)
    );
}

#[tokio::test]
async fn clear_override_wipes_json_column() {
    let (store, _host, _pool) = make_store().await;
    let thread = store
        .create_thread(CreateThreadInput::default())
        .await
        .unwrap();

    let ov = SamplerOverride::empty().with_temperature(1.2);
    store
        .patch_thread(
            &thread.thread_id,
            PatchThreadInput {
                sampler_override: Some(ov),
                ..Default::default()
            },
        )
        .await
        .unwrap();

    store
        .patch_thread(
            &thread.thread_id,
            PatchThreadInput {
                clear_sampler_override: true,
                ..Default::default()
            },
        )
        .await
        .unwrap();

    let refreshed = store.get_thread(&thread.thread_id).await.unwrap();
    assert!(refreshed.sampler_override.is_none());
}
