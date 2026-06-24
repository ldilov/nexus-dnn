use nexus_recipe::RecipeProjection;
use serde_json::json;

fn c6_fixture() -> serde_json::Value {
    json!({
        "schema_version": 1,
        "sections": [{"id":"input","title":"Input","order":0,"control_ids":["speech_speed"]}],
        "controls": [{
            "control_id":"speech_speed","kind":"float","label":"Speech Speed",
            "help_text":"how fast","mode":"basic","default_value":1.0,
            "widget_hint":"slider","bindings":["node:gen_1.config.speed_factor"]
        }],
        "presets": [{"preset_id":"final","label":"Final","source":"recipe","values":{"speech_speed":1.0}}],
        "output": {"primary_artifact":"audio","secondary":[],"preview_style":"player","show_intermediate":false}
    })
}

#[test]
fn projection_serde_round_trips() {
    let v = c6_fixture();
    let p: RecipeProjection = serde_json::from_value(v).unwrap();
    assert_eq!(p.schema_version, 1);
    assert_eq!(p.sections.len(), 1);
    assert_eq!(p.controls.len(), 1);
    assert_eq!(p.controls[0].control_id, "speech_speed");
    assert_eq!(
        p.controls[0].bindings,
        vec!["node:gen_1.config.speed_factor".to_string()]
    );
    assert_eq!(p.presets[0].preset_id, "final");

    let back = serde_json::to_value(&p).unwrap();
    assert!(
        back.get("custom_ui").is_none(),
        "custom_ui omitted when None"
    );
    let p2: RecipeProjection = serde_json::from_value(back).unwrap();
    assert_eq!(p, p2);
}

#[test]
fn projection_custom_ui_round_trips() {
    let mut with = c6_fixture();
    with["custom_ui"] = json!({"extension_id":"x","component_ref":"y"});
    let p: RecipeProjection = serde_json::from_value(with).unwrap();
    assert!(p.custom_ui.is_some());
    let back = serde_json::to_value(&p).unwrap();
    assert_eq!(back["custom_ui"]["component_ref"], json!("y"));

    let absent: RecipeProjection = serde_json::from_value(c6_fixture()).unwrap();
    assert!(absent.custom_ui.is_none());

    let mut nulled = c6_fixture();
    nulled["custom_ui"] = serde_json::Value::Null;
    let p_null: RecipeProjection = serde_json::from_value(nulled).unwrap();
    assert!(p_null.custom_ui.is_none());
}
