use axum::extract::{Path, State};
use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum::{Json, response::Response};
use chrono::Utc;
use nexus_backend_runtimes::models_store::{
    ModelDependency, ModelStoreError, Quantization, ResolutionContext, ZeroSizeProbe,
    list_all_visible, release_lease, resolve_dry_run,
};
use serde::{Deserialize, Serialize};

use crate::AppState;
use crate::envelope::ApiResponse;

#[derive(Debug, Serialize)]
pub struct HostModelView {
    pub install_id: String,
    pub family: String,
    pub version: String,
    pub quantization: Option<String>,
    pub variant: String,
    pub install_root: String,
    pub sha256_root: String,
    pub source_revision: String,
    pub state: String,
    pub source_kind: String,
    pub source_url: Option<String>,
    pub license_spdx: Option<String>,
    pub license_url: Option<String>,
    pub private_model: bool,
    pub owner_extension_id: Option<String>,
    pub created_at: String,
}

#[derive(Debug, Serialize)]
pub struct HostModelsResponse {
    pub installs: Vec<HostModelView>,
}

pub async fn list_host_models(State(state): State<AppState>) -> Response {
    let rows = match list_all_visible(state.db.pool(), None).await {
        Ok(r) => r,
        Err(e) => {
            let (status, code) = http_status_for_model_error(&e);
            return ApiResponse::<()>::err(status, code, "model_list", e.to_string())
                .into_response();
        }
    };
    let installs: Vec<HostModelView> = rows
        .into_iter()
        .map(|r| HostModelView {
            install_id: r.install_id,
            family: r.family,
            version: r.version,
            quantization: r.quantization,
            variant: r.variant,
            install_root: r.install_root,
            sha256_root: r.sha256_root,
            source_revision: r.source_revision,
            state: r.state,
            source_kind: r.source_kind,
            source_url: r.source_url,
            license_spdx: r.license_spdx,
            license_url: r.license_url,
            private_model: r.private_model,
            owner_extension_id: r.owner_extension_id,
            created_at: r.created_at,
        })
        .collect();
    ApiResponse::ok(HostModelsResponse { installs }).into_response()
}

#[derive(Debug, Deserialize)]
pub struct ResolveRequest {
    pub dependencies: Vec<ResolveDepDto>,
    #[serde(default)]
    pub extension_id: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct ResolveDepDto {
    pub family: String,
    pub version: String,
    #[serde(default)]
    pub revision: Option<String>,
    #[serde(default)]
    pub allow_unpinned: bool,
    #[serde(default)]
    pub min_params: Option<u64>,
    #[serde(default)]
    pub quantization: Option<String>,
    #[serde(default)]
    pub variant: Option<String>,
    #[serde(default = "default_true")]
    pub required: bool,
}

fn default_true() -> bool {
    true
}

pub async fn resolve_host_models(
    State(state): State<AppState>,
    Json(req): Json<ResolveRequest>,
) -> Response {
    let deps: Vec<ModelDependency> = req
        .dependencies
        .into_iter()
        .map(|d| ModelDependency {
            family: d.family,
            version: d.version,
            revision: d.revision,
            allow_unpinned: d.allow_unpinned,
            min_params: d.min_params,
            quantization: d.quantization.and_then(|s| s.parse::<Quantization>().ok()),
            variant: d.variant,
            required: d.required,
        })
        .collect();
    let ctx = ResolutionContext {
        extension_id: req.extension_id,
    };
    match resolve_dry_run(state.db.pool(), &deps, &ctx, &ZeroSizeProbe).await {
        Ok(report) => ApiResponse::ok(report).into_response(),
        Err(e) => {
            let (status, code) = http_status_for_model_error(&e);
            ApiResponse::<()>::err(status, code, "model_resolve", e.to_string()).into_response()
        }
    }
}

#[derive(Debug, Deserialize)]
pub struct CreateModelLeaseRequest {
    pub extension_id: String,
    pub device: String,
    #[serde(default)]
    pub vram_reserved_bytes: u64,
    #[serde(default)]
    pub device_budget_bytes: Option<u64>,
}

pub async fn create_model_lease(
    State(state): State<AppState>,
    Path(install_id): Path<String>,
    Json(req): Json<CreateModelLeaseRequest>,
) -> Response {
    let budget = req.device_budget_bytes.unwrap_or(u64::MAX);
    match nexus_backend_runtimes::models_store::acquire_lease(
        state.db.pool(),
        &install_id,
        &req.extension_id,
        &req.device,
        req.vram_reserved_bytes,
        budget,
    )
    .await
    {
        Ok(lease) => ApiResponse::ok(serde_json::json!({
            "lease_id": lease.lease_id,
            "install_id": lease.install_id,
            "extension_id": lease.extension_id,
            "device": lease.device,
            "vram_reserved_bytes": lease.vram_reserved_bytes,
            "acquired_at": lease.acquired_at,
        }))
        .into_response(),
        Err(e) => {
            let (status, code) = http_status_for_model_error(&e);
            ApiResponse::<()>::err(status, code, "model_lease", e.to_string()).into_response()
        }
    }
}

pub async fn release_model_lease(
    State(state): State<AppState>,
    Path(lease_id): Path<String>,
) -> Response {
    match release_lease(state.db.pool(), &lease_id).await {
        Ok(()) => ApiResponse::ok(serde_json::json!({
            "lease_id": lease_id,
            "released_at": Utc::now().to_rfc3339(),
        }))
        .into_response(),
        Err(e) => {
            let (status, code) = http_status_for_model_error(&e);
            ApiResponse::<()>::err(status, code, "model_lease", e.to_string()).into_response()
        }
    }
}

/// Exhaustive match over [`ModelStoreError`] — adding a new variant forces a
/// compile error here, satisfying FR-517.
pub fn http_status_for_model_error(err: &ModelStoreError) -> (StatusCode, &'static str) {
    match err {
        ModelStoreError::InstallNotFound(_) => (StatusCode::NOT_FOUND, "MODEL_INSTALL_NOT_FOUND"),
        ModelStoreError::LeasedByExtensions { .. } => {
            (StatusCode::CONFLICT, "MODEL_LEASED_BY_EXTENSIONS")
        }
        ModelStoreError::ChecksumMismatch { .. } => {
            (StatusCode::UNPROCESSABLE_ENTITY, "MODEL_CHECKSUM_MISMATCH")
        }
        ModelStoreError::InsufficientResources { .. } => {
            (StatusCode::CONFLICT, "MODEL_INSUFFICIENT_VRAM")
        }
        ModelStoreError::SourceUnreachable { .. } => {
            (StatusCode::BAD_GATEWAY, "MODEL_SOURCE_UNREACHABLE")
        }
        ModelStoreError::ManifestInvalid(_) => (StatusCode::BAD_REQUEST, "MODEL_MANIFEST_INVALID"),
        ModelStoreError::Storage(_) => (StatusCode::INTERNAL_SERVER_ERROR, "STORAGE_ERROR"),
        ModelStoreError::Io(_) => (StatusCode::INTERNAL_SERVER_ERROR, "IO_ERROR"),
    }
}
