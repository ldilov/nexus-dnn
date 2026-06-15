pub mod error;
pub mod model;
pub mod mutation;
pub mod parser;
pub mod validation;
pub mod versioning;

pub use error::WorkflowError;
pub use model::{Edge, NodeInput, NodeInstance, OutputBinding, Stage, Workflow, WorkflowPort};
pub use mutation::{add_node, connect_ports, disconnect_ports, remove_node, update_node_config};
pub use parser::parse_workflow;
pub use validation::{
    resolve_operator_bindings, validate_dag, validate_node_config, validate_port_types,
    validate_workflow,
};
pub use versioning::{canonical_graph_value, compute_canonical_hash, hash_canonical_value};
