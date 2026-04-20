#!/usr/bin/env bash
set -euo pipefail
ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

TARGETS=(
  "crates/nexus-api/src/handlers/model_store/installed.rs"
  "crates/nexus-api/src/handlers/model_store/search.rs"
  "crates/nexus-models-store/src/downloads/install_map.rs"
  "apps/web/src/views/models-search/components/FilterBar.tsx"
  "apps/web/src/views/models-search/components/SkeletonGrid.tsx"
)

EXIT=0
for target in "${TARGETS[@]}"; do
  [[ -f "$target" ]] || continue
  if rg -n '^[[:space:]]*(//[^!/]|#[[:space:]]+[A-Z])' --pcre2 "$target" >/dev/null 2>&1; then
    echo "IV VIOLATION: inline rationale comment in $target" >&2
    rg -n '^[[:space:]]*(//[^!/]|#[[:space:]]+[A-Z])' --pcre2 "$target" >&2 || true
    EXIT=1
  fi
done

if [[ "$EXIT" -eq 0 ]]; then
  echo "no_comments_check: OK"
fi
exit "$EXIT"
