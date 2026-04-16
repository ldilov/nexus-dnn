//! `POST /api/v1/modules/{module_id}/deployments` sugar endpoint (FR-028).
//! Delegates to `DeploymentSaveService::save` after resolving the selected
//! recipe and default workflow from the module.

use axum::Json;
use axum::extract::{Path, State};
use axum::http::StatusCode;
use axum::response::IntoResponse;

use crate::AppState;
use crate::envelope::ApiResponse;
use crate::error::ApiError;

use super::envelope::DeployFromModuleRequest;
use super::module_id::{ModuleId, ModuleIdKind};

pub async fn create(
    State(_state): State<AppState>,
    Path(module_id_raw): Path<String>,
    Json(_body): Json<DeployFromModuleRequest>,
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
            "draft ids are only accepted by /modules/user:draft:{uuid}/materialize",
        ));
    }

    if matches!(module_id.kind(), ModuleIdKind::Blank) {
        return Err(ApiError::structured(
            StatusCode::UNPROCESSABLE_ENTITY,
            "module.no_blueprint",
            "the blank module cannot be deployed — use the materialize endpoint",
        ));
    }

    // v1 stub: the shortcut will delegate to DeploymentSaveService::save in a
    // follow-up commit once the call-site mapping from (module_id, overrides)
    // to SaveRequest is wired. The spec (FR-028) gates this behind its own
    // contract tests; this handler returns 501 for now so callers get a
    // structured response instead of a missing route.
    Err(ApiError::structured(
        StatusCode::NOT_IMPLEMENTED,
        "module.deploy_not_implemented",
        "deploy-from-module shortcut is queued for implementation; \
         POST /api/v1/deployments directly in the meantime",
    ))
    .map(|_: ()| (StatusCode::CREATED, Json(ApiResponse::ok(()))))
}
