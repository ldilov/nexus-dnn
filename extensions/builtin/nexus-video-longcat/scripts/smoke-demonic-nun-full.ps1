# Operator wrapper for gpu_smoke_demonic_nun_full.py.
#
# Renders the 3-scene possession arc with soft transitions, refinement,
# and RTX 2x upscale. Two resolution profiles:
#   --profile 1080p  -> 960x540 draft x RTX 2x -> 1920x1080 final (default)
#   --profile 720p   -> 640x360 draft x RTX 2x -> 1280x720  final
#
# Pass through any extra args (e.g. --skip-score, --vram-budget=14.5).
#
# Prereqs:
#   - CUDA-capable GPU (RTX-class for distill + nvvfx)
#   - worker venv hydrated with [diffusers] + [rtx] extras
#   - $env:NEXUS_HOST_DATA_DIR points to a writable dir with weights present
#   - ffmpeg + ffprobe on PATH (for boundary scoring)
#
# Exit codes propagate from gpu_smoke_demonic_nun_full.py.

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
    Write-Warning "[smoke] ffmpeg / ffprobe not on PATH; boundary scoring will be skipped"
}

Set-Location $WorkerDir
& uv run --extra diffusers --extra rtx python (Join-Path $ScriptDir 'gpu_smoke_demonic_nun_full.py') @args
exit $LASTEXITCODE
