//! Spec 030 T086 — automated equivalent of `quickstart.md` §4 (CP2
//! migration verification).
//!
//! Original §4 has the developer hit two URLs by hand:
//!   1. `/api/v1/extensions/local-llm/chat/threads` → 404 unknown_extension
//!      (the legacy single-token id is no longer routed; it was never
//!      registered with the dispatcher — `nexus.local-llm` is)
//!   2. `/api/v1/extensions/nexus.local-llm/chat/threads` → 200 with
//!      thread list (reaches the migrated handlers via the dispatcher)
//!
//! This test reproduces both calls in-process so the post-CP2 wiring is
//! validated without running `pnpm dev`.

mod common;

use std::sync::Arc;

use axum::Router;
use axum::body::Body;
use axum::http::{Request, StatusCode};
use http_body_util::BodyExt;
use nexus_api::extension_router::{DefaultRegistry, ExtensionId, ExtensionRouterRegistry};
use serde_json::Value;
use tower::ServiceExt;

use common::{StubHf, harness_with};

fn nexus_local_llm_router() -> Router {
    Router::new().route(
        "/chat/threads",
        axum::routing::get(|| async {
            axum::Json(serde_json::json!({
                "threads": [],
                "has_more": false,
                "next_before_updated_at": null,
            }))
        }),
    )
}

async fn call(app: &Router, uri: &'static str) -> (StatusCode, Value) {
    let resp = app
        .clone()
        .oneshot(Request::builder().uri(uri).body(Body::empty()).unwrap())
        .await
        .unwrap();
    let status = resp.status();
    let bytes = resp.into_body().collect().await.unwrap().to_bytes();
    let json = serde_json::from_slice(&bytes).unwrap_or(Value::Null);
    (status, json)
}

#[tokio::test]
async fn cp2_legacy_single_token_id_returns_unknown_extension_404() {
    let h = harness_with(StubHf::with_results(vec![])).await;
    let mut state = h.state.clone();
    let registry: Arc<DefaultRegistry> = Arc::new(DefaultRegistry::new());
    registry
        .register(
            ExtensionId::parse("nexus.local-llm").unwrap(),
            nexus_local_llm_router(),
            vec!["/chat/threads".into()],
        )
        .unwrap();
    registry.seal();
    state.extension_router_registry = registry;
    let app = nexus_api::create_router(state);

    let (status, body) = call(&app, "/api/v1/extensions/local-llm/chat/threads").await;
    assert_eq!(
        status,
        StatusCode::NOT_FOUND,
        "single-token `local-llm` id was never registered with the dispatcher post-CP2",
    );
    assert_eq!(body["error"], "unknown_extension");
    assert_eq!(body["extension_id"], "local-llm");
}

#[tokio::test]
async fn cp2_dotted_id_reaches_migrated_handlers_via_dispatcher() {
    let h = harness_with(StubHf::with_results(vec![])).await;
    let mut state = h.state.clone();
    let registry: Arc<DefaultRegistry> = Arc::new(DefaultRegistry::new());
    registry
        .register(
            ExtensionId::parse("nexus.local-llm").unwrap(),
            nexus_local_llm_router(),
            vec!["/chat/threads".into()],
        )
        .unwrap();
    registry.seal();
    state.extension_router_registry = registry;
    let app = nexus_api::create_router(state);

    let (status, body) = call(&app, "/api/v1/extensions/nexus.local-llm/chat/threads").await;
    assert_eq!(
        status,
        StatusCode::OK,
        "dotted id reaches the LLM extension via the dispatcher",
    );
    assert!(
        body.get("threads").is_some(),
        "response uses spec 029's flat ThreadListPage shape (no envelope wrap)",
    );
    assert_eq!(body["has_more"], false);
}

#[tokio::test]
async fn cp2_router_source_contains_no_local_llm_routes() {
    let router_src = std::fs::read_to_string(
        std::path::Path::new(env!("CARGO_MANIFEST_DIR")).join("src/router.rs"),
    )
    .expect("read router.rs");
    let needle = "/extensions/local-llm/chat";
    assert!(
        !router_src.contains(needle),
        "host router.rs MUST NOT contain {needle} after CP2 (Principle XIII.1)",
    );
    assert!(
        !router_src.contains("extensions_local_llm"),
        "host router.rs MUST NOT reference handlers::extensions_local_llm after CP2",
    );
}

#[tokio::test]
async fn cp2_handler_directory_is_deleted() {
    let dir =
        std::path::Path::new(env!("CARGO_MANIFEST_DIR")).join("src/handlers/extensions_local_llm");
    assert!(
        !dir.exists(),
        "crates/nexus-api/src/handlers/extensions_local_llm/ MUST be deleted in CP2; found {}",
        dir.display(),
    );
}
