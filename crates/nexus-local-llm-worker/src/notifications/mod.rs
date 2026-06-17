pub mod events;

use std::sync::Arc;

use nexus_protocol::messages::RpcNotification;
use tokio::sync::{broadcast, oneshot};
use tokio::task::JoinHandle;
use tracing::{debug, info, warn};

use crate::pool::RuntimePool;
use crate::transport::WorkerTransport;

use events::{
    BackendStatePayload, EVENT_BACKEND_STATE, EVENT_HOST_SHUTDOWN, EVENT_MODEL_REMOVED,
    EVENT_RUNTIME_REMOVED, EVENT_SETTINGS_CHANGED, HostShutdownPayload, ModelRemovedPayload,
    RuntimeRemovedPayload, SettingsChangedPayload,
};

pub struct NotificationConsumer;

impl NotificationConsumer {
    pub fn spawn(
        transport: Arc<WorkerTransport>,
        pool: Arc<RuntimePool>,
        shutdown_tx: oneshot::Sender<()>,
    ) -> JoinHandle<()> {
        let rx = transport.subscribe_notifications();
        tokio::spawn(run(rx, pool, shutdown_tx))
    }
}

async fn run(
    mut rx: broadcast::Receiver<RpcNotification>,
    pool: Arc<RuntimePool>,
    shutdown_tx: oneshot::Sender<()>,
) {
    let mut shutdown_tx = Some(shutdown_tx);
    loop {
        match rx.recv().await {
            Ok(notification) => {
                handle_one(&pool, &notification, &mut shutdown_tx).await;
            }
            Err(broadcast::error::RecvError::Lagged(skipped)) => {
                warn!(skipped, "notification stream lagged");
            }
            Err(broadcast::error::RecvError::Closed) => {
                info!("notification stream closed");
                break;
            }
        }
    }
}

async fn handle_one(
    pool: &Arc<RuntimePool>,
    notification: &RpcNotification,
    shutdown_tx: &mut Option<oneshot::Sender<()>>,
) {
    let method = notification.method.as_str();
    match method {
        EVENT_BACKEND_STATE => {
            match serde_json::from_value::<BackendStatePayload>(notification.params.clone()) {
                Ok(payload) => {
                    debug!(lease_id = %payload.lease_id, state = %payload.state, "backend.state");
                    pool.on_backend_state(&payload.lease_id, payload.state)
                        .await;
                }
                Err(e) => warn!(error = %e, "failed to parse backend.state"),
            }
        }
        EVENT_MODEL_REMOVED => {
            match serde_json::from_value::<ModelRemovedPayload>(notification.params.clone()) {
                Ok(payload) => {
                    info!(model_id = %payload.model_id, "model.removed → evicting");
                    pool.evict_by_model(&payload.model_id, "model_removed")
                        .await;
                }
                Err(e) => warn!(error = %e, "failed to parse model.removed"),
            }
        }
        EVENT_RUNTIME_REMOVED => {
            match serde_json::from_value::<RuntimeRemovedPayload>(notification.params.clone()) {
                Ok(payload) => {
                    info!(install_id = %payload.install_id, "runtime.removed → evicting");
                    pool.evict_by_install(&payload.install_id, "runtime_removed")
                        .await;
                }
                Err(e) => warn!(error = %e, "failed to parse runtime.removed"),
            }
        }
        EVENT_HOST_SHUTDOWN => {
            match serde_json::from_value::<HostShutdownPayload>(notification.params.clone()) {
                Ok(payload) => {
                    info!(deadline = ?payload.deadline, "host.shutdown → draining pool");
                    pool.release_all("host_shutdown").await;
                    if let Some(tx) = shutdown_tx.take() {
                        let _ = tx.send(());
                    }
                }
                Err(e) => warn!(error = %e, "failed to parse host.shutdown"),
            }
        }
        EVENT_SETTINGS_CHANGED => {
            match serde_json::from_value::<SettingsChangedPayload>(notification.params.clone()) {
                Ok(payload) => {
                    debug!(key = %payload.key, "settings.changed");
                }
                Err(e) => warn!(error = %e, "failed to parse settings.changed"),
            }
        }
        _ => {}
    }
}
