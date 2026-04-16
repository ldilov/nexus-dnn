use crate::error::DeploymentError;
use std::path::{Component, Path, PathBuf};

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct PathGuard(PathBuf);

impl PathGuard {
    pub fn verify(raw: &str, allowed_roots: &[&Path]) -> Result<Self, DeploymentError> {
        if raw.is_empty() {
            return Err(DeploymentError::PathOutsideWorkspace(raw.to_owned()));
        }

        let path = PathBuf::from(raw);

        if has_traversal(&path) {
            return Err(DeploymentError::PathOutsideWorkspace(raw.to_owned()));
        }

        if is_unc_or_device(raw) {
            return Err(DeploymentError::PathOutsideWorkspace(raw.to_owned()));
        }

        let resolved = if path.exists() {
            path.canonicalize()
                .map_err(|_| DeploymentError::PathOutsideWorkspace(raw.to_owned()))?
        } else {
            normalize_lexically(&path, allowed_roots)?
        };

        for root in allowed_roots {
            let root_canonical = root.canonicalize().unwrap_or_else(|_| root.to_path_buf());
            if resolved.starts_with(&root_canonical) || resolved.starts_with(root) {
                return Ok(Self(resolved));
            }
        }

        Err(DeploymentError::PathOutsideWorkspace(raw.to_owned()))
    }

    pub fn as_path(&self) -> &Path {
        &self.0
    }
}

impl AsRef<Path> for PathGuard {
    fn as_ref(&self) -> &Path {
        &self.0
    }
}

fn has_traversal(path: &Path) -> bool {
    path.components().any(|c| matches!(c, Component::ParentDir))
}

fn is_unc_or_device(raw: &str) -> bool {
    raw.starts_with("\\\\")
        || raw.starts_with("//")
        || raw.starts_with("\\\\?\\")
        || raw.starts_with("\\\\.\\")
}

fn normalize_lexically(path: &Path, allowed_roots: &[&Path]) -> Result<PathBuf, DeploymentError> {
    if path.is_absolute() {
        return Ok(path.to_path_buf());
    }
    if let Some(root) = allowed_roots.first() {
        Ok(root.join(path))
    } else {
        Err(DeploymentError::PathOutsideWorkspace(
            path.display().to_string(),
        ))
    }
}
