//! Spec 035 T074 — `TestEchoHandler` test helper.
//!
//! Validates that the [`HandlerRegistry`] is the only extensibility seam
//! needed to add a new step type to the dep installer (FR-005). Used by
//! T075 / T077 integration tests.
//!
//! Spec block shape:
//!     { message: string }
//!
//! - `validate(spec)` accepts when `message` is a non-empty string; rejects
//!   with [`DepError::InvalidSpec`] otherwise (T077 path).
//! - `probe()` always returns `NotSatisfied` (the runner always invokes `run`).
//! - `run()` records each invocation in a thread-safe log and returns a
//!   `StepArtifact` whose `summary` echoes the message.

use std::sync::{Arc, Mutex};

use async_trait::async_trait;
use serde::Deserialize;
use serde_json::Value;

use nexus_extension_deps::{
    DepError, ProbeResult, StepArtifact, StepContext, StepHandler,
};

#[derive(Deserialize)]
struct TestEchoSpec {
    message: String,
}

#[derive(Default, Clone)]
pub struct TestEchoHandler {
    pub invocations: Arc<Mutex<Vec<EchoInvocation>>>,
}

#[derive(Debug, Clone)]
pub struct EchoInvocation {
    pub step_id: String,
    pub message: String,
}

impl TestEchoHandler {
    pub fn new() -> Self {
        Self::default()
    }

    pub fn invocation_count(&self) -> usize {
        self.invocations.lock().expect("lock").len()
    }

    pub fn last_message(&self) -> Option<String> {
        self.invocations
            .lock()
            .expect("lock")
            .last()
            .map(|inv| inv.message.clone())
    }
}

#[async_trait]
impl StepHandler for TestEchoHandler {
    fn step_type(&self) -> &'static str {
        "test_echo"
    }

    fn validate(&self, spec: &Value) -> Result<(), DepError> {
        let parsed: TestEchoSpec =
            serde_json::from_value(spec.clone()).map_err(|e| DepError::InvalidSpec {
                step_id: String::new(),
                field: "spec".into(),
                reason: e.to_string(),
            })?;
        if parsed.message.trim().is_empty() {
            return Err(DepError::InvalidSpec {
                step_id: String::new(),
                field: "message".into(),
                reason: "must be non-empty".into(),
            });
        }
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
        spec: &Value,
    ) -> Result<StepArtifact, DepError> {
        let parsed: TestEchoSpec = serde_json::from_value(spec.clone()).map_err(|e| {
            DepError::InvalidSpec {
                step_id: String::new(),
                field: "spec".into(),
                reason: e.to_string(),
            }
        })?;
        // TestEchoHandler doesn't have a step_id at this point — `run` only sees
        // the spec. The runner re-tags step_id in emitted events. For the
        // invocation log, derive a placeholder.
        self.invocations.lock().expect("lock").push(EchoInvocation {
            step_id: String::new(),
            message: parsed.message.clone(),
        });
        Ok(StepArtifact {
            path: None,
            bytes_placed: 0,
            summary: format!("echoed: {}", parsed.message),
            metadata: Value::Null,
        })
    }
}
