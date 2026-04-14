"""Text chunking strategies for RAG pipelines."""
from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class TextChunk:
    """An immutable segment of text with positional metadata."""

    chunk_id: str
    text: str
    start_offset: int
    end_offset: int
    source_id: str
    metadata: dict[str, str] = ()

    def __post_init__(self) -> None:
        if isinstance(self.metadata, tuple):
            object.__setattr__(self, "metadata", {})


@dataclass(frozen=True)
class ChunkingConfig:
    """Parameters controlling how text is split into chunks."""

    chunk_size: int = 512
    chunk_overlap: int = 64
    separator: str = "\n\n"


def chunk_text(
    text: str,
    source_id: str,
    config: ChunkingConfig | None = None,
) -> list[TextChunk]:
    """Split text into overlapping chunks using paragraph-aware boundaries.

    Falls back to character-level splitting when paragraphs exceed chunk_size.
    """
    cfg = config or ChunkingConfig()
    paragraphs = text.split(cfg.separator)

    chunks: list[TextChunk] = []
    current_parts: list[str] = []
    current_len = 0
    global_offset = 0
    chunk_index = 0

    for paragraph in paragraphs:
        paragraph_len = len(paragraph)

        if current_len + paragraph_len > cfg.chunk_size and current_parts:
            chunk_text_val = cfg.separator.join(current_parts)
            chunks.append(TextChunk(
                chunk_id=f"{source_id}:{chunk_index}",
                text=chunk_text_val,
                start_offset=global_offset - current_len,
                end_offset=global_offset,
                source_id=source_id,
            ))
            chunk_index += 1

            overlap_chars = 0
            overlap_parts: list[str] = []
            for part in reversed(current_parts):
                if overlap_chars + len(part) > cfg.chunk_overlap:
                    break
                overlap_parts.insert(0, part)
                overlap_chars += len(part)

            current_parts = overlap_parts
            current_len = overlap_chars

        if paragraph_len > cfg.chunk_size:
            for sub_start in range(0, paragraph_len, cfg.chunk_size - cfg.chunk_overlap):
                sub_end = min(sub_start + cfg.chunk_size, paragraph_len)
                sub_text = paragraph[sub_start:sub_end]
                chunks.append(TextChunk(
                    chunk_id=f"{source_id}:{chunk_index}",
                    text=sub_text,
                    start_offset=global_offset + sub_start,
                    end_offset=global_offset + sub_end,
                    source_id=source_id,
                ))
                chunk_index += 1
        else:
            current_parts.append(paragraph)
            current_len += paragraph_len

        global_offset += paragraph_len + len(cfg.separator)

    if current_parts:
        chunk_text_val = cfg.separator.join(current_parts)
        chunks.append(TextChunk(
            chunk_id=f"{source_id}:{chunk_index}",
            text=chunk_text_val,
            start_offset=global_offset - current_len,
            end_offset=global_offset,
            source_id=source_id,
        ))

    return chunks
