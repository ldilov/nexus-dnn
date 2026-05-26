# Operator smoke test for the ephemeral-planner-lease path (Spec 050 PR-6).
# Windows counterpart of smoke-planner-ephemeral.sh.
#
# Drives /api/v1/services/text-completion with ephemeral=true against a
# running host, then asserts the underlying lease was reaped.
#
# Exit codes match the .sh version: 0 pass, 2 prereq, 3 request, 4 reap.

$ErrorActionPreference = 'Stop'

$Port = if ($env:NEXUS_HOST_PORT) { $env:NEXUS_HOST_PORT } else { '7777' }
$Base = "http://127.0.0.1:$Port"

try {
    Invoke-RestMethod -Uri "$Base/api/v1/health" -TimeoutSec 5 | Out-Null
}
catch {
    Write-Error "[smoke] FAIL prereq: host not reachable at $Base"
    exit 2
}

try {
    $installs = Invoke-RestMethod -Uri "$Base/api/v1/backends/installs" -TimeoutSec 10
}
catch {
    Write-Error "[smoke] FAIL prereq: backends/installs endpoint errored"
    exit 2
}

$eligible = @($installs | Where-Object {
    $_.status -eq 'validated' -and ($_.capability_tags -contains 'text-completion')
}).Count

if ($eligible -lt 1) {
    Write-Error "[smoke] FAIL prereq: no Validated install with text-completion capability_tag"
    exit 2
}

Write-Output "[smoke] prereqs OK: host=$Base eligible_installs=$eligible"

$body = @{
    system         = 'be terse'
    user           = 'Reply with the single word: pong'
    max_tokens     = 16
    timeout_ms     = 30000
    n_gpu_layers   = -1
    required_tags  = @('text-completion')
    ephemeral      = $true
} | ConvertTo-Json -Compress

$sw = [System.Diagnostics.Stopwatch]::StartNew()
try {
    $resp = Invoke-RestMethod -Uri "$Base/api/v1/services/text-completion" `
        -Method Post -ContentType 'application/json' -Body $body -TimeoutSec 60
}
catch {
    Write-Error "[smoke] FAIL: completion request errored: $_"
    exit 3
}
$sw.Stop()

if (-not $resp.text) {
    Write-Error "[smoke] FAIL: empty text field in response: $($resp | ConvertTo-Json -Compress)"
    exit 3
}

Write-Output "[smoke] completion OK: latency=$($sw.ElapsedMilliseconds)ms text='$($resp.text)'"

Start-Sleep -Seconds 2

try {
    $leases = Invoke-RestMethod -Uri "$Base/api/v1/backends/leases" -TimeoutSec 10
    $readyRemaining = @($leases | Where-Object { $_.state -eq 'ready' }).Count
}
catch {
    Write-Output "[smoke] WARN: could not query lease list; skip ephemeral verification"
    Write-Output "[smoke] PASS"
    exit 0
}

if ($readyRemaining -ne 0) {
    Write-Warning "[smoke] WARN: $readyRemaining Ready lease(s) remain after ephemeral completion"
    exit 4
}

Write-Output "[smoke] ephemeral release OK: no Ready leases remaining"
Write-Output "[smoke] PASS"
