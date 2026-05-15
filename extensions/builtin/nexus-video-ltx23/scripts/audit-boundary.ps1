<#
.SYNOPSIS
Boundary audit per .claude/rules/host-extension-boundary.md.
PowerShell mirror of audit-boundary.sh — same patterns, same exit
codes, same output format.

.DESCRIPTION
Fails CI (exit 1) if any LTX-specific literal appears in host paths.
The host process must stay generic — extension-specific identifiers
belong inside extensions/builtin/nexus-video-ltx23/. A small set of
host files are explicitly allow-listed (the startup-wiring seam per
Constitution Principle XIII), mirroring the bash variant exactly.
#>

[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

$Patterns = @(
    'nexus.video.ltx23',
    'nexus-video-ltx23',
    'ltx23',
    'LTX-2.3',
    'rtx50-nvfp4',
    'rtx40-fp8',
    'ext_nexus_video_ltx23__',
    'ltx_video_worker'
)

$HostScanPaths = @(
    'crates',
    'apps/web/src',
    'migrations'
)

# Allowed sub-paths under host scan paths (generic renderers etc.)
$HostAllowedPathPrefixes = @(
    'apps/web/src/views/extensions'
)

# Allow-listed host files — the startup-wiring seam where the host
# must name concrete provider types (Constitution Principle XIII).
$HostAllowedFiles = @(
    'crates/nexus-core/Cargo.toml',
    'crates/nexus-core/src/app.rs'
)

# Repo root inferred from script location.
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoRoot  = Resolve-Path (Join-Path $ScriptDir '..\..\..\..')
Set-Location $RepoRoot

$Violations = 0

foreach ($scanPath in $HostScanPaths) {
    $fullScan = Join-Path $RepoRoot $scanPath
    if (-not (Test-Path -LiteralPath $fullScan)) { continue }

    foreach ($pattern in $Patterns) {
        # Get-ChildItem + Select-String mirrors `grep -RIn` semantics.
        # -ExcludePattern is per-file so the directory exclusions are
        # done via the -Exclude / -Path interplay; we keep it simple
        # by filtering directories in the pipeline.
        $matches = @(Get-ChildItem -Path $fullScan -Recurse -File -ErrorAction SilentlyContinue |
            Where-Object {
                $p = $_.FullName.Replace('\','/')
                ($p -notmatch '/node_modules/') -and
                ($p -notmatch '/target/') -and
                ($p -notmatch '/dist/') -and
                ($p -notmatch '/\.git/')
            } |
            Select-String -SimpleMatch -Pattern $pattern -ErrorAction SilentlyContinue)

        if ($matches.Count -eq 0) { continue }

        # Filter: drop lines under allowed sub-paths and allowed files.
        $filtered = @()
        foreach ($m in $matches) {
            $rel = (Resolve-Path -LiteralPath $m.Path -Relative).TrimStart('.', '\').Replace('\','/').TrimStart('/')
            $keep = $true

            foreach ($allowed in $HostAllowedPathPrefixes) {
                if ($rel.StartsWith($allowed)) { $keep = $false; break }
            }
            if ($keep) {
                foreach ($allowedFile in $HostAllowedFiles) {
                    if ($rel -eq $allowedFile) { $keep = $false; break }
                }
            }
            if ($keep) {
                $filtered += "{0}:{1}: {2}" -f $rel, $m.LineNumber, $m.Line.TrimEnd()
            }
        }

        if ($filtered.Count -gt 0) {
            [Console]::Error.WriteLine("Boundary violation: found '$pattern' in host path '$scanPath':")
            foreach ($line in $filtered) { [Console]::Error.WriteLine($line) }
            $Violations++
        }
    }
}

if ($Violations -gt 0) {
    [Console]::Error.WriteLine('')
    [Console]::Error.WriteLine("FAIL: $Violations pattern(s) leaked into host scan paths.")
    [Console]::Error.WriteLine('Move LTX-specific code into extensions/builtin/nexus-video-ltx23/.')
    exit 1
}

Write-Host 'PASS: no LTX extension-specific literals found in host scan paths.'
exit 0
