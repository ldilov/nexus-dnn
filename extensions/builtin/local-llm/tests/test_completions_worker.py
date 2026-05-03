"""Contract-shape tests for the text-completion worker.

Exercises the worker's public seams (`handle_start`, `handle_cancel`,
producer behavior) directly with a `FakeAdapter` that scripts SSE
chunks. The wire format and error-code strings are pinned against the
canonical Rust contract module — drift between the Python and Rust
sides breaks the protocol silently, so each constant is asserted by
value here.

Production binding to `LlamaCppAdapter` is exercised end-to-end during
the Phase C smoke step, not in this suite — the goal of these tests is
the protocol correctness, not the backend behavior.
"""
from __future__ import annotations

import asyncio
from pathlib import Path
from typing import Any, AsyncIterator

import pytest

from backends.llamacpp.completions_worker import (  # type: ignore[import-not-found]
    CAPABILITY_TAG,
    ERROR_CODE_INTERNAL,
    ERROR_CODE_LEASE_REVOKED,
    ERROR_CODE_MODEL_UNAVAILABLE,
    ERROR_CODE_PROMPT_TOO_LONG,
    METHOD_CANCEL,
    METHOD_START,
    NOTIFY_DONE,
    NOTIFY_ERROR,
    NOTIFY_TOKEN,
    CompletionsWorker,
    LeaseRevokedError,
    ModelUnavailableError,
    PromptTooLongError,
    build_messages,
    classify_backend_error,
    extract_delta,
)


# ─── Wire constants pinned against Rust source of truth ──────────────────
# Source: crates/nexus-backend-runtimes/src/generic/leases/text_completion.rs
def test_capability_tag_matches_rust_contract():
    assert CAPABILITY_TAG == "text-completion"


def test_method_names_match_rust_contract():
    assert METHOD_START == "text.complete.start"
    assert METHOD_CANCEL == "text.complete.cancel"


def test_notification_names_match_rust_contract():
    assert NOTIFY_TOKEN == "text.complete.token"
    assert NOTIFY_DONE == "text.complete.done"
    assert NOTIFY_ERROR == "text.complete.error"


def test_error_codes_match_host_classify():
    # `crates/nexus-api/.../lease_adapter.rs::classify_notification` keys
    # off these exact strings to map to typed `DraftSuggestionError`.
    assert ERROR_CODE_MODEL_UNAVAILABLE == "model_unavailable"
    assert ERROR_CODE_PROMPT_TOO_LONG == "prompt_too_long"
    assert ERROR_CODE_LEASE_REVOKED == "lease_revoked"
    assert ERROR_CODE_INTERNAL == "internal"


# ─── Pure helpers ────────────────────────────────────────────────────────
def test_build_messages_omits_empty_system():
    msgs = build_messages("", "complete this")
    assert msgs == [{"role": "user", "content": "complete this"}]


def test_build_messages_includes_non_empty_system():
    msgs = build_messages("be terse", "go")
    assert msgs == [
        {"role": "system", "content": "be terse"},
        {"role": "user", "content": "go"},
    ]


def test_extract_delta_streaming_shape():
    chunk = {"choices": [{"delta": {"content": "hello"}}]}
    assert extract_delta(chunk) == "hello"


def test_extract_delta_non_streaming_fallback():
    chunk = {"choices": [{"message": {"content": "world"}}]}
    assert extract_delta(chunk) == "world"


def test_extract_delta_returns_empty_for_no_content():
    assert extract_delta({}) == ""
    assert extract_delta({"choices": []}) == ""
    assert extract_delta({"choices": [{}]}) == ""
    assert extract_delta({"choices": [{"delta": {}}]}) == ""


def test_classify_backend_error_maps_context_overflow():
    err = classify_backend_error(RuntimeError("Input context exceeded 4096 tokens"))
    assert isinstance(err, PromptTooLongError)
    assert err.code == "prompt_too_long"


def test_classify_backend_error_maps_model_not_loaded():
    err = classify_backend_error(RuntimeError("model not loaded yet"))
    assert isinstance(err, ModelUnavailableError)
    assert err.code == "model_unavailable"


def test_classify_backend_error_falls_back_to_internal():
    err = classify_backend_error(RuntimeError("totally unrelated"))
    assert err.code == "internal"


def test_classify_backend_error_passes_through_typed_errors():
    original = LeaseRevokedError("lease gone")
    err = classify_backend_error(original)
    assert err is original


# ─── Worker behavior — capture notifications via patched _write_line ─────
class FakeAdapter:
    """Scripts a sequence of `chat_stream` chunks for the worker producer.

    Each scripted item is one SSE-shaped dict; the test inspects the
    notifications the worker emits in response.
    """

    def __init__(self, chunks: list[dict[str, Any]] | None = None,
                 raise_after: int | None = None,
                 exception: BaseException | None = None) -> None:
        self._chunks = chunks or []
        self._raise_after = raise_after
        self._exception = exception or RuntimeError("scripted backend failure")
        self._yielded = 0

    async def chat_stream(
        self,
        messages: list[dict[str, str]],
        params: dict[str, Any],
    ) -> AsyncIterator[dict[str, Any]]:
        for chunk in self._chunks:
            self._yielded += 1
            # Yield to the event loop so cancel-mid-stream tests can flip
            # the cancel flag between chunks.
            await asyncio.sleep(0)
            yield chunk
            if self._raise_after is not None and self._yielded >= self._raise_after:
                raise self._exception
        if self._raise_after is not None:
            # Backend exhausted its scripted chunks without hitting the
            # raise threshold — still raise so the test can assert the
            # error path even when the scripted prefix is short.
            raise self._exception


def _capture_worker(adapter: FakeAdapter) -> tuple[CompletionsWorker, list[str]]:
    """Construct a worker bound to `adapter` and a list that captures
    every line the worker would have written to stdout."""
    captured: list[str] = []

    async def _factory() -> FakeAdapter:
        return adapter

    worker = CompletionsWorker(adapter_factory=_factory)
    worker._write_line = captured.append  # type: ignore[method-assign]
    return worker, captured


def _decode_notifications(captured: list[str]) -> list[dict[str, Any]]:
    """Parse every captured line as a JSON-RPC notification, dropping
    anything that isn't one (parse errors, responses)."""
    import json
    out: list[dict[str, Any]] = []
    for line in captured:
        try:
            obj = json.loads(line)
        except json.JSONDecodeError:
            continue
        if isinstance(obj, dict) and obj.get("method") and "id" not in obj:
            out.append(obj)
    return out


@pytest.mark.asyncio
async def test_handle_start_returns_stream_id_and_kicks_off_producer():
    adapter = FakeAdapter(chunks=[
        {"choices": [{"delta": {"content": "hello "}}]},
        {"choices": [{"delta": {"content": "world"}}]},
    ])
    worker, captured = _capture_worker(adapter)

    ack = await worker.handle_start({
        "system": "be terse",
        "user": "go",
        "max_tokens": 16,
    })
    assert "stream_id" in ack
    stream_id = ack["stream_id"]
    # Allow the producer task to drain.
    while worker._streams:
        await asyncio.sleep(0)

    notifs = _decode_notifications(captured)
    methods = [n["method"] for n in notifs]
    assert methods == [NOTIFY_TOKEN, NOTIFY_TOKEN, NOTIFY_DONE]
    assert notifs[0]["params"] == {"stream_id": stream_id, "delta": "hello "}
    assert notifs[1]["params"] == {"stream_id": stream_id, "delta": "world"}
    assert notifs[2]["params"] == {"stream_id": stream_id, "cancelled": False}


@pytest.mark.asyncio
async def test_handle_start_rejects_empty_user():
    worker, _ = _capture_worker(FakeAdapter())
    with pytest.raises(ValueError):
        await worker.handle_start({"user": "", "max_tokens": 4})


@pytest.mark.asyncio
async def test_handle_start_rejects_zero_max_tokens():
    worker, _ = _capture_worker(FakeAdapter())
    with pytest.raises(ValueError):
        await worker.handle_start({"user": "go", "max_tokens": 0})


@pytest.mark.asyncio
async def test_cancel_mid_stream_emits_done_with_cancelled_true():
    adapter = FakeAdapter(chunks=[
        {"choices": [{"delta": {"content": "a"}}]},
        {"choices": [{"delta": {"content": "b"}}]},
        {"choices": [{"delta": {"content": "c"}}]},
        {"choices": [{"delta": {"content": "d"}}]},
    ])
    worker, captured = _capture_worker(adapter)
    ack = await worker.handle_start({"user": "go", "max_tokens": 16})
    stream_id = ack["stream_id"]

    # Let one chunk land, then cancel.
    await asyncio.sleep(0)
    await asyncio.sleep(0)
    await worker.handle_cancel({"stream_id": stream_id})
    while worker._streams:
        await asyncio.sleep(0)

    notifs = _decode_notifications(captured)
    # At least one token + a done(cancelled=true) terminator.
    assert any(n["method"] == NOTIFY_DONE and n["params"]["cancelled"] is True
               for n in notifs)
    # The producer must NOT emit additional tokens or a second terminator.
    terminators = [n for n in notifs
                   if n["method"] in (NOTIFY_DONE, NOTIFY_ERROR)]
    assert len(terminators) == 1


@pytest.mark.asyncio
async def test_cancel_unknown_stream_id_is_noop():
    worker, _ = _capture_worker(FakeAdapter())
    ack = await worker.handle_cancel({"stream_id": "nonexistent"})
    assert ack == {}


@pytest.mark.asyncio
async def test_backend_failure_emits_typed_error_notification():
    adapter = FakeAdapter(
        chunks=[{"choices": [{"delta": {"content": "partial"}}]}],
        raise_after=1,
        exception=RuntimeError("Input context exceeded 4096 tokens"),
    )
    worker, captured = _capture_worker(adapter)
    ack = await worker.handle_start({"user": "go", "max_tokens": 16})
    while worker._streams:
        await asyncio.sleep(0)

    notifs = _decode_notifications(captured)
    errors = [n for n in notifs if n["method"] == NOTIFY_ERROR]
    assert len(errors) == 1
    assert errors[0]["params"]["code"] == ERROR_CODE_PROMPT_TOO_LONG
    assert errors[0]["params"]["stream_id"] == ack["stream_id"]


@pytest.mark.asyncio
async def test_empty_delta_chunks_do_not_emit_token_notifications():
    adapter = FakeAdapter(chunks=[
        {"choices": [{"delta": {"content": ""}}]},
        {"choices": [{"delta": {"content": "real"}}]},
    ])
    worker, captured = _capture_worker(adapter)
    await worker.handle_start({"user": "go", "max_tokens": 4})
    while worker._streams:
        await asyncio.sleep(0)

    notifs = _decode_notifications(captured)
    tokens = [n for n in notifs if n["method"] == NOTIFY_TOKEN]
    assert len(tokens) == 1
    assert tokens[0]["params"]["delta"] == "real"
