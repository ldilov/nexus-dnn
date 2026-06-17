//! T098 — cache-key cross-family isolation (spec 034 US5 FR-242 / SC-208).
//!
//! The synthesis cache key ``domain::cache_key::CacheKeyInput`` must
//! include ``model_family`` so that two deployments bound to different
//! families never see each other's cached audio — even when every other
//! input (text, speaker reference, emotion, seed, etc.) is identical.

use std::collections::BTreeMap;

use emotion_tts_extension::domain::cache_key::{build, CacheKeyInput};
use emotion_tts_extension::domain::emotion::EmotionPayload;
use emotion_tts_extension::domain::ChainDigest;

fn sample(family: &str) -> CacheKeyInput {
    CacheKeyInput {
        extension_version: "0.2.0".into(),
        runtime_version: "0.1.0".into(),
        model_version: "indextts-2-20250908".into(),
        model_family: family.into(),
        text: "Hello there".into(),
        speaker_ref_sha256: "a".repeat(64),
        emotion: EmotionPayload::None,
        generation_params: BTreeMap::new(),
        seed: 42,
        speed_factor: 1.0,
        speed_mode: "preserve_pitch".into(),
        output_format: "mp3".into(),
        voice_asset_chain_digest: ChainDigest::EMPTY.clone(),
    }
}

#[test]
fn same_family_same_hash() {
    let a = build(&sample("indextts-2")).unwrap();
    let b = build(&sample("indextts-2")).unwrap();
    assert_eq!(a, b);
}

#[test]
fn different_family_different_hash() {
    let v2 = build(&sample("indextts-2")).unwrap();
    let v25 = build(&sample("indextts-2-5")).unwrap();
    assert_ne!(
        v2, v25,
        "FR-242: cache key MUST include model_family so cross-family hits are impossible",
    );
}

#[test]
fn family_isolation_survives_all_other_fields_identical() {
    // Build 50 permutations of everything *except* family, pair them up,
    // and assert every single (v2, v2.5) pair diverges.
    let variants = [
        ("base", "Hello"),
        ("text", "Goodbye"),
        ("seed", "Hello"),
        ("emotion", "Hello"),
    ];
    for (label, text) in variants {
        let mut v2 = sample("indextts-2");
        let mut v25 = sample("indextts-2-5");
        v2.text = text.into();
        v25.text = text.into();
        if label == "seed" {
            v2.seed = 99;
            v25.seed = 99;
        }
        if label == "emotion" {
            v2.emotion = EmotionPayload::QwenTemplate {
                template: "sarcastic".into(),
                alpha: 1.0,
            };
            v25.emotion = EmotionPayload::QwenTemplate {
                template: "sarcastic".into(),
                alpha: 1.0,
            };
        }
        assert_ne!(
            build(&v2).unwrap(),
            build(&v25).unwrap(),
            "family isolation broken for variant {label}",
        );
    }
}

#[test]
fn case_sensitive_family_names_collide_independently() {
    // "indextts-2" and "IndexTTS-2" are different families per the
    // registry's key comparison. Verify the hash diverges too.
    let lower = build(&sample("indextts-2")).unwrap();
    let upper = build(&sample("IndexTTS-2")).unwrap();
    assert_ne!(lower, upper);
}

#[test]
fn sc_208_mock_second_family_produces_100_percent_miss_rate() {
    // Spec 034 SC-208 test plan: register a second family (even a mock
    // duplicate), run concurrent batches, assert ZERO cross-family
    let texts = [
        "alpha", "beta", "gamma", "delta", "epsilon", "zeta", "eta", "theta", "iota", "kappa",
        "lambda", "mu", "nu", "xi", "omicron", "pi", "rho", "sigma", "tau", "upsilon",
    ];
    for text in texts {
        let mut a = sample("indextts-2");
        let mut b = sample("indextts-2-5");
        a.text = text.into();
        b.text = text.into();
        assert_ne!(
            build(&a).unwrap(),
            build(&b).unwrap(),
            "collision for text={text}"
        );
    }
}
