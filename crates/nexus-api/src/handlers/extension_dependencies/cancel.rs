//! `POST /api/v1/extensions/:id/install/cancel` — cooperative cancel of the
//! active install run. Signals the cancellation token; in-flight handlers
//! observe it at their next I/O boundary (per
//! `nexus_extension_deps::context::StepContext::cancellation_token`).

use axum::extract::{Path, State};

use crate::AppState;
use crate::envelope::ApiResponse;
use crate::error::ApiError;

pub async fn cancel_install(
    State(state): State<AppState>,
    Path(extension_id): Path<String>,
) -> Result<ApiResponse<()>, ApiError> {
    let entry = state.dep_install_state.get(&extension_id).ok_or_else(|| {
        ApiError::InvalidState(format!("no install run is active for {extension_id}"))
    })?;
    let guard = entry.lock().await;
    if guard.install_run_id.is_none() {
        return Err(ApiError::InvalidState(format!(
            "no install run is active for {extension_id}"
        )));
    }
    guard.cancellation_token.cancel();
    Ok(ApiResponse::ok(()))
}
