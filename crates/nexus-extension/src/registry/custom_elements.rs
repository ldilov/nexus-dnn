use std::collections::HashSet;
use std::path::{Path, PathBuf};

use crate::error::ExtensionError;
use crate::manifest::{CustomElementSpec, UiAssetsDir};

use super::types::ActivatedExtension;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct CustomElementRegistration {
    pub extension_id: String,
    pub tag: String,
    pub module: String,
    pub entry: String,
    pub assets_root_abs: PathBuf,
    pub module_abs: PathBuf,
}

pub fn is_valid_tag(tag: &str) -> bool {
    let mut segments = tag.split('-');
    let Some(first) = segments.next() else { return false };
    if first.is_empty() || !first_char_is_lower(first) {
        return false;
    }
    if !first.chars().all(|c| c.is_ascii_lowercase() || c.is_ascii_digit()) {
        return false;
    }
    let mut has_second = false;
    for seg in segments {
        has_second = true;
        if seg.is_empty() {
            return false;
        }
        if !seg.chars().all(|c| c.is_ascii_lowercase() || c.is_ascii_digit()) {
            return false;
        }
    }
    has_second
}

fn first_char_is_lower(s: &str) -> bool {
    matches!(s.chars().next(), Some(c) if c.is_ascii_lowercase())
}

pub fn canonical_assets_root(
    extension_dir: &Path,
    assets: &UiAssetsDir,
    extension_id: &str,
) -> Result<PathBuf, ExtensionError> {
    let candidate = extension_dir.join(&assets.root);
    let canonical_ext = std::fs::canonicalize(extension_dir).map_err(|_| {
        ExtensionError::InvalidUiAssetsRoot {
            root: assets.root.clone(),
            extension_id: extension_id.to_string(),
        }
    })?;
    let canonical_candidate = std::fs::canonicalize(&candidate).map_err(|_| {
        ExtensionError::InvalidUiAssetsRoot {
            root: assets.root.clone(),
            extension_id: extension_id.to_string(),
        }
    })?;
    if !canonical_candidate.starts_with(&canonical_ext) {
        return Err(ExtensionError::InvalidUiAssetsRoot {
            root: assets.root.clone(),
            extension_id: extension_id.to_string(),
        });
    }
    Ok(canonical_candidate)
}

pub fn resolve_spec(
    extension_dir: &Path,
    extension_id: &str,
    assets: &UiAssetsDir,
    spec: &CustomElementSpec,
) -> Result<CustomElementRegistration, ExtensionError> {
    if !is_valid_tag(&spec.tag) {
        return Err(ExtensionError::InvalidCustomElementTag {
            tag: spec.tag.clone(),
            extension_id: extension_id.to_string(),
        });
    }
    let assets_root_abs = canonical_assets_root(extension_dir, assets, extension_id)?;
    let module_candidate = assets_root_abs.join(&spec.module);
    let module_abs =
        std::fs::canonicalize(&module_candidate).map_err(|_| ExtensionError::CustomElementModuleMissing {
            module: spec.module.clone(),
            extension_id: extension_id.to_string(),
            root: assets.root.clone(),
        })?;
    if !module_abs.starts_with(&assets_root_abs) {
        return Err(ExtensionError::CustomElementModuleMissing {
            module: spec.module.clone(),
            extension_id: extension_id.to_string(),
            root: assets.root.clone(),
        });
    }
    if !module_abs.is_file() {
        return Err(ExtensionError::CustomElementModuleMissing {
            module: spec.module.clone(),
            extension_id: extension_id.to_string(),
            root: assets.root.clone(),
        });
    }
    Ok(CustomElementRegistration {
        extension_id: extension_id.to_string(),
        tag: spec.tag.clone(),
        module: spec.module.clone(),
        entry: spec.entry.clone(),
        assets_root_abs,
        module_abs,
    })
}

pub fn collect_from_extensions(
    host_tag_names: &HashSet<String>,
    extensions: &[ActivatedExtension],
) -> Result<Vec<CustomElementRegistration>, ExtensionError> {
    let mut out: Vec<CustomElementRegistration> = Vec::new();
    let mut seen: HashSet<String> = HashSet::new();
    for ext in extensions {
        let extension_id = ext.manifest.extension.id.clone();
        let Some(ui) = ext.manifest.ui.as_ref() else { continue };
        let Some(elements) = ui.custom_elements.as_ref() else { continue };
        if elements.is_empty() {
            continue;
        }
        let assets = ui.assets.as_ref().ok_or_else(|| ExtensionError::InvalidUiAssetsRoot {
            root: "<missing>".to_string(),
            extension_id: extension_id.clone(),
        })?;
        for spec in elements {
            if host_tag_names.contains(&spec.tag) {
                return Err(ExtensionError::DuplicateCustomElementTag {
                    tag: spec.tag.clone(),
                    owner: "<host>".to_string(),
                    extension_id: extension_id.clone(),
                });
            }
            if let Some(owner) = seen.get(&spec.tag).cloned() {
                let prior = out
                    .iter()
                    .find(|r| r.tag == spec.tag)
                    .map(|r| r.extension_id.clone())
                    .unwrap_or(owner);
                return Err(ExtensionError::DuplicateCustomElementTag {
                    tag: spec.tag.clone(),
                    owner: prior,
                    extension_id: extension_id.clone(),
                });
            }
            let registration = resolve_spec(&ext.directory, &extension_id, assets, spec)?;
            seen.insert(registration.tag.clone());
            out.push(registration);
        }
    }
    Ok(out)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn tag_grammar_accepts_hyphenated_lowercase() {
        assert!(is_valid_tag("ext-foo"));
        assert!(is_valid_tag("extfoo-1-bar"));
        assert!(is_valid_tag("a-b"));
    }

    #[test]
    fn tag_grammar_rejects_invalid() {
        assert!(!is_valid_tag("ext"));
        assert!(!is_valid_tag("EXT-FOO"));
        assert!(!is_valid_tag("foo-"));
        assert!(!is_valid_tag("-foo"));
        assert!(!is_valid_tag("foo--bar"));
        assert!(!is_valid_tag(""));
        assert!(!is_valid_tag("1-foo"));
        assert!(!is_valid_tag("foo-Bar"));
    }
}
