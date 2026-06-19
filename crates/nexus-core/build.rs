use std::process::Command;

fn main() {
    let workspace_root = std::path::Path::new(env!("CARGO_MANIFEST_DIR"))
        .parent()
        .and_then(|p| p.parent())
        .expect("failed to resolve workspace root");

    println!(
        "cargo:rustc-env=NEXUS_WORKSPACE_ROOT={}",
        workspace_root.display()
    );

    println!("cargo:rerun-if-changed=../../extensions/builtin");
    println!("cargo:rerun-if-changed=../../apps/web/src");
    println!("cargo:rerun-if-changed=../../apps/web/index.html");
    println!("cargo:rerun-if-changed=../../apps/web/package.json");
    println!("cargo:rerun-if-env-changed=NEXUS_BUILD_ID");

    let web_dir = std::path::Path::new("../../apps/web");

    if !web_dir.join("node_modules").exists() {
        run_npm(&["install", "--prefix", "../../apps/web"]);
    }

    run_npm(&["run", "build", "--prefix", "../../apps/web"]);
}

fn run_npm(args: &[&str]) {
    let npm = if cfg!(target_os = "windows") {
        "npm.cmd"
    } else {
        "npm"
    };

    let status = Command::new(npm)
        .args(args)
        .status()
        .unwrap_or_else(|e| panic!("failed to run {npm}: {e}. Is Node.js installed?"));

    if !status.success() {
        panic!("npm command failed with exit code: {status}");
    }
}
