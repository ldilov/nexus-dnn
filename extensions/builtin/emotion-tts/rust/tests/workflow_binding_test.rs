use emotion_tts_extension::workflow_binding::{
    bind_recipe_field, compute_customised, default_workflow, is_field_mappable, mappable_fields,
    read, refresh_customised, unmappable_fields, Node, RecipeField, WorkflowDocument,
};
use serde_json::json;

#[test]
fn output_format_flac_propagates_to_postprocess_and_export() {
    let mut doc = default_workflow();
    let hits = bind_recipe_field(&mut doc, RecipeField::OutputFormat, &json!("flac")).unwrap();
    assert_eq!(hits, 2);

    assert_eq!(
        read(&doc, "node:postprocess_1.config.output_format"),
        Some(json!("flac"))
    );
    assert_eq!(
        read(&doc, "node:export_bundle_1.config.output_format"),
        Some(json!("flac"))
    );
    assert!(!compute_customised(&doc));
}

#[test]
fn extra_loudness_node_marks_customised_but_output_format_still_binds() {
    let mut doc = default_workflow();
    doc.nodes.push(Node {
        id: "loudness_normalize_1".into(),
        operator_id: "some.vendor.loudness.normalize@1.0.0".into(),
        config: Default::default(),
    });
    doc.edges
        .retain(|e| !(e.from == "postprocess_1" && e.to == "export_bundle_1"));
    doc.edges
        .push(emotion_tts_extension::workflow_binding::Edge {
            from: "postprocess_1".into(),
            to: "loudness_normalize_1".into(),
        });
    doc.edges
        .push(emotion_tts_extension::workflow_binding::Edge {
            from: "loudness_normalize_1".into(),
            to: "export_bundle_1".into(),
        });

    refresh_customised(&mut doc);
    assert!(doc.customised, "extra node must flip customised to true");

    assert!(is_field_mappable(&doc, RecipeField::OutputFormat));
    let hits = bind_recipe_field(&mut doc, RecipeField::OutputFormat, &json!("wav")).unwrap();
    assert_eq!(hits, 2);
    assert_eq!(
        read(&doc, "node:postprocess_1.config.output_format"),
        Some(json!("wav"))
    );
}

#[test]
fn swapping_curated_operator_id_marks_customised() {
    let mut doc = default_workflow();
    doc.nodes
        .iter_mut()
        .find(|n| n.id == "synthesize_1")
        .unwrap()
        .operator_id = "vendor.other.batch.synthesize@0.1.0".into();
    refresh_customised(&mut doc);
    assert!(doc.customised);
}

#[test]
fn serialisation_round_trip_preserves_state() {
    let mut doc = default_workflow();
    bind_recipe_field(&mut doc, RecipeField::SpeedFactor, &json!(1.25)).unwrap();
    bind_recipe_field(&mut doc, RecipeField::OutputFormat, &json!("flac")).unwrap();

    let wire = serde_json::to_string(&doc).unwrap();
    let roundtrip: WorkflowDocument = serde_json::from_str(&wire).unwrap();
    assert_eq!(doc, roundtrip);
    assert_eq!(
        read(&roundtrip, "node:postprocess_1.config.speed_factor"),
        Some(json!(1.25))
    );
    assert!(!compute_customised(&roundtrip));
}

#[test]
fn removing_preview_mix_leaves_other_fields_mappable() {
    let mut doc = default_workflow();
    doc.nodes.retain(|n| n.id != "preview_mix_1");
    doc.edges
        .retain(|e| e.from != "preview_mix_1" && e.to != "preview_mix_1");
    refresh_customised(&mut doc);

    let unmappable = unmappable_fields(&doc);
    assert_eq!(unmappable, vec![RecipeField::IncludePreviewMix]);

    let mappable = mappable_fields(&doc);
    assert!(mappable.contains(&RecipeField::OutputFormat));
    assert!(mappable.contains(&RecipeField::ScriptText));
    assert!(!mappable.contains(&RecipeField::IncludePreviewMix));
}
