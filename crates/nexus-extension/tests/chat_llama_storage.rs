use std::path::PathBuf;

use nexus_extension::manifest::parse_manifest;
use nexus_extension::storage::plan::{PlanAction, build_plan};
use nexus_extension::storage::sql_validator::{expand_prefix, validate_sql};

fn extension_root() -> PathBuf {
    let manifest_dir = PathBuf::from(env!("CARGO_MANIFEST_DIR"));
    manifest_dir
        .join("..")
        .join("..")
        .join("extensions")
        .join("example-chat-llama")
}

#[test]
fn parses_chat_llama_manifest() {
    let root = extension_root();
    let manifest_path = root.join("manifest.yaml");
    let manifest = parse_manifest(&manifest_path).expect("manifest should parse");

    assert_eq!(manifest.extension.id, "example.chat.llama");
    assert_eq!(manifest.extension.version, "0.4.0");
    assert_eq!(
        manifest.extension.name.as_deref(),
        Some("Local Chat for llama.cpp")
    );
    assert!(manifest.storage.is_some());
}

#[test]
fn validates_storage_block() {
    let root = extension_root();
    let manifest = parse_manifest(&root.join("manifest.yaml")).expect("manifest should parse");
    let storage = manifest.storage.as_ref().expect("storage block must exist");

    storage.validate().expect("storage validation should pass");

    assert_eq!(storage.namespace.alias, "chat_llama");
    assert_eq!(storage.namespace.prefix_mode, "host_derived");
    assert_eq!(storage.migrations.files.len(), 2);
    assert_eq!(storage.migrations.files[0].id, "001_init");
    assert_eq!(storage.migrations.files[1].id, "002_indexes");
}

#[test]
fn effective_prefix_is_ext_chat_llama() {
    let root = extension_root();
    let manifest = parse_manifest(&root.join("manifest.yaml")).expect("manifest should parse");
    let storage = manifest.storage.as_ref().expect("storage block must exist");

    assert_eq!(storage.effective_prefix(), "ext_chat_llama_");
}

#[test]
fn sql_migrations_pass_static_validation() {
    let root = extension_root();
    let manifest = parse_manifest(&root.join("manifest.yaml")).expect("manifest should parse");
    let storage = manifest.storage.as_ref().expect("storage block must exist");
    let prefix = storage.effective_prefix();

    for file_ref in &storage.migrations.files {
        let sql_path = root.join(&file_ref.path);
        let raw_sql =
            std::fs::read_to_string(&sql_path).expect("migration file should be readable");
        let expanded = expand_prefix(&raw_sql, &prefix);
        let report = validate_sql(&expanded, &prefix);

        assert!(
            report.errors.is_empty(),
            "migration '{}' has validation errors: {:?}",
            file_ref.id,
            report.errors
        );
    }
}

#[test]
fn builds_new_install_plan_with_two_migrations() {
    let root = extension_root();
    let manifest = parse_manifest(&root.join("manifest.yaml")).expect("manifest should parse");
    let storage = manifest.storage.as_ref().expect("storage block must exist");

    let plan = build_plan(
        &manifest.extension.id,
        &manifest.extension.version,
        &root,
        storage,
        &[],
    )
    .expect("plan should build");

    assert!(matches!(plan.action, PlanAction::NewInstall));
    assert_eq!(plan.migrations_to_apply.len(), 2);
    assert_eq!(plan.effective_prefix, "ext_chat_llama_");
    assert_eq!(plan.namespace_alias, "chat_llama");
    assert!(!plan.expected_objects.is_empty());
}

#[test]
fn plan_expected_objects_include_tables_and_indexes() {
    let root = extension_root();
    let manifest = parse_manifest(&root.join("manifest.yaml")).expect("manifest should parse");
    let storage = manifest.storage.as_ref().expect("storage block must exist");

    let plan = build_plan(
        &manifest.extension.id,
        &manifest.extension.version,
        &root,
        storage,
        &[],
    )
    .expect("plan should build");

    let table_names: Vec<&str> = plan
        .expected_objects
        .iter()
        .filter(|o| o.object_type == "table")
        .map(|o| o.object_name.as_str())
        .collect();

    assert!(table_names.contains(&"ext_chat_llama_threads"));
    assert!(table_names.contains(&"ext_chat_llama_messages"));
    assert!(table_names.contains(&"ext_chat_llama_message_attachments"));
    assert!(table_names.contains(&"ext_chat_llama_thread_model_profiles"));

    let index_names: Vec<&str> = plan
        .expected_objects
        .iter()
        .filter(|o| o.object_type == "index")
        .map(|o| o.object_name.as_str())
        .collect();

    assert!(index_names.contains(&"ext_chat_llama_idx_threads_updated_at"));
    assert!(index_names.contains(&"ext_chat_llama_idx_messages_thread_created_at"));
    assert!(index_names.contains(&"ext_chat_llama_idx_messages_status"));
    assert!(index_names.contains(&"ext_chat_llama_idx_attachments_message_id"));
}
