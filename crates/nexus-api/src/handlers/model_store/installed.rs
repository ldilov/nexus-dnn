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
    pub install_path: Option<String>,
}

impl InstalledArtifactDto {
    fn from_row(row: InstalledArtifactRow, sink_root: Option<&std::path::Path>) -> Self {
        let install_path = sink_root.map(|root| row.install_path(root).display().to_string());
        Self {
            install_path,
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

    let sink_root = state
        .download_orchestrator
        .as_ref()
        .map(|o| o.sink_root().to_path_buf());

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
        .map(|row| InstalledArtifactDto::from_row(row, sink_root.as_deref()))
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

#[cfg(test)]
mod tests {
    use super::*;
    use chrono::Utc;
    use std::path::Path;

    fn row() -> InstalledArtifactRow {
        InstalledArtifactRow {
            artifact_id: "fam::variant::file".into(),
            family_id: "huggingface:acme/family".into(),
            variant_id: None,
            format: "safetensors".into(),
            source_provider: "huggingface".into(),
            source_repo: "acme/family".into(),
            source_revision: None,
            filename: "model.safetensors".into(),
            job_id: "job-123".into(),
            sha256: None,
            size_bytes: Some(42),
            installed_at: Utc::now(),
            layer_count: None,
            max_context: None,
            architecture: None,
            hidden_size: None,
            is_moe: None,
            expert_layer_count: None,
            extraction_status: None,
            extracted_at: None,
        }
    }

    #[test]
    fn install_path_joins_sink_root_job_id_and_filename() {
        let root = std::env::temp_dir().join("nexus-sink-root-test");
        let dto = InstalledArtifactDto::from_row(row(), Some(root.as_path()));
        let path = dto.install_path.expect("path present when sink root known");
        assert_eq!(
            Path::new(&path),
            root.join("job-123").join("model.safetensors")
        );
        assert!(Path::new(&path).is_absolute());
    }

    #[test]
    fn install_path_absent_without_sink_root() {
        let dto = InstalledArtifactDto::from_row(row(), None);
        assert!(dto.install_path.is_none());
    }
}
