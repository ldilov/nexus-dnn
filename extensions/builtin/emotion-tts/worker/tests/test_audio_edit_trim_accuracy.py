"""T019 — sample-accurate trim across decode → edit → re-encode (FR-026 / SC-009).

Generates a synthetic 10s WAV containing a 100ms 1-kHz tone burst that begins
at exactly t=1.000s, with silence everywhere else. After applying a single
``trim`` op spanning 1000-2000 ms, the output must contain the burst aligned
to t=0 of the trimmed clip within ±1 ms (44 samples at 44.1 kHz).

The same source is also re-encoded to MP3 and routed through the
decode→edit→re-encode path (research.md R2). The same ±1 ms tolerance must
hold despite frame-aligned MP3 boundaries.
"""

from __future__ import annotations

import math
import shutil
import subprocess
from pathlib import Path

import numpy as np
import pytest
import soundfile as sf

from emotion_tts_worker import audio_edit


SAMPLE_RATE = 44_100
TONE_FREQ_HZ = 1000.0
TONE_START_MS = 1000
TONE_DURATION_MS = 100
TOTAL_DURATION_S = 10.0
TOLERANCE_SAMPLES = 44


def _has_ffmpeg() -> bool:
    return shutil.which("ffmpeg") is not None


requires_ffmpeg = pytest.mark.skipif(not _has_ffmpeg(), reason="ffmpeg not on PATH")


def _generate_source_wav(path: Path) -> None:
    n = int(TOTAL_DURATION_S * SAMPLE_RATE)
    samples = np.zeros(n, dtype=np.float32)
    burst_start = int(TONE_START_MS * SAMPLE_RATE / 1000)
    burst_n = int(TONE_DURATION_MS * SAMPLE_RATE / 1000)
    t = np.arange(burst_n) / SAMPLE_RATE
    samples[burst_start : burst_start + burst_n] = 0.6 * np.sin(2 * math.pi * TONE_FREQ_HZ * t)
    sf.write(str(path), samples, SAMPLE_RATE, subtype="FLOAT")


def _convert_to_mp3(wav: Path, mp3: Path) -> None:
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-i", str(wav), "-c:a", "libmp3lame", "-q:a", "0", str(mp3)],
        check=True,
    )


def _first_nonsilent_sample(samples: np.ndarray, threshold: float = 0.05) -> int:
    abs_samples = np.abs(samples)
    hits = np.where(abs_samples > threshold)[0]
    if hits.size == 0:
        return -1
    return int(hits[0])


@requires_ffmpeg
@pytest.mark.parametrize("ext", ["wav", "mp3"])
def test_trim_is_sample_accurate_within_one_millisecond(tmp_path: Path, ext: str) -> None:
    wav_path = tmp_path / "source.wav"
    _generate_source_wav(wav_path)

    if ext == "mp3":
        source_path = tmp_path / "source.mp3"
        _convert_to_mp3(wav_path, source_path)
        output_path = tmp_path / "output.mp3"
    else:
        source_path = wav_path
        output_path = tmp_path / "output.wav"

    chain = {
        "version": 1,
        "ops": [
            {
                "id": "01HX0000000000000000000001",
                "mode": "trim",
                "start_ms": TONE_START_MS,
                "end_ms": TONE_START_MS + 1000,
            }
        ],
    }

    audio_edit.apply_chain(source_path, output_path, chain)

    if ext == "mp3":
        decoded_wav = tmp_path / "output_decoded.wav"
        subprocess.run(
            ["ffmpeg", "-y", "-loglevel", "error", "-i", str(output_path), "-c:a", "pcm_f32le", str(decoded_wav)],
            check=True,
        )
        samples, sr = sf.read(str(decoded_wav), dtype="float32")
    else:
        samples, sr = sf.read(str(output_path), dtype="float32")

    if samples.ndim > 1:
        samples = samples[:, 0]

    first = _first_nonsilent_sample(samples)
    assert first >= 0, "trimmed output contains no audible signal"
    # The burst should start at t=0 of the trimmed clip; ±1 ms tolerance.
    expected = 0
    diff = abs(first - expected)
    assert diff <= TOLERANCE_SAMPLES, (
        f"trim accuracy violation: burst at sample {first} (sr={sr}); "
        f"expected within {TOLERANCE_SAMPLES} samples of {expected}"
    )
