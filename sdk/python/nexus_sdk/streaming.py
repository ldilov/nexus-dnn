from __future__ import annotations

from dataclasses import dataclass
from typing import TYPE_CHECKING

from nexus_sdk.protocol import format_stream_event

if TYPE_CHECKING:
    from nexus_sdk.types.llm import TokenUsage
    from nexus_sdk.worker import ExecutionContext


@dataclass(frozen=True)
class StreamDelta:
    """A single chunk of streamed text output."""

    text: str
    finish_reason: str | None = None


@dataclass(frozen=True)
class StreamComplete:
    """Summary emitted when a stream finishes."""

    finish_reason: str
    usage: TokenUsage
    generation_time_ms: int


class StreamingExecution:
    """Manages a streaming output channel bound to an execution context."""

    def __init__(self, context: ExecutionContext, stream_id: str) -> None:
        self._context = context
        self._stream_id = stream_id

    def emit_delta(self, delta: StreamDelta) -> None:
        """Send an incremental text chunk to the host."""
        data = {
            "stream_id": self._stream_id,
            "request_id": self._context.request_id,
            "text": delta.text,
        }
        if delta.finish_reason is not None:
            data["finish_reason"] = delta.finish_reason
        self._context._write_line(format_stream_event("delta", data))

    def emit_complete(self, summary: StreamComplete) -> None:
        """Signal that the stream has finished with final statistics."""
        data = {
            "stream_id": self._stream_id,
            "request_id": self._context.request_id,
            "finish_reason": summary.finish_reason,
            "usage": {
                "prompt_tokens": summary.usage.prompt_tokens,
                "completion_tokens": summary.usage.completion_tokens,
                "total_tokens": summary.usage.total_tokens,
            },
            "generation_time_ms": summary.generation_time_ms,
        }
        self._context._write_line(format_stream_event("complete", data))

    def emit_error(self, error_str: str) -> None:
        """Signal that the stream encountered an error."""
        data = {
            "stream_id": self._stream_id,
            "request_id": self._context.request_id,
            "error": error_str,
        }
        self._context._write_line(format_stream_event("error", data))
