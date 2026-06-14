mod support;

use nexus_local_llm_chat_history::{
    ChatHistoryStore, CreateThreadInput, DeploymentId, ThreadListFilter,
};
use support::make_store;

#[tokio::test]
async fn threads_tied_to_gone_deployment_are_still_openable() {
    let (store, _host, _pool) = make_store().await;
    let mut tids = Vec::new();
    for _ in 0..3 {
        let t = store
            .create_thread(CreateThreadInput {
                deployment_id: Some(DeploymentId::new("X")),
                ..Default::default()
            })
            .await
            .unwrap();
        tids.push(t.thread_id);
    }

    for tid in &tids {
        let t = store.get_thread(tid).await.unwrap();
        assert_eq!(t.deployment_id.as_ref().map(|d| d.as_str()), Some("X"));
    }

    let unbound_view = store
        .list_threads(ThreadListFilter {
            deployment_id: None,
            exclude_unbound: false,
            before_updated_at: None,
            limit: 50,
        })
        .await
        .unwrap();
    assert_eq!(unbound_view.threads.len(), 0);

    let x_view = store
        .list_threads(ThreadListFilter {
            deployment_id: Some(DeploymentId::new("X")),
            exclude_unbound: false,
            before_updated_at: None,
            limit: 50,
        })
        .await
        .unwrap();
    assert_eq!(x_view.threads.len(), 3);
}
