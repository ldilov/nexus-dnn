//! P8 migration-copy builder. `build_migration_copy` is pure: it plans a fresh
//! `author_kind="user"` recipe re-pinned to the workflow's current version with a
//! bumped recipe_version, carrying the projection verbatim. It never mutates the
//! source (immutability) and never derives ids from an extension.

use nexus_recipe::{MigrationSource, Output, RecipeProjection, build_migration_copy};

fn projection() -> RecipeProjection {
    RecipeProjection {
        schema_version: 1,
        sections: vec![],
        controls: vec![],
        presets: vec![],
        output: Output {
            primary_artifact: "audio".to_string(),
            secondary: vec![],
            preview_style: "player".to_string(),
            show_intermediate: false,
        },
        custom_ui: None,
    }
}

#[test]
fn migration_copy_repins_to_current_and_bumps_recipe_version() {
    let proj = projection();
    let source = MigrationSource {
        display_name: "Voice Batch",
        summary: "S",
        category: "audio",
        recipe_version: "1.2.3",
        workflow_id: "wf-1",
        projection: &proj,
    };

    let plan = build_migration_copy(&source, "v9");
    let new = &plan.new_recipe;

    assert_eq!(new.workflow_id, "wf-1");
    assert_eq!(new.workflow_version, "v9", "re-pinned to current");
    assert_eq!(new.recipe_version, "1.2.4", "patch bump of 1.2.3");
    assert_eq!(new.projection, proj, "projection carried verbatim");
    assert!(
        new.display_name.contains("Voice Batch"),
        "display name derives from source: {}",
        new.display_name
    );
}

#[test]
fn migration_copy_does_not_mutate_source() {
    let proj = projection();
    let before = proj.clone();
    let source = MigrationSource {
        display_name: "Voice Batch",
        summary: "S",
        category: "audio",
        recipe_version: "1.0.0",
        workflow_id: "wf-1",
        projection: &proj,
    };

    let _ = build_migration_copy(&source, "v2");

    assert_eq!(proj, before, "source projection unchanged after planning");
}
