mod support;

use nexus_local_llm_chat_history::{
    ChatHistoryStore, CreateThreadInput, DeploymentId, ThreadListFilter,
};
use support::make_store;

#[tokio::test]
async fn list_scopes_to_deployment_plus_unbound() {
    let (store, _host, _pool) = make_store().await;
    for _ in 0..2 {
        store
            .create_thread(CreateThreadInput {
                deployment_id: Some(DeploymentId::new("A")),
                ..Default::default()
            })
            .await
            .unwrap();
    }
    for _ in 0..2 {
        store
            .create_thread(CreateThreadInput {
                deployment_id: Some(DeploymentId::new("B")),
                ..Default::default()
            })
            .await
            .unwrap();
    }
    store
        .create_thread(CreateThreadInput::default())
        .await
        .unwrap();

    let a = store
        .list_threads(ThreadListFilter {
            deployment_id: Some(DeploymentId::new("A")),
            exclude_unbound: false,
            before_updated_at: None,
            limit: 50,
        })
        .await
        .unwrap();
    assert_eq!(a.threads.len(), 3);

    let a_strict = store
        .list_threads(ThreadListFilter {
            deployment_id: Some(DeploymentId::new("A")),
            exclude_unbound: true,
            before_updated_at: None,
            limit: 50,
        })
        .await
        .unwrap();
    assert_eq!(a_strict.threads.len(), 2);

    let b = store
        .list_threads(ThreadListFilter {
            deployment_id: Some(DeploymentId::new("B")),
            exclude_unbound: false,
            before_updated_at: None,
            limit: 50,
        })
        .await
        .unwrap();
    assert_eq!(b.threads.len(), 3);
}

#[tokio::test]
async fn no_deployment_filter_returns_only_unbound() {
    let (store, _host, _pool) = make_store().await;
    store
        .create_thread(CreateThreadInput {
            deployment_id: Some(DeploymentId::new("A")),
            ..Default::default()
        })
        .await
        .unwrap();
    store
        .create_thread(CreateThreadInput::default())
        .await
        .unwrap();
    store
        .create_thread(CreateThreadInput::default())
        .await
        .unwrap();

    let page = store
        .list_threads(ThreadListFilter {
            deployment_id: None,
            exclude_unbound: false,
            before_updated_at: None,
            limit: 50,
        })
        .await
        .unwrap();
    assert_eq!(page.threads.len(), 2);
    for t in &page.threads {
        assert!(t.is_unbound);
    }
}
