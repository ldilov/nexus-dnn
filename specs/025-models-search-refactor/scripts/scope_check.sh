#!/usr/bin/env bash
# Scope-diff CI gate (NFR-010, SC-010) — per contracts/frontend-loader.md §9.
#
# Fails CI if the branch diff touches any file outside the allow-listed scope
# for spec 025 (models-search-refactor). Keeps merge hygiene tight: every line
# changed must either live inside this spec's tree, inside the universal
# model-store services/view, or inside the Rust crates that implement it.
#
# Run:   bash specs/025-models-search-refactor/scripts/scope_check.sh [base-ref]
# Default base-ref is origin/main. Pass `main` locally if origin is stale.
# Exit:  0 if clean, non-zero on any out-of-scope file.
set -euo pipefail

BASE="${1:-origin/main}"
ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

# Resolve the merge-base so we only inspect files actually changed on this branch.
if ! git rev-parse --verify "$BASE" >/dev/null 2>&1; then
  echo "scope_check: base ref \`$BASE\` not found — falling back to 'main'" >&2
  BASE="main"
fi

MERGE_BASE="$(git merge-base HEAD "$BASE")"

# Allow-list — anchored regex; anything outside this pattern fails the gate.
# Keep in lockstep with contracts/frontend-loader.md §9.
ALLOW='^(specs/025-models-search-refactor/|apps/web/src/services/model_store(\.|_)|apps/web/src/views/models-search/|apps/web/src/routes\.tsx$|apps/web/src/constants/feature_flags\.ts$|apps/web/src/models/|apps/web/tests/a11y/models-search[._a-z]+\.spec\.ts$|apps/web/playwright\.config\.ts$|crates/nexus-(api|models-store|huggingface|storage|core)/|migrations/01[34]_model_store_[a-z_]+\.sql$|Cargo\.lock$|README\.md$|CLAUDE\.md$)'

CHANGED="$(git diff --name-only "$MERGE_BASE"...HEAD)"

if [[ -z "$CHANGED" ]]; then
  echo "scope_check: no files changed against $BASE — nothing to check."
  exit 0
fi

VIOLATIONS="$(printf '%s\n' "$CHANGED" | grep -vE "$ALLOW" || true)"

if [[ -n "$VIOLATIONS" ]]; then
  echo "SCOPE VIOLATION — files outside allow-list modified:" >&2
  printf '  %s\n' $VIOLATIONS >&2
  echo >&2
  echo "Allow-list (see contracts/frontend-loader.md §9):" >&2
  echo "  $ALLOW" >&2
  exit 1
fi

echo "scope_check: OK ($(printf '%s\n' "$CHANGED" | wc -l | tr -d ' ') files, all in scope)"
exit 0
