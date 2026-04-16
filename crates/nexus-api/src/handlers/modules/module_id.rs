//! `ModuleId` newtype — the synthetic identifier that labels every entry in
//! `GET /api/v1/modules` responses.
//!
//! Shape (spec 019 FR-033):
//!
//! * `ext:{extension_id}`        — extension-contributed module
//! * `user:{workflow_id}`        — module backed by a user-authored workflow
//! * `user:blank`                — synthetic blank-module card (FR-007)
//! * `user:draft:{uuid-v4}`      — client-minted draft during Blank Module
//!                                 materialize (FR-BM01); accepted ONLY by the
//!                                 `/modules/user:draft:{uuid}/materialize`
//!                                 endpoint — every other module-scoped route
//!                                 rejects it with `module.draft_id_not_allowed`.

use std::fmt;

use regex_lite::Regex;
use serde::{Deserialize, Serialize};

#[derive(Debug, thiserror::Error, PartialEq, Eq)]
#[non_exhaustive]
pub enum ModuleIdParseError {
    #[error("module_id is empty")]
    Empty,
    #[error("module_id `{0}` does not match the allowed shape")]
    InvalidShape(String),
}

/// Discriminant recovered from a parsed module_id.
#[derive(Debug, Clone, PartialEq, Eq)]
#[non_exhaustive]
pub enum ModuleIdKind {
    Extension { extension_id: String },
    User { workflow_id: String },
    Blank,
    Draft { uuid: String },
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(transparent)]
pub struct ModuleId(String);

impl ModuleId {
    pub fn parse(raw: impl Into<String>) -> Result<Self, ModuleIdParseError> {
        let raw = raw.into();
        if raw.is_empty() {
            return Err(ModuleIdParseError::Empty);
        }
        if MODULE_ID_RE.is_match(&raw) {
            Ok(Self(raw))
        } else {
            Err(ModuleIdParseError::InvalidShape(raw))
        }
    }

    pub fn from_extension(extension_id: &str) -> Self {
        Self(format!("ext:{extension_id}"))
    }

    pub fn from_user_workflow(workflow_id: &str) -> Self {
        Self(format!("user:{workflow_id}"))
    }

    pub fn blank() -> Self {
        Self("user:blank".into())
    }

    pub fn from_draft_uuid(uuid: &str) -> Result<Self, ModuleIdParseError> {
        let candidate = format!("user:draft:{uuid}");
        Self::parse(candidate)
    }

    pub fn as_str(&self) -> &str {
        &self.0
    }

    pub fn kind(&self) -> ModuleIdKind {
        if self.0 == "user:blank" {
            return ModuleIdKind::Blank;
        }
        if let Some(rest) = self.0.strip_prefix("ext:") {
            return ModuleIdKind::Extension {
                extension_id: rest.to_string(),
            };
        }
        if let Some(rest) = self.0.strip_prefix("user:draft:") {
            return ModuleIdKind::Draft {
                uuid: rest.to_string(),
            };
        }
        if let Some(rest) = self.0.strip_prefix("user:") {
            return ModuleIdKind::User {
                workflow_id: rest.to_string(),
            };
        }
        unreachable!("ModuleId constructors guarantee one of the four forms")
    }

    pub fn is_draft(&self) -> bool {
        matches!(self.kind(), ModuleIdKind::Draft { .. })
    }
}

impl fmt::Display for ModuleId {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        self.0.fmt(f)
    }
}

static MODULE_ID_PATTERN: &str =
    r"^(ext:[A-Za-z0-9_\-.]+|user:[A-Za-z0-9_\-.]+|user:blank|user:draft:[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})$";

fn build_regex() -> Regex {
    Regex::new(MODULE_ID_PATTERN).expect("static regex is valid")
}

use std::sync::LazyLock;
static MODULE_ID_RE: LazyLock<Regex> = LazyLock::new(build_regex);

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parse_extension_form() {
        let id = ModuleId::parse("ext:chatllm").unwrap();
        assert!(matches!(
            id.kind(),
            ModuleIdKind::Extension { extension_id } if extension_id == "chatllm"
        ));
    }

    #[test]
    fn parse_user_form() {
        let id =
            ModuleId::parse("user:abcdef12-3456-4789-8abc-def012345678").unwrap();
        assert!(matches!(id.kind(), ModuleIdKind::User { .. }));
    }

    #[test]
    fn parse_blank_form() {
        let id = ModuleId::parse("user:blank").unwrap();
        assert_eq!(id.kind(), ModuleIdKind::Blank);
    }

    #[test]
    fn parse_draft_form() {
        let id = ModuleId::parse("user:draft:abcdef12-3456-4789-8abc-def012345678").unwrap();
        assert!(id.is_draft());
    }

    #[test]
    fn rejects_empty() {
        assert_eq!(ModuleId::parse(""), Err(ModuleIdParseError::Empty));
    }

    #[test]
    fn rejects_bad_prefix() {
        assert!(matches!(
            ModuleId::parse("foo:bar"),
            Err(ModuleIdParseError::InvalidShape(_))
        ));
    }

    #[test]
    fn rejects_bad_draft_uuid() {
        assert!(matches!(
            ModuleId::parse("user:draft:not-a-uuid"),
            Err(ModuleIdParseError::InvalidShape(_))
        ));
    }

    #[test]
    fn rejects_uppercase_in_uuid() {
        assert!(matches!(
            ModuleId::parse("user:draft:ABCDEF12-3456-4789-8abc-def012345678"),
            Err(ModuleIdParseError::InvalidShape(_))
        ));
    }

    #[test]
    fn rejects_wrong_version_in_uuid() {
        assert!(matches!(
            ModuleId::parse("user:draft:abcdef12-3456-1789-8abc-def012345678"),
            Err(ModuleIdParseError::InvalidShape(_))
        ));
    }

    #[test]
    fn constructors_roundtrip_parse() {
        assert_eq!(
            ModuleId::from_extension("cinema").as_str(),
            "ext:cinema"
        );
        assert_eq!(
            ModuleId::from_user_workflow("wfl-123").as_str(),
            "user:wfl-123"
        );
        assert_eq!(ModuleId::blank().as_str(), "user:blank");
    }

    #[test]
    fn blank_is_not_draft() {
        assert!(!ModuleId::blank().is_draft());
    }
}
