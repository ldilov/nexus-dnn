use std::path::{Path, PathBuf};

use crate::error::InstallError;

pub fn find_binary(install_root: &Path, binary_name: &str) -> Result<PathBuf, InstallError> {
    walk(install_root, binary_name)?.ok_or_else(|| {
        InstallError::BinaryMissing(format!(
            "{binary_name} not found under {}",
            install_root.display()
        ))
    })
}

fn walk(root: &Path, name: &str) -> Result<Option<PathBuf>, InstallError> {
    let mut stack = vec![root.to_path_buf()];
    while let Some(dir) = stack.pop() {
        let entries = match std::fs::read_dir(&dir) {
            Ok(e) => e,
            Err(err) if err.kind() == std::io::ErrorKind::NotFound => continue,
            Err(err) => return Err(err.into()),
        };
        for entry in entries {
            let entry = entry?;
            let path = entry.path();
            let file_type = entry.file_type()?;
            if file_type.is_dir() {
                stack.push(path);
            } else if file_type.is_file() {
                if let Some(file_name) = path.file_name().and_then(|s| s.to_str()) {
                    if file_name.eq_ignore_ascii_case(name) {
                        return Ok(Some(path));
                    }
                }
            }
        }
    }
    Ok(None)
}

pub fn server_binary_name() -> &'static str {
    if cfg!(target_os = "windows") {
        "llama-server.exe"
    } else {
        "llama-server"
    }
}
