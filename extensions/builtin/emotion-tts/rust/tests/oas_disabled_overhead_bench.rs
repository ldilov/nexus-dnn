//! T067b — zero-overhead check for the OAS layer (spec 034 FR-213).
//!
//! FR-213 says: "disabled state MUST skip all attention-tensor capture".
//! In the Rust shim the only new hot-path cost when OAS is active is the
//! notification classifier picking up `diagnostic` envelopes. This bench
//! measures that classifier to prove it stays in the single-digit
//! microsecond range — so turning OAS *on* adds negligible per-segment
//! overhead, and turning it *off* adds zero (the dispatcher never calls
//! `AttentionCapture` at all).
//!
//! End-to-end "50-segment batch with oas=false vs baseline" wall-clock
//! comparison requires a running Python worker + GPU and is therefore
//! intentionally out of scope for this Rust-only bench — documented in
//! `tasks.md` T067b for a future session that ships a live-runtime smoke.
//!
//! Gated behind ``RUN_BENCH=1`` so slower CI machines don't cause
//! spurious failures from scheduler noise.

use emotion_tts_extension::backend_client::notifications::ProgressEvent;
use emotion_tts_extension::host_contract::NotificationEnvelope;
use serde_json::json;
use std::time::Instant;

const N_SAMPLES: usize = 50_000;
const PER_CALL_BUDGET_US: f64 = 10.0;

fn bench_enabled() -> bool {
    std::env::var("RUN_BENCH").ok().as_deref() == Some("1")
}

#[test]
fn diagnostic_classification_fits_budget() {
    if !bench_enabled() {
        eprintln!("skipping: RUN_BENCH=1 not set");
        return;
    }

    let params = json!({
        "run_id": "run_xyz",
        "global_index": 3,
        "alignment_score": 0.41,
        "alignment_flag": true,
        "threshold_used": 0.45,
        "threshold_source": "literature_default",
        "attention_map_artifact_ref": "artifact://diagnostics/abc.png"
    });

    let start = Instant::now();
    let mut flagged = 0usize;
    for _ in 0..N_SAMPLES {
        let env = NotificationEnvelope {
            method: "diagnostic".into(),
            params: params.clone(),
        };
        let event: ProgressEvent = env.into();
        if matches!(event, ProgressEvent::Diagnostic(_)) {
            flagged += 1;
        }
    }
    let elapsed = start.elapsed();
    let per_call_us = elapsed.as_micros() as f64 / N_SAMPLES as f64;

    assert_eq!(flagged, N_SAMPLES, "every envelope must classify");
    assert!(
        per_call_us < PER_CALL_BUDGET_US,
        "diagnostic classification {per_call_us:.2} µs/call exceeds {PER_CALL_BUDGET_US} µs budget",
    );
    eprintln!("T067b: diagnostic classification {per_call_us:.2} µs/call over {N_SAMPLES} samples");
}

#[test]
fn non_diagnostic_envelopes_have_same_classification_cost() {
    if !bench_enabled() {
        eprintln!("skipping: RUN_BENCH=1 not set");
        return;
    }
    // The `progress` / `segment_completed` / etc. variants existed before
    // spec 034 — they must still classify in O(1) so that oas=false runs
    let envelopes = [
        ("progress", json!({"pct": 50})),
        ("segment_completed", json!({"index": 1})),
        ("warning", json!({"msg": "x"})),
    ];
    for (method, params) in &envelopes {
        let start = Instant::now();
        for _ in 0..N_SAMPLES {
            let env = NotificationEnvelope {
                method: (*method).to_string(),
                params: params.clone(),
            };
            let _event: ProgressEvent = env.into();
        }
        let per_call_us = start.elapsed().as_micros() as f64 / N_SAMPLES as f64;
        assert!(
            per_call_us < PER_CALL_BUDGET_US,
            "{method} classification {per_call_us:.2} µs/call exceeds {PER_CALL_BUDGET_US} µs budget",
        );
    }
}
