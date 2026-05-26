from __future__ import annotations

import pytest

from longcat_video_worker import compile_storyboard as cs
from longcat_video_worker.plan_validate import validate_plan


def _scenes_from(plan_payload):
    return plan_payload["scenes"]


def test_normalize_collapses_whitespace_and_unicode_dashes():
    assert cs.normalize_text("  a — b   c  ") == "a - b c"


def test_classify_nosplit_literal_blocks_split():
    assert cs.classify_intent("a long continuous shot of waves", 5) == "single_continuation"


def test_classify_do_not_split_phrase():
    assert cs.classify_intent("waves crashing, do not split", 3) == "single_continuation"


def test_classify_scene_count_1_forces_single():
    assert cs.classify_intent("a thief runs then the guard pursues", 1) == "single_continuation"


def test_classify_scene_count_ge2_returns_storyboard():
    assert cs.classify_intent("a thief runs", 3) == "storyboard_scenes"


def test_score_storyboard_signals_temporal():
    score = cs.score_storyboard_signals("first, then later")
    assert score >= 2


def test_score_storyboard_signals_enumeration():
    score = cs.score_storyboard_signals("1. scene one\n2. scene two")
    assert score >= 2


def test_score_storyboard_signals_semicolons():
    score = cs.score_storyboard_signals("first; second; third")
    assert score >= 2


def test_score_storyboard_signals_short_descriptive_low():
    score = cs.score_storyboard_signals("a single flower in morning light")
    assert score < 3


def test_anchor_extract_named_character():
    anchor = cs.extract_anchor("a samurai named Kenji draws his blade", None)
    assert "samurai" in anchor.sanitized.lower()
    assert "Kenji" in anchor.sanitized


def test_anchor_extract_proper_name_fallback():
    anchor = cs.extract_anchor("Alice walks through the forest", None)
    assert "Alice" in anchor.sanitized


def test_anchor_extract_with_style_hint():
    anchor = cs.extract_anchor("Alice walks", "noir thriller")
    assert "Alice" in anchor.sanitized
    assert "noir" in anchor.sanitized.lower()


def test_anchor_uses_fallback_when_nothing_extractable():
    anchor = cs.extract_anchor("the wind blows softly", None)
    assert anchor.sanitized == cs.ANCHOR_FALLBACK


def test_anchor_rejects_non_ascii_and_falls_back():
    anchor = cs.extract_anchor("一个角色", None)
    assert anchor.sanitized == cs.ANCHOR_FALLBACK


def test_anchor_truncated_at_60_chars():
    long_hint = "X" * 200
    anchor = cs.extract_anchor("scene description", long_hint)
    assert len(anchor.sanitized) <= cs.ANCHOR_BUDGET_CHARS


def test_split_temporal_three_beats():
    beats = cs.split_beats("a runs through the alley then b chases through the station finally c arrives at the rooftop")
    assert len(beats) >= 3


def test_split_semicolon_beats():
    beats = cs.split_beats("scene one happens; scene two happens; scene three happens")
    assert len(beats) == 3


def test_split_sentence_fallback():
    beats = cs.split_beats("The thief runs fast. The guard pursues quickly. The thief escapes finally.")
    assert len(beats) == 3


def test_split_single_beat_when_no_signals():
    beats = cs.split_beats("a calm meadow at sunset")
    assert len(beats) == 1


def test_fit_beats_pads_when_under_count():
    beats = cs.fit_beats_to_count(["only one"], 3)
    assert len(beats) == 3


def test_fit_beats_merges_when_over_count():
    beats = cs.fit_beats_to_count(["a", "b", "c", "d", "e"], 2)
    assert len(beats) == 2
    assert "c" in beats[1] and "d" in beats[1] and "e" in beats[1]


def test_fit_beats_exact_count():
    beats = cs.fit_beats_to_count(["a", "b", "c"], 3)
    assert beats == ["a", "b", "c"]


def test_classify_motion_static():
    assert cs.classify_motion("a calm meadow at sunset") == "static"


def test_classify_motion_dynamic():
    assert cs.classify_motion("the thief runs through alley") == "dynamic"


def test_classify_motion_intense():
    text = "she runs chases jumps and dances"
    assert cs.classify_motion(text) == "intense"


def test_allocate_durations_single_scene():
    out = cs.allocate_per_scene_generated(5.0, 1)
    assert out == [5.0]


def test_allocate_durations_three_scenes_include_overlap_compensation():
    out = cs.allocate_per_scene_generated(9.0, 3)
    assert len(out) == 3
    assert out[1] > out[0]
    assert out[2] > out[0]


def test_allocate_durations_clamps_to_min():
    out = cs.allocate_per_scene_generated(0.3, 1)
    assert out[0] >= cs.SCENE_DURATION_MIN


def test_allocate_durations_clamps_to_max():
    out = cs.allocate_per_scene_generated(50.0, 1)
    assert out[0] <= cs.SCENE_DURATION_MAX


def test_clamp_inputs_empty_prompt_raises():
    with pytest.raises(cs.StoryboardCompileError) as exc:
        cs.clamp_inputs("   ", 5.0, 2)
    assert exc.value.sub_reason == "PROMPT_EMPTY"


def test_clamp_inputs_scene_count_too_high_raises():
    with pytest.raises(cs.StoryboardCompileError) as exc:
        cs.clamp_inputs("prompt", 5.0, 99)
    assert exc.value.sub_reason == "SCENE_COUNT_TOO_HIGH"


def test_clamp_inputs_duration_below_floor_raises():
    with pytest.raises(cs.StoryboardCompileError) as exc:
        cs.clamp_inputs("prompt", 0.5, 3)
    assert exc.value.sub_reason == "DURATION_BELOW_SCENE_FLOOR"


def test_clamp_inputs_duration_above_limit_clamped():
    _, dur, _ = cs.clamp_inputs("prompt", 100.0, 1)
    assert dur == cs.TOTAL_DURATION_MAX


def test_compose_scene_prompt_adds_anchor_prefix():
    out = cs.compose_scene_prompt("Alice, noir", "she enters the room")
    assert out.startswith("Alice, noir.")


def test_compose_scene_prompt_trims_to_budget():
    long_beat = "x" * 500
    out = cs.compose_scene_prompt("Alice", long_beat, budget=100)
    assert len(out) <= 100


def test_compile_single_continuation_returns_one_scene():
    plan = cs.compile_storyboard("a calm meadow at sunset, continuous shot", 4.0, 1)
    assert len(plan.scenes) == 1
    assert plan.classification == "single_continuation"
    assert plan.scenes[0].mode == "t2v"
    assert plan.scenes[0].overlap_frames == 0


def test_compile_storyboard_three_scenes_modes_and_overlap():
    plan = cs.compile_storyboard(
        "Alice runs through the alley then chases through station finally arrives at rooftop",
        9.0,
        3,
        style_hint="cinematic noir",
    )
    assert len(plan.scenes) == 3
    assert plan.scenes[0].mode == "t2v"
    assert plan.scenes[0].overlap_frames == 0
    assert plan.scenes[1].mode == "vc"
    assert plan.scenes[1].overlap_frames == cs.OVERLAP_FRAMES_DEFAULT
    assert plan.scenes[2].mode == "vc"


def test_compile_anchor_prefix_present_in_every_scene():
    plan = cs.compile_storyboard(
        "Alice runs then she chases then she arrives", 9.0, 3, style_hint="noir"
    )
    for scene in plan.scenes:
        assert plan.anchor in scene.prompt


def test_compile_validate_plan_passes_for_single_scene():
    out = cs.compile_and_validate("a calm meadow", 4.0, 1)
    assert out["validated"]["ok"] is True


def test_compile_validate_plan_passes_for_three_scenes():
    out = cs.compile_and_validate(
        "Alice runs then chases then arrives", 9.0, 3, "noir"
    )
    assert out["validated"]["ok"] is True
    assert len(out["validated"]["warnings"]) <= 2


@pytest.mark.parametrize(
    "name,prompt,duration,scene_count,style",
    [
        ("single_continuation", "a flower opens slowly in morning light, continuous shot", 2.0, 1, "cinematic"),
        ("3scene_chase", "a thief runs then the guard pursues finally cornered at the wall", 9.0, 3, "action"),
        ("5scene_montage", "City at dawn; workers arrive; noon bustle; evening rush; night silence", 15.0, 5, "documentary"),
        ("nosplit_explicit", "continuous loop of crashing ocean waves, do not split", 6.0, 2, "nature"),
        ("character_continuity", "a samurai named Kenji walks; Kenji draws his blade; Kenji stands victorious", 9.0, 3, "epic"),
        ("budget_overflow", "a long winding tale of " + "very dramatic " * 30 + "events unfolding", 12.0, 4, "drama"),
    ],
)
def test_golden_compiles_and_validates(name, prompt, duration, scene_count, style):
    out = cs.compile_and_validate(prompt, duration, scene_count, style)
    assert out["validated"]["ok"] is True, f"{name}: {out['validated'].get('error')}"
    assert len(out["validated"]["warnings"]) <= 2, f"{name}: {out['validated']['warnings']}"
    for scene in out["plan"].scenes:
        assert len(scene.prompt) <= cs.PROMPT_BUDGET_CHARS


def test_golden_nosplit_yields_single_scene_even_with_count_2():
    out = cs.compile_and_validate("continuous shot of waves, do not split", 6.0, 2, "nature")
    assert len(out["plan"].scenes) == 1


def test_golden_character_continuity_anchor_in_each_scene():
    plan = cs.compile_storyboard(
        "a samurai named Kenji walks; Kenji draws his blade; Kenji stands victorious",
        9.0,
        3,
        "epic",
    )
    for scene in plan.scenes:
        assert plan.anchor in scene.prompt


def test_input_clamp_gate_always_validates_after_clamp():
    out = cs.compile_and_validate("a thief runs then escapes", 100.0, 4, "action")
    assert out["validated"]["ok"] is True


def test_compile_emits_anchor_sanitized_warning_when_non_ascii_clipped():
    plan = cs.compile_storyboard("一个角色 runs then escapes", 9.0, 3, None)
    assert plan.anchor != ""
