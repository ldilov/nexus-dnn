use std::path::{Path, PathBuf};

pub const SEEN_HINTS_FILENAME: &str = "seen_hints";

pub fn seen_hints_path(config_dir: &Path) -> PathBuf {
    config_dir.join(SEEN_HINTS_FILENAME)
}

pub fn has_seen_hints(config_dir: &Path) -> bool {
    seen_hints_path(config_dir).exists()
}

pub fn mark_hints_seen(config_dir: &Path) -> std::io::Result<()> {
    std::fs::create_dir_all(config_dir)?;
    let path = seen_hints_path(config_dir);
    std::fs::write(&path, b"seen\n")?;
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn seen_hints_path_uses_filename_under_config_dir() {
        let dir = PathBuf::from("/cfg/nexus-tui");
        assert_eq!(
            seen_hints_path(&dir),
            PathBuf::from("/cfg/nexus-tui/seen_hints")
        );
    }

    #[test]
    fn has_seen_hints_returns_false_when_missing() {
        let tmp = tempfile::tempdir().unwrap();
        assert!(!has_seen_hints(tmp.path()));
    }

    #[test]
    fn mark_then_has_returns_true() {
        let tmp = tempfile::tempdir().unwrap();
        mark_hints_seen(tmp.path()).unwrap();
        assert!(has_seen_hints(tmp.path()));
    }

    #[test]
    fn mark_creates_parent_directories() {
        let tmp = tempfile::tempdir().unwrap();
        let nested = tmp.path().join("a").join("b").join("c");
        mark_hints_seen(&nested).unwrap();
        assert!(seen_hints_path(&nested).exists());
    }
}
