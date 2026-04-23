use std::collections::HashMap;
use std::path::Path;

use nexus_protocol::{ModelDependency, RuntimeFamily, validate_revision_pinning};
use serde::Deserialize;

use crate::error::ExtensionError;
use crate::storage::contribution::StorageContribution;

pub use nexus_protocol::ModelDependency as ModelDependencyManifest;
pub fn validate_model_dependency(dep: &ModelDependency) -> Result<(), String> {
    validate_revision_pinning(dep)
}

#[derive(Debug, Clone, Deserialize)]
pub struct ExtensionManifest {
    pub spec_version: String,
    pub extension: ExtensionInfo,
    pub compatibility: CompatibilitySpec,
    pub runtime: RuntimeSpec,
    pub capabilities: Option<Vec<String>>,
    pub operators: Option<Vec<FileRef>>,
    pub recipes: Option<Vec<FileRef>>,
    pub ui: Option<UiDeclaration>,
    pub storage: Option<StorageContribution>,
    #[serde(default)]
    pub runtime_dependencies: Vec<RuntimeDependency>,
    #[serde(default)]
    pub model_dependencies: Vec<ModelDependency>,
    /// Spec 032 — backend runtimes this extension contributes to the host
    /// catalog. Empty by default for backward compat with existing extensions.
    #[serde(default)]
    pub backend_runtimes: Vec<BackendRuntimeContribution>,
}

/// One row contributed to `backend_runtime_catalog` (spec 032). The host
/// validates this entry's shape, computes a `ContributionChecksum`, and
/// upserts on extension activation.
///
/// Field types are deliberately plain strings here — domain validation
/// (regex, family canonical lookup, path-traversal check) lives in
/// [`super::backend_runtime_contribution`] so this crate stays free of the
/// `nexus-backend-runtimes` dependency.
#[derive(Debug, Clone, Deserialize, PartialEq, Eq)]
#[serde(deny_unknown_fields)]
pub struct BackendRuntimeContribution {
    pub runtime_id: String,
    pub display_name: String,
    pub family: String,
    pub transport: String,
    pub worker_entrypoint: String,
    pub version_manifest: String,
    #[serde(default)]
    pub capability_tags: Vec<String>,
    #[serde(default)]
    pub supported_roles: Vec<String>,
}

/// A host-managed runtime this extension requires to function. Resolved
#[derive(Debug, Clone, Deserialize)]
pub struct RuntimeDependency {
    pub family: String,
    #[serde(default)]
    pub version: Option<String>,
    #[serde(default)]
    pub acceleration: Vec<String>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct ExtensionInfo {
    pub id: String,
    pub version: String,
    pub name: Option<String>,
    pub description: Option<String>,
    pub publisher: Option<String>,
    #[serde(default)]
    pub icon: Option<ManifestIcon>,
}

/// Optional icon declaration in an extension manifest (spec 019 FR-I01).
/// Exactly one of `symbol` or `svg` SHOULD be set; if both are set, `svg`
/// wins and the ingest pipeline emits a `manifest.icon.both_set` warning.
/// If neither is set, the host falls back to FNV-1a hashing at read time.
///
/// Intentionally NOT `#[non_exhaustive]` — this type is a manifest schema
/// declaration consumed by extension authors, and the spec treats additions
/// as a compatibility break. New icon fields must arrive via an explicit
/// schema version bump, not by silent expansion.
#[derive(Debug, Clone, Deserialize, PartialEq, Eq, Default)]
#[serde(deny_unknown_fields)]
pub struct ManifestIcon {
    #[serde(default)]
    pub symbol: Option<String>,
    #[serde(default)]
    pub svg: Option<String>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct CompatibilitySpec {
    pub host_api: String,
    pub protocol: String,
    pub platforms: Option<Vec<String>>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct RuntimeSpec {
    pub family: RuntimeFamily,
    pub entrypoint: String,
    pub environment: Option<EnvironmentSpec>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct EnvironmentSpec {
    pub python_version: Option<String>,
    pub cuda_version: Option<String>,
    pub pip_dependencies: Option<Vec<String>>,
    pub env_vars: Option<HashMap<String, String>>,
}

#[derive(Debug, Clone, Deserialize, Default)]
pub struct UiDeclaration {
    pub layouts: Option<Vec<LayoutRef>>,
    pub contributions: Option<Vec<FileRef>>,
    #[serde(default)]
    pub assets: Option<UiAssetsDir>,
    #[serde(default)]
    pub custom_elements: Option<Vec<CustomElementSpec>>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct UiAssetsDir {
    pub root: String,
}

#[derive(Debug, Clone, Deserialize)]
pub struct CustomElementSpec {
    pub tag: String,
    pub module: String,
    #[serde(default = "default_custom_element_entry")]
    pub entry: String,
}

fn default_custom_element_entry() -> String {
    "register".to_string()
}

#[derive(Debug, Clone, Deserialize)]
pub struct LayoutRef {
    pub file: String,
    pub placement: Option<String>,
    pub default: Option<bool>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct FileRef {
    pub file: String,
}

#[derive(Debug, Clone, Deserialize)]
pub struct OperatorDefinition {
    pub spec_version: String,
    pub operator: OperatorInfo,
    pub execution: Option<ExecutionSpec>,
    pub inputs: Option<Vec<PortSpec>>,
    pub outputs: Option<Vec<PortSpec>>,
    pub config_schema: Option<serde_json::Value>,
    pub resources: Option<ResourceSpec>,
    /// Optional UI hints (icon, accent, widget configs, preview slot). Loosely
    /// typed so extensions can evolve the shape without a host release; the
    /// frontend parses and drops unrecognized fields gracefully.
    pub ui: Option<serde_json::Value>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct OperatorInfo {
    pub id: String,
    pub version: String,
    pub display_name: Option<String>,
    pub description: Option<String>,
    pub category: Option<String>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct ExecutionSpec {
    pub mode: Option<String>,
    pub cacheable: Option<bool>,
    pub resumable: Option<bool>,
}

#[derive(Debug, Clone, Deserialize, serde::Serialize)]
pub struct PortSpec {
    pub name: String,
    #[serde(rename = "type")]
    pub port_type: String,
    pub required: Option<bool>,
    pub default: Option<serde_json::Value>,
}

#[derive(Debug, Clone, Deserialize, serde::Serialize)]
pub struct ResourceSpec {
    pub gpu: Option<bool>,
    pub min_vram_mb: Option<u64>,
    pub cpu_cores: Option<u32>,
}

pub fn parse_manifest(path: &Path) -> Result<ExtensionManifest, ExtensionError> {
    let content = std::fs::read_to_string(path).map_err(|e| ExtensionError::ManifestParse {
        path: path.display().to_string(),
        detail: e.to_string(),
    })?;
    let manifest: ExtensionManifest =
        serde_saphyr::from_str(&content).map_err(|e| ExtensionError::ManifestParse {
            path: path.display().to_string(),
            detail: e.to_string(),
        })?;
    for dep in &manifest.model_dependencies {
        validate_model_dependency(dep).map_err(|detail| ExtensionError::ManifestParse {
            path: path.display().to_string(),
            detail,
        })?;
    }
    Ok(manifest)
}

pub fn parse_operator_definition(path: &Path) -> Result<OperatorDefinition, ExtensionError> {
    let content = std::fs::read_to_string(path).map_err(|e| ExtensionError::OperatorParse {
        path: path.display().to_string(),
        detail: e.to_string(),
    })?;
    serde_saphyr::from_str(&content).map_err(|e| ExtensionError::OperatorParse {
        path: path.display().to_string(),
        detail: e.to_string(),
    })
}
