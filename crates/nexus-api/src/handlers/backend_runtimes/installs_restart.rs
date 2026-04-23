//! `POST /api/v1/backend-runtime-installs/:install_id/restart` (T083).
//!
//! Drains every live lease bound to this install, then immediately
//! acquires a fresh one with a default preview_session owner.
//! Returns `{new_lease_id, state, pid, stopped_leases}`.

use std::str::FromStr;

use axum::extract::{Path, State};
use axum::http::StatusCode;
use axum::response::IntoResponse;
use serde::Serialize;

use nexus_backend_runtimes::generic::catalog::{BackendRuntimeCatalogRepo, SqliteCatalogRepo};
use nexus_backend_runtimes::generic::enums::OwnerKind;
use nexus_backend_runtimes::generic::ids::RuntimeInstallId;
use nexus_backend_runtimes::generic::installs::{
    BackendRuntimeInstallsRepo, SqliteInstallsRepo,
};
use nexus_backend_runtimes::generic::leases::{
    AcquireOptions, BackendRuntimeLease, LeaseError, SqliteLeasesRepo, acquire_lease,
};

use crate::AppState;
use crate::envelope::ApiResponse;

#[derive(Debug, Serialize)]
pub struct RestartResponse {
    pub new_lease_id: String,
    pub state: &'static str,
    pub pid: Option<i32>,
    pub stopped_leases: usize,
}

pub async fn restart(
    State(state): State<AppState>,
    Path(install_id_raw): Path<String>,
) -> axum::response::Response {
    let install_id = match RuntimeInstallId::from_str(&install_id_raw) {
        Ok(id) => id,
        Err(_) => {
            return ApiResponse::<()>::err(
                StatusCode::BAD_REQUEST,
                "invalid_install_id",
                "bad_request",
                format!("`{install_id_raw}` is not a valid ULID"),
            )
            .into_response();
        }
    };

    // Drain first.
    let stopped = match state
        .lease_manager
        .release_all_for_install(&install_id)
        .await
    {
        Ok(n) => n,
        Err(e) => {
            return ApiResponse::<()>::err(
                StatusCode::INTERNAL_SERVER_ERROR,
                "lease_release_failed",
                "internal",
                e.to_string(),
            )
            .into_response();
        }
    };

    // Then re-acquire. Duplicates most of installs_start.rs's resolution
    // logic — lightweight enough that sharing via a helper would obscure
    // rather than simplify.
    let installs = SqliteInstallsRepo::new(state.db.pool().clone());
    let install = match installs.get(&install_id).await {
        Ok(Some(i)) => i,
        Ok(None) => {
            return ApiResponse::<()>::err(
                StatusCode::NOT_FOUND,
                "install_not_found",
                "not_found",
                format!("install `{install_id_raw}` not found"),
            )
            .into_response();
        }
        Err(e) => return repo_500(e.to_string()),
    };

    let catalog = SqliteCatalogRepo::new(state.db.pool().clone());
    let entry = match catalog.find_by_id(&install.runtime_id).await {
        Ok(Some(e)) => e,
        Ok(None) => {
            return ApiResponse::<()>::err(
                StatusCode::CONFLICT,
                "runtime_not_found_in_catalog",
                "conflict",
                format!("runtime `{}` no longer catalogued", install.runtime_id),
            )
            .into_response();
        }
        Err(e) => return repo_500(e.to_string()),
    };

    let leases = SqliteLeasesRepo::new(state.db.pool().clone());
    let lease = match acquire_lease(
        install_id,
        entry.runtime_family,
        AcquireOptions {
            owner_kind: OwnerKind::PreviewSession,
            owner_ref: format!("restart-{install_id}"),
        },
        &installs,
        &leases,
        &state.family_handlers,
        None,
    )
    .await
    {
        Ok(l) => l,
        Err(LeaseError::RuntimeUnavailable) => {
            return ApiResponse::<()>::err(
                StatusCode::CONFLICT,
                "runtime_unavailable",
                "conflict",
                "install is not validated or no family handler registered".into(),
            )
            .into_response();
        }
        Err(e) => return repo_500(e.to_string()),
    };

    let new_lease_id = lease.id();
    let pid = lease.pid().map(|p| p as i32);
    let state_str = lease.state().as_str();
    state.lease_manager.register(lease.clone(), install_id).await;

    ApiResponse::ok(RestartResponse {
        new_lease_id: new_lease_id.to_string(),
        state: state_str,
        pid,
        stopped_leases: stopped,
    })
    .into_response()
}

fn repo_500(message: String) -> axum::response::Response {
    ApiResponse::<()>::err(
        StatusCode::INTERNAL_SERVER_ERROR,
        "install_restart_failed",
        "internal",
        message,
    )
    .into_response()
}
