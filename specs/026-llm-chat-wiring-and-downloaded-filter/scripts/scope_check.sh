#!/usr/bin/env bash
set -euo pipefail

BASE="${1:-origin/main}"
ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

if ! git rev-parse --verify "$BASE" >/dev/null 2>&1; then
  BASE="main"
fi
MERGE_BASE="$(git merge-base HEAD "$BASE")"

ALLOW='^(specs/026-llm-chat-wiring-and-downloaded-filter/|apps/web/src/(routes\.tsx$|models/|services/model_store(\.|_)|views/models-search/|views/models/)|apps/web/tests/(a11y|smoke)/|apps/web/playwright\.config\.ts$|crates/nexus-(api|models-store|backend-runtimes|core|huggingface)/|extensions/builtin/local-llm/|Cargo\.lock$|CLAUDE\.md$)'

CHANGED="$(git diff --name-only "$MERGE_BASE"...HEAD)"
if [[ -z "$CHANGED" ]]; then
  echo "scope_check: no files changed against $BASE."
  exit 0
fi

VIOLATIONS="$(printf '%s\n' "$CHANGED" | grep -vE "$ALLOW" || true)"
if [[ -n "$VIOLATIONS" ]]; then
  echo "SCOPE VIOLATION:" >&2
  printf '  %s\n' $VIOLATIONS >&2
  exit 1
fi
echo "scope_check: OK ($(printf '%s\n' "$CHANGED" | wc -l | tr -d ' ') files)"
