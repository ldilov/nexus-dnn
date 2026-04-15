//! Storage-contribution validation: capability presence + SQL migration file
//! schema checks.

use std::path::Path;

use crate::manifest::ExtensionManifest;
use crate::storage::contribution::StorageContribution;

pub(super) fn validate_storage_contribution(
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

pub(super) fn validate_storage_sql_files(
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
