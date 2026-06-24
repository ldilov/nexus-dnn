#[derive(Debug, thiserror::Error)]
pub enum RunError {
    #[error("workflow not found: {0}")]
    WorkflowNotFound(String),

    #[error("planning failed: {0}")]
    PlanningFailed(String),

    #[error("scheduling failed: {0}")]
    SchedulingFailed(String),

    #[error("execution failed on node {node_id}: {detail}")]
    ExecutionFailed { node_id: String, detail: String },

    #[error("worker crashed: {0}")]
    WorkerCrashed(String),

    #[error("run cancelled: {0}")]
    Cancelled(String),

    #[error("storage error: {0}")]
    StorageError(String),

    #[error("workflow error: {0}")]
    WorkflowError(String),

    #[error("run not found: {0}")]
    RunNotFound(String),

    #[error("serialization error: {0}")]
    Serialize(String),
}
