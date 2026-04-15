use std::collections::HashMap;

use nexus_extension::{ExecutionSpec, OperatorDefinition, OperatorInfo, PortSpec};
use nexus_workflow::{
    NodeInput, NodeInstance, Workflow, WorkflowError, WorkflowPort, parse_workflow, validate_dag,
    validate_port_types, validate_workflow,
};

fn echo_operator() -> OperatorDefinition {
    OperatorDefinition {
        spec_version: "0.1".into(),
        operator: OperatorInfo {
            id: "echo".into(),
            version: "1.0.0".into(),
            display_name: Some("Echo".into()),
            description: None,
            category: None,
        },
        execution: Some(ExecutionSpec {
            mode: Some("job".into()),
            cacheable: Some(true),
            resumable: Some(false),
        }),
        inputs: Some(vec![PortSpec {
            name: "text".into(),
            port_type: "text/plain".into(),
            required: Some(true),
            default: None,
        }]),
        outputs: Some(vec![PortSpec {
            name: "text_out".into(),
            port_type: "text/plain".into(),
            required: None,
            default: None,
        }]),
        config_schema: None,
        resources: None,
        ui: None,
    }
}

fn valid_echo_workflow_yaml() -> &'static str {
    r#"
spec_version: "0.1"
workflow:
  id: "echo-basic"
  version: "0.1.0"
  title: "Echo Workflow"
  inputs:
    - name: "text"
      type: "text/plain"
  stages:
    - id: "process"
      label: "Processing"
  nodes:
    - id: "echo_1"
      operator: "echo@1.0.0"
      stage: "process"
      inputs:
        text:
          from: "input:text"
      config:
        prefix: ">>> "
  outputs:
    - name: "result"
      from: "echo_1:text_out"
"#
}

#[test]
fn parse_valid_echo_workflow() {
    let workflow = parse_workflow(valid_echo_workflow_yaml())
        .expect("valid workflow yaml must parse successfully");

    assert_eq!(workflow.id, "echo-basic");
    assert_eq!(workflow.title, "Echo Workflow");
    assert_eq!(workflow.version, "0.1.0");
    assert_eq!(workflow.nodes.len(), 1);
    assert_eq!(workflow.nodes[0].id, "echo_1");
    assert_eq!(workflow.nodes[0].operator, "echo@1.0.0");
    assert_eq!(workflow.inputs.len(), 1);
    assert_eq!(workflow.outputs.len(), 1);
}

#[test]
fn extract_edges_returns_correct_edges() {
    let workflow = parse_workflow(valid_echo_workflow_yaml()).unwrap();
    let edges = workflow.extract_edges();

    assert_eq!(edges.len(), 1);
    assert_eq!(edges[0].source_node, "input");
    assert_eq!(edges[0].source_port, "text");
    assert_eq!(edges[0].target_node, "echo_1");
    assert_eq!(edges[0].target_port, "text");
}

#[test]
fn validate_dag_succeeds_for_acyclic_workflow() {
    let workflow = parse_workflow(valid_echo_workflow_yaml()).unwrap();
    let sorted = validate_dag(&workflow).expect("acyclic workflow must pass dag validation");

    assert_eq!(sorted, vec!["echo_1"]);
}

#[test]
fn validate_workflow_succeeds_with_matching_types() {
    let workflow = parse_workflow(valid_echo_workflow_yaml()).unwrap();
    let operators = vec![echo_operator()];

    let sorted = validate_workflow(&workflow, &operators)
        .expect("workflow with matching port types must validate");

    assert_eq!(sorted, vec!["echo_1"]);
}

fn make_operator(
    id: &str,
    version: &str,
    inputs: Vec<PortSpec>,
    outputs: Vec<PortSpec>,
) -> OperatorDefinition {
    OperatorDefinition {
        spec_version: "0.1".into(),
        operator: OperatorInfo {
            id: id.into(),
            version: version.into(),
            display_name: None,
            description: None,
            category: None,
        },
        execution: None,
        inputs: Some(inputs),
        outputs: Some(outputs),
        config_schema: None,
        resources: None,
        ui: None,
    }
}

fn make_workflow(nodes: Vec<NodeInstance>, inputs: Vec<WorkflowPort>) -> Workflow {
    Workflow {
        id: "test-wf".into(),
        title: "Test".into(),
        version: "0.1.0".into(),
        inputs,
        outputs: vec![],
        nodes,
        stages: vec![],
        created_at: "2026-01-01T00:00:00Z".into(),
        updated_at: "2026-01-01T00:00:00Z".into(),
    }
}

fn make_node(id: &str, operator: &str, inputs: HashMap<String, NodeInput>) -> NodeInstance {
    NodeInstance {
        id: id.into(),
        operator: operator.into(),
        stage: None,
        inputs,
        config: None,
    }
}

#[test]
fn type_mismatch_detected_between_incompatible_ports() {
    let image_producer = make_operator(
        "img-producer",
        "1.0.0",
        vec![],
        vec![PortSpec {
            name: "rgb".into(),
            port_type: "image/rgb".into(),
            required: None,
            default: None,
        }],
    );

    let audio_consumer = make_operator(
        "audio-consumer",
        "1.0.0",
        vec![PortSpec {
            name: "waveform".into(),
            port_type: "audio/waveform".into(),
            required: Some(true),
            default: None,
        }],
        vec![],
    );

    let node_a = make_node("producer", "img-producer@1.0.0", HashMap::new());
    let node_b = make_node(
        "consumer",
        "audio-consumer@1.0.0",
        HashMap::from([(
            "waveform".into(),
            NodeInput::Reference {
                from: "producer:rgb".into(),
            },
        )]),
    );

    let workflow = make_workflow(vec![node_a, node_b], vec![]);

    let result = validate_port_types(&workflow, &[image_producer, audio_consumer]);

    assert!(result.is_err(), "type mismatch must produce an error");
    assert!(
        matches!(result, Err(WorkflowError::TypeMismatches(_))),
        "error must be TypeMismatches variant"
    );
}

#[test]
fn cycle_detected_in_circular_workflow() {
    let node_a = make_node(
        "a",
        "op@1.0.0",
        HashMap::from([(
            "in".into(),
            NodeInput::Reference {
                from: "b:out".into(),
            },
        )]),
    );
    let node_b = make_node(
        "b",
        "op@1.0.0",
        HashMap::from([(
            "in".into(),
            NodeInput::Reference {
                from: "a:out".into(),
            },
        )]),
    );

    let workflow = make_workflow(vec![node_a, node_b], vec![]);

    let result = validate_dag(&workflow);

    assert!(result.is_err(), "cyclic workflow must fail validation");
    assert!(
        matches!(result, Err(WorkflowError::CycleDetected)),
        "error must be CycleDetected"
    );
}

#[test]
fn unknown_operator_rejected() {
    let workflow = parse_workflow(valid_echo_workflow_yaml()).unwrap();
    let empty_operators: Vec<OperatorDefinition> = vec![];

    let result = validate_workflow(&workflow, &empty_operators);

    assert!(result.is_err(), "unknown operator must fail validation");
    match &result {
        Err(WorkflowError::UnknownOperator {
            node_id,
            operator_ref,
        }) => {
            assert_eq!(node_id, "echo_1");
            assert_eq!(operator_ref, "echo@1.0.0");
        }
        other => panic!("expected UnknownOperator, got: {other:?}"),
    }
}
