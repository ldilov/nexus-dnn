mod common;

use std::sync::Arc;
use std::time::Duration;

use nexus_local_llm_worker::notifications::NotificationConsumer;
use nexus_local_llm_worker::pool::RuntimePool;
use serde_json::json;

#[tokio::test]
async fn host_shutdown_signals_shutdown_channel() {
    let h = common::spawn_harness();
    let pool = RuntimePool::new(h.host_client.clone(), 2);
    let (tx, rx) = tokio::sync::oneshot::channel::<()>();

    let _handle = NotificationConsumer::spawn(Arc::clone(&h.worker_transport), pool, tx);

    h.fake_host
        .push_notification(
            "host.shutdown",
            json!({ "deadline": "2026-04-18T00:00:10Z" }),
        )
        .await;

    tokio::time::timeout(Duration::from_secs(2), rx)
        .await
        .expect("shutdown signal received within 2s")
        .expect("shutdown_tx dropped prematurely");
}

#[tokio::test]
async fn unknown_notification_is_ignored_silently() {
    let h = common::spawn_harness();
    let pool = RuntimePool::new(h.host_client.clone(), 2);
    let (tx, rx) = tokio::sync::oneshot::channel::<()>();

    let handle = NotificationConsumer::spawn(Arc::clone(&h.worker_transport), pool, tx);

    h.fake_host
        .push_notification("completely.unrelated.event", json!({ "x": 1 }))
        .await;

    // Shouldn't crash or signal shutdown.
    let slept = tokio::time::timeout(Duration::from_millis(150), rx).await;
    assert!(slept.is_err(), "should not have signaled shutdown");
    assert!(!handle.is_finished(), "consumer should still be running");
}

#[tokio::test]
async fn malformed_notification_payload_is_logged_and_skipped() {
    let h = common::spawn_harness();
    let pool = RuntimePool::new(h.host_client.clone(), 2);
    let (tx, rx) = tokio::sync::oneshot::channel::<()>();

    let handle = NotificationConsumer::spawn(Arc::clone(&h.worker_transport), pool, tx);

    h.fake_host
        .push_notification("backend.state", json!({ "this_is_not_the_right_shape": true }))
        .await;

    let slept = tokio::time::timeout(Duration::from_millis(150), rx).await;
    assert!(slept.is_err());
    assert!(!handle.is_finished());
}
