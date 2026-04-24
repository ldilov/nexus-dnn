"""Reference-audio preprocessing pipeline (spec 034 US1, FR-200..203).

Deterministic chain that runs on voice-asset upload:

    decode -> mono -> denoise -> vad_trim -> loudness -> peak_limit -> truncate

Design goals per spec 031/034 principles:

* Ecosystem-first. External libraries (torchaudio, silero-vad, pyloudnorm,
  rnnoise-wheels) do the heavy lifting; this module only orchestrates.
* Fail-soft. Any optional stage (denoise) whose dependency is missing
  produces ``status="skipped"`` with a ``reason`` — the rest of the pipeline
  continues.
* Fail-fast on the unrecoverable. An undecodable file, an all-silence clip,
  or a loudness normaliser that yields NaN MUST raise ``PreprocessError``
  so the Rust shim can surface ``-32010 preprocess_input_rejected``.
* Size cap. Output is always mono 24 kHz PCM WAV, <= 15 s of speech content
  (R-34-01). The 30 s hard cap is enforced inside ``truncate``.
"""

from __future__ import annotations

import math
import time
from dataclasses import dataclass
from pathlib import Path
from typing import TYPE_CHECKING, Any

from .ref_audio_report import (
    DEFAULT_PIPELINE_VERSION,
    PreprocessError,
    PreprocessingReport,
    Stage,
)

if TYPE_CHECKING:
    import numpy as np

# Pipeline constants — kept here, not configurable at call time, so runs are
# reproducible from the report (R-34-01 Fallback Policy).
TARGET_SAMPLE_RATE = 24_000
TARGET_LUFS = -25.0
LUFS_TOLERANCE = 1.0
PEAK_LIMIT_DBFS = -1.0
HARD_CAP_SECONDS = 30.0
SOFT_TARGET_SECONDS = 15.0
VAD_PAD_MS = 300  # mid-point of the 100-500 ms range in FR-201


@dataclass
class PipelineResult:
    output_path: Path
    report: PreprocessingReport


def preprocess(
    input_path: Path | str,
    output_path: Path | str,
    pipeline_version: str = DEFAULT_PIPELINE_VERSION,
) -> PipelineResult:
    """Run the full preprocessing chain on ``input_path`` → ``output_path``.

    Returns a :class:`PipelineResult` holding the absolute output path plus
    the :class:`PreprocessingReport`. Raises :class:`PreprocessError` when an
    unrecoverable stage fails; the Rust shim maps that into the RPC error
    contract (``-32010 preprocess_input_rejected``, ``-32011 preprocess_partial``).
    """

    in_path = Path(input_path)
    out_path = Path(output_path)
    report = PreprocessingReport(pipeline_version=pipeline_version)

    waveform, input_sr = _run_stage(
        report,
        "decode",
        lambda: _decode(in_path),
        fatal=True,
    )

    waveform = _run_stage(
        report,
        "mono",
        lambda: _mono(waveform),
        fatal=True,
    )

    # Denoise is optional — skipped if rnnoise is not installed.
    waveform = _run_optional_stage(
        report,
        "denoise",
        lambda: _denoise(waveform, TARGET_SAMPLE_RATE),
        fallback=waveform,
    )

    waveform = _run_stage(
        report,
        "vad_trim",
        lambda: _vad_trim(waveform, TARGET_SAMPLE_RATE),
        fatal=True,
    )

    waveform = _run_stage(
        report,
        "loudness",
        lambda: _loudness(waveform, TARGET_SAMPLE_RATE),
        fatal=True,
    )

    waveform = _run_stage(
        report,
        "peak_limit",
        lambda: _peak_limit(waveform),
        fatal=True,
    )

    waveform = _run_stage(
        report,
        "truncate",
        lambda: _truncate(waveform, TARGET_SAMPLE_RATE),
        fatal=True,
    )

    _write_wav(waveform, TARGET_SAMPLE_RATE, out_path)

    # Attach the original sample rate on the decode stage so downstream can
    # audit whether resample was needed.
    if report.stages and report.stages[0].stage == "decode":
        report.stages[0].extra.setdefault("input_sample_rate", input_sr)
        report.stages[0].extra.setdefault("output_sample_rate", TARGET_SAMPLE_RATE)

    return PipelineResult(output_path=out_path, report=report)


# ---------------------------------------------------------------------------
# Stage drivers
# ---------------------------------------------------------------------------


def _run_stage(
    report: PreprocessingReport,
    name: str,
    fn,
    *,
    fatal: bool,
):
    start = time.perf_counter()
    try:
        result = fn()
    except PreprocessError as err:
        duration_ms = int((time.perf_counter() - start) * 1000)
        report.add_stage(Stage(stage=name, status="failed", duration_ms=duration_ms, reason=err.reason))
        if fatal:
            raise
        return None
    except Exception as err:  # unexpected — wrap and fail
        duration_ms = int((time.perf_counter() - start) * 1000)
        report.add_stage(
            Stage(stage=name, status="failed", duration_ms=duration_ms, reason=f"{type(err).__name__}: {err}")
        )
        if fatal:
            raise PreprocessError(name, f"{type(err).__name__}: {err}") from err
        return None

    duration_ms = int((time.perf_counter() - start) * 1000)
    payload = result if isinstance(result, tuple) else (result, {})
    value, extra = payload if len(payload) == 2 else (payload[0], payload[1])
    report.add_stage(Stage(stage=name, status="ok", duration_ms=duration_ms, extra=dict(extra)))
    return value


def _run_optional_stage(report: PreprocessingReport, name: str, fn, *, fallback):
    start = time.perf_counter()
    try:
        result = fn()
    except _DependencyMissing as err:
        duration_ms = int((time.perf_counter() - start) * 1000)
        report.add_stage(
            Stage(stage=name, status="skipped", duration_ms=duration_ms, reason=str(err))
        )
        return fallback
    except Exception as err:
        duration_ms = int((time.perf_counter() - start) * 1000)
        report.add_stage(
            Stage(stage=name, status="failed", duration_ms=duration_ms, reason=f"{type(err).__name__}: {err}")
        )
        return fallback

    duration_ms = int((time.perf_counter() - start) * 1000)
    payload = result if isinstance(result, tuple) else (result, {})
    value, extra = payload if len(payload) == 2 else (payload[0], payload[1])
    report.add_stage(Stage(stage=name, status="ok", duration_ms=duration_ms, extra=dict(extra)))
    return value


class _DependencyMissing(Exception):
    """Marker — raise from an optional stage when its library is absent."""


# ---------------------------------------------------------------------------
# Stage implementations — each returns (waveform, extra_dict).
# ---------------------------------------------------------------------------


def _decode(path: Path) -> tuple["np.ndarray", int]:
    if not path.exists():
        raise PreprocessError("decode", f"file not found: {path}")
    try:
        import soundfile as sf
    except ImportError as err:
        raise PreprocessError("decode", f"soundfile not installed: {err}") from err
    try:
        waveform, sr = sf.read(str(path), always_2d=True)
    except Exception as err:
        raise PreprocessError("decode", f"decode_failed: {err}") from err
    if waveform.size == 0:
        raise PreprocessError("decode", "empty_audio")
    return waveform, int(sr)


def _mono(waveform: "np.ndarray") -> "np.ndarray":
    import numpy as np

    if waveform.ndim == 1:
        return waveform.astype(np.float32, copy=False)
    if waveform.shape[1] == 1:
        return waveform[:, 0].astype(np.float32, copy=False)
    # Averaging keeps phase neutral for typical speech mono downmix.
    return waveform.mean(axis=1).astype(np.float32, copy=False)


def _denoise(waveform: "np.ndarray", sample_rate: int) -> tuple["np.ndarray", dict]:
    try:
        import rnnoise_wheels  # type: ignore[import-not-found]
    except ImportError as err:
        raise _DependencyMissing(f"rnnoise import failed: {err}") from err
    denoised = rnnoise_wheels.denoise(waveform, sample_rate=sample_rate)
    return denoised, {"engine": "rnnoise"}


def _vad_trim(waveform: "np.ndarray", sample_rate: int) -> tuple["np.ndarray", dict]:
    import numpy as np

    if sample_rate != TARGET_SAMPLE_RATE:
        waveform = _resample(waveform, sample_rate, TARGET_SAMPLE_RATE)
        sample_rate = TARGET_SAMPLE_RATE

    try:
        from silero_vad import get_speech_timestamps, load_silero_vad  # type: ignore[import-not-found]
    except ImportError as err:
        raise PreprocessError("vad_trim", f"silero-vad not installed: {err}") from err

    try:
        import torch
    except ImportError as err:
        raise PreprocessError("vad_trim", f"torch not installed: {err}") from err

    tensor = torch.from_numpy(waveform.astype(np.float32))
    model = load_silero_vad()
    speech = get_speech_timestamps(tensor, model, sampling_rate=sample_rate)
    if not speech:
        raise PreprocessError("vad_trim", "vad_empty")

    pad_samples = int(VAD_PAD_MS * sample_rate / 1000)
    start = max(0, speech[0]["start"] - pad_samples)
    end = min(len(waveform), speech[-1]["end"] + pad_samples)

    return (
        waveform[start:end],
        {
            "engine": "silero_vad",
            "trimmed_ms_leading": int(speech[0]["start"] * 1000 / sample_rate),
            "trimmed_ms_trailing": int((len(waveform) - speech[-1]["end"]) * 1000 / sample_rate),
        },
    )


def _loudness(waveform: "np.ndarray", sample_rate: int) -> tuple["np.ndarray", dict]:
    import numpy as np

    try:
        import pyloudnorm as pyln
    except ImportError as err:
        raise PreprocessError("loudness", f"pyloudnorm not installed: {err}") from err

    meter = pyln.Meter(sample_rate)
    lufs_before = float(meter.integrated_loudness(waveform))
    if not math.isfinite(lufs_before):
        raise PreprocessError("loudness", "loudness_nan_before")
    normalised = pyln.normalize.loudness(waveform, lufs_before, TARGET_LUFS)
    lufs_after = float(meter.integrated_loudness(normalised))
    if not math.isfinite(lufs_after):
        raise PreprocessError("loudness", "loudness_nan_after")
    return normalised.astype(np.float32), {
        "lufs_before": round(lufs_before, 2),
        "lufs_after": round(lufs_after, 2),
    }


def _peak_limit(waveform: "np.ndarray") -> tuple["np.ndarray", dict]:
    import numpy as np

    peak = float(np.max(np.abs(waveform))) or 1e-9
    peak_before_dbfs = 20.0 * math.log10(peak)
    limit_linear = 10.0 ** (PEAK_LIMIT_DBFS / 20.0)
    if peak > limit_linear:
        gain = limit_linear / peak
        waveform = waveform * gain
        new_peak = float(np.max(np.abs(waveform))) or 1e-9
        peak_after_dbfs = 20.0 * math.log10(new_peak)
    else:
        peak_after_dbfs = peak_before_dbfs
    return waveform.astype(np.float32), {
        "peak_before_dbfs": round(peak_before_dbfs, 2),
        "peak_after_dbfs": round(peak_after_dbfs, 2),
    }


def _truncate(waveform: "np.ndarray", sample_rate: int) -> tuple["np.ndarray", dict]:
    import numpy as np

    duration_s = len(waveform) / sample_rate
    extra: dict[str, Any] = {"duration_before_ms": int(duration_s * 1000)}

    soft_samples = int(SOFT_TARGET_SECONDS * sample_rate)
    hard_samples = int(HARD_CAP_SECONDS * sample_rate)

    if len(waveform) <= soft_samples:
        extra["duration_after_ms"] = int(len(waveform) * 1000 / sample_rate)
        extra["selection"] = "full_clip"
        return waveform.astype(np.float32), extra

    # Pick the highest-RMS window of soft-target length. If the clip exceeds
    # the hard cap, we still pick from within the hard cap so we never keep
    # content beyond the 30 s boundary (R-34-01 policy).
    search_max = min(len(waveform), hard_samples)
    search = waveform[:search_max]
    best_start = _highest_rms_window(search, soft_samples)
    clip = search[best_start : best_start + soft_samples]
    extra["duration_after_ms"] = int(soft_samples * 1000 / sample_rate)
    extra["selection"] = "highest_activity_window"
    return clip.astype(np.float32), extra


def _highest_rms_window(waveform: "np.ndarray", window: int) -> int:
    import numpy as np

    if window >= len(waveform):
        return 0
    step = max(1, window // 16)
    best_start = 0
    best_rms = -1.0
    for start in range(0, len(waveform) - window + 1, step):
        segment = waveform[start : start + window]
        rms = float(np.sqrt(np.mean(np.square(segment, dtype=np.float64))))
        if rms > best_rms:
            best_rms = rms
            best_start = start
    return best_start


def _resample(waveform: "np.ndarray", src_sr: int, dst_sr: int) -> "np.ndarray":
    if src_sr == dst_sr:
        return waveform
    try:
        import torch
        import torchaudio.functional as F
    except ImportError as err:
        raise PreprocessError("vad_trim", f"torchaudio not installed: {err}") from err
    tensor = torch.from_numpy(waveform).unsqueeze(0)
    resampled = F.resample(tensor, src_sr, dst_sr)
    return resampled.squeeze(0).numpy()


def _write_wav(waveform: "np.ndarray", sample_rate: int, out_path: Path) -> None:
    try:
        import soundfile as sf
    except ImportError as err:
        raise PreprocessError("output", f"soundfile not installed: {err}") from err
    out_path.parent.mkdir(parents=True, exist_ok=True)
    sf.write(str(out_path), waveform, sample_rate, subtype="PCM_16")
