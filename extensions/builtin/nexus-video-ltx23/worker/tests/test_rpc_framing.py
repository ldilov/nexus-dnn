"""JSON-RPC framing unit tests."""

from __future__ import annotations

import json

import pytest

from ltx_video_worker.rpc import (
    ErrorCodes,
    Methods,
    error_response,
    notification,
    ok_response,
    parse_request,
)


def test_parse_request_ok():
    req = parse_request('{"jsonrpc":"2.0","id":1,"method":"ltx.runtime.health"}')
    assert req.id == 1
    assert req.method == Methods.HEALTH
    assert req.params is None


def test_parse_request_rejects_wrong_version():
    with pytest.raises(ValueError):
        parse_request('{"jsonrpc":"1.0","id":1,"method":"x"}')


def test_ok_response_shape():
    line = ok_response(42, {"a": 1})
    obj = json.loads(line)
    assert obj == {"jsonrpc": "2.0", "id": 42, "result": {"a": 1}}
    assert line.endswith("\n")


def test_error_response_includes_data():
    line = error_response("abc", ErrorCodes.METHOD_NOT_FOUND, "nope", {"extra": True})
    obj = json.loads(line)
    assert obj["error"]["code"] == ErrorCodes.METHOD_NOT_FOUND
    assert obj["error"]["data"] == {"extra": True}


def test_notification_has_no_id():
    line = notification("ltx.video.progress", {"percent": 50})
    obj = json.loads(line)
    assert "id" not in obj
    assert obj["method"] == "ltx.video.progress"
    assert obj["params"] == {"percent": 50}
