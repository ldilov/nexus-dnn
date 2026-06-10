<#
.SYNOPSIS
  Install an optional attention backend into the svi2-pro worker venv (Windows).
.DESCRIPTION
  Cross-platform pair: install-attention.ps1 (Windows) / install-attention.sh (POSIX).
  flash2 is already vendored via the pyproject 'flash' extra. sage2 / sage3 / flash3
  are hardware/build-specific and installed on demand into the existing worker venv.
.EXAMPLE
  ./scripts/install-attention.ps1 -Backend sage2
  ./scripts/install-attention.ps1 -Backend sage3   # Blackwell sm120 only
#>
[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [ValidateSet("sage2", "sage3", "flash3")]
  [string]$Backend
)
$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ExtDir = Split-Path -Parent $ScriptDir
$WorkerDir = Join-Path $ExtDir "worker"
$BinDir = Join-Path $ExtDir "binaries"

if (-not (Get-Command uv -ErrorAction SilentlyContinue)) {
  Write-Error "uv not on PATH"
  exit 127
}

Push-Location $WorkerDir
try {
  switch ($Backend) {
    "sage2" {
      Write-Host "[install-attention] sage2: SageAttention2 + triton-windows"
      Write-Host "[install-attention] NOTE: sm120/Blackwell may need a source build (TORCH_CUDA_ARCH_LIST=8.0;8.6;8.9;9.0;12.0)"
      uv pip install "sageattention>=2.2" "triton-windows>=3.0"
    }
    "sage3" {
      Write-Host "[install-attention] sage3: SageAttention3 FP4 (Blackwell sm120 only)"
      $wheel = Get-ChildItem -Path $BinDir -Filter "sageattn3-*.whl" -ErrorAction SilentlyContinue | Select-Object -First 1
      if (-not $wheel) {
        Write-Error "no sageattn3 wheel in $BinDir`n  download from https://huggingface.co/nhathoangfoto/SageAttention-3-Blackwell-FP4`n  drop the .whl into $BinDir then re-run"
        exit 2
      }
      Write-Host "[install-attention] installing $($wheel.FullName) (--no-deps to protect torch)"
      uv pip install $wheel.FullName --no-deps
      uv pip install "triton-windows>=3.0"
    }
    "flash3" {
      Write-Error "FA4 Windows wheels are not reliably published upstream. Use sage3 for Blackwell FP4 on Windows, or build FA4 from source."
      exit 2
    }
  }
}
finally {
  Pop-Location
}

Write-Host "[install-attention] done. Verify with: ./scripts/smoke-attention-backends.ps1 -Backends $Backend"
