//! Boundary audit for the Draft AI suggestion stream handler family.
//! Constitution Principle XIII / FR-051 / SC-012 require that the
//! host's draft-suggestion handler module contains zero references to
//! any specific extension id.
//!
//! This test is deliberately the cheapest test in the family — file-system
//! grep over the handler module's source. It runs in milliseconds and
//! must remain green on every commit. If a future change introduces an
//! extension-id literal here (even in a comment), this test fails and
//! the change cannot land.

use std::fs;
use std::path::{Path, PathBuf};

fn handler_dir() -> PathBuf {
    let manifest_dir =
        std::env::var("CARGO_MANIFEST_DIR").expect("CARGO_MANIFEST_DIR is set during cargo test");
    PathBuf::from(manifest_dir).join("src/handlers/draft_suggestions")
}

fn collect_rs_files(dir: &Path, out: &mut Vec<PathBuf>) {
    for entry in fs::read_dir(dir).expect("readable handler dir") {
        let entry = entry.expect("dir entry");
        let path = entry.path();
        if path.is_dir() {
            collect_rs_files(&path, out);
        } else if path.extension().and_then(|s| s.to_str()) == Some("rs") {
            out.push(path);
        }
    }
}

fn nexus_dot_id_regex(text: &str) -> bool {
    // Cheap hand-rolled scan for a `nexus.<lowercase-id>` literal — does
    // not require pulling in a full regex crate dependency. Matches the
    let bytes = text.as_bytes();
    let needle = b"nexus.";
    if bytes.len() < needle.len() {
        return false;
    }
    'outer: for i in 0..=(bytes.len() - needle.len()) {
        for (j, n) in needle.iter().enumerate() {
            if bytes[i + j] != *n {
                continue 'outer;
            }
        }
        // After `nexus.`, require at least one [a-z0-9_-] char. This
        // distinguishes `nexus.local-llm` from incidental sentences like
        let next = bytes.get(i + needle.len());
        if let Some(&c) = next
            && (c.is_ascii_lowercase() || c.is_ascii_digit() || c == b'_' || c == b'-')
        {
            return true;
        }
    }
    false
}

#[test]
fn handler_module_contains_no_extension_id_literals() {
    let mut files = Vec::new();
    collect_rs_files(&handler_dir(), &mut files);
    assert!(
        !files.is_empty(),
        "expected at least one .rs file under {}",
        handler_dir().display()
    );

    // Each banned literal MUST NOT appear anywhere under the handler
    // module — not in code, not in comments, not in doc strings. This
    let banned_literals = ["local-llm", "local_llm", "emotion-tts", "emotiontts"];

    let mut violations: Vec<String> = Vec::new();
    for path in &files {
        let contents = fs::read_to_string(path).expect("readable .rs file");
        for needle in banned_literals {
            for (lineno, line) in contents.lines().enumerate() {
                if line.contains(needle) {
                    violations.push(format!(
                        "{}:{} contains banned literal `{}`: {}",
                        path.display(),
                        lineno + 1,
                        needle,
                        line.trim()
                    ));
                }
            }
        }
        if nexus_dot_id_regex(&contents) {
            for (lineno, line) in contents.lines().enumerate() {
                if nexus_dot_id_regex(line) {
                    violations.push(format!(
                        "{}:{} contains `nexus.<id>` literal: {}",
                        path.display(),
                        lineno + 1,
                        line.trim()
                    ));
                }
            }
        }
    }

    assert!(
        violations.is_empty(),
        "Constitution XIII boundary violation in draft_suggestions handler module:\n{}",
        violations.join("\n")
    );
}

#[test]
fn audit_finds_seeded_violation_in_test_string() {
    // Negative-control fixture: ensure the detector itself works.
    let bad = "let extension_id = \"nexus.local-llm\";";
    assert!(bad.contains("local-llm"), "literal scanner sanity");
    assert!(nexus_dot_id_regex(bad), "regex scanner sanity");
}

#[test]
fn audit_does_not_false_positive_on_neutral_text() {
    let neutral = "// the Nexus. End of sentence.";
    // The regex requires [a-z0-9_-] after `nexus.` — capital N stops it
    // from matching. Make sure the pattern does NOT trip on prose.
    assert!(!nexus_dot_id_regex(neutral));
}

#[test]
fn audit_does_not_false_positive_on_lowercase_prose_ending_in_period() {
    // Regression guard for an edge case raised during the spec 037
    // Phase 8 review: lowercase "nexus." at end of sentence (followed by
    assert!(!nexus_dot_id_regex("the nexus.\n"));
    assert!(!nexus_dot_id_regex("the nexus. End"));
    assert!(!nexus_dot_id_regex("nexus.."));
    // But the genuine extension-id form MUST still match.
    assert!(nexus_dot_id_regex("nexus.local-llm"));
    assert!(nexus_dot_id_regex("nexus.audio.emotiontts"));
    assert!(nexus_dot_id_regex("\"nexus.foo\""));
}
