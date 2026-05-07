//! `ExtensionRouterProvider` impl for the LLM extension.
//!
//! Spec 030 — registered with the host's extension router registry at
//! startup so the LLM extension's HTTP routes become reachable via
//! `/api/v1/extensions/nexus.local-llm/*` without any host-side route
//! definitions naming the extension.

use std::sync::Arc;

use axum::Router;
use nexus_extension::{BuildRouterError, ExtensionContext, ExtensionRouterProvider};
use sqlx::SqlitePool;

use crate::chat::ChatHandlerResources;
use crate::chat_history::store_sqlx::ChatHistoryStoreSqlx;
use crate::chat_history::ChatHistoryStore;
use crate::host_client::{HostDeploymentsClient, HttpHostDeploymentsClient};
use crate::router::build_router_with_chat;

pub const EXTENSION_ID: &str = "nexus.local-llm";

/// Resources the LLM provider needs to construct its router. Built once
/// at host startup and handed to `LocalLlmRouterProvider`.
#[derive(Clone)]
pub struct LocalLlmProviderResources {
    pub pool: SqlitePool,
    pub host_client: Arc<dyn HostDeploymentsClient>,
    pub chat: Arc<ChatHandlerResources>,
}

impl LocalLlmProviderResources {
    pub fn new(
        pool: SqlitePool,
        host_client: Arc<dyn HostDeploymentsClient>,
        chat: Arc<ChatHandlerResources>,
    ) -> Self {
        Self {
            pool,
            host_client,
            chat,
        }
    }

    pub fn from_host_base_url(
        pool: SqlitePool,
        host_base_url: impl Into<String>,
        chat: Arc<ChatHandlerResources>,
    ) -> Self {
        let host_client: Arc<dyn HostDeploymentsClient> =
            Arc::new(HttpHostDeploymentsClient::new(host_base_url));
        Self {
            pool,
            host_client,
            chat,
        }
    }
}

pub struct LocalLlmRouterProvider {
    resources: LocalLlmProviderResources,
}

impl LocalLlmRouterProvider {
    pub fn new(resources: LocalLlmProviderResources) -> Self {
        Self { resources }
    }

    fn http_routes() -> Vec<String> {
        vec![
            "/chat/threads".into(),
            "/chat/threads/{thread_id}".into(),
            "/chat/threads/{thread_id}/messages".into(),
            "/chat/threads/{thread_id}/generation_settings".into(),
            "/chat/threads/{thread_id}/active_model".into(),
            "/chat/threads/{thread_id}/active_model/status".into(),
            "/chat/threads/{thread_id}/inference/cancel".into(),
            "/chat/available_models".into(),
            "/chat/runtime_status".into(),
        ]
    }

    async fn build_router_async(&self) -> Result<Router, BuildRouterError> {
        let store = ChatHistoryStoreSqlx::new(
            self.resources.pool.clone(),
            self.resources.host_client.clone(),
        )
        .await
        .map_err(|e| Box::new(e) as BuildRouterError)?;
        let store_arc: Arc<dyn ChatHistoryStore> = Arc::new(store);
        Ok(build_router_with_chat(
            store_arc,
            self.resources.chat.clone(),
        ))
    }
}

impl ExtensionRouterProvider for LocalLlmRouterProvider {
    fn extension_id(&self) -> &'static str {
        EXTENSION_ID
    }

    fn build_router(
        &self,
        _cx: &ExtensionContext<'_>,
    ) -> Result<(Router, Vec<String>), BuildRouterError> {
        let router = futures_block_on(self.build_router_async()).map_err(|err| {
            tracing::error!(
                extension_id = EXTENSION_ID,
                error = %err,
                "router build failed; all requests to this extension will return 503 until restart"
            );
            err
        })?;
        Ok((router, Self::http_routes()))
    }
}

fn futures_block_on<F, T>(fut: F) -> T
where
    F: std::future::Future<Output = T>,
{
    let handle = tokio::runtime::Handle::current();
    tokio::task::block_in_place(|| handle.block_on(fut))
}

#[cfg(test)]
mod tests {
    use super::*;

    use crate::chat::inference_cancel::InferenceCancelRegistry;
    use crate::chat::load_registry::ModelLoadRegistry;
    use crate::chat_history::schema_version::StoreMode;
    use crate::error::Result as ChatHistoryResult;
    use crate::ids::DeploymentId;
    use async_trait::async_trait;
    use nexus_backend_runtimes::events::{BackendEventBus, EventPublisher, SharedPublisher};
    use sqlx::SqlitePool;

    struct StubHostClient;

    #[async_trait]
    impl HostDeploymentsClient for StubHostClient {
        async fn current_deployment(&self) -> ChatHistoryResult<Option<DeploymentId>> {
            Ok(None)
        }

        async fn known_deployments(&self) -> ChatHistoryResult<Vec<DeploymentId>> {
            Ok(Vec::new())
        }
    }

    fn build_chat_resources(pool: SqlitePool) -> Arc<ChatHandlerResources> {
        let bus = Arc::new(BackendEventBus::new(16));
        let publisher: SharedPublisher = bus.clone() as Arc<dyn EventPublisher>;
        Arc::new(ChatHandlerResources::new(
            pool,
            None,
            None,
            None,
            publisher,
            bus,
            ModelLoadRegistry::new(),
            InferenceCancelRegistry::new(),
        ))
    }

    fn build_provider(pool: SqlitePool) -> LocalLlmRouterProvider {
        let host_client: Arc<dyn HostDeploymentsClient> = Arc::new(StubHostClient);
        let chat = build_chat_resources(pool.clone());
        LocalLlmRouterProvider::new(LocalLlmProviderResources::new(pool, host_client, chat))
    }

    #[tokio::test(flavor = "multi_thread", worker_threads = 1)]
    async fn cold_start_with_no_migrations_still_registers_router() {
        let pool = SqlitePool::connect("sqlite::memory:").await.unwrap();
        let provider = build_provider(pool);
        let result = provider.build_router_async().await;
        assert!(
            result.is_ok(),
            "build_router_async must tolerate a missing ext_local_llm_meta table; got: {:?}",
            result.err().map(|e| e.to_string())
        );
    }

    #[tokio::test(flavor = "multi_thread", worker_threads = 1)]
    async fn cold_start_with_migrations_registers_router() {
        let pool = SqlitePool::connect("sqlite::memory:").await.unwrap();
        crate::chat_history::migrations::apply_all(&pool)
            .await
            .unwrap();
        let provider = build_provider(pool);
        let result = provider.build_router_async().await;
        assert!(
            result.is_ok(),
            "build_router_async should succeed when migrations have run"
        );
    }

    #[tokio::test]
    async fn store_mode_is_read_write_when_table_missing() {
        let pool = SqlitePool::connect("sqlite::memory:").await.unwrap();
        let host: Arc<dyn HostDeploymentsClient> = Arc::new(StubHostClient);
        let store = ChatHistoryStoreSqlx::new(pool, host).await.unwrap();
        assert_eq!(store.mode(), StoreMode::ReadWrite);
    }

    #[test]
    fn http_routes_advertises_inference_cancel_and_available_models() {
        let routes = LocalLlmRouterProvider::http_routes();
        assert!(routes
            .iter()
            .any(|r| r == "/chat/threads/{thread_id}/inference/cancel"));
        assert!(routes.iter().any(|r| r == "/chat/available_models"));
    }
}
