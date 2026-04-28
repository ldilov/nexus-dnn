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


def _resolve_use_cuda_kernel(requested: bool | None) -> bool:
    """Decide whether to attempt BigVGAN's custom CUDA kernel JIT build.

    The kernel is a `torch.utils.cpp_extension.load(...)` call that compiles
    `anti_alias_activation_cuda.cu` on first import. The compile needs:

      * `ninja` on PATH (covered by `__main__._ensure_ninja_on_path`).
      * `nvcc` (CUDA Toolkit) on PATH — separate from PyTorch's bundled
        runtime CUDA libs. Many GPU-Python users have torch+CUDA without
        Toolkit installed.
      * A working host C++ compiler (MSVC `cl.exe` on Windows, `g++` on
        Linux) at a version torch's build helper accepts.

    When ANY of those is missing, BigVGAN's load() raises and is caught
    one frame up, which prints the familiar two-liner:

        >> Failed to load custom CUDA kernel for BigVGAN. Falling back to torch.
        RuntimeError("Error building extension 'anti_alias_activation_cuda'")

    Synthesis still works — the vocoder runs on the slower torch-only
    path. The error is just noise.

    Resolution:
      * `requested=True/False` → respect the explicit setting (user opt-in
        or opt-out via the `optimizations.use_cuda_kernel` field).
      * `requested=None` (default) → auto-detect: skip the JIT (return
        False) when `nvcc` is not on PATH, attempt it (return True) when
        it is. We never return None back to IndexTTS2 — leaving the kernel
        attempt to IndexTTS2's own auto-detect would re-introduce the
        noisy fallback for users without Toolkit.
    """
    import shutil

    if requested is not None:
        return requested
    return shutil.which("nvcc") is not None


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
            # Direct-to-stderr checkpoints (bypass logging buffers) so we can
            # see EXACTLY where a multi-minute hang is sitting. The host
            # forwards stderr line-by-line into the host log via the
            # StdioLease stderr forwarder, so each `print(..., flush=True)`
            # below shows up immediately in the host trace.
            import sys as _sys
            import time as _time
            def _ckpt(label: str) -> float:
                ts = _time.monotonic()
                print(f"[ensure_model] {label}", file=_sys.stderr, flush=True)
                return ts
            t0 = _ckpt("entered (acquired lock)")

            # Wait for the heavy-import warmer to finish before doing our
            # own imports. Concurrent first-time scipy/sklearn loads from
            # two threads on Windows can stall indefinitely (loader-lock
            # contention between Python's per-module import lock and
            # Win32's process-wide DLL loader lock). The warmer is started
            # by `__main__.py` BEFORE the asyncio loop runs, so by the
            # time we reach this point it has either finished (instant
            # below) or is still grinding (we wait — usually <60s).
            from .warm import WARM_DONE
            if not WARM_DONE.is_set():
                _ckpt("waiting for import warmer to finish (avoids loader-lock race)")
                WARM_DONE.wait()
                _ckpt("warmer finished — proceeding")

            if on_stage is not None:
                on_stage("loading_gpt")
            _ckpt("emitted on_stage(loading_gpt) — about to import _indextts_compat")
            from ._indextts_compat import patch_indextts_text_normalizer
            _ckpt("imported _indextts_compat — patching text normalizer")

            patch_indextts_text_normalizer()
            _ckpt("text normalizer patched — about to import indextts.infer_v2")

            # Arm a watchdog: if the import hangs >120s, faulthandler
            # dumps every thread's Python stack to stderr so we can see
            # which sub-import is blocked. 120s is generous because the
            # scipy/sklearn/transformers chain on Windows with AV scanning
            # can legitimately take 2-3 minutes on first-ever load — a
            # 45s threshold produces nuisance dumps for slow-but-
            # progressing imports. The `_warm_heavy_imports` daemon
            # thread (kicked off in __main__.py) usually finishes this
            # work in parallel with the handshake, so by the time we
            # reach this line the module is already cached and the
            # import is instant. The watchdog is the safety net.
            import faulthandler as _fh
            if not _fh.is_enabled():
                _fh.enable()
            _fh.dump_traceback_later(120, repeat=True, file=_sys.stderr)
            try:
                from indextts.infer_v2 import IndexTTS2
            finally:
                _fh.cancel_dump_traceback_later()
            _ckpt("imported indextts.infer_v2.IndexTTS2 — about to construct")

            cfg_path = self._settings.cfg_path or str(Path(self._settings.model_dir_abs) / "config.yaml")
            resolved_use_cuda_kernel = _resolve_use_cuda_kernel(self._settings.use_cuda_kernel)
            _ckpt(f"cfg_path={cfg_path!r}, model_dir={self._settings.model_dir_abs!r}, "
                  f"device={self._settings.device!r}, use_fp16={self._settings.use_fp16}, "
                  f"use_cuda_kernel={resolved_use_cuda_kernel} "
                  f"(requested={self._settings.use_cuda_kernel}), "
                  f"use_deepspeed={self._settings.use_deepspeed}, "
                  f"use_accel={self._settings.use_accel}, "
                  f"use_torch_compile={self._settings.use_torch_compile}")
            if self._settings.use_cuda_kernel is None and not resolved_use_cuda_kernel:
                _ckpt("BigVGAN custom CUDA kernel SKIPPED — nvcc not on PATH "
                      "(install CUDA Toolkit to enable the faster vocoder path; "
                      "synthesis still works on torch fallback).")
            _ckpt("calling IndexTTS2(...) — heavy work begins here")
            self._model = IndexTTS2(
                cfg_path=cfg_path,
                model_dir=self._settings.model_dir_abs,
                use_fp16=self._settings.use_fp16,
                device=self._settings.device,
                use_cuda_kernel=resolved_use_cuda_kernel,
                use_deepspeed=self._settings.use_deepspeed,
                use_accel=self._settings.use_accel,
                use_torch_compile=self._settings.use_torch_compile,
            )
            t_ctor = _ckpt(f"IndexTTS2 construction COMPLETED in {_time.monotonic() - t0:.1f}s")
            if on_stage is not None:
                on_stage("loading_s2mel")
            _ckpt(f"emitted on_stage(loading_s2mel) — ensure_model done "
                  f"(total {_time.monotonic() - t0:.1f}s, "
                  f"ctor share {_time.monotonic() - t_ctor:.1f}s)")

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
            except Exception as exc:
                # Don't swallow silently — a failed `.to(device)` here means
                # `synthesise(emotion_mode="qwen_template")` will either run
                # on CPU (slow) or blow up two layers down with a confusing
                # tensor-device mismatch. Log so the host stderr capture
                # surfaces it instead of debugging from a torch traceback.
                import logging
                logging.getLogger("emotion_tts_worker").warning(
                    "qwen .to(%s) failed during load: %s — emotion_mode=qwen_template "
                    "may fall back to CPU or fail at synth time",
                    device,
                    exc,
                    exc_info=True,
                )

    def synthesise(
        self,
        segment: SynthesisSegment,
        request_id: str,
        token: CancelToken | None = None,
    ) -> SegmentOutcome:
        # Direct-to-stderr checkpoints (same pattern as ensure_model) so a
        # silent hang inside `IndexTTS2.infer()` is debuggable instead of
        # invisible. Each `[synth]` line bypasses Python logging buffers
        # and pipes straight into the host log.
        import sys as _sys
        import traceback as _tb
        def _ckpt(label: str) -> None:
            print(f"[synth req={request_id} seg={segment.segment_id}] {label}",
                  file=_sys.stderr, flush=True)

        _ckpt(f"entered — text={segment.text!r:.80}, "
              f"speaker_audio={segment.speaker_audio_abs!r}, "
              f"emotion_mode={segment.emotion_mode!r}")

        # Validate the speaker reference before we ever touch the model.
        # Without it, IndexTTS2.infer's internal speaker-conditioning path
        # blocks waiting on a file that doesn't exist (no clean error),
        # which is the symptom "Generate stuck at running, no CPU/GPU".
        if not segment.speaker_audio_abs:
            _ckpt("FAILED: no speaker_audio_abs supplied — character has no voice mapping")
            return SegmentOutcome(
                segment_id=segment.segment_id,
                status="failed",
                failure_category="missing_voice_mapping",
                failure_detail=(
                    "no voice reference for this line; map the character to a "
                    "voice asset in the Mappings editor (Recipe → Mappings) "
                    "before running synthesis"
                ),
            )
        from pathlib import Path as _Path
        if not _Path(segment.speaker_audio_abs).is_file():
            _ckpt(f"FAILED: speaker_audio_abs does not exist: {segment.speaker_audio_abs}")
            return SegmentOutcome(
                segment_id=segment.segment_id,
                status="failed",
                failure_category="voice_file_missing",
                failure_detail=(
                    f"voice reference file not found at {segment.speaker_audio_abs} — "
                    f"the mapping points at a deleted or renamed asset"
                ),
            )

        if segment.emotion_mode == "qwen_template":
            _ckpt("ensuring qwen")
            self._ensure_qwen()
            _ckpt("qwen ready")

        token = token or GLOBAL_TOKEN
        token.check()
        _ckpt("ensure_model (should be cached)")
        self.ensure_model()
        _ckpt("ensure_model done — building infer kwargs")

        kwargs = self._build_infer_kwargs(segment)
        _ckpt(f"infer kwargs built — keys={sorted(kwargs.keys())}")

        started = time.time()
        try:
            infer_kwargs = dict(kwargs)
            if hasattr(self._model, "set_cancel_callback"):
                self._model.set_cancel_callback(token.as_on_step())
                _ckpt("set_cancel_callback installed")
            elif _accepts_on_step(self._model.infer):
                infer_kwargs["on_step"] = token.as_on_step()
                _ckpt("on_step kwarg installed")

            _ckpt("calling IndexTTS2.infer() — heavy work begins")
            self._model.infer(
                spk_audio_prompt=segment.speaker_audio_abs,
                text=segment.text,
                output_path=segment.output_target_abs,
                **infer_kwargs,
            )
            _ckpt(f"IndexTTS2.infer returned in {time.time() - started:.1f}s — "
                  f"output={segment.output_target_abs}")
        except Exception as exc:
            from .cancellation import CancelledError

            category = "cancelled" if isinstance(exc, CancelledError) else "synthesis_failed"
            _ckpt(f"FAILED ({category}): {type(exc).__name__}: {exc}\n{_tb.format_exc()}")
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
