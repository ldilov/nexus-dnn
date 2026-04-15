#!/usr/bin/env bash
#
# verify-spec-011.sh — assert the zero-extension-deps invariant for
# nexus-backend-runtimes (spec 011 FR-046, spec 012 FR-121).
#
# Exits 0 on clean tree, non-zero on any regression.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CARGO_TOML="${REPO_ROOT}/crates/nexus-backend-runtimes/Cargo.toml"
FORBIDDEN_RE='^(extension-|local-llm|nexus-extension|nexus-local-llm)'

fail=0

echo "[INFO] Verifying zero-extension-deps invariant for nexus-backend-runtimes"

# Check 1: direct deps listed in Cargo.toml
if grep -E "^(extension-|local-llm|nexus-extension|nexus-local-llm)[[:space:]]*=" "${CARGO_TOML}" >/dev/null 2>&1; then
    echo "[FAIL] Direct dependency on an extension crate found in Cargo.toml:"
    grep -nE "^(extension-|local-llm|nexus-extension|nexus-local-llm)[[:space:]]*=" "${CARGO_TOML}" || true
    fail=1
else
    echo "[PASS] No direct extension-crate dependencies in Cargo.toml"
fi

# Check 2: transitive deps via cargo metadata
if ! command -v jq >/dev/null 2>&1; then
    echo "[FAIL] jq not installed — required for transitive dep check"
    exit 1
fi

transitive="$(cd "${REPO_ROOT}" && cargo metadata --no-deps --format-version=1 2>/dev/null \
    | jq -r '.packages[] | select(.name=="nexus-backend-runtimes") | .dependencies[].name' \
    | grep -E "${FORBIDDEN_RE}" || true)"

if [[ -n "${transitive}" ]]; then
    echo "[FAIL] nexus-backend-runtimes depends on an extension crate (via cargo metadata):"
    echo "${transitive}" | sed 's/^/    /'
    fail=1
else
    echo "[PASS] No extension-crate dependencies reported by cargo metadata"
fi

# Check 3: workspace compiles
echo "[INFO] Running cargo check --workspace --quiet"
if (cd "${REPO_ROOT}" && cargo check --workspace --quiet); then
    echo "[PASS] cargo check --workspace succeeded"
else
    echo "[FAIL] cargo check --workspace failed"
    fail=1
fi

if [[ "${fail}" -ne 0 ]]; then
    echo "[FAIL] verify-spec-011 found regressions"
    exit 1
fi

echo "[PASS] verify-spec-011 clean"
exit 0
