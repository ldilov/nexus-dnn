//! P0 boundary discipline — the `workflow_versions` schema is host-generic.
//!
//! Asserts the migration table name is generic (not `ext_`-prefixed, not named
//! after any extension) and neither `026` SQL file leaks an extension-id
//! literal. Mirrors `nexus-extension-deps/tests/boundary_test.rs` and the
//! `nexus-deployments/tests/preset_boundary.rs` generic-table-name precedent.

const CREATE_SQL: &str = include_str!("../../../migrations/026_workflow_versions.sql");
const ALTER_SQL: &str = include_str!("../../../migrations/026_workflow_versions_alter.sql");

const FORBIDDEN: &[&str] = &[
    "local-llm",
    "local_llm",
    "nexus.local-llm",
    "emotiontts",
    "emotion-tts",
    "emotion_tts",
    "indextts",
    "ext_",
];

#[test]
fn migration_026_uses_a_generic_table_name() {
    assert!(
        CREATE_SQL.contains("CREATE TABLE IF NOT EXISTS workflow_versions"),
        "026 CREATE must declare the generic host table `workflow_versions`",
    );
    assert!(
        ALTER_SQL.contains("ALTER TABLE workflows ADD COLUMN current_version"),
        "026 ALTER must add the generic `current_version` head pointer",
    );
}

#[test]
fn migration_026_has_no_extension_id_literals() {
    let mut violations: Vec<String> = Vec::new();
    for (name, sql) in [
        ("026_workflow_versions.sql", CREATE_SQL),
        ("026_workflow_versions_alter.sql", ALTER_SQL),
    ] {
        for needle in FORBIDDEN {
            if sql.contains(needle) {
                violations.push(format!("{name}: {needle}"));
            }
        }
    }
    assert!(
        violations.is_empty(),
        "extension-id literals / non-generic table prefix leaked into the 026 migration:\n  {}",
        violations.join("\n  "),
    );
}
