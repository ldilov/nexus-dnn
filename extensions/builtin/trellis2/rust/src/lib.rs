pub mod backend_client;
pub mod dispatcher;
pub mod domain;
pub mod host_adapter;
pub mod host_contract;
pub mod node_events;
pub mod register;
pub mod router;
pub mod storage;

pub use register::{Trellis2ProviderResources, Trellis2RouterProvider, EXTENSION_ID};

use std::path::PathBuf;
use std::sync::Arc;

use axum::Router;
use sqlx::SqlitePool;

use crate::backend_client::{LeaseFactory, LeaseProvider};
use crate::dispatcher::GenerationChannels;
use crate::router::AppState;
use crate::storage::Store;

pub const EXTENSION_VERSION: &str = env!("CARGO_PKG_VERSION");

pub const FALLBACK_WORKSPACE_DIR: &str = "nexus-trellis2-workspace";

pub struct Migration {
    pub version: u32,
    pub name: &'static str,
    pub sql: &'static str,
}

pub const MIGRATIONS: &[Migration] = &[Migration {
    version: 1,
    name: "generation_jobs",
    sql: include_str!("../../storage/migrations/001_generation_jobs.sql"),
}];

/// Test/embed entrypoint: build the full router over a ready pool and a
/// pluggable lease factory. Production callers use
/// [`register::Trellis2RouterProvider`] instead.
pub fn build_router_with_factory(
    pool: SqlitePool,
    factory: Arc<dyn LeaseFactory>,
    workspace_dir: PathBuf,
) -> Router {
    let store = Store::new(pool);
    let provider = Arc::new(LeaseProvider::new(factory));
    router::build_router(AppState {
        store,
        provider,
        channels: GenerationChannels::new(),
        workspace_dir,
        extension_version: EXTENSION_VERSION.to_string(),
        event_bus: None,
    })
}
