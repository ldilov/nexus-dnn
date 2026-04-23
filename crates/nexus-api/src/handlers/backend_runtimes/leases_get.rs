//! `GET /api/v1/backend-runtime-leases/:lease_id`.

use std::str::FromStr;

use axum::extract::{Path, State};
use axum::http::StatusCode;
use axum::response::IntoResponse;

use nexus_backend_runtimes::generic::ids::RuntimeLeaseId;
use nexus_backend_runtimes::generic::leases::{BackendRuntimeLeasesRepo, SqliteLeasesRepo};

use super::leases_list::LeaseDto;
use crate::AppState;
use crate::envelope::ApiResponse;

pub async fn get(
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
    let leases = SqliteLeasesRepo::new(state.db.pool().clone());
    match leases.get(&lease_id).await {
        Ok(Some(row)) => ApiResponse::ok(LeaseDto {
            lease_id: row.lease_id.to_string(),
            runtime_install_id: row.runtime_install_id.to_string(),
            owner_kind: row.owner_kind.as_str().to_string(),
            owner_ref: row.owner_ref,
            transport: row.transport.as_str().to_string(),
            pid: row.pid,
            state: row.state.as_str().to_string(),
            crash_recovered: row.crash_recovered,
            last_failure_category: row.last_failure_category.map(|c| c.to_wire()),
            acquired_at: row.acquired_at,
            released_at: row.released_at,
        })
        .into_response(),
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
