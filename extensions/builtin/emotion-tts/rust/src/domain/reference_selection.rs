//! Pure helper — pick the right reference-audio artifact + variant for a
//! synthesis segment (spec 034 US1 / FR-203 / FR-204).
//!
//! Decision table (from data-model.md §Deployment.Transitions + R-34-01):
//!
//! | `deployment.reference_preprocess_enabled` | `voice_asset.preprocessed_artifact_ref` | Result             |
//! |-------------------------------------------|-----------------------------------------|--------------------|
//! | false                                     | any                                     | Original           |
//! | true                                      | `Some(_)`                               | Preprocessed       |
//! | true                                      | `None`                                  | Original (fallback)|
//!
//! This module has zero dependencies outside the domain layer — the
//! dispatcher (when it lands) will call [`select_reference`] to populate
//! the `speaker_audio_ref_abs` and record the chosen variant on the manifest.

use crate::domain::manifest::ReferenceVariant;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ReferenceChoice {
    pub artifact_ref: String,
    pub variant: ReferenceVariant,
}

#[must_use]
pub fn select_reference(
    deployment_reference_preprocess_enabled: bool,
    voice_asset_original_ref: &str,
    voice_asset_preprocessed_ref: Option<&str>,
) -> ReferenceChoice {
    match (
        deployment_reference_preprocess_enabled,
        voice_asset_preprocessed_ref,
    ) {
        (true, Some(pre)) => ReferenceChoice {
            artifact_ref: pre.to_string(),
            variant: ReferenceVariant::Preprocessed,
        },
        _ => ReferenceChoice {
            artifact_ref: voice_asset_original_ref.to_string(),
            variant: ReferenceVariant::Original,
        },
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    const ORIG: &str = "artifact://mem/original.wav";
    const PRE: &str = "artifact://mem/preprocessed.wav";

    #[test]
    fn toggle_on_and_preprocessed_available_picks_preprocessed() {
        let chosen = select_reference(true, ORIG, Some(PRE));
        assert_eq!(chosen.artifact_ref, PRE);
        assert_eq!(chosen.variant, ReferenceVariant::Preprocessed);
    }

    #[test]
    fn toggle_on_but_no_preprocessed_falls_back_to_original() {
        let chosen = select_reference(true, ORIG, None);
        assert_eq!(chosen.artifact_ref, ORIG);
        assert_eq!(
            chosen.variant,
            ReferenceVariant::Original,
            "FR-204 fallback: if preprocessing never ran we must not pretend it did",
        );
    }

    #[test]
    fn toggle_off_always_picks_original_even_if_preprocessed_exists() {
        let chosen = select_reference(false, ORIG, Some(PRE));
        assert_eq!(chosen.artifact_ref, ORIG);
        assert_eq!(chosen.variant, ReferenceVariant::Original);
    }

    #[test]
    fn toggle_off_and_no_preprocessed_picks_original() {
        let chosen = select_reference(false, ORIG, None);
        assert_eq!(chosen.artifact_ref, ORIG);
        assert_eq!(chosen.variant, ReferenceVariant::Original);
    }

    #[test]
    fn choice_is_deterministic_for_same_input() {
        let a = select_reference(true, ORIG, Some(PRE));
        let b = select_reference(true, ORIG, Some(PRE));
        assert_eq!(a, b);
    }
}
