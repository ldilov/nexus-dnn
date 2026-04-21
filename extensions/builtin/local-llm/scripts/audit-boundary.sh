#!/usr/bin/env bash
# Spec 029 — host↔extension boundary audit
# Extension-scoped tooling for spec-029. Exit non-zero on any finding.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
cd "$REPO_ROOT"

fail=0

# 1. No new host migration for spec 029
if ls migrations/ 2>/dev/null | grep -i -E 'chat|029' >/dev/null; then
  echo "FAIL: new host migration found under migrations/ for spec 029"
  ls migrations/ | grep -i -E 'chat|029'
  fail=1
else
  echo "OK: no spec-029 host migration"
fi

# 2. No spec-029 routes in host router.
#    Spec 029 routes live under the dotted extension prefix `nexus.local-llm`.
#    The legacy `/extensions/local-llm/chat/*` routes (single token) are
#    grandfathered in-memory endpoints used by `thread_list.tsx` — NOT spec-029.
if [ -f crates/nexus-api/src/router.rs ]; then
  if grep -nE 'nexus\.local-llm' crates/nexus-api/src/router.rs >/dev/null 2>&1; then
    echo "FAIL: spec-029 route leakage in crates/nexus-api/src/router.rs (nexus.local-llm prefix found)"
    grep -nE 'nexus\.local-llm' crates/nexus-api/src/router.rs
    fail=1
  else
    echo "OK: no spec-029 nexus.local-llm routes in host router"
  fi
fi

# 3. No new files under crates/nexus-local-llm-worker/ for spec 029
if [ -d crates/nexus-local-llm-worker ]; then
  if git diff --name-only main... 2>/dev/null | grep '^crates/nexus-local-llm-worker/' >/dev/null; then
    echo "FAIL: spec-029 branch touches grandfathered crate crates/nexus-local-llm-worker/"
    git diff --name-only main... | grep '^crates/nexus-local-llm-worker/'
    fail=1
  else
    echo "OK: grandfathered crate untouched on this branch"
  fi
fi

if [ "$fail" -eq 0 ]; then
  echo "---"
  echo "Boundary audit PASSED (spec 029)"
  exit 0
fi

echo "---"
echo "Boundary audit FAILED"
exit 1
