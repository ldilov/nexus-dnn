//! P2 binding compiler (CONTRACTS C3). Pure resolution + validation, ZERO
//! execution: layer control values, fan them out onto a cloned workflow
//! snapshot, validate, and emit a [`ResolvedRun`].
//!
//! This source is host-generic: no concrete binding literals appear here. The
//! grammar prefixes live in [`crate::resolver`]; targets are looked up by a
//! `node_id` variable and error/target strings are assembled with `format!`.

use std::collections::BTreeMap;

use nexus_workflow::{Workflow, WorkflowError, WorkflowVersionSnapshot, validate_node_config};

use crate::error::BindingError;
use crate::projection::{Control, ControlMode, RecipeProjection};
use crate::resolved::{AppliedControl, ResolvedRun, ValueSource};
use crate::resolver::{BindingTarget, parse_target, write_node_config};

/// User-supplied control overrides, keyed by `control_id`.
pub type ControlValues = BTreeMap<String, serde_json::Value>;

/// One control's layered effective value plus its provenance.
struct Effective {
    value: serde_json::Value,
    source: ValueSource,
}

/// Compile a recipe run: resolve control values against a pinned workflow
/// snapshot and validate the result. Returns a [`ResolvedRun`] carrying the
/// mutated workflow clone, resolved input map, and per-control audit.
///
/// Stages: (1) layer default → preset → user with provenance and gate by mode,
/// (2) fan out participating controls onto a cloned workflow, (3) validate node
/// configs, then the whole workflow structurally, then input value types, and
/// (4) emit. Never mutates `snapshot`.
pub fn compile_recipe_run(
    projection: &RecipeProjection,
    snapshot: &WorkflowVersionSnapshot,
    control_values: &ControlValues,
    preset_id: Option<&str>,
) -> Result<ResolvedRun, BindingError> {
    let effective = layer_effective_values(projection, control_values, preset_id)?;

    let mut wf = snapshot.workflow.clone();
    let mut resolved_inputs = serde_json::Map::new();
    let mut applied_controls = Vec::new();
    let mut touched_nodes: Vec<String> = Vec::new();

    for control in &projection.controls {
        if control.bindings.is_empty() {
            continue;
        }
        let eff = effective
            .get(&control.control_id)
            .expect("every control was seeded");

        if eff.value.is_null() {
            return Err(BindingError::MissingRequired {
                control_id: control.control_id.clone(),
            });
        }

        fan_out_control(
            control,
            eff,
            &mut wf,
            &mut resolved_inputs,
            &mut touched_nodes,
        )?;
        applied_controls.push(AppliedControl {
            control_id: control.control_id.clone(),
            targets: control.bindings.clone(),
            value: eff.value.clone(),
            source: eff.source,
        });
    }

    validate_touched_nodes(&wf, snapshot, &touched_nodes)?;
    nexus_workflow::validate_workflow(&wf, &snapshot.operators)?;
    check_input_values(&wf, &resolved_inputs)?;

    Ok(ResolvedRun {
        workflow_id: snapshot.workflow_id.clone(),
        workflow_version: snapshot.version.clone(),
        resolved_workflow: wf,
        resolved_inputs,
        applied_controls,
    })
}

/// Seed every control with its default, then overlay the preset (any mode) and
/// finally the user layer (rejected for locked/hidden controls).
fn layer_effective_values(
    projection: &RecipeProjection,
    control_values: &ControlValues,
    preset_id: Option<&str>,
) -> Result<BTreeMap<String, Effective>, BindingError> {
    let mut seen = std::collections::HashSet::new();
    for c in &projection.controls {
        if !seen.insert(c.control_id.as_str()) {
            return Err(BindingError::DuplicateControl {
                control_id: c.control_id.clone(),
            });
        }
    }

    let mut effective: BTreeMap<String, Effective> = projection
        .controls
        .iter()
        .map(|c| {
            (
                c.control_id.clone(),
                Effective {
                    value: c.default_value.clone(),
                    source: ValueSource::Default,
                },
            )
        })
        .collect();

    if let Some(pid) = preset_id {
        let preset = projection
            .presets
            .iter()
            .find(|p| p.preset_id == pid)
            .ok_or_else(|| BindingError::UnknownPreset {
                preset_id: pid.to_string(),
            })?;
        for (key, value) in &preset.values {
            let entry = effective
                .get_mut(key)
                .ok_or_else(|| BindingError::UnknownControl {
                    control_id: key.clone(),
                })?;
            entry.value = value.clone();
            entry.source = ValueSource::Preset;
        }
    }

    for (key, value) in control_values {
        let mode = mode_of(projection, key).ok_or_else(|| BindingError::UnknownControl {
            control_id: key.clone(),
        })?;
        match mode {
            ControlMode::Locked => {
                return Err(BindingError::LockedOverride {
                    control_id: key.clone(),
                });
            }
            ControlMode::Hidden => {
                return Err(BindingError::HiddenControlNotSettable {
                    control_id: key.clone(),
                });
            }
            ControlMode::Basic | ControlMode::Advanced => {
                let entry = effective
                    .get_mut(key)
                    .expect("mode lookup proved existence");
                entry.value = value.clone();
                entry.source = ValueSource::User;
            }
        }
    }

    Ok(effective)
}

fn mode_of(projection: &RecipeProjection, control_id: &str) -> Option<ControlMode> {
    projection
        .controls
        .iter()
        .find(|c| c.control_id == control_id)
        .map(|c| c.mode)
}

/// Apply one participating control's effective value to all its binding targets.
fn fan_out_control(
    control: &Control,
    eff: &Effective,
    wf: &mut Workflow,
    resolved_inputs: &mut serde_json::Map<String, serde_json::Value>,
    touched_nodes: &mut Vec<String>,
) -> Result<(), BindingError> {
    for binding in &control.bindings {
        match parse_target(binding)? {
            BindingTarget::Input(name) => {
                resolved_inputs.insert(name, eff.value.clone());
            }
            BindingTarget::NodeConfig { node_id, pointer } => {
                let node = wf
                    .nodes
                    .iter_mut()
                    .find(|n| n.id == node_id)
                    .ok_or_else(|| BindingError::UnknownTarget {
                        target: binding.clone(),
                    })?;
                write_node_config(node, &pointer, eff.value.clone())?;
                if !touched_nodes.contains(&node_id) {
                    touched_nodes.push(node_id);
                }
            }
        }
    }
    Ok(())
}

/// Validate each touched node's config against its operator schema, surfacing a
/// precise [`BindingError::SchemaViolation`]. Nodes whose operator is unresolved
/// here are left for `validate_workflow` to flag.
fn validate_touched_nodes(
    wf: &Workflow,
    snapshot: &WorkflowVersionSnapshot,
    touched_nodes: &[String],
) -> Result<(), BindingError> {
    for node_id in touched_nodes {
        let Some(node) = wf.nodes.iter().find(|n| &n.id == node_id) else {
            continue;
        };
        let (op_id, op_version) = match node.operator.rsplit_once('@') {
            Some((id, version)) => (id, version),
            None => (node.operator.as_str(), ""),
        };
        let Some(op_def) = snapshot
            .operators
            .iter()
            .find(|op| op.operator.id == op_id && op.operator.version == op_version)
        else {
            continue;
        };
        match validate_node_config(node, op_def) {
            Ok(()) => {}
            Err(WorkflowError::InvalidConfig { node_id, detail }) => {
                return Err(BindingError::SchemaViolation {
                    node_id,
                    field: String::new(),
                    detail,
                });
            }
            Err(other) => return Err(BindingError::Workflow(other)),
        }
    }
    Ok(())
}

/// Type-check every resolved input against its declared workflow port. Unknown
/// ports and type mismatches are surfaced as binding errors keyed by target.
fn check_input_values(
    wf: &Workflow,
    resolved_inputs: &serde_json::Map<String, serde_json::Value>,
) -> Result<(), BindingError> {
    for (name, value) in resolved_inputs {
        let Some(port) = wf.inputs.iter().find(|p| &p.name == name) else {
            return Err(BindingError::UnknownTarget {
                target: format!("input:{name}"),
            });
        };
        if !value_matches_port_type(value, &port.port_type) {
            return Err(BindingError::TypeMismatch {
                target: format!("input:{name}"),
            });
        }
    }
    Ok(())
}

fn value_matches_port_type(value: &serde_json::Value, port_type: &str) -> bool {
    match port_type {
        "string" | "text" => value.is_string(),
        "int" | "integer" => value.is_i64() || value.is_u64(),
        "float" | "number" => value.is_number(),
        "bool" | "boolean" => value.is_boolean(),
        _ => true,
    }
}
