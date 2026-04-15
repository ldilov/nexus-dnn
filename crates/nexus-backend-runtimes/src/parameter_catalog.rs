//! Versioned launch-parameter catalog per runtime family.
//!
//! The catalog is advisory, not an allow-list. Flags absent from the catalog
//! pass through unless they collide with host-owned policy. The catalog's
//! purpose is UI hints, help copy, and fast classification.

use std::collections::HashMap;
use std::sync::Arc;
use std::sync::OnceLock;

use rust_embed::RustEmbed;
use serde::{Deserialize, Serialize};

use crate::error::{BackendRuntimeError, BackendRuntimeResult};

#[derive(RustEmbed)]
#[folder = "src/assets/"]
struct CatalogAssets;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "kebab-case")]
pub enum ParameterPolicy {
    ManagedSpawnDisallowed,
    HostInjected,
    HostGoverned,
    ExtensionPassthrough,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ParameterCatalogEntry {
    pub section: String,
    pub flags: Vec<String>,
    #[serde(default)]
    pub display: Option<String>,
    pub policy: ParameterPolicy,
    pub summary: String,
    #[serde(default)]
    pub default: Option<String>,
    #[serde(default)]
    pub allowed_values: Option<String>,
    #[serde(default)]
    pub env_vars: Vec<String>,
    #[serde(default)]
    pub notes: Vec<String>,
    #[serde(default)]
    pub security_gated: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct SectionCounts {
    #[serde(flatten)]
    pub by_section: HashMap<String, u32>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ParameterCatalog {
    #[serde(default)]
    pub family: String,
    pub snapshot_date: String,
    pub upstream_source: String,
    #[serde(default)]
    pub section_counts: SectionCounts,
    pub total_entries: u32,
    pub entries: Vec<ParameterCatalogEntry>,
    #[serde(skip)]
    by_flag: HashMap<String, usize>,
    #[serde(skip)]
    by_env: HashMap<String, usize>,
}

impl ParameterCatalog {
    pub fn lookup_flag(&self, flag: &str) -> Option<&ParameterCatalogEntry> {
        self.by_flag.get(flag).map(|&i| &self.entries[i])
    }

    pub fn lookup_env(&self, env_name: &str) -> Option<&ParameterCatalogEntry> {
        self.by_env.get(env_name).map(|&i| &self.entries[i])
    }

    fn rebuild_indices(&mut self) {
        self.by_flag.clear();
        self.by_env.clear();
        for (idx, entry) in self.entries.iter().enumerate() {
            for f in &entry.flags {
                self.by_flag.insert(f.clone(), idx);
            }
            for e in &entry.env_vars {
                self.by_env.insert(e.clone(), idx);
            }
        }
    }
}

fn parse_embedded(name: &str, family: &str) -> BackendRuntimeResult<ParameterCatalog> {
    let asset = CatalogAssets::get(name).ok_or_else(|| {
        BackendRuntimeError::Internal(format!("embedded catalog asset '{name}' missing"))
    })?;
    let body = std::str::from_utf8(asset.data.as_ref()).map_err(|e| {
        BackendRuntimeError::Internal(format!("catalog asset '{name}' is not utf-8: {e}"))
    })?;
    let mut catalog: ParameterCatalog = serde_json::from_str(body).map_err(|e| {
        BackendRuntimeError::Internal(format!("catalog asset '{name}' parse error: {e}"))
    })?;
    if catalog.family.is_empty() {
        catalog.family = family.into();
    }
    catalog.rebuild_indices();
    Ok(catalog)
}

static LLAMACPP_CATALOG: OnceLock<Arc<ParameterCatalog>> = OnceLock::new();

pub fn llamacpp_catalog() -> BackendRuntimeResult<Arc<ParameterCatalog>> {
    if let Some(cached) = LLAMACPP_CATALOG.get() {
        return Ok(cached.clone());
    }
    let loaded = parse_embedded("llamacpp_parameter_catalog.json", "llama.cpp")?;
    let arc = Arc::new(loaded);
    let _ = LLAMACPP_CATALOG.set(arc.clone());
    Ok(LLAMACPP_CATALOG.get().cloned().unwrap_or(arc))
}

pub fn catalog_for(family: &str) -> BackendRuntimeResult<Arc<ParameterCatalog>> {
    match family {
        "llama.cpp" => llamacpp_catalog(),
        other => Err(BackendRuntimeError::FamilyUnknown(other.into())),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn llamacpp_catalog_loads() {
        let catalog = llamacpp_catalog().expect("catalog loads");
        assert_eq!(catalog.family, "llama.cpp");
        assert_eq!(catalog.total_entries, 213);
    }

    #[test]
    fn host_injected_flags_classified() {
        let catalog = llamacpp_catalog().expect("catalog loads");
        let port = catalog.lookup_flag("--port").expect("port present");
        assert_eq!(port.policy, ParameterPolicy::HostInjected);
        let host = catalog.lookup_flag("--host").expect("host present");
        assert_eq!(host.policy, ParameterPolicy::HostInjected);
    }

    #[test]
    fn extension_passthrough_flags_classified() {
        let catalog = llamacpp_catalog().expect("catalog loads");
        let ctx = catalog.lookup_flag("--ctx-size").expect("ctx-size present");
        assert_eq!(ctx.policy, ParameterPolicy::ExtensionPassthrough);
    }

    #[test]
    fn managed_spawn_disallowed_flags_classified() {
        let catalog = llamacpp_catalog().expect("catalog loads");
        let help = catalog.lookup_flag("--help").expect("help present");
        assert_eq!(help.policy, ParameterPolicy::ManagedSpawnDisallowed);
    }

    #[test]
    fn unknown_flag_absent_from_catalog() {
        let catalog = llamacpp_catalog().expect("catalog loads");
        assert!(catalog.lookup_flag("--novel-future-flag").is_none());
    }

    #[test]
    fn snapshot_date_parses() {
        let catalog = llamacpp_catalog().expect("catalog loads");
        assert!(chrono::NaiveDate::parse_from_str(&catalog.snapshot_date, "%Y-%m-%d").is_ok());
    }
}
