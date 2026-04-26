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
use crate::families::FamilyRegistry;
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
    build_router_with_families(
        repos,
        queue,
        extension_version,
        provider,
        artifact_store,
        Arc::new(FamilyRegistry::new(Vec::new())),
        families::default_reconciler(),
    )
}

/// Full variant for call sites (lifecycle, tests) that want to supply
/// the loaded `FamilyRegistry` + reconciler (spec 034 US5). The simpler
/// `build_router` defaults to an empty registry — useful in early boot
/// before YAML is loaded.
pub fn build_router_with_families(
    repos: Repos,
    queue: SharedQueue,
    extension_version: impl Into<String>,
    provider: Option<Arc<LeaseProvider>>,
    artifact_store: Option<Arc<dyn HostArtifactStore>>,
    family_registry: Arc<FamilyRegistry>,
    reconciler: families::BoxReconciler,
) -> Router {
    let runs_state = runs::RunsState {
        repos: repos.clone(),
        queue: queue.clone(),
        extension_version: extension_version.into(),
    };
    let mut router = Router::new()
        .merge(runs::router(runs_state))
        .nest(
            "/deployments",
            deployments::router_with_families(repos.clone(), family_registry.clone()),
        )
        .nest("/mappings", mappings::router(repos.clone()))
        .nest("/presets", presets::router(repos.clone()))
        .nest(
            "/exports",
            exports::router(repos.clone(), artifact_store.clone()),
        )
        .nest("/workflow", workflows::router(repos.clone()))
        .merge(engine_settings::router(repos.clone()))
        .merge(families::router(families::FamiliesState {
            registry: family_registry,
            reconciler,
        }));

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
    use axum::response::{IntoResponse, Json};
    use serde_json::json;
    Router::new().fallback(|| async {
        // Match the host's `ErrorEnvelope` shape so the frontend's
        // `apiFetch` error handler can surface a useful message instead
        // of a bare 501 with no body. The voice-assets surface is
        // unavailable when the host did not pass a `HostArtifactStore`
        // into `build_router_with_families` — that's a host
        // configuration issue, not a route-not-found.
        let body = json!({
            "status": "error",
            "category": "not_configured",
            "message": "voice asset store not configured by host — \
                        ensure HostArtifactStore is wired into \
                        build_router_with_families at extension load time",
            "request_id": null,
        });
        (StatusCode::SERVICE_UNAVAILABLE, Json(body)).into_response()
    })
}
