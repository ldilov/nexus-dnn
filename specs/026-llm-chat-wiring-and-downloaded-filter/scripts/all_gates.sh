#!/usr/bin/env bash
set -euo pipefail

BASE="${1:-main}"
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "=== spec-026 gate: scope_check ==="
bash "$HERE/scope_check.sh" "$BASE"

echo "=== spec-026 gate: no_comments_check ==="
bash "$HERE/no_comments_check.sh"

echo "=== spec-026 gate: no_path_leak_check ==="
bash "$HERE/no_path_leak_check.sh"

echo
echo "all_gates: OK"
