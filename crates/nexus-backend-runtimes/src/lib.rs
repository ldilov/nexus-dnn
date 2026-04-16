pub mod adapter;
pub mod channel;
pub mod checksum;
pub mod compatibility;
pub mod detect;
pub mod diagnostics;
pub mod download;
pub mod error;
pub mod events;
pub mod extract;
pub mod family;
pub mod launch_spec;
pub mod lease;
pub mod log_pipeline;
pub mod log_store;
pub mod manifest;
pub mod parameter_catalog;
pub mod reserved_policy;
pub mod resolver;
pub mod runtime_installs_store;
pub mod settings;
pub mod settings_store;
pub mod spawn;
pub mod state;
pub mod state_log;
pub mod validator;

pub mod llamacpp;
pub mod tensorrt_llm;

pub use adapter::{AdapterRegistry, BackendAdapter, ImplementationStatus};
pub use channel::{
    ApiDialect, ChannelBuildCtx, RuntimeAddress, RuntimeChannelDescriptor, RuntimeChannelKind,
    RuntimeEndpoint,
};
pub use diagnostics::{DiagnosticRecord, FailureCategory};
pub use error::{
    BackendRuntimeError, BackendRuntimeResult, InstallError, RuntimeAdapterError, SettingsError,
    ValidationError,
};
pub use events::{BackendEvent, EventPublisher};
pub use family::RuntimeFamily;
pub use launch_spec::{LaunchSpec, LlamaServerLaunchSpec, generate as generate_launch_spec};
pub use lease::RuntimeLease;
pub use manifest::install::InstallManifest;
pub use manifest::version::{ReleaseAsset, VersionManifest};
pub use parameter_catalog::{ParameterCatalog, ParameterCatalogEntry, ParameterPolicy};
pub use resolver::{MachineDescriptor, resolve_runtime_asset};
pub use settings::{AcceleratorProfile, PortMode, RuntimeSettings};
pub use spawn::{RuntimeBindMode, SpawnRuntimeRequest, SpawnRuntimeResponse};
pub use state::{InstallState, RuntimeCardEvent, RuntimeCardState, TransitionTrigger};

use std::path::Path;

use sqlx::SqlitePool;

/// Run every startup-time runtime-pool migration in the correct order,
/// invoked by `nexus-core::app::run` BEFORE the HTTP server binds
/// relocation, and lease hydration. Idempotent across restarts.
///
/// `data_dir` is the host data root. Legacy extension-scoped binaries
/// live under `<data_dir>/extensions/local-llm/runtimes`; the host-owned
/// layout is `<data_dir>/runtimes/{family}/{version}`.
#[tracing::instrument(name = "runtime.startup_migrations", skip(pool))]
pub async fn run_startup_migrations(
    pool: &SqlitePool,
    data_dir: &Path,
) -> Result<(), BackendRuntimeError> {
    if let Err(e) = runtime_installs_store::migrate_from_legacy(pool).await {
        tracing::error!(
            family = crate::family::RuntimeFamily::LLAMA_CPP,
            phase = "migrate_from_legacy",
            error = %e,
            "startup migration failed",
        );
        return Err(e);
    }
    let legacy_root = data_dir
        .join("extensions")
        .join("local-llm")
        .join("runtimes");
    let host_runtimes_root = data_dir.join("runtimes");
    if let Err(e) =
        runtime_installs_store::relocate_legacy_binaries(pool, &legacy_root, &host_runtimes_root)
            .await
    {
        tracing::error!(
            family = crate::family::RuntimeFamily::LLAMA_CPP,
            phase = "relocate_legacy_binaries",
            error = %e,
            "startup migration failed",
        );
        return Err(e);
    }
    if let Err(e) = runtime_installs_store::hydrate_on_start(pool).await {
        tracing::error!(
            family = crate::family::RuntimeFamily::LLAMA_CPP,
            phase = "hydrate_on_start",
            error = %e,
            "startup migration failed",
        );
        return Err(e);
    }
    Ok(())
}
