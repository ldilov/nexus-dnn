//! StorageManager `uninstall_archive` methods extracted per spec 014.

use std::path::PathBuf;

use crate::database::Database;
use crate::error::StorageError;
use crate::records::{ArchiveRecord, ObjectRecord};

use super::super::{StorageManager, UninstallReport, chrono_now, sha256_bytes};

impl StorageManager {
    pub(super) async fn uninstall_archive_then_drop(
        &self,
        namespace_id: &str,
    ) -> Result<UninstallReport, StorageError> {
        use std::io::Write;
        use zip::write::SimpleFileOptions;

        let objects = self.db.list_objects_for_namespace(namespace_id).await?;
        let tables: Vec<&ObjectRecord> = objects
            .iter()
            .filter(|o| o.object_type == "table" && o.status == "present")
            .collect();

        let archive_dir = self
            .data_dir
            .clone()
            .unwrap_or_else(|| PathBuf::from("."))
            .join("archives");

        std::fs::create_dir_all(&archive_dir).map_err(|e| StorageError::ArchiveFailed {
            detail: format!("failed to create archive directory: {e}"),
        })?;

        let timestamp = chrono::Utc::now().format("%Y%m%d%H%M%S");
        let zip_filename = format!("ext_{namespace_id}_{timestamp}.zip");
        let zip_path = archive_dir.join(&zip_filename);

        let zip_file =
            std::fs::File::create(&zip_path).map_err(|e| StorageError::ArchiveFailed {
                detail: format!("failed to create archive ZIP: {e}"),
            })?;

        let mut zip_writer = zip::ZipWriter::new(zip_file);
        let options =
            SimpleFileOptions::default().compression_method(zip::CompressionMethod::Deflated);

        let pool = self.db.pool();
        let table_count = tables.len() as i64;
        let mut total_row_count: i64 = 0;

        for tbl in &tables {
            let col_rows: Vec<(String,)> = sqlx::query_as(&format!(
                "SELECT name FROM pragma_table_info('{}')",
                tbl.object_name
            ))
            .fetch_all(pool)
            .await
            .map_err(|e| StorageError::ArchiveFailed {
                detail: format!("failed to enumerate columns for {}: {e}", tbl.object_name),
            })?;

            let col_args: String = col_rows
                .iter()
                .map(|(c,)| format!("'{c}', {c}"))
                .collect::<Vec<_>>()
                .join(", ");

            let rows: Vec<(String,)> = sqlx::query_as(&format!(
                "SELECT json_object({col_args}) FROM {}",
                tbl.object_name
            ))
            .fetch_all(pool)
            .await
            .map_err(|e| StorageError::ArchiveFailed {
                detail: format!("failed to read rows for {}: {e}", tbl.object_name),
            })?;

            let entry_name = format!("{}.jsonl", tbl.object_name);
            zip_writer.start_file(&entry_name, options).map_err(|e| {
                StorageError::ArchiveFailed {
                    detail: format!("failed to start ZIP entry for {}: {e}", tbl.object_name),
                }
            })?;

            for (row,) in &rows {
                writeln!(zip_writer, "{row}").map_err(|e| StorageError::ArchiveFailed {
                    detail: format!("failed to write JSONL row for {}: {e}", tbl.object_name),
                })?;
            }

            total_row_count += rows.len() as i64;
        }

        zip_writer
            .finish()
            .map_err(|e| StorageError::ArchiveFailed {
                detail: format!("failed to finalize ZIP archive: {e}"),
            })?;

        let zip_bytes = std::fs::read(&zip_path).map_err(|e| StorageError::ArchiveFailed {
            detail: format!("failed to read ZIP for hashing: {e}"),
        })?;
        let content_hash = sha256_bytes(&zip_bytes);

        let archive_record = ArchiveRecord {
            id: format!("archive-{namespace_id}"),
            namespace_id: namespace_id.to_owned(),
            archive_format: "jsonl_zip".to_owned(),
            archive_path: zip_path.to_string_lossy().to_string(),
            content_hash,
            table_count,
            row_count: total_row_count,
            created_at: chrono_now(),
        };
        self.db.insert_archive(&archive_record).await?;

        let archive_path_str = zip_path.to_string_lossy().to_string();
        let drop_report = self.uninstall_drop(namespace_id).await?;

        Ok(UninstallReport {
            namespace_id: namespace_id.to_owned(),
            policy_executed: "archive_then_drop".to_owned(),
            objects_dropped: drop_report.objects_dropped,
            archive_path: Some(archive_path_str),
        })
    }
}
