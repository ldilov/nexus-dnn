use std::sync::Arc;

use async_trait::async_trait;
use futures::stream::{self, BoxStream};
use serde_json::{json, Value};
use svi2_pro_extension::backend_client::LeaseFactory;
use svi2_pro_extension::domain::Result as ExtResult;
use svi2_pro_extension::host_contract::{
    BackendRuntimeLease, LeaseError, LeaseState, NotificationEnvelope, NotificationStream,
    SharedLease,
};
use tokio::sync::broadcast;

/// A lease that emits the exact svi2 fake-render notification sequence and
/// returns a fake render result. `render.start` blocks (like the real
/// worker) until it has emitted `svi2.video.done`, so the dispatcher's
/// relay → SSE → terminal-persist path is exercised end to end.
pub struct MockRenderLease {
    tx: broadcast::Sender<NotificationEnvelope>,
    num_clips: usize,
    steps: usize,
}

impl MockRenderLease {
    #[must_use]
    pub fn new() -> Self {
        let (tx, _rx) = broadcast::channel(256);
        Self {
            tx,
            num_clips: 2,
            steps: 3,
        }
    }
}

fn emit(tx: &broadcast::Sender<NotificationEnvelope>, method: &str, params: Value) {
    let _ = tx.send(NotificationEnvelope {
        method: method.to_string(),
        params,
    });
}

#[async_trait]
impl BackendRuntimeLease for MockRenderLease {
    fn state(&self) -> LeaseState {
        LeaseState::Ready
    }

    async fn send_rpc(&self, method: &str, _params: Value) -> Result<Value, LeaseError> {
        match method {
            "handshake" => Ok(json!({ "protocol_version": "1.0", "profile": "fake" })),
            "svi2.presets.list" => Ok(json!({
                "version": 1,
                "description": "mock",
                "presets": [{ "id": "svi-canonical", "label": "Canonical", "description": "", "params": {} }]
            })),
            "svi2.video.render.cancel" => Ok(json!({ "cancelled": true })),
            "svi2.video.render.start" => {
                emit(
                    &self.tx,
                    "svi2.video.progress",
                    json!({ "phase": "start", "progress": 0.0, "num_clips": self.num_clips }),
                );
                let total = (self.num_clips * self.steps).max(1) as f64;
                let mut completed = 0.0;
                for clip in 0..self.num_clips {
                    emit(
                        &self.tx,
                        "svi2.video.clip.started",
                        json!({ "clip_index": clip, "num_clips": self.num_clips }),
                    );
                    for step in 0..self.steps {
                        completed += 1.0;
                        emit(
                            &self.tx,
                            "svi2.video.clip.step",
                            json!({ "clip_index": clip, "step": step, "steps": self.steps, "progress": completed / total }),
                        );
                        emit(
                            &self.tx,
                            "svi2.video.progress",
                            json!({ "phase": "denoise", "progress": completed / total }),
                        );
                    }
                    emit(
                        &self.tx,
                        "runtime.memory_stats",
                        json!({ "clip_index": clip, "peak_vram_bytes": 0 }),
                    );
                    emit(
                        &self.tx,
                        "svi2.video.clip.completed",
                        json!({ "clip_index": clip, "num_clips": self.num_clips }),
                    );
                    // Yield so the relay task forwards before the RPC returns.
                    tokio::task::yield_now().await;
                }
                let report = json!({
                    "profile": "fake",
                    "frames": 6,
                    "sha256": "deadbeef",
                    "final_fps": 48,
                    "duration_seconds": 0.4,
                });
                emit(
                    &self.tx,
                    "svi2.video.artifact.created",
                    json!({ "role": "video.render" }),
                );
                emit(
                    &self.tx,
                    "svi2.video.done",
                    json!({ "output_path": "out.mp4", "render_report": report }),
                );
                Ok(json!({
                    "status": "ok",
                    "output_path": "out.mp4",
                    "render_report": report,
                    "sha256": "deadbeef",
                }))
            }
            other => Err(LeaseError::Rpc {
                code: -32601,
                message: format!("method not found: {other}"),
            }),
        }
    }

    async fn subscribe_notifications(&self) -> NotificationStream {
        let rx = self.tx.subscribe();
        let s = tokio_stream::wrappers::BroadcastStream::new(rx)
            .filter_map(|item| async move { item.ok() });
        use futures::StreamExt;
        Box::pin(s) as BoxStream<'static, NotificationEnvelope>
    }

    async fn release(&self) -> Result<(), LeaseError> {
        Ok(())
    }
}

pub struct MockRenderFactory;

#[async_trait]
impl LeaseFactory for MockRenderFactory {
    async fn acquire(&self) -> ExtResult<SharedLease> {
        Ok(Arc::new(MockRenderLease::new()) as SharedLease)
    }
}

/// Factory that always fails — used to assert error-path persistence.
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
        if method == "svi2.video.render.start" {
            return Err(LeaseError::Rpc {
                code: -32103,
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
