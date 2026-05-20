# Runs an ltxv097 python smoke through the worker venv so the operator
# does not have to spell out the venv interpreter + PYTHONPATH by hand.
# Paired with run-ltxv097-smoke.sh (Windows + Linux parity).
#
# Usage: ./run-ltxv097-smoke.ps1 <smoke-script.py> [args...]
#   ./run-ltxv097-smoke.ps1 smoke-ltxv097-multiscene-20s.py
#   $env:NEXUS_I2V_TIER=1; ./run-ltxv097-smoke.ps1 smoke-ltxv097-multiscene-20s.py
#   ./run-ltxv097-smoke.ps1 smoke-ltxv097-negprompt-verify.py
$ErrorActionPreference = 'Stop'

$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$ext = Split-Path -Parent $here

$py = Join-Path $ext 'worker\.venv\Scripts\python.exe'
if (-not (Test-Path $py)) { $py = Join-Path $ext 'worker/.venv/bin/python' }
if (-not (Test-Path $py)) {
    Write-Error "worker venv not found under $ext\worker\.venv — install the profile first"
    exit 2
}

if ($args.Count -lt 1) {
    Write-Error "usage: run-ltxv097-smoke.ps1 <smoke-script.py> [args...]"
    exit 2
}
$smoke = $args[0]
if (-not (Test-Path $smoke)) { $smoke = Join-Path $here $smoke }
if (-not (Test-Path $smoke)) {
    Write-Error "smoke script not found: $smoke"
    exit 2
}
$rest = @()
if ($args.Count -gt 1) { $rest = $args[1..($args.Count - 1)] }

$env:PYTHONPATH = (Join-Path $ext 'worker\src') +
    $(if ($env:PYTHONPATH) { [IO.Path]::PathSeparator + $env:PYTHONPATH } else { '' })
& $py $smoke @rest
exit $LASTEXITCODE
