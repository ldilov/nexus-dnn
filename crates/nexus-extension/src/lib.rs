pub mod error;
pub mod icon_resolver;
pub mod install;
pub mod manifest;
pub mod operator_index;
pub mod recipe;
pub mod registry;
pub mod storage;
pub mod tool_projection;
pub mod ui_contribution;
pub mod validation;

pub use error::ExtensionError;
pub use icon_resolver::{
    BLANK_MODULE_GLYPH, FALLBACK_GLYPHS, FnvFallbackResolver, IconSource, MATERIAL_SYMBOLS,
    ModuleIconResolver, ResolvedIcon, USER_MODULE_GLYPH, fnv_fallback, is_valid_material_symbol,
    resolve_from_manifest,
};
pub use install::{SvgSanitizeError, sanitize_svg};
pub use manifest::{
    CompatibilitySpec, EnvironmentSpec, ExecutionSpec, ExtensionInfo, ExtensionManifest, FileRef,
    LayoutRef, ManifestIcon, OperatorDefinition, OperatorInfo, PortSpec, ResourceSpec,
    RuntimeDependency, RuntimeSpec, UiDeclaration, parse_manifest, parse_operator_definition,
};
pub use operator_index::OperatorIndex;
pub use recipe::{
    RecipeBindings, RecipeFieldBinding, RecipeFile, RecipeInfo, parse_recipe_definition,
};
pub use registry::{
    ActivatedExtension, DiscoveryReport, ExtensionRegistry, ExtensionStatus,
    InMemoryExtensionRegistry, LayoutFile, detect_intra_manifest_conflicts,
};
pub use storage::contribution::{
    MigrationDeclaration, MigrationFileRef, NamespaceDeclaration, RuntimeAccessDeclaration,
    SqlProfileDeclaration, StorageContribution, UninstallDeclaration,
};
pub use tool_projection::{Tool, build_tool_from_operator, build_tool_from_recipe};
pub use ui_contribution::{
    UIContributionFile, UIContributionKind, parse_ui_contribution, parse_ui_contribution_from_str,
};
pub use validation::{
    CapabilityGrant, check_compatibility, resolve_capabilities, validate_manifest_schema,
    validate_operator_schema,
};
