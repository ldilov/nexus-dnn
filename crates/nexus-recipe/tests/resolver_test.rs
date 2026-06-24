use nexus_recipe::{BindingError, BindingTarget, parse_target, write_node_config};

fn make_node(config: Option<serde_json::Value>) -> nexus_workflow::NodeInstance {
    nexus_workflow::NodeInstance {
        id: "n".into(),
        operator: "op@1".into(),
        stage: None,
        inputs: std::collections::HashMap::new(),
        config,
    }
}

#[test]
fn parse_target_input_port() {
    let result = parse_target("input:script_text").unwrap();
    assert_eq!(result, BindingTarget::Input("script_text".into()));
}

#[test]
fn parse_target_node_config_flat() {
    let result = parse_target("node:synth.config.speed").unwrap();
    assert_eq!(
        result,
        BindingTarget::NodeConfig {
            node_id: "synth".into(),
            pointer: vec!["speed".into()],
        }
    );
}

#[test]
fn parse_target_node_config_nested() {
    let result = parse_target("node:synth.config.emotion.alpha").unwrap();
    assert_eq!(
        result,
        BindingTarget::NodeConfig {
            node_id: "synth".into(),
            pointer: vec!["emotion".into(), "alpha".into()],
        }
    );
}

#[test]
fn parse_target_rejects_missing_config_infix() {
    let result = parse_target("node:synth.speed");
    assert!(
        matches!(result, Err(BindingError::PathResolveFailed { .. })),
        "expected PathResolveFailed, got {:?}",
        result
    );
}

#[test]
fn parse_target_rejects_empty_segment() {
    // empty input name
    let r1 = parse_target("input:");
    assert!(
        matches!(r1, Err(BindingError::PathResolveFailed { .. })),
        "expected PathResolveFailed for empty input name, got {:?}",
        r1
    );

    // empty node_id (dot immediately after "node:")
    let r2 = parse_target("node:.config.x");
    assert!(
        matches!(r2, Err(BindingError::PathResolveFailed { .. })),
        "expected PathResolveFailed for empty node_id, got {:?}",
        r2
    );
}

#[test]
fn to_target_string_round_trips_input() {
    let raw = "input:script_text";
    let parsed = parse_target(raw).unwrap();
    assert_eq!(parsed.to_target_string(), raw);
}

#[test]
fn to_target_string_round_trips_flat_node_config() {
    let raw = "node:synth.config.speed";
    let parsed = parse_target(raw).unwrap();
    assert_eq!(parsed.to_target_string(), raw);
}

#[test]
fn to_target_string_round_trips_nested_node_config() {
    let raw = "node:synth.config.emotion.alpha";
    let parsed = parse_target(raw).unwrap();
    assert_eq!(parsed.to_target_string(), raw);
}

#[test]
fn constructed_node_config_target_is_parseable() {
    let target = BindingTarget::NodeConfig {
        node_id: "encoder_1".into(),
        pointer: vec!["dtype".into()],
    };
    assert_eq!(parse_target(&target.to_target_string()).unwrap(), target);
}

#[test]
fn write_node_config_creates_map_when_none() {
    let mut node = make_node(None);
    write_node_config(&mut node, &["speed".into()], serde_json::json!(1.0)).unwrap();
    assert_eq!(node.config, Some(serde_json::json!({"speed": 1.0})));
}

#[test]
fn write_node_config_descends_nested_pointer() {
    let mut node = make_node(None);
    write_node_config(
        &mut node,
        &["emotion".into(), "alpha".into()],
        serde_json::json!(0.5),
    )
    .unwrap();
    assert_eq!(
        node.config,
        Some(serde_json::json!({"emotion": {"alpha": 0.5}}))
    );
}

#[test]
fn write_node_config_errors_on_non_object_collision() {
    let mut node = make_node(Some(serde_json::json!({"emotion": 1})));
    let result = write_node_config(
        &mut node,
        &["emotion".into(), "alpha".into()],
        serde_json::json!(0.5),
    );
    assert!(
        matches!(result, Err(BindingError::PathResolveFailed { .. })),
        "expected PathResolveFailed on non-object collision, got {:?}",
        result
    );
}
