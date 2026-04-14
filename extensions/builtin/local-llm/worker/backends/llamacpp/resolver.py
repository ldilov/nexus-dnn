"""Version manifest and binary resolution for llama.cpp releases."""
from __future__ import annotations

import platform
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any


@dataclass(frozen=True)
class ResolvedAsset:
    """A fully resolved download target for a specific platform."""

    tag: str
    filename: str
    download_url: str
    checksum: str | None
    server_binary_name: str


def detect_platform_key() -> str:
    """Return the version-manifest key matching the current OS and arch."""
    os_name = sys.platform
    machine = platform.machine().lower()

    if os_name == "win32":
        prefix = "windows"
    elif os_name == "linux":
        prefix = "linux"
    elif os_name == "darwin":
        prefix = "macos"
    else:
        prefix = os_name

    if machine in ("x86_64", "amd64"):
        arch = "x64"
    elif machine in ("aarch64", "arm64"):
        arch = "arm64"
    else:
        arch = machine

    return f"{prefix}-{arch}-cpu"


def resolve_asset(manifest: dict[str, Any], variant: str | None = None) -> ResolvedAsset:
    """Pick the best release asset from a parsed versions.yaml manifest.

    Falls back to the preferred_version and auto-detected platform when
    no explicit variant is given.
    """
    llamacpp = manifest.get("llamacpp", manifest)
    preferred_tag = llamacpp.get("preferred_version", "")
    releases = llamacpp.get("releases", {})

    release = releases.get(preferred_tag)
    if release is None:
        available = list(releases.keys())
        raise LookupError(
            f"Preferred llama.cpp version '{preferred_tag}' not found in manifest. "
            f"Available: {available}"
        )

    platform_key = variant or detect_platform_key()
    assets = release.get("assets", {})
    asset = assets.get(platform_key)
    if asset is None:
        raise LookupError(
            f"No llama.cpp asset for platform '{platform_key}' in release '{preferred_tag}'. "
            f"Available: {list(assets.keys())}"
        )

    base_url = release.get("base_url", "")
    filename = asset.get("filename", "")
    binaries = release.get("binaries", {})
    server_name = binaries.get("server", "llama-server")

    if sys.platform == "win32":
        server_name = f"{server_name}.exe"

    return ResolvedAsset(
        tag=preferred_tag,
        filename=filename,
        download_url=f"{base_url}/{filename}",
        checksum=asset.get("checksum"),
        server_binary_name=server_name,
    )


def locate_server_binary(install_dir: Path, binary_name: str) -> Path:
    """Find the server binary inside an extracted release directory."""
    for candidate in install_dir.rglob(binary_name):
        if candidate.is_file():
            return candidate
    raise FileNotFoundError(
        f"Server binary '{binary_name}' not found under {install_dir}"
    )
