from __future__ import annotations

from typing import Any

MAX_OPS = 32
MIN_TRIM_DURATION_MS = 100
SPEED_MIN = 0.5
SPEED_MAX = 2.0
LUFS_MIN = -30.0
LUFS_MAX = -6.0
EQ3_BAND_DB_MIN = -12.0
EQ3_BAND_DB_MAX = 12.0
GAIN_DB_MIN = -24.0
GAIN_DB_MAX = 24.0
PITCH_SEMITONES_MIN = -12.0
PITCH_SEMITONES_MAX = 12.0
SILENCE_THRESHOLD_DB_MIN = -60.0
SILENCE_THRESHOLD_DB_MAX = -20.0


def validate_chain(chain: dict[str, Any]) -> None:
    """Validate a chain dict; raise ``ValueError`` on the first violation."""

    if not isinstance(chain, dict):
        raise ValueError("chain must be a JSON object")
    version = chain.get("version")
    if version != 1:
        raise ValueError(f"unsupported chain version: {version!r} (expected 1)")
    ops = chain.get("ops")
    if not isinstance(ops, list):
        raise ValueError("chain.ops must be an array")
    if len(ops) > MAX_OPS:
        raise ValueError(f"chain has {len(ops)} ops (max {MAX_OPS})")
    for index, op in enumerate(ops):
        _validate_op(index, op)


def _validate_op(index: int, op: Any) -> None:
    if not isinstance(op, dict):
        raise ValueError(f"op[{index}] must be an object")
    if "id" not in op or not isinstance(op["id"], str) or not op["id"]:
        raise ValueError(f"op[{index}].id must be a non-empty string")
    mode = op.get("mode")
    if mode in {"trim", "crop", "mute"}:
        start = _require_int(op, "start_ms", index)
        end = _require_int(op, "end_ms", index)
        if start < 0 or end <= start:
            raise ValueError(f"op[{index}] {mode}: start_ms < end_ms required (got {start}..{end})")
        if mode in {"trim", "crop"} and (end - start) < MIN_TRIM_DURATION_MS:
            raise ValueError(
                f"op[{index}] {mode}: resulting duration {end - start} ms < {MIN_TRIM_DURATION_MS} ms minimum"
            )
    elif mode == "normalize":
        target = _require_number(op, "target_lufs", index)
        if not (LUFS_MIN <= target <= LUFS_MAX):
            raise ValueError(
                f"op[{index}] normalize: target_lufs {target} out of range [{LUFS_MIN}, {LUFS_MAX}]"
            )
    elif mode == "speed":
        factor = _require_number(op, "factor", index)
        if not (SPEED_MIN <= factor <= SPEED_MAX):
            raise ValueError(
                f"op[{index}] speed: factor {factor} out of range [{SPEED_MIN}, {SPEED_MAX}]"
            )
    elif mode in {"fade_in", "fade_out"}:
        duration = _require_int(op, "duration_ms", index)
        if duration <= 0:
            raise ValueError(f"op[{index}] {mode}: duration_ms must be > 0 (got {duration})")
    elif mode == "eq3":
        for key in ("low_db", "mid_db", "high_db"):
            value = _require_number(op, key, index)
            if not (EQ3_BAND_DB_MIN <= value <= EQ3_BAND_DB_MAX):
                raise ValueError(
                    f"op[{index}] eq3: {key} {value} out of range "
                    f"[{EQ3_BAND_DB_MIN}, {EQ3_BAND_DB_MAX}]"
                )
    elif mode == "gain":
        gain_db = _require_number(op, "gain_db", index)
        if not (GAIN_DB_MIN <= gain_db <= GAIN_DB_MAX):
            raise ValueError(
                f"op[{index}] gain: gain_db {gain_db} out of range "
                f"[{GAIN_DB_MIN}, {GAIN_DB_MAX}]"
            )
    elif mode == "pitch_shift":
        semitones = _require_number(op, "semitones", index)
        if not (PITCH_SEMITONES_MIN <= semitones <= PITCH_SEMITONES_MAX):
            raise ValueError(
                f"op[{index}] pitch_shift: semitones {semitones} out of range "
                f"[{PITCH_SEMITONES_MIN}, {PITCH_SEMITONES_MAX}]"
            )
    elif mode == "silence_strip":
        threshold_db = _require_number(op, "threshold_db", index)
        if not (SILENCE_THRESHOLD_DB_MIN <= threshold_db <= SILENCE_THRESHOLD_DB_MAX):
            raise ValueError(
                f"op[{index}] silence_strip: threshold_db {threshold_db} out of range "
                f"[{SILENCE_THRESHOLD_DB_MIN}, {SILENCE_THRESHOLD_DB_MAX}]"
            )
    else:
        raise ValueError(f"op[{index}] unknown mode: {mode!r}")


def _require_int(op: dict[str, Any], key: str, index: int) -> int:
    value = op.get(key)
    if not isinstance(value, int) or isinstance(value, bool):
        raise ValueError(f"op[{index}].{key} must be an integer (got {type(value).__name__})")
    return value


def _require_number(op: dict[str, Any], key: str, index: int) -> float:
    value = op.get(key)
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        raise ValueError(f"op[{index}].{key} must be a number (got {type(value).__name__})")
    return float(value)
