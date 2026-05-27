# Operator wrapper for gpu_smoke_boundary_soft_pin.py.
#
# Activates the worker uv venv and runs the soft-pin boundary smoke.
# Renders the same 3-scene storyboard twice — once hard-cut, once soft —
# and asserts the soft boundary's transition_break_score is strictly
# lower than the hard one. Passes through any extra args (e.g.
# --wall-budget=900, --skip-assert).
#
# Prereqs:
#   - CUDA-capable GPU (RTX-class for distill, ~15 GiB usable VRAM)
#   - worker venv hydrated with [diffusers] extra
#   - $env:NEXUS_HOST_DATA_DIR points to a writable dir with weights present
#   - ffmpeg + ffprobe on PATH (for MP4 decode and frame count probe)
#
# Exit codes propagate from gpu_smoke_boundary_soft_pin.py.

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

if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue) -or -not (Get-Command ffprobe -ErrorAction SilentlyContinue)) {
    Write-Error "[smoke] FAIL prereq: ffmpeg / ffprobe not on PATH (required for MP4 decode + scoring)"
    exit 2
}

Set-Location $WorkerDir
& uv run --extra diffusers python (Join-Path $ScriptDir 'gpu_smoke_boundary_soft_pin.py') @args
exit $LASTEXITCODE
