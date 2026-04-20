#!/usr/bin/env bash
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

TARGETS=(
  "crates/nexus-api/src/handlers/extensions_local_llm/chat.rs"
  "crates/nexus-api/src/handlers/extensions_local_llm/inference.rs"
)

PATTERN='(/home/[A-Za-z]|/Users/[A-Za-z]|[A-Z]:\\\\[A-Za-z]|"/tmp/)'

HITS=0
for f in "${TARGETS[@]}"; do
  if [[ ! -f "$f" ]]; then
    continue
  fi
  FOUND="$(grep -nE "$PATTERN" "$f" || true)"
  if [[ -n "$FOUND" ]]; then
    echo "NFR-004 violation in $f:" >&2
    echo "$FOUND" >&2
    HITS=$((HITS+1))
  fi
done

if [[ $HITS -gt 0 ]]; then
  echo "no_path_leak_check: $HITS file(s) contain hardcoded absolute paths in error-format strings" >&2
  exit 1
fi
echo "no_path_leak_check: OK"
