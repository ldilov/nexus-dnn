//! Smoke test for the mock BackendRuntimeLease fixture.

mod fixtures;

use std::sync::Arc;

use emotion_tts_extension::backend_client::rpc::methods;
use emotion_tts_extension::backend_client::BackendClient;
use emotion_tts_extension::host_contract::{BackendRuntimeLease, LeaseError};
use fixtures::mock_backend::MockBackendRuntimeLease;
use serde_json::json;

#[tokio::test]
async fn mock_lease_echoes_handshake() {
    let mut mock = MockBackendRuntimeLease::new();
    mock.set_handler(methods::HANDSHAKE, |_params| {
        Ok(json!({
            "protocol_version": "1.0",
            "worker_version": "0.1.0",
            "accepts_methods": ["handshake", "health"],
            "notification_methods": ["progress"]
        }))
    });

    let lease: Arc<dyn BackendRuntimeLease> = Arc::new(mock);
    let client = BackendClient::new(lease);

    #[derive(serde::Deserialize, Debug)]
    struct HandshakeResp {
        protocol_version: String,
        worker_version: String,
    }

    let resp: HandshakeResp = client.call(methods::HANDSHAKE, &json!({})).await.unwrap();
    assert_eq!(resp.protocol_version, "1.0");
    assert_eq!(resp.worker_version, "0.1.0");
}

#[tokio::test]
async fn unknown_method_maps_to_internal() {
    let mock = MockBackendRuntimeLease::new();
    let lease: Arc<dyn BackendRuntimeLease> = Arc::new(mock);
    let client = BackendClient::new(lease);

    let result: emotion_tts_extension::domain::Result<serde_json::Value> =
        client.call("nonexistent.method", &json!({})).await;
    let err = result.unwrap_err();
    assert!(err.to_string().contains("method not found"));
}

#[tokio::test]
async fn release_flips_state() {
    let mock = MockBackendRuntimeLease::new();
    assert!(matches!(mock.release().await, Ok(())));
}
