use nexus_api::dto::{ExtensionDto, WorkflowDto, WorkflowStatusDto};
use nexus_storage::{ExtensionRecord, WorkflowRecord};

fn make_ext(id: &str, status: &str) -> ExtensionRecord {
    ExtensionRecord {
        id: id.into(),
        name: Some(id.into()),
        version: "1.0.0".into(),
        description: None,
        publisher: None,
        host_api_compat: "1.0.0".into(),
        protocol_compat: "1.0.0".into(),
        runtime_family: "builtin".into(),
        entrypoint: ".".into(),
        capabilities: None,
        status: status.into(),
        directory: format!("extensions/builtin/{id}"),
        installed_at: "2026-04-14T00:00:00Z".into(),
        recipe_count: Some(0),
        ui_contribution_count: Some(0),
        validation_errors: None,
        primary_recipe_id: None,
        default_workflow_id: None,
        icon_kind: None,
        icon_symbol: None,
        icon_svg: None,
    }
}

fn make_wf(id: &str, extension_id: Option<&str>, edited: bool) -> WorkflowRecord {
    WorkflowRecord {
        id: id.into(),
        title: id.into(),
        version: "1.0.0".into(),
        inputs: Some("[]".into()),
        outputs: Some("[]".into()),
        nodes: "[]".into(),
        edges: "[]".into(),
        stages: Some("[]".into()),
        created_at: "2026-04-14T00:00:00Z".into(),
        updated_at: "2026-04-14T00:00:00Z".into(),
        user_edited_at: if edited {
            Some("2026-04-14T10:00:00Z".into())
        } else {
            None
        },
        extension_id: extension_id.map(str::to_owned),
        extension_version: extension_id.map(|_| "1.0.0".to_owned()),
        extension_version_first_seen: extension_id.map(|_| "2026-04-14T00:00:00Z".to_owned()),
    }
}

#[test]
fn extension_dto_exposes_status_string() {
    let active = ExtensionDto::from(&make_ext("a", "active"));
    let disabled = ExtensionDto::from(&make_ext("a", "disabled"));
    assert_eq!(active.status, "active");
    assert_eq!(disabled.status, "disabled");
}

#[test]
fn workflow_dto_includes_extension_id_and_user_edit_stamp() {
    let shipped = WorkflowDto::from(&make_wf("x", Some("nexus.chatllm"), false));
    assert_eq!(shipped.extension_id.as_deref(), Some("nexus.chatllm"));
    assert_eq!(shipped.user_edited_at, None);
    assert!(matches!(shipped.status, WorkflowStatusDto::Stable));

    let edited = WorkflowDto::from(&make_wf("y", Some("nexus.chatllm"), true));
    assert_eq!(edited.extension_id.as_deref(), Some("nexus.chatllm"));
    assert!(edited.user_edited_at.is_some());
    assert!(matches!(edited.status, WorkflowStatusDto::Modified));

    let user = WorkflowDto::from(&make_wf("z", None, false));
    assert_eq!(user.extension_id, None);
    assert!(matches!(user.status, WorkflowStatusDto::User));
}
