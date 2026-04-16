//! `POST /api/v1/modules/user:draft:{uuid}/materialize` (FR-BM04).
//!
//! v1 stub: wiring to `DeploymentSaveService::save` plus the short-TTL
//! idempotency map lands in a follow-up commit. Endpoint currently
//! returns 501 with the structured `module.materialize_not_implemented`
//! code so clients get a predictable response.

use axum::Json;
use axum::extract::{Path, State};
use axum::http::StatusCode;
use axum::response::IntoResponse;
use regex_lite::Regex;
use std::sync::LazyLock;

use crate::AppState;
use crate::envelope::ApiResponse;
use crate::error::ApiError;

use super::envelope::{MaterializeRequest, MaterializeResponse};

static UUID_V4_RE: LazyLock<Regex> = LazyLock::new(|| {
    Regex::new(r"^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$")
        .expect("uuid-v4 regex is valid")
});

pub async fn materialize(
    State(_state): State<AppState>,
    Path(uuid_str): Path<String>,
    Json(_body): Json<MaterializeRequest>,
) -> Result<impl IntoResponse, ApiError> {
    if !UUID_V4_RE.is_match(&uuid_str) {
        return Err(ApiError::structured(
            StatusCode::BAD_REQUEST,
            "module.draft_uuid_invalid",
            "draft uuid does not match UUID v4 format",
        ));
    }

    Err(ApiError::structured(
        StatusCode::NOT_IMPLEMENTED,
        "module.materialize_not_implemented",
        "blank-module materialize is queued for implementation; \
         keep the draft client-side until the endpoint lands",
    ))
    .map(|_: ()| (StatusCode::CREATED, Json(ApiResponse::ok(stub_response()))))
}

fn stub_response() -> MaterializeResponse {
    MaterializeResponse {
        module_id: super::ModuleId::blank(),
        deployment_id: String::new(),
        deployment_revision_id: String::new(),
    }
}
