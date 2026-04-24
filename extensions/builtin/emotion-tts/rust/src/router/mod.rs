//! HTTP router mounted by the host under `/api/v1/extensions/nexus.audio.emotiontts`.
//!
//! Composed from per-family sub-routers. Phase 3 ships real handlers for
//! `runs` (the US1 MVP surface); other families remain 501 stubs until
//! their owning user story lands.

pub mod deployments;
pub mod engine_settings;
pub mod exports;
pub mod families;
pub mod mappings;
pub mod middleware;
pub mod presets;
pub mod runs;
pub mod runtime;
pub mod voice_assets;
pub mod workflows;

use std::sync::Arc;

use axum::Router;

use crate::backend_client::LeaseProvider;
use crate::host_contract::HostArtifactStore;
use crate::queue::SharedQueue;
use crate::storage::Repos;

pub fn build_router(
    repos: Repos,
    queue: SharedQueue,
    extension_version: impl Into<String>,
    provider: Option<Arc<LeaseProvider>>,
    artifact_store: Option<Arc<dyn HostArtifactStore>>,
) -> Router {
    let runs_state = runs::RunsState {
        repos: repos.clone(),
        queue: queue.clone(),
        extension_version: extension_version.into(),
    };
    let mut router = Router::new()
        .merge(runs::router(runs_state))
        .nest("/deployments", deployments::router(repos.clone()))
        .nest("/mappings", mappings::router(repos.clone()))
        .nest("/presets", presets::router(repos.clone()))
        .nest("/exports", exports::router())
        .nest("/workflow", workflows::router(repos.clone()))
        .merge(engine_settings::router())
        .merge(families::router());

    if let Some(store) = artifact_store {
        router = router.nest(
            "/voice-assets",
            voice_assets::router(repos, store, provider.clone()),
        );
    } else {
        router = router.nest("/voice-assets", voice_assets_stub());
    }

    if let Some(provider) = provider {
        router = router.merge(runtime::router(runtime::RuntimeState { provider, queue }));
    }

    router
}

fn voice_assets_stub() -> Router {
    use axum::http::StatusCode;
    Router::new().fallback(|| async { StatusCode::NOT_IMPLEMENTED })
}
