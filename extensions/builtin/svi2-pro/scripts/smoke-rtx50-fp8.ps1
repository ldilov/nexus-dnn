# Operator wrapper for gpu_smoke.py.
#
# Runs the SVI2-Pro i2v demonic-nun smoke on an RTX 5070 Ti with the
# rtx50-fp8 profile.  Prereqs: weights downloaded via install.ps1,
# worker venv built (install.ps1 handles both).
#
# Usage:
#   smoke-rtx50-fp8.ps1 --models-dir D:\models --ref-image D:\inputs\nun.jpg
#   smoke-rtx50-fp8.ps1 -Help
#
# All additional args are forwarded to gpu_smoke.py.

$ErrorActionPreference = 'Stop'

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ExtDir = Resolve-Path (Join-Path $ScriptDir '..')
$WorkerDir = Join-Path $ExtDir 'worker'

if ($args -contains '--help' -or $args -contains '-Help' -or $args -contains '-h') {
    Write-Host "Usage: smoke-rtx50-fp8.ps1 --models-dir PATH --ref-image PATH [options]"
    Write-Host ""
    Write-Host "Options forwarded to gpu_smoke.py:"
    Write-Host "  --models-dir PATH       (required) path to downloaded model weights"
    Write-Host "  --ref-image PATH        (required) i2v conditioning image"
    Write-Host "  --prompts-file PATH     override bundled demonic_nun_prompts.txt"
    Write-Host "  --output PATH           output mp4 (default: videos/svi2_nun.mp4)"
    Write-Host "  --num-clips N           number of clips to render (default: 4)"
    Write-Host "  --height N              frame height (default: 832)"
    Write-Host "  --width N               frame width (default: 480)"
    Write-Host "  --cfg-scale F           CFG scale (default: 5.0)"
    Write-Host "  --num-overlap-frame N   overlap frames between clips (default: 4)"
    Write-Host "  --num-motion-latent N   motion latent count (default: 1)"
    exit 0
}

if (-not (Get-Command uv -ErrorAction SilentlyContinue)) {
    Write-Error "[smoke] FAIL prereq: uv not on PATH"
    Write-Error "[smoke]   install uv: https://docs.astral.sh/uv/getting-started/installation/"
    exit 2
}

if (-not (Test-Path (Join-Path $WorkerDir '.venv'))) {
    Write-Error "[smoke] FAIL prereq: worker venv not found at $WorkerDir\.venv"
    Write-Error "[smoke]   run: .\scripts\install.ps1 --profile rtx50-fp8 --dest <models_dir>"
    exit 2
}

$env:NEXUS_VIDEO_SVI2_RUNTIME = 'rtx50-fp8'

Set-Location $WorkerDir
& uv run --extra diffusers --extra flash python (Join-Path $ScriptDir 'gpu_smoke.py') @args
exit $LASTEXITCODE
