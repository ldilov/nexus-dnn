//! [`StepHandler`] trait — the contract between the runner and step-type implementations.
//!
//! See `specs/035-extension-dependency-installer/contracts/step-handler-trait.rs.md` for
//! authoring rules.

use std::collections::HashMap;

use async_trait::async_trait;
use serde_json::Value;

use crate::context::StepContext;
use crate::error::DepError;
use crate::types::{StepArtifact, StepEstimate};

#[async_trait]
pub trait StepHandler: Send + Sync + 'static {
    /// Discriminator used in the manifest's `dependencies.steps[].type` field.
    fn step_type(&self) -> &'static str;

    /// Pure synchronous validation. No I/O. Called at extension load time.
    fn validate(&self, spec: &Value) -> Result<(), DepError>;

    /// Cheap idempotent check: is this step already satisfied? Target <100ms p95.
    /// MUST NOT make network calls or run subprocesses.
    async fn probe(&self, ctx: &StepContext<'_>, spec: &Value) -> Result<ProbeResult, DepError>;

    /// Execute the install. Idempotent. Streams progress via `ctx.progress_sink`.
    /// MUST observe `ctx.cancellation_token` at every I/O boundary.
    async fn run(&self, ctx: &StepContext<'_>, spec: &Value) -> Result<StepArtifact, DepError>;

    /// Cheap, no-network estimate of remaining/present work for a step that probed
    /// `NotSatisfied`. Reads persisted DB rows or on-disk state only — MUST NOT make
    /// network calls. Defaults to `None` (no estimate available).
    async fn estimate(&self, _ctx: &StepContext<'_>, _spec: &Value) -> Option<StepEstimate> {
        None
    }

    /// Verify the on-disk integrity of an already-satisfied step without
    /// re-installing. Cheap and no-network. Defaults to `None` (not verifiable);
    /// only handlers backed by recorded file sizes/hashes (e.g. `model_artifact`)
    /// override it. The UI shows a "reinstall" warning when `ok` is false.
    async fn integrity(
        &self,
        _ctx: &StepContext<'_>,
        _spec: &Value,
    ) -> Option<crate::ArtifactIntegrity> {
        None
    }
}

#[derive(Debug, Clone)]
pub enum ProbeResult {
    Satisfied { artifact: StepArtifact },
    NotSatisfied,
    Unsupported { reason: String },
}

/// Registry of step-type handlers, keyed by `step_type()`. Handlers are registered at
/// host startup. `default()` populates the five built-in handlers.
pub struct HandlerRegistry {
    handlers: HashMap<&'static str, Box<dyn StepHandler>>,
}

impl HandlerRegistry {
    pub fn new() -> Self {
        Self {
            handlers: HashMap::new(),
        }
    }

    pub fn register(&mut self, handler: Box<dyn StepHandler>) {
        let key = handler.step_type();
        self.handlers.insert(key, handler);
    }

    pub fn get(&self, step_type: &str) -> Option<&dyn StepHandler> {
        self.handlers.get(step_type).map(|h| h.as_ref())
    }

    pub fn known_types(&self) -> impl Iterator<Item = &'static str> + '_ {
        self.handlers.keys().copied()
    }

    pub fn validate_step(
        &self,
        step_id: &str,
        step_type: &str,
        spec: &Value,
    ) -> Result<(), DepError> {
        let handler = self
            .get(step_type)
            .ok_or_else(|| DepError::UnknownStepType {
                step_type: step_type.to_owned(),
            })?;
        handler.validate(spec).map_err(|e| match e {
            // Re-tag handler errors with the step id when the handler didn't include it.
            DepError::InvalidSpec {
                step_id: id,
                field,
                reason,
            } if id.is_empty() => DepError::InvalidSpec {
                step_id: step_id.to_owned(),
                field,
                reason,
            },
            other => other,
        })
    }
}

impl Default for HandlerRegistry {
    fn default() -> Self {
        let mut registry = Self::new();
        registry.register(Box::new(crate::handlers::runtime::RuntimeHandler::new()));
        registry.register(Box::new(
            crate::handlers::system_binary::SystemBinaryHandler::new(),
        ));
        registry.register(Box::new(
            crate::handlers::package_set::PackageSetHandler::new(),
        ));
        registry.register(Box::new(
            crate::handlers::model_artifact::ModelArtifactHandler::new(),
        ));
        registry.register(Box::new(
            crate::handlers::validation::ValidationHandler::new(),
        ));
        registry
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    struct FakeHandler;

    #[async_trait]
    impl StepHandler for FakeHandler {
        fn step_type(&self) -> &'static str {
            "fake"
        }

        fn validate(&self, _spec: &Value) -> Result<(), DepError> {
            Ok(())
        }

        async fn probe(
            &self,
            _ctx: &StepContext<'_>,
            _spec: &Value,
        ) -> Result<ProbeResult, DepError> {
            Ok(ProbeResult::NotSatisfied)
        }

        async fn run(
            &self,
            _ctx: &StepContext<'_>,
            _spec: &Value,
        ) -> Result<StepArtifact, DepError> {
            Ok(StepArtifact::empty("fake"))
        }
    }

    #[test]
    fn registry_registers_and_dispatches_by_type() {
        let mut registry = HandlerRegistry::new();
        registry.register(Box::new(FakeHandler));
        assert!(registry.get("fake").is_some());
        assert!(registry.get("absent").is_none());

        let known: Vec<_> = registry.known_types().collect();
        assert_eq!(known, vec!["fake"]);
    }

    #[test]
    fn validate_step_unknown_type_yields_structured_error() {
        let registry = HandlerRegistry::new();
        let err = registry
            .validate_step("python", "missing", &serde_json::json!({}))
            .unwrap_err();
        match err {
            DepError::UnknownStepType { step_type } => assert_eq!(step_type, "missing"),
            other => panic!("expected UnknownStepType, got {other:?}"),
        }
    }
}
