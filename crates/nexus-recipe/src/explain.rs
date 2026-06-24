//! P5 read-only provenance projections over a compiled [`ResolvedRun`].
//!
//! These are pure reads: they never recompile or mutate the run. `explain_preset`
//! reports which controls a selected preset supplied (with fan-out targets);
//! `diff_vs_defaults` reports per-control default-vs-effective provenance across
//! the full control set. The HTTP layer joins human labels from the projection —
//! these structs carry only ids, values, targets, and source.

use serde::{Deserialize, Serialize};

use crate::projection::RecipeProjection;
use crate::resolved::{ResolvedRun, ValueSource};

/// The controls a selected preset supplied, with their fan-out targets.
#[derive(Clone, Debug, Serialize, Deserialize, PartialEq)]
pub struct PresetExplanation {
    pub entries: Vec<PresetExplainEntry>,
}

/// One preset-sourced control's effective value and targets. Carries no label:
/// callers join the label from `projection.controls` by `control_id`.
#[derive(Clone, Debug, Serialize, Deserialize, PartialEq)]
pub struct PresetExplainEntry {
    pub control_id: String,
    pub final_value: serde_json::Value,
    pub targets: Vec<String>,
    pub source: ValueSource,
}

/// Per-control provenance: the declared default, the effective value, where it
/// came from, and whether it differs from the default.
#[derive(Clone, Debug, Serialize, Deserialize, PartialEq)]
pub struct ControlDiff {
    pub control_id: String,
    pub default_value: serde_json::Value,
    pub effective_value: serde_json::Value,
    pub source: ValueSource,
    pub overridden: bool,
}

/// Controls whose effective value came from the selected preset (source ==
/// Preset), each with its fan-out targets. Pure read over
/// `resolved.applied_controls`.
pub fn explain_preset(resolved: &ResolvedRun) -> PresetExplanation {
    let entries = resolved
        .applied_controls
        .iter()
        .filter(|a| a.source == ValueSource::Preset)
        .map(|a| PresetExplainEntry {
            control_id: a.control_id.clone(),
            final_value: a.value.clone(),
            targets: a.targets.clone(),
            source: a.source,
        })
        .collect();
    PresetExplanation { entries }
}

/// Per-control provenance diff. For EVERY projection control: effective value &
/// source come from `applied_controls` when the control participated (had
/// bindings); otherwise the control's default with `Default` source.
/// `overridden` is true iff effective_value != default_value. Read-only — no
/// recompile.
pub fn diff_vs_defaults(resolved: &ResolvedRun, projection: &RecipeProjection) -> Vec<ControlDiff> {
    // projection supplies defaults + the full control set; binding-free controls
    // are absent from applied_controls, so we fall back to their declared default.
    projection
        .controls
        .iter()
        .map(|control| {
            let applied = resolved
                .applied_controls
                .iter()
                .find(|a| a.control_id == control.control_id);
            let (effective_value, source) = match applied {
                Some(a) => (a.value.clone(), a.source),
                None => (control.default_value.clone(), ValueSource::Default),
            };
            let default_value = control.default_value.clone();
            let overridden = effective_value != default_value;
            ControlDiff {
                control_id: control.control_id.clone(),
                default_value,
                effective_value,
                source,
                overridden,
            }
        })
        .collect()
}
