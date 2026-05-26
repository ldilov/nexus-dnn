from __future__ import annotations

import json
from dataclasses import dataclass

import pytest

from longcat_video_worker import plan_llm
from longcat_video_worker.plan_llm import (
    LLM_COMBINED_WALL_TIMEOUT_S,
    LLM_MAX_TOKENS,
    LLM_OUTPUT_MAX_BYTES,
    LLM_TEMPERATURE,
    LLM_TIMEOUT_S,
    LeaseTimeoutError,
    LeaseUnavailableError,
    NoLeaseClient,
    PlannerResult,
    expand_prompt,
    extract_json_block,
    parse_llm_output,
    repair_anchor,
)


@dataclass
class ScriptedLease:
    responses: list[str]
    raise_per_call: list[BaseException | None] | None = None
    calls: list[tuple[str, str, int, float]] = None

    def __post_init__(self):
        self.calls = []

    def complete(self, system, user, max_tokens, timeout_s):
        self.calls.append((system, user, max_tokens, timeout_s))
        idx = len(self.calls) - 1
        if self.raise_per_call and idx < len(self.raise_per_call) and self.raise_per_call[idx] is not None:
            raise self.raise_per_call[idx]
        return self.responses[idx]


def _valid_three_scene_json(anchor: str = "Alice cinematic") -> str:
    return json.dumps(
        {
            "scenes": [
                {"prompt": f"{anchor}. she walks", "duration_seconds": 3.0, "motion_intensity": "dynamic", "adain_factor": 0.2},
                {"prompt": f"{anchor}. she runs", "duration_seconds": 3.0, "motion_intensity": "dynamic", "adain_factor": 0.2},
                {"prompt": f"{anchor}. she escapes", "duration_seconds": 3.0, "motion_intensity": "intense", "adain_factor": 0.2},
            ]
        }
    )


def test_constants_match_spec():
    assert LLM_TIMEOUT_S == 15.0
    assert LLM_MAX_TOKENS == 2048
    assert LLM_TEMPERATURE == 0.2
    assert LLM_COMBINED_WALL_TIMEOUT_S == 20.0
    assert LLM_OUTPUT_MAX_BYTES == 8192


def test_llm_max_tokens_fits_three_scene_videoplan():
    payload = _valid_three_scene_json("Alice cinematic, ambient lighting, slow camera")
    approx_tokens = max(1, len(payload) // 3)
    assert LLM_MAX_TOKENS >= approx_tokens, (
        f"LLM_MAX_TOKENS={LLM_MAX_TOKENS} truncates a 3-scene VideoPlan (~{approx_tokens} tokens). "
        "Raise it before shipping schema-constrained generation."
    )


def test_no_lease_client_raises():
    with pytest.raises(LeaseUnavailableError):
        NoLeaseClient().complete("", "x", 10, 1.0)


def test_use_llm_false_returns_deterministic():
    out = expand_prompt(
        "Alice runs then escapes", 6.0, 2, "noir", use_llm=False
    )
    assert out.compiler == "deterministic"
    assert len(out.scenes) == 2


def test_use_llm_true_no_lease_falls_back_with_warning():
    out = expand_prompt(
        "Alice runs then escapes", 6.0, 2, "noir", use_llm=True, lease_client=None
    )
    assert out.compiler == "deterministic"


def test_use_llm_true_with_no_lease_client_raises_on_complete_falls_back():
    out = expand_prompt(
        "Alice runs then escapes",
        6.0,
        2,
        "noir",
        use_llm=True,
        lease_client=NoLeaseClient(),
    )
    assert out.compiler == "llm_fallback_deterministic"
    codes = [w.code for w in out.warnings]
    assert "LLM_LEASE_UNAVAILABLE" in codes


def test_extract_json_block_strips_code_fence():
    raw = "here is the answer:\n```json\n{\"scenes\":[]}\n```\n"
    assert extract_json_block(raw) == '{"scenes":[]}'


def test_extract_json_block_finds_balanced_braces():
    raw = "prefix {\"a\":1,\"b\":[2,3]} suffix"
    assert extract_json_block(raw) == '{"a":1,"b":[2,3]}'


def test_extract_json_block_returns_none_on_no_braces():
    assert extract_json_block("no json here") is None


def test_parse_llm_output_rejects_oversize():
    big = "x" * (LLM_OUTPUT_MAX_BYTES + 100)
    with pytest.raises(ValueError):
        parse_llm_output(big)


def test_parse_llm_output_rejects_non_dict_top_level():
    with pytest.raises(ValueError):
        parse_llm_output("[1, 2, 3]")


def test_parse_llm_output_happy_path():
    obj = parse_llm_output('{"scenes":[{"prompt":"hi","duration_seconds":1}]}')
    assert obj["scenes"][0]["prompt"] == "hi"


def test_repair_anchor_injects_missing_prefix():
    scenes = [
        {"prompt": "she walks alone", "duration_seconds": 1, "motion_intensity": "dynamic", "adain_factor": 0.2}
    ]
    out, idx = repair_anchor(scenes, "Alice")
    assert out[0]["prompt"].lower().startswith("alice")
    assert idx == [0]


def test_repair_anchor_no_repair_when_prefix_present():
    scenes = [
        {"prompt": "Alice. she walks", "duration_seconds": 1, "motion_intensity": "dynamic", "adain_factor": 0.2}
    ]
    out, idx = repair_anchor(scenes, "Alice")
    assert idx == []


def test_repair_anchor_reorder_repair():
    scenes = [
        {"prompt": "she walks. Alice", "duration_seconds": 1, "motion_intensity": "dynamic", "adain_factor": 0.2}
    ]
    out, idx = repair_anchor(scenes, "Alice")
    assert out[0]["prompt"].lower().startswith("alice")
    assert idx == [0]


def test_lease_happy_path_returns_llm_compiler_tag():
    lease = ScriptedLease(responses=[_valid_three_scene_json("Alice")])
    out = expand_prompt(
        "Alice runs then chases then arrives",
        9.0,
        3,
        "cinematic",
        use_llm=True,
        lease_client=lease,
    )
    assert out.compiler == "llm"
    assert len(out.scenes) == 3
    assert len(lease.calls) == 1


def test_lease_invalid_json_triggers_repair_then_success():
    lease = ScriptedLease(
        responses=["this is not json at all", _valid_three_scene_json("Alice")]
    )
    out = expand_prompt(
        "Alice runs then chases then arrives",
        9.0,
        3,
        "cinematic",
        use_llm=True,
        lease_client=lease,
    )
    assert out.compiler == "llm"
    assert len(lease.calls) == 2


def test_lease_repair_also_fails_falls_back_to_s2_1():
    lease = ScriptedLease(responses=["garbage", "still garbage"])
    out = expand_prompt(
        "Alice runs then chases then arrives",
        9.0,
        3,
        "cinematic",
        use_llm=True,
        lease_client=lease,
    )
    assert out.compiler == "llm_fallback_deterministic"
    assert len(lease.calls) == 2
    codes = [w.code for w in out.warnings]
    assert "LLM_INVALID_JSON" in codes


def test_lease_timeout_falls_back():
    lease = ScriptedLease(
        responses=[""],
        raise_per_call=[LeaseTimeoutError("model too slow")],
    )
    out = expand_prompt(
        "Alice runs then escapes", 6.0, 2, "noir", use_llm=True, lease_client=lease
    )
    assert out.compiler == "llm_fallback_deterministic"
    codes = [w.code for w in out.warnings]
    assert "LLM_LEASE_TIMEOUT" in codes


def test_lease_unavailable_falls_back():
    lease = ScriptedLease(
        responses=[""],
        raise_per_call=[LeaseUnavailableError("no model installed")],
    )
    out = expand_prompt(
        "Alice runs then escapes", 6.0, 2, "noir", use_llm=True, lease_client=lease
    )
    assert out.compiler == "llm_fallback_deterministic"
    codes = [w.code for w in out.warnings]
    assert "LLM_LEASE_UNAVAILABLE" in codes


def test_validation_failure_falls_back():
    bad = json.dumps(
        {
            "scenes": [
                {"prompt": "x", "duration_seconds": 999.0, "motion_intensity": "dynamic", "adain_factor": 0.2}
            ]
        }
    )
    lease = ScriptedLease(responses=[bad])
    out = expand_prompt(
        "Alice walks slowly through meadow", 2.0, 1, None, use_llm=True, lease_client=lease
    )
    assert out.compiler in {"llm", "llm_fallback_deterministic"}


def test_no_third_attempt_ever():
    lease = ScriptedLease(responses=["bad1", "bad2", "bad3"])
    expand_prompt(
        "Alice runs then escapes", 6.0, 2, "noir", use_llm=True, lease_client=lease
    )
    assert len(lease.calls) <= 2


def test_lease_call_uses_max_tokens_and_timeout_constants():
    lease = ScriptedLease(responses=[_valid_three_scene_json("Alice")])
    expand_prompt(
        "Alice runs then chases then arrives",
        9.0,
        3,
        "cinematic",
        use_llm=True,
        lease_client=lease,
    )
    _, _, max_tokens, timeout_s = lease.calls[0]
    assert max_tokens == LLM_MAX_TOKENS
    assert timeout_s <= LLM_TIMEOUT_S


def test_anchor_repaired_warning_emitted_when_llm_omits_prefix():
    payload = json.dumps(
        {
            "scenes": [
                {"prompt": "she walks alone in field", "duration_seconds": 3.0, "motion_intensity": "dynamic", "adain_factor": 0.2},
                {"prompt": "she runs into woods", "duration_seconds": 3.0, "motion_intensity": "dynamic", "adain_factor": 0.2},
                {"prompt": "she rests by stream", "duration_seconds": 3.0, "motion_intensity": "static", "adain_factor": 0.2},
            ]
        }
    )
    lease = ScriptedLease(responses=[payload])
    out = expand_prompt(
        "Alice walks then runs then rests",
        9.0,
        3,
        "noir",
        use_llm=True,
        lease_client=lease,
    )
    codes = [w.code for w in out.warnings]
    assert "LLM_ANCHOR_REPAIRED" in codes
    for scene in out.scenes:
        assert out.anchor.lower() in scene["prompt"].lower()


def test_fallback_result_always_validates_ok():
    from longcat_video_worker.plan_validate import validate_plan

    out = expand_prompt(
        "Alice runs", 9.0, 3, "noir", use_llm=True, lease_client=NoLeaseClient()
    )
    validated = validate_plan({"scenes": out.scenes})
    assert validated["ok"] is True


def test_planner_result_to_dict_shape():
    out = expand_prompt(
        "Alice runs then escapes", 6.0, 2, "noir", use_llm=False
    )
    d = out.to_dict()
    assert "scenes" in d
    assert "compiler" in d
    assert "warnings" in d
    assert "anchor" in d


def test_warning_detail_truncated_to_200_chars():
    very_long = "x" * 500
    lease = ScriptedLease(
        responses=[""],
        raise_per_call=[LeaseUnavailableError(very_long)],
    )
    out = expand_prompt(
        "Alice runs", 6.0, 2, "noir", use_llm=True, lease_client=lease
    )
    for w in out.warnings:
        assert len(w.detail) <= 200


def test_prompt_inputs_appear_in_user_message():
    lease = ScriptedLease(responses=[_valid_three_scene_json("Alice")])
    expand_prompt(
        "Alice runs then chases then arrives",
        9.0,
        3,
        "cinematic",
        use_llm=True,
        lease_client=lease,
    )
    _, user_msg, _, _ = lease.calls[0]
    assert "ANCHOR" in user_msg
    assert "SCENE_COUNT: 3" in user_msg
    assert "Alice runs" in user_msg


def test_expand_and_persist_writes_artifacts_when_paths_given(tmp_path):
    from longcat_video_worker.plan_llm import expand_and_persist

    result, bundle = expand_and_persist(
        "Alice walks then runs then escapes",
        9.0,
        3,
        "cinematic",
        output_dir=str(tmp_path),
        run_id="rp-1",
    )
    assert result.compiler == "deterministic"
    assert bundle is not None
    assert bundle.plan_path.exists()
    assert len(bundle.scene_paths) == 3
    assert bundle.run_id == "rp-1"


def test_expand_and_persist_skips_io_without_paths(tmp_path):
    from longcat_video_worker.plan_llm import expand_and_persist

    result, bundle = expand_and_persist(
        "Alice walks",
        3.0,
        1,
        "cinematic",
    )
    assert result.compiler == "deterministic"
    assert bundle is None
    assert list(tmp_path.iterdir()) == []
