use super::asset::{PythonArchiveKind, PythonAsset, current_target_triple};

/// Default interpreter version handed to callers that don't request a specific
/// range (legacy backend pipeline + startup log). Extension dependency steps
/// that declare a `version` range get a range-matched interpreter instead — see
/// [`for_target_matching`].
const DEFAULT_PYTHON_VERSION: &str = "3.11.13";

struct BuiltinEntry {
    target_triple: &'static str,
    python_version: &'static str,
    url: &'static str,
    sha256: &'static str,
    size: u64,
    kind: PythonArchiveKind,
}

/// Pinned `python-build-standalone` `install_only.tar.gz` artifacts. Two
/// interpreter lines (3.11.13 / release 20250818, 3.12.13 / release 20260610)
/// across the four primary host targets, so different extensions can pin
/// different Python versions (e.g. EmotionTTS needs 3.11 for numba/llvmlite
/// wheels; svi2-pro needs 3.12 for its prebuilt aarch64 flash-attn wheel).
/// SHA-256s come from each release's official `SHA256SUMS`. `size: 0` is
/// intentional — `verify_checksum` skips the size check when zero; the SHA-256
/// is the cryptographic guarantee.
const REGISTRY: &[BuiltinEntry] = &[
    // ---- 3.11.13 (release 20250818) ----
    BuiltinEntry {
        target_triple: "x86_64-pc-windows-msvc",
        python_version: "3.11.13",
        url: "https://github.com/astral-sh/python-build-standalone/releases/download/20250818/cpython-3.11.13+20250818-x86_64-pc-windows-msvc-install_only.tar.gz",
        sha256: "008bab1b41dd88a831477af3deb3b10f056f02e3db8313f506e21b77ff2ae660",
        size: 0,
        kind: PythonArchiveKind::TarGz,
    },
    BuiltinEntry {
        target_triple: "x86_64-unknown-linux-gnu",
        python_version: "3.11.13",
        url: "https://github.com/astral-sh/python-build-standalone/releases/download/20250818/cpython-3.11.13+20250818-x86_64-unknown-linux-gnu-install_only.tar.gz",
        sha256: "b3d07471abdf1b3d2867dd44f095c891fb072bab5667b9322355546f9f9c5dda",
        size: 0,
        kind: PythonArchiveKind::TarGz,
    },
    BuiltinEntry {
        target_triple: "aarch64-unknown-linux-gnu",
        python_version: "3.11.13",
        url: "https://github.com/astral-sh/python-build-standalone/releases/download/20250818/cpython-3.11.13+20250818-aarch64-unknown-linux-gnu-install_only.tar.gz",
        sha256: "c04b98b4332ea0d8be0222e7ca7959e1398c6ebf7f2102b47f9e4fb85f841f59",
        size: 0,
        kind: PythonArchiveKind::TarGz,
    },
    BuiltinEntry {
        target_triple: "aarch64-apple-darwin",
        python_version: "3.11.13",
        url: "https://github.com/astral-sh/python-build-standalone/releases/download/20250818/cpython-3.11.13+20250818-aarch64-apple-darwin-install_only.tar.gz",
        sha256: "317fda280cb51852a346da5f595131fcd3e0dfda421b3983f675cb1994159838",
        size: 0,
        kind: PythonArchiveKind::TarGz,
    },
    // ---- 3.12.13 (release 20260610) ----
    BuiltinEntry {
        target_triple: "x86_64-pc-windows-msvc",
        python_version: "3.12.13",
        url: "https://github.com/astral-sh/python-build-standalone/releases/download/20260610/cpython-3.12.13+20260610-x86_64-pc-windows-msvc-install_only.tar.gz",
        sha256: "f5e4d9f856567493776f3d1e832c939fbaba5dcbcc5e0492a82ecfceea83b316",
        size: 0,
        kind: PythonArchiveKind::TarGz,
    },
    BuiltinEntry {
        target_triple: "x86_64-unknown-linux-gnu",
        python_version: "3.12.13",
        url: "https://github.com/astral-sh/python-build-standalone/releases/download/20260610/cpython-3.12.13+20260610-x86_64-unknown-linux-gnu-install_only.tar.gz",
        sha256: "c218f50baeb2c06a30c2f03db5986b2bad6ab7c8a52faad2d5a59bda0677b93a",
        size: 0,
        kind: PythonArchiveKind::TarGz,
    },
    BuiltinEntry {
        target_triple: "aarch64-unknown-linux-gnu",
        python_version: "3.12.13",
        url: "https://github.com/astral-sh/python-build-standalone/releases/download/20260610/cpython-3.12.13+20260610-aarch64-unknown-linux-gnu-install_only.tar.gz",
        sha256: "bc74cf1bb517651868342b0619b21eaaf9f94a2022c9c61886dd980e16fb091b",
        size: 0,
        kind: PythonArchiveKind::TarGz,
    },
    BuiltinEntry {
        target_triple: "aarch64-apple-darwin",
        python_version: "3.12.13",
        url: "https://github.com/astral-sh/python-build-standalone/releases/download/20260610/cpython-3.12.13+20260610-aarch64-apple-darwin-install_only.tar.gz",
        sha256: "e18ddd4c1e8f4a1d6c4590b37f423d76aec734447edc20ed08e93983d95f2132",
        size: 0,
        kind: PythonArchiveKind::TarGz,
    },
];

fn asset_of(entry: &BuiltinEntry) -> PythonAsset {
    PythonAsset {
        url: entry.url.to_string(),
        sha256: entry.sha256.to_string(),
        size: entry.size,
        kind: entry.kind,
        extract_dir: std::path::PathBuf::from("python"),
        archive_root_component: Some("python".into()),
    }
}

/// Translate a manifest version range (e.g. `">=3.12,<3.13"`) into a
/// [`semver::VersionReq`]. Returns `None` for an unparseable range.
fn parse_req(range: &str) -> Option<semver::VersionReq> {
    semver::VersionReq::parse(range.trim()).ok()
}

/// Resolve the best interpreter asset for `target_triple` satisfying an
/// optional `version_range`. With no range the [`DEFAULT_PYTHON_VERSION`] is
/// returned; with a range the highest matching version wins.
pub fn for_target_matching(
    target_triple: &str,
    version_range: Option<&str>,
) -> Option<PythonAsset> {
    let mut entries: Vec<&BuiltinEntry> = REGISTRY
        .iter()
        .filter(|e| e.target_triple == target_triple)
        .collect();
    entries.sort_by(|a, b| version_key(b.python_version).cmp(&version_key(a.python_version)));

    let chosen = match version_range.and_then(parse_req) {
        Some(req) => entries.into_iter().find(|e| {
            semver::Version::parse(e.python_version)
                .map(|v| req.matches(&v))
                .unwrap_or(false)
        }),
        None => entries
            .iter()
            .copied()
            .find(|e| e.python_version == DEFAULT_PYTHON_VERSION)
            .or_else(|| entries.first().copied()),
    };
    chosen.map(asset_of)
}

fn version_key(v: &str) -> (u64, u64, u64) {
    let mut it = v.split('.').map(|p| p.parse::<u64>().unwrap_or(0));
    (
        it.next().unwrap_or(0),
        it.next().unwrap_or(0),
        it.next().unwrap_or(0),
    )
}

pub fn for_current_target() -> Option<PythonAsset> {
    for_target(current_target_triple())
}

/// Version-aware resolution for the host's target triple.
pub fn for_current_target_matching(version_range: Option<&str>) -> Option<PythonAsset> {
    for_target_matching(current_target_triple(), version_range)
}

pub fn for_target(target_triple: &str) -> Option<PythonAsset> {
    for_target_matching(target_triple, None)
}

pub fn release_tag() -> &'static str {
    "20250818"
}

pub fn python_version() -> &'static str {
    DEFAULT_PYTHON_VERSION
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn registry_pins_the_four_primary_host_targets() {
        for t in [
            "x86_64-pc-windows-msvc",
            "x86_64-unknown-linux-gnu",
            "aarch64-unknown-linux-gnu",
            "aarch64-apple-darwin",
        ] {
            assert!(
                REGISTRY.iter().any(|e| e.target_triple == t),
                "{t} pin missing"
            );
        }
    }

    #[test]
    fn registry_sha256s_are_64_hex_chars() {
        for entry in REGISTRY {
            assert_eq!(entry.sha256.len(), 64, "{} sha256 len", entry.target_triple);
            assert!(
                entry.sha256.chars().all(|c| c.is_ascii_hexdigit()),
                "{} sha256 hex",
                entry.target_triple
            );
        }
    }

    #[test]
    fn registry_urls_reference_their_version() {
        for entry in REGISTRY {
            assert!(
                entry.url.contains(entry.python_version),
                "{} url must reference {}",
                entry.target_triple,
                entry.python_version
            );
        }
    }

    #[test]
    fn default_resolution_picks_3_11() {
        let asset = for_target("aarch64-unknown-linux-gnu").expect("asset");
        assert!(asset.url.contains("3.11.13"));
    }

    #[test]
    fn range_selects_matching_version() {
        let py312 = for_target_matching("aarch64-unknown-linux-gnu", Some(">=3.12,<3.13"))
            .expect("3.12 asset");
        assert!(py312.url.contains("3.12.13"), "got {}", py312.url);

        let py311 = for_target_matching("aarch64-unknown-linux-gnu", Some(">=3.11,<3.12"))
            .expect("3.11 asset");
        assert!(py311.url.contains("3.11.13"), "got {}", py311.url);
    }

    #[test]
    fn for_unknown_target_returns_none() {
        assert!(for_target("not-a-real-triple").is_none());
    }
}
