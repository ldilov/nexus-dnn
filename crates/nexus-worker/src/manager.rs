use std::collections::HashMap;
use std::path::Path;
use std::sync::Arc;

use nexus_events::bus::EventBus;
use nexus_events::types::NexusEvent;
use nexus_protocol::RuntimeFamily;
use serde::{Deserialize, Serialize};
use tokio::sync::RwLock;

use crate::error::WorkerError;
use crate::process::{WorkerProcess, WorkerStatus};
use crate::runtime_family::{NativeRuntimeSpawner, PythonRuntimeSpawner, RuntimeSpawner};

const HOST_VERSION: &str = "0.1.0";
const PROTOCOL_VERSION: &str = "0.1.0";

pub trait WorkerManager: Send + Sync {
    fn start_worker(
        &self,
        extension_id: &str,
        runtime_family: RuntimeFamily,
        extension_dir: &Path,
        entrypoint: &str,
    ) -> impl std::future::Future<Output = Result<String, WorkerError>> + Send;

    fn stop_worker(
        &self,
        worker_id: &str,
    ) -> impl std::future::Future<Output = Result<(), WorkerError>> + Send;

    fn list_workers(&self) -> impl std::future::Future<Output = Vec<WorkerInfo>> + Send;

    fn get_worker_for_operator(
        &self,
        operator_id: &str,
        runtime_family: &RuntimeFamily,
    ) -> impl std::future::Future<Output = Option<String>> + Send;

    fn health_check_all(
        &self,
    ) -> impl std::future::Future<Output = Vec<(String, Result<(), WorkerError>)>> + Send;
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct WorkerInfo {
    pub worker_id: String,
    pub extension_id: String,
    pub status: WorkerStatus,
    pub operator_ids: Vec<String>,
    pub session_id: Option<String>,
    pub supported_methods: Vec<String>,
}

pub struct DefaultWorkerManager {
    workers: RwLock<HashMap<String, Arc<WorkerProcess>>>,
    event_bus: Arc<dyn EventBus>,
    next_worker_id: std::sync::atomic::AtomicU64,
}

impl DefaultWorkerManager {
    pub fn new(event_bus: Arc<dyn EventBus>) -> Self {
        Self {
            workers: RwLock::new(HashMap::new()),
            event_bus,
            next_worker_id: std::sync::atomic::AtomicU64::new(0),
        }
    }

    fn generate_worker_id(&self) -> String {
        let id = self
            .next_worker_id
            .fetch_add(1, std::sync::atomic::Ordering::Relaxed);
        format!("worker-{id}")
    }
}

impl WorkerManager for DefaultWorkerManager {
    async fn start_worker(
        &self,
        extension_id: &str,
        runtime_family: RuntimeFamily,
        extension_dir: &Path,
        entrypoint: &str,
    ) -> Result<String, WorkerError> {
        let (child, transport) = match runtime_family {
            RuntimeFamily::Python => {
                PythonRuntimeSpawner
                    .spawn_worker(extension_dir, entrypoint)
                    .await?
            }
            RuntimeFamily::Native => {
                NativeRuntimeSpawner
                    .spawn_worker(extension_dir, entrypoint)
                    .await?
            }
            other => {
                return Err(WorkerError::SpawnFailed(format!(
                    "unsupported runtime family: {other:?}"
                )));
            }
        };

        let worker_id = self.generate_worker_id();
        let process = Arc::new(WorkerProcess::new(
            worker_id.clone(),
            extension_id.to_owned(),
            child,
            transport,
        ));

        process.handshake(HOST_VERSION, PROTOCOL_VERSION).await?;
        process.list_operators().await?;

        self.workers
            .write()
            .await
            .insert(worker_id.clone(), process);

        self.event_bus.publish(NexusEvent::WorkerStarted {
            worker_id: worker_id.clone(),
            extension_id: extension_id.to_owned(),
        });

        Ok(worker_id)
    }

    async fn stop_worker(&self, worker_id: &str) -> Result<(), WorkerError> {
        let process = self
            .workers
            .write()
            .await
            .remove(worker_id)
            .ok_or_else(|| WorkerError::NotFound(worker_id.to_owned()))?;

        let old_status = process.status.lock().await.clone();
        process.shutdown().await?;

        self.event_bus.publish(NexusEvent::WorkerHealthChanged {
            worker_id: worker_id.to_owned(),
            old_status: format!("{old_status:?}"),
            new_status: "Stopped".to_owned(),
        });
        Ok(())
    }

    async fn list_workers(&self) -> Vec<WorkerInfo> {
        let workers = self.workers.read().await;
        let mut infos = Vec::with_capacity(workers.len());
        for process in workers.values() {
            let status = process.status.lock().await.clone();
            let operator_ids = process.operator_ids.lock().await.clone();
            let session_id = process.session_id.lock().await.clone();
            let supported_methods = process.supported_methods.lock().await.clone();
            infos.push(WorkerInfo {
                worker_id: process.worker_id.clone(),
                extension_id: process.extension_id.clone(),
                status,
                operator_ids,
                session_id,
                supported_methods,
            });
        }
        infos
    }

    async fn get_worker_for_operator(
        &self,
        operator_id: &str,
        _runtime_family: &RuntimeFamily,
    ) -> Option<String> {
        let workers = self.workers.read().await;
        for process in workers.values() {
            let status = process.status.lock().await.clone();
            if status != WorkerStatus::Ready && status != WorkerStatus::Busy {
                continue;
            }
            let ops = process.operator_ids.lock().await;
            if ops.iter().any(|id| id == operator_id) {
                return Some(process.worker_id.clone());
            }
        }
        None
    }

    async fn health_check_all(&self) -> Vec<(String, Result<(), WorkerError>)> {
        let workers = self.workers.read().await;
        let mut results = Vec::with_capacity(workers.len());
        for process in workers.values() {
            let worker_id = process.worker_id.clone();
            let old_status = process.status.lock().await.clone();
            let check_result = process.health_check().await;
            let new_status = if check_result.is_ok() {
                WorkerStatus::Ready
            } else {
                WorkerStatus::Unhealthy
            };
            if old_status != new_status {
                *process.status.lock().await = new_status.clone();
                self.event_bus.publish(NexusEvent::WorkerHealthChanged {
                    worker_id: worker_id.clone(),
                    old_status: format!("{old_status:?}"),
                    new_status: format!("{new_status:?}"),
                });
            }
            results.push((worker_id, check_result));
        }
        results
    }
}
