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

const REGISTRY: &[BuiltinEntry] = &[];

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
    fn registry_is_empty_until_pins_verified() {
        assert!(
            REGISTRY.is_empty(),
            "uncomment a BuiltinEntry only after SHA-256 has been verified against \
             the python-build-standalone release's SHA256SUMS artifact"
        );
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
