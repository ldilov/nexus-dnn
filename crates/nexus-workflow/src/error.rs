#[derive(Debug, thiserror::Error)]
pub enum WorkflowError {
    #[error("parse error: {0}")]
    Parse(String),

    #[error("schema validation failed: {errors:?}")]
    SchemaValidation { errors: Vec<String> },

    #[error("cycle detected in workflow graph")]
    CycleDetected,

    #[error("dangling edge: node {node_id} referenced but not found")]
    DanglingEdge { node_id: String },

    #[error("duplicate node id: {node_id}")]
    DuplicateNode { node_id: String },

    #[error("type mismatch on edge {source_port} -> {target_port}: {source_type} != {target_type}")]
    TypeMismatch {
        source_port: String,
        target_port: String,
        source_type: String,
        target_type: String,
    },

    #[error("type mismatches found: {0:?}")]
    TypeMismatches(Vec<String>),

    #[error("unknown operator: {operator_ref} referenced by node {node_id}")]
    UnknownOperator {
        node_id: String,
        operator_ref: String,
    },

    #[error("missing required input {port_name} on node {node_id}")]
    MissingRequiredInput { node_id: String, port_name: String },

    #[error("invalid config for node {node_id}: {detail}")]
    InvalidConfig { node_id: String, detail: String },
}
