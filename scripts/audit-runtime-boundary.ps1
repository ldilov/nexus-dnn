# audit-runtime-boundary.ps1 — spec 032 FR-100 / SC-003.
#
# Greps the host tree for extension-id fragments that should not appear in
# generic host code. Exits 0 on clean, 1 on any violation.
#
# Usage:
#   ./scripts/audit-runtime-boundary.ps1
#   ./scripts/audit-runtime-boundary.ps1 -Verbose
#
# Reads the exclusion list from scripts/boundary-exclusions.yaml. Paths
# listed under `grandfathered_paths` are skipped entirely; fragments under
# `grandfathered_fragments` are treated as expected-in-grandfathered-only.
# Any future extension MUST append its fragment to `registered_extensions`
# with its `extension_root` so contents inside `extensions/builtin/<id>/`
# are allowed to reference the id while the host tree is NOT.

param(
    [switch]$Verbose,
    [string]$RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
)

$ErrorActionPreference = 'Stop'

$exclusionsPath = Join-Path $RepoRoot 'scripts/boundary-exclusions.yaml'
if (-not (Test-Path $exclusionsPath)) {
    Write-Error "Exclusion list missing: $exclusionsPath"
    exit 2
}

# Minimal YAML parsing (no PSYaml dependency). Reads the three list sections
# we care about; format is strictly controlled by us so a simple line parser
# is enough.
$yamlLines = Get-Content $exclusionsPath
$currentList = $null
$grandfatheredFragments = @()
$grandfatheredPaths = @()
$registeredFragments = @()
$auditRoots = @()
$skipPaths = @()

foreach ($line in $yamlLines) {
    $trim = $line.TrimEnd()
    if ($trim -match '^([a-z_]+):\s*$') {
        $currentList = $Matches[1]
        continue
    }
    if ($trim -match '^\s*-\s+"([^"]+)"\s*$') {
        switch ($currentList) {
            'grandfathered_fragments' { $grandfatheredFragments += $Matches[1] }
            'grandfathered_paths'     { $grandfatheredPaths += $Matches[1] }
            'audit_roots'             { $auditRoots += $Matches[1] }
            'skip_paths'              { $skipPaths += $Matches[1] }
        }
        continue
    }
    if ($trim -match '^\s*-\s+fragment:\s*"([^"]+)"\s*$') {
        $registeredFragments += $Matches[1]
    }
}

$auditRoots = @($auditRoots + 'crates/nexus-tui/' | Sort-Object -Unique)
$allFragments = $grandfatheredFragments + $registeredFragments | Sort-Object -Unique
$seenFiles = New-Object 'System.Collections.Generic.HashSet[string]'

if ($Verbose) {
    Write-Host "Grandfathered fragments: $($grandfatheredFragments -join ', ')"
    Write-Host "Registered fragments:    $($registeredFragments -join ', ')"
    Write-Host "Audit roots:             $($auditRoots -join ', ')"
}

function Test-PathExcluded {
    param([string]$RelPath, [string[]]$Patterns)
    foreach ($pattern in $Patterns) {
        $norm = $pattern.Replace('**', '*').Replace('/', [IO.Path]::DirectorySeparatorChar)
        if ($RelPath -like $norm) { return $true }
        # Also try the path with / separators (matches yaml form).
        if ($RelPath.Replace('\', '/') -like $pattern) { return $true }
    }
    return $false
}

$violations = @()

foreach ($root in $auditRoots) {
    $rootPath = Join-Path $RepoRoot $root
    if (-not (Test-Path $rootPath)) { continue }
    $files = Get-ChildItem -Path $rootPath -Recurse -File -ErrorAction SilentlyContinue
    foreach ($file in $files) {
        if (-not $seenFiles.Add($file.FullName)) { continue }
        $rel = $file.FullName.Substring($RepoRoot.Length).TrimStart('\', '/')
        if (Test-PathExcluded -RelPath $rel -Patterns $skipPaths) { continue }
        if (Test-PathExcluded -RelPath $rel -Patterns $grandfatheredPaths) { continue }

        $content = [IO.File]::ReadAllText($file.FullName)
        foreach ($fragment in $allFragments) {
            if ($content.Contains($fragment)) {
                $violations += [PSCustomObject]@{
                    File     = $rel
                    Fragment = $fragment
                }
            }
        }
    }
}

if ($violations.Count -gt 0) {
    Write-Host ''
    Write-Host "BOUNDARY AUDIT FAILED — $($violations.Count) violation(s):" -ForegroundColor Red
    $violations | Group-Object Fragment | ForEach-Object {
        Write-Host ""
        Write-Host "  Fragment: $($_.Name)" -ForegroundColor Yellow
        $_.Group | ForEach-Object { Write-Host "    $($_.File)" }
    }
    Write-Host ''
    Write-Host 'Fix options:' -ForegroundColor Cyan
    Write-Host '  1. Move the offending code under extensions/builtin/<ext-id>/ (preferred).'
    Write-Host '  2. If the file belongs to an existing extension, register the id in scripts/boundary-exclusions.yaml.'
    Write-Host '  3. If genuinely grandfathered, add the path to grandfathered_paths (with justification in commit message).'
    exit 1
}

Write-Host 'BOUNDARY AUDIT PASSED — no extension-id literals found in host tree.' -ForegroundColor Green
exit 0
