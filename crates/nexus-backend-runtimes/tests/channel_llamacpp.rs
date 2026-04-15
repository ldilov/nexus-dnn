mod common;

use std::collections::BTreeMap;
use std::time::Duration;

use common::DelayedHealthServer;
use nexus_backend_runtimes::events::BroadcastPublisher;
use nexus_backend_runtimes::settings::AcceleratorProfile;
use nexus_backend_runtimes::spawn::{RuntimeBindMode, SpawnRuntimeRequest};

// RED: Spawner::spawn is not yet implemented (T067).
//
// Both tests are marked #[ignore] so `cargo test` does not report failure.
// The Spawner call bodies are fully commented out so `cargo check --tests`
// compiles cleanly.  Remove #[ignore] and uncomment the bodies once T067 lands.
//
// Event topic contract that T067 must honour:
//   "process.started"  → emitted as soon as the child process is forked
//   "channel.ready"    → emitted when the health probe gets 2× consecutive 200s
//   "process.exited"   → emitted when the child process terminates for any reason

#[allow(dead_code)]
fn make_request(port: u16) -> SpawnRuntimeRequest {
    SpawnRuntimeRequest {
        extension_id: "ext.test.llamacpp".into(),
        family: "llama.cpp".into(),
        version_req: None,
        accelerator: AcceleratorProfile::Cpu,
        args: vec![],
        env: BTreeMap::new(),
        port_hint: Some(port),
        bind_mode: RuntimeBindMode::LoopbackOnly,
        install_id: None,
    }
}

/// T060 — `ProcessStarted` fires before the health endpoint becomes reachable;
/// `ChannelReady` fires only after the server begins returning 200 on /health.
///
/// The mock server binds immediately but delays /health responses by ~2 s.
/// `Spawner::spawn` must emit `ProcessStarted` within 500 ms (child forked,
/// channel not yet ready), then emit `ChannelReady` ~2 s later when the
/// readiness probe first succeeds.
#[tokio::test]
async fn process_started_before_channel_ready() {
    use std::sync::Arc;

    let health_delay = Duration::from_secs(2);
    let mock = DelayedHealthServer::start_after(health_delay).await;
    let port = mock.port();

    let publisher = BroadcastPublisher::new(64);
    let mut rx = publisher.subscribe();

    let spawner = nexus_backend_runtimes::spawn::Spawner::new(Arc::new(publisher.clone()));
    let t_spawn = tokio::time::Instant::now();
    let _lease = spawner
        .spawn(make_request(port))
        .await
        .expect("spawn succeeded");

    let mut started_at: Option<tokio::time::Instant> = None;
    let mut ready_at: Option<tokio::time::Instant> = None;
    let deadline = tokio::time::sleep(Duration::from_secs(6));
    tokio::pin!(deadline);
    loop {
        tokio::select! {
            _ = &mut deadline => break,
            Ok(evt) = rx.recv() => {
                match evt.topic.as_str() {
                    "process.started" => started_at = Some(tokio::time::Instant::now()),
                    "channel.ready"   => ready_at   = Some(tokio::time::Instant::now()),
                    _ => {}
                }
                if started_at.is_some() && ready_at.is_some() { break; }
            }
        }
    }

    let started_at = started_at.expect("ProcessStarted never emitted");
    let ready_at = ready_at.expect("ChannelReady never emitted");

    assert!(
        started_at.duration_since(t_spawn) <= Duration::from_millis(600),
        "ProcessStarted took too long after spawn call"
    );

    let lag = ready_at.duration_since(t_spawn);
    assert!(
        lag >= Duration::from_millis(1500),
        "ChannelReady fired too early: {lag:?}"
    );
    assert!(
        lag <= Duration::from_millis(5000),
        "ChannelReady arrived too late: {lag:?}"
    );

    mock.kill();
}

/// T061 — Killing the spawned process externally causes `ProcessExited` to be
/// emitted and flips `RuntimeLease.channel.ready` to `false` on next read.
#[tokio::test]
async fn process_exit_invalidates_channel() {
    use std::sync::Arc;

    let mock = DelayedHealthServer::start_after(Duration::from_millis(200)).await;
    let port = mock.port();

    let publisher = BroadcastPublisher::new(64);
    let mut rx = publisher.subscribe();

    let spawner = nexus_backend_runtimes::spawn::Spawner::new(Arc::new(publisher.clone()));
    let lease = spawner
        .spawn(make_request(port))
        .await
        .expect("spawn succeeded");

    wait_for_topic(&mut rx, "channel.ready", Duration::from_secs(5)).await;

    mock.kill();

    wait_for_topic(&mut rx, "process.exited", Duration::from_secs(5)).await;

    let updated = spawner
        .lease_state(&lease.lease_id)
        .await
        .expect("lease not found after exit");
    assert!(
        !updated.channel.ready,
        "channel.ready must be false after process exit"
    );
}

/// Shared helper: drains the broadcast receiver until `topic` is seen or
/// `timeout` expires (panics on timeout). Compiled but unused until T067.
#[allow(dead_code)]
async fn wait_for_topic(
    rx: &mut tokio::sync::broadcast::Receiver<nexus_backend_runtimes::events::BackendEvent>,
    topic: &str,
    timeout: Duration,
) {
    let deadline = tokio::time::sleep(timeout);
    tokio::pin!(deadline);
    loop {
        tokio::select! {
            _ = &mut deadline => panic!("timed out waiting for event topic {topic:?}"),
            Ok(evt) = rx.recv() => {
                if evt.topic == topic {
                    return;
                }
            }
        }
    }
}
