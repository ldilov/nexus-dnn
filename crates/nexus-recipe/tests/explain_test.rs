//! P5 read-projection tests for `explain_preset`, `diff_vs_defaults`, and the
//! `RecipeProjection` preset lookup helpers. Public API only.
//!
//! Concrete binding strings live here on purpose: `tests/` is NOT walked by
//! `boundary_test.rs`, so literal targets are safe.

use nexus_recipe::{
    AppliedControl, Control, ControlDiff, ControlKind, ControlMode, Output, Preset, PresetSource,
    RecipeProjection, ResolvedRun, ValueSource, diff_vs_defaults, explain_preset,
};
use nexus_workflow::Workflow;
use serde_json::json;

fn empty_workflow() -> Workflow {
    Workflow {
        id: "wf".to_string(),
        title: "wf".to_string(),
        version: "1.0.0".to_string(),
        inputs: vec![],
        outputs: vec![],
        nodes: vec![],
        stages: vec![],
        created_at: "t0".to_string(),
        updated_at: "t0".to_string(),
    }
}

fn applied(
    control_id: &str,
    targets: Vec<&str>,
    value: serde_json::Value,
    source: ValueSource,
) -> AppliedControl {
    AppliedControl {
        control_id: control_id.to_string(),
        targets: targets.into_iter().map(str::to_string).collect(),
        value,
        source,
    }
}

fn resolved(applied_controls: Vec<AppliedControl>) -> ResolvedRun {
    ResolvedRun {
        workflow_id: "wf".to_string(),
        workflow_version: "v1".to_string(),
        resolved_workflow: empty_workflow(),
        resolved_inputs: serde_json::Map::new(),
        applied_controls,
    }
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

fn preset(preset_id: &str, source: PresetSource, values: serde_json::Value) -> Preset {
    Preset {
        preset_id: preset_id.to_string(),
        label: preset_id.to_string(),
        description: None,
        source,
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

#[test]
fn explain_preset_lists_only_preset_sourced_controls_with_targets() {
    let run = resolved(vec![
        applied(
            "a",
            vec!["node:synth.config.alpha"],
            json!(2.0),
            ValueSource::Preset,
        ),
        applied("b", vec!["input:seed"], json!(3.0), ValueSource::User),
        applied(
            "c",
            vec!["node:synth.config.gamma"],
            json!(9.0),
            ValueSource::Default,
        ),
        applied(
            "d",
            vec!["node:post.config.x", "input:flag"],
            json!(true),
            ValueSource::Preset,
        ),
    ]);

    let explanation = explain_preset(&run);

    let ids: Vec<&str> = explanation
        .entries
        .iter()
        .map(|e| e.control_id.as_str())
        .collect();
    assert_eq!(ids, vec!["a", "d"], "only preset-sourced controls appear");

    let entry_a = explanation
        .entries
        .iter()
        .find(|e| e.control_id == "a")
        .unwrap();
    assert_eq!(entry_a.final_value, json!(2.0));
    assert_eq!(entry_a.source, ValueSource::Preset);
    assert_eq!(entry_a.targets, vec!["node:synth.config.alpha".to_string()]);

    let entry_d = explanation
        .entries
        .iter()
        .find(|e| e.control_id == "d")
        .unwrap();
    assert_eq!(
        entry_d.targets,
        vec!["node:post.config.x".to_string(), "input:flag".to_string()]
    );
}

#[test]
fn explain_preset_empty_when_no_preset_sourced_controls() {
    let run = resolved(vec![
        applied("a", vec!["input:seed"], json!(1), ValueSource::User),
        applied(
            "b",
            vec!["node:synth.config.x"],
            json!(2),
            ValueSource::Default,
        ),
    ]);
    assert!(explain_preset(&run).entries.is_empty());
}

#[test]
fn diff_vs_defaults_marks_overridden_and_source() {
    // user-overridden, preset-overridden, default-untouched (participating),
    // and a binding-free control that never appears in applied_controls.
    let controls = vec![
        control(
            "user_one",
            ControlMode::Basic,
            json!(1.0),
            vec!["node:synth.config.alpha"],
        ),
        control(
            "preset_one",
            ControlMode::Basic,
            json!(5.0),
            vec!["node:synth.config.beta"],
        ),
        control(
            "untouched",
            ControlMode::Basic,
            json!(9.0),
            vec!["node:synth.config.gamma"],
        ),
        control("display_only", ControlMode::Basic, json!("label"), vec![]),
    ];
    let proj = projection(controls, vec![]);

    let run = resolved(vec![
        applied(
            "user_one",
            vec!["node:synth.config.alpha"],
            json!(3.0),
            ValueSource::User,
        ),
        applied(
            "preset_one",
            vec!["node:synth.config.beta"],
            json!(6.0),
            ValueSource::Preset,
        ),
        applied(
            "untouched",
            vec!["node:synth.config.gamma"],
            json!(9.0),
            ValueSource::Default,
        ),
    ]);

    let diff = diff_vs_defaults(&run, &proj);
    assert_eq!(diff.len(), 4, "every projection control appears once");

    let find =
        |id: &str| -> ControlDiff { diff.iter().find(|d| d.control_id == id).unwrap().clone() };

    let user = find("user_one");
    assert_eq!(user.default_value, json!(1.0));
    assert_eq!(user.effective_value, json!(3.0));
    assert_eq!(user.source, ValueSource::User);
    assert!(user.overridden);

    let preset_d = find("preset_one");
    assert_eq!(preset_d.effective_value, json!(6.0));
    assert_eq!(preset_d.source, ValueSource::Preset);
    assert!(preset_d.overridden);

    let untouched = find("untouched");
    assert_eq!(untouched.effective_value, json!(9.0));
    assert_eq!(untouched.source, ValueSource::Default);
    assert!(!untouched.overridden);

    let display = find("display_only");
    assert_eq!(display.default_value, json!("label"));
    assert_eq!(display.effective_value, json!("label"));
    assert_eq!(display.source, ValueSource::Default);
    assert!(!display.overridden);
}

#[test]
fn presets_by_source_filters_extension_recipe_user() {
    let proj = projection(
        vec![],
        vec![
            preset("ext", PresetSource::Extension, json!({})),
            preset("rec", PresetSource::Recipe, json!({})),
            preset("usr", PresetSource::User, json!({})),
            preset("rec2", PresetSource::Recipe, json!({})),
        ],
    );

    let ext: Vec<&str> = proj
        .presets_by_source(PresetSource::Extension)
        .map(|p| p.preset_id.as_str())
        .collect();
    assert_eq!(ext, vec!["ext"]);

    let recipe: Vec<&str> = proj
        .presets_by_source(PresetSource::Recipe)
        .map(|p| p.preset_id.as_str())
        .collect();
    assert_eq!(recipe, vec!["rec", "rec2"]);

    let user: Vec<&str> = proj
        .presets_by_source(PresetSource::User)
        .map(|p| p.preset_id.as_str())
        .collect();
    assert_eq!(user, vec!["usr"]);

    assert_eq!(
        proj.preset("rec2").map(|p| p.preset_id.as_str()),
        Some("rec2")
    );
    assert!(proj.preset("missing").is_none());
}
