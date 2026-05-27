# Operator wrapper for gpu_smoke_multiscene.py.
#
# Activates the worker uv venv and runs the multiscene render smoke.
# Passes through any extra args (e.g. --repro, --wall-budget=300).
#
# Prereqs:
#   - CUDA-capable GPU (RTX-class for distill, ~14 GiB usable VRAM)
#   - worker venv hydrated with [diffusers] extra
#   - $env:NEXUS_HOST_DATA_DIR points to a writable dir with weights present
#
# Exit codes propagate from gpu_smoke_multiscene.py.

$ErrorActionPreference = 'Stop'

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ExtDir = Resolve-Path (Join-Path $ScriptDir '..')
$WorkerDir = Join-Path $ExtDir 'worker'

if (-not (Get-Command uv -ErrorAction SilentlyContinue)) {
    Write-Error "[smoke] FAIL prereq: uv not on PATH"
    exit 2
}

if (-not (Test-Path (Join-Path $WorkerDir '.venv'))) {
    Write-Error "[smoke] FAIL prereq: worker venv not found at $WorkerDir\.venv"
    Write-Error "[smoke]   run: cd $WorkerDir; uv sync --extra diffusers --extra rtx"
    exit 2
}

Set-Location $WorkerDir
& uv run --extra diffusers python (Join-Path $ScriptDir 'gpu_smoke_multiscene.py') @args
exit $LASTEXITCODE
