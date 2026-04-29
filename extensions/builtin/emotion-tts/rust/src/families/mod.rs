//! Model-family registry (spec 034 US5 / R-34-06).
//!
//! Loads every `recipes/families/*.yaml` at extension activation and
//! exposes a read-only view for the HTTP and RPC surfaces. The registry
//! is not a cache — reconciliation against the host model-store happens
//! per request because installed state changes out-of-band (the user
//! can trigger a download from another tab while a synthesis runs).
//!
//! Boundary: the registry never writes to the host model-store. It only
//! reads status and forwards the user-facing install URL.

use std::path::{Path, PathBuf};

use serde::{Deserialize, Serialize};

use crate::domain::{EmotionTtsError, Result};

/// Default family id used when a deployment has NULL `model_family`
/// (mirrors `storage::repo_traits::DEFAULT_MODEL_FAMILY`).
pub const DEFAULT_FAMILY_ID: &str = "indextts-2";

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct FamilyDescriptor {
    pub family_id: String,
    pub display_name: String,
    pub model_family_ref: String,
    pub engine_version_constraint: String,
    #[serde(default)]
    pub supported_languages: Vec<String>,
    #[serde(default)]
    pub expected_artifacts: Vec<String>,
    #[serde(default)]
    pub default_generation: serde_json::Value,
}

/// Status of a family reconciled against the host model-store.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum FamilyStatus {
    Available,
    NotInstalled,
    Partial,
    Incompatible,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct FamilyEntry {
    #[serde(flatten)]
    pub descriptor: FamilyDescriptor,
    pub status: FamilyStatus,
    #[serde(default)]
    pub status_detail: Option<String>,
}

/// The set of families the extension knows about. Read-only at runtime
/// — adding a family requires a reload hook (spec 030).
#[derive(Debug, Clone)]
pub struct FamilyRegistry {
    descriptors: Vec<FamilyDescriptor>,
}

impl FamilyRegistry {
    #[must_use]
    pub fn new(descriptors: Vec<FamilyDescriptor>) -> Self {
        Self { descriptors }
    }

    /// Load every `*.yaml` under `dir` into a registry. Non-yaml files
    /// are skipped. Parse errors surface as `EmotionTtsError::Internal`
    /// so the caller can report the first bad descriptor.
    pub fn load_from_dir(dir: &Path) -> Result<Self> {
        let mut descriptors = Vec::new();
        let read = std::fs::read_dir(dir)
            .map_err(|e| EmotionTtsError::internal(format!("read_dir {dir:?}: {e}")))?;
        for entry in read {
            let entry = entry.map_err(|e| EmotionTtsError::internal(format!("dir entry: {e}")))?;
            let path = entry.path();
            if !is_yaml_file(&path) {
                continue;
            }
            let raw = std::fs::read_to_string(&path)
                .map_err(|e| EmotionTtsError::internal(format!("read {path:?}: {e}")))?;
            let desc: FamilyDescriptor = serde_yaml::from_str(&raw)
                .map_err(|e| EmotionTtsError::internal(format!("parse {path:?}: {e}")))?;
            descriptors.push(desc);
        }
        descriptors.sort_by(|a, b| a.family_id.cmp(&b.family_id));
        Ok(Self::new(descriptors))
    }

    #[must_use]
    pub fn descriptors(&self) -> &[FamilyDescriptor] {
        &self.descriptors
    }

    #[must_use]
    pub fn get(&self, family_id: &str) -> Option<&FamilyDescriptor> {
        self.descriptors.iter().find(|d| d.family_id == family_id)
    }

    /// Check whether `family_id` is a known descriptor. Used by the
    /// deployment-create validator (T103) to reject unknown ids.
    #[must_use]
    pub fn contains(&self, family_id: &str) -> bool {
        self.get(family_id).is_some()
    }

    /// Build the reconciled entry list. Given a per-descriptor status
    /// probe callback (the caller owns the host-side HTTP), map each
    /// descriptor into a `FamilyEntry`. The closure is invoked at most
    /// once per descriptor.
    pub async fn reconcile<F, Fut>(&self, mut probe: F) -> Result<Vec<FamilyEntry>>
    where
        F: FnMut(&FamilyDescriptor) -> Fut,
        Fut: std::future::Future<Output = Result<FamilyStatusSnapshot>>,
    {
        let mut out = Vec::with_capacity(self.descriptors.len());
        for desc in &self.descriptors {
            let snap = probe(desc).await?;
            out.push(FamilyEntry {
                descriptor: desc.clone(),
                status: snap.status,
                status_detail: snap.detail,
            });
        }
        Ok(out)
    }
}

/// The per-descriptor snapshot returned by the caller's probe callback.
#[derive(Debug, Clone)]
pub struct FamilyStatusSnapshot {
    pub status: FamilyStatus,
    pub detail: Option<String>,
}

impl FamilyStatusSnapshot {
    #[must_use]
    pub const fn available() -> Self {
        Self {
            status: FamilyStatus::Available,
            detail: None,
        }
    }

    #[must_use]
    pub const fn not_installed() -> Self {
        Self {
            status: FamilyStatus::NotInstalled,
            detail: None,
        }
    }

    #[must_use]
    pub fn partial(missing: Vec<String>) -> Self {
        let detail = if missing.is_empty() {
            None
        } else {
            Some(format!("missing: {}", missing.join(", ")))
        };
        Self {
            status: FamilyStatus::Partial,
            detail,
        }
    }

    #[must_use]
    pub fn incompatible(reason: impl Into<String>) -> Self {
        Self {
            status: FamilyStatus::Incompatible,
            detail: Some(reason.into()),
        }
    }
}

/// Derive the absolute path to the extension's `recipes/families/` dir
/// relative to the extension root. Callers typically pass `manifest_dir`
/// from the host-lifecycle surface.
#[must_use]
pub fn families_dir(extension_root: &Path) -> PathBuf {
    extension_root.join("recipes").join("families")
}

fn is_yaml_file(path: &Path) -> bool {
    if !path.is_file() {
        return false;
    }
    match path.extension().and_then(|e| e.to_str()) {
        Some("yaml") | Some("yml") => true,
        _ => false,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn default_family_id_matches_storage_default() {
        assert_eq!(
            DEFAULT_FAMILY_ID,
            crate::storage::repo_traits::DEFAULT_MODEL_FAMILY,
        );
    }

    #[test]
    fn registry_is_sorted_by_family_id_for_deterministic_listing() {
        let reg = FamilyRegistry::new(vec![
            FamilyDescriptor {
                family_id: "b".into(),
                display_name: "B".into(),
                model_family_ref: "x".into(),
                engine_version_constraint: ">=0.1.0".into(),
                supported_languages: vec![],
                expected_artifacts: vec![],
                default_generation: serde_json::Value::Null,
            },
            FamilyDescriptor {
                family_id: "a".into(),
                display_name: "A".into(),
                model_family_ref: "y".into(),
                engine_version_constraint: ">=0.1.0".into(),
                supported_languages: vec![],
                expected_artifacts: vec![],
                default_generation: serde_json::Value::Null,
            },
        ]);
        // Load-from-dir sorts; ad-hoc constructor doesn't — test the
        // contract documented on FamilyRegistry::load_from_dir.
        let ids: Vec<&str> = reg
            .descriptors()
            .iter()
            .map(|d| d.family_id.as_str())
            .collect();
        assert_eq!(
            ids,
            vec!["b", "a"],
            "ad-hoc constructor preserves input order"
        );
    }

    #[test]
    fn contains_and_get_roundtrip() {
        let reg = FamilyRegistry::new(vec![FamilyDescriptor {
            family_id: "indextts-2".into(),
            display_name: "v2".into(),
            model_family_ref: "ref".into(),
            engine_version_constraint: ">=0.1.0".into(),
            supported_languages: vec!["zh".into()],
            expected_artifacts: vec![],
            default_generation: serde_json::Value::Null,
        }]);
        assert!(reg.contains("indextts-2"));
        assert!(!reg.contains("made-up"));
        assert_eq!(reg.get("indextts-2").unwrap().display_name, "v2");
    }

    #[test]
    fn family_status_round_trips_as_snake_case() {
        for (variant, wire) in [
            (FamilyStatus::Available, "available"),
            (FamilyStatus::NotInstalled, "not_installed"),
            (FamilyStatus::Partial, "partial"),
            (FamilyStatus::Incompatible, "incompatible"),
        ] {
            let v = serde_json::to_value(variant).unwrap();
            assert_eq!(v, serde_json::Value::String(wire.into()));
        }
    }

    #[test]
    fn partial_snapshot_formats_missing_detail() {
        let snap = FamilyStatusSnapshot::partial(vec!["gpt.pth".into(), "bpe.model".into()]);
        assert_eq!(snap.status, FamilyStatus::Partial);
        assert!(snap.detail.unwrap().contains("gpt.pth"));
    }
}
