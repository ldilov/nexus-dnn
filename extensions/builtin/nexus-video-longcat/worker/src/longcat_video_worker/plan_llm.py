from __future__ import annotations

import json
import re
import time
from dataclasses import dataclass
from typing import Any, Optional, Protocol

from .compile_storyboard import (
    ADAIN_FACTOR_DEFAULT,
    ANCHOR_FALLBACK,
    OVERLAP_FRAMES_DEFAULT,
    PROMPT_BUDGET_CHARS,
    SCENE_DURATION_MAX,
    SCENE_DURATION_MIN,
    StoryboardCompileError,
    allocate_per_scene_generated,
    classify_motion,
    clamp_inputs,
    compile_storyboard,
    extract_anchor,
)
from .plan_validate import PlanWarning, validate_plan


LLM_TIMEOUT_S = 15.0
LLM_COMBINED_WALL_TIMEOUT_S = 20.0
LLM_MAX_TOKENS = 512
LLM_TEMPERATURE = 0.2
LLM_OUTPUT_MAX_BYTES = 8192
WARNING_DETAIL_MAX_CHARS = 200

_VALID_MOTION = {"static", "dynamic", "intense"}

_CODE_FENCE = re.compile(r"```(?:json)?\s*(\{[\s\S]*?\})\s*```", re.IGNORECASE)
_PRINTABLE = re.compile(r"[^\x20-\x7E]+")


class LeaseUnavailableError(Exception):
    pass


class LeaseTimeoutError(Exception):
    pass


class LeaseClient(Protocol):
    def complete(
        self, system: str, user: str, max_tokens: int, timeout_s: float
    ) -> str: ...


class NoLeaseClient:
    def complete(
        self, system: str, user: str, max_tokens: int, timeout_s: float
    ) -> str:
        raise LeaseUnavailableError(
            "production lease wiring deferred; inject a LeaseClient for testing"
        )


@dataclass(frozen=True)
class PlannerResult:
    scenes: list[dict[str, Any]]
    compiler: str
    warnings: list[PlanWarning]
    anchor: str

    def to_dict(self) -> dict[str, Any]:
        return {
            "scenes": list(self.scenes),
            "compiler": self.compiler,
            "anchor": self.anchor,
            "warnings": [w.to_dict() for w in self.warnings],
        }


def _truncate_detail(text: str) -> str:
    cleaned = _PRINTABLE.sub(" ", text or "")
    cleaned = cleaned.strip()
    return cleaned[:WARNING_DETAIL_MAX_CHARS]


def extract_json_block(raw: str) -> Optional[str]:
    if not raw:
        return None
    fence_match = _CODE_FENCE.search(raw)
    if fence_match:
        return fence_match.group(1)
    start = raw.find("{")
    end = raw.rfind("}")
    if start == -1 or end <= start:
        return None
    return raw[start : end + 1]


def parse_llm_output(raw: str) -> dict[str, Any]:
    if raw is None:
        raise ValueError("empty output")
    if len(raw.encode("utf-8")) > LLM_OUTPUT_MAX_BYTES:
        raise ValueError("output exceeds size cap")
    block = extract_json_block(raw)
    if block is None:
        raise ValueError("no JSON block found")
    obj = json.loads(block)
    if not isinstance(obj, dict):
        raise ValueError("top-level JSON must be an object")
    return obj


def _coerce_scene_field(scene: dict[str, Any], anchor: str, idx: int) -> dict[str, Any]:
    prompt_raw = scene.get("prompt", "")
    if not isinstance(prompt_raw, str):
        prompt_raw = str(prompt_raw)
    prompt = prompt_raw.strip()
    duration_raw = scene.get("duration_seconds", scene.get("per_scene_generated_seconds"))
    if duration_raw is None:
        raise ValueError(f"scene[{idx}].duration_seconds missing")
    duration = float(duration_raw)
    duration = max(SCENE_DURATION_MIN, min(SCENE_DURATION_MAX, duration))
    motion = scene.get("motion_intensity", "dynamic")
    if motion not in _VALID_MOTION:
        motion = "dynamic"
    adain_raw = scene.get("adain_factor", ADAIN_FACTOR_DEFAULT)
    try:
        adain = float(adain_raw)
    except (TypeError, ValueError):
        adain = ADAIN_FACTOR_DEFAULT
    adain = max(0.0, min(1.0, adain))
    return {
        "prompt": prompt[:PROMPT_BUDGET_CHARS],
        "duration_seconds": duration,
        "motion_intensity": motion,
        "adain_factor": adain,
    }


def repair_anchor(scenes: list[dict[str, Any]], anchor: str) -> tuple[list[dict[str, Any]], list[int]]:
    repaired: list[dict[str, Any]] = []
    repaired_indices: list[int] = []
    for idx, scene in enumerate(scenes):
        prompt = scene["prompt"]
        if anchor and not prompt.lower().startswith(anchor.lower()):
            if anchor.lower() in prompt.lower():
                pattern = re.compile(re.escape(anchor), re.IGNORECASE)
                cleaned = pattern.sub("", prompt).strip(" ,.;:")
                new_prompt = f"{anchor}. {cleaned}".strip()
            else:
                new_prompt = f"{anchor}. {prompt}".strip()
            new_prompt = new_prompt[:PROMPT_BUDGET_CHARS]
            repaired.append({**scene, "prompt": new_prompt})
            repaired_indices.append(idx)
        else:
            repaired.append(scene)
    return repaired, repaired_indices


def materialize_scene_dicts(
    coerced_scenes: list[dict[str, Any]],
    target_total_fresh: float,
    target_count: int,
) -> list[dict[str, Any]]:
    if len(coerced_scenes) != target_count:
        coerced_scenes = coerced_scenes[:target_count]
        while len(coerced_scenes) < target_count:
            coerced_scenes.append(dict(coerced_scenes[-1]) if coerced_scenes else {
                "prompt": "",
                "duration_seconds": target_total_fresh / max(1, target_count),
                "motion_intensity": "dynamic",
                "adain_factor": ADAIN_FACTOR_DEFAULT,
            })
    fallback_durations = allocate_per_scene_generated(target_total_fresh, target_count)
    out: list[dict[str, Any]] = []
    for idx, scene in enumerate(coerced_scenes):
        duration = scene["duration_seconds"]
        if duration < SCENE_DURATION_MIN or duration > SCENE_DURATION_MAX:
            duration = fallback_durations[idx]
        overlap = 0 if idx == 0 else OVERLAP_FRAMES_DEFAULT
        mode = "t2v" if idx == 0 else "vc"
        out.append(
            {
                "prompt": scene["prompt"],
                "per_scene_generated_seconds": duration,
                "overlap_frames": overlap,
                "motion_intensity": scene["motion_intensity"],
                "adain_factor": scene["adain_factor"],
                "mode": mode,
            }
        )
    return out


def _build_system_prompt() -> str:
    return (
        "You are a video storyboard planner. Output ONLY a JSON object. "
        "No prose. No markdown fences. "
        "Schema: {\"scenes\":[{\"prompt\":str,\"duration_seconds\":number,"
        "\"motion_intensity\":\"static|dynamic|intense\",\"adain_factor\":number}]}. "
        "Every scene prompt MUST begin with the ANCHOR phrase verbatim. "
        "Each prompt <= 280 characters. Each scene shows ONLY its own beat — "
        "do not leak later-scene actions into earlier prompts."
    )


def _build_user_prompt(
    anchor: str,
    user_prompt: str,
    scene_count: int,
    total_duration: float,
    style_hint: Optional[str],
) -> str:
    example = (
        '{"scenes":[{"prompt":"a fox in a meadow. red fox walks slowly across green grass",'
        '"duration_seconds":2.0,"motion_intensity":"dynamic","adain_factor":0.2},'
        '{"prompt":"a fox in a meadow. red fox rests under shade of an oak tree",'
        '"duration_seconds":2.0,"motion_intensity":"static","adain_factor":0.2}]}'
    )
    style = style_hint or ""
    return (
        f"ANCHOR: {anchor}\n"
        f"SCENE_COUNT: {scene_count}\n"
        f"TOTAL_DURATION_SECONDS: {total_duration}\n"
        f"STYLE: {style}\n"
        f"USER_PROMPT: {user_prompt}\n\n"
        f"EXAMPLE_OUTPUT (for ANCHOR='a fox in a meadow', SCENE_COUNT=2, TOTAL=4):\n"
        f"{example}\n\n"
        f"Now output JSON only for the request above."
    )


def _build_repair_prompt(error_summary: str, prior_output: str) -> str:
    head = prior_output[:600] if prior_output else ""
    return (
        "Your previous output failed validation. "
        f"Error: {error_summary}\n"
        "Return ONLY the corrected JSON object. No prose. No markdown.\n"
        "Previous output (may be truncated):\n"
        f"{head}"
    )


def _llm_attempt(
    lease_client: LeaseClient,
    system: str,
    user: str,
    remaining_wall: float,
) -> tuple[Optional[str], Optional[str]]:
    if remaining_wall <= 0:
        return None, "wall budget exhausted"
    timeout = min(LLM_TIMEOUT_S, remaining_wall)
    try:
        return lease_client.complete(system, user, LLM_MAX_TOKENS, timeout), None
    except LeaseTimeoutError as exc:
        return None, f"timeout: {exc}"
    except LeaseUnavailableError as exc:
        return None, f"lease unavailable: {exc}"
    except Exception as exc:
        return None, f"lease error: {type(exc).__name__}: {exc}"


def _build_fallback_payload(
    prompt: str,
    duration_seconds: float,
    scene_count: int,
    style_hint: Optional[str],
) -> tuple[list[dict[str, Any]], str, list[PlanWarning]]:
    plan = compile_storyboard(prompt, duration_seconds, scene_count, style_hint)
    return [s.to_dict() for s in plan.scenes], plan.anchor, list(plan.warnings)


def expand_prompt(
    prompt: str,
    duration_seconds: float,
    scene_count: int,
    style_hint: Optional[str] = None,
    seed: int = 42,
    lease_client: Optional[LeaseClient] = None,
    use_llm: bool = False,
) -> PlannerResult:
    cleaned_prompt, clamped_duration, clamped_count = clamp_inputs(
        prompt, duration_seconds, scene_count
    )
    anchor = extract_anchor(cleaned_prompt, style_hint).sanitized or ANCHOR_FALLBACK

    if not use_llm or lease_client is None:
        scenes, anchor_used, base_warnings = _build_fallback_payload(
            cleaned_prompt, clamped_duration, clamped_count, style_hint
        )
        return PlannerResult(
            scenes=scenes,
            compiler="deterministic",
            warnings=base_warnings,
            anchor=anchor_used,
        )

    warnings: list[PlanWarning] = []
    deadline = time.monotonic() + LLM_COMBINED_WALL_TIMEOUT_S
    system_prompt = _build_system_prompt()
    user_prompt = _build_user_prompt(
        anchor, cleaned_prompt, clamped_count, clamped_duration, style_hint
    )

    raw_output: Optional[str] = None
    fail_reason: Optional[str] = None
    repair_done = False
    parsed: Optional[dict[str, Any]] = None

    while True:
        remaining = deadline - time.monotonic()
        raw_output, attempt_err = _llm_attempt(
            lease_client, system_prompt, user_prompt, remaining
        )
        if raw_output is None:
            fail_reason = attempt_err or "no output"
            break
        try:
            parsed = parse_llm_output(raw_output)
            break
        except (ValueError, json.JSONDecodeError) as exc:
            if repair_done:
                fail_reason = f"parse failed after repair: {exc}"
                break
            repair_done = True
            user_prompt = _build_repair_prompt(str(exc), raw_output)
            continue

    if parsed is None:
        warnings.append(
            PlanWarning(
                code=_classify_fail_code(fail_reason or "unknown"),
                scene_index=None,
                detail=_truncate_detail(fail_reason or "lease path failed"),
            )
        )
        fb_scenes, fb_anchor, fb_warnings = _build_fallback_payload(
            cleaned_prompt, clamped_duration, clamped_count, style_hint
        )
        warnings.extend(fb_warnings)
        return PlannerResult(
            scenes=fb_scenes,
            compiler="llm_fallback_deterministic",
            warnings=warnings,
            anchor=fb_anchor,
        )

    raw_scenes = parsed.get("scenes")
    if not isinstance(raw_scenes, list) or not raw_scenes:
        warnings.append(
            PlanWarning(
                code="LLM_INVALID_JSON",
                scene_index=None,
                detail=_truncate_detail("scenes key missing or not a list"),
            )
        )
        fb_scenes, fb_anchor, fb_warnings = _build_fallback_payload(
            cleaned_prompt, clamped_duration, clamped_count, style_hint
        )
        warnings.extend(fb_warnings)
        return PlannerResult(
            scenes=fb_scenes,
            compiler="llm_fallback_deterministic",
            warnings=warnings,
            anchor=fb_anchor,
        )

    try:
        coerced = [
            _coerce_scene_field(s if isinstance(s, dict) else {}, anchor, i)
            for i, s in enumerate(raw_scenes)
        ]
    except (ValueError, TypeError) as exc:
        warnings.append(
            PlanWarning(
                code="LLM_INVALID_JSON",
                scene_index=None,
                detail=_truncate_detail(f"scene coercion failed: {exc}"),
            )
        )
        fb_scenes, fb_anchor, fb_warnings = _build_fallback_payload(
            cleaned_prompt, clamped_duration, clamped_count, style_hint
        )
        warnings.extend(fb_warnings)
        return PlannerResult(
            scenes=fb_scenes,
            compiler="llm_fallback_deterministic",
            warnings=warnings,
            anchor=fb_anchor,
        )

    repaired, repaired_idx = repair_anchor(coerced, anchor)
    if repaired_idx:
        warnings.append(
            PlanWarning(
                code="LLM_ANCHOR_REPAIRED",
                scene_index=None,
                detail=_truncate_detail(f"scenes_repaired={repaired_idx}"),
            )
        )

    materialized = materialize_scene_dicts(repaired, clamped_duration, clamped_count)
    validated = validate_plan({"scenes": materialized})
    if not validated["ok"]:
        err = validated.get("error", {})
        warnings.append(
            PlanWarning(
                code="LLM_VALIDATION_FAILED",
                scene_index=err.get("scene_index"),
                detail=_truncate_detail(
                    f"{err.get('sub_reason', 'unknown')}: {err.get('detail', '')}"
                ),
            )
        )
        fb_scenes, fb_anchor, fb_warnings = _build_fallback_payload(
            cleaned_prompt, clamped_duration, clamped_count, style_hint
        )
        warnings.extend(fb_warnings)
        return PlannerResult(
            scenes=fb_scenes,
            compiler="llm_fallback_deterministic",
            warnings=warnings,
            anchor=fb_anchor,
        )

    for w in validated.get("warnings", []):
        warnings.append(
            PlanWarning(
                code=w["code"], scene_index=w.get("scene_index"), detail=w.get("detail", "")
            )
        )
    return PlannerResult(
        scenes=materialized,
        compiler="llm",
        warnings=warnings,
        anchor=anchor,
    )


def _classify_fail_code(reason: str) -> str:
    lower = reason.lower()
    if "timeout" in lower or "wall budget" in lower:
        return "LLM_LEASE_TIMEOUT"
    if "lease unavailable" in lower:
        return "LLM_LEASE_UNAVAILABLE"
    if "parse" in lower or "json" in lower:
        return "LLM_INVALID_JSON"
    return "LLM_LEASE_UNAVAILABLE"
