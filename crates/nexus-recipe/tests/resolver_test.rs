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
