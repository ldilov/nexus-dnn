//! Host-owned backend runtime pool.
//!
//! Every generic runtime concern — install/repair/uninstall pipelines,
//! accelerator-aware binary selection, validation and reconciler logic,
//! managed spawn and drain, runtime channel descriptors, logs, and
//! versioned parameter catalogs — lives here. Domain concerns (model
//! choice, prompt templates, routing rules, request payload shapes) stay
//! inside each consuming extension. See `specs/011-host-runtime-pool/spec.md`.

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
pub mod installs_store;
pub mod launch_spec;
pub mod lease;
pub mod log_pipeline;
pub mod log_store;
pub mod manifest;
pub mod parameter_catalog;
pub mod reserved_policy;
pub mod resolver;
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
pub use launch_spec::{LaunchSpec, generate as generate_launch_spec};
pub use lease::RuntimeLease;
pub use manifest::install::InstallManifest;
pub use manifest::version::{ReleaseAsset, VersionManifest};
pub use parameter_catalog::{ParameterCatalog, ParameterCatalogEntry, ParameterPolicy};
pub use resolver::{MachineDescriptor, resolve_runtime_asset};
pub use settings::{AcceleratorProfile, PortMode, RuntimeSettings};
pub use spawn::{RuntimeBindMode, SpawnRuntimeRequest, SpawnRuntimeResponse};
pub use state::{InstallState, RuntimeCardEvent, RuntimeCardState, TransitionTrigger};
