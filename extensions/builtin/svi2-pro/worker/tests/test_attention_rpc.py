import asyncio

from svi2_video_worker.attention_rpc import register_attention_handlers
from svi2_video_worker.rpc import Methods


class _Worker:
    def __init__(self):
        self.handlers = {}

    def register(self, method, handler):
        self.handlers[method] = handler


def test_register_attention_handlers_exposes_capabilities_method():
    w = _Worker()
    register_attention_handlers(w)
    assert Methods.ATTENTION_CAPABILITIES in w.handlers


def test_capabilities_handler_returns_backends():
    w = _Worker()
    register_attention_handlers(w)
    result = asyncio.get_event_loop().run_until_complete(
        w.handlers[Methods.ATTENTION_CAPABILITIES](None)
    )
    assert "backends" in result
    assert len(result["backends"]) == 5
    ids = [b["id"] for b in result["backends"]]
    assert "sdpa" in ids
    assert "flash2" in ids


def test_capabilities_handler_has_sm_and_cuda():
    w = _Worker()
    register_attention_handlers(w)
    result = asyncio.get_event_loop().run_until_complete(
        w.handlers[Methods.ATTENTION_CAPABILITIES](None)
    )
    assert "sm" in result and isinstance(result["sm"], list)
    assert "cuda_available" in result and isinstance(result["cuda_available"], bool)
    assert "default" in result
    assert "auto_chain" in result
