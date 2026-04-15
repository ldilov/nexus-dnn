use std::collections::BTreeMap;

use sqlx::SqlitePool;

use super::port::RuntimeBindMode;

const HOST_GOVERNED_INJECTABLE_FLAGS: &[&str] = &[
    "--api-key",
    "--ssl-cert-file",
    "--ssl-key-file",
    "--media-path",
    "--tools",
    "--webui-mcp-proxy",
];

pub fn build_host_env(
    base_env: &BTreeMap<String, String>,
    extension_env: &BTreeMap<String, String>,
    bind_mode: RuntimeBindMode,
    port: u16,
) -> BTreeMap<String, String> {
    let mut out: BTreeMap<String, String> = base_env.clone();
    out.extend(extension_env.iter().map(|(k, v)| (k.clone(), v.clone())));
    let host = match bind_mode {
        RuntimeBindMode::Loopback | RuntimeBindMode::LoopbackOnly => "127.0.0.1",
        _ => "0.0.0.0",
    };
    out.insert("LLAMA_ARG_HOST".to_string(), host.to_string());
    out.insert("LLAMA_ARG_PORT".to_string(), port.to_string());
    out.insert("LLAMA_ARG_LOG_FORMAT".to_string(), "json".to_string());
    out
}

pub(super) async fn load_host_governed_injections(pool: &SqlitePool, family: &str) -> Vec<String> {
    let settings = match crate::settings_store::load(pool, family).await {
        Ok(Some(s)) => s,
        _ => return Vec::new(),
    };
    let mut out = Vec::new();
    for flag in HOST_GOVERNED_INJECTABLE_FLAGS {
        match crate::reserved_policy::HostPolicy::gate_host_governed(flag, &settings) {
            crate::reserved_policy::HostPolicyDecision::Inject(value) => {
                out.push((*flag).to_string());
                if !value.is_empty() {
                    out.push(value);
                }
            }
            crate::reserved_policy::HostPolicyDecision::Deny => {}
        }
    }
    out
}
