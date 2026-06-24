//! P1 boundary discipline (CONTRACTS C7/C10). `nexus-recipe` is host-generic
//! infrastructure: zero extension-id literals, zero hardcoded node ids. The
//! generic binding-grammar prefixes `node:`/`input:` ARE allowed (the resolver
//! needs them); a CONCRETE id (a literal right after the prefix) is not.

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
    // Specific multi-char slugs only — bare words like "rag"/"chat" would
    // false-match generic terms (e.g. "sto-rag-e").
    const FORBIDDEN: &[&str] = &[
        "local-llm",
        "local_llm",
        "nexus.local-llm",
        "emotiontts",
        "emotion-tts",
        "emotion_tts",
        "nexus.audio.emotiontts",
        "indextts",
        "svi2-pro",
        "svi2_pro",
        "svi2",
        "nexus-video-ltx",
        "ltx23",
        "nexus.rag",
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
        "extension-id literals leaked into nexus-recipe:\n  {}",
        violations.join("\n  "),
    );
}

#[test]
fn no_concrete_node_id_bindings_in_source() {
    let mut violations: Vec<String> = Vec::new();
    for path in walk_rs(&crate_src()) {
        let body = match std::fs::read_to_string(&path) {
            Ok(b) => b,
            Err(_) => continue,
        };
        for prefix in ["node:", "input:"] {
            for (i, _) in body.match_indices(prefix) {
                let next = body[i + prefix.len()..].chars().next();
                if matches!(next, Some(c) if c.is_ascii_alphanumeric()) {
                    violations.push(format!("{}: concrete `{}` binding", path.display(), prefix));
                }
            }
        }
        if body.contains(".config.") {
            violations.push(format!("{}: concrete `.config.` path", path.display()));
        }
    }
    assert!(
        violations.is_empty(),
        "concrete node-id bindings leaked into nexus-recipe src:\n  {}",
        violations.join("\n  "),
    );
}
