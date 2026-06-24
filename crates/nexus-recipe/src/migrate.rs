//! P8 migration-copy builder. Pure planning: given a source recipe's metadata +
//! projection and the workflow's current version, produce a [`NewUserRecipe`]
//! re-pinned to current with a bumped recipe_version. The caller persists it via
//! the host user-recipe create path; this function never mutates the source and
//! never derives an id from an extension (the host generates the id at insert).

use serde::{Deserialize, Serialize};

use crate::projection::RecipeProjection;

/// Read-only view of the source recipe a migration copies from. Host-supplied;
/// carries no storage type so this crate stays storage-free.
pub struct MigrationSource<'a> {
    pub display_name: &'a str,
    pub summary: &'a str,
    pub category: &'a str,
    pub recipe_version: &'a str,
    pub workflow_id: &'a str,
    pub projection: &'a RecipeProjection,
}

/// The planned new user recipe: maps 1:1 onto the host create payload plus the
/// bumped `recipe_version` the create path must persist.
#[derive(Clone, Debug, PartialEq, Serialize, Deserialize)]
pub struct NewUserRecipe {
    pub display_name: String,
    pub summary: String,
    pub category: String,
    pub workflow_id: String,
    pub workflow_version: String,
    pub recipe_version: String,
    pub projection: RecipeProjection,
}

/// The migration plan: a single new user recipe. Returned (not persisted) so the
/// handler owns the create + post-copy validation pass.
#[derive(Clone, Debug, PartialEq, Serialize, Deserialize)]
pub struct MigrationCopyPlan {
    pub new_recipe: NewUserRecipe,
}

/// Plan a migration copy re-pinned to `current_version`. The display name is
/// suffixed, the recipe_version is patch-bumped, and the projection is carried
/// verbatim. Pure — the source is untouched.
pub fn build_migration_copy(source: &MigrationSource, current_version: &str) -> MigrationCopyPlan {
    MigrationCopyPlan {
        new_recipe: NewUserRecipe {
            display_name: format!("{} (upgraded)", source.display_name),
            summary: source.summary.to_string(),
            category: source.category.to_string(),
            workflow_id: source.workflow_id.to_string(),
            workflow_version: current_version.to_string(),
            recipe_version: bump_patch(source.recipe_version),
            projection: source.projection.clone(),
        },
    }
}

/// Increment the patch component of a `MAJOR.MINOR.PATCH` version. A non-semver
/// input gets a `.1` suffix so the result is still strictly ordered after it.
fn bump_patch(version: &str) -> String {
    let parts: Vec<&str> = version.split('.').collect();
    if parts.len() == 3
        && let (Ok(major), Ok(minor), Ok(patch)) = (
            parts[0].parse::<u64>(),
            parts[1].parse::<u64>(),
            parts[2].parse::<u64>(),
        )
    {
        return format!("{major}.{minor}.{}", patch + 1);
    }
    format!("{version}.1")
}
