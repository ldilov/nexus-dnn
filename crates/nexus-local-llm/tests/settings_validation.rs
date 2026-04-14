use nexus_local_llm::error::SettingsError;
use nexus_local_llm::settings::{PortMode, RuntimeSettings};

fn valid() -> RuntimeSettings {
    RuntimeSettings::llamacpp_defaults()
}

#[test]
fn defaults_validate() {
    assert!(valid().validate().is_ok());
}

#[test]
fn fixed_port_required_when_mode_fixed() {
    let mut s = valid();
    s.port_mode = PortMode::Fixed;
    s.fixed_port = None;
    assert!(matches!(s.validate(), Err(SettingsError::Invalid(_))));
}

#[test]
fn fixed_port_range_enforced() {
    let mut s = valid();
    s.port_mode = PortMode::Fixed;
    s.fixed_port = Some(0);
    assert!(s.validate().is_err());
}

#[test]
fn managed_flag_conflict_rejected() {
    let mut s = valid();
    s.extra_args = vec!["--threads".into(), "16".into()];
    assert!(matches!(
        s.validate(),
        Err(SettingsError::ConflictWithManagedFlag(_))
    ));
}

#[test]
fn model_bound_flag_rejected() {
    let mut s = valid();
    s.extra_args = vec!["--n-gpu-layers=35".into()];
    let err = s.validate().unwrap_err();
    assert!(matches!(err, SettingsError::ConflictWithManagedFlag(ref f) if f == "--n-gpu-layers"));
}

#[test]
fn thread_range_enforced() {
    let mut s = valid();
    s.threads = 0;
    assert!(s.validate().is_err());
    s.threads = 2048;
    assert!(s.validate().is_err());
}
