#!/usr/bin/env python3
"""Spec 037 Phase C — build the packaged worker asset.

Produces `extensions/builtin/local-llm/assets/local-llm-completions-v<VER>.zip`
containing the runtime worker source the spec-032 install pipeline
extracts to `<install_root>/`. Writes the real `sha256` + `size` back
into `backends/llamacpp/completions_versions.yaml`, replacing the
placeholder zeros.

Archive layout (mirrors the extension subtree the worker_entrypoint
path expects):

    worker/                  -- spec-032 `uv sync` target
        pyproject.toml
        main.py
        state.py
        __init__.py
        backends/
        chat/
        methods/
        models/
        operators/
        rag/
    backends/
        llamacpp/
            completions_worker.py  -- worker_entrypoint per manifest.yaml

Cross-platform: pure stdlib. Invoke as `python build-completions-asset.py`.
"""
from __future__ import annotations

import argparse
import hashlib
import re
import shutil
import sys
import zipfile
from pathlib import Path

DEFAULT_VERSION = "0.1.0"
RELEASE_ID = "v0_1_0"

# Files in the worker tree that MUST NOT ship in the runtime archive.
_EXCLUDE_DIR_NAMES = {"__pycache__", ".pytest_cache", ".mypy_cache", ".ruff_cache"}
_EXCLUDE_SUFFIXES = {".pyc", ".pyo"}


def _iter_files(root: Path):
    for path in sorted(root.rglob("*")):
        if not path.is_file():
            continue
        if any(part in _EXCLUDE_DIR_NAMES for part in path.parts):
            continue
        if path.suffix in _EXCLUDE_SUFFIXES:
            continue
        yield path


def _add_tree(zf: zipfile.ZipFile, src_root: Path, dest_prefix: str) -> int:
    count = 0
    for path in _iter_files(src_root):
        rel = path.relative_to(src_root).as_posix()
        arcname = f"{dest_prefix}/{rel}" if dest_prefix else rel
        zf.write(path, arcname)
        count += 1
    return count


def build_archive(ext_root: Path, version: str = DEFAULT_VERSION) -> Path:
    assets_dir = ext_root / "assets"
    assets_dir.mkdir(exist_ok=True)
    archive_path = assets_dir / f"local-llm-completions-v{version.replace('.', '_')}.zip"
    if archive_path.exists():
        archive_path.unlink()

    worker_root = ext_root / "worker"
    completions_worker = ext_root / "backends" / "llamacpp" / "completions_worker.py"
    if not worker_root.is_dir():
        raise SystemExit(f"missing worker tree: {worker_root}")
    if not completions_worker.is_file():
        raise SystemExit(f"missing completions worker: {completions_worker}")

    with zipfile.ZipFile(archive_path, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        count = _add_tree(zf, worker_root, "worker")
        zf.write(completions_worker, "backends/llamacpp/completions_worker.py")
        count += 1
    print(f"[build-asset] wrote {archive_path} ({count} files)")
    return archive_path


def sha256_of(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as fh:
        for chunk in iter(lambda: fh.read(1 << 16), b""):
            h.update(chunk)
    return h.hexdigest()


_PLACEHOLDER_SHA = "0" * 64


def patch_versions_yaml(yaml_path: Path, sha: str, size: int) -> int:
    text = yaml_path.read_text(encoding="utf-8")
    new = re.sub(
        r'sha256:\s*"' + _PLACEHOLDER_SHA + r'"',
        f'sha256: "{sha}"',
        text,
    )
    new = re.sub(r"\bsize:\s*0\b", f"size: {size}", new)
    if new == text:
        print(f"[build-asset] no placeholder hits in {yaml_path} — already patched?")
        return 0
    yaml_path.write_text(new, encoding="utf-8")
    return new.count(f'sha256: "{sha}"')


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--ext-root",
        type=Path,
        default=Path(__file__).resolve().parents[1],
        help="extension root (defaults to local-llm/)",
    )
    parser.add_argument("--version", default=DEFAULT_VERSION)
    parser.add_argument(
        "--no-patch",
        action="store_true",
        help="skip rewriting completions_versions.yaml; only emit the archive",
    )
    args = parser.parse_args(argv)

    ext_root = args.ext_root.resolve()
    if not (ext_root / "manifest.yaml").is_file():
        raise SystemExit(f"not an extension root (no manifest.yaml): {ext_root}")

    archive = build_archive(ext_root, args.version)
    sha = sha256_of(archive)
    size = archive.stat().st_size
    print(f"[build-asset] sha256={sha}")
    print(f"[build-asset] size={size}")

    if args.no_patch:
        return 0
    yaml_path = ext_root / "backends" / "llamacpp" / "completions_versions.yaml"
    if not yaml_path.is_file():
        raise SystemExit(f"missing versions manifest: {yaml_path}")
    patched = patch_versions_yaml(yaml_path, sha, size)
    print(f"[build-asset] patched {patched} sha256 entries in {yaml_path.name}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
