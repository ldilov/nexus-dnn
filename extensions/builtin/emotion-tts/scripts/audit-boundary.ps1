# audit-boundary.ps1 — spec 031 FR-152 merge gate.
#
# Asserts that no EmotionTTS-specific string has leaked into the host tree.
# The canonical host-wide audit lives at scripts/audit-runtime-boundary.ps1;
# this script is the per-extension parity check so the EmotionTTS team can
# run it in their worktree without invoking the full host audit.
#
# Exits 0 on clean, 1 on any violation.

param(
    [string]$RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot '../../../..')).Path,
    [switch]$Verbose
)

$ErrorActionPreference = 'Stop'

$fragments = @(
    'emotion_tts',
    'emotion-tts',
    'nexus.audio.emotiontts',
    'indextts',
    'IndexTTS',
    'IndexTeam/IndexTTS-2',
    'qwen0.6bemo4-merge'
)

$auditRoots = @(
    'crates',
    'apps/web/src',
    'migrations'
)

$extensionRoot = Join-Path $RepoRoot 'extensions/builtin/emotion-tts'
$hostBackendsView = Join-Path $RepoRoot 'apps/web/src/views/backends'
$hostBackendRuntimesView = Join-Path $RepoRoot 'apps/web/src/views/backend-runtimes'

# Grandfathered test fixtures that legitimately reference this extension's
# identifiers. Spec 032's runtime-id regex test asserts `"indextts.python"`
# is a valid shape; registered here with spec 031 in scripts/boundary-exclusions.yaml.
# Spec 035's boundary self-test (nexus-extension-deps) lists every extension
# id literal as part of its FORBIDDEN deny-list — that's the test enforcing
# the rule, not a leak.
$grandfatheredFixtures = @(
    (Join-Path $RepoRoot 'crates/nexus-backend-runtimes/src/generic/ids/runtime_id.rs'),
    (Join-Path $RepoRoot 'crates/nexus-backend-runtimes/src/generic/leases/stdio_lease.rs'),
    (Join-Path $RepoRoot 'crates/nexus-extension-deps/tests/boundary_test.rs'),
    # Spec 030 router-mount wiring. Cargo deps + the providers vec
    # in `app.rs` MUST name the extension by id — that's how the
    # host's HTTP router learns about the extension's routes.
    # Same grandfathered pattern as `nexus-local-llm-chat-history`.
    (Join-Path $RepoRoot 'crates/nexus-core/Cargo.toml'),
    (Join-Path $RepoRoot 'crates/nexus-core/src/app.rs')
)

$violations = @()

foreach ($root in $auditRoots) {
    $rootPath = Join-Path $RepoRoot $root
    if (-not (Test-Path $rootPath)) { continue }

    Get-ChildItem -Path $rootPath -Recurse -File -ErrorAction SilentlyContinue | ForEach-Object {
        $file = $_.FullName

        if ($file.StartsWith($extensionRoot, [System.StringComparison]::OrdinalIgnoreCase)) { return }
        if ($file.StartsWith($hostBackendsView, [System.StringComparison]::OrdinalIgnoreCase)) { return }
        if ($file.StartsWith($hostBackendRuntimesView, [System.StringComparison]::OrdinalIgnoreCase)) { return }
        if ($grandfatheredFixtures -contains $file) { return }
        if ($file -match '\\target\\') { return }
        if ($file -match '\\node_modules\\') { return }
        if ($file -match '\\dist\\') { return }

        $content = Get-Content -Path $file -Raw -ErrorAction SilentlyContinue
        if (-not $content) { return }

        foreach ($frag in $fragments) {
            if ($content -match [regex]::Escape($frag)) {
                $violations += [pscustomobject]@{
                    File     = $file.Substring($RepoRoot.Length + 1)
                    Fragment = $frag
                }
            }
        }
    }
}

if ($violations.Count -gt 0) {
    Write-Host "BOUNDARY AUDIT FAILED ($($violations.Count) hit(s)):" -ForegroundColor Red
    $violations | ForEach-Object {
        Write-Host "  [$($_.Fragment)] $($_.File)" -ForegroundColor Yellow
    }
    exit 1
}

if ($Verbose) {
    Write-Host "Fragments checked: $($fragments -join ', ')"
    Write-Host "Audit roots:       $($auditRoots -join ', ')"
}
Write-Host "BOUNDARY AUDIT PASSED (EmotionTTS)" -ForegroundColor Green
exit 0
