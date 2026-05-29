# Headless installer wrapper for nexus-video-svi2-pro (Windows / PowerShell).
#
# Mirror of scripts/install.sh — drives the full install flow (uv sync +
# weight download) from a plain PowerShell session.
#
# Usage:
#   .\scripts\install.ps1 -Profile rtx50-fp8 -Dest D:\models
#   .\scripts\install.ps1 -Dest D:\models
#   .\scripts\install.ps1 -Help
#
# All -ExtraArgs entries are forwarded verbatim to
# `svi2_video_worker.headless_install`.

[CmdletBinding()]
param(
    [Parameter()]
    [ValidateSet('rtx50-fp8')]
    [string]$Profile = 'rtx50-fp8',

    [Parameter()]
    [string]$Dest,

    [Parameter()]
    [string[]]$ExtraArgs = @(),

    [switch]$Help
)

if ($Help) {
    Write-Host @"
nexus-video-svi2-pro installer

Usage:
  .\scripts\install.ps1 [Options]

Options:
  -Profile PROFILE         Render profile (default: rtx50-fp8)
  -Dest DIR                Models destination directory (default: ./models)
  -Help                    Show this help and exit
  -ExtraArgs ARGS          Additional arguments for headless_install

Environment variables:
  NEXUS_MODELS_DIR         Default models destination (overridden by -Dest)

Examples:
  .\scripts\install.ps1 -Profile rtx50-fp8 -Dest D:\nexus_models
  .\scripts\install.ps1 -Dest D:\models
"@
    exit 0
}

$ErrorActionPreference = 'Stop'

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ExtDir = Resolve-Path (Join-Path $ScriptDir '..')
$WorkerDir = Join-Path $ExtDir 'worker'

if (-not (Get-Command uv -ErrorAction SilentlyContinue)) {
    Write-Error "uv not found on PATH. Install uv: https://docs.astral.sh/uv/getting-started/installation/"
    exit 127
}

Set-Location $WorkerDir

# `uv run` auto-syncs the project before exec. Always include diffusers +
# flash extras for svi2-pro.
$UvRunFlags = @('run', '--extra', 'diffusers', '--extra', 'flash')

$argv = $UvRunFlags + @(
    'python', '-m', 'svi2_video_worker.headless_install',
    '--profile', $Profile
)

# Add --dest if provided
if ($Dest) {
    $argv += @('--dest', $Dest)
}

# Forward extra args
$argv += $ExtraArgs

Write-Host "[install.ps1] dispatching: uv $($argv -join ' ')" -ForegroundColor Cyan
& uv @argv
exit $LASTEXITCODE
