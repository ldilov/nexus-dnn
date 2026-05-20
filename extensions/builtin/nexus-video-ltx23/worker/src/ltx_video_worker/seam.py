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
     deterministic, ghosts on motion). ``film``/``rife`` = motion-aware
     interpolation via the selected model.

Selectable methods: ``overlap_blend`` (default, no model), ``film``
(Google FILM — Apache-2.0 incl. weights, GPL-clean), ``rife``
(Practical-RIFE — code MIT; its Vimeo90K-trained weights are an
operator-supplied external asset, not redistributed here, so the
project's GPL provenance stays clean), and ``none`` (legacy hard
concat). Model bridges are optional and off the default path: any
missing/incompatible model falls back to the linear bridge so a
render never aborts. ``overlap_blend`` is the default because the
boundary already overlaps — interpolation is a polish, not the
primary fix.

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
# Multiple selectable interpolation methods. Motion-aware model
# bridges (film, rife) bridge by default; overlap_blend uses no model;
# none = legacy hard concat.
_MODEL_METHODS = ("film", "rife")
_VALID_METHODS = ("overlap_blend", "film", "rife", "none")


def resolve_method(raw: Any) -> str:
    """Map a wire/enum value (or env override) to a worker method.

    The shared host ``InterpolationMethod`` has a ``rife2x`` variant —
    when the operator explicitly selects it (or ``rife``) the worker
    runs the RIFE bridge. An unset request arrives as null (the host
    sends null when ``interpolation`` is unset), which — with any
    blank/``default``/``auto``/unknown value — resolves to the proven
    no-model ``overlap_blend`` seam fix so a render is never silently
    left with a raw seam.
    """
    v = str(raw or "").strip().lower()
    if v in _VALID_METHODS:
        return v
    if v in ("rife2x", "rife"):
        return "rife"
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
    # Model bridges (film/rife) are motion-aware so they bridge by
    # default; the linear bridge ghosts on motion (frame-verified) so
    # it stays opt-in for overlap_blend.
    default_blend = 6 if method in _MODEL_METHODS else _DEF_BLEND_FRAMES
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
        # AdaIN-style pixel blend factor (research P1-10). 1.0 = full
        # Reinhard transfer (legacy). 0.25 = soft style nudge matching
        # the Lightricks ComfyUI LTXVAdainLatent recommendation. Lower
        # values reduce risk of over-corrected exposure on natural
        # mid-scene lighting changes.
        "color_match_factor": _coerce_float(
            g("seam_color_match_factor"), 1.0
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
        body = _color_match(
            body, tail[-1], float(params.get("color_match_factor", 1.0))
        )

    blend_n = max(0, min(int(params.get("blend_frames", 0)), len(body)))
    bridge: list[Any] = []
    if blend_n:
        a, b = tail[-1], body[0]
        if method in _MODEL_METHODS:
            bridge = _model_bridge(method, a, b, blend_n, logger)
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


def _color_match(
    frames: list[Any], reference: Any, factor: float = 1.0
) -> list[Any]:
    """AdaIN-style per-channel mean/std transfer onto ``reference``,
    blended at ``factor`` (1.0 = full transfer, 0.25 = research nudge).

    Source statistics are estimated from the boundary head only (the
    first ``_COLOR_STAT_FRAMES``), not the whole body: the goal is to
    remove the exposure/tone STEP at the cut, so a long interior with a
    legitimate mid-scene lighting change must not dominate the estimate
    and back-propagate a miscorrection onto frames that were already
    correct. The transform is then blended with the original per
    ``factor``.
    """
    try:
        import numpy as np
        from PIL import Image  # type: ignore
    except ImportError:
        return frames
    if factor <= 0.0:
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
    blend = max(0.0, min(1.0, factor))
    for f in frames:
        arr = np.asarray(f.convert("RGB"), dtype=np.float32)
        adain = (arr - src_mean) / src_std * ref_std + ref_mean
        matched = blend * adain + (1.0 - blend) * arr
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


# Selectable motion-aware bridge models. Each is an operator-supplied
# TorchScript checkpoint (`model(img0, img1, timestep) -> mid`):
#   film — Google FILM (Apache-2.0 incl. weights; GPL-clean)
#   rife — Practical-RIFE (code MIT; Vimeo90K-trained weights, an
#          accepted operator-supplied asset — not redistributed here —
#          so the project's GPL provenance stays clean)
# Resolution mirrors the GGUF/base convention: an explicit env path,
# else the on-disk models convention. Absent/incompatible → the caller
# falls back to the linear bridge; a render never aborts on the
# optional interpolation path.
_MODEL_SPECS: dict[str, tuple[str, tuple[str, ...]]] = {
    "film": (
        "NEXUS_VIDEO_LTX23_FILM_MODEL",
        ("jkawamoto", "frame-interpolation-pytorch", "film_net_fp32.pt"),
    ),
    "rife": (
        "NEXUS_VIDEO_LTX23_RIFE_MODEL",
        ("hzwer", "Practical-RIFE", "rife.pt"),
    ),
}

# Process-singleton per-kind cache: one warm worker serves many
# renders; each TorchScript model is loaded once and shared. The lock
# makes the first-load check-then-set atomic across concurrent render
# threads (asyncio.to_thread offloads), so a load race can't
# double-load or clobber a cached handle.
_MODEL_CACHE: dict[str, dict[str, Any]] = {}
_MODEL_LOCK = threading.Lock()

# The original jkawamoto GitHub release was removed (404); the same
# author now hosts the identical TorchScript checkpoint on Hugging Face.
# Same forward contract: model(img0, img1, timestep) -> mid.
_FILM_DEFAULT_URL = (
    "https://huggingface.co/jkawamoto/frame-interpolation-pytorch/"
    "resolve/main/film_net_fp32.pt"
)
_FILM_AUTOSTAGE_ENV = "NEXUS_VIDEO_LTX23_FILM_AUTOSTAGE"
_FILM_URL_ENV = "NEXUS_VIDEO_LTX23_FILM_MODEL_URL"


def _download(url: str, dest: Any) -> bool:
    import urllib.request

    tmp = dest.parent / (dest.name + ".part")
    try:
        dest.parent.mkdir(parents=True, exist_ok=True)
        with urllib.request.urlopen(url, timeout=120) as resp:  # noqa: S310
            tmp.write_bytes(resp.read())
        tmp.replace(dest)
        return True
    except Exception:  # noqa: BLE001
        try:
            tmp.unlink()
        except OSError:
            pass
        return False


def _maybe_autostage_film(kind: str, path: Any, logger: Any) -> None:
    if kind != "film" or path.is_file():
        return
    import os

    if not _coerce_bool(os.environ.get(_FILM_AUTOSTAGE_ENV), False):
        return
    url = os.environ.get(_FILM_URL_ENV, "").strip() or _FILM_DEFAULT_URL
    ok = _download(url, path)
    if logger is not None:
        try:
            logger.info(
                "ltxv097.seam_film_autostage",
                ok=ok,
                url=url,
                path=str(path),
            )
        except Exception:  # noqa: BLE001
            pass


def _model_bridge(kind: str, a: Any, b: Any, n: int, logger: Any) -> list[Any]:
    """Motion-aware bridge via the ``kind`` model; ``[]`` on any
    failure so the caller falls back to the linear bridge."""
    try:
        model = _load_model(kind, logger)
        if model is None:
            return []
        import numpy as np
        import torch  # type: ignore
        from PIL import Image  # type: ignore
    except ImportError:
        return []

    def _to_t(img):
        return (
            torch.from_numpy(
                np.asarray(img.convert("RGB"), dtype=np.float32) / 255.0
            )
            .permute(2, 0, 1)
            .unsqueeze(0)
        )

    try:
        device = "cuda" if torch.cuda.is_available() else "cpu"
        fa, fb = _to_t(a).to(device), _to_t(b).to(device)
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
                logger.info("ltxv097.seam_bridge_skip", kind=kind, err=str(e))
            except Exception:  # noqa: BLE001
                pass
        return []


def _load_model(kind: str, logger: Any) -> Any:
    slot = _MODEL_CACHE.get(kind)
    if slot is not None and slot["tried"]:
        return slot["model"]
    with _MODEL_LOCK:
        slot = _MODEL_CACHE.get(kind)
        if slot is not None and slot["tried"]:
            return slot["model"]
        return _load_model_locked(kind, logger)


def _load_model_locked(kind: str, logger: Any) -> Any:
    import os
    from pathlib import Path

    slot = {"model": None, "tried": True}
    _MODEL_CACHE[kind] = slot
    spec = _MODEL_SPECS.get(kind)
    if spec is None:
        return None
    env_var, rel = spec

    explicit = os.environ.get(env_var, "").strip()
    if explicit:
        path = Path(explicit)
    else:
        host_data = os.environ.get("NEXUS_HOST_DATA_DIR", "")
        path = Path(host_data).joinpath("models", *rel)
    _maybe_autostage_film(kind, path, logger)
    if not path.is_file():
        if logger is not None:
            try:
                logger.info(
                    "ltxv097.seam_model_absent", kind=kind, path=str(path)
                )
            except Exception:  # noqa: BLE001
                pass
        return None
    try:
        import torch  # type: ignore

        model = torch.jit.load(str(path), map_location="cpu")
        model.eval()
        device = "cuda" if torch.cuda.is_available() else "cpu"
        slot["model"] = model.to(device)
    except Exception as e:  # noqa: BLE001 — optional path
        if logger is not None:
            try:
                logger.info(
                    "ltxv097.seam_model_load_fail", kind=kind, err=str(e)
                )
            except Exception:  # noqa: BLE001
                pass
        slot["model"] = None
    return slot["model"]


def _coerce_float(value: Any, default: float) -> float:
    if value is None:
        return default
    try:
        return float(value)
    except (TypeError, ValueError):
        return default


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
