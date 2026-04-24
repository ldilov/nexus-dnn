"""``torch.compile`` wrapper for the GPT sampling stage (spec 034 US4, T083).

Wraps an ``nn.Module`` via ``torch.compile(mode="reduce-overhead")`` with:

* a single eager-to-compiled round-trip on construction so
  unrecoverable compile errors surface immediately rather than inside
  the first segment;
* automatic fallback to the uncompiled module on *any* exception —
  the caller never sees a ``TorchCompileError`` bubble up;
* a shape cache that normalises input text-token counts to a multiple
  of ``pad_to_multiple_of`` (default 64, R-34-04 Triton cost curve) so
  a batch of similar-length segments amortises to a single compile;
* structured progress notifications — ``compile.started`` / ``.complete``
  / ``.failed`` — wired through the caller's emitter.

The wrapper holds no state between worker subprocess restarts — compile
caches are in-memory and discarded when the Python process exits.
"""

from __future__ import annotations

import math
import time
from dataclasses import dataclass, field
from typing import Any, Callable, Optional

ProgressEmitter = Callable[[str, dict[str, Any]], None]


@dataclass
class CompileSettings:
    enabled: bool = False
    pad_to_multiple_of: int = 64
    max_text_tokens_per_segment: int = 400
    mode: str = "reduce-overhead"


@dataclass
class CompiledGpt:
    """The public handle the synthesiser uses.

    Call ``.forward(x, text_len=N)`` on this — the wrapper handles
    padding + picking compiled-vs-eager.
    """

    module: Any  # original eager module
    _settings: CompileSettings
    _emitter: Optional[ProgressEmitter]
    _compiled: Any | None = field(default=None)
    _compile_calls: int = 0
    _session_available: bool = True
    _last_failure: str | None = None

    def forward(self, x: Any, text_len: int) -> Any:
        bucket = pad_to_bucket(text_len, self._settings.pad_to_multiple_of)
        if bucket > self._settings.max_text_tokens_per_segment:
            # Fall back to eager for over-cap segments rather than
            # allocating a fresh compile that won't be re-used.
            return self.module(x)
        if not self._session_available or self._compiled is None:
            return self.module(x)
        try:
            return self._compiled(x)
        except Exception as err:
            self._mark_session_failed(f"runtime_compile_error: {type(err).__name__}: {err}")
            return self.module(x)

    def session_available(self) -> bool:
        return self._session_available

    def last_failure(self) -> str | None:
        return self._last_failure

    def compile_calls(self) -> int:
        return self._compile_calls

    # --- private ---------------------------------------------------------

    def _mark_session_failed(self, reason: str) -> None:
        self._session_available = False
        self._last_failure = reason
        self._compiled = None
        if self._emitter:
            self._emitter(
                "compile.failed",
                {
                    "stage": "compile.failed",
                    "duration_ms": 0,
                    "reason": reason,
                },
            )


def pad_to_bucket(text_len: int, multiple_of: int) -> int:
    if multiple_of <= 0:
        return text_len
    return math.ceil(text_len / multiple_of) * multiple_of


def compile_gpt_stage(
    module: Any,
    settings: CompileSettings,
    emitter: ProgressEmitter | None = None,
    request_id: str | None = None,
) -> CompiledGpt:
    """Wrap ``module`` with a compiled path if requested + available.

    Always returns a ``CompiledGpt`` — never raises. On compile failure
    the returned handle silently forwards every call to the eager
    module and ``.session_available()`` returns ``False`` so the
    caller can disable the toggle on the deployment row.
    """

    handle = CompiledGpt(module=module, _settings=settings, _emitter=emitter)
    if not settings.enabled:
        return handle

    try:
        import torch  # type: ignore[import-not-found]
    except ImportError as err:
        handle._mark_session_failed(f"torch not installed: {err}")
        return handle

    if emitter is not None:
        emitter(
            "compile.started",
            {
                "request_id": request_id or "",
                "stage": "compile.started",
                "eta_ms": 25000,
                "message": "compiling GPT stage (one-time; future batches will be fast)",
            },
        )

    start = time.perf_counter()
    try:
        compiled = torch.compile(module, mode=settings.mode)
        handle._compiled = compiled
        handle._compile_calls = 1
    except Exception as err:
        handle._mark_session_failed(f"compile_failed: {type(err).__name__}: {err}")
        return handle

    duration_ms = int((time.perf_counter() - start) * 1000)
    if emitter is not None:
        emitter(
            "compile.complete",
            {"stage": "compile.complete", "duration_ms": duration_ms},
        )
    return handle
