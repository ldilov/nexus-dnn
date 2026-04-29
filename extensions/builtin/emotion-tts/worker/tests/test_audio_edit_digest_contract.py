"""Cross-language digest contract test (companion to the Rust test of the
same name). Both sides MUST agree on the SHA-256 of the canonical JSON form
of the fixture chain. Failure here means the canonicaliser drifted between
Rust serde and Python json.dumps; the fix is to bring them back into agreement
in lockstep — never one side at a time."""

from __future__ import annotations

import json
from pathlib import Path

from emotion_tts_worker.audio_edit.digest import compute_digest


FIXTURE_PATH = Path(__file__).parent / "fixtures" / "digest_contract_chain.json"
EXPECTED_HEX = "31713f6bc5b2ff12cd9973847f6f91a26f0d4bb2906b9fa2501be96d39900145"


def test_python_compute_digest_matches_fixture_hex() -> None:
    chain = json.loads(FIXTURE_PATH.read_text(encoding="utf-8"))
    assert compute_digest(chain) == EXPECTED_HEX, (
        "Python digest drifted from the Rust ChainDigest::of result. "
        "The fixture and Rust test in audio_edit_digest_contract_test.rs MUST be updated together."
    )


def test_python_digest_invariant_under_dict_construction_order() -> None:
    construct_a = {
        "version": 1,
        "ops": [
            {"mode": "trim", "id": "01HX0000000000000000000001", "start_ms": 100, "end_ms": 1500},
        ],
    }
    construct_b = {
        "ops": [
            {"end_ms": 1500, "start_ms": 100, "id": "01HX0000000000000000000001", "mode": "trim"},
        ],
        "version": 1,
    }
    assert compute_digest(construct_a) == compute_digest(construct_b), (
        "sort_keys=True must make compute_digest invariant under dict insertion order"
    )
