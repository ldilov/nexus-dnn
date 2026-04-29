use emotion_tts_extension::domain::{ChainDigest, EditChain};

const FIXTURE_JSON: &str =
    include_str!("../../worker/tests/fixtures/digest_contract_chain.json");

const EXPECTED_HEX: &str = "31713f6bc5b2ff12cd9973847f6f91a26f0d4bb2906b9fa2501be96d39900145";

#[test]
fn rust_chain_digest_matches_fixture_hex() {
    let chain: EditChain = serde_json::from_str(FIXTURE_JSON).expect("fixture parses as EditChain");
    let digest = ChainDigest::of(&chain);
    assert_eq!(
        digest.as_str(),
        EXPECTED_HEX,
        "fixture digest changed — update worker/tests/fixtures/digest_contract_chain.json AND \
         worker/tests/test_audio_edit_digest_contract.py AND this Rust test together"
    );
}
