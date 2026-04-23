use std::path::PathBuf;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
#[non_exhaustive]
pub enum PythonArchiveKind {
    TarGz,
    Zip,
}

impl PythonArchiveKind {
    pub fn infer(url: &str) -> Option<Self> {
        let lower = url.to_ascii_lowercase();
        if lower.ends_with(".tar.gz") || lower.ends_with(".tgz") {
            Some(Self::TarGz)
        } else if lower.ends_with(".zip") {
            Some(Self::Zip)
        } else {
            None
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct PythonAsset {
    pub url: String,
    pub sha256: String,
    pub size: u64,
    pub kind: PythonArchiveKind,
    pub extract_dir: PathBuf,
    pub archive_root_component: Option<String>,
}

impl PythonAsset {
    pub fn pbs_install_only(url: impl Into<String>, sha256: impl Into<String>, size: u64) -> Self {
        Self {
            url: url.into(),
            sha256: sha256.into(),
            size,
            kind: PythonArchiveKind::TarGz,
            extract_dir: PathBuf::from("python"),
            archive_root_component: Some("python".into()),
        }
    }
}

pub fn current_target_triple() -> &'static str {
    if cfg!(all(target_os = "windows", target_arch = "x86_64")) {
        "x86_64-pc-windows-msvc"
    } else if cfg!(all(target_os = "linux", target_arch = "x86_64")) {
        "x86_64-unknown-linux-gnu"
    } else if cfg!(all(target_os = "linux", target_arch = "aarch64")) {
        "aarch64-unknown-linux-gnu"
    } else if cfg!(all(target_os = "macos", target_arch = "x86_64")) {
        "x86_64-apple-darwin"
    } else if cfg!(all(target_os = "macos", target_arch = "aarch64")) {
        "aarch64-apple-darwin"
    } else {
        "unknown"
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn archive_kind_infers_from_extension() {
        assert_eq!(
            PythonArchiveKind::infer("https://x/y.tar.gz"),
            Some(PythonArchiveKind::TarGz)
        );
        assert_eq!(
            PythonArchiveKind::infer("file:///tmp/y.tgz"),
            Some(PythonArchiveKind::TarGz)
        );
        assert_eq!(
            PythonArchiveKind::infer("https://x/y.zip"),
            Some(PythonArchiveKind::Zip)
        );
        assert_eq!(PythonArchiveKind::infer("https://x/y.bin"), None);
    }

    #[test]
    fn pbs_install_only_builder_sets_conventions() {
        let asset = PythonAsset::pbs_install_only("file:///x/cpython.tar.gz", "deadbeef", 42);
        assert_eq!(asset.kind, PythonArchiveKind::TarGz);
        assert_eq!(asset.extract_dir, PathBuf::from("python"));
        assert_eq!(asset.archive_root_component.as_deref(), Some("python"));
        assert_eq!(asset.size, 42);
    }

    #[test]
    fn current_target_triple_is_nonempty() {
        let t = current_target_triple();
        assert!(!t.is_empty());
    }
}
