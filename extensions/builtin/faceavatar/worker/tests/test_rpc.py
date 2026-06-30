import json

import pytest

from faceavatar_worker.rpc import (
    ErrorCodes,
    Methods,
    Notifications,
    error_response,
    notification,
    ok_response,
    parse_request,
)


def test_frozen_method_names():
    assert Methods.HEALTH == "faceavatar.runtime.health"
    assert Methods.GENERATE_HEAD_START == "faceavatar.generate.start"
    assert Methods.GENERATE_HEAD_CANCEL == "faceavatar.generate.cancel"
    assert Methods.GRAFT_HEAD_START == "faceavatar.graft.start"
    assert Methods.GRAFT_HEAD_CANCEL == "faceavatar.graft.cancel"


def test_frozen_notification_names():
    assert Notifications.PROGRESS == "faceavatar.generate.progress"
    assert Notifications.DONE == "faceavatar.generate.done"
    assert Notifications.ERROR == "faceavatar.generate.error"
    assert Notifications.ARTIFACT_CREATED == "faceavatar.generate.artifact.created"


def test_frozen_error_codes():
    assert ErrorCodes.GPU_NOT_SUPPORTED == -32100
    assert ErrorCodes.MODEL_MISSING == -32101
    assert ErrorCodes.GENERATION_FAILED == -32102
    assert ErrorCodes.CANCELLED == -32103


def test_parse_request_requires_jsonrpc_2():
    req = parse_request('{"jsonrpc":"2.0","id":1,"method":"handshake","params":{}}')
    assert req.id == 1 and req.method == "handshake"
    with pytest.raises(ValueError):
        parse_request('{"id":1,"method":"x"}')


def test_response_framing_is_newline_terminated():
    assert ok_response(1, {"a": 1}).endswith("\n")
    assert error_response(1, -32100, "boom").endswith("\n")
    assert notification("faceavatar.generate.progress", {"s": 1}).endswith("\n")


def test_error_response_carries_code_and_optional_data():
    parsed = json.loads(error_response(7, ErrorCodes.CANCELLED, "cancelled", {"x": 1}))
    assert parsed["error"]["code"] == -32103
    assert parsed["error"]["data"] == {"x": 1}
    no_data = json.loads(error_response(7, ErrorCodes.CANCELLED, "cancelled"))
    assert "data" not in no_data["error"]
