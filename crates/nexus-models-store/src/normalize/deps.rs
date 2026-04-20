//! Dependency detector — flags companion artifacts (VAE, text encoder,
//! tokenizer, scheduler, ControlNet, LoRA) inside a model family.

use crate::model::{Artifact, Dependency};
use crate::types::{DependencyRole, Requirement};

/// Return the [`DependencyRole`] a filename plays inside a family.
/// `Primary` is inferred elsewhere; this function only surfaces
/// companion roles.
#[must_use]
pub fn classify_role(filename: &str) -> DependencyRole {
    let lower = filename.to_ascii_lowercase();
    if lower.contains("vae") {
        return DependencyRole::Vae;
    }
    if lower.contains("text_encoder") || lower.contains("text-encoder") {
        return DependencyRole::TextEncoder;
    }
    if lower.contains("tokenizer") || lower == "vocab.json" || lower == "merges.txt" {
        return DependencyRole::Tokenizer;
    }
    if lower.contains("controlnet") {
        return DependencyRole::Controlnet;
    }
    if lower.contains("lora") {
        return DependencyRole::Lora;
    }
    if lower.contains("scheduler") {
        return DependencyRole::Scheduler;
    }
    DependencyRole::Other
}

/// Promote same-family companion [`Artifact`]s into explicit
/// [`Dependency`] rows. The primary artifact is NOT included.
#[must_use]
pub fn resolve_dependencies(artifacts: &[Artifact]) -> Vec<Dependency> {
    let mut out = Vec::new();
    for a in artifacts {
        match a.role {
            DependencyRole::Vae
            | DependencyRole::TextEncoder
            | DependencyRole::Tokenizer
            | DependencyRole::Controlnet
            | DependencyRole::Lora
            | DependencyRole::Scheduler => {
                out.push(Dependency {
                    role: a.role,
                    requirement: required_for(a.role),
                    target_artifact_id: Some(a.artifact_id.clone()),
                    external_ref: None,
                });
            }
            _ => {}
        }
    }
    out
}

fn required_for(role: DependencyRole) -> Requirement {
    match role {
        DependencyRole::Vae
        | DependencyRole::TextEncoder
        | DependencyRole::Tokenizer
        | DependencyRole::Scheduler => Requirement::Required,
        _ => Requirement::Optional,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn classifies_vae_and_tokenizer() {
        assert_eq!(classify_role("vae.safetensors"), DependencyRole::Vae);
        assert_eq!(
            classify_role("tokenizer.json"),
            DependencyRole::Tokenizer
        );
        assert_eq!(classify_role("vocab.json"), DependencyRole::Tokenizer);
    }

    #[test]
    fn unknown_filenames_are_other() {
        assert_eq!(classify_role("model.safetensors"), DependencyRole::Other);
        assert_eq!(classify_role("config.json"), DependencyRole::Other);
    }

    #[test]
    fn vae_and_tokenizer_are_required() {
        assert_eq!(required_for(DependencyRole::Vae), Requirement::Required);
        assert_eq!(
            required_for(DependencyRole::Tokenizer),
            Requirement::Required
        );
        assert_eq!(
            required_for(DependencyRole::Lora),
            Requirement::Optional
        );
    }
}
