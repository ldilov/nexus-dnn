use serde::{Deserialize, Serialize};

#[derive(Clone, Copy, Debug, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "snake_case")]
pub enum RecipeStatus {
    Healthy,
    Outdated,
    Broken,
}

impl RecipeStatus {
    pub fn as_str(self) -> &'static str {
        match self {
            RecipeStatus::Healthy => "healthy",
            RecipeStatus::Outdated => "outdated",
            RecipeStatus::Broken => "broken",
        }
    }
}

/// Version-skew status. `pinned` is the recipe's pinned workflow version;
/// `current` is the workflow's `current_version`; `pinned_exists` is whether the
/// pinned version row is present in history. Binding-level `broken` (a target
/// that no longer resolves) is layered in by the P2 compiler; this is the
/// version-only baseline.
pub fn compute_version_status(
    pinned: Option<&str>,
    current: Option<&str>,
    pinned_exists: bool,
) -> RecipeStatus {
    match pinned {
        None => RecipeStatus::Broken,
        Some(_) if !pinned_exists => RecipeStatus::Broken,
        Some(p) => match current {
            Some(c) if c != p => RecipeStatus::Outdated,
            _ => RecipeStatus::Healthy,
        },
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn unpinned_is_broken() {
        assert_eq!(
            compute_version_status(None, Some("3"), false),
            RecipeStatus::Broken
        );
    }

    #[test]
    fn missing_pinned_version_is_broken() {
        assert_eq!(
            compute_version_status(Some("2"), Some("3"), false),
            RecipeStatus::Broken
        );
    }

    #[test]
    fn newer_current_is_outdated() {
        assert_eq!(
            compute_version_status(Some("2"), Some("3"), true),
            RecipeStatus::Outdated
        );
    }

    #[test]
    fn matching_is_healthy() {
        assert_eq!(
            compute_version_status(Some("3"), Some("3"), true),
            RecipeStatus::Healthy
        );
    }
}
