use std::collections::HashMap;
use std::sync::Arc;
use std::sync::atomic::{AtomicU64, Ordering};

use nexus_protocol::messages::{
    INTERNAL_ERROR, RpcError, RpcMessage, RpcNotification, RpcRequest, RpcResponse,
    new_error_response, new_notification, new_request, new_success_response,
};
use serde::Serialize;
use serde::de::DeserializeOwned;
use tokio::io::{AsyncBufReadExt, AsyncWrite, AsyncWriteExt, BufReader};
use tokio::sync::{Mutex, broadcast, oneshot};
use tokio::task::JoinHandle;
use tracing::{debug, error, warn};

use crate::errors::{WorkerError, WorkerResult};

pub type NotificationStream = broadcast::Receiver<RpcNotification>;

pub struct WorkerTransport {
    writer: Mutex<Box<dyn AsyncWrite + Send + Unpin>>,
    pending: Arc<Mutex<HashMap<u64, oneshot::Sender<RpcResponse>>>>,
    incoming_requests: broadcast::Sender<RpcRequest>,
    notifications: broadcast::Sender<RpcNotification>,
    next_id: AtomicU64,
    _reader_task: JoinHandle<()>,
}

impl WorkerTransport {
    pub fn spawn<R, W>(reader: R, writer: W) -> Arc<Self>
    where
        R: tokio::io::AsyncRead + Send + Unpin + 'static,
        W: AsyncWrite + Send + Unpin + 'static,
    {
        let pending: Arc<Mutex<HashMap<u64, oneshot::Sender<RpcResponse>>>> =
            Arc::new(Mutex::new(HashMap::new()));
        let (req_tx, _) = broadcast::channel::<RpcRequest>(128);
        let (notif_tx, _) = broadcast::channel::<RpcNotification>(256);

        let reader_task = tokio::spawn(reader_loop(
            BufReader::new(reader),
            pending.clone(),
            req_tx.clone(),
            notif_tx.clone(),
        ));

        Arc::new(Self {
            writer: Mutex::new(Box::new(writer)),
            pending,
            incoming_requests: req_tx,
            notifications: notif_tx,
            next_id: AtomicU64::new(1),
            _reader_task: reader_task,
        })
    }

    pub fn from_stdio() -> Arc<Self> {
        Self::spawn(tokio::io::stdin(), tokio::io::stdout())
    }

    pub fn subscribe_requests(&self) -> broadcast::Receiver<RpcRequest> {
        self.incoming_requests.subscribe()
    }

    pub fn subscribe_notifications(&self) -> NotificationStream {
        self.notifications.subscribe()
    }

    pub async fn call<Req: Serialize, Resp: DeserializeOwned>(
        &self,
        method: &str,
        params: Req,
    ) -> WorkerResult<Resp> {
        let id = self.next_id.fetch_add(1, Ordering::Relaxed);
        let params_value = serde_json::to_value(params)?;
        let request = new_request(id, method, params_value);

        let (tx, rx) = oneshot::channel();
        {
            let mut pending = self.pending.lock().await;
            pending.insert(id, tx);
        }

        self.write_message(&RpcMessage::Request(request)).await?;

        let response = rx
            .await
            .map_err(|_| WorkerError::HostProtocolError("response channel closed".into()))?;

        if let Some(err) = response.error {
            return Err(WorkerError::HostProtocolError(format!(
                "host returned error {}: {}",
                err.code, err.message
            )));
        }

        let result = response
            .result
            .unwrap_or(serde_json::Value::Null);
        let decoded = serde_json::from_value(result)?;
        Ok(decoded)
    }

    pub async fn notify<P: Serialize>(&self, method: &str, params: P) -> WorkerResult<()> {
        let params_value = serde_json::to_value(params)?;
        let notification = new_notification(method, params_value);
        self.write_message(&RpcMessage::Notification(notification))
            .await
    }

    pub async fn reply_ok<P: Serialize>(&self, id: u64, result: P) -> WorkerResult<()> {
        let value = serde_json::to_value(result)?;
        self.write_message(&RpcMessage::Response(new_success_response(id, value)))
            .await
    }

    pub async fn reply_error(&self, id: u64, code: i32, message: impl Into<String>) -> WorkerResult<()> {
        let response = new_error_response(id, code, message.into());
        self.write_message(&RpcMessage::Response(response)).await
    }

    pub async fn reply_error_with_data(
        &self,
        id: u64,
        code: i32,
        message: impl Into<String>,
        data: serde_json::Value,
    ) -> WorkerResult<()> {
        let mut response = new_error_response(id, code, message.into());
        if let Some(err) = response.error.as_mut() {
            err.data = Some(data);
        }
        self.write_message(&RpcMessage::Response(response)).await
    }

    async fn write_message(&self, message: &RpcMessage) -> WorkerResult<()> {
        let json = serde_json::to_string(message)?;
        let mut writer = self.writer.lock().await;
        writer.write_all(json.as_bytes()).await?;
        writer.write_all(b"\n").await?;
        writer.flush().await?;
        Ok(())
    }
}

async fn reader_loop<R>(
    mut reader: BufReader<R>,
    pending: Arc<Mutex<HashMap<u64, oneshot::Sender<RpcResponse>>>>,
    incoming_requests: broadcast::Sender<RpcRequest>,
    notifications: broadcast::Sender<RpcNotification>,
) where
    R: tokio::io::AsyncRead + Unpin,
{
    let mut line = String::new();
    loop {
        line.clear();
        let bytes_read = match reader.read_line(&mut line).await {
            Ok(0) => {
                debug!("stdin EOF — worker shutting down read loop");
                break;
            }
            Ok(n) => n,
            Err(e) => {
                error!(error = %e, "transport read failed");
                break;
            }
        };
        if bytes_read == 0 {
            break;
        }

        let trimmed = line.trim();
        if trimmed.is_empty() {
            continue;
        }

        let message: RpcMessage = match serde_json::from_str(trimmed) {
            Ok(m) => m,
            Err(e) => {
                warn!(error = %e, line = trimmed, "failed to parse RPC message");
                continue;
            }
        };

        match message {
            RpcMessage::Response(response) => {
                let mut pending_lock = pending.lock().await;
                if let Some(tx) = pending_lock.remove(&response.id) {
                    let _ = tx.send(response);
                } else {
                    warn!(id = response.id, "received response for unknown request id");
                }
            }
            RpcMessage::Request(request) => {
                let _ = incoming_requests.send(request);
            }
            RpcMessage::Notification(notification) => {
                let _ = notifications.send(notification);
            }
        }
    }

    let mut pending_lock = pending.lock().await;
    for (_, tx) in pending_lock.drain() {
        let _ = tx.send(RpcResponse {
            jsonrpc: "2.0".into(),
            id: 0,
            result: None,
            error: Some(RpcError {
                code: INTERNAL_ERROR,
                message: "transport closed".into(),
                data: None,
            }),
        });
    }
}
