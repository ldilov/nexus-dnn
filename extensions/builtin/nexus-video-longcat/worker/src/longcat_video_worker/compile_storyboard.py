from __future__ import annotations

import re
from dataclasses import dataclass
from typing import Any, Optional

from .plan_validate import PlanWarning, quantize_frames, validate_plan


COMPILER_VERSION = "s2_1.v1"
FPS = 24
OVERLAP_FRAMES_DEFAULT = 13
OVERLAP_SECONDS = OVERLAP_FRAMES_DEFAULT / FPS
SCENE_DURATION_MIN = 0.5
SCENE_DURATION_MAX = 15.0
TOTAL_DURATION_MAX = 20.0
SCENE_COUNT_MIN = 1
SCENE_COUNT_MAX = 16
PROMPT_BUDGET_CHARS = 280
ANCHOR_BUDGET_CHARS = 60
ADAIN_FACTOR_DEFAULT = 0.2
ANCHOR_FALLBACK = "cinematic"


_NOSPLIT_LITERALS = re.compile(
    r"\b(do[\s\-]?not[\s\-]?split|no[\s\-]?split|single[\s\-]?(?:shot|scene|take)|continuous[\s\-]?shot|one[\s\-]?(?:shot|take)|seamless|uncut|without\s+cuts?|loop(?:ing)?)\b",
    re.IGNORECASE,
)

_TEMPORAL_CUES = re.compile(
    r"\b(then|next|after(?:wards?)?|before|suddenly|meanwhile|eventually|later|finally|first(?:ly)?|second(?:ly)?|third(?:ly)?|cut\s+to|fade\s+to|smash\s+cut|switches?\s+to)\b",
    re.IGNORECASE,
)

_ENUMERATION = re.compile(r"(?:^|\n)\s*(?:\d+[.)]\s|[•\-]\s)", re.MULTILINE)

_SENTENCE_SPLIT = re.compile(r"(?<=[.!?])\s+(?=[A-Z])")

_TEMPORAL_SPLIT = re.compile(
    r"\s*(?:[,;.]\s*)?(?:then|next|after(?:wards?)?|meanwhile|finally|suddenly|cut\s+to|fade\s+to|smash\s+cut)\s+",
    re.IGNORECASE,
)

_LOCATION = re.compile(
    r"\b(?:in|at|inside|outside|on|under|by|through|across|near|beneath|above|within)\s+(?:the\s+|a\s+|an\s+)?([a-z][\w\s]{2,30}?)(?=[,;.]|\s+(?:as|when|while|who|that|which|then|but|and)\b|\s*$)",
    re.IGNORECASE,
)

_PROPER_NAME = re.compile(r"\b([A-Z][a-z]{2,}(?:\s+[A-Z][a-z]{2,}){0,2})\b")

_ARCHETYPE_PATTERN = re.compile(
    r"\b(?:a|an|the)\s+([a-z]+(?:\s+[a-z]+){0,2})\s+(?:named|called)\s+([A-Z][a-z]+)\b",
)

_ACTION_VERBS = frozenset(
    {
        "walks", "runs", "chases", "finds", "discovers", "sees", "meets",
        "enters", "leaves", "escapes", "fights", "builds", "creates",
        "destroys", "climbs", "falls", "jumps", "flies", "swims", "rides",
        "drives", "crashes", "explodes", "fades", "transforms", "appears",
        "vanishes", "dances", "throws", "catches", "shoots", "strikes",
        "swings", "spins", "leaps", "sprints", "draws", "stands", "sits",
        "turns", "opens", "closes", "rises", "lifts", "pushes", "pulls",
        "moves", "stops", "starts", "races", "hides", "reveals",
    }
)

_PRINTABLE_ASCII = re.compile(r"^[\x20-\x7E]+$")


class StoryboardCompileError(Exception):
    def __init__(self, sub_reason: str, detail: str) -> None:
        super().__init__(detail)
        self.sub_reason = sub_reason
        self.detail = detail

    def to_error_payload(self) -> dict[str, Any]:
        return {
            "code": "PLAN_INVALID",
            "sub_reason": self.sub_reason,
            "scene_index": None,
            "detail": self.detail,
        }


@dataclass(frozen=True)
class Anchor:
    raw: str
    sanitized: str


@dataclass(frozen=True)
class CompiledScene:
    prompt: str
    per_scene_generated_seconds: float
    overlap_frames: int
    motion_intensity: str
    adain_factor: float
    mode: str

    def to_dict(self) -> dict[str, Any]:
        return {
            "prompt": self.prompt,
            "per_scene_generated_seconds": self.per_scene_generated_seconds,
            "overlap_frames": self.overlap_frames,
            "motion_intensity": self.motion_intensity,
            "adain_factor": self.adain_factor,
            "mode": self.mode,
        }


@dataclass(frozen=True)
class CompiledPlan:
    scenes: list[CompiledScene]
    classification: str
    warnings: list[PlanWarning]
    anchor: str

    def to_dict(self) -> dict[str, Any]:
        return {
            "scenes": [s.to_dict() for s in self.scenes],
            "classification": self.classification,
            "anchor": self.anchor,
            "warnings": [w.to_dict() for w in self.warnings],
        }


def normalize_text(text: str) -> str:
    if not text:
        return ""
    collapsed = re.sub(r"\s+", " ", text).strip()
    return (
        collapsed
        .replace("—", "-")
        .replace("–", "-")
        .replace("‘", "'")
        .replace("’", "'")
        .replace("“", '"')
        .replace("”", '"')
    )


def clamp_inputs(
    prompt: str, duration_seconds: float, scene_count: int
) -> tuple[str, float, int]:
    cleaned = normalize_text(prompt)
    if not cleaned:
        raise StoryboardCompileError("PROMPT_EMPTY", "prompt is empty after normalization")
    sc = max(SCENE_COUNT_MIN, int(scene_count))
    if sc > SCENE_COUNT_MAX:
        raise StoryboardCompileError(
            "SCENE_COUNT_TOO_HIGH",
            f"scene_count={scene_count} exceeds {SCENE_COUNT_MAX}",
        )
    floor = sc * SCENE_DURATION_MIN
    dur = float(duration_seconds)
    if dur < floor:
        raise StoryboardCompileError(
            "DURATION_BELOW_SCENE_FLOOR",
            f"duration_seconds={dur} below floor {floor} for scene_count={sc}",
        )
    if dur > TOTAL_DURATION_MAX:
        dur = TOTAL_DURATION_MAX
    return cleaned, dur, sc


def classify_intent(text: str, scene_count: int) -> str:
    if _NOSPLIT_LITERALS.search(text):
        return "single_continuation"
    if scene_count <= 1:
        return "single_continuation"
    return "storyboard_scenes"


def score_storyboard_signals(text: str) -> int:
    score = 0
    if _TEMPORAL_CUES.search(text):
        score += 2
    score += min(2, text.count(";"))
    if _ENUMERATION.search(text):
        score += 2
    sentence_count = len(_SENTENCE_SPLIT.split(text))
    if sentence_count >= 2:
        score += 1
    return score


def _sanitize_anchor(raw: str) -> str:
    if not raw:
        return ""
    candidate = raw.strip()
    if not _PRINTABLE_ASCII.fullmatch(candidate):
        candidate = "".join(c for c in candidate if 0x20 <= ord(c) <= 0x7E)
    candidate = candidate.strip()
    return candidate[:ANCHOR_BUDGET_CHARS].rstrip(",;.: ").strip()


def extract_anchor(text: str, style_hint: Optional[str]) -> Anchor:
    parts: list[str] = []
    arche = _ARCHETYPE_PATTERN.search(text)
    if arche:
        parts.append(f"{arche.group(1)} {arche.group(2)}")
    else:
        name = _PROPER_NAME.search(text)
        if name:
            parts.append(name.group(1))
    if style_hint:
        hint = style_hint.strip()
        if hint and hint not in parts:
            parts.append(hint)
    raw = ", ".join(parts) if parts else (style_hint or "").strip()
    sanitized = _sanitize_anchor(raw)
    if not sanitized:
        sanitized = ANCHOR_FALLBACK
    return Anchor(raw=raw, sanitized=sanitized)


def split_beats(text: str) -> list[str]:
    temporal_parts = [p.strip() for p in _TEMPORAL_SPLIT.split(text) if p and p.strip()]
    if len(temporal_parts) >= 2:
        kept = [p for p in temporal_parts if len(p) > 4]
        if len(kept) >= 2:
            return kept
    semi_parts = [p.strip() for p in text.split(";") if p.strip()]
    if len(semi_parts) >= 2:
        kept = [p for p in semi_parts if len(p) > 4]
        if len(kept) >= 2:
            return kept
    sentence_parts = [p.strip() for p in _SENTENCE_SPLIT.split(text) if p.strip()]
    if len(sentence_parts) >= 2:
        kept = [p for p in sentence_parts if len(p) > 4]
        if len(kept) >= 2:
            return kept
    return [text.strip()]


def fit_beats_to_count(beats: list[str], n: int) -> list[str]:
    if not beats:
        return ["scene"] * n
    if len(beats) == n:
        return list(beats)
    if len(beats) > n:
        if n <= 1:
            return [" ".join(beats)]
        head = beats[: n - 1]
        tail = " ".join(beats[n - 1 :])
        return head + [tail]
    out = list(beats)
    while len(out) < n:
        out.append(beats[-1])
    return out


def classify_motion(beat_text: str) -> str:
    lowered = beat_text.lower()
    hits = sum(1 for v in _ACTION_VERBS if re.search(rf"\b{v}\b", lowered))
    if hits >= 3:
        return "intense"
    if hits >= 1:
        return "dynamic"
    return "static"


def _round_seconds(value: float) -> float:
    return round(max(SCENE_DURATION_MIN, min(SCENE_DURATION_MAX, value)), 3)


def allocate_per_scene_generated(total_fresh: float, scene_count: int) -> list[float]:
    if scene_count <= 1:
        return [_round_seconds(total_fresh)]
    per_fresh = total_fresh / scene_count
    out: list[float] = []
    for i in range(scene_count):
        if i == 0:
            generated = per_fresh
        else:
            generated = per_fresh + OVERLAP_SECONDS
        out.append(_round_seconds(generated))
    return out


def _trim_to_budget(text: str, budget: int) -> str:
    if len(text) <= budget:
        return text
    truncated = text[:budget].rstrip()
    last_space = truncated.rfind(" ")
    if last_space > budget // 2:
        truncated = truncated[:last_space]
    return truncated.rstrip(",.;: ").rstrip()


def compose_scene_prompt(anchor: str, beat: str, budget: int = PROMPT_BUDGET_CHARS) -> str:
    cleaned_beat = beat.strip().rstrip(".,;:")
    if anchor:
        body = f"{anchor}. {cleaned_beat}"
    else:
        body = cleaned_beat
    return _trim_to_budget(body, budget)


def compile_storyboard(
    prompt: str,
    duration_seconds: float,
    scene_count: int,
    style_hint: Optional[str] = None,
) -> CompiledPlan:
    cleaned_prompt, clamped_duration, clamped_count = clamp_inputs(
        prompt, duration_seconds, scene_count
    )
    classification = classify_intent(cleaned_prompt, clamped_count)
    effective_count = 1 if classification == "single_continuation" else clamped_count
    anchor = extract_anchor(cleaned_prompt, style_hint)
    warnings: list[PlanWarning] = []
    if anchor.raw and anchor.sanitized != anchor.raw:
        warnings.append(
            PlanWarning(
                code="ANCHOR_SANITIZED",
                scene_index=None,
                detail="anchor truncated or stripped of non-ASCII characters",
            )
        )
    raw_beats = split_beats(cleaned_prompt)
    beats = fit_beats_to_count(raw_beats, effective_count)
    target_fresh_total = min(clamped_duration, TOTAL_DURATION_MAX)
    durations = allocate_per_scene_generated(target_fresh_total, effective_count)
    scenes: list[CompiledScene] = []
    for idx, beat in enumerate(beats):
        scene_prompt = compose_scene_prompt(anchor.sanitized, beat)
        if idx == 0:
            overlap = 0
            mode = "t2v"
        else:
            overlap = OVERLAP_FRAMES_DEFAULT
            mode = "vc"
        scenes.append(
            CompiledScene(
                prompt=scene_prompt,
                per_scene_generated_seconds=durations[idx],
                overlap_frames=overlap,
                motion_intensity=classify_motion(beat),
                adain_factor=ADAIN_FACTOR_DEFAULT,
                mode=mode,
            )
        )
    return CompiledPlan(
        scenes=scenes,
        classification=classification,
        warnings=warnings,
        anchor=anchor.sanitized,
    )


def compile_and_validate(
    prompt: str,
    duration_seconds: float,
    scene_count: int,
    style_hint: Optional[str] = None,
) -> dict[str, Any]:
    plan = compile_storyboard(prompt, duration_seconds, scene_count, style_hint)
    payload = {"scenes": [s.to_dict() for s in plan.scenes]}
    validated = validate_plan(payload)
    return {"plan": plan, "payload": payload, "validated": validated}
