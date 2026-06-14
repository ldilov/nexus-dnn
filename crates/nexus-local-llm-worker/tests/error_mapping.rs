use nexus_local_llm_worker::errors::WorkerError;

#[test]
fn stable_codes_cover_all_worker_error_variants() {
    use WorkerError::*;
    let cases = [
        BackendUnavailable { reason: "x".into() },
        BackendBusy,
        ModelMissing {
            model_id: "m".into(),
        },
        ModelMetadataIncomplete { field: "f".into() },
        RuntimeMissing {
            install_id: "r".into(),
        },
        IncompatibleRuntime {
            format: "GGUF".into(),
        },
        Cancelled,
        CapabilityUnavailable {
            capability: "embeddings".into(),
        },
        CorpusNotFound {
            corpus_id: "c".into(),
        },
        PoolSlotNotFound { key: "k".into() },
        RestartDenied {
            key: "k".into(),
            reason: "r".into(),
        },
        LeaseNotFound {
            lease_id: "l".into(),
        },
        LeaseAcquireTimeout {
            install_id: "r".into(),
        },
        HostProtocolError("oops".into()),
    ];
    for e in &cases {
        let code = e.stable_code();
        assert!(!code.is_empty(), "stable_code must not be empty");
        let _retry = e.retry_safe();
    }
}

#[test]
fn retry_safe_partitions_as_expected() {
    use WorkerError::*;
    assert!(BackendUnavailable { reason: "x".into() }.retry_safe());
    assert!(BackendBusy.retry_safe());
    assert!(Cancelled.retry_safe());
    assert!(
        LeaseAcquireTimeout {
            install_id: "x".into()
        }
        .retry_safe()
    );

    assert!(
        !ModelMissing {
            model_id: "x".into()
        }
        .retry_safe()
    );
    assert!(
        !RuntimeMissing {
            install_id: "x".into()
        }
        .retry_safe()
    );
    assert!(
        !CapabilityUnavailable {
            capability: "x".into()
        }
        .retry_safe()
    );
    assert!(!IncompatibleRuntime { format: "x".into() }.retry_safe());
}
