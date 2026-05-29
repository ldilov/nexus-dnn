#!/usr/bin/env bash
# Headless installer wrapper for nexus-video-svi2-pro.
#
# Drives the full install flow (uv sync + weight download) from a plain bash shell.
# Cross-platform pair: `scripts/install.sh` for POSIX, `scripts/install.ps1` for Windows.
#
# Usage:
#   ./scripts/install.sh --profile rtx50-fp8 --dest ./models
#   ./scripts/install.sh --profile rtx50-fp8
#   ./scripts/install.sh --help
#
# Forwards all remaining args to `svi2_video_worker.headless_install`.

set -euo pipefail

show_help() {
  cat <<'EOF'
nexus-video-svi2-pro installer

Usage:
  ./scripts/install.sh [OPTIONS]

Options:
  --profile PROFILE         Render profile (default: rtx50-fp8)
  --dest DIR                Models destination directory (default: ./models)
  --help, -h                Show this help and exit

Environment variables:
  NEXUS_MODELS_DIR          Default models destination (overridden by --dest)

Examples:
  ./scripts/install.sh --profile rtx50-fp8 --dest /opt/nexus_models
  ./scripts/install.sh --dest /mnt/models
EOF
  exit 0
}

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
EXT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
WORKER_DIR="$EXT_DIR/worker"

# Parse early exit flags
for arg in "$@"; do
  case "$arg" in
    --help|-h)
      show_help
      ;;
  esac
done

if ! command -v uv >/dev/null 2>&1; then
  echo "error: uv not found on PATH" >&2
  echo "install uv: https://docs.astral.sh/uv/getting-started/installation/" >&2
  exit 127
fi

# Ensure the vendored flash_attn wheels (git-LFS) are real binaries, not
# pointers — the `flash` extra resolves to ../binaries/*.whl and uv sync
# fails on a fresh clone otherwise. Best-effort; skipped if not in a git repo.
if command -v git >/dev/null 2>&1 && git -C "$EXT_DIR" rev-parse --git-dir >/dev/null 2>&1; then
  git -C "$EXT_DIR" lfs pull --include="extensions/builtin/svi2-pro/binaries/*" 2>/dev/null || true
fi

cd "$WORKER_DIR"

# `uv run` auto-syncs the project before executing the command, so we don't
# need a separate bootstrap step. Always include diffusers + flash extras.
echo "[install.sh] dispatching: uv run --extra diffusers --extra flash python -m svi2_video_worker.headless_install $*" >&2
exec uv run --extra diffusers --extra flash python -m svi2_video_worker.headless_install "$@"
