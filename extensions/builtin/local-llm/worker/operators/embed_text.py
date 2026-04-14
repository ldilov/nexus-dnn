"""Operator handler for llm.embed.text — generate embeddings via local backend."""
from __future__ import annotations

import json
from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    from nexus_sdk.worker import ExecutionContext
    from worker.backends.adapter import BackendAdapter


def make_handler(backend_getter):
    """Factory that captures the active backend reference."""

    def handle_embed_text(inputs: dict[str, Any], config: dict[str, Any], context: ExecutionContext) -> dict[str, Any]:
        """Generate embeddings for input text using the active backend."""
        import asyncio

        text = inputs.get("text", {}).get("value", "")
        batch_separator = config.get("batch_separator")

        context.send_progress(10, "Preparing embedding request")

        if batch_separator:
            texts = [t.strip() for t in text.split(batch_separator) if t.strip()]
        else:
            texts = [text]

        backend = backend_getter()
        if backend is None:
            return {
                "status": "failed",
                "error": {
                    "code": -32001,
                    "category": "backend",
                    "message": "No backend is currently active",
                    "retryable": True,
                },
            }

        caps = backend.capabilities()
        if not caps.embeddings:
            return {
                "status": "failed",
                "error": {
                    "code": -32002,
                    "category": "backend",
                    "message": f"Backend {backend.kind.value} does not support embeddings",
                    "retryable": False,
                },
            }

        context.send_progress(50, "Generating embeddings")

        loop = asyncio.get_event_loop()
        embeddings = loop.run_until_complete(backend.embeddings(texts))

        embedding_dim = len(embeddings[0]) if embeddings else 0

        context.send_progress(100, "Embeddings generated")

        return {
            "status": "completed",
            "outputs": {
                "embeddings": {"value": json.dumps(embeddings)},
            },
            "metrics": {
                "embedding_dim": embedding_dim,
                "batch_size": len(texts),
                "token_count": sum(len(t.split()) for t in texts),
            },
        }

    return handle_embed_text
