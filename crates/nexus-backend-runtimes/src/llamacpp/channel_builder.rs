//! llama-server channel descriptor builder (spec 011 US3 T065).
//!
//! Produces the `RuntimeChannelDescriptor` advertised on every llama-server
//! lease: HTTP/TCP transport, OpenAI + native llama-server dialects, the
//! `/health` readiness endpoint, and an optional `/metrics` endpoint when
//! the host enabled metrics for this lease. `ready` starts `false` and is
//! flipped by the readiness probe in `Spawner`.

use crate::channel::{
    ApiDialect, ChannelBuildCtx, RuntimeAddress, RuntimeChannelDescriptor, RuntimeChannelKind,
    RuntimeEndpoint,
};

pub fn build(ctx: &ChannelBuildCtx) -> RuntimeChannelDescriptor {
    RuntimeChannelDescriptor {
        kind: RuntimeChannelKind::HttpTcp,
        api_dialects: vec![ApiDialect::OpenAiCompatible, ApiDialect::NativeLlamaServer],
        address: RuntimeAddress::Tcp {
            host: ctx.bind_host.clone(),
            port: ctx.port,
        },
        health: Some(RuntimeEndpoint::path("/health")),
        metrics: ctx.metrics_enabled.then(|| RuntimeEndpoint::path("/metrics")),
        ready: false,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn descriptor_advertises_http_openai_native_health_not_ready() {
        let desc = build(&ChannelBuildCtx {
            bind_host: "127.0.0.1".into(),
            port: 51234,
            metrics_enabled: false,
        });
        assert!(matches!(desc.kind, RuntimeChannelKind::HttpTcp));
        assert_eq!(desc.api_dialects.len(), 2);
        assert!(matches!(
            desc.api_dialects[0],
            ApiDialect::OpenAiCompatible
        ));
        assert!(matches!(
            desc.api_dialects[1],
            ApiDialect::NativeLlamaServer
        ));
        match &desc.address {
            RuntimeAddress::Tcp { host, port } => {
                assert_eq!(host, "127.0.0.1");
                assert_eq!(*port, 51234);
            }
            _ => panic!("expected Tcp address"),
        }
        assert_eq!(desc.health.as_ref().unwrap().path, "/health");
        assert!(desc.metrics.is_none());
        assert!(!desc.ready, "channel must start un-ready");
    }

    #[test]
    fn metrics_endpoint_advertised_when_host_enables_it() {
        let desc = build(&ChannelBuildCtx {
            bind_host: "127.0.0.1".into(),
            port: 51234,
            metrics_enabled: true,
        });
        assert_eq!(desc.metrics.as_ref().unwrap().path, "/metrics");
    }
}
