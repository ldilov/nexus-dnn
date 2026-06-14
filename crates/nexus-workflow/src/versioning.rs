use serde_json::Value;
use sha2::{Digest, Sha256};

use crate::Workflow;

/// Build the canonical content value for a workflow: only the execution-shaping
/// fields, never timestamps/ids/titles. Hashing this detects real graph changes.
pub fn canonical_graph_value(workflow: &Workflow) -> Value {
    serde_json::json!({
        "inputs": workflow.inputs,
        "outputs": workflow.outputs,
        "nodes": workflow.nodes,
        "stages": workflow.stages,
    })
}

/// Hash an already-built canonical value with JCS (RFC 8785) + SHA-256, hex
/// encoded. Key order is normalized by JCS so `HashMap`-backed node inputs hash
/// deterministically.
pub fn hash_canonical_value(value: &Value) -> Result<String, serde_json::Error> {
    let canonical = json_canon::to_string(value)?;
    let mut hasher = Sha256::new();
    hasher.update(canonical.as_bytes());
    let digest = hasher.finalize();
    let mut out = String::with_capacity(64);
    for b in digest {
        out.push_str(&format!("{b:02x}"));
    }
    Ok(out)
}

/// Canonical content hash of a whole workflow graph.
pub fn compute_canonical_hash(workflow: &Workflow) -> Result<String, serde_json::Error> {
    hash_canonical_value(&canonical_graph_value(workflow))
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::{NodeInput, NodeInstance, Stage, Workflow};
    use std::collections::HashMap;

    fn wf_with_node_inputs(order: &[(&str, &str)]) -> Workflow {
        let mut inputs = HashMap::new();
        for (port, from) in order {
            inputs.insert(
                (*port).to_string(),
                NodeInput::Reference {
                    from: (*from).to_string(),
                },
            );
        }
        Workflow {
            id: "wf".into(),
            title: "T".into(),
            version: "0.1.0".into(),
            inputs: vec![],
            outputs: vec![],
            nodes: vec![NodeInstance {
                id: "n1".into(),
                operator: "op@1.0.0".into(),
                stage: None,
                inputs,
                config: None,
            }],
            stages: vec![Stage {
                id: "s".into(),
                label: "S".into(),
            }],
            created_at: "x".into(),
            updated_at: "y".into(),
        }
    }

    #[test]
    fn hash_is_independent_of_hashmap_insertion_order() {
        let a = wf_with_node_inputs(&[("p1", "n0:o"), ("p2", "n0:o2")]);
        let b = wf_with_node_inputs(&[("p2", "n0:o2"), ("p1", "n0:o")]);
        assert_eq!(
            compute_canonical_hash(&a).unwrap(),
            compute_canonical_hash(&b).unwrap()
        );
    }

    #[test]
    fn hash_changes_when_graph_changes() {
        let a = wf_with_node_inputs(&[("p1", "n0:o")]);
        let b = wf_with_node_inputs(&[("p1", "n0:DIFFERENT")]);
        assert_ne!(
            compute_canonical_hash(&a).unwrap(),
            compute_canonical_hash(&b).unwrap()
        );
    }
}
