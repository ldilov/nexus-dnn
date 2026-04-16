//! Modules surface — aggregate read endpoints over `extensions` / `recipes` /
//! `workflows` / `deployments` plus sugar write endpoints for the one-click
//! Deploy Instance flow, Blueprint dry-run, and Blank Module materialize
//! (spec 019 FR-027..FR-031, FR-BM04).

pub mod aggregator;
pub mod deploy_shortcut;
pub mod draft_map;
pub mod dry_run;
pub mod envelope;
pub mod materialize;
pub mod module_id;

use axum::Router;
use axum::routing::{get, post};

use crate::AppState;

pub use module_id::{ModuleId, ModuleIdKind, ModuleIdParseError};

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/", get(aggregator::list))
        .route("/{module_id}", get(aggregator::detail))
        .route("/{module_id}/blueprint", get(aggregator::blueprint))
        .route("/{module_id}/deployments", post(deploy_shortcut::create))
        .route("/{module_id}/blueprint/dry-run", post(dry_run::run))
}

/// Separate router for the draft-materialize endpoint so the `user:draft:{uuid}`
/// path sits at its own collision-safe route. Mounted under /api/v1/modules.
pub fn draft_router() -> Router<AppState> {
    Router::new().route(
        "/user:draft:{uuid}/materialize",
        post(materialize::materialize),
    )
}
