//! P7: resolve `EmotionTTS` recipe control values through the host compiler.
//!
//! The extension self-assembles the pinned workflow snapshot + projection from
//! its own bundled definitions — the same bytes the host seeds into
//! `workflow_versions`/`recipes` — so resolution needs no host storage handle.
//! The runner sources the synthesis job from [`ResolvedRun::resolved_inputs`],
//! never from the flat request DTO.

use std::sync::OnceLock;

use nexus_recipe::{
    compile_recipe_run, BindingError, ControlValues, RecipeProjection, ResolvedRun,
};
use nexus_workflow::{canonical_hash, parse_workflow, WorkflowVersionSnapshot};

// Paths are relative to this source file: `rust/src/` is two levels below the
// extension root, so the bundled definitions live at `../../<dir>/`.
const WORKFLOW_YAML: &str = include_str!("../../workflows/emotional_dialogue_batch.yaml");
const RECIPE_YAML: &str = include_str!("../../recipes/emotional_dialogue_batch.yaml");
const OPERATOR_YAMLS: &[&str] = &[
    include_str!("../../operators/script_parse.yaml"),
    include_str!("../../operators/mapping_resolve.yaml"),
    include_str!("../../operators/emotion_resolve.yaml"),
    include_str!("../../operators/batch_synthesize.yaml"),
    include_str!("../../operators/audio_postprocess.yaml"),
    include_str!("../../operators/audio_preview_mix.yaml"),
    include_str!("../../operators/export_bundle.yaml"),
];

struct RecipeBundle {
    snapshot: WorkflowVersionSnapshot,
    projection: RecipeProjection,
}

fn bundle() -> &'static RecipeBundle {
    static BUNDLE: OnceLock<RecipeBundle> = OnceLock::new();
    BUNDLE.get_or_init(|| {
        build_bundle().expect("bundled emotion-tts recipe definitions must assemble")
    })
}

/// Validate at startup that the bundled definitions assemble, so a malformed
/// bundled YAML surfaces as a boot error instead of a panic on the first run.
///
/// # Errors
/// Returns the assembly error if the workflow, operators, or projection fail to
/// parse or validate.
pub fn ensure_initialized() -> anyhow::Result<()> {
    build_bundle().map(|_| ())
}

fn build_bundle() -> anyhow::Result<RecipeBundle> {
    let workflow =
        parse_workflow(WORKFLOW_YAML).map_err(|e| anyhow::anyhow!("workflow parse: {e}"))?;

    let mut operators = Vec::with_capacity(OPERATOR_YAMLS.len());
    for yaml in OPERATOR_YAMLS {
        let op =
            nexus_extension::manifest::parse_operator_definition_str(yaml, "emotion-tts operator")
                .map_err(|e| anyhow::anyhow!("operator parse: {e}"))?;
        operators.push(op);
    }

    let hash = canonical_hash(&workflow);
    let snapshot = WorkflowVersionSnapshot::from_workflow(
        workflow.id.clone(),
        workflow.version.clone(),
        hash,
        workflow,
        &operators,
    );

    let recipe = nexus_extension::recipe::parse_recipe_definition_str(
        RECIPE_YAML,
        "emotional_dialogue_batch.yaml",
    )
    .map_err(|e| anyhow::anyhow!("recipe parse: {e}"))?;
    let projection_value = recipe
        .projection
        .ok_or_else(|| anyhow::anyhow!("emotion-tts recipe is missing its projection block"))?;
    let projection: RecipeProjection = serde_json::from_value(projection_value)
        .map_err(|e| anyhow::anyhow!("projection deserialize: {e}"))?;

    Ok(RecipeBundle {
        snapshot,
        projection,
    })
}

/// Resolve + validate `control_values` through the host compiler.
///
/// Optionally layers a preset, returning the frozen [`ResolvedRun`] whose
/// `resolved_inputs` the runner uses to populate the synthesis job.
pub fn resolve(
    control_values: &ControlValues,
    preset_id: Option<&str>,
) -> Result<ResolvedRun, BindingError> {
    let b = bundle();
    compile_recipe_run(&b.projection, &b.snapshot, control_values, preset_id)
}

/// The `EmotionTTS` recipe projection (control / section / preset metadata),
/// surfaced to metadata endpoints that previously read the hardcoded table.
#[must_use]
pub fn projection() -> &'static RecipeProjection {
    &bundle().projection
}
