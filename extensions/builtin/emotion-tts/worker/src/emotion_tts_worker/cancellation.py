"""Cooperative cancellation (R-04).

A shared ``threading.Event`` threaded into IndexTTS2's sampling loop via the
``on_step`` hook. The worker thread polls the event between tokens and
raises ``CancelledError`` at the next boundary, which propagates out of
``IndexTTS2.infer()`` as a return-early signal.
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
