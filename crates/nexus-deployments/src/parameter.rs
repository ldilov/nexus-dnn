use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
#[non_exhaustive]
pub enum ParameterScope {
    WorkflowInput,
    NodeConfig,
    Runtime,
    ModelLoad,
    Request,
    UiState,
    ExecutionPolicy,
}
