#!/usr/bin/env bash
# De-rot trigger for the [gguf_vram_bound_diffusers] plan-time guard.
#
# WHY THIS EXISTS: across 9 runs on 2026-05-17 the rtx50-gguf path
# OOM'd byte-identically at 14.84 GiB on a 16 GB card regardless of
# offload mode — diffusers' group_offloading has no GGUFParameter
# branch, so the dequant-per-matmul transformer is opaque to every
# offload hook. compatibility.rs Guard 0c therefore rejects the path at
# plan time, gated on runtime_selection::gguf_diffusers_fit_proven()
# (a const `false`). The guard is keyed to THIS script, NOT a diffusers
# version literal: diffusers documented LTX GGUF *loading* by v0.37.1
# yet it still does not *fit* 16 GB, so "newer diffusers" is not
# evidence of fit.
#
# TWO MODES:
#
#   1. RECURRING CHECK (cheap, run on every diffusers bump / in CI):
#      with gguf_diffusers_fit_proven() == false, POST an rtx50-gguf
#      render and assert the host rejects it with
#      [gguf_vram_bound_diffusers]. A reject means reality is unchanged
#      and the guard is still correct → exit 0. If the host instead
#      ACCEPTS the render, the guard has rotted (someone flipped the
#      flag without re-proving) → exit 3, loud.
#
#   2. FLIP-AND-MEASURE (expensive, manual, only when re-testing fit on
#      a new diffusers): the operator flips gguf_diffusers_fit_proven()
#      to true, rebuilds the extension, RESTARTS the host, then runs
#      this script with --measure. It submits the render and watches
#      peak VRAM. Clears <16 GiB to completion → fit proven, keep the
#      flag. OOM / exceeds 16 GiB → revert the flag (the guard was
#      right); exit 2.
#
# Usage: ./smoke-gguf-diffusers-fit.sh [--host URL] [--measure] [--steps N]
set -euo pipefail

HOST="http://127.0.0.1:3000"
MODE="check"
STEPS=8
while [[ $# -gt 0 ]]; do
  case "$1" in
    --host) HOST="$2"; shift 2 ;;
    --measure) MODE="measure"; shift ;;
    --steps) STEPS="$2"; shift 2 ;;
    *) echo "unknown arg: $1" >&2; exit 2 ;;
  esac
done
API_BASE="${HOST}/api/v1/extensions/nexus.video.ltx23"
PROFILE="rtx50-gguf"
step() { echo "  → $*"; }
pass() { echo "  ✓ $*"; }
fail() { echo "  ✗ $*" >&2; exit 2; }
command -v curl >/dev/null || fail "curl required"
command -v jq   >/dev/null || fail "jq required"

step "Probing host at $HOST …"
curl -fsS --max-time 5 "$HOST/api/v1/health" >/dev/null 2>&1 \
  || curl -fsS --max-time 5 "$HOST/health" >/dev/null 2>&1 \
  || fail "host unreachable — restart the host binary first"
pass "host reachable"

step "Checking $PROFILE install status …"
PJSON="$(curl -fsS --max-time 5 "$API_BASE/profiles/$PROFILE/install" 2>/dev/null)" \
  || fail "profile status endpoint failed — is the host on the current build?"
if [[ "$(jq -r '.installed // false' <<<"$PJSON")" != "true" ]]; then
  curl -fsS --max-time 30 -X POST "$API_BASE/profiles/$PROFILE/install" >/dev/null || true
  fail "$PROFILE not installed — install kicked off; re-run once it completes"
fi
pass "$PROFILE installed"

CHAR="a lone courier in a rain-slick crimson jacket"
REQ="$(jq -n --arg c "$CHAR" --argjson steps "$STEPS" '{
  project_id: "smoke-gguf-fit",
  prompt: ($c + " walks through a foggy harbor at night"),
  negative_prompt: "blurry, low quality, text, watermark",
  duration_seconds: 4.0,
  runtime_profile: "rtx50-gguf",
  quality_preset: "balanced16gb",
  base_fps: 24,
  seed: 1337,
  scenes: [ { prompt: ($c + " stops at a railing overlooking black water") } ],
  advanced: { segment_seconds: 4.0, num_inference_steps: $steps,
              guidance_scale: 5.0, scheduler: "flow_match_euler",
              max_gpu_vram_gib: 15 }
}')"

step "POST $API_BASE/renders (profile=$PROFILE) …"
HTTP_BODY="$(mktemp)"
CODE="$(curl -sS -o "$HTTP_BODY" -w '%{http_code}' --max-time 15 \
  -X POST -H 'Content-Type: application/json' \
  -d "$REQ" "$API_BASE/renders" 2>/dev/null || echo 000)"
BODY="$(cat "$HTTP_BODY")"; rm -f "$HTTP_BODY"

if [[ "$MODE" == "check" ]]; then
  if grep -q 'gguf_vram_bound_diffusers' <<<"$BODY"; then
    pass "guard correctly rejected the gguf path ([gguf_vram_bound_diffusers])."
    pass "Reality unchanged on the installed diffusers — no action. PASS."
    exit 0
  fi
  if [[ "$CODE" =~ ^2 ]]; then
    echo "  ✗ host ACCEPTED an rtx50-gguf render but fit was never proven." >&2
    echo "  ✗ gguf_diffusers_fit_proven() was flipped without --measure evidence." >&2
    echo "  ✗ GUARD HAS ROTTED — revert the flag until fit is re-proven. FAIL." >&2
    exit 3
  fi
  fail "unexpected response (code=$CODE): $BODY"
fi

# --measure: operator has flipped the flag + rebuilt + restarted host.
RUN_ID="$(jq -r '.id // .run_id // empty' <<<"$BODY" 2>/dev/null || true)"
[[ -n "$RUN_ID" ]] || fail "no run id (code=$CODE) — did you flip the flag, rebuild, and RESTART the host? body: $BODY"
pass "render created — run_id=$RUN_ID (measuring peak VRAM)"
echo "  Watch elsewhere: nvidia-smi --query-gpu=memory.used,memory.total --format=csv -l 2"
while true; do
  sleep 15
  R="$(curl -fsS --max-time 10 "$API_BASE/renders/$RUN_ID" 2>/dev/null)" || continue
  S="$(jq -r '.status // "?"' <<<"$R")"
  P="$(jq -r '.progress_percent // "?"' <<<"$R")"
  SMI="$(nvidia-smi --query-gpu=memory.used,memory.total --format=csv,noheader,nounits 2>/dev/null | paste -sd' | ' -)"
  echo "  [$(date +%H:%M:%S)] status=$S prog=$P% GPU(used|total)= ${SMI:-n/a}"
  case "$S" in
    completed) pass "FIT PROVEN — completed <16 GiB. Keep gguf_diffusers_fit_proven()=true."; exit 0 ;;
    failed|cancelled|error)
      echo "  ✗ render ended status=$S — likely the same VRAM wall." >&2
      echo "  ✗ REVERT gguf_diffusers_fit_proven() to false (guard was right)." >&2
      exit 2 ;;
  esac
done
