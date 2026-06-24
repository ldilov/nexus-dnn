//! P8 upgrade-assistant + shareability wire contracts. Thin DTOs over the
//! `nexus-recipe` diff/migration types, owning the lowercased status/risk strings
//! and the node-change shape the web renders. Generic by `control_id` + path
//! string — no extension or node literals.

use nexus_recipe::{BrokenBinding, NodeChange, NodeChangeKind, RecipePinDiff, UpgradeRisk};
use serde::{Deserialize, Serialize};
use ts_rs::TS;

/// A projection binding that no longer resolves against the current version.
#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct BrokenBindingDto {
    pub control_id: String,
    pub target: String,
    pub reason: String,
}

impl From<&BrokenBinding> for BrokenBindingDto {
    fn from(b: &BrokenBinding) -> Self {
        Self {
            control_id: b.control_id.clone(),
            target: b.target.clone(),
            reason: b.reason.clone(),
        }
    }
}

/// One node-level change. `kind` is the snake_case tag; `from`/`to` are populated
/// only for an operator change.
#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct NodeChangeDto {
    pub node_id: String,
    pub kind: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub from: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub to: Option<String>,
}

impl From<&NodeChange> for NodeChangeDto {
    fn from(c: &NodeChange) -> Self {
        let (kind, from, to) = match &c.kind {
            NodeChangeKind::Added => ("added", None, None),
            NodeChangeKind::Removed => ("removed", None, None),
            NodeChangeKind::OperatorChanged { from, to } => {
                ("operator_changed", Some(from.clone()), Some(to.clone()))
            }
            NodeChangeKind::SchemaHashDrift => ("schema_hash_drift", None, None),
        };
        Self {
            node_id: c.node_id.clone(),
            kind: kind.to_string(),
            from,
            to,
        }
    }
}

/// `GET /recipes/{id}/upgrade-preview` body: the pinned-vs-current diff plus the
/// FR-7 `risk` summary and the canonical `summary` status, both lowercased.
#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct RecipePinDiffDto {
    pub pinned_version: String,
    pub current_version: String,
    pub is_outdated: bool,
    pub changed_nodes: Vec<NodeChangeDto>,
    pub broken_bindings: Vec<BrokenBindingDto>,
    pub risk: String,
    pub summary: String,
}

impl From<&RecipePinDiff> for RecipePinDiffDto {
    fn from(d: &RecipePinDiff) -> Self {
        Self {
            pinned_version: d.pinned_version.clone(),
            current_version: d.current_version.clone(),
            is_outdated: d.is_outdated,
            changed_nodes: d.changed_nodes.iter().map(NodeChangeDto::from).collect(),
            broken_bindings: d
                .broken_bindings
                .iter()
                .map(BrokenBindingDto::from)
                .collect(),
            risk: risk_str(d.risk).to_string(),
            summary: d.summary.as_str().to_string(),
        }
    }
}

fn risk_str(risk: UpgradeRisk) -> &'static str {
    match risk {
        UpgradeRisk::Safe => "safe",
        UpgradeRisk::Outdated => "outdated",
        UpgradeRisk::Breaking => "breaking",
    }
}

/// `POST /recipes/{id}/upgrade` body: the new user recipe id on a clean upgrade,
/// or `null` + the still-broken bindings when re-pinning would break the recipe.
#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct RecipeUpgradeResultDto {
    pub new_recipe_id: Option<String>,
    pub broken_bindings: Vec<BrokenBindingDto>,
}

/// `POST /recipes/import` body: the created user recipe id and whether the
/// immutable workflow version had to be recreated.
#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct RecipeImportResultDto {
    pub recipe_id: String,
    pub created_workflow_version: bool,
}
