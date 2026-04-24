//! Spec 031 FR-152 merge gate.
//!
//! Spawns the per-extension boundary audit and asserts a clean exit. Runs
//! on every `cargo test -p emotion-tts-extension`.

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
