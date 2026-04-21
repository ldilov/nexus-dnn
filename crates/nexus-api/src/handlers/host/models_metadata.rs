//! `GET /api/host/models/{install_id}/metadata` — spec 028 T027.
//!
//! Reads the extraction-metadata columns that migration 015 added to
//! `model_store_installed_artifacts` and returns them in the contract
//! shape defined by
//! `specs/028-gguf-layer-metadata/contracts/host_models_metadata.openapi.yaml`.

use axum::Json;
use axum::extract::{Path, State};
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use serde::Serialize;
use sqlx::Row;

use crate::AppState;

const FORMAT_GGUF: &str = "gguf";
const FORMAT_SAFETENSORS: &str = "safetensors";
const FORMAT_PYTORCH_INDEX: &str = "pytorch_index";
const FORMAT_UNKNOWN: &str = "unknown";

const STATUS_OK: &str = "ok";
const STATUS_PARTIAL: &str = "partial";
const STATUS_FAILED: &str = "failed";

const LEGACY_PYTORCH_BIN: &str = "pytorch_bin";

#[derive(Debug, Clone, Serialize)]
#[non_exhaustive]
pub struct ExtractedMetadataDto {
    pub install_id: String,
    pub format: String,
    pub layer_count: Option<u32>,
    pub max_context: Option<u32>,
    pub architecture: Option<String>,
    pub hidden_size: Option<u32>,
    pub extraction_status: String,
    pub extracted_at: i64,
}

#[derive(Debug, Serialize)]
struct ErrorBody {
    code: &'static str,
    message: String,
}

const METADATA_SUFFIX: &str = "/metadata";

pub async fn get_installed_model_metadata(
    State(state): State<AppState>,
    Path(rest): Path<String>,
) -> Response {
    let Some(install_id) = rest.strip_suffix(METADATA_SUFFIX).map(str::to_string) else {
        return not_found(&rest);
    };
    if install_id.is_empty() {
        return not_found(&install_id);
    }
    let pool = state.db.pool();
    let query = "SELECT format, layer_count, max_context, architecture, \
                 hidden_size, extraction_status, extracted_at \
                 FROM model_store_installed_artifacts \
                 WHERE artifact_id = ?1";

    let row = match sqlx::query(query).bind(&install_id).fetch_optional(pool).await {
        Ok(Some(row)) => row,
        Ok(None) => return not_found(&install_id),
        Err(err) => return internal_error(&install_id, err),
    };

    let raw_format: String = row.try_get("format").unwrap_or_else(|_| FORMAT_UNKNOWN.to_string());
    let layer_count = row
        .try_get::<Option<i64>, _>("layer_count")
        .ok()
        .flatten()
        .and_then(|v| u32::try_from(v).ok());
    let max_context = row
        .try_get::<Option<i64>, _>("max_context")
        .ok()
        .flatten()
        .and_then(|v| u32::try_from(v).ok());
    let architecture = row.try_get::<Option<String>, _>("architecture").ok().flatten();
    let hidden_size = row
        .try_get::<Option<i64>, _>("hidden_size")
        .ok()
        .flatten()
        .and_then(|v| u32::try_from(v).ok());
    let raw_status: Option<String> =
        row.try_get::<Option<String>, _>("extraction_status").ok().flatten();
    let raw_extracted_at: Option<i64> =
        row.try_get::<Option<i64>, _>("extracted_at").ok().flatten();

    let (extraction_status, extracted_at) = match (raw_status, raw_extracted_at) {
        (Some(status), Some(ts)) => (canonical_status(&status), ts),
        (Some(status), None) => (canonical_status(&status), 0),
        (None, _) => (STATUS_FAILED.to_string(), 0),
    };

    let dto = ExtractedMetadataDto {
        install_id,
        format: canonical_format(&raw_format),
        layer_count,
        max_context,
        architecture,
        hidden_size,
        extraction_status,
        extracted_at,
    };

    (StatusCode::OK, Json(dto)).into_response()
}

fn canonical_format(raw: &str) -> String {
    let lower = raw.to_ascii_lowercase();
    if lower == LEGACY_PYTORCH_BIN {
        return FORMAT_PYTORCH_INDEX.to_string();
    }
    match lower.as_str() {
        FORMAT_GGUF | FORMAT_SAFETENSORS | FORMAT_PYTORCH_INDEX | FORMAT_UNKNOWN => lower,
        _ => FORMAT_UNKNOWN.to_string(),
    }
}

fn canonical_status(raw: &str) -> String {
    let lower = raw.to_ascii_lowercase();
    match lower.as_str() {
        STATUS_OK | STATUS_PARTIAL | STATUS_FAILED => lower,
        _ => STATUS_FAILED.to_string(),
    }
}

fn not_found(install_id: &str) -> Response {
    let body = ErrorBody {
        code: "not_found",
        message: format!("no installed artifact with install_id = {install_id}"),
    };
    (StatusCode::NOT_FOUND, Json(body)).into_response()
}

fn internal_error(install_id: &str, err: sqlx::Error) -> Response {
    tracing::error!(
        route = "/api/host/models/{install_id}/metadata",
        install_id,
        error.code = "db_error",
        error.detail = %err,
        "handler error",
    );
    let body = ErrorBody {
        code: "internal_error",
        message: "failed to load metadata".to_string(),
    };
    (StatusCode::INTERNAL_SERVER_ERROR, Json(body)).into_response()
}
