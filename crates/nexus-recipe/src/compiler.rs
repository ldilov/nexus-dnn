use std::collections::BTreeMap;

use serde_json::Value;

use nexus_extension::OperatorDefinition;
use nexus_workflow::{Workflow, validate_workflow};

use crate::error::BindingError;
use crate::projection::{ControlMode, RecipeProjection};
use crate::target::{parse_target, write_target};

#[derive(Debug, Clone, PartialEq)]
pub struct AppliedControl {
    pub control_id: String,
    pub targets: Vec<String>,
    pub value: Value,
}

/// A validated, frozen run request. NOT executed — handed to P3's run path.
#[derive(Debug, Clone)]
pub struct ResolvedRun {
    pub workflow_id: String,
    pub workflow_version: String,
    pub resolved_workflow: Workflow,
    pub resolved_inputs: BTreeMap<String, Value>,
    pub applied_controls: Vec<AppliedControl>,
}

/// Compile user control values through a recipe projection onto a pinned
/// workflow snapshot. Layering: control defaults -> preset values -> user
/// values. Locked controls reject user overrides; hidden controls are not
/// user-settable. Every projected value is validated against the operator
/// schemas via `validate_workflow`, and input values are type-checked against
/// their `WorkflowPort` types.
pub fn compile_recipe_run(
    projection: &RecipeProjection,
    workflow: &Workflow,
    workflow_version: &str,
    operators: &[OperatorDefinition],
    control_values: &BTreeMap<String, Value>,
    preset_id: Option<&str>,
) -> Result<ResolvedRun, BindingError> {
    let by_id: BTreeMap<&str, &crate::projection::ControlDef> = projection
        .controls
        .iter()
        .map(|c| (c.control_id.as_str(), c))
        .collect();

    let mut effective: BTreeMap<String, Value> = BTreeMap::new();
    for c in &projection.controls {
        if let Some(d) = &c.default_value {
            effective.insert(c.control_id.clone(), d.clone());
        }
    }

    if let Some(pid) = preset_id {
        let preset = projection
            .presets
            .iter()
            .find(|p| p.preset_id == pid)
            .ok_or_else(|| BindingError::UnknownPreset(pid.to_string()))?;
        for (k, v) in &preset.values {
            effective.insert(k.clone(), v.clone());
        }
    }

    for (k, v) in control_values {
        let control = by_id
            .get(k.as_str())
            .ok_or_else(|| BindingError::UnknownControl(k.clone()))?;
        match control.mode {
            ControlMode::Locked => return Err(BindingError::LockedOverride(k.clone())),
            ControlMode::Hidden => return Err(BindingError::NotSettable(k.clone())),
            ControlMode::Basic | ControlMode::Advanced => {
                effective.insert(k.clone(), v.clone());
            }
        }
    }

    let mut working = workflow.clone();
    let mut resolved_inputs: BTreeMap<String, Value> = BTreeMap::new();
    let mut applied = Vec::new();
    for c in &projection.controls {
        let Some(val) = effective.get(&c.control_id) else {
            continue;
        };
        for target_str in &c.bindings {
            let target = parse_target(target_str)?;
            write_target(&mut working, &mut resolved_inputs, &target, val.clone())?;
        }
        if !c.bindings.is_empty() {
            applied.push(AppliedControl {
                control_id: c.control_id.clone(),
                targets: c.bindings.clone(),
                value: val.clone(),
            });
        }
    }

    validate_workflow(&working, operators).map_err(|e| BindingError::Validation(e.to_string()))?;

    for (name, value) in &resolved_inputs {
        if let Some(port) = working.inputs.iter().find(|p| &p.name == name) {
            if !value_matches_port(value, &port.port_type) {
                return Err(BindingError::InputTypeMismatch {
                    name: name.clone(),
                    expected: port.port_type.clone(),
                });
            }
        }
    }

    Ok(ResolvedRun {
        workflow_id: working.id.clone(),
        workflow_version: workflow_version.to_string(),
        resolved_workflow: working,
        resolved_inputs,
        applied_controls: applied,
    })
}

fn value_matches_port(value: &Value, port_type: &str) -> bool {
    match port_type {
        "string" => value.is_string(),
        "boolean" | "bool" => value.is_boolean(),
        "number" | "float" | "double" => value.is_number(),
        "integer" | "int" => value.is_i64() || value.is_u64(),
        _ => true,
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::projection::{ControlDef, ControlKind, PresetPack, PresetSource};
    use nexus_workflow::{Workflow, WorkflowPort};

    fn control(
        id: &str,
        mode: ControlMode,
        default: Option<Value>,
        bindings: Vec<&str>,
    ) -> ControlDef {
        ControlDef {
            control_id: id.into(),
            kind: ControlKind::String,
            label: id.into(),
            help_text: None,
            mode,
            default_value: default,
            widget_hint: None,
            bindings: bindings.into_iter().map(str::to_string).collect(),
        }
    }

    fn empty_wf() -> Workflow {
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

    fn proj(controls: Vec<ControlDef>, presets: Vec<PresetPack>) -> RecipeProjection {
        RecipeProjection {
            schema_version: 1,
            sections: vec![],
            controls,
            presets,
            output: Default::default(),
        }
    }

    #[test]
    fn applies_default_and_user_value_to_input() {
        let p = proj(
            vec![control(
                "text",
                ControlMode::Basic,
                Some(serde_json::json!("d")),
                vec!["input:script"],
            )],
            vec![],
        );
        let mut user = BTreeMap::new();
        user.insert("text".to_string(), serde_json::json!("hello"));
        let run = compile_recipe_run(&p, &empty_wf(), "1", &[], &user, None).unwrap();
        assert_eq!(
            run.resolved_inputs.get("script"),
            Some(&serde_json::json!("hello"))
        );
        assert_eq!(run.applied_controls.len(), 1);
    }

    #[test]
    fn fan_out_writes_every_target() {
        let mut wf = empty_wf();
        wf.inputs.push(WorkflowPort {
            name: "script2".into(),
            port_type: "string".into(),
        });
        let p = proj(
            vec![control(
                "text",
                ControlMode::Basic,
                None,
                vec!["input:script", "input:script2"],
            )],
            vec![],
        );
        let mut user = BTreeMap::new();
        user.insert("text".to_string(), serde_json::json!("x"));
        let run = compile_recipe_run(&p, &wf, "1", &[], &user, None).unwrap();
        assert_eq!(
            run.resolved_inputs.get("script"),
            Some(&serde_json::json!("x"))
        );
        assert_eq!(
            run.resolved_inputs.get("script2"),
            Some(&serde_json::json!("x"))
        );
    }

    #[test]
    fn locked_user_override_is_rejected() {
        let p = proj(
            vec![control(
                "text",
                ControlMode::Locked,
                Some(serde_json::json!("fixed")),
                vec!["input:script"],
            )],
            vec![],
        );
        let mut user = BTreeMap::new();
        user.insert("text".to_string(), serde_json::json!("hack"));
        let err = compile_recipe_run(&p, &empty_wf(), "1", &[], &user, None).unwrap_err();
        assert_eq!(err, BindingError::LockedOverride("text".into()));
    }

    #[test]
    fn hidden_user_override_is_rejected() {
        let p = proj(
            vec![control(
                "text",
                ControlMode::Hidden,
                Some(serde_json::json!("d")),
                vec!["input:script"],
            )],
            vec![],
        );
        let mut user = BTreeMap::new();
        user.insert("text".to_string(), serde_json::json!("x"));
        let err = compile_recipe_run(&p, &empty_wf(), "1", &[], &user, None).unwrap_err();
        assert_eq!(err, BindingError::NotSettable("text".into()));
    }

    #[test]
    fn preset_values_overlay_defaults() {
        let p = proj(
            vec![control(
                "text",
                ControlMode::Basic,
                Some(serde_json::json!("d")),
                vec!["input:script"],
            )],
            vec![PresetPack {
                preset_id: "final".into(),
                label: "Final".into(),
                description: None,
                source: PresetSource::Recipe,
                values: BTreeMap::from([("text".to_string(), serde_json::json!("preset"))]),
            }],
        );
        let run =
            compile_recipe_run(&p, &empty_wf(), "1", &[], &BTreeMap::new(), Some("final")).unwrap();
        assert_eq!(
            run.resolved_inputs.get("script"),
            Some(&serde_json::json!("preset"))
        );
    }

    #[test]
    fn unknown_preset_errors() {
        let p = proj(vec![], vec![]);
        let err = compile_recipe_run(&p, &empty_wf(), "1", &[], &BTreeMap::new(), Some("nope"))
            .unwrap_err();
        assert_eq!(err, BindingError::UnknownPreset("nope".into()));
    }

    #[test]
    fn input_type_mismatch_is_rejected() {
        let p = proj(
            vec![control("n", ControlMode::Basic, None, vec!["input:script"])],
            vec![],
        );
        let mut user = BTreeMap::new();
        user.insert("n".to_string(), serde_json::json!(123));
        let err = compile_recipe_run(&p, &empty_wf(), "1", &[], &user, None).unwrap_err();
        assert_eq!(
            err,
            BindingError::InputTypeMismatch {
                name: "script".into(),
                expected: "string".into()
            }
        );
    }
}
