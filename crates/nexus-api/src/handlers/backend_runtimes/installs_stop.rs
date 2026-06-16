//! `POST /api/v1/backend-runtime-installs/:install_id/stop` (T082).
//! Drains every live lease bound to this install via the
//! [`LeaseManager`] and returns the count.

use std::str::FromStr;
use std::sync::Arc;

use axum::extract::{Path, State};
use axum::http::StatusCode;
use axum::response::IntoResponse;
use serde::Serialize;

use nexus_backend_runtimes::generic::ids::RuntimeInstallId;
use nexus_backend_runtimes::generic::leases::BackendRuntimeLease;

use crate::AppState;
use crate::envelope::ApiResponse;
use crate::vram_gc::fan_out_release_memory;

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

    // Ask each live worker to free its VRAM (full model unload + CUDA
    // cache empty) BEFORE we drain + kill it. Best-effort: a worker that
    // errors or times out does not abort the stop — we proceed to drain
    // unconditionally.
    let handles: Vec<Arc<dyn BackendRuntimeLease>> = state
        .lease_manager
        .handles_for_install(&install_id)
        .await
        .into_iter()
        .map(|h| h as Arc<dyn BackendRuntimeLease>)
        .collect();
    if !handles.is_empty() {
        let (workers_notified, freed_mb) = fan_out_release_memory(handles).await;
        tracing::info!(
            install_id = %install_id,
            workers_notified,
            freed_mb,
            "released worker VRAM before stop drain",
        );
    }

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
