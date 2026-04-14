from __future__ import annotations

from dataclasses import dataclass, field


@dataclass(frozen=True)
class ChatMessage:
    """A single message in a chat conversation."""

    role: str
    content: str


@dataclass(frozen=True)
class GenerationParams:
    """Parameters controlling text generation behavior."""

    temperature: float = 0.8
    top_p: float = 0.95
    top_k: int = 40
    max_tokens: int = 4096
    repeat_penalty: float = 1.1
    stop_sequences: list[str] | None = None


@dataclass(frozen=True)
class ChatRequest:
    """A request to generate a chat completion."""

    messages: list[ChatMessage]
    generation_params: GenerationParams = field(default_factory=GenerationParams)
    stream: bool = True


@dataclass(frozen=True)
class ChatDelta:
    """A single token or chunk from a streaming chat response."""

    text: str
    finish_reason: str | None = None


@dataclass(frozen=True)
class TokenUsage:
    """Token consumption statistics for a generation request."""

    prompt_tokens: int
    completion_tokens: int
    total_tokens: int


@dataclass(frozen=True)
class ChatComplete:
    """Final result of a completed chat generation."""

    message: ChatMessage
    finish_reason: str
    usage: TokenUsage
    generation_time_ms: int
