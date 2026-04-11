use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct ArtifactManifest {
    pub id: String,
    pub artifact_type: String,
    pub run_id: String,
    pub node_id: String,
    pub port_name: String,
    pub content_hash: String,
    pub size_bytes: u64,
    pub blob_path: String,
    pub metadata: Option<serde_json::Value>,
    pub created_at: String,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct LineageEdge {
    pub output_artifact_id: String,
    pub input_artifact_id: String,
    pub run_id: String,
    pub node_id: String,
}
