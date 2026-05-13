pub mod errors;
pub mod planning;
pub mod runtime_selection;
pub mod schemas;

pub use errors::{ExtensionError, ExtensionErrorCode, Result};
pub use planning::{ltx_frame_count, plan_render, segment_count};
pub use schemas::{
    CreateRenderRequest, InterpolationMethod, QualityPreset, RenderMode, RenderPlan,
    RenderSegmentPlan, RuntimeProfilePreference, VramRisk,
};
