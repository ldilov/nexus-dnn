#![allow(clippy::result_large_err)]

use axum::Json;
use axum::extract::{Path, State};
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use serde::{Deserialize, Serialize};
use std::str::FromStr;

use nexus_huggingface::{SearchFilters, SearchReq};
use nexus_models_store::downloads::{
    CreateJobParams, JobStoreError, JobTargetInput, PersistedJob, PersistedTarget, RequestedKind,
    TargetState,
};
use nexus_models_store::ids::{ArtifactId, FamilyId, JobId};
use nexus_models_store::model::ModelFamily;
use nexus_models_store::normalize::normalize_family;
use nexus_models_store::types::{DependencyRole, DownloadState};

use crate::AppState;
use crate::envelope::ApiResponse;

#[derive(Debug, Deserialize)]
#[serde(tag = "kind", rename_all = "snake_case")]
pub enum DownloadTarget {
    Primary { artifact_id: String },
    Variant { variant_id: String },
    Bundle,
}

#[derive(Debug, Deserialize)]
pub struct CreateDownloadRequest {
    pub family_id: String,
    pub target: DownloadTarget,
    #[serde(default)]
    pub include_dependencies: bool,
}

#[derive(Debug, Serialize)]
pub struct DownloadJobTargetDto {
    pub artifact_id: String,
    pub filename: String,
    pub role: String,
    pub expected_bytes: Option<u64>,
    pub downloaded_bytes: u64,
    pub sha256: Option<String>,
    pub state: String,
}

#[derive(Debug, Serialize)]
pub struct DownloadJobDto {
    pub job_id: String,
    pub family_id: String,
    pub requested_kind: String,
    pub include_dependencies: bool,
    pub state: String,
    pub targets: Vec<DownloadJobTargetDto>,
    pub warnings: Vec<String>,
    pub progress_bytes: u64,
    pub total_bytes: Option<u64>,
    pub error_reason: Option<String>,
    pub created_at: String,
    pub started_at: Option<String>,
    pub finished_at: Option<String>,
}

impl DownloadJobDto {
    fn from_persisted(p: PersistedJob) -> Self {
        Self {
            job_id: p.job_id.to_string(),
            family_id: p.family_id.into_inner(),
            requested_kind: requested_kind_as_str(p.requested_kind).to_owned(),
            include_dependencies: p.include_dependencies,
            state: download_state_as_str(p.state).to_owned(),
            targets: p.targets.into_iter().map(target_dto).collect(),
            warnings: p.warnings,
            progress_bytes: p.progress_bytes,
            total_bytes: p.total_bytes,
            error_reason: p.error_reason,
            created_at: p.created_at.to_rfc3339(),
            started_at: p.started_at.map(|dt| dt.to_rfc3339()),
            finished_at: p.finished_at.map(|dt| dt.to_rfc3339()),
        }
    }
}

fn target_dto(t: PersistedTarget) -> DownloadJobTargetDto {
    DownloadJobTargetDto {
        artifact_id: t.artifact_id.into_inner(),
        filename: t.filename,
        role: role_as_str(t.role).to_owned(),
        expected_bytes: t.expected_bytes,
        downloaded_bytes: t.downloaded_bytes,
        sha256: t.sha256,
        state: target_state_as_str(t.state).to_owned(),
    }
}

fn role_as_str(role: DependencyRole) -> &'static str {
    match role {
        DependencyRole::Primary => "primary",
        DependencyRole::Vae => "vae",
        DependencyRole::TextEncoder => "text_encoder",
        DependencyRole::Tokenizer => "tokenizer",
        DependencyRole::Controlnet => "controlnet",
        DependencyRole::Lora => "lora",
        DependencyRole::Scheduler => "scheduler",
        _ => "other",
    }
}

fn download_state_as_str(s: DownloadState) -> &'static str {
    match s {
        DownloadState::Queued => "queued",
        DownloadState::Downloading => "downloading",
        DownloadState::Paused => "paused",
        DownloadState::Downloaded => "downloaded",
        DownloadState::Failed => "failed",
        DownloadState::Incompatible => "incompatible",
        DownloadState::AuthRequired => "auth_required",
        _ => "not_downloaded",
    }
}

fn target_state_as_str(s: TargetState) -> &'static str {
    match s {
        TargetState::Queued => "queued",
        TargetState::Downloading => "downloading",
        TargetState::Downloaded => "downloaded",
        TargetState::Failed => "failed",
        TargetState::Skipped => "skipped",
        _ => "unknown",
    }
}

fn requested_kind_as_str(k: RequestedKind) -> &'static str {
    match k {
        RequestedKind::Primary => "primary",
        RequestedKind::Variant => "variant",
        RequestedKind::Bundle => "bundle",
    }
}

fn validate(req: &CreateDownloadRequest) -> Result<(), Response> {
    let is_bundle = matches!(req.target, DownloadTarget::Bundle);
    if is_bundle && !req.include_dependencies {
        return Err(ApiResponse::<()>::err(
            StatusCode::UNPROCESSABLE_ENTITY,
            "invalid_request",
            "validation",
            "include_dependencies must be true when kind=bundle".into(),
        )
        .into_response());
    }
    if !is_bundle && req.include_dependencies {
        return Err(ApiResponse::<()>::err(
            StatusCode::UNPROCESSABLE_ENTITY,
            "invalid_request",
            "validation",
            "include_dependencies only valid with kind=bundle".into(),
        )
        .into_response());
    }
    Ok(())
}

fn extract_repo(family_id: &str) -> Option<(&str, &str)> {
    let (provider, repo) = family_id.split_once(':')?;
    Some((provider, repo))
}

async fn resolve_family(state: &AppState, family_id: &str) -> Result<ModelFamily, Response> {
    let Some(hf) = state.huggingface.as_ref() else {
        return Err(ApiResponse::<()>::err(
            StatusCode::SERVICE_UNAVAILABLE,
            "upstream_unavailable",
            "upstream",
            "Hugging Face client not configured".into(),
        )
        .into_response());
    };
    let Some((_provider, repo_id)) = extract_repo(family_id) else {
        return Err(ApiResponse::<()>::bad_request("invalid family_id".into()).into_response());
    };
    let req = SearchReq {
        query: repo_id.to_owned(),
        filters: SearchFilters::default(),
        limit: 10,
        page: 1,
    };
    let page = hf.search(req).await.map_err(|e| {
        tracing::warn!(error = %e, "resolve_family upstream failed");
        ApiResponse::<()>::err(
            StatusCode::BAD_GATEWAY,
            "upstream_unavailable",
            "upstream",
            format!("{e}"),
        )
        .into_response()
    })?;
    let Some(raw) = page.results.iter().find(|r| r.repo_id == repo_id) else {
        return Err(
            ApiResponse::<()>::not_found(format!("family_not_found: {family_id}")).into_response(),
        );
    };
    let registry = state.capability_registry.as_ref();
    let family = match registry {
        Some(reg) => normalize_family(raw, reg),
        None => {
            let empty = nexus_models_store::capabilities::CapabilityRegistry::new();
            normalize_family(raw, &empty)
        }
    };
    Ok(family)
}

fn artifact_by_id<'a>(
    family: &'a ModelFamily,
    id: &str,
) -> Option<&'a nexus_models_store::model::Artifact> {
    family
        .artifacts
        .iter()
        .find(|a| a.artifact_id.as_str() == id)
}

fn variant_by_id<'a>(
    family: &'a ModelFamily,
    id: &str,
) -> Option<&'a nexus_models_store::model::Variant> {
    family.variants.iter().find(|v| v.variant_id.as_str() == id)
}

fn build_targets(
    family: &ModelFamily,
    request: &CreateDownloadRequest,
) -> Result<Vec<JobTargetInput>, Response> {
    match &request.target {
        DownloadTarget::Primary { artifact_id } => {
            let a = artifact_by_id(family, artifact_id).ok_or_else(|| {
                ApiResponse::<()>::not_found(format!("artifact_id not found: {artifact_id}"))
                    .into_response()
            })?;
            Ok(vec![input_from_artifact(a)])
        }
        DownloadTarget::Variant { variant_id } => {
            let v = variant_by_id(family, variant_id).ok_or_else(|| {
                ApiResponse::<()>::not_found(format!("variant_id not found: {variant_id}"))
                    .into_response()
            })?;
            let mut out = Vec::with_capacity(v.artifact_ids.len());
            for aid in &v.artifact_ids {
                let a = artifact_by_id(family, aid.as_str()).ok_or_else(|| {
                    ApiResponse::<()>::internal(format!(
                        "variant {variant_id} references missing artifact {aid}"
                    ))
                    .into_response()
                })?;
                out.push(input_from_artifact(a));
            }
            Ok(out)
        }
        DownloadTarget::Bundle => {
            let mut out = Vec::new();
            if let Some(primary) = family
                .artifacts
                .iter()
                .find(|a| a.role == DependencyRole::Primary)
            {
                out.push(input_from_artifact(primary));
            }
            for dep in &family.dependencies {
                if dep.requirement != nexus_models_store::types::Requirement::Required {
                    continue;
                }
                let Some(target_id) = &dep.target_artifact_id else {
                    continue;
                };
                if let Some(a) = artifact_by_id(family, target_id.as_str())
                    && !out.iter().any(|t| t.artifact_id == a.artifact_id)
                {
                    out.push(input_from_artifact(a));
                }
            }
            if out.is_empty() {
                return Err(ApiResponse::<()>::bad_request(
                    "bundle target resolved to zero artifacts".into(),
                )
                .into_response());
            }
            Ok(out)
        }
    }
}

fn input_from_artifact(a: &nexus_models_store::model::Artifact) -> JobTargetInput {
    JobTargetInput {
        artifact_id: a.artifact_id.clone(),
        filename: a.filename.clone(),
        role: a.role,
        download_url: a.download_url.clone(),
        expected_bytes: a.size_bytes,
        sha256: a.sha256.clone(),
    }
}

/// `POST /api/v1/model-store/downloads` — creates a real download
/// job, enqueues it on the orchestrator, returns the initial DTO.
pub async fn create_download(
    State(state): State<AppState>,
    Json(req): Json<CreateDownloadRequest>,
) -> Response {
    if let Err(response) = validate(&req) {
        return response;
    }

    let (Some(store), Some(orchestrator)) = (
        state.download_job_store.as_ref(),
        state.download_orchestrator.as_ref(),
    ) else {
        return ApiResponse::<()>::err(
            StatusCode::SERVICE_UNAVAILABLE,
            "not_ready",
            "downloads",
            "Download orchestrator not yet initialised.".into(),
        )
        .into_response();
    };

    let family = match resolve_family(&state, &req.family_id).await {
        Ok(f) => f,
        Err(resp) => return resp,
    };

    let targets = match build_targets(&family, &req) {
        Ok(t) => t,
        Err(resp) => return resp,
    };

    let kind = match &req.target {
        DownloadTarget::Primary { .. } => RequestedKind::Primary,
        DownloadTarget::Variant { .. } => RequestedKind::Variant,
        DownloadTarget::Bundle => RequestedKind::Bundle,
    };

    let source_repo = extract_repo(&req.family_id)
        .map(|(_, r)| r.to_owned())
        .unwrap_or_default();

    let params = CreateJobParams::builder(
        FamilyId::from(req.family_id.clone()),
        "huggingface",
        source_repo,
        kind,
    )
    .include_dependencies(req.include_dependencies)
    .targets(targets)
    .build();

    let job = match store.create(params).await {
        Ok(job) => job,
        Err(JobStoreError::Duplicate(existing)) => {
            // The frontend relies on a full `DownloadJob` DTO to drive
            // its progress state machine (jobByFamily lookups, SWR poll
            // gating, etc.). Returning the bare `{ job_id, existing }`
            // shape leaves `state`, `family_id`, `progress_bytes` all
            // undefined on the client — the progress bar never renders
            // for re-clicked or retry-after-completion flows. Fetch the
            // canonical persisted job and return its DTO so the client
            // can reconcile against an authoritative snapshot.
            match store.get(&existing).await {
                Ok(Some(persisted)) => {
                    let dto = DownloadJobDto::from_persisted(persisted);
                    let mut resp = ApiResponse::ok(dto).into_response();
                    *resp.status_mut() = StatusCode::OK;
                    return resp;
                }
                Ok(None) => {
                    // Duplicate flag is set but the job vanished — very
                    // narrow race. Fall back to the minimal shape so the
                    // client at least gets the id and can re-fetch.
                    return ApiResponse::ok(serde_json::json!({
                        "job_id": existing.to_string(),
                        "existing": true,
                    }))
                    .into_response();
                }
                Err(e) => {
                    return ApiResponse::<()>::internal(format!("store: {e}")).into_response();
                }
            }
        }
        Err(e) => {
            return ApiResponse::<()>::internal(format!("store: {e}")).into_response();
        }
    };

    orchestrator.enqueue(job.job_id).await;

    let dto = DownloadJobDto::from_persisted(job);
    let mut resp = ApiResponse::ok(dto).into_response();
    *resp.status_mut() = StatusCode::ACCEPTED;
    resp
}

/// `POST /api/v1/model-store/downloads/:job_id/pause` (T086).
pub async fn pause_download(State(state): State<AppState>, Path(job_id): Path<String>) -> Response {
    let Some(store) = state.download_job_store.as_ref() else {
        return ApiResponse::<()>::err(
            StatusCode::SERVICE_UNAVAILABLE,
            "not_ready",
            "downloads",
            "Download orchestrator not yet initialised.".into(),
        )
        .into_response();
    };
    let Some(orchestrator) = state.download_orchestrator.as_ref() else {
        return ApiResponse::<()>::err(
            StatusCode::SERVICE_UNAVAILABLE,
            "not_ready",
            "downloads",
            "Download orchestrator not yet initialised.".into(),
        )
        .into_response();
    };
    let Ok(uuid) = uuid::Uuid::from_str(&job_id) else {
        return ApiResponse::<()>::bad_request(format!("invalid job_id: {job_id}")).into_response();
    };
    let id = JobId::from_uuid(uuid);

    let was_active = orchestrator.pause(id).await;
    if !was_active {
        let removed_from_queue = orchestrator.cancel_queued(id).await;
        if removed_from_queue
            && let Err(e) = store.update_state(&id, DownloadState::Paused, None).await
        {
            return ApiResponse::<()>::internal(format!("store: {e}")).into_response();
        }
    }
    match store.get(&id).await {
        Ok(Some(job)) => ApiResponse::ok(DownloadJobDto::from_persisted(job)).into_response(),
        Ok(None) => {
            ApiResponse::<()>::not_found(format!("job_not_found: {job_id}")).into_response()
        }
        Err(e) => ApiResponse::<()>::internal(format!("store: {e}")).into_response(),
    }
}

/// `POST /api/v1/model-store/downloads/:job_id/resume` (T086).
pub async fn resume_download(
    State(state): State<AppState>,
    Path(job_id): Path<String>,
) -> Response {
    let Some(store) = state.download_job_store.as_ref() else {
        return ApiResponse::<()>::err(
            StatusCode::SERVICE_UNAVAILABLE,
            "not_ready",
            "downloads",
            "Download orchestrator not yet initialised.".into(),
        )
        .into_response();
    };
    let Some(orchestrator) = state.download_orchestrator.as_ref() else {
        return ApiResponse::<()>::err(
            StatusCode::SERVICE_UNAVAILABLE,
            "not_ready",
            "downloads",
            "Download orchestrator not yet initialised.".into(),
        )
        .into_response();
    };
    let Ok(uuid) = uuid::Uuid::from_str(&job_id) else {
        return ApiResponse::<()>::bad_request(format!("invalid job_id: {job_id}")).into_response();
    };
    let id = JobId::from_uuid(uuid);

    if let Err(e) = orchestrator.resume(id).await {
        return ApiResponse::<()>::internal(format!("resume: {e}")).into_response();
    }
    match store.get(&id).await {
        Ok(Some(job)) => ApiResponse::ok(DownloadJobDto::from_persisted(job)).into_response(),
        Ok(None) => {
            ApiResponse::<()>::not_found(format!("job_not_found: {job_id}")).into_response()
        }
        Err(e) => ApiResponse::<()>::internal(format!("store: {e}")).into_response(),
    }
}

/// `GET /api/v1/model-store/downloads/:job_id` — returns the current
/// persisted snapshot of the job.
pub async fn get_download_status(
    State(state): State<AppState>,
    Path(job_id): Path<String>,
) -> Response {
    let Some(store) = state.download_job_store.as_ref() else {
        return ApiResponse::<()>::err(
            StatusCode::SERVICE_UNAVAILABLE,
            "not_ready",
            "downloads",
            "Download orchestrator not yet initialised.".into(),
        )
        .into_response();
    };
    let Ok(uuid) = uuid::Uuid::from_str(&job_id) else {
        return ApiResponse::<()>::bad_request(format!("invalid job_id: {job_id}")).into_response();
    };
    let id = JobId::from_uuid(uuid);
    match store.get(&id).await {
        Ok(Some(job)) => ApiResponse::ok(DownloadJobDto::from_persisted(job)).into_response(),
        Ok(None) => {
            ApiResponse::<()>::not_found(format!("job_not_found: {job_id}")).into_response()
        }
        Err(e) => ApiResponse::<()>::internal(format!("store: {e}")).into_response(),
    }
}

#[allow(dead_code)]
fn _unused_artifact_id_compile_guard(id: ArtifactId) -> String {
    id.into_inner()
}
