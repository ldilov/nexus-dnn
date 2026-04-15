//! Spec 017 US10a — SC-514: typed Quantization enum, family-aware match, NVFP4 != MXFP4.
//!
//! RED skeleton authored in Phase 1. Goes GREEN in Phase 5 (T651).

#[test]
#[ignore = "red: spec-017 phase 5 — Quantization::match_quality Exact > Family > None"]
fn exact_beats_family_beats_none() {
    panic!("not yet implemented: Q4_K_M dep, installs {{Q4_K_S, Q4_K_M, Q5_K_M}} -> Q4_K_M wins");
}

#[test]
#[ignore = "red: spec-017 phase 5 — NVFP4 and MXFP4 are distinct"]
fn nvfp4_and_mxfp4_do_not_match() {
    panic!("not yet implemented: Quantization::match_quality(&NVFP4, &MXFP4) == MatchQuality::None");
}

#[test]
#[ignore = "red: spec-017 phase 5 — unknown strings deserialize to Other"]
fn unknown_quantization_round_trips_as_other() {
    panic!("not yet implemented: 'Q42_FOO' -> Quantization::Other(String)");
}
