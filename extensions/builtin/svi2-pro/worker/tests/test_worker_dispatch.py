import json
import pytest
from svi2_video_worker.main import Worker, PROTOCOL_VERSION


@pytest.mark.asyncio
async def test_handshake_returns_runtime_id():
    w = Worker(profile="fake")
    captured = []
    w._write = lambda line: captured.append(line)  # type: ignore
    await w._dispatch_line('{"jsonrpc":"2.0","id":1,"method":"handshake","params":{}}')
    res = json.loads(captured[-1])["result"]
    assert res["runtime_id"] == "nexus.video.svi2-pro.fake"
    assert res["protocol_version"] == PROTOCOL_VERSION


@pytest.mark.asyncio
async def test_unknown_method_errors():
    w = Worker(profile="fake")
    captured = []
    w._write = lambda line: captured.append(line)  # type: ignore
    await w._dispatch_line('{"jsonrpc":"2.0","id":2,"method":"nope","params":{}}')
    assert json.loads(captured[-1])["error"]["code"] == -32601
