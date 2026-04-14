use nexus_local_llm::launch_spec::generate;
use nexus_local_llm::settings::{PortMode, RuntimeSettings};

fn base() -> RuntimeSettings {
    RuntimeSettings {
        backend: "llama.cpp".into(),
        install_ref: None,
        threads: 12,
        threads_batch: 12,
        default_context: 8192,
        parallel_requests: 2,
        bind_address: "127.0.0.1".into(),
        port_mode: PortMode::Auto,
        fixed_port: None,
        extra_args: vec![],
    }
}

#[test]
fn deterministic_arg_order_auto_port() {
    let s = base();
    let a = generate(&s, 43127, "/bin/llama-server");
    let b = generate(&s, 43127, "/bin/llama-server");
    assert_eq!(a, b);
    assert_eq!(
        a.args,
        vec![
            "--host", "127.0.0.1", "--port", "43127", "--threads", "12", "--threads-batch", "12",
            "--ctx-size", "8192", "--parallel", "2"
        ]
    );
}

#[test]
fn fixed_port_overrides_effective() {
    let mut s = base();
    s.port_mode = PortMode::Fixed;
    s.fixed_port = Some(9090);
    let spec = generate(&s, 12345, "/bin/llama-server");
    assert!(spec.args.iter().any(|a| a == "9090"));
    assert!(!spec.args.iter().any(|a| a == "12345"));
}

#[test]
fn extra_args_appended_last() {
    let mut s = base();
    s.extra_args = vec!["--mlock".into(), "--log-disable".into()];
    let spec = generate(&s, 1, "/bin/llama-server");
    let last_two = &spec.args[spec.args.len() - 2..];
    assert_eq!(last_two, ["--mlock", "--log-disable"]);
}
