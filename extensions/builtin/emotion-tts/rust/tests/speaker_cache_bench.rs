//! T076 — speaker-prefix cache bench scaffold (spec 034 US3).
//!
//! The full bench specified in tasks.md — "50-line single-speaker script,
//! hit-rate >= 95 %, warm-start latency >= 60 % reduction, wall-clock
//! >= 5 % reduction" — measures an end-to-end run against a live Python
//! worker with real IndexTTS-2 weights. That's out of scope for a pure
//! Rust bench; it lives behind the ``RUN_GPU_BENCH=1`` gate and is meant
//! for a developer workstation (see T128 smoke).
//!
//! What this file *does* test under ``RUN_BENCH=1`` is the Rust-level
//! hot-path cost of constructing + serialising a ``SpeakerCacheHint``
//! parameter on every ``synthesize.batch`` call. If this is slow, the
//! per-batch dispatch overhead dominates and the cache's wall-clock win
//! is eroded before it begins. Budget: < 5 µs/call.

use emotion_tts_extension::backend_client::params::{
    SpeakerCacheHint, SynthesizeBatchSpec034Extensions,
};
use serde_json::json;
use std::time::Instant;

const N_SAMPLES: usize = 100_000;
const PER_CALL_BUDGET_US: f64 = 5.0;

fn bench_enabled() -> bool {
    std::env::var("RUN_BENCH").ok().as_deref() == Some("1")
}

#[test]
fn speaker_cache_hint_serialisation_fits_budget() {
    if !bench_enabled() {
        eprintln!("skipping: RUN_BENCH=1 not set");
        return;
    }

    let ext = SynthesizeBatchSpec034Extensions {
        model_family: Some("indextts-2".into()),
        enable_attention_capture: Some(true),
        enable_compile: Some(false),
        speaker_cache_hint: Some(SpeakerCacheHint::from_budget_mb(200)),
    };

    let start = Instant::now();
    let mut bytes_seen = 0usize;
    for _ in 0..N_SAMPLES {
        let v = serde_json::to_value(&ext).unwrap();
        bytes_seen += v.to_string().len();
    }
    let per_call_us = start.elapsed().as_micros() as f64 / N_SAMPLES as f64;
    assert!(bytes_seen > 0);
    assert!(
        per_call_us < PER_CALL_BUDGET_US,
        "hint serialisation {per_call_us:.2} µs/call exceeds {PER_CALL_BUDGET_US} µs budget",
    );
    eprintln!(
        "T076: SynthesizeBatchSpec034Extensions serialises in {per_call_us:.2} µs/call over {N_SAMPLES} samples",
    );
}

#[test]
fn speaker_cache_hint_defaults_match_adapter_settings_default() {
    let hint = SpeakerCacheHint::from_budget_mb(200);
    let wire = serde_json::to_value(&hint).unwrap();
    assert_eq!(wire, json!({ "enabled": true, "budget_mb": 200 }));

    let disabled = SpeakerCacheHint::disabled();
    assert!(!disabled.enabled);
    assert_eq!(disabled.budget_mb, 0);
}
