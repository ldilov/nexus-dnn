use axum::extract::State;
use axum::response::{IntoResponse, Response};
use serde::Serialize;

use nexus_models_store::downloads::InstalledArtifactRow;

use crate::AppState;
use crate::envelope::ApiResponse;

const MAX_ROWS: usize = 500;

#[derive(Debug, Clone, Serialize)]
#[non_exhaustive]
pub struct InstalledArtifactDto {
    pub artifact_id: String,
    pub family_id: String,
    pub variant_id: Option<String>,
    pub format: String,
    pub filename: String,
    pub size_bytes: Option<u64>,
    pub source_repo: String,
    pub source_revision: Option<String>,
    pub installed_at: String,
    pub layer_count: Option<u32>,
    pub max_context: Option<u32>,
    pub architecture: Option<String>,
    pub hidden_size: Option<u32>,
    pub extraction_status: Option<String>,
    pub extracted_at: Option<i64>,
}

impl From<InstalledArtifactRow> for InstalledArtifactDto {
    fn from(row: InstalledArtifactRow) -> Self {
        Self {
            artifact_id: row.artifact_id,
            family_id: row.family_id,
            variant_id: row.variant_id,
            format: row.format,
            filename: row.filename,
            size_bytes: row.size_bytes,
            source_repo: row.source_repo,
            source_revision: row.source_revision,
            installed_at: row.installed_at.to_rfc3339(),
            layer_count: row.layer_count,
            max_context: row.max_context,
            architecture: row.architecture,
            hidden_size: row.hidden_size,
            extraction_status: row.extraction_status,
            extracted_at: row.extracted_at,
        }
    }
}

#[derive(Debug, Clone, Serialize)]
pub struct InstalledIndexDto {
    pub family_ids: Vec<String>,
    pub installed: Vec<InstalledArtifactDto>,
    pub truncated: bool,
}

pub async fn get_installed(State(state): State<AppState>) -> Response {
    let Some(install_map) = state.install_map.as_ref() else {
        return ApiResponse::ok(InstalledIndexDto {
            family_ids: vec![],
            installed: vec![],
            truncated: false,
        })
        .into_response();
    };

    let rows = match install_map.list_all(MAX_ROWS + 1).await {
        Ok(r) => r,
        Err(e) => {
            return ApiResponse::<()>::internal(format!("list_all: {e}")).into_response();
        }
    };

    let truncated = rows.len() > MAX_ROWS;
    let installed: Vec<InstalledArtifactDto> = rows
        .into_iter()
        .take(MAX_ROWS)
        .map(InstalledArtifactDto::from)
        .collect();

    let mut family_ids: Vec<String> = installed.iter().map(|a| a.family_id.clone()).collect();
    family_ids.sort();
    family_ids.dedup();

    ApiResponse::ok(InstalledIndexDto {
        family_ids,
        installed,
        truncated,
    })
    .into_response()
}
