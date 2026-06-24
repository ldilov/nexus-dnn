//! P8 upgrade-assistant pin diff (CONTRACTS C8, FR-7 risk summary). Pure: given a
//! recipe's projection and its pinned vs the workflow's current
//! [`WorkflowVersionSnapshot`], classify node changes, the bindings that would no
//! longer resolve after re-pinning to current, and an [`UpgradeRisk`] severity.
//!
//! Host-generic: no concrete node ids or binding literals appear here — bindings
//! are parsed with [`parse_target`] and resolved against the current workflow by
//! a `node_id` variable.

use nexus_workflow::{Workflow, WorkflowVersionSnapshot};
use serde::{Deserialize, Serialize};

use crate::projection::RecipeProjection;
use crate::resolver::{BindingTarget, parse_target};
use crate::status::RecipeStatus;

/// Banner-level severity of re-pinning a recipe to the current workflow version
/// (FR-7). A digest of the raw diff, surfaced by the upgrade UI as its lead line.
#[derive(Clone, Copy, Debug, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum UpgradeRisk {
    /// Pinned already equals current — nothing to upgrade.
    Safe,
    /// Current is newer but every binding still resolves cleanly.
    Outdated,
    /// At least one binding breaks or a bound node's schema drifted.
    Breaking,
}

/// How a single node differs between the pinned and current snapshot.
#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case", tag = "kind")]
pub enum NodeChangeKind {
    /// Present in current, absent in pinned.
    Added,
    /// Present in pinned, absent in current.
    Removed,
    /// Same node id, different operator reference.
    OperatorChanged { from: String, to: String },
    /// Same operator reference, different config schema hash.
    SchemaHashDrift,
}

/// One node-level change between the pinned and current snapshot.
#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize)]
pub struct NodeChange {
    pub node_id: String,
    #[serde(flatten)]
    pub kind: NodeChangeKind,
}

/// A projection binding that no longer resolves against the current snapshot.
#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize)]
pub struct BrokenBinding {
    pub control_id: String,
    pub target: String,
    pub reason: String,
}

/// The full pinned-vs-current diff behind `GET /recipes/{id}/upgrade-preview` and
/// the migration-copy decision. `summary` is the canonical [`RecipeStatus`]; `risk`
/// is the FR-7 banner severity derived from breakage.
#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize)]
pub struct RecipePinDiff {
    pub pinned_version: String,
    pub current_version: String,
    pub is_outdated: bool,
    pub changed_nodes: Vec<NodeChange>,
    pub broken_bindings: Vec<BrokenBinding>,
    pub risk: UpgradeRisk,
    pub summary: RecipeStatus,
}

/// Diff a recipe's pinned snapshot against the workflow's current snapshot.
///
/// `is_outdated` reflects only version currency; `summary`/`risk` fold in
/// breakage (a broken binding or a bound-node schema drift forces `Broken`/
/// `Breaking`, overriding plain outdated-ness). Never mutates its inputs.
pub fn diff_recipe_pin(
    projection: &RecipeProjection,
    pinned: &WorkflowVersionSnapshot,
    current: &WorkflowVersionSnapshot,
) -> RecipePinDiff {
    let changed_nodes = compute_node_changes(pinned, current);
    let broken_bindings = compute_broken_bindings(projection, &current.workflow);

    let bound = bound_node_ids(projection);
    let breaking_drift = changed_nodes
        .iter()
        .any(|c| matches!(c.kind, NodeChangeKind::SchemaHashDrift) && bound.contains(&c.node_id));
    let has_breaking = !broken_bindings.is_empty() || breaking_drift;
    let version_differs = pinned.version != current.version;

    let summary = if has_breaking {
        RecipeStatus::Broken
    } else if version_differs {
        RecipeStatus::Outdated
    } else {
        RecipeStatus::Healthy
    };
    let risk = if has_breaking {
        UpgradeRisk::Breaking
    } else if version_differs {
        UpgradeRisk::Outdated
    } else {
        UpgradeRisk::Safe
    };

    RecipePinDiff {
        pinned_version: pinned.version.clone(),
        current_version: current.version.clone(),
        is_outdated: version_differs,
        changed_nodes,
        broken_bindings,
        risk,
        summary,
    }
}

/// Node-set + per-node delta between the two snapshots, keyed by node id.
fn compute_node_changes(
    pinned: &WorkflowVersionSnapshot,
    current: &WorkflowVersionSnapshot,
) -> Vec<NodeChange> {
    let mut changes = Vec::new();

    for pinned_node in &pinned.workflow.nodes {
        let Some(current_node) = current
            .workflow
            .nodes
            .iter()
            .find(|n| n.id == pinned_node.id)
        else {
            changes.push(NodeChange {
                node_id: pinned_node.id.clone(),
                kind: NodeChangeKind::Removed,
            });
            continue;
        };

        if pinned_node.operator != current_node.operator {
            changes.push(NodeChange {
                node_id: pinned_node.id.clone(),
                kind: NodeChangeKind::OperatorChanged {
                    from: pinned_node.operator.clone(),
                    to: current_node.operator.clone(),
                },
            });
            continue;
        }

        let pinned_hash = pinned.operator_schema_hashes.get(&pinned_node.id);
        let current_hash = current.operator_schema_hashes.get(&pinned_node.id);
        if pinned_hash != current_hash {
            changes.push(NodeChange {
                node_id: pinned_node.id.clone(),
                kind: NodeChangeKind::SchemaHashDrift,
            });
        }
    }

    for current_node in &current.workflow.nodes {
        if !pinned
            .workflow
            .nodes
            .iter()
            .any(|n| n.id == current_node.id)
        {
            changes.push(NodeChange {
                node_id: current_node.id.clone(),
                kind: NodeChangeKind::Added,
            });
        }
    }

    changes
}

/// Every projection binding that fails to resolve against the current workflow.
fn compute_broken_bindings(
    projection: &RecipeProjection,
    current: &Workflow,
) -> Vec<BrokenBinding> {
    let mut broken = Vec::new();
    for control in &projection.controls {
        for binding in &control.bindings {
            if let Some(reason) = binding_break_reason(binding, current) {
                broken.push(BrokenBinding {
                    control_id: control.control_id.clone(),
                    target: binding.clone(),
                    reason,
                });
            }
        }
    }
    broken
}

/// `Some(reason)` if `binding` no longer resolves against `current`; `None` if it
/// still resolves. Malformed bindings surface the parse failure detail.
fn binding_break_reason(binding: &str, current: &Workflow) -> Option<String> {
    match parse_target(binding) {
        Ok(BindingTarget::Input(name)) => {
            if current.inputs.iter().any(|p| p.name == name) {
                None
            } else {
                Some("input port no longer declared in current version".to_string())
            }
        }
        Ok(BindingTarget::NodeConfig { node_id, .. }) => {
            if current.nodes.iter().any(|n| n.id == node_id) {
                None
            } else {
                Some("target node no longer exists in current version".to_string())
            }
        }
        Err(e) => Some(e.to_string()),
    }
}

/// Distinct node ids referenced by the projection's node-config bindings.
fn bound_node_ids(projection: &RecipeProjection) -> Vec<String> {
    let mut ids = Vec::new();
    for control in &projection.controls {
        for binding in &control.bindings {
            if let Ok(BindingTarget::NodeConfig { node_id, .. }) = parse_target(binding)
                && !ids.contains(&node_id)
            {
                ids.push(node_id);
            }
        }
    }
    ids
}
