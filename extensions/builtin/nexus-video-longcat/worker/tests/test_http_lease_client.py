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
