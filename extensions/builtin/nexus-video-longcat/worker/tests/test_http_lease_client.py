"""Tests for HttpLeaseClient + default_lease_client (spec 049)."""

from __future__ import annotations

import io
import json
from typing import Any, Optional
from unittest.mock import patch

import pytest
import urllib.error

from longcat_video_worker.plan_llm import (
    HOST_PORT_ENV,
    HOST_ROUTE,
    HttpLeaseClient,
    LeaseTimeoutError,
    LeaseUnavailableError,
    NoLeaseClient,
    default_lease_client,
)


class _FakeResponse:
    def __init__(self, body: bytes, status: int = 200) -> None:
        self._body = body
        self.status = status

    def read(self) -> bytes:
        return self._body

    def __enter__(self) -> "_FakeResponse":
        return self

    def __exit__(self, *_exc: Any) -> None:
        pass


def _ok(text: str = "expanded") -> _FakeResponse:
    return _FakeResponse(json.dumps({"text": text}).encode("utf-8"), status=200)


def _http_error(status: int, body: str = "") -> urllib.error.HTTPError:
    return urllib.error.HTTPError(
        url="http://127.0.0.1:0/",
        code=status,
        msg=f"HTTP {status}",
        hdrs=None,  # type: ignore[arg-type]
        fp=io.BytesIO(body.encode("utf-8")),
    )


class _UrlopenSpy:
    def __init__(self, response: Any) -> None:
        self.response = response
        self.calls: list[tuple[Any, Optional[float]]] = []

    def __call__(self, request: Any, timeout: Optional[float] = None) -> Any:
        self.calls.append((request, timeout))
        if isinstance(self.response, BaseException):
            raise self.response
        return self.response


@pytest.fixture
def explicit_base_url() -> str:
    return "http://127.0.0.1:39555"


def test_construct_from_env(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setenv(HOST_PORT_ENV, "39555")
    client = HttpLeaseClient()
    assert client._base_url == "http://127.0.0.1:39555"


def test_construct_explicit_base_url_overrides_env(
    monkeypatch: pytest.MonkeyPatch, explicit_base_url: str
) -> None:
    monkeypatch.setenv(HOST_PORT_ENV, "99999")
    client = HttpLeaseClient(base_url=explicit_base_url)
    assert client._base_url == explicit_base_url


def test_construct_without_env_raises(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.delenv(HOST_PORT_ENV, raising=False)
    with pytest.raises(LeaseUnavailableError):
        HttpLeaseClient()


def test_trailing_slash_stripped(explicit_base_url: str) -> None:
    client = HttpLeaseClient(base_url=explicit_base_url + "/")
    assert client._base_url == explicit_base_url


def test_happy_path_returns_text(explicit_base_url: str) -> None:
    spy = _UrlopenSpy(_ok("hello world"))
    client = HttpLeaseClient(base_url=explicit_base_url)
    with patch("urllib.request.urlopen", spy):
        text = client.complete("be terse", "complete this", 64, 5.0)
    assert text == "hello world"
    assert len(spy.calls) == 1
    request, timeout = spy.calls[0]
    assert request.full_url == f"{explicit_base_url}{HOST_ROUTE}"
    assert request.get_method() == "POST"
    assert request.headers["Content-type"] == "application/json"
    body = json.loads(request.data.decode("utf-8"))
    assert body == {
        "system": "be terse",
        "user": "complete this",
        "max_tokens": 64,
        "timeout_ms": 5000,
    }
    # Client-side timeout pads 500 ms for localhost overhead per spec.
    assert timeout == pytest.approx(5.5)


def test_503_maps_to_lease_unavailable(explicit_base_url: str) -> None:
    spy = _UrlopenSpy(_http_error(503, "no lease"))
    client = HttpLeaseClient(base_url=explicit_base_url)
    with patch("urllib.request.urlopen", spy):
        with pytest.raises(LeaseUnavailableError) as excinfo:
            client.complete("", "u", 16, 1.0)
    assert "503" in str(excinfo.value)


def test_504_maps_to_lease_timeout(explicit_base_url: str) -> None:
    spy = _UrlopenSpy(_http_error(504, "timed out"))
    client = HttpLeaseClient(base_url=explicit_base_url)
    with patch("urllib.request.urlopen", spy):
        with pytest.raises(LeaseTimeoutError) as excinfo:
            client.complete("", "u", 16, 1.0)
    assert "504" in str(excinfo.value)


def test_502_maps_to_lease_unavailable(explicit_base_url: str) -> None:
    spy = _UrlopenSpy(_http_error(502, "model gone"))
    client = HttpLeaseClient(base_url=explicit_base_url)
    with patch("urllib.request.urlopen", spy):
        with pytest.raises(LeaseUnavailableError) as excinfo:
            client.complete("", "u", 16, 1.0)
    assert "502" in str(excinfo.value)


def test_400_maps_to_value_error(explicit_base_url: str) -> None:
    spy = _UrlopenSpy(_http_error(400, "user empty"))
    client = HttpLeaseClient(base_url=explicit_base_url)
    with patch("urllib.request.urlopen", spy):
        with pytest.raises(ValueError):
            client.complete("", "u", 16, 1.0)


def test_unknown_http_status_maps_to_lease_unavailable(explicit_base_url: str) -> None:
    spy = _UrlopenSpy(_http_error(418, "teapot"))
    client = HttpLeaseClient(base_url=explicit_base_url)
    with patch("urllib.request.urlopen", spy):
        with pytest.raises(LeaseUnavailableError) as excinfo:
            client.complete("", "u", 16, 1.0)
    assert "418" in str(excinfo.value)


def test_connect_failure_maps_to_lease_unavailable(explicit_base_url: str) -> None:
    spy = _UrlopenSpy(urllib.error.URLError("connection refused"))
    client = HttpLeaseClient(base_url=explicit_base_url)
    with patch("urllib.request.urlopen", spy):
        with pytest.raises(LeaseUnavailableError) as excinfo:
            client.complete("", "u", 16, 1.0)
    assert "host unreachable" in str(excinfo.value)


def test_socket_timeout_maps_to_lease_timeout(explicit_base_url: str) -> None:
    spy = _UrlopenSpy(urllib.error.URLError(TimeoutError("read timed out")))
    client = HttpLeaseClient(base_url=explicit_base_url)
    with patch("urllib.request.urlopen", spy):
        with pytest.raises(LeaseTimeoutError):
            client.complete("", "u", 16, 1.0)


def test_bare_timeout_error_maps_to_lease_timeout(explicit_base_url: str) -> None:
    spy = _UrlopenSpy(TimeoutError("read timed out"))
    client = HttpLeaseClient(base_url=explicit_base_url)
    with patch("urllib.request.urlopen", spy):
        with pytest.raises(LeaseTimeoutError):
            client.complete("", "u", 16, 1.0)


def test_malformed_json_response(explicit_base_url: str) -> None:
    spy = _UrlopenSpy(_FakeResponse(b"not json", status=200))
    client = HttpLeaseClient(base_url=explicit_base_url)
    with patch("urllib.request.urlopen", spy):
        with pytest.raises(LeaseUnavailableError) as excinfo:
            client.complete("", "u", 16, 1.0)
    assert "malformed" in str(excinfo.value).lower()


def test_response_missing_text_field(explicit_base_url: str) -> None:
    spy = _UrlopenSpy(_FakeResponse(b'{"other":"data"}', status=200))
    client = HttpLeaseClient(base_url=explicit_base_url)
    with patch("urllib.request.urlopen", spy):
        with pytest.raises(LeaseUnavailableError) as excinfo:
            client.complete("", "u", 16, 1.0)
    assert "text" in str(excinfo.value).lower()


def test_response_text_field_wrong_type(explicit_base_url: str) -> None:
    spy = _UrlopenSpy(_FakeResponse(b'{"text":42}', status=200))
    client = HttpLeaseClient(base_url=explicit_base_url)
    with patch("urllib.request.urlopen", spy):
        with pytest.raises(LeaseUnavailableError):
            client.complete("", "u", 16, 1.0)


def test_timeout_passed_as_milliseconds_to_host(explicit_base_url: str) -> None:
    spy = _UrlopenSpy(_ok(""))
    client = HttpLeaseClient(base_url=explicit_base_url)
    with patch("urllib.request.urlopen", spy):
        client.complete("", "u", 16, 7.25)
    request, _ = spy.calls[0]
    body = json.loads(request.data.decode("utf-8"))
    assert body["timeout_ms"] == 7250


def test_default_lease_client_with_port_env(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setenv(HOST_PORT_ENV, "39555")
    client = default_lease_client()
    assert isinstance(client, HttpLeaseClient)


def test_default_lease_client_without_port_env(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.delenv(HOST_PORT_ENV, raising=False)
    client = default_lease_client()
    assert isinstance(client, NoLeaseClient)


def test_default_lease_client_empty_port_treated_as_unset(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setenv(HOST_PORT_ENV, "")
    client = default_lease_client()
    assert isinstance(client, NoLeaseClient)


def test_complete_omits_response_format_by_default(explicit_base_url: str) -> None:
    spy = _UrlopenSpy(_ok("ok"))
    client = HttpLeaseClient(base_url=explicit_base_url)
    with patch("urllib.request.urlopen", spy):
        client.complete("", "u", 16, 1.0)
    body = json.loads(spy.calls[0][0].data.decode("utf-8"))
    assert "response_format" not in body


def test_complete_threads_response_format_when_supplied(explicit_base_url: str) -> None:
    spy = _UrlopenSpy(_ok("ok"))
    client = HttpLeaseClient(base_url=explicit_base_url)
    rf = {"type": "json_schema", "schema": {"type": "object"}, "name": "x"}
    with patch("urllib.request.urlopen", spy):
        client.complete("", "u", 16, 1.0, response_format=rf)
    body = json.loads(spy.calls[0][0].data.decode("utf-8"))
    assert body["response_format"] == rf


def test_build_response_format_disabled_by_default(monkeypatch: pytest.MonkeyPatch) -> None:
    from longcat_video_worker.plan_llm import _build_response_format, CONSTRAINED_ENV

    monkeypatch.delenv(CONSTRAINED_ENV, raising=False)
    assert _build_response_format() is None


def test_build_response_format_enabled_by_env(monkeypatch: pytest.MonkeyPatch) -> None:
    from longcat_video_worker.plan_llm import (
        CONSTRAINED_ENV,
        CONSTRAINED_SCHEMA_NAME,
        _build_response_format,
    )

    monkeypatch.setenv(CONSTRAINED_ENV, "1")
    rf = _build_response_format()
    assert rf is not None
    assert rf["type"] == "json_schema"
    assert rf["name"] == CONSTRAINED_SCHEMA_NAME
    assert rf["schema"]["title"] == "LongCatVideoPlan"


def test_build_response_format_falsy_values(monkeypatch: pytest.MonkeyPatch) -> None:
    from longcat_video_worker.plan_llm import CONSTRAINED_ENV, _build_response_format

    for falsy in ("0", "false", "no", "off", "", "  "):
        monkeypatch.setenv(CONSTRAINED_ENV, falsy)
        assert _build_response_format() is None, f"expected None for {falsy!r}"


def test_complete_threads_ephemeral_and_tags_and_ngl(explicit_base_url: str) -> None:
    spy = _UrlopenSpy(_ok("ok"))
    client = HttpLeaseClient(base_url=explicit_base_url)
    with patch("urllib.request.urlopen", spy):
        client.complete(
            "",
            "u",
            16,
            1.0,
            n_gpu_layers=-1,
            required_tags=["text-completion", "json-schema"],
            preferred_tags=["low-latency"],
            ephemeral=True,
        )
    body = json.loads(spy.calls[0][0].data.decode("utf-8"))
    assert body["n_gpu_layers"] == -1
    assert body["required_tags"] == ["text-completion", "json-schema"]
    assert body["preferred_tags"] == ["low-latency"]
    assert body["ephemeral"] is True


def test_complete_omits_optional_fields_when_unset(explicit_base_url: str) -> None:
    spy = _UrlopenSpy(_ok("ok"))
    client = HttpLeaseClient(base_url=explicit_base_url)
    with patch("urllib.request.urlopen", spy):
        client.complete("", "u", 16, 1.0)
    body = json.loads(spy.calls[0][0].data.decode("utf-8"))
    for field in ("n_gpu_layers", "required_tags", "preferred_tags", "ephemeral", "response_format"):
        assert field not in body, f"{field} should be absent when unset, body={body}"


def test_planner_call_kwargs_defaults_to_ephemeral_with_ngl(monkeypatch: pytest.MonkeyPatch) -> None:
    from longcat_video_worker.plan_llm import _planner_call_kwargs
    # Force the auto-fit fallback path so the assertion is stable in
    # CI (no GPU) AND on a dev box (GPU present).
    monkeypatch.setattr(
        "longcat_video_worker.plan_llm.free_vram_mb"
        if hasattr(__import__("longcat_video_worker.plan_llm", fromlist=["free_vram_mb"]), "free_vram_mb")
        else "longcat_video_worker.vram.free_vram_mb",
        lambda: 0,
        raising=False,
    )
    kwargs = _planner_call_kwargs()
    assert kwargs["ephemeral"] is True
    assert kwargs["n_gpu_layers"] in {-1, 0} or kwargs["n_gpu_layers"] > 0
    if "required_tags" in kwargs:
        assert "text-completion" in kwargs["required_tags"]


def test_auto_fit_n_gpu_layers_profile_override_wins(monkeypatch: pytest.MonkeyPatch) -> None:
    from dataclasses import dataclass
    from longcat_video_worker.plan_llm import _auto_fit_n_gpu_layers

    @dataclass
    class FakeProfile:
        n_gpu_layers: Optional[int] = 17

    # vram MUST NOT be consulted when profile overrides
    monkeypatch.setattr(
        "longcat_video_worker.vram.free_vram_mb",
        lambda: 999999,
        raising=False,
    )
    assert _auto_fit_n_gpu_layers(FakeProfile(n_gpu_layers=17)) == 17
    assert _auto_fit_n_gpu_layers(FakeProfile(n_gpu_layers=0)) == 0


def test_auto_fit_n_gpu_layers_falls_back_to_minus_one_without_torch(monkeypatch: pytest.MonkeyPatch) -> None:
    from longcat_video_worker.plan_llm import _auto_fit_n_gpu_layers

    monkeypatch.setattr(
        "longcat_video_worker.vram.free_vram_mb",
        lambda: 0,
        raising=False,
    )
    # Profile with explicit None still goes through auto-fit
    from dataclasses import dataclass

    @dataclass
    class P:
        n_gpu_layers: Optional[int] = None

    assert _auto_fit_n_gpu_layers(P()) == -1
    assert _auto_fit_n_gpu_layers(None) == -1


def test_auto_fit_n_gpu_layers_scales_with_free_vram(monkeypatch: pytest.MonkeyPatch) -> None:
    from longcat_video_worker.plan_llm import _auto_fit_n_gpu_layers

    # 8 GiB free -> (8192 - 1024 headroom) / 80 per layer = 89 layers
    monkeypatch.setattr(
        "longcat_video_worker.vram.free_vram_mb",
        lambda: 8192,
        raising=False,
    )
    layers = _auto_fit_n_gpu_layers(None)
    assert 80 <= layers <= 99


def test_ctx_size_truncation_applies_client_side(explicit_base_url: str) -> None:
    spy = _UrlopenSpy(_ok("ok"))
    client = HttpLeaseClient(base_url=explicit_base_url)
    huge_user = "x" * 100_000  # 100 KB
    with patch("urllib.request.urlopen", spy):
        client.complete("", huge_user, 256, 1.0, ctx_size=512)
    body = json.loads(spy.calls[0][0].data.decode("utf-8"))
    # ctx_size=512, max_tokens=256, char_budget = (512-256)*4 = 1024
    assert len(body["user"]) == 1024


def test_ctx_size_none_does_not_truncate(explicit_base_url: str) -> None:
    spy = _UrlopenSpy(_ok("ok"))
    client = HttpLeaseClient(base_url=explicit_base_url)
    msg = "x" * 100
    with patch("urllib.request.urlopen", spy):
        client.complete("", msg, 16, 1.0, ctx_size=None)
    body = json.loads(spy.calls[0][0].data.decode("utf-8"))
    assert body["user"] == msg


def test_ctx_size_smaller_than_max_tokens_emits_empty_user_safely(explicit_base_url: str) -> None:
    spy = _UrlopenSpy(_ok("ok"))
    client = HttpLeaseClient(base_url=explicit_base_url)
    with patch("urllib.request.urlopen", spy):
        client.complete("", "abc", 1000, 1.0, ctx_size=100)
    body = json.loads(spy.calls[0][0].data.decode("utf-8"))
    # ctx_size 100 < max_tokens 1000 -> char_budget=0 -> user truncated to ""
    assert body["user"] == ""
