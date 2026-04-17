use axum::extract::{Path, State};
use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum::{Json, response::Response};
use chrono::Utc;
use nexus_huggingface::{
    DownloadFileSpec as HfDownloadFileSpec, DownloadSpec as HfDownloadSpec, HfError,
};
use nexus_models_store::{
    ModelDependency, ModelStoreError, Quantization, ResolutionContext, StagedFile,
    StagedInstallRequest, ZeroSizeProbe, install_exists, install_from_staging,
    list_active_dependents, list_all_visible, release_lease, resolve_dry_run,
};
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};
use tokio_util::sync::CancellationToken;

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

#[derive(Debug, Serialize)]
pub struct HostInstallResponse {
    pub install_id: String,
    pub task_id: String,
    pub already_installed: bool,
    pub routed_backend: Option<String>,
    pub sha256_root: String,
}

pub async fn install_host_model(
    State(state): State<AppState>,
    Json(req): Json<InstallHostModelRequest>,
) -> Response {
    if req.repo_id.trim().is_empty() {
        return bad_request("repo_id required");
    }
    if req.source != "huggingface" {
        return bad_request(&format!(
            "unsupported source '{}'; only 'huggingface' is accepted",
            req.source
        ));
    }
    if req.files.is_empty() {
        return bad_request("files must contain at least one entry");
    }
    for f in &req.files {
        if let Err(msg) = validate_relative_path(f) {
            return bad_request(&msg);
        }
    }

    let Some(hf) = state.huggingface.as_ref().cloned() else {
        return service_unavailable(
            "huggingface_unwired",
            "huggingface capability not configured",
        );
    };
    let Some(paths) = state.host_install_paths.clone() else {
        return service_unavailable(
            "host_install_unwired",
            "host-models install paths not configured",
        );
    };

    match run_host_install(&state, hf, &paths, req).await {
        Ok(outcome) => {
            let body = HostInstallResponse {
                install_id: outcome.install_id,
                task_id: outcome.task_id,
                already_installed: outcome.already_installed,
                routed_backend: outcome.routed_backend,
                sha256_root: outcome.sha256_root,
            };
            if body.already_installed {
                ApiResponse::ok(body).into_response()
            } else {
                ApiResponse::created(body).into_response()
            }
        }
        Err(err) => host_install_error(err).into_response(),
    }
}

fn bad_request(msg: &str) -> Response {
    ApiResponse::<()>::err(
        StatusCode::BAD_REQUEST,
        "invalid_request",
        "validation",
        msg.to_string(),
    )
    .into_response()
}

fn service_unavailable(code: &'static str, msg: &str) -> Response {
    ApiResponse::<()>::err(
        StatusCode::SERVICE_UNAVAILABLE,
        code,
        "dependency",
        msg.to_string(),
    )
    .into_response()
}

fn validate_relative_path(untrusted: &str) -> Result<(), String> {
    if untrusted.is_empty() {
        return Err("file path is empty".into());
    }
    if untrusted.contains('\0') {
        return Err("file path contains null byte".into());
    }
    let p = std::path::Path::new(untrusted);
    if p.is_absolute() {
        return Err(format!("file path escapes install root: {untrusted}"));
    }
    for c in p.components() {
        use std::path::Component;
        if matches!(c, Component::ParentDir | Component::RootDir | Component::Prefix(_)) {
            return Err(format!("file path escapes install root: {untrusted}"));
        }
    }
    Ok(())
}

struct HostInstallOutcome {
    install_id: String,
    task_id: String,
    already_installed: bool,
    routed_backend: Option<String>,
    sha256_root: String,
}

enum HostInstallFailure {
    Hf(HfError),
    Model(ModelStoreError),
    Io(std::io::Error),
    PrivateModel,
}

impl From<HfError> for HostInstallFailure {
    fn from(e: HfError) -> Self {
        Self::Hf(e)
    }
}
impl From<ModelStoreError> for HostInstallFailure {
    fn from(e: ModelStoreError) -> Self {
        if let ModelStoreError::ManifestInvalid(ref msg) = e {
            if msg.starts_with("model_private") {
                return Self::PrivateModel;
            }
        }
        Self::Model(e)
    }
}
impl From<std::io::Error> for HostInstallFailure {
    fn from(e: std::io::Error) -> Self {
        Self::Io(e)
    }
}

fn host_install_error(err: HostInstallFailure) -> ApiResponse<()> {
    match err {
        HostInstallFailure::PrivateModel => ApiResponse::<()>::err(
            StatusCode::FORBIDDEN,
            "model_private",
            "state",
            "this model is private to another extension".into(),
        ),
        HostInstallFailure::Hf(HfError::RateLimited {
            retry_after_seconds,
        }) => ApiResponse::<()>::err(
            StatusCode::TOO_MANY_REQUESTS,
            "hf_rate_limited",
            "upstream",
            format!("Hugging Face rate-limited; retry after {retry_after_seconds}s"),
        ),
        HostInstallFailure::Hf(HfError::RepoNotFound(repo)) => ApiResponse::<()>::err(
            StatusCode::NOT_FOUND,
            "hf_repo_not_found",
            "not_found",
            format!("Hugging Face repo not found: {repo}"),
        ),
        HostInstallFailure::Hf(HfError::GatedNeedsToken) => ApiResponse::<()>::err(
            StatusCode::UNAUTHORIZED,
            "hf_gated",
            "auth",
            "Hugging Face repo requires an HF_TOKEN".into(),
        ),
        HostInstallFailure::Hf(HfError::Unreachable { .. }) => ApiResponse::<()>::err(
            StatusCode::BAD_GATEWAY,
            "hf_unreachable",
            "upstream",
            "Hugging Face unreachable".into(),
        ),
        HostInstallFailure::Hf(other) => {
            ApiResponse::<()>::internal(format!("hf error: {other}"))
        }
        HostInstallFailure::Model(e) => {
            let (status, code) = http_status_for_model_error(&e);
            ApiResponse::<()>::err(status, code, "model_store", e.to_string())
        }
        HostInstallFailure::Io(e) => ApiResponse::<()>::internal(e.to_string()),
    }
}

async fn run_host_install(
    state: &AppState,
    hf: std::sync::Arc<dyn nexus_huggingface::HuggingFaceCapability>,
    paths: &crate::HostInstallPaths,
    req: InstallHostModelRequest,
) -> Result<HostInstallOutcome, HostInstallFailure> {
    let meta = hf
        .detail(&req.repo_id, req.revision.as_deref())
        .await
        .map_err(|e| match e {
            HfError::RepoNotFound(_) => HfError::RepoNotFound(req.repo_id.clone()),
            other => other,
        })?;

    let staging = tempfile::tempdir().map_err(HostInstallFailure::Io)?;
    let task_id = format!("hmi_task_{}", super::ulid_lite());
    let spec = HfDownloadSpec {
        task_id: task_id.clone(),
        repo_id: req.repo_id.clone(),
        revision: meta.revision.clone(),
        files: req
            .files
            .iter()
            .map(|p| HfDownloadFileSpec {
                path: p.clone(),
                expected_sha256: None,
                size_bytes: meta
                    .siblings
                    .iter()
                    .find(|s| &s.path == p)
                    .and_then(|s| s.size_bytes),
            })
            .collect(),
        staging_dir: staging.path().to_path_buf(),
        cancel_token: CancellationToken::new(),
    };
    let artifact = hf.download(spec).await?;

    let sha256_root = compute_root_sha(&artifact.files);
    let family = derive_family(&req.files, &meta);
    let quantization = derive_quantization(&req.files);
    let variant = req.display_name.clone().unwrap_or_else(|| "default".into());

    let staged_files: Vec<StagedFile> = artifact
        .files
        .iter()
        .map(|f| StagedFile {
            path: f.path.clone(),
            sha256: f.sha256.clone(),
            size_bytes: f.size_bytes,
            staging_path: f.local_path.clone(),
        })
        .collect();

    let staged_req = StagedInstallRequest {
        family: family.clone(),
        version: meta.revision.clone(),
        quantization,
        variant,
        sha256_root: sha256_root.clone(),
        source_revision: meta.revision.clone(),
        source_kind: "huggingface".into(),
        source_url: Some(format!("https://huggingface.co/{}", req.repo_id)),
        license_spdx: meta.license.clone(),
        private: false,
        owner_extension_id: None,
        files: staged_files,
    };

    let outcome = install_from_staging(
        state.db.pool(),
        &paths.installs_root,
        &paths.blobs_root,
        staged_req,
    )
    .await?;

    Ok(HostInstallOutcome {
        install_id: outcome.install.install_id,
        task_id,
        already_installed: outcome.already_installed,
        routed_backend: route_backend_for(&family),
        sha256_root,
    })
}

fn compute_root_sha(files: &[nexus_huggingface::DownloadedFile]) -> String {
    let mut sorted: Vec<_> = files.iter().collect();
    sorted.sort_by(|a, b| a.path.cmp(&b.path));
    let mut hasher = Sha256::new();
    for f in &sorted {
        hasher.update(f.path.as_bytes());
        hasher.update(b"\0");
        hasher.update(f.sha256.as_bytes());
        hasher.update(b"\n");
    }
    format!("{:x}", hasher.finalize())
}

fn derive_family(paths: &[String], meta: &nexus_huggingface::RepoMetadata) -> String {
    let has_gguf = paths.iter().any(|p| p.to_lowercase().ends_with(".gguf"));
    if has_gguf {
        return "llama".into();
    }
    if let Some(pipeline) = meta.pipeline_tag.as_deref() {
        return pipeline.to_string();
    }
    meta.library_name.clone().unwrap_or_else(|| "unknown".into())
}

fn derive_quantization(paths: &[String]) -> Option<String> {
    for p in paths {
        if let Some(q) = p
            .rsplit('/')
            .next()
            .and_then(|name| name.strip_suffix(".gguf"))
            .and_then(|stem| stem.rsplit('.').next())
        {
            let upper = q.to_uppercase();
            if upper.starts_with("Q") || upper == "F16" || upper == "F32" || upper == "BF16" {
                return Some(upper);
            }
        }
    }
    None
}

fn route_backend_for(family: &str) -> Option<String> {
    match family {
        "llama" | "llama.cpp" => Some("llama.cpp".into()),
        _ => None,
    }
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
