use nexus_storage::WorkflowRecord;
use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct WorkflowPortDto {
    pub name: String,
    #[serde(rename = "type")]
    #[ts(rename = "type")]
    pub port_type: String,
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct WorkflowOutputBindingDto {
    pub name: String,
    pub from: String,
}

/// Untagged enum. The backend emits either `{from: "..."}` (a reference to
/// another node's output port or a workflow input) or `{value: ...}` (a literal).
/// Matches `nexus_workflow::model::NodeInput` on the wire.
#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[serde(untagged)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub enum WorkflowNodeInputDto {
    Reference {
        from: String,
    },
    Literal {
        #[ts(type = "unknown")]
        value: serde_json::Value,
    },
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct WorkflowNodeDto {
    pub id: String,
    pub operator: String,
    pub stage: Option<String>,
    pub inputs: std::collections::HashMap<String, WorkflowNodeInputDto>,
    #[ts(type = "Record<string, unknown> | null")]
    pub config: Option<serde_json::Value>,
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct WorkflowEdgeDto {
    pub source_node: String,
    pub source_port: String,
    pub target_node: String,
    pub target_port: String,
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct WorkflowStageDto {
    pub id: String,
    pub name: String,
    pub label: String,
    pub nodes: Vec<WorkflowNodeDto>,
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct WorkflowDto {
    pub id: String,
    /// Canonical display title from the workflow definition.
    pub title: String,
    /// Mirrors `title` for frontend callers that expect a `name` field from
    /// the runtime execution model (`nexus_workflow::Workflow.title`).
    pub name: String,
    pub version: String,
    pub inputs: Vec<WorkflowPortDto>,
    pub outputs: Vec<WorkflowOutputBindingDto>,
    pub nodes: Vec<WorkflowNodeDto>,
    pub edges: Vec<WorkflowEdgeDto>,
    pub stages: Vec<WorkflowStageDto>,
    pub created_at: String,
    pub updated_at: String,
}

impl From<&WorkflowRecord> for WorkflowDto {
    fn from(r: &WorkflowRecord) -> Self {
        let inputs: Vec<WorkflowPortDto> = parse_optional_json(r.inputs.as_deref());
        let outputs: Vec<WorkflowOutputBindingDto> = parse_optional_json(r.outputs.as_deref());
        let nodes: Vec<WorkflowNodeDto> = parse_required_json(&r.nodes);
        let edges: Vec<WorkflowEdgeDto> = parse_required_json(&r.edges);

        // Group nodes by stage id. Declared stages populate first; nodes whose
        // `stage` field does not match any declared stage fall into a synthetic
        // "ungrouped" stage so they remain visible.
        let stage_defs: Vec<serde_json::Value> = parse_optional_json(r.stages.as_deref());
        let mut stages_with_nodes: Vec<WorkflowStageDto> = stage_defs
            .iter()
            .map(|stage| {
                let stage_id = stage
                    .get("id")
                    .and_then(|v| v.as_str())
                    .unwrap_or_default()
                    .to_owned();
                let stage_label = stage
                    .get("label")
                    .and_then(|v| v.as_str())
                    .unwrap_or(&stage_id)
                    .to_owned();
                let nodes_in_stage = nodes
                    .iter()
                    .filter(|n| n.stage.as_deref() == Some(stage_id.as_str()))
                    .cloned()
                    .collect::<Vec<_>>();
                WorkflowStageDto {
                    id: stage_id.clone(),
                    name: stage_label.clone(),
                    label: stage_label,
                    nodes: nodes_in_stage,
                }
            })
            .collect();

        let declared: std::collections::HashSet<String> =
            stages_with_nodes.iter().map(|s| s.id.clone()).collect();
        let orphan_nodes: Vec<WorkflowNodeDto> = nodes
            .iter()
            .filter(|n| match n.stage.as_deref() {
                Some(sid) => !declared.contains(sid),
                None => true,
            })
            .cloned()
            .collect();
        if !orphan_nodes.is_empty() {
            stages_with_nodes.push(WorkflowStageDto {
                id: "ungrouped".to_owned(),
                name: "Ungrouped".to_owned(),
                label: "Ungrouped".to_owned(),
                nodes: orphan_nodes,
            });
        }

        Self {
            id: r.id.clone(),
            title: r.title.clone(),
            name: r.title.clone(),
            version: r.version.clone(),
            inputs,
            outputs,
            nodes,
            edges,
            stages: stages_with_nodes,
            created_at: r.created_at.clone(),
            updated_at: r.updated_at.clone(),
        }
    }
}

fn parse_optional_json<T: serde::de::DeserializeOwned + Default>(raw: Option<&str>) -> T {
    raw.and_then(|s| serde_json::from_str(s).ok())
        .unwrap_or_default()
}

fn parse_required_json<T: serde::de::DeserializeOwned + Default>(raw: &str) -> T {
    serde_json::from_str(raw).unwrap_or_default()
}
