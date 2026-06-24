//! Boundary guard for the host-owned recipe-run surfaces (CONTRACTS C7). Both
//! the ad-hoc recipe-run route (`handlers/recipes/`) and the deployment
//! recipe-run route are generic by `{id}` over host-owned rows; a regression
//! that bakes in an extension id or a hardcoded node-id-shaped constant fails
//! here. The scan also covers `nexus-deployments`' `service/execute.rs`, which
//! computes the execution-context hash and must stay extension-agnostic.

use std::path::{Path, PathBuf};

/// Additional host-generic source files (beyond `handlers/recipes/`) that the
/// deployment recipe-run route flows through. Paths are relative to this
/// crate's manifest dir.
const EXTRA_SCANNED: &[&str] = &[
    "src/handlers/deployments/handlers.rs",
    "../nexus-deployments/src/service/execute.rs",
];

fn extra_scanned_files() -> Vec<PathBuf> {
    let manifest = Path::new(env!("CARGO_MANIFEST_DIR"));
    EXTRA_SCANNED.iter().map(|rel| manifest.join(rel)).collect()
}

const FORBIDDEN: &[&str] = &[
    "local-llm",
    "local_llm",
    "emotiontts",
    "emotion-tts",
    "emotion_tts",
    "indextts",
    "svi2-pro",
    "svi2_pro",
    "svi2",
    "nexus-video-ltx",
    "ltx23",
    "nexus.rag",
    "nexus.local-llm",
    "nexus.audio.emotiontts",
];

/// Node-id-shaped literals: a hardcoded `node:` reference or a `.config.`
/// pointer betrays extension-specific graph knowledge in host code.
const FORBIDDEN_NODE_SHAPES: &[&str] = &["node:", ".config."];

fn recipes_dir() -> PathBuf {
    Path::new(env!("CARGO_MANIFEST_DIR")).join("src/handlers/recipes")
}

fn collect_rs_files(dir: &Path, out: &mut Vec<PathBuf>) {
    for entry in std::fs::read_dir(dir).expect("read handlers/recipes dir") {
        let entry = entry.expect("dir entry");
        let path = entry.path();
        if path.is_dir() {
            collect_rs_files(&path, out);
        } else if path.extension().and_then(|e| e.to_str()) == Some("rs") {
            out.push(path);
        }
    }
}

#[test]
fn recipes_handlers_have_no_extension_id_literals() {
    let mut files = Vec::new();
    collect_rs_files(&recipes_dir(), &mut files);
    assert!(
        !files.is_empty(),
        "expected .rs files under handlers/recipes"
    );
    files.extend(extra_scanned_files());

    for path in &files {
        let src = std::fs::read_to_string(path).expect("read source");
        // Strip the #[cfg(test)] module so generic test sentinels are exempt.
        let prod = src.split("#[cfg(test)]").next().unwrap_or(&src);
        for needle in FORBIDDEN {
            assert!(
                !prod.contains(needle),
                "{}: production code contains forbidden extension literal {needle:?}",
                path.display()
            );
        }
    }
}

#[test]
fn recipes_handlers_have_no_node_id_shaped_constants() {
    let mut files = Vec::new();
    collect_rs_files(&recipes_dir(), &mut files);
    files.extend(extra_scanned_files());

    for path in &files {
        let src = std::fs::read_to_string(path).expect("read source");
        let prod = src.split("#[cfg(test)]").next().unwrap_or(&src);
        for needle in FORBIDDEN_NODE_SHAPES {
            assert!(
                !prod.contains(needle),
                "{}: production code contains node-id-shaped literal {needle:?}",
                path.display()
            );
        }
    }
}
