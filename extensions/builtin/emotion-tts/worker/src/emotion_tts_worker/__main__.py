"""Process entrypoint — runs the worker with the full Phase-4 handler set."""

from __future__ import annotations

import os
import sys
import time
from pathlib import Path

# stdout is the JSON-RPC wire protocol, NOT a log channel. Save the real
# stdout privately and replace `sys.stdout` with stderr so any rogue
# `print()` (from torch / transformers / huggingface_hub / scipy / etc.)
# goes to the log instead of corrupting our framer with empty lines or
# non-JSON output. The Worker's `emit()` writes directly to the saved
# `_JSONRPC_STDOUT` reference, bypassing the swap.
_JSONRPC_STDOUT = sys.stdout  # captured BEFORE any heavy import
sys.stdout = sys.stderr  # type: ignore[assignment]

# Expose the captured stdout via an attribute the Worker reads at init.
# Module attribute lookup is the simplest cross-module handoff that
# doesn't introduce a circular import.
sys.__nexus_jsonrpc_stdout__ = _JSONRPC_STDOUT  # type: ignore[attr-defined]

# OpenMP duplicate-runtime workaround. PyTorch's MKL and scipy's OpenBLAS
# each ship their own `libiomp5md.dll`; loading both into one process on
# Windows can lock up indefinitely inside OMP's duplicate-detection path.
# Setting this env var BEFORE any heavy import is what counts. Defense-
# in-depth: also set on the host launch spec.
os.environ.setdefault("KMP_DUPLICATE_LIB_OK", "TRUE")

# Put the venv's CLI bindir on PATH so child processes spawned by torch
# can find venv-installed binaries — most importantly `ninja`, which
# `torch.utils.cpp_extension.verify_ninja_availability()` resolves via
# `subprocess.run(['ninja', '--version'])`. Without this, BigVGAN's
# custom CUDA kernel JIT fails over to the slower torch-only vocoder
# path even when `ninja` is in the venv (Windows: `<venv>/Scripts`,
# POSIX: `<venv>/bin`).
#
# `os.path.dirname(sys.executable)` is exactly that bindir whenever the
# worker is launched via the venv's `python.exe` — which is how the
# host's lease factory always launches it. Prepending makes the venv's
# binaries take precedence over any system-installed shadow.
_venv_bindir = os.path.dirname(sys.executable)
if _venv_bindir and _venv_bindir not in os.environ.get("PATH", "").split(os.pathsep):
    os.environ["PATH"] = _venv_bindir + os.pathsep + os.environ.get("PATH", "")


def _do_heavy_imports_serially() -> None:
    """Import scipy / sklearn / transformers / indextts.infer_v2 + torch on
    the main thread, BEFORE any other thread or the asyncio event loop is
    started.

    Why serial-on-main-thread instead of a daemon-thread warmer:

      * `scipy.special` standalone imports in <1s, but in our worker context
        it has been observed to hang for 5+ minutes when other Python threads
        (stdin pump, heartbeat, asyncio idle wakeup) are alive at the same
        time as the import. The Windows DLL loader-lock + Python import-lock
        + OMP runtime detection interact pathologically under thread
        contention.
      * Doing imports BEFORE any thread spawns gives us "single-threaded
        Python" semantics — exactly what the standalone diagnostic uses.
        scipy.special then loads as fast on this code path as it does
        standalone (~1s).
      * The host's handshake timeout is 60s. Pre-imports take ~50s on a
        cold machine; tight but works. If you observe handshake-timeout
        errors, raise `HANDSHAKE_TIMEOUT` host-side rather than re-
        introducing a daemon-thread warmer.
    """
    started = time.monotonic()
    print("[warm] starting heavy imports (single-threaded, sequential)…",
          file=sys.stderr, flush=True)
    # torch first — it sets up MKL/OMP. With KMP_DUPLICATE_LIB_OK set, the
    # subsequent scipy import won't deadlock on the duplicate detection.
    chain = (
        ("torch", "torch"),
        ("scipy", "scipy"),
        ("scipy.special", "scipy.special"),
        ("sklearn", "sklearn"),
        ("transformers", "transformers"),
        ("indextts.infer_v2", "indextts.infer_v2"),
    )
    for label, mod in chain:
        step_start = time.monotonic()
        try:
            __import__(mod)
        except Exception as exc:
            elapsed = time.monotonic() - step_start
            import traceback as _tb
            print(f"[warm] {label} import FAILED after {elapsed:.1f}s: "
                  f"{type(exc).__name__}: {exc}\n{_tb.format_exc()}",
                  file=sys.stderr, flush=True)
            # Don't abort the worker — let the next model.load surface
            # a structured error from the lazy import path.
            return
        elapsed = time.monotonic() - step_start
        print(f"[warm] imported {label} in {elapsed:.1f}s",
              file=sys.stderr, flush=True)
    total = time.monotonic() - started
    print(f"[warm] heavy imports done in {total:.1f}s — handshake will respond next",
          file=sys.stderr, flush=True)


def main() -> int:
    # Force line-buffering on stderr so each `print(..., flush=True)` flushes
    # immediately even when the parent (host) is reading our stderr through
    # a pipe (Windows default-buffers pipe stderr in 4 KB blocks, which can
    # hide our progress prints for minutes).
    try:
        sys.stderr.reconfigure(line_buffering=True)  # type: ignore[attr-defined]
    except Exception:
        pass

    print("[main] worker.__main__ entered", file=sys.stderr, flush=True)

    # Heavy imports BEFORE any thread spawns. See `_do_heavy_imports_serially`
    # docstring for the rationale — short version: avoids GIL-vs-loader-lock
    # contention that intermittently stalls scipy.special for 5+ minutes.
    _do_heavy_imports_serially()

    # The warm-imports event is no longer used by ensure_model in this
    # arrangement (imports finish before any handler can run), but we set
    # it for backwards-compat with any caller that still waits on it.
    from .warm import WARM_DONE
    WARM_DONE.set()

    # Now safe to import worker components — they may transitively touch
    # the modules we just warmed.
    from .handlers import register_phase4_handlers
    from .indextts_adapter import AdapterSettings, IndexTtsAdapter
    from .main import Worker
    from .synthesis import SynthesisService

    worker = Worker()
    model_dir = os.environ.get("EMOTIONTTS_MODEL_DIR_ABS")
    adapter: IndexTtsAdapter | None = None
    synthesis: SynthesisService | None = None

    if model_dir and Path(model_dir).exists():
        adapter = IndexTtsAdapter(AdapterSettings(model_dir_abs=model_dir))
        synthesis = SynthesisService(adapter=adapter, emitter=worker._emit_sync)
        print(f"[main] adapter constructed, model_dir={model_dir}",
              file=sys.stderr, flush=True)
    else:
        print(f"[main] WARNING: no adapter — EMOTIONTTS_MODEL_DIR_ABS={model_dir!r}",
              file=sys.stderr, flush=True)

    register_phase4_handlers(worker, adapter=adapter, synthesis=synthesis)
    print("[main] handlers registered, entering asyncio.run(worker.run())",
          file=sys.stderr, flush=True)

    import asyncio
    return asyncio.run(worker.run())


if __name__ == "__main__":
    sys.exit(main())
