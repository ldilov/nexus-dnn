use serde::{Deserialize, Serialize};

use crate::search::RepoFile;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RepoMetadata {
    pub repo_id: String,
    pub revision: String,
    pub author: Option<String>,
    pub license: Option<String>,
    pub pipeline_tag: Option<String>,
    pub library_name: Option<String>,
    #[serde(default)]
    pub tags: Vec<String>,
    #[serde(default)]
    pub siblings: Vec<RepoFile>,
    pub config: Option<serde_json::Value>,
    pub downloads: Option<u64>,
    pub last_modified: Option<String>,
}

impl RepoMetadata {
    pub fn file_paths(&self) -> impl Iterator<Item = &str> {
        self.siblings.iter().map(|f| f.path.as_str())
    }

    pub fn has_file_matching(&self, predicate: impl Fn(&str) -> bool) -> bool {
        self.file_paths().any(predicate)
    }

    pub fn architectures(&self) -> Vec<String> {
        self.config
            .as_ref()
            .and_then(|v| v.get("architectures"))
            .and_then(|v| v.as_array())
            .map(|arr| {
                arr.iter()
                    .filter_map(|v| v.as_str().map(str::to_owned))
                    .collect()
            })
            .unwrap_or_default()
    }
}
