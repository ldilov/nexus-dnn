use nexus_api::dto::{WorkflowDto, WorkflowStatusDto};
use nexus_storage::WorkflowRecord;

fn base_record() -> WorkflowRecord {
    WorkflowRecord {
        id: "wf".into(),
        title: "WF".into(),
        version: "1.0.0".into(),
        inputs: Some("[]".into()),
        outputs: Some("[]".into()),
        nodes: "[]".into(),
        edges: "[]".into(),
        stages: Some("[]".into()),
        created_at: "2026-04-14T00:00:00Z".into(),
        updated_at: "2026-04-14T00:00:00Z".into(),
        user_edited_at: None,
        extension_id: None,
        extension_version: None,
        extension_version_first_seen: None,
    }
}

#[test]
fn user_status_when_extension_id_missing() {
    let dto = WorkflowDto::from(&base_record());
    assert!(matches!(dto.status, WorkflowStatusDto::User));
    assert!(dto.extension_id.is_none());
}

#[test]
fn stable_status_when_shipped_untouched() {
    let mut record = base_record();
    record.extension_id = Some("nexus.chatllm".into());
    record.extension_version = Some("1.0.0".into());
    let dto = WorkflowDto::from(&record);
    assert!(matches!(dto.status, WorkflowStatusDto::Stable));
}

#[test]
fn modified_status_when_shipped_and_edited() {
    let mut record = base_record();
    record.extension_id = Some("nexus.chatllm".into());
    record.extension_version = Some("1.0.0".into());
    record.user_edited_at = Some("2026-04-14T10:00:00Z".into());
    let dto = WorkflowDto::from(&record);
    assert!(matches!(dto.status, WorkflowStatusDto::Modified));
}

#[test]
fn node_count_reflects_parsed_nodes() {
    let mut record = base_record();
    record.nodes = r#"[{"id":"a","operator":"op@1","stage":null,"inputs":{},"config":null},
                       {"id":"b","operator":"op@1","stage":null,"inputs":{},"config":null}]"#
        .into();
    let dto = WorkflowDto::from(&record);
    assert_eq!(dto.node_count, 2);
}
