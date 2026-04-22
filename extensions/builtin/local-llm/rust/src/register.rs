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
        Ok(build_router_with_chat(store_arc, self.resources.chat.clone()))
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
        let router = futures_block_on(self.build_router_async())?;
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
