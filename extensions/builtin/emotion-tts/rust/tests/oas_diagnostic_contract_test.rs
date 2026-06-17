//! T054 — `diagnostic` notification contract round-trip (spec 034 US2).
//!
//! The Python worker emits a `diagnostic` notification after every
//! completed segment when OAS is active, shaped per contracts/rpc
//! §`diagnostic — alignment`. This test locks the wire shape so the
//! Rust-side consumer (T059) does not drift from what the worker sends.

use emotion_tts_extension::backend_client::notifications::ProgressEvent;
use emotion_tts_extension::backend_client::params::DiagnosticAlignmentPayload;
use emotion_tts_extension::host_contract::NotificationEnvelope;
use serde_json::json;

fn envelope(params: serde_json::Value) -> NotificationEnvelope {
    NotificationEnvelope {
        method: "diagnostic".into(),
        params,
    }
}

#[test]
fn unflagged_segment_omits_attention_map_ref() {
    let env = envelope(json!({
        "run_id": "run_abc",
        "global_index": 2,
        "alignment_score": 0.67,
        "alignment_flag": false,
        "threshold_used": 0.45,
        "threshold_source": "literature_default"
    }));
    let event: ProgressEvent = env.into();
    let params = match event {
        ProgressEvent::Diagnostic(p) => p,
        other => panic!("expected Diagnostic, got {other:?}"),
    };
    let typed: DiagnosticAlignmentPayload = serde_json::from_value(params).unwrap();
    assert_eq!(typed.run_id, "run_abc");
    assert_eq!(typed.global_index, 2);
    assert!((typed.alignment_score - 0.67).abs() < 1e-9);
    assert!(!typed.alignment_flag);
    assert_eq!(typed.threshold_source, "literature_default");
    assert!(typed.attention_map_artifact_ref.is_none());
}

#[test]
fn flagged_segment_carries_attention_map_ref() {
    let env = envelope(json!({
        "run_id": "run_xyz",
        "global_index": 47,
        "alignment_score": 0.28,
        "alignment_flag": true,
        "threshold_used": 0.42,
        "threshold_source": "rolling_mad",
        "attention_map_artifact_ref": "artifact://diagnostics/0193e4f2.png"
    }));
    let event: ProgressEvent = env.into();
    let params = match event {
        ProgressEvent::Diagnostic(p) => p,
        other => panic!("expected Diagnostic, got {other:?}"),
    };
    let typed: DiagnosticAlignmentPayload = serde_json::from_value(params).unwrap();
    assert!(typed.alignment_flag);
    assert_eq!(typed.threshold_source, "rolling_mad");
    assert_eq!(
        typed.attention_map_artifact_ref.as_deref(),
        Some("artifact://diagnostics/0193e4f2.png"),
    );
}

#[test]
fn threshold_source_accepts_only_documented_values() {
    for value in ["literature_default", "rolling_mad"] {
        let env = envelope(json!({
            "run_id": "r",
            "global_index": 0,
            "alignment_score": 0.5,
            "alignment_flag": false,
            "threshold_used": 0.45,
            "threshold_source": value
        }));
        let event: ProgressEvent = env.into();
        let params = match event {
            ProgressEvent::Diagnostic(p) => p,
            _ => panic!("expected diagnostic"),
        };
        let typed: DiagnosticAlignmentPayload = serde_json::from_value(params).unwrap();
        assert_eq!(typed.threshold_source, value);
    }
}

#[test]
fn round_trip_preserves_all_fields() {
    let payload = DiagnosticAlignmentPayload {
        run_id: "run_1".into(),
        global_index: 5,
        alignment_score: 0.41,
        alignment_flag: true,
        threshold_used: 0.45,
        threshold_source: "literature_default".into(),
        attention_map_artifact_ref: Some("artifact://diagnostics/x.png".into()),
    };
    let wire = serde_json::to_value(&payload).unwrap();
    let decoded: DiagnosticAlignmentPayload = serde_json::from_value(wire).unwrap();
    assert_eq!(decoded, payload);
}

#[test]
fn unknown_diagnostic_shape_falls_back_to_raw_value() {
    // If the worker emits a different diagnostic variant (e.g. a future
    // "diagnostic" with a new `kind` field), the notification-fanout path
    let env = envelope(json!({
        "kind": "future_variant",
        "payload": { "foo": "bar" }
    }));
    let event: ProgressEvent = env.into();
    let raw = match event {
        ProgressEvent::Diagnostic(v) => v,
        other => panic!("expected Diagnostic, got {other:?}"),
    };
    // Typed decode intentionally fails — the test asserts the envelope is
    // still classified, not that every shape can be parsed.
    assert!(serde_json::from_value::<DiagnosticAlignmentPayload>(raw).is_err());
}
