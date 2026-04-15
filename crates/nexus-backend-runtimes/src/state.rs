use serde::{Deserialize, Serialize};

use crate::error::{BackendRuntimeError, BackendRuntimeResult};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum InstallState {
    Installing,
    Installed,
    NeedsRepair,
    Failed,
}

impl InstallState {
    pub fn as_str(self) -> &'static str {
        match self {
            InstallState::Installing => "installing",
            InstallState::Installed => "installed",
            InstallState::NeedsRepair => "needs_repair",
            InstallState::Failed => "failed",
        }
    }

    pub fn parse(raw: &str) -> BackendRuntimeResult<Self> {
        match raw {
            "installing" => Ok(InstallState::Installing),
            "installed" => Ok(InstallState::Installed),
            "needs_repair" => Ok(InstallState::NeedsRepair),
            "failed" => Ok(InstallState::Failed),
            other => Err(BackendRuntimeError::Internal(format!(
                "unknown install state {other}"
            ))),
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum TransitionTrigger {
    InstallPipeline,
    ReconcilerProbe,
    UserAction,
    Repair,
    Uninstall,
}

impl TransitionTrigger {
    pub fn as_str(self) -> &'static str {
        match self {
            TransitionTrigger::InstallPipeline => "install_pipeline",
            TransitionTrigger::ReconcilerProbe => "reconciler_probe",
            TransitionTrigger::UserAction => "user_action",
            TransitionTrigger::Repair => "repair",
            TransitionTrigger::Uninstall => "uninstall",
        }
    }
}

pub fn transition(
    from: InstallState,
    to: InstallState,
    trigger: TransitionTrigger,
) -> BackendRuntimeResult<()> {
    use InstallState as S;
    use TransitionTrigger as T;
    let ok = matches!(
        (from, to, trigger),
        (S::Installing, S::Installed, T::InstallPipeline)
            | (S::Installing, S::Failed, T::InstallPipeline)
            | (S::Installed, S::NeedsRepair, T::ReconcilerProbe)
            | (S::NeedsRepair, S::Installed, T::Repair)
            | (S::Failed, S::Installing, T::UserAction)
            | (S::NeedsRepair, S::Installing, T::Repair)
    );
    if ok {
        Ok(())
    } else {
        Err(BackendRuntimeError::IllegalTransition {
            from: from.as_str().into(),
            to: to.as_str().into(),
        })
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn reconciler_can_mark_needs_repair() {
        assert!(
            transition(
                InstallState::Installed,
                InstallState::NeedsRepair,
                TransitionTrigger::ReconcilerProbe,
            )
            .is_ok()
        );
    }

    #[test]
    fn reconciler_cannot_demote_to_installing() {
        assert!(matches!(
            transition(
                InstallState::Installed,
                InstallState::Installing,
                TransitionTrigger::ReconcilerProbe,
            ),
            Err(BackendRuntimeError::IllegalTransition { .. })
        ));
    }

    #[test]
    fn needs_repair_recovers_via_repair_trigger() {
        assert!(
            transition(
                InstallState::NeedsRepair,
                InstallState::Installed,
                TransitionTrigger::Repair,
            )
            .is_ok()
        );
    }

    #[test]
    fn install_pipeline_owns_installing_to_installed() {
        assert!(
            transition(
                InstallState::Installing,
                InstallState::Installed,
                TransitionTrigger::InstallPipeline,
            )
            .is_ok()
        );
    }

    #[test]
    fn reject_installed_to_failed_from_reconciler() {
        assert!(
            transition(
                InstallState::Installed,
                InstallState::Failed,
                TransitionTrigger::ReconcilerProbe,
            )
            .is_err()
        );
    }
}

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

pub fn card_transition(state: RuntimeCardState, event: &RuntimeCardEvent) -> RuntimeCardState {
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
