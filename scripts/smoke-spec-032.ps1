<#
.SYNOPSIS
  Spec 032 T108 — end-to-end smoke proof harness for the generic
  backend-runtime subsystem on a clean Windows host.

.DESCRIPTION
  Drives the full user journey for the test-echo-runtime fixture:
    1. Probes the running host's /api/v1/backend-runtimes catalog.
    2. POSTs /api/v1/backend-runtimes/test.echo/install.
    3. Polls GET /api/v1/backend-runtime-installs/{id} until the row
       reaches `validated` or fails.
    4. POSTs /install/{id}/start to acquire a lease.
    5. POSTs /install/{id}/stop to release it.
    6. DELETEs /install/{id} to clean up.
  Emits a structured `smoke-proof.json` capturing per-phase wall-clock
  timings, terminal statuses, and the boundary-audit exit code.

.PARAMETER BaseUrl
  Base URL of the running host. Defaults to http://127.0.0.1:3000.

.PARAMETER OutputPath
  Path to write the proof JSON. Defaults to
  specs/032-backend-runtime-catalog/smoke-proof.json.

.EXAMPLE
  powershell -ExecutionPolicy Bypass -File scripts/smoke-spec-032.ps1

.NOTES
  Exit codes:
    0 — smoke passed; proof JSON written.
    1 — host unreachable or catalog missing test.echo.
    2 — install pipeline failed.
    3 — lease acquire/release failed.
    4 — boundary audit failed.
#>

[CmdletBinding()]
param(
    [string]$BaseUrl = "http://127.0.0.1:3000",
    [string]$OutputPath = "specs/032-backend-runtime-catalog/smoke-proof.json",
    [int]$InstallTimeoutSec = 180
)

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

function Stamp {
    return (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
}

function Now-Ms {
    return [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
}

function Invoke-Host {
    param([string]$Method, [string]$Path, [object]$Body = $null)
    $uri = "$BaseUrl$Path"
    $args = @{
        Method              = $Method
        Uri                 = $uri
        ContentType         = "application/json"
        UseBasicParsing     = $true
        ErrorAction         = "Stop"
        TimeoutSec          = 30
    }
    if ($Body) {
        $args["Body"] = ($Body | ConvertTo-Json -Compress)
    }
    return Invoke-RestMethod @args
}

$proof = [ordered]@{
    spec              = "032"
    started_at        = Stamp
    host_base_url     = $BaseUrl
    runtime_id        = "test.echo"
    phases            = @()
    install           = $null
    lease             = $null
    cleanup           = $null
    boundary_audit    = $null
    terminal          = $null
    duration_ms       = 0
}

$overall_start = Now-Ms

try {
    Write-Host "[1/6] catalog probe …" -ForegroundColor Cyan
    $t0 = Now-Ms
    $catalog = Invoke-Host -Method GET -Path "/api/v1/backend-runtimes"
    $echo = $catalog.data.runtimes | Where-Object { $_.runtime_id -eq "test.echo" } | Select-Object -First 1
    if (-not $echo) {
        $proof.terminal = "catalog_missing_test_echo"
        $proof.duration_ms = (Now-Ms) - $overall_start
        $proof | ConvertTo-Json -Depth 10 | Set-Content -Path $OutputPath -Encoding utf8
        Write-Error "test.echo not in catalog; ensure test-echo-runtime extension is activated"
        exit 1
    }
    $proof.phases += [ordered]@{ name = "catalog_probe"; duration_ms = (Now-Ms) - $t0 }

    Write-Host "[2/6] POST install …" -ForegroundColor Cyan
    $t0 = Now-Ms
    $installResp = Invoke-Host -Method POST -Path "/api/v1/backend-runtimes/test.echo/install" -Body @{
        release_id           = "v0_0_1"
        platform             = if ($IsWindows -or $env:OS -like "*Windows*") { "windows-x64" } else { "linux-x64" }
        accelerator_profile  = "cpu"
    }
    $installId = $installResp.data.runtime_install_id
    $proof.install = [ordered]@{
        install_id         = $installId
        pipeline_status    = $installResp.data.pipeline_status
        post_duration_ms   = (Now-Ms) - $t0
    }
    $proof.phases += [ordered]@{ name = "install_post"; duration_ms = (Now-Ms) - $t0 }

    Write-Host "[3/6] poll install to validated …" -ForegroundColor Cyan
    $t0 = Now-Ms
    $deadline = (Now-Ms) + ($InstallTimeoutSec * 1000)
    $row = $null
    do {
        Start-Sleep -Milliseconds 500
        $row = (Invoke-Host -Method GET -Path "/api/v1/backend-runtime-installs/$installId").data
    } while ($row.status -notin @("validated", "failed", "abandoned") -and (Now-Ms) -lt $deadline)
    $proof.install.status        = $row.status
    $proof.install.validated_at  = $row.validated_at
    $proof.install.poll_duration_ms = (Now-Ms) - $t0
    $proof.phases += [ordered]@{ name = "install_poll"; duration_ms = (Now-Ms) - $t0 }
    if ($row.status -ne "validated") {
        $proof.terminal = "install_$($row.status)"
        $proof.install.last_failure_category = $row.last_failure_category
        $proof.install.last_failure_detail   = $row.last_failure_detail
        $proof.duration_ms = (Now-Ms) - $overall_start
        $proof | ConvertTo-Json -Depth 10 | Set-Content -Path $OutputPath -Encoding utf8
        Write-Error "install did not reach validated; see $OutputPath"
        exit 2
    }

    Write-Host "[4/6] start lease …" -ForegroundColor Cyan
    $t0 = Now-Ms
    $leaseResp = Invoke-Host -Method POST -Path "/api/v1/backend-runtime-installs/$installId/start"
    $leaseId = $leaseResp.data.lease_id
    $proof.lease = [ordered]@{
        lease_id        = $leaseId
        state           = $leaseResp.data.state
        pid             = $leaseResp.data.pid
        start_ms        = (Now-Ms) - $t0
    }
    $proof.phases += [ordered]@{ name = "lease_start"; duration_ms = (Now-Ms) - $t0 }

    Write-Host "[5/6] stop lease …" -ForegroundColor Cyan
    $t0 = Now-Ms
    $stopResp = Invoke-Host -Method POST -Path "/api/v1/backend-runtime-installs/$installId/stop"
    $proof.lease.draining_leases = $stopResp.data.draining_leases
    $proof.lease.stop_ms = (Now-Ms) - $t0
    $proof.phases += [ordered]@{ name = "lease_stop"; duration_ms = (Now-Ms) - $t0 }

    Write-Host "[6/6] uninstall + boundary audit …" -ForegroundColor Cyan
    $t0 = Now-Ms
    try {
        Invoke-WebRequest -Method DELETE -Uri "$BaseUrl/api/v1/backend-runtime-installs/$installId" -UseBasicParsing -ErrorAction Stop | Out-Null
        $proof.cleanup = [ordered]@{ uninstall_status = 204; duration_ms = (Now-Ms) - $t0 }
    } catch {
        $proof.cleanup = [ordered]@{ uninstall_status = $_.Exception.Response.StatusCode.value__; duration_ms = (Now-Ms) - $t0 }
    }

    $auditOut = & powershell -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot "audit-runtime-boundary.ps1") 2>&1
    $proof.boundary_audit = [ordered]@{
        exit_code = $LASTEXITCODE
        tail      = ($auditOut | Select-Object -Last 1).ToString()
    }
    if ($LASTEXITCODE -ne 0) {
        $proof.terminal = "boundary_audit_failed"
        $proof.duration_ms = (Now-Ms) - $overall_start
        $proof | ConvertTo-Json -Depth 10 | Set-Content -Path $OutputPath -Encoding utf8
        exit 4
    }

    $proof.terminal = "passed"
    $proof.duration_ms = (Now-Ms) - $overall_start
    $proof | ConvertTo-Json -Depth 10 | Set-Content -Path $OutputPath -Encoding utf8
    Write-Host "SMOKE PASSED — proof written to $OutputPath" -ForegroundColor Green
    exit 0
}
catch {
    $proof.terminal = "error"
    $proof.error = $_.Exception.Message
    $proof.duration_ms = (Now-Ms) - $overall_start
    $proof | ConvertTo-Json -Depth 10 | Set-Content -Path $OutputPath -Encoding utf8
    Write-Error $_.Exception.Message
    exit 1
}
