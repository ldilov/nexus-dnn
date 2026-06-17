import json
from svi2_video_worker.rpc import (
    Methods, Notifications, ErrorCodes,
    parse_request, ok_response, error_response, notification,
)


def test_parse_request_requires_jsonrpc_2():
    req = parse_request('{"jsonrpc":"2.0","id":1,"method":"handshake","params":{}}')
    assert req.id == 1 and req.method == "handshake" and req.params == {}


def test_parse_request_rejects_bad_version():
    try:
        parse_request('{"id":1,"method":"x"}')
        assert False, "expected ValueError"
    except ValueError:
        pass


def test_ok_and_error_and_notification_framing():
    assert json.loads(ok_response(7, {"a": 1})) == {"jsonrpc": "2.0", "id": 7, "result": {"a": 1}}
    err = json.loads(error_response(7, ErrorCodes.INVALID_PARAMS, "bad"))
    assert err["error"]["code"] == -32602
    note = json.loads(notification(Notifications.PROGRESS, {"pct": 0.5}))
    assert note["method"] == Notifications.PROGRESS and "id" not in note


def test_method_and_notification_names():
    assert Methods.RENDER_START == "svi2.video.render.start"
    assert Notifications.CLIP_COMPLETED == "svi2.video.clip.completed"
    assert Methods.ATTENTION_CAPABILITIES == "svi2.attention.capabilities"
