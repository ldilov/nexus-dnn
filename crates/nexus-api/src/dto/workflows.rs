use nexus_storage::{WorkflowRecord, WorkflowVersionRecord};
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
    /// RFC3339 timestamp when the UI last saved a user edit. `None` means the
    /// row is tracking the shipped extension YAML and will be reapplied on
    /// every boot.
    pub user_edited_at: Option<String>,
    /// Extension that contributed this workflow. `None` marks a user-authored
    /// or orphaned workflow.
    pub extension_id: Option<String>,
    /// Extension version captured at contribution time.
    pub extension_version: Option<String>,
    /// RFC3339 of the first time this workflow was persisted under its current
    /// `extension_id`.
    pub extension_version_first_seen: Option<String>,
    /// Derived status (Stable / Modified / User).
    pub status: WorkflowStatusDto,
    /// Flat node count across all stages.
    pub node_count: u32,
    /// Declared stage count.
    pub stage_count: u32,
}

/// Derived workflow provenance + modification status.
///
/// - `Stable`: shipped by an extension and untouched by the user.
/// - `Modified`: shipped by an extension, edited by the user.
/// - `User`: no originating extension — created or imported by the user.
#[derive(Clone, Copy, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
#[serde(rename_all = "lowercase")]
pub enum WorkflowStatusDto {
    Stable,
    Modified,
    User,
}

impl From<&WorkflowRecord> for WorkflowDto {
    fn from(r: &WorkflowRecord) -> Self {
        let inputs: Vec<WorkflowPortDto> = parse_optional_json(r.inputs.as_deref());
        let outputs: Vec<WorkflowOutputBindingDto> = parse_optional_json(r.outputs.as_deref());
        let nodes: Vec<WorkflowNodeDto> = parse_required_json(&r.nodes);
        let edges: Vec<WorkflowEdgeDto> = parse_required_json(&r.edges);

        // Group nodes by stage id. Declared stages populate first; nodes whose
        // `stage` field does not match any declared stage fall into a synthetic
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

        let status = if r.extension_id.is_none() {
            WorkflowStatusDto::User
        } else if r.user_edited_at.is_some() {
            WorkflowStatusDto::Modified
        } else {
            WorkflowStatusDto::Stable
        };
        let node_count = nodes.len() as u32;
        let stage_count = stages_with_nodes.len() as u32;

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
            user_edited_at: r.user_edited_at.clone(),
            extension_id: r.extension_id.clone(),
            extension_version: r.extension_version.clone(),
            extension_version_first_seen: r.extension_version_first_seen.clone(),
            status,
            node_count,
            stage_count,
        }
    }
}

/// One immutable entry in a workflow's append-only version history. Mirrors
/// `WorkflowVersionRecord`, parsing its JSON content columns into structured
/// fields (same convention as `WorkflowDto`).
#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct WorkflowVersionDto {
    pub workflow_id: String,
    /// Server-owned monotonic id (`v1`, `v2`, ...).
    pub version: String,
    /// Author-declared semver captured when this version was frozen.
    pub label: Option<String>,
    pub canonical_hash: String,
    pub operator_schema_hash: String,
    /// `"user"` or `"extension"`.
    pub author_kind: String,
    pub extension_id: Option<String>,
    pub extension_version: Option<String>,
    pub created_at: String,
    pub inputs: Vec<WorkflowPortDto>,
    pub outputs: Vec<WorkflowOutputBindingDto>,
    pub nodes: Vec<WorkflowNodeDto>,
    pub edges: Vec<WorkflowEdgeDto>,
    pub stages: Vec<WorkflowStageDefDto>,
}

impl From<&WorkflowVersionRecord> for WorkflowVersionDto {
    fn from(r: &WorkflowVersionRecord) -> Self {
        Self {
            workflow_id: r.workflow_id.clone(),
            version: r.version.clone(),
            label: r.label.clone(),
            canonical_hash: r.canonical_hash.clone(),
            operator_schema_hash: r.operator_schema_hash.clone(),
            author_kind: r.author_kind.clone(),
            extension_id: r.extension_id.clone(),
            extension_version: r.extension_version.clone(),
            created_at: r.created_at.clone(),
            inputs: parse_optional_json(r.inputs.as_deref()),
            outputs: parse_optional_json(r.outputs.as_deref()),
            nodes: parse_required_json(&r.nodes),
            edges: parse_required_json(&r.edges),
            stages: parse_optional_json(r.stages.as_deref()),
        }
    }
}

/// Writable projection of a workflow. The UI `PUT`s this to
/// `/workflows/:id/graph` and the server converts it back to the canonical
/// `nexus_workflow::Workflow`, runs validation, and persists.
#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct WorkflowUpdatePayloadDto {
    pub title: String,
    pub version: String,
    pub inputs: Vec<WorkflowPortDto>,
    pub outputs: Vec<WorkflowOutputBindingDto>,
    pub nodes: Vec<WorkflowNodeDto>,
    /// Raw stage definitions (`{id, label}`). The server does not rely on the
    /// `nodes` array nested under stages in `WorkflowDto`; that's a derived
    /// UI projection.
    pub stages: Vec<WorkflowStageDefDto>,
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct WorkflowStageDefDto {
    pub id: String,
    pub label: String,
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct WorkflowValidationErrorDto {
    pub code: String,
    pub severity: String,
    pub message: String,
    pub node_id: Option<String>,
    pub edge_id: Option<String>,
}

fn parse_optional_json<T: serde::de::DeserializeOwned + Default>(raw: Option<&str>) -> T {
    raw.and_then(|s| serde_json::from_str(s).ok())
        .unwrap_or_default()
}

fn parse_required_json<T: serde::de::DeserializeOwned + Default>(raw: &str) -> T {
    serde_json::from_str(raw).unwrap_or_default()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn workflow_version_dto_parses_content_columns() {
        let record = WorkflowVersionRecord {
            workflow_id: "wf1".into(),
            version: "v2".into(),
            label: Some("1.2.0".into()),
            canonical_hash: "abc".into(),
            operator_schema_hash: "oph".into(),
            nodes: r#"[{"id":"gen","operator":"synth@1.0.0","stage":null,"inputs":{},"config":{"steps":16}}]"#.into(),
            edges: r#"[{"source_node":"gen","source_port":"out","target_node":"post","target_port":"in"}]"#.into(),
            inputs: Some("[]".into()),
            outputs: Some("[]".into()),
            stages: Some(r#"[{"id":"s1","label":"Stage 1"}]"#.into()),
            author_kind: "user".into(),
            extension_id: None,
            extension_version: None,
            created_at: "t0".into(),
        };

        let dto = WorkflowVersionDto::from(&record);

        assert_eq!(dto.version, "v2");
        assert_eq!(dto.label.as_deref(), Some("1.2.0"));
        assert_eq!(dto.author_kind, "user");
        assert_eq!(dto.nodes.len(), 1);
        assert_eq!(dto.nodes[0].id, "gen");
        assert_eq!(dto.edges.len(), 1);
        assert_eq!(dto.stages.len(), 1);
        assert_eq!(dto.stages[0].id, "s1");
    }
}
