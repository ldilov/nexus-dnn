mod support;

use axum::body::Body;
use axum::http::{Request, StatusCode};
use http_body_util::BodyExt;
use nexus_local_llm_chat_history::{build_router, ChatMessage, ChatThread};
use serde_json::json;
use std::sync::Arc;
use support::{make_store, sample_sampler_block};
use tower::ServiceExt;

async fn setup() -> (axum::Router, String) {
    let (store, _host, _pool) = make_store().await;
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
    let thread: ChatThread =
        serde_json::from_slice(&create.into_body().collect().await.unwrap().to_bytes()).unwrap();
    (app, thread.thread_id.into_string())
}

#[tokio::test]
async fn append_user_then_list() {
    let (app, tid) = setup().await;
    let append = app
        .clone()
        .oneshot(
            Request::post(format!("/chat/threads/{tid}/messages"))
                .header("content-type", "application/json")
                .body(Body::from(
                    json!({"role":"user","content":"hi"}).to_string(),
                ))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(append.status(), StatusCode::CREATED);
    let msg: ChatMessage =
        serde_json::from_slice(&append.into_body().collect().await.unwrap().to_bytes()).unwrap();
    assert_eq!(msg.ordinal, 0);

    let list = app
        .oneshot(
            Request::get(format!("/chat/threads/{tid}/messages"))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(list.status(), StatusCode::OK);
}

#[tokio::test]
async fn append_assistant_without_sampler_returns_400() {
    let (app, tid) = setup().await;
    let append = app
        .oneshot(
            Request::post(format!("/chat/threads/{tid}/messages"))
                .header("content-type", "application/json")
                .body(Body::from(
                    json!({"role":"assistant","content":"hi"}).to_string(),
                ))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(append.status(), StatusCode::BAD_REQUEST);
}

#[tokio::test]
async fn append_user_with_sampler_returns_400() {
    let (app, tid) = setup().await;
    let payload = json!({
        "role":"user",
        "content":"hi",
        "sampler_effective": sample_sampler_block(42),
    });
    let append = app
        .oneshot(
            Request::post(format!("/chat/threads/{tid}/messages"))
                .header("content-type", "application/json")
                .body(Body::from(payload.to_string()))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(append.status(), StatusCode::BAD_REQUEST);
}

#[tokio::test]
async fn append_assistant_with_sampler_succeeds_and_roundtrips() {
    let (app, tid) = setup().await;
    app.clone()
        .oneshot(
            Request::post(format!("/chat/threads/{tid}/messages"))
                .header("content-type", "application/json")
                .body(Body::from(
                    json!({"role":"user","content":"ask"}).to_string(),
                ))
                .unwrap(),
        )
        .await
        .unwrap();
    let block = sample_sampler_block(7);
    let resp = app
        .clone()
        .oneshot(
            Request::post(format!("/chat/threads/{tid}/messages"))
                .header("content-type", "application/json")
                .body(Body::from(
                    json!({"role":"assistant","content":"answer","sampler_effective":block})
                        .to_string(),
                ))
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(resp.status(), StatusCode::CREATED);
}
