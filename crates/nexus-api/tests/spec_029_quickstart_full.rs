//! Spec 030 SC-003 close-out — full coverage of spec 029 quickstart §3
//! flows (a–g) routed through the live generic dispatcher.
//!
//! Earlier coverage exercised create + list (§3a + §3c partial) plus the
//! restart drill in §4. This file walks the remaining flows §3b, §3d,
//! §3e, §3f, §3g end-to-end so the SC-003 "100% of the 7 flows" claim
//! is honoured.
//!
//! Routes the LLM extension's `build_router_with_chat` entrypoint behind
//! the production `/api/v1/extensions/{ext_id}/{*rest}` dispatcher
//! mount, then issues the same HTTP requests the quickstart documents.

mod common;

use std::sync::Arc;

use axum::body::Body;
use axum::http::{Request, StatusCode, header};
use http_body_util::BodyExt;
use nexus_api::extension_router::{DefaultRegistry, ExtensionId, ExtensionRouterRegistry};
use nexus_local_llm_chat_history::chat_history::store_sqlx::ChatHistoryStoreSqlx;
use nexus_local_llm_chat_history::host_client::HostDeploymentsClient;
use nexus_local_llm_chat_history::ids::DeploymentId;
use nexus_local_llm_chat_history::router::build_router_with_chat;
use nexus_local_llm_chat_history::{
    ChatHandlerResources, ChatHistoryStore, ModelLoadRegistry, migrations,
};
use serde_json::Value;
use sqlx::SqlitePool;
use tower::ServiceExt;

use common::{StubHf, harness_with};

#[derive(Default)]
struct CurrentDeploymentStub {
    current: Option<DeploymentId>,
}

#[async_trait::async_trait]
impl HostDeploymentsClient for CurrentDeploymentStub {
    async fn current_deployment(
        &self,
    ) -> nexus_local_llm_chat_history::Result<Option<DeploymentId>> {
        Ok(self.current.clone())
    }
    async fn known_deployments(&self) -> nexus_local_llm_chat_history::Result<Vec<DeploymentId>> {
        Ok(self.current.clone().into_iter().collect())
    }
}

async fn build_app(current: Option<DeploymentId>) -> axum::Router {
    let h = harness_with(StubHf::with_results(vec![])).await;
    let mut state = h.state.clone();

    let pool = SqlitePool::connect("sqlite::memory:").await.unwrap();
    migrations::apply_all(&pool).await.unwrap();
    let host_client: Arc<dyn HostDeploymentsClient> = Arc::new(CurrentDeploymentStub { current });
    let store: Arc<dyn ChatHistoryStore> = Arc::new(
        ChatHistoryStoreSqlx::new(pool.clone(), host_client)
            .await
            .unwrap(),
    );

    let backend_bus = state.backend_event_bus.clone();
    let chat_resources = Arc::new(ChatHandlerResources::new(
        pool,
        None,
        None,
        None,
        backend_bus.clone(),
        backend_bus,
        ModelLoadRegistry::new(),
    ));
    let extension_router = build_router_with_chat(store, chat_resources);

    let registry: Arc<DefaultRegistry> = Arc::new(DefaultRegistry::new());
    registry
        .register(
            ExtensionId::parse("nexus.local-llm").unwrap(),
            extension_router,
            vec![
                "/chat/threads".into(),
                "/chat/threads/{thread_id}".into(),
                "/chat/threads/{thread_id}/messages".into(),
            ],
        )
        .unwrap();
    registry.seal();
    state.extension_router_registry = registry;

    nexus_api::create_router(state)
}

async fn json_resp(resp: axum::response::Response) -> (StatusCode, Value) {
    let status = resp.status();
    let bytes = resp.into_body().collect().await.unwrap().to_bytes();
    let json = serde_json::from_slice(&bytes).unwrap_or(Value::Null);
    (status, json)
}

fn dispatcher_uri(thread_id: Option<&str>, suffix: &str) -> String {
    match thread_id {
        Some(t) => format!("/api/v1/extensions/nexus.local-llm/chat/threads/{t}{suffix}"),
        None => format!("/api/v1/extensions/nexus.local-llm/chat/threads{suffix}"),
    }
}

async fn create_thread(app: &axum::Router, payload: serde_json::Value) -> (StatusCode, Value) {
    let req = Request::builder()
        .method("POST")
        .uri(dispatcher_uri(None, ""))
        .header(header::CONTENT_TYPE, "application/json")
        .body(Body::from(payload.to_string()))
        .unwrap();
    json_resp(app.clone().oneshot(req).await.unwrap()).await
}

async fn append_message(
    app: &axum::Router,
    thread_id: &str,
    payload: serde_json::Value,
) -> (StatusCode, Value) {
    let req = Request::builder()
        .method("POST")
        .uri(dispatcher_uri(Some(thread_id), "/messages"))
        .header(header::CONTENT_TYPE, "application/json")
        .body(Body::from(payload.to_string()))
        .unwrap();
    json_resp(app.clone().oneshot(req).await.unwrap()).await
}

async fn patch_thread(
    app: &axum::Router,
    thread_id: &str,
    payload: serde_json::Value,
) -> (StatusCode, Value) {
    let req = Request::builder()
        .method("PATCH")
        .uri(dispatcher_uri(Some(thread_id), ""))
        .header(header::CONTENT_TYPE, "application/json")
        .body(Body::from(payload.to_string()))
        .unwrap();
    json_resp(app.clone().oneshot(req).await.unwrap()).await
}

async fn delete_thread(app: &axum::Router, thread_id: &str) -> StatusCode {
    let req = Request::builder()
        .method("DELETE")
        .uri(dispatcher_uri(Some(thread_id), ""))
        .body(Body::empty())
        .unwrap();
    app.clone().oneshot(req).await.unwrap().status()
}

#[tokio::test(flavor = "multi_thread", worker_threads = 2)]
async fn quickstart_3a_create_unbound_thread() {
    let app = build_app(None).await;
    let (status, body) = create_thread(&app, serde_json::json!({ "title": "test thread" })).await;
    assert_eq!(
        status,
        StatusCode::CREATED,
        "§3a expected 201, got {status}: {body}"
    );
    assert!(body["thread_id"].as_str().is_some());
    assert_eq!(body["title"], "test thread");
    assert_eq!(body["is_unbound"], true);
    assert!(
        body.get("deployment_id")
            .map(|v| v.is_null())
            .unwrap_or(true)
    );
}

#[tokio::test(flavor = "multi_thread", worker_threads = 2)]
async fn quickstart_3b_bound_thread_with_user_and_assistant_messages() {
    let dep = DeploymentId::new("dep-test-3b");
    let app = build_app(Some(dep.clone())).await;

    let (status, thread) =
        create_thread(&app, serde_json::json!({ "deployment_id": dep.as_str() })).await;
    assert_eq!(status, StatusCode::CREATED, "§3b create: {status} {thread}");
    let thread_id = thread["thread_id"].as_str().unwrap().to_owned();
    assert_eq!(thread["deployment_id"], dep.as_str());
    assert_eq!(thread["is_unbound"], false);

    let (status, user_msg) = append_message(
        &app,
        &thread_id,
        serde_json::json!({
            "role": "user",
            "content": "what is the capital of France?",
        }),
    )
    .await;
    assert_eq!(
        status,
        StatusCode::CREATED,
        "§3b user msg: {status} {user_msg}"
    );
    assert_eq!(user_msg["role"], "user");
    assert_eq!(user_msg["content"], "what is the capital of France?");

    let (status, assistant_msg) = append_message(
        &app,
        &thread_id,
        serde_json::json!({
            "role": "assistant",
            "content": "Paris.",
            "sampler_effective": {
                "temperature": 0.7,
                "min_p": 0.05,
                "top_k": 64,
                "seed": 42,
            },
        }),
    )
    .await;
    assert_eq!(
        status,
        StatusCode::CREATED,
        "§3b assistant msg: {status} {assistant_msg}",
    );
    assert_eq!(assistant_msg["sampler_effective"]["temperature"], 0.7);
    assert_eq!(assistant_msg["sampler_effective"]["seed"], 42);
}

#[tokio::test(flavor = "multi_thread", worker_threads = 2)]
async fn quickstart_3c_list_threads_filtered_by_deployment() {
    let dep = DeploymentId::new("dep-3c");
    let app = build_app(Some(dep.clone())).await;
    let _ = create_thread(
        &app,
        serde_json::json!({ "deployment_id": dep.as_str(), "title": "bound" }),
    )
    .await;
    let _ = create_thread(&app, serde_json::json!({ "title": "unbound" })).await;

    let req = Request::builder()
        .uri(format!(
            "/api/v1/extensions/nexus.local-llm/chat/threads?deployment_id={}",
            dep.as_str(),
        ))
        .body(Body::empty())
        .unwrap();
    let (status, body) = json_resp(app.oneshot(req).await.unwrap()).await;
    assert_eq!(status, StatusCode::OK, "§3c list: {body}");
    let threads = body["threads"].as_array().unwrap();
    assert!(
        threads.iter().any(|t| t["title"] == "bound"),
        "bound thread present: {body}",
    );
}

#[tokio::test(flavor = "multi_thread", worker_threads = 2)]
async fn quickstart_3d_3e_set_then_clear_sampler_override() {
    let app = build_app(None).await;
    let (_, t) = create_thread(&app, serde_json::json!({ "title": "override" })).await;
    let tid = t["thread_id"].as_str().unwrap().to_owned();

    // §3d set
    let (status, body) = patch_thread(
        &app,
        &tid,
        serde_json::json!({ "sampler_override": { "temperature": 1.2, "min_p": 0.02, "top_k": 50, "seed": 7 } }),
    )
    .await;
    assert_eq!(status, StatusCode::OK, "§3d patch: {body}");
    assert_eq!(body["sampler_override"]["temperature"], 1.2);

    // §3e clear
    let (status, body) = patch_thread(
        &app,
        &tid,
        serde_json::json!({ "clear_sampler_override": true }),
    )
    .await;
    assert_eq!(status, StatusCode::OK, "§3e clear: {body}");
    assert!(body["sampler_override"].is_null());
}

#[tokio::test(flavor = "multi_thread", worker_threads = 2)]
async fn quickstart_3f_attach_unbound_thread_to_current_deployment() {
    let dep = DeploymentId::new("dep-3f");
    let app = build_app(Some(dep.clone())).await;
    let (_, unbound) = create_thread(&app, serde_json::json!({ "title": "attach-me" })).await;
    let tid = unbound["thread_id"].as_str().unwrap().to_owned();
    assert_eq!(unbound["is_unbound"], true);

    let (status, attached) = patch_thread(
        &app,
        &tid,
        serde_json::json!({ "attach_to_current_deployment": true }),
    )
    .await;
    assert_eq!(status, StatusCode::OK, "§3f attach: {attached}");
    assert_eq!(attached["deployment_id"], dep.as_str());
    assert_eq!(attached["is_unbound"], false);
}

#[tokio::test(flavor = "multi_thread", worker_threads = 2)]
async fn quickstart_3g_delete_thread_returns_204() {
    let app = build_app(None).await;
    let (_, t) = create_thread(&app, serde_json::json!({ "title": "doomed" })).await;
    let tid = t["thread_id"].as_str().unwrap().to_owned();
    let status = delete_thread(&app, &tid).await;
    assert_eq!(status, StatusCode::NO_CONTENT, "§3g expected 204 on delete",);
}
