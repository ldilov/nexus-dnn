//! Operator framework.
//!
//! Each operator is an atomic step in the DAG workflow. It takes a typed
//! input, returns a typed output, and declares the effects it may perform
//! (RPC call, filesystem write, artifact publish). The framework is
//! Strategy-pattern + Command-pattern per Principle II.

pub mod audio_postprocess;
pub mod batch_synthesize;
pub mod emotion_resolve;
pub mod export_bundle;
pub mod mapping_resolve;
pub mod preview_mix;
pub mod script_parse;

use async_trait::async_trait;
use serde::{Deserialize, Serialize};

use crate::domain::Result;

pub const OPERATOR_CATALOG: &[&str] = &[
    "emotiontts.script.parse@1.0.0",
    "emotiontts.mapping.resolve@1.0.0",
    "emotiontts.emotion.resolve@1.0.0",
    "emotiontts.batch.synthesize@1.0.0",
    "emotiontts.audio.postprocess@1.0.0",
    "emotiontts.audio.preview_mix@1.0.0",
    "emotiontts.export.bundle@1.0.0",
];

#[derive(Debug, Clone, Copy, Eq, PartialEq, Serialize, Deserialize)]
pub struct OperatorId {
    pub namespace: &'static str,
    pub name: &'static str,
    pub version: &'static str,
}

impl OperatorId {
    #[must_use]
    pub const fn full(&self) -> (&'static str, &'static str, &'static str) {
        (self.namespace, self.name, self.version)
    }
}

#[async_trait]
pub trait Operator {
    type Input: Send;
    type Output: Send;

    fn id(&self) -> OperatorId;

    async fn execute(&self, input: Self::Input) -> Result<Self::Output>;
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn catalog_matches_7_operators() {
        assert_eq!(OPERATOR_CATALOG.len(), 7);
    }

    #[test]
    fn catalog_ids_use_semver() {
        for id in OPERATOR_CATALOG {
            assert!(id.contains('@'));
            let (_, ver) = id.split_once('@').unwrap();
            assert_eq!(ver.split('.').count(), 3);
        }
    }
}
