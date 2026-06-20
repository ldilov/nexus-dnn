use std::path::{Path, PathBuf};

use semver::Version;
use tracing::{info, warn};

use crate::error::ExtensionError;
use crate::manifest::{ExtensionManifest, OperatorDefinition, parse_manifest};
use crate::validation::{
    check_compatibility, validate_config_schema_compiles, validate_manifest_schema,
};

use super::loaders::{
    load_layouts, load_operators, load_recipes, load_ui_contributions, yaml_to_json_value,
};
use super::storage_validation::{validate_storage_contribution, validate_storage_sql_files};
use super::types::{ActivatedExtension, DiscoveryReport, ExtensionStatus};

pub(super) fn scan_extensions_dir(
    extensions_dir: &Path,
    host_version: &Version,
    protocol_version: &Version,
) -> ScanOutput {
    scan_dir_with(
        extensions_dir,
        host_version,
        protocol_version,
        process_extension,
        "activated extension",
        "skipping invalid extension",
    )
}

pub(super) fn scan_builtin_dir(
    builtin_dir: &Path,
    host_version: &Version,
    protocol_version: &Version,
) -> ScanOutput {
    scan_dir_with(
        builtin_dir,
        host_version,
        protocol_version,
        process_builtin_extension,
        "discovered builtin extension",
        "skipping invalid builtin extension",
    )
}

/// Canonical return shape for both scanner entry points.
#[allow(clippy::type_complexity)]
type ScanOutput = Result<
    (
        Vec<ActivatedExtension>,
        Vec<(String, OperatorDefinition)>,
        DiscoveryReport,
    ),
    ExtensionError,
>;

/// Shared scan loop for `scan_extensions_dir` and `scan_builtin_dir`.
fn scan_dir_with<F>(
    dir: &Path,
    host_version: &Version,
    protocol_version: &Version,
    process_fn: F,
    ok_message: &'static str,
    err_message: &'static str,
) -> ScanOutput
where
    F: Fn(&Path, &Version, &Version) -> Result<ActivatedExtension, ExtensionError>,
{
    let mut extensions = Vec::new();
    let mut all_operator_entries = Vec::new();
    let mut report = DiscoveryReport {
        activated: Vec::new(),
        invalid: Vec::new(),
    };

    let entries = read_extension_dirs(dir)?;

    for entry_path in entries {
        match process_fn(&entry_path, host_version, protocol_version) {
            Ok(ext) => {
                let ext_id = ext.manifest.extension.id.clone();
                for op in &ext.operators {
                    all_operator_entries.push((ext_id.clone(), op.clone()));
                }
                info!(extension_id = %ext_id, "{ok_message}");
                report.activated.push(ext_id);
                extensions.push(ext);
            }
            Err(e) => {
                let dir_name = entry_path
                    .file_name()
                    .map(|n| n.to_string_lossy().into_owned())
                    .unwrap_or_else(|| entry_path.display().to_string());
                warn!(dir = %dir_name, error = %e, "{err_message}");
                report.invalid.push((dir_name, e.to_string()));
            }
        }
    }

    Ok((extensions, all_operator_entries, report))
}

fn read_extension_dirs(extensions_dir: &Path) -> Result<Vec<PathBuf>, ExtensionError> {
    if !extensions_dir.exists() {
        return Ok(Vec::new());
    }
    let mut dirs = Vec::new();
    let read_dir = std::fs::read_dir(extensions_dir)?;
    for entry in read_dir {
        let entry = entry?;
        if !entry.file_type()?.is_dir() {
            continue;
        }
        let path = entry.path();
        if !path.join("manifest.yaml").is_file() {
            continue;
        }
        dirs.push(path);
    }
    dirs.sort();
    Ok(dirs)
}

pub(super) fn process_extension(
    ext_dir: &Path,
    host_version: &Version,
    protocol_version: &Version,
) -> Result<ActivatedExtension, ExtensionError> {
    let manifest_path = ext_dir.join("manifest.yaml");
    let manifest = parse_manifest(&manifest_path)?;

    let manifest_json = yaml_to_json_value(&manifest_path)?;
    validate_manifest_schema(&manifest_json)?;
    validate_config_schema_compiles(&manifest)?;
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
        install_plan: None,
    })
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
    validate_config_schema_compiles(&manifest)?;
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
        install_plan: None,
    })
}

pub(super) fn activate_extension_inner(
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
        install_plan: None,
    })
}

pub(super) fn rebuild_operator_entries(
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
