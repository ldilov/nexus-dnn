use std::path::Path;

use sha2::{Digest, Sha256};

use super::contribution::StorageContribution;
use super::sql_validator::{ExtractedObject, validate_sql};

#[derive(Debug, Clone)]
pub enum PlanAction {
    NewInstall,
    Upgrade,
    Noop,
}

impl PlanAction {
    pub fn as_str(&self) -> &'static str {
        match self {
            Self::NewInstall => "new_install",
            Self::Upgrade => "upgrade",
            Self::Noop => "noop",
        }
    }
}

#[derive(Debug, Clone)]
pub enum MigrationAction {
    Apply,
    Skip,
}

#[derive(Debug, Clone)]
pub struct PlannedMigration {
    pub migration_id: String,
    pub path: String,
    pub raw_checksum: String,
    pub expanded_sql: String,
    pub expanded_checksum: String,
    pub action: MigrationAction,
}

#[derive(Debug, Clone)]
pub struct ExpectedObject {
    pub object_name: String,
    pub object_type: String,
    pub created_by_migration_id: String,
}

#[derive(Debug, Clone)]
pub struct StoragePlan {
    pub extension_id: String,
    pub extension_version: String,
    pub namespace_alias: String,
    pub effective_prefix: String,
    pub action: PlanAction,
    pub migrations_to_apply: Vec<PlannedMigration>,
    pub expected_objects: Vec<ExpectedObject>,
}

#[derive(Debug, Clone)]
pub struct AppliedMigrationInfo {
    pub migration_id: String,
    pub raw_checksum_sha256: String,
}

pub fn sha256_hex(data: &[u8]) -> String {
    let mut hasher = Sha256::new();
    hasher.update(data);
    format!("{:x}", hasher.finalize())
}

pub fn build_plan(
    extension_id: &str,
    extension_version: &str,
    extension_root: &Path,
    storage: &StorageContribution,
    applied_migrations: &[AppliedMigrationInfo],
) -> Result<StoragePlan, Vec<String>> {
    build_plan_with_limits(
        extension_id,
        extension_version,
        extension_root,
        storage,
        applied_migrations,
        None,
        u64::MAX,
    )
}

pub fn build_plan_with_alias_check(
    extension_id: &str,
    extension_version: &str,
    extension_root: &Path,
    storage: &StorageContribution,
    applied_migrations: &[AppliedMigrationInfo],
    recorded_alias: Option<&str>,
) -> Result<StoragePlan, Vec<String>> {
    build_plan_with_limits(
        extension_id,
        extension_version,
        extension_root,
        storage,
        applied_migrations,
        recorded_alias,
        u64::MAX,
    )
}

pub fn build_plan_with_limits(
    extension_id: &str,
    extension_version: &str,
    extension_root: &Path,
    storage: &StorageContribution,
    applied_migrations: &[AppliedMigrationInfo],
    recorded_alias: Option<&str>,
    max_file_bytes: u64,
) -> Result<StoragePlan, Vec<String>> {
    let effective_prefix = storage.effective_prefix();
    let mut errors = Vec::new();
    let mut planned = Vec::new();
    let mut expected_objects = Vec::new();

    let is_upgrade = !applied_migrations.is_empty();

    if is_upgrade {
        if let Some(existing_alias) = recorded_alias
            && existing_alias != storage.namespace.alias
        {
            errors.push(format!(
                "namespace alias changed from '{}' to '{}' after initial install",
                existing_alias, storage.namespace.alias
            ));
            return Err(errors);
        }

        detect_migration_reorder(&storage.migrations.files, applied_migrations, &mut errors);
        if !errors.is_empty() {
            return Err(errors);
        }
    }

    for file_ref in &storage.migrations.files {
        let file_path = extension_root.join(&file_ref.path);
        let raw_sql = match std::fs::read_to_string(&file_path) {
            Ok(content) => content,
            Err(e) => {
                errors.push(format!(
                    "failed to read migration file {}: {e}",
                    file_path.display()
                ));
                continue;
            }
        };

        if raw_sql.trim().is_empty() {
            errors.push(format!("migration file '{}' is empty", file_path.display()));
            continue;
        }

        if raw_sql.len() as u64 > max_file_bytes {
            errors.push(format!(
                "migration file '{}' exceeds size limit ({} bytes > {} max)",
                file_path.display(),
                raw_sql.len(),
                max_file_bytes
            ));
            continue;
        }

        let raw_checksum = sha256_hex(raw_sql.as_bytes());
        let expanded_sql = super::sql_validator::expand_prefix(&raw_sql, &effective_prefix);
        let expanded_checksum = sha256_hex(expanded_sql.as_bytes());

        let already_applied = applied_migrations
            .iter()
            .find(|m| m.migration_id == file_ref.id);

        let action = match already_applied {
            Some(applied) => {
                if applied.raw_checksum_sha256 != raw_checksum {
                    errors.push(format!(
                        "checksum drift for migration '{}': recorded {} vs current {}",
                        file_ref.id, applied.raw_checksum_sha256, raw_checksum
                    ));
                }
                MigrationAction::Skip
            }
            None => {
                let report = validate_sql(&expanded_sql, &effective_prefix);
                if !report.errors.is_empty() {
                    errors.extend(
                        report
                            .errors
                            .iter()
                            .map(|e| format!("migration '{}': {e}", file_ref.id)),
                    );
                }
                for obj in &report.objects {
                    expected_objects.push(ExpectedObject {
                        object_name: obj.name.clone(),
                        object_type: extracted_object_type_str(obj),
                        created_by_migration_id: file_ref.id.clone(),
                    });
                }
                MigrationAction::Apply
            }
        };

        planned.push(PlannedMigration {
            migration_id: file_ref.id.clone(),
            path: file_ref.path.clone(),
            raw_checksum,
            expanded_sql,
            expanded_checksum,
            action,
        });
    }

    if !errors.is_empty() {
        return Err(errors);
    }

    let has_new = planned
        .iter()
        .any(|m| matches!(m.action, MigrationAction::Apply));

    let plan_action = if is_upgrade && has_new {
        PlanAction::Upgrade
    } else if is_upgrade {
        PlanAction::Noop
    } else {
        PlanAction::NewInstall
    };

    Ok(StoragePlan {
        extension_id: extension_id.to_owned(),
        extension_version: extension_version.to_owned(),
        namespace_alias: storage.namespace.alias.clone(),
        effective_prefix,
        action: plan_action,
        migrations_to_apply: planned,
        expected_objects,
    })
}

fn detect_migration_reorder(
    declared_files: &[super::contribution::MigrationFileRef],
    applied: &[AppliedMigrationInfo],
    errors: &mut Vec<String>,
) {
    let applied_ids: Vec<&str> = applied.iter().map(|m| m.migration_id.as_str()).collect();
    let declared_ids: Vec<&str> = declared_files.iter().map(|f| f.id.as_str()).collect();

    let mut declared_idx = 0;
    for applied_id in &applied_ids {
        loop {
            if declared_idx >= declared_ids.len() {
                errors.push(format!(
                    "previously applied migration '{}' no longer present in manifest",
                    applied_id
                ));
                return;
            }
            if declared_ids[declared_idx] == *applied_id {
                declared_idx += 1;
                break;
            }
            declared_idx += 1;
        }
    }
}

fn extracted_object_type_str(obj: &ExtractedObject) -> String {
    match obj.object_type {
        sqlparser::ast::ObjectType::Table => "table".to_owned(),
        sqlparser::ast::ObjectType::Index => "index".to_owned(),
        _ => "unknown".to_owned(),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::storage::contribution::{
        MigrationDeclaration, MigrationFileRef, NamespaceDeclaration, SqlProfileDeclaration,
    };
    use std::io::Write;

    fn make_storage(alias: &str, files: Vec<MigrationFileRef>) -> StorageContribution {
        StorageContribution {
            spec_version: "0.1".into(),
            engine: "sqlite".into(),
            namespace: NamespaceDeclaration {
                alias: alias.into(),
                prefix_mode: "host_derived".into(),
            },
            migrations: MigrationDeclaration {
                strategy: "sql_file_list".into(),
                files,
            },
            sql_profile: SqlProfileDeclaration {
                profile: "nexus_sqlite_v1".into(),
            },
            uninstall: None,
            runtime_access: None,
        }
    }

    fn write_migration(dir: &Path, rel_path: &str, content: &str) {
        let full = dir.join(rel_path);
        std::fs::create_dir_all(full.parent().unwrap()).unwrap();
        let mut f = std::fs::File::create(&full).unwrap();
        f.write_all(content.as_bytes()).unwrap();
    }

    #[test]
    fn new_install_plan_has_all_migrations() {
        let tmp = tempfile::tempdir().unwrap();
        let root = tmp.path();

        let sql = "CREATE TABLE ext_test_ns_items (id TEXT PRIMARY KEY);";
        write_migration(root, "storage/migrations/001_init.sql", sql);

        let storage = make_storage(
            "test_ns",
            vec![MigrationFileRef {
                id: "001_init".into(),
                path: "storage/migrations/001_init.sql".into(),
            }],
        );

        let plan = build_plan("test.ext", "1.0.0", root, &storage, &[]).unwrap();
        assert!(matches!(plan.action, PlanAction::NewInstall));
        assert_eq!(plan.migrations_to_apply.len(), 1);
        assert!(matches!(
            plan.migrations_to_apply[0].action,
            MigrationAction::Apply
        ));
        assert_eq!(plan.expected_objects.len(), 1);
        assert_eq!(plan.expected_objects[0].object_name, "ext_test_ns_items");
    }

    #[test]
    fn upgrade_plan_skips_applied() {
        let tmp = tempfile::tempdir().unwrap();
        let root = tmp.path();

        let sql1 = "CREATE TABLE ext_test_ns_items (id TEXT PRIMARY KEY);";
        let sql2 = "CREATE TABLE ext_test_ns_logs (id TEXT PRIMARY KEY);";
        write_migration(root, "storage/migrations/001_init.sql", sql1);
        write_migration(root, "storage/migrations/002_logs.sql", sql2);

        let storage = make_storage(
            "test_ns",
            vec![
                MigrationFileRef {
                    id: "001_init".into(),
                    path: "storage/migrations/001_init.sql".into(),
                },
                MigrationFileRef {
                    id: "002_logs".into(),
                    path: "storage/migrations/002_logs.sql".into(),
                },
            ],
        );

        let applied = vec![AppliedMigrationInfo {
            migration_id: "001_init".into(),
            raw_checksum_sha256: sha256_hex(sql1.as_bytes()),
        }];

        let plan = build_plan("test.ext", "2.0.0", root, &storage, &applied).unwrap();
        assert!(matches!(plan.action, PlanAction::Upgrade));
        assert!(matches!(
            plan.migrations_to_apply[0].action,
            MigrationAction::Skip
        ));
        assert!(matches!(
            plan.migrations_to_apply[1].action,
            MigrationAction::Apply
        ));
    }

    #[test]
    fn checksum_drift_detected() {
        let tmp = tempfile::tempdir().unwrap();
        let root = tmp.path();

        let sql = "CREATE TABLE ext_test_ns_items (id TEXT PRIMARY KEY);";
        write_migration(root, "storage/migrations/001_init.sql", sql);

        let storage = make_storage(
            "test_ns",
            vec![MigrationFileRef {
                id: "001_init".into(),
                path: "storage/migrations/001_init.sql".into(),
            }],
        );

        let applied = vec![AppliedMigrationInfo {
            migration_id: "001_init".into(),
            raw_checksum_sha256: "different_checksum".into(),
        }];

        let result = build_plan("test.ext", "2.0.0", root, &storage, &applied);
        assert!(result.is_err());
        let errors = result.unwrap_err();
        assert!(errors.iter().any(|e| e.contains("checksum drift")));
    }

    #[test]
    fn noop_when_all_applied() {
        let tmp = tempfile::tempdir().unwrap();
        let root = tmp.path();

        let sql = "CREATE TABLE ext_test_ns_items (id TEXT PRIMARY KEY);";
        write_migration(root, "storage/migrations/001_init.sql", sql);

        let storage = make_storage(
            "test_ns",
            vec![MigrationFileRef {
                id: "001_init".into(),
                path: "storage/migrations/001_init.sql".into(),
            }],
        );

        let applied = vec![AppliedMigrationInfo {
            migration_id: "001_init".into(),
            raw_checksum_sha256: sha256_hex(sql.as_bytes()),
        }];

        let plan = build_plan("test.ext", "1.0.0", root, &storage, &applied).unwrap();
        assert!(matches!(plan.action, PlanAction::Noop));
    }

    #[test]
    fn sha256_hex_produces_consistent_output() {
        let hash = sha256_hex(b"hello");
        assert_eq!(hash.len(), 64);
        assert_eq!(sha256_hex(b"hello"), hash);
        assert_ne!(sha256_hex(b"world"), hash);
    }

    #[test]
    fn upgrade_v1_to_v2_only_applies_new_migration() {
        let tmp = tempfile::tempdir().unwrap();
        let root = tmp.path();

        let sql1 = "CREATE TABLE ext_test_ns_items (id TEXT PRIMARY KEY);";
        let sql2 = "CREATE TABLE ext_test_ns_logs (id TEXT PRIMARY KEY);";
        let sql3 = "CREATE TABLE ext_test_ns_events (id TEXT PRIMARY KEY);";
        write_migration(root, "storage/migrations/001_init.sql", sql1);
        write_migration(root, "storage/migrations/002_logs.sql", sql2);
        write_migration(root, "storage/migrations/003_events.sql", sql3);

        let storage = make_storage(
            "test_ns",
            vec![
                MigrationFileRef {
                    id: "001_init".into(),
                    path: "storage/migrations/001_init.sql".into(),
                },
                MigrationFileRef {
                    id: "002_logs".into(),
                    path: "storage/migrations/002_logs.sql".into(),
                },
                MigrationFileRef {
                    id: "003_events".into(),
                    path: "storage/migrations/003_events.sql".into(),
                },
            ],
        );

        let applied = vec![
            AppliedMigrationInfo {
                migration_id: "001_init".into(),
                raw_checksum_sha256: sha256_hex(sql1.as_bytes()),
            },
            AppliedMigrationInfo {
                migration_id: "002_logs".into(),
                raw_checksum_sha256: sha256_hex(sql2.as_bytes()),
            },
        ];

        let plan = build_plan("test.ext", "2.0.0", root, &storage, &applied).unwrap();
        assert!(matches!(plan.action, PlanAction::Upgrade));
        assert!(matches!(
            plan.migrations_to_apply[0].action,
            MigrationAction::Skip
        ));
        assert!(matches!(
            plan.migrations_to_apply[1].action,
            MigrationAction::Skip
        ));
        assert!(matches!(
            plan.migrations_to_apply[2].action,
            MigrationAction::Apply
        ));
        assert_eq!(plan.expected_objects.len(), 1);
        assert_eq!(plan.expected_objects[0].object_name, "ext_test_ns_events");
    }

    #[test]
    fn reordered_migration_ids_rejected() {
        let tmp = tempfile::tempdir().unwrap();
        let root = tmp.path();

        let sql1 = "CREATE TABLE ext_test_ns_items (id TEXT PRIMARY KEY);";
        let sql2 = "CREATE TABLE ext_test_ns_logs (id TEXT PRIMARY KEY);";
        write_migration(root, "storage/migrations/001_init.sql", sql1);
        write_migration(root, "storage/migrations/002_logs.sql", sql2);

        let storage = make_storage(
            "test_ns",
            vec![
                MigrationFileRef {
                    id: "002_logs".into(),
                    path: "storage/migrations/002_logs.sql".into(),
                },
                MigrationFileRef {
                    id: "001_init".into(),
                    path: "storage/migrations/001_init.sql".into(),
                },
            ],
        );

        let applied = vec![
            AppliedMigrationInfo {
                migration_id: "001_init".into(),
                raw_checksum_sha256: sha256_hex(sql1.as_bytes()),
            },
            AppliedMigrationInfo {
                migration_id: "002_logs".into(),
                raw_checksum_sha256: sha256_hex(sql2.as_bytes()),
            },
        ];

        let result = build_plan("test.ext", "2.0.0", root, &storage, &applied);
        assert!(result.is_err());
        let errors = result.unwrap_err();
        assert!(errors.iter().any(|e| e.contains("no longer present")));
    }

    #[test]
    fn alias_change_after_install_rejected() {
        let tmp = tempfile::tempdir().unwrap();
        let root = tmp.path();

        let sql1 = "CREATE TABLE ext_new_ns_items (id TEXT PRIMARY KEY);";
        write_migration(root, "storage/migrations/001_init.sql", sql1);

        let storage = make_storage(
            "new_ns",
            vec![MigrationFileRef {
                id: "001_init".into(),
                path: "storage/migrations/001_init.sql".into(),
            }],
        );

        let applied = vec![AppliedMigrationInfo {
            migration_id: "001_init".into(),
            raw_checksum_sha256: sha256_hex(sql1.as_bytes()),
        }];

        let result = build_plan_with_alias_check(
            "test.ext",
            "2.0.0",
            root,
            &storage,
            &applied,
            Some("old_ns"),
        );
        assert!(result.is_err());
        let errors = result.unwrap_err();
        assert!(errors.iter().any(|e| e.contains("alias changed")));
    }

    #[test]
    fn empty_migration_file_rejected() {
        let tmp = tempfile::tempdir().unwrap();
        let root = tmp.path();

        write_migration(root, "storage/migrations/001_init.sql", "   \n  ");

        let storage = make_storage(
            "test_ns",
            vec![MigrationFileRef {
                id: "001_init".into(),
                path: "storage/migrations/001_init.sql".into(),
            }],
        );

        let result =
            build_plan_with_limits("test.ext", "1.0.0", root, &storage, &[], None, u64::MAX);
        assert!(result.is_err());
        let errors = result.unwrap_err();
        assert!(errors.iter().any(|e| e.contains("is empty")));
    }

    #[test]
    fn oversized_migration_file_rejected() {
        let tmp = tempfile::tempdir().unwrap();
        let root = tmp.path();

        let sql = "CREATE TABLE ext_test_ns_items (id TEXT PRIMARY KEY);";
        write_migration(root, "storage/migrations/001_init.sql", sql);

        let storage = make_storage(
            "test_ns",
            vec![MigrationFileRef {
                id: "001_init".into(),
                path: "storage/migrations/001_init.sql".into(),
            }],
        );

        let result = build_plan_with_limits("test.ext", "1.0.0", root, &storage, &[], None, 10);
        assert!(result.is_err());
        let errors = result.unwrap_err();
        assert!(errors.iter().any(|e| e.contains("exceeds size limit")));
    }
}
