use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct ExtensionRecord {
    pub id: String,
    pub name: Option<String>,
    pub version: String,
    pub description: Option<String>,
    pub publisher: Option<String>,
    pub host_api_compat: String,
    pub protocol_compat: String,
    pub runtime_family: String,
    pub entrypoint: String,
    pub capabilities: Option<String>,
    pub status: String,
    pub directory: String,
    pub installed_at: String,
    pub recipe_count: Option<i32>,
    pub ui_contribution_count: Option<i32>,
    pub validation_errors: Option<String>,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct OperatorRecord {
    pub id: String,
    pub version: String,
    pub extension_id: String,
    pub display_name: Option<String>,
    pub description: Option<String>,
    pub category: Option<String>,
    pub inputs: String,
    pub outputs: String,
    pub config_schema: Option<String>,
    pub execution_mode: Option<String>,
    pub cacheable: Option<i32>,
    pub resumable: Option<i32>,
    pub resource_hints: Option<String>,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct WorkflowRecord {
    pub id: String,
    pub title: String,
    pub version: String,
    pub inputs: Option<String>,
    pub outputs: Option<String>,
    pub nodes: String,
    pub edges: String,
    pub stages: Option<String>,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct RunRecord {
    pub id: String,
    pub workflow_id: String,
    pub workflow_version: String,
    pub status: String,
    pub started_at: Option<String>,
    pub completed_at: Option<String>,
    pub error: Option<String>,
    pub created_at: String,
    pub run_label: Option<String>,
    pub execution_profile: Option<String>,
    pub predecessor_run_id: Option<String>,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct NodeExecutionRecord {
    pub run_id: String,
    pub node_id: String,
    pub status: String,
    pub worker_id: Option<String>,
    pub started_at: Option<String>,
    pub completed_at: Option<String>,
    pub duration_ms: Option<i64>,
    pub error: Option<String>,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct ArtifactRecord {
    pub id: String,
    pub artifact_type: String,
    pub run_id: String,
    pub node_id: String,
    pub port_name: String,
    pub content_hash: String,
    pub size_bytes: i64,
    pub blob_path: String,
    pub metadata: Option<String>,
    pub created_at: String,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct LineageEdgeRecord {
    pub output_artifact_id: String,
    pub input_artifact_id: String,
    pub run_id: String,
    pub node_id: String,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct RecipeRecord {
    pub id: String,
    pub version: String,
    pub display_name: String,
    pub summary: String,
    pub category: String,
    pub extension_id: String,
    pub extension_version: String,
    pub workflow_template_ref: String,
    pub thumbnail: Option<String>,
    pub input_summary: Option<String>,
    pub bindings: String,
    pub created_at: String,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct UIContributionRecord {
    pub id: String,
    pub kind: String,
    pub extension_id: String,
    pub display_name: String,
    pub description: Option<String>,
    pub target: Option<String>,
    pub supported_types: Option<String>,
    pub priority: i32,
    pub metadata: Option<String>,
    pub availability: String,
}
