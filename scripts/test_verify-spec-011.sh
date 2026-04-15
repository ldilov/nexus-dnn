#!/usr/bin/env bash
#
# test_verify-spec-011.sh — harness that proves verify-spec-011.sh catches
# regressions. Mutates Cargo.toml, asserts non-zero exit, then reverts.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CARGO_TOML="${REPO_ROOT}/crates/nexus-backend-runtimes/Cargo.toml"
VERIFY="${REPO_ROOT}/scripts/verify-spec-011.sh"

cleanup() {
    (cd "${REPO_ROOT}" && git checkout -- "crates/nexus-backend-runtimes/Cargo.toml") >/dev/null 2>&1 || true
}
trap cleanup EXIT

echo "[STEP 1] verify on clean tree should exit 0"
if bash "${VERIFY}" >/dev/null 2>&1; then
    echo "    [OK] clean tree passes"
else
    echo "    [ERR] clean tree failed — check tree state before running harness"
    exit 1
fi

echo "[STEP 2] mutate Cargo.toml to add a fake extension dep"
printf '\nnexus-extension = { path = "../nexus-extension" }\n' >> "${CARGO_TOML}"

echo "[STEP 3] verify on mutated tree should exit non-zero"
if bash "${VERIFY}" >/dev/null 2>&1; then
    echo "    [ERR] mutated tree unexpectedly passed — verify script is broken"
    exit 1
else
    echo "    [OK] mutated tree correctly flagged"
fi

echo "[STEP 4] revert mutation"
cleanup
trap - EXIT

echo "[STEP 5] verify again on reverted tree should exit 0"
if bash "${VERIFY}" >/dev/null 2>&1; then
    echo "    [OK] reverted tree passes"
else
    echo "    [ERR] reverted tree failed — revert did not clean up"
    exit 1
fi

echo "[OK] verify script behaves correctly"
exit 0
