//! Spec 030 T036 — automated equivalent of `quickstart.md` §2 dispatcher
//! smoke test.
//!
//! Original §2 has the developer run `pnpm dev` and execute three curl
//! commands by hand. This test reproduces them in-process via axum so
//! the dispatcher path is validated without a live host. Manual sign-off
//! against the live dev server is still recommended as final PR
//! verification, but this test gates the same behaviour automatically
//! on every workspace build.

mod common;

use std::sync::Arc;

use axum::Router;
use axum::body::Body;
use axum::http::{Request, StatusCode};
use http_body_util::BodyExt;
use nexus_api::extension_router::{
    DefaultRegistry, ExtensionId, ExtensionRouterRegistry,
};
use nexus_storage::Database;
use nexus_storage::records::ExtensionRecord;
use serde_json::Value;
use tower::ServiceExt;

use common::{harness_with, StubHf};

fn nexus_local_llm_record() -> ExtensionRecord {
    ExtensionRecord {
        id: "nexus.local-llm".into(),
        name: Some("Local LLM Chat".into()),
        version: "0.2.0".into(),
        description: None,
        publisher: None,
        host_api_compat: ">=0.1.0".into(),
        protocol_compat: ">=0.1.0".into(),
        runtime_family: "native".into(),
        entrypoint: "n/a".into(),
        capabilities: None,
        status: "active".into(),
        directory: "/tmp/nexus-local-llm".into(),
        installed_at: "2026-04-22T00:00:00Z".into(),
        recipe_count: Some(0),
        ui_contribution_count: Some(0),
        validation_errors: None,
        primary_recipe_id: None,
        default_workflow_id: None,
        icon_kind: None,
        icon_symbol: None,
        icon_svg: None,
    }
}

fn synthetic_chat_router() -> Router {
    Router::new().route(
        "/chat/threads",
        axum::routing::post(|axum::Json(_): axum::Json<serde_json::Value>| async {
            (
                StatusCode::CREATED,
                axum::Json(serde_json::json!({
                    "thread_id": "th-quickstart-stub",
                    "extension_id": "nexus.local-llm",
                    "title_resolved": "dispatcher test",
                    "created_at": "2026-04-22T00:00:00Z",
                    "updated_at": "2026-04-22T00:00:00Z",
                    "is_unbound": true,
                })),
            )
        }),
    )
}

async fn json_body(resp: axum::response::Response) -> (StatusCode, Value) {
    let status = resp.status();
    let bytes = resp.into_body().collect().await.unwrap().to_bytes();
    let json = serde_json::from_slice(&bytes).unwrap_or(Value::Null);
    (status, json)
}

#[tokio::test]
async fn quickstart_section_2_dispatcher_smoke() {
    let h = harness_with(StubHf::with_results(vec![])).await;
    h.state.db.insert_extension(&nexus_local_llm_record()).await.unwrap();

    let mut state = h.state.clone();
    let registry: Arc<DefaultRegistry> = Arc::new(DefaultRegistry::new());
    registry
        .register(
            ExtensionId::parse("nexus.local-llm").unwrap(),
            synthetic_chat_router(),
            vec!["/chat/threads".into()],
        )
        .unwrap();
    registry.seal();
    state.extension_router_registry = registry;

    let app = nexus_api::create_router(state);

    let create = app
        .clone()
        .oneshot(
            Request::builder()
                .method("POST")
                .uri("/api/v1/extensions/nexus.local-llm/chat/threads")
                .header("content-type", "application/json")
                .body(Body::from("{\"title\":\"dispatcher test\"}"))
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, body) = json_body(create).await;
    assert_eq!(status, StatusCode::CREATED, "POST chat/threads → 201");
    assert_eq!(body["title_resolved"], "dispatcher test");
    assert_eq!(body["extension_id"], "nexus.local-llm");

    let unknown = app
        .clone()
        .oneshot(
            Request::builder()
                .uri("/api/v1/extensions/does-not-exist/anything")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, body) = json_body(unknown).await;
    assert_eq!(status, StatusCode::NOT_FOUND);
    assert_eq!(body["error"], "unknown_extension");
    assert_eq!(body["extension_id"], "does-not-exist");

    let list = app
        .oneshot(
            Request::builder()
                .uri("/api/v1/extensions")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    let (status, body) = json_body(list).await;
    assert_eq!(status, StatusCode::OK);
    let items = body["data"]["items"].as_array().expect("items");
    let llm = items
        .iter()
        .find(|i| i["id"].as_str() == Some("nexus.local-llm"))
        .expect("nexus.local-llm in listing");
    assert_eq!(llm["registry_state"], "ok");
    assert_eq!(llm["http_routes"][0], "/chat/threads");
}
