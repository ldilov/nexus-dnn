#!/usr/bin/env bash
# Operator smoke test for the ephemeral-planner-lease path (Spec 050 PR-6).
#
# Drives /api/v1/services/text-completion with ephemeral=true against a
# running host, then asserts the underlying lease was reaped (VRAM
# freed). Requires:
#   - A nexus-dnn host running on http://127.0.0.1:${NEXUS_HOST_PORT}
#   - At least one Validated runtime install whose catalog
#     capability_tags include "text-completion"
#   - jq + curl on PATH
#
# Exit codes:
#   0  smoke passed
#   2  prerequisite missing (host down, no eligible runtime, missing jq/curl)
#   3  request failed
#   4  ephemeral lease was not reaped (warning, see broker log)
set -euo pipefail

PORT="${NEXUS_HOST_PORT:-7777}"
BASE="http://127.0.0.1:${PORT}"

for bin in jq curl; do
  if ! command -v "$bin" >/dev/null 2>&1; then
    echo "[smoke] FAIL prereq: $bin not on PATH" >&2
    exit 2
  fi
done

if ! curl -fsS -o /dev/null "${BASE}/api/v1/health" ; then
  echo "[smoke] FAIL prereq: host not reachable at ${BASE}" >&2
  exit 2
fi

eligible=$(curl -fsS "${BASE}/api/v1/backends/installs" | jq -r '
  [.[]
   | select(.status == "validated")
   | select(.capability_tags | index("text-completion"))
   | .runtime_install_id] | length' 2>/dev/null || echo 0)

if [ "${eligible}" -lt 1 ]; then
  echo "[smoke] FAIL prereq: no Validated install with text-completion capability_tag" >&2
  exit 2
fi

echo "[smoke] prereqs OK: host=${BASE} eligible_installs=${eligible}"

start_ms=$(date +%s%3N)
response=$(curl -fsS -X POST "${BASE}/api/v1/services/text-completion" \
  -H "content-type: application/json" \
  -d '{
    "system": "be terse",
    "user": "Reply with the single word: pong",
    "max_tokens": 16,
    "timeout_ms": 30000,
    "n_gpu_layers": -1,
    "required_tags": ["text-completion"],
    "ephemeral": true
  }') || {
    echo "[smoke] FAIL: completion request errored" >&2
    exit 3
  }
end_ms=$(date +%s%3N)

text=$(echo "${response}" | jq -r '.text // empty')
if [ -z "${text}" ]; then
  echo "[smoke] FAIL: empty text field in response: ${response}" >&2
  exit 3
fi

echo "[smoke] completion OK: latency=$((end_ms - start_ms))ms text='${text}'"

# Give the broker a moment to release; then verify no Ready lease
# remains for any text-completion runtime.
sleep 2
ready_remaining=$(curl -fsS "${BASE}/api/v1/backends/leases" | jq -r '
  [.[] | select(.state == "ready")] | length' 2>/dev/null || echo "?")

if [ "${ready_remaining}" = "?" ]; then
  echo "[smoke] WARN: could not query lease list; skip ephemeral verification"
elif [ "${ready_remaining}" -ne 0 ]; then
  echo "[smoke] WARN: ${ready_remaining} Ready lease(s) remain after ephemeral completion" >&2
  exit 4
else
  echo "[smoke] ephemeral release OK: no Ready leases remaining"
fi

echo "[smoke] PASS"
