#!/usr/bin/env pwsh
# Spec 042 boundary audit — Constitution XIII gate.
#
# Greps the new spec-042 host crates and frontend additions for any
# extension-id literals. Zero matches is required for merge.
#
# Run from repo root: pwsh crates/nexus-run-events/scripts/boundary_audit.ps1

$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "../../..")
Set-Location $repoRoot

$paths = @(
    "crates/nexus-run-events",
    "crates/nexus-desktop-shell",
    "apps/web/src-tauri",
    "apps/web/src/components/blocks",
    "apps/web/src/components/cursor",
    "apps/web/src/services/ipc_adapter.ts",
    "apps/web/src/services/ipc_adapter_types.ts",
    "apps/web/src/services/tauri_transport.ts",
    "apps/web/src/services/http_transport.ts",
    "apps/web/src/services/run_events.ts",
    "apps/web/src/services/run_events_types.ts",
    "apps/web/src/services/run_events_warm.ts",
    "apps/web/src/hooks/use_run_events.ts",
    "apps/web/src/styles/tokens/terminal.css.ts"
)

$patterns = @(
    "local-llm",
    "local_llm",
    "nexus\.local-llm",
    "emotion-tts",
    "emotion_tts",
    "\brag\b",
    "\btts\b"
)

$total = 0
foreach ($pattern in $patterns) {
    foreach ($path in $paths) {
        if (-not (Test-Path $path)) { continue }
        $hits = Get-ChildItem -Path $path -Recurse -File -ErrorAction SilentlyContinue |
            Where-Object { $_.FullName -notmatch '\\(target|node_modules|gen|dist|scripts)\\' } |
            ForEach-Object {
                Select-String -Path $_.FullName -Pattern $pattern -CaseSensitive:$false -ErrorAction SilentlyContinue
            }
        foreach ($hit in $hits) {
            Write-Host ("MATCH [{0}] {1}:{2}: {3}" -f $pattern, $hit.Path, $hit.LineNumber, $hit.Line.Trim()) -ForegroundColor Red
            $total++
        }
    }
}

if ($total -eq 0) {
    Write-Host "boundary audit clean — 0 extension-id matches across spec-042 host territory" -ForegroundColor Green
    exit 0
} else {
    Write-Host ("boundary audit FAILED — {0} match(es). See output above. Constitution XIII.1." -f $total) -ForegroundColor Red
    exit 1
}
