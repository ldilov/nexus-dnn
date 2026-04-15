#[derive(Debug, thiserror::Error)]
pub enum ExtensionError {
    #[error("manifest parse error in {path}: {detail}")]
    ManifestParse { path: String, detail: String },
    #[error("schema validation failed: {errors:?}")]
    SchemaValidation { errors: Vec<String> },
    #[error("compatibility mismatch for {extension_id}: {detail}")]
    CompatibilityMismatch {
        extension_id: String,
        detail: String,
    },
    #[error("duplicate operator id {operator_id} in extension {extension_id}")]
    DuplicateOperator {
        operator_id: String,
        extension_id: String,
    },
    #[error("io error: {0}")]
    Io(#[from] std::io::Error),
    #[error("operator parse error in {path}: {detail}")]
    OperatorParse { path: String, detail: String },
    #[error("recipe parse error in {path}: {detail}")]
    RecipeParse { path: String, detail: String },
    #[error("ui contribution parse error in {path}: {detail}")]
    UiContributionParse { path: String, detail: String },
    #[error("extension not found: {0}")]
    ExtensionNotFound(String),
    #[error("invalid state transition for {extension_id}: {detail}")]
    InvalidStateTransition {
        extension_id: String,
        detail: String,
    },
    #[error("registry lock poisoned")]
    RegistryLockPoisoned,
    #[error(
        "runtime dependency unmet for extension {extension_id}: family={family} range={version_req}"
    )]
    RuntimeDependencyUnmet {
        extension_id: String,
        family: String,
        version_req: String,
        available_versions: Vec<String>,
        install_panel_url: String,
    },
    #[error(
        "runtime dependency conflict for extension {extension_id}: family={family} ranges={ranges:?}"
    )]
    RuntimeDependencyConflict {
        extension_id: String,
        family: String,
        ranges: Vec<String>,
    },
}
