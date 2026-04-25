//! Spec 035 T071 — boundary discipline tests.
//!
//! Two assertions:
//! 1. **Extension-id literals (FR-060)** — no source file under `nexus-extension-deps`
//!    contains the id of any known extension. The host crate is generic; per-extension
//!    behavior belongs in the extension's own tree.
//! 2. **Spec-opacity guard (FR-005)** — outside `src/handlers/`, no source file
//!    pattern-matches on the `spec: Value` block (e.g. via `spec[`, `spec.get(`,
//!    `spec.as_object()`). The host's generic code MUST treat each step's spec as
//!    opaque JSON; only the matching handler reads its fields.

use std::path::{Path, PathBuf};

fn crate_src() -> PathBuf {
    PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("src")
}

fn walk_rs(root: &Path) -> Vec<PathBuf> {
    let mut out = Vec::new();
    let mut stack = vec![root.to_path_buf()];
    while let Some(dir) = stack.pop() {
        let entries = match std::fs::read_dir(&dir) {
            Ok(e) => e,
            Err(_) => continue,
        };
        for entry in entries.flatten() {
            let path = entry.path();
            if path.is_dir() {
                stack.push(path);
            } else if path.extension().and_then(|s| s.to_str()) == Some("rs") {
                out.push(path);
            }
        }
    }
    out
}

#[test]
fn no_extension_id_literals_in_source() {
    const FORBIDDEN: &[&str] = &[
        "local-llm",
        "local_llm",
        "nexus.local-llm",
        "emotiontts",
        "emotion-tts",
        "emotion_tts",
        "nexus.audio.emotiontts",
        "indextts",
        "IndexTTS",
    ];
    let mut violations: Vec<String> = Vec::new();
    for path in walk_rs(&crate_src()) {
        let body = match std::fs::read_to_string(&path) {
            Ok(b) => b,
            Err(_) => continue,
        };
        for needle in FORBIDDEN {
            if body.contains(needle) {
                violations.push(format!("{}: {}", path.display(), needle));
            }
        }
    }
    assert!(
        violations.is_empty(),
        "extension-id literals leaked into nexus-extension-deps:\n  {}",
        violations.join("\n  "),
    );
}

#[test]
fn spec_value_is_opaque_outside_handler_modules() {
    // Inside src/handlers/, handlers are *expected* to read fields out of `spec`.
    // Everywhere else (`plan.rs`, `runner.rs`, `handler.rs`, `context.rs`, `fetch.rs`,
    // `error.rs`, `types.rs`, `lib.rs`), the spec value is opaque — host generic code
    // MUST NOT pattern-match on its internal shape.
    const FORBIDDEN_SHAPES: &[&str] = &[
        "spec[\"",
        "spec.get(",
        "spec.as_object()",
        "spec.as_array()",
        "spec.as_str()",
        "spec.pointer(",
    ];
    let mut violations: Vec<String> = Vec::new();
    for path in walk_rs(&crate_src()) {
        // Skip handler implementations — they're the one place reading spec fields is allowed.
        if path.components().any(|c| c.as_os_str() == "handlers") {
            continue;
        }
        let body = match std::fs::read_to_string(&path) {
            Ok(b) => b,
            Err(_) => continue,
        };
        for needle in FORBIDDEN_SHAPES {
            if body.contains(needle) {
                violations.push(format!("{}: pattern '{}' (spec must be opaque outside handlers)", path.display(), needle));
            }
        }
    }
    assert!(
        violations.is_empty(),
        "spec-opacity guard (FR-005) violated:\n  {}",
        violations.join("\n  "),
    );
}
