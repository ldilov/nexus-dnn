//! P8 upgrade-assistant diff (CONTRACTS C8 FR-7 risk summary). `diff_recipe_pin`
//! is pure: it compares a recipe's pinned workflow-version snapshot against the
//! workflow's current snapshot and classifies node changes, broken bindings, and
//! an `UpgradeRisk` severity. Concrete node ids live here (tests/ is not walked
//! by the boundary scanner) — never in `nexus-recipe/src`.

use std::collections::HashMap;

use nexus_recipe::{
    Control, ControlKind, ControlMode, NodeChangeKind, Output, RecipeProjection, RecipeStatus,
    UpgradeRisk, diff_recipe_pin,
};
use nexus_workflow::{NodeInstance, Workflow, WorkflowPort, WorkflowVersionSnapshot};
use serde_json::json;

fn node(id: &str, operator: &str) -> NodeInstance {
    NodeInstance {
        id: id.to_string(),
        operator: operator.to_string(),
        stage: None,
        inputs: HashMap::new(),
        config: Some(json!({ "steps": 16 })),
    }
}

fn workflow(nodes: Vec<NodeInstance>, inputs: Vec<WorkflowPort>) -> Workflow {
    Workflow {
        id: "wf".to_string(),
        title: "T".to_string(),
        version: "1.0.0".to_string(),
        inputs,
        outputs: vec![],
        nodes,
        stages: vec![],
        created_at: "t0".to_string(),
        updated_at: "t0".to_string(),
    }
}

fn snapshot(version: &str, wf: Workflow) -> WorkflowVersionSnapshot {
    WorkflowVersionSnapshot::from_workflow("wf", version, format!("hash-{version}"), wf, &[])
}

fn projection_binding(binding: &str) -> RecipeProjection {
    RecipeProjection {
        schema_version: 1,
        sections: vec![],
        controls: vec![Control {
            control_id: "steps".to_string(),
            kind: ControlKind::Int,
            label: "Steps".to_string(),
            help_text: None,
            mode: ControlMode::Basic,
            default_value: json!(16),
            widget_hint: None,
            bindings: vec![binding.to_string()],
        }],
        presets: vec![],
        output: Output {
            primary_artifact: "audio".to_string(),
            secondary: vec![],
            preview_style: "player".to_string(),
            show_intermediate: false,
        },
        custom_ui: None,
    }
}

#[test]
fn diff_detects_outdated_when_current_newer_no_broken_bindings() {
    let projection = projection_binding("node:gen.config.steps");
    let pinned = snapshot("v1", workflow(vec![node("gen", "synth@1.0.0")], vec![]));
    let current = snapshot("v2", workflow(vec![node("gen", "synth@1.0.0")], vec![]));

    let diff = diff_recipe_pin(&projection, &pinned, &current);

    assert!(diff.is_outdated, "current v2 is newer than pinned v1");
    assert_eq!(diff.summary, RecipeStatus::Outdated);
    assert_eq!(diff.risk, UpgradeRisk::Outdated);
    assert!(diff.broken_bindings.is_empty());
}

#[test]
fn diff_flags_broken_binding_when_target_node_removed() {
    let projection = projection_binding("node:gen.config.steps");
    let pinned = snapshot("v1", workflow(vec![node("gen", "synth@1.0.0")], vec![]));
    let current = snapshot("v2", workflow(vec![node("other", "synth@1.0.0")], vec![]));

    let diff = diff_recipe_pin(&projection, &pinned, &current);

    assert_eq!(diff.broken_bindings.len(), 1);
    assert_eq!(diff.broken_bindings[0].control_id, "steps");
    assert_eq!(diff.broken_bindings[0].target, "node:gen.config.steps");
    assert_eq!(diff.summary, RecipeStatus::Broken);
    assert_eq!(diff.risk, UpgradeRisk::Breaking);
}

#[test]
fn diff_flags_schema_hash_drift_as_broken() {
    let projection = projection_binding("node:gen.config.steps");
    let mut pinned = snapshot("v1", workflow(vec![node("gen", "synth@1.0.0")], vec![]));
    let mut current = snapshot("v2", workflow(vec![node("gen", "synth@1.0.0")], vec![]));
    pinned
        .operator_schema_hashes
        .insert("gen".to_string(), "hash-a".to_string());
    current
        .operator_schema_hashes
        .insert("gen".to_string(), "hash-b".to_string());

    let diff = diff_recipe_pin(&projection, &pinned, &current);

    assert!(
        diff.changed_nodes
            .iter()
            .any(|c| c.node_id == "gen" && matches!(c.kind, NodeChangeKind::SchemaHashDrift)),
        "expected a SchemaHashDrift change for gen, got {:?}",
        diff.changed_nodes
    );
    assert_eq!(diff.summary, RecipeStatus::Broken);
    assert_eq!(diff.risk, UpgradeRisk::Breaking);
}

#[test]
fn diff_reports_no_change_when_pinned_equals_current() {
    let projection = projection_binding("input:script");
    let port = WorkflowPort {
        name: "script".to_string(),
        port_type: "string".to_string(),
    };
    let pinned = snapshot(
        "v1",
        workflow(vec![node("gen", "synth@1.0.0")], vec![port.clone()]),
    );
    let current = snapshot("v1", workflow(vec![node("gen", "synth@1.0.0")], vec![port]));

    let diff = diff_recipe_pin(&projection, &pinned, &current);

    assert!(!diff.is_outdated);
    assert!(diff.changed_nodes.is_empty());
    assert!(diff.broken_bindings.is_empty());
    assert_eq!(diff.summary, RecipeStatus::Healthy);
    assert_eq!(diff.risk, UpgradeRisk::Safe);
}
