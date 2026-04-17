import { useEffect, useRef, useState, useCallback } from "react";
import { subscribeEvents, type RunEvent } from "../services/event_streams";

export type { RunEvent };

export function useEventStream() {
  const [events, setEvents] = useState<RunEvent[]>([]);
  const [connected, setConnected] = useState(false);
  const subscriptionRef = useRef<{ close: () => void } | null>(null);

  useEffect(() => {
    subscriptionRef.current = subscribeEvents(
      (event) => setEvents((prev) => [...prev, event]),
      {
        onOpen: () => setConnected(true),
        onClose: () => setConnected(false),
      },
    );
    return () => {
      subscriptionRef.current?.close();
      subscriptionRef.current = null;
    };
  }, []);

  const clearEvents = useCallback(() => setEvents([]), []);

  return { events, connected, clearEvents };
}
