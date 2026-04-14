pub mod error;
pub mod manifest;
pub mod operator_index;
pub mod recipe;
pub mod registry;
pub mod storage;
pub mod tool_projection;
pub mod ui_contribution;
pub mod validation;

pub use error::ExtensionError;
pub use manifest::{
    CompatibilitySpec, EnvironmentSpec, ExecutionSpec, ExtensionInfo, ExtensionManifest, FileRef,
    LayoutRef, OperatorDefinition, OperatorInfo, PortSpec, ResourceSpec, RuntimeSpec,
    UiDeclaration, parse_manifest, parse_operator_definition,
};
pub use operator_index::OperatorIndex;
pub use recipe::{
    RecipeBindings, RecipeFieldBinding, RecipeFile, RecipeInfo, parse_recipe_definition,
};
pub use registry::{
    ActivatedExtension, DiscoveryReport, ExtensionRegistry, ExtensionStatus,
    InMemoryExtensionRegistry, LayoutFile,
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
