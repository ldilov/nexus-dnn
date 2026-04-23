//! Integration tests for the NDJSON framer (T022).

use nexus_backend_runtimes::generic::leases::LeaseError;
use nexus_backend_runtimes::generic::leases::framer::{
    IncomingFrame, MAX_FRAME_BYTES, RpcRequest, RpcResponse, read_frame, write_frame, write_request,
};
use serde_json::json;
use tokio::io::BufReader;

#[tokio::test]
async fn roundtrips_arbitrary_request_response_pair() {
    let req = RpcRequest::new(42, "synthesize", json!({"text": "hello"}));
    let mut out = Vec::<u8>::new();
    write_request(&mut out, &req).await.unwrap();

    // Wire contains a single newline-terminated frame.
    assert!(out.ends_with(b"\n"));
    let line = std::str::from_utf8(&out[..out.len() - 1]).unwrap();
    let parsed: serde_json::Value = serde_json::from_str(line).unwrap();
    assert_eq!(parsed["jsonrpc"], "2.0");
    assert_eq!(parsed["id"], 42);
    assert_eq!(parsed["method"], "synthesize");
    assert_eq!(parsed["params"]["text"], "hello");
}

#[tokio::test]
async fn reads_response_frame() {
    let resp = json!({
        "jsonrpc": "2.0",
        "id": 7,
        "result": {"ok": true}
    });
    let mut buf = serde_json::to_vec(&resp).unwrap();
    buf.push(b'\n');

    let mut reader = BufReader::new(&buf[..]);
    let frame = read_frame(&mut reader).await.unwrap().unwrap();
    match frame {
        IncomingFrame::Response(RpcResponse {
            id, result, error, ..
        }) => {
            assert_eq!(id, 7);
            assert_eq!(result, Some(json!({"ok": true})));
            assert!(error.is_none());
        }
        other => panic!("expected Response, got {other:?}"),
    }
}

#[tokio::test]
async fn reads_notification_frame_without_id() {
    let notif = json!({
        "jsonrpc": "2.0",
        "method": "progress",
        "params": {"pct": 0.5}
    });
    let mut buf = serde_json::to_vec(&notif).unwrap();
    buf.push(b'\n');

    let mut reader = BufReader::new(&buf[..]);
    let frame = read_frame(&mut reader).await.unwrap().unwrap();
    match frame {
        IncomingFrame::Notification(n) => {
            assert_eq!(n.method, "progress");
            assert_eq!(n.params["pct"], 0.5);
        }
        other => panic!("expected Notification, got {other:?}"),
    }
}

#[tokio::test]
async fn reads_notification_with_missing_params_defaults_to_null() {
    let mut buf = br#"{"jsonrpc":"2.0","method":"heartbeat"}"#.to_vec();
    buf.push(b'\n');

    let mut reader = BufReader::new(&buf[..]);
    let frame = read_frame(&mut reader).await.unwrap().unwrap();
    match frame {
        IncomingFrame::Notification(n) => {
            assert_eq!(n.method, "heartbeat");
            assert!(n.params.is_null());
        }
        other => panic!("expected Notification, got {other:?}"),
    }
}

#[tokio::test]
async fn reads_multiple_frames_back_to_back() {
    let mut buf = Vec::new();
    buf.extend_from_slice(br#"{"jsonrpc":"2.0","id":1,"result":"a"}"#);
    buf.push(b'\n');
    buf.extend_from_slice(br#"{"jsonrpc":"2.0","method":"log","params":"b"}"#);
    buf.push(b'\n');

    let mut reader = BufReader::new(&buf[..]);
    let f1 = read_frame(&mut reader).await.unwrap().unwrap();
    let f2 = read_frame(&mut reader).await.unwrap().unwrap();
    assert!(matches!(f1, IncomingFrame::Response(_)));
    assert!(matches!(f2, IncomingFrame::Notification(_)));
}

#[tokio::test]
async fn malformed_json_yields_parse_error_variant() {
    let mut buf = b"{this is not json}".to_vec();
    buf.push(b'\n');

    let mut reader = BufReader::new(&buf[..]);
    let frame = read_frame(&mut reader).await.unwrap().unwrap();
    assert!(matches!(frame, IncomingFrame::ParseError(_)));
}

#[tokio::test]
async fn eof_with_empty_buffer_returns_none() {
    let buf: &[u8] = &[];
    let mut reader = BufReader::new(buf);
    let frame = read_frame(&mut reader).await.unwrap();
    assert!(frame.is_none());
}

#[tokio::test]
async fn oversize_frame_at_boundary_is_rejected() {
    // Build a frame just over the 8 MB cap. Use a blob of filler bytes and
    // wrap it in an otherwise valid notification params.
    let payload_size = MAX_FRAME_BYTES + 10;
    let filler = "x".repeat(payload_size);
    let frame = format!(r#"{{"jsonrpc":"2.0","method":"x","params":"{filler}"}}"#);
    let mut buf = frame.into_bytes();
    buf.push(b'\n');
    // Append a follow-up valid frame to prove the reader resyncs after
    // draining the oversize one.
    buf.extend_from_slice(br#"{"jsonrpc":"2.0","method":"post","params":null}"#);
    buf.push(b'\n');

    let mut reader = BufReader::new(&buf[..]);
    let err = read_frame(&mut reader).await.unwrap_err();
    assert!(matches!(err, LeaseError::PayloadTooLarge));

    // Next read pulls the follow-up frame cleanly.
    let next = read_frame(&mut reader).await.unwrap().unwrap();
    match next {
        IncomingFrame::Notification(n) => assert_eq!(n.method, "post"),
        other => panic!("expected follow-up Notification, got {other:?}"),
    }
}

#[tokio::test]
async fn write_frame_rejects_oversize_payload_before_io() {
    // Construct a value whose serialized form exceeds the cap.
    let big_string = "a".repeat(MAX_FRAME_BYTES);
    let val = json!({ "payload": big_string });
    let mut out = Vec::<u8>::new();
    let err = write_frame(&mut out, &val).await.unwrap_err();
    assert!(matches!(err, LeaseError::PayloadTooLarge));
    assert!(out.is_empty(), "writer should be untouched on oversize");
}
