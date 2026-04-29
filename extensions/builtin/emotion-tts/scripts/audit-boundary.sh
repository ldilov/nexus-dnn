#!/usr/bin/env bash
# audit-boundary.sh — spec 031 FR-152 merge gate (Linux/CI parity of audit-boundary.ps1).

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../../../.." && pwd)"

FRAGMENTS=(
  "emotion_tts"
  "emotion-tts"
  "nexus.audio.emotiontts"
  "indextts"
  "IndexTTS"
  "IndexTeam/IndexTTS-2"
  "qwen0.6bemo4-merge"
)

AUDIT_ROOTS=(
  "crates"
  "apps/web/src"
  "migrations"
)

EXTENSION_ROOT="$REPO_ROOT/extensions/builtin/emotion-tts"
BACKENDS_VIEW="$REPO_ROOT/apps/web/src/views/backends"
BACKEND_RUNTIMES_VIEW="$REPO_ROOT/apps/web/src/views/backend-runtimes"

# Grandfathered test fixtures (see audit-boundary.ps1 for explanation).
GRANDFATHERED_FIXTURES=(
  "$REPO_ROOT/crates/nexus-backend-runtimes/src/generic/ids/runtime_id.rs"
  "$REPO_ROOT/crates/nexus-backend-runtimes/src/generic/leases/stdio_lease.rs"
  "$REPO_ROOT/crates/nexus-extension-deps/tests/boundary_test.rs"
  "$REPO_ROOT/crates/nexus-core/Cargo.toml"
  "$REPO_ROOT/crates/nexus-core/src/app.rs"
)

violations=0

for root in "${AUDIT_ROOTS[@]}"; do
  root_path="$REPO_ROOT/$root"
  [ -d "$root_path" ] || continue

  while IFS= read -r -d '' file; do
    case "$file" in
      "$EXTENSION_ROOT"/*)         continue ;;
      "$BACKENDS_VIEW"/*)          continue ;;
      "$BACKEND_RUNTIMES_VIEW"/*)  continue ;;
      */target/*|*/node_modules/*|*/dist/*) continue ;;
    esac

    skip_fixture=0
    for fixture in "${GRANDFATHERED_FIXTURES[@]}"; do
      [ "$file" = "$fixture" ] && { skip_fixture=1; break; }
    done
    [ "$skip_fixture" -eq 1 ] && continue

    for frag in "${FRAGMENTS[@]}"; do
      if grep -qF -- "$frag" "$file" 2>/dev/null; then
        rel="${file#$REPO_ROOT/}"
        printf '  [%s] %s\n' "$frag" "$rel" >&2
        violations=$((violations + 1))
      fi
    done
  done < <(find "$root_path" -type f -print0)
done

if [ "$violations" -gt 0 ]; then
  echo "BOUNDARY AUDIT FAILED ($violations hit(s))" >&2
  exit 1
fi

echo "BOUNDARY AUDIT PASSED (EmotionTTS)"
exit 0
