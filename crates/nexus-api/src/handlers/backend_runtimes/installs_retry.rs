//! `POST /api/v1/backend-runtime-installs/:install_id/retry` (T067).
//!
//! Flips a `failed` install back to `pending` so the pipeline can re-run.
//! Per FR-028 + R-08, the cached archive short-circuits via `artifact_hash`
//! when the pipeline runs again — that machinery lands with the family
//! handler registry wiring.

use std::str::FromStr;

use axum::extract::{Path, State};
use axum::http::StatusCode;
use axum::response::IntoResponse;
use serde::Serialize;

use nexus_backend_runtimes::generic::enums::InstallStatus;
use nexus_backend_runtimes::generic::ids::RuntimeInstallId;
use nexus_backend_runtimes::generic::installs::{BackendRuntimeInstallsRepo, SqliteInstallsRepo};

use crate::AppState;
use crate::envelope::ApiResponse;

#[derive(Debug, Serialize)]
pub struct RetryResponse {
    pub runtime_install_id: String,
    pub resumed_from_phase: &'static str,
}

pub async fn retry(
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

    let repo = SqliteInstallsRepo::new(state.db.pool().clone());
    let existing = match repo.get(&install_id).await {
        Ok(Some(r)) => r,
        Ok(None) => {
            return ApiResponse::<()>::err(
                StatusCode::NOT_FOUND,
                "install_not_found",
                "not_found",
                format!("install `{install_id_raw}` not found"),
            )
            .into_response();
        }
        Err(e) => {
            return ApiResponse::<()>::err(
                StatusCode::INTERNAL_SERVER_ERROR,
                "installs_storage_error",
                "internal",
                e.to_string(),
            )
            .into_response();
        }
    };

    // Only `failed` installs are retryable. `abandoned` is terminal-by-policy.
    if !matches!(existing.status, InstallStatus::Failed) {
        return ApiResponse::<()>::err(
            StatusCode::CONFLICT,
            "install_not_retryable",
            "conflict",
            format!(
                "install is in `{}`; only `failed` installs may be retried",
                existing.status.as_str()
            ),
        )
        .into_response();
    }

    if let Err(e) = repo
        .update_status(&install_id, InstallStatus::Pending, None)
        .await
    {
        return ApiResponse::<()>::err(
            StatusCode::INTERNAL_SERVER_ERROR,
            "installs_storage_error",
            "internal",
            e.to_string(),
        )
        .into_response();
    }

    let resp = RetryResponse {
        runtime_install_id: install_id.to_string(),
        resumed_from_phase: "resolve",
    };
    let mut response = ApiResponse::ok(resp).into_response();
    *response.status_mut() = StatusCode::ACCEPTED;
    response
}
