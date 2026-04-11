use nexus_extension::OperatorDefinition;
use nexus_protocol::RuntimeFamily;
use nexus_workflow::Workflow;

use crate::error::SchedulerError;

pub struct PlanStep {
    pub node_id: String,
    pub operator_id: String,
    pub operator_version: String,
    pub runtime_family: RuntimeFamily,
}

pub fn create_execution_plan(
    sorted_node_ids: &[String],
    workflow: &Workflow,
    operators: &[OperatorDefinition],
) -> Result<Vec<PlanStep>, SchedulerError> {
    sorted_node_ids
        .iter()
        .map(|node_id| build_step_for_node(node_id, workflow, operators))
        .collect()
}

fn build_step_for_node(
    node_id: &str,
    workflow: &Workflow,
    operators: &[OperatorDefinition],
) -> Result<PlanStep, SchedulerError> {
    let node = workflow
        .nodes
        .iter()
        .find(|n| n.id == node_id)
        .ok_or_else(|| {
            SchedulerError::PlanningFailed(format!("node {node_id} not found in workflow"))
        })?;

    let (op_id, op_version) = parse_operator_ref(&node.operator);

    let op_def = operators
        .iter()
        .find(|op| op.operator.id == op_id)
        .ok_or_else(|| SchedulerError::PlanningFailed(format!("operator {op_id} not found")))?;

    Ok(PlanStep {
        node_id: node_id.to_owned(),
        operator_id: op_id,
        operator_version: op_version,
        runtime_family: op_def
            .execution
            .as_ref()
            .map(|_| RuntimeFamily::Python)
            .unwrap_or(RuntimeFamily::Python),
    })
}

fn parse_operator_ref(operator_ref: &str) -> (String, String) {
    match operator_ref.rsplit_once('@') {
        Some((id, version)) => (id.to_owned(), version.to_owned()),
        None => (operator_ref.to_owned(), String::new()),
    }
}
