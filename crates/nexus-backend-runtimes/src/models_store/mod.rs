pub mod blobs;
pub mod download;
pub mod errors;
pub mod install;
pub mod leases;
pub mod provenance;
pub mod quantization;
pub mod reclaim;
pub mod resolver;
pub mod verify;

pub use blobs::{FileManifestEntry, GcReport, gc_blobs, materialize_blob};
pub use download::{DownloadOutcome, DownloadSpec, download_and_verify, make_limiter};
pub use errors::{ModelStoreError, ModelStoreResult};
pub use install::{
    HostModelRow, HttpFetcher, IdentityKey, InstallModelRequest, InstalledModelDto, ModelFetcher,
    ModelStoreCtx, PlannedFile, install_model, list_all_visible, uninstall_model,
};
pub use leases::{ModelLease, acquire_lease, list_active_leases, release_lease};
pub use provenance::{HfMetadata, HfProbe, LicenseInfo, ZeroHfProbe, resolve_license};
pub use quantization::{MatchQuality, Quantization};
pub use reclaim::{OwnerPredicate, ReclaimConfig, run_reclaim_pass, spawn_reclaim_ticker};
pub use resolver::{
    MatchedDep, MissingDep, ModelDependency, ModelResolutionReport, ResolutionContext,
    ResolveReport, SizeProbe, UnsatisfiableDep, UnsatisfiableReason, ZeroSizeProbe,
    check_model_dependencies, count_installs_and_blobs, resolve_dry_run,
};
pub use verify::verify_install;
