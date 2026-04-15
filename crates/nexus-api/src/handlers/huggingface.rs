//! Generic Hugging Face capability endpoints.
//!
//! Two route families:
//!
//! * **Host-level, extension-agnostic** — `GET /api/v1/huggingface/search`
//!   and `GET /api/v1/huggingface/repos/{repo_id}`. Any caller can hit these
//!   for raw HF search and repository inspection. The response is domain-free.
//!
//! * **Extension-scoped** — `/api/v1/extensions/{extId}/huggingface/models/...`.
//!   The host looks up a `ModelInstaller` registered by the extension id at
//!   app-assembly time. An extension that has not registered returns 404.
//!   Domain decisions (backend routing, registry schema, hyperparameters)
//!   live inside the installer the extension provides.

use axum::Json;
use axum::extract::{Path, Query, State};
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use nexus_huggingface::{HfError, SearchFilters, SearchReq};
use nexus_local_llm::manifest::install_models::{
    InstallModelError, InstallModelRequest, InstalledModelRow, ModelInstaller,
};
use serde::Deserialize;
use std::sync::Arc;
use tokio_util::sync::CancellationToken;

use crate::AppState;
use crate::dto::{
    BackendCompatDto, BackendCompatMapDto, CatalogListDto, HfSearchPageDto, HfSearchResultDto,
    HyperparameterProfileDto, InstallModelRequestDto, InstalledModelDto, LoadStateDto, LoadTaskDto,
    ModelInstallTaskDto, RepoFileDto,
};
use crate::envelope::ApiResponse;

#[derive(Debug, Deserialize, Default)]
pub struct HfSearchQuery {
    pub q: String,
    pub format: Option<String>,
    pub license: Option<String>,
    pub limit: Option<u32>,
    pub page: Option<u32>,
}

#[derive(Debug, Deserialize, Default)]
pub struct ExtCatalogQuery {
    pub q: Option<String>,
    pub format: Option<String>,
    pub license: Option<String>,
    pub include_hf: Option<bool>,
}

fn hf_error_to_response(e: HfError) -> Response {
    match e {
        HfError::Unreachable { .. } => ApiResponse::<()>::err(
            StatusCode::SERVICE_UNAVAILABLE,
            "HF_UNREACHABLE",
            "upstream",
            "Could not reach Hugging Face Hub".to_owned(),
        )
        .into_response(),
        HfError::RateLimited {
            retry_after_seconds,
        } => ApiResponse::<()>::err(
            StatusCode::TOO_MANY_REQUESTS,
            "HF_RATE_LIMITED",
            "upstream",
            format!("Rate limited; retry after {retry_after_seconds}s"),
        )
        .into_response(),
        HfError::GatedNeedsToken => ApiResponse::<()>::err(
            StatusCode::UNAUTHORIZED,
            "HF_GATED",
            "auth",
            "Model is gated; set HF_TOKEN in the host environment".to_owned(),
        )
        .into_response(),
        HfError::RepoNotFound(id) => {
            ApiResponse::<()>::not_found(format!("hf repo not found: {id}")).into_response()
        }
        other => ApiResponse::<()>::internal(other.to_string()).into_response(),
    }
}

fn row_to_dto(row: &InstalledModelRow) -> InstalledModelDto {
    InstalledModelDto {
        id: row.id.clone(),
        repo_id: row.repo_id.clone(),
        revision: row.revision.clone(),
        display_name: row.display_name.clone(),
        format: row
            .routing_signal
            .as_deref()
            .filter(|s| *s == "gguf")
            .map(|_| "gguf".to_owned()),
        quantization: row.quantization_hint.clone(),
        size_bytes: row.size_bytes.map(|v| v as u64),
        routed_backend: row.routed_backend.clone(),
        routing_signal: row.routing_signal.clone(),
        state: row.state.clone(),
        installed_at: row.created_at.clone(),
        model_limits: row
            .model_limits_json
            .as_deref()
            .and_then(|s| serde_json::from_str(s).ok()),
        hyperparameters: row
            .hyperparameters_json
            .as_deref()
            .and_then(|s| serde_json::from_str(s).ok()),
    }
}

fn hf_result_to_dto(
    r: nexus_huggingface::SearchResult,
    installed_repo_ids: &[String],
) -> HfSearchResultDto {
    let is_installed = installed_repo_ids.iter().any(|id| id == &r.repo_id);
    let llamacpp_compat = r.formats.iter().any(|f| f == "gguf");
    let trt_compat_by_engine = r.formats.iter().any(|f| f == "trt-engine");
    HfSearchResultDto {
        repo_id: r.repo_id.clone(),
        author: r.author,
        license: r.license,
        downloads_30d: r.downloads_30d,
        last_modified: r.last_modified,
        files: r
            .files
            .into_iter()
            .map(|f| RepoFileDto {
                path: f.path,
                size_bytes: f.size_bytes,
            })
            .collect(),
        formats: r.formats,
        quantizations: r.quantizations,
        backend_compat: BackendCompatMapDto {
            llamacpp: BackendCompatDto {
                compatible: llamacpp_compat,
                signal: if llamacpp_compat {
                    Some("gguf".into())
                } else {
                    None
                },
            },
            trt_llm: BackendCompatDto {
                compatible: trt_compat_by_engine,
                signal: if trt_compat_by_engine {
                    Some("trt-prebuilt".into())
                } else {
                    None
                },
            },
        },
        already_installed_ids: if is_installed {
            vec![r.repo_id]
        } else {
            vec![]
        },
    }
}

fn require_installer(state: &AppState, ext_id: &str) -> Result<Arc<ModelInstaller>, Response> {
    state
        .extension_model_installers
        .get(ext_id)
        .cloned()
        .ok_or_else(|| {
            ApiResponse::<()>::not_found(format!(
                "extension '{ext_id}' does not declare the huggingface capability"
            ))
            .into_response()
        })
}

pub async fn search(
    State(state): State<AppState>,
    Query(query): Query<HfSearchQuery>,
) -> Response {
    let Some(cap) = state.huggingface.as_ref() else {
        return ApiResponse::<()>::err(
            StatusCode::SERVICE_UNAVAILABLE,
            "HF_DISABLED",
            "dependency",
            "huggingface capability not configured".to_owned(),
        )
        .into_response();
    };
    let req = SearchReq {
        query: query.q,
        filters: SearchFilters {
            format: query.format,
            license: query.license,
            max_size_bytes: None,
        },
        limit: query.limit.unwrap_or(20),
        page: query.page.unwrap_or(1),
    };
    match cap.search(req).await {
        Ok(page) => {
            let dto = HfSearchPageDto {
                query: page.query,
                page: page.page,
                has_next: page.has_next,
                results: page
                    .results
                    .into_iter()
                    .map(|r| hf_result_to_dto(r, &[]))
                    .collect(),
            };
            ApiResponse::ok(dto).into_response()
        }
        Err(e) => hf_error_to_response(e),
    }
}

pub async fn repo_detail(
    State(state): State<AppState>,
    Path(repo_id): Path<String>,
) -> Response {
    let Some(cap) = state.huggingface.as_ref() else {
        return ApiResponse::<()>::err(
            StatusCode::SERVICE_UNAVAILABLE,
            "HF_DISABLED",
            "dependency",
            "huggingface capability not configured".to_owned(),
        )
        .into_response();
    };
    match cap.detail(&repo_id, None).await {
        Ok(meta) => ApiResponse::ok(serde_json::to_value(&meta).unwrap_or_default())
            .into_response(),
        Err(e) => hf_error_to_response(e),
    }
}

pub async fn list_ext_models(
    State(state): State<AppState>,
    Path(ext_id): Path<String>,
    Query(query): Query<ExtCatalogQuery>,
) -> Response {
    let installer = match require_installer(&state, &ext_id) {
        Ok(v) => v,
        Err(r) => return r,
    };
    let rows = match installer.list_installed().await {
        Ok(v) => v,
        Err(e) => return ApiResponse::<()>::internal(e.to_string()).into_response(),
    };
    let installed_repo_ids: Vec<String> = rows.iter().filter_map(|r| r.repo_id.clone()).collect();
    let installed_dtos: Vec<InstalledModelDto> = rows.iter().map(row_to_dto).collect();

    let (hf_results, hf_status) = if query.include_hf.unwrap_or(false) {
        let q = query.q.clone().unwrap_or_default();
        if q.trim().is_empty() {
            (vec![], "not_requested".to_owned())
        } else {
            match state.huggingface.as_ref() {
                Some(cap) => {
                    let req = SearchReq {
                        query: q,
                        filters: SearchFilters {
                            format: query.format,
                            license: query.license,
                            max_size_bytes: None,
                        },
                        limit: 20,
                        page: 1,
                    };
                    match cap.search(req).await {
                        Ok(page) => (
                            page.results
                                .into_iter()
                                .map(|r| hf_result_to_dto(r, &installed_repo_ids))
                                .collect(),
                            "ok".to_owned(),
                        ),
                        Err(HfError::Unreachable { .. }) => (vec![], "unreachable".to_owned()),
                        Err(e) => (vec![], format!("error: {e}")),
                    }
                }
                None => (vec![], "disabled".to_owned()),
            }
        }
    } else {
        (vec![], "not_requested".to_owned())
    };

    let dto = CatalogListDto {
        installed: installed_dtos,
        hf_results,
        hf_status,
    };
    ApiResponse::ok(dto).into_response()
}

pub async fn install_ext_model(
    State(state): State<AppState>,
    Path(ext_id): Path<String>,
    Json(body): Json<InstallModelRequestDto>,
) -> Response {
    let installer = match require_installer(&state, &ext_id) {
        Ok(v) => v,
        Err(r) => return r,
    };
    let cancel_token = CancellationToken::new();
    let cancels = state.install_task_cancels.clone();
    let req = InstallModelRequest {
        repo_id: body.repo_id.clone(),
        revision: body.revision.clone(),
        files: body.files.clone(),
        display_name: body.display_name.clone(),
    };
    match installer.begin(req, cancel_token.clone()).await {
        Ok(outcome) => {
            cancels
                .lock()
                .await
                .insert(outcome.task_id.clone(), cancel_token);
            let dto = ModelInstallTaskDto {
                task_id: outcome.task_id.clone(),
                model_install_id: Some(outcome.model_install_id),
                routed_backend: Some(outcome.routed_backend),
                routing_signal: Some(outcome.routing_signal),
                progress_channel: format!("hf:download:{}", outcome.task_id),
                cancel_endpoint: format!(
                    "/api/v1/extensions/{}/huggingface/tasks/{}/cancel",
                    ext_id, outcome.task_id
                ),
            };
            ApiResponse::ok(dto).into_response()
        }
        Err(InstallModelError::NoCompatibleBackend { reason }) => ApiResponse::<()>::err(
            StatusCode::CONFLICT,
            "NO_COMPATIBLE_BACKEND",
            "routing",
            reason,
        )
        .into_response(),
        Err(InstallModelError::Hf(e)) => hf_error_to_response(e),
        Err(e) => ApiResponse::<()>::internal(e.to_string()).into_response(),
    }
}

pub async fn cancel_ext_task(
    State(state): State<AppState>,
    Path((ext_id, task_id)): Path<(String, String)>,
) -> Response {
    if require_installer(&state, &ext_id).is_err() {
        return ApiResponse::<()>::not_found(format!(
            "extension '{ext_id}' does not declare the huggingface capability"
        ))
        .into_response();
    }
    let mut cancels = state.install_task_cancels.lock().await;
    if let Some(token) = cancels.remove(&task_id) {
        token.cancel();
        ApiResponse::<()>::no_content().into_response()
    } else {
        ApiResponse::<()>::not_found(format!("task '{task_id}' not found or already completed"))
            .into_response()
    }
}

pub async fn load_ext_model(
    State(state): State<AppState>,
    Path((ext_id, model_id)): Path<(String, String)>,
) -> Response {
    if require_installer(&state, &ext_id).is_err() {
        return ApiResponse::<()>::not_found(format!(
            "extension '{ext_id}' does not declare the huggingface capability"
        ))
        .into_response();
    }
    let dto = LoadTaskDto {
        load_task_id: format!("ld_{}", model_id),
        progress_channel: format!("{}:load:{}", ext_id, model_id),
        estimated_duration_seconds: None,
    };
    ApiResponse::ok(dto).into_response()
}

pub async fn patch_ext_hyperparameters(
    State(state): State<AppState>,
    Path((ext_id, model_id)): Path<(String, String)>,
    Json(body): Json<HyperparameterProfileDto>,
) -> Response {
    let installer = match require_installer(&state, &ext_id) {
        Ok(v) => v,
        Err(r) => return r,
    };
    let serialized = match serde_json::to_string(&body) {
        Ok(s) => s,
        Err(e) => {
            return ApiResponse::<()>::bad_request(format!("invalid profile: {e}"))
                .into_response();
        }
    };
    match installer.patch_hyperparameters(&model_id, &serialized).await {
        Ok(true) => ApiResponse::ok(body).into_response(),
        Ok(false) => ApiResponse::<()>::not_found(format!("model '{model_id}' not found"))
            .into_response(),
        Err(InstallModelError::HyperparametersOutOfRange { field, message }) => {
            ApiResponse::<()>::err(
                StatusCode::UNPROCESSABLE_ENTITY,
                "HYPERPARAMETERS_OUT_OF_RANGE",
                "validation",
                format!("{field}: {message}"),
            )
            .into_response()
        }
        Err(e) => ApiResponse::<()>::internal(e.to_string()).into_response(),
    }
}

pub async fn get_load_state(
    State(state): State<AppState>,
    Path(backend_id): Path<String>,
) -> Response {
    let Some(registry) = state.backend_adapter_registry.as_ref() else {
        return ApiResponse::<()>::err(
            StatusCode::SERVICE_UNAVAILABLE,
            "BACKEND_REGISTRY_UNAVAILABLE",
            "dependency",
            "backend adapter registry not configured".to_owned(),
        )
        .into_response();
    };
    let machine = nexus_local_llm::resolver::MachineDescriptor::detect().await;
    let Some(adapter) = registry.get(&backend_id) else {
        return ApiResponse::<()>::not_found(format!("backend '{backend_id}' not found"))
            .into_response();
    };
    let summary = match adapter.current_summary(&machine).await {
        Ok(s) => s,
        Err(e) => return ApiResponse::<()>::internal(e.to_string()).into_response(),
    };
    let ready = matches!(
        summary.card_state,
        nexus_local_llm::state::RuntimeCardState::Ready
            | nexus_local_llm::state::RuntimeCardState::InstalledUnvalidated
    );
    let dto = LoadStateDto {
        backend_id,
        loaded_model_id: None,
        loaded_at: None,
        ready,
    };
    ApiResponse::ok(dto).into_response()
}
