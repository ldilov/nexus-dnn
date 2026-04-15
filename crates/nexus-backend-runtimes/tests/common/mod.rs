use std::sync::Arc;
use std::time::Duration;
use tokio::io::{AsyncReadExt, AsyncWriteExt};
use tokio::net::TcpListener;
use tokio::sync::{Notify, oneshot};
use tokio::task::JoinHandle;

const HTTP_200: &[u8] =
    b"HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: 2\r\nConnection: close\r\n\r\nOK";
const HTTP_503: &[u8] =
    b"HTTP/1.1 503 Service Unavailable\r\nContent-Length: 0\r\nConnection: close\r\n\r\n";

/// A minimal HTTP server that binds on an ephemeral port immediately but only
/// starts returning 200 on `GET /health` after a configurable delay.
///
/// All other paths return 503. The server runs in a Tokio background task and
/// is stopped cleanly when [`DelayedHealthServer::kill`] is called.
///
/// The helper is intentionally self-contained (no axum/hyper dependency) so it
/// can stand in for a real llama-server during integration tests: bind on the
/// port that the spawn request injects via env, respond to /health, and simulate
/// the startup latency window.
pub struct DelayedHealthServer {
    port: u16,
    #[allow(dead_code)]
    ready_notify: Arc<Notify>,
    shutdown_tx: Option<oneshot::Sender<()>>,
    handle: JoinHandle<()>,
}

impl DelayedHealthServer {
    /// Binds on an OS-assigned ephemeral port immediately. The /health endpoint
    /// begins returning 200 only after `delay` has elapsed.
    pub async fn start_after(delay: Duration) -> Self {
        let listener = TcpListener::bind("127.0.0.1:0")
            .await
            .expect("bind ephemeral port");
        let port = listener.local_addr().expect("local_addr").port();

        let ready_notify = Arc::new(Notify::new());
        let notify_clone = Arc::clone(&ready_notify);
        let (shutdown_tx, shutdown_rx) = oneshot::channel::<()>();

        let handle = tokio::spawn(async move {
            let healthy = Arc::new(std::sync::atomic::AtomicBool::new(false));
            let health_clone = Arc::clone(&healthy);

            tokio::spawn(async move {
                tokio::time::sleep(delay).await;
                health_clone.store(true, std::sync::atomic::Ordering::Release);
                notify_clone.notify_waiters();
            });

            tokio::select! {
                _ = shutdown_rx => {}
                _ = Self::accept_loop(listener, healthy) => {}
            }
        });

        Self {
            port,
            ready_notify,
            shutdown_tx: Some(shutdown_tx),
            handle,
        }
    }

    async fn accept_loop(listener: TcpListener, healthy: Arc<std::sync::atomic::AtomicBool>) {
        loop {
            let Ok((mut stream, _)) = listener.accept().await else {
                break;
            };
            let h = Arc::clone(&healthy);
            tokio::spawn(async move {
                let mut buf = [0u8; 512];
                let n = stream.read(&mut buf).await.unwrap_or(0);
                if n == 0 {
                    return;
                }
                let request = std::str::from_utf8(&buf[..n]).unwrap_or("");
                let response = if request.starts_with("GET /health")
                    && h.load(std::sync::atomic::Ordering::Acquire)
                {
                    HTTP_200
                } else {
                    HTTP_503
                };
                let _ = stream.write_all(response).await;
            });
        }
    }

    /// The ephemeral TCP port this server is listening on.
    pub fn port(&self) -> u16 {
        self.port
    }

    /// Wait until the internal delay has elapsed (i.e. /health would return 200).
    #[allow(dead_code)]
    pub async fn wait_until_healthy(&self) {
        self.ready_notify.notified().await;
    }

    /// Stop the server background task immediately.
    pub fn kill(mut self) {
        if let Some(tx) = self.shutdown_tx.take() {
            let _ = tx.send(());
        }
        self.handle.abort();
    }
}
