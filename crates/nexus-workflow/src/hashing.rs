use std::collections::BTreeMap;

use nexus_extension::OperatorDefinition;
use sha2::{Digest, Sha256};

use crate::model::Workflow;
use crate::validation::parse_operator_ref;

/// Content-only canonical hash of a workflow: sorted-key JSON over
/// nodes/inputs/outputs/stages; excludes id/title/version/timestamps.
pub fn canonical_hash(workflow: &Workflow) -> String {
    let content = serde_json::json!({
        "nodes": workflow.nodes,
        "inputs": workflow.inputs,
        "outputs": workflow.outputs,
        "stages": workflow.stages,
    });
    sha256_hex(&content)
}

/// Rollup hash of the operator config_schemas the workflow references.
/// Deterministic fold over the per-node map (sorted by node id).
pub fn operator_schema_hash(workflow: &Workflow, operators: &[OperatorDefinition]) -> String {
    let by_node = operator_schema_hashes_by_node(workflow, operators);
    let value = serde_json::to_value(&by_node).unwrap_or(serde_json::Value::Null);
    sha256_hex(&value)
}

/// Per-node map: node id -> hash of that node's operator config_schema.
/// Missing operators contribute a null-schema sentinel so the hash still computes.
pub fn operator_schema_hashes_by_node(
    workflow: &Workflow,
    operators: &[OperatorDefinition],
) -> BTreeMap<String, String> {
    let mut by_id: BTreeMap<(&str, &str), &OperatorDefinition> = BTreeMap::new();
    for op in operators {
        by_id.insert((op.operator.id.as_str(), op.operator.version.as_str()), op);
    }

    let mut out = BTreeMap::new();
    for node in &workflow.nodes {
        let (op_id, op_version) = parse_operator_ref(&node.operator);
        let schema = by_id
            .get(&(op_id.as_str(), op_version.as_str()))
            .and_then(|op| op.config_schema.clone());
        let value = serde_json::json!({ "config_schema": schema });
        out.insert(node.id.clone(), sha256_hex(&value));
    }
    out
}

fn sha256_hex(value: &serde_json::Value) -> String {
    let serialized = serde_json::to_string(value).expect("serde_json::Value always serializes");
    let mut hasher = Sha256::new();
    hasher.update(serialized.as_bytes());
    hex_lower(&hasher.finalize())
}

fn hex_lower(bytes: &[u8]) -> String {
    let mut s = String::with_capacity(bytes.len() * 2);
    for b in bytes {
        s.push_str(&format!("{b:02x}"));
    }
    s
}

#[cfg(test)]
mod tests {
    use std::collections::HashMap;

    use nexus_extension::OperatorDefinition;
    use serde_json::json;

    use super::*;
    use crate::model::{NodeInput, NodeInstance, OutputBinding, Workflow, WorkflowPort};

    fn op(id: &str, version: &str, config_schema: serde_json::Value) -> OperatorDefinition {
        serde_json::from_value(json!({
            "spec_version": "1.0",
            "operator": { "id": id, "version": version },
            "config_schema": config_schema,
        }))
        .unwrap()
    }

    fn node(id: &str, operator: &str, config: serde_json::Value) -> NodeInstance {
        let mut inputs = HashMap::new();
        inputs.insert(
            "prompt".to_string(),
            NodeInput::Reference {
                from: "input:prompt".to_string(),
            },
        );
        inputs.insert("seed".to_string(), NodeInput::Literal { value: json!(42) });
        NodeInstance {
            id: id.to_string(),
            operator: operator.to_string(),
            stage: None,
            inputs,
            config: Some(config),
        }
    }

    fn sample_workflow() -> Workflow {
        Workflow {
            id: "wf1".to_string(),
            title: "Sample".to_string(),
            version: "1.0.0".to_string(),
            inputs: vec![WorkflowPort {
                name: "prompt".to_string(),
                port_type: "string".to_string(),
            }],
            outputs: vec![OutputBinding {
                name: "audio".to_string(),
                from: "gen:audio".to_string(),
            }],
            nodes: vec![node("gen", "synth@1.0.0", json!({"steps": 16, "cfg": 7.0}))],
            stages: vec![],
            created_at: "t0".to_string(),
            updated_at: "t0".to_string(),
        }
    }

    #[test]
    fn canonical_hash_ignores_identity_and_timestamps() {
        let a = sample_workflow();
        let mut b = sample_workflow();
        b.id = "wf-other".to_string();
        b.title = "Renamed".to_string();
        b.version = "9.9.9".to_string();
        b.created_at = "t1".to_string();
        b.updated_at = "t2".to_string();

        assert_eq!(canonical_hash(&a), canonical_hash(&b));
    }

    #[test]
    fn canonical_hash_changes_when_node_config_changes() {
        let a = sample_workflow();
        let mut b = sample_workflow();
        b.nodes[0].config = Some(json!({"steps": 32, "cfg": 7.0}));

        assert_ne!(canonical_hash(&a), canonical_hash(&b));
    }

    #[test]
    fn canonical_hash_stable_under_serde_roundtrip() {
        let a = sample_workflow();
        let serialized = serde_json::to_string(&a).unwrap();
        let round_tripped: Workflow = serde_json::from_str(&serialized).unwrap();

        assert_eq!(canonical_hash(&a), canonical_hash(&round_tripped));
    }

    #[test]
    fn operator_schema_hash_changes_when_schema_changes() {
        let wf = sample_workflow();
        let schema_a = op(
            "synth",
            "1.0.0",
            json!({"type": "object", "properties": {"steps": {"type": "integer"}}}),
        );
        let schema_b = op(
            "synth",
            "1.0.0",
            json!({"type": "object", "properties": {"steps": {"type": "number"}}}),
        );

        assert_ne!(
            operator_schema_hash(&wf, &[schema_a]),
            operator_schema_hash(&wf, &[schema_b])
        );
    }

    #[test]
    fn operator_schema_hashes_by_node_one_entry_per_node_and_isolates_change() {
        let mut wf = sample_workflow();
        wf.nodes
            .push(node("post", "postproc@1.0.0", json!({"normalize": true})));

        let ops_before = vec![
            op(
                "synth",
                "1.0.0",
                json!({"properties": {"steps": {"type": "integer"}}}),
            ),
            op(
                "postproc",
                "1.0.0",
                json!({"properties": {"normalize": {"type": "boolean"}}}),
            ),
        ];
        let ops_after = vec![
            op(
                "synth",
                "1.0.0",
                json!({"properties": {"steps": {"type": "number"}}}),
            ),
            op(
                "postproc",
                "1.0.0",
                json!({"properties": {"normalize": {"type": "boolean"}}}),
            ),
        ];

        let before = operator_schema_hashes_by_node(&wf, &ops_before);
        let after = operator_schema_hashes_by_node(&wf, &ops_after);

        assert_eq!(before.len(), 2);
        assert!(before.contains_key("gen") && before.contains_key("post"));
        assert_ne!(before["gen"], after["gen"]);
        assert_eq!(before["post"], after["post"]);
    }
}
