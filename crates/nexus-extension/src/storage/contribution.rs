use super::limits::StorageLimits;
use serde::{Deserialize, Serialize};

const ALIAS_PATTERN: &str = r"^[a-z][a-z0-9_]{2,48}$";
const MIGRATION_ID_PATTERN: &str = r"^[0-9]{3}_[a-z0-9_]{2,64}$";
const RESERVED_ALIASES: &[&str] = &["sqlite", "host", "nexus", "core"];

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct StorageContribution {
    pub spec_version: String,
    pub engine: String,
    pub namespace: NamespaceDeclaration,
    pub migrations: MigrationDeclaration,
    pub sql_profile: SqlProfileDeclaration,
    pub uninstall: Option<UninstallDeclaration>,
    pub runtime_access: Option<RuntimeAccessDeclaration>,
}

impl StorageContribution {
    pub fn effective_prefix(&self) -> String {
        format!("ext_{}_", self.namespace.alias)
    }

    pub fn validate(&self) -> Result<(), Vec<String>> {
        let mut errors = Vec::new();

        validate_alias(&self.namespace.alias, &mut errors);
        validate_migration_ids(&self.migrations.files, &mut errors);
        validate_migration_paths(&self.migrations.files, &mut errors);

        if errors.is_empty() {
            Ok(())
        } else {
            Err(errors)
        }
    }

    pub fn validate_with_limits(&self, limits: &StorageLimits) -> Result<(), Vec<String>> {
        let mut errors = self.validate().err().unwrap_or_default();

        if self.migrations.files.is_empty() {
            errors.push("at least one migration file is required".into());
        }

        validate_migration_count(
            &self.migrations.files,
            limits.max_migrations_per_extension,
            &mut errors,
        );
        validate_sql_extension(&self.migrations.files, &mut errors);
        validate_migration_order(&self.migrations.files, &mut errors);
        validate_reserved_alias(&self.namespace.alias, &mut errors);

        if errors.is_empty() {
            Ok(())
        } else {
            Err(errors)
        }
    }
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct NamespaceDeclaration {
    pub alias: String,
    pub prefix_mode: String,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct MigrationDeclaration {
    pub strategy: String,
    pub files: Vec<MigrationFileRef>,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct MigrationFileRef {
    pub id: String,
    pub path: String,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct SqlProfileDeclaration {
    pub profile: String,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct UninstallDeclaration {
    pub policy: Option<String>,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct RuntimeAccessDeclaration {
    pub mode: Option<String>,
}

fn validate_alias(alias: &str, errors: &mut Vec<String>) {
    let re = regex_lite::Regex::new(ALIAS_PATTERN).expect("invalid alias regex");
    if !re.is_match(alias) {
        errors.push(format!(
            "namespace alias '{alias}' does not match pattern {ALIAS_PATTERN}"
        ));
    }
}

fn validate_migration_ids(files: &[MigrationFileRef], errors: &mut Vec<String>) {
    let re = regex_lite::Regex::new(MIGRATION_ID_PATTERN).expect("invalid migration id regex");

    let mut seen = std::collections::HashSet::new();
    for file_ref in files {
        if !re.is_match(&file_ref.id) {
            errors.push(format!(
                "migration id '{}' does not match pattern {MIGRATION_ID_PATTERN}",
                file_ref.id
            ));
        }
        if !seen.insert(&file_ref.id) {
            errors.push(format!("duplicate migration id '{}'", file_ref.id));
        }
    }
}

fn validate_migration_paths(files: &[MigrationFileRef], errors: &mut Vec<String>) {
    for file_ref in files {
        if file_ref.path.contains("..") {
            errors.push(format!(
                "migration path '{}' contains path traversal",
                file_ref.path
            ));
        }
    }
}

fn validate_sql_extension(files: &[MigrationFileRef], errors: &mut Vec<String>) {
    for file_ref in files {
        if !file_ref.path.ends_with(".sql") {
            errors.push(format!(
                "migration path '{}' does not end with .sql extension",
                file_ref.path
            ));
        }
    }
}

fn validate_migration_order(files: &[MigrationFileRef], errors: &mut Vec<String>) {
    for window in files.windows(2) {
        if window[0].id >= window[1].id {
            errors.push(format!(
                "migration id '{}' is not in ascending order before '{}'",
                window[0].id, window[1].id
            ));
        }
    }
}

fn validate_reserved_alias(alias: &str, errors: &mut Vec<String>) {
    if RESERVED_ALIASES.contains(&alias) {
        errors.push(format!(
            "alias '{alias}' is reserved and produces a protected prefix"
        ));
    }
}

fn validate_migration_count(files: &[MigrationFileRef], max: usize, errors: &mut Vec<String>) {
    if files.len() > max {
        errors.push(format!(
            "migration count {} exceeds maximum of {max}",
            files.len()
        ));
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn valid_storage() -> StorageContribution {
        StorageContribution {
            spec_version: "0.1".into(),
            engine: "sqlite".into(),
            namespace: NamespaceDeclaration {
                alias: "chat_llama".into(),
                prefix_mode: "host_derived".into(),
            },
            migrations: MigrationDeclaration {
                strategy: "sql_file_list".into(),
                files: vec![
                    MigrationFileRef {
                        id: "001_init".into(),
                        path: "storage/migrations/001_init.sql".into(),
                    },
                    MigrationFileRef {
                        id: "002_indexes".into(),
                        path: "storage/migrations/002_indexes.sql".into(),
                    },
                ],
            },
            sql_profile: SqlProfileDeclaration {
                profile: "nexus_sqlite_v1".into(),
            },
            uninstall: Some(UninstallDeclaration {
                policy: Some("retain".into()),
            }),
            runtime_access: Some(RuntimeAccessDeclaration {
                mode: Some("host_api_only".into()),
            }),
        }
    }

    #[test]
    fn valid_storage_block_parses() {
        let yaml = r#"
spec_version: "0.1"
engine: sqlite
namespace:
  alias: chat_llama
  prefix_mode: host_derived
migrations:
  strategy: sql_file_list
  files:
    - id: "001_init"
      path: storage/migrations/001_init.sql
    - id: "002_indexes"
      path: storage/migrations/002_indexes.sql
sql_profile:
  profile: nexus_sqlite_v1
uninstall:
  policy: retain
runtime_access:
  mode: host_api_only
"#;
        let contribution: StorageContribution = serde_saphyr::from_str(yaml).unwrap();
        assert_eq!(contribution.spec_version, "0.1");
        assert_eq!(contribution.namespace.alias, "chat_llama");
        assert_eq!(contribution.migrations.files.len(), 2);
        assert!(contribution.validate().is_ok());
    }

    #[test]
    fn effective_prefix_computed() {
        let s = valid_storage();
        assert_eq!(s.effective_prefix(), "ext_chat_llama_");
    }

    #[test]
    fn invalid_alias_fails() {
        let mut s = valid_storage();
        s.namespace.alias = "AB_Invalid".into();
        let err = s.validate().unwrap_err();
        assert!(err.iter().any(|e| e.contains("namespace alias")));
    }

    #[test]
    fn alias_too_short_fails() {
        let mut s = valid_storage();
        s.namespace.alias = "ab".into();
        let err = s.validate().unwrap_err();
        assert!(err.iter().any(|e| e.contains("namespace alias")));
    }

    #[test]
    fn alias_starts_with_digit_fails() {
        let mut s = valid_storage();
        s.namespace.alias = "1abc".into();
        let err = s.validate().unwrap_err();
        assert!(err.iter().any(|e| e.contains("namespace alias")));
    }

    #[test]
    fn invalid_migration_id_fails() {
        let mut s = valid_storage();
        s.migrations.files[0].id = "bad-id!".into();
        let err = s.validate().unwrap_err();
        assert!(err.iter().any(|e| e.contains("migration id")));
    }

    #[test]
    fn duplicate_migration_ids_fail() {
        let mut s = valid_storage();
        s.migrations.files[1].id = "001_init".into();
        let err = s.validate().unwrap_err();
        assert!(err.iter().any(|e| e.contains("duplicate migration id")));
    }

    #[test]
    fn path_traversal_rejected() {
        let mut s = valid_storage();
        s.migrations.files[0].path = "../../../etc/passwd".into();
        let err = s.validate().unwrap_err();
        assert!(err.iter().any(|e| e.contains("path traversal")));
    }

    #[test]
    fn valid_alias_boundary_lengths() {
        let mut s = valid_storage();

        s.namespace.alias = "abc".into();
        assert!(s.validate().is_ok());

        s.namespace.alias = "a".repeat(49);
        assert!(s.validate().is_ok());

        s.namespace.alias = "a".repeat(50);
        let err = s.validate().unwrap_err();
        assert!(err.iter().any(|e| e.contains("namespace alias")));
    }

    #[test]
    fn optional_fields_deserialize_as_none() {
        let yaml = r#"
spec_version: "0.1"
engine: sqlite
namespace:
  alias: test_ext
  prefix_mode: host_derived
migrations:
  strategy: sql_file_list
  files:
    - id: "001_init"
      path: storage/migrations/001_init.sql
sql_profile:
  profile: nexus_sqlite_v1
"#;
        let contribution: StorageContribution = serde_saphyr::from_str(yaml).unwrap();
        assert!(contribution.uninstall.is_none());
        assert!(contribution.runtime_access.is_none());
        assert!(contribution.validate().is_ok());
    }

    #[test]
    fn empty_files_rejected() {
        let mut s = valid_storage();
        s.migrations.files = vec![];
        let limits = StorageLimits::default();
        let err = s.validate_with_limits(&limits).unwrap_err();
        assert!(err.iter().any(|e| e.contains("at least one migration")));
    }

    #[test]
    fn migration_count_exceeds_limit() {
        let mut s = valid_storage();
        s.migrations.files = (0..65)
            .map(|i| MigrationFileRef {
                id: format!("{i:03}_m"),
                path: format!("storage/migrations/{i:03}_m.sql"),
            })
            .collect();
        let limits = StorageLimits::default();
        let err = s.validate_with_limits(&limits).unwrap_err();
        assert!(err.iter().any(|e| e.contains("exceeds maximum")));
    }

    #[test]
    fn migration_file_without_sql_extension_rejected() {
        let mut s = valid_storage();
        s.migrations.files[0].path = "migrations/001_init.txt".into();
        let limits = StorageLimits::default();
        let err = s.validate_with_limits(&limits).unwrap_err();
        assert!(err.iter().any(|e| e.contains(".sql extension")));
    }

    #[test]
    fn migration_ids_not_ascending_rejected() {
        let mut s = valid_storage();
        s.migrations.files = vec![
            MigrationFileRef {
                id: "002_b".into(),
                path: "storage/migrations/002_b.sql".into(),
            },
            MigrationFileRef {
                id: "001_a".into(),
                path: "storage/migrations/001_a.sql".into(),
            },
        ];
        let limits = StorageLimits::default();
        let err = s.validate_with_limits(&limits).unwrap_err();
        assert!(err.iter().any(|e| e.contains("ascending order")));
    }

    #[test]
    fn reserved_alias_sqlite_rejected() {
        let mut s = valid_storage();
        s.namespace.alias = "sqlite".into();
        let limits = StorageLimits::default();
        let err = s.validate_with_limits(&limits).unwrap_err();
        assert!(err.iter().any(|e| e.contains("reserved")));
    }

    #[test]
    fn reserved_alias_host_rejected() {
        let mut s = valid_storage();
        s.namespace.alias = "host".into();
        let limits = StorageLimits::default();
        let err = s.validate_with_limits(&limits).unwrap_err();
        assert!(err.iter().any(|e| e.contains("reserved")));
    }

    #[test]
    fn reserved_alias_nexus_rejected() {
        let mut s = valid_storage();
        s.namespace.alias = "nexus".into();
        let limits = StorageLimits::default();
        let err = s.validate_with_limits(&limits).unwrap_err();
        assert!(err.iter().any(|e| e.contains("reserved")));
    }

    #[test]
    fn reserved_alias_core_rejected() {
        let mut s = valid_storage();
        s.namespace.alias = "core".into();
        let limits = StorageLimits::default();
        let err = s.validate_with_limits(&limits).unwrap_err();
        assert!(err.iter().any(|e| e.contains("reserved")));
    }

    #[test]
    fn valid_storage_with_limits_passes() {
        let s = valid_storage();
        let limits = StorageLimits::default();
        assert!(s.validate_with_limits(&limits).is_ok());
    }
}
