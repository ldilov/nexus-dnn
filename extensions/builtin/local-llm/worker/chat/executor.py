"""Chat turn execution — stop, retry, regenerate against a backend adapter."""
from __future__ import annotations

import time
from dataclasses import dataclass, field
from typing import Any

from nexus_sdk.streaming import StreamComplete, StreamDelta, StreamingExecution
from nexus_sdk.types.llm import (
    ChatMessage,
    ChatRequest,
    GenerationParams,
    TokenUsage,
)
from nexus_sdk.worker import ExecutionContext

from worker.backends.adapter import BackendAdapter, BackendStatus
from worker.chat.session_manager import SessionManager, Thread


@dataclass(frozen=True)
class TurnResult:
    """Immutable outcome of a single chat turn."""

    assistant_content: str
    finish_reason: str
    usage: TokenUsage
    generation_time_ms: int
    updated_thread: Thread


class ChatExecutor:
    """Drives one chat turn through a backend adapter, with streaming support."""

    def __init__(
        self,
        backend: BackendAdapter,
        session_manager: SessionManager,
    ) -> None:
        self._backend = backend
        self._sessions = session_manager

    async def execute_turn(
        self,
        thread: Thread,
        user_content: str,
        params: GenerationParams,
        stream: StreamingExecution | None = None,
        context: ExecutionContext | None = None,
    ) -> TurnResult:
        """Run one chat turn: append user message, call backend, append assistant reply."""
        thread = thread.append_message("user", user_content)

        messages = thread.to_message_dicts()
        gen_params = self._params_to_dict(params)

        start = time.monotonic()

        if stream is not None:
            content, finish_reason, usage = await self._execute_streaming(
                messages, gen_params, stream, context
            )
        else:
            content, finish_reason, usage = await self._execute_sync(
                messages, gen_params
            )

        elapsed_ms = int((time.monotonic() - start) * 1000)

        thread = thread.append_message(
            "assistant",
            content,
            metadata={
                "finish_reason": finish_reason,
                "generation_time_ms": elapsed_ms,
            },
        )

        self._sessions.update_thread(thread)

        return TurnResult(
            assistant_content=content,
            finish_reason=finish_reason,
            usage=usage,
            generation_time_ms=elapsed_ms,
            updated_thread=thread,
        )

    async def retry_last(
        self,
        thread: Thread,
        params: GenerationParams,
        stream: StreamingExecution | None = None,
        context: ExecutionContext | None = None,
    ) -> TurnResult:
        """Re-run the last user message by dropping the last assistant reply."""
        if not thread.messages:
            raise ValueError("Cannot retry an empty thread")

        trimmed_messages = list(thread.messages)
        if trimmed_messages[-1].role == "assistant":
            trimmed_messages.pop()

        if not trimmed_messages or trimmed_messages[-1].role != "user":
            raise ValueError("No user message to retry")

        last_user = trimmed_messages[-1].content

        thread_without_last = Thread(
            thread_id=thread.thread_id,
            session_id=thread.session_id,
            messages=tuple(trimmed_messages[:-1]),
            created_at=thread.created_at,
        )

        return await self.execute_turn(
            thread_without_last, last_user, params, stream, context
        )

    async def stop_generation(self, context: ExecutionContext) -> None:
        """Signal the backend to halt an in-flight generation."""
        context._cancelled.set()

    async def _execute_streaming(
        self,
        messages: list[dict[str, str]],
        params: dict[str, Any],
        stream: StreamingExecution,
        context: ExecutionContext | None,
    ) -> tuple[str, str, TokenUsage]:
        collected: list[str] = []
        finish_reason = "stop"
        usage = TokenUsage(prompt_tokens=0, completion_tokens=0, total_tokens=0)

        async for chunk in self._backend.chat_stream(messages, params):
            if context is not None and context.is_cancelled:
                finish_reason = "cancelled"
                break

            choices = chunk.get("choices", [])
            if not choices:
                continue

            delta = choices[0].get("delta", {})
            text = delta.get("content", "")
            chunk_finish = choices[0].get("finish_reason")

            if text:
                collected.append(text)
                stream.emit_delta(StreamDelta(text=text, finish_reason=chunk_finish))

            if chunk_finish is not None:
                finish_reason = chunk_finish

            chunk_usage = chunk.get("usage")
            if chunk_usage is not None:
                usage = TokenUsage(
                    prompt_tokens=chunk_usage.get("prompt_tokens", 0),
                    completion_tokens=chunk_usage.get("completion_tokens", 0),
                    total_tokens=chunk_usage.get("total_tokens", 0),
                )

        content = "".join(collected)

        stream.emit_complete(StreamComplete(
            finish_reason=finish_reason,
            usage=usage,
            generation_time_ms=0,
        ))

        return content, finish_reason, usage

    async def _execute_sync(
        self,
        messages: list[dict[str, str]],
        params: dict[str, Any],
    ) -> tuple[str, str, TokenUsage]:
        result = await self._backend.chat(messages, params)

        choices = result.get("choices", [])
        if not choices:
            return "", "error", TokenUsage(0, 0, 0)

        message = choices[0].get("message", {})
        content = message.get("content", "")
        finish_reason = choices[0].get("finish_reason", "stop")

        raw_usage = result.get("usage", {})
        usage = TokenUsage(
            prompt_tokens=raw_usage.get("prompt_tokens", 0),
            completion_tokens=raw_usage.get("completion_tokens", 0),
            total_tokens=raw_usage.get("total_tokens", 0),
        )

        return content, finish_reason, usage

    @staticmethod
    def _params_to_dict(params: GenerationParams) -> dict[str, Any]:
        result: dict[str, Any] = {
            "temperature": params.temperature,
            "top_p": params.top_p,
            "max_tokens": params.max_tokens,
        }
        if params.stop_sequences:
            result["stop_sequences"] = list(params.stop_sequences)
        return result
