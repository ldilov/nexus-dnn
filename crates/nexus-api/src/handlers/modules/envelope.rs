//! DTOs for the /api/v1/modules read-aggregate surface (spec 019 FR-027).
//!
//! Nothing here is persisted — these types are composed at request time from
//! `extensions` / `recipes` / `workflows` / `deployments` by the aggregator.

use serde::{Deserialize, Serialize};

use super::ModuleId;

/// Top-level envelope returned by `GET /api/v1/modules`.
#[derive(Serialize, Debug, Clone)]
pub struct ModuleListEnvelope {
    pub modules: Vec<ModuleSummary>,
    pub total: u32,
    pub limit: u32,
    pub offset: u32,
}

#[derive(Serialize, Debug, Clone)]
#[serde(rename_all = "snake_case")]
pub enum ModuleSourceKind {
    Extension,
    User,
    Blank,
}

#[derive(Serialize, Debug, Clone)]
pub struct ModuleSummary {
    pub module_id: ModuleId,
    pub source_kind: ModuleSourceKind,
    pub extension_id: Option<String>,
    pub display_name: String,
    pub icon: ModuleIcon,
    pub version: Option<String>,
    pub tags: Vec<String>,
    pub blueprints: Vec<RecipeRef>,
    pub default_runtime_binding_ref: Option<String>,
    pub default_model_binding_ref: Option<String>,
    pub deployments: DeploymentCounts,
    pub compatibility_summary: CompatibilitySummary,
}

#[derive(Serialize, Debug, Clone)]
#[serde(tag = "kind", rename_all = "snake_case")]
pub enum ModuleIcon {
    Symbol {
        value: String,
    },
    Svg {
        value: String,
    },
    Fallback {
        value: &'static str,
        fallback_hash: u32,
    },
}

impl ModuleIcon {
    pub fn from_resolved(r: nexus_extension::ResolvedIcon) -> Self {
        match r {
            nexus_extension::ResolvedIcon::Symbol(v) => ModuleIcon::Symbol { value: v },
            nexus_extension::ResolvedIcon::Svg(v) => ModuleIcon::Svg { value: v },
            nexus_extension::ResolvedIcon::Fallback {
                glyph,
                fallback_hash,
            } => ModuleIcon::Fallback {
                value: glyph,
                fallback_hash,
            },
            _ => ModuleIcon::Symbol {
                value: "question_mark".into(),
            },
        }
    }
}

#[derive(Serialize, Debug, Clone)]
pub struct RecipeRef {
    pub recipe_id: String,
    pub display_name: String,
    pub description: Option<String>,
    pub step_count: u32,
    pub tags: Vec<String>,
    pub is_primary: bool,
}

#[derive(Serialize, Debug, Clone, Default)]
pub struct DeploymentCounts {
    pub total: u32,
    pub by_state: std::collections::HashMap<String, u32>,
    pub by_restore_state: std::collections::HashMap<String, u32>,
}

#[derive(Serialize, Debug, Clone, Default)]
pub struct CompatibilitySummary {
    pub overall: String,
    pub warning_count: u32,
}

/// Response body for `GET /api/v1/modules/{module_id}` (FR-030).
#[derive(Serialize, Debug, Clone)]
pub struct ModuleDetail {
    pub summary: ModuleSummary,
    pub deployments: Vec<DeploymentRow>,
    pub recent_runs: Vec<RunSummary>,
}

#[derive(Serialize, Debug, Clone)]
pub struct DeploymentRow {
    pub deployment_id: String,
    pub display_name: String,
    pub state: String,
    pub restore_state: String,
    pub current_revision_id: Option<String>,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Serialize, Debug, Clone)]
pub struct RunSummary {
    pub run_id: String,
    pub status: String,
    pub created_at: String,
}

/// Request body for `POST /api/v1/modules/{id}/deployments` (FR-028).
#[derive(Deserialize, Debug, Clone, Default)]
#[serde(default)]
pub struct DeployFromModuleRequest {
    pub recipe_id: Option<String>,
    pub display_name: Option<String>,
    pub runtime_binding_overrides: Option<serde_json::Value>,
    pub model_binding_overrides: Option<serde_json::Value>,
    pub parameter_overlays: Option<serde_json::Value>,
    pub workflow_patch: Option<serde_json::Value>,
}

/// Response body for `POST /api/v1/modules/user:draft:{uuid}/materialize`.
#[derive(Serialize, Debug, Clone)]
pub struct MaterializeResponse {
    pub module_id: ModuleId,
    pub deployment_id: String,
    pub deployment_revision_id: String,
}

/// Request body for `POST /api/v1/modules/user:draft:{uuid}/materialize`.
#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(default)]
pub struct MaterializeRequest {
    pub workflow_payload: serde_json::Value,
    pub display_name: Option<String>,
    pub runtime_binding_overrides: Option<serde_json::Value>,
    pub model_binding_overrides: Option<serde_json::Value>,
    pub parameter_overlays: Option<serde_json::Value>,
}

impl Default for MaterializeRequest {
    fn default() -> Self {
        Self {
            workflow_payload: serde_json::Value::Null,
            display_name: None,
            runtime_binding_overrides: None,
            model_binding_overrides: None,
            parameter_overlays: None,
        }
    }
}

/// Ephemeral plan returned by blueprint dry-run (FR-029).
#[derive(Serialize, Debug, Clone)]
pub struct DryRunPlan {
    pub plan_id: String,
    pub steps: Vec<DryRunStep>,
    pub warnings: Vec<String>,
    pub diagnostics: Vec<String>,
}

#[derive(Serialize, Debug, Clone)]
pub struct DryRunStep {
    pub index: u32,
    pub op_code: String,
    pub display_name: String,
}

#[derive(Deserialize, Debug, Clone, Default)]
#[serde(default)]
pub struct DryRunRequest {
    pub recipe_id: Option<String>,
    pub parameter_overlays: Option<serde_json::Value>,
    pub runtime_binding_overrides: Option<serde_json::Value>,
}
