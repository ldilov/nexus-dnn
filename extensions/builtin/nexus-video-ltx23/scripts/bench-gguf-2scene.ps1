<#
.SYNOPSIS
  G2 — canonical 16 GB 2-scene continuation benchmark on the rtx50-gguf
  profile (Abiray LTX-2.3 Q4_K_M GGUF, schema-clean via the G-A1 rename).

.DESCRIPTION
  Mirrors the recurring benchmark in
  memory/reference_nvfp4_16gb_benchmark.md, retargeted to rtx50-gguf.
  Submits a 2-scene continuation render and polls progress. GPU VRAM is
  authoritative (the host log burst-buffers) — watch `nvidia-smi` in a
  second terminal; this script prints a snapshot each poll.

  Prereq: the host (user-launched release binary) must be RESTARTED
  after the G-A ff-merges so it loads the new rtx50-gguf wiring +
  gguf_loader. The dg845 tree and the Abiray GGUF are already on disk.

.PARAMETER HostUrl
  Host base URL. Default http://127.0.0.1:3000 (the user-launched
  release binary's port; older smoke tooling used 8085).

.PARAMETER Steps
  num_inference_steps. Default 8 (distilled fast-iter). Use 30 for a
  final-quality run.

.EXAMPLE
  ./bench-gguf-2scene.ps1
  ./bench-gguf-2scene.ps1 -HostUrl http://127.0.0.1:3000 -Steps 30
#>
[CmdletBinding()]
param(
  [string]$HostUrl = "http://127.0.0.1:3000",
  [int]$Steps = 8
)
$ErrorActionPreference = "Stop"
$ApiBase = "$HostUrl/api/v1/extensions/nexus.video.ltx23"
$Profile = "rtx50-gguf"

function Step($m) { Write-Host "  → $m" -ForegroundColor Cyan }
function Pass($m) { Write-Host "  ✓ $m" -ForegroundColor Green }
function Fail($m) { Write-Host "  ✗ $m" -ForegroundColor Red; exit 2 }

Step "Probing host at $HostUrl …"
try { Invoke-RestMethod -TimeoutSec 5 "$HostUrl/api/v1/health" | Out-Null }
catch { try { Invoke-RestMethod -TimeoutSec 5 "$HostUrl/health" | Out-Null }
        catch { Fail "host unreachable — restart the host binary first" } }
Pass "host reachable"

Step "Checking $Profile install status …"
try {
  $st = Invoke-RestMethod -TimeoutSec 5 "$ApiBase/profiles/$Profile/install"
} catch { Fail "profile status endpoint failed — is the host on the ff-merged build? ($_)" }
if (-not $st.installed) {
  Step "$Profile not installed — POSTing install (downloads the dg845 base tree; the GGUF transformer is the on-disk Abiray family) …"
  Invoke-RestMethod -TimeoutSec 30 -Method Post "$ApiBase/profiles/$Profile/install" | Out-Null
  Fail "install kicked off — re-run this script once it completes (poll $ApiBase/profiles/$Profile/install)"
}
Pass "$Profile installed"

# Canonical 2-scene continuation. quantization/offload left unset so the
# host resolves the rtx50-gguf defaults (quant=gguf, offload=model).
$char  = "a lone courier in a rain-slick crimson jacket, short black hair, weathered face"
$style = "moody neo-noir, deep teal shadows, sodium-orange key light, 35mm film grain, anamorphic"
$body = @{
  project_id       = "bench-gguf-2scene"
  prompt           = "$char moves through a foggy harbor district at night"
  negative_prompt  = "blurry, low quality, text, watermark, deformed, extra limbs"
  style_prompt     = $style
  character_prompt = $char
  duration_seconds = 11.0
  runtime_profile  = $Profile
  quality_preset   = "balanced16gb"
  base_fps         = 24
  output_fps       = 48
  seed             = 1337
  scenes = @(
    @{ prompt = "$char walks past shuttered market stalls, breath visible, neon signs buzzing overhead" },
    @{ prompt = "continuing the same shot, $char stops at a railing overlooking black water as a ship's horn sounds — same character, same lighting, seamless continuation" }
  )
  advanced = @{
    segment_seconds     = 4.0
    num_inference_steps = $Steps
    guidance_scale      = 5.0
    scheduler           = "flow_match_euler"
    max_gpu_vram_gib    = 15
  }
} | ConvertTo-Json -Depth 8

Step "POST $ApiBase/renders (profile=$Profile steps=$Steps) …"
try {
  $resp = Invoke-RestMethod -TimeoutSec 15 -Method Post -ContentType "application/json" `
            -Body $body "$ApiBase/renders"
} catch { Fail "POST /renders failed: $_" }
$runId = $resp.id; if (-not $runId) { $runId = $resp.run_id }
if (-not $runId) { Fail "no run id in response: $($resp | ConvertTo-Json -Depth 5)" }
Pass "render created — run_id=$runId"

Step "Polling $ApiBase/renders/$runId  (Ctrl+C to stop; render continues server-side)"
Write-Host "  Watch VRAM in another terminal:  nvidia-smi --query-gpu=memory.used,utilization.gpu --format=csv -l 2" -ForegroundColor DarkGray
while ($true) {
  Start-Sleep -Seconds 15
  try { $r = Invoke-RestMethod -TimeoutSec 10 "$ApiBase/renders/$runId" } catch { continue }
  $status = $r.status; $prog = $r.progress_percent
  $smi = (nvidia-smi --query-gpu=memory.used,memory.total,utilization.gpu --format=csv,noheader,nounits 2>$null) -join " | "
  Write-Host ("  [{0}] status={1} prog={2}%  GPU(used|total|util)= {3}" -f (Get-Date -Format HH:mm:ss), $status, $prog, $smi)
  if ($status -in @("completed","failed","cancelled","error")) {
    if ($status -eq "completed") {
      Pass "DONE — run_id=$runId. Verify: peak GPU < 15 GiB, NO Windows shared-GPU-memory growth, coherent 2-scene continuity."
    } else {
      Fail "render ended status=$status — $($r | ConvertTo-Json -Depth 6)"
    }
    break
  }
}
