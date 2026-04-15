//! Legacy binary directory relocation extracted per spec 015 US4.

use sqlx::SqlitePool;

use super::{list_all, storage};
use crate::error::BackendRuntimeResult;

pub async fn relocate_legacy_binaries(
    pool: &SqlitePool,
    legacy_root: &std::path::Path,
    host_runtimes_root: &std::path::Path,
) -> BackendRuntimeResult<u64> {
    let rows = list_all(pool).await?;
    let mut relocated: u64 = 0;
    for row in rows {
        let src = std::path::Path::new(&row.install_root);
        if !src.starts_with(legacy_root) {
            continue;
        }
        let dest = host_runtimes_root.join(&row.family).join(&row.version);
        if dest.exists() {
            continue;
        }
        if let Some(parent) = dest.parent()
            && let Err(e) = std::fs::create_dir_all(parent)
        {
            tracing::warn!(
                install_id = %row.install_id,
                error = %e,
                "relocate: failed to create destination parent",
            );
            continue;
        }
        if !src.exists() {
            tracing::warn!(
                install_id = %row.install_id,
                src = %src.display(),
                "relocate: source directory missing — skipping (row left for repair)",
            );
            continue;
        }
        if let Err(e) = std::fs::rename(src, &dest) {
            tracing::warn!(
                install_id = %row.install_id,
                src = %src.display(),
                dest = %dest.display(),
                error = %e,
                "relocate: rename failed — skipping",
            );
            continue;
        }
        let new_root = dest.to_string_lossy().into_owned();
        let new_binary_paths =
            rewrite_binary_paths(&row.binary_paths, &row.install_root, &new_root);
        sqlx::query(
            "UPDATE host_runtime_installs \
             SET install_root = $1, binary_paths = $2, updated_at = datetime('now') \
             WHERE install_id = $3",
        )
        .bind(&new_root)
        .bind(&new_binary_paths)
        .bind(&row.install_id)
        .execute(pool)
        .await
        .map_err(storage)?;
        relocated += 1;
    }
    Ok(relocated)
}

pub(super) fn rewrite_binary_paths(json_str: &str, old_prefix: &str, new_prefix: &str) -> String {
    match serde_json::from_str::<Vec<String>>(json_str) {
        Ok(paths) => {
            let updated: Vec<String> = paths
                .into_iter()
                .map(|p| {
                    if let Some(rest) = p.strip_prefix(old_prefix) {
                        format!("{new_prefix}{rest}")
                    } else {
                        p
                    }
                })
                .collect();
            serde_json::to_string(&updated).unwrap_or_else(|_| json_str.to_owned())
        }
        Err(_) => json_str.to_owned(),
    }
}
