//! Stub-mode (`SpawnMode::Stub`) helpers extracted per spec 015 US2.

use std::sync::Arc;

use tokio::sync::RwLock;
use tokio::task::JoinHandle;

use crate::channel::{
    ApiDialect, RuntimeAddress, RuntimeChannelDescriptor, RuntimeChannelKind, RuntimeEndpoint,
};
use crate::events::{BackendEvent, SharedPublisher};
use crate::lease::RuntimeLease;

use super::SpawnRuntimeRequest;

pub(super) fn build_test_lease(
    request: &SpawnRuntimeRequest,
    port: u16,
    bind_host: &str,
    lease_id: &str,
) -> RuntimeLease {
    let descriptor = RuntimeChannelDescriptor {
        kind: RuntimeChannelKind::HttpTcp,
        api_dialects: vec![ApiDialect::OpenAiCompatible, ApiDialect::NativeLlamaServer],
        address: RuntimeAddress::Tcp {
            host: bind_host.to_string(),
            port,
        },
        health: Some(RuntimeEndpoint::path("/health")),
        metrics: None,
        ready: false,
    };
    RuntimeLease {
        lease_id: lease_id.to_string(),
        install_id: format!("ri_{}", request.family.replace('.', "_")),
        extension_id: request.extension_id.clone(),
        pid: None,
        log_channel_id: format!("runtime:lease:{lease_id}"),
        channel: descriptor,
        created_at: chrono::Utc::now().to_rfc3339(),
        released_at: None,
    }
}

pub(super) async fn emit_test_started(
    publisher: &SharedPublisher,
    request: &SpawnRuntimeRequest,
    lease_id: &str,
    port: u16,
    bind_host: &str,
) {
    let evt = BackendEvent::new(
        "process.started",
        request.family.clone(),
        serde_json::json!({
            "lease_id": lease_id,
            "port": port,
            "host": bind_host,
        }),
    );
    publisher.publish(evt).await;
}

pub(super) fn spawn_test_supervisor(
    publisher: SharedPublisher,
    lease_arc: Arc<RwLock<RuntimeLease>>,
    shutdown: Arc<tokio::sync::Notify>,
    lease_id: String,
    family: String,
    bind_host: String,
    port: u16,
) -> JoinHandle<()> {
    tokio::spawn(async move {
        let health_url = format!("http://{bind_host}:{port}/health");
        let client = match reqwest::Client::builder()
            .timeout(std::time::Duration::from_secs(1))
            .build()
        {
            Ok(c) => c,
            Err(e) => {
                tracing::warn!(error = %e, "test supervisor reqwest client builder failed");
                return;
            }
        };

        let mut consecutive_ok: u8 = 0;
        let mut ready_emitted = false;
        let mut consecutive_fail_after_ready: u8 = 0;

        loop {
            tokio::select! {
                _ = shutdown.notified() => break,
                _ = tokio::time::sleep(std::time::Duration::from_millis(500)) => {}
            }
            let ok = client
                .get(&health_url)
                .send()
                .await
                .map(|r| r.status().is_success())
                .unwrap_or(false);
            if !ready_emitted {
                if ok {
                    consecutive_ok += 1;
                    if consecutive_ok >= 2 {
                        ready_emitted = true;
                        {
                            let mut w = lease_arc.write().await;
                            w.channel.ready = true;
                        }
                        let evt = BackendEvent::new(
                            "channel.ready",
                            family.clone(),
                            serde_json::json!({ "lease_id": lease_id }),
                        );
                        publisher.publish(evt).await;
                    }
                } else {
                    consecutive_ok = 0;
                }
            } else if ok {
                consecutive_fail_after_ready = 0;
            } else {
                consecutive_fail_after_ready += 1;
                if consecutive_fail_after_ready >= 2 {
                    {
                        let mut w = lease_arc.write().await;
                        w.channel.ready = false;
                        w.released_at = Some(chrono::Utc::now().to_rfc3339());
                    }
                    let evt = BackendEvent::new(
                        "process.exited",
                        family.clone(),
                        serde_json::json!({ "lease_id": lease_id }),
                    );
                    publisher.publish(evt).await;
                    break;
                }
            }
        }
    })
}
