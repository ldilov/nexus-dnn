//! Recipe compatibility status (CONTRACTS C6). Two entry points: the pure
//! `compute_status` primitive and the higher-level `assess_status` that derives
//! its facts from pinned + current workflow snapshots. P6/P8 call `assess_status`.

use nexus_extension::OperatorDefinition;
use nexus_workflow::{Workflow, WorkflowVersionSnapshot};
use serde::{Deserialize, Serialize};

use crate::projection::RecipeProjection;

/// Recipe pin has no resolvable workflow version.
pub const REASON_NEEDS_RE_PIN: &str = "needs_re_pin";
/// The pinned version row no longer exists.
pub const REASON_PINNED_VERSION_MISSING: &str = "pinned_version_missing";
/// A projection binding does not resolve against the pinned workflow.
pub const REASON_BROKEN_BINDING: &str = "broken_binding";
/// A bound node's operator config-schema changed since the pin.
pub const REASON_OPERATOR_SCHEMA_DRIFT: &str = "operator_schema_drift";

#[derive(Clone, Copy, Debug, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum RecipeStatus {
    Healthy,
    Outdated,
    Broken,
}

impl RecipeStatus {
    pub fn as_str(&self) -> &'static str {
        match self {
            RecipeStatus::Healthy => "healthy",
            RecipeStatus::Outdated => "outdated",
            RecipeStatus::Broken => "broken",
        }
    }

    #[allow(clippy::should_implement_trait)]
    pub fn from_str(s: &str) -> Option<Self> {
        match s {
            "healthy" => Some(RecipeStatus::Healthy),
            "outdated" => Some(RecipeStatus::Outdated),
            "broken" => Some(RecipeStatus::Broken),
            _ => None,
        }
    }
}

/// Pure status primitive. Order: an unresolved pin or missing version or broken
/// binding or schema drift is `Broken`; a valid-but-stale pin is `Outdated`;
/// otherwise `Healthy`.
pub fn compute_status(
    pinned_version_exists: bool,
    pinned_is_current: bool,
    bindings_ok: bool,
    operator_schema_drift: bool,
    unresolved_pin: bool,
) -> (RecipeStatus, Option<String>) {
    if unresolved_pin {
        return (RecipeStatus::Broken, Some(REASON_NEEDS_RE_PIN.to_string()));
    }
    if !pinned_version_exists {
        return (
            RecipeStatus::Broken,
            Some(REASON_PINNED_VERSION_MISSING.to_string()),
        );
    }
    if !bindings_ok {
        return (
            RecipeStatus::Broken,
            Some(REASON_BROKEN_BINDING.to_string()),
        );
    }
    if operator_schema_drift {
        return (
            RecipeStatus::Broken,
            Some(REASON_OPERATOR_SCHEMA_DRIFT.to_string()),
        );
    }
    if !pinned_is_current {
        return (RecipeStatus::Outdated, None);
    }
    (RecipeStatus::Healthy, None)
}

/// Derives the five facts from the projection + pinned/current snapshots, then
/// delegates to `compute_status`. `operators` is accepted for forward-compat
/// with richer schema checks; drift is read from the snapshots' per-node hashes.
pub fn assess_status(
    projection: &RecipeProjection,
    pinned_snapshot: Option<&WorkflowVersionSnapshot>,
    current_snapshot: Option<&WorkflowVersionSnapshot>,
    operators: &[OperatorDefinition],
) -> (RecipeStatus, Option<String>) {
    let _ = operators;
    let Some(pinned) = pinned_snapshot else {
        return compute_status(false, false, true, false, false);
    };

    let bindings_ok = projection
        .controls
        .iter()
        .flat_map(|c| c.bindings.iter())
        .all(|b| binding_resolves(&pinned.workflow, b));

    let pinned_is_current = match current_snapshot {
        Some(current) => current.version == pinned.version,
        None => true,
    };

    let operator_schema_drift = match current_snapshot {
        Some(current) => bound_node_ids(projection).into_iter().any(|node_id| {
            match (
                pinned.operator_schema_hashes.get(&node_id),
                current.operator_schema_hashes.get(&node_id),
            ) {
                (Some(pinned_hash), Some(current_hash)) => pinned_hash != current_hash,
                (Some(_), None) => true,
                _ => false,
            }
        }),
        None => false,
    };

    compute_status(
        true,
        pinned_is_current,
        bindings_ok,
        operator_schema_drift,
        false,
    )
}

/// True when a single binding string resolves against the workflow's declared
/// inputs (`input:<name>`) or nodes (`node:<id>...`). Grammar-only — the full
/// nested-pointer compiler is P2's `parse_target`.
fn binding_resolves(workflow: &Workflow, binding: &str) -> bool {
    if let Some(name) = binding.strip_prefix("input:") {
        return workflow.inputs.iter().any(|p| p.name == name);
    }
    if let Some(rest) = binding.strip_prefix("node:") {
        let node_id = rest.split('.').next().unwrap_or("");
        return !node_id.is_empty() && workflow.nodes.iter().any(|n| n.id == node_id);
    }
    false
}

/// The distinct node ids referenced by the projection's `node:<id>...` bindings.
fn bound_node_ids(projection: &RecipeProjection) -> Vec<String> {
    let mut ids: Vec<String> = Vec::new();
    for control in &projection.controls {
        for binding in &control.bindings {
            if let Some(rest) = binding.strip_prefix("node:") {
                let id = rest.split('.').next().unwrap_or("").to_string();
                if !id.is_empty() && !ids.contains(&id) {
                    ids.push(id);
                }
            }
        }
    }
    ids
}
