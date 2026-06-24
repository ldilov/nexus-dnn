//! P8 shareability bundle (CONTRACTS C8 OR-2 deterministic export). The bundle
//! serializes a recipe's projection + an immutable workflow-version snapshot +
//! requirements + a JCS-sha256 integrity digest, and validates a round-trip:
//! export → validate → recompile yields byte-identical resolved values. Concrete
//! node ids live here (tests/ is not boundary-walked), never in src.

use std::collections::HashMap;

use nexus_extension::OperatorDefinition;
use nexus_recipe::{
    BundleError, Control, ControlKind, ControlMode, Output, Preset, PresetSource, RecipeManifest,
    RecipeProjection, RecipeStatus, compile_recipe_run, export_recipe_bundle, validate_bundle,
};
use nexus_workflow::{NodeInstance, Workflow, WorkflowPort, WorkflowVersionSnapshot};
use serde_json::json;

fn op(id: &str, version: &str) -> OperatorDefinition {
    serde_json::from_value(json!({
        "spec_version": "1.0",
        "operator": { "id": id, "version": version },
        "config_schema": {},
    }))
    .unwrap()
}

fn node(id: &str, operator: &str) -> NodeInstance {
    NodeInstance {
        id: id.to_string(),
        operator: operator.to_string(),
        stage: None,
        inputs: HashMap::new(),
        config: None,
    }
}

fn snapshot(operators: &[OperatorDefinition]) -> WorkflowVersionSnapshot {
    let wf = Workflow {
        id: "wf".to_string(),
        title: "T".to_string(),
        version: "1.0.0".to_string(),
        inputs: vec![WorkflowPort {
            name: "script".to_string(),
            port_type: "string".to_string(),
        }],
        outputs: vec![],
        nodes: vec![node("gen", "synth@1.0.0")],
        stages: vec![],
        created_at: "t0".to_string(),
        updated_at: "t0".to_string(),
    };
    WorkflowVersionSnapshot::from_workflow("wf", "v1", "canon-hash", wf, operators)
}

fn projection(default_script: serde_json::Value) -> RecipeProjection {
    RecipeProjection {
        schema_version: 1,
        sections: vec![],
        controls: vec![Control {
            control_id: "script".to_string(),
            kind: ControlKind::String,
            label: "Script".to_string(),
            help_text: None,
            mode: ControlMode::Basic,
            default_value: default_script,
            widget_hint: None,
            bindings: vec!["input:script".to_string()],
        }],
        presets: vec![Preset {
            preset_id: "final".to_string(),
            label: "Final".to_string(),
            description: None,
            source: PresetSource::Recipe,
            values: serde_json::Map::new(),
        }],
        output: Output {
            primary_artifact: "audio".to_string(),
            secondary: vec![],
            preview_style: "player".to_string(),
            show_intermediate: false,
        },
        custom_ui: None,
    }
}

fn manifest() -> RecipeManifest {
    RecipeManifest {
        display_name: "Voice".to_string(),
        summary: "S".to_string(),
        category: "audio".to_string(),
        recipe_version: "1.0.0".to_string(),
    }
}

#[test]
fn bundle_export_then_import_round_trips() {
    let operators = vec![op("synth", "1.0.0")];
    let snap = snapshot(&operators);
    let proj = projection(json!("hello"));
    let bundle = export_recipe_bundle(manifest(), proj.clone(), &snap, RecipeStatus::Healthy, None)
        .expect("export");

    validate_bundle(&bundle, &operators).expect("valid bundle");

    // Reconstruct a snapshot from the bundle and compile the same defaults run;
    // resolved inputs must be byte-identical to the source compile.
    let reconstructed = WorkflowVersionSnapshot::from_workflow(
        &bundle.workflow_snapshot.workflow_id,
        &bundle.workflow_snapshot.version,
        &bundle.workflow_snapshot.canonical_hash,
        bundle.workflow_snapshot.workflow.clone(),
        &operators,
    );
    let from_source = compile_recipe_run(&proj, &snap, &Default::default(), None).unwrap();
    let from_bundle = compile_recipe_run(
        &bundle.projection,
        &reconstructed,
        &Default::default(),
        None,
    )
    .unwrap();
    assert_eq!(from_source.resolved_inputs, from_bundle.resolved_inputs);
}

#[test]
fn bundle_import_rejects_on_integrity_mismatch() {
    let operators = vec![op("synth", "1.0.0")];
    let mut bundle = export_recipe_bundle(
        manifest(),
        projection(json!("hello")),
        &snapshot(&operators),
        RecipeStatus::Healthy,
        None,
    )
    .expect("export");

    bundle.recipe.display_name = "Tampered".to_string();

    assert!(matches!(
        validate_bundle(&bundle, &operators),
        Err(BundleError::IntegrityMismatch)
    ));
}

#[test]
fn bundle_import_rejects_unresolvable_operator() {
    let operators = vec![op("synth", "1.0.0")];
    let bundle = export_recipe_bundle(
        manifest(),
        projection(json!("hello")),
        &snapshot(&operators),
        RecipeStatus::Healthy,
        None,
    )
    .expect("export");

    // Empty available registry -> the snapshot's `synth@1.0.0` is unresolvable.
    assert!(matches!(
        validate_bundle(&bundle, &[]).err(),
        Some(BundleError::UnresolvableOperator { .. })
    ));
}

#[test]
fn bundle_export_redacts_or_rejects_secrets() {
    let operators = vec![op("synth", "1.0.0")];
    let result = export_recipe_bundle(
        manifest(),
        projection(json!("my api_key is leaking")),
        &snapshot(&operators),
        RecipeStatus::Healthy,
        None,
    );

    assert!(matches!(result, Err(BundleError::SecretLeak)));
}
