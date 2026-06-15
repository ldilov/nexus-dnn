use nexus_extension::OperatorDefinition;
use nexus_recipe::projection::{ControlKind, ControlMode, RecipeProjection};
use nexus_recipe::target::{ParsedTarget, parse_target};
use nexus_workflow::Workflow;
use serde_json::Value;

use crate::dto::recipe_form::{
    FormControlDto, FormPresetDto, FormSectionDto, RecipeFormDto, SchemaHintDto,
};

fn kind_str(k: ControlKind) -> &'static str {
    match k {
        ControlKind::String => "string",
        ControlKind::Enum => "enum",
        ControlKind::Bool => "bool",
        ControlKind::Int => "int",
        ControlKind::Float => "float",
        ControlKind::Asset => "asset",
        ControlKind::PresetSelector => "preset_selector",
    }
}

fn mode_str(m: ControlMode) -> &'static str {
    match m {
        ControlMode::Basic => "basic",
        ControlMode::Advanced => "advanced",
        ControlMode::Hidden => "hidden",
        ControlMode::Locked => "locked",
    }
}

/// Resolve a schema hint for the FIRST resolvable binding target of a control,
/// reading enum/min/max from the operator's config_schema (node config targets)
/// or the port type (input targets). Returns None when nothing resolves.
fn schema_hint_for(
    bindings: &[String],
    workflow: &Workflow,
    operators: &[OperatorDefinition],
) -> Option<SchemaHintDto> {
    for raw in bindings {
        let Ok(target) = parse_target(raw) else {
            continue;
        };
        match target {
            ParsedTarget::Input(name) => {
                if let Some(port) = workflow.inputs.iter().find(|p| p.name == name) {
                    return Some(SchemaHintDto {
                        value_type: Some(port.port_type.clone()),
                        enum_values: None,
                        minimum: None,
                        maximum: None,
                    });
                }
            }
            ParsedTarget::NodeConfig { node_id, pointer } => {
                let node = workflow.nodes.iter().find(|n| n.id == node_id)?;
                let (op_id, op_ver) = match node.operator.rsplit_once('@') {
                    Some((i, v)) => (i, v),
                    None => (node.operator.as_str(), ""),
                };
                let op = operators
                    .iter()
                    .find(|o| o.operator.id == op_id && o.operator.version == op_ver)?;
                let schema = op.config_schema.as_ref()?;
                let mut cur = schema.get("properties")?;
                for (i, key) in pointer.iter().enumerate() {
                    cur = cur.get(key)?;
                    if i < pointer.len() - 1 {
                        cur = cur.get("properties")?;
                    }
                }
                return Some(SchemaHintDto {
                    value_type: cur.get("type").and_then(Value::as_str).map(str::to_string),
                    enum_values: cur.get("enum").and_then(Value::as_array).cloned(),
                    minimum: cur.get("minimum").and_then(Value::as_f64),
                    maximum: cur.get("maximum").and_then(Value::as_f64),
                });
            }
        }
    }
    None
}

/// Build the form DTO from a projection + the pinned workflow snapshot.
pub fn build_recipe_form(
    recipe_id: &str,
    display_name: &str,
    summary: &str,
    status: Option<&str>,
    projection: &RecipeProjection,
    workflow: &Workflow,
    operators: &[OperatorDefinition],
) -> RecipeFormDto {
    let controls = projection
        .controls
        .iter()
        .filter(|c| c.mode != ControlMode::Hidden)
        .map(|c| FormControlDto {
            control_id: c.control_id.clone(),
            kind: kind_str(c.kind).to_string(),
            label: c.label.clone(),
            help_text: c.help_text.clone(),
            mode: mode_str(c.mode).to_string(),
            default_value: c.default_value.clone(),
            widget_hint: c.widget_hint.clone(),
            schema_hint: schema_hint_for(&c.bindings, workflow, operators),
        })
        .collect();
    let sections = projection
        .sections
        .iter()
        .map(|s| FormSectionDto {
            id: s.id.clone(),
            title: s.title.clone(),
            order: s.order,
            control_ids: s.control_ids.clone(),
        })
        .collect();
    let presets = projection
        .presets
        .iter()
        .map(|p| FormPresetDto {
            preset_id: p.preset_id.clone(),
            label: p.label.clone(),
            description: p.description.clone(),
        })
        .collect();
    RecipeFormDto {
        recipe_id: recipe_id.to_string(),
        display_name: display_name.to_string(),
        summary: summary.to_string(),
        status: status.map(str::to_string),
        sections,
        controls,
        presets,
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use nexus_recipe::projection::{ControlDef, PresetPack, PresetSource, Section};
    use nexus_workflow::{Workflow, WorkflowPort};
    use std::collections::BTreeMap;

    fn wf() -> Workflow {
        Workflow {
            id: "wf".into(),
            title: "T".into(),
            version: "0.1.0".into(),
            inputs: vec![WorkflowPort {
                name: "script".into(),
                port_type: "string".into(),
            }],
            outputs: vec![],
            nodes: vec![],
            stages: vec![],
            created_at: "t".into(),
            updated_at: "t".into(),
        }
    }

    #[test]
    fn hides_hidden_controls_and_resolves_input_hint() {
        let proj = RecipeProjection {
            schema_version: 1,
            sections: vec![Section {
                id: "input".into(),
                title: "Input".into(),
                order: 0,
                control_ids: vec!["text".into()],
            }],
            controls: vec![
                ControlDef {
                    control_id: "text".into(),
                    kind: ControlKind::String,
                    label: "Text".into(),
                    help_text: None,
                    mode: ControlMode::Basic,
                    default_value: None,
                    widget_hint: None,
                    bindings: vec!["input:script".into()],
                },
                ControlDef {
                    control_id: "secret".into(),
                    kind: ControlKind::String,
                    label: "Secret".into(),
                    help_text: None,
                    mode: ControlMode::Hidden,
                    default_value: None,
                    widget_hint: None,
                    bindings: vec!["input:script".into()],
                },
            ],
            presets: vec![PresetPack {
                preset_id: "final".into(),
                label: "Final".into(),
                description: None,
                source: PresetSource::Recipe,
                values: BTreeMap::new(),
            }],
            output: Default::default(),
        };
        let form = build_recipe_form("r", "R", "s", Some("healthy"), &proj, &wf(), &[]);
        assert_eq!(form.controls.len(), 1, "hidden control excluded");
        assert_eq!(form.controls[0].control_id, "text");
        assert_eq!(
            form.controls[0]
                .schema_hint
                .as_ref()
                .unwrap()
                .value_type
                .as_deref(),
            Some("string")
        );
        assert_eq!(form.presets.len(), 1);
    }
}
