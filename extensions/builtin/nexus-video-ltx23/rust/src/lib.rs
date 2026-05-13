pub mod api;
pub mod errors;
pub mod lease;
pub mod migrations;
pub mod planning;
pub mod profile_install;
pub mod register;
pub mod runner;
pub mod runtime_selection;
pub mod schemas;
pub mod storage;

pub use errors::{ExtensionError, ExtensionErrorCode, Result};
pub use migrations::{Migration, MIGRATIONS};
pub use planning::{ltx_frame_count, plan_render, segment_count};
pub use register::{EXTENSION_ID, EXTENSION_VERSION, LtxProviderResources, LtxRouterProvider};
pub use schemas::{
    CreateRenderRequest, InterpolationMethod, QualityPreset, RenderMode, RenderPlan,
    RenderSegmentPlan, RuntimeProfilePreference, VramRisk,
};
