#[derive(Debug, thiserror::Error)]
pub enum SchedulerError {
    #[error("no compatible worker for operator {operator_id} with runtime {runtime_family}")]
    NoCompatibleWorker {
        operator_id: String,
        runtime_family: String,
    },

    #[error("planning failed: {0}")]
    PlanningFailed(String),
}
