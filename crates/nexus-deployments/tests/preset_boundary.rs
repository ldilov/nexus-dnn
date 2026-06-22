//! Boundary guard: the host-owned preset service must never hardcode an
//! extension id (host-extension boundary rule). Production source is scanned;
//! a regression that bakes in an extension id fails here.

const FORBIDDEN: &[&str] = &[
    "local-llm",
    "local_llm",
    "emotion-tts",
    "nexus.video",
    "nexus.rag",
];

#[test]
fn preset_service_has_no_extension_id_literals() {
    let src = include_str!("../src/service/preset.rs");
    // Strip the #[cfg(test)] module — test fixtures may use a generic sentinel.
    let prod = src.split("#[cfg(test)]").next().unwrap_or(src);
    for needle in FORBIDDEN {
        assert!(
            !prod.contains(needle),
            "preset.rs production code contains forbidden extension literal {needle:?}"
        );
    }
}

#[test]
fn preset_migration_table_name_is_generic() {
    let sql = include_str!("../../../migrations/025_deployment_presets.sql");
    assert!(
        sql.contains("deployment_presets"),
        "migration must define the generic table"
    );
    for needle in FORBIDDEN {
        assert!(
            !sql.contains(needle),
            "migration 025 contains forbidden extension literal {needle:?}"
        );
    }
}
