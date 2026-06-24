//! Binding-resolution error types for the recipe binding grammar.

/// Errors produced when resolving or applying recipe control bindings.
#[derive(Debug, thiserror::Error)]
pub enum BindingError {
    #[error("unknown control: {control_id}")]
    UnknownControl { control_id: String },

    #[error("duplicate control id in projection: {control_id}")]
    DuplicateControl { control_id: String },

    #[error("unknown preset: {preset_id}")]
    UnknownPreset { preset_id: String },

    #[error("control is locked and cannot be overridden: {control_id}")]
    LockedOverride { control_id: String },

    #[error("hidden control cannot be set: {control_id}")]
    HiddenControlNotSettable { control_id: String },

    #[error("unknown binding target: {target}")]
    UnknownTarget { target: String },

    #[error("failed to resolve path for target `{target}`: {detail}")]
    PathResolveFailed { target: String, detail: String },

    #[error("type mismatch for target `{target}`")]
    TypeMismatch { target: String },

    #[error("schema violation on node `{node_id}` field `{field}`: {detail}")]
    SchemaViolation {
        node_id: String,
        field: String,
        detail: String,
    },

    #[error("operator schema drift on node `{node_id}`")]
    OperatorSchemaDrift { node_id: String },

    #[error("missing required control: {control_id}")]
    MissingRequired { control_id: String },

    #[error(transparent)]
    Workflow(#[from] nexus_workflow::WorkflowError),
}
