//! HTTP router mounted by the host under `/api/v1/extensions/nexus.audio.emotiontts`.
//!
//! Sub-routers live in sibling modules, one per resource family. Phase 2 ships
//! scaffolds only — real handlers land per user story (Phase 3+).

pub mod deployments;
pub mod exports;
pub mod mappings;
pub mod middleware;
pub mod presets;
pub mod runs;
pub mod voice_assets;

use std::sync::Arc;

use axum::Router;

use crate::host_contract::HostStoragePool;

#[derive(Clone)]
pub struct RouterState {
    pub pool: Arc<dyn HostStoragePool>,
}

#[must_use]
pub fn build_router(pool: Arc<dyn HostStoragePool>) -> Router {
    let state = RouterState { pool };
    Router::new()
        .nest("/deployments", deployments::router())
        .nest("/voice-assets", voice_assets::router())
        .nest("/mappings", mappings::router())
        .nest("/presets", presets::router())
        .nest("/runs", runs::router())
        .nest("/exports", exports::router())
        .with_state(state)
}
