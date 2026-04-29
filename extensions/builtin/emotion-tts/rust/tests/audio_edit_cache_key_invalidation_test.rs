use std::collections::BTreeMap;

use emotion_tts_extension::domain::cache_key::{build, CacheKeyInput};
use emotion_tts_extension::domain::emotion::EmotionPayload;
use emotion_tts_extension::domain::{ChainDigest, EditChain, EditOp, OperationId};

fn base_input() -> CacheKeyInput {
    CacheKeyInput {
        extension_version: "0.1.0".into(),
        runtime_version: "0.1.0".into(),
        model_version: "indextts-2-20250908".into(),
        model_family: "indextts-2".into(),
        text: "Sample line".into(),
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

fn populated_chain() -> EditChain {
    EditChain {
        version: 1,
        ops: vec![EditOp::Trim {
            id: OperationId::new(),
            start_ms: 0,
            end_ms: 5_000,
        }],
    }
}

#[test]
fn populated_chain_digest_changes_cache_key() {
    let empty_key = build(&base_input()).expect("build empty");
    let mut populated = base_input();
    populated.voice_asset_chain_digest = ChainDigest::of(&populated_chain());
    let populated_key = build(&populated).expect("build populated");
    assert_ne!(empty_key, populated_key);
}

#[test]
fn equal_digest_yields_equal_cache_key() {
    let chain = populated_chain();
    let digest_a = ChainDigest::of(&chain);
    let digest_b = ChainDigest::of(&chain);
    assert_eq!(digest_a, digest_b);

    let mut input_a = base_input();
    input_a.voice_asset_chain_digest = digest_a;
    let mut input_b = base_input();
    input_b.voice_asset_chain_digest = digest_b;

    assert_eq!(build(&input_a).unwrap(), build(&input_b).unwrap());
}

#[test]
fn clearing_chain_restores_original_cache_key() {
    let initial_key = build(&base_input()).expect("initial");

    let mut populated = base_input();
    populated.voice_asset_chain_digest = ChainDigest::of(&populated_chain());
    let populated_key = build(&populated).expect("populated");
    assert_ne!(initial_key, populated_key);

    let mut cleared = populated;
    cleared.voice_asset_chain_digest = ChainDigest::EMPTY.clone();
    let cleared_key = build(&cleared).expect("cleared");

    assert_eq!(initial_key, cleared_key);
}
