use axum::extract::{Path, State};
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use nexus_huggingface::{SearchFilters, SearchReq};
use nexus_models_store::normalize::normalize_family;

use crate::AppState;
use crate::envelope::ApiResponse;

fn split_family_id(id: &str) -> Option<(&str, &str)> {
    let (_provider, rest) = id.split_once(':')?;
    Some((id, rest))
}

/// `GET /api/v1/model-store/models/:family_id` — returns the fully
/// normalized [`ModelFamily`] for a single upstream repository.
///
/// The path parameter is the canonical family id (URL-encoded, so
/// `huggingface%3Ameta-llama%2FLlama-3-8B-Instruct`). The handler
/// resolves the repo via the HF search endpoint (re-using the stub
/// in tests) and runs the standard normalize pipeline so the caller
/// gets the same schema `/search` emits per-row.
pub async fn get_family(State(state): State<AppState>, Path(family_id): Path<String>) -> Response {
    let Some(hf) = state.huggingface.as_ref() else {
        return ApiResponse::<()>::err(
            StatusCode::SERVICE_UNAVAILABLE,
            "upstream_unavailable",
            "upstream",
            "Hugging Face client is not configured".into(),
        )
        .into_response();
    };

    let Some((_full, repo_id)) = split_family_id(&family_id) else {
        return ApiResponse::<()>::bad_request(format!("invalid family_id: {family_id}"))
            .into_response();
    };

    let req = SearchReq {
        query: repo_id.to_owned(),
        filters: SearchFilters::default(),
        limit: 10,
        page: 1,
    };

    let page = match hf.search(req).await {
        Ok(p) => p,
        Err(e) => {
            tracing::warn!(error = %e, %family_id, "detail handler upstream failure");
            return ApiResponse::<()>::err(
                StatusCode::BAD_GATEWAY,
                "upstream_unavailable",
                "upstream",
                format!("{e}"),
            )
            .into_response();
        }
    };

    let Some(raw) = page.results.iter().find(|r| r.repo_id == repo_id) else {
        return ApiResponse::<()>::not_found(format!("family_not_found: {family_id}"))
            .into_response();
    };

    let registry = state.capability_registry.as_ref();
    let family = match registry {
        Some(reg) => normalize_family(raw, reg),
        None => {
            let empty = nexus_models_store::capabilities::CapabilityRegistry::new();
            normalize_family(raw, &empty)
        }
    };

    ApiResponse::ok(family).into_response()
}
