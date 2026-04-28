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
    /// Spec 035 — generic dependency installer plan. Parsed at extension load time
    /// into [`nexus_extension_deps::plan::InstallPlan`] via [`Self::resolve_dependencies_block`].
    #[serde(default)]
    pub dependencies: Option<nexus_extension_deps::plan::DependenciesBlock>,
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

/// Spec 035 FR-006 — translate legacy `runtime_dependencies[]` into synthetic
/// `runtime`-typed steps for the generic dep installer. If the manifest already
/// declares an explicit `dependencies:` block, the legacy field is ignored (the
/// explicit form wins). Returns `None` if neither source produces any steps.
///
/// This pure function makes no I/O calls and performs no handler validation; the
/// caller is expected to feed the result into
/// [`nexus_extension_deps::plan::parse_dependencies_block`] together with a
/// [`nexus_extension_deps::handler::HandlerRegistry`].
pub fn resolve_dependencies_block(
    manifest: &ExtensionManifest,
) -> Option<nexus_extension_deps::plan::DependenciesBlock> {
    use nexus_extension_deps::plan::{DependenciesBlock, Step};

    if let Some(block) = &manifest.dependencies
        && !block.steps.is_empty()
    {
        return Some(block.clone());
    }
    if manifest.runtime_dependencies.is_empty() {
        return None;
    }

    let steps = manifest
        .runtime_dependencies
        .iter()
        .enumerate()
        .map(|(idx, dep)| {
            let id = if manifest.runtime_dependencies.len() == 1 {
                "runtime".to_owned()
            } else {
                format!("runtime_{idx}")
            };
            let mut spec = serde_json::Map::new();
            spec.insert(
                "family".to_owned(),
                serde_json::Value::String(dep.family.clone()),
            );
            if let Some(version) = &dep.version {
                spec.insert(
                    "version".to_owned(),
                    serde_json::Value::String(version.clone()),
                );
            }
            if !dep.acceleration.is_empty() {
                spec.insert(
                    "accelerator_profiles".to_owned(),
                    serde_json::Value::Array(
                        dep.acceleration
                            .iter()
                            .cloned()
                            .map(serde_json::Value::String)
                            .collect(),
                    ),
                );
            }
            Step {
                id,
                step_type: "runtime".to_owned(),
                requires: Vec::new(),
                spec: serde_json::Value::Object(spec),
            }
        })
        .collect();

    Some(DependenciesBlock { steps })
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

#[cfg(test)]
mod resolve_deps_tests {
    use super::*;

    fn empty_manifest() -> ExtensionManifest {
        serde_yaml::from_str(
            r#"
spec_version: "0.1"
extension:
  id: "test.ext"
  version: "0.1.0"
compatibility:
  host_api: ">=0.1.0"
  protocol: ">=0.1.0"
runtime:
  family: "native"
  entrypoint: "bin/x"
"#,
        )
        .expect("manifest fixture")
    }

    #[test]
    fn returns_none_when_no_dependencies_anywhere() {
        let m = empty_manifest();
        assert!(resolve_dependencies_block(&m).is_none());
    }

    #[test]
    fn translates_single_runtime_dependency_to_one_step() {
        let mut m = empty_manifest();
        m.runtime_dependencies = vec![RuntimeDependency {
            family: "python".to_owned(),
            version: Some(">=3.11".to_owned()),
            acceleration: vec!["cpu".to_owned(), "cuda12".to_owned()],
        }];
        let block = resolve_dependencies_block(&m).expect("block");
        assert_eq!(block.steps.len(), 1);
        let step = &block.steps[0];
        assert_eq!(step.id, "runtime");
        assert_eq!(step.step_type, "runtime");
        assert_eq!(step.requires, Vec::<String>::new());
        let spec = step.spec.as_object().unwrap();
        assert_eq!(spec["family"], "python");
        assert_eq!(spec["version"], ">=3.11");
        assert_eq!(spec["accelerator_profiles"][0], "cpu");
        assert_eq!(spec["accelerator_profiles"][1], "cuda12");
    }

    #[test]
    fn translates_multiple_runtime_dependencies_with_indexed_ids() {
        let mut m = empty_manifest();
        m.runtime_dependencies = vec![
            RuntimeDependency {
                family: "python".to_owned(),
                version: None,
                acceleration: Vec::new(),
            },
            RuntimeDependency {
                family: "node".to_owned(),
                version: None,
                acceleration: Vec::new(),
            },
        ];
        let block = resolve_dependencies_block(&m).expect("block");
        assert_eq!(block.steps.len(), 2);
        assert_eq!(block.steps[0].id, "runtime_0");
        assert_eq!(block.steps[1].id, "runtime_1");
    }

    #[test]
    fn explicit_dependencies_block_wins_over_legacy() {
        use nexus_extension_deps::plan::{DependenciesBlock, Step};
        let mut m = empty_manifest();
        m.runtime_dependencies = vec![RuntimeDependency {
            family: "python".to_owned(),
            version: None,
            acceleration: Vec::new(),
        }];
        m.dependencies = Some(DependenciesBlock {
            steps: vec![Step {
                id: "explicit".to_owned(),
                step_type: "validation".to_owned(),
                requires: Vec::new(),
                spec: serde_json::Value::Null,
            }],
        });
        let block = resolve_dependencies_block(&m).expect("block");
        assert_eq!(block.steps.len(), 1);
        assert_eq!(block.steps[0].id, "explicit");
        assert_eq!(block.steps[0].step_type, "validation");
    }
}
