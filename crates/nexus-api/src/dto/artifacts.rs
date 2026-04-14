use nexus_storage::{ArtifactRecord, LineageEdgeRecord};
use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct ViewerCandidateDto {
    pub id: String,
    pub display_name: String,
    pub extension_id: String,
    pub priority: i32,
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct ArtifactDto {
    pub id: String,
    pub artifact_type: String,
    pub run_id: String,
    pub node_id: String,
    pub port_name: String,
    pub content_hash: String,
    pub size_bytes: i64,
    pub blob_path: String,
    #[ts(type = "Record<string, unknown> | null")]
    pub metadata: Option<serde_json::Value>,
    pub created_at: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub viewer_candidates: Option<Vec<ViewerCandidateDto>>,
}

impl From<&ArtifactRecord> for ArtifactDto {
    fn from(r: &ArtifactRecord) -> Self {
        Self {
            id: r.id.clone(),
            artifact_type: r.artifact_type.clone(),
            run_id: r.run_id.clone(),
            node_id: r.node_id.clone(),
            port_name: r.port_name.clone(),
            content_hash: r.content_hash.clone(),
            size_bytes: r.size_bytes,
            blob_path: r.blob_path.clone(),
            metadata: r
                .metadata
                .as_deref()
                .and_then(|s| serde_json::from_str(s).ok()),
            created_at: r.created_at.clone(),
            viewer_candidates: None,
        }
    }
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct LineageEdgeDto {
    pub output_artifact_id: String,
    pub input_artifact_id: String,
    pub run_id: String,
    pub node_id: String,
}

impl From<&LineageEdgeRecord> for LineageEdgeDto {
    fn from(r: &LineageEdgeRecord) -> Self {
        Self {
            output_artifact_id: r.output_artifact_id.clone(),
            input_artifact_id: r.input_artifact_id.clone(),
            run_id: r.run_id.clone(),
            node_id: r.node_id.clone(),
        }
    }
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct ArtifactLineageDto {
    pub artifact_id: String,
    pub lineage: Vec<LineageEdgeDto>,
}
