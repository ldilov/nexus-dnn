//! Extension binary entrypoint.
//!
//! P1 scaffolding: the worker binary boots, logs its version, and exits.
//! Real route mounting + storage wiring lands in P2 once the host's
//! `ExtensionContext` lease shape is locked.

fn main() -> std::process::ExitCode {
    eprintln!(
        "nexus.video.ltx23 extension worker boot version={}",
        env!("CARGO_PKG_VERSION")
    );
    std::process::ExitCode::SUCCESS
}
