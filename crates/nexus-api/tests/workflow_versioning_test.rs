//! P0 — `update_workflow_graph` appends an immutable user version when the
//! graph changes, and no-ops when an identical graph is re-saved.

use axum::Json;
use axum::extract::{Path, State};

use nexus_api::dto::{WorkflowPortDto, WorkflowStageDefDto, WorkflowUpdatePayloadDto};
use nexus_api::handlers::workflows::{
    create_workflow, get_workflow_version, list_workflow_versions, revert_workflow,
    update_workflow_graph,
};
use nexus_storage::Database;
use nexus_storage::records::{WorkflowRecord, WorkflowVersionRecord};

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

fn seed_workflow(id: &str) -> WorkflowRecord {
    WorkflowRecord {
        id: id.into(),
        title: "T".into(),
        version: "0.1.0".into(),
        inputs: Some("[]".into()),
        outputs: Some("[]".into()),
        nodes: "[]".into(),
        edges: "[]".into(),
        stages: Some("[]".into()),
        created_at: "t".into(),
        updated_at: "t".into(),
        user_edited_at: Some("t".into()),
        extension_id: None,
        extension_version: None,
        extension_version_first_seen: None,
    }
}

fn seed_version(
    workflow_id: &str,
    version: &str,
    hash: &str,
    author: &str,
) -> WorkflowVersionRecord {
    WorkflowVersionRecord {
        workflow_id: workflow_id.into(),
        version: version.into(),
        canonical_hash: hash.into(),
        operator_schema_hash: None,
        inputs: Some("[]".into()),
        outputs: Some("[]".into()),
        nodes: "[]".into(),
        edges: "[]".into(),
        stages: Some("[]".into()),
        author_kind: author.into(),
        extension_id: if author == "extension" {
            Some("ext".into())
        } else {
            None
        },
        extension_version: if author == "extension" {
            Some("1.0.0".into())
        } else {
            None
        },
        created_at: "t".into(),
    }
}

#[tokio::test]
async fn revert_repoints_head_to_latest_extension_version() {
    let harness = harness_with(StubHf::with_results(vec![])).await;
    let state = harness.state;
    let id = "wf-revert";

    state.db.insert_workflow(&seed_workflow(id)).await.unwrap();
    state
        .db
        .insert_workflow_version(&seed_version(id, "1", "hashEXT", "extension"))
        .await
        .unwrap();
    state
        .db
        .insert_workflow_version(&seed_version(id, "2", "hashUSER", "user"))
        .await
        .unwrap();
    state
        .db
        .set_workflow_current_version(id, "2", "t")
        .await
        .unwrap();

    revert_workflow(State(state.clone()), Path(id.to_string()))
        .await
        .expect("revert_workflow");

    assert_eq!(
        state
            .db
            .get_workflow_current_version(id)
            .await
            .unwrap()
            .as_deref(),
        Some("1")
    );
}

#[tokio::test]
async fn version_read_apis_list_and_detail_with_is_current_flag() {
    let harness = harness_with(StubHf::with_results(vec![])).await;
    let state = harness.state;
    let id = "wf-versioning";

    create_workflow(State(state.clone()), CREATE_YAML.to_string())
        .await
        .expect("create_workflow");
    update_workflow_graph(
        State(state.clone()),
        Path(id.to_string()),
        Json(payload(&["a"])),
    )
    .await
    .expect("update_workflow_graph (changed)");

    let list = list_workflow_versions(State(state.clone()), Path(id.to_string()))
        .await
        .expect("list_workflow_versions");
    let items = list.data.expect("list data").items;
    assert_eq!(
        items.iter().map(|v| v.version.as_str()).collect::<Vec<_>>(),
        ["1", "2"]
    );
    assert!(!items[0].is_current);
    assert!(items[1].is_current);

    let v1 = get_workflow_version(
        State(state.clone()),
        Path((id.to_string(), "1".to_string())),
    )
    .await
    .expect("get_workflow_version 1")
    .data
    .expect("version data");
    assert_eq!(v1.version, "1");
    assert!(!v1.is_current);
    assert_eq!(v1.canonical_hash.len(), 64);

    let v2 = get_workflow_version(
        State(state.clone()),
        Path((id.to_string(), "2".to_string())),
    )
    .await
    .expect("get_workflow_version 2")
    .data
    .expect("version data");
    assert!(v2.is_current);

    let missing = get_workflow_version(
        State(state.clone()),
        Path((id.to_string(), "99".to_string())),
    )
    .await;
    assert!(missing.is_err());
}
