"""Abstract backend adapter protocol for local LLM inference servers."""
from __future__ import annotations

from dataclasses import dataclass
from enum import Enum
from typing import Any, AsyncIterator, Protocol, runtime_checkable


class BackendKind(Enum):
    """Supported inference backend types."""

    LLAMA_CPP = "llama.cpp"
    TENSORRT = "tensorrt-llm"


class BackendStatus(Enum):
    """Lifecycle states of a backend process."""

    STOPPED = "stopped"
    STARTING = "starting"
    READY = "ready"
    FAILED = "failed"
    STOPPING = "stopping"


@dataclass(frozen=True)
class BackendCapabilities:
    """Declares what a backend can do."""

    chat_completion: bool = True
    embeddings: bool = False
    streaming: bool = True
    max_context_length: int = 0
    supported_quantizations: tuple[str, ...] = ()


@dataclass(frozen=True)
class BackendHealthInfo:
    """Normalized health snapshot from any backend."""

    status: BackendStatus
    model_loaded: str | None = None
    uptime_seconds: float = 0.0
    slots_available: int = 0
    slots_total: int = 0
    error: str | None = None


@runtime_checkable
class BackendAdapter(Protocol):
    """Contract every inference backend must satisfy.

    Implementations wrap a managed subprocess (llama-server, trtllm-serve, etc.)
    and expose a uniform interface for the chat executor and embedding operators.
    """

    @property
    def kind(self) -> BackendKind: ...

    @property
    def status(self) -> BackendStatus: ...

    async def start(self, model_path: str, config: dict[str, Any]) -> None:
        """Launch the backend process and wait until it reports healthy."""
        ...

    async def stop(self) -> None:
        """Gracefully shut down the backend process."""
        ...

    async def health(self) -> BackendHealthInfo:
        """Return a normalized health snapshot."""
        ...

    async def chat(
        self, messages: list[dict[str, str]], params: dict[str, Any]
    ) -> dict[str, Any]:
        """Synchronous (non-streaming) chat completion."""
        ...

    async def chat_stream(
        self, messages: list[dict[str, str]], params: dict[str, Any]
    ) -> AsyncIterator[dict[str, Any]]:
        """Streaming chat completion yielding token deltas."""
        ...

    async def embeddings(self, texts: list[str]) -> list[list[float]]:
        """Generate embeddings for a batch of texts."""
        ...

    def capabilities(self) -> BackendCapabilities:
        """Static capability declaration for this backend type."""
        ...
