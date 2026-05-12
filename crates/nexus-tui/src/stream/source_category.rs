//! Source-category classification for events on the unified TUI stream.
//!
//! The classification is generic — dispatch is by `NexusEvent` variant
//! shape only, never by extension identity (Constitution Principle XIII).

use nexus_events::types::NexusEvent;

use crate::stream::severity::Severity;
use crate::stream::significance::Significance;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum SourceCategory {
    Runtime,
    Worker,
    Deploy,
    Extension,
    Run,
    Host,
    Storage,
    Model,
    Backend,
    Other,
}

pub fn category_glyph(category: SourceCategory) -> char {
    match category {
        SourceCategory::Runtime => '⚙',
        SourceCategory::Worker => '◈',
        SourceCategory::Deploy => '▣',
        SourceCategory::Extension => '⊞',
        SourceCategory::Run => '▶',
        SourceCategory::Host => '●',
        SourceCategory::Storage => '▦',
        SourceCategory::Model => '◊',
        SourceCategory::Backend => '◧',
        SourceCategory::Other => '▢',
    }
}

/// ASCII fallback for `--no-glyphs` (FR-008a) on terminals that cannot
/// render the Unicode source-category glyphs above. Each ASCII proxy is
/// chosen to be visually distinguishable from its neighbours within the
/// 16-character Latin-1 alphabet.
pub fn category_glyph_ascii(category: SourceCategory) -> char {
    match category {
        SourceCategory::Runtime => '*',
        SourceCategory::Worker => '+',
        SourceCategory::Deploy => '#',
        SourceCategory::Extension => 'X',
        SourceCategory::Run => '>',
        SourceCategory::Host => '@',
        SourceCategory::Storage => '=',
        SourceCategory::Model => '~',
        SourceCategory::Backend => '%',
        SourceCategory::Other => '?',
    }
}

pub fn classify_nexus_event(event: &NexusEvent) -> SourceCategory {
    use NexusEvent::*;
    match event {
        WorkflowUpdated { .. }
        | RunCreated { .. }
        | RunStateChanged { .. }
        | NodeScheduled { .. }
        | NodeStarted { .. }
        | NodeProgress { .. }
        | NodeCompleted { .. }
        | NodeFailed { .. }
        | ArtifactProduced { .. } => SourceCategory::Run,

        WorkerStarted { .. } | WorkerHealthChanged { .. } => SourceCategory::Worker,

        ExtensionDiscovered { .. }
        | ExtensionValidated { .. }
        | ExtensionActivated { .. }
        | ExtensionDisabled { .. }
        | ExtensionQuarantined { .. }
        | ModuleInstalled { .. }
        | ExtensionInstallStepStarted { .. }
        | ExtensionInstallStepProgress { .. }
        | ExtensionInstallStepCompleted { .. }
        | ExtensionInstallStepFailed { .. }
        | ExtensionInstallCompleted { .. } => SourceCategory::Extension,

        StorageNamespaceReserved { .. }
        | StorageValidationStarted { .. }
        | StorageValidationFailed { .. }
        | StoragePlanReady { .. }
        | StorageApplyStarted { .. }
        | StorageMigrationApplied { .. }
        | StorageApplyFailed { .. }
        | StorageIntegrityVerified { .. }
        | StorageIntegrityDriftDetected { .. }
        | StorageUninstallStarted { .. }
        | StorageUninstallCompleted { .. } => SourceCategory::Storage,

        DeploymentDeleted { .. } | DeploymentPurged { .. } => SourceCategory::Deploy,

        HostLog { .. } => SourceCategory::Host,
    }
}

pub fn classify_nexus_event_significance(event: &NexusEvent) -> Significance {
    use NexusEvent::*;
    match event {
        NodeProgress { .. } => Significance::Silent,

        StorageValidationStarted { .. }
        | StoragePlanReady { .. }
        | StorageApplyStarted { .. }
        | StorageMigrationApplied { .. }
        | StorageIntegrityVerified { .. }
        | StorageUninstallStarted { .. }
        | ExtensionInstallStepProgress { .. }
        | NodeStarted { .. }
        | NodeCompleted { .. }
        | ArtifactProduced { .. } => Significance::Hum,

        RunCreated { .. }
        | RunStateChanged { .. }
        | NodeScheduled { .. }
        | ExtensionActivated { .. }
        | ExtensionDiscovered { .. }
        | ExtensionValidated { .. }
        | ExtensionDisabled { .. }
        | ModuleInstalled { .. }
        | ExtensionInstallStepStarted { .. }
        | ExtensionInstallStepCompleted { .. }
        | ExtensionInstallCompleted { .. }
        | WorkerStarted { .. }
        | WorkflowUpdated { .. }
        | StorageNamespaceReserved { .. }
        | StorageValidationFailed { .. }
        | StorageApplyFailed { .. }
        | StorageUninstallCompleted { .. } => Significance::Normal,

        NodeFailed { .. }
        | ExtensionQuarantined { .. }
        | ExtensionInstallStepFailed { .. }
        | WorkerHealthChanged { .. }
        | DeploymentDeleted { .. }
        | DeploymentPurged { .. } => Significance::Loud,

        StorageIntegrityDriftDetected { .. } => Significance::Critical,

        HostLog { level, .. } => host_log_significance(level.as_str()),
    }
}

pub fn host_log_significance(level: &str) -> Significance {
    match level.trim().to_ascii_lowercase().as_str() {
        "trace" | "debug" => Significance::Hum,
        "info" => Significance::Normal,
        "warn" | "warning" | "error" | "fatal" => Significance::Loud,
        _ => Significance::Normal,
    }
}

pub fn host_log_severity(level: &str) -> Severity {
    Severity::parse(level).unwrap_or(Severity::Info)
}
