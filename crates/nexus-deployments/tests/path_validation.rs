use nexus_deployments::path_guard::PathGuard;
use std::path::Path;

#[test]
fn rejects_parent_traversal() {
    let root = std::env::temp_dir();
    let r = PathGuard::verify("../etc/passwd", &[root.as_path()]);
    assert!(r.is_err());
}

#[test]
fn rejects_unc_paths() {
    let root = std::env::temp_dir();
    let r = PathGuard::verify("\\\\server\\share\\file", &[root.as_path()]);
    assert!(r.is_err());
}

#[test]
fn rejects_empty_path() {
    let r = PathGuard::verify("", &[Path::new(".")]);
    assert!(r.is_err());
}

#[test]
fn accepts_relative_path_under_root() {
    let root = std::env::temp_dir();
    let r = PathGuard::verify("models/x.gguf", &[root.as_path()]);
    assert!(r.is_ok(), "expected accept, got {r:?}");
}
