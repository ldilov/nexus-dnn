//! Staging-directory RAII guard and atomic publish helper for the ZIP install
//! pipeline (spec 019 FR-IE04, contracts/zip-install-pipeline.md §5, §10).
//!
//! Invariant: every path that enters the pipeline exits one of two ways —
//!   (a) successful `.consume()` after the staging contents have been renamed
//!       into the extensions root, or
//!   (b) `Drop` runs and the staging dir is removed in full.
//! There is no third way. The atomic rename is the only thing that calls
//! `.consume()`, so a panic or `?` short-circuit at any step above it still
//! triggers cleanup.

use std::path::{Path, PathBuf};
use std::sync::atomic::{AtomicBool, Ordering};

use uuid::Uuid;

use super::error::ZipInstallError;

/// RAII owner of `{under}/zip-install-{uuid}/`. Dropping removes the whole
/// tree unless `.consume()` has been called. Holds a separate atomic so the
/// typestate is cheap to flip from within a nested function without moving.
#[derive(Debug)]
pub struct StagingDir {
    root: PathBuf,
    removed: AtomicBool,
}

impl StagingDir {
    /// Create a fresh, empty staging directory under `under`.
    pub fn new(under: &Path) -> std::io::Result<Self> {
        let name = format!("zip-install-{}", Uuid::new_v4().simple());
        let root = under.join(name);
        std::fs::create_dir_all(&root)?;
        Ok(Self {
            root,
            removed: AtomicBool::new(false),
        })
    }

    pub fn path(&self) -> &Path {
        &self.root
    }

    /// Mark this guard as handled by caller-driven cleanup (e.g. after an
    /// atomic rename moved the contents to their final home). Subsequent
    /// `Drop` is a no-op.
    pub fn consume(self) {
        self.removed.store(true, Ordering::Release);
    }
}

impl Drop for StagingDir {
    fn drop(&mut self) {
        if !self.removed.load(Ordering::Acquire) {
            let _ = std::fs::remove_dir_all(&self.root);
        }
    }
}

/// Atomically publish `src` as `dest` (the extension's final home under
/// `extensions_root`). Returns `ZipInstallError::AlreadyInstalled` if the
/// target directory already exists — the ZIP install flow is strictly
/// additive and never overwrites a prior install.
///
/// On Windows, `std::fs::rename` fails if the destination exists; on Unix
/// it silently replaces. We probe with `try_exists` first to normalize
/// behavior across platforms (FR-IE05 `extension.already_installed`).
pub fn atomic_rename(src: &Path, dest: &Path, extension_id: &str) -> Result<(), ZipInstallError> {
    if dest.try_exists().map_err(ZipInstallError::StageFailed)? {
        return Err(ZipInstallError::AlreadyInstalled {
            extension_id: extension_id.to_owned(),
        });
    }
    if let Some(parent) = dest.parent() {
        std::fs::create_dir_all(parent).map_err(ZipInstallError::StageFailed)?;
    }
    std::fs::rename(src, dest).map_err(ZipInstallError::StageFailed)?;
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn drop_removes_staging_dir_by_default() {
        let tmp = tempfile::tempdir().unwrap();
        let saved_path;
        {
            let staging = StagingDir::new(tmp.path()).unwrap();
            saved_path = staging.path().to_owned();
            assert!(saved_path.exists());
        }
        assert!(!saved_path.exists(), "drop should have cleaned up");
    }

    #[test]
    fn consume_keeps_staging_dir() {
        let tmp = tempfile::tempdir().unwrap();
        let staging = StagingDir::new(tmp.path()).unwrap();
        let saved = staging.path().to_owned();
        staging.consume();
        assert!(saved.exists(), "consume prevents auto-cleanup");
        // Cleanup so the outer tempdir drop succeeds.
        let _ = std::fs::remove_dir_all(saved);
    }

    #[test]
    fn atomic_rename_rejects_existing_target() {
        let tmp = tempfile::tempdir().unwrap();
        let src = tmp.path().join("src");
        let dest = tmp.path().join("dest");
        std::fs::create_dir_all(&src).unwrap();
        std::fs::create_dir_all(&dest).unwrap();

        let err = atomic_rename(&src, &dest, "ext.foo").unwrap_err();
        assert!(matches!(err, ZipInstallError::AlreadyInstalled { .. }));
    }

    #[test]
    fn atomic_rename_succeeds_on_empty_target() {
        let tmp = tempfile::tempdir().unwrap();
        let src = tmp.path().join("src");
        let dest = tmp.path().join("dest");
        std::fs::create_dir_all(&src).unwrap();
        std::fs::write(src.join("hello.txt"), b"hi").unwrap();

        atomic_rename(&src, &dest, "ext.foo").unwrap();
        assert!(dest.join("hello.txt").exists());
        assert!(!src.exists());
    }
}
