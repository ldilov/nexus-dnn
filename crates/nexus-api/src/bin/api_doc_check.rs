//! `cargo run -p nexus-api --bin api-doc-check`
//!
//! Best-effort drift sanity check between `docs/api/openapi.yaml` and the
//! axum routers across the host crate + builtin extensions.
//!
//! ## What it does
//!
//! It does NOT try to reconstruct the full router (axum's `.nest()` /
//! `.merge()` composition makes that brittle from a regex pass). Instead it
//! treats both the YAML and the source as **bags of path fragments** and
//! looks for one-sided fragments:
//!
//! - For every path declared in `openapi.yaml`, it splits the path into
//!   non-template segments and checks that each segment appears as a literal
//!   route-string fragment somewhere under `crates/nexus-api/` or
//!   `extensions/builtin/*/rust/src/`. A path with NO supporting source is
//!   reported as **stale**.
//!
//! - For every literal `.route("…")` string found in source whose segments do
//!   not jointly appear in any documented path, it is reported as **missing**.
//!
//! False-positive rate is non-trivial. Treat the output as guidance, not
//! ground truth, and pair with prose review of `router.rs`. The CI value is
//! catching the obvious cases — a brand-new router file, a deleted handler.
//!
//! ## Modes
//!
//! - default — emit drift report; non-zero exit on any drift.
//! - `--dump-yaml` — list paths discovered in `openapi.yaml`.
//! - `--dump-source` — list `.route("…")` literals discovered in source.

use regex_lite::Regex;
use std::collections::BTreeSet;
use std::fs;
use std::path::{Path, PathBuf};
use std::process::ExitCode;

const OPENAPI_FILE: &str = "docs/api/openapi.yaml";
const HOST_SRC_DIR: &str = "crates/nexus-api/src";
const BUILTIN_EXTENSIONS_DIR: &str = "extensions/builtin";
const EXTENSION_SRC_SUBPATH: &str = "rust/src";

fn main() -> ExitCode {
    let dump_yaml = std::env::args().any(|a| a == "--dump-yaml");
    let dump_source = std::env::args().any(|a| a == "--dump-source");

    let root = match locate_workspace_root() {
        Ok(p) => p,
        Err(e) => {
            eprintln!("error: {e}");
            return ExitCode::FAILURE;
        }
    };

    let yaml_paths = match extract_yaml_paths(&root.join(OPENAPI_FILE)) {
        Ok(s) => s,
        Err(e) => {
            eprintln!("error reading openapi.yaml: {e}");
            return ExitCode::FAILURE;
        }
    };
    let source_routes = match scan_source_routes(&root) {
        Ok(s) => s,
        Err(e) => {
            eprintln!("error scanning source: {e}");
            return ExitCode::FAILURE;
        }
    };

    if dump_yaml {
        for p in &yaml_paths {
            println!("{p}");
        }
        return ExitCode::SUCCESS;
    }
    if dump_source {
        for p in &source_routes {
            println!("{p}");
        }
        return ExitCode::SUCCESS;
    }

    let stale = stale_yaml_paths(&yaml_paths, &source_routes);
    let missing = missing_source_routes(&yaml_paths, &source_routes);

    println!(
        "Scanned {} openapi paths and {} source route literals.",
        yaml_paths.len(),
        source_routes.len()
    );

    let mut drift = false;

    if !stale.is_empty() {
        drift = true;
        eprintln!(
            "\n  Possibly stale in openapi.yaml ({}): documented but no\n  matching `.route(\"…\")` literal found anywhere in source.",
            stale.len()
        );
        for p in &stale {
            eprintln!("    - {p}");
        }
    }
    if !missing.is_empty() {
        drift = true;
        eprintln!(
            "\n  Possibly missing from openapi.yaml ({}): `.route(\"…\")` literals\n  whose final non-template segment is not present in any documented path.",
            missing.len()
        );
        for p in &missing {
            eprintln!("    + {p}");
        }
    }

    if !drift {
        println!("OK: no drift detected.");
        return ExitCode::SUCCESS;
    }
    eprintln!(
        "\nDrift detected. Update docs/api/openapi.yaml AND docs/api/API.md, then re-run."
    );
    ExitCode::FAILURE
}

fn locate_workspace_root() -> Result<PathBuf, String> {
    if let Ok(manifest_dir) = std::env::var("CARGO_MANIFEST_DIR") {
        let crate_dir = PathBuf::from(manifest_dir);
        if let Some(workspace) = crate_dir.parent().and_then(Path::parent) {
            return Ok(workspace.to_path_buf());
        }
    }
    let exe = std::env::current_exe()
        .map_err(|e| format!("cannot resolve current exe: {e}"))?;
    let mut cursor = exe.parent().map(Path::to_path_buf);
    while let Some(dir) = cursor {
        if dir.join("Cargo.lock").exists() && dir.join("crates").exists() {
            return Ok(dir);
        }
        cursor = dir.parent().map(Path::to_path_buf);
    }
    Err("could not locate workspace root (no Cargo.lock found above current exe)".to_string())
}

// ─── YAML extraction ────────────────────────────────────────────────────────

fn extract_yaml_paths(path: &Path) -> Result<BTreeSet<String>, String> {
    let body = fs::read_to_string(path).map_err(|e| format!("{}: {e}", path.display()))?;
    let mut out = BTreeSet::new();
    let mut in_paths_section = false;
    for line in body.lines() {
        if line.starts_with("paths:") {
            in_paths_section = true;
            continue;
        }
        if !in_paths_section {
            continue;
        }
        // Any other top-level (column-zero, non-indented) key terminates the
        // `paths:` block — `components:`, `tags:`, `servers:`, `security:`, etc.
        if !line.is_empty()
            && !line.starts_with(' ')
            && !line.starts_with('#')
            && line.contains(':')
        {
            break;
        }
        if let Some(p) = parse_yaml_path_key(line) {
            out.insert(p);
        }
    }
    Ok(out)
}

fn parse_yaml_path_key(line: &str) -> Option<String> {
    if !line.starts_with("  /") {
        return None;
    }
    let trimmed = line.trim_start();
    if !trimmed.ends_with(':') {
        return None;
    }
    let path = trimmed.trim_end_matches(':').trim();
    if !path.starts_with('/') {
        return None;
    }
    Some(path.to_string())
}

// ─── Source extraction ──────────────────────────────────────────────────────

fn scan_source_routes(root: &Path) -> Result<BTreeSet<String>, String> {
    let route_re = Regex::new(r#"\.route\(\s*"([^"]+)""#).unwrap();
    let mut out = BTreeSet::new();
    for dir in source_dirs(root) {
        walk_rs_files(&dir, &mut |body| {
            for cap in route_re.captures_iter(body) {
                let raw = &cap[1];
                if !raw.starts_with('/') {
                    continue;
                }
                out.insert(raw.to_string());
            }
        })?;
    }
    Ok(out)
}

/// Discover source directories at runtime. Walks `extensions/builtin/*` and
/// admits any subdir that has a `rust/src/` folder. New builtin extensions
/// are picked up automatically — no constant edit required.
fn source_dirs(root: &Path) -> Vec<PathBuf> {
    let mut dirs = vec![root.join(HOST_SRC_DIR)];
    let builtins = root.join(BUILTIN_EXTENSIONS_DIR);
    if let Ok(entries) = fs::read_dir(&builtins) {
        for entry in entries.flatten() {
            let candidate = entry.path().join(EXTENSION_SRC_SUBPATH);
            if candidate.is_dir() {
                dirs.push(candidate);
            }
        }
    }
    dirs
}

fn walk_rs_files<F: FnMut(&str)>(dir: &Path, visit: &mut F) -> Result<(), String> {
    if !dir.exists() {
        return Ok(());
    }
    let entries = fs::read_dir(dir).map_err(|e| format!("{}: {e}", dir.display()))?;
    for entry in entries.flatten() {
        let p = entry.path();
        if p.is_dir() {
            walk_rs_files(&p, visit)?;
        } else if p.extension().and_then(|s| s.to_str()) == Some("rs") {
            let body = fs::read_to_string(&p).map_err(|e| format!("{}: {e}", p.display()))?;
            visit(&body);
        }
    }
    Ok(())
}

// ─── Drift analysis ─────────────────────────────────────────────────────────

/// A documented path is "stale" if no source literal contains its terminal
/// non-template segment AND its parent non-template segment.
fn stale_yaml_paths(
    yaml_paths: &BTreeSet<String>,
    source_routes: &BTreeSet<String>,
) -> Vec<String> {
    yaml_paths
        .iter()
        .filter(|yp| !yaml_path_supported(yp, source_routes))
        .cloned()
        .collect()
}

fn yaml_path_supported(yaml_path: &str, source_routes: &BTreeSet<String>) -> bool {
    let key = signature(yaml_path);
    if key.is_empty() {
        return true; // Root or all-template — give the benefit of the doubt.
    }
    source_routes
        .iter()
        .any(|sr| signature(sr).contains(&key) || key.contains(&signature(sr)))
}

/// A source route is "missing" if its terminal non-template segment never
/// appears in any documented path.
fn missing_source_routes(
    yaml_paths: &BTreeSet<String>,
    source_routes: &BTreeSet<String>,
) -> Vec<String> {
    let yaml_signatures: BTreeSet<String> = yaml_paths.iter().map(|p| signature(p)).collect();
    source_routes
        .iter()
        .filter(|sr| {
            let sig = signature(sr);
            if sig.is_empty() {
                return false;
            }
            !yaml_signatures.iter().any(|y| y.contains(&sig) || sig.contains(y))
        })
        .cloned()
        .collect()
}

/// Reduce a path to its non-template segments joined by `/`. Used as a
/// substring-match key. Both axum (`:foo`, `*foo`) and OpenAPI (`{foo}`)
/// templates collapse to the empty string.
fn signature(p: &str) -> String {
    p.split('/')
        .filter(|seg| {
            !seg.is_empty()
                && !seg.starts_with('{')
                && !seg.starts_with(':')
                && !seg.starts_with('*')
        })
        .collect::<Vec<_>>()
        .join("/")
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parses_yaml_path_keys() {
        assert_eq!(
            parse_yaml_path_key("  /api/v1/health:"),
            Some("/api/v1/health".to_string())
        );
        assert_eq!(
            parse_yaml_path_key("  /api/v1/extensions/{id}:"),
            Some("/api/v1/extensions/{id}".to_string())
        );
        assert_eq!(parse_yaml_path_key("    get:"), None);
        assert_eq!(parse_yaml_path_key("paths:"), None);
        assert_eq!(parse_yaml_path_key("  # comment"), None);
    }

    #[test]
    fn signature_strips_templates() {
        assert_eq!(signature("/api/v1/runs/{id}/cancel"), "api/v1/runs/cancel");
        assert_eq!(signature("/api/v1/runs/:id/cancel"), "api/v1/runs/cancel");
        assert_eq!(signature("/api/v1/runs/*rest"), "api/v1/runs");
        assert_eq!(signature("/api/v1/runs"), "api/v1/runs");
    }

    #[test]
    fn yaml_path_supported_finds_match() {
        let mut sources = BTreeSet::new();
        sources.insert("/api/v1/runs/:id/cancel".to_string());
        assert!(yaml_path_supported("/api/v1/runs/{id}/cancel", &sources));
    }

    #[test]
    fn yaml_path_supported_misses_unrelated() {
        let mut sources = BTreeSet::new();
        sources.insert("/foo/bar".to_string());
        assert!(!yaml_path_supported("/api/v1/runs/{id}/cancel", &sources));
    }
}
