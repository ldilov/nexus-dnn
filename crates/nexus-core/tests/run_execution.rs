use nexus_extension::{ExecutionSpec, OperatorDefinition, OperatorInfo, PortSpec};
use nexus_scheduler::create_execution_plan;
use nexus_workflow::{NodeInput, NodeInstance, Workflow, WorkflowPort};

fn make_operator(id: &str, version: &str) -> OperatorDefinition {
    OperatorDefinition {
        spec_version: "0.1".into(),
        operator: OperatorInfo {
            id: id.into(),
            version: version.into(),
            display_name: None,
            description: None,
            category: None,
        },
        execution: Some(ExecutionSpec {
            mode: Some("job".into()),
            cacheable: Some(false),
            resumable: Some(false),
        }),
        inputs: Some(vec![PortSpec {
            name: "in".into(),
            port_type: "text/plain".into(),
            required: Some(true),
            default: None,
        }]),
        outputs: Some(vec![PortSpec {
            name: "out".into(),
            port_type: "text/plain".into(),
            required: None,
            default: None,
        }]),
        config_schema: None,
        resources: None,
        ui: None,
    }
}

fn make_workflow_with_nodes(nodes: Vec<NodeInstance>) -> Workflow {
    Workflow {
        id: "plan-test".into(),
        title: "Plan Test".into(),
        version: "0.1.0".into(),
        inputs: vec![WorkflowPort {
            name: "text".into(),
            port_type: "text/plain".into(),
        }],
        outputs: vec![],
        nodes,
        stages: vec![],
        created_at: "2026-01-01T00:00:00Z".into(),
        updated_at: "2026-01-01T00:00:00Z".into(),
    }
}

fn make_node(id: &str, operator: &str, input_refs: Vec<(&str, &str)>) -> NodeInstance {
    let inputs = input_refs
        .into_iter()
        .map(|(port, from)| (port.to_string(), NodeInput::Reference { from: from.into() }))
        .collect();

    NodeInstance {
        id: id.into(),
        operator: operator.into(),
        stage: None,
        inputs,
        config: None,
    }
}

#[test]
fn execution_plan_single_node() {
    let operator = make_operator("echo", "1.0.0");
    let node = make_node("echo_1", "echo@1.0.0", vec![("in", "input:text")]);
    let workflow = make_workflow_with_nodes(vec![node]);
    let sorted = vec!["echo_1".to_string()];

    let plan = create_execution_plan(&sorted, &workflow, &[operator])
        .expect("plan creation must succeed for single node");

    assert_eq!(plan.len(), 1);
    assert_eq!(plan[0].node_id, "echo_1");
    assert_eq!(plan[0].operator_id, "echo");
    assert_eq!(plan[0].operator_version, "1.0.0");
}

#[test]
fn execution_plan_preserves_topological_order() {
    let op_a = make_operator("op-a", "1.0.0");
    let op_b = make_operator("op-b", "1.0.0");
    let op_c = make_operator("op-c", "1.0.0");

    let node_a = make_node("step_a", "op-a@1.0.0", vec![("in", "input:text")]);
    let node_b = make_node("step_b", "op-b@1.0.0", vec![("in", "step_a:out")]);
    let node_c = make_node("step_c", "op-c@1.0.0", vec![("in", "step_b:out")]);

    let workflow = make_workflow_with_nodes(vec![node_a, node_b, node_c]);
    let sorted = vec![
        "step_a".to_string(),
        "step_b".to_string(),
        "step_c".to_string(),
    ];

    let plan = create_execution_plan(&sorted, &workflow, &[op_a, op_b, op_c])
        .expect("plan creation must succeed for chain");

    assert_eq!(plan.len(), 3);
    assert_eq!(plan[0].node_id, "step_a");
    assert_eq!(plan[1].node_id, "step_b");
    assert_eq!(plan[2].node_id, "step_c");
    assert_eq!(plan[0].operator_id, "op-a");
    assert_eq!(plan[1].operator_id, "op-b");
    assert_eq!(plan[2].operator_id, "op-c");
}

#[test]
fn execution_plan_fails_for_missing_operator() {
    let node = make_node("orphan", "nonexistent@1.0.0", vec![("in", "input:text")]);
    let workflow = make_workflow_with_nodes(vec![node]);
    let sorted = vec!["orphan".to_string()];

    let result = create_execution_plan(&sorted, &workflow, &[]);

    assert!(result.is_err(), "plan must fail when operator is missing");
}

#[test]
fn execution_plan_fails_for_missing_node() {
    let operator = make_operator("echo", "1.0.0");
    let workflow = make_workflow_with_nodes(vec![]);
    let sorted = vec!["ghost_node".to_string()];

    let result = create_execution_plan(&sorted, &workflow, &[operator]);

    assert!(
        result.is_err(),
        "plan must fail when sorted list references nonexistent node"
    );
}
