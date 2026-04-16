//! ZIP install pipeline orchestrator (spec 019 FR-IE03..FR-IE05, see
//! `contracts/zip-install-pipeline.md` §2).
//!
//! The orchestrator is purely synchronous — callers run it under
//! `tokio::task::spawn_blocking` to keep the axum runtime responsive. All
//! 12 contract steps execute in strict order; any failure short-circuits
//! and the `StagingDir` RAII drop cleans up the unpacked tree.

use std::fs::File;
use std::io::{BufReader, Read, Write};
use std::path::{Path, PathBuf};

use serde::Serialize;
use zip::ZipArchive;

use crate::manifest::{ExtensionManifest, parse_manifest};

use super::error::ZipInstallError;
use super::limits::ZipSizeLimits;
use super::stage::{StagingDir, atomic_rename};
use super::svg_sanitize::sanitize_svg;
use super::validate_zip::{ValidatedArchive, staged_target, validate};

/// Successful ZIP install output, ready for the axum handler to surface.
#[derive(Debug, Clone, Serialize)]
#[non_exhaustive]
pub struct ZipInstallResult {
    pub extension_id: String,
    pub module_id: String,
    pub manifest_summary: ManifestSummary,
    pub install_diagnostics: Vec<String>,
}

/// Minimal, display-focused projection of the installed manifest. Sized for
/// the drawer's success screen; full manifest is available via
/// `GET /api/v1/extensions/{id}` once the registry has republished.
#[derive(Debug, Clone, Serialize)]
#[non_exhaustive]
pub struct ManifestSummary {
    pub id: String,
    pub version: String,
    pub name: Option<String>,
    pub description: Option<String>,
    pub publisher: Option<String>,
}

/// Orchestrator. Immutable after construction; a fresh instance is fine per
/// request, but nothing prevents sharing one across concurrent callers.
pub struct ZipInstallPipeline {
    extensions_root: PathBuf,
    staging_root: PathBuf,
    size_limits: ZipSizeLimits,
}

impl ZipInstallPipeline {
    pub fn new(extensions_root: PathBuf, staging_root: PathBuf) -> Self {
        Self {
            extensions_root,
            staging_root,
            size_limits: ZipSizeLimits::default(),
        }
    }

    pub fn with_size_limits(mut self, limits: ZipSizeLimits) -> Self {
        self.size_limits = limits;
        self
    }

    pub fn size_limits(&self) -> &ZipSizeLimits {
        &self.size_limits
    }

    /// Run all 12 pipeline steps against an already-staged ZIP file.
    ///
    /// Blocking. Caller is responsible for running this under
    /// `tokio::task::spawn_blocking` or an equivalent blocking-safe context.
    pub fn install_from_file(&self, zip_path: &Path) -> Result<ZipInstallResult, ZipInstallError> {
        // Defence-in-depth: enforce the compressed cap even though the axum
        // body limit is the primary gate. This protects any future non-HTTP
        // caller (CLI, cron) that bypasses the axum layer.
        let compressed_size = std::fs::metadata(zip_path)?.len();
        if compressed_size > self.size_limits.max_compressed_bytes {
            return Err(ZipInstallError::SizeLimit {
                actual: compressed_size,
                limit: self.size_limits.max_compressed_bytes,
            });
        }

        std::fs::create_dir_all(&self.staging_root)?;
        let staging = StagingDir::new(&self.staging_root)?;
        let unpacked_root = staging.path().join("unpacked");
        std::fs::create_dir_all(&unpacked_root)?;

        // Steps 2-6 — read-only validation pass over the central directory.
        let file = File::open(zip_path)?;
        let mut archive = ZipArchive::new(BufReader::new(file))?;
        let validated = validate(&mut archive, &self.size_limits)?;

        // Step 7 — extract every entry into `unpacked_root/{rewritten}`.
        extract_all(&mut archive, &unpacked_root)?;

        // Step 8 — re-parse the extracted manifest to fail early on semantic
        // errors the central-directory peek could not catch.
        let manifest_on_disk = unpacked_root.join(&validated.manifest_entry_name);
        let manifest = parse_manifest(&manifest_on_disk)?;

        // Step 9 — SVG icon sanitization runs regardless of whether the
        // icon is wrapped in ManifestIcon.svg or elsewhere; here we only
        // touch the manifest field because that's the FR-I03 surface.
        if let Some(svg) = manifest
            .extension
            .icon
            .as_ref()
            .and_then(|icon| icon.svg.as_deref())
        {
            sanitize_svg(svg)?;
        }

        // The ZIP may wrap the manifest under an extension_id-named dir.
        // If so, promote that dir's contents to unpacked_root before the
        // atomic rename — the extensions_root layout is always
        // `extensions_root/{id}/manifest.{yaml,toml}` at top level.
        let final_src = flatten_wrapper_dir(unpacked_root.clone(), &validated)?;

        // Step 10 — atomic rename into final destination.
        let extension_id = manifest.extension.id.clone();
        let dest = self.extensions_root.join(&extension_id);
        atomic_rename(&final_src, &dest, &extension_id)?;
        staging.consume();

        // Step 11 — registry refresh happens at the axum handler, not here:
        // the pipeline does not own the `InMemoryExtensionRegistry`.

        // Step 12 — build the result.
        let module_id = format!("ext:{extension_id}");
        let summary = ManifestSummary {
            id: manifest.extension.id.clone(),
            version: manifest.extension.version.clone(),
            name: manifest.extension.name.clone(),
            description: manifest.extension.description.clone(),
            publisher: manifest.extension.publisher.clone(),
        };

        Ok(ZipInstallResult {
            extension_id,
            module_id,
            manifest_summary: summary,
            install_diagnostics: manifest_diagnostics(&manifest),
        })
    }
}

/// Write every non-directory entry of `archive` into `dest_root`, preserving
/// the central-directory relative path and enforcing a Zip-Slip double-check
/// at join time.
fn extract_all<R: Read + std::io::Seek>(
    archive: &mut ZipArchive<R>,
    dest_root: &Path,
) -> Result<(), ZipInstallError> {
    for i in 0..archive.len() {
        let mut entry = archive.by_index(i)?;
        let enclosed = entry.enclosed_name().ok_or(ZipInstallError::SlipAttempt)?;
        let target = staged_target(dest_root, &enclosed).ok_or(ZipInstallError::SlipAttempt)?;
        if entry.is_dir() {
            std::fs::create_dir_all(&target)?;
            continue;
        }
        if let Some(parent) = target.parent() {
            std::fs::create_dir_all(parent)?;
        }
        let mut out = File::create(&target)?;
        let mut buf = [0u8; 64 * 1024];
        loop {
            let n = entry.read(&mut buf).map_err(ZipInstallError::StageFailed)?;
            if n == 0 {
                break;
            }
            out.write_all(&buf[..n])
                .map_err(ZipInstallError::StageFailed)?;
        }
    }
    Ok(())
}

/// If the ZIP wrapped its contents under a single top-level directory
/// (`{id}/manifest.yaml` rather than `manifest.yaml`), move one level up so
/// `atomic_rename` can install the tree at `extensions_root/{id}` without a
/// doubled-directory layout.
fn flatten_wrapper_dir(
    unpacked: PathBuf,
    validated: &ValidatedArchive,
) -> Result<PathBuf, ZipInstallError> {
    if !validated.manifest_entry_name.contains('/') {
        return Ok(unpacked);
    }
    let wrapper = validated
        .manifest_entry_name
        .split_once('/')
        .map(|(head, _)| head.to_owned())
        .ok_or_else(|| ZipInstallError::Corrupt("unexpected manifest path".into()))?;
    Ok(unpacked.join(wrapper))
}

fn manifest_diagnostics(manifest: &ExtensionManifest) -> Vec<String> {
    let mut diagnostics = Vec::new();
    if manifest.extension.name.is_none() {
        diagnostics.push("extension.name is missing".into());
    }
    if manifest.extension.description.is_none() {
        diagnostics.push("extension.description is missing".into());
    }
    diagnostics
}

#[cfg(test)]
mod tests {
    use super::*;
    use zip::ZipWriter;
    use zip::write::SimpleFileOptions;

    const HAPPY_MANIFEST: &[u8] = br#"
spec_version: "1.0"

extension:
  id: "demo-install"
  version: "1.0.0"
  name: "Demo Install"
  publisher: "test"

compatibility:
  host_api: "1.0"
  protocol: "1.0"

runtime:
  family: "python"
  entrypoint: "worker/main.py"
"#;

    fn write_happy_zip(tmp: &Path) -> PathBuf {
        let path = tmp.join("input.zip");
        let file = File::create(&path).unwrap();
        let mut w = ZipWriter::new(file);
        let opts = SimpleFileOptions::default().compression_method(zip::CompressionMethod::Stored);
        w.start_file("manifest.yaml", opts).unwrap();
        w.write_all(HAPPY_MANIFEST).unwrap();
        w.start_file("worker/main.py", opts).unwrap();
        w.write_all(b"print('hi')\n").unwrap();
        w.finish().unwrap();
        path
    }

    #[test]
    fn happy_install_succeeds_and_creates_destination() {
        let tmp = tempfile::tempdir().unwrap();
        let extensions_root = tmp.path().join("extensions");
        let staging_root = tmp.path().join(".staging");
        let zip_path = write_happy_zip(tmp.path());

        let pipeline = ZipInstallPipeline::new(extensions_root.clone(), staging_root);
        let result = pipeline.install_from_file(&zip_path).unwrap();

        assert_eq!(result.extension_id, "demo-install");
        assert_eq!(result.module_id, "ext:demo-install");
        assert!(
            extensions_root
                .join("demo-install")
                .join("manifest.yaml")
                .exists()
        );
        assert!(
            extensions_root
                .join("demo-install")
                .join("worker/main.py")
                .exists()
        );
    }

    #[test]
    fn already_installed_returns_409() {
        let tmp = tempfile::tempdir().unwrap();
        let extensions_root = tmp.path().join("extensions");
        let staging_root = tmp.path().join(".staging");
        let zip_path = write_happy_zip(tmp.path());

        let pipeline = ZipInstallPipeline::new(extensions_root.clone(), staging_root);
        pipeline.install_from_file(&zip_path).unwrap();
        let second = pipeline.install_from_file(&zip_path);
        assert!(matches!(
            second,
            Err(ZipInstallError::AlreadyInstalled { .. })
        ));
    }

    #[test]
    fn compressed_cap_enforced_defensively() {
        let tmp = tempfile::tempdir().unwrap();
        let extensions_root = tmp.path().join("extensions");
        let staging_root = tmp.path().join(".staging");
        let zip_path = write_happy_zip(tmp.path());

        let tiny = ZipSizeLimits {
            max_compressed_bytes: 1,
            ..ZipSizeLimits::default()
        };
        let pipeline =
            ZipInstallPipeline::new(extensions_root, staging_root).with_size_limits(tiny);
        let err = pipeline.install_from_file(&zip_path).unwrap_err();
        assert!(matches!(err, ZipInstallError::SizeLimit { .. }));
    }

    #[test]
    fn staging_dir_is_cleaned_up_on_failure() {
        let tmp = tempfile::tempdir().unwrap();
        let extensions_root = tmp.path().join("extensions");
        let staging_root = tmp.path().join(".staging");

        // Write a ZIP with no manifest — validator rejects at step 4.
        let zip_path = tmp.path().join("bad.zip");
        {
            let file = File::create(&zip_path).unwrap();
            let mut w = ZipWriter::new(file);
            let opts =
                SimpleFileOptions::default().compression_method(zip::CompressionMethod::Stored);
            w.start_file("readme.txt", opts).unwrap();
            w.write_all(b"no manifest here").unwrap();
            w.finish().unwrap();
        }

        let pipeline = ZipInstallPipeline::new(extensions_root, staging_root.clone());
        let err = pipeline.install_from_file(&zip_path).unwrap_err();
        assert!(matches!(err, ZipInstallError::MissingManifest));

        // The staging root's only child was the staging dir — it's been
        // cleaned up via StagingDir Drop, leaving staging_root itself empty.
        let entries = std::fs::read_dir(&staging_root)
            .map(|rd| rd.collect::<Result<Vec<_>, _>>().unwrap())
            .unwrap_or_default();
        assert!(entries.is_empty(), "staging dir leaked: {entries:?}");
    }
}
