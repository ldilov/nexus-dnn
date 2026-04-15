use axum::Json;
use axum::extract::{Path, Query, State};
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use nexus_huggingface::{HfError, SearchFilters, SearchReq};
use serde::Deserialize;

use crate::AppState;
use crate::dto::{HfSearchPageDto, HfSearchResultDto};
use crate::envelope::ApiResponse;

#[derive(Debug, Deserialize, Default)]
pub struct HfSearchQuery {
    pub q: String,
    pub format: Option<String>,
    pub license: Option<String>,
    pub limit: Option<u32>,
    pub page: Option<u32>,
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

fn hf_result_to_dto(r: nexus_huggingface::SearchResult) -> HfSearchResultDto {
    let llamacpp_compat = r.formats.iter().any(|f| f == "gguf");
    let trt_compat_by_engine = r.formats.iter().any(|f| f == "trt-engine");
    HfSearchResultDto {
        repo_id: r.repo_id,
        author: r.author,
        license: r.license,
        downloads_30d: r.downloads_30d,
        last_modified: r.last_modified,
        files: r
            .files
            .into_iter()
            .map(|f| crate::dto::RepoFileDto {
                path: f.path,
                size_bytes: f.size_bytes,
            })
            .collect(),
        formats: r.formats,
        quantizations: r.quantizations,
        backend_compat: crate::dto::BackendCompatMapDto {
            llamacpp: crate::dto::BackendCompatDto {
                compatible: llamacpp_compat,
                signal: llamacpp_compat.then(|| "gguf".into()),
            },
            trt_llm: crate::dto::BackendCompatDto {
                compatible: trt_compat_by_engine,
                signal: trt_compat_by_engine.then(|| "trt-prebuilt".into()),
            },
        },
        already_installed_ids: vec![],
    }
}

pub async fn search(State(state): State<AppState>, Query(query): Query<HfSearchQuery>) -> Response {
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
                results: page.results.into_iter().map(hf_result_to_dto).collect(),
            };
            ApiResponse::ok(dto).into_response()
        }
        Err(e) => hf_error_to_response(e),
    }
}

pub async fn repo_detail(State(state): State<AppState>, Path(repo_id): Path<String>) -> Response {
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
        Ok(meta) => {
            ApiResponse::ok(serde_json::to_value(&meta).unwrap_or_default()).into_response()
        }
        Err(e) => hf_error_to_response(e),
    }
}

fn domain_moved_to_extension(ext_id: &str) -> Response {
    ApiResponse::<()>::err(
        StatusCode::NOT_IMPLEMENTED,
        "DOMAIN_MOVED_TO_EXTENSION",
        "migration",
        format!(
            "Per-extension model domain endpoints moved out of the host. \
             Call POST /api/v1/extensions/{ext_id}/rpc with method 'llm.list_models', \
             'llm.install_model', or 'llm.patch_hyperparameters' instead. \
             See spec 011 US2."
        ),
    )
    .into_response()
}

pub async fn list_ext_models(
    State(_state): State<AppState>,
    Path(ext_id): Path<String>,
    Query(_query): Query<serde_json::Value>,
) -> Response {
    domain_moved_to_extension(&ext_id)
}

pub async fn install_ext_model(
    State(_state): State<AppState>,
    Path(ext_id): Path<String>,
    Json(_body): Json<serde_json::Value>,
) -> Response {
    domain_moved_to_extension(&ext_id)
}

pub async fn cancel_ext_task(
    State(_state): State<AppState>,
    Path((ext_id, _task_id)): Path<(String, String)>,
) -> Response {
    domain_moved_to_extension(&ext_id)
}

pub async fn load_ext_model(
    State(_state): State<AppState>,
    Path((ext_id, _model_id)): Path<(String, String)>,
) -> Response {
    domain_moved_to_extension(&ext_id)
}

pub async fn patch_ext_hyperparameters(
    State(_state): State<AppState>,
    Path((ext_id, _model_id)): Path<(String, String)>,
    Json(_body): Json<serde_json::Value>,
) -> Response {
    domain_moved_to_extension(&ext_id)
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
    let machine = nexus_backend_runtimes::resolver::MachineDescriptor::detect().await;
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
        nexus_backend_runtimes::state::RuntimeCardState::Ready
            | nexus_backend_runtimes::state::RuntimeCardState::InstalledUnvalidated
    );
    let dto = crate::dto::LoadStateDto {
        backend_id,
        loaded_model_id: None,
        loaded_at: None,
        ready,
    };
    ApiResponse::ok(dto).into_response()
}
