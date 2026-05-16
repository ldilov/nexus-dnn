#!/usr/bin/env bash
# G2 — canonical 16 GB 2-scene continuation benchmark on the rtx50-gguf
# profile (Abiray LTX-2.3 Q4_K_M GGUF, schema-clean via the G-A1 rename).
#
# Mirrors memory/reference_nvfp4_16gb_benchmark.md retargeted to
# rtx50-gguf. GPU VRAM is authoritative (host log burst-buffers) —
# watch `nvidia-smi` in a second terminal; this prints a snapshot each
# poll. Prereq: RESTART the user-launched host after the G-A ff-merges
# so it loads the new rtx50-gguf wiring + gguf_loader. dg845 tree +
# Abiray GGUF are already on disk.
#
# Usage: ./bench-gguf-2scene.sh [--host URL] [--steps N]
set -euo pipefail

# Default = the user-launched release binary's port (older smoke
# tooling used 8085; the live host is 3000).
HOST="http://127.0.0.1:3000"
STEPS=8
while [[ $# -gt 0 ]]; do
  case "$1" in
    --host) HOST="$2"; shift 2 ;;
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
  || fail "profile status endpoint failed — is the host on the ff-merged build?"
if [[ "$(jq -r '.installed // false' <<<"$PJSON")" != "true" ]]; then
  step "$PROFILE not installed — POSTing install (downloads dg845 base; transformer = on-disk Abiray GGUF) …"
  curl -fsS --max-time 30 -X POST "$API_BASE/profiles/$PROFILE/install" >/dev/null || true
  fail "install kicked off — re-run once it completes (poll $API_BASE/profiles/$PROFILE/install)"
fi
pass "$PROFILE installed"

CHAR="a lone courier in a rain-slick crimson jacket, short black hair, weathered face"
STYLE="moody neo-noir, deep teal shadows, sodium-orange key light, 35mm film grain, anamorphic"
# quantization/offload left unset → host resolves rtx50-gguf defaults
# (quant=gguf, offload=model).
REQ="$(jq -n --arg c "$CHAR" --arg s "$STYLE" --argjson steps "$STEPS" '{
  project_id: "bench-gguf-2scene",
  prompt: ($c + " moves through a foggy harbor district at night"),
  negative_prompt: "blurry, low quality, text, watermark, deformed, extra limbs",
  style_prompt: $s,
  character_prompt: $c,
  duration_seconds: 11.0,
  runtime_profile: "rtx50-gguf",
  quality_preset: "balanced16gb",
  base_fps: 24,
  output_fps: 48,
  seed: 1337,
  scenes: [
    { prompt: ($c + " walks past shuttered market stalls, breath visible, neon signs buzzing overhead") },
    { prompt: ("continuing the same shot, " + $c + " stops at a railing overlooking black water as a ship'\''s horn sounds — same character, same lighting, seamless continuation") }
  ],
  advanced: {
    segment_seconds: 4.0,
    num_inference_steps: $steps,
    guidance_scale: 5.0,
    scheduler: "flow_match_euler",
    max_gpu_vram_gib: 15
  }
}')"

step "POST $API_BASE/renders (profile=$PROFILE steps=$STEPS) …"
RESP="$(curl -fsS --max-time 15 -X POST -H 'Content-Type: application/json' \
  -d "$REQ" "$API_BASE/renders" 2>&1)" || fail "POST /renders failed: $RESP"
RUN_ID="$(jq -r '.id // .run_id // empty' <<<"$RESP")"
[[ -n "$RUN_ID" ]] || fail "no run id in response: $RESP"
pass "render created — run_id=$RUN_ID"

step "Polling $API_BASE/renders/$RUN_ID  (Ctrl+C to stop; render continues server-side)"
echo "  Watch VRAM elsewhere:  nvidia-smi --query-gpu=memory.used,utilization.gpu --format=csv -l 2"
while true; do
  sleep 15
  R="$(curl -fsS --max-time 10 "$API_BASE/renders/$RUN_ID" 2>/dev/null)" || continue
  S="$(jq -r '.status // "?"' <<<"$R")"
  P="$(jq -r '.progress_percent // "?"' <<<"$R")"
  SMI="$(nvidia-smi --query-gpu=memory.used,memory.total,utilization.gpu --format=csv,noheader,nounits 2>/dev/null | paste -sd' | ' -)"
  echo "  [$(date +%H:%M:%S)] status=$S prog=$P%  GPU(used|total|util)= ${SMI:-n/a}"
  case "$S" in
    completed) pass "DONE — run_id=$RUN_ID. Verify: peak GPU < 15 GiB, NO Windows shared-GPU-memory growth, coherent 2-scene continuity."; break ;;
    failed|cancelled|error) fail "render ended status=$S — $R" ;;
  esac
done
