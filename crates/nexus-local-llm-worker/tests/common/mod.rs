#![allow(dead_code)]

use std::sync::Arc;
use std::time::Duration;

use nexus_protocol::messages::{
    RpcMessage, RpcNotification, RpcRequest, new_notification, new_success_response,
};
use serde_json::Value;
use tokio::io::{AsyncBufReadExt, AsyncWriteExt, BufReader, DuplexStream, ReadHalf, WriteHalf};
use tokio::sync::{Mutex, mpsc};
use tokio::task::JoinHandle;

use nexus_local_llm_worker::host_rpc::HostClient;
use nexus_local_llm_worker::transport::WorkerTransport;

pub struct FakeHost {
    writer: Mutex<WriteHalf<DuplexStream>>,
    _reader_task: JoinHandle<()>,
    requests: Arc<Mutex<mpsc::UnboundedReceiver<RpcRequest>>>,
}

pub struct HarnessHandles {
    pub worker_transport: Arc<WorkerTransport>,
    pub host_client: HostClient,
    pub fake_host: FakeHost,
}

pub fn spawn_harness() -> HarnessHandles {
    let (worker_side, host_side) = tokio::io::duplex(64 * 1024);
    let (worker_reader, worker_writer) = tokio::io::split(worker_side);
    let (host_reader, host_writer) = tokio::io::split(host_side);

    let worker_transport = WorkerTransport::spawn(worker_reader, worker_writer);
    let host_client = HostClient::new(worker_transport.clone());

    let (req_tx, req_rx) = mpsc::unbounded_channel::<RpcRequest>();
    let reader_task = tokio::spawn(host_reader_loop(host_reader, req_tx));

    HarnessHandles {
        worker_transport,
        host_client,
        fake_host: FakeHost {
            writer: Mutex::new(host_writer),
            _reader_task: reader_task,
            requests: Arc::new(Mutex::new(req_rx)),
        },
    }
}

async fn host_reader_loop(
    reader: ReadHalf<DuplexStream>,
    req_tx: mpsc::UnboundedSender<RpcRequest>,
) {
    let mut buf = BufReader::new(reader);
    let mut line = String::new();
    loop {
        line.clear();
        match buf.read_line(&mut line).await {
            Ok(0) | Err(_) => break,
            Ok(_) => {}
        }
        let trimmed = line.trim();
        if trimmed.is_empty() {
            continue;
        }
        if let Ok(RpcMessage::Request(req)) = serde_json::from_str::<RpcMessage>(trimmed) {
            let _ = req_tx.send(req);
        }
    }
}

impl FakeHost {
    pub async fn expect_call(&self, method: &str, timeout: Duration) -> RpcRequest {
        let mut rx = self.requests.lock().await;
        match tokio::time::timeout(timeout, rx.recv()).await {
            Ok(Some(req)) => {
                if req.method == method {
                    req
                } else {
                    panic!(
                        "expected call {method} but got {} (params={})",
                        req.method, req.params
                    );
                }
            }
            Ok(None) => panic!("channel closed before {method}"),
            Err(_) => panic!("timeout waiting for call {method}"),
        }
    }

    pub async fn try_take_call(&self, timeout: Duration) -> Option<RpcRequest> {
        let mut rx = self.requests.lock().await;
        tokio::time::timeout(timeout, rx.recv())
            .await
            .ok()
            .flatten()
    }

    pub async fn reply_ok(&self, id: u64, result: Value) {
        let resp = new_success_response(id, result);
        self.send_message(&RpcMessage::Response(resp)).await;
    }

    pub async fn push_notification(&self, method: &str, params: Value) {
        let notif: RpcNotification = new_notification(method, params);
        self.send_message(&RpcMessage::Notification(notif)).await;
    }

    async fn send_message(&self, message: &RpcMessage) {
        let json = serde_json::to_string(message).expect("serialize");
        let mut w = self.writer.lock().await;
        w.write_all(json.as_bytes()).await.expect("write");
        w.write_all(b"\n").await.expect("newline");
        w.flush().await.expect("flush");
    }
}
