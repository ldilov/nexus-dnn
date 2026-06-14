//! P0 — `update_workflow_graph` appends an immutable user version when the
//! graph changes, and no-ops when an identical graph is re-saved.

use axum::Json;
use axum::extract::{Path, State};

use nexus_api::dto::{WorkflowPortDto, WorkflowStageDefDto, WorkflowUpdatePayloadDto};
use nexus_api::handlers::workflows::{create_workflow, update_workflow_graph};
use nexus_storage::Database;

mod common;
use common::{StubHf, harness_with};

const CREATE_YAML: &str = r#"
spec_version: "0.1"
workflow:
  id: "wf-versioning"
  version: "0.1.0"
  title: "Versioning WF"
  inputs: []
  outputs: []
  stages: []
  nodes: []
"#;

fn payload(input_names: &[&str]) -> WorkflowUpdatePayloadDto {
    WorkflowUpdatePayloadDto {
        title: "Versioning WF".into(),
        version: "0.1.0".into(),
        inputs: input_names
            .iter()
            .map(|n| WorkflowPortDto {
                name: (*n).into(),
                port_type: "string".into(),
            })
            .collect(),
        outputs: vec![],
        nodes: vec![],
        stages: vec![WorkflowStageDefDto {
            id: "s1".into(),
            label: "Stage 1".into(),
        }],
    }
}

#[tokio::test]
async fn user_graph_edits_append_versions_and_noop_on_identical_graph() {
    let harness = harness_with(StubHf::with_results(vec![])).await;
    let state = harness.state;
    let id = "wf-versioning";

    // 1. create the workflow -> initial version "1", head == "1"
    create_workflow(State(state.clone()), CREATE_YAML.to_string())
        .await
        .expect("create_workflow");
    let versions = state.db.list_workflow_versions(id).await.unwrap();
    assert_eq!(
        versions
            .iter()
            .map(|v| v.version.as_str())
            .collect::<Vec<_>>(),
        ["1"]
    );
    assert_eq!(
        state
            .db
            .get_workflow_current_version(id)
            .await
            .unwrap()
            .as_deref(),
        Some("1")
    );
    assert_eq!(versions[0].author_kind, "user");

    // 2. PUT a changed graph -> appends version "2", head advances to "2"
    update_workflow_graph(
        State(state.clone()),
        Path(id.to_string()),
        Json(payload(&["a"])),
    )
    .await
    .expect("update_workflow_graph (changed)");
    let versions = state.db.list_workflow_versions(id).await.unwrap();
    assert_eq!(
        versions
            .iter()
            .map(|v| v.version.as_str())
            .collect::<Vec<_>>(),
        ["1", "2"]
    );
    assert_eq!(
        state
            .db
            .get_workflow_current_version(id)
            .await
            .unwrap()
            .as_deref(),
        Some("2")
    );
    assert_eq!(versions[1].author_kind, "user");

    // 3. PUT the identical graph again -> no-op, still ["1","2"], head == "2"
    update_workflow_graph(
        State(state.clone()),
        Path(id.to_string()),
        Json(payload(&["a"])),
    )
    .await
    .expect("update_workflow_graph (identical)");
    let versions = state.db.list_workflow_versions(id).await.unwrap();
    assert_eq!(
        versions
            .iter()
            .map(|v| v.version.as_str())
            .collect::<Vec<_>>(),
        ["1", "2"]
    );
    assert_eq!(
        state
            .db
            .get_workflow_current_version(id)
            .await
            .unwrap()
            .as_deref(),
        Some("2")
    );
}
