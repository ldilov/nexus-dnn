use crate::diagnostic::Diagnostic;
use crate::error::DeploymentError;
use crate::events::DeploymentEvent;
use crate::id::DeploymentId;
use crate::repository::{DeploymentRepository, NewRestoreDiagnostic, NewValidation};
use chrono::Utc;
use std::sync::Arc;
use uuid::Uuid;

pub struct DeploymentValidateService {
    repo: Arc<dyn DeploymentRepository>,
}

#[derive(Debug, Clone)]
pub struct ValidationResult {
    pub validation_id: String,
    pub overall_state: String,
    pub diagnostics: Vec<Diagnostic>,
}

impl DeploymentValidateService {
    pub fn new(repo: Arc<dyn DeploymentRepository>) -> Self {
        Self { repo }
    }

    pub async fn validate(
        &self,
        deployment_id: &DeploymentId,
        diagnostics: Vec<Diagnostic>,
    ) -> Result<(ValidationResult, Vec<DeploymentEvent>), DeploymentError> {
        let deployment = self.repo.fetch_deployment(deployment_id).await?;
        let revision_id = deployment
            .current_revision_id
            .clone()
            .ok_or_else(|| DeploymentError::RestoreBlocked("no revision".into()))?;
        let validation_id = format!("vld_{}", Uuid::now_v7());
        let now = Utc::now().to_rfc3339();
        let mut warnings = 0i64;
        let mut errors = 0i64;
        let mut blocking = 0i64;
        for d in &diagnostics {
            match d.severity {
                crate::diagnostic::Severity::Warning => warnings += 1,
                crate::diagnostic::Severity::Error => errors += 1,
                crate::diagnostic::Severity::Blocking => blocking += 1,
                _ => {}
            }
        }
        let overall_state = if blocking > 0 {
            "blocking"
        } else if errors > 0 {
            "error"
        } else if warnings > 0 {
            "warning"
        } else {
            "ok"
        };
        let diagnostics_json = serde_json::to_string(&diagnostics)?;
        self.repo
            .insert_validation(NewValidation {
                id: validation_id.clone(),
                deployment_revision_id: revision_id.clone(),
                validated_at: now,
                overall_state: overall_state.into(),
                restore_state: deployment.restore_state.clone(),
                diagnostics_json,
                missing_dependencies_count: 0,
                warnings_count: warnings,
                errors_count: errors,
            })
            .await?;
        let mut diag_rows = Vec::with_capacity(diagnostics.len());
        for d in &diagnostics {
            diag_rows.push(NewRestoreDiagnostic {
                id: format!("dia_{}", Uuid::now_v7()),
                deployment_validation_id: validation_id.clone(),
                severity: severity_str(d.severity).into(),
                category: category_str(d.category).into(),
                code: d.code.clone(),
                message: d.message.clone(),
                subject_ref: d.subject_ref.clone(),
                resolution_hint: d.resolution_hint.clone(),
            });
        }
        if !diag_rows.is_empty() {
            self.repo
                .insert_restore_diagnostic_batch(&diag_rows)
                .await?;
        }
        let result = ValidationResult {
            validation_id: validation_id.clone(),
            overall_state: overall_state.into(),
            diagnostics,
        };
        Ok((
            result,
            vec![DeploymentEvent::Validated {
                deployment_id: deployment_id.clone(),
                validation_id,
            }],
        ))
    }
}

fn severity_str(s: crate::diagnostic::Severity) -> &'static str {
    match s {
        crate::diagnostic::Severity::Info => "info",
        crate::diagnostic::Severity::Warning => "warning",
        crate::diagnostic::Severity::Error => "error",
        crate::diagnostic::Severity::Blocking => "blocking",
    }
}

fn category_str(c: crate::diagnostic::Category) -> &'static str {
    use crate::diagnostic::Category::*;
    match c {
        Source => "source",
        RecipeMapping => "recipe_mapping",
        Operator => "operator",
        Extension => "extension",
        Runtime => "runtime",
        Model => "model",
        Artifact => "artifact",
        Profile => "profile",
        Security => "security",
        Migration => "migration",
    }
}
