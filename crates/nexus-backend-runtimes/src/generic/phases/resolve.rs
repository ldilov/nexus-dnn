//! T051 — resolve phase. Parses the version manifest, picks the matching
//! `(release × platform × accelerator_profile)` target, and stores the
//! result on `ctx.resolved_asset` for downstream phases.

use crate::generic::enums::PipelineFailureCategory;
use crate::generic::errors::GenericInstallError;
use crate::generic::install_ctx::InstallCtx;
use crate::generic::version_manifest::{ResolveError, VersionManifest};

pub async fn run(ctx: &mut InstallCtx) -> Result<(), GenericInstallError> {
    let manifest = VersionManifest::from_value(&ctx.release_manifest).map_err(map_err)?;
    let asset = manifest
        .resolve(
            ctx.release_id.as_str(),
            ctx.platform.as_str(),
            ctx.accelerator_profile.as_str(),
            ctx.extension_root.as_deref(),
        )
        .map_err(map_err)?;
    ctx.resolved_asset = Some(asset);
    Ok(())
}

fn map_err(e: ResolveError) -> GenericInstallError {
    let category = match e {
        ResolveError::Malformed(_)
        | ResolveError::InvalidUrl(_, _)
        | ResolveError::InvalidChecksum(_) => PipelineFailureCategory::InvalidVersionManifest,
        ResolveError::UnknownRelease(_) | ResolveError::UnknownTarget { .. } => {
            PipelineFailureCategory::InvalidVersionManifest
        }
    };
    GenericInstallError::new("resolve", category, e.to_string())
}
