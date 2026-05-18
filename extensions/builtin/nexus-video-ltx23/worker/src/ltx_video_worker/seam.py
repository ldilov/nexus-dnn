"""Scene-boundary seam treatment for the LTX-Video 0.9.7 render loop.

Scenes are rendered independently and concatenated. Scene N+1 is
conditioned on the last ``condition_tail_frames`` real frames of scene
N (``LTXVideoCondition(video=tail, frame_index=0)``), so the boundary
is NOT a missing-frame gap — it is a re-rendered, photometrically
drifted overlap. A hard ffmpeg concat therefore shows a jump: the
conditioned window is replayed and the independently denoised segment
carries a slightly different exposure/tone.

The treatment, in boundary order:

  1. ``overlap`` — drop the first N frames of the new segment that
     re-render the conditioned window (removes the temporal replay).
  2. ``color_match`` — Reinhard per-channel mean/std transfer of the
     trimmed segment onto the previous segment's true last frame
     (removes the exposure/tone step).
  3. ``bridge`` — synthesise a short transition between the previous
     segment's last frame and the trimmed segment's first frame so any
     residual micro-jump is hidden. ``linear`` = alpha ramp (no model,
     deterministic). ``film`` = motion-aware interpolation via FILM.

FILM provenance: ``film`` lazily loads the FILM frame-interpolation
model via the dajes/frame-interpolation-pytorch TorchScript export,
which (and the FILM weights it re-exports) is Apache-2.0 — the only
permissive option whose *weights* are licence-clean for a GPL-3.0
project (RIFE weight/data licensing is unresolved; AMT is CC-BY-NC).
It is optional and off the default path; ``overlap_blend`` (no model)
is the default because the boundary already overlaps — interpolation
is a polish, not the primary fix.

Defaults are deliberately mild: the exact overlap a given prompt/seed
re-renders is empirical, so the production values are tuned by reading
boundary frames on GPU, not guessed here.
"""

from __future__ import annotations

import threading
from typing import Any

_DEF_METHOD = "overlap_blend"
_DEF_OVERLAP_FRAMES = 8
# Default 0: a linear alpha bridge cross-dissolves two spatially
# misaligned clips and ghosts (double-exposure) whenever the
# subject/camera moved across the boundary — GPU frame-verified
# 2026-05-18, exactly the predicted failure mode. Trim + colour match
# alone gives a clean cut-to-continuation. A bridge is only motion-safe
# via FILM (method="film"); a linear bridge is opt-in for near-static
# boundaries.
_DEF_BLEND_FRAMES = 0
_DEF_COLOR_MATCH = True
_VALID_METHODS = ("overlap_blend", "film", "none")


def resolve_method(raw: Any) -> str:
    """Map a wire/enum value (or env override) to a worker method.

    The shared host ``InterpolationMethod`` default is ``rife2x`` (an
    LTX-2.3 aspiration, unimplemented here); for the 0.9.7 path that —
    and any unknown value — resolves to the proven ``overlap_blend``
    seam fix rather than silently disabling it.
    """
    v = str(raw or "").strip().lower()
    if v in _VALID_METHODS:
        return v
    if v in ("", "rife2x", "rife", "default", "auto"):
        return _DEF_METHOD
    return _DEF_METHOD


def seam_params(advanced: dict[str, Any], env_method: str | None) -> dict[str, Any]:
    """Resolve the seam knobs from the request ``advanced`` block.

    ``interpolation_method`` falls back to the shared ``interpolation``
    key, then the env override (the GPU A/B knob), then the default.
    """
    g = advanced.get
    raw_method = (
        g("interpolation_method")
        if g("interpolation_method") is not None
        else g("interpolation")
    )
    if raw_method is None and env_method:
        raw_method = env_method
    method = resolve_method(raw_method)
    # FILM is motion-aware so it bridges by default; the linear bridge
    # ghosts on motion (frame-verified) so it stays opt-in.
    default_blend = 6 if method == "film" else _DEF_BLEND_FRAMES
    return {
        "method": method,
        "overlap_frames": _coerce_int(
            g("seam_overlap_frames"), _DEF_OVERLAP_FRAMES
        ),
        "blend_frames": _coerce_int(
            g("seam_blend_frames"), default_blend
        ),
        "color_match": _coerce_bool(
            g("seam_color_match"), _DEF_COLOR_MATCH
        ),
    }


def apply_seam(
    prev_tail: Any,
    cur_frames: list[Any],
    params: dict[str, Any],
    logger: Any = None,
) -> list[Any]:
    """Return the seam-treated current-segment frames.

    ``prev_tail`` is the previous segment's trailing real frames (the
    list fed as this segment's video condition). When it is not a
    non-empty frame list (first segment, single still input) or the
    method is ``none``, ``cur_frames`` is returned unchanged.
    """
    method = params.get("method", _DEF_METHOD)
    tail = list(prev_tail) if isinstance(prev_tail, (list, tuple)) else []
    if method == "none" or not tail or not cur_frames:
        return cur_frames

    overlap = max(0, min(int(params.get("overlap_frames", 0)), len(cur_frames) - 1))
    body = cur_frames[overlap:] if overlap else cur_frames
    if not body:
        body = cur_frames[-1:]

    if params.get("color_match", True):
        body = _color_match(body, tail[-1])

    blend_n = max(0, min(int(params.get("blend_frames", 0)), len(body)))
    bridge: list[Any] = []
    if blend_n:
        a, b = tail[-1], body[0]
        if method == "film":
            bridge = _film_bridge(a, b, blend_n, logger)
        if not bridge:
            bridge = _linear_bridge(a, b, blend_n)

    if logger is not None:
        try:
            logger.info(
                "ltxv097.seam",
                method=method,
                overlap=overlap,
                bridge=len(bridge),
                color_match=bool(params.get("color_match", True)),
            )
        except Exception:  # noqa: BLE001 — telemetry must never abort a render
            pass
    return bridge + body


# --------------------------------------------------------------------------
# Frame ops (numpy-backed; PIL in / PIL out)
# --------------------------------------------------------------------------


_COLOR_STAT_FRAMES = 8


def _color_match(frames: list[Any], reference: Any) -> list[Any]:
    """Reinhard per-channel mean/std transfer onto ``reference``.

    Source statistics are estimated from the boundary head only (the
    first ``_COLOR_STAT_FRAMES``), not the whole body: the goal is to
    remove the exposure/tone STEP at the cut, so a long interior with a
    legitimate mid-scene lighting change must not dominate the estimate
    and back-propagate a miscorrection onto frames that were already
    correct. The transform is then applied uniformly to every frame.
    """
    try:
        import numpy as np
        from PIL import Image  # type: ignore
    except ImportError:
        return frames

    ref = np.asarray(reference.convert("RGB"), dtype=np.float32)
    ref_mean = ref.reshape(-1, 3).mean(axis=0)
    ref_std = ref.reshape(-1, 3).std(axis=0) + 1e-5

    head = frames[: min(len(frames), _COLOR_STAT_FRAMES)]
    head_stack = np.stack(
        [np.asarray(f.convert("RGB"), dtype=np.float32) for f in head]
    )
    src_mean = head_stack.reshape(-1, 3).mean(axis=0)
    src_std = head_stack.reshape(-1, 3).std(axis=0) + 1e-5

    out: list[Any] = []
    for f in frames:
        arr = np.asarray(f.convert("RGB"), dtype=np.float32)
        matched = (arr - src_mean) / src_std * ref_std + ref_mean
        out.append(
            Image.fromarray(np.clip(matched, 0.0, 255.0).astype(np.uint8))
        )
    return out


def _linear_bridge(a: Any, b: Any, n: int) -> list[Any]:
    """``n`` alpha-ramped frames strictly between ``a`` and ``b``."""
    try:
        import numpy as np
        from PIL import Image  # type: ignore
    except ImportError:
        return []

    fa = np.asarray(a.convert("RGB"), dtype=np.float32)
    fb = np.asarray(b.convert("RGB"), dtype=np.float32)
    if fa.shape != fb.shape:
        return []
    out: list[Any] = []
    for i in range(1, n + 1):
        alpha = i / (n + 1)
        blended = np.clip((1.0 - alpha) * fa + alpha * fb, 0.0, 255.0)
        out.append(Image.fromarray(blended.astype(np.uint8)))
    return out


def _film_bridge(a: Any, b: Any, n: int, logger: Any) -> list[Any]:
    """Motion-aware bridge via FILM; ``[]`` on any failure (caller
    falls back to the linear bridge so a render never aborts on the
    optional interpolation path)."""
    try:
        model = _load_film(logger)
        if model is None:
            return []
        import numpy as np
        import torch  # type: ignore
        from PIL import Image  # type: ignore
    except ImportError:
        return []

    try:
        fa = (
            torch.from_numpy(
                np.asarray(a.convert("RGB"), dtype=np.float32) / 255.0
            )
            .permute(2, 0, 1)
            .unsqueeze(0)
        )
        fb = (
            torch.from_numpy(
                np.asarray(b.convert("RGB"), dtype=np.float32) / 255.0
            )
            .permute(2, 0, 1)
            .unsqueeze(0)
        )
        device = "cuda" if torch.cuda.is_available() else "cpu"
        fa, fb = fa.to(device), fb.to(device)
        out: list[Any] = []
        for i in range(1, n + 1):
            t = torch.full((1, 1), i / (n + 1), device=device)
            with torch.no_grad():
                mid = model(fa, fb, t)
            arr = (
                mid.clamp(0.0, 1.0)
                .squeeze(0)
                .permute(1, 2, 0)
                .mul(255.0)
                .byte()
                .cpu()
                .numpy()
            )
            out.append(Image.fromarray(arr))
        return out
    except Exception as e:  # noqa: BLE001 — optional path, never fatal
        if logger is not None:
            try:
                logger.info("ltxv097.seam_film_skip", err=str(e))
            except Exception:  # noqa: BLE001
                pass
        return []


# Process-singleton model cache: one warm worker serves many renders;
# the TorchScript model is loaded once and shared. The lock makes the
# first-load check-then-set atomic across concurrent render threads
# (asyncio.to_thread offloads), so a load race can't double-load or
# clobber the cached handle.
_FILM_CACHE: dict[str, Any] = {"model": None, "tried": False}
_FILM_LOCK = threading.Lock()


def _load_film(logger: Any) -> Any:
    """Lazily load the Apache-2.0 FILM TorchScript model once.

    Path resolution mirrors the GGUF/base convention:
    ``NEXUS_VIDEO_LTX23_FILM_MODEL`` env →
    ``<NEXUS_HOST_DATA_DIR>/models/<repo>/film_net_fp32.pt``. Returns
    ``None`` (caller falls back to the linear bridge) if unavailable.
    """
    if _FILM_CACHE["tried"]:
        return _FILM_CACHE["model"]
    with _FILM_LOCK:
        if _FILM_CACHE["tried"]:
            return _FILM_CACHE["model"]
        return _load_film_locked(logger)


def _load_film_locked(logger: Any) -> Any:
    import os
    from pathlib import Path

    _FILM_CACHE["tried"] = True

    explicit = os.environ.get("NEXUS_VIDEO_LTX23_FILM_MODEL", "").strip()
    if explicit:
        path = Path(explicit)
    else:
        host_data = os.environ.get("NEXUS_HOST_DATA_DIR", "")
        path = Path(host_data).joinpath(
            "models",
            "jkawamoto",
            "frame-interpolation-pytorch",
            "film_net_fp32.pt",
        )
    if not path.is_file():
        if logger is not None:
            try:
                logger.info("ltxv097.seam_film_absent", path=str(path))
            except Exception:  # noqa: BLE001
                pass
        return None
    try:
        import torch  # type: ignore

        model = torch.jit.load(str(path), map_location="cpu")
        model.eval()
        device = "cuda" if torch.cuda.is_available() else "cpu"
        _FILM_CACHE["model"] = model.to(device)
    except Exception as e:  # noqa: BLE001 — optional path
        if logger is not None:
            try:
                logger.info("ltxv097.seam_film_load_fail", err=str(e))
            except Exception:  # noqa: BLE001
                pass
        _FILM_CACHE["model"] = None
    return _FILM_CACHE["model"]


def _coerce_int(value: Any, default: int) -> int:
    if value is None:
        return default
    try:
        return int(value)
    except (TypeError, ValueError):
        return default


def _coerce_bool(value: Any, default: bool) -> bool:
    if value is None:
        return default
    if isinstance(value, bool):
        return value
    return str(value).strip().lower() in ("1", "true", "yes", "on")
