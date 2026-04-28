use super::asset::{PythonArchiveKind, PythonAsset, current_target_triple};

const RELEASE_TAG: &str = "20250818";
const PYTHON_VERSION: &str = "3.11.13";

struct BuiltinEntry {
    target_triple: &'static str,
    url: &'static str,
    sha256: &'static str,
    size: u64,
    kind: PythonArchiveKind,
}

/// Pinned `python-build-standalone` `install_only.tar.gz` artifacts for the
/// three primary host targets. SHA-256s sourced from the official
/// `SHA256SUMS` file at
/// `https://github.com/astral-sh/python-build-standalone/releases/download/{RELEASE_TAG}/SHA256SUMS`.
/// `size: 0` is intentional — the bootstrap path's `verify_checksum` skips the
/// size check when expected_size is zero (the SHA-256 is the cryptographic
/// guarantee; size is a redundant convenience). When refreshing the release
/// tag, fetch the new SHA256SUMS and update all three entries together.
const REGISTRY: &[BuiltinEntry] = &[
    BuiltinEntry {
        target_triple: "x86_64-pc-windows-msvc",
        url: "https://github.com/astral-sh/python-build-standalone/releases/download/20250818/cpython-3.11.13+20250818-x86_64-pc-windows-msvc-install_only.tar.gz",
        sha256: "008bab1b41dd88a831477af3deb3b10f056f02e3db8313f506e21b77ff2ae660",
        size: 0,
        kind: PythonArchiveKind::TarGz,
    },
    BuiltinEntry {
        target_triple: "x86_64-unknown-linux-gnu",
        url: "https://github.com/astral-sh/python-build-standalone/releases/download/20250818/cpython-3.11.13+20250818-x86_64-unknown-linux-gnu-install_only.tar.gz",
        sha256: "b3d07471abdf1b3d2867dd44f095c891fb072bab5667b9322355546f9f9c5dda",
        size: 0,
        kind: PythonArchiveKind::TarGz,
    },
    BuiltinEntry {
        target_triple: "aarch64-apple-darwin",
        url: "https://github.com/astral-sh/python-build-standalone/releases/download/20250818/cpython-3.11.13+20250818-aarch64-apple-darwin-install_only.tar.gz",
        sha256: "317fda280cb51852a346da5f595131fcd3e0dfda421b3983f675cb1994159838",
        size: 0,
        kind: PythonArchiveKind::TarGz,
    },
];

pub fn for_current_target() -> Option<PythonAsset> {
    for_target(current_target_triple())
}

pub fn for_target(target_triple: &str) -> Option<PythonAsset> {
    REGISTRY
        .iter()
        .find(|e| e.target_triple == target_triple)
        .map(|e| PythonAsset {
            url: e.url.to_string(),
            sha256: e.sha256.to_string(),
            size: e.size,
            kind: e.kind,
            extract_dir: std::path::PathBuf::from("python"),
            archive_root_component: Some("python".into()),
        })
}

pub fn release_tag() -> &'static str {
    RELEASE_TAG
}

pub fn python_version() -> &'static str {
    PYTHON_VERSION
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn registry_pins_the_three_primary_host_targets() {
        let triples: Vec<_> = REGISTRY.iter().map(|e| e.target_triple).collect();
        assert!(
            triples.contains(&"x86_64-pc-windows-msvc"),
            "windows-x64 pin missing"
        );
        assert!(
            triples.contains(&"x86_64-unknown-linux-gnu"),
            "linux-x64 pin missing"
        );
        assert!(
            triples.contains(&"aarch64-apple-darwin"),
            "darwin-arm64 pin missing"
        );
    }

    #[test]
    fn registry_sha256s_are_64_hex_chars() {
        for entry in REGISTRY {
            assert_eq!(
                entry.sha256.len(),
                64,
                "{} sha256 must be 64 hex chars",
                entry.target_triple
            );
            assert!(
                entry.sha256.chars().all(|c| c.is_ascii_hexdigit()),
                "{} sha256 must be lowercase hex",
                entry.target_triple
            );
        }
    }

    #[test]
    fn registry_urls_match_release_tag() {
        for entry in REGISTRY {
            assert!(
                entry.url.contains(RELEASE_TAG),
                "{} url must reference RELEASE_TAG '{}', got {}",
                entry.target_triple,
                RELEASE_TAG,
                entry.url
            );
            assert!(
                entry.url.contains(PYTHON_VERSION),
                "{} url must reference PYTHON_VERSION '{}', got {}",
                entry.target_triple,
                PYTHON_VERSION,
                entry.url
            );
        }
    }

    #[test]
    fn for_unknown_target_returns_none() {
        assert!(for_target("not-a-real-triple").is_none());
    }

    #[test]
    fn metadata_constants_are_nonempty() {
        assert!(!RELEASE_TAG.is_empty());
        assert!(!PYTHON_VERSION.is_empty());
    }
}
