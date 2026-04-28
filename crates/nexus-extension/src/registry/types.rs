use std::path::PathBuf;

use crate::manifest::{ExtensionManifest, OperatorDefinition};
use crate::operator_index::OperatorIndex;
use crate::recipe::RecipeFile;
use crate::storage::contribution::StorageContribution;
use crate::ui_contribution::UIContributionFile;

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
    /// Spec 035 — parsed install plan derived from `manifest.dependencies` (or
    /// translated from legacy `runtime_dependencies[]`). `None` if the manifest
    /// declared no dependencies. Validated against the host's
    /// [`nexus_extension_deps::handler::HandlerRegistry`] at scan time.
    pub install_plan: Option<nexus_extension_deps::plan::InstallPlan>,
}

impl ActivatedExtension {
    /// Spec 035 T024 — derive the [`InstallPlan`] from the manifest (`dependencies:`
    /// block, with legacy `runtime_dependencies[]` fallback) and validate every step
    /// against the supplied [`HandlerRegistry`]. Idempotent — calling more than once
    /// re-validates and re-stamps `install_plan`.
    ///
    /// [`InstallPlan`]: nexus_extension_deps::plan::InstallPlan
    /// [`HandlerRegistry`]: nexus_extension_deps::handler::HandlerRegistry
    pub fn populate_install_plan(
        &mut self,
        registry: &nexus_extension_deps::handler::HandlerRegistry,
    ) -> Result<(), nexus_extension_deps::DepError> {
        match crate::manifest::resolve_dependencies_block(&self.manifest) {
            None => {
                self.install_plan = None;
            }
            Some(block) => {
                let plan = nexus_extension_deps::plan::parse_dependencies_block(
                    &self.manifest.extension.id,
                    block,
                    registry,
                )?;
                self.install_plan = Some(plan);
            }
        }
        Ok(())
    }
}

pub(super) struct RegistryState {
    pub(super) extensions: Vec<ActivatedExtension>,
    pub(super) operator_index: OperatorIndex,
}
