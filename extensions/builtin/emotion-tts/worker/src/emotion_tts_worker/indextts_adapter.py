"""Adapter around ``IndexTTS2.infer()`` (R-01).

Keeps all upstream-specific knowledge in one module so the rest of the
worker can evolve without re-learning the upstream surface. Handles:

* construction with fp16 / device / torch-compile flags
* lazy load of the Qwen emotion sub-model (R-12 O-6)
* speaker-conditioning LRU cache (R-12 O-2 / O-5)
* per-segment infer() call with emotion-mode mapping
"""

from __future__ import annotations

import gc
import hashlib
import json
import threading
import time
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Callable

from .cancellation import GLOBAL_TOKEN, CancelToken
from .speaker_cache import SpeakerCache, SpeakerCacheKey


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
    compile_pad_to_multiple_of: int = 64
    oas_layer_range: tuple[int, int] = (10, 14)
    oas_literature_threshold: float = 0.45
    oas_max_png_per_run: int = 50
    max_text_tokens_per_segment: int = 400


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
    def __init__(
        self,
        settings: AdapterSettings,
        *,
        model_family: str = "indextts-2",
        runtime_version: str = "0.1.0",
    ) -> None:
        self._settings = settings
        self._lock = threading.Lock()
        self._model = None
        self._qwen_ready = False
        self._speaker_cache_path = Path(self._settings.model_dir_abs).parent / "cache" / "speaker_embeddings"
        self._speaker_cache_path.mkdir(parents=True, exist_ok=True)
        self._model_family = model_family
        self._runtime_version = runtime_version
        # Spec 034 US3 — byte-budgeted LRU over computed speaker-conditioning
        # embeddings. Budget comes from AdapterSettings so the Rust shim can
        # tune it via the EMOTION_TTS_SPEAKER_CACHE_MB env var (T075).
        self._speaker_cache: SpeakerCache[Any] = SpeakerCache(
            budget_mb=self._settings.speaker_cache_mb,
        )

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

    def _ensure_qwen(self, on_stage: Callable[[str], None] | None = None) -> None:
        if self._qwen_ready:
            return
        with self._lock:
            if self._qwen_ready:
                return
            if on_stage is not None:
                on_stage("loading_qwen")
            self._force_qwen_load()
            self._qwen_ready = True

    def _force_qwen_load(self) -> None:
        if self._model is None:
            return
        for attr in ("load_qwen_emotion", "load_emo_text_model", "_ensure_qwen"):
            fn = getattr(self._model, attr, None)
            if callable(fn):
                fn()
                return
        qwen = getattr(self._model, "qwen_emotion", None) or getattr(self._model, "emo_text_model", None)
        if qwen is not None and hasattr(qwen, "to"):
            device = self._settings.device or "cuda"
            try:
                qwen.to(device)
            except Exception:
                pass

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
            elif _accepts_on_step(self._model.infer):
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

    # ------------------------------------------------------------------
    # Spec 034 US3 — public surface for the speaker-prefix cache. Real
    # cut-in between "load reference" and the GPT sampling loop requires
    # upstream `IndexTTS2.infer()` to accept a pre-computed conditioning
    # tensor. Until that ships we expose a typed lookup helper that a
    # wrapper (or a future patched upstream fork) can call; the cache
    # bookkeeping + stats notification are already live.
    # ------------------------------------------------------------------

    def speaker_cache_entry_key(self, ref_path: str) -> SpeakerCacheKey:
        return SpeakerCacheKey(
            content_hash=self.speaker_cache_key(ref_path),
            model_family=self._model_family,
            runtime_version=self._runtime_version,
        )

    def lookup_speaker_embedding(self, ref_path: str) -> Any | None:
        return self._speaker_cache.get(self.speaker_cache_entry_key(ref_path))

    def store_speaker_embedding(
        self,
        ref_path: str,
        embedding: Any,
        size_bytes: int,
    ) -> None:
        self._speaker_cache.put(
            self.speaker_cache_entry_key(ref_path),
            embedding,
            size_bytes,
        )

    def speaker_cache_snapshot(self) -> dict[str, Any]:
        """Return a dict suitable for emitting as a ``cache_stats`` notification."""

        return dict(self._speaker_cache.snapshot_stats())

    def clear_speaker_cache_family(self, model_family: str) -> int:
        """Drop every speaker-cache entry belonging to ``model_family``.

        Called from the ``family.switch`` RPC handler (spec 034 T106) to
        honour FR-223 restart-semantics invalidation on family change.
        """

        return self._speaker_cache.clear_family(model_family)

    def set_active_model_family(self, model_family: str) -> None:
        """Mutate the adapter's active family. Subsequent ``store_/lookup_``
        calls will key on the new family. The old family's entries stay in
        the cache until the caller invokes ``clear_speaker_cache_family``."""

        self._model_family = model_family

    def unload(self) -> int:
        with self._lock:
            before = _cuda_allocated_bytes(self._settings.device)
            self._model = None
            self._qwen_ready = False
            gc.collect()
            _cuda_empty_cache()
            after = _cuda_allocated_bytes(self._settings.device)
            freed = max(before - after, 0)
            return freed // (1024 * 1024)


def _accepts_on_step(callable_obj: Any) -> bool:
    code = getattr(callable_obj, "__code__", None)
    if code is None:
        return False
    varnames = getattr(code, "co_varnames", ())
    return "on_step" in varnames


def _cuda_empty_cache() -> None:
    try:
        import torch
    except ImportError:
        return
    if torch.cuda.is_available():
        torch.cuda.empty_cache()


def _cuda_allocated_bytes(device: str | None) -> int:
    try:
        import torch
    except ImportError:
        return 0
    if not torch.cuda.is_available():
        return 0
    try:
        return int(torch.cuda.memory_allocated(device))
    except Exception:
        return 0
