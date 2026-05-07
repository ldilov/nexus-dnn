#!/usr/bin/env pwsh
$ErrorActionPreference = 'Stop'
$repoRoot = (git rev-parse --show-toplevel).Trim()
Push-Location $repoRoot
try {
    $patterns = @('local-llm', 'local_llm', 'nexus.local-llm')
    $genericChat = Join-Path $repoRoot 'apps\web\src\components\chat'
    $hostCrates = @(
        (Join-Path $repoRoot 'crates\nexus-model-metadata'),
        (Join-Path $repoRoot 'crates\nexus-models-store')
    )
    $hostMigration = Join-Path $repoRoot 'migrations\021_installed_artifact_moe_metadata.sql'
    $violations = 0
    foreach ($pattern in $patterns) {
        if (Test-Path $genericChat) {
            $hits = Get-ChildItem -Path $genericChat -Recurse -File -ErrorAction SilentlyContinue |
                Select-String -Pattern $pattern -SimpleMatch -ErrorAction SilentlyContinue
            if ($hits) {
                Write-Host "FAIL: pattern '$pattern' found in apps/web/src/components/chat/" -ForegroundColor Red
                $hits | ForEach-Object { Write-Host "  $($_.Path):$($_.LineNumber): $($_.Line)" }
                $violations++
            }
        }
        foreach ($crate in $hostCrates) {
            if (Test-Path $crate) {
                $hits = Get-ChildItem -Path $crate -Recurse -File -Include '*.rs','*.toml' -ErrorAction SilentlyContinue |
                    Select-String -Pattern $pattern -SimpleMatch -ErrorAction SilentlyContinue
                if ($hits) {
                    $crateName = Split-Path $crate -Leaf
                    Write-Host "FAIL: pattern '$pattern' found in $crateName" -ForegroundColor Red
                    $hits | ForEach-Object { Write-Host "  $($_.Path):$($_.LineNumber): $($_.Line)" }
                    $violations++
                }
            }
        }
        if (Test-Path $hostMigration) {
            $hits = Select-String -Path $hostMigration -Pattern $pattern -SimpleMatch -ErrorAction SilentlyContinue
            if ($hits) {
                Write-Host "FAIL: pattern '$pattern' found in migration 021" -ForegroundColor Red
                $hits | ForEach-Object { Write-Host "  $($_.Path):$($_.LineNumber): $($_.Line)" }
                $violations++
            }
        }
    }
    if ($violations -eq 0) {
        Write-Host "PASS: boundary audit clean (Constitution XIII)" -ForegroundColor Green
        exit 0
    } else {
        Write-Host "FAIL: $violations boundary violation(s)" -ForegroundColor Red
        exit 1
    }
} finally {
    Pop-Location
}
