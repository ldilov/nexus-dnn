use nexus_storage::{NodeExecutionRecord, RunRecord};
use serde::{Deserialize, Serialize};
use ts_rs::TS;

use super::artifacts::ArtifactDto;

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct RunDto {
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

impl From<&RunRecord> for RunDto {
    fn from(r: &RunRecord) -> Self {
        Self {
            id: r.id.clone(),
            workflow_id: r.workflow_id.clone(),
            workflow_version: r.workflow_version.clone(),
            status: r.status.clone(),
            started_at: r.started_at.clone(),
            completed_at: r.completed_at.clone(),
            error: r.error.clone(),
            created_at: r.created_at.clone(),
            run_label: r.run_label.clone(),
            execution_profile: r.execution_profile.clone(),
            predecessor_run_id: r.predecessor_run_id.clone(),
        }
    }
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct NodeExecutionDto {
    pub run_id: String,
    pub node_id: String,
    pub status: String,
    pub worker_id: Option<String>,
    pub started_at: Option<String>,
    pub completed_at: Option<String>,
    pub duration_ms: Option<i64>,
    pub error: Option<String>,
}

impl From<&NodeExecutionRecord> for NodeExecutionDto {
    fn from(r: &NodeExecutionRecord) -> Self {
        Self {
            run_id: r.run_id.clone(),
            node_id: r.node_id.clone(),
            status: r.status.clone(),
            worker_id: r.worker_id.clone(),
            started_at: r.started_at.clone(),
            completed_at: r.completed_at.clone(),
            duration_ms: r.duration_ms,
            error: r.error.clone(),
        }
    }
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct RunDetailDto {
    pub run: RunDto,
    pub nodes: Vec<NodeExecutionDto>,
    pub artifacts: Vec<ArtifactDto>,
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct CreateRunResponseDto {
    pub run_id: String,
    pub status: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub predecessor_run_id: Option<String>,
}
