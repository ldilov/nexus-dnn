"""Stdio worker that implements the host's text-completion JSON-RPC contract.

This worker is the local-llm extension's contribution to the generic
`text-completion` capability defined at
`crates/nexus-backend-runtimes/src/generic/leases/text_completion.rs`.

It is spawned by the host's `acquire_lease` flow when a consumer (e.g.
the Module Draft AI suggestion stream) needs an inference backend. The
host registers it via the catalog `capability_tags = ["text-completion"]`
declaration in `extensions/builtin/local-llm/manifest.yaml`.

Wire shape (mirrors the canonical Rust contract):
- Request: `text.complete.start` with `{system, user, max_tokens}` →
  `{stream_id}`.
- Notifications: `text.complete.token` with `{stream_id, delta}` per
  emitted chunk; exactly one terminator (`text.complete.done` with
  `{stream_id, cancelled}`, or `text.complete.error` with
  `{stream_id, code, message}`).
- Request: `text.complete.cancel` with `{stream_id}` → `{}`. The worker
  flips a per-stream cancel flag; the producer task emits
  `text.complete.done` with `cancelled=True` and exits.

The handler functions and `CompletionsWorker.handle_*` methods are the
testable seams — pytest exercises them directly with a `FakeAdapter`
without needing a real llama-server.
"""
from __future__ import annotations

import asyncio
import sys
import uuid
from pathlib import Path
from typing import Any, AsyncIterator, Protocol

# Allow `python completions_worker.py` from the install root by adjusting
# sys.path so the existing `worker.backends.llamacpp.adapter` import is
# resolvable. In the install tree, the extension's worker package lives
# alongside this file at `<install_root>/worker/`.
_HERE = Path(__file__).resolve().parent
_EXTENSION_ROOT = _HERE.parent.parent
if str(_EXTENSION_ROOT) not in sys.path:
    sys.path.insert(0, str(_EXTENSION_ROOT))

from nexus_sdk.service_worker import ServiceWorker  # noqa: E402


# ─── Wire-format constants — mirror the Rust contract module ──────────────
# Source of truth: crates/nexus-backend-runtimes/src/generic/leases/text_completion.rs
# A drift between Python and Rust here breaks the protocol; the pytest
# suite asserts these strings against the canonical values.
CAPABILITY_TAG = "text-completion"
METHOD_START = "text.complete.start"
METHOD_CANCEL = "text.complete.cancel"
NOTIFY_TOKEN = "text.complete.token"
NOTIFY_DONE = "text.complete.done"
NOTIFY_ERROR = "text.complete.error"

# Error code strings — host's `lease_adapter.rs::classify_notification`
# maps these onto typed `DraftSuggestionError` variants. Drift here means
# a worker error surfaces to the operator as a generic `Internal` instead
# of the specific code.
ERROR_CODE_MODEL_UNAVAILABLE = "model_unavailable"
ERROR_CODE_PROMPT_TOO_LONG = "prompt_too_long"
ERROR_CODE_LEASE_REVOKED = "lease_revoked"
ERROR_CODE_INTERNAL = "internal"


# ─── Backend adapter protocol — the seam the test suite injects against ───
class BackendAdapter(Protocol):
    """The minimum surface the completions producer needs from a backend.

    The production binding is `worker.backends.llamacpp.adapter.LlamaCppAdapter`.
    Tests provide a `FakeAdapter` that yields scripted chunks.
    """

    async def chat_stream(
        self,
        messages: list[dict[str, str]],
        params: dict[str, Any],
    ) -> AsyncIterator[dict[str, Any]]: ...


# ─── Domain exceptions — translate to typed error notifications ──────────
class CompletionError(Exception):
    """Base for completion-flow errors. The producer maps these to
    `text.complete.error` notifications with the documented `code` per
    the host contract."""

    code: str = ERROR_CODE_INTERNAL


class ModelUnavailableError(CompletionError):
    code = ERROR_CODE_MODEL_UNAVAILABLE


class PromptTooLongError(CompletionError):
    code = ERROR_CODE_PROMPT_TOO_LONG


class LeaseRevokedError(CompletionError):
    code = ERROR_CODE_LEASE_REVOKED


# ─── Pure helpers (testable without async context) ───────────────────────
def build_messages(system: str, user: str) -> list[dict[str, str]]:
    """OpenAI-compat messages array. System role omitted when empty."""
    out: list[dict[str, str]] = []
    if system:
        out.append({"role": "system", "content": system})
    out.append({"role": "user", "content": user})
    return out


def extract_delta(chunk: dict[str, Any]) -> str:
    """Pull the assistant delta string out of one streaming SSE chunk.

    Tolerates the OpenAI-compat shapes both llama.cpp and tensorrt-llm
    emit: `choices[0].delta.content` (streaming) or
    `choices[0].message.content` (non-streaming fallback). Returns the
    empty string when the chunk has no content delta — the producer
    filters those before emitting a notification.
    """
    choices = chunk.get("choices")
    if not isinstance(choices, list) or not choices:
        return ""
    first = choices[0]
    if not isinstance(first, dict):
        return ""
    delta = first.get("delta")
    if isinstance(delta, dict):
        content = delta.get("content")
        if isinstance(content, str):
            return content
    message = first.get("message")
    if isinstance(message, dict):
        content = message.get("content")
        if isinstance(content, str):
            return content
    return ""


def classify_backend_error(exc: BaseException) -> CompletionError:
    """Translate an arbitrary backend exception to one of the contracted
    completion errors. Best-effort string sniff — exact matches when
    possible, generic fallback to `internal`."""
    if isinstance(exc, CompletionError):
        return exc
    msg = str(exc).lower()
    if "context" in msg and ("overflow" in msg or "exceed" in msg or "too long" in msg):
        return PromptTooLongError(str(exc))
    if "model" in msg and ("not loaded" in msg or "unavailable" in msg or "no backend" in msg):
        return ModelUnavailableError(str(exc))
    return CompletionError(str(exc))


# ─── Worker ───────────────────────────────────────────────────────────────
class CompletionsWorker(ServiceWorker):
    """Stdio JSON-RPC worker implementing the text-completion contract.

    Owns a single backend adapter (lazily constructed on first start) and
    a per-stream cancel registry. The adapter is injected via the
    constructor for test isolation; production code uses the default
    factory which builds a `LlamaCppAdapter`.
    """

    def __init__(
        self,
        adapter_factory: Any | None = None,
    ) -> None:
        super().__init__(
            extension_id="nexus.local-llm.completions",
            extension_version="0.1.0",
            worker_name="local-llm-completions-worker",
        )
        self._adapter: BackendAdapter | None = None
        self._adapter_factory = adapter_factory or _default_adapter_factory
        self._streams: dict[str, asyncio.Task[None]] = {}
        self._cancel_flags: dict[str, asyncio.Event] = {}
        # One stream at a time per worker (v0 policy). Concurrent streams
        # are deferred to a follow-up; serializing simplifies adapter
        # state management against a single llama-server slot.
        self._serialize_streams = asyncio.Lock()

        # Wire JSON-RPC dispatch. `register_method` makes the framework
        # route inbound requests by their `method` field.
        self.register_method(METHOD_START, self._dispatch_start)
        self.register_method(METHOD_CANCEL, self._dispatch_cancel)

    # ─── Public seams (tests call these directly) ────────────────────────
    async def handle_start(self, params: dict[str, Any]) -> dict[str, Any]:
        """Allocate a stream_id, kick off the producer task, return ack.

        Validates required fields. Empty `user` is a contract violation —
        the host's `LeaseBackedStreamProvider` already enforces non-empty
        prompts but defending here is cheap and helps direct test access.
        """
        user = params.get("user", "")
        if not user:
            raise ValueError("text.complete.start: 'user' must be non-empty")
        max_tokens = int(params.get("max_tokens", 96))
        if max_tokens <= 0:
            raise ValueError("text.complete.start: 'max_tokens' must be positive")
        system = params.get("system", "") or ""

        stream_id = str(uuid.uuid4())
        self._cancel_flags[stream_id] = asyncio.Event()
        self._streams[stream_id] = asyncio.create_task(
            self._producer(
                stream_id=stream_id,
                system=system,
                user=user,
                max_tokens=max_tokens,
            )
        )
        return {"stream_id": stream_id}

    async def handle_cancel(self, params: dict[str, Any]) -> dict[str, Any]:
        """Flip the cancel flag for `stream_id`. Safe for unknown ids —
        per the contract, cancel for an unknown stream MUST be a no-op
        ack, not an error."""
        stream_id = params.get("stream_id", "")
        flag = self._cancel_flags.get(stream_id)
        if flag is not None:
            flag.set()
        return {}

    # ─── JSON-RPC adapter shims ─────────────────────────────────────────
    async def _dispatch_start(self, params: dict[str, Any]) -> dict[str, Any]:
        return await self.handle_start(params)

    async def _dispatch_cancel(self, params: dict[str, Any]) -> dict[str, Any]:
        return await self.handle_cancel(params)

    # ─── Producer task ───────────────────────────────────────────────────
    async def _producer(
        self,
        stream_id: str,
        system: str,
        user: str,
        max_tokens: int,
    ) -> None:
        """Drive the backend stream → notifications until done / cancelled
        / errored. Always emits exactly one terminal notification
        (`text.complete.done` or `text.complete.error`) before exiting."""
        async with self._serialize_streams:
            cancel_flag = self._cancel_flags.get(stream_id)
            if cancel_flag is None:
                # Cancelled before the producer started; nothing to do.
                return
            try:
                adapter = await self._ensure_adapter()
                messages = build_messages(system, user)
                params = {"max_tokens": max_tokens}
                async for chunk in adapter.chat_stream(messages, params):
                    if cancel_flag.is_set():
                        self._send_done(stream_id, cancelled=True)
                        return
                    delta = extract_delta(chunk)
                    if delta:
                        self.send_notification(NOTIFY_TOKEN, {
                            "stream_id": stream_id,
                            "delta": delta,
                        })
                self._send_done(stream_id, cancelled=False)
            except BaseException as exc:
                err = classify_backend_error(exc)
                self.send_notification(NOTIFY_ERROR, {
                    "stream_id": stream_id,
                    "code": err.code,
                    "message": _operator_safe_message(err),
                })
            finally:
                self._streams.pop(stream_id, None)
                self._cancel_flags.pop(stream_id, None)

    def _send_done(self, stream_id: str, cancelled: bool) -> None:
        self.send_notification(NOTIFY_DONE, {
            "stream_id": stream_id,
            "cancelled": cancelled,
        })

    async def _ensure_adapter(self) -> BackendAdapter:
        if self._adapter is None:
            self._adapter = await self._adapter_factory()
        return self._adapter


# ─── External-server adapter (operator-provisioned llama-server) ─────────
#
# When the operator (or a smoke harness) is already running a
# `llama-server` listening on an HTTP port, the worker can talk to it
# directly via the OpenAI-compatible `/v1/chat/completions` endpoint
# without owning a `ManagedProcess` lifecycle. Selecting this path
# requires `NEXUS_LLAMA_SERVER_URL` (e.g. `http://127.0.0.1:8085`) in
# the worker's environment.
#
# This sidesteps the still-pending lifecycle wiring around
# `LlamaCppAdapter.start(model_path, config)` — the production worker
# never had its own auto-start path so `text.complete.start` requests
# hung indefinitely. The external-server adapter restores end-to-end
# completion semantics for any caller that can stand up a llama-server
# out-of-band.

import json
import os as _os
from urllib import error as _urlerror
from urllib import request as _urlrequest


class _ExternalServerAdapter:
    """Minimal `BackendAdapter` that posts to an existing llama-server.

    Streaming is implemented over the SSE shape that llama-server emits
    from `/v1/chat/completions` when `stream=true`: lines of the form
    `data: {...json...}\\n\\n`, terminating with `data: [DONE]`.
    """

    def __init__(self, base_url: str) -> None:
        self._base_url = base_url.rstrip("/")

    async def chat(
        self, messages: list[dict[str, str]], params: dict[str, Any]
    ) -> dict[str, Any]:
        body = _build_chat_payload(messages, params, stream=False)
        return await asyncio.to_thread(self._post_json_sync, "/v1/chat/completions", body)

    async def chat_stream(
        self, messages: list[dict[str, str]], params: dict[str, Any]
    ) -> AsyncIterator[dict[str, Any]]:
        body = _build_chat_payload(messages, params, stream=True)
        # Run the blocking SSE read on a worker thread and bridge into
        # an asyncio queue so the caller's `async for` works without
        # blocking the event loop on socket reads.
        queue: asyncio.Queue[dict[str, Any] | None] = asyncio.Queue(maxsize=64)

        loop = asyncio.get_running_loop()

        def _drain() -> None:
            try:
                req = _urlrequest.Request(
                    f"{self._base_url}/v1/chat/completions",
                    data=body,
                    method="POST",
                    headers={"content-type": "application/json"},
                )
                with _urlrequest.urlopen(req, timeout=300) as resp:
                    buf = b""
                    while True:
                        chunk = resp.read1(4096) if hasattr(resp, "read1") else resp.read(4096)
                        if not chunk:
                            break
                        buf += chunk
                        while b"\n" in buf:
                            line, buf = buf.split(b"\n", 1)
                            line = line.strip()
                            if not line:
                                continue
                            if line.startswith(b"data:"):
                                payload = line[5:].strip()
                                if payload == b"[DONE]":
                                    return
                                try:
                                    decoded = json.loads(payload)
                                except json.JSONDecodeError:
                                    continue
                                asyncio.run_coroutine_threadsafe(
                                    queue.put(decoded), loop
                                ).result()
            finally:
                asyncio.run_coroutine_threadsafe(queue.put(None), loop).result()

        task = asyncio.create_task(asyncio.to_thread(_drain))
        try:
            while True:
                item = await queue.get()
                if item is None:
                    break
                yield item
        finally:
            await task

    def _post_json_sync(self, path: str, body: bytes) -> dict[str, Any]:
        req = _urlrequest.Request(
            f"{self._base_url}{path}",
            data=body,
            method="POST",
            headers={"content-type": "application/json"},
        )
        try:
            with _urlrequest.urlopen(req, timeout=120) as resp:
                raw = resp.read()
        except _urlerror.URLError as exc:
            raise ModelUnavailableError(f"llama-server unreachable: {exc.reason}") from exc
        return json.loads(raw)


def _build_chat_payload(
    messages: list[dict[str, str]],
    params: dict[str, Any],
    stream: bool,
) -> bytes:
    payload: dict[str, Any] = {
        "messages": messages,
        "stream": stream,
        "temperature": params.get("temperature", 0.7),
        "top_p": params.get("top_p", 0.95),
    }
    max_tokens = params.get("max_tokens")
    if max_tokens is not None:
        payload["max_tokens"] = max_tokens
    stop = params.get("stop_sequences")
    if stop:
        payload["stop"] = stop
    return json.dumps(payload).encode("utf-8")


# ─── Default adapter factory (production wiring) ─────────────────────────
async def _default_adapter_factory() -> BackendAdapter:
    """Pick the production adapter implementation.

    Selection order:
      1. `NEXUS_LLAMA_SERVER_URL` env var → `_ExternalServerAdapter` (the
         worker talks to an already-running llama-server). Operator-
         provisioned mode used by smoke harnesses and dev loops.
      2. Otherwise fall back to `LlamaCppAdapter` (owns its own
         ManagedProcess). Note: production lifecycle wiring around
         `LlamaCppAdapter.start(model_path, config)` is still pending —
         until that lands, callers that don't set the env var will see
         `text.complete.start` requests hang.

    Imported lazily so pytest can import this module without dragging in
    the full llama.cpp adapter (which has additional dependencies).
    """
    server_url = _os.environ.get("NEXUS_LLAMA_SERVER_URL", "").strip()
    if server_url:
        return _ExternalServerAdapter(server_url)

    from worker.backends.llamacpp.adapter import LlamaCppAdapter  # type: ignore[import-not-found]

    install_dir = Path(_EXTENSION_ROOT)
    manifest: dict[str, Any] = {}
    return LlamaCppAdapter(install_dir=install_dir, manifest=manifest)


# ─── Operator-safe message helper (no leaks) ─────────────────────────────
def _operator_safe_message(err: CompletionError) -> str:
    """Surface the error string trimmed to its first line, capped to
    keep stack frames / file paths from leaking out via the host's
    `text.complete.error.message` field."""
    raw = str(err) or err.code
    first_line = raw.splitlines()[0] if raw else err.code
    return first_line[:200]


if __name__ == "__main__":
    worker = CompletionsWorker()
    worker.run()
