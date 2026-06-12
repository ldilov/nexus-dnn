from __future__ import annotations

import os
import subprocess
import sys
import tempfile
import zipfile
from pathlib import Path

_RIFE_BIN_ENV = "NEXUS_VIDEO_LTX23_RIFE_BIN"
_RIFE_AUTOSTAGE_ENV = "NEXUS_VIDEO_LTX23_RIFE_AUTOSTAGE"
_RIFE_URL_ENV = "NEXUS_VIDEO_LTX23_RIFE_URL"

_RIFE_TAG = "20221029"
_RIFE_BASE = (
    f"https://github.com/nihui/rife-ncnn-vulkan/releases/download/{_RIFE_TAG}/"
    f"rife-ncnn-vulkan-{_RIFE_TAG}"
)
_RIFE_ASSET = {
    "win": f"{_RIFE_BASE}-windows.zip",
    "linux": f"{_RIFE_BASE}-ubuntu.zip",
    "darwin": f"{_RIFE_BASE}-macos.zip",
}


def _coerce_bool(raw: str | None, default: bool) -> bool:
    if raw is None or raw == "":
        return default
    return raw.strip().lower() in ("1", "true", "yes", "on")


def try_interpolate(
    src: Path,
    dst: Path,
    base_fps: int,
    target_fps: int,
    logger: object = None,
) -> bool:
    if target_fps <= base_fps:
        return False
    if _interpolate_via_rife_binary(src, dst, base_fps, target_fps, logger):
        return True
    return _interpolate_via_ffmpeg(src, dst, target_fps)


def _platform_rife_url() -> str | None:
    override = os.environ.get(_RIFE_URL_ENV, "").strip()
    if override:
        return override
    p = sys.platform
    if p.startswith("win"):
        return _RIFE_ASSET["win"]
    if p.startswith("linux"):
        return _RIFE_ASSET["linux"]
    if p == "darwin":
        return _RIFE_ASSET["darwin"]
    return None


def _stage_root() -> Path:
    host = os.environ.get("NEXUS_HOST_DATA_DIR", "").strip()
    base = Path(host) if host else Path(tempfile.gettempdir())
    return base / "models" / "nihui" / "rife-ncnn-vulkan"


def _find_binary(root: Path) -> Path | None:
    for name in ("rife-ncnn-vulkan.exe", "rife-ncnn-vulkan"):
        hits = sorted(root.rglob(name))
        if hits:
            return hits[0]
    return None


def _find_model_dir(bin_path: Path) -> Path | None:
    base = bin_path.parent
    preferred = base / "rife-v4.6"
    if preferred.is_dir():
        return preferred
    cands = sorted(d for d in base.glob("rife*") if d.is_dir())
    return cands[0] if cands else None


def _log(logger: object, **fields: object) -> None:
    if logger is None:
        return
    try:
        logger.info("ltxv097.rife_autostage", **fields)  # type: ignore[attr-defined]
    except Exception:  # noqa: BLE001
        pass


def _download(url: str, dest: Path) -> bool:
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


def _autostage_binary(logger: object = None) -> Path | None:
    root = _stage_root()
    existing = _find_binary(root)
    if existing is not None:
        return existing
    if not _coerce_bool(os.environ.get(_RIFE_AUTOSTAGE_ENV), True):
        return None
    url = _platform_rife_url()
    if url is None:
        return None
    zip_path = root / f"rife-ncnn-vulkan-{_RIFE_TAG}.zip"
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


def _resolve_rife_binary(
    logger: object = None,
) -> tuple[Path, Path] | None:
    explicit = os.environ.get(_RIFE_BIN_ENV, "").strip()
    if explicit:
        p = Path(explicit)
        if not p.is_file():
            return None
        model_dir = _find_model_dir(p)
        return (p, model_dir) if model_dir is not None else None
    binary = _autostage_binary(logger)
    if binary is None:
        return None
    model_dir = _find_model_dir(binary)
    if model_dir is None:
        return None
    return binary, model_dir


def _interpolate_via_rife_binary(
    src: Path,
    dst: Path,
    base_fps: int,
    target_fps: int,
    logger: object = None,
) -> bool:
    resolved = _resolve_rife_binary(logger)
    if resolved is None:
        return False
    bin_path, model_dir = resolved
    try:
        import ffmpeg  # type: ignore

        probe = ffmpeg.probe(str(src))
        has_video = any(
            s.get("codec_type") == "video" for s in probe.get("streams", [])
        )
        if not has_video:
            return False
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
            n_in = len(list(indir.glob("*.png")))
            if n_in < 2:
                return False
            n_out = max(2, round(n_in * target_fps / base_fps))
            proc = subprocess.run(  # noqa: S603
                [
                    str(bin_path),
                    "-i",
                    str(indir),
                    "-o",
                    str(outdir),
                    "-m",
                    str(model_dir),
                    "-n",
                    str(n_out),
                    "-f",
                    "%08d.png",
                ],
                capture_output=True,
                timeout=1800,
            )
            if proc.returncode != 0:
                return False
            if len(list(outdir.glob("*.png"))) < 2:
                return False
            dst.parent.mkdir(parents=True, exist_ok=True)
            (
                ffmpeg.input(str(outdir / "%08d.png"), framerate=target_fps)
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


def _interpolate_via_ffmpeg(src: Path, dst: Path, target_fps: int) -> bool:
    try:
        import ffmpeg  # type: ignore

        dst.parent.mkdir(parents=True, exist_ok=True)
        (
            ffmpeg.input(str(src))
            .filter(
                "minterpolate",
                fps=str(target_fps),
                mi_mode="mci",
                mc_mode="aobmc",
                me_mode="bidir",
                vsbmc="1",
            )
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
