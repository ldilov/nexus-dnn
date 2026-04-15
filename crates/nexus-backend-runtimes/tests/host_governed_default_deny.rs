use std::collections::BTreeMap;
use std::time::{Duration, Instant};

use nexus_backend_runtimes::error::BackendRuntimeError;
use nexus_backend_runtimes::parameter_catalog::{ParameterPolicy, llamacpp_catalog};
use nexus_backend_runtimes::reserved_policy::{HostPolicy, HostPolicyDecision};
use nexus_backend_runtimes::settings::{AcceleratorProfile, RuntimeSettings};
use nexus_backend_runtimes::spawn::{RuntimeBindMode, SpawnRuntimeRequest, validate_spawn_request};

fn build_request(flag: &str) -> SpawnRuntimeRequest {
    SpawnRuntimeRequest {
        extension_id: "ext.test".into(),
        family: "llama.cpp".into(),
        version_req: None,
        accelerator: AcceleratorProfile::Cpu,
        args: vec![flag.into(), "value".into()],
        env: BTreeMap::new(),
        port_hint: None,
        bind_mode: RuntimeBindMode::LoopbackOnly,
        install_id: None,
    }
}

#[test]
fn table_driven_denial() {
    let catalog = llamacpp_catalog().expect("catalog loads");
    let flags: Vec<String> = catalog
        .entries
        .iter()
        .filter(|e| e.policy == ParameterPolicy::HostGoverned)
        .flat_map(|e| e.flags.iter().cloned())
        .collect();

    assert!(
        flags.len() >= 5,
        "catalog must declare at least 5 host-governed flags (have {})",
        flags.len()
    );

    for flag in &flags {
        let request = build_request(flag);
        let start = Instant::now();
        let result = validate_spawn_request(&catalog, &request);
        let elapsed = start.elapsed();

        assert!(
            elapsed < Duration::from_millis(50),
            "validate_spawn_request too slow for {flag}: {elapsed:?}"
        );

        match result {
            Err(BackendRuntimeError::HostGovernedDenied { flag: denied }) => {
                assert_eq!(&denied, flag, "denial must name the offending flag");
            }
            other => panic!("expected HostGovernedDenied for {flag}, got {other:?}"),
        }
    }
}

#[test]
fn typed_opt_in_injects_flag() {
    let mut settings = RuntimeSettings::llamacpp_defaults();
    settings.api_key = Some("secret".into());

    let decision = HostPolicy::gate_host_governed("--api-key", &settings);
    assert_eq!(decision, HostPolicyDecision::Inject("secret".into()));

    let unset = RuntimeSettings::llamacpp_defaults();
    assert_eq!(
        HostPolicy::gate_host_governed("--api-key", &unset),
        HostPolicyDecision::Deny
    );

    let mut tls = RuntimeSettings::llamacpp_defaults();
    tls.tls_cert_path = Some(std::path::PathBuf::from("/etc/certs/server.pem"));
    match HostPolicy::gate_host_governed("--ssl-cert-file", &tls) {
        HostPolicyDecision::Inject(v) => assert!(v.contains("server.pem")),
        other => panic!("expected Inject, got {other:?}"),
    }
}

#[tracing_test::traced_test]
#[test]
fn denial_emits_warn_log() {
    let catalog = llamacpp_catalog().expect("catalog loads");
    let request = build_request("--api-key");
    let err = validate_spawn_request(&catalog, &request).unwrap_err();
    assert!(matches!(
        err,
        BackendRuntimeError::HostGovernedDenied { .. }
    ));
    assert!(logs_contain("host_governed_denied"));
    assert!(logs_contain("--api-key"));
}
