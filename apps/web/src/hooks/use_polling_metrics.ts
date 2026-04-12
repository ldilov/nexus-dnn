import { useState, useEffect, useRef } from "react";
import { fetchMetrics, type RuntimeMetrics } from "../api/client";

const POLL_INTERVAL_MS = 5000;

export function usePollingMetrics() {
  const [metrics, setMetrics] = useState<RuntimeMetrics | null>(null);
  const [connected, setConnected] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let active = true;

    const poll = () => {
      fetchMetrics()
        .then((data) => {
          if (!active) return;
          setMetrics(data);
          setConnected(true);
        })
        .catch(() => {
          if (!active) return;
          setConnected(false);
        });
    };

    poll();
    intervalRef.current = setInterval(poll, POLL_INTERVAL_MS);

    return () => {
      active = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return { metrics, connected };
}
