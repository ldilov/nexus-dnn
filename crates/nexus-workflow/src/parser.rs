use std::collections::HashMap;

use chrono::Utc;
use serde::Deserialize;
use uuid::Uuid;

use crate::error::WorkflowError;
use crate::model::{NodeInput, NodeInstance, OutputBinding, Stage, Workflow, WorkflowPort};

#[derive(Deserialize)]
struct YamlDocument {
    #[allow(dead_code)]
    #[serde(alias = "specVersion")]
    spec_version: String,
    workflow: YamlWorkflow,
}

#[derive(Deserialize)]
struct YamlWorkflow {
    id: Option<String>,
    version: String,
    title: String,
    inputs: Option<Vec<YamlPort>>,
    outputs: Option<Vec<YamlOutputBinding>>,
    nodes: Option<Vec<YamlNode>>,
    stages: Option<Vec<YamlStage>>,
}

#[derive(Deserialize)]
struct YamlPort {
    name: String,
    #[serde(rename = "type")]
    port_type: String,
}

#[derive(Deserialize)]
struct YamlOutputBinding {
    name: String,
    from: String,
}

#[derive(Deserialize)]
struct YamlNode {
    id: String,
    operator: String,
    stage: Option<String>,
    inputs: Option<HashMap<String, YamlNodeInput>>,
    config: Option<serde_json::Value>,
}

#[derive(Deserialize)]
#[serde(untagged)]
enum YamlNodeInput {
    Reference { from: String },
    Literal { value: serde_json::Value },
}

#[derive(Deserialize)]
struct YamlStage {
    id: String,
    label: String,
}

pub fn parse_workflow(yaml_content: &str) -> Result<Workflow, WorkflowError> {
    let doc: YamlDocument =
        serde_saphyr::from_str(yaml_content).map_err(|e| WorkflowError::Parse(e.to_string()))?;

    let now = Utc::now().to_rfc3339();
    let id = doc
        .workflow
        .id
        .unwrap_or_else(|| Uuid::new_v4().to_string());

    let inputs = doc
        .workflow
        .inputs
        .unwrap_or_default()
        .into_iter()
        .map(convert_port)
        .collect();

    let outputs = doc
        .workflow
        .outputs
        .unwrap_or_default()
        .into_iter()
        .map(convert_output_binding)
        .collect();

    let nodes = doc
        .workflow
        .nodes
        .unwrap_or_default()
        .into_iter()
        .map(convert_node)
        .collect();

    let stages = doc
        .workflow
        .stages
        .unwrap_or_default()
        .into_iter()
        .map(convert_stage)
        .collect();

    Ok(Workflow {
        id,
        title: doc.workflow.title,
        version: doc.workflow.version,
        inputs,
        outputs,
        nodes,
        stages,
        created_at: now.clone(),
        updated_at: now,
    })
}

fn convert_port(yaml: YamlPort) -> WorkflowPort {
    WorkflowPort {
        name: yaml.name,
        port_type: yaml.port_type,
    }
}

fn convert_output_binding(yaml: YamlOutputBinding) -> OutputBinding {
    OutputBinding {
        name: yaml.name,
        from: yaml.from,
    }
}

fn convert_node(yaml: YamlNode) -> NodeInstance {
    let inputs = yaml
        .inputs
        .unwrap_or_default()
        .into_iter()
        .map(|(key, val)| (key, convert_node_input(val)))
        .collect();

    NodeInstance {
        id: yaml.id,
        operator: yaml.operator,
        stage: yaml.stage,
        inputs,
        config: yaml.config,
    }
}

fn convert_node_input(yaml: YamlNodeInput) -> NodeInput {
    match yaml {
        YamlNodeInput::Reference { from } => NodeInput::Reference { from },
        YamlNodeInput::Literal { value } => NodeInput::Literal { value },
    }
}

fn convert_stage(yaml: YamlStage) -> Stage {
    Stage {
        id: yaml.id,
        label: yaml.label,
    }
}
