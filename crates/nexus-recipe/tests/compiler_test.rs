//! P2 binding-compiler integration tests (CONTRACTS C3). Public API only.
//!
//! Concrete binding strings (`node:..config..`, `input:..`) live here on purpose:
//! `tests/` is NOT walked by `boundary_test.rs`, so literal targets are safe.

use std::collections::BTreeMap;

use nexus_recipe::{
    Control, ControlKind, ControlMode, ControlValues, Output, Preset, PresetSource,
    RecipeProjection, ValueSource, compile_recipe_run,
};
use nexus_workflow::{NodeInstance, Workflow, WorkflowVersionSnapshot};
use serde_json::json;

fn op(
    id: &str,
    version: &str,
    config_schema: serde_json::Value,
) -> nexus_extension::OperatorDefinition {
    serde_json::from_value(json!({
        "spec_version": "1.0",
        "operator": { "id": id, "version": version },
        "config_schema": config_schema,
    }))
    .unwrap()
}

fn node(id: &str, operator: &str, config: serde_json::Value) -> NodeInstance {
    NodeInstance {
        id: id.to_string(),
        operator: operator.to_string(),
        stage: None,
        inputs: std::collections::HashMap::new(),
        config: Some(config),
    }
}

fn input_port(name: &str, ty: &str) -> nexus_workflow::WorkflowPort {
    nexus_workflow::WorkflowPort {
        name: name.to_string(),
        port_type: ty.to_string(),
    }
}

/// A 2-node workflow: `synth` (config steps:int, emotion.alpha:number) and
/// `post` (config normalize:bool). Inputs: `script_text:text`, `seed:int`.
fn fixture_workflow() -> Workflow {
    Workflow {
        id: "wf-decl".to_string(),
        title: "Fixture".to_string(),
        version: "1.0.0".to_string(),
        inputs: vec![input_port("script_text", "text"), input_port("seed", "int")],
        outputs: vec![],
        nodes: vec![
            node("synth", "synth@1.0.0", json!({ "steps": 16 })),
            node("post", "post@1.0.0", json!({ "normalize": true })),
        ],
        stages: vec![],
        created_at: "t0".to_string(),
        updated_at: "t0".to_string(),
    }
}

fn fixture_operators() -> Vec<nexus_extension::OperatorDefinition> {
    vec![
        op(
            "synth",
            "1.0.0",
            json!({
                "type": "object",
                "properties": {
                    "steps": { "type": "integer" },
                    "emotion": {
                        "type": "object",
                        "properties": { "alpha": { "type": "number" } }
                    }
                }
            }),
        ),
        op(
            "post",
            "1.0.0",
            json!({
                "type": "object",
                "properties": { "normalize": { "type": "boolean" } }
            }),
        ),
    ]
}

fn snapshot() -> WorkflowVersionSnapshot {
    let ops = fixture_operators();
    WorkflowVersionSnapshot::from_workflow("wf-store", "v1", "hash", fixture_workflow(), &ops)
}

fn control(
    control_id: &str,
    mode: ControlMode,
    default_value: serde_json::Value,
    bindings: Vec<&str>,
) -> Control {
    Control {
        control_id: control_id.to_string(),
        kind: ControlKind::Float,
        label: control_id.to_string(),
        help_text: None,
        mode,
        default_value,
        widget_hint: None,
        bindings: bindings.into_iter().map(str::to_string).collect(),
    }
}

fn preset(preset_id: &str, values: serde_json::Value) -> Preset {
    Preset {
        preset_id: preset_id.to_string(),
        label: preset_id.to_string(),
        description: None,
        source: PresetSource::Recipe,
        values: values.as_object().cloned().unwrap_or_default(),
    }
}

fn projection(controls: Vec<Control>, presets: Vec<Preset>) -> RecipeProjection {
    RecipeProjection {
        schema_version: 1,
        sections: vec![],
        controls,
        presets,
        output: Output {
            primary_artifact: "out".to_string(),
            secondary: vec![],
            preview_style: "default".to_string(),
            show_intermediate: false,
        },
        custom_ui: None,
    }
}

fn vals(pairs: &[(&str, serde_json::Value)]) -> ControlValues {
    let mut m: BTreeMap<String, serde_json::Value> = BTreeMap::new();
    for (k, v) in pairs {
        m.insert((*k).to_string(), v.clone());
    }
    m
}

#[test]
fn compile_fans_out_one_control_to_many_targets() {
    let controls = vec![control(
        "steps",
        ControlMode::Basic,
        json!(16),
        vec!["input:seed", "node:synth.config.steps"],
    )];
    let proj = projection(controls, vec![]);
    let run = compile_recipe_run(&proj, &snapshot(), &vals(&[("steps", json!(8))]), None).unwrap();

    assert_eq!(run.resolved_inputs.get("seed"), Some(&json!(8)));
    let synth = run
        .resolved_workflow
        .nodes
        .iter()
        .find(|n| n.id == "synth")
        .unwrap();
    assert_eq!(synth.config.as_ref().unwrap()["steps"], json!(8));

    let applied = run
        .applied_controls
        .iter()
        .find(|a| a.control_id == "steps")
        .unwrap();
    assert_eq!(applied.targets.len(), 2);
    assert!(applied.targets.contains(&"input:seed".to_string()));
    assert!(
        applied
            .targets
            .contains(&"node:synth.config.steps".to_string())
    );
}

#[test]
fn compile_layers_default_then_preset_then_user() {
    let controls = vec![
        control(
            "a",
            ControlMode::Basic,
            json!(1.0),
            vec!["node:synth.config.emotion.alpha"],
        ),
        control(
            "b",
            ControlMode::Basic,
            json!(5.0),
            vec!["node:synth.config.emotion.beta"],
        ),
        control(
            "c",
            ControlMode::Basic,
            json!(9.0),
            vec!["node:synth.config.emotion.gamma"],
        ),
    ];
    let presets = vec![preset("p", json!({ "a": 2.0, "b": 6.0 }))];
    let proj = projection(controls, presets);
    let run =
        compile_recipe_run(&proj, &snapshot(), &vals(&[("a", json!(3.0))]), Some("p")).unwrap();

    let a = run
        .applied_controls
        .iter()
        .find(|x| x.control_id == "a")
        .unwrap();
    assert_eq!(a.value, json!(3.0));
    assert_eq!(a.source, ValueSource::User);

    let b = run
        .applied_controls
        .iter()
        .find(|x| x.control_id == "b")
        .unwrap();
    assert_eq!(b.value, json!(6.0));
    assert_eq!(b.source, ValueSource::Preset);

    let c = run
        .applied_controls
        .iter()
        .find(|x| x.control_id == "c")
        .unwrap();
    assert_eq!(c.value, json!(9.0));
    assert_eq!(c.source, ValueSource::Default);
}

#[test]
fn compile_rejects_locked_override() {
    let controls = vec![control(
        "locked_one",
        ControlMode::Locked,
        json!(1.0),
        vec!["node:synth.config.emotion.alpha"],
    )];
    let proj = projection(controls, vec![]);
    let err = compile_recipe_run(
        &proj,
        &snapshot(),
        &vals(&[("locked_one", json!(2.0))]),
        None,
    )
    .unwrap_err();
    assert!(
        matches!(err, nexus_recipe::BindingError::LockedOverride { ref control_id } if control_id == "locked_one"),
        "expected LockedOverride, got {err:?}"
    );
}

#[test]
fn compile_hidden_control_rejects_with_hidden_control_not_settable() {
    let controls = vec![
        control(
            "hid",
            ControlMode::Hidden,
            json!(1.0),
            vec!["node:synth.config.steps"],
        ),
        control(
            "hid_default",
            ControlMode::Hidden,
            json!(0.5),
            vec!["node:synth.config.emotion.alpha"],
        ),
    ];
    let proj = projection(controls, vec![]);

    let err =
        compile_recipe_run(&proj, &snapshot(), &vals(&[("hid", json!(2.0))]), None).unwrap_err();
    assert!(
        matches!(err, nexus_recipe::BindingError::HiddenControlNotSettable { ref control_id } if control_id == "hid"),
        "expected HiddenControlNotSettable, got {err:?}"
    );

    let run = compile_recipe_run(&proj, &snapshot(), &vals(&[]), None).unwrap();
    let synth = run
        .resolved_workflow
        .nodes
        .iter()
        .find(|n| n.id == "synth")
        .unwrap();
    assert_eq!(
        synth.config.as_ref().unwrap()["emotion"]["alpha"],
        json!(0.5)
    );
}

#[test]
fn compile_errors_unknown_preset() {
    let controls = vec![control(
        "a",
        ControlMode::Basic,
        json!(1.0),
        vec!["input:seed"],
    )];
    let proj = projection(controls, vec![]);
    let err = compile_recipe_run(&proj, &snapshot(), &vals(&[]), Some("ghost")).unwrap_err();
    assert!(
        matches!(err, nexus_recipe::BindingError::UnknownPreset { ref preset_id } if preset_id == "ghost"),
        "expected UnknownPreset, got {err:?}"
    );
}

#[test]
fn compile_errors_unknown_control() {
    let controls = vec![control(
        "a",
        ControlMode::Basic,
        json!(1.0),
        vec!["input:seed"],
    )];
    let proj = projection(controls, vec![]);
    let err =
        compile_recipe_run(&proj, &snapshot(), &vals(&[("ghost", json!(2.0))]), None).unwrap_err();
    assert!(
        matches!(err, nexus_recipe::BindingError::UnknownControl { ref control_id } if control_id == "ghost"),
        "expected UnknownControl, got {err:?}"
    );
}

#[test]
fn compile_errors_missing_required() {
    let controls = vec![control(
        "req",
        ControlMode::Basic,
        serde_json::Value::Null,
        vec!["node:synth.config.steps"],
    )];
    let proj = projection(controls, vec![]);
    let err = compile_recipe_run(&proj, &snapshot(), &vals(&[]), None).unwrap_err();
    assert!(
        matches!(err, nexus_recipe::BindingError::MissingRequired { ref control_id } if control_id == "req"),
        "expected MissingRequired, got {err:?}"
    );
}

#[test]
fn compile_errors_unknown_target_node() {
    let controls = vec![control(
        "a",
        ControlMode::Basic,
        json!(1),
        vec!["node:ghost.config.x"],
    )];
    let proj = projection(controls, vec![]);
    let err = compile_recipe_run(&proj, &snapshot(), &vals(&[]), None).unwrap_err();
    assert!(
        matches!(err, nexus_recipe::BindingError::UnknownTarget { ref target } if target == "node:ghost.config.x"),
        "expected UnknownTarget, got {err:?}"
    );
}

#[test]
fn compile_resolves_nested_node_config_pointer() {
    let controls = vec![control(
        "alpha",
        ControlMode::Basic,
        json!(0.75),
        vec!["node:synth.config.emotion.alpha"],
    )];
    let proj = projection(controls, vec![]);
    let run = compile_recipe_run(&proj, &snapshot(), &vals(&[]), None).unwrap();
    let synth = run
        .resolved_workflow
        .nodes
        .iter()
        .find(|n| n.id == "synth")
        .unwrap();
    assert_eq!(
        synth.config.as_ref().unwrap()["emotion"]["alpha"],
        json!(0.75)
    );
}

#[test]
fn compile_writes_input_literal_into_resolved_inputs() {
    let controls = vec![Control {
        control_id: "script".to_string(),
        kind: ControlKind::String,
        label: "script".to_string(),
        help_text: None,
        mode: ControlMode::Basic,
        default_value: json!("hello"),
        widget_hint: None,
        bindings: vec!["input:script_text".to_string()],
    }];
    let proj = projection(controls, vec![]);
    let snap = snapshot();
    let run = compile_recipe_run(&proj, &snap, &vals(&[]), None).unwrap();

    assert_eq!(
        run.resolved_inputs.get("script_text"),
        Some(&json!("hello"))
    );
    assert_eq!(
        run.resolved_workflow.inputs.len(),
        snap.workflow.inputs.len()
    );
    assert!(
        run.resolved_workflow
            .inputs
            .iter()
            .any(|p| p.name == "script_text")
    );
}

#[test]
fn compile_input_value_type_mismatch() {
    let controls = vec![Control {
        control_id: "seed_ctl".to_string(),
        kind: ControlKind::String,
        label: "seed".to_string(),
        help_text: None,
        mode: ControlMode::Basic,
        default_value: json!("not-an-int"),
        widget_hint: None,
        bindings: vec!["input:seed".to_string()],
    }];
    let proj = projection(controls, vec![]);
    let err = compile_recipe_run(&proj, &snapshot(), &vals(&[]), None).unwrap_err();
    assert!(
        matches!(err, nexus_recipe::BindingError::TypeMismatch { ref target } if target == "input:seed"),
        "expected TypeMismatch, got {err:?}"
    );
}

#[test]
fn compile_schema_violation_rejected() {
    let controls = vec![control(
        "steps",
        ControlMode::Basic,
        json!("not-an-integer"),
        vec!["node:synth.config.steps"],
    )];
    let proj = projection(controls, vec![]);
    let err = compile_recipe_run(&proj, &snapshot(), &vals(&[]), None).unwrap_err();
    assert!(
        matches!(err, nexus_recipe::BindingError::SchemaViolation { ref node_id, .. } if node_id == "synth"),
        "expected SchemaViolation on synth, got {err:?}"
    );
}

#[test]
fn compile_valid_run_emits_resolved_run_with_audit() {
    let controls = vec![
        control(
            "steps",
            ControlMode::Basic,
            json!(32),
            vec!["node:synth.config.steps"],
        ),
        control(
            "alpha",
            ControlMode::Advanced,
            json!(0.25),
            vec!["node:synth.config.emotion.alpha"],
        ),
        control("seed_ctl", ControlMode::Basic, json!(7), vec!["input:seed"]),
    ];
    let presets = vec![preset("p", json!({ "alpha": 0.4 }))];
    let proj = projection(controls, presets);
    let snap = snapshot();
    let run = compile_recipe_run(&proj, &snap, &vals(&[("steps", json!(48))]), Some("p")).unwrap();

    assert_eq!(run.workflow_id, "wf-store");
    assert_eq!(run.workflow_version, "v1");

    let synth = run
        .resolved_workflow
        .nodes
        .iter()
        .find(|n| n.id == "synth")
        .unwrap();
    assert_eq!(synth.config.as_ref().unwrap()["steps"], json!(48));
    assert_eq!(
        synth.config.as_ref().unwrap()["emotion"]["alpha"],
        json!(0.4)
    );
    assert_eq!(run.resolved_inputs.get("seed"), Some(&json!(7)));

    let steps = run
        .applied_controls
        .iter()
        .find(|a| a.control_id == "steps")
        .unwrap();
    assert_eq!(steps.source, ValueSource::User);
    let alpha = run
        .applied_controls
        .iter()
        .find(|a| a.control_id == "alpha")
        .unwrap();
    assert_eq!(alpha.source, ValueSource::Preset);
    let seed = run
        .applied_controls
        .iter()
        .find(|a| a.control_id == "seed_ctl")
        .unwrap();
    assert_eq!(seed.source, ValueSource::Default);

    let orig_synth = snap
        .workflow
        .nodes
        .iter()
        .find(|n| n.id == "synth")
        .unwrap();
    assert_eq!(orig_synth.config.as_ref().unwrap()["steps"], json!(16));
}

#[test]
fn compile_preset_parity_with_manual() {
    let controls = vec![
        control(
            "steps",
            ControlMode::Basic,
            json!(16),
            vec!["node:synth.config.steps"],
        ),
        control("seed_ctl", ControlMode::Basic, json!(1), vec!["input:seed"]),
    ];
    let preset_values = json!({ "steps": 64, "seed_ctl": 99 });
    let presets = vec![preset("final", preset_values.clone())];
    let proj = projection(controls, presets);
    let snap = snapshot();

    let via_preset = compile_recipe_run(&proj, &snap, &vals(&[]), Some("final")).unwrap();
    let via_user = compile_recipe_run(
        &proj,
        &snap,
        &vals(&[("steps", json!(64)), ("seed_ctl", json!(99))]),
        None,
    )
    .unwrap();

    let preset_wf = serde_json::to_value(&via_preset.resolved_workflow).unwrap();
    let user_wf = serde_json::to_value(&via_user.resolved_workflow).unwrap();
    assert_eq!(preset_wf, user_wf);
    assert_eq!(via_preset.resolved_inputs, via_user.resolved_inputs);
}

#[test]
fn compile_rejects_duplicate_control_id() {
    let controls = vec![
        control(
            "dup",
            ControlMode::Basic,
            json!(1.0),
            vec!["node:synth.config.emotion.alpha"],
        ),
        control(
            "dup",
            ControlMode::Locked,
            json!(2.0),
            vec!["node:synth.config.emotion.beta"],
        ),
    ];
    let proj = projection(controls, vec![]);
    let err = compile_recipe_run(&proj, &snapshot(), &vals(&[]), None).unwrap_err();
    assert!(
        matches!(err, nexus_recipe::BindingError::DuplicateControl { ref control_id } if control_id == "dup"),
        "expected DuplicateControl, got {err:?}"
    );
}

#[test]
fn compile_skips_empty_binding_control_with_null_default() {
    let controls = vec![
        control(
            "display_only",
            ControlMode::Basic,
            serde_json::Value::Null,
            vec![],
        ),
        control(
            "steps",
            ControlMode::Basic,
            json!(24),
            vec!["node:synth.config.steps"],
        ),
    ];
    let proj = projection(controls, vec![]);
    let run = compile_recipe_run(&proj, &snapshot(), &vals(&[]), None).unwrap();

    assert!(
        run.applied_controls
            .iter()
            .all(|a| a.control_id != "display_only"),
        "empty-binding control must not appear in the audit"
    );
    assert!(run.applied_controls.iter().any(|a| a.control_id == "steps"));
}

#[test]
fn compile_default_only_control_applies() {
    let controls = vec![control(
        "steps",
        ControlMode::Basic,
        json!(24),
        vec!["node:synth.config.steps"],
    )];
    let proj = projection(controls, vec![]);
    let run = compile_recipe_run(&proj, &snapshot(), &vals(&[]), None).unwrap();

    let synth = run
        .resolved_workflow
        .nodes
        .iter()
        .find(|n| n.id == "synth")
        .unwrap();
    assert_eq!(synth.config.as_ref().unwrap()["steps"], json!(24));
    let applied = run
        .applied_controls
        .iter()
        .find(|a| a.control_id == "steps")
        .unwrap();
    assert_eq!(applied.source, ValueSource::Default);
}
