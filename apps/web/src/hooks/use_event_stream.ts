import { useEffect, useRef, useState, useCallback } from "react";

export type RunEvent = {
  type: string;
  run_id: string;
  node_id?: string;
  status?: string;
  progress?: number;
  message?: string;
  timestamp: string;
};

const WS_URL = `ws://${window.location.host}/api/v1/events`;
const RECONNECT_DELAY_MS = 3000;

export function useEventStream() {
  const [events, setEvents] = useState<RunEvent[]>([]);
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => setConnected(true);

    ws.onmessage = (event) => {
      const parsed = JSON.parse(event.data as string) as RunEvent;
      setEvents((prev) => [...prev, parsed]);
    };

    ws.onclose = () => {
      setConnected(false);
      reconnectTimerRef.current = setTimeout(connect, RECONNECT_DELAY_MS);
    };

    ws.onerror = () => ws.close();
  }, []);

  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
      wsRef.current?.close();
    };
  }, [connect]);

  const clearEvents = useCallback(() => setEvents([]), []);

  return { events, connected, clearEvents };
}
