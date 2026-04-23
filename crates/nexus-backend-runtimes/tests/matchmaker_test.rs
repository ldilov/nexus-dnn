//! Integration tests for the JSON-RPC matchmaker (T023).

use std::sync::Arc;

use nexus_backend_runtimes::generic::leases::framer::RpcResponse;
use nexus_backend_runtimes::generic::leases::matchmaker::{Matchmaker, MatchmakerFailure};
use tokio::task::JoinSet;

fn resp(id: u64, payload: &'static str) -> RpcResponse {
    RpcResponse {
        jsonrpc: "2.0".into(),
        id,
        result: Some(serde_json::json!(payload)),
        error: None,
    }
}

#[tokio::test]
async fn concurrent_allocate_produces_unique_ids() {
    let m = Arc::new(Matchmaker::new());
    let mut set = JoinSet::new();
    for _ in 0..256 {
        let m = Arc::clone(&m);
        set.spawn(async move {
            let (id, _rx) = m.allocate();
            id
        });
    }

    let mut ids = Vec::new();
    while let Some(res) = set.join_next().await {
        ids.push(res.unwrap());
    }
    ids.sort_unstable();
    ids.dedup();
    assert_eq!(ids.len(), 256, "expected 256 unique allocated ids");
}

#[tokio::test]
async fn resolve_wakes_only_matching_waiter_regardless_of_order() {
    let m = Matchmaker::new();
    let (id_a, rx_a) = m.allocate();
    let (id_b, rx_b) = m.allocate();
    let (id_c, rx_c) = m.allocate();

    // Resolve out of allocation order.
    m.resolve(resp(id_c, "third"));
    m.resolve(resp(id_a, "first"));
    m.resolve(resp(id_b, "second"));

    let a = rx_a.await.unwrap().unwrap();
    let b = rx_b.await.unwrap().unwrap();
    let c = rx_c.await.unwrap().unwrap();
    assert_eq!(a.result, Some(serde_json::json!("first")));
    assert_eq!(b.result, Some(serde_json::json!("second")));
    assert_eq!(c.result, Some(serde_json::json!("third")));
}

#[tokio::test]
async fn resolve_with_unknown_id_is_silent() {
    let m = Matchmaker::new();
    m.resolve(resp(999, "ghost")); // no waiter — must not panic
    let (id, rx) = m.allocate();
    m.resolve(resp(id, "real"));
    let got = rx.await.unwrap().unwrap();
    assert_eq!(got.result, Some(serde_json::json!("real")));
}

#[tokio::test]
async fn cancel_drops_the_slot_and_receiver_sees_closed_channel() {
    let m = Matchmaker::new();
    let (id, rx) = m.allocate();
    m.cancel(id);
    let outcome = rx.await;
    assert!(outcome.is_err(), "expected RecvError after cancel");
}

#[tokio::test]
async fn fail_all_broadcasts_reason_to_every_waiter() {
    let m = Matchmaker::new();
    let (_id_a, rx_a) = m.allocate();
    let (_id_b, rx_b) = m.allocate();
    let (_id_c, rx_c) = m.allocate();

    m.fail_all(MatchmakerFailure::WorkerCrashed);

    let a = rx_a.await.unwrap();
    let b = rx_b.await.unwrap();
    let c = rx_c.await.unwrap();
    assert_eq!(a, Err(MatchmakerFailure::WorkerCrashed));
    assert_eq!(b, Err(MatchmakerFailure::WorkerCrashed));
    assert_eq!(c, Err(MatchmakerFailure::WorkerCrashed));
}

#[tokio::test]
async fn failure_from_into_lease_error_maps_variants() {
    use nexus_backend_runtimes::generic::leases::LeaseError;
    let crashed: LeaseError = MatchmakerFailure::WorkerCrashed.into();
    assert!(matches!(crashed, LeaseError::WorkerCrashed));
    let cancelled: LeaseError = MatchmakerFailure::Cancelled.into();
    assert!(matches!(cancelled, LeaseError::Cancelled));
}
