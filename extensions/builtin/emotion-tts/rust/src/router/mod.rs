//! HTTP router mounted by the host under `/api/v1/extensions/nexus.audio.emotiontts`.
//!
//! Composed from per-family sub-routers. Phase 3 ships real handlers for
//! `runs` (the US1 MVP surface); other families remain 501 stubs until
//! their owning user story lands.

pub mod deployments;
pub mod exports;
pub mod mappings;
pub mod middleware;
pub mod presets;
pub mod runs;
pub mod runtime;
pub mod voice_assets;

use std::sync::Arc;

use axum::Router;

use crate::backend_client::LeaseProvider;
use crate::queue::SharedQueue;
use crate::storage::Repos;

pub fn build_router(
    repos: Repos,
    queue: SharedQueue,
    extension_version: impl Into<String>,
    provider: Option<Arc<LeaseProvider>>,
) -> Router {
    let runs_state = runs::RunsState {
        repos,
        queue: queue.clone(),
        extension_version: extension_version.into(),
    };
    let mut router = Router::new()
        .merge(runs::router(runs_state))
        .nest("/deployments", deployments::router())
        .nest("/voice-assets", voice_assets::router())
        .nest("/mappings", mappings::router())
        .nest("/presets", presets::router())
        .nest("/exports", exports::router());

    if let Some(provider) = provider {
        router = router.merge(runtime::router(runtime::RuntimeState { provider, queue }));
    }

    router
}
