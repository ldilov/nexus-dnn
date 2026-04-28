"""EmotionTTS audio-edit pipeline (spec 036, FR-009..FR-011).

Public API mirrors what handlers.py and the Rust router consume:

    from emotion_tts_worker.audio_edit import (
        apply_chain,
        materialize_to_temp,
        AudioEditReport,
        OpDuration,
    )

The pipeline is split across submodules:

* ``types`` — frozen dataclasses for the result envelope
* ``validation`` — boundary re-validation of EditChain JSON
* ``codecs`` — decode (soundfile / ffmpeg) and encode dispatchers
* ``ops`` — per-op numpy / ffmpeg transforms (trim, mute, normalize, speed,
  fade_in, fade_out)
* ``digest`` — deterministic SHA-256 over the canonical chain JSON
* ``pipeline`` — orchestration: validate → decode → fold ops → encode

Public functions live in this module to keep import paths short.
"""

from __future__ import annotations

from .pipeline import apply_chain, materialize_to_temp
from .types import AudioEditReport, OpDuration

__all__ = [
    "apply_chain",
    "materialize_to_temp",
    "AudioEditReport",
    "OpDuration",
]
