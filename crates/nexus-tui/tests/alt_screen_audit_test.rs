//! Spec 044 FR-009 — alternate-screen buffer audit.
//!
//! FR-009 requires that the TUI never engages the terminal alternate-screen
//! buffer (so scrollback survives the session). crossterm exposes
//! `EnterAlternateScreen` / `LeaveAlternateScreen`; this test fails if
//! any source file under `crates/nexus-tui/src/` references either name.
//!
//! Implementation property test — guards against accidental future
//! introduction of alt-screen mode by a polish PR.

use std::fs;
use std::path::{Path, PathBuf};

const FORBIDDEN_TOKENS: &[&str] = &["EnterAlternateScreen", "LeaveAlternateScreen"];

fn workspace_src_root() -> PathBuf {
    let cargo_manifest = env!("CARGO_MANIFEST_DIR");
    Path::new(cargo_manifest).join("src")
}

fn collect_rs_files(dir: &Path, out: &mut Vec<PathBuf>) {
    let Ok(entries) = fs::read_dir(dir) else {
        return;
    };
    for entry in entries.flatten() {
        let path = entry.path();
        if path.is_dir() {
            collect_rs_files(&path, out);
        } else if path.extension().is_some_and(|e| e == "rs") {
            out.push(path);
        }
    }
}

#[test]
fn no_alternate_screen_buffer_engagement() {
    let root = workspace_src_root();
    let mut files = Vec::new();
    collect_rs_files(&root, &mut files);
    assert!(
        !files.is_empty(),
        "expected to find source files under {root:?}"
    );

    let mut offenders: Vec<(PathBuf, &'static str)> = Vec::new();
    for file in &files {
        let Ok(content) = fs::read_to_string(file) else {
            continue;
        };
        for token in FORBIDDEN_TOKENS {
            if content.contains(token) {
                offenders.push((file.clone(), *token));
            }
        }
    }

    assert!(
        offenders.is_empty(),
        "FR-009 violation: alternate-screen API used in: {offenders:#?}"
    );
}
