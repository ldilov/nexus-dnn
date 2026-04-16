//! `POST /api/v1/modules/{id}/blueprint/dry-run` (FR-029). Produces an
//! ephemeral execution plan without persisting a `runs` row.

use axum::Json;
use axum::extract::{Path, State};
use axum::http::StatusCode;
use axum::response::IntoResponse;
use uuid::Uuid;

use crate::AppState;
use crate::envelope::ApiResponse;
use crate::error::ApiError;

use super::envelope::{DryRunPlan, DryRunRequest};
use super::module_id::ModuleId;

pub async fn run(
    State(_state): State<AppState>,
    Path(module_id_raw): Path<String>,
    Json(_body): Json<DryRunRequest>,
) -> Result<impl IntoResponse, ApiError> {
    let module_id = ModuleId::parse(module_id_raw).map_err(|_| {
        ApiError::structured(
            StatusCode::BAD_REQUEST,
            "module.invalid_id",
            "module_id does not match the expected shape",
        )
    })?;
    if module_id.is_draft() {
        return Err(ApiError::structured(
            StatusCode::BAD_REQUEST,
            "module.draft_id_not_allowed",
            "draft ids are only accepted by the materialize endpoint",
        ));
    }

    let plan = DryRunPlan {
        plan_id: format!("plan_{}", Uuid::new_v4()),
        steps: Vec::new(),
        warnings: Vec::new(),
        diagnostics: vec![
            "dry-run planner is queued for implementation; returning empty plan \
             so the UI can render the inline spinner"
                .into(),
        ],
    };
    Ok((StatusCode::OK, Json(ApiResponse::ok(plan))))
}
