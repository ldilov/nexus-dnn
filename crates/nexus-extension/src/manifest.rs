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
    #[serde(default)]
    pub model_dependencies: Vec<ModelDependencyManifest>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct ModelDependencyManifest {
    pub family: String,
    pub version: String,
    #[serde(default)]
    pub revision: Option<String>,
    #[serde(default)]
    pub allow_unpinned: bool,
    #[serde(default, deserialize_with = "deserialize_param_count")]
    pub min_params: Option<u64>,
    #[serde(default)]
    pub quantization: Option<String>,
    #[serde(default)]
    pub variant: Option<String>,
    #[serde(default = "default_required")]
    pub required: bool,
}

fn default_required() -> bool {
    true
}

fn deserialize_param_count<'de, D>(d: D) -> Result<Option<u64>, D::Error>
where
    D: serde::Deserializer<'de>,
{
    use serde::de::Error;
    let raw: Option<serde_json::Value> = Option::deserialize(d)?;
    let Some(v) = raw else { return Ok(None) };
    match v {
        serde_json::Value::Null => Ok(None),
        serde_json::Value::Number(n) => n
            .as_u64()
            .map(Some)
            .ok_or_else(|| D::Error::custom("min_params must be non-negative")),
        serde_json::Value::String(s) => parse_param_count(&s).map(Some).map_err(D::Error::custom),
        _ => Err(D::Error::custom(
            "min_params must be number or string like '7B'",
        )),
    }
}

fn parse_param_count(s: &str) -> Result<u64, String> {
    let s = s.trim();
    if s.is_empty() {
        return Err("empty param_count".into());
    }
    let (num_part, mult) = match s.chars().last().unwrap().to_ascii_uppercase() {
        'B' => (&s[..s.len() - 1], 1_000_000_000u64),
        'M' => (&s[..s.len() - 1], 1_000_000u64),
        'K' => (&s[..s.len() - 1], 1_000u64),
        _ => (s, 1u64),
    };
    let n: f64 = num_part
        .parse()
        .map_err(|e: std::num::ParseFloatError| e.to_string())?;
    Ok((n * mult as f64) as u64)
}

pub fn validate_model_dependency(dep: &ModelDependencyManifest) -> Result<(), String> {
    if dep.revision.is_none() && !dep.allow_unpinned {
        return Err("revision required; set allow_unpinned: true to opt out".to_string());
    }
    Ok(())
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
