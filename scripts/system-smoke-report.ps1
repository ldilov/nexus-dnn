# nexus-dnn SYSTEM smoke + detailed report (PowerShell parity).
#
# Probes every operator-relevant HTTP surface, validates extension activation,
# checks backend-runtimes catalog population, exercises the text-completion
# broker, and runs the LLM plan.expand subprocess smoke.
#
# Output: structured human-readable report; exit non-zero only on FAIL.
#
# Usage:
#   .\scripts\system-smoke-report.ps1                  # default port
#   .\scripts\system-smoke-report.ps1 -Port 7777
#   .\scripts\system-smoke-report.ps1 -Json

param(
    [int]$Port = 0,
    [switch]$Json
)

$ErrorActionPreference = 'Continue'
if ($Port -eq 0) {
    $Port = if ($env:NEXUS_HOST_PORT) { [int]$env:NEXUS_HOST_PORT } else { 3000 }
}
$Base = "http://127.0.0.1:$Port"

$Pass = 0; $Warn = 0; $Fail = 0
$Results = New-Object System.Collections.Generic.List[Hashtable]
function Record($status, $name, $detail) {
    switch ($status) { 'PASS' { $script:Pass++ } 'WARN' { $script:Warn++ } 'FAIL' { $script:Fail++ } }
    $script:Results.Add(@{ status = $status; name = $name; detail = $detail })
}

function ProbeJson($path) {
    try { return Invoke-RestMethod -Uri "$Base$path" -TimeoutSec 5 -ErrorAction Stop } catch { return $null }
}
function ProbeStatus($path) {
    try { $r = Invoke-WebRequest -Uri "$Base$path" -TimeoutSec 5 -ErrorAction Stop; return [int]$r.StatusCode }
    catch { if ($_.Exception.Response) { return [int]$_.Exception.Response.StatusCode } else { return 0 } }
}
function ProbePost($path, $body) {
    $sw = [System.Diagnostics.Stopwatch]::StartNew()
    try {
        $r = Invoke-WebRequest -Uri "$Base$path" -Method Post -Body $body -ContentType 'application/json' -TimeoutSec 5 -ErrorAction Stop
        $sw.Stop(); return @{ code = [int]$r.StatusCode; ms = $sw.ElapsedMilliseconds; body = $r.Content }
    } catch {
        $sw.Stop()
        $code = if ($_.Exception.Response) { [int]$_.Exception.Response.StatusCode } else { 0 }
        return @{ code = $code; ms = $sw.ElapsedMilliseconds; body = $_.Exception.Message }
    }
}

$StartTs = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
$GitRev = (git -C (Join-Path (Split-Path $PSCommandPath) '..') rev-parse --short HEAD 2>$null)
if (-not $GitRev) { $GitRev = 'unknown' }

# [01] HOST HEALTH
$h = ProbeJson '/api/v1/health'
if ($h -and $h.data.status -eq 'healthy') {
    $subs = ($h.data.details.subsystems | ForEach-Object { $_.name }) -join ','
    Record 'PASS' 'host-health' "subsystems=$subs"
} else {
    Record 'FAIL' 'host-health' "host not reachable at $Base"
}

# [02] EXTENSIONS ACTIVE
$LongcatActive = $false
$e = ProbeJson '/api/v1/extensions'
if ($e -and $e.data.items) {
    $exts = $e.data.items
    $ids = ($exts | ForEach-Object { "$($_.id)@$($_.version)[$($_.status)]" }) -join ','
    $LongcatActive = ($exts | Where-Object { $_.id -eq 'nexus.video.longcat' }).Count -gt 0
    if ($LongcatActive) {
        Record 'PASS' 'extensions-active' "count=$($exts.Count) (longcat present)"
    } else {
        Record 'WARN' 'extensions-active' "count=$($exts.Count) - longcat MISSING; ids=$ids"
    }
} else {
    Record 'FAIL' 'extensions-active' 'could not fetch /extensions'
}

# [03] BACKEND-RUNTIMES CATALOG
$TcRuntimes = @()
$br = ProbeJson '/api/v1/backend-runtimes'
if ($br -and $br.data.runtimes) {
    $rts = $br.data.runtimes
    $TcRuntimes = $rts | Where-Object { $_.capability_tags -contains 'text-completion' } | ForEach-Object { $_.runtime_id }
    if ($rts.Count -ge 1) {
        Record 'PASS' 'backend-runtimes-catalog' "count=$($rts.Count) text_completion=[$($TcRuntimes -join ',')]"
    } else {
        Record 'FAIL' 'backend-runtimes-catalog' 'catalog EMPTY - register_contributions() not wired?'
    }
} else {
    Record 'FAIL' 'backend-runtimes-catalog' 'could not fetch /backend-runtimes'
}

# [04] BACKEND-RUNTIME-INSTALLS per text-completion runtime
$ValidatedTc = 0; $TotalInstalls = 0; $InstallsDetail = @()
foreach ($rid in $TcRuntimes) {
    $i = ProbeJson "/api/v1/backend-runtime-installs?runtime_id=$rid"
    if ($i -and $i.data.installs) {
        $totl = $i.data.installs.Count
        $val = ($i.data.installs | Where-Object { $_.state -in @('validated', 'installed') }).Count
        $TotalInstalls += $totl
        $ValidatedTc += $val
        $InstallsDetail += "$rid`:$val/$totl"
    }
}
if ($ValidatedTc -ge 1) {
    Record 'PASS' 'text-completion-installs' "validated=$ValidatedTc total=$TotalInstalls per_runtime=$($InstallsDetail -join ';')"
} else {
    $d = if ($InstallsDetail) { $InstallsDetail -join ';' } else { 'none' }
    Record 'WARN' 'text-completion-installs' "0 validated - broker will return 503; per_runtime=$d"
}

# [05] TEXT-COMPLETION BROKER PROBE
$probeBody = '{"system":"","user":"x","max_tokens":1,"timeout_ms":2000,"required_tags":["text-completion"]}'
$r = ProbePost '/api/v1/services/text-completion' $probeBody
switch ($r.code) {
    200 { Record 'PASS' 'text-completion-broker' "200 - broker served real completion in $($r.ms)ms" }
    503 { Record 'WARN' 'text-completion-broker' "503 no_eligible_backend ($($r.ms)ms) - expected when no Validated install" }
    { $_ -in 408, 504 } { Record 'PASS' 'text-completion-broker' "$($r.code) - broker live, install present but timed out ($($r.ms)ms)" }
    default { Record 'FAIL' 'text-completion-broker' "unexpected http=$($r.code)" }
}

# [06] LEASE MANAGER (poll across known text-completion runtimes)
$leaseTotal = 0; $leaseChecked = 0
foreach ($rid in $TcRuntimes) {
    $l = ProbeJson "/api/v1/backend-runtime-leases?runtime_id=$rid"
    if ($l -and $l.data.leases) {
        $leaseTotal += $l.data.leases.Count
        $leaseChecked++
    } elseif ($l) {
        $leaseChecked++
    }
}
if ($leaseChecked -gt 0) {
    Record 'PASS' 'lease-manager' "active_leases=$leaseTotal across $leaseChecked text-completion runtime(s)"
} else {
    Record 'WARN' 'lease-manager' 'no text-completion runtimes to query - skipped'
}

# [07] LONGCAT EXTENSION SURFACE
if ($LongcatActive) {
    $lx = ProbeJson '/api/v1/extensions/nexus.video.longcat'
    if ($lx) {
        $brc = if ($lx.data.manifest.backend_runtimes) { $lx.data.manifest.backend_runtimes.Count } else { 0 }
        $opc = if ($lx.data.operators) { $lx.data.operators.Count } else { 0 }
        Record 'PASS' 'longcat-surface' "backend_runtimes=$brc operators=$opc"
    } else {
        Record 'WARN' 'longcat-surface' 'GET extensions/nexus.video.longcat failed'
    }
} else {
    Record 'WARN' 'longcat-surface' 'longcat not active - skip'
}

# [08] LLM SMOKE
$LongcatDir = Resolve-Path (Join-Path (Split-Path $PSCommandPath) '../extensions/builtin/nexus-video-longcat')
$SmokePs1 = Join-Path $LongcatDir 'scripts/smoke-plan-expand-llm.ps1'
if (Test-Path $SmokePs1) {
    $env:NEXUS_HOST_PORT = "$Port"
    $smokeOut = & powershell -ExecutionPolicy Bypass -File $SmokePs1 2>&1 | Select-Object -Last 5
    $smokeStr = ($smokeOut -join '|')
    if ($smokeStr -match 'PASS') {
        Record 'PASS' 'llm-plan-expand-smoke' "tail=$smokeStr"
    } else {
        Record 'FAIL' 'llm-plan-expand-smoke' "did not PASS; tail=$smokeStr"
    }
} else {
    Record 'WARN' 'llm-plan-expand-smoke' 'smoke script missing - skip'
}

# REPORT
if ($Json) {
    @{
        timestamp = $StartTs; host = $Base; git_rev = $GitRev
        summary = @{ pass = $Pass; warn = $Warn; fail = $Fail }
        results = $Results
    } | ConvertTo-Json -Depth 6
} else {
    Write-Output ""
    Write-Output "===================================================================="
    Write-Output "  nexus-dnn SYSTEM SMOKE REPORT"
    Write-Output ("  {0,-12} {1}" -f 'timestamp:', $StartTs)
    Write-Output ("  {0,-12} {1}" -f 'host:', $Base)
    Write-Output ("  {0,-12} {1}" -f 'git:', $GitRev)
    Write-Output "===================================================================="
    $i = 1
    foreach ($r in $Results) {
        $icon = switch ($r.status) { 'PASS' { 'OK ' } 'WARN' { 'WRN' } 'FAIL' { 'ERR' } default { '?  ' } }
        Write-Output ("  [{0:D2}] {1,-30} {2} {3,-5}" -f $i, $r.name, $icon, $r.status)
        if ($r.detail) { Write-Output ("       {0}" -f $r.detail) }
        $i++
    }
    Write-Output "===================================================================="
    Write-Output ("  SUMMARY: {0} PASS  {1} WARN  {2} FAIL" -f $Pass, $Warn, $Fail)
    Write-Output "===================================================================="
}

if ($Fail -gt 0) { exit 1 } else { exit 0 }
