<#
.SYNOPSIS
  De-rot trigger for the [gguf_vram_bound_diffusers] plan-time guard.

.DESCRIPTION
  Across 9 runs on 2026-05-17 the rtx50-gguf path OOM'd byte-identically
  at 14.84 GiB on a 16 GB card regardless of offload mode — diffusers'
  group_offloading has no GGUFParameter branch, so the
  dequant-per-matmul transformer is opaque to every offload hook.
  compatibility.rs Guard 0c rejects the path at plan time, gated on
  runtime_selection::gguf_diffusers_fit_proven() (a const false). The
  guard is keyed to THIS script, NOT a diffusers version literal:
  diffusers documented LTX GGUF *loading* by v0.37.1 yet it still does
  not *fit* 16 GB, so "newer diffusers" is not evidence of fit.

  MODE 1 — RECURRING CHECK (cheap, every diffusers bump / CI): with
  gguf_diffusers_fit_proven()==false, POST an rtx50-gguf render and
  assert the host rejects it with [gguf_vram_bound_diffusers]. Reject =
  reality unchanged, guard still correct -> exit 0. If the host instead
  ACCEPTS the render the guard has rotted -> exit 3, loud.

  MODE 2 — FLIP-AND-MEASURE (-Measure, expensive, manual): the operator
  flips gguf_diffusers_fit_proven() to true, rebuilds the extension,
  RESTARTS the host, then runs with -Measure. Completes <16 GiB -> fit
  proven, keep the flag. OOM / exceeds -> revert the flag; exit 2.

.PARAMETER HostUrl
  Host base URL. Default http://127.0.0.1:3000.

.PARAMETER Measure
  Switch to FLIP-AND-MEASURE mode (only after flipping + rebuilding +
  restarting the host).

.PARAMETER Steps
  num_inference_steps. Default 8.

.EXAMPLE
  ./smoke-gguf-diffusers-fit.ps1
  ./smoke-gguf-diffusers-fit.ps1 -Measure -Steps 8
#>
[CmdletBinding()]
param(
  [string]$HostUrl = "http://127.0.0.1:3000",
  [switch]$Measure,
  [int]$Steps = 8
)
$ErrorActionPreference = "Stop"
$ApiBase = "$HostUrl/api/v1/extensions/nexus.video.ltx23"
$Profile = "rtx50-gguf"

function Step($m) { Write-Host "  -> $m" -ForegroundColor Cyan }
function Pass($m) { Write-Host "  OK $m" -ForegroundColor Green }
function Fail($m) { Write-Host "  XX $m" -ForegroundColor Red; exit 2 }

Step "Probing host at $HostUrl ..."
try { Invoke-RestMethod -TimeoutSec 5 "$HostUrl/api/v1/health" | Out-Null }
catch {
  try { Invoke-RestMethod -TimeoutSec 5 "$HostUrl/health" | Out-Null }
  catch { Fail "host unreachable — restart the host binary first" }
}
Pass "host reachable"

Step "Checking $Profile install status ..."
try { $pj = Invoke-RestMethod -TimeoutSec 5 "$ApiBase/profiles/$Profile/install" }
catch { Fail "profile status endpoint failed — is the host on the current build?" }
if (-not $pj.installed) {
  try { Invoke-RestMethod -TimeoutSec 30 -Method Post "$ApiBase/profiles/$Profile/install" | Out-Null } catch {}
  Fail "$Profile not installed — install kicked off; re-run once it completes"
}
Pass "$Profile installed"

$char = "a lone courier in a rain-slick crimson jacket"
$req = @{
  project_id      = "smoke-gguf-fit"
  prompt          = "$char walks through a foggy harbor at night"
  negative_prompt = "blurry, low quality, text, watermark"
  duration_seconds = 4.0
  runtime_profile = "rtx50-gguf"
  quality_preset  = "balanced16gb"
  base_fps        = 24
  seed            = 1337
  scenes          = @(@{ prompt = "$char stops at a railing overlooking black water" })
  advanced        = @{ segment_seconds = 4.0; num_inference_steps = $Steps;
                       guidance_scale = 5.0; scheduler = "flow_match_euler";
                       max_gpu_vram_gib = 15 }
} | ConvertTo-Json -Depth 6

Step "POST $ApiBase/renders (profile=$Profile) ..."
$code = 0; $body = ""
try {
  $resp = Invoke-WebRequest -TimeoutSec 15 -Method Post -ContentType 'application/json' `
            -Body $req "$ApiBase/renders" -SkipHttpErrorCheck
  $code = [int]$resp.StatusCode; $body = $resp.Content
} catch { $body = "$_" }

if (-not $Measure) {
  if ($body -match 'gguf_vram_bound_diffusers') {
    Pass "guard correctly rejected the gguf path ([gguf_vram_bound_diffusers])."
    Pass "Reality unchanged on the installed diffusers — no action. PASS."
    exit 0
  }
  if ($code -ge 200 -and $code -lt 300) {
    Write-Host "  XX host ACCEPTED an rtx50-gguf render but fit was never proven." -ForegroundColor Red
    Write-Host "  XX gguf_diffusers_fit_proven() flipped without -Measure evidence." -ForegroundColor Red
    Write-Host "  XX GUARD HAS ROTTED — revert the flag until fit is re-proven. FAIL." -ForegroundColor Red
    exit 3
  }
  Fail "unexpected response (code=$code): $body"
}

# -Measure: operator has flipped the flag + rebuilt + restarted host.
try { $j = $body | ConvertFrom-Json } catch { $j = $null }
$runId = if ($j) { if ($j.id) { $j.id } elseif ($j.run_id) { $j.run_id } else { $null } } else { $null }
if (-not $runId) { Fail "no run id (code=$code) — did you flip the flag, rebuild, and RESTART the host? body: $body" }
Pass "render created — run_id=$runId (measuring peak VRAM)"
Write-Host "  Watch elsewhere: nvidia-smi --query-gpu=memory.used,memory.total --format=csv -l 2"
while ($true) {
  Start-Sleep -Seconds 15
  try { $r = Invoke-RestMethod -TimeoutSec 10 "$ApiBase/renders/$runId" } catch { continue }
  $s = if ($r.status) { $r.status } else { "?" }
  $p = if ($r.progress_percent) { $r.progress_percent } else { "?" }
  $smi = (nvidia-smi --query-gpu=memory.used,memory.total --format=csv,noheader,nounits 2>$null) -join ' | '
  Write-Host ("  [{0}] status={1} prog={2}% GPU(used|total)= {3}" -f (Get-Date -Format HH:mm:ss), $s, $p, $smi)
  switch ($s) {
    "completed" { Pass "FIT PROVEN — completed <16 GiB. Keep gguf_diffusers_fit_proven()=true."; exit 0 }
    { $_ -in @("failed","cancelled","error") } {
      Write-Host "  XX render ended status=$s — likely the same VRAM wall." -ForegroundColor Red
      Write-Host "  XX REVERT gguf_diffusers_fit_proven() to false (guard was right)." -ForegroundColor Red
      exit 2
    }
  }
}
