//! T074 — handshake round-trip + version-mismatch (-32004) contract test.

mod fixtures;

use std::sync::Arc;

use emotion_tts_extension::backend_client::rpc::{error_codes, methods};
use emotion_tts_extension::backend_client::BackendClient;
use emotion_tts_extension::domain::EmotionTtsError;
use emotion_tts_extension::host_contract::{BackendRuntimeLease, LeaseError};
use fixtures::mock_backend::MockBackendRuntimeLease;
use serde_json::json;

#[tokio::test]
async fn handshake_round_trip_returns_capability_set() {
    let mut mock = MockBackendRuntimeLease::new();
    mock.set_handler(methods::HANDSHAKE, |params| {
        let received_protocol = params
            .get("protocol_version")
            .and_then(|v| v.as_str())
            .unwrap_or_default()
            .to_string();
        assert_eq!(received_protocol, "1.0");
        assert_eq!(
            params.get("client").and_then(|v| v.as_str()).unwrap_or(""),
            "emotion-tts-extension"
        );
        Ok(json!({
            "protocol_version": "1.0",
            "worker_version": "0.1.0",
            "runtime_id": "indextts.python",
            "python_version": "3.11.8",
            "torch_version": "2.4.0+cu128",
            "cuda_available": true,
            "device": "cuda:0",
            "model_family_id": "huggingface/IndexTeam/IndexTTS-2",
            "model_present": true,
            "capabilities": [
                "tts.synthesis",
                "tts.emotion.audio_ref",
                "tts.emotion.vector",
                "tts.emotion.text_qwen",
                "audio.export.wav",
                "audio.export.mp3",
                "audio.export.flac",
                "streaming.unsupported_v1"
            ],
        }))
    });

    let lease: Arc<dyn BackendRuntimeLease> = Arc::new(mock);
    let client = BackendClient::new(lease);

    #[derive(serde::Deserialize)]
    struct HandshakeResult {
        protocol_version: String,
        worker_version: String,
        runtime_id: String,
        cuda_available: bool,
        model_present: bool,
        capabilities: Vec<String>,
    }

    let resp: HandshakeResult = client
        .call(
            methods::HANDSHAKE,
            &json!({
                "protocol_version": "1.0",
                "client": "emotion-tts-extension",
                "client_version": "0.1.0"
            }),
        )
        .await
        .unwrap();

    assert_eq!(resp.protocol_version, "1.0");
    assert_eq!(resp.worker_version, "0.1.0");
    assert_eq!(resp.runtime_id, "indextts.python");
    assert!(resp.cuda_available);
    assert!(resp.model_present);
    assert!(resp.capabilities.contains(&"tts.synthesis".to_string()));
    assert!(resp
        .capabilities
        .contains(&"tts.emotion.text_qwen".to_string()));
}

#[tokio::test]
async fn handshake_protocol_mismatch_maps_to_runtime_unavailable() {
    let mut mock = MockBackendRuntimeLease::new();
    mock.set_handler(methods::HANDSHAKE, |_params| {
        Err(LeaseError::Rpc {
            code: error_codes::HANDSHAKE_PROTOCOL_MISMATCH,
            message: "client asked for 2.0 but worker speaks 1.0".to_string(),
        })
    });

    let lease: Arc<dyn BackendRuntimeLease> = Arc::new(mock);
    let client = BackendClient::new(lease);

    let result: Result<serde_json::Value, EmotionTtsError> = client
        .call(
            methods::HANDSHAKE,
            &json!({ "protocol_version": "2.0", "client": "emotion-tts-extension" }),
        )
        .await;

    let err = result.unwrap_err();
    assert!(
        matches!(err, EmotionTtsError::RuntimeUnavailable(_)),
        "expected RuntimeUnavailable, got {err:?}"
    );
    assert_eq!(err.status_code(), 503);
    assert!(err.to_string().contains("handshake protocol mismatch"));
}

#[tokio::test]
async fn model_missing_code_32000_maps_to_model_missing() {
    let mut mock = MockBackendRuntimeLease::new();
    mock.set_handler(methods::HANDSHAKE, |_| {
        Err(LeaseError::Rpc {
            code: error_codes::MODEL_MISSING_V1,
            message: "IndexTTS-2 weights missing".to_string(),
        })
    });

    let lease: Arc<dyn BackendRuntimeLease> = Arc::new(mock);
    let client = BackendClient::new(lease);

    let result: Result<serde_json::Value, EmotionTtsError> =
        client.call(methods::HANDSHAKE, &json!({})).await;
    let err = result.unwrap_err();
    assert!(matches!(err, EmotionTtsError::ModelMissing(_)));
}
