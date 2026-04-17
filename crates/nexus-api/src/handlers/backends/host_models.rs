use axum::extract::{Path, State};
use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum::{Json, response::Response};
use chrono::Utc;
use nexus_models_store::{
    ModelDependency, ModelStoreError, Quantization, ResolutionContext, ZeroSizeProbe,
    install_exists, list_active_dependents, list_all_visible, release_lease, resolve_dry_run,
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
            crate::handlers::errors::log_handler_error(&e, "GET /host-models", code, None);
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
            crate::handlers::errors::log_handler_error(&e, "POST /host-models/resolve", code, None);
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
    match nexus_models_store::acquire_lease(
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
            crate::handlers::errors::log_handler_error(&e, "host-models/leases", code, None);
            ApiResponse::<()>::err(status, code, "model_lease", e.to_string()).into_response()
        }
    }
}

#[derive(Debug, Deserialize)]
pub struct InstallHostModelRequest {
    pub source: String,
    pub repo_id: String,
    #[serde(default)]
    pub revision: Option<String>,
    #[serde(default)]
    pub files: Vec<String>,
    #[serde(default)]
    pub display_name: Option<String>,
}

/// `POST /api/v1/host-models` — host-scope model install.
///
/// Validates the request envelope and returns `501 host_install_pending`
/// until the full pipeline wiring lands. The 501 envelope is stable so
/// frontend clients render it as a structured "coming soon" message.
pub async fn install_host_model(
    State(_state): State<AppState>,
    Json(req): Json<InstallHostModelRequest>,
) -> Response {
    if req.repo_id.trim().is_empty() {
        return ApiResponse::<()>::err(
            StatusCode::BAD_REQUEST,
            "invalid_request",
            "validation",
            "repo_id required".into(),
        )
        .into_response();
    }
    if req.source != "huggingface" {
        return ApiResponse::<()>::err(
            StatusCode::BAD_REQUEST,
            "invalid_request",
            "validation",
            format!(
                "unsupported source '{}'; only 'huggingface' is accepted",
                req.source
            ),
        )
        .into_response();
    }
    if req.files.is_empty() {
        return ApiResponse::<()>::err(
            StatusCode::BAD_REQUEST,
            "invalid_request",
            "validation",
            "files must contain at least one entry".into(),
        )
        .into_response();
    }

    ApiResponse::<()>::err(
        StatusCode::NOT_IMPLEMENTED,
        "host_install_pending",
        "not_implemented",
        format!(
            "host-scope install for '{}' is pending — see spec 020 tasks T210–T214 (POST /host-models pipeline wiring)",
            req.repo_id
        ),
    )
    .into_response()
}

#[derive(Debug, Serialize)]
pub struct DependentEntry {
    pub extension_id: String,
    pub display_name: String,
    pub kind: DependentKind,
}

#[derive(Debug, Serialize, Clone, Copy)]
#[serde(rename_all = "snake_case")]
#[non_exhaustive]
pub enum DependentKind {
    Lease,
}

#[derive(Debug, Serialize)]
pub struct DependentsResponse {
    pub count: u32,
    pub extensions: Vec<DependentEntry>,
}

/// Spec 020 FR-Q3-06 — `GET /api/v1/host-models/{install_id}/dependents`.
/// Thin read projection over `host_model_leases` (kind = `Lease`).
/// `declared_dep` kind is reserved for a future slice that scans extension
/// manifests for matching `ModelDependency` entries; not in scope here.
pub async fn list_host_model_dependents(
    State(state): State<AppState>,
    Path(install_id): Path<String>,
) -> Response {
    match install_exists(state.db.pool(), &install_id).await {
        Ok(false) => {
            return ApiResponse::<()>::not_found(format!(
                "host model install {install_id} not found"
            ))
            .into_response();
        }
        Ok(true) => {}
        Err(e) => {
            let (status, code) = http_status_for_model_error(&e);
            crate::handlers::errors::log_handler_error(
                &e,
                "GET /host-models/{install_id}/dependents",
                code,
                None,
            );
            return ApiResponse::<()>::err(status, code, "model_dependents", e.to_string())
                .into_response();
        }
    }

    let ext_ids = match list_active_dependents(state.db.pool(), &install_id).await {
        Ok(ids) => ids,
        Err(e) => {
            let (status, code) = http_status_for_model_error(&e);
            crate::handlers::errors::log_handler_error(
                &e,
                "GET /host-models/{install_id}/dependents",
                code,
                None,
            );
            return ApiResponse::<()>::err(status, code, "model_dependents", e.to_string())
                .into_response();
        }
    };

    use nexus_extension::ExtensionRegistry;
    let registry = state.extension_registry.as_ref();
    let extensions: Vec<DependentEntry> = ext_ids
        .into_iter()
        .map(|ext_id| {
            let display_name = registry
                .get_extension(&ext_id)
                .and_then(|ext| ext.manifest.extension.name.clone())
                .unwrap_or_else(|| ext_id.clone());
            DependentEntry {
                extension_id: ext_id,
                display_name,
                kind: DependentKind::Lease,
            }
        })
        .collect();

    ApiResponse::ok(DependentsResponse {
        count: extensions.len() as u32,
        extensions,
    })
    .into_response()
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
            crate::handlers::errors::log_handler_error(&e, "host-models/leases", code, None);
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
