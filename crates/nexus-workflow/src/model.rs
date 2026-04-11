use std::collections::HashMap;

use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Workflow {
    pub id: String,
    pub title: String,
    pub version: String,
    pub inputs: Vec<WorkflowPort>,
    pub outputs: Vec<OutputBinding>,
    pub nodes: Vec<NodeInstance>,
    pub stages: Vec<Stage>,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct WorkflowPort {
    pub name: String,
    #[serde(rename = "type")]
    pub port_type: String,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct OutputBinding {
    pub name: String,
    pub from: String,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct NodeInstance {
    pub id: String,
    pub operator: String,
    pub stage: Option<String>,
    pub inputs: HashMap<String, NodeInput>,
    pub config: Option<serde_json::Value>,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(untagged)]
pub enum NodeInput {
    Reference { from: String },
    Literal { value: serde_json::Value },
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Stage {
    pub id: String,
    pub label: String,
}

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct Edge {
    pub source_node: String,
    pub source_port: String,
    pub target_node: String,
    pub target_port: String,
}

impl Workflow {
    pub fn extract_edges(&self) -> Vec<Edge> {
        let mut edges = Vec::new();
        for node in &self.nodes {
            for (port_name, input) in &node.inputs {
                if let NodeInput::Reference { from } = input
                    && let Some(edge) = parse_edge_reference(from, &node.id, port_name)
                {
                    edges.push(edge);
                }
            }
        }
        edges
    }
}

fn parse_edge_reference(from: &str, target_node: &str, target_port: &str) -> Option<Edge> {
    let parts: Vec<&str> = from.splitn(2, ':').collect();
    if parts.len() != 2 {
        return None;
    }
    Some(Edge {
        source_node: parts[0].to_string(),
        source_port: parts[1].to_string(),
        target_node: target_node.to_string(),
        target_port: target_port.to_string(),
    })
}
