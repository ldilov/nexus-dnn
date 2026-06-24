//! P6 recipe-builder wire contracts: the exposable-targets scan response and
//! the user-recipe write payload. Generic by id + path string — the `target`
//! strings are the host-canonical binding grammar (built in `nexus-recipe`),
//! never an extension-specific shape.

use nexus_recipe::RecipeProjection;
use serde::{Deserialize, Serialize};
use ts_rs::TS;

/// One binding target a recipe author may expose, discovered by scanning a
/// pinned workflow-version snapshot. `kind` is `"input"` (a workflow input port)
/// or `"node_config"` (one node-config property). `target` is the canonical
/// binding string the builder writes into a control's `bindings`.
#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct ExposableTargetDto {
    pub target: String,
    pub kind: String,
    pub label: String,
    /// The operator `config_schema` sub-schema for a node-config leaf; `None`
    /// for input ports.
    pub schema: Option<serde_json::Value>,
    pub node_id: Option<String>,
    pub port_type: Option<String>,
    pub required: bool,
    pub current_default: Option<serde_json::Value>,
}

/// `GET /workflows/{id}/versions/{version}/exposable-targets` body: the input
/// ports and node-config leaves a recipe may bind, split by kind.
#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct ExposableTargetsResponseDto {
    pub workflow_id: String,
    pub workflow_version: String,
    pub inputs: Vec<ExposableTargetDto>,
    pub node_configs: Vec<ExposableTargetDto>,
}

/// `POST /recipes` / `PUT /recipes/{id}` body: a user recipe's display metadata,
/// workflow-version pin, and full projection document. `id` is server-generated
/// on POST and path-supplied on PUT.
#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct RecipeWritePayloadDto {
    pub display_name: String,
    pub summary: String,
    pub category: String,
    pub workflow_id: String,
    pub workflow_version: String,
    pub projection: RecipeProjection,
}
