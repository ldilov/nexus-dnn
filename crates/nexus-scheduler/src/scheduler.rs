use nexus_worker::WorkerInfo;

use crate::error::SchedulerError;
use crate::planner::PlanStep;

pub trait Scheduler: Send + Sync {
    fn schedule_node(
        &self,
        step: &PlanStep,
        available_workers: &[WorkerInfo],
    ) -> Result<String, SchedulerError>;
}

pub struct RoundRobinScheduler;

impl Scheduler for RoundRobinScheduler {
    fn schedule_node(
        &self,
        step: &PlanStep,
        available_workers: &[WorkerInfo],
    ) -> Result<String, SchedulerError> {
        available_workers
            .iter()
            .find(|w| w.operator_ids.contains(&step.operator_id))
            .map(|w| w.worker_id.clone())
            .ok_or_else(|| SchedulerError::NoCompatibleWorker {
                operator_id: step.operator_id.clone(),
                runtime_family: format!("{:?}", step.runtime_family),
            })
    }
}
