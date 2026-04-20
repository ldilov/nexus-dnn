//! Newtype identifiers for the model-store domain (Principle XI — newtype
//! pattern over primitive obsession).
//!
//! Every id is constructed through an explicit `new` / `parse` on its
//! owner (`ModelFamily::id_from_repo`, `JobStore::create`, etc.); ad-hoc
//! construction from a raw string is deliberately not exposed.

use std::fmt;

use serde::{Deserialize, Serialize};
use uuid::Uuid;

macro_rules! str_newtype {
    ($(#[$m:meta])* $vis:vis $name:ident) => {
        $(#[$m])*
        #[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
        #[serde(transparent)]
        $vis struct $name(String);

        impl $name {
            #[inline]
            $vis fn as_str(&self) -> &str {
                &self.0
            }

            #[inline]
            $vis fn into_inner(self) -> String {
                self.0
            }
        }

        impl fmt::Display for $name {
            fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
                f.write_str(&self.0)
            }
        }

        impl From<String> for $name {
            #[inline]
            fn from(value: String) -> Self {
                Self(value)
            }
        }

        impl From<&str> for $name {
            #[inline]
            fn from(value: &str) -> Self {
                Self(value.to_owned())
            }
        }
    };
}

str_newtype!(
    /// Canonical model-family identifier: `"{source_provider}:{repo_id}"`
    /// (e.g. `"huggingface:meta-llama/Llama-3-8B-Instruct"`).
    pub FamilyId
);

str_newtype!(
    /// Artifact identifier: family-scoped, `"{family_id}#{filename}"`.
    pub ArtifactId
);

str_newtype!(
    /// Variant identifier: family-scoped, `"{family_id}@{label}"`.
    pub VariantId
);

str_newtype!(
    /// Backend identifier: `"llama.cpp"`, `"diffusers"`, etc.
    pub BackendId
);

/// Download-job identifier — always a UUID v7 (time-ordered), never an
/// arbitrary string.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(transparent)]
pub struct JobId(Uuid);

impl JobId {
    /// Generate a new, time-ordered job id. Uses `uuid::Uuid::now_v7()`.
    #[must_use]
    pub fn new() -> Self {
        Self(Uuid::now_v7())
    }

    #[inline]
    #[must_use]
    pub fn as_uuid(&self) -> Uuid {
        self.0
    }

    #[inline]
    #[must_use]
    pub fn from_uuid(uuid: Uuid) -> Self {
        Self(uuid)
    }
}

impl Default for JobId {
    fn default() -> Self {
        Self::new()
    }
}

impl fmt::Display for JobId {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        self.0.fmt(f)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn family_id_roundtrips_through_serde() {
        let id = FamilyId::from("huggingface:meta-llama/Llama-3-8B");
        let json = serde_json::to_string(&id).unwrap();
        assert_eq!(json, "\"huggingface:meta-llama/Llama-3-8B\"");
        let back: FamilyId = serde_json::from_str(&json).unwrap();
        assert_eq!(back, id);
    }

    #[test]
    fn job_id_is_uuid_v7_and_sortable() {
        let first = JobId::new();
        std::thread::sleep(std::time::Duration::from_millis(2));
        let second = JobId::new();
        assert_ne!(first, second);
        assert!(first.to_string() < second.to_string(), "v7 ids are time-ordered");
    }
}
