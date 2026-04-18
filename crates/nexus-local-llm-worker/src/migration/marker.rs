use std::path::Path;

use serde::{Deserialize, Serialize};

use crate::errors::WorkerResult;

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Report {
    pub migrated_at: String,
    pub legacy_paths_scanned: Vec<String>,
    pub binaries_registered: Vec<String>,
    pub models_registered: Vec<String>,
}

pub fn is_marked(path: &Path) -> bool {
    path.is_file()
}

pub fn write(path: &Path, report: &Report) -> WorkerResult<()> {
    if let Some(parent) = path.parent() {
        std::fs::create_dir_all(parent)?;
    }
    let json = serde_json::to_vec_pretty(report)?;
    std::fs::write(path, json)?;
    Ok(())
}

pub fn read(path: &Path) -> WorkerResult<Option<Report>> {
    if !path.is_file() {
        return Ok(None);
    }
    let bytes = std::fs::read(path)?;
    let report = serde_json::from_slice(&bytes)?;
    Ok(Some(report))
}
