mod common;

use std::time::Duration;

use nexus_local_llm_worker::host_rpc::runtimes::{
    RuntimeChannelDescriptor, RuntimeLease, RuntimesClient,
};
use nexus_local_llm_worker::ids::{LeaseId, RuntimeInstallId};
use nexus_local_llm_worker::lease_client::LeaseGuard;
use serde_json::json;

fn make_lease(id: &str) -> RuntimeLease {
    RuntimeLease {
        lease_id: LeaseId::new(id),
        install_id: RuntimeInstallId::new("install-X"),
        extension_id: "nexus.local-llm".into(),
        pid: None,
        log_channel_id: "log-1".into(),
        channel: RuntimeChannelDescriptor {
            base_url: "http://127.0.0.1:1".into(),
            protocol: None,
        },
        created_at: "2026-04-18T00:00:00Z".into(),
        released_at: None,
    }
}

#[tokio::test]
async fn dropping_lease_guard_calls_release_lease() {
    let h = common::spawn_harness();

    {
        let _guard = LeaseGuard::new(h.host_client.clone(), make_lease("lease-release-1"));
    } // drop triggers release

    let call = h
        .fake_host
        .expect_call("host.runtimes.release_lease", Duration::from_secs(2))
        .await;
    let lease_id = call.params["lease_id"].as_str().expect("lease_id str");
    assert_eq!(lease_id, "lease-release-1");
    h.fake_host.reply_ok(call.id, json!({"released": true})).await;
}

#[tokio::test]
async fn initiate_release_is_idempotent_on_drop() {
    let h = common::spawn_harness();

    let guard = LeaseGuard::new(h.host_client.clone(), make_lease("lease-idem-1"));
    guard.initiate_release();

    let first = h
        .fake_host
        .expect_call("host.runtimes.release_lease", Duration::from_secs(2))
        .await;
    h.fake_host.reply_ok(first.id, json!({"released": true})).await;

    drop(guard);

    // Subsequent drop must not issue a second release call.
    let maybe_second = h
        .fake_host
        .try_take_call(Duration::from_millis(250))
        .await;
    assert!(
        maybe_second.is_none(),
        "second release_lease call should not be issued (got {:?})",
        maybe_second.map(|r| r.method)
    );
}

#[tokio::test]
async fn releasing_multiple_leases_yields_multiple_release_calls() {
    let h = common::spawn_harness();

    let g1 = LeaseGuard::new(h.host_client.clone(), make_lease("lease-multi-1"));
    let g2 = LeaseGuard::new(h.host_client.clone(), make_lease("lease-multi-2"));
    let g3 = LeaseGuard::new(h.host_client.clone(), make_lease("lease-multi-3"));
    drop(g1);
    drop(g2);
    drop(g3);

    let mut seen = std::collections::HashSet::new();
    for _ in 0..3 {
        let call = h
            .fake_host
            .expect_call("host.runtimes.release_lease", Duration::from_secs(2))
            .await;
        let id = call.params["lease_id"].as_str().unwrap().to_string();
        seen.insert(id);
        h.fake_host.reply_ok(call.id, json!({"released": true})).await;
    }
    assert_eq!(seen.len(), 3);

    // Ensure no spurious fourth release_lease.
    let extra = h.fake_host.try_take_call(Duration::from_millis(250)).await;
    assert!(extra.is_none(), "unexpected extra call: {:?}", extra);
}

#[tokio::test]
async fn sanity_runtimes_client_round_trip() {
    let h = common::spawn_harness();
    let client = RuntimesClient::new(h.worker_transport.as_ref());

    tokio::spawn(async move {
        let call = h
            .fake_host
            .expect_call("host.runtimes.release_lease", Duration::from_secs(1))
            .await;
        h.fake_host
            .reply_ok(call.id, json!({ "released": true }))
            .await;
    });
    let released = client
        .release_lease(&LeaseId::new("lease-sanity"))
        .await
        .expect("release ok");
    assert!(released);
}
