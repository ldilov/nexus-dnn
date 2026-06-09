//! Blob legibility (spec 054 G7) — make an opaque `<sink_root>/<job_id>/`
//! GUID directory identifiable back to the model it holds.
//!
//! Two artifacts are written next to the downloaded weights:
//! * a per-job `manifest.json` sidecar inside the job dir (AC-7.1), and
//! * a top-level `index.json` mapping `job_id -> { family_id, repo }`
//!   (AC-7.2), updated on install completion and pruned on self-heal / GC.
//!
//! The index is a shared file, so every read-modify-write runs under a
//! process-wide async lock and commits via temp-file + atomic rename.

use std::collections::BTreeMap;
use std::path::Path;

use serde::{Deserialize, Serialize};
use tokio::sync::Mutex;

/// Filename of the per-job sidecar written inside `<sink_root>/<job_id>/`.
pub const MANIFEST_FILENAME: &str = "manifest.json";
/// Filename of the top-level legibility index under `<sink_root>/`.
pub const INDEX_FILENAME: &str = "index.json";

/// Serialises every index read-modify-write in this process so concurrent
/// job completions can't clobber one another's entries.
static INDEX_LOCK: Mutex<()> = Mutex::const_new(());

/// Per-job sidecar describing which model lives in this GUID dir.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct ManifestSidecar {
    pub family_id: String,
    pub source_repo: String,
    /// The accelerator profile the install targeted, when known. The
    /// model-store download job does not carry it, so the orchestrator
    /// writes `null`; callers that DO know it can write a richer sidecar.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub accelerator: Option<String>,
    pub files: Vec<String>,
    pub created_at: String,
}

/// One value in the top-level index, keyed by `job_id`.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct IndexEntry {
    pub family_id: String,
    pub repo: String,
}

/// The whole `index.json` document: `job_id -> entry`. `BTreeMap` keeps a
/// stable on-disk ordering so diffs stay readable.
pub type LegibilityIndex = BTreeMap<String, IndexEntry>;

/// Write `<sink_root>/<job_id>/manifest.json` (AC-7.1). Best-effort: the
/// download already committed, so a sidecar write failure is logged by the
/// caller and never fails the install.
pub async fn write_manifest(
    sink_root: &Path,
    job_id: &str,
    manifest: &ManifestSidecar,
) -> std::io::Result<()> {
    let dir = sink_root.join(job_id);
    tokio::fs::create_dir_all(&dir).await?;
    let body = serde_json::to_vec_pretty(manifest)
        .map_err(|e| std::io::Error::new(std::io::ErrorKind::InvalidData, e))?;
    write_atomic(&dir.join(MANIFEST_FILENAME), &body).await
}

/// Insert or replace the index entry for `job_id` (AC-7.2). Runs under the
/// process index lock and commits atomically.
pub async fn upsert_index_entry(
    sink_root: &Path,
    job_id: &str,
    entry: IndexEntry,
) -> std::io::Result<()> {
    let _guard = INDEX_LOCK.lock().await;
    let mut index = read_index_unlocked(sink_root).await?;
    index.insert(job_id.to_owned(), entry);
    write_index_unlocked(sink_root, &index).await
}

/// Remove the index entry for `job_id`, if present (AC-7.2 prune path). A
/// no-op when the index or entry is absent.
pub async fn remove_index_entry(sink_root: &Path, job_id: &str) -> std::io::Result<()> {
    let _guard = INDEX_LOCK.lock().await;
    let mut index = read_index_unlocked(sink_root).await?;
    if index.remove(job_id).is_some() {
        write_index_unlocked(sink_root, &index).await?;
    }
    Ok(())
}

/// Read and parse `<sink_root>/index.json`. A missing or unparseable index
/// reads as empty so a corrupt file self-heals on the next write.
pub async fn read_index(sink_root: &Path) -> std::io::Result<LegibilityIndex> {
    let _guard = INDEX_LOCK.lock().await;
    read_index_unlocked(sink_root).await
}

async fn read_index_unlocked(sink_root: &Path) -> std::io::Result<LegibilityIndex> {
    let path = sink_root.join(INDEX_FILENAME);
    match tokio::fs::read(&path).await {
        Ok(bytes) => Ok(serde_json::from_slice(&bytes).unwrap_or_default()),
        Err(e) if e.kind() == std::io::ErrorKind::NotFound => Ok(LegibilityIndex::new()),
        Err(e) => Err(e),
    }
}

async fn write_index_unlocked(sink_root: &Path, index: &LegibilityIndex) -> std::io::Result<()> {
    tokio::fs::create_dir_all(sink_root).await?;
    let body = serde_json::to_vec_pretty(index)
        .map_err(|e| std::io::Error::new(std::io::ErrorKind::InvalidData, e))?;
    write_atomic(&sink_root.join(INDEX_FILENAME), &body).await
}

/// Write `body` to `path` via a sibling temp file + rename so a reader never
/// observes a half-written document.
async fn write_atomic(path: &Path, body: &[u8]) -> std::io::Result<()> {
    let tmp = path.with_extension("json.tmp");
    tokio::fs::write(&tmp, body).await?;
    tokio::fs::rename(&tmp, path).await
}

#[cfg(test)]
mod tests {
    use super::*;

    fn sidecar() -> ManifestSidecar {
        ManifestSidecar {
            family_id: "huggingface:acme/model".into(),
            source_repo: "acme/model".into(),
            accelerator: None,
            files: vec!["model.gguf".into(), "config.json".into()],
            created_at: "2026-06-09T00:00:00Z".into(),
        }
    }

    #[tokio::test]
    async fn write_manifest_creates_parseable_sidecar_with_family() {
        let tmp = tempfile::tempdir().unwrap();
        let job = "00000000-0000-7000-8000-00000000000a";
        write_manifest(tmp.path(), job, &sidecar()).await.unwrap();

        let path = tmp.path().join(job).join(MANIFEST_FILENAME);
        let bytes = tokio::fs::read(&path).await.unwrap();
        let parsed: ManifestSidecar = serde_json::from_slice(&bytes).unwrap();
        assert_eq!(parsed.family_id, "huggingface:acme/model");
        assert_eq!(parsed.files.len(), 2);
    }

    #[tokio::test]
    async fn upsert_index_entry_adds_then_remove_drops() {
        let tmp = tempfile::tempdir().unwrap();
        let job = "00000000-0000-7000-8000-00000000000b";
        upsert_index_entry(
            tmp.path(),
            job,
            IndexEntry {
                family_id: "huggingface:acme/model".into(),
                repo: "acme/model".into(),
            },
        )
        .await
        .unwrap();

        let index = read_index(tmp.path()).await.unwrap();
        assert_eq!(index.get(job).map(|e| e.repo.as_str()), Some("acme/model"));

        remove_index_entry(tmp.path(), job).await.unwrap();
        assert!(read_index(tmp.path()).await.unwrap().get(job).is_none());
    }

    #[tokio::test]
    async fn remove_missing_entry_is_noop() {
        let tmp = tempfile::tempdir().unwrap();
        remove_index_entry(tmp.path(), "nope").await.unwrap();
        assert!(read_index(tmp.path()).await.unwrap().is_empty());
    }

    #[tokio::test]
    async fn upsert_replaces_existing_entry() {
        let tmp = tempfile::tempdir().unwrap();
        let job = "00000000-0000-7000-8000-00000000000c";
        for repo in ["acme/old", "acme/new"] {
            upsert_index_entry(
                tmp.path(),
                job,
                IndexEntry {
                    family_id: format!("huggingface:{repo}"),
                    repo: repo.into(),
                },
            )
            .await
            .unwrap();
        }
        let index = read_index(tmp.path()).await.unwrap();
        assert_eq!(index.len(), 1);
        assert_eq!(index.get(job).map(|e| e.repo.as_str()), Some("acme/new"));
    }
}
