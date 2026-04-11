use chrono::Utc;

use crate::error::WorkflowError;
use crate::model::{NodeInput, NodeInstance, Workflow};

pub fn add_node(workflow: &Workflow, node: NodeInstance) -> Result<Workflow, WorkflowError> {
    if workflow.nodes.iter().any(|n| n.id == node.id) {
        return Err(WorkflowError::DuplicateNode { node_id: node.id });
    }

    let mut nodes = workflow.nodes.clone();
    nodes.push(node);

    Ok(Workflow {
        nodes,
        updated_at: Utc::now().to_rfc3339(),
        ..workflow.clone()
    })
}

pub fn remove_node(workflow: &Workflow, node_id: &str) -> Result<Workflow, WorkflowError> {
    if !workflow.nodes.iter().any(|n| n.id == node_id) {
        return Err(WorkflowError::DanglingEdge {
            node_id: node_id.to_string(),
        });
    }

    let has_dependents = workflow.nodes.iter().any(|n| {
        n.id != node_id
            && n.inputs.values().any(|input| match input {
                NodeInput::Reference { from } => from.starts_with(&format!("{node_id}:")),
                NodeInput::Literal { .. } => false,
            })
    });

    if has_dependents {
        return Err(WorkflowError::DanglingEdge {
            node_id: node_id.to_string(),
        });
    }

    let nodes = workflow
        .nodes
        .iter()
        .filter(|n| n.id != node_id)
        .cloned()
        .collect();

    Ok(Workflow {
        nodes,
        updated_at: Utc::now().to_rfc3339(),
        ..workflow.clone()
    })
}

pub fn connect_ports(
    workflow: &Workflow,
    source_node: &str,
    source_port: &str,
    target_node: &str,
    target_port: &str,
) -> Result<Workflow, WorkflowError> {
    let is_workflow_input = source_node == "input";

    if !is_workflow_input && !workflow.nodes.iter().any(|n| n.id == source_node) {
        return Err(WorkflowError::DanglingEdge {
            node_id: source_node.to_string(),
        });
    }

    let target_exists = workflow.nodes.iter().any(|n| n.id == target_node);
    if !target_exists {
        return Err(WorkflowError::DanglingEdge {
            node_id: target_node.to_string(),
        });
    }

    let from_value = format!("{source_node}:{source_port}");

    let nodes = workflow
        .nodes
        .iter()
        .map(|n| {
            if n.id != target_node {
                return n.clone();
            }
            let mut inputs = n.inputs.clone();
            inputs.insert(
                target_port.to_string(),
                NodeInput::Reference {
                    from: from_value.clone(),
                },
            );
            NodeInstance {
                inputs,
                ..n.clone()
            }
        })
        .collect();

    Ok(Workflow {
        nodes,
        updated_at: Utc::now().to_rfc3339(),
        ..workflow.clone()
    })
}

pub fn disconnect_ports(
    workflow: &Workflow,
    target_node: &str,
    target_port: &str,
) -> Result<Workflow, WorkflowError> {
    if !workflow.nodes.iter().any(|n| n.id == target_node) {
        return Err(WorkflowError::DanglingEdge {
            node_id: target_node.to_string(),
        });
    }

    let nodes = workflow
        .nodes
        .iter()
        .map(|n| {
            if n.id != target_node {
                return n.clone();
            }
            let mut inputs = n.inputs.clone();
            inputs.remove(target_port);
            NodeInstance {
                inputs,
                ..n.clone()
            }
        })
        .collect();

    Ok(Workflow {
        nodes,
        updated_at: Utc::now().to_rfc3339(),
        ..workflow.clone()
    })
}

pub fn update_node_config(
    workflow: &Workflow,
    node_id: &str,
    config: serde_json::Value,
) -> Result<Workflow, WorkflowError> {
    if !workflow.nodes.iter().any(|n| n.id == node_id) {
        return Err(WorkflowError::DanglingEdge {
            node_id: node_id.to_string(),
        });
    }

    let nodes = workflow
        .nodes
        .iter()
        .map(|n| {
            if n.id != node_id {
                return n.clone();
            }
            NodeInstance {
                config: Some(config.clone()),
                ..n.clone()
            }
        })
        .collect();

    Ok(Workflow {
        nodes,
        updated_at: Utc::now().to_rfc3339(),
        ..workflow.clone()
    })
}
