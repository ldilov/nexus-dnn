<#
.SYNOPSIS
Item E — Real-GPU smoke test for Rung 7L (VRAM-supervisor restart).
PowerShell mirror of smoke-vram-supervisor.sh — same flags, same
exit codes, same acceptance criteria.

.DESCRIPTION
Forces the supervisor to trip on every memory_stats notification by
setting an impossibly high min_free_mb floor, then runs a multi-
segment render against the real diffusers profile and verifies that
the chain transparently restarts and ultimately completes.

Prereqs the script checks:
  - Host server reachable at -Host (default http://127.0.0.1:3000).
    Start it from `cargo run -p nexus-core --release` first.
  - The chosen runtime profile is installed (model weights + venv).
  - The host must have been started with
    `$Env:NEXUS_VIDEO_LTX23_VRAM_MIN_FREE_MB = '999999'` so the
    supervisor trips on every memory_stats event.

Acceptance criteria (Item E):
  1. status == 'completed' (chain restarted transparently)
  2. restart_count >= 1 (supervisor tripped + runner restarted)
  3. last_breach_reason mentions free_mb
  4. final_artifact_id is present
  5. bonus: every segment row has started_at + completed_at (Item B
     no-coalescing regression guard, exercised end-to-end).

.PARAMETER HostUrl
Base URL of the nexus-dnn host (default http://127.0.0.1:3000).

.PARAMETER Profile
Runtime profile to render against (default rtx40-fp8).

.PARAMETER Duration
Seconds of video to render (default 20).

.PARAMETER PollSecs
Seconds between status polls (default 15).

.PARAMETER TimeoutMins
Minutes after which the script gives up (default 45).

.PARAMETER KeepRun
Pass to skip the cleanup hint (no DELETE endpoint yet anyway).

.NOTES
Exit codes: 0 = PASS, 1 = real test failure, 2 = prereqs missing
(host unreachable, profile not installed, etc.).
#>

[CmdletBinding()]
param(
    [string]$HostUrl     = 'http://127.0.0.1:3000',
    [string]$Profile     = 'rtx40-fp8',
    [int]   $Duration    = 20,
    [int]   $PollSecs    = 15,
    [int]   $TimeoutMins = 45,
    [switch]$KeepRun
)

$ErrorActionPreference = 'Stop'
$ApiBase = "$HostUrl/api/v1/extensions/nexus.video.ltx23"

# ── reporting helpers ───────────────────────────────────────────────
function Write-Step($msg) { Write-Host "▶ $msg" -ForegroundColor Blue }
function Write-Pass($msg) { Write-Host "✓ $msg" -ForegroundColor Green }
function Write-Fail($msg) { Write-Host "✗ $msg" -ForegroundColor Red }
function Write-Warn($msg) { Write-Host "! $msg" -ForegroundColor Yellow }

# ── prereq probes ───────────────────────────────────────────────────
Write-Step "Probing host reachability at $HostUrl …"
try {
    $health = Invoke-RestMethod -Uri "$HostUrl/api/v1/health" -TimeoutSec 5 -ErrorAction Stop
    Write-Pass 'host responding'
} catch {
    try {
        $health = Invoke-RestMethod -Uri "$HostUrl/health" -TimeoutSec 5 -ErrorAction Stop
        Write-Pass 'host responding (legacy /health endpoint)'
    } catch {
        Write-Fail "host at $HostUrl is unreachable (no /health endpoint responded)"
        Write-Fail 'start it with: cargo run -p nexus-core --release'
        Write-Fail 'and set $Env:NEXUS_VIDEO_LTX23_VRAM_MIN_FREE_MB = ''999999'' first'
        exit 2
    }
}

Write-Step "Probing profile $Profile install status …"
try {
    $profileResp = Invoke-RestMethod -Uri "$ApiBase/profiles/$Profile/install" -TimeoutSec 5 -ErrorAction Stop
    $installed = [bool]$profileResp.installed
} catch {
    $installed = $false
}
if (-not $installed) {
    Write-Fail "profile '$Profile' is NOT installed"
    Write-Fail 'install it via the host profile-install endpoint first:'
    Write-Fail "  Invoke-RestMethod -Method Post -Uri $ApiBase/profiles/$Profile/install"
    Write-Fail '  # wait for in_flight=false and installed=true'
    exit 2
}
Write-Pass "profile $Profile installed"

# ── build the render request ────────────────────────────────────────
$reqBody = @{
    project_id       = 'smoke-vram-supervisor'
    prompt           = 'a wide tracking shot through a foggy alley at night, neon reflections in puddles'
    negative_prompt  = 'blurry, low quality, text, watermark'
    style_prompt     = 'moody noir, deep teal shadows, 35mm film grain'
    duration_seconds = $Duration
    runtime_profile  = $Profile
    quality_preset   = 'balanced16gb'
    width            = 832
    height           = 480
    base_fps         = 24
    output_fps       = 48
    seed             = 1337
} | ConvertTo-Json -Compress

Write-Step "Posting render to $ApiBase/renders …"
try {
    $createResp = Invoke-RestMethod `
        -Uri "$ApiBase/renders" `
        -Method Post `
        -ContentType 'application/json' `
        -Body $reqBody `
        -TimeoutSec 10 -ErrorAction Stop
} catch {
    Write-Fail "POST /renders failed: $($_.Exception.Message)"
    exit 2
}

$runId = if ($createResp.id) { $createResp.id } elseif ($createResp.run_id) { $createResp.run_id } else { $null }
if (-not $runId) {
    Write-Fail "could not extract run id from create response: $($createResp | ConvertTo-Json -Compress)"
    exit 2
}
Write-Pass "render created — run_id=$runId"

# ── poll until terminal state or timeout ────────────────────────────
$deadline = (Get-Date).AddMinutes($TimeoutMins)
$lastProgress = ''
$finalRun = $null

Write-Step "Polling /renders/$runId every $PollSecs s (timeout $TimeoutMins min) …"
while ($true) {
    if ((Get-Date) -gt $deadline) {
        Write-Fail "timed out after $TimeoutMins minutes without terminal status"
        Write-Fail "last state: $lastProgress"
        exit 1
    }

    try {
        $run = Invoke-RestMethod -Uri "$ApiBase/renders/$runId" -TimeoutSec 10 -ErrorAction Stop
    } catch {
        Write-Warn "poll returned error: $($_.Exception.Message); will retry"
        Start-Sleep -Seconds $PollSecs
        continue
    }

    $status      = $run.status
    $progress    = if ($null -ne $run.progress_percent) { $run.progress_percent } else { 0 }
    $completed   = if ($null -ne $run.completed_segments) { $run.completed_segments } else { 0 }
    $total       = if ($null -ne $run.segment_count) { $run.segment_count } else { 0 }
    $restarts    = if ($null -ne $run.restart_count) { $run.restart_count } else { 0 }

    $lastProgress = "status=$status progress=$($progress)% ($completed/$total) restarts=$restarts"
    Write-Host "  · $lastProgress"

    if ($status -in @('completed', 'failed', 'cancelled')) {
        $finalRun = $run
        break
    }

    Start-Sleep -Seconds $PollSecs
}

# ── verify acceptance criteria ──────────────────────────────────────
Write-Host ''
Write-Step 'Verifying Item E acceptance criteria …'
$failed = 0

$finalStatus = $finalRun.status
$finalRc     = if ($null -ne $finalRun.restart_count) { [int]$finalRun.restart_count } else { 0 }
$finalLbr    = if ($null -ne $finalRun.last_breach_reason) { [string]$finalRun.last_breach_reason } else { '' }
$finalArt    = if ($null -ne $finalRun.final_artifact_id) { [string]$finalRun.final_artifact_id } else { '' }
$finalEc     = if ($null -ne $finalRun.error_code) { [string]$finalRun.error_code } else { '' }

# Criterion 1: status == completed
if ($finalStatus -eq 'completed') {
    Write-Pass 'Criterion 1: status=completed (chain completed via transparent restart)'
} else {
    Write-Fail "Criterion 1: status=$finalStatus, error_code=$finalEc (expected completed)"
    $failed = 1
}

# Criterion 2: restart_count >= 1
if ($finalRc -ge 1) {
    Write-Pass "Criterion 2: restart_count=$finalRc (supervisor tripped + runner restarted)"
} else {
    Write-Fail "Criterion 2: restart_count=$finalRc (expected >= 1)"
    Write-Fail '  was $Env:NEXUS_VIDEO_LTX23_VRAM_MIN_FREE_MB = ''999999'' set on the host process?'
    $failed = 1
}

# Criterion 3: last_breach_reason mentions free_mb
if ($finalLbr -like '*free_mb*') {
    Write-Pass "Criterion 3: last_breach_reason mentions free_mb — `"$finalLbr`""
} else {
    Write-Fail "Criterion 3: last_breach_reason=`"$finalLbr`" (expected to mention free_mb)"
    $failed = 1
}

# Criterion 4: final_artifact_id present
if ($finalArt -and $finalArt -ne 'null') {
    Write-Pass "Criterion 4: final_artifact_id=$finalArt"
} else {
    Write-Fail 'Criterion 4: final_artifact_id missing/null (worker DONE was not received OR final.mp4 copy failed)'
    $failed = 1
}

# ── bonus: segment-row sanity (covers Item B) ───────────────────────
Write-Step 'Sanity-checking segment rows (Item B no-coalescing guard) …'
try {
    $segments = Invoke-RestMethod -Uri "$ApiBase/renders/$runId/segments" -TimeoutSec 10 -ErrorAction Stop
} catch {
    $segments = @()
}
$segCount   = @($segments).Count
$segOkCount = (@($segments) | Where-Object {
    $_.status -eq 'completed' -and $_.started_at -and $_.completed_at
}).Count

if ($segCount -gt 0 -and $segOkCount -eq $segCount) {
    Write-Pass "Segment sanity: $segOkCount/$segCount segments completed with both started_at + completed_at populated"
} else {
    Write-Fail "Segment sanity: $segOkCount/$segCount segments fully populated"
    Write-Fail '  (started_at NULL on a completed segment is the regression Item B no-coalescing test guards against)'
    $failed = 1
}

# ── cleanup ─────────────────────────────────────────────────────────
Write-Host ''
if (-not $KeepRun) {
    Write-Step 'Cleaning up run artifacts (pass -KeepRun to retain) …'
    Write-Warn 'no DELETE endpoint — run record stays in DB for forensics'
}

Write-Host ''
if ($failed -eq 0) {
    Write-Host "PASS — Item E smoke test green. Run id: $runId" -ForegroundColor Green
    exit 0
} else {
    Write-Host "FAIL — Item E smoke test failed. Inspect run $runId." -ForegroundColor Red
    Write-Host 'Final state:'
    $finalRun | ConvertTo-Json -Depth 3
    exit 1
}
