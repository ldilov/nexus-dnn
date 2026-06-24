//! P7 S2: the EmotionTTS recipe projection resolves through the host compiler.
//! Every run-path field lands in `resolved_inputs`; defaults + preset/user
//! layering behave as the contract specifies.

use std::collections::BTreeMap;

use emotion_tts_extension::recipe_resolve;
use serde_json::json;

#[test]
fn defaults_resolve_every_input_port() {
    let resolved = recipe_resolve::resolve(&BTreeMap::new(), None).expect("compile defaults");
    let ri = &resolved.resolved_inputs;

    assert_eq!(ri["script"], json!(""));
    assert_eq!(ri["parser_mode"], json!("dialogue"));
    assert_eq!(ri["output_format"], json!("mp3"));
    assert_eq!(ri["speed_factor"], json!(1.0));
    assert_eq!(ri["speed_mode"], json!("preserve_pitch"));
    assert_eq!(ri["seed_strategy"], json!("increment_per_line"));
    assert_eq!(ri["base_seed"], json!(42));
    assert_eq!(ri["cache_policy"], json!("force_regenerate"));
    assert_eq!(ri["global_emotion"], json!({}));
    assert_eq!(ri["generation"], json!({}));
}

#[test]
fn preset_layers_over_defaults() {
    let resolved = recipe_resolve::resolve(&BTreeMap::new(), Some("final")).expect("preset final");
    assert_eq!(resolved.resolved_inputs["output_format"], json!("flac"));
    assert_eq!(
        resolved.resolved_inputs["cache_policy"],
        json!("force_regenerate")
    );
}

#[test]
fn user_override_wins_over_preset() {
    let mut values = BTreeMap::new();
    values.insert("output_format".to_string(), json!("wav"));
    let resolved = recipe_resolve::resolve(&values, Some("final")).expect("user over preset");
    assert_eq!(resolved.resolved_inputs["output_format"], json!("wav"));
}

#[test]
fn projection_exposes_all_controls() {
    let proj = recipe_resolve::projection();
    assert_eq!(proj.controls.len(), 10);
    assert!(proj.presets.len() >= 2);
    assert_eq!(proj.output.primary_artifact, "audio");
}
