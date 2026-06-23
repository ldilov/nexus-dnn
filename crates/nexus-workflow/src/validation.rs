use std::collections::{HashMap, HashSet, VecDeque};

use nexus_extension::OperatorDefinition;

use crate::error::WorkflowError;
use crate::model::{Edge, Workflow};

pub fn validate_dag(workflow: &Workflow) -> Result<Vec<String>, WorkflowError> {
    check_unique_node_ids(workflow)?;
    let edges = workflow.extract_edges();
    check_dangling_edges(workflow, &edges)?;
    topological_sort(workflow, &edges)
}

pub fn validate_port_types(
    workflow: &Workflow,
    operators: &[OperatorDefinition],
) -> Result<(), WorkflowError> {
    let operator_map = build_operator_map(operators);
    let edges = workflow.extract_edges();
    let mut mismatches = Vec::new();

    for edge in &edges {
        let source_type = resolve_source_port_type(workflow, &operator_map, edge);
        let target_type = resolve_target_port_type(&operator_map, workflow, edge);

        match (source_type, target_type) {
            (Some(src), Some(tgt)) if src != tgt => {
                mismatches.push(format!(
                    "{}:{} -> {}:{}: {} != {}",
                    edge.source_node,
                    edge.source_port,
                    edge.target_node,
                    edge.target_port,
                    src,
                    tgt
                ));
            }
            _ => {}
        }
    }

    if mismatches.is_empty() {
        Ok(())
    } else {
        Err(WorkflowError::TypeMismatches(mismatches))
    }
}

pub fn resolve_operator_bindings(
    workflow: &Workflow,
    operators: &[OperatorDefinition],
) -> Result<(), WorkflowError> {
    let operator_map = build_operator_map(operators);

    for node in &workflow.nodes {
        let (op_id, op_version) = parse_operator_ref(&node.operator);
        let op_def = operator_map
            .get(&(op_id.as_str(), op_version.as_str()))
            .ok_or_else(|| WorkflowError::UnknownOperator {
                node_id: node.id.clone(),
                operator_ref: node.operator.clone(),
            })?;

        check_required_inputs(node, op_def)?;
        check_node_config(node, op_def)?;
    }

    Ok(())
}

pub fn validate_workflow(
    workflow: &Workflow,
    operators: &[OperatorDefinition],
) -> Result<Vec<String>, WorkflowError> {
    let sorted = validate_dag(workflow)?;
    validate_port_types(workflow, operators)?;
    resolve_operator_bindings(workflow, operators)?;
    Ok(sorted)
}

fn check_unique_node_ids(workflow: &Workflow) -> Result<(), WorkflowError> {
    let mut seen = HashSet::new();
    for node in &workflow.nodes {
        if !seen.insert(&node.id) {
            return Err(WorkflowError::DuplicateNode {
                node_id: node.id.clone(),
            });
        }
    }
    Ok(())
}

fn check_dangling_edges(workflow: &Workflow, edges: &[Edge]) -> Result<(), WorkflowError> {
    let node_ids: HashSet<&str> = workflow.nodes.iter().map(|n| n.id.as_str()).collect();

    for edge in edges {
        if edge.source_node != "input" && !node_ids.contains(edge.source_node.as_str()) {
            return Err(WorkflowError::DanglingEdge {
                node_id: edge.source_node.clone(),
            });
        }
        if !node_ids.contains(edge.target_node.as_str()) {
            return Err(WorkflowError::DanglingEdge {
                node_id: edge.target_node.clone(),
            });
        }
    }

    Ok(())
}

fn topological_sort(workflow: &Workflow, edges: &[Edge]) -> Result<Vec<String>, WorkflowError> {
    let node_ids: Vec<&str> = workflow.nodes.iter().map(|n| n.id.as_str()).collect();
    let mut in_degree: HashMap<&str, usize> = node_ids.iter().map(|id| (*id, 0_usize)).collect();
    let mut adjacency: HashMap<&str, Vec<&str>> =
        node_ids.iter().map(|id| (*id, Vec::new())).collect();

    for edge in edges {
        if edge.source_node == "input" {
            continue;
        }
        if let Some(targets) = adjacency.get_mut(edge.source_node.as_str()) {
            targets.push(edge.target_node.as_str());
        }
        if let Some(deg) = in_degree.get_mut(edge.target_node.as_str()) {
            *deg += 1;
        }
    }

    let mut queue: VecDeque<&str> = in_degree
        .iter()
        .filter(|(_, deg)| **deg == 0)
        .map(|(&id, _)| id)
        .collect();

    let mut sorted = Vec::with_capacity(node_ids.len());

    while let Some(current) = queue.pop_front() {
        sorted.push(current.to_string());
        if let Some(neighbors) = adjacency.get(current) {
            for &neighbor in neighbors {
                if let Some(deg) = in_degree.get_mut(neighbor) {
                    *deg -= 1;
                    if *deg == 0 {
                        queue.push_back(neighbor);
                    }
                }
            }
        }
    }

    if sorted.len() != node_ids.len() {
        return Err(WorkflowError::CycleDetected);
    }

    Ok(sorted)
}

type OperatorMap<'a> = HashMap<(&'a str, &'a str), &'a OperatorDefinition>;

fn build_operator_map(operators: &[OperatorDefinition]) -> OperatorMap<'_> {
    operators
        .iter()
        .map(|op| ((op.operator.id.as_str(), op.operator.version.as_str()), op))
        .collect()
}

pub(crate) fn parse_operator_ref(operator_ref: &str) -> (String, String) {
    match operator_ref.rsplit_once('@') {
        Some((id, version)) => (id.to_string(), version.to_string()),
        None => (operator_ref.to_string(), String::new()),
    }
}

fn resolve_source_port_type(
    workflow: &Workflow,
    operator_map: &OperatorMap<'_>,
    edge: &Edge,
) -> Option<String> {
    if edge.source_node == "input" {
        return workflow
            .inputs
            .iter()
            .find(|p| p.name == edge.source_port)
            .map(|p| p.port_type.clone());
    }

    let node = workflow.nodes.iter().find(|n| n.id == edge.source_node)?;
    let (op_id, op_version) = parse_operator_ref(&node.operator);
    let op_def = operator_map.get(&(op_id.as_str(), op_version.as_str()))?;

    op_def
        .outputs
        .as_ref()?
        .iter()
        .find(|p| p.name == edge.source_port)
        .map(|p| p.port_type.clone())
}

fn resolve_target_port_type(
    operator_map: &OperatorMap<'_>,
    workflow: &Workflow,
    edge: &Edge,
) -> Option<String> {
    let node = workflow.nodes.iter().find(|n| n.id == edge.target_node)?;
    let (op_id, op_version) = parse_operator_ref(&node.operator);
    let op_def = operator_map.get(&(op_id.as_str(), op_version.as_str()))?;

    op_def
        .inputs
        .as_ref()?
        .iter()
        .find(|p| p.name == edge.target_port)
        .map(|p| p.port_type.clone())
}

fn check_required_inputs(
    node: &crate::model::NodeInstance,
    op_def: &OperatorDefinition,
) -> Result<(), WorkflowError> {
    let Some(input_specs) = &op_def.inputs else {
        return Ok(());
    };

    for spec in input_specs {
        let is_required = spec.required.unwrap_or(true);
        let has_default = spec.default.is_some();
        if !is_required || has_default {
            continue;
        }

        let has_input = node.inputs.contains_key(&spec.name);
        if !has_input {
            return Err(WorkflowError::MissingRequiredInput {
                node_id: node.id.clone(),
                port_name: spec.name.clone(),
            });
        }
    }

    Ok(())
}

fn check_node_config(
    node: &crate::model::NodeInstance,
    op_def: &OperatorDefinition,
) -> Result<(), WorkflowError> {
    let Some(schema_value) = &op_def.config_schema else {
        return Ok(());
    };

    let Some(config) = &node.config else {
        return Ok(());
    };

    let schema =
        jsonschema::draft7::new(schema_value).map_err(|e| WorkflowError::InvalidConfig {
            node_id: node.id.clone(),
            detail: format!("invalid schema: {e}"),
        })?;

    let result = schema.validate(config);
    if let Err(error) = result {
        return Err(WorkflowError::InvalidConfig {
            node_id: node.id.clone(),
            detail: error.to_string(),
        });
    }

    Ok(())
}
