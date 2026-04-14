//! Wire-shape DTOs for every REST endpoint.
//!
//! Every migrated handler in `crate::handlers::*` returns one of these structs
//! wrapped in an [`ApiEnvelope`]. The types are the single source of truth for
//! the frontend contract — TypeScript type declarations under
//! `apps/web/src/api/generated/` are emitted by `ts-rs` from the same struct
//! definitions (see the `export_bindings` test in this module).
//!
//! Out of scope for this sweep: `backends` (already typed in-place with
//! runtime-specific enums) and `storage_contributions` (internal admin API).
//! They continue to serialize structurally compatible JSON; their frontend
//! consumers use hand-maintained types in `apps/web/src/backends/` for now.

pub mod artifacts;
pub mod envelope;
pub mod extensions;
pub mod recipes;
pub mod runs;
pub mod system;
pub mod tools;
pub mod ui;
pub mod workflows;

pub use artifacts::{ArtifactDto, ArtifactLineageDto, LineageEdgeDto, ViewerCandidateDto};
pub use envelope::{ApiEnvelope, ApiErrorPayloadDto, ListResponseDto, MetaDto};
pub use extensions::{
    EnableExtensionResponseDto, ExtensionDto, OperatorDto, PortSpecDto, RefreshReportDto,
};
pub use recipes::{RecipeDto, RecipeFieldBindingDto};
pub use runs::{CreateRunResponseDto, NodeExecutionDto, RunDetailDto, RunDto};
pub use system::{HealthDto, RuntimeMetricsDto, SystemInfoDto};
pub use tools::ToolDto;
pub use ui::{LayoutSummaryDto, UIContributionDto};
pub use workflows::{
    WorkflowDto, WorkflowEdgeDto, WorkflowNodeDto, WorkflowNodeInputDto, WorkflowOutputBindingDto,
    WorkflowPortDto, WorkflowStageDto,
};

#[cfg(test)]
mod export_tests {
    use super::*;
    use ts_rs::TS;

    /// Regenerate every generated TypeScript binding. Run with
    /// `cargo test -p nexus-api export_bindings`.
    #[test]
    fn export_bindings() {
        // Envelope + list response primitives.
        ApiErrorPayloadDto::export_all().unwrap();
        MetaDto::export_all().unwrap();
        // Parameterized over () so the generic type surfaces in the generated
        // `ListResponseDto.ts` independently of any concrete item type.
        ListResponseDto::<ApiErrorPayloadDto>::export_all().unwrap();
        ApiEnvelope::<ApiErrorPayloadDto>::export_all().unwrap();

        // Domain DTOs (ts-rs walks dependencies automatically).
        ArtifactDto::export_all().unwrap();
        ArtifactLineageDto::export_all().unwrap();
        LineageEdgeDto::export_all().unwrap();

        ExtensionDto::export_all().unwrap();
        OperatorDto::export_all().unwrap();
        PortSpecDto::export_all().unwrap();
        RefreshReportDto::export_all().unwrap();
        EnableExtensionResponseDto::export_all().unwrap();

        RecipeDto::export_all().unwrap();
        RecipeFieldBindingDto::export_all().unwrap();

        RunDto::export_all().unwrap();
        RunDetailDto::export_all().unwrap();
        NodeExecutionDto::export_all().unwrap();
        CreateRunResponseDto::export_all().unwrap();

        HealthDto::export_all().unwrap();
        RuntimeMetricsDto::export_all().unwrap();
        SystemInfoDto::export_all().unwrap();
        ToolDto::export_all().unwrap();
        LayoutSummaryDto::export_all().unwrap();
        UIContributionDto::export_all().unwrap();

        WorkflowDto::export_all().unwrap();
        WorkflowStageDto::export_all().unwrap();
        WorkflowNodeDto::export_all().unwrap();
        WorkflowNodeInputDto::export_all().unwrap();
        WorkflowEdgeDto::export_all().unwrap();
        WorkflowPortDto::export_all().unwrap();
        WorkflowOutputBindingDto::export_all().unwrap();
    }
}
