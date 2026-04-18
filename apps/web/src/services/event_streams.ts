/**
 * WebSocket subscription layer for the Rust host's event buses. The only
 * module permitted to construct WebSocket instances in apps/web/ — keeps
 * all I/O in src/services/ per constitution Principle XII.4 (SR-005).
 *
 * Two buses are exposed:
 *   - `/api/v1/events`           — orchestration NexusEvent bus
 *   - `/api/v1/backends/events`  — backend adapter BackendEvent bus
 */

export interface RunEvent {
  type: string;
  run_id: string;
  node_id?: string;
  status?: string;
  progress?: number;
  message?: string;
  timestamp: string;
}

export interface BackendEventRecord {
  topic: string;
  backend?: string;
  family?: string;
  runtime_install_id?: string | null;
  install_task_id?: string | null;
  payload?: Record<string, unknown>;
  emitted_at?: number;
}

export interface SubscribeOptions {
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (err: Event) => void;
  reconnectDelayMs?: number;
}

export interface Subscription {
  close: () => void;
}

function wsScheme(): string {
  if (typeof window === "undefined") return "ws:";
  return window.location.protocol === "https:" ? "wss:" : "ws:";
}

function wsHost(): string {
  if (typeof window === "undefined") return "";
  return window.location.host;
}

/**
 * Bare WebSocket factory for callers that need raw message/error/close
 * callback control (e.g. consumers maintaining their own async-iterator
 * queue). Centralizes `new WebSocket(...)` so SR-005 stays honored outside
 * `services/`.
 */
export function openEventsSocket(): WebSocket {
  return new WebSocket(`${wsScheme()}//${wsHost()}/api/v1/events`);
}

function openReconnectingSocket<T>(
  buildUrl: () => string,
  onMessage: (msg: T) => void,
  opts: SubscribeOptions = {},
): Subscription {
  const delay = opts.reconnectDelayMs ?? 3_000;
  let closed = false;
  let socket: WebSocket | null = null;
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  const connect = () => {
    if (closed) return;
    const ws = new WebSocket(buildUrl());
    socket = ws;
    ws.onopen = () => opts.onOpen?.();
    ws.onmessage = (evt) => {
      try {
        const parsed = JSON.parse(evt.data as string) as T;
        onMessage(parsed);
      } catch {
        return;
      }
    };
    ws.onerror = (err) => {
      opts.onError?.(err);
      ws.close();
    };
    ws.onclose = () => {
      opts.onClose?.();
      if (closed) return;
      reconnectTimer = setTimeout(connect, delay);
    };
  };

  connect();

  return {
    close: () => {
      closed = true;
      if (reconnectTimer) clearTimeout(reconnectTimer);
      socket?.close();
    },
  };
}

/**
 * Subscribe to the orchestration event bus at /api/v1/events.
 * Auto-reconnects on close; call `close()` to tear down.
 */
export function subscribeEvents(
  onEvent: (event: RunEvent) => void,
  opts?: SubscribeOptions,
): Subscription {
  return openReconnectingSocket<RunEvent>(
    () => `${wsScheme()}//${wsHost()}/api/v1/events`,
    onEvent,
    opts,
  );
}

/**
 * Subscribe to the backend install-progress event bus at
 * /api/v1/backends/events, pre-filtered to a single backend family.
 * Used by install modals to stream llm.backend.install.* + llm.backend.log
 * without receiving unrelated events.
 */
export function subscribeInstallProgress(
  backendId: string,
  onEvent: (event: BackendEventRecord) => void,
  opts?: SubscribeOptions,
): Subscription {
  const family = encodeURIComponent(backendId);
  return openReconnectingSocket<BackendEventRecord>(
    () => `${wsScheme()}//${wsHost()}/api/v1/backends/events?family=${family}`,
    onEvent,
    opts,
  );
}
