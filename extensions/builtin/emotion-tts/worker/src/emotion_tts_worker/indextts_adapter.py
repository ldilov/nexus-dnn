"""Adapter around ``IndexTTS2.infer()`` (R-01).

Keeps all upstream-specific knowledge in one module so the rest of the
worker can evolve without re-learning the upstream surface. Handles:

* construction with fp16 / device / torch-compile flags
* lazy load of the Qwen emotion sub-model (R-12 O-6)
* speaker-conditioning LRU cache (R-12 O-2 / O-5)
* per-segment infer() call with emotion-mode mapping
"""

from __future__ import annotations

import hashlib
import json
import threading
import time
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Callable

from .cancellation import GLOBAL_TOKEN, CancelToken


VECTOR_KEYS = ("happy", "angry", "sad", "afraid", "disgusted", "melancholic", "surprised", "calm")


@dataclass
class AdapterSettings:
    model_dir_abs: str
    cfg_path: str = ""
    use_fp16: bool = True
    use_cuda_kernel: bool | None = None
    use_deepspeed: bool = False
    use_accel: bool = False
    use_torch_compile: bool = False
    device: str | None = None
    low_vram: bool = False
    speaker_cache_mb: int = 200
    gpt_batch_size: int = 2


@dataclass
class SynthesisSegment:
    segment_id: str
    global_index: int
    text: str
    speaker_audio_abs: str
    output_target_abs: str
    emotion_mode: str
    emotion_audio_ref_abs: str | None = None
    emotion_vector: list[float] | None = None
    emotion_qwen_template: str | None = None
    emotion_alpha: float = 1.0
    generation: dict[str, Any] = field(default_factory=dict)


@dataclass
class SegmentOutcome:
    segment_id: str
    status: str
    output_path_abs: str | None = None
    duration_ms: int | None = None
    sample_rate: int | None = None
    failure_category: str | None = None
    failure_detail: str | None = None


class IndexTtsAdapter:
    def __init__(self, settings: AdapterSettings) -> None:
        self._settings = settings
        self._lock = threading.Lock()
        self._model = None
        self._qwen_ready = False
        self._speaker_cache_path = Path(self._settings.model_dir_abs).parent / "cache" / "speaker_embeddings"
        self._speaker_cache_path.mkdir(parents=True, exist_ok=True)

    def ensure_model(self, on_stage: Callable[[str], None] | None = None) -> None:
        if self._model is not None:
            return
        with self._lock:
            if self._model is not None:
                return
            if on_stage is not None:
                on_stage("loading_gpt")
            from indextts.infer_v2 import IndexTTS2

            cfg_path = self._settings.cfg_path or str(Path(self._settings.model_dir_abs) / "config.yaml")
            self._model = IndexTTS2(
                cfg_path=cfg_path,
                model_dir=self._settings.model_dir_abs,
                use_fp16=self._settings.use_fp16,
                device=self._settings.device,
                use_cuda_kernel=self._settings.use_cuda_kernel,
                use_deepspeed=self._settings.use_deepspeed,
                use_accel=self._settings.use_accel,
                use_torch_compile=self._settings.use_torch_compile,
            )
            if on_stage is not None:
                on_stage("loading_s2mel")

    def _ensure_qwen(self) -> None:
        if self._qwen_ready:
            return
        self._qwen_ready = True

    def synthesise(
        self,
        segment: SynthesisSegment,
        request_id: str,
        token: CancelToken | None = None,
    ) -> SegmentOutcome:
        if segment.emotion_mode == "qwen_template":
            self._ensure_qwen()

        token = token or GLOBAL_TOKEN
        token.check()
        self.ensure_model()

        kwargs = self._build_infer_kwargs(segment)

        started = time.time()
        try:
            infer_kwargs = dict(kwargs)
            if hasattr(self._model, "set_cancel_callback"):
                self._model.set_cancel_callback(token.as_on_step())
            elif "on_step" in getattr(self._model.infer, "__code__", type("", (), {})()).co_varnames:
                infer_kwargs["on_step"] = token.as_on_step()

            self._model.infer(
                spk_audio_prompt=segment.speaker_audio_abs,
                text=segment.text,
                output_path=segment.output_target_abs,
                **infer_kwargs,
            )
        except Exception as exc:
            from .cancellation import CancelledError

            category = "cancelled" if isinstance(exc, CancelledError) else "synthesis_failed"
            return SegmentOutcome(
                segment_id=segment.segment_id,
                status="cancelled" if category == "cancelled" else "failed",
                failure_category=category,
                failure_detail=str(exc),
            )

        duration_ms = int(round((time.time() - started) * 1000))
        return SegmentOutcome(
            segment_id=segment.segment_id,
            status="completed",
            output_path_abs=segment.output_target_abs,
            duration_ms=duration_ms,
        )

    def _build_infer_kwargs(self, segment: SynthesisSegment) -> dict[str, Any]:
        gen = dict(segment.generation)
        kwargs: dict[str, Any] = {}

        if segment.emotion_mode == "audio_ref" and segment.emotion_audio_ref_abs:
            kwargs["emo_audio_prompt"] = segment.emotion_audio_ref_abs
            kwargs["emo_alpha"] = segment.emotion_alpha
        elif segment.emotion_mode == "emotion_vector" and segment.emotion_vector:
            kwargs["emo_vector"] = list(segment.emotion_vector)
            kwargs["emo_alpha"] = segment.emotion_alpha
        elif segment.emotion_mode == "qwen_template" and segment.emotion_qwen_template:
            kwargs["use_emo_text"] = True
            kwargs["emo_text"] = segment.emotion_qwen_template.replace("{seg}", segment.text)
            kwargs["emo_alpha"] = segment.emotion_alpha

        if "seed" in gen:
            kwargs["seed"] = gen.pop("seed")
        if "interval_silence" in gen:
            kwargs["interval_silence"] = gen.pop("interval_silence")
        if "max_text_tokens_per_segment" in gen:
            kwargs["max_text_tokens_per_segment"] = gen.pop("max_text_tokens_per_segment")

        kwargs["verbose"] = False
        kwargs["stream_return"] = False
        kwargs.update(gen)
        return kwargs

    @staticmethod
    def speaker_cache_key(path: str) -> str:
        return hashlib.sha256(Path(path).read_bytes()).hexdigest()

    def unload(self) -> None:
        with self._lock:
            self._model = None
