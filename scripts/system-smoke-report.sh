#!/usr/bin/env bash
# nexus-dnn SYSTEM smoke + detailed report.
#
# Probes every operator-relevant HTTP surface, validates extension activation,
# checks backend-runtimes catalog population, exercises the text-completion
# broker, and runs the LLM plan.expand subprocess smoke.
#
# Output: structured human-readable report with PASS / WARN / FAIL per check
# and a final summary. Exit code is non-zero only on FAIL (WARN is tolerated).
#
# Prereqs: jq, curl, python (for JSON parsing where jq is awkward). Worker
# venv at extensions/builtin/nexus-video-longcat/worker/.venv is OPTIONAL —
# the LLM subprocess smoke is skipped if missing.
#
# Usage:
#   scripts/system-smoke-report.sh                  # default host on $NEXUS_HOST_PORT or 3000
#   scripts/system-smoke-report.sh --port 7777
#   scripts/system-smoke-report.sh --json           # machine-readable JSON output

set -uo pipefail

PORT="${NEXUS_HOST_PORT:-3000}"
JSON_OUTPUT=0
while [ $# -gt 0 ]; do
  case "$1" in
    --port) PORT="$2"; shift 2 ;;
    --json) JSON_OUTPUT=1; shift ;;
    -h|--help) sed -n '2,18p' "$0"; exit 0 ;;
    *) echo "unknown flag: $1" >&2; exit 2 ;;
  esac
done
BASE="http://127.0.0.1:${PORT}"

PASS=0; WARN=0; FAIL=0
RESULTS=()
record() {
  local status="$1" name="$2" detail="$3"
  case "$status" in
    PASS) PASS=$((PASS+1)) ;;
    WARN) WARN=$((WARN+1)) ;;
    FAIL) FAIL=$((FAIL+1)) ;;
  esac
  RESULTS+=("$status|$name|$detail")
}

probe_json() {
  local path="$1"
  curl -sS -o /tmp/.sm_body_$$ -w "%{http_code}" "${BASE}${path}" 2>/dev/null || echo "000"
}
probe_post() {
  local path="$1" body="$2"
  curl -sS -o /tmp/.sm_body_$$ -w "%{http_code}" -X POST -H "content-type: application/json" \
    -d "${body}" "${BASE}${path}" 2>/dev/null || echo "000"
}
body() { cat /tmp/.sm_body_$$ 2>/dev/null; }
cleanup() { rm -f /tmp/.sm_body_$$ /tmp/.sm_probe_$$; }
trap cleanup EXIT

START_TS=$(date -u +%Y-%m-%dT%H:%M:%SZ)
GIT_REV=$(git -C "$(dirname "$0")/.." rev-parse --short HEAD 2>/dev/null || echo "unknown")

# ─── [01] HOST HEALTH ─────────────────────────────────────────────────────
code=$(probe_json /api/v1/health)
if [ "$code" = "200" ]; then
  subsystems=$(body | jq -r '[.data.details.subsystems[].name] | join(",")' 2>/dev/null || echo "?")
  record PASS "host-health" "subsystems=${subsystems}"
else
  record FAIL "host-health" "http=${code} — host not reachable at ${BASE}"
fi

# ─── [02] EXTENSIONS ACTIVE ───────────────────────────────────────────────
code=$(probe_json /api/v1/extensions)
EXT_COUNT=0
EXT_IDS=""
LONGCAT_ACTIVE=0
if [ "$code" = "200" ]; then
  EXT_COUNT=$(body | jq -r '.data.items | length' 2>/dev/null | tr -d '\r' || echo 0)
  EXT_IDS=$(body | jq -r '.data.items[] | "\(.id)@\(.version)[\(.status // "?")]"' 2>/dev/null | tr -d '\r' | tr '\n' ',' | sed 's/,$//')
  if echo "$EXT_IDS" | grep -q "nexus.video.longcat"; then LONGCAT_ACTIVE=1; fi
  if [ "$LONGCAT_ACTIVE" = "1" ]; then
    record PASS "extensions-active" "count=${EXT_COUNT} (longcat present)"
  else
    record WARN "extensions-active" "count=${EXT_COUNT} — longcat MISSING; ids=${EXT_IDS}"
  fi
else
  record FAIL "extensions-active" "http=${code}"
fi

# ─── [03] BACKEND-RUNTIMES CATALOG (Gap B target) ─────────────────────────
code=$(probe_json /api/v1/backend-runtimes)
CATALOG_COUNT=0
TC_RUNTIMES=""
if [ "$code" = "200" ]; then
  CATALOG_COUNT=$(body | jq -r '.data.runtimes | length' 2>/dev/null | tr -d '\r' || echo 0)
  TC_RUNTIMES=$(body | jq -r '.data.runtimes[] | select(.capability_tags // [] | index("text-completion")) | .runtime_id' 2>/dev/null | tr -d '\r' | tr '\n' ',' | sed 's/,$//')
  ALL_RUNTIMES=$(body | jq -r '.data.runtimes[] | "\(.runtime_id)[\(.capability_tags // [] | join(","))]"' 2>/dev/null | tr -d '\r' | tr '\n' ';' | sed 's/;$//')
  if [ "$CATALOG_COUNT" -ge 1 ]; then
    record PASS "backend-runtimes-catalog" "count=${CATALOG_COUNT} text_completion=[${TC_RUNTIMES}]"
  else
    record FAIL "backend-runtimes-catalog" "catalog EMPTY — register_contributions() not wired?"
  fi
else
  record FAIL "backend-runtimes-catalog" "http=${code}"
fi

# ─── [04] BACKEND-RUNTIME-INSTALLS (per runtime) ──────────────────────────
VALIDATED_TC=0
TOTAL_INSTALLS=0
INSTALLS_DETAIL=""
if [ -n "$TC_RUNTIMES" ]; then
  IFS=',' read -ra rts <<< "$TC_RUNTIMES"
  for rid in "${rts[@]}"; do
    code=$(probe_json "/api/v1/backend-runtime-installs?runtime_id=${rid}")
    if [ "$code" = "200" ]; then
      inst_count=$(body | jq -r '.data.installs | length' 2>/dev/null || echo 0)
      val_count=$(body | jq -r '[.data.installs[] | select(.state == "validated" or .state == "installed")] | length' 2>/dev/null || echo 0)
      TOTAL_INSTALLS=$((TOTAL_INSTALLS + inst_count))
      VALIDATED_TC=$((VALIDATED_TC + val_count))
      INSTALLS_DETAIL="${INSTALLS_DETAIL}${rid}:${val_count}/${inst_count};"
    fi
  done
fi
if [ "$VALIDATED_TC" -ge 1 ]; then
  record PASS "text-completion-installs" "validated=${VALIDATED_TC} total=${TOTAL_INSTALLS} per_runtime=${INSTALLS_DETAIL%;}"
else
  record WARN "text-completion-installs" "0 validated — broker will return 503; per_runtime=${INSTALLS_DETAIL:-none}"
fi

# ─── [05] TEXT-COMPLETION BROKER PROBE ────────────────────────────────────
PROBE_BODY='{"system":"","user":"x","max_tokens":1,"timeout_ms":2000,"required_tags":["text-completion"]}'
t0=$(date +%s%3N)
code=$(probe_post /api/v1/services/text-completion "$PROBE_BODY")
t1=$(date +%s%3N)
latency=$((t1 - t0))
case "$code" in
  200) record PASS "text-completion-broker" "200 — broker served real completion in ${latency}ms" ;;
  503) record WARN "text-completion-broker" "503 no_eligible_backend (${latency}ms) — expected when no Validated install" ;;
  408|504) record PASS "text-completion-broker" "${code} — broker live, install present but timed out (${latency}ms)" ;;
  *) record FAIL "text-completion-broker" "unexpected http=${code} body=$(body | head -c 200)" ;;
esac

# ─── [06] LEASE MANAGER (poll across known text-completion runtimes) ──────
LEASE_TOTAL=0
LEASE_CHECKED=0
if [ -n "$TC_RUNTIMES" ]; then
  IFS=',' read -ra rts <<< "$TC_RUNTIMES"
  for rid in "${rts[@]}"; do
    code=$(probe_json "/api/v1/backend-runtime-leases?runtime_id=${rid}")
    if [ "$code" = "200" ]; then
      lc=$(body | jq -r '.data.leases | length' 2>/dev/null || echo 0)
      LEASE_TOTAL=$((LEASE_TOTAL + lc))
      LEASE_CHECKED=$((LEASE_CHECKED + 1))
    fi
  done
fi
if [ "$LEASE_CHECKED" -gt 0 ]; then
  record PASS "lease-manager" "active_leases=${LEASE_TOTAL} across ${LEASE_CHECKED} text-completion runtime(s)"
else
  record WARN "lease-manager" "no text-completion runtimes to query — skipped"
fi

# ─── [07] LONGCAT EXTENSION SURFACE ───────────────────────────────────────
if [ "$LONGCAT_ACTIVE" = "1" ]; then
  code=$(probe_json /api/v1/extensions/nexus.video.longcat)
  if [ "$code" = "200" ]; then
    br_count=$(body | jq -r '(.data.manifest.backend_runtimes // .data.http_routes // []) | length' 2>/dev/null || echo 0)
    rt_count=$(curl -sS "${BASE}/api/v1/backend-runtimes" | jq -r '[.data.runtimes[] | select(.source_extension_id == "nexus.video.longcat")] | length' 2>/dev/null || echo 0)
    record PASS "longcat-surface" "catalog_runtimes=${rt_count} http_routes_or_br=${br_count}"
  else
    record WARN "longcat-surface" "GET /extensions/nexus.video.longcat http=${code}"
  fi
else
  record WARN "longcat-surface" "longcat not active — skip"
fi

# ─── [08] LLM SMOKE (plan.expand subprocess via lease) ────────────────────
LONGCAT_DIR="$(dirname "$0")/../extensions/builtin/nexus-video-longcat"
LONGCAT_DIR="$(cd "$LONGCAT_DIR" && pwd)"
if [ -x "${LONGCAT_DIR}/scripts/smoke-plan-expand-llm.sh" ]; then
  smoke_out=$(NEXUS_HOST_PORT="${PORT}" bash "${LONGCAT_DIR}/scripts/smoke-plan-expand-llm.sh" 2>&1 | tail -5 | tr '\n' '|')
  if echo "$smoke_out" | grep -q "PASS"; then
    summary=$(echo "$smoke_out" | grep -oE "compiler=[a-z_]+|latency=[0-9]+ms|warnings=[A-Z_,]+" | tr '\n' ' ' | sed 's/^/ /')
    record PASS "llm-plan-expand-smoke" "smoke_out:${summary}"
  else
    record FAIL "llm-plan-expand-smoke" "did not PASS; tail=${smoke_out}"
  fi
else
  record WARN "llm-plan-expand-smoke" "smoke script not executable — skip"
fi

# ─── REPORT RENDERING ─────────────────────────────────────────────────────
if [ "$JSON_OUTPUT" = "1" ]; then
  python -c "
import json
results = [
    {'status': r.split('|',2)[0], 'name': r.split('|',2)[1], 'detail': r.split('|',2)[2]}
    for r in '''$(printf '%s\n' "${RESULTS[@]}")'''.strip().splitlines()
]
print(json.dumps({
    'timestamp': '${START_TS}', 'host': '${BASE}', 'git_rev': '${GIT_REV}',
    'summary': {'pass': ${PASS}, 'warn': ${WARN}, 'fail': ${FAIL}},
    'results': results,
}, indent=2))
"
else
  echo ""
  echo "════════════════════════════════════════════════════════════════════"
  echo "  nexus-dnn SYSTEM SMOKE REPORT"
  echo "  $(printf '%-12s %s' 'timestamp:' "${START_TS}")"
  echo "  $(printf '%-12s %s' 'host:' "${BASE}")"
  echo "  $(printf '%-12s %s' 'git:' "${GIT_REV}")"
  echo "════════════════════════════════════════════════════════════════════"
  i=1
  for r in "${RESULTS[@]}"; do
    status="${r%%|*}"
    rest="${r#*|}"
    name="${rest%%|*}"
    detail="${rest#*|}"
    icon="?"
    case "$status" in PASS) icon="✓" ;; WARN) icon="⚠" ;; FAIL) icon="✗" ;; esac
    printf "  [%02d] %-30s %s %-5s\n" "$i" "$name" "$icon" "$status"
    [ -n "$detail" ] && printf "       %s\n" "$detail"
    i=$((i+1))
  done
  echo "════════════════════════════════════════════════════════════════════"
  echo "  SUMMARY: ${PASS} PASS  ${WARN} WARN  ${FAIL} FAIL"
  echo "════════════════════════════════════════════════════════════════════"
fi

if [ "$FAIL" -gt 0 ]; then exit 1; fi
exit 0
