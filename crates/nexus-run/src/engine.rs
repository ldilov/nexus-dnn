use std::sync::Arc;

use chrono::Utc;
use uuid::Uuid;

use nexus_artifact::FilesystemArtifactStore;
use nexus_events::bus::EventBus;
use nexus_events::types::NexusEvent;
use nexus_scheduler::{Scheduler, create_execution_plan};
use nexus_storage::Database;
use nexus_storage::SqliteDatabase;
use nexus_storage::records::{
    ArtifactRecord, NodeExecutionRecord, RunRecord, RunResolvedGraphRecord,
};
use nexus_worker::WorkerManager;

use crate::error::RunError;

pub struct DefaultRunEngine<W: WorkerManager> {
    db: Arc<SqliteDatabase>,
    workers: Arc<W>,
    artifacts: Arc<FilesystemArtifactStore>,
    event_bus: Arc<dyn EventBus>,
    scheduler: Arc<dyn Scheduler>,
}

impl<W: WorkerManager + 'static> DefaultRunEngine<W> {
    pub fn new(
        db: Arc<SqliteDatabase>,
        workers: Arc<W>,
        artifacts: Arc<FilesystemArtifactStore>,
        event_bus: Arc<dyn EventBus>,
        scheduler: Arc<dyn Scheduler>,
    ) -> Self {
        Self {
            db,
            workers,
            artifacts,
            event_bus,
            scheduler,
        }
    }

    pub async fn create_run(&self, workflow_id: &str) -> Result<String, RunError> {
        let workflow_record = self
            .db
            .get_workflow(workflow_id)
            .await
            .map_err(|e| RunError::WorkflowNotFound(e.to_string()))?;

        let run_id = Uuid::new_v4().to_string();
        let now = Utc::now().to_rfc3339();

        let record = RunRecord {
            id: run_id.clone(),
            workflow_id: workflow_id.to_owned(),
            workflow_version: workflow_record.version.clone(),
            status: "created".to_owned(),
            started_at: None,
            completed_at: None,
            error: None,
            created_at: now,
            run_label: None,
            execution_profile: None,
            predecessor_run_id: None,
        };

        self.db
            .insert_run(&record)
            .await
            .map_err(|e| RunError::StorageError(e.to_string()))?;

        self.event_bus.publish(NexusEvent::RunCreated {
            run_id: run_id.clone(),
            workflow_id: workflow_id.to_owned(),
        });

        Ok(run_id)
    }

    /// Create a run from a compiled `ResolvedRun` and FREEZE its resolved graph +
    /// inputs against the run id. `execute_run` later plans from this immutable
    /// snapshot, so edits to the head `workflows` row never alter an in-flight
    /// run's graph.
    pub async fn create_run_from_resolved(
        &self,
        resolved: &nexus_recipe::ResolvedRun,
    ) -> Result<String, RunError> {
        let run_id = Uuid::new_v4().to_string();
        let now = Utc::now().to_rfc3339();

        let record = RunRecord {
            id: run_id.clone(),
            workflow_id: resolved.workflow_id.clone(),
            workflow_version: resolved.workflow_version.clone(),
            status: "created".to_owned(),
            started_at: None,
            completed_at: None,
            error: None,
            created_at: now.clone(),
            run_label: None,
            execution_profile: None,
            predecessor_run_id: None,
        };

        self.db
            .insert_run(&record)
            .await
            .map_err(|e| RunError::StorageError(e.to_string()))?;

        self.event_bus.publish(NexusEvent::RunCreated {
            run_id: run_id.clone(),
            workflow_id: resolved.workflow_id.clone(),
        });

        let frozen = build_resolved_graph_record(&run_id, resolved, &now)?;
        self.db
            .insert_run_resolved_graph(&frozen)
            .await
            .map_err(|e| RunError::StorageError(e.to_string()))?;

        Ok(run_id)
    }

    pub async fn execute_run(&self, run_id: &str) -> Result<(), RunError> {
        self.update_run_status_with_event(run_id, "created", "planning")
            .await?;

        let run_record = self
            .db
            .get_run(run_id)
            .await
            .map_err(|e| RunError::RunNotFound(e.to_string()))?;

        let (workflow, _resolved_inputs) = self.resolve_run_workflow(&run_record).await?;

        let sorted_nodes = nexus_workflow::validate_dag(&workflow)
            .map_err(|e| RunError::WorkflowError(e.to_string()))?;

        let operators = self
            .db
            .list_operators()
            .await
            .map_err(|e| RunError::StorageError(e.to_string()))?;

        let operator_defs = operators_to_definitions(&operators);

        let plan = create_execution_plan(&sorted_nodes, &workflow, &operator_defs)
            .map_err(|e| RunError::PlanningFailed(e.to_string()))?;

        self.update_run_status_with_event(run_id, "planning", "running")
            .await?;

        for step in &plan {
            if let Err(e) = self.execute_step(run_id, step).await {
                let _ = self
                    .db
                    .update_run_status(run_id, "failed", Some(&e.to_string()))
                    .await;
                self.event_bus.publish(NexusEvent::RunStateChanged {
                    run_id: run_id.to_owned(),
                    old_status: "running".to_owned(),
                    new_status: "failed".to_owned(),
                });
                return Err(e);
            }
        }

        self.update_run_status_with_event(run_id, "running", "completed")
            .await?;
        Ok(())
    }

    /// Resolve the workflow a run plans from. Prefers the FROZEN resolved graph
    /// captured at `create_run_from_resolved` time; falls back to the mutable
    /// head `workflows` row for legacy runs created via `create_run`. Returns the
    /// workflow plus the run's resolved inputs (empty for legacy runs).
    async fn resolve_run_workflow(
        &self,
        run_record: &RunRecord,
    ) -> Result<
        (
            nexus_workflow::Workflow,
            serde_json::Map<String, serde_json::Value>,
        ),
        RunError,
    > {
        match self.db.get_run_resolved_graph(&run_record.id).await {
            Ok(frozen) => {
                let workflow = build_workflow_from_resolved_graph(&frozen)?;
                let resolved_inputs = serde_json::from_str(&frozen.resolved_inputs)
                    .map_err(|e| RunError::Serialize(e.to_string()))?;
                Ok((workflow, resolved_inputs))
            }
            Err(nexus_storage::StorageError::NotFound { .. }) => {
                let workflow_record = self
                    .db
                    .get_workflow(&run_record.workflow_id)
                    .await
                    .map_err(|e| RunError::WorkflowNotFound(e.to_string()))?;
                Ok((
                    parse_workflow_from_record(&workflow_record)?,
                    serde_json::Map::new(),
                ))
            }
            Err(e) => Err(RunError::StorageError(e.to_string())),
        }
    }

    pub async fn cancel_run(&self, run_id: &str) -> Result<(), RunError> {
        self.update_run_status_with_event(run_id, "running", "cancelled")
            .await
    }

    pub async fn retry_run(&self, original_run_id: &str) -> Result<String, RunError> {
        let original = self
            .db
            .get_run(original_run_id)
            .await
            .map_err(|e| RunError::RunNotFound(e.to_string()))?;

        let is_retryable = original.status == "failed" || original.status == "cancelled";
        if !is_retryable {
            return Err(RunError::WorkflowError(format!(
                "run {} has status '{}' and cannot be retried",
                original_run_id, original.status
            )));
        }

        let run_id = Uuid::new_v4().to_string();
        let now = Utc::now().to_rfc3339();

        let record = RunRecord {
            id: run_id.clone(),
            workflow_id: original.workflow_id.clone(),
            workflow_version: original.workflow_version.clone(),
            status: "created".to_owned(),
            started_at: None,
            completed_at: None,
            error: None,
            created_at: now,
            run_label: original.run_label.clone(),
            execution_profile: original.execution_profile.clone(),
            predecessor_run_id: Some(original_run_id.to_owned()),
        };

        self.db
            .insert_run(&record)
            .await
            .map_err(|e| RunError::StorageError(e.to_string()))?;

        self.event_bus.publish(NexusEvent::RunCreated {
            run_id: run_id.clone(),
            workflow_id: original.workflow_id,
        });

        Ok(run_id)
    }

    async fn update_run_status_with_event(
        &self,
        run_id: &str,
        old_status: &str,
        new_status: &str,
    ) -> Result<(), RunError> {
        self.db
            .update_run_status(run_id, new_status, None)
            .await
            .map_err(|e| RunError::StorageError(e.to_string()))?;

        self.event_bus.publish(NexusEvent::RunStateChanged {
            run_id: run_id.to_owned(),
            old_status: old_status.to_owned(),
            new_status: new_status.to_owned(),
        });

        Ok(())
    }

    async fn execute_step(
        &self,
        run_id: &str,
        step: &nexus_scheduler::PlanStep,
    ) -> Result<(), RunError> {
        let now = Utc::now().to_rfc3339();

        let node_record = NodeExecutionRecord {
            run_id: run_id.to_owned(),
            node_id: step.node_id.clone(),
            status: "pending".to_owned(),
            worker_id: None,
            started_at: Some(now),
            completed_at: None,
            duration_ms: None,
            error: None,
        };

        self.db
            .insert_node_execution(&node_record)
            .await
            .map_err(|e| RunError::StorageError(e.to_string()))?;

        let available_workers = self.workers.list_workers().await;
        let worker_id = self
            .scheduler
            .schedule_node(step, &available_workers)
            .map_err(|e| RunError::SchedulingFailed(e.to_string()))?;

        self.db
            .update_node_execution(
                run_id,
                &step.node_id,
                "scheduled",
                Some(&worker_id),
                None,
                None,
            )
            .await
            .map_err(|e| RunError::StorageError(e.to_string()))?;

        self.event_bus.publish(NexusEvent::NodeScheduled {
            run_id: run_id.to_owned(),
            node_id: step.node_id.clone(),
            worker_id: worker_id.clone(),
        });

        self.db
            .update_node_execution(run_id, &step.node_id, "running", None, None, None)
            .await
            .map_err(|e| RunError::StorageError(e.to_string()))?;

        self.event_bus.publish(NexusEvent::NodeStarted {
            run_id: run_id.to_owned(),
            node_id: step.node_id.clone(),
        });

        let _worker_for_op = self
            .workers
            .get_worker_for_operator(&step.operator_id, &step.runtime_family)
            .await
            .ok_or_else(|| {
                RunError::SchedulingFailed(format!(
                    "no active worker for operator {}",
                    step.operator_id
                ))
            })?;

        let artifact_id = Uuid::new_v4().to_string();
        self.create_artifact_for_step(run_id, step, &artifact_id)
            .await?;

        self.db
            .update_node_execution(run_id, &step.node_id, "completed", None, None, None)
            .await
            .map_err(|e| RunError::StorageError(e.to_string()))?;

        self.event_bus.publish(NexusEvent::NodeCompleted {
            run_id: run_id.to_owned(),
            node_id: step.node_id.clone(),
            artifact_ids: vec![artifact_id.clone()],
        });

        self.event_bus.publish(NexusEvent::ArtifactProduced {
            artifact_id,
            run_id: run_id.to_owned(),
            node_id: step.node_id.clone(),
        });

        Ok(())
    }

    async fn create_artifact_for_step(
        &self,
        run_id: &str,
        step: &nexus_scheduler::PlanStep,
        artifact_id: &str,
    ) -> Result<(), RunError> {
        use nexus_artifact::ArtifactStore;

        let write_path = self
            .artifacts
            .allocate_write_target(run_id, &step.node_id, "output")
            .await
            .map_err(|e| RunError::ExecutionFailed {
                node_id: step.node_id.clone(),
                detail: e.to_string(),
            })?;

        tokio::fs::write(&write_path, b"placeholder")
            .await
            .map_err(|e| RunError::ExecutionFailed {
                node_id: step.node_id.clone(),
                detail: e.to_string(),
            })?;

        let (content_hash, size_bytes) =
            self.artifacts
                .compute_hash(&write_path)
                .await
                .map_err(|e| RunError::ExecutionFailed {
                    node_id: step.node_id.clone(),
                    detail: e.to_string(),
                })?;

        let blob_path = self
            .artifacts
            .finalize(&write_path, artifact_id)
            .await
            .map_err(|e| RunError::ExecutionFailed {
                node_id: step.node_id.clone(),
                detail: e.to_string(),
            })?;

        let artifact_record = ArtifactRecord {
            id: artifact_id.to_owned(),
            artifact_type: "tensor".to_owned(),
            run_id: run_id.to_owned(),
            node_id: step.node_id.clone(),
            port_name: "output".to_owned(),
            content_hash,
            size_bytes: size_bytes as i64,
            blob_path,
            metadata: None,
            created_at: Utc::now().to_rfc3339(),
        };

        self.db
            .insert_artifact(&artifact_record)
            .await
            .map_err(|e| RunError::StorageError(e.to_string()))?;

        Ok(())
    }
}

/// Serialize a compiled `ResolvedRun` into the frozen run-graph row. Mirrors the
/// JSON-column shape of `WorkflowRecord`: `nodes`/`inputs`/`outputs`/`stages`
/// from the resolved workflow, `edges` derived via `extract_edges`, and the
/// resolved inputs map. Empty collections serialize as `"[]"` / `"{}"`.
fn build_resolved_graph_record(
    run_id: &str,
    resolved: &nexus_recipe::ResolvedRun,
    created_at: &str,
) -> Result<RunResolvedGraphRecord, RunError> {
    let wf = &resolved.resolved_workflow;
    let edge_values: Vec<serde_json::Value> = wf
        .extract_edges()
        .iter()
        .map(|e| {
            serde_json::json!({
                "source_node": e.source_node,
                "source_port": e.source_port,
                "target_node": e.target_node,
                "target_port": e.target_port,
            })
        })
        .collect();
    Ok(RunResolvedGraphRecord {
        run_id: run_id.to_owned(),
        workflow_id: resolved.workflow_id.clone(),
        workflow_version: resolved.workflow_version.clone(),
        nodes: serde_json::to_string(&wf.nodes).map_err(serialize_err)?,
        edges: serde_json::to_string(&edge_values).map_err(serialize_err)?,
        inputs: serde_json::to_string(&wf.inputs).map_err(serialize_err)?,
        outputs: serde_json::to_string(&wf.outputs).map_err(serialize_err)?,
        stages: serde_json::to_string(&wf.stages).map_err(serialize_err)?,
        resolved_inputs: serde_json::to_string(&resolved.resolved_inputs).map_err(serialize_err)?,
        created_at: created_at.to_owned(),
    })
}

/// Reconstruct a `Workflow` from a frozen run-graph row. Mirrors the column
/// parsing of `parse_workflow_from_record` (the head-row path): `nodes`,
/// `inputs`, `outputs`, `stages` are parsed identically. `edges` are NOT a
/// `Workflow` field — they are derived on demand via `extract_edges`, so the
/// stored `edges` column is intentionally not read back here.
fn build_workflow_from_resolved_graph(
    record: &RunResolvedGraphRecord,
) -> Result<nexus_workflow::Workflow, RunError> {
    Ok(nexus_workflow::Workflow {
        id: record.workflow_id.clone(),
        title: record.workflow_id.clone(),
        version: record.workflow_version.clone(),
        inputs: serde_json::from_str(&record.inputs)
            .map_err(|e| RunError::WorkflowError(e.to_string()))?,
        outputs: serde_json::from_str(&record.outputs)
            .map_err(|e| RunError::WorkflowError(e.to_string()))?,
        nodes: serde_json::from_str(&record.nodes)
            .map_err(|e| RunError::WorkflowError(e.to_string()))?,
        stages: serde_json::from_str(&record.stages)
            .map_err(|e| RunError::WorkflowError(e.to_string()))?,
        created_at: record.created_at.clone(),
        updated_at: record.created_at.clone(),
    })
}

fn serialize_err(e: serde_json::Error) -> RunError {
    RunError::Serialize(e.to_string())
}

fn parse_workflow_from_record(
    record: &nexus_storage::records::WorkflowRecord,
) -> Result<nexus_workflow::Workflow, RunError> {
    Ok(nexus_workflow::Workflow {
        id: record.id.clone(),
        title: record.title.clone(),
        version: record.version.clone(),
        inputs: serde_json::from_str(record.inputs.as_deref().unwrap_or("[]"))
            .map_err(|e| RunError::WorkflowError(e.to_string()))?,
        outputs: serde_json::from_str(record.outputs.as_deref().unwrap_or("[]"))
            .map_err(|e| RunError::WorkflowError(e.to_string()))?,
        nodes: serde_json::from_str(&record.nodes)
            .map_err(|e| RunError::WorkflowError(e.to_string()))?,
        stages: serde_json::from_str(record.stages.as_deref().unwrap_or("[]"))
            .map_err(|e| RunError::WorkflowError(e.to_string()))?,
        created_at: record.created_at.clone(),
        updated_at: record.updated_at.clone(),
    })
}

fn operators_to_definitions(
    records: &[nexus_storage::records::OperatorRecord],
) -> Vec<nexus_extension::OperatorDefinition> {
    records
        .iter()
        .map(|r| nexus_extension::OperatorDefinition {
            spec_version: "0.1".to_owned(),
            operator: nexus_extension::OperatorInfo {
                id: r.id.clone(),
                version: r.version.clone(),
                display_name: r.display_name.clone(),
                description: r.description.clone(),
                category: r.category.clone(),
            },
            execution: r
                .execution_mode
                .as_ref()
                .map(|mode| nexus_extension::ExecutionSpec {
                    mode: Some(mode.clone()),
                    cacheable: r.cacheable.map(|c| c != 0),
                    resumable: r.resumable.map(|rv| rv != 0),
                }),
            inputs: serde_json::from_str(&r.inputs).ok(),
            outputs: serde_json::from_str(&r.outputs).ok(),
            config_schema: r
                .config_schema
                .as_ref()
                .and_then(|s| serde_json::from_str(s).ok()),
            resources: None,
            ui: None,
        })
        .collect()
}
