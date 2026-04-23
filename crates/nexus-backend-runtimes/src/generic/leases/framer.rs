//! NDJSON framer for the stdio transport.
//!
//! Each frame is a single JSON object terminated by `\n`. The worker
//! subprocess reads from its stdin one line at a time and writes responses
//! one line at a time to its stdout. Per FR-045 the framer enforces an
//! 8 MB per-frame cap — oversize frames return [`LeaseError::PayloadTooLarge`]
//! rather than allocate unbounded.
//!
//! The framer is transport-agnostic: it operates on any
//! [`AsyncBufRead`] + [`AsyncWrite`] pair, so a future named-pipe or
//! WebSocket transport can reuse it unchanged.

use serde::{Deserialize, Serialize};
use serde_json::Value;
use tokio::io::{AsyncBufReadExt, AsyncWrite, AsyncWriteExt};

use super::LeaseNotification;
use super::error::LeaseError;

/// Per-frame byte cap (FR-045). Chosen to be generous enough for chunked
/// audio/log payloads without allowing runaway memory under malformed input.
pub const MAX_FRAME_BYTES: usize = 8 * 1024 * 1024;

/// JSON-RPC 2.0 request envelope. Always pairs with a [`RpcResponse`].
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RpcRequest {
    pub jsonrpc: String,
    pub id: u64,
    pub method: String,
    #[serde(default)]
    pub params: Value,
}

impl RpcRequest {
    pub fn new(id: u64, method: impl Into<String>, params: Value) -> Self {
        Self {
            jsonrpc: "2.0".into(),
            id,
            method: method.into(),
            params,
        }
    }
}

/// JSON-RPC 2.0 response. Exactly one of `result` / `error` is populated.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct RpcResponse {
    pub jsonrpc: String,
    pub id: u64,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub result: Option<Value>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub error: Option<RpcError>,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct RpcError {
    pub code: i32,
    pub message: String,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub data: Option<Value>,
}

/// One frame read off the wire, classified by shape. Notifications and
/// responses are the only inbound variants the host cares about (workers
/// don't issue requests to the host in v1).
#[derive(Debug)]
pub enum IncomingFrame {
    Response(RpcResponse),
    Notification(LeaseNotification),
    /// Malformed JSON or a frame that doesn't match any variant.
    ParseError(String),
}

/// Read a single `\n`-terminated frame from `reader`. Returns
/// [`LeaseError::PayloadTooLarge`] if the line exceeds [`MAX_FRAME_BYTES`],
/// or `None` when the peer closes cleanly at a frame boundary.
pub async fn read_frame<R>(reader: &mut R) -> Result<Option<IncomingFrame>, LeaseError>
where
    R: AsyncBufReadExt + Unpin,
{
    let mut buf = Vec::<u8>::with_capacity(256);
    loop {
        let chunk = reader
            .fill_buf()
            .await
            .map_err(|e| LeaseError::Internal(format!("read: {e}")))?;
        if chunk.is_empty() {
            if buf.is_empty() {
                return Ok(None);
            }
            return Ok(Some(IncomingFrame::ParseError(
                "unexpected EOF mid-frame".into(),
            )));
        }
        let remaining = MAX_FRAME_BYTES.saturating_sub(buf.len());
        let scan_len = chunk.len().min(remaining.saturating_add(1));
        if let Some(pos) = chunk[..scan_len].iter().position(|&b| b == b'\n') {
            buf.extend_from_slice(&chunk[..pos]);
            reader.consume(pos + 1);
            break;
        }
        let absorbable = chunk.len().min(remaining);
        buf.extend_from_slice(&chunk[..absorbable]);
        reader.consume(absorbable);
        if buf.len() >= MAX_FRAME_BYTES {
            drain_until_newline(reader).await?;
            return Err(LeaseError::PayloadTooLarge);
        }
    }

    classify(&buf)
        .map(Some)
        .or_else(|e| Ok(Some(IncomingFrame::ParseError(e))))
}

/// Discard bytes up to and including the next newline. Used to resync after
/// an oversize frame so subsequent reads don't inherit garbage.
async fn drain_until_newline<R>(reader: &mut R) -> Result<(), LeaseError>
where
    R: AsyncBufReadExt + Unpin,
{
    loop {
        let chunk = reader
            .fill_buf()
            .await
            .map_err(|e| LeaseError::Internal(format!("drain: {e}")))?;
        if chunk.is_empty() {
            return Ok(());
        }
        if let Some(pos) = chunk.iter().position(|&b| b == b'\n') {
            reader.consume(pos + 1);
            return Ok(());
        }
        let n = chunk.len();
        reader.consume(n);
    }
}

fn classify(bytes: &[u8]) -> Result<IncomingFrame, String> {
    let value: Value = serde_json::from_slice(bytes).map_err(|e| format!("parse: {e}"))?;
    let obj = value
        .as_object()
        .ok_or_else(|| "frame is not a JSON object".to_string())?;

    let has_id = obj.contains_key("id");
    let has_method = obj.contains_key("method");

    if has_id {
        let resp: RpcResponse =
            serde_json::from_value(value.clone()).map_err(|e| format!("response decode: {e}"))?;
        return Ok(IncomingFrame::Response(resp));
    }
    if has_method {
        let method = obj
            .get("method")
            .and_then(|v| v.as_str())
            .ok_or_else(|| "notification method missing".to_string())?
            .to_string();
        let params = obj.get("params").cloned().unwrap_or(Value::Null);
        return Ok(IncomingFrame::Notification(LeaseNotification {
            method,
            params,
        }));
    }
    Err("frame is neither request/response nor notification".into())
}

/// Serialize `value` to a single line and write it followed by `\n` + flush.
/// Enforces [`MAX_FRAME_BYTES`] before touching the writer.
pub async fn write_frame<W>(writer: &mut W, value: &Value) -> Result<(), LeaseError>
where
    W: AsyncWrite + Unpin,
{
    let line = serde_json::to_vec(value)?;
    if line.len().saturating_add(1) > MAX_FRAME_BYTES {
        return Err(LeaseError::PayloadTooLarge);
    }
    writer
        .write_all(&line)
        .await
        .map_err(|e| LeaseError::Internal(format!("write: {e}")))?;
    writer
        .write_all(b"\n")
        .await
        .map_err(|e| LeaseError::Internal(format!("write newline: {e}")))?;
    writer
        .flush()
        .await
        .map_err(|e| LeaseError::Internal(format!("flush: {e}")))?;
    Ok(())
}

/// Convenience: encode a request and hand off to [`write_frame`].
pub async fn write_request<W>(writer: &mut W, req: &RpcRequest) -> Result<(), LeaseError>
where
    W: AsyncWrite + Unpin,
{
    let v = serde_json::to_value(req)?;
    write_frame(writer, &v).await
}
