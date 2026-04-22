//! Spec 030 — US2 integration coverage.
//!
//! Mounts the LLM extension's chat-history router via the generic
//! dispatcher and exercises spec 029's HTTP surface end-to-end. Validates
//! that the host file under test contains zero references to
//! `nexus.local-llm` while the routes still work.

use std::sync::Arc;

use axum::Router;
use axum::body::Body;
use axum::http::{Request, StatusCode};
use axum::routing::get;
use http_body_util::BodyExt;
use nexus_api::extension_router::{
    DefaultRegistry, ExtensionId, ExtensionRouterRegistry, SharedRegistry, dispatch,
};
use nexus_extension::{ExtensionContext, ExtensionRouterProvider, HostFacts};
use nexus_local_llm_chat_history::{
    EXTENSION_ID, LocalLlmProviderResources, LocalLlmRouterProvider,
};
use nexus_local_llm_chat_history::{HostDeploymentsClient, ids::DeploymentId};
use serde_json::Value;
use sqlx::SqlitePool;
use tower::ServiceExt;

#[derive(Default)]
struct StubHostClient;

#[async_trait::async_trait]
impl HostDeploymentsClient for StubHostClient {
    async fn current_deployment(
        &self,
    ) -> nexus_local_llm_chat_history::Result<Option<DeploymentId>> {
        Ok(None)
    }

    async fn known_deployments(
        &self,
    ) -> nexus_local_llm_chat_history::Result<Vec<DeploymentId>> {
        Ok(Vec::new())
    }
}

async fn build_pool() -> SqlitePool {
    let pool = SqlitePool::connect("sqlite::memory:")
        .await
        .expect("in-memory pool");
    nexus_local_llm_chat_history::migrations::apply_all(&pool)
        .await
        .expect("apply chat-history migrations");
    pool
}

async fn build_app_with_llm_provider() -> Router {
    let pool = build_pool().await;
    let host_client: Arc<dyn HostDeploymentsClient> = Arc::new(StubHostClient);
    let backend_bus = Arc::new(nexus_backend_runtimes::events::BroadcastPublisher::new(64));
    let chat_resources = Arc::new(
        nexus_local_llm_chat_history::ChatHandlerResources::new(
            pool.clone(),
            None,
            None,
            None,
            backend_bus.clone(),
            backend_bus.clone(),
            nexus_local_llm_chat_history::ModelLoadRegistry::new(),
        ),
    );
    let resources = LocalLlmProviderResources::new(pool, host_client, chat_resources);
    let provider = LocalLlmRouterProvider::new(resources);

    let registry: Arc<DefaultRegistry> = Arc::new(DefaultRegistry::new());
    let cx = ExtensionContext::new(provider.extension_id(), HostFacts::new("http://stub"));
    let (router, http_routes) = provider
        .build_router(&cx)
        .expect("provider build_router should succeed against in-memory sqlite");
    let id = ExtensionId::parse(EXTENSION_ID).unwrap();
    registry.register(id, router, http_routes).unwrap();
    registry.seal();

    let registry: SharedRegistry = registry;
    Router::new()
        .route(
            "/api/v1/extensions/{ext_id}/{*rest}",
            get(dispatch).post(dispatch),
        )
        .with_state(registry)
}

async fn body_json(resp: axum::response::Response) -> Value {
    let bytes = resp.into_body().collect().await.unwrap().to_bytes();
    serde_json::from_slice(&bytes).unwrap_or(Value::Null)
}

#[tokio::test(flavor = "multi_thread", worker_threads = 2)]
async fn sc_003_chat_threads_listing_via_dispatcher() {
    let app = build_app_with_llm_provider().await;
    let req = Request::builder()
        .uri("/api/v1/extensions/nexus.local-llm/chat/threads")
        .body(Body::empty())
        .unwrap();
    let resp = app.oneshot(req).await.unwrap();
    let status = resp.status();
    let body = body_json(resp).await;
    assert!(
        status.is_success() || status == StatusCode::OK,
        "expected success listing threads, got {status}: {body}",
    );
}

#[tokio::test(flavor = "multi_thread", worker_threads = 2)]
async fn host_router_source_does_not_name_local_llm_in_dispatcher_module() {
    use std::path::Path;
    let dispatcher = std::fs::read_to_string(
        Path::new(env!("CARGO_MANIFEST_DIR")).join("src/extension_router/dispatcher.rs"),
    )
    .expect("read dispatcher.rs");
    let registry = std::fs::read_to_string(
        Path::new(env!("CARGO_MANIFEST_DIR")).join("src/extension_router/registry.rs"),
    )
    .expect("read registry.rs");
    let mod_rs = std::fs::read_to_string(
        Path::new(env!("CARGO_MANIFEST_DIR")).join("src/extension_router/mod.rs"),
    )
    .expect("read mod.rs");
    let id_rs = std::fs::read_to_string(
        Path::new(env!("CARGO_MANIFEST_DIR")).join("src/extension_router/id.rs"),
    )
    .expect("read id.rs");

    for (name, src) in [
        ("dispatcher.rs", &dispatcher),
        ("registry.rs", &registry),
        ("mod.rs", &mod_rs),
        ("id.rs", &id_rs),
    ] {
        let prod = src
            .split("#[cfg(test)]")
            .next()
            .unwrap_or(src);
        for needle in ["nexus.local-llm", "local-llm", "local_llm"] {
            assert!(
                !prod.contains(needle),
                "extension_router/{name} production code contains banned literal `{needle}` (constitution XIII.1)",
            );
        }
    }
}
