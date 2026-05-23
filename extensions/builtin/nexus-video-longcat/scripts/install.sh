#!/usr/bin/env bash
# Headless installer wrapper for nexus-video-longcat.
#
# Drives the full install flow (uv sync + weight download + vendor
# source-file fetch) from a plain bash shell. Cross-platform pair:
# `scripts/install.sh` for POSIX, `scripts/install.ps1` for Windows.
#
# Usage:
#   ./scripts/install.sh --host-data-dir /opt/nexus_host_data
#   ./scripts/install.sh --profile rtx50-fp8 --host-data-dir /opt/nexus_host_data
#   ./scripts/install.sh --profile fake --host-data-dir /tmp/nexus_host_data --skip-vendor
#
# Forwards all remaining args to `longcat_video_worker.headless_install`.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
EXT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
WORKER_DIR="$EXT_DIR/worker"

if ! command -v uv >/dev/null 2>&1; then
  echo "error: uv not found on PATH" >&2
  echo "install uv: https://docs.astral.sh/uv/getting-started/installation/" >&2
  exit 127
fi

cd "$WORKER_DIR"

# The headless CLI runs `uv sync` itself when --skip-uv-sync is absent, but we
# kick off a quick `uv sync --no-dev` here to make sure the package itself is
# importable before we run it as a module. Avoids the chicken-and-egg case
# where the CLI module cannot be loaded because the worker package was never
# installed into the venv.
echo "[install.sh] bootstrapping worker package via uv sync (no extras)" >&2
uv sync --no-dev >&2

echo "[install.sh] dispatching to longcat_video_worker.headless_install" >&2
exec uv run python -m longcat_video_worker.headless_install "$@"
