//! `DELETE /api/v1/backend-runtime-installs/:install_id` (T087a).
//!
//! Marks an install as `abandoned` so the host's artifact-store
//! retention sweep can reclaim the install path. Rejects with 409
//! when any live lease is bound to this install — the caller must
//! `POST /stop` first.

use std::str::FromStr;

use axum::extract::{Path, State};
use axum::http::StatusCode;
use axum::response::IntoResponse;

use nexus_backend_runtimes::generic::ids::RuntimeInstallId;
use nexus_backend_runtimes::generic::installs::{BackendRuntimeInstallsRepo, SqliteInstallsRepo};

use crate::AppState;
use crate::envelope::ApiResponse;

pub async fn delete(
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

    // Block uninstall while a live lease exists — data-model.md §9 says
    // uninstall cascades to `abandoned`, but only after all consumers
    // have been drained.
    let live_count = state
        .lease_manager
        .live_count_for_install(&install_id)
        .await;
    if live_count > 0 {
        return ApiResponse::<()>::err(
            StatusCode::CONFLICT,
            "install_has_live_leases",
            "conflict",
            format!("install has {live_count} live lease(s); POST /stop before DELETE"),
        )
        .into_response();
    }

    let installs = SqliteInstallsRepo::new(state.db.pool().clone());
    let existing = match installs.get(&install_id).await {
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

    // Single-row update via mark_abandoned_for_runtime — but that affects
    // every install for this runtime. Scope to this install by using
    // update_status with Abandoned; soft-FK semantics mean the catalog
    // row is untouched.
    use nexus_backend_runtimes::generic::enums::InstallStatus;
    if let Err(e) = installs
        .update_status(&install_id, InstallStatus::Abandoned, None)
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
    drop(existing);

    let mut response = ApiResponse::no_content().into_response();
    *response.status_mut() = StatusCode::NO_CONTENT;
    response
}
