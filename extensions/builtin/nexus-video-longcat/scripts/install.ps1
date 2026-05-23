# Headless installer wrapper for nexus-video-longcat (Windows / PowerShell).
#
# Mirror of scripts/install.sh — drives the full install flow (uv sync +
# weight download + vendor source-file fetch) from a plain PowerShell
# session.
#
# Usage:
#   .\scripts\install.ps1 -HostDataDir D:\nexus_host_data
#   .\scripts\install.ps1 -Profile rtx50-fp8 -HostDataDir D:\nexus_host_data
#   .\scripts\install.ps1 -Profile fake -HostDataDir D:\nexus_host_data -ExtraArgs '--skip-vendor'
#
# All -ExtraArgs entries are forwarded verbatim to
# `longcat_video_worker.headless_install`.

[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string]$HostDataDir,

    [Parameter()]
    [ValidateSet('rtx50-fp8', 'rtx50-fp8-distill', 'fake')]
    [string]$Profile = 'rtx50-fp8',

    [Parameter()]
    [string[]]$ExtraArgs = @()
)

$ErrorActionPreference = 'Stop'

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ExtDir = Resolve-Path (Join-Path $ScriptDir '..')
$WorkerDir = Join-Path $ExtDir 'worker'

if (-not (Get-Command uv -ErrorAction SilentlyContinue)) {
    Write-Error "uv not found on PATH. Install uv: https://docs.astral.sh/uv/getting-started/installation/"
    exit 127
}

Set-Location $WorkerDir

Write-Host "[install.ps1] bootstrapping worker package via uv sync (no extras)" -ForegroundColor Cyan
& uv sync --no-dev
if ($LASTEXITCODE -ne 0) {
    Write-Error "uv sync (bootstrap) failed with exit $LASTEXITCODE"
    exit $LASTEXITCODE
}

$argv = @(
    'run', 'python', '-m', 'longcat_video_worker.headless_install',
    '--profile', $Profile,
    '--host-data-dir', $HostDataDir
) + $ExtraArgs

Write-Host "[install.ps1] dispatching: uv $($argv -join ' ')" -ForegroundColor Cyan
& uv @argv
exit $LASTEXITCODE
