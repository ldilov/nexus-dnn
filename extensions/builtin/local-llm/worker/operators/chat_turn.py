"""Operator handler for llm.chat.turn — execute one chat turn against a local LLM backend."""
from __future__ import annotations

from typing import TYPE_CHECKING, Any

from nexus_sdk.streaming import StreamingExecution
from nexus_sdk.types.llm import GenerationParams

if TYPE_CHECKING:
    from nexus_sdk.worker import ExecutionContext
    from worker.backends.adapter import BackendAdapter
    from worker.chat.executor import ChatExecutor
    from worker.chat.session_manager import SessionManager


def make_handler(
    executor: ChatExecutor,
    session_manager: SessionManager,
):
    """Factory that captures shared state and returns the operator handler."""

    def handle_chat_turn(inputs: dict[str, Any], config: dict[str, Any], context: ExecutionContext) -> dict[str, Any]:
        import asyncio

        thread_id = inputs.get("thread_id", {}).get("value", "")
        prompt_data = inputs.get("prompt", {}).get("value", "")
        system_prompt = config.get("system_prompt")
        stream_enabled = config.get("stream", False)

        generation_params = GenerationParams(
            temperature=config.get("temperature", 0.8),
            top_p=config.get("top_p", 0.95),
            max_tokens=config.get("max_tokens", 4096),
        )

        context.send_progress(10, "Preparing chat request")

        thread = session_manager.get_thread(thread_id)
        if thread is None:
            session_id = session_manager.create_session()
            thread = session_manager.create_thread(session_id)
            if system_prompt:
                thread = thread.append_message("system", system_prompt)
                session_manager.update_thread(thread)

        stream: StreamingExecution | None = None
        if stream_enabled:
            stream = StreamingExecution(context, f"chat-{context.request_id}")

        context.send_progress(50, "Generating response")

        loop = asyncio.get_event_loop()
        turn_result = loop.run_until_complete(
            executor.execute_turn(thread, prompt_data, generation_params, stream, context)
        )

        context.send_progress(100, "Generation complete")

        return {
            "status": "completed",
            "outputs": {
                "assistant_message": {"value": turn_result.assistant_content},
                "thread_id": {"value": turn_result.updated_thread.thread_id},
                "metrics": {
                    "value": {
                        "prompt_tokens": turn_result.usage.prompt_tokens,
                        "completion_tokens": turn_result.usage.completion_tokens,
                        "generation_time_ms": turn_result.generation_time_ms,
                    }
                },
            },
            "metrics": {"generation_time_ms": turn_result.generation_time_ms},
        }

    return handle_chat_turn
