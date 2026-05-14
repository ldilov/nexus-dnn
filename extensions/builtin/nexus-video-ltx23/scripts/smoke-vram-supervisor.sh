#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
# Item E — Real-GPU smoke test for Rung 7L (VRAM-supervisor restart).
#
# Forces the supervisor to trip on every memory_stats notification by
# setting an impossibly high `min_free_mb` floor, then runs a multi-
# segment render against the real diffusers profile and verifies that
# the chain transparently restarts and ultimately completes.
#
# Prereqs (the script checks these):
#   - Host server reachable at the URL passed via --host (default
#     http://127.0.0.1:8085). Start it from `cargo run -p nexus-core`
#     before invoking this script.
#   - The chosen runtime profile is installed (model weights + venv).
#     Spec 046 ships `rtx40-fp8` for 16 GB cards. Use --profile to
#     pick a different one when available.
#   - The host must have been started with
#     `NEXUS_VIDEO_LTX23_VRAM_MIN_FREE_MB=999999` so the supervisor
#     trips on every memory_stats event. The script verifies the
#     effective value via the run's error path; if the env was wrong,
#     the smoke test fails on the "restart_count must be > 0" check.
#
# What it verifies (Item E acceptance criteria):
#   1. Render completes via transparent restart — final status is
#      "completed", NOT "failed" or "cancelled".
#   2. `restart_count` on the run row is >= 1 (we forced at least one
#      breach via the impossible MIN_FREE_MB env).
#   3. `last_breach_reason` is non-null and contains "free_mb" (the
#      supervisor's free-MB threshold string).
#   4. Final artifact id is present (the worker emitted DONE with a
#      valid final_path that the runner copied).
#
# Usage:
#   ./smoke-vram-supervisor.sh [--host URL] [--profile NAME]
#                              [--duration SECONDS]
#                              [--poll-secs N] [--timeout-mins N]
#                              [--keep-run]
#
# Exit codes: 0 = PASS, 1 = FAIL, 2 = prereq missing (host unreachable,
# JSON parse error, etc.) — distinct from a real test failure.
# ─────────────────────────────────────────────────────────────────────

set -euo pipefail

HOST="http://127.0.0.1:8085"
PROFILE="rtx40-fp8"
DURATION_SECONDS=20
POLL_SECS=15
TIMEOUT_MINS=45
KEEP_RUN=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --host) HOST="$2"; shift 2 ;;
    --profile) PROFILE="$2"; shift 2 ;;
    --duration) DURATION_SECONDS="$2"; shift 2 ;;
    --poll-secs) POLL_SECS="$2"; shift 2 ;;
    --timeout-mins) TIMEOUT_MINS="$2"; shift 2 ;;
    --keep-run) KEEP_RUN=1; shift ;;
    -h|--help)
      sed -n '4,40p' "$0"; exit 0 ;;
    *)
      echo "unknown flag: $1" >&2; exit 2 ;;
  esac
done

API_BASE="${HOST}/api/v1/extensions/nexus.video.ltx23"

# ── ANSI + reporting helpers ─────────────────────────────────────────
if [[ -t 1 ]]; then
  GREEN=$'\033[32m'; RED=$'\033[31m'; YELLOW=$'\033[33m'
  BLUE=$'\033[34m'; BOLD=$'\033[1m'; RESET=$'\033[0m'
else
  GREEN=''; RED=''; YELLOW=''; BLUE=''; BOLD=''; RESET=''
fi

step()   { printf "%s▶%s %s\n" "$BLUE"   "$RESET" "$*"; }
pass()   { printf "%s✓%s %s\n" "$GREEN"  "$RESET" "$*"; }
fail()   { printf "%s✗%s %s\n" "$RED"    "$RESET" "$*"; }
warn()   { printf "%s!%s %s\n" "$YELLOW" "$RESET" "$*"; }

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    fail "$1 not found in PATH — install it before running this script"
    exit 2
  fi
}
require_cmd curl
require_cmd jq

# ── Prereq probes ────────────────────────────────────────────────────
step "Probing host reachability at $HOST …"
HEALTH_JSON="$(curl -fsS --max-time 5 "$HOST/api/v1/health" 2>/dev/null \
               || curl -fsS --max-time 5 "$HOST/health" 2>/dev/null \
               || echo "")"
if [[ -z "$HEALTH_JSON" ]]; then
  fail "host at $HOST is unreachable (no /health endpoint responded)"
  fail "start it with: cargo run -p nexus-core --release"
  fail "and re-export NEXUS_VIDEO_LTX23_VRAM_MIN_FREE_MB=999999 first"
  exit 2
fi
pass "host responding"

step "Probing profile $PROFILE install status …"
PROFILE_JSON="$(curl -fsS --max-time 5 "$API_BASE/profiles/$PROFILE/install" 2>/dev/null \
                || echo "{}")"
INSTALLED="$(jq -r '.installed // false' <<<"$PROFILE_JSON" 2>/dev/null || echo "false")"
if [[ "$INSTALLED" != "true" ]]; then
  fail "profile '$PROFILE' is NOT installed"
  fail "install it via the host's profile-install endpoint first:"
  fail "  curl -X POST $API_BASE/profiles/$PROFILE/install"
  fail "  # wait for in_flight=false + installed=true"
  exit 2
fi
pass "profile $PROFILE installed"

# ── Build the render request ─────────────────────────────────────────
REQ_BODY="$(jq -n \
  --arg profile "$PROFILE" \
  --argjson duration "$DURATION_SECONDS" \
  '{
    project_id: "smoke-vram-supervisor",
    prompt: "a wide tracking shot through a foggy alley at night, neon reflections in puddles",
    negative_prompt: "blurry, low quality, text, watermark",
    style_prompt: "moody noir, deep teal shadows, 35mm film grain",
    duration_seconds: $duration,
    runtime_profile: ($profile | sub("rtx40-fp8"; "rtx40-fp8") | sub("rtx50-fp8"; "rtx50-fp8") | sub("rtx50-nvfp4"; "rtx50-nvfp4")),
    quality_preset: "balanced16gb",
    width: 832,
    height: 480,
    base_fps: 24,
    output_fps: 48,
    seed: 1337
  }')"

step "Posting render to $API_BASE/renders …"
CREATE_RESPONSE="$(curl -fsS --max-time 10 -X POST \
  -H "Content-Type: application/json" \
  -d "$REQ_BODY" \
  "$API_BASE/renders" 2>&1)" || {
  fail "POST /renders failed: $CREATE_RESPONSE"
  exit 2
}

RUN_ID="$(jq -r '.id // .run_id // empty' <<<"$CREATE_RESPONSE")"
if [[ -z "$RUN_ID" ]]; then
  fail "could not extract run id from create response: $CREATE_RESPONSE"
  exit 2
fi
pass "render created — run_id=$RUN_ID"

# ── Poll until terminal state or timeout ─────────────────────────────
DEADLINE_EPOCH=$(( $(date +%s) + TIMEOUT_MINS * 60 ))
LAST_PROGRESS=""
FINAL_JSON=""

step "Polling /renders/$RUN_ID every ${POLL_SECS}s (timeout ${TIMEOUT_MINS}min) …"
while true; do
  NOW=$(date +%s)
  if (( NOW > DEADLINE_EPOCH )); then
    fail "timed out after ${TIMEOUT_MINS} minutes without terminal status"
    fail "last state: $LAST_PROGRESS"
    exit 1
  fi

  RUN_JSON="$(curl -fsS --max-time 10 "$API_BASE/renders/$RUN_ID" 2>/dev/null || echo "")"
  if [[ -z "$RUN_JSON" ]]; then
    warn "poll returned empty body; will retry"
    sleep "$POLL_SECS"
    continue
  fi

  STATUS="$(jq -r '.status' <<<"$RUN_JSON")"
  PROGRESS="$(jq -r '.progress_percent // 0' <<<"$RUN_JSON")"
  COMPLETED="$(jq -r '.completed_segments // 0' <<<"$RUN_JSON")"
  TOTAL="$(jq -r '.segment_count // 0' <<<"$RUN_JSON")"
  RC="$(jq -r '.restart_count // 0' <<<"$RUN_JSON")"
  LBR="$(jq -r '.last_breach_reason // ""' <<<"$RUN_JSON")"

  LAST_PROGRESS="status=$STATUS progress=${PROGRESS}% (${COMPLETED}/${TOTAL}) restarts=$RC"
  printf "  · %s\n" "$LAST_PROGRESS"

  case "$STATUS" in
    completed|failed|cancelled)
      FINAL_JSON="$RUN_JSON"
      break
      ;;
  esac

  sleep "$POLL_SECS"
done

# ── Verify acceptance criteria ───────────────────────────────────────
echo
step "Verifying Item E acceptance criteria …"
FAILED=0

FINAL_STATUS="$(jq -r '.status' <<<"$FINAL_JSON")"
FINAL_RC="$(jq -r '.restart_count // 0' <<<"$FINAL_JSON")"
FINAL_LBR="$(jq -r '.last_breach_reason // ""' <<<"$FINAL_JSON")"
FINAL_ART="$(jq -r '.final_artifact_id // ""' <<<"$FINAL_JSON")"
FINAL_EC="$(jq -r '.error_code // ""' <<<"$FINAL_JSON")"

# Criterion 1: final status is "completed"
if [[ "$FINAL_STATUS" == "completed" ]]; then
  pass "Criterion 1: status=completed (chain completed via transparent restart)"
else
  fail "Criterion 1: status=$FINAL_STATUS, error_code=$FINAL_EC (expected completed)"
  FAILED=1
fi

# Criterion 2: restart_count >= 1 (the impossible MIN_FREE_MB env should have tripped at least once)
if (( FINAL_RC >= 1 )); then
  pass "Criterion 2: restart_count=$FINAL_RC (supervisor tripped + runner restarted)"
else
  fail "Criterion 2: restart_count=$FINAL_RC (expected >= 1)"
  fail "  was NEXUS_VIDEO_LTX23_VRAM_MIN_FREE_MB=999999 set on the host process?"
  FAILED=1
fi

# Criterion 3: last_breach_reason mentions free_mb (the threshold the env knob targets)
if [[ "$FINAL_LBR" == *"free_mb"* ]]; then
  pass "Criterion 3: last_breach_reason mentions free_mb — \"$FINAL_LBR\""
else
  fail "Criterion 3: last_breach_reason=\"$FINAL_LBR\" (expected to mention free_mb)"
  FAILED=1
fi

# Criterion 4: final artifact id is present
if [[ -n "$FINAL_ART" && "$FINAL_ART" != "null" ]]; then
  pass "Criterion 4: final_artifact_id=$FINAL_ART"
else
  fail "Criterion 4: final_artifact_id missing/null (worker DONE was not received OR final.mp4 copy failed)"
  FAILED=1
fi

# ── Bonus: segment-row sanity (covers Item B) ────────────────────────
step "Sanity-checking segment rows (Item B no-coalescing guard) …"
SEG_JSON="$(curl -fsS --max-time 10 "$API_BASE/renders/$RUN_ID/segments" 2>/dev/null || echo "[]")"
SEG_COUNT="$(jq -r 'length' <<<"$SEG_JSON")"
SEG_OK_COUNT="$(jq '[.[] | select(.status == "completed" and (.started_at != null) and (.completed_at != null))] | length' <<<"$SEG_JSON")"

if [[ "$SEG_COUNT" -gt 0 && "$SEG_OK_COUNT" == "$SEG_COUNT" ]]; then
  pass "Segment sanity: $SEG_OK_COUNT/$SEG_COUNT segments completed with both started_at + completed_at populated"
else
  fail "Segment sanity: $SEG_OK_COUNT/$SEG_COUNT segments fully populated"
  fail "  (started_at NULL on a completed segment is the regression Item B's no-coalescing test guards against)"
  FAILED=1
fi

# ── Cleanup ──────────────────────────────────────────────────────────
echo
if (( KEEP_RUN == 0 )); then
  step "Cleaning up run artifacts (use --keep-run to retain) …"
  # The host doesn't currently expose a DELETE /renders endpoint;
  # the run + segments stay in DB as historical record. Workdir was
  # already cleaned by cleanup_workdir at terminal exit.
  warn "no DELETE endpoint — run record stays in DB for forensics"
fi

echo
if (( FAILED == 0 )); then
  printf "%s%sPASS%s — Item E smoke test green. Run id: %s\n" \
    "$BOLD" "$GREEN" "$RESET" "$RUN_ID"
  exit 0
else
  printf "%s%sFAIL%s — Item E smoke test failed. Inspect run %s.\n" \
    "$BOLD" "$RED" "$RESET" "$RUN_ID"
  printf "  Final JSON:\n%s\n" "$(jq . <<<"$FINAL_JSON")"
  exit 1
fi
