"""Retrieval and context assembly for RAG pipelines."""
from __future__ import annotations

import math
from dataclasses import dataclass
from typing import Any

from worker.rag.chunking import TextChunk
from worker.rag.corpus import CorpusManager


@dataclass(frozen=True)
class ScoredChunk:
    """A chunk with its similarity score attached."""

    chunk: TextChunk
    score: float


@dataclass(frozen=True)
class RetrievalResult:
    """Immutable outcome of a retrieval query."""

    query: str
    corpus_id: str
    scored_chunks: tuple[ScoredChunk, ...]
    total_chunks_searched: int


def cosine_similarity(a: list[float], b: list[float]) -> float:
    """Compute cosine similarity between two vectors."""
    dot = sum(x * y for x, y in zip(a, b))
    norm_a = math.sqrt(sum(x * x for x in a))
    norm_b = math.sqrt(sum(x * x for x in b))
    if norm_a == 0.0 or norm_b == 0.0:
        return 0.0
    return dot / (norm_a * norm_b)


def retrieve(
    query_embedding: list[float],
    corpus_id: str,
    corpus_manager: CorpusManager,
    top_k: int = 5,
    min_score: float = 0.0,
) -> RetrievalResult:
    """Find the top-k most similar chunks to the query embedding."""
    chunks = corpus_manager.get_chunks_for_corpus(corpus_id)

    scored: list[ScoredChunk] = []
    for chunk in chunks:
        embedding = corpus_manager.get_embedding(chunk.chunk_id)
        if embedding is None:
            continue
        score = cosine_similarity(query_embedding, embedding)
        if score >= min_score:
            scored.append(ScoredChunk(chunk=chunk, score=score))

    scored.sort(key=lambda sc: sc.score, reverse=True)
    top = scored[:top_k]

    return RetrievalResult(
        query="",
        corpus_id=corpus_id,
        scored_chunks=tuple(top),
        total_chunks_searched=len(chunks),
    )


def assemble_context(
    result: RetrievalResult,
    max_tokens_estimate: int = 2048,
    separator: str = "\n\n---\n\n",
) -> str:
    """Assemble retrieved chunks into a context string for prompt injection.

    Truncates to stay under the approximate token budget (1 token ~= 4 chars).
    """
    max_chars = max_tokens_estimate * 4
    parts: list[str] = []
    total_chars = 0

    for scored_chunk in result.scored_chunks:
        text = scored_chunk.chunk.text
        if total_chars + len(text) > max_chars:
            remaining = max_chars - total_chars
            if remaining > 50:
                parts.append(text[:remaining])
            break
        parts.append(text)
        total_chars += len(text) + len(separator)

    return separator.join(parts)
