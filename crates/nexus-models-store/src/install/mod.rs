pub mod dedup;
pub mod dto;
pub mod fetcher;
pub mod pipeline;
pub mod register_existing;
pub mod staged;

#[cfg(test)]
mod tests;

pub use dedup::{find_existing, list_all_visible};
pub use dto::{HostModelRow, IdentityKey, InstallModelRequest, InstalledModelDto, PlannedFile};
pub use fetcher::{HttpFetcher, ModelFetcher, test_support};
pub use pipeline::{ModelStoreCtx, install_model, uninstall_model};
pub use register_existing::{
    RegisterExistingRequest, compute_sha256_root, register_existing,
};
pub use staged::{StagedFile, StagedInstallOutcome, StagedInstallRequest, install_from_staging};
