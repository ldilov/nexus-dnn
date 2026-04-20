#!/usr/bin/env bash
# SC-003 verification gate (C3 remediation).
#
# Ensures no hardcoded backend terminology leaks into the universal search/detail handlers.
# The only permitted adapter-registration call site lives in the host bootstrap
# (crates/nexus-core/src/bootstrap/*), which wires LlamaCppAdapter into the
# CapabilityRegistry. Everywhere else, search.rs and detail.rs must stay backend-agnostic.
#
# Run:   bash specs/025-models-search-refactor/scripts/sc003_grep.sh
# Exit:  0 if clean, non-zero if a regression is found.
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

TARGETS=(
  "crates/nexus-api/src/handlers/model_store/search.rs"
  "crates/nexus-api/src/handlers/model_store/detail.rs"
)

# NOTE: -F would be safer, but we also need to catch the dotted literal `llama.cpp`.
#       Using `rg` with plain patterns and case-sensitivity on.
PATTERNS=(
  '"gguf"'
  '"ggml"'
  'llama\.cpp'
)

EXIT=0
for target in "${TARGETS[@]}"; do
  if [[ ! -f "$target" ]]; then
    echo "sc003_grep: missing target $target" >&2
    EXIT=1
    continue
  fi
  for pat in "${PATTERNS[@]}"; do
    if rg -n --no-heading -e "$pat" "$target" >/dev/null 2>&1; then
      echo "SC-003 VIOLATION: pattern \`$pat\` found in $target" >&2
      rg -n --no-heading -e "$pat" "$target" >&2 || true
      EXIT=1
    fi
  done
done

if [[ "$EXIT" -eq 0 ]]; then
  echo "sc003_grep: OK (no hardcoded backend references in universal handlers)"
fi

exit "$EXIT"
