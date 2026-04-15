use std::path::{Path, PathBuf};
use std::sync::RwLock;

use semver::Version;
use tracing::{info, warn};

use crate::error::ExtensionError;
use crate::manifest::{
    ExtensionManifest, OperatorDefinition, parse_manifest, parse_operator_definition,
};
use crate::operator_index::OperatorIndex;
use crate::recipe::{RecipeFile, parse_recipe_definition};
use crate::storage::contribution::StorageContribution;
use crate::ui_contribution::{UIContributionFile, UIContributionKind, parse_ui_contribution};
use crate::validation::{check_compatibility, validate_manifest_schema, validate_operator_schema};

#[derive(Debug, Clone)]
pub struct DiscoveryReport {
    pub activated: Vec<String>,
    pub invalid: Vec<(String, String)>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum ExtensionStatus {
    Active,
    Disabled,
    AvailableBuiltin,
    Activating,
    Degraded,
    Error { diagnostics: Vec<String> },
}

impl ExtensionStatus {
    pub fn as_str(&self) -> &'static str {
        match self {
            Self::Active => "active",
            Self::Disabled => "disabled",
            Self::AvailableBuiltin => "available_builtin",
            Self::Activating => "activating",
            Self::Degraded => "degraded",
            Self::Error { .. } => "error",
        }
    }

    pub fn is_active(&self) -> bool {
        matches!(self, Self::Active | Self::Degraded)
    }
}

#[derive(Debug, Clone, serde::Serialize)]
pub struct LayoutFile {
    pub id: String,
    pub display_name: String,
    pub extension_id: String,
    pub placement: Option<String>,
    pub is_default: bool,
    pub content: serde_json::Value,
}

#[derive(Debug, Clone)]
pub struct ActivatedExtension {
    pub manifest: ExtensionManifest,
    pub operators: Vec<OperatorDefinition>,
    pub recipes: Vec<RecipeFile>,
    pub ui_contributions: Vec<UIContributionFile>,
    pub layouts: Vec<LayoutFile>,
    pub storage: Option<StorageContribution>,
    pub recipe_count: usize,
    pub ui_contribution_count: usize,
    pub validation_errors: Vec<String>,
    pub status: ExtensionStatus,
    pub directory: PathBuf,
}

#[allow(async_fn_in_trait)]
pub trait ExtensionRegistry: Send + Sync {
    async fn discover_and_activate(
        &self,
        extensions_dir: &Path,
        host_version: &Version,
        protocol_version: &Version,
    ) -> Result<DiscoveryReport, ExtensionError>;

    fn list_extensions(&self) -> Vec<ActivatedExtension>;
    fn get_extension(&self, id: &str) -> Option<ActivatedExtension>;
    fn list_operators(&self) -> Vec<OperatorDefinition>;
    fn get_operator(&self, id: &str) -> Option<OperatorDefinition>;
    fn list_recipes(&self) -> Vec<RecipeFile>;
    fn get_recipe(&self, id: &str) -> Option<RecipeFile>;
    fn list_ui_contributions(&self) -> Vec<UIContributionFile>;
    fn list_ui_contributions_by_kind(&self, kind: &UIContributionKind) -> Vec<UIContributionFile>;
    fn list_layouts(&self) -> Vec<LayoutFile>;
    fn get_layout(&self, id: &str) -> Option<LayoutFile>;
}

struct RegistryState {
    extensions: Vec<ActivatedExtension>,
    operator_index: OperatorIndex,
}

pub struct InMemoryExtensionRegistry {
    state: RwLock<RegistryState>,
}

impl InMemoryExtensionRegistry {
    pub async fn from_directory(
        extensions_dir: &Path,
        host_version: &Version,
        protocol_version: &Version,
    ) -> Result<(Self, DiscoveryReport), ExtensionError> {
        let (activated_extensions, operator_entries, report) =
            scan_extensions_dir(extensions_dir, host_version, protocol_version)?;

        let operator_index = OperatorIndex::build(operator_entries);

        let registry = Self {
            state: RwLock::new(RegistryState {
                extensions: activated_extensions,
                operator_index,
            }),
        };

        Ok((registry, report))
    }

    pub fn enable_extension(&self, id: &str) -> Result<(), ExtensionError> {
        let mut state = self
            .state
            .write()
            .map_err(|_| ExtensionError::RegistryLockPoisoned)?;

        let ext = state
            .extensions
            .iter_mut()
            .find(|e| e.manifest.extension.id == id)
            .ok_or_else(|| ExtensionError::ExtensionNotFound(id.to_owned()))?;

        if ext.status == ExtensionStatus::Active {
            return Err(ExtensionError::InvalidStateTransition {
                extension_id: id.to_owned(),
                detail: "extension is already active".to_owned(),
            });
        }

        ext.status = ExtensionStatus::Active;
        Ok(())
    }

    pub fn disable_extension(&self, id: &str) -> Result<(), ExtensionError> {
        let mut state = self
            .state
            .write()
            .map_err(|_| ExtensionError::RegistryLockPoisoned)?;

        let ext = state
            .extensions
            .iter_mut()
            .find(|e| e.manifest.extension.id == id)
            .ok_or_else(|| ExtensionError::ExtensionNotFound(id.to_owned()))?;

        if ext.status == ExtensionStatus::Disabled {
            return Err(ExtensionError::InvalidStateTransition {
                extension_id: id.to_owned(),
                detail: "extension is already disabled".to_owned(),
            });
        }

        ext.status = ExtensionStatus::Disabled;
        Ok(())
    }

    pub fn scan_builtin_extensions_dir(
        &self,
        builtin_dir: &Path,
        host_version: &Version,
        protocol_version: &Version,
    ) -> Result<DiscoveryReport, ExtensionError> {
        let (builtin_extensions, operator_entries, report) =
            scan_builtin_dir(builtin_dir, host_version, protocol_version)?;

        let mut state = self
            .state
            .write()
            .map_err(|_| ExtensionError::RegistryLockPoisoned)?;

        for ext in builtin_extensions {
            let already_registered = state
                .extensions
                .iter()
                .any(|e| e.manifest.extension.id == ext.manifest.extension.id);
            if !already_registered {
                state.extensions.push(ext);
            }
        }

        state.operator_index = OperatorIndex::build(
            rebuild_operator_entries(&state.extensions)
                .into_iter()
                .chain(operator_entries)
                .collect(),
        );

        Ok(report)
    }

    pub fn activate_builtin_extension(
        &self,
        id: &str,
        host_version: &Version,
        protocol_version: &Version,
    ) -> Result<(), ExtensionError> {
        let mut state = self
            .state
            .write()
            .map_err(|_| ExtensionError::RegistryLockPoisoned)?;

        let ext = state
            .extensions
            .iter_mut()
            .find(|e| e.manifest.extension.id == id)
            .ok_or_else(|| ExtensionError::ExtensionNotFound(id.to_owned()))?;

        if ext.status != ExtensionStatus::AvailableBuiltin {
            return Err(ExtensionError::InvalidStateTransition {
                extension_id: id.to_owned(),
                detail: format!(
                    "expected available_builtin state, found {}",
                    ext.status.as_str()
                ),
            });
        }

        ext.status = ExtensionStatus::Activating;

        let ext_dir = ext.directory.clone();
        let manifest = ext.manifest.clone();

        match activate_extension_inner(&ext_dir, &manifest, host_version, protocol_version) {
            Ok(activated) => {
                *ext = activated;
                Ok(())
            }
            Err(e) => {
                ext.status = ExtensionStatus::Error {
                    diagnostics: vec![e.to_string()],
                };
                Err(e)
            }
        }
    }

    pub fn refresh(
        &self,
        extensions_dir: &Path,
        host_version: &Version,
        protocol_version: &Version,
    ) -> Result<DiscoveryReport, ExtensionError> {
        let (activated_extensions, operator_entries, report) =
            scan_extensions_dir(extensions_dir, host_version, protocol_version)?;

        let operator_index = OperatorIndex::build(operator_entries);

        let mut state = self
            .state
            .write()
            .map_err(|_| ExtensionError::RegistryLockPoisoned)?;

        state.extensions = activated_extensions;
        state.operator_index = operator_index;

        Ok(report)
    }
}

impl ExtensionRegistry for InMemoryExtensionRegistry {
    async fn discover_and_activate(
        &self,
        _extensions_dir: &Path,
        _host_version: &Version,
        _protocol_version: &Version,
    ) -> Result<DiscoveryReport, ExtensionError> {
        let state = self
            .state
            .read()
            .map_err(|_| ExtensionError::RegistryLockPoisoned)?;

        Ok(DiscoveryReport {
            activated: state
                .extensions
                .iter()
                .map(|e| e.manifest.extension.id.clone())
                .collect(),
            invalid: Vec::new(),
        })
    }

    fn list_extensions(&self) -> Vec<ActivatedExtension> {
        let state = self.state.read().expect("registry lock poisoned");
        state.extensions.clone()
    }

    fn get_extension(&self, id: &str) -> Option<ActivatedExtension> {
        let state = self.state.read().expect("registry lock poisoned");
        state
            .extensions
            .iter()
            .find(|e| e.manifest.extension.id == id)
            .cloned()
    }

    fn list_operators(&self) -> Vec<OperatorDefinition> {
        let state = self.state.read().expect("registry lock poisoned");
        state.operator_index.all().to_vec()
    }

    fn get_operator(&self, id: &str) -> Option<OperatorDefinition> {
        let state = self.state.read().expect("registry lock poisoned");
        state.operator_index.by_id(id).cloned()
    }

    fn list_recipes(&self) -> Vec<RecipeFile> {
        let state = self.state.read().expect("registry lock poisoned");
        state
            .extensions
            .iter()
            .filter(|e| e.status.is_active())
            .flat_map(|e| e.recipes.clone())
            .collect()
    }

    fn get_recipe(&self, id: &str) -> Option<RecipeFile> {
        let state = self.state.read().expect("registry lock poisoned");
        state
            .extensions
            .iter()
            .filter(|e| e.status.is_active())
            .flat_map(|e| &e.recipes)
            .find(|r| r.recipe.id == id)
            .cloned()
    }

    fn list_ui_contributions(&self) -> Vec<UIContributionFile> {
        let state = self.state.read().expect("registry lock poisoned");
        state
            .extensions
            .iter()
            .filter(|e| e.status.is_active())
            .flat_map(|e| e.ui_contributions.clone())
            .collect()
    }

    fn list_ui_contributions_by_kind(&self, kind: &UIContributionKind) -> Vec<UIContributionFile> {
        let state = self.state.read().expect("registry lock poisoned");
        state
            .extensions
            .iter()
            .filter(|e| e.status.is_active())
            .flat_map(|e| &e.ui_contributions)
            .filter(|c| &c.kind == kind)
            .cloned()
            .collect()
    }

    fn list_layouts(&self) -> Vec<LayoutFile> {
        let state = self.state.read().expect("registry lock poisoned");
        state
            .extensions
            .iter()
            .filter(|e| e.status.is_active())
            .flat_map(|e| e.layouts.clone())
            .collect()
    }

    fn get_layout(&self, id: &str) -> Option<LayoutFile> {
        let state = self.state.read().expect("registry lock poisoned");
        state
            .extensions
            .iter()
            .filter(|e| e.status.is_active())
            .flat_map(|e| &e.layouts)
            .find(|l| l.id == id)
            .cloned()
    }
}

#[allow(clippy::type_complexity)]
fn scan_extensions_dir(
    extensions_dir: &Path,
    host_version: &Version,
    protocol_version: &Version,
) -> Result<
    (
        Vec<ActivatedExtension>,
        Vec<(String, OperatorDefinition)>,
        DiscoveryReport,
    ),
    ExtensionError,
> {
    let mut activated_extensions = Vec::new();
    let mut all_operator_entries = Vec::new();
    let mut report = DiscoveryReport {
        activated: Vec::new(),
        invalid: Vec::new(),
    };

    let entries = read_extension_dirs(extensions_dir)?;

    for entry_path in entries {
        match process_extension(&entry_path, host_version, protocol_version) {
            Ok(ext) => {
                let ext_id = ext.manifest.extension.id.clone();
                for op in &ext.operators {
                    all_operator_entries.push((ext_id.clone(), op.clone()));
                }
                info!(extension_id = %ext_id, "activated extension");
                report.activated.push(ext_id);
                activated_extensions.push(ext);
            }
            Err(e) => {
                let dir_name = entry_path
                    .file_name()
                    .map(|n| n.to_string_lossy().into_owned())
                    .unwrap_or_else(|| entry_path.display().to_string());
                warn!(dir = %dir_name, error = %e, "skipping invalid extension");
                report.invalid.push((dir_name, e.to_string()));
            }
        }
    }

    Ok((activated_extensions, all_operator_entries, report))
}

fn read_extension_dirs(extensions_dir: &Path) -> Result<Vec<PathBuf>, ExtensionError> {
    if !extensions_dir.exists() {
        return Ok(Vec::new());
    }
    let mut dirs = Vec::new();
    let read_dir = std::fs::read_dir(extensions_dir)?;
    for entry in read_dir {
        let entry = entry?;
        if entry.file_type()?.is_dir() {
            dirs.push(entry.path());
        }
    }
    dirs.sort();
    Ok(dirs)
}

fn process_extension(
    ext_dir: &Path,
    host_version: &Version,
    protocol_version: &Version,
) -> Result<ActivatedExtension, ExtensionError> {
    let manifest_path = ext_dir.join("manifest.yaml");
    let manifest = parse_manifest(&manifest_path)?;

    let manifest_json = yaml_to_json_value(&manifest_path)?;
    validate_manifest_schema(&manifest_json)?;
    check_compatibility(&manifest, host_version, protocol_version)?;

    let mut validation_errors = Vec::new();
    let operators = load_operators(ext_dir, &manifest)?;
    let recipes = load_recipes(ext_dir, &manifest, &mut validation_errors);
    let ui_contributions = load_ui_contributions(ext_dir, &mut validation_errors);
    let layouts = load_layouts(ext_dir, &manifest, &mut validation_errors);

    let storage = validate_storage_contribution(&manifest, &mut validation_errors);

    if let Some(ref storage_block) = storage {
        validate_storage_sql_files(ext_dir, storage_block, &mut validation_errors);
    }

    let recipe_count = recipes.len();
    let ui_contribution_count = ui_contributions.len();

    let status = if validation_errors.is_empty() {
        ExtensionStatus::Active
    } else {
        ExtensionStatus::Disabled
    };

    Ok(ActivatedExtension {
        manifest,
        operators,
        recipes,
        ui_contributions,
        layouts,
        storage,
        recipe_count,
        ui_contribution_count,
        validation_errors,
        status,
        directory: ext_dir.to_path_buf(),
    })
}

fn yaml_to_json_value(path: &Path) -> Result<serde_json::Value, ExtensionError> {
    let content = std::fs::read_to_string(path).map_err(|e| ExtensionError::ManifestParse {
        path: path.display().to_string(),
        detail: e.to_string(),
    })?;
    serde_saphyr::from_str(&content).map_err(|e| ExtensionError::ManifestParse {
        path: path.display().to_string(),
        detail: e.to_string(),
    })
}

fn load_operators(
    ext_dir: &Path,
    manifest: &ExtensionManifest,
) -> Result<Vec<OperatorDefinition>, ExtensionError> {
    let file_refs = match &manifest.operators {
        Some(refs) => refs,
        None => return Ok(Vec::new()),
    };

    let mut operators = Vec::with_capacity(file_refs.len());
    for file_ref in file_refs {
        let op_path = ext_dir.join(&file_ref.file);
        let op = parse_operator_definition(&op_path)?;

        let op_json = yaml_to_json_value_for_operator(&op_path)?;
        validate_operator_schema(&op_json)?;

        operators.push(op);
    }
    Ok(operators)
}

fn yaml_to_json_value_for_operator(path: &Path) -> Result<serde_json::Value, ExtensionError> {
    let content = std::fs::read_to_string(path).map_err(|e| ExtensionError::OperatorParse {
        path: path.display().to_string(),
        detail: e.to_string(),
    })?;
    serde_saphyr::from_str(&content).map_err(|e| ExtensionError::OperatorParse {
        path: path.display().to_string(),
        detail: e.to_string(),
    })
}

fn load_recipes(
    ext_dir: &Path,
    manifest: &ExtensionManifest,
    validation_errors: &mut Vec<String>,
) -> Vec<RecipeFile> {
    let file_refs = match &manifest.recipes {
        Some(refs) => refs,
        None => return Vec::new(),
    };

    let mut recipes = Vec::with_capacity(file_refs.len());
    for file_ref in file_refs {
        let recipe_path = ext_dir.join(&file_ref.file);
        match parse_recipe_definition(&recipe_path) {
            Ok(recipe) => recipes.push(recipe),
            Err(e) => {
                let msg = format!("recipe parse failed for {}: {e}", recipe_path.display());
                warn!("{msg}");
                validation_errors.push(msg);
            }
        }
    }
    recipes
}

fn load_ui_contributions(
    ext_dir: &Path,
    validation_errors: &mut Vec<String>,
) -> Vec<UIContributionFile> {
    let ui_dir = ext_dir.join("ui");
    if !ui_dir.is_dir() {
        return Vec::new();
    }

    let entries = match std::fs::read_dir(&ui_dir) {
        Ok(entries) => entries,
        Err(e) => {
            validation_errors.push(format!("failed to read ui/ directory: {e}"));
            return Vec::new();
        }
    };

    let mut contributions = Vec::new();
    for entry in entries {
        let entry = match entry {
            Ok(e) => e,
            Err(e) => {
                validation_errors.push(format!("failed to read ui/ entry: {e}"));
                continue;
            }
        };

        let path = entry.path();
        let is_yaml = path
            .extension()
            .map(|ext| ext == "yaml" || ext == "yml")
            .unwrap_or(false);
        if !is_yaml {
            continue;
        }

        match parse_ui_contribution(&path) {
            Ok(contribution) => contributions.push(contribution),
            Err(e) => {
                let msg = format!("ui contribution parse failed for {}: {e}", path.display());
                warn!("{msg}");
                validation_errors.push(msg);
            }
        }
    }
    contributions
}

fn load_layouts(
    ext_dir: &Path,
    manifest: &ExtensionManifest,
    validation_errors: &mut Vec<String>,
) -> Vec<LayoutFile> {
    let layout_refs = match manifest.ui.as_ref().and_then(|ui| ui.layouts.as_ref()) {
        Some(refs) => refs,
        None => return Vec::new(),
    };

    let ext_id = &manifest.extension.id;
    let mut layouts = Vec::with_capacity(layout_refs.len());

    for layout_ref in layout_refs {
        let layout_path = ext_dir.join(&layout_ref.file);
        let raw = match std::fs::read_to_string(&layout_path) {
            Ok(content) => content,
            Err(e) => {
                let msg = format!("layout file '{}' not readable: {e}", layout_path.display());
                warn!("{msg}");
                validation_errors.push(msg);
                continue;
            }
        };

        let content: serde_json::Value = match serde_saphyr::from_str(&raw) {
            Ok(v) => v,
            Err(e) => {
                let msg = format!("layout file '{}' parse failed: {e}", layout_path.display());
                warn!("{msg}");
                validation_errors.push(msg);
                continue;
            }
        };

        let id = content
            .get("id")
            .and_then(|v| v.as_str())
            .unwrap_or("")
            .to_owned();
        let display_name = content
            .get("displayName")
            .and_then(|v| v.as_str())
            .unwrap_or("")
            .to_owned();

        if id.is_empty() {
            let msg = format!("layout file '{}' missing 'id' field", layout_path.display());
            warn!("{msg}");
            validation_errors.push(msg);
            continue;
        }

        layouts.push(LayoutFile {
            id,
            display_name,
            extension_id: ext_id.clone(),
            placement: layout_ref.placement.clone(),
            is_default: layout_ref.default.unwrap_or(false),
            content,
        });
    }

    layouts
}

fn validate_storage_contribution(
    manifest: &ExtensionManifest,
    validation_errors: &mut Vec<String>,
) -> Option<StorageContribution> {
    let storage = manifest.storage.as_ref()?;

    let has_capability = manifest
        .capabilities
        .as_ref()
        .map(|caps| caps.iter().any(|c| c == "storage.schema_contribute"))
        .unwrap_or(false);

    if !has_capability {
        validation_errors.push(
            "extension declares storage block but missing 'storage.schema_contribute' capability"
                .to_owned(),
        );
    }

    if let Err(errs) = storage.validate() {
        validation_errors.extend(errs);
    }

    Some(storage.clone())
}

fn validate_storage_sql_files(
    ext_dir: &Path,
    storage: &StorageContribution,
    validation_errors: &mut Vec<String>,
) {
    use crate::storage::sql_validator;

    let effective_prefix = storage.effective_prefix();

    for file_ref in &storage.migrations.files {
        let file_path = ext_dir.join(&file_ref.path);
        let raw_sql = match std::fs::read_to_string(&file_path) {
            Ok(content) => content,
            Err(e) => {
                validation_errors.push(format!(
                    "storage migration file '{}' not readable: {e}",
                    file_path.display()
                ));
                continue;
            }
        };

        let expanded = sql_validator::expand_prefix(&raw_sql, &effective_prefix);
        let report = sql_validator::validate_sql(&expanded, &effective_prefix);

        for err in &report.errors {
            validation_errors.push(format!("migration '{}': {err}", file_ref.id));
        }
    }
}

#[allow(clippy::type_complexity)]
fn scan_builtin_dir(
    builtin_dir: &Path,
    host_version: &Version,
    protocol_version: &Version,
) -> Result<
    (
        Vec<ActivatedExtension>,
        Vec<(String, OperatorDefinition)>,
        DiscoveryReport,
    ),
    ExtensionError,
> {
    let mut extensions = Vec::new();
    let mut all_operator_entries = Vec::new();
    let mut report = DiscoveryReport {
        activated: Vec::new(),
        invalid: Vec::new(),
    };

    let entries = read_extension_dirs(builtin_dir)?;

    for entry_path in entries {
        match process_builtin_extension(&entry_path, host_version, protocol_version) {
            Ok(ext) => {
                let ext_id = ext.manifest.extension.id.clone();
                for op in &ext.operators {
                    all_operator_entries.push((ext_id.clone(), op.clone()));
                }
                info!(extension_id = %ext_id, "discovered builtin extension");
                report.activated.push(ext_id);
                extensions.push(ext);
            }
            Err(e) => {
                let dir_name = entry_path
                    .file_name()
                    .map(|n| n.to_string_lossy().into_owned())
                    .unwrap_or_else(|| entry_path.display().to_string());
                warn!(dir = %dir_name, error = %e, "skipping invalid builtin extension");
                report.invalid.push((dir_name, e.to_string()));
            }
        }
    }

    Ok((extensions, all_operator_entries, report))
}

fn process_builtin_extension(
    ext_dir: &Path,
    host_version: &Version,
    protocol_version: &Version,
) -> Result<ActivatedExtension, ExtensionError> {
    let manifest_path = ext_dir.join("manifest.yaml");
    let manifest = parse_manifest(&manifest_path)?;

    let manifest_json = yaml_to_json_value(&manifest_path)?;
    validate_manifest_schema(&manifest_json)?;
    check_compatibility(&manifest, host_version, protocol_version)?;

    Ok(ActivatedExtension {
        manifest,
        operators: Vec::new(),
        recipes: Vec::new(),
        ui_contributions: Vec::new(),
        layouts: Vec::new(),
        storage: None,
        recipe_count: 0,
        ui_contribution_count: 0,
        validation_errors: Vec::new(),
        status: ExtensionStatus::AvailableBuiltin,
        directory: ext_dir.to_path_buf(),
    })
}

fn activate_extension_inner(
    ext_dir: &Path,
    manifest: &ExtensionManifest,
    host_version: &Version,
    protocol_version: &Version,
) -> Result<ActivatedExtension, ExtensionError> {
    let manifest_path = ext_dir.join("manifest.yaml");
    let manifest_json = yaml_to_json_value(&manifest_path)?;
    validate_manifest_schema(&manifest_json)?;
    check_compatibility(manifest, host_version, protocol_version)?;

    let mut validation_errors = Vec::new();
    let operators = load_operators(ext_dir, manifest)?;
    let recipes = load_recipes(ext_dir, manifest, &mut validation_errors);
    let ui_contributions = load_ui_contributions(ext_dir, &mut validation_errors);
    let layouts = load_layouts(ext_dir, manifest, &mut validation_errors);

    let storage = validate_storage_contribution(manifest, &mut validation_errors);

    if let Some(ref storage_block) = storage {
        validate_storage_sql_files(ext_dir, storage_block, &mut validation_errors);
    }

    let recipe_count = recipes.len();
    let ui_contribution_count = ui_contributions.len();

    let status = if validation_errors.is_empty() {
        ExtensionStatus::Active
    } else {
        ExtensionStatus::Error {
            diagnostics: validation_errors.clone(),
        }
    };

    Ok(ActivatedExtension {
        manifest: manifest.clone(),
        operators,
        recipes,
        ui_contributions,
        layouts,
        storage,
        recipe_count,
        ui_contribution_count,
        validation_errors,
        status,
        directory: ext_dir.to_path_buf(),
    })
}

fn rebuild_operator_entries(
    extensions: &[ActivatedExtension],
) -> Vec<(String, OperatorDefinition)> {
    extensions
        .iter()
        .filter(|e| e.status.is_active())
        .flat_map(|e| {
            let ext_id = e.manifest.extension.id.clone();
            e.operators
                .iter()
                .map(move |op| (ext_id.clone(), op.clone()))
        })
        .collect()
}
