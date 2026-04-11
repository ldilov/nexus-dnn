use std::process::Command;

fn main() {
    println!("cargo:rerun-if-changed=../../apps/web/src");
    println!("cargo:rerun-if-changed=../../apps/web/index.html");
    println!("cargo:rerun-if-changed=../../apps/web/package.json");

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
