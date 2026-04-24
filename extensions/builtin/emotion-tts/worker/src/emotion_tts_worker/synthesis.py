"""High-level `synthesize` / `synthesize_batch` handlers.

Drives ``IndexTtsAdapter`` segment-by-segment, emits notifications between
segments, and respects the cooperative cancel token. Registered into
``Worker._handlers`` by callers (production main.py or tests).
"""

from __future__ import annotations

import time
from typing import Any, Callable

from .cancellation import CancelToken, CancelledError, GLOBAL_TOKEN
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
    return AdapterSettings(
        model_dir_abs=model_dir_abs,
        use_fp16=bool(opts.get("use_fp16", True)),
        use_cuda_kernel=opts.get("use_cuda_kernel"),
        use_deepspeed=bool(opts.get("use_deepspeed", False)),
        use_accel=bool(opts.get("use_accel", False)),
        use_torch_compile=bool(opts.get("use_torch_compile", False)),
        low_vram=bool(opts.get("low_vram", False)),
        gpt_batch_size=int(opts.get("gpt_batch_size", 2)),
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
        batch_status = "completed"

        try:
            for seg in segments:
                if self._token.is_cancelled():
                    outcomes.append(
                        SegmentOutcome(segment_id=seg.segment_id, status="cancelled")
                    )
                    batch_status = "cancelled"
                    continue

                self._emit_started(params, seg)
                outcome = self._adapter.synthesise(seg, request_id, self._token)
                outcomes.append(outcome)
                if outcome.status == "failed":
                    batch_status = "failed" if batch_status == "completed" else batch_status
                    self._emit_failed(params, seg, outcome)
                else:
                    self._emit_completed(params, seg, outcome)
        except CancelledError:
            batch_status = "cancelled"
        finally:
            self._token.clear()

        return {
            "request_id": request_id,
            "status": batch_status,
            "segments": [outcome_to_wire(o) for o in outcomes],
            "priority": priority,
        }

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
