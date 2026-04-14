"""ServiceWorker entrypoint for the Local LLM extension.

All LLM-specific logic lives here — the host has zero knowledge of LLM
concepts. Communication with the host happens exclusively through JSON-RPC
over stdin/stdout via the nexus_sdk protocol.
"""
from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from nexus_sdk.health import HealthReporter, HealthStatus
from nexus_sdk.service_worker import ServiceWorker

from worker.backends.adapter import BackendAdapter, BackendKind, BackendStatus
from worker.backends.llamacpp import LlamaCppAdapter
from worker.backends.tensorrt import TensorRtAdapter
from worker.chat.executor import ChatExecutor
from worker.chat.session_manager import SessionManager
from worker.methods import ALL_METHODS
from worker.models.hf_client import HfClient
from worker.models.registry import ModelRegistry
from worker.operators.chat_turn import make_handler as make_chat_turn_handler
from worker.operators.embed_text import make_handler as make_embed_handler
from worker.operators.output_persist import handle_output_persist
from worker.operators.prompt_compose import handle_prompt_compose
from worker.operators.rag_retrieve import make_handler as make_rag_handler
from worker.rag.corpus import CorpusManager
from worker.state import WorkerState


EXTENSION_DIR = Path(__file__).resolve().parent.parent
VERSIONS_MANIFEST = EXTENSION_DIR / "backends" / "llamacpp" / "versions.yaml"
DATA_DIR = Path.home() / ".nexus" / "local-llm"


class LocalLlmWorker(ServiceWorker):
    """Self-sufficient Local LLM extension worker.

    Manages backend processes, chat sessions, model registry, and RAG
    pipelines entirely within the worker process. The Rust host only
    provides the JSON-RPC transport and extension storage access.
    """

    def __init__(self) -> None:
        super().__init__(
            extension_id="nexus.local-llm",
            extension_version="0.1.0",
            worker_name="local-llm-worker",
        )
        self._health = HealthReporter(worker_name="local-llm-worker")
        self._active_backend: BackendAdapter | None = None
        self._session_manager = SessionManager()
        self._model_registry = ModelRegistry()
        self._hf_client = HfClient()
        self._corpus_manager = CorpusManager()
        self._chat_executor: ChatExecutor | None = None

    async def on_startup(self) -> None:
        """Initialize registries and prepare backend adapters."""
        self._health.set_ready({"backends_available": ["llama.cpp", "tensorrt-llm"]})

    async def on_shutdown(self) -> None:
        """Stop any running backend process."""
        if self._active_backend is not None:
            await self._active_backend.stop()
            self._active_backend = None
        if hasattr(self, "_worker_state"):
            for pid, adapter in list(self._worker_state.active_backends.items()):
                try:
                    await adapter.stop()
                except Exception:
                    pass
            self._worker_state.active_backends.clear()

    async def on_health_check(self) -> dict[str, Any]:
        """Report worker and backend health to the host."""
        payload = self._health.to_payload()
        if self._active_backend is not None:
            backend_health = await self._active_backend.health()
            payload["backend"] = {
                "kind": self._active_backend.kind.value,
                "status": backend_health.status.value,
                "model_loaded": backend_health.model_loaded,
                "uptime_seconds": backend_health.uptime_seconds,
            }
            if backend_health.error:
                payload["backend"]["error"] = backend_health.error
        return payload

    def get_active_backend(self) -> BackendAdapter | None:
        """Accessor for operator handler factories."""
        return self._active_backend

    def _load_versions_manifest(self) -> dict[str, Any]:
        """Parse the embedded llama.cpp versions.yaml."""
        try:
            import importlib
            saphyr = importlib.import_module("serde_saphyr")
            text = VERSIONS_MANIFEST.read_text(encoding="utf-8")
            return saphyr.loads(text)
        except (ImportError, ModuleNotFoundError):
            pass

        try:
            import yaml
            text = VERSIONS_MANIFEST.read_text(encoding="utf-8")
            return yaml.safe_load(text) or {}
        except ImportError:
            return _parse_simple_yaml(VERSIONS_MANIFEST)


def _parse_simple_yaml(path: Path) -> dict[str, Any]:
    """Minimal YAML-like parser for the versions manifest when no YAML library is available."""
    if not path.exists():
        return {}
    text = path.read_text(encoding="utf-8")
    try:
        import yaml
        return yaml.safe_load(text) or {}
    except ImportError:
        return {}


def create_worker() -> LocalLlmWorker:
    """Construct and wire up the worker with all operator handlers."""
    worker = LocalLlmWorker()

    state = WorkerState(data_dir=DATA_DIR)
    state.manifest = worker._load_versions_manifest()
    worker._worker_state = state

    executor = ChatExecutor(
        backend=_BackendProxy(worker),
        session_manager=worker._session_manager,
    )
    worker._chat_executor = executor

    worker.register_operator(
        "llm.chat.turn", "1.0.0",
        make_chat_turn_handler(executor, worker._session_manager),
    )
    worker.register_operator(
        "llm.prompt.compose", "1.0.0",
        handle_prompt_compose,
    )
    worker.register_operator(
        "llm.output.persist", "1.0.0",
        handle_output_persist,
    )
    worker.register_operator(
        "llm.embed.text", "1.0.0",
        make_embed_handler(worker.get_active_backend),
    )
    worker.register_operator(
        "llm.rag.retrieve", "1.0.0",
        make_rag_handler(worker._corpus_manager, worker.get_active_backend),
    )

    for method_name, handler in ALL_METHODS.items():
        worker.register_method(method_name, _bind_state(handler, state))

    return worker


def _bind_state(handler: Any, state: WorkerState) -> Any:
    """Wrap a method handler so it receives the shared WorkerState."""

    async def bound(params: dict[str, Any]) -> dict[str, Any]:
        return await handler(params, state)

    bound.__name__ = getattr(handler, "__name__", "bound")
    bound.__qualname__ = getattr(handler, "__qualname__", "bound")
    return bound


class _BackendProxy:
    """Thin proxy that forwards BackendAdapter calls to whichever backend is currently active.

    This avoids capturing a stale reference when the backend is swapped at runtime.
    """

    def __init__(self, worker: LocalLlmWorker) -> None:
        self._worker = worker

    def _get(self) -> BackendAdapter:
        backend = self._worker.get_active_backend()
        if backend is None:
            raise RuntimeError("No backend is currently active")
        return backend

    @property
    def kind(self):
        return self._get().kind

    @property
    def status(self):
        return self._get().status

    async def start(self, model_path, config):
        return await self._get().start(model_path, config)

    async def stop(self):
        return await self._get().stop()

    async def health(self):
        return await self._get().health()

    async def chat(self, messages, params):
        return await self._get().chat(messages, params)

    async def chat_stream(self, messages, params):
        async for chunk in self._get().chat_stream(messages, params):
            yield chunk

    async def embeddings(self, texts):
        return await self._get().embeddings(texts)

    def capabilities(self):
        return self._get().capabilities()


if __name__ == "__main__":
    w = create_worker()
    w.run()
