use std::path::{Path, PathBuf};

use tracing::debug;

#[derive(Clone, Debug)]
pub struct LegacyBinary {
    pub path: PathBuf,
    pub variant_hint: String,
}

#[derive(Clone, Debug)]
pub struct LegacyModel {
    pub path: PathBuf,
}

pub fn discover_legacy_binaries(root: &Path) -> std::io::Result<Vec<LegacyBinary>> {
    let llamacpp_dir = root.join("llamacpp");
    if !llamacpp_dir.is_dir() {
        return Ok(Vec::new());
    }

    let mut results = Vec::new();
    for variant_entry in std::fs::read_dir(&llamacpp_dir)? {
        let variant_entry = match variant_entry {
            Ok(e) => e,
            Err(_) => continue,
        };
        let variant_path = variant_entry.path();
        if !variant_path.is_dir() {
            continue;
        }
        let variant_name = match variant_path.file_name().and_then(|n| n.to_str()) {
            Some(n) => n.to_string(),
            None => continue,
        };

        let builds = match std::fs::read_dir(&variant_path) {
            Ok(i) => i,
            Err(_) => continue,
        };
        for build_entry in builds {
            let build_entry = match build_entry {
                Ok(e) => e,
                Err(_) => continue,
            };
            let build_path = build_entry.path();
            let candidate_exe = build_path.join("bin").join("llama-server.exe");
            let candidate_elf = build_path.join("bin").join("llama-server");
            let binary = if candidate_exe.is_file() {
                Some(candidate_exe)
            } else if candidate_elf.is_file() {
                Some(candidate_elf)
            } else {
                None
            };
            if let Some(bin) = binary {
                debug!(path = %bin.display(), "migration: found legacy binary");
                results.push(LegacyBinary {
                    path: bin,
                    variant_hint: variant_name.clone(),
                });
            }
        }
    }
    Ok(results)
}

pub fn discover_legacy_models(root: &Path) -> std::io::Result<Vec<LegacyModel>> {
    let models_dir = root.join("models");
    if !models_dir.is_dir() {
        return Ok(Vec::new());
    }
    let mut results = Vec::new();
    walk_for_extension(&models_dir, "gguf", &mut results)?;
    Ok(results
        .into_iter()
        .map(|path| LegacyModel { path })
        .collect())
}

fn walk_for_extension(dir: &Path, ext: &str, out: &mut Vec<PathBuf>) -> std::io::Result<()> {
    let read = match std::fs::read_dir(dir) {
        Ok(i) => i,
        Err(_) => return Ok(()),
    };
    for entry in read {
        let entry = match entry {
            Ok(e) => e,
            Err(_) => continue,
        };
        let path = entry.path();
        if path.is_dir() {
            walk_for_extension(&path, ext, out)?;
        } else if path.extension().and_then(|e| e.to_str()) == Some(ext) {
            out.push(path);
        }
    }
    Ok(())
}
