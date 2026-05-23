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

# Detect whether the run targets the `fake` profile. fake skips torch +
# diffusers entirely so we don't waste install bandwidth pulling cu128
# wheels. Any other profile gets the full `diffusers` extra.
UV_RUN_FLAGS=()
EXTRA_DIFFUSERS=1
for arg in "$@"; do
  case "$arg" in
    --profile=fake|fake) EXTRA_DIFFUSERS=0 ;;
  esac
done
prev=""
for arg in "$@"; do
  if [[ "$prev" == "--profile" && "$arg" == "fake" ]]; then
    EXTRA_DIFFUSERS=0
  fi
  prev="$arg"
done
if [ "$EXTRA_DIFFUSERS" = "1" ]; then
  UV_RUN_FLAGS+=("--extra" "diffusers")
fi

# `uv run` auto-syncs the project before executing the command, so we don't
# need a separate bootstrap step. Passing --extra here ensures torch + the
# diffusers stack lands in the venv before the CLI starts.
echo "[install.sh] dispatching: uv run ${UV_RUN_FLAGS[*]} python -m longcat_video_worker.headless_install $*" >&2
exec uv run "${UV_RUN_FLAGS[@]}" python -m longcat_video_worker.headless_install "$@"
