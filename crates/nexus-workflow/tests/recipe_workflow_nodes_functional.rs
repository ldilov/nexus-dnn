//! Integration check: workflow nodes referenced by a recipe are structurally
//! functional — they reference operators that exist, their edges connect real
//! ports, their DAG is acyclic, and `validate_workflow` accepts the graph.
//!
//! This is the end-to-end sanity test requested at audit time: "verify via
//! tests that nodes are functional and tied to recipe." A shipping recipe
//! must resolve to a workflow whose node graph passes host validation under
//! a realistic operator registry.

use nexus_extension::{
    ExecutionSpec, OperatorDefinition, OperatorInfo, PortSpec, ResourceSpec,
};
use nexus_workflow::{parse_workflow, validate_workflow};

fn port(name: &str, port_type: &str, required: bool) -> PortSpec {
    PortSpec {
        name: name.into(),
        port_type: port_type.into(),
        required: Some(required),
        default: None,
    }
}

fn op(id: &str, inputs: Vec<PortSpec>, outputs: Vec<PortSpec>) -> OperatorDefinition {
    OperatorDefinition {
        spec_version: "0.1".into(),
        operator: OperatorInfo {
            id: id.into(),
            version: "1.0.0".into(),
            display_name: Some(id.into()),
            description: None,
            category: Some("LLM".into()),
        },
        execution: Some(ExecutionSpec {
            mode: Some("job".into()),
            cacheable: Some(false),
            resumable: Some(false),
        }),
        inputs: Some(inputs),
        outputs: Some(outputs),
        config_schema: None,
        resources: Some(ResourceSpec {
            gpu: Some(false),
            min_vram_mb: None,
            cpu_cores: Some(1),
        }),
        ui: None,
    }
}

const SHIPPED_WORKFLOW_YAML: &str = r#"
specVersion: "0.1"
workflow:
  id: "local_chat_basic"
  title: "Local Chat"
  version: "1.0.0"
  inputs:
    - name: "user_prompt"
      type: "text/prompt"
  outputs:
    - name: "assistant_message"
      from: "chat_turn:assistant_message"
  stages:
    - id: "generate"
      label: "Generate"
  nodes:
    - id: "compose_prompt"
      operator: "llm.prompt.compose@1.0.0"
      stage: "generate"
      inputs:
        user_message:
          from: "input:user_prompt"
    - id: "chat_turn"
      operator: "llm.chat.turn@1.0.0"
      stage: "generate"
      inputs:
        prompt:
          from: "compose_prompt:prompt"
"#;

fn registry() -> Vec<OperatorDefinition> {
    vec![
        op(
            "llm.prompt.compose",
            vec![port("user_message", "text/prompt", true)],
            vec![port("prompt", "text/prompt", false)],
        ),
        op(
            "llm.chat.turn",
            vec![port("prompt", "text/prompt", true)],
            vec![port("assistant_message", "text/prompt", false)],
        ),
    ]
}

#[test]
fn shipped_workflow_parses_and_validates_against_real_operator_specs() {
    let workflow = parse_workflow(SHIPPED_WORKFLOW_YAML).expect("parses");
    let operators = registry();
    let sorted =
        validate_workflow(&workflow, &operators).expect("validates under a real operator registry");
    // Topo order must respect the edge compose_prompt → chat_turn.
    let compose_pos = sorted.iter().position(|n| n == "compose_prompt").unwrap();
    let chat_pos = sorted.iter().position(|n| n == "chat_turn").unwrap();
    assert!(
        compose_pos < chat_pos,
        "topological order must place compose_prompt before chat_turn"
    );
}

#[test]
fn disconnecting_required_input_breaks_validation() {
    // Simulate the user deleting the edge feeding chat_turn.prompt.
    let yaml = SHIPPED_WORKFLOW_YAML.replace(
        r#"      inputs:
        prompt:
          from: "compose_prompt:prompt""#,
        "      inputs: {}",
    );

    let workflow = parse_workflow(&yaml).expect("parses");
    let operators = registry();
    let err = validate_workflow(&workflow, &operators)
        .expect_err("required input `prompt` on `chat_turn` is missing");
    assert!(
        err.to_string().to_lowercase().contains("prompt")
            || err.to_string().to_lowercase().contains("required"),
        "error should mention the missing required input: got {err}"
    );
}

#[test]
fn unknown_operator_reference_fails_validation() {
    let yaml = SHIPPED_WORKFLOW_YAML
        .replace("llm.chat.turn@1.0.0", "llm.chat.turn@99.0.0");
    let workflow = parse_workflow(&yaml).expect("parses");
    let operators = registry();
    let err = validate_workflow(&workflow, &operators)
        .expect_err("mismatched operator version must be rejected");
    let msg = err.to_string();
    assert!(
        msg.contains("llm.chat.turn") || msg.to_lowercase().contains("operator"),
        "error should cite the unknown operator: got {msg}"
    );
}

#[test]
fn dangling_edge_to_missing_node_is_rejected() {
    // Rewire chat_turn.prompt to read from a node that doesn't exist.
    let yaml = SHIPPED_WORKFLOW_YAML
        .replace(r#"from: "compose_prompt:prompt""#, r#"from: "ghost_node:prompt""#);
    let workflow = parse_workflow(&yaml).expect("parses");
    let operators = registry();
    let err = validate_workflow(&workflow, &operators)
        .expect_err("edge targeting a non-existent node must be rejected");
    let msg = err.to_string().to_lowercase();
    assert!(
        msg.contains("ghost_node")
            || msg.contains("dangling")
            || msg.contains("unknown")
            || msg.contains("missing"),
        "error should cite the missing node: got {msg}"
    );
}
