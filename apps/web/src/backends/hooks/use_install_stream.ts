import { useEffect, useMemo, useRef } from "react";
import type { InstallStreamEvent } from "../install_modal";

const WS_URL = `ws://${typeof window !== "undefined" ? window.location.host : ""}/api/v1/events`;

interface PendingResolver {
  resolve: (value: IteratorResult<InstallStreamEvent>) => void;
  reject: (reason: unknown) => void;
}

class InstallEventQueue implements AsyncIterable<InstallStreamEvent> {
  private readonly buffer: InstallStreamEvent[] = [];
  private readonly waiters: PendingResolver[] = [];
  private closed = false;

  push(event: InstallStreamEvent) {
    if (this.closed) return;
    const waiter = this.waiters.shift();
    if (waiter) {
      waiter.resolve({ value: event, done: false });
    } else {
      this.buffer.push(event);
    }
  }

  close() {
    if (this.closed) return;
    this.closed = true;
    while (this.waiters.length > 0) {
      const waiter = this.waiters.shift()!;
      waiter.resolve({ value: undefined as unknown as InstallStreamEvent, done: true });
    }
  }

  [Symbol.asyncIterator](): AsyncIterator<InstallStreamEvent> {
    return {
      next: (): Promise<IteratorResult<InstallStreamEvent>> => {
        if (this.buffer.length > 0) {
          const value = this.buffer.shift() as InstallStreamEvent;
          return Promise.resolve({ value, done: false });
        }
        if (this.closed) {
          return Promise.resolve({
            value: undefined as unknown as InstallStreamEvent,
            done: true,
          });
        }
        return new Promise((resolve, reject) => {
          this.waiters.push({ resolve, reject });
        });
      },
      return: (): Promise<IteratorResult<InstallStreamEvent>> => {
        this.close();
        return Promise.resolve({
          value: undefined as unknown as InstallStreamEvent,
          done: true,
        });
      },
    };
  }
}

function matchesBackend(payload: Record<string, unknown>, backendId: string): boolean {
  const candidate = payload.backend_id ?? payload.backend ?? payload.family;
  return typeof candidate === "string" && candidate === backendId;
}

class DelegatingIterable implements AsyncIterable<InstallStreamEvent> {
  constructor(private readonly source: { current: InstallEventQueue }) {}

  [Symbol.asyncIterator](): AsyncIterator<InstallStreamEvent> {
    return this.source.current[Symbol.asyncIterator]();
  }
}

export function useInstallStream(
  backendId: string | null,
): AsyncIterable<InstallStreamEvent> {
  const queueRef = useRef<InstallEventQueue | null>(null);
  if (queueRef.current === null) {
    queueRef.current = new InstallEventQueue();
  }

  useEffect(() => {
    if (!backendId) return;
    queueRef.current = new InstallEventQueue();
    const queue = queueRef.current;
    const ws = new WebSocket(WS_URL);

    ws.onmessage = (msg) => {
      let parsed: unknown;
      try {
        parsed = JSON.parse(msg.data as string);
      } catch {
        return;
      }
      if (
        !parsed ||
        typeof parsed !== "object" ||
        !("topic" in parsed) ||
        !("payload" in parsed)
      ) {
        return;
      }
      const record = parsed as { topic: unknown; payload: unknown; emitted_at?: number };
      if (typeof record.topic !== "string") return;
      if (!record.topic.startsWith("llm.backend.install.") && record.topic !== "llm.backend.log") {
        return;
      }
      const payload =
        typeof record.payload === "object" && record.payload !== null
          ? (record.payload as Record<string, unknown>)
          : {};
      if (!matchesBackend(payload, backendId)) return;
      queue.push({
        topic: record.topic,
        payload,
        emitted_at: typeof record.emitted_at === "number" ? record.emitted_at : Date.now(),
      });
    };

    return () => {
      ws.close();
      queue.close();
    };
  }, [backendId]);

  return useMemo(
    () => new DelegatingIterable(queueRef as { current: InstallEventQueue }),
    [],
  );
}
