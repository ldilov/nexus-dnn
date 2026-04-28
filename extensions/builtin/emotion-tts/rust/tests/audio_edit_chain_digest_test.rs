use emotion_tts_extension::domain::{ChainDigest, EditChain, EditOp, OperationId};

fn op_trim(start: u32, end: u32) -> EditOp {
    EditOp::Trim {
        id: OperationId::new(),
        start_ms: start,
        end_ms: end,
    }
}

fn op_normalize(target: f32) -> EditOp {
    EditOp::Normalize {
        id: OperationId::new(),
        target_lufs: target,
    }
}

#[test]
fn same_ops_same_order_yields_same_digest() {
    let id1 = OperationId::new();
    let id2 = OperationId::new();
    let chain_a = EditChain {
        version: 1,
        ops: vec![
            EditOp::Trim {
                id: id1.clone(),
                start_ms: 100,
                end_ms: 5_000,
            },
            EditOp::Normalize {
                id: id2.clone(),
                target_lufs: -16.0,
            },
        ],
    };
    let chain_b = EditChain {
        version: 1,
        ops: vec![
            EditOp::Trim {
                id: id1,
                start_ms: 100,
                end_ms: 5_000,
            },
            EditOp::Normalize {
                id: id2,
                target_lufs: -16.0,
            },
        ],
    };
    assert_eq!(ChainDigest::of(&chain_a), ChainDigest::of(&chain_b));
}

#[test]
fn reordering_ops_changes_digest() {
    let trim = op_trim(100, 5_000);
    let normalize = op_normalize(-16.0);
    let chain_a = EditChain {
        version: 1,
        ops: vec![trim.clone(), normalize.clone()],
    };
    let chain_b = EditChain {
        version: 1,
        ops: vec![normalize, trim],
    };
    assert_ne!(ChainDigest::of(&chain_a), ChainDigest::of(&chain_b));
}

#[test]
fn empty_chain_yields_empty_constant() {
    let empty = EditChain {
        version: 1,
        ops: vec![],
    };
    assert_eq!(ChainDigest::of(&empty), ChainDigest::EMPTY);
}

#[test]
fn unsupported_version_rejected_by_validate() {
    let chain = EditChain {
        version: 2,
        ops: vec![],
    };
    let err = chain.validate().expect_err("v2 must be rejected");
    let msg = err.to_string();
    assert!(msg.contains("validation"), "unexpected error: {msg}");
}

#[test]
fn different_operation_id_changes_digest() {
    let chain_a = EditChain {
        version: 1,
        ops: vec![EditOp::Trim {
            id: OperationId::new(),
            start_ms: 0,
            end_ms: 1_000,
        }],
    };
    let chain_b = EditChain {
        version: 1,
        ops: vec![EditOp::Trim {
            id: OperationId::new(),
            start_ms: 0,
            end_ms: 1_000,
        }],
    };
    assert_ne!(ChainDigest::of(&chain_a), ChainDigest::of(&chain_b));
}
