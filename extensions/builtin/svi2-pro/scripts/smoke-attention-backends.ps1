<#
.SYNOPSIS
  Verify svi2-pro attention backends on the GPU box (Windows).
.DESCRIPTION
  Cross-platform pair: smoke-attention-backends.ps1 / .sh.
  Runs attention_verify.py inside the worker venv: builds synthetic q/k/v,
  runs each available backend, compares cosine-similarity vs the SDPA reference.
  sm120-gated backends (sage3_fp4, flash3_fp4) skip gracefully on non-Blackwell.
.EXAMPLE
  ./scripts/smoke-attention-backends.ps1
  ./scripts/smoke-attention-backends.ps1 -Backends sage2 -Json
#>
[CmdletBinding()]
param(
  [string]$Backends = "all",
  [int]$Seq = 512,
  [string]$Dtype = "bfloat16",
  [switch]$Json
)
$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ExtDir = Split-Path -Parent $ScriptDir
$WorkerDir = Join-Path $ExtDir "worker"

if (-not (Get-Command uv -ErrorAction SilentlyContinue)) {
  Write-Error "[smoke] FAIL prereq: uv not on PATH"
  exit 2
}
if (-not (Test-Path (Join-Path $WorkerDir ".venv"))) {
  Write-Error "[smoke] FAIL prereq: worker venv not found. Run: ./scripts/install.ps1 -Profile rtx50-fp8"
  exit 2
}

$verify = Join-Path $ScriptDir "attention_verify.py"
$argList = @("--backends", $Backends, "--seq", $Seq, "--dtype", $Dtype)
if ($Json) { $argList += "--json" }

Push-Location $WorkerDir
try {
  uv run --extra diffusers --extra flash python $verify @argList
  exit $LASTEXITCODE
}
finally {
  Pop-Location
}
