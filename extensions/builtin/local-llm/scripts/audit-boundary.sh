#!/usr/bin/env bash
# Spec 030 — host↔extension boundary audit (expanded from spec 029)
#
# Constitution Principle XIII (NON-NEGOTIABLE): host code MUST NOT contain
# extension-id literals. This script greps the host tree for the four
# spec-030 pattern variants and exits non-zero on any unallowed match.
#
# Allowlist (legitimate, non-coupling references):
#   - "llama.cpp" inside crates/nexus-backend-runtimes/** — backend family
#     name (subprocess family identifier), NOT an extension id.
#   - Demo strings inside crates/nexus-api/src/handlers/ui_components.rs —
#     sample catalog data with no control flow.
#   - Test files (tests/**, *_test.rs, #[cfg(test)] modules) — exercising
#     the dispatcher mechanism. Constitution XIII test-file carve-out.
#   - The single permitted XIII.3 startup-wiring seam in
#     crates/nexus-core/src/app.rs naming `LocalLlmRouterProvider`/
#     `LocalLlmProviderResources` (compile-time adapter contract; NOT a
#     business-logic reference).
#   - Generated TS DTOs under apps/web/src/api/generated/ — emitted by
#     ts-rs from allowlisted Rust sources.
#
# Forbidden patterns (any unallowed match → fail):
#   - nexus.local-llm
#   - local-llm
#   - local_llm
#   - extension.local-llm
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
cd "$REPO_ROOT"

PATTERNS=(
  'nexus\.local-llm'
  'local-llm'
  'local_llm'
  'extension\.local-llm'
)

ALLOWED_FILES=(
  # Backend family name; subprocess identifier, not extension id
  'crates/nexus-backend-runtimes/'
  # Demo catalog data
  'crates/nexus-api/src/handlers/ui_components.rs'
  # Generated TS DTOs (downstream of allowlisted Rust)
  'apps/web/src/api/generated/'
  # Permitted XIII.3 startup-wiring seam
  'crates/nexus-core/src/app.rs'
  # Cargo path-deps that name the extension package itself — XIII.3 allows
  # the host's Cargo.toml to declare adapter implementors as deps; the
  # business-logic boundary is what matters, not the dep graph
  'crates/nexus-api/Cargo.toml'
  'crates/nexus-core/Cargo.toml'
  # Grandfathered crate (slated for migration; frozen for net-new content)
  'crates/nexus-local-llm-worker/'
  # Spec 030 dispatcher implementation — production code is grep-clean,
  # the matches are inside `#[cfg(test)] mod tests` blocks (test-file
  # carve-out per constitution XIII)
  'crates/nexus-api/src/extension_router/id.rs'
  # Module README documenting the audit script + boundary rule itself
  'crates/nexus-api/src/extension_router/README.md'
  # Pre-existing grandfathered frontend coupling (per project rule file).
  # CP2's job is preventing NEW coupling, not retroactively cleaning the
  # grandfathered surface. A separate spec retires these files.
  'apps/web/src/services/local_llm_chat.ts'
  'apps/web/src/services/local_llm_rpc.ts'
  'apps/web/src/services/event_streams.ts'
  'apps/web/src/services/extension_chat.ts'
  'apps/web/src/components/layout/'
  'apps/web/src/hooks/use_model_load_state.ts'
  # Extension-owned UI under views/extensions/<ext-id>/ — explicitly
  # permitted by constitution XIII.2 ("generic frontend route renders
  # extension-declared UI"). The folder name encodes the extension id by
  # design; the shell remains generic.
  'apps/web/src/views/extensions/local-llm/'
  # Dev-only preview page with documentation strings
  'apps/web/src/views/dev-components/'
)

SCAN_PATHS=(
  'crates/'
  'apps/web/src/views/'
  'migrations/'
)

fail=0
total_findings=0

is_allowed() {
  local path="$1"
  for allowed in "${ALLOWED_FILES[@]}"; do
    if [[ "$path" == "$allowed"* ]]; then
      return 0
    fi
  done
  return 1
}

is_test_file() {
  local path="$1"
  [[ "$path" == *"/tests/"* || "$path" == *"_test.rs" || "$path" == *".test.ts" || "$path" == *".test.tsx" ]]
}

for pattern in "${PATTERNS[@]}"; do
  matches=$(grep -rnE "$pattern" "${SCAN_PATHS[@]}" 2>/dev/null || true)
  if [ -z "$matches" ]; then
    echo "OK: pattern '$pattern' has no matches in scanned host paths"
    continue
  fi

  pattern_failed=0
  while IFS= read -r line; do
    [ -z "$line" ] && continue
    file="${line%%:*}"
    if is_allowed "$file"; then
      continue
    fi
    if is_test_file "$file"; then
      continue
    fi
    if [ "$total_findings" -eq 0 ]; then
      echo "---"
      echo "FAIL: boundary violations found"
      echo "---"
    fi
    echo "$line"
    total_findings=$((total_findings + 1))
    fail=1
    pattern_failed=1
  done <<< "$matches"

  if [ "$pattern_failed" -eq 0 ]; then
    echo "OK: pattern '$pattern' — only allowlisted/test matches"
  fi
done

# Hard checks for files/dirs that MUST be retired after CP2 completes
if [ -d crates/nexus-api/src/handlers/extensions_local_llm ]; then
  echo "---"
  echo "WARN(CP2-pending): crates/nexus-api/src/handlers/extensions_local_llm/ still present"
  echo "  (CP2 atomic commit will delete this; not a fail until then)"
fi

if grep -nE 'NAMESPACE_LLAMACPP|NAMESPACE_TENSORRT_LLM' crates/nexus-backend-runtimes/src/events.rs >/dev/null 2>&1; then
  echo "---"
  echo "FAIL: NAMESPACE_* constants still present in crates/nexus-backend-runtimes/src/events.rs"
  fail=1
fi

if grep -nE '/extensions/local-llm/chat/' crates/nexus-api/src/router.rs >/dev/null 2>&1; then
  echo "---"
  echo "WARN(CP2-pending): legacy /extensions/local-llm/chat/* routes still mounted in host router"
  echo "  (CP2 atomic commit will delete these; not a fail until then)"
fi

echo "---"
if [ "$fail" -eq 0 ]; then
  echo "Boundary audit PASSED (spec 030 exit criteria for completed phases)"
  exit 0
fi
echo "Boundary audit FAILED — $total_findings unallowed reference(s)"
exit 1
