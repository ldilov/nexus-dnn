use super::*;
use crate::parameter_catalog::llamacpp_catalog;

fn req_with_args(args: Vec<String>) -> SpawnRuntimeRequest {
    SpawnRuntimeRequest {
        extension_id: "ext.test".into(),
        family: "llama.cpp".into(),
        version_req: None,
        accelerator: AcceleratorProfile::Cpu,
        args,
        env: BTreeMap::new(),
        port_hint: None,
        bind_mode: RuntimeBindMode::LoopbackOnly,
        install_id: None,
    }
}

#[test]
fn validate_passes_unknown_flag_through() {
    let catalog = llamacpp_catalog().unwrap();
    let req = req_with_args(vec!["--novel-future-flag".into(), "42".into()]);
    assert!(validate_spawn_request(&catalog, &req).is_ok());
}

#[test]
fn validate_rejects_host_injected_port() {
    let catalog = llamacpp_catalog().unwrap();
    let req = req_with_args(vec!["--port".into(), "9999".into()]);
    let err = validate_spawn_request(&catalog, &req).unwrap_err();
    assert!(matches!(
        err,
        BackendRuntimeError::ReservedLaunchSetting { .. }
    ));
}

#[test]
fn validate_rejects_managed_spawn_disallowed() {
    let catalog = llamacpp_catalog().unwrap();
    let req = req_with_args(vec!["--help".into()]);
    let err = validate_spawn_request(&catalog, &req).unwrap_err();
    assert!(matches!(
        err,
        BackendRuntimeError::ManagedSpawnDisallowed { .. }
    ));
}

#[test]
fn allocator_honors_hint_when_free() {
    let alloc = PortAllocator::new(50000, 50010);
    let p = alloc.claim(Some(50005)).unwrap();
    assert_eq!(p, 50005);
    assert!(alloc.is_claimed(50005));
}

#[test]
fn allocator_skips_hint_when_taken_and_picks_next_free() {
    let alloc = PortAllocator::new(50000, 50010);
    alloc.claim(Some(50005));
    let p = alloc.claim(Some(50005)).unwrap();
    assert_ne!(p, 50005);
    assert!((50000..=50010).contains(&p));
}

#[test]
fn allocator_release_makes_port_available() {
    let alloc = PortAllocator::new(50000, 50001);
    let p1 = alloc.claim(None).unwrap();
    let _p2 = alloc.claim(None).unwrap();
    assert!(alloc.claim(None).is_none(), "range exhausted");
    alloc.release(p1);
    assert_eq!(alloc.claim(Some(p1)).unwrap(), p1);
}

#[test]
fn host_env_forces_loopback_host_when_loopback_only() {
    let base = BTreeMap::from([("BASE".into(), "1".into())]);
    let ext = BTreeMap::from([
        ("CUSTOM".into(), "user".into()),
        ("LLAMA_ARG_HOST".into(), "0.0.0.0".into()),
        ("LLAMA_ARG_PORT".into(), "9".into()),
        ("LLAMA_ARG_LOG_FORMAT".into(), "text".into()),
    ]);
    let merged = build_host_env(&base, &ext, RuntimeBindMode::LoopbackOnly, 9123);
    assert_eq!(merged.get("BASE").map(String::as_str), Some("1"));
    assert_eq!(merged.get("CUSTOM").map(String::as_str), Some("user"));
    assert_eq!(
        merged.get("LLAMA_ARG_HOST").map(String::as_str),
        Some("127.0.0.1"),
        "host must override extension attempt",
    );
    assert_eq!(
        merged.get("LLAMA_ARG_PORT").map(String::as_str),
        Some("9123"),
    );
    assert_eq!(
        merged.get("LLAMA_ARG_LOG_FORMAT").map(String::as_str),
        Some("json"),
    );
}

#[test]
fn host_env_uses_any_host_when_bind_mode_is_any() {
    let merged = build_host_env(
        &BTreeMap::new(),
        &BTreeMap::new(),
        RuntimeBindMode::Any,
        7000,
    );
    assert_eq!(
        merged.get("LLAMA_ARG_HOST").map(String::as_str),
        Some("0.0.0.0"),
    );
}

#[test]
fn http_status_maps_each_error_variant() {
    let (status, code, _) = http_status_for(&BackendRuntimeError::ReservedLaunchSetting {
        flag: "--port".into(),
    });
    assert_eq!(status, 422);
    assert_eq!(code, "RESERVED_LAUNCH_SETTING");

    let (status, code, _) = http_status_for(&BackendRuntimeError::ManagedSpawnDisallowed {
        flag: "--help".into(),
    });
    assert_eq!(status, 422);
    assert_eq!(code, "MANAGED_SPAWN_DISALLOWED");

    let (status, code, _) = http_status_for(&BackendRuntimeError::FamilyUnavailable {
        family: "foo".into(),
        reason: "no adapter".into(),
    });
    assert_eq!(status, 404);
    assert_eq!(code, "FAMILY_UNAVAILABLE");

    let (status, code, _) =
        http_status_for(&BackendRuntimeError::RuntimeNeedsRepair("ri_x".into()));
    assert_eq!(status, 409);
    assert_eq!(code, "RUNTIME_NEEDS_REPAIR");
}
