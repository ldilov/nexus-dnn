//! `POST /api/v1/backend-runtime-installs/:install_id/stop` (T082).
//! Drains every live lease bound to this install via the
//! [`LeaseManager`] and returns the count.

use std::str::FromStr;

use axum::extract::{Path, State};
use axum::http::StatusCode;
use axum::response::IntoResponse;
use serde::Serialize;

use nexus_backend_runtimes::generic::ids::RuntimeInstallId;

use crate::AppState;
use crate::envelope::ApiResponse;

#[derive(Debug, Serialize)]
pub struct StopResponse {
    pub draining_leases: usize,
}

pub async fn stop(
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

    let count = match state
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

    ApiResponse::ok(StopResponse {
        draining_leases: count,
    })
    .into_response()
}
