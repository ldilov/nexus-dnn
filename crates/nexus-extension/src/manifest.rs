use std::collections::HashMap;
use std::path::Path;

use nexus_protocol::RuntimeFamily;
use serde::Deserialize;

use crate::error::ExtensionError;
use crate::storage::contribution::StorageContribution;

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
}

/// A host-managed runtime this extension requires to function. Resolved
/// against `host_runtime_installs` at enable time (spec 011 US1).
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
    serde_saphyr::from_str(&content).map_err(|e| ExtensionError::ManifestParse {
        path: path.display().to_string(),
        detail: e.to_string(),
    })
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
