#!/usr/bin/env bash
# Operator smoke that exercises the real-LLM plan.expand path and
# prints the per-scene split for several requested scene counts.
#
# Each iteration spawns the longcat fake-profile worker subprocess with
# NEXUS_HOST_PORT injected so the planner's HttpLeaseClient round-trips
# through the host's text-completion broker. The broker auto-acquires
# an ephemeral lease against the Validated `nexus.local-llm.completions`
# install, which in turn talks to the operator-provisioned llama-server
# via NEXUS_LLAMA_SERVER_URL.
#
# Output: structured plain-text per scene_count, plus a JSON payload
# tail that includes anchor, compiler, latency_ms, warnings, scenes[].
#
# Prereqs:
#   - host running on NEXUS_HOST_PORT (default 3000)
#   - llama-server running and reachable via NEXUS_LLAMA_SERVER_URL on host
#   - `nexus.local-llm.completions` install in `validated` state
#   - longcat worker venv hydrated
#
# Exit codes:
#   0  ok
#   2  prereq missing
#   3  worker spawn / RPC failed
#   4  compiler != llm for at least one iteration (strict mode)
set -euo pipefail

PORT="${NEXUS_HOST_PORT:-3000}"
BASE="http://127.0.0.1:${PORT}"
SCENE_COUNTS="${SCENE_COUNTS:-2 3 5}"
LARGE_PROMPT="${PROMPT:-A reclusive monk wanders into a candlelit catacomb beneath an old stone monastery, the cold air thick with incense and decay. He discovers an iron-bound book chained to an altar; as he opens it, the pages turn themselves and ancient Latin chants rise from nowhere. Wax-yellow flames lean sideways. Shadows on the walls peel away from their owners and crawl across the ceiling. He stumbles backward into a chamber lined with stone-faced effigies, each one slowly turning to face him. Finally he kneels and presses his forehead to the freezing flagstones, lips moving in a desperate prayer as the temperature drops and his breath becomes visible.}"
WALL_BUDGET_S="${WALL_BUDGET_S:-180}"
STRICT="${STRICT:-1}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
EXT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
WORKER_DIR="${EXT_DIR}/worker"
VENV_PY="${WORKER_DIR}/.venv/bin/python"
[ -x "${VENV_PY}" ] || VENV_PY="${WORKER_DIR}/.venv/Scripts/python.exe"

for bin in jq curl; do
  command -v "$bin" >/dev/null 2>&1 || { echo "[smoke] FAIL prereq: $bin missing" >&2; exit 2; }
done
[ -x "${VENV_PY}" ] || { echo "[smoke] FAIL prereq: worker venv python missing at ${VENV_PY}" >&2; exit 2; }
curl -fsS -o /dev/null "${BASE}/api/v1/health" || { echo "[smoke] FAIL prereq: host down at ${BASE}" >&2; exit 2; }

PROMPT_LEN=$(echo -n "${LARGE_PROMPT}" | wc -c | tr -d ' ')
echo "================================================================="
echo "[smoke-llm-split] llm-driven plan.expand verification"
echo "  host         = ${BASE}"
echo "  prompt_chars = ${PROMPT_LEN}"
echo "  scene_counts = ${SCENE_COUNTS}"
echo "  strict       = ${STRICT} (1 => fail when compiler != llm)"
echo "================================================================="
echo ""
echo "INPUT PROMPT:"
echo "-----------------------------------------------------------------"
echo "${LARGE_PROMPT}" | fold -s -w 75 | sed 's/^/  /'
echo "-----------------------------------------------------------------"
echo ""

FAILED_ITERATIONS=0
for SCENE_COUNT in ${SCENE_COUNTS}; do
  DURATION=$(awk "BEGIN { printf \"%.1f\", ${SCENE_COUNT} * 4.0 }")
  REQ=$(jq -nc \
    --arg prompt "${LARGE_PROMPT}" \
    --argjson duration "${DURATION}" \
    --argjson scenes "${SCENE_COUNT}" \
    '{jsonrpc:"2.0",id:1,method:"longcat.video.plan.expand",
      params:{prompt:$prompt,duration_seconds:$duration,scene_count:$scenes,
              style_hint:"cinematic horror, slow dread, candlelit chiaroscuro",
              use_llm:true,seed:1234}}')

  START_MS=$(date +%s%3N)
  # Worker writes a `worker.start` log line on stdout before the
  # JSON-RPC response, so `head -n 1` would pick up the wrong frame.
  # Filter to JSON-RPC envelopes (any line with `"jsonrpc"`) and pick
  # the first match.
  RESPONSE_LINE="$(
    printf '%s\n' "${REQ}" | \
      NEXUS_VIDEO_LONGCAT_RUNTIME=fake \
      NEXUS_HOST_PORT="${PORT}" \
      PYTHONUNBUFFERED=1 \
      timeout "${WALL_BUDGET_S}" "${VENV_PY}" -m longcat_video_worker \
        2>/dev/null | grep -m1 '"jsonrpc"' || true
  )"
  END_MS=$(date +%s%3N)
  LATENCY=$((END_MS - START_MS))

  if [ -z "${RESPONSE_LINE}" ]; then
    echo "==> scene_count=${SCENE_COUNT}: NO RESPONSE within ${WALL_BUDGET_S}s"
    FAILED_ITERATIONS=$((FAILED_ITERATIONS + 1))
    continue
  fi

  COMPILER=$(echo "${RESPONSE_LINE}" | jq -r '.result.compiler // empty')
  ANCHOR=$(echo "${RESPONSE_LINE}" | jq -r '.result.anchor // empty')
  SCENE_COUNT_OUT=$(echo "${RESPONSE_LINE}" | jq -r '.result.scenes | length // 0')
  WARNINGS=$(echo "${RESPONSE_LINE}" | jq -c '.result.warnings // []')

  echo ""
  echo "================================================================="
  echo "scene_count_requested = ${SCENE_COUNT}"
  echo "scene_count_returned  = ${SCENE_COUNT_OUT}"
  echo "compiler              = ${COMPILER}"
  echo "anchor                = ${ANCHOR}"
  echo "latency_ms            = ${LATENCY}"
  echo "warnings              = ${WARNINGS}"
  echo "-----------------------------------------------------------------"
  echo "PER-SCENE SPLIT:"
  echo "${RESPONSE_LINE}" | jq -r '.result.scenes | to_entries[] |
    "  [scene \(.key + 1)] motion=\(.value.motion_intensity) duration=\(.value.per_scene_generated_seconds)s adain=\(.value.adain_factor) mode=\(.value.mode)\n  prompt: \(.value.prompt)\n"'
  echo "================================================================="

  if [ "${COMPILER}" != "llm" ] && [ "${STRICT}" = "1" ]; then
    FAILED_ITERATIONS=$((FAILED_ITERATIONS + 1))
  fi
done

echo ""
echo "================================================================="
if [ "${FAILED_ITERATIONS}" -eq 0 ]; then
  echo "[smoke-llm-split] PASS (all iterations compiler=llm)"
  exit 0
fi
echo "[smoke-llm-split] FAIL: ${FAILED_ITERATIONS} iteration(s) did not reach compiler=llm"
exit 4
