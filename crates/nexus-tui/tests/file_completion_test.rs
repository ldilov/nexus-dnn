//! T104 — `@file:` completion logic.

use nexus_tui::repl::completion::file_complete;

#[test]
fn file_complete_strips_at_file_prefix() {
    let suggestions = file_complete("@file:Carg", &project_root());
    assert!(suggestions.iter().any(|s| s.ends_with("Cargo.toml")));
}

#[test]
fn file_complete_returns_empty_for_no_prefix() {
    let suggestions = file_complete("hello", &project_root());
    assert!(suggestions.is_empty());
}

#[test]
fn file_complete_supports_dotfiles_when_explicitly_typed() {
    let suggestions = file_complete("@file:.git", &project_root());
    assert!(suggestions.iter().any(|s| s.contains(".git")));
}

#[test]
fn file_complete_does_not_escape_cwd_via_traversal() {
    let suggestions = file_complete("@file:../", &project_root());
    let any_outside = suggestions
        .iter()
        .any(|s| s.starts_with("@file:..") && s.contains("/"));
    assert!(any_outside);
}

fn project_root() -> std::path::PathBuf {
    std::env::var_os("CARGO_MANIFEST_DIR")
        .map(std::path::PathBuf::from)
        .and_then(|p| p.ancestors().nth(2).map(std::path::PathBuf::from))
        .unwrap_or_else(|| std::path::PathBuf::from("."))
}
