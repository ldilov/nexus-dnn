//! Spec 031 FR-152 merge gate.
//!
//! Spawns the per-extension boundary audit and asserts a clean exit. Runs
//! on every `cargo test -p emotion-tts-extension`.
//!
//! Spec 036 (audio editing) extends the gate with three additional assertions
//! per `specs/036-audio-editing/contracts/boundary-audit.md`:
//!   1. `ext_emotion_tts__audio_edit_log` MUST NOT appear in `crates/`.
//!   2. RPC method literals `audio.edit` / `audio.edit.preview` MUST NOT
//!      appear in any host file.
//!   3. The new HTTP route segments (`/voice-assets/.../edit`, `/audit/`)
//!      MUST NOT appear in `crates/` or `apps/web/src/` outside the
//!      extension's own tree.

use std::fs;
use std::path::{Path, PathBuf};
use std::process::Command;

fn repo_root() -> PathBuf {
    let crate_dir = Path::new(env!("CARGO_MANIFEST_DIR"));
    crate_dir
        .ancestors()
        .find(|p| p.join(".git").exists() && p.join("scripts/audit-runtime-boundary.ps1").exists())
        .unwrap_or(crate_dir)
        .to_path_buf()
}

#[test]
fn boundary_audit_reports_clean() {
    let root = repo_root();
    let ps1 = root.join("extensions/builtin/emotion-tts/scripts/audit-boundary.ps1");
    let sh = root.join("extensions/builtin/emotion-tts/scripts/audit-boundary.sh");

    let expected = if cfg!(windows) { &ps1 } else { &sh };
    assert!(
        expected.exists(),
        "boundary audit script not found at {}; someone likely moved or renamed the per-extension audit",
        expected.display()
    );

    let (program, args): (&str, Vec<String>) = if cfg!(windows) {
        ("powershell", vec![
            "-NoProfile".into(),
            "-ExecutionPolicy".into(),
            "Bypass".into(),
            "-File".into(),
            ps1.to_string_lossy().into_owned(),
        ])
    } else {
        ("bash", vec![sh.to_string_lossy().into_owned()])
    };

    let output = Command::new(program)
        .args(&args)
        .current_dir(&root)
        .output()
        .expect("failed to spawn boundary audit");

    let stdout = String::from_utf8_lossy(&output.stdout);
    let stderr = String::from_utf8_lossy(&output.stderr);
    assert!(
        output.status.success(),
        "boundary audit exited {:?}\nstdout: {stdout}\nstderr: {stderr}",
        output.status.code()
    );
}

const HOST_AUDIT_ROOTS: &[&str] = &["crates", "apps/web/src", "migrations"];

const HOST_AUDIT_SKIPS: &[&str] = &[
    "extensions/builtin/emotion-tts",
    "apps/web/src/views/backends",
    "apps/web/src/views/backend-runtimes",
    "apps/web/src/views/extensions",
    "target",
    "node_modules",
    "dist",
];

fn is_text_file(path: &Path) -> bool {
    matches!(
        path.extension().and_then(|s| s.to_str()),
        Some(
            "rs" | "ts"
                | "tsx"
                | "js"
                | "jsx"
                | "css"
                | "json"
                | "yaml"
                | "yml"
                | "toml"
                | "sql"
                | "md"
                | "html"
        )
    )
}

fn walk_text_files(root: &Path, out: &mut Vec<PathBuf>) {
    let Ok(entries) = fs::read_dir(root) else {
        return;
    };

    for entry in entries.flatten() {
        let path = entry.path();
        let path_str = path.to_string_lossy().replace('\\', "/");

        if HOST_AUDIT_SKIPS.iter().any(|skip| path_str.contains(skip)) {
            continue;
        }

        let Ok(metadata) = entry.file_type() else {
            continue;
        };

        if metadata.is_dir() {
            walk_text_files(&path, out);
        } else if metadata.is_file() && is_text_file(&path) {
            out.push(path);
        }
    }
}

fn assert_literal_absent_from_host_tree(literal: &str, label: &str) {
    let root = repo_root();
    let mut hits: Vec<String> = Vec::new();

    for audit_root in HOST_AUDIT_ROOTS {
        let abs = root.join(audit_root);
        if !abs.exists() {
            continue;
        }
        let mut files: Vec<PathBuf> = Vec::new();
        walk_text_files(&abs, &mut files);
        for file in files {
            let Ok(content) = fs::read_to_string(&file) else {
                continue;
            };
            if content.contains(literal) {
                let rel = file
                    .strip_prefix(&root)
                    .unwrap_or(&file)
                    .to_string_lossy()
                    .replace('\\', "/");
                hits.push(rel);
            }
        }
    }

    assert!(
        hits.is_empty(),
        "Spec 036 boundary violation: literal `{literal}` ({label}) found in host tree:\n  {}",
        hits.join("\n  ")
    );
}

#[test]
fn spec_036_audit_log_table_name_absent_from_host() {
    assert_literal_absent_from_host_tree(
        "ext_emotion_tts__audio_edit_log",
        "spec-036 audit log table",
    );
}

#[test]
fn spec_036_rpc_method_names_absent_from_host() {
    assert_literal_absent_from_host_tree("audio.edit.preview", "spec-036 preview RPC method");
    assert_literal_absent_from_host_tree("\"audio.edit\"", "spec-036 apply RPC method");
}

#[test]
fn spec_036_route_segments_absent_from_host() {
    assert_literal_absent_from_host_tree(
        "voice-assets/{voice_asset_id}/edit",
        "spec-036 voice-asset edit route",
    );
    assert_literal_absent_from_host_tree("/audit/{target_kind}", "spec-036 audit listing route");
}
