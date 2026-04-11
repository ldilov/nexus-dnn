use std::sync::atomic::{AtomicU64, Ordering};

use tokio::io::{AsyncBufReadExt, AsyncWriteExt, BufReader, BufWriter};
use tokio::process::{ChildStdin, ChildStdout};
use tokio::sync::Mutex;

use crate::error::ProtocolError;
use crate::messages::{RpcMessage, RpcNotification, RpcRequest, RpcResponse};
use crate::transport::Transport;

pub struct StdioTransport {
    writer: Mutex<BufWriter<ChildStdin>>,
    reader: Mutex<BufReader<ChildStdout>>,
    request_counter: AtomicU64,
}

impl StdioTransport {
    pub fn new(stdin: ChildStdin, stdout: ChildStdout) -> Self {
        Self {
            writer: Mutex::new(BufWriter::new(stdin)),
            reader: Mutex::new(BufReader::new(stdout)),
            request_counter: AtomicU64::new(0),
        }
    }

    pub fn next_request_id(&self) -> u64 {
        self.request_counter.fetch_add(1, Ordering::Relaxed)
    }

    async fn write_line(&self, json: &str) -> Result<(), ProtocolError> {
        let mut writer = self.writer.lock().await;
        writer
            .write_all(json.as_bytes())
            .await
            .map_err(|e| ProtocolError::Transport(e.to_string()))?;
        writer
            .write_all(b"\n")
            .await
            .map_err(|e| ProtocolError::Transport(e.to_string()))?;
        writer
            .flush()
            .await
            .map_err(|e| ProtocolError::Transport(e.to_string()))
    }

    async fn read_line(&self) -> Result<String, ProtocolError> {
        let mut reader = self.reader.lock().await;
        let mut line = String::new();
        let bytes_read = reader
            .read_line(&mut line)
            .await
            .map_err(|e| ProtocolError::Transport(e.to_string()))?;
        if bytes_read == 0 {
            return Err(ProtocolError::ConnectionClosed);
        }
        Ok(line)
    }
}

impl Transport for StdioTransport {
    type Error = ProtocolError;

    async fn send_request(&self, request: &RpcRequest) -> Result<RpcResponse, Self::Error> {
        let json = serde_json::to_string(request)?;
        self.write_line(&json).await?;

        loop {
            let line = self.read_line().await?;
            let message: RpcMessage = serde_json::from_str(line.trim())?;
            match message {
                RpcMessage::Response(response) if response.id == request.id => {
                    return Ok(response);
                }
                RpcMessage::Response(response) => {
                    return Err(ProtocolError::UnexpectedResponse {
                        request_id: response.id,
                    });
                }
                RpcMessage::Notification(_) => continue,
                RpcMessage::Request(_) => continue,
            }
        }
    }

    async fn send_notification(&self, notification: &RpcNotification) -> Result<(), Self::Error> {
        let json = serde_json::to_string(notification)?;
        self.write_line(&json).await
    }

    async fn receive_message(&self) -> Result<RpcMessage, Self::Error> {
        let line = self.read_line().await?;
        let message: RpcMessage = serde_json::from_str(line.trim())?;
        Ok(message)
    }

    async fn close(&self) -> Result<(), Self::Error> {
        let mut writer = self.writer.lock().await;
        writer
            .shutdown()
            .await
            .map_err(|e| ProtocolError::Transport(e.to_string()))
    }
}
