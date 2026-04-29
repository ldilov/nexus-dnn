"""T092 — sample-rate preservation invariant (FR-028).

Closes the gap flagged by /speckit-analyze (U2). FR-028 says: "Sample rate is
preserved from source to derived. The system MUST NOT resample as a side
effect of any edit operation." The pipeline architecture preserves ``sr``
across the whole fold (decode → fold ops → encode), but no test asserted it.

Asserts the invariant for three common rates (22.05, 44.1, 48 kHz) under a
chain that exercises trim + fade — the two ops most likely to interact with
length math and most likely to silently resample if a regression sneaks in.
"""

from __future__ import annotations

from pathlib import Path

import numpy as np
import pytest
import soundfile as sf

from emotion_tts_worker import audio_edit


CARRIER_AMPLITUDE = 0.4
DURATION_S = 2.0


@pytest.mark.parametrize("sample_rate", [22_050, 44_100, 48_000])
def test_sample_rate_preserved_through_trim_and_fade(
    tmp_path: Path, sample_rate: int
) -> None:
    n = int(DURATION_S * sample_rate)
    samples = np.full(n, CARRIER_AMPLITUDE, dtype=np.float32)

    source_path = tmp_path / f"source_{sample_rate}.wav"
    output_path = tmp_path / f"output_{sample_rate}.wav"
    sf.write(str(source_path), samples, sample_rate, subtype="FLOAT")

    chain = {
        "version": 1,
        "ops": [
            {
                "id": "01HX0000000000000000000020",
                "mode": "trim",
                "start_ms": 200,
                "end_ms": 1_500,
            },
            {
                "id": "01HX0000000000000000000021",
                "mode": "fade_in",
                "duration_ms": 50,
            },
        ],
    }
    audio_edit.apply_chain(source_path, output_path, chain)

    _, sr_out = sf.read(str(output_path), dtype="float32")
    assert sr_out == sample_rate, (
        f"FR-028 violation: input sr={sample_rate}, output sr={sr_out}"
    )


def test_sample_rate_preserved_through_normalize(tmp_path: Path) -> None:
    sample_rate = 32_000
    n = int(DURATION_S * sample_rate)
    samples = (CARRIER_AMPLITUDE * np.sin(np.linspace(0, 2 * np.pi * 440, n))).astype(
        np.float32
    )

    source_path = tmp_path / "source.wav"
    output_path = tmp_path / "output.wav"
    sf.write(str(source_path), samples, sample_rate, subtype="FLOAT")

    chain = {
        "version": 1,
        "ops": [
            {
                "id": "01HX0000000000000000000022",
                "mode": "normalize",
                "target_lufs": -16.0,
            }
        ],
    }
    audio_edit.apply_chain(source_path, output_path, chain)

    _, sr_out = sf.read(str(output_path), dtype="float32")
    assert sr_out == sample_rate, (
        f"FR-028 violation under normalize: input sr={sample_rate}, output sr={sr_out}"
    )
