#!/usr/bin/env bash
# Boundary audit per .claude/rules/host-extension-boundary.md.
# Fails CI if any LTX-specific literal appears in host paths.
set -euo pipefail

PATTERNS=(
  "nexus.video.ltx23"
  "nexus-video-ltx23"
  "ltx23"
  "LTX-2.3"
  "rtx50-nvfp4"
  "rtx40-fp8"
  "ext_nexus_video_ltx23__"
  "ltx_video_worker"
)

# Host scan paths. Subdirectories matching the extension's own subtree are excluded.
HOST_SCAN_PATHS=(
  "crates"
  "apps/web/src"
  "migrations"
)

# Allowed host locations (generated docs, OpenAPI aggregation output, this audit script):
HOST_ALLOWED_PATTERNS=(
  "apps/web/src/views/extensions"   # generic extension renderer — may name the gallery item
)

# Repo root inferred from script location.
REPO_ROOT="$(cd "$(dirname "$0")/../../../.." && pwd)"
cd "$REPO_ROOT"

VIOLATIONS=0

for path in "${HOST_SCAN_PATHS[@]}"; do
  [ -e "$path" ] || continue
  for pattern in "${PATTERNS[@]}"; do
    # Grep, excluding allowed sub-paths
    MATCHES=$(grep -RIn \
      --exclude-dir=node_modules \
      --exclude-dir=target \
      --exclude-dir=dist \
      --exclude-dir=.git \
      -- "$pattern" "$path" 2>/dev/null || true)

    if [ -z "$MATCHES" ]; then
      continue
    fi

    # Filter out lines under allowed sub-paths.
    FILTERED=""
    while IFS= read -r line; do
      keep=1
      for allowed in "${HOST_ALLOWED_PATTERNS[@]}"; do
        case "$line" in
          "$allowed"*) keep=0; break;;
          "./$allowed"*) keep=0; break;;
        esac
      done
      if [ "$keep" = "1" ]; then
        FILTERED="${FILTERED}${line}\n"
      fi
    done <<< "$MATCHES"

    if [ -n "$FILTERED" ]; then
      echo "Boundary violation: found '$pattern' in host path '$path':" >&2
      printf "%b" "$FILTERED" >&2
      VIOLATIONS=$((VIOLATIONS + 1))
    fi
  done
done

if [ "$VIOLATIONS" -gt 0 ]; then
  echo >&2
  echo "FAIL: $VIOLATIONS pattern(s) leaked into host scan paths." >&2
  echo "Move LTX-specific code into extensions/builtin/nexus-video-ltx23/." >&2
  exit 1
fi

echo "PASS: no LTX extension-specific literals found in host scan paths."
