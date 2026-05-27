#!/usr/bin/env bash
# Operator smoke for longcat.video.plan.expand with use_llm=true.
#
# Spawns the fake-profile worker subprocess (NO GPU required) with
# NEXUS_HOST_PORT injected so plan_llm.default_lease_client() resolves
# to HttpLeaseClient and the planner round-trips through the host's
# /api/v1/services/text-completion broker.
#
# Asserts:
#   - JSON-RPC response arrives within wall-time budget
#   - response.compiler in {"llm", "llm_fallback_deterministic", "deterministic"}
#   - scenes[] length matches requested scene_count
#   - if compiler == "llm_fallback_deterministic" the script exits 0 with WARN
#     (LLM lease was unavailable mid-run; useful smoke signal but not fatal)
#
# Prereqs:
#   - host running on http://127.0.0.1:${NEXUS_HOST_PORT:-7777}
#   - at least one Validated runtime install with capability_tag "text-completion"
#   - longcat worker uv venv hydrated:  extensions/builtin/nexus-video-longcat/worker/.venv
#   - jq + curl on PATH
#
# Exit codes:
#   0  smoke passed (LLM ran OR graceful deterministic fallback)
#   2  prerequisite missing
#   3  worker subprocess died or RPC errored
#   4  response shape invalid

set -euo pipefail

PORT="${NEXUS_HOST_PORT:-7777}"
BASE="http://127.0.0.1:${PORT}"
WALL_BUDGET_S="${LONGCAT_PLAN_EXPAND_WALL_BUDGET_S:-60}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
EXT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
WORKER_DIR="${EXT_DIR}/worker"
VENV_PY="${WORKER_DIR}/.venv/bin/python"
if [ ! -x "${VENV_PY}" ] && [ -x "${WORKER_DIR}/.venv/Scripts/python.exe" ]; then
  VENV_PY="${WORKER_DIR}/.venv/Scripts/python.exe"
fi

for bin in jq curl; do
  if ! command -v "$bin" >/dev/null 2>&1; then
    echo "[smoke] FAIL prereq: $bin not on PATH" >&2
    exit 2
  fi
done

if [ ! -x "${VENV_PY}" ]; then
  echo "[smoke] FAIL prereq: worker venv python not found at ${VENV_PY}" >&2
  echo "[smoke]   run: cd ${WORKER_DIR} && uv sync" >&2
  exit 2
fi

if ! curl -fsS -o /dev/null "${BASE}/api/v1/health"; then
  echo "[smoke] FAIL prereq: host not reachable at ${BASE}" >&2
  exit 2
fi

probe_status=$(curl -sS -o /tmp/.smoke_probe_$$ -w "%{http_code}" -X POST \
  "${BASE}/api/v1/services/text-completion" \
  -H "content-type: application/json" \
  -d '{"system":"","user":"x","max_tokens":1,"timeout_ms":2000,"required_tags":["text-completion"]}' 2>/dev/null || echo 000)
LLM_AVAILABLE=true
case "${probe_status}" in
  200|408|504)
    echo "[smoke] prereqs OK: host=${BASE} broker=ready (probe http=${probe_status})"
    ;;
  503)
    LLM_AVAILABLE=false
    echo "[smoke] WARN prereq: broker returned 503 — no Validated text-completion install."
    echo "[smoke]   continuing; expecting compiler=llm_fallback_deterministic"
    ;;
  *)
    echo "[smoke] FAIL prereq: broker probe failed (http=${probe_status})" >&2
    cat /tmp/.smoke_probe_$$ >&2 2>/dev/null || true
    rm -f /tmp/.smoke_probe_$$
    exit 2
    ;;
esac
rm -f /tmp/.smoke_probe_$$

REQ='{"jsonrpc":"2.0","id":1,"method":"longcat.video.plan.expand","params":{"prompt":"Alice walks into a noir-lit bar then sits at a piano then plays a slow melody","duration_seconds":9.0,"scene_count":3,"style_hint":"noir","use_llm":true,"seed":42}}'

start_ms=$(date +%s%3N)
RESPONSE_LINE="$(
  printf '%s\n' "${REQ}" | \
    NEXUS_VIDEO_LONGCAT_RUNTIME=fake \
    NEXUS_HOST_PORT="${PORT}" \
    PYTHONUNBUFFERED=1 \
    timeout "${WALL_BUDGET_S}" "${VENV_PY}" -m longcat_video_worker \
      2>/dev/null | head -n 1 || true
)"
end_ms=$(date +%s%3N)

if [ -z "${RESPONSE_LINE}" ]; then
  echo "[smoke] FAIL: worker produced no response within ${WALL_BUDGET_S}s" >&2
  exit 3
fi

if ! echo "${RESPONSE_LINE}" | jq -e '.result' >/dev/null 2>&1; then
  echo "[smoke] FAIL: response has no .result; raw=${RESPONSE_LINE}" >&2
  exit 3
fi

COMPILER="$(echo "${RESPONSE_LINE}" | jq -r '.result.compiler // empty')"
SCENE_COUNT="$(echo "${RESPONSE_LINE}" | jq -r '.result.scenes | length // 0')"
WARN_CODES="$(echo "${RESPONSE_LINE}" | jq -r '[.result.warnings[]?.code] | join(",")')"

case "${COMPILER}" in
  llm|llm_fallback_deterministic|deterministic) ;;
  *)
    echo "[smoke] FAIL: unexpected compiler='${COMPILER}'; raw=${RESPONSE_LINE}" >&2
    exit 4
    ;;
esac

if [ "${SCENE_COUNT}" -ne 3 ]; then
  echo "[smoke] FAIL: expected 3 scenes, got ${SCENE_COUNT}" >&2
  exit 4
fi

LATENCY=$((end_ms - start_ms))
echo "[smoke] plan.expand OK: compiler=${COMPILER} scenes=${SCENE_COUNT} latency=${LATENCY}ms warnings=${WARN_CODES:-none}"

if [ "${COMPILER}" = "llm_fallback_deterministic" ]; then
  if [ "${LLM_AVAILABLE}" = "true" ]; then
    echo "[smoke] WARN: broker was ready at probe time but planner fell back —"
    echo "[smoke]       LLM_LEASE_UNAVAILABLE mid-run; check host log"
  else
    echo "[smoke] OK: graceful fallback as expected (no Validated LLM install)"
  fi
elif [ "${COMPILER}" = "llm" ] && [ "${LLM_AVAILABLE}" = "false" ]; then
  echo "[smoke] WARN: LLM ran even though probe returned 503 — install state changed mid-run"
fi

echo "[smoke] PASS"
