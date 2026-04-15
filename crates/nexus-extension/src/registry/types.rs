//! Data types shared across the registry submodules.
//!
//! `DiscoveryReport`, `ExtensionStatus`, `LayoutFile`, and `ActivatedExtension`
//! are part of the crate's public API (re-exported from `registry/mod.rs`).
//! `RegistryState` is internal to the registry and visible only to sibling
//! submodules via `pub(super)`.

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
}

pub(super) struct RegistryState {
    pub(super) extensions: Vec<ActivatedExtension>,
    pub(super) operator_index: OperatorIndex,
}
