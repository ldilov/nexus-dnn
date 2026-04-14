"""Corpus management for RAG pipelines."""
from __future__ import annotations

import time
import uuid
from dataclasses import dataclass, field
from typing import Any

from worker.rag.chunking import TextChunk


@dataclass(frozen=True)
class CorpusDocument:
    """Immutable record of a document added to a corpus."""

    document_id: str
    corpus_id: str
    source_name: str
    content_hash: str
    chunk_count: int
    added_at: float
    metadata: dict[str, Any] = field(default_factory=dict)


@dataclass(frozen=True)
class Corpus:
    """Immutable snapshot of a RAG corpus."""

    corpus_id: str
    name: str
    documents: tuple[CorpusDocument, ...] = ()
    created_at: float = 0.0


class CorpusManager:
    """Manages corpora, documents, and their chunk embeddings in memory.

    Persistence to host extension storage happens via JSON-RPC at the
    operator level.
    """

    def __init__(self) -> None:
        self._corpora: dict[str, Corpus] = {}
        self._chunks: dict[str, list[TextChunk]] = {}
        self._embeddings: dict[str, list[float]] = {}

    def create_corpus(self, name: str) -> Corpus:
        """Create a new empty corpus."""
        corpus = Corpus(
            corpus_id=str(uuid.uuid4()),
            name=name,
            created_at=time.time(),
        )
        self._corpora[corpus.corpus_id] = corpus
        return corpus

    def get_corpus(self, corpus_id: str) -> Corpus | None:
        """Retrieve a corpus by id."""
        return self._corpora.get(corpus_id)

    def list_corpora(self) -> list[Corpus]:
        """Return all corpora."""
        return list(self._corpora.values())

    def add_document(
        self,
        corpus_id: str,
        source_name: str,
        chunks: list[TextChunk],
        content_hash: str,
    ) -> CorpusDocument:
        """Register a document and its chunks within a corpus."""
        corpus = self._corpora.get(corpus_id)
        if corpus is None:
            raise ValueError(f"Unknown corpus: {corpus_id}")

        doc = CorpusDocument(
            document_id=str(uuid.uuid4()),
            corpus_id=corpus_id,
            source_name=source_name,
            content_hash=content_hash,
            chunk_count=len(chunks),
            added_at=time.time(),
        )

        updated_corpus = Corpus(
            corpus_id=corpus.corpus_id,
            name=corpus.name,
            documents=(*corpus.documents, doc),
            created_at=corpus.created_at,
        )
        self._corpora[corpus_id] = updated_corpus

        self._chunks[doc.document_id] = list(chunks)

        return doc

    def store_embeddings(self, chunk_id: str, embedding: list[float]) -> None:
        """Associate a computed embedding vector with a chunk."""
        self._embeddings[chunk_id] = embedding

    def get_chunks_for_corpus(self, corpus_id: str) -> list[TextChunk]:
        """Return all chunks belonging to a corpus across all its documents."""
        corpus = self._corpora.get(corpus_id)
        if corpus is None:
            return []
        result: list[TextChunk] = []
        for doc in corpus.documents:
            result.extend(self._chunks.get(doc.document_id, []))
        return result

    def get_embedding(self, chunk_id: str) -> list[float] | None:
        """Retrieve the embedding for a specific chunk."""
        return self._embeddings.get(chunk_id)
