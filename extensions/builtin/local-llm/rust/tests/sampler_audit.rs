mod support;

use nexus_local_llm_chat_history::{
    AppendMessageInput, ChatHistoryStore, CreateThreadInput, MessageRole, SamplerBlock,
};
use support::{make_store, sample_sampler_block};

#[tokio::test]
async fn assistant_sampler_roundtrips_byte_identical() {
    let (store, _host, _pool) = make_store().await;
    let thread = store
        .create_thread(CreateThreadInput::default())
        .await
        .unwrap();

    store
        .append_message(
            &thread.thread_id,
            AppendMessageInput {
                role: MessageRole::User,
                content: "prompt".into(),
                sampler_effective: None,
                is_partial: false,
                retry_of_message_id: None,
            },
        )
        .await
        .unwrap();

    let mut expected = Vec::new();
    for i in 0..20 {
        let block = SamplerBlock::new(
            0.1 + (i as f32) * 0.05,
            0.02 + (i as f32) * 0.001,
            20 + (i as u32),
            1_000 + i,
        )
        .with_top_p(0.9 + (i as f32) * 0.005);
        expected.push(block.clone());
        store
            .append_message(
                &thread.thread_id,
                AppendMessageInput {
                    role: MessageRole::Assistant,
                    content: format!("reply {i}"),
                    sampler_effective: Some(block),
                    is_partial: false,
                    retry_of_message_id: None,
                },
            )
            .await
            .unwrap();
    }

    let page = store
        .list_messages(&thread.thread_id, None, 100)
        .await
        .unwrap();
    let assistants: Vec<_> = page
        .messages
        .iter()
        .filter(|m| m.role == MessageRole::Assistant)
        .collect();
    assert_eq!(assistants.len(), 20);
    for (i, msg) in assistants.iter().enumerate() {
        assert_eq!(msg.sampler_effective.as_ref().unwrap(), &expected[i]);
    }
}

#[tokio::test]
async fn sampler_json_uses_canonical_field_names() {
    let (store, _host, _pool) = make_store().await;
    let thread = store
        .create_thread(CreateThreadInput::default())
        .await
        .unwrap();

    let block = sample_sampler_block(42);
    store
        .append_message(
            &thread.thread_id,
            AppendMessageInput {
                role: MessageRole::Assistant,
                content: "x".into(),
                sampler_effective: Some(block.clone()),
                is_partial: false,
                retry_of_message_id: None,
            },
        )
        .await
        .unwrap();

    let json = serde_json::to_string(&block).unwrap();
    assert!(json.contains("\"temperature\""));
    assert!(!json.contains("\"temp\""));
    assert!(json.contains("\"min_p\""));
    assert!(json.contains("\"top_k\""));
    assert!(json.contains("\"seed\""));
}
