//! Pre-extraction ZIP validation (spec 019 FR-IE04, steps 2–6 of
//! `contracts/zip-install-pipeline.md` §2).
//!
//! Runs over an opened `ZipArchive<R>` — purely read-only inspection of the
//! central directory plus a targeted read of the `manifest.toml` entry to
//! discover which path prefixes are allowed to be executable.
//!
//! Every check returns a specific `ZipInstallError` variant so the axum
//! handler can map 1:1 to FR-IE05 codes without re-parsing error strings.

use std::io::{Read, Seek};
use std::path::{Component, Path, PathBuf};

use serde::Deserialize;
use zip::ZipArchive;

use super::error::ZipInstallError;
use super::limits::ZipSizeLimits;

/// Outcome of a successful pre-extraction validation pass.
///
/// `manifest_entry_name` is the central-directory entry name (e.g.
/// `"manifest.toml"` or `"cinema-engine/manifest.toml"`) — cached so the
/// full extractor doesn't have to re-find it.
#[derive(Debug, Clone)]
pub struct ValidatedArchive {
    pub manifest_entry_name: String,
    pub total_uncompressed: u64,
    pub entry_count: usize,
}

/// Run steps 2–6. Returns `Ok(ValidatedArchive)` only if every check passes.
pub fn validate<R: Read + Seek>(
    archive: &mut ZipArchive<R>,
    limits: &ZipSizeLimits,
) -> Result<ValidatedArchive, ZipInstallError> {
    let entry_count = archive.len();
    if entry_count > limits.max_file_count {
        return Err(ZipInstallError::FileCountLimit {
            actual: entry_count,
            limit: limits.max_file_count,
        });
    }

    let mut total_uncompressed: u64 = 0;
    let mut manifest_entry_name: Option<String> = None;

    for i in 0..entry_count {
        let file = archive.by_index(i)?;
        let name = file.name().to_owned();

        // Step 3 — Zip-Slip first gate: `enclosed_name()` returns None on
        // any entry whose decoded path escapes (absolute, `..`, NUL bytes).
        let enclosed = file.enclosed_name().ok_or(ZipInstallError::SlipAttempt)?;

        // Step 3 — second gate: re-walk components, refuse any `..` /
        // root / prefix. `enclosed_name` already does this for most cases,
        if !path_is_safe(&enclosed) {
            return Err(ZipInstallError::SlipAttempt);
        }

        // Directory entries contribute nothing to size/manifest matching.
        if file.is_dir() {
            continue;
        }

        // Step 5a — uncompressed-size accumulator.
        total_uncompressed = total_uncompressed.saturating_add(file.size());
        if total_uncompressed > limits.max_uncompressed_bytes {
            return Err(ZipInstallError::SizeLimit {
                actual: total_uncompressed,
                limit: limits.max_uncompressed_bytes,
            });
        }

        // Step 4 — manifest at depth ≤ 2. `"manifest.toml"` at root is the
        // canonical form; `"{extension_id}/manifest.toml"` wrapped once is
        if manifest_entry_name.is_none() && is_manifest_entry(&enclosed) {
            manifest_entry_name = Some(name.clone());
        }
    }

    let manifest_entry_name = manifest_entry_name.ok_or(ZipInstallError::MissingManifest)?;

    // Step 6 — manifest-peek for executable-path policy. Read ONLY the
    // manifest entry bytes from the central directory and extract the
    let allowlist = peek_executable_allowlist(archive, &manifest_entry_name)?;
    check_executables(archive, &allowlist)?;

    Ok(ValidatedArchive {
        manifest_entry_name,
        total_uncompressed,
        entry_count,
    })
}

fn path_is_safe(path: &Path) -> bool {
    for comp in path.components() {
        match comp {
            Component::Normal(_) => continue,
            // Any other component (RootDir, Prefix, CurDir, ParentDir) is
            // a violation inside a zip entry name.
            _ => return false,
        }
    }
    true
}

fn is_manifest_entry(path: &Path) -> bool {
    let name = path.file_name().and_then(|s| s.to_str());
    let is_manifest_name = matches!(
        name,
        Some("manifest.yaml" | "manifest.yml" | "manifest.toml")
    );
    if !is_manifest_name {
        return false;
    }
    // depth ≤ 2 means at most one parent directory component (the
    // filename itself is depth 1).
    path.components().count() <= 2
}

fn manifest_format(entry_name: &str) -> ManifestFormat {
    if entry_name.ends_with(".toml") {
        ManifestFormat::Toml
    } else {
        ManifestFormat::Yaml
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum ManifestFormat {
    Yaml,
    Toml,
}

#[derive(Debug, Deserialize)]
struct ManifestPeek {
    #[serde(default)]
    runtime: Option<RuntimePeek>,
}

#[derive(Debug, Deserialize)]
struct RuntimePeek {
    #[serde(default)]
    entrypoint: Option<String>,
}

/// Read the manifest entry from the central directory and return the set of
/// path prefixes allowed to carry executable bits. The worker entrypoint
/// itself plus the `assets/` and `worker/` conventional directories are all
/// auto-added so the pipeline behaves sensibly on manifests that don't
/// explicitly declare paths.
fn peek_executable_allowlist<R: Read + Seek>(
    archive: &mut ZipArchive<R>,
    manifest_entry_name: &str,
) -> Result<Vec<String>, ZipInstallError> {
    let mut buf = String::new();
    {
        let mut entry = archive.by_name(manifest_entry_name)?;
        entry
            .read_to_string(&mut buf)
            .map_err(ZipInstallError::StageFailed)?;
    }

    let peek: ManifestPeek = match manifest_format(manifest_entry_name) {
        ManifestFormat::Toml => toml::from_str(&buf)
            .map_err(|e| ZipInstallError::ManifestInvalid(format!("manifest-peek: {e}")))?,
        ManifestFormat::Yaml => serde_saphyr::from_str(&buf)
            .map_err(|e| ZipInstallError::ManifestInvalid(format!("manifest-peek: {e}")))?,
    };

    let prefix_root = manifest_parent_prefix(manifest_entry_name);
    let mut prefixes: Vec<String> = Vec::with_capacity(4);
    if let Some(entry) = peek
        .runtime
        .and_then(|r| r.entrypoint)
        .filter(|s| !s.is_empty())
    {
        prefixes.push(format!("{prefix_root}{entry}"));
    }
    prefixes.push(format!("{prefix_root}assets/"));
    prefixes.push(format!("{prefix_root}worker/"));
    prefixes.push(format!("{prefix_root}manifest.toml"));
    Ok(prefixes)
}

fn manifest_parent_prefix(manifest_entry_name: &str) -> String {
    if let Some((parent, _)) = manifest_entry_name.rsplit_once('/') {
        format!("{parent}/")
    } else {
        String::new()
    }
}

/// Scan every entry for Unix executable bits. Reject anything marked
/// executable whose path does not sit under one of the allowed prefixes.
fn check_executables<R: Read + Seek>(
    archive: &mut ZipArchive<R>,
    allowlist: &[String],
) -> Result<(), ZipInstallError> {
    for i in 0..archive.len() {
        let file = archive.by_index(i)?;
        if file.is_dir() {
            continue;
        }
        let mode = file.unix_mode().unwrap_or(0);
        let has_exec = mode & 0o111 != 0;
        if !has_exec {
            continue;
        }
        let name = file.name();
        if !allowlist.iter().any(|p| name.starts_with(p)) {
            return Err(ZipInstallError::ExecutableOutsideAssets {
                path: name.to_owned(),
            });
        }
    }
    Ok(())
}

/// Joined path at which the final extraction step (step 7 in the pipeline)
/// writes `entry` under `dest_root`. Kept separate so the extractor can
/// reuse the same join-and-validate convention that `validate` established.
pub fn staged_target(dest_root: &Path, entry: &Path) -> Option<PathBuf> {
    if !path_is_safe(entry) {
        return None;
    }
    Some(dest_root.join(entry))
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::io::{Cursor, Write};
    use zip::ZipWriter;
    use zip::write::SimpleFileOptions;

    fn make_zip_with(entries: &[(&str, &[u8])]) -> Cursor<Vec<u8>> {
        let mut buf = Cursor::new(Vec::<u8>::new());
        {
            let mut w = ZipWriter::new(&mut buf);
            let opts =
                SimpleFileOptions::default().compression_method(zip::CompressionMethod::Stored);
            for (name, bytes) in entries {
                w.start_file(*name, opts).unwrap();
                w.write_all(bytes).unwrap();
            }
            w.finish().unwrap();
        }
        buf.set_position(0);
        buf
    }

    const MIN_MANIFEST: &[u8] = br#"
spec_version = "1.0"

[extension]
id = "demo"
version = "1.0.0"

[compatibility]
host_api = "1.0"
protocol = "1.0"

[runtime]
family = "python"
entrypoint = "worker/main.py"
"#;

    #[test]
    fn rejects_file_count_limit() {
        let mut entries: Vec<(String, Vec<u8>)> = (0..3)
            .map(|i| (format!("f{i}.txt"), b"x".to_vec()))
            .collect();
        entries.push(("manifest.toml".into(), MIN_MANIFEST.to_vec()));
        let refs: Vec<(&str, &[u8])> = entries
            .iter()
            .map(|(n, b)| (n.as_str(), b.as_slice()))
            .collect();
        let buf = make_zip_with(&refs);
        let mut archive = ZipArchive::new(buf).unwrap();
        let tight = ZipSizeLimits {
            max_file_count: 2,
            ..ZipSizeLimits::default()
        };
        assert!(matches!(
            validate(&mut archive, &tight),
            Err(ZipInstallError::FileCountLimit { .. })
        ));
    }

    #[test]
    fn rejects_missing_manifest() {
        let buf = make_zip_with(&[("not-a-manifest.txt", b"hi")]);
        let mut archive = ZipArchive::new(buf).unwrap();
        assert!(matches!(
            validate(&mut archive, &ZipSizeLimits::default()),
            Err(ZipInstallError::MissingManifest)
        ));
    }

    #[test]
    fn happy_path_passes() {
        let buf = make_zip_with(&[("manifest.toml", MIN_MANIFEST), ("worker/main.py", b"pass")]);
        let mut archive = ZipArchive::new(buf).unwrap();
        let v = validate(&mut archive, &ZipSizeLimits::default()).unwrap();
        assert_eq!(v.manifest_entry_name, "manifest.toml");
        assert_eq!(v.entry_count, 2);
    }

    #[test]
    fn manifest_nested_one_level_ok() {
        let buf = make_zip_with(&[
            ("demo/manifest.toml", MIN_MANIFEST),
            ("demo/worker/main.py", b"pass"),
        ]);
        let mut archive = ZipArchive::new(buf).unwrap();
        let v = validate(&mut archive, &ZipSizeLimits::default()).unwrap();
        assert_eq!(v.manifest_entry_name, "demo/manifest.toml");
    }

    #[test]
    fn rejects_manifest_too_deep() {
        let buf = make_zip_with(&[
            ("a/b/manifest.toml", MIN_MANIFEST),
            ("a/b/worker.py", b"pass"),
        ]);
        let mut archive = ZipArchive::new(buf).unwrap();
        assert!(matches!(
            validate(&mut archive, &ZipSizeLimits::default()),
            Err(ZipInstallError::MissingManifest)
        ));
    }

    #[test]
    fn path_is_safe_rejects_parent_traversal() {
        assert!(!path_is_safe(Path::new("../etc/passwd")));
        assert!(!path_is_safe(Path::new("/absolute")));
        assert!(path_is_safe(Path::new("assets/icon.svg")));
    }
}
