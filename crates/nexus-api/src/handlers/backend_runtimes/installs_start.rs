//! `POST /api/v1/backend-runtime-installs/:install_id/start` (T081).
//!
//! Resolves the install + its catalog entry (for the runtime family),
//! calls [`acquire_lease`] which spawns the worker + handshakes, and
//! registers the resulting handle with the [`LeaseManager`] so
//! subsequent `get` / `stop` / `delete` calls can find it.

use std::str::FromStr;

use axum::extract::{Path, State};
use axum::http::StatusCode;
use axum::response::IntoResponse;
use serde::{Deserialize, Serialize};

use nexus_backend_runtimes::generic::catalog::{BackendRuntimeCatalogRepo, SqliteCatalogRepo};
use nexus_backend_runtimes::generic::enums::OwnerKind;
use nexus_backend_runtimes::generic::ids::RuntimeInstallId;
use nexus_backend_runtimes::generic::installs::{BackendRuntimeInstallsRepo, SqliteInstallsRepo};
use nexus_backend_runtimes::generic::leases::{
    AcquireOptions, BackendRuntimeLease, LeaseError, SqliteLeasesRepo, acquire_lease,
};

use crate::AppState;
use crate::envelope::ApiResponse;

#[derive(Debug, Deserialize, Default)]
pub struct StartRequest {
    #[serde(default)]
    pub owner_kind: Option<String>,
    #[serde(default)]
    pub owner_ref: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct StartResponse {
    pub lease_id: String,
    pub state: &'static str,
    pub pid: Option<i32>,
}

pub async fn start(
    State(state): State<AppState>,
    Path(install_id_raw): Path<String>,
    body: Option<axum::Json<StartRequest>>,
) -> axum::response::Response {
    let install_id = match RuntimeInstallId::from_str(&install_id_raw) {
        Ok(id) => id,
        Err(_) => {
            return bad_request("invalid_install_id", "not a valid ULID".into());
        }
    };
    let req = body.map(|axum::Json(b)| b).unwrap_or_default();

    let owner_kind = match req.owner_kind.as_deref() {
        None | Some("preview_session") => OwnerKind::PreviewSession,
        Some("deployment") => OwnerKind::Deployment,
        Some("run") => OwnerKind::Run,
        Some(other) => {
            return bad_request(
                "invalid_owner_kind",
                format!("unknown owner_kind `{other}`"),
            );
        }
    };
    let owner_ref = req
        .owner_ref
        .unwrap_or_else(|| format!("http-start-{install_id}"));

    // Resolve runtime family via catalog lookup on the install's runtime_id.
    let installs = SqliteInstallsRepo::new(state.db.pool().clone());
    let install = match installs.get(&install_id).await {
        Ok(Some(i)) => i,
        Ok(None) => return not_found("install_not_found", format!("install `{install_id_raw}`")),
        Err(e) => return repo_500("installs_storage_error", e.to_string()),
    };

    let catalog = SqliteCatalogRepo::new(state.db.pool().clone());
    let entry = match catalog.find_by_id(&install.runtime_id).await {
        Ok(Some(e)) => e,
        Ok(None) => {
            return ApiResponse::<()>::err(
                StatusCode::CONFLICT,
                "runtime_not_found_in_catalog",
                "conflict",
                format!(
                    "install {install_id_raw} refers to runtime `{}` which is no longer in the catalog",
                    install.runtime_id
                ),
            )
            .into_response();
        }
        Err(e) => return repo_500("catalog_storage_error", e.to_string()),
    };

    let leases_repo = SqliteLeasesRepo::new(state.db.pool().clone());
    let lease = match acquire_lease(
        install_id,
        entry.runtime_family,
        AcquireOptions {
            owner_kind,
            owner_ref,
        },
        &installs,
        &leases_repo,
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
        Err(e) => return repo_500("lease_acquire_failed", e.to_string()),
    };

    let lease_id = lease.id();
    let pid = lease.pid().map(|p| p as i32);
    state
        .lease_manager
        .register(lease.clone(), install_id)
        .await;

    let resp = StartResponse {
        lease_id: lease_id.to_string(),
        state: lease.state().as_str(),
        pid,
    };
    ApiResponse::ok(resp).into_response()
}

fn bad_request(code: &str, message: String) -> axum::response::Response {
    ApiResponse::<()>::err(StatusCode::BAD_REQUEST, code, "bad_request", message).into_response()
}

fn not_found(code: &str, message: String) -> axum::response::Response {
    ApiResponse::<()>::err(StatusCode::NOT_FOUND, code, "not_found", message).into_response()
}

fn repo_500(code: &str, message: String) -> axum::response::Response {
    ApiResponse::<()>::err(StatusCode::INTERNAL_SERVER_ERROR, code, "internal", message)
        .into_response()
}
