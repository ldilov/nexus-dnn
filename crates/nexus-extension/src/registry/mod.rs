pub mod custom_elements;
mod loaders;
mod scanner;
mod storage_validation;
pub mod types;
pub mod version_conflict;

use std::path::Path;

use parking_lot::RwLock;
use semver::Version;

use crate::error::ExtensionError;
use crate::manifest::OperatorDefinition;
use crate::operator_index::OperatorIndex;
use crate::recipe::RecipeFile;
use crate::ui_contribution::{UIContributionFile, UIContributionKind};

pub use types::{ActivatedExtension, DiscoveryReport, ExtensionStatus, LayoutFile};
pub use version_conflict::detect_intra_manifest_conflicts;

use scanner::{
    activate_extension_inner, process_extension, rebuild_operator_entries, scan_builtin_dir,
    scan_extensions_dir,
};
use types::RegistryState;

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
    fn collect_custom_elements(
        &self,
        host_tag_names: &std::collections::HashSet<String>,
    ) -> Result<Vec<custom_elements::CustomElementRegistration>, ExtensionError>;
    fn reload_extension(
        &self,
        id: &str,
        host_version: &Version,
        protocol_version: &Version,
    ) -> Result<(), ExtensionError>;
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
        let mut state = self.state.write();

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
        let mut state = self.state.write();

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

        let mut state = self.state.write();

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
        let mut state = self.state.write();

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
                state.operator_index =
                    OperatorIndex::build(rebuild_operator_entries(&state.extensions));
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

    /// Re-read a single extension's manifest and replace its registry entry
    /// atomically. On any failure (missing id, manifest parse, schema
    /// validation, compatibility mismatch, tag collision) the prior entry is
    /// kept and the error is returned — no partial state (FR-027).
    pub fn reload_extension(
        &self,
        id: &str,
        host_version: &Version,
        protocol_version: &Version,
    ) -> Result<(), ExtensionError> {
        let ext_dir = {
            let state = self.state.read();
            state
                .extensions
                .iter()
                .find(|e| e.manifest.extension.id == id)
                .map(|e| e.directory.clone())
                .ok_or_else(|| ExtensionError::ExtensionNotFound(id.to_owned()))?
        };
        let reloaded = process_extension(&ext_dir, host_version, protocol_version)?;
        if reloaded.manifest.extension.id != id {
            return Err(ExtensionError::InvalidStateTransition {
                extension_id: id.to_owned(),
                detail: format!(
                    "manifest on disk now declares id '{}', reload refuses to change identity",
                    reloaded.manifest.extension.id
                ),
            });
        }
        let mut state = self.state.write();
        let Some(idx) = state
            .extensions
            .iter()
            .position(|e| e.manifest.extension.id == id)
        else {
            return Err(ExtensionError::ExtensionNotFound(id.to_owned()));
        };
        let prior = std::mem::replace(&mut state.extensions[idx], reloaded);
        let host_tags: std::collections::HashSet<String> = std::collections::HashSet::new();
        if let Err(err) = custom_elements::collect_from_extensions(&host_tags, &state.extensions) {
            state.extensions[idx] = prior;
            return Err(err);
        }
        state.operator_index = OperatorIndex::build(rebuild_operator_entries(&state.extensions));
        Ok(())
    }

    /// Collect all custom-element registrations published by currently active
    /// extensions. Validates tag grammar (FR-022), cross-extension uniqueness,
    /// assets-root containment, and module existence. Host-provided tag names
    /// are passed in so a host-registered tag cannot be silently overridden;
    /// in practice host tags use snake_case and can never collide structurally,
    /// but the check is defense-in-depth.
    fn collect_custom_elements_impl(
        &self,
        host_tag_names: &std::collections::HashSet<String>,
    ) -> Result<Vec<custom_elements::CustomElementRegistration>, ExtensionError> {
        let state = self.state.read();
        custom_elements::collect_from_extensions(host_tag_names, &state.extensions)
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

        let mut state = self.state.write();

        state.extensions = activated_extensions;
        state.operator_index = operator_index;

        Ok(report)
    }
}

impl ExtensionRegistry for InMemoryExtensionRegistry {
    /// synchronous `refresh`. Trait signature remains async to preserve LSP
    /// for `nexus-core` and `nexus-api` callers.
    async fn discover_and_activate(
        &self,
        extensions_dir: &Path,
        host_version: &Version,
        protocol_version: &Version,
    ) -> Result<DiscoveryReport, ExtensionError> {
        self.refresh(extensions_dir, host_version, protocol_version)
    }

    fn list_extensions(&self) -> Vec<ActivatedExtension> {
        let state = self.state.read();
        state.extensions.clone()
    }

    fn get_extension(&self, id: &str) -> Option<ActivatedExtension> {
        let state = self.state.read();
        state
            .extensions
            .iter()
            .find(|e| e.manifest.extension.id == id)
            .cloned()
    }

    fn list_operators(&self) -> Vec<OperatorDefinition> {
        let state = self.state.read();
        state.operator_index.all().to_vec()
    }

    fn get_operator(&self, id: &str) -> Option<OperatorDefinition> {
        let state = self.state.read();
        state.operator_index.by_id(id).cloned()
    }

    fn list_recipes(&self) -> Vec<RecipeFile> {
        let state = self.state.read();
        state
            .extensions
            .iter()
            .filter(|e| e.status.is_active())
            .flat_map(|e| e.recipes.clone())
            .collect()
    }

    fn get_recipe(&self, id: &str) -> Option<RecipeFile> {
        let state = self.state.read();
        state
            .extensions
            .iter()
            .filter(|e| e.status.is_active())
            .flat_map(|e| &e.recipes)
            .find(|r| r.recipe.id == id)
            .cloned()
    }

    fn list_ui_contributions(&self) -> Vec<UIContributionFile> {
        let state = self.state.read();
        state
            .extensions
            .iter()
            .filter(|e| e.status.is_active())
            .flat_map(|e| e.ui_contributions.clone())
            .collect()
    }

    fn list_ui_contributions_by_kind(&self, kind: &UIContributionKind) -> Vec<UIContributionFile> {
        let state = self.state.read();
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
        let state = self.state.read();
        state
            .extensions
            .iter()
            .filter(|e| e.status.is_active())
            .flat_map(|e| e.layouts.clone())
            .collect()
    }

    fn get_layout(&self, id: &str) -> Option<LayoutFile> {
        let state = self.state.read();
        state
            .extensions
            .iter()
            .filter(|e| e.status.is_active())
            .flat_map(|e| &e.layouts)
            .find(|l| l.id == id)
            .cloned()
    }

    fn collect_custom_elements(
        &self,
        host_tag_names: &std::collections::HashSet<String>,
    ) -> Result<Vec<custom_elements::CustomElementRegistration>, ExtensionError> {
        self.collect_custom_elements_impl(host_tag_names)
    }

    fn reload_extension(
        &self,
        id: &str,
        host_version: &Version,
        protocol_version: &Version,
    ) -> Result<(), ExtensionError> {
        InMemoryExtensionRegistry::reload_extension(self, id, host_version, protocol_version)
    }
}
