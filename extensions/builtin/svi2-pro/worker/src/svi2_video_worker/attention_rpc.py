from __future__ import annotations

from typing import Any

from .attention_backend import attention_capabilities
from .rpc import Methods


def register_attention_handlers(worker: Any) -> None:
    async def _capabilities(_params: Any) -> dict:
        return attention_capabilities()

    worker.register(Methods.ATTENTION_CAPABILITIES, _capabilities)


__all__ = ["register_attention_handlers"]
