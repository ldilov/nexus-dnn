pub mod backend_client;
pub mod dispatcher;
pub mod domain;
pub mod host_adapter;
pub mod host_contract;
pub mod register;
pub mod router;
pub mod storage;

pub use register::{Svi2ProviderResources, Svi2RouterProvider, EXTENSION_ID};

use std::path::PathBuf;
use std::sync::Arc;

use axum::Router;
use sqlx::SqlitePool;

use crate::backend_client::{LeaseFactory, LeaseProvider};
use crate::dispatcher::RenderChannels;
use crate::router::AppState;
use crate::storage::Store;

pub const EXTENSION_VERSION: &str = env!("CARGO_PKG_VERSION");

pub const FALLBACK_WORKSPACE_DIR: &str = "nexus-svi2-pro-workspace";

pub struct Migration {
    pub version: u32,
    pub name: &'static str,
    pub sql: &'static str,
}

pub const MIGRATIONS: &[Migration] = &[
    Migration {
        version: 1,
        name: "render_jobs",
        sql: include_str!("../../storage/migrations/001_render_jobs.sql"),
    },
    Migration {
        version: 2,
        name: "settings",
        sql: include_str!("../../storage/migrations/002_settings.sql"),
    },
];

/// Test/embed entrypoint: build the full router over a ready pool and a
/// pluggable lease factory. Production callers use
/// [`register::Svi2RouterProvider`] instead.
#[must_use]
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
        channels: RenderChannels::new(),
        workspace_dir,
        extension_version: EXTENSION_VERSION.to_string(),
    })
}
