use std::collections::BTreeMap;

use serde_json::{Map, Value};

use nexus_workflow::Workflow;

use crate::error::BindingError;

/// Host-canonical binding target. `input:<name>` writes a workflow input value;
/// `node:<node_id>.config.<a.b.c>` writes a (possibly nested) node config path.
#[derive(Debug, Clone, PartialEq)]
pub enum ParsedTarget {
    Input(String),
    NodeConfig {
        node_id: String,
        pointer: Vec<String>,
    },
}

pub fn parse_target(raw: &str) -> Result<ParsedTarget, BindingError> {
    if let Some(name) = raw.strip_prefix("input:") {
        if name.is_empty() {
            return Err(BindingError::BadTarget(raw.into()));
        }
        return Ok(ParsedTarget::Input(name.to_string()));
    }
    if let Some(rest) = raw.strip_prefix("node:") {
        let (node_id, tail) = rest
            .split_once('.')
            .ok_or_else(|| BindingError::BadTarget(raw.into()))?;
        let pointer_str = tail
            .strip_prefix("config.")
            .ok_or_else(|| BindingError::BadTarget(raw.into()))?;
        if node_id.is_empty() || pointer_str.is_empty() {
            return Err(BindingError::BadTarget(raw.into()));
        }
        let pointer: Vec<String> = pointer_str.split('.').map(str::to_string).collect();
        if pointer.iter().any(|s| s.is_empty()) {
            return Err(BindingError::BadTarget(raw.into()));
        }
        return Ok(ParsedTarget::NodeConfig {
            node_id: node_id.to_string(),
            pointer,
        });
    }
    Err(BindingError::BadTarget(raw.into()))
}

/// Write `value` at `target`, mutating either the working `workflow` (node
/// config, nested) or the `inputs` value map (workflow input ports).
pub fn write_target(
    workflow: &mut Workflow,
    inputs: &mut BTreeMap<String, Value>,
    target: &ParsedTarget,
    value: Value,
) -> Result<(), BindingError> {
    match target {
        ParsedTarget::Input(name) => {
            inputs.insert(name.clone(), value);
            Ok(())
        }
        ParsedTarget::NodeConfig { node_id, pointer } => {
            let node = workflow
                .nodes
                .iter_mut()
                .find(|n| &n.id == node_id)
                .ok_or_else(|| BindingError::UnknownNode(node_id.clone()))?;
            let root = node.config.get_or_insert_with(|| Value::Object(Map::new()));
            set_pointer(root, pointer, value)
        }
    }
}

fn set_pointer(root: &mut Value, pointer: &[String], value: Value) -> Result<(), BindingError> {
    if !root.is_object() {
        *root = Value::Object(Map::new());
    }
    let mut cur = root;
    for key in &pointer[..pointer.len() - 1] {
        let obj = cur.as_object_mut().expect("ensured object above");
        let entry = obj
            .entry(key.clone())
            .or_insert_with(|| Value::Object(Map::new()));
        if !entry.is_object() {
            *entry = Value::Object(Map::new());
        }
        cur = entry;
    }
    let last = &pointer[pointer.len() - 1];
    cur.as_object_mut()
        .expect("object")
        .insert(last.clone(), value);
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    use nexus_workflow::{NodeInstance, Workflow};
    use std::collections::HashMap;

    fn wf_with_node(id: &str) -> Workflow {
        Workflow {
            id: "wf".into(),
            title: "T".into(),
            version: "0.1.0".into(),
            inputs: vec![],
            outputs: vec![],
            nodes: vec![NodeInstance {
                id: id.into(),
                operator: "op@1.0.0".into(),
                stage: None,
                inputs: HashMap::new(),
                config: None,
            }],
            stages: vec![],
            created_at: "t".into(),
            updated_at: "t".into(),
        }
    }

    #[test]
    fn parses_input_and_node_targets() {
        assert_eq!(
            parse_target("input:script").unwrap(),
            ParsedTarget::Input("script".into())
        );
        assert_eq!(
            parse_target("node:n1.config.a.b").unwrap(),
            ParsedTarget::NodeConfig {
                node_id: "n1".into(),
                pointer: vec!["a".into(), "b".into()]
            }
        );
    }

    #[test]
    fn rejects_malformed_targets() {
        for bad in [
            "",
            "foo",
            "input:",
            "node:",
            "node:n.bad.key",
            "node:n.config.",
        ] {
            assert!(parse_target(bad).is_err(), "{bad} should be rejected");
        }
    }

    #[test]
    fn writes_input_value() {
        let mut wf = wf_with_node("n1");
        let mut inputs = BTreeMap::new();
        write_target(
            &mut wf,
            &mut inputs,
            &parse_target("input:x").unwrap(),
            serde_json::json!(7),
        )
        .unwrap();
        assert_eq!(inputs.get("x"), Some(&serde_json::json!(7)));
    }

    #[test]
    fn writes_nested_node_config() {
        let mut wf = wf_with_node("n1");
        let mut inputs = BTreeMap::new();
        write_target(
            &mut wf,
            &mut inputs,
            &parse_target("node:n1.config.a.b").unwrap(),
            serde_json::json!("v"),
        )
        .unwrap();
        let cfg = wf.nodes[0].config.as_ref().unwrap();
        assert_eq!(cfg["a"]["b"], serde_json::json!("v"));
    }

    #[test]
    fn unknown_node_errors() {
        let mut wf = wf_with_node("n1");
        let mut inputs = BTreeMap::new();
        let err = write_target(
            &mut wf,
            &mut inputs,
            &parse_target("node:ghost.config.x").unwrap(),
            serde_json::json!(1),
        )
        .unwrap_err();
        assert_eq!(err, BindingError::UnknownNode("ghost".into()));
    }
}
