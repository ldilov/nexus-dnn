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
#
# Prereqs:
#   - host running on http://127.0.0.1:$env:NEXUS_HOST_PORT (default 7777)
#   - >= 1 Validated install with capability_tag "text-completion"
#   - worker venv hydrated at extensions/builtin/nexus-video-longcat/worker/.venv
#
# Exit codes:
#   0  smoke passed
#   2  prerequisite missing
#   3  worker subprocess died or RPC errored
#   4  response shape invalid

$ErrorActionPreference = 'Stop'

$Port = if ($env:NEXUS_HOST_PORT) { $env:NEXUS_HOST_PORT } else { '7777' }
$Base = "http://127.0.0.1:$Port"
$WallBudgetS = if ($env:LONGCAT_PLAN_EXPAND_WALL_BUDGET_S) { [int]$env:LONGCAT_PLAN_EXPAND_WALL_BUDGET_S } else { 60 }

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ExtDir = Resolve-Path (Join-Path $ScriptDir '..')
$WorkerDir = Join-Path $ExtDir 'worker'
$VenvPy = Join-Path $WorkerDir '.venv\Scripts\python.exe'
if (-not (Test-Path $VenvPy)) {
    $VenvPy = Join-Path $WorkerDir '.venv/bin/python'
}

if (-not (Test-Path $VenvPy)) {
    Write-Error "[smoke] FAIL prereq: worker venv python not found at $VenvPy"
    Write-Error "[smoke]   run: cd $WorkerDir; uv sync"
    exit 2
}

try {
    $null = Invoke-RestMethod -Uri "$Base/api/v1/health" -TimeoutSec 5
} catch {
    Write-Error "[smoke] FAIL prereq: host not reachable at $Base"
    exit 2
}

$LLMAvailable = $true
$probeBody = '{"system":"","user":"x","max_tokens":1,"timeout_ms":2000,"required_tags":["text-completion"]}'
try {
    $null = Invoke-RestMethod -Uri "$Base/api/v1/services/text-completion" `
        -Method Post -ContentType 'application/json' -Body $probeBody -TimeoutSec 5
    Write-Output "[smoke] prereqs OK: host=$Base broker=ready"
} catch {
    $code = $null
    if ($_.Exception.Response) { $code = [int]$_.Exception.Response.StatusCode }
    switch ($code) {
        503 {
            $LLMAvailable = $false
            Write-Output "[smoke] WARN prereq: broker returned 503 - no Validated text-completion install."
            Write-Output "[smoke]   continuing; expecting compiler=llm_fallback_deterministic"
        }
        408 { Write-Output "[smoke] prereqs OK: host=$Base broker=ready (probe http=408)" }
        504 { Write-Output "[smoke] prereqs OK: host=$Base broker=ready (probe http=504)" }
        default {
            Write-Error "[smoke] FAIL prereq: broker probe failed (http=$code): $($_.Exception.Message)"
            exit 2
        }
    }
}

$Request = @{
    jsonrpc = '2.0'
    id      = 1
    method  = 'longcat.video.plan.expand'
    params  = @{
        prompt           = 'Alice walks into a noir-lit bar then sits at a piano then plays a slow melody'
        duration_seconds = 9.0
        scene_count      = 3
        style_hint       = 'noir'
        use_llm          = $true
        seed             = 42
    }
} | ConvertTo-Json -Compress

$psi = New-Object System.Diagnostics.ProcessStartInfo
$psi.FileName = $VenvPy
$psi.ArgumentList.Add('-m')
$psi.ArgumentList.Add('longcat_video_worker')
$psi.RedirectStandardInput = $true
$psi.RedirectStandardOutput = $true
$psi.RedirectStandardError = $true
$psi.UseShellExecute = $false
$psi.Environment['NEXUS_VIDEO_LONGCAT_RUNTIME'] = 'fake'
$psi.Environment['NEXUS_HOST_PORT'] = "$Port"
$psi.Environment['PYTHONUNBUFFERED'] = '1'

$proc = [System.Diagnostics.Process]::Start($psi)
$startMs = [int64]([DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds())

$proc.StandardInput.WriteLine($Request)
$proc.StandardInput.Close()

$ResponseLine = $null
$ReadTask = $proc.StandardOutput.ReadLineAsync()
if ($ReadTask.Wait([TimeSpan]::FromSeconds($WallBudgetS))) {
    $ResponseLine = $ReadTask.Result
}

try { $proc.Kill() } catch {}
$endMs = [int64]([DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds())

if (-not $ResponseLine) {
    Write-Error "[smoke] FAIL: worker produced no response within ${WallBudgetS}s"
    exit 3
}

try {
    $resp = $ResponseLine | ConvertFrom-Json
} catch {
    Write-Error "[smoke] FAIL: response is not JSON; raw=$ResponseLine"
    exit 3
}

if (-not $resp.result) {
    Write-Error "[smoke] FAIL: response has no .result; raw=$ResponseLine"
    exit 3
}

$Compiler = $resp.result.compiler
$SceneCount = @($resp.result.scenes).Count
$WarnCodes = @($resp.result.warnings | ForEach-Object { $_.code }) -join ','

if ($Compiler -notin @('llm', 'llm_fallback_deterministic', 'deterministic')) {
    Write-Error "[smoke] FAIL: unexpected compiler='$Compiler'; raw=$ResponseLine"
    exit 4
}

if ($SceneCount -ne 3) {
    Write-Error "[smoke] FAIL: expected 3 scenes, got $SceneCount"
    exit 4
}

$Latency = $endMs - $startMs
$WarnDisplay = if ($WarnCodes) { $WarnCodes } else { 'none' }
Write-Output "[smoke] plan.expand OK: compiler=$Compiler scenes=$SceneCount latency=${Latency}ms warnings=$WarnDisplay"

if ($Compiler -eq 'llm_fallback_deterministic') {
    if ($LLMAvailable) {
        Write-Output "[smoke] WARN: broker was ready at probe time but planner fell back -"
        Write-Output "[smoke]       LLM_LEASE_UNAVAILABLE mid-run; check host log"
    } else {
        Write-Output "[smoke] OK: graceful fallback as expected (no Validated LLM install)"
    }
} elseif ($Compiler -eq 'llm' -and -not $LLMAvailable) {
    Write-Output "[smoke] WARN: LLM ran even though probe returned 503 - install state changed mid-run"
}

Write-Output "[smoke] PASS"
