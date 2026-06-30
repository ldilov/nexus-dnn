use std::sync::Arc;

use async_trait::async_trait;
use faceavatar_extension::backend_client::LeaseFactory;
use faceavatar_extension::domain::Result as ExtResult;
use faceavatar_extension::host_contract::{
    BackendRuntimeLease, LeaseError, LeaseState, NotificationEnvelope, NotificationStream,
    SharedLease,
};
use futures::stream::{self, BoxStream};
use serde_json::{json, Value};
use tokio::sync::broadcast;

/// A lease that emits the faceavatar generation notification sequence and returns
/// a fake result. `faceavatar.generate.start`/`faceavatar.graft.start` block (like
/// the real worker) until they have emitted `faceavatar.generate.done`, so the
/// dispatcher's relay → SSE → terminal-persist path is exercised end to end.
pub struct MockGenerationLease {
    tx: broadcast::Sender<NotificationEnvelope>,
}

impl MockGenerationLease {
    #[must_use]
    pub fn new() -> Self {
        let (tx, _rx) = broadcast::channel(256);
        Self { tx }
    }
}

fn emit(tx: &broadcast::Sender<NotificationEnvelope>, method: &str, params: Value) {
    let _ = tx.send(NotificationEnvelope {
        method: method.to_string(),
        params,
    });
}

#[async_trait]
impl BackendRuntimeLease for MockGenerationLease {
    fn state(&self) -> LeaseState {
        LeaseState::Ready
    }

    async fn send_rpc(&self, method: &str, _params: Value) -> Result<Value, LeaseError> {
        match method {
            "faceavatar.runtime.health" => Ok(json!({
                "protocol_version": "1.0",
                "profile": "fake",
                "gpu_supported": true,
                "sm": [12, 1]
            })),
            "faceavatar.generate.cancel" | "faceavatar.graft.cancel" => {
                Ok(json!({ "cancelled": true }))
            }
            "runtime.release_memory" => Ok(json!({ "released": true })),
            "faceavatar.generate.start" | "faceavatar.graft.start" => {
                for (stage, total) in [
                    ("arcfit", 4u64),
                    ("flame", 3u64),
                    ("graft", 2u64),
                    ("export", 1u64),
                ] {
                    for step in 0..total {
                        emit(
                            &self.tx,
                            "faceavatar.generate.progress",
                            json!({ "stage": stage, "step": step + 1, "total": total }),
                        );
                        tokio::task::yield_now().await;
                    }
                }
                let metadata = json!({
                    "profile": "fake",
                    "vertices": 12_000,
                    "faces": 24_000,
                    "sha256": "deadbeef",
                });
                emit(
                    &self.tx,
                    "faceavatar.generate.done",
                    json!({ "output_path": "out.glb", "metadata": metadata }),
                );
                Ok(json!({
                    "status": "ok",
                    "output_path": "out.glb",
                    "metadata": metadata,
                }))
            }
            other => Err(LeaseError::Rpc {
                code: -32601,
                message: format!("method not found: {other}"),
            }),
        }
    }

    async fn subscribe_notifications(&self) -> NotificationStream {
        use futures::StreamExt;
        let rx = self.tx.subscribe();
        let s = tokio_stream::wrappers::BroadcastStream::new(rx)
            .filter_map(|item| async move { item.ok() });
        Box::pin(s) as BoxStream<'static, NotificationEnvelope>
    }

    async fn release(&self) -> Result<(), LeaseError> {
        Ok(())
    }
}

pub struct MockGenerationFactory;

#[async_trait]
impl LeaseFactory for MockGenerationFactory {
    async fn acquire(&self) -> ExtResult<SharedLease> {
        Ok(Arc::new(MockGenerationLease::new()) as SharedLease)
    }
}

/// Factory that always fails on generate — used to assert error-path persistence.
pub struct FailingFactory;

#[async_trait]
impl LeaseFactory for FailingFactory {
    async fn acquire(&self) -> ExtResult<SharedLease> {
        Ok(Arc::new(FailingLease) as SharedLease)
    }
}

struct FailingLease;

#[async_trait]
impl BackendRuntimeLease for FailingLease {
    fn state(&self) -> LeaseState {
        LeaseState::Ready
    }
    async fn send_rpc(&self, method: &str, _params: Value) -> Result<Value, LeaseError> {
        if method == "faceavatar.generate.start" || method == "faceavatar.graft.start" {
            return Err(LeaseError::Rpc {
                code: -32101,
                message: "MODEL_MISSING: weights not found".into(),
            });
        }
        Ok(json!({}))
    }
    async fn subscribe_notifications(&self) -> NotificationStream {
        Box::pin(stream::empty()) as BoxStream<'static, NotificationEnvelope>
    }
    async fn release(&self) -> Result<(), LeaseError> {
        Ok(())
    }
}

/// Factory whose worker "process-crashes" on generate (`WorkerCrashed`) — used
/// to assert the dispatcher salvages a completed GLB left on disk.
pub struct CrashingFactory;

#[async_trait]
impl LeaseFactory for CrashingFactory {
    async fn acquire(&self) -> ExtResult<SharedLease> {
        Ok(Arc::new(CrashingLease) as SharedLease)
    }
}

struct CrashingLease;

#[async_trait]
impl BackendRuntimeLease for CrashingLease {
    fn state(&self) -> LeaseState {
        LeaseState::Ready
    }
    async fn send_rpc(&self, method: &str, params: Value) -> Result<Value, LeaseError> {
        if method == "faceavatar.generate.start" || method == "faceavatar.graft.start" {
            // Simulate the GB10 OOM signature: the GLB is fully written to the
            // host-chosen output_path, then the process dies before replying.
            if let Some(out) = params.get("output_path").and_then(Value::as_str) {
                if let Some(parent) = std::path::Path::new(out).parent() {
                    let _ = std::fs::create_dir_all(parent);
                }
                let _ = std::fs::write(out, vec![0u8; 8192]);
            }
            return Err(LeaseError::WorkerCrashed);
        }
        Ok(json!({}))
    }
    async fn subscribe_notifications(&self) -> NotificationStream {
        Box::pin(stream::empty()) as BoxStream<'static, NotificationEnvelope>
    }
    async fn release(&self) -> Result<(), LeaseError> {
        Ok(())
    }
}
