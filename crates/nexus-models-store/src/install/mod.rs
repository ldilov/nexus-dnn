pub mod dedup;
pub mod dto;
pub mod fetcher;
pub mod pipeline;

#[cfg(test)]
mod tests;

pub use dedup::list_all_visible;
pub use dto::{HostModelRow, IdentityKey, InstallModelRequest, InstalledModelDto, PlannedFile};
pub use fetcher::{HttpFetcher, ModelFetcher, test_support};
pub use pipeline::{ModelStoreCtx, install_model, uninstall_model};
