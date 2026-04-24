//! T090 — compiled GPT wall-clock bench (spec 034 SC-206, SC-207).
//!
//! The real bench — "50-line script, compiled wall-clock <= 0.55 ×
//! baseline; fallback wall-clock <= 1.05 × baseline on a CUDA-13
//! Windows workstation" — requires a live Python worker with real
//! IndexTTS-2 weights and a GPU. That's pinned behind ``RUN_GPU_BENCH=1``
//! and documented here for the workstation operator; this file is the
//! placeholder + contract for the Rust-side extensions that gate into it.
//!
//! Under ``RUN_BENCH=1`` (no GPU needed) this file asserts that the
//! ``SynthesizeBatchSpec034Extensions::from_deployment`` helper composes
//! the expected compile-on payload shape in < 2 µs/call so dispatch
//! overhead can never erase the compile's 2-4× wall-clock win.

use emotion_tts_extension::backend_client::params::{
    SpeakerCacheHint, SynthesizeBatchSpec034Extensions,
};
use serde_json::{json, Value};
use std::time::Instant;

const N_SAMPLES: usize = 100_000;
const PER_CALL_BUDGET_US: f64 = 2.0;

fn bench_enabled() -> bool {
    std::env::var("RUN_BENCH").ok().as_deref() == Some("1")
}

#[test]
fn from_deployment_composes_compile_on_payload() {
    let ext = SynthesizeBatchSpec034Extensions::from_deployment(
        "indextts-2",
        /* oas_enabled */ true,
        /* compile_gpt_enabled */ true,
        /* speaker_cache_budget_mb */ 200,
    );
    let wire = serde_json::to_value(&ext).unwrap();
    assert_eq!(wire["model_family"], "indextts-2");
    assert_eq!(wire["enable_attention_capture"], true);
    assert_eq!(wire["enable_compile"], true);
    assert_eq!(wire["speaker_cache_hint"], json!({
        "enabled": true,
        "budget_mb": 200,
    }));
}

#[test]
fn from_deployment_with_compile_off_emits_explicit_false() {
    let ext = SynthesizeBatchSpec034Extensions::from_deployment(
        "indextts-2-5",
        /* oas_enabled */ false,
        /* compile_gpt_enabled */ false,
        /* speaker_cache_budget_mb */ 512,
    );
    let wire = serde_json::to_value(&ext).unwrap();
    assert_eq!(wire["model_family"], "indextts-2-5");
    assert_eq!(wire["enable_attention_capture"], false);
    assert_eq!(wire["enable_compile"], false);
    assert_eq!(wire["speaker_cache_hint"]["budget_mb"], 512);
}

#[test]
fn speaker_cache_hint_disabled_round_trips() {
    let hint = SpeakerCacheHint::disabled();
    let v: Value = serde_json::to_value(&hint).unwrap();
    assert_eq!(v, json!({ "enabled": false, "budget_mb": 0 }));
}

#[test]
fn from_deployment_helper_hot_path_fits_budget() {
    if !bench_enabled() {
        eprintln!("skipping: RUN_BENCH=1 not set");
        return;
    }

    let start = Instant::now();
    let mut total_bytes = 0usize;
    for i in 0..N_SAMPLES {
        let ext = SynthesizeBatchSpec034Extensions::from_deployment(
            "indextts-2",
            i % 2 == 0,
            i % 3 == 0,
            200,
        );
        let s = serde_json::to_string(&ext).unwrap();
        total_bytes += s.len();
    }
    let per_call_us = start.elapsed().as_micros() as f64 / N_SAMPLES as f64;
    assert!(total_bytes > 0);
    assert!(
        per_call_us < PER_CALL_BUDGET_US,
        "from_deployment + serialise {per_call_us:.2} µs/call exceeds {PER_CALL_BUDGET_US} µs",
    );
    eprintln!("T090: from_deployment hot-path {per_call_us:.2} µs/call over {N_SAMPLES} samples");
}
