use std::collections::HashMap;
use std::sync::Arc;

use sqlx::SqlitePool;
use tokio::sync::RwLock;

use super::LeaseHandle;
use super::port::PortLease;
use crate::events::{BackendEvent, SharedPublisher};
use crate::lease::RuntimeLease;

pub(super) struct SupervisorCtx {
    pub(super) pool: SqlitePool,
    pub(super) publisher: SharedPublisher,
    pub(super) lease_id: String,
    pub(super) family: String,
    pub(super) bind_host: String,
    pub(super) port_lease: PortLease,
    pub(super) live_leases: Arc<tokio::sync::Mutex<HashMap<String, Arc<LeaseHandle>>>>,
    pub(super) lease_arc: Arc<RwLock<RuntimeLease>>,
    pub(super) child: tokio::process::Child,
    pub(super) shutdown: Arc<tokio::sync::Notify>,
}

pub(super) async fn supervise_real(mut ctx: SupervisorCtx) {
    let health_url = format!("http://{}:{}/health", ctx.bind_host, ctx.port_lease.port);
    let client = match reqwest::Client::builder()
        .timeout(std::time::Duration::from_millis(500))
        .build()
    {
        Ok(c) => c,
        Err(e) => {
            tracing::warn!(
                lease_id = %ctx.lease_id,
                error = %e,
                "supervise_real reqwest client builder failed; aborting supervisor",
            );
            return;
        }
    };

    let mut readiness_done = false;
    loop {
        tokio::select! {
            _ = ctx.shutdown.notified() => {
                let _ = ctx.child.start_kill();
                let bounded = tokio::time::timeout(
                    std::time::Duration::from_secs(10),
                    ctx.child.wait(),
                )
                .await;
                if bounded.is_err() {
                    let _ = ctx.child.kill().await;
                }
                break;
            }
            status = ctx.child.wait() => {
                let code = status.ok().and_then(|s: std::process::ExitStatus| s.code());
                let evt = BackendEvent::new(
                    "process.exited",
                    ctx.family.clone(),
                    serde_json::json!({ "lease_id": ctx.lease_id, "code": code }),
                );
                ctx.publisher.publish(evt).await;
                break;
            }
            _ = tokio::time::sleep(std::time::Duration::from_millis(500)) => {
                if !readiness_done {
                    let ok = client.get(&health_url).send().await
                        .map(|r| r.status().is_success())
                        .unwrap_or(false);
                    if ok {
                        readiness_done = true;
                        {
                            let mut w = ctx.lease_arc.write().await;
                            w.channel.ready = true;
                        }
                        let _ = sqlx::query(
                            "UPDATE host_runtime_leases SET ready = 1 WHERE lease_id = $1",
                        )
                        .bind(&ctx.lease_id)
                        .execute(&ctx.pool)
                        .await;
                        let evt = BackendEvent::new(
                            "channel.ready",
                            ctx.family.clone(),
                            serde_json::json!({ "lease_id": ctx.lease_id }),
                        );
                        ctx.publisher.publish(evt).await;
                    }
                }
            }
        }
    }

    {
        let mut w = ctx.lease_arc.write().await;
        w.channel.ready = false;
        w.released_at = Some(chrono::Utc::now().to_rfc3339());
    }
    let _ = sqlx::query(
        "UPDATE host_runtime_leases \
         SET released_at = datetime('now'), ready = 0 \
         WHERE lease_id = $1",
    )
    .bind(&ctx.lease_id)
    .execute(&ctx.pool)
    .await;
    ctx.live_leases.lock().await.remove(&ctx.lease_id);
}
