"""T051 — preview temp-file ownership contract (US3 / FR-022).

The Python worker's ``materialize_to_temp`` writes the rendered preview to a
unique tempfile inside the caller-supplied ``temp_dir`` and returns the
absolute path. **Cleanup is the caller's responsibility** — in production
this is the Rust router's ``PreviewTempGuard`` (RAII Drop on the response
body stream), per ``rust/src/router/audio_edit.rs``.

This test pins that contract: the file MUST exist after ``materialize_to_temp``
returns and MUST NOT be auto-deleted by the worker. If a future refactor
introduces auto-cleanup inside the pipeline, this test fails — and the Rust
router's RAII guard becomes a double-delete bug. Either both sides change
together, or neither does.
"""

from __future__ import annotations

import math
from pathlib import Path

import numpy as np
import soundfile as sf

from emotion_tts_worker.audio_edit.pipeline import materialize_to_temp


SAMPLE_RATE = 22_050
DURATION_S = 2.0


def _write_synthetic_source(path: Path) -> None:
    n = int(DURATION_S * SAMPLE_RATE)
    t = np.arange(n) / SAMPLE_RATE
    samples = (0.4 * np.sin(2 * math.pi * 440.0 * t)).astype(np.float32)
    sf.write(str(path), samples, SAMPLE_RATE, subtype="FLOAT")


def test_materialize_to_temp_leaves_file_for_caller_to_clean(tmp_path: Path) -> None:
    source = tmp_path / "src.wav"
    _write_synthetic_source(source)

    chain = {
        "version": 1,
        "ops": [
            {
                "id": "01HX0000000000000000000000",
                "mode": "trim",
                "start_ms": 200,
                "end_ms": 1200,
            }
        ],
    }

    output_path, report = materialize_to_temp(source, chain, tmp_path, "wav")

    assert output_path.exists(), (
        "materialize_to_temp must leave the rendered preview on disk for the "
        "Rust caller (PreviewTempGuard) to clean up. If this assertion fails, "
        "the worker is auto-cleaning and the Rust RAII guard will double-free."
    )
    assert output_path.stat().st_size > 0, "preview tempfile is empty"
    assert output_path.parent == tmp_path, "output must live inside caller-supplied temp_dir"
    assert report.derived_duration_ms > 0


def test_materialize_to_temp_unique_path_per_invocation(tmp_path: Path) -> None:
    source = tmp_path / "src.wav"
    _write_synthetic_source(source)

    chain = {
        "version": 1,
        "ops": [
            {
                "id": "01HX0000000000000000000000",
                "mode": "trim",
                "start_ms": 0,
                "end_ms": 500,
            }
        ],
    }

    first, _ = materialize_to_temp(source, chain, tmp_path, "wav")
    second, _ = materialize_to_temp(source, chain, tmp_path, "wav")

    assert first != second, "preview tempfiles must use unique names to avoid in-flight collision"
    assert first.exists() and second.exists()
