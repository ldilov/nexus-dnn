# Operator wrapper for gpu_smoke_demonic_i2v.py.
#
# Drives LLM-planned multiscene i2v render of a demonic-possession scene
# starting from a single conditioning image. Phase 1 calls plan.expand
# (LLM via HttpLeaseClient when NEXUS_HOST_PORT is set; graceful
# deterministic fallback otherwise). Phase 2 renders 2 scenes at 480p
# distill on the LongCat FP8 pipeline.
#
# Usage:
#   smoke-demonic-i2v.ps1 -Image D:\inputs\nun.jpg [extra args ...]
#
# Pass --dry-run to exercise Phase 1 only (no GPU). Full smoke emits
# a JSON report to stdout (or --report-out PATH).
#
# Exit codes propagate from gpu_smoke_demonic_i2v.py.

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
    Write-Error "[smoke]   run: cd $WorkerDir; uv sync --extra diffusers"
    exit 2
}

Set-Location $WorkerDir

$DryRun = $false
foreach ($a in $args) { if ($a -eq '--dry-run') { $DryRun = $true; break } }

if ($DryRun) {
    & uv run python (Join-Path $ScriptDir 'gpu_smoke_demonic_i2v.py') @args
} else {
    & uv run --extra diffusers python (Join-Path $ScriptDir 'gpu_smoke_demonic_i2v.py') @args
}
exit $LASTEXITCODE
