#!/usr/bin/env pwsh
param(
    [string]$ExtensionRoot = "extensions/builtin/local-llm",
    [string[]]$IgnorePathContains = @()
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path $ExtensionRoot)) {
    Write-Error "Extension root not found: $ExtensionRoot"
    exit 2
}

$bannedGlobs = @(
    "python*.exe",
    "python*.dll",
    "python3*.so*",
    "python*.dylib",
    "*.pyd"
)

$bannedDirs = @(
    "site-packages",
    "__pycache__",
    ".venv",
    "venv"
)

function IsIgnored([string]$fullPath) {
    $normalized = $fullPath.Replace('\', '/')
    foreach ($needle in $IgnorePathContains) {
        if ([string]::IsNullOrEmpty($needle)) { continue }
        $normNeedle = $needle.Replace('\', '/')
        if ($normalized -like "*$normNeedle*") { return $true }
    }
    return $false
}

$offenders = @()

foreach ($glob in $bannedGlobs) {
    $matches = Get-ChildItem -Path $ExtensionRoot -Recurse -File -Filter $glob -ErrorAction SilentlyContinue
    foreach ($m in $matches) {
        if (IsIgnored $m.FullName) { continue }
        $offenders += [PSCustomObject]@{ Kind = "banned-file"; Path = $m.FullName }
    }
}

foreach ($dir in $bannedDirs) {
    $matches = Get-ChildItem -Path $ExtensionRoot -Recurse -Directory -Filter $dir -ErrorAction SilentlyContinue
    foreach ($m in $matches) {
        if (IsIgnored $m.FullName) { continue }
        $offenders += [PSCustomObject]@{ Kind = "banned-dir"; Path = $m.FullName }
    }
}

if ($offenders.Count -gt 0) {
    Write-Host "SC-001 violation: Python artifacts detected under $ExtensionRoot" -ForegroundColor Red
    $offenders | ForEach-Object { Write-Host "  [$($_.Kind)] $($_.Path)" }
    exit 1
}

Write-Host "SC-001 OK: no Python artifacts under $ExtensionRoot"
exit 0
