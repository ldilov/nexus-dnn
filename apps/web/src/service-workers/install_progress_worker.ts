type InstallProgressEvent = {
  topic: string;
  backend: string;
  install_task_id: string;
  runtime_install_id?: string | null;
  payload: Record<string, unknown>;
  emitted_at: number;
};

type WorkerInbound =
  | { kind: "subscribe"; backend: string; base_url: string }
  | { kind: "unsubscribe"; backend: string };

type WorkerOutbound =
  | { kind: "progress"; event: InstallProgressEvent }
  | { kind: "error"; backend: string; message: string }
  | { kind: "closed"; backend: string };

const subscriptions = new Map<string, EventSource>();

self.onmessage = (msg: MessageEvent<WorkerInbound>) => {
  const data = msg.data;
  if (data.kind === "subscribe") {
    subscribeTo(data.backend, data.base_url);
  } else if (data.kind === "unsubscribe") {
    closeSubscription(data.backend);
  }
};

function subscribeTo(backend: string, baseUrl: string) {
  closeSubscription(backend);
  const url = `${baseUrl}/api/v1/events?topic=llm.backend.install&topic=llm.backend.log&backend=${encodeURIComponent(backend)}`;
  const source = new EventSource(url, { withCredentials: false });
  source.onmessage = (evt) => {
    try {
      const parsed: InstallProgressEvent = JSON.parse(evt.data);
      post({ kind: "progress", event: parsed });
    } catch (err) {
      post({ kind: "error", backend, message: (err as Error).message });
    }
  };
  source.onerror = () => post({ kind: "error", backend, message: "event stream error" });
  subscriptions.set(backend, source);
}

function closeSubscription(backend: string) {
  const existing = subscriptions.get(backend);
  if (existing) {
    existing.close();
    subscriptions.delete(backend);
    post({ kind: "closed", backend });
  }
}

function post(message: WorkerOutbound) {
  (self as unknown as { postMessage: (m: WorkerOutbound) => void }).postMessage(message);
}
