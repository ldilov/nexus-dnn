//! `runtime` step handler — language-runtime install.
//!
//! Delegates to the host-supplied [`crate::context::RuntimeBootstrapper`] (wired to
//! spec 032's `nexus-backend-runtimes` at host startup). Stores the resolved profile
//! in the artifact's `metadata` so a downstream `model_artifact` step can match on it.

use async_trait::async_trait;
use serde::Deserialize;
use serde_json::Value;

use crate::context::StepContext;
use crate::error::DepError;
use crate::handler::{ProbeResult, StepHandler};
use crate::types::StepArtifact;

#[derive(Debug, Deserialize)]
struct RuntimeSpec {
    family: String,
    #[serde(default)]
    version: Option<String>,
    #[serde(default)]
    accelerator_profiles: Vec<String>,
}

pub struct RuntimeHandler;

impl RuntimeHandler {
    pub fn new() -> Self {
        Self
    }
}

impl Default for RuntimeHandler {
    fn default() -> Self {
        Self::new()
    }
}

fn parse(spec: &Value) -> Result<RuntimeSpec, DepError> {
    serde_json::from_value(spec.clone()).map_err(|e| DepError::InvalidSpec {
        step_id: String::new(),
        field: "spec".to_owned(),
        reason: e.to_string(),
    })
}

fn build_artifact(
    parsed: &RuntimeSpec,
    result: crate::context::RuntimeBootstrapResult,
) -> StepArtifact {
    let mut metadata = serde_json::Map::new();
    metadata.insert(
        "resolved_version".to_owned(),
        Value::String(result.resolved_version.clone()),
    );
    if let Some(profile) = result.resolved_profile.as_deref() {
        metadata.insert(
            "resolved_profile".to_owned(),
            Value::String(profile.to_owned()),
        );
    }
    metadata.insert("family".to_owned(), Value::String(parsed.family.clone()));

    let summary = format!(
        "{} {} ({})",
        parsed.family,
        result.resolved_version,
        result
            .resolved_profile
            .as_deref()
            .unwrap_or("default profile"),
    );

    StepArtifact {
        path: Some(result.install_dir),
        bytes_placed: result.bytes_placed,
        summary,
        metadata: Value::Object(metadata),
    }
}

#[async_trait]
impl StepHandler for RuntimeHandler {
    fn step_type(&self) -> &'static str {
        "runtime"
    }

    fn validate(&self, spec: &Value) -> Result<(), DepError> {
        let parsed = parse(spec)?;
        if parsed.family.trim().is_empty() {
            return Err(DepError::invalid_spec("", "family", "empty"));
        }
        Ok(())
    }

    async fn probe(
        &self,
        ctx: &StepContext<'_>,
        spec: &Value,
    ) -> Result<ProbeResult, DepError> {
        let parsed = parse(spec)?;
        let target_dir = runtime_dir(ctx, &parsed.family);
        match ctx
            .runtime_bootstrapper
            .probe(
                &parsed.family,
                parsed.version.as_deref(),
                &parsed.accelerator_profiles,
                &target_dir,
            )
            .await?
        {
            None => Ok(ProbeResult::NotSatisfied),
            Some(result) => Ok(ProbeResult::Satisfied {
                artifact: build_artifact(&parsed, result),
            }),
        }
    }

    async fn run(&self, ctx: &StepContext<'_>, spec: &Value) -> Result<StepArtifact, DepError> {
        let parsed = parse(spec)?;
        let target_dir = runtime_dir(ctx, &parsed.family);
        tokio::fs::create_dir_all(&target_dir).await?;

        let result = ctx
            .runtime_bootstrapper
            .bootstrap(
                &parsed.family,
                parsed.version.as_deref(),
                &parsed.accelerator_profiles,
                &target_dir,
                ctx.cancellation_token.clone(),
            )
            .await?;

        Ok(build_artifact(&parsed, result))
    }
}

fn runtime_dir(ctx: &StepContext<'_>, family: &str) -> std::path::PathBuf {
    ctx.extension_data_dir.join("runtime").join(family)
}
