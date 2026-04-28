"""Top-level audio-edit orchestration: validate → decode → fold ops → encode."""

from __future__ import annotations

import time
import uuid
from pathlib import Path
from typing import Any

import numpy as np

from . import codecs, ops
from .digest import compute_digest
from .types import AudioEditReport, OpDuration
from .validation import validate_chain


DEFAULT_FORMAT = "wav"


def apply_chain(source_abs: Path, output_abs: Path, chain: dict[str, Any]) -> AudioEditReport:
    """Apply ``chain`` to ``source_abs`` and write derived audio to ``output_abs``.

    Raises ``ValueError`` on validation failure or ``RuntimeError`` on codec /
    IO failure. The returned ``AudioEditReport`` is the JSON-RPC result body.
    """

    validate_chain(chain)
    samples, sr = codecs.decode_source(source_abs)
    source_duration_ms = _duration_ms(samples, sr)
    samples, durations, measured_lufs = _fold_ops(samples, sr, chain["ops"])
    derived_duration_ms = _duration_ms(samples, sr)
    codecs.encode_output(samples, sr, output_abs)
    return AudioEditReport(
        chain_digest=compute_digest(chain),
        source_duration_ms=source_duration_ms,
        derived_duration_ms=derived_duration_ms,
        measured_lufs=measured_lufs,
        per_op_durations_ms=durations,
        warnings=[],
    )


def materialize_to_temp(
    source_abs: Path,
    chain: dict[str, Any],
    temp_dir: Path,
    format_hint: str = DEFAULT_FORMAT,
) -> tuple[Path, AudioEditReport]:
    """Materialize ``chain`` to a unique tempfile inside ``temp_dir``.

    Returns ``(absolute_path, report)``. The caller (Rust router) owns
    deletion. Single-pass: the pipeline runs once and the report describes
    the same artifact written to ``absolute_path``.
    """

    fmt = format_hint.lower().lstrip(".")
    if fmt not in {"wav", "mp3"}:
        raise ValueError(f"unsupported format_hint: {format_hint!r}; expected 'wav' or 'mp3'")
    temp_dir.mkdir(parents=True, exist_ok=True)
    output_path = temp_dir / f"preview-{uuid.uuid4().hex}.{fmt}"
    report = apply_chain(source_abs, output_path, chain)
    return output_path, report


def _fold_ops(
    samples: np.ndarray, sr: int, op_list: list[dict[str, Any]]
) -> tuple[np.ndarray, list[OpDuration], float | None]:
    durations: list[OpDuration] = []
    measured_lufs: float | None = None
    current = samples
    for op in op_list:
        op_id = op["id"]
        mode = op["mode"]
        start_perf = time.perf_counter()
        current, measured_lufs = _dispatch(current, sr, op, mode, measured_lufs)
        elapsed_ms = (time.perf_counter() - start_perf) * 1000.0
        durations.append(OpDuration(op_id=op_id, duration_ms=elapsed_ms))
    return current, durations, measured_lufs


def _dispatch(
    samples: np.ndarray,
    sr: int,
    op: dict[str, Any],
    mode: str,
    measured_lufs: float | None,
) -> tuple[np.ndarray, float | None]:
    if mode in {"trim", "crop"}:
        return ops.trim(samples, sr, int(op["start_ms"]), int(op["end_ms"])), measured_lufs
    if mode == "mute":
        return ops.mute(samples, sr, int(op["start_ms"]), int(op["end_ms"])), measured_lufs
    if mode == "normalize":
        out, measured = ops.normalize(samples, sr, float(op["target_lufs"]))
        return out, measured
    if mode == "speed":
        return ops.speed(samples, sr, float(op["factor"])), measured_lufs
    if mode == "fade_in":
        return ops.fade_in(samples, sr, int(op["duration_ms"])), measured_lufs
    if mode == "fade_out":
        return ops.fade_out(samples, sr, int(op["duration_ms"])), measured_lufs
    raise ValueError(f"unhandled op mode: {mode!r}")


def _duration_ms(samples: np.ndarray, sr: int) -> int:
    if sr <= 0:
        return 0
    return int(round(samples.shape[0] * 1000.0 / sr))
