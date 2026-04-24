"""High-level `synthesize` / `synthesize_batch` handlers.

Drives ``IndexTtsAdapter`` segment-by-segment, emits notifications between
segments, and respects the cooperative cancel token. Registered into
``Worker._handlers`` by callers (production main.py or tests).
"""

from __future__ import annotations

import time
from typing import Any, Callable

from .cancellation import CancelToken, CancelledError, GLOBAL_TOKEN
from .gpt_compile import CompileSettings, CompiledGpt, compile_gpt_stage
from .indextts_adapter import (
    AdapterSettings,
    IndexTtsAdapter,
    SegmentOutcome,
    SynthesisSegment,
)
from .rpc import ErrorCodes, notification


Notifier = Callable[[dict[str, Any]], None]


def parse_segment(raw: dict[str, Any]) -> SynthesisSegment:
    emotion = raw.get("emotion") or {"mode": "none"}
    mode = emotion.get("mode", "none")
    return SynthesisSegment(
        segment_id=str(raw["segment_id"]),
        global_index=int(raw["global_index"]),
        text=str(raw["text"]),
        speaker_audio_abs=str(raw["speaker_audio_ref_abs"]),
        output_target_abs=str(raw["output_target_abs"]),
        emotion_mode=mode,
        emotion_audio_ref_abs=emotion.get("audio_ref_abs"),
        emotion_vector=emotion.get("vector"),
        emotion_qwen_template=emotion.get("template"),
        emotion_alpha=float(emotion.get("emotion_alpha", 1.0)),
        generation=raw.get("generation") or {},
    )


def build_settings(params: dict[str, Any], model_dir_abs: str) -> AdapterSettings:
    opts = params.get("optimizations") or {}
    hint = params.get("speaker_cache_hint") or {}

    layer_range_raw = opts.get("oas_layer_range")
    if layer_range_raw is None:
        oas_layer_range = (10, 14)
    else:
        oas_layer_range = (int(layer_range_raw[0]), int(layer_range_raw[1]))

    return AdapterSettings(
        model_dir_abs=model_dir_abs,
        use_fp16=bool(opts.get("use_fp16", True)),
        use_cuda_kernel=opts.get("use_cuda_kernel"),
        use_deepspeed=bool(opts.get("use_deepspeed", False)),
        use_accel=bool(opts.get("use_accel", False)),
        use_torch_compile=bool(opts.get("use_torch_compile", False)),
        low_vram=bool(opts.get("low_vram", False)),
        gpt_batch_size=int(opts.get("gpt_batch_size", 2)),
        # Spec 034 additions — accepted via ``optimizations`` on the params
        # dict so the Rust `synthesize.batch` caller can override them per
        # batch. ``speaker_cache_hint`` is the T021 contract field — the
        # hint.budget_mb wins over opts.speaker_cache_mb when both are
        # present, matching R-34-05 "hint is the per-batch override".
        speaker_cache_mb=int(hint.get("budget_mb", opts.get("speaker_cache_mb", 200))),
        compile_pad_to_multiple_of=int(opts.get("compile_pad_to_multiple_of", 64)),
        oas_layer_range=oas_layer_range,
        oas_literature_threshold=float(opts.get("oas_literature_threshold", 0.45)),
        oas_max_png_per_run=int(opts.get("oas_max_png_per_run", 50)),
        max_text_tokens_per_segment=int(opts.get("max_text_tokens_per_segment", 400)),
    )


class SynthesisService:
    def __init__(
        self,
        adapter: IndexTtsAdapter,
        emitter: Notifier,
        token: CancelToken | None = None,
    ) -> None:
        self._adapter = adapter
        self._emitter = emitter
        self._token = token or GLOBAL_TOKEN
        # Spec 034 US4 — per-subprocess compile state. Once `torch.compile`
        # fails for a given session we do NOT retry on subsequent batches
        # (avoids the "compile thrash on every user click" antipattern
        # called out in R-34-04). Reset only on subprocess restart.
        self._compile_handle: CompiledGpt | None = None
        self._compile_attempted: bool = False
        self._compile_session_failed_reason: str | None = None

    def handle_synthesize(self, params: dict[str, Any]) -> dict[str, Any]:
        request_id = str(params["request_id"])
        segments_raw = params.get("segments") or []
        if len(segments_raw) != 1:
            raise ValueError("synthesize expects exactly one segment")
        return self._process_batch(request_id, params, [parse_segment(segments_raw[0])], priority=True)

    def handle_synthesize_batch(self, params: dict[str, Any]) -> dict[str, Any]:
        request_id = str(params["request_id"])
        segments = [parse_segment(s) for s in params.get("segments") or []]
        if not segments:
            raise ValueError("synthesize_batch requires at least one segment")
        return self._process_batch(request_id, params, segments, priority=False)

    def _process_batch(
        self,
        request_id: str,
        params: dict[str, Any],
        segments: list[SynthesisSegment],
        *,
        priority: bool,
    ) -> dict[str, Any]:
        self._token.bind(request_id)
        outcomes: list[SegmentOutcome] = []
        saw_cancel = False

        enable_compile = bool(params.get("enable_compile", False))
        compile_active = self._apply_compile_toggle(request_id, enable_compile)

        try:
            for seg in segments:
                if self._token.is_cancelled():
                    outcomes.append(
                        SegmentOutcome(segment_id=seg.segment_id, status="cancelled")
                    )
                    saw_cancel = True
                    continue

                self._emit_started(params, seg)
                outcome = self._adapter.synthesise(seg, request_id, self._token)
                outcomes.append(outcome)
                if outcome.status == "failed":
                    self._emit_failed(params, seg, outcome)
                else:
                    self._emit_completed(params, seg, outcome)
        except CancelledError:
            saw_cancel = True
        finally:
            self._token.clear()

        batch_status = derive_batch_status(outcomes, saw_cancel)

        return {
            "request_id": request_id,
            "status": batch_status,
            "segments": [outcome_to_wire(o) for o in outcomes],
            "priority": priority,
            # Spec 034 FR-234 — manifest writer (T087) consumes this field.
            "compile_active": compile_active,
        }

    def _apply_compile_toggle(self, request_id: str, enable: bool) -> bool:
        """Idempotently resolve the compile state for this batch.

        Returns the actual ``compile_active`` flag after fallback resolution.
        """

        if not enable:
            # Toggle off → don't flip session state; next batch can re-enable.
            return False
        if self._compile_session_failed_reason is not None:
            # A prior compile failed in this session — R-34-04 says we must
            # NOT retry automatically. User can flip the toggle off/on or
            # restart the runtime to try again.
            return False
        if self._compile_handle is not None and self._compile_handle.session_available():
            # Already compiled for this session — subsequent batches ride
            # the amortised path for free.
            return True
        if self._compile_attempted:
            return False

        # Fresh compile attempt. The adapter's model may not be loaded yet —
        # ensure it is (with stage emission) so we're wrapping real weights.
        self._compile_attempted = True
        try:
            self._adapter.ensure_model()
        except Exception as err:
            self._compile_session_failed_reason = (
                f"model load failed before compile: {type(err).__name__}: {err}"
            )
            return False

        gpt_module = getattr(self._adapter._model, "gpt", None)  # noqa: SLF001
        if gpt_module is None:
            self._compile_session_failed_reason = (
                "adapter._model.gpt not exposed by upstream; cannot compile"
            )
            return False

        settings = CompileSettings(
            enabled=True,
            pad_to_multiple_of=self._adapter._settings.compile_pad_to_multiple_of,  # noqa: SLF001
            max_text_tokens_per_segment=self._adapter._settings.max_text_tokens_per_segment,  # noqa: SLF001
        )
        handle = compile_gpt_stage(
            gpt_module,
            settings,
            emitter=self._emit_compile_progress,
            request_id=request_id,
        )
        self._compile_handle = handle
        if not handle.session_available():
            self._compile_session_failed_reason = handle.last_failure() or "unknown"
            return False
        return True

    def _emit_compile_progress(self, stage: str, payload: dict[str, Any]) -> None:
        self._emitter(notification("progress", payload))

    def _emit_started(self, params: dict[str, Any], seg: SynthesisSegment) -> None:
        self._emitter(
            notification(
                "segment_started",
                {
                    "runId": params.get("run_id"),
                    "globalIndex": seg.global_index,
                    "segmentId": seg.segment_id,
                    "ts": time.time(),
                },
            )
        )

    def _emit_completed(
        self,
        params: dict[str, Any],
        seg: SynthesisSegment,
        outcome: SegmentOutcome,
    ) -> None:
        self._emitter(
            notification(
                "segment_completed",
                {
                    "runId": params.get("run_id"),
                    "globalIndex": seg.global_index,
                    "segmentId": seg.segment_id,
                    "durationMs": outcome.duration_ms,
                    "outputPathAbs": outcome.output_path_abs,
                },
            )
        )

    def _emit_failed(
        self,
        params: dict[str, Any],
        seg: SynthesisSegment,
        outcome: SegmentOutcome,
    ) -> None:
        self._emitter(
            notification(
                "segment_failed",
                {
                    "runId": params.get("run_id"),
                    "globalIndex": seg.global_index,
                    "segmentId": seg.segment_id,
                    "failureCategory": outcome.failure_category,
                    "failureDetail": outcome.failure_detail,
                },
            )
        )


def derive_batch_status(outcomes: list[SegmentOutcome], saw_cancel: bool) -> str:
    """Mirror the Rust manifest.partial rule per FR-142..144.

    * any cancelled segment or external cancel signal → ``partial`` (with
      survivors) or ``cancelled`` (nothing completed).
    * every segment failed → ``failed``.
    * every segment completed → ``completed``.
    * mixed completed + failed → ``partial``.
    """

    if not outcomes:
        return "cancelled" if saw_cancel else "failed"

    total = len(outcomes)
    completed = sum(1 for o in outcomes if o.status == "completed")
    failed = sum(1 for o in outcomes if o.status == "failed")
    cancelled = sum(1 for o in outcomes if o.status == "cancelled")

    if completed == total:
        return "completed"
    if failed == total:
        return "failed"
    if cancelled == total:
        return "cancelled"
    if saw_cancel and completed == 0:
        return "cancelled"
    return "partial"


def outcome_to_wire(o: SegmentOutcome) -> dict[str, Any]:
    return {
        "segment_id": o.segment_id,
        "status": o.status,
        "output_path_abs": o.output_path_abs,
        "duration_ms": o.duration_ms,
        "sample_rate": o.sample_rate,
        "failure_category": o.failure_category,
        "failure_detail": o.failure_detail,
    }
