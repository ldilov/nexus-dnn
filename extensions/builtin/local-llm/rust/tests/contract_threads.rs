mod support;

use axum::body::Body;
use axum::http::{Request, StatusCode};
use http_body_util::BodyExt;
use nexus_local_llm_chat_history::{build_router, ChatThread, DeploymentId};
use serde_json::json;
use std::sync::Arc;
use support::{make_store, MockHost};
use tower::ServiceExt;

async fn build_app() -> (axum::Router, Arc<MockHost>) {
    let (store, host, _pool) = make_store().await;
    let store_arc: Arc<dyn nexus_local_llm_chat_history::ChatHistoryStore> = Arc::new(store);
    (build_router(store_arc), host)
}

#[tokio::test]
async fn post_then_get_thread_roundtrip() {
    let (app, _host) = build_app().await;

    let create = app
        .clone()
        .oneshot(
            Request::post("/chat/threads")
                .header("content-type", "application/json")
                .body(Body::from(r#"{"title":"my thread"}"#))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(create.status(), StatusCode::CREATED);
    let body = create.into_body().collect().await.unwrap().to_bytes();
    let thread: ChatThread = serde_json::from_slice(&body).unwrap();
    assert_eq!(thread.title.as_deref(), Some("my thread"));
    assert_eq!(thread.title_resolved, "my thread");
    assert!(thread.is_unbound);

    let get = app
        .oneshot(
            Request::get(format!("/chat/threads/{}", thread.thread_id))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(get.status(), StatusCode::OK);
}

#[tokio::test]
async fn get_missing_thread_returns_404() {
    let (app, _host) = build_app().await;
    let resp = app
        .oneshot(
            Request::get("/chat/threads/does-not-exist")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::NOT_FOUND);
}

#[tokio::test]
async fn attach_without_bound_deployment_returns_409() {
    let (app, _host) = build_app().await;
    let create = app
        .clone()
        .oneshot(
            Request::post("/chat/threads")
                .header("content-type", "application/json")
                .body(Body::from("{}"))
                .unwrap(),
        )
        .await
        .unwrap();
    let thread: ChatThread = serde_json::from_slice(
        &create.into_body().collect().await.unwrap().to_bytes(),
    )
    .unwrap();
    let patch = app
        .oneshot(
            Request::patch(format!("/chat/threads/{}", thread.thread_id))
                .header("content-type", "application/json")
                .body(Body::from(r#"{"attach_to_current_deployment": true}"#))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(patch.status(), StatusCode::CONFLICT);
}

#[tokio::test]
async fn attach_with_bound_deployment_succeeds() {
    let (store, host, _pool) = make_store().await;
    host.set_current(Some(DeploymentId::new("deploy-A")));
    let store_arc: Arc<dyn nexus_local_llm_chat_history::ChatHistoryStore> = Arc::new(store);
    let app = build_router(store_arc);

    let create = app
        .clone()
        .oneshot(
            Request::post("/chat/threads")
                .header("content-type", "application/json")
                .body(Body::from("{}"))
                .unwrap(),
        )
        .await
        .unwrap();
    let thread: ChatThread = serde_json::from_slice(
        &create.into_body().collect().await.unwrap().to_bytes(),
    )
    .unwrap();

    let patch = app
        .oneshot(
            Request::patch(format!("/chat/threads/{}", thread.thread_id))
                .header("content-type", "application/json")
                .body(Body::from(
                    json!({"attach_to_current_deployment": true}).to_string(),
                ))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(patch.status(), StatusCode::OK);
    let body = patch.into_body().collect().await.unwrap().to_bytes();
    let updated: ChatThread = serde_json::from_slice(&body).unwrap();
    assert_eq!(
        updated.deployment_id.as_ref().map(|d| d.as_str()),
        Some("deploy-A")
    );
    assert!(!updated.is_unbound);
}

#[tokio::test]
async fn delete_cascade_and_404_after() {
    let (app, _host) = build_app().await;
    let create = app
        .clone()
        .oneshot(
            Request::post("/chat/threads")
                .header("content-type", "application/json")
                .body(Body::from("{}"))
                .unwrap(),
        )
        .await
        .unwrap();
    let thread: ChatThread = serde_json::from_slice(
        &create.into_body().collect().await.unwrap().to_bytes(),
    )
    .unwrap();
    let del = app
        .clone()
        .oneshot(
            Request::delete(format!("/chat/threads/{}", thread.thread_id))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(del.status(), StatusCode::NO_CONTENT);
    let get = app
        .oneshot(
            Request::get(format!("/chat/threads/{}", thread.thread_id))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(get.status(), StatusCode::NOT_FOUND);
}
