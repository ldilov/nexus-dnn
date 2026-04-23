//! `DELETE /api/v1/backend-runtime-leases/:lease_id` (T086). Releases
//! the live lease + reaps the subprocess. Returns 204 on release,
//! 404 when neither the manager nor the persistent row knows the id,
//! 409 when the lease row exists but is already in a terminal state.

use std::str::FromStr;

use axum::extract::{Path, State};
use axum::http::StatusCode;
use axum::response::IntoResponse;

use nexus_backend_runtimes::generic::enums::LeaseState;
use nexus_backend_runtimes::generic::ids::RuntimeLeaseId;
use nexus_backend_runtimes::generic::leases::{BackendRuntimeLeasesRepo, SqliteLeasesRepo};

use crate::AppState;
use crate::envelope::ApiResponse;

pub async fn delete(
    State(state): State<AppState>,
    Path(lease_id_raw): Path<String>,
) -> axum::response::Response {
    let lease_id = match RuntimeLeaseId::from_str(&lease_id_raw) {
        Ok(id) => id,
        Err(_) => {
            return ApiResponse::<()>::err(
                StatusCode::BAD_REQUEST,
                "invalid_lease_id",
                "bad_request",
                format!("`{lease_id_raw}` is not a valid ULID"),
            )
            .into_response();
        }
    };

    // If the manager has a live handle, releasing it is the fast path —
    // it flips the lease row to `released` via the StdioLease's
    // drop / release pipeline's parent host wiring (future). For v1,
    // also update the row directly so the HTTP view stays consistent.
    if let Some(handle) = state.lease_manager.get(&lease_id).await {
        let _ = state.lease_manager.release(&lease_id).await;
        // Belt + suspenders: make sure the persistent row reflects
        // the release. `StdioLease::release` doesn't update the row.
        let leases = SqliteLeasesRepo::new(state.db.pool().clone());
        let _ = leases
            .record_released(&lease_id, chrono::Utc::now().timestamp())
            .await;
        drop(handle);
        return no_content();
    }

    // No live handle — consult the persistent row so we can return the
    // right status: 404 for unknown, 409 when the row is already
    // terminal, 204 for a rare race where another worker just released.
    let leases = SqliteLeasesRepo::new(state.db.pool().clone());
    match leases.get(&lease_id).await {
        Ok(Some(row)) => {
            if matches!(row.state, LeaseState::Released | LeaseState::Failed) {
                ApiResponse::<()>::err(
                    StatusCode::CONFLICT,
                    "lease_terminal",
                    "conflict",
                    format!("lease is already in `{}`", row.state.as_str()),
                )
                .into_response()
            } else {
                // Row is non-terminal but no live handle — flip it to
                // released anyway (orphan recovery).
                let _ = leases
                    .record_released(&lease_id, chrono::Utc::now().timestamp())
                    .await;
                no_content()
            }
        }
        Ok(None) => ApiResponse::<()>::err(
            StatusCode::NOT_FOUND,
            "lease_not_found",
            "not_found",
            format!("lease `{lease_id_raw}` not found"),
        )
        .into_response(),
        Err(e) => ApiResponse::<()>::err(
            StatusCode::INTERNAL_SERVER_ERROR,
            "leases_storage_error",
            "internal",
            e.to_string(),
        )
        .into_response(),
    }
}

fn no_content() -> axum::response::Response {
    let mut response = ApiResponse::no_content().into_response();
    *response.status_mut() = StatusCode::NO_CONTENT;
    response
}
