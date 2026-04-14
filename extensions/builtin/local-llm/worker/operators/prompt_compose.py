"""Operator handler for llm.prompt.compose — assemble system prompt, user message, and context."""
from __future__ import annotations

from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    from nexus_sdk.worker import ExecutionContext


def handle_prompt_compose(inputs: dict[str, Any], config: dict[str, Any], context: ExecutionContext) -> dict[str, Any]:
    """Compose a full prompt from system, context, and user parts."""
    user_message = inputs.get("user_message", {}).get("value", "")
    system_prompt = inputs.get("system_prompt", {}).get("value", "")
    additional_context = inputs.get("context", {}).get("value", "")

    messages: list[dict[str, str]] = []

    if system_prompt:
        messages.append({"role": "system", "content": system_prompt})

    if additional_context:
        messages.append({"role": "system", "content": additional_context})

    messages.append({"role": "user", "content": user_message})

    composed_parts: list[str] = []
    for msg in messages:
        role_label = msg["role"].capitalize()
        composed_parts.append(f"[{role_label}] {msg['content']}")

    composed = "\n\n".join(composed_parts)

    context.send_progress(100, "Prompt composed")

    return {
        "status": "completed",
        "outputs": {
            "prompt": {"value": composed},
            "messages": {"value": messages},
        },
        "metrics": {"message_count": len(messages)},
    }
