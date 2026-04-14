"""Operator handler for llm.rag.retrieve — retrieve relevant chunks from a corpus."""
from __future__ import annotations

import json
from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    from nexus_sdk.worker import ExecutionContext
    from worker.backends.adapter import BackendAdapter
    from worker.rag.corpus import CorpusManager


def make_handler(corpus_manager, backend_getter):
    """Factory that captures shared RAG state."""

    def handle_rag_retrieve(inputs: dict[str, Any], config: dict[str, Any], context: ExecutionContext) -> dict[str, Any]:
        """Retrieve top-k chunks from a corpus using embedding similarity."""
        import asyncio

        from worker.rag.retrieval import assemble_context, retrieve

        query = inputs.get("query", {}).get("value", "")
        corpus_id = inputs.get("corpus_id", {}).get("value", "")
        top_k = config.get("top_k", 5)
        min_score = config.get("min_score", 0.0)
        max_context_tokens = config.get("max_context_tokens", 2048)

        context.send_progress(10, "Computing query embedding")

        backend = backend_getter()
        if backend is None:
            return {
                "status": "failed",
                "error": {
                    "code": -32001,
                    "category": "backend",
                    "message": "No backend is currently active for embedding generation",
                    "retryable": True,
                },
            }

        loop = asyncio.get_event_loop()
        query_embeddings = loop.run_until_complete(backend.embeddings([query]))

        if not query_embeddings:
            return {
                "status": "failed",
                "error": {
                    "code": -32003,
                    "category": "embedding",
                    "message": "Failed to generate query embedding",
                    "retryable": True,
                },
            }

        query_embedding = query_embeddings[0]

        context.send_progress(50, "Scoring chunks")

        result = retrieve(
            query_embedding=query_embedding,
            corpus_id=corpus_id,
            corpus_manager=corpus_manager,
            top_k=top_k,
            min_score=min_score,
        )

        assembled = assemble_context(result, max_tokens_estimate=max_context_tokens)

        context.send_progress(100, "Retrieval complete")

        retrieval_trace = {
            "query": query,
            "corpus_id": corpus_id,
            "top_k": top_k,
            "chunks": [
                {
                    "chunk_id": sc.chunk.chunk_id,
                    "score": round(sc.score, 4),
                    "text_preview": sc.chunk.text[:200],
                }
                for sc in result.scored_chunks
            ],
            "total_chunks_searched": result.total_chunks_searched,
        }

        return {
            "status": "completed",
            "outputs": {
                "chunks": {"value": assembled},
                "retrieval_trace": {"value": json.dumps(retrieval_trace)},
            },
            "metrics": {
                "chunks_retrieved": len(result.scored_chunks),
                "total_chunks_searched": result.total_chunks_searched,
                "top_k": top_k,
            },
        }

    return handle_rag_retrieve
