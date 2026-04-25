//! `validation` step handler — terminal step. Spawns the worker via the host's
//! [`crate::context::WorkerHandshake`] (wired to spec 032's lease primitives) and
//! declares success only if the handshake completes within the timeout.

use std::time::Duration;

use async_trait::async_trait;
use serde::Deserialize;
use serde_json::Value;

use crate::context::StepContext;
use crate::error::DepError;
use crate::handler::{ProbeResult, StepHandler};
use crate::types::StepArtifact;

#[derive(Debug, Deserialize)]
struct ValidationSpec {
    #[serde(default = "default_kind")]
    kind: String,
    #[serde(default = "default_timeout")]
    timeout_seconds: u64,
}

fn default_kind() -> String {
    "worker_handshake".to_owned()
}

fn default_timeout() -> u64 {
    60
}

pub struct ValidationHandler;

impl ValidationHandler {
    pub fn new() -> Self {
        Self
    }
}

impl Default for ValidationHandler {
    fn default() -> Self {
        Self::new()
    }
}

fn parse(spec: &Value) -> Result<ValidationSpec, DepError> {
    serde_json::from_value(spec.clone()).map_err(|e| DepError::InvalidSpec {
        step_id: String::new(),
        field: "spec".to_owned(),
        reason: e.to_string(),
    })
}

#[async_trait]
impl StepHandler for ValidationHandler {
    fn step_type(&self) -> &'static str {
        "validation"
    }

    fn validate(&self, spec: &Value) -> Result<(), DepError> {
        let parsed = parse(spec)?;
        if parsed.kind != "worker_handshake" {
            return Err(DepError::invalid_spec(
                "",
                "kind",
                format!(
                    "v1 only supports 'worker_handshake'; got '{}'",
                    parsed.kind
                ),
            ));
        }
        if parsed.timeout_seconds == 0 {
            return Err(DepError::invalid_spec(
                "",
                "timeout_seconds",
                "must be > 0",
            ));
        }
        Ok(())
    }

    async fn probe(
        &self,
        _ctx: &StepContext<'_>,
        _spec: &Value,
    ) -> Result<ProbeResult, DepError> {
        // Validation is a terminal smoke-test. We never declare it satisfied without
        // running it — it's the explicit "did everything come up" check, and its
        // result is meaningful only at install time. probe() always returns
        // NotSatisfied so the runner re-runs it on every install attempt.
        Ok(ProbeResult::NotSatisfied)
    }

    async fn run(
        &self,
        ctx: &StepContext<'_>,
        spec: &Value,
    ) -> Result<StepArtifact, DepError> {
        let parsed = parse(spec)?;
        let timeout = Duration::from_secs(parsed.timeout_seconds);

        match ctx
            .worker_handshake
            .run_handshake(
                ctx.extension_id,
                ctx.extension_dir,
                ctx.upstream_artifacts,
                timeout,
                ctx.cancellation_token.clone(),
            )
            .await
        {
            Ok(()) => Ok(StepArtifact {
                path: None,
                bytes_placed: 0,
                summary: format!("worker handshake ok ({}s timeout)", parsed.timeout_seconds),
                metadata: Value::Null,
            }),
            Err(handshake_err) => Err(DepError::Backend(format!(
                "{}: {}",
                handshake_err.category, handshake_err.message
            ))),
        }
    }
}
