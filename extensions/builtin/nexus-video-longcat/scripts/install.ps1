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

# `uv run` auto-syncs the project before exec, so a separate bootstrap is not
# needed. fake profile skips the heavy `diffusers` extra (no torch / cu128).
$UvRunFlags = @('run')
if ($Profile -ne 'fake') {
    $UvRunFlags += @('--extra', 'diffusers')
}

$argv = $UvRunFlags + @(
    'python', '-m', 'longcat_video_worker.headless_install',
    '--profile', $Profile,
    '--host-data-dir', $HostDataDir
) + $ExtraArgs

Write-Host "[install.ps1] dispatching: uv $($argv -join ' ')" -ForegroundColor Cyan
& uv @argv
exit $LASTEXITCODE
