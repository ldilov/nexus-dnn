//! Newtype ids for the generic backend-runtime subsystem (Principle VII,
//! FR-101). Each id is `#[serde(transparent)]` so the JSON wire form
//! is identical to the underlying string, and `TryFrom<&str>` provides
//! validation where rules apply.

mod accelerator_profile;
mod contribution_checksum;
mod platform;
mod release_id;
mod runtime_id;
mod runtime_install_id;
mod runtime_lease_id;
mod source_extension_id;

pub use accelerator_profile::AcceleratorProfile;
pub use contribution_checksum::ContributionChecksum;
pub use platform::PlatformId;
pub use release_id::ReleaseId;
pub use runtime_id::{RuntimeId, RuntimeIdError};
pub use runtime_install_id::RuntimeInstallId;
pub use runtime_lease_id::RuntimeLeaseId;
pub use source_extension_id::SourceExtensionId;
