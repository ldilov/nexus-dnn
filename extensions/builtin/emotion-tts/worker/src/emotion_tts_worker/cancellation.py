"""Cooperative cancellation (R-04).

A shared ``threading.Event`` polled between segments by the synthesis
service. If IndexTTS2 exposes ``set_cancel_callback`` or an ``on_step`` hook
on ``infer()``, the adapter threads the same event into upstream sampling —
when that hook fires, a cancelled check raises ``CancelledError`` at the
next token boundary. On upstream builds that expose neither hook the cancel
is honoured only *between* segments, not mid-utterance; the active segment
runs to completion before the next one is skipped. Mid-segment preemption
is NOT part of the v1 contract (FR-020).
"""

from __future__ import annotations

import threading
from typing import Callable


class CancelledError(Exception):
    pass


class CancelToken:
    def __init__(self) -> None:
        self._event = threading.Event()
        self._request_id: str | None = None

    def bind(self, request_id: str) -> None:
        self._request_id = request_id
        self._event.clear()

    def clear(self) -> None:
        self._event.clear()
        self._request_id = None

    def cancel(self, request_id: str) -> bool:
        if self._request_id is None or self._request_id != request_id:
            return False
        self._event.set()
        return True

    def is_cancelled(self) -> bool:
        return self._event.is_set()

    def check(self) -> None:
        if self._event.is_set():
            raise CancelledError("cancelled by client")

    def as_on_step(self) -> Callable[[], None]:
        def _hook() -> None:
            self.check()

        return _hook


GLOBAL_TOKEN = CancelToken()
