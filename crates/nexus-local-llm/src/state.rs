use serde::{Deserialize, Serialize};

use crate::diagnostics::FailureCategory;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum RuntimeCardState {
    Unsupported,
    NotInstalled,
    Installing,
    InstalledUnvalidated,
    Ready,
    Broken,
    Updating,
}

#[derive(Debug, Clone)]
pub enum RuntimeCardEvent {
    InstallStarted,
    InstallCompleted,
    InstallCancelled,
    InstallFailed(FailureCategory),
    ValidateStarted,
    ValidatePassed,
    ValidateFailed(FailureCategory),
    RepairStarted,
    MachineUnsupported,
    AdapterUnavailable,
}

pub fn transition(state: RuntimeCardState, event: &RuntimeCardEvent) -> RuntimeCardState {
    use RuntimeCardEvent as E;
    use RuntimeCardState as S;
    match (state, event) {
        (_, E::MachineUnsupported) | (_, E::AdapterUnavailable) => S::Unsupported,
        (S::NotInstalled, E::InstallStarted) => S::Installing,
        (S::Installing, E::InstallCompleted) => S::InstalledUnvalidated,
        (S::Installing, E::InstallCancelled) => S::NotInstalled,
        (S::Installing, E::InstallFailed(_)) => S::NotInstalled,
        (S::InstalledUnvalidated, E::ValidateStarted) => S::InstalledUnvalidated,
        (S::InstalledUnvalidated, E::ValidatePassed) => S::Ready,
        (S::InstalledUnvalidated, E::ValidateFailed(_)) => S::Broken,
        (S::Ready, E::ValidateStarted) => S::Ready,
        (S::Ready, E::ValidateFailed(_)) => S::Broken,
        (S::Ready, E::ValidatePassed) => S::Ready,
        (S::Ready, E::RepairStarted) => S::Updating,
        (S::Broken, E::RepairStarted) => S::Updating,
        (S::Broken, E::ValidateStarted) => S::Broken,
        (S::Broken, E::ValidatePassed) => S::Ready,
        (S::Updating, E::InstallCompleted) => S::InstalledUnvalidated,
        (S::Updating, E::InstallFailed(_)) => S::Broken,
        (S::Updating, E::InstallCancelled) => S::Broken,
        (current, _) => current,
    }
}
