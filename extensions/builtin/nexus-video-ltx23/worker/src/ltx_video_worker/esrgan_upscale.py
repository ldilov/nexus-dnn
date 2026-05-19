from __future__ import annotations

import os
import subprocess
import sys
import tempfile
import zipfile
from pathlib import Path

# Real-ESRGAN spatial super-resolution via the upstream
# xinntao/Real-ESRGAN-ncnn-vulkan prebuilt binary (BSD/MIT, models
# bundled in the release zip — provenance-clean, no pip build). Same
# auto-stage + silent-fallback contract as fps_interp's RIFE binary:
# if the binary can't be staged or the upscale fails, the caller keeps
# the original frames so a render never aborts on this optional path.
# `-t` tile-size bounds GPU memory so the SR stage can't spill.

_ESRGAN_BIN_ENV = "NEXUS_VIDEO_LTX23_ESRGAN_BIN"
_ESRGAN_AUTOSTAGE_ENV = "NEXUS_VIDEO_LTX23_ESRGAN_AUTOSTAGE"
_ESRGAN_URL_ENV = "NEXUS_VIDEO_LTX23_ESRGAN_URL"
_ESRGAN_MODEL_ENV = "NEXUS_VIDEO_LTX23_ESRGAN_MODEL"
_ESRGAN_TILE_ENV = "NEXUS_VIDEO_LTX23_ESRGAN_TILE"

_ESRGAN_TAG = "v0.2.0"
_ESRGAN_BASE = (
    "https://github.com/xinntao/Real-ESRGAN-ncnn-vulkan/releases/download/"
    f"{_ESRGAN_TAG}/realesrgan-ncnn-vulkan-{_ESRGAN_TAG}"
)
_ESRGAN_ASSET = {
    "win": f"{_ESRGAN_BASE}-windows.zip",
    "linux": f"{_ESRGAN_BASE}-ubuntu.zip",
    "darwin": f"{_ESRGAN_BASE}-macos.zip",
}
# Photoreal general model bundled in the release; fixed 4× — we
# super-sample then downscale to the exact target for a sharp result.
_DEFAULT_MODEL = "realesrgan-x4plus"
_MODEL_SCALE = 4
# Conservative default tile so the SR stage never spills dedicated VRAM
# (operator can raise via env once headroom is known). 0 = ncnn auto.
_DEFAULT_TILE = "200"


def _coerce_bool(raw: str | None, default: bool) -> bool:
    if raw is None or raw == "":
        return default
    return raw.strip().lower() in ("1", "true", "yes", "on")


def _platform_url() -> str | None:
    override = os.environ.get(_ESRGAN_URL_ENV, "").strip()
    if override:
        return override
    p = sys.platform
    if p.startswith("win"):
        return _ESRGAN_ASSET["win"]
    if p.startswith("linux"):
        return _ESRGAN_ASSET["linux"]
    if p == "darwin":
        return _ESRGAN_ASSET["darwin"]
    return None


def _stage_root() -> Path:
    host = os.environ.get("NEXUS_HOST_DATA_DIR", "").strip()
    base = Path(host) if host else Path(tempfile.gettempdir())
    return base / "models" / "xinntao" / "realesrgan-ncnn-vulkan"


def _find_binary(root: Path) -> Path | None:
    for name in ("realesrgan-ncnn-vulkan.exe", "realesrgan-ncnn-vulkan"):
        hits = sorted(root.rglob(name))
        if hits:
            return hits[0]
    return None


def _find_models_dir(bin_path: Path) -> Path | None:
    base = bin_path.parent
    preferred = base / "models"
    if preferred.is_dir():
        return preferred
    # Fall back to whatever dir holds the .param files.
    for p in sorted(base.rglob("*.param")):
        return p.parent
    return None


def _log(logger: object, **fields: object) -> None:
    if logger is None:
        return
    try:
        logger.info("ltxv097.esrgan_autostage", **fields)  # type: ignore[attr-defined]
    except Exception:  # noqa: BLE001
        pass


def _download(url: str, dest: Path) -> bool:
    import urllib.request

    tmp = dest.parent / (dest.name + ".part")
    try:
        dest.parent.mkdir(parents=True, exist_ok=True)
        with urllib.request.urlopen(url, timeout=180) as resp:  # noqa: S310
            tmp.write_bytes(resp.read())
        tmp.replace(dest)
        return True
    except Exception:  # noqa: BLE001
        try:
            tmp.unlink()
        except OSError:
            pass
        return False


def _autostage_binary(logger: object = None) -> Path | None:
    root = _stage_root()
    existing = _find_binary(root)
    if existing is not None:
        return existing
    if not _coerce_bool(os.environ.get(_ESRGAN_AUTOSTAGE_ENV), True):
        return None
    url = _platform_url()
    if url is None:
        return None
    zip_path = root / f"realesrgan-ncnn-vulkan-{_ESRGAN_TAG}.zip"
    if not _download(url, zip_path):
        _log(logger, ok=False, stage="download", url=url, root=str(root))
        return None
    try:
        with zipfile.ZipFile(zip_path) as zf:
            zf.extractall(root)
    except Exception:  # noqa: BLE001
        _log(logger, ok=False, stage="extract", url=url, root=str(root))
        return None
    finally:
        try:
            zip_path.unlink()
        except OSError:
            pass
    found = _find_binary(root)
    if found is not None:
        try:
            found.chmod(0o755)
        except OSError:
            pass
    _log(logger, ok=found is not None, stage="ready", url=url, root=str(root))
    return found


def _resolve_binary(
    logger: object = None,
) -> tuple[Path, Path] | None:
    explicit = os.environ.get(_ESRGAN_BIN_ENV, "").strip()
    if explicit:
        p = Path(explicit)
        if not p.is_file():
            return None
        models = _find_models_dir(p)
        return (p, models) if models is not None else None
    binary = _autostage_binary(logger)
    if binary is None:
        return None
    models = _find_models_dir(binary)
    if models is None:
        return None
    return binary, models


def try_upscale(
    src: Path,
    dst: Path,
    target_w: int,
    target_h: int,
    logger: object = None,
) -> bool:
    """Real-ESRGAN super-resolve `src` then resize to exactly
    (target_w, target_h), preserving the source frame rate. Returns
    False (caller keeps the original) on any failure."""
    resolved = _resolve_binary(logger)
    if resolved is None:
        return False
    bin_path, models_dir = resolved
    model = os.environ.get(_ESRGAN_MODEL_ENV, "").strip() or _DEFAULT_MODEL
    tile = os.environ.get(_ESRGAN_TILE_ENV, "").strip() or _DEFAULT_TILE
    try:
        import ffmpeg  # type: ignore

        probe = ffmpeg.probe(str(src))
        vstream = next(
            (s for s in probe.get("streams", []) if s.get("codec_type") == "video"),
            None,
        )
        if vstream is None:
            return False
        num, den = (vstream.get("r_frame_rate") or "0/1").split("/")
        src_fps = (float(num) / float(den or "1")) if float(den or "1") else 0.0
        if src_fps <= 0:
            src_fps = 24.0

        with tempfile.TemporaryDirectory() as td:
            indir = Path(td) / "in"
            outdir = Path(td) / "out"
            indir.mkdir()
            outdir.mkdir()
            (
                ffmpeg.input(str(src))
                .output(str(indir / "%08d.png"), loglevel="error")
                .overwrite_output()
                .run()
            )
            if not any(indir.glob("*.png")):
                return False
            proc = subprocess.run(  # noqa: S603
                [
                    str(bin_path),
                    "-i",
                    str(indir),
                    "-o",
                    str(outdir),
                    "-n",
                    model,
                    "-s",
                    str(_MODEL_SCALE),
                    "-m",
                    str(models_dir),
                    "-t",
                    tile,
                    "-f",
                    "png",
                ],
                capture_output=True,
                timeout=3600,
            )
            if proc.returncode != 0:
                return False
            if not any(outdir.glob("*.png")):
                return False
            dst.parent.mkdir(parents=True, exist_ok=True)
            (
                ffmpeg.input(str(outdir / "%08d.png"), framerate=src_fps)
                .filter("scale", target_w, target_h, flags="lanczos")
                .output(
                    str(dst),
                    vcodec="libx264",
                    pix_fmt="yuv420p",
                    movflags="+faststart",
                    loglevel="error",
                )
                .overwrite_output()
                .run()
            )
        return dst.is_file()
    except Exception:  # noqa: BLE001
        return False
