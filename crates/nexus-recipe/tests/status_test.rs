use std::collections::HashMap;

use nexus_extension::OperatorDefinition;
use nexus_recipe::{
    Control, ControlKind, ControlMode, REASON_BROKEN_BINDING, REASON_NEEDS_RE_PIN,
    REASON_OPERATOR_SCHEMA_DRIFT, REASON_PINNED_VERSION_MISSING, RecipeProjection, RecipeStatus,
    assess_status, compute_status,
};
use nexus_workflow::{NodeInput, NodeInstance, Workflow, WorkflowPort, WorkflowVersionSnapshot};
use serde_json::json;

fn op(id: &str, version: &str, schema: serde_json::Value) -> OperatorDefinition {
    serde_json::from_value(json!({
        "spec_version": "1.0",
        "operator": { "id": id, "version": version },
        "config_schema": schema,
    }))
    .unwrap()
}

fn node(id: &str, operator: &str) -> NodeInstance {
    let mut inputs = HashMap::new();
    inputs.insert(
        "prompt".to_string(),
        NodeInput::Literal { value: json!("hi") },
    );
    NodeInstance {
        id: id.to_string(),
        operator: operator.to_string(),
        stage: None,
        inputs,
        config: Some(json!({ "steps": 16 })),
    }
}

fn workflow(node_id: &str) -> Workflow {
    Workflow {
        id: "wf-1".into(),
        title: "T".into(),
        version: "1.0.0".into(),
        inputs: vec![WorkflowPort {
            name: "script".into(),
            port_type: "text".into(),
        }],
        outputs: vec![],
        nodes: vec![node(node_id, "synth@1.0.0")],
        stages: vec![],
        created_at: "t0".into(),
        updated_at: "t0".into(),
    }
}

fn snapshot(version: &str, node_id: &str, schema: serde_json::Value) -> WorkflowVersionSnapshot {
    let ops = vec![op("synth", "1.0.0", schema)];
    WorkflowVersionSnapshot::from_workflow("wf-1", version, "h", workflow(node_id), &ops)
}

fn proj_with_binding(binding: &str) -> RecipeProjection {
    let mut p = RecipeProjection::empty();
    p.controls.push(Control {
        control_id: "c".into(),
        kind: ControlKind::Float,
        label: "C".into(),
        help_text: None,
        mode: ControlMode::Basic,
        default_value: json!(1.0),
        widget_hint: None,
        bindings: vec![binding.to_string()],
    });
    p
}

#[test]
fn recipe_status_serializes_snake_case() {
    assert_eq!(
        serde_json::to_value(RecipeStatus::Healthy).unwrap(),
        json!("healthy")
    );
    assert_eq!(
        serde_json::to_value(RecipeStatus::Outdated).unwrap(),
        json!("outdated")
    );
    assert_eq!(
        serde_json::to_value(RecipeStatus::Broken).unwrap(),
        json!("broken")
    );
    assert_eq!(RecipeStatus::Healthy.as_str(), "healthy");
    assert_eq!(RecipeStatus::from_str("broken"), Some(RecipeStatus::Broken));
    assert_eq!(RecipeStatus::from_str("nope"), None);
}

#[test]
fn status_broken_when_pin_unresolvable() {
    let (s, r) = compute_status(true, true, true, false, true);
    assert_eq!(s, RecipeStatus::Broken);
    assert_eq!(r.as_deref(), Some(REASON_NEEDS_RE_PIN));
}

#[test]
fn status_broken_when_pinned_version_missing() {
    let (s, r) = compute_status(false, false, true, false, false);
    assert_eq!(s, RecipeStatus::Broken);
    assert_eq!(r.as_deref(), Some(REASON_PINNED_VERSION_MISSING));
}

#[test]
fn status_broken_on_operator_schema_drift() {
    let (s, r) = compute_status(true, true, true, true, false);
    assert_eq!(s, RecipeStatus::Broken);
    assert_eq!(r.as_deref(), Some(REASON_OPERATOR_SCHEMA_DRIFT));
}

#[test]
fn status_outdated_when_pinned_not_current() {
    let (s, r) = compute_status(true, false, true, false, false);
    assert_eq!(s, RecipeStatus::Outdated);
    assert_eq!(r, None);
}

#[test]
fn status_healthy_when_pinned_current_and_no_drift() {
    let (s, r) = compute_status(true, true, true, false, false);
    assert_eq!(s, RecipeStatus::Healthy);
    assert_eq!(r, None);
}

#[test]
fn assess_status_derives_facts_from_snapshots() {
    let schema_a = json!({ "properties": { "steps": { "type": "integer" } } });
    let schema_b =
        json!({ "properties": { "steps": { "type": "integer" }, "x": { "type": "string" } } });
    let pinned = snapshot("v1", "gen_1", schema_a.clone());
    let proj = proj_with_binding("node:gen_1.config.speed");

    let current_drift = snapshot("v2", "gen_1", schema_b);
    let (s, r) = assess_status(&proj, Some(&pinned), Some(&current_drift), &[]);
    assert_eq!(s, RecipeStatus::Broken);
    assert_eq!(r.as_deref(), Some(REASON_OPERATOR_SCHEMA_DRIFT));

    let current_same = snapshot("v2", "gen_1", schema_a.clone());
    let (s2, _) = assess_status(&proj, Some(&pinned), Some(&current_same), &[]);
    assert_eq!(s2, RecipeStatus::Outdated);

    let (s3, r3) = assess_status(&proj, Some(&pinned), Some(&pinned), &[]);
    assert_eq!(s3, RecipeStatus::Healthy);
    assert_eq!(r3, None);
}

#[test]
fn assess_status_resolves_suffixed_node_id_bindings() {
    let schema = json!({ "properties": { "steps": { "type": "integer" } } });
    let pinned = snapshot("v1", "gen_1", schema.clone());

    let ok = proj_with_binding("node:gen_1.config.speed");
    let (s, _) = assess_status(&ok, Some(&pinned), Some(&pinned), &[]);
    assert_eq!(s, RecipeStatus::Healthy, "suffixed id resolves");

    let bad = proj_with_binding("node:gen.config.speed");
    let (s2, r2) = assess_status(&bad, Some(&pinned), Some(&pinned), &[]);
    assert_eq!(s2, RecipeStatus::Broken, "un-suffixed id does not resolve");
    assert_eq!(r2.as_deref(), Some(REASON_BROKEN_BINDING));
}

#[test]
fn assess_status_resolves_input_port_bindings() {
    let schema = json!({ "properties": { "steps": { "type": "integer" } } });
    let pinned = snapshot("v1", "gen_1", schema);
    let ok = proj_with_binding("input:script");
    let (s, _) = assess_status(&ok, Some(&pinned), Some(&pinned), &[]);
    assert_eq!(s, RecipeStatus::Healthy);
    let bad = proj_with_binding("input:nonexistent");
    let (s2, _) = assess_status(&bad, Some(&pinned), Some(&pinned), &[]);
    assert_eq!(s2, RecipeStatus::Broken);
}

#[test]
fn assess_status_missing_pinned_snapshot_is_broken() {
    let proj = RecipeProjection::empty();
    let (s, r) = assess_status(&proj, None, None, &[]);
    assert_eq!(s, RecipeStatus::Broken);
    assert_eq!(r.as_deref(), Some(REASON_PINNED_VERSION_MISSING));
}
