<#
.SYNOPSIS
  Native Windows (x86_64) build+run for the nexus-dnn host — the win64 sibling of
  dockerfiles/aarch64.dockerfile.

.DESCRIPTION
  Windows containers cannot run CUDA, so this is a BARE-METAL build script, not a
  Dockerfile: it builds + runs nexus-dnn directly on the Windows host, where the
  GPU (driver + CUDA Toolkit) is reachable. It mirrors the Dockerfile's two stages
  as one flow:

    builder stage  ->  pinned Node (web app + builtin-extension web bundles) + cargo --release
    runtime stage  ->  uv on PATH, env wiring (data dir / port / workers), then run

  What this script does NOT replicate from the Linux image (host-prereq instead):
    - CUDA 13 devel base   -> install the NVIDIA driver + CUDA Toolkit 13 on the host.
                              nvcc is only needed for trellis2's nvdiffrast runtime JIT;
                              torch-based workers bring their own in-venv CUDA libs.
    - clang -> cc shim     -> NOT needed: python-build-standalone records the MSVC
                              toolchain on Windows. Source wheels (e.g. pyahocorasick)
                              need VS C++ Build Tools (cl.exe), the gcc/g++/make analog.
    - GL mesa libs         -> Windows uses the GPU driver's native OpenGL; no install.
    - `sd` (stable-diffusion.cpp) -> NO win-amd64 prebuilt exists under binaries/, so
                              svi2-pro's Qwen edit-then-animate path is unavailable until
                              an sd.exe is vendored. Everything else is unaffected.
    - VOLUME / EXPOSE      -> container-only; replaced by -DataDir and -Port here.

  Vendored wheels (binaries/win-amd64/*.whl) and builtin extensions resolve in-repo
  via their existing relative paths, so no copy step is required.

.EXAMPLE
  pwsh -File dockerfiles/win64.build.ps1
.EXAMPLE
  pwsh -File dockerfiles/win64.build.ps1 -BuildId (git rev-parse --short HEAD) -Run
.EXAMPLE
  pwsh -File dockerfiles/win64.build.ps1 -Run -Port 3000 -DataDir D:\nexusdata -InstallPrereqs
#>
[CmdletBinding()]
param(
  # vite define stamped into sw.js so its bytes change per build (SW purge+reload).
  [string]$BuildId = 'dev',
  [string]$NodeVersion = 'v22.22.3',
  [string]$FfmpegVersion = '7.1',
  [string]$DataDir,
  [int]$Port = 3000,
  [ValidateRange(1, 8)]
  [int]$EmotionTtsMaxWorkers = 4,
  # Skip the web build (cargo build.rs can rebuild apps/web/dist later; extensions keep committed dist).
  [switch]$SkipWeb,
  # Attempt to install missing host prereqs (git/ffmpeg/uv) via winget.
  [switch]$InstallPrereqs,
  # Launch the host after a successful build.
  [switch]$Run
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$RepoRoot   = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$Toolchain  = Join-Path $RepoRoot 'tools\.win64-toolchain'
$NodeDir    = Join-Path $Toolchain "node-$NodeVersion-win-x64"
$FfmpegDir  = Join-Path $Toolchain "ffmpeg-$FfmpegVersion-essentials_build"
$FfmpegBin  = Join-Path $FfmpegDir 'bin'
if (-not $DataDir) { $DataDir = Join-Path $RepoRoot '.nexus-data' }

# Global CUDA Toolkit pin (nvcc only). Matches the validated Linux image (13.0.1
# devel) which JITs trellis2/nvdiffrast against the workers' cu132 torch.
$CudaToolkitVersion = '13.0'

function Write-Step([string]$msg) { Write-Host "`n>>> $msg" -ForegroundColor Cyan }
function Write-Warn2([string]$msg) { Write-Host "!!! $msg" -ForegroundColor Yellow }
function Test-Cmd([string]$name) { [bool](Get-Command $name -ErrorAction SilentlyContinue) }

function Invoke-Checked([string]$exe, [string[]]$args, [string]$cwd = $RepoRoot) {
  Push-Location $cwd
  try {
    & $exe @args
    if ($LASTEXITCODE -ne 0) { throw "'$exe $($args -join ' ')' exited with $LASTEXITCODE" }
  } finally { Pop-Location }
}

# Phase 0 — host prerequisites (the apt-get equivalents).
Write-Step 'Checking host prerequisites'

# Rust MSVC toolchain — the gcc/g++/make + rustc analog. Hard requirement.
if (-not (Test-Cmd 'cargo')) {
  throw "cargo not found. Install Rust (MSVC): winget install Rustlang.Rustup; rustup default stable-msvc"
}
$rustHost = (& rustc -vV | Select-String '^host:').ToString()
if ($rustHost -notmatch 'x86_64-pc-windows-msvc') {
  Write-Warn2 "rustc host is '$rustHost' — expected x86_64-pc-windows-msvc. Source wheels and the host may misbuild."
}

# VS C++ Build Tools (cl.exe) — needed for source wheels under uv (e.g. pyahocorasick).
if (-not (Test-Cmd 'cl')) {
  Write-Warn2 "cl.exe (MSVC C++ Build Tools) not on PATH. Run from a 'Developer PowerShell for VS', or"
  Write-Warn2 "install: winget install Microsoft.VisualStudio.2022.BuildTools (+ 'Desktop development with C++')."
  Write-Warn2 "Source-wheel extension installs will fail until cl.exe is reachable."
}

# CUDA Toolkit — nvcc only required for trellis2's nvdiffrast runtime JIT.
if (-not (Test-Cmd 'nvcc')) {
  Write-Warn2 "nvcc not found. trellis2's nvdiffrast JIT needs a GLOBAL CUDA Toolkit $CudaToolkitVersion."
  Write-Warn2 "  Download: https://developer.nvidia.com/cuda-toolkit-archive  (or: winget install Nvidia.CUDA --version $CudaToolkitVersion)"
  Write-Warn2 "  Workers ship their own in-venv CUDA (longcat cu128 / emotion-tts+ltx23 cu130 / svi2-pro+trellis2 cu132) — only trellis2 needs this global nvcc."
}
if (-not (Test-Cmd 'nvidia-smi')) {
  Write-Warn2 "nvidia-smi not found — no NVIDIA driver detected. Install a CUDA $CudaToolkitVersion-capable Windows driver (R580+),"
  Write-Warn2 "  else GPU extensions (svi2-pro, trellis2, emotion-tts CUDA) will not run."
}

# git — VCS deps. ffmpeg is vendored below (Phase 1), not winget.
if (-not (Test-Cmd 'git')) {
  if ($InstallPrereqs -and (Test-Cmd 'winget')) {
    Write-Step 'Installing git via winget (Git.Git)'
    winget install --id Git.Git --accept-source-agreements --accept-package-agreements -e
  } else {
    Write-Warn2 'git not found. Install it (winget install Git.Git) or re-run with -InstallPrereqs.'
  }
}

# Phase 1 — pinned Node + ffmpeg (cached); mirrors the Dockerfile tarball installs.
$nodeExe = Join-Path $NodeDir 'node.exe'
if (-not (Test-Path $nodeExe)) {
  Write-Step "Fetching Node $NodeVersion (win-x64) into $NodeDir"
  New-Item -ItemType Directory -Force -Path $Toolchain | Out-Null
  $zip = Join-Path $Toolchain "node-$NodeVersion-win-x64.zip"
  $url = "https://nodejs.org/dist/$NodeVersion/node-$NodeVersion-win-x64.zip"
  Invoke-WebRequest -Uri $url -OutFile $zip
  Expand-Archive -Path $zip -DestinationPath $Toolchain -Force
  Remove-Item $zip -Force
}
$env:PATH = "$NodeDir;$env:PATH"
Write-Step "Node $(& $nodeExe --version) | enabling corepack + pnpm"
& (Join-Path $NodeDir 'corepack.cmd') enable
& (Join-Path $NodeDir 'corepack.cmd') prepare pnpm@latest --activate

# ffmpeg — system_binary dep (manifests prefer PATH ffmpeg). Vendor pinned, else reuse system.
$FfmpegPathForRun = ''
if (Test-Cmd 'ffmpeg') {
  Write-Step "ffmpeg already on PATH: $((& ffmpeg -version | Select-Object -First 1))"
} else {
  $ffmpegExe = Join-Path $FfmpegBin 'ffmpeg.exe'
  if (-not (Test-Path $ffmpegExe)) {
    Write-Step "Fetching ffmpeg $FfmpegVersion (Gyan essentials) into $FfmpegDir"
    New-Item -ItemType Directory -Force -Path $Toolchain | Out-Null
    $fzip = Join-Path $Toolchain "ffmpeg-$FfmpegVersion-essentials_build.zip"
    $furl = "https://github.com/GyanD/codexffmpeg/releases/download/$FfmpegVersion/ffmpeg-$FfmpegVersion-essentials_build.zip"
    Invoke-WebRequest -Uri $furl -OutFile $fzip
    Expand-Archive -Path $fzip -DestinationPath $Toolchain -Force
    Remove-Item $fzip -Force
  }
  $env:PATH = "$FfmpegBin;$env:PATH"
  $FfmpegPathForRun = $FfmpegBin
  Write-Step "ffmpeg $((& $ffmpegExe -version | Select-Object -First 1))"
}

# Phase 2 — web app + builtin-extension web bundles (builder stage).
$env:NEXUS_BUILD_ID = $BuildId

if ($SkipWeb) {
  Write-Warn2 'Skipping web build (-SkipWeb): build.rs may rebuild apps/web; extensions keep committed dist.'
} else {
  Write-Step "Building apps/web (NEXUS_BUILD_ID=$BuildId)"
  Invoke-Checked 'pnpm' @('--dir', 'apps/web', 'install')
  Invoke-Checked 'pnpm' @('--dir', 'apps/web', 'run', 'build')

  Write-Step 'Rebuilding builtin-extension web bundles (best-effort)'
  Get-ChildItem -Path (Join-Path $RepoRoot 'extensions\builtin') -Directory | ForEach-Object {
    $webDir = Join-Path $_.FullName 'web'
    $pkg    = Join-Path $webDir 'package.json'
    if (-not (Test-Path $pkg)) { return }
    $hasBuild = $false
    try { $hasBuild = $null -ne (Get-Content $pkg -Raw | ConvertFrom-Json).scripts.build } catch { }
    if (-not $hasBuild) { return }
    $label = "$($_.Name)/web"
    Write-Host ">>> building extension web: $label"
    try {
      Invoke-Checked 'pnpm' @('--dir', $webDir, 'install')
      Invoke-Checked 'pnpm' @('--dir', $webDir, 'run', 'build')
      Write-Host ">>> ok: $label"
    } catch {
      Write-Warn2 "$label web build FAILED — shipping its committed dist. ($_)"
    }
  }
}

# Phase 3 — cargo release build (builder stage).
Write-Step 'Building nexus-dnn (cargo --release -p nexus-core)'
Invoke-Checked 'cargo' @('build', '--release', '-p', 'nexus-core', '--bin', 'nexus-dnn')
$hostExe = Join-Path $RepoRoot 'target\release\nexus-dnn.exe'
if (-not (Test-Path $hostExe)) { throw "build reported success but $hostExe is missing" }

# Phase 4 — uv (runtime stage); drives `uv sync` package-set installs.
if (-not (Test-Cmd 'uv')) {
  if ($InstallPrereqs) {
    Write-Step 'Installing uv (astral.sh)'
    Invoke-Expression (Invoke-RestMethod https://astral.sh/uv/install.ps1)
    $env:PATH = "$env:USERPROFILE\.local\bin;$env:PATH"
  } else {
    Write-Warn2 'uv not found. Install: irm https://astral.sh/uv/install.ps1 | iex  (or re-run with -InstallPrereqs). Extension installs need it.'
  }
}
if (Test-Cmd 'uv') { Write-Step "uv $(& uv --version)" }

# Phase 5 — runtime env + run (ENTRYPOINT).
New-Item -ItemType Directory -Force -Path $DataDir | Out-Null
# target/release/ has no extensions/builtin, so the exe-relative probe misses;
# point the host at the in-repo dir explicitly (the sanctioned override).
$env:NEXUS_BUILTIN_EXTENSIONS_DIR = Join-Path $RepoRoot 'extensions\builtin'
$env:NEXUS_DATA_DIR        = $DataDir
$env:NEXUS_PORT            = "$Port"
$env:EMOTIONTTS_MAX_WORKERS = "$EmotionTtsMaxWorkers"

Write-Host "`n=== build complete ===" -ForegroundColor Green
Write-Host "host:        $hostExe"
Write-Host "data dir:    $DataDir"
Write-Host "port:        $Port"
Write-Host "extensions:  $($env:NEXUS_BUILTIN_EXTENSIONS_DIR)"
Write-Host "ffmpeg:      $(if ($FfmpegPathForRun) { $FfmpegPathForRun } else { 'system PATH' })"
Write-Host "workers cap: $EmotionTtsMaxWorkers (EMOTIONTTS_MAX_WORKERS)"

if ($Run) {
  Write-Step "Starting nexus-dnn on http://localhost:$Port"
  & $hostExe
} else {
  $ffmpegRunPrefix = if ($FfmpegPathForRun) { "`$env:PATH='$FfmpegPathForRun;'+`$env:PATH; " } else { '' }
  Write-Host "`nRun it:" -ForegroundColor Cyan
  Write-Host "  $ffmpegRunPrefix`$env:NEXUS_BUILTIN_EXTENSIONS_DIR='$($env:NEXUS_BUILTIN_EXTENSIONS_DIR)'; `$env:NEXUS_DATA_DIR='$DataDir'; `$env:NEXUS_PORT='$Port'; `$env:EMOTIONTTS_MAX_WORKERS='$EmotionTtsMaxWorkers'; & '$hostExe'"
}
