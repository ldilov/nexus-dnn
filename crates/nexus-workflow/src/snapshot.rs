use std::collections::BTreeMap;

use nexus_extension::OperatorDefinition;

use crate::hashing::operator_schema_hashes_by_node;
use crate::model::Workflow;

/// Frozen, validated assembly of one immutable workflow version. The binding
/// compiler and pin-diff operate on this, never on the mutable head row.
#[derive(Clone, Debug)]
pub struct WorkflowVersionSnapshot {
    pub workflow_id: String,
    pub version: String,
    pub workflow: Workflow,
    pub operators: Vec<OperatorDefinition>,
    pub canonical_hash: String,
    pub operator_schema_hashes: BTreeMap<String, String>,
}

impl WorkflowVersionSnapshot {
    /// Pure assembly from an already-parsed workflow + caller-supplied operator
    /// slice (keeps this crate registry-free). `version` is the monotonic id.
    pub fn from_workflow(
        workflow_id: impl Into<String>,
        version: impl Into<String>,
        canonical_hash: impl Into<String>,
        workflow: Workflow,
        operators: &[OperatorDefinition],
    ) -> Self {
        let operator_schema_hashes = operator_schema_hashes_by_node(&workflow, operators);
        Self {
            workflow_id: workflow_id.into(),
            version: version.into(),
            workflow,
            operators: operators.to_vec(),
            canonical_hash: canonical_hash.into(),
            operator_schema_hashes,
        }
    }
}

#[cfg(test)]
mod tests {
    use std::collections::HashMap;

    use nexus_extension::OperatorDefinition;
    use serde_json::json;

    use super::*;
    use crate::model::{NodeInput, NodeInstance, Workflow};

    fn op(id: &str, version: &str, config_schema: serde_json::Value) -> OperatorDefinition {
        serde_json::from_value(json!({
            "spec_version": "1.0",
            "operator": { "id": id, "version": version },
            "config_schema": config_schema,
        }))
        .unwrap()
    }

    fn node(id: &str, operator: &str) -> NodeInstance {
        let mut inputs = HashMap::new();
        inputs.insert(
            "prompt".to_string(),
            NodeInput::Literal { value: json!("hi") },
        );
        NodeInstance {
            id: id.to_string(),
            operator: operator.to_string(),
            stage: None,
            inputs,
            config: Some(json!({"steps": 16})),
        }
    }

    fn two_node_workflow() -> Workflow {
        Workflow {
            id: "wf-decl-id".to_string(),
            title: "T".to_string(),
            version: "1.0.0".to_string(),
            inputs: vec![],
            outputs: vec![],
            nodes: vec![node("gen", "synth@1.0.0"), node("post", "postproc@1.0.0")],
            stages: vec![],
            created_at: "t0".to_string(),
            updated_at: "t0".to_string(),
        }
    }

    #[test]
    fn from_workflow_sets_identity_hash_and_embeds_workflow() {
        let workflow = two_node_workflow();
        let snapshot = WorkflowVersionSnapshot::from_workflow(
            "wf-store-id",
            "v3",
            "deadbeef",
            workflow.clone(),
            &[],
        );

        assert_eq!(snapshot.workflow_id, "wf-store-id");
        assert_eq!(snapshot.version, "v3");
        assert_eq!(snapshot.canonical_hash, "deadbeef");
        assert_eq!(snapshot.workflow.nodes.len(), 2);
        assert_eq!(snapshot.workflow.version, "1.0.0");
    }

    #[test]
    fn from_workflow_populates_per_node_schema_hashes() {
        let workflow = two_node_workflow();
        let operators = vec![
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

        let snapshot = WorkflowVersionSnapshot::from_workflow(
            "wf-store-id",
            "v1",
            "h",
            workflow.clone(),
            &operators,
        );

        let expected = operator_schema_hashes_by_node(&workflow, &operators);
        assert_eq!(snapshot.operator_schema_hashes, expected);
        assert_eq!(snapshot.operator_schema_hashes.len(), 2);
        assert!(snapshot.operator_schema_hashes.contains_key("gen"));
        assert!(snapshot.operator_schema_hashes.contains_key("post"));
    }
}
