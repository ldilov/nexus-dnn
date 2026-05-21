# Runs an ltxv2 python smoke through the worker venv so the operator
# does not have to spell out the venv interpreter + PYTHONPATH by hand.
# Paired with run-ltxv2-smoke.sh (Windows + Linux parity).
#
# Usage: ./run-ltxv2-smoke.ps1 [<smoke-script.py>] [args...]
#   ./run-ltxv2-smoke.ps1                            # i2v render smoke
#   ./run-ltxv2-smoke.ps1 smoke-ltxv2-load.py        # stack + encoder load
#   ./run-ltxv2-smoke.ps1 smoke-ltxv2-multiscene.py  # 2-3 scene continuation
#   $env:NEXUS_HOST_DATA_DIR='D:\data\.nexus'; ./run-ltxv2-smoke.ps1 smoke-ltxv2-render.py
$ErrorActionPreference = 'Stop'

$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$ext = Split-Path -Parent $here

$py = Join-Path $ext 'worker\.venv\Scripts\python.exe'
if (-not (Test-Path $py)) { $py = Join-Path $ext 'worker/.venv/bin/python' }
if (-not (Test-Path $py)) {
    Write-Error "worker venv not found under $ext\worker\.venv — install the profile first"
    exit 2
}

# Default to the render smoke; accept an optional first arg to override.
$smoke = if ($args.Count -ge 1) { $args[0] } else { 'smoke-ltxv2-render.py' }
$rest = @()
if ($args.Count -gt 1) { $rest = $args[1..($args.Count - 1)] }

if (-not (Test-Path $smoke)) { $smoke = Join-Path $here $smoke }
if (-not (Test-Path $smoke)) {
    Write-Error "smoke script not found: $smoke"
    exit 2
}

$env:PYTHONPATH = (Join-Path $ext 'worker\src') +
    $(if ($env:PYTHONPATH) { [IO.Path]::PathSeparator + $env:PYTHONPATH } else { '' })
& $py $smoke @rest
exit $LASTEXITCODE
