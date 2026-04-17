import { useEffect, useMemo, useRef } from "react";
import type { InstallStreamEvent } from "../../backends/install_modal";

const WS_URL = `ws://${typeof window !== "undefined" ? window.location.host : ""}/api/v1/events`;

interface PendingResolver {
  resolve: (value: IteratorResult<InstallStreamEvent>) => void;
  reject: (reason: unknown) => void;
}

class Queue implements AsyncIterable<InstallStreamEvent> {
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
      next: () => {
        if (this.buffer.length > 0) {
          return Promise.resolve({
            value: this.buffer.shift() as InstallStreamEvent,
            done: false,
          });
        }
        if (this.closed) {
          return Promise.resolve({
            value: undefined as unknown as InstallStreamEvent,
            done: true,
          });
        }
        return new Promise<IteratorResult<InstallStreamEvent>>((resolve, reject) => {
          this.waiters.push({ resolve, reject });
        });
      },
      return: () => {
        this.close();
        return Promise.resolve({
          value: undefined as unknown as InstallStreamEvent,
          done: true,
        });
      },
    };
  }
}

class DelegatingIterable implements AsyncIterable<InstallStreamEvent> {
  constructor(private readonly source: { current: Queue }) {}

  [Symbol.asyncIterator](): AsyncIterator<InstallStreamEvent> {
    return this.source.current[Symbol.asyncIterator]();
  }
}

/**
 * Spec 020 T223 — host-model install progress stream.
 *
 * Filters WS events to `hf.model.install.*` topics matching the given
 * task_id. Today `POST /host-models` is synchronous (install completes
 * before the HTTP response), so this hook exists to bolt onto the
 * existing `InstallModal` contract once the pipeline gains async progress
 * emission — drop-in compatible with `useInstallStream`.
 */
export function useHostModelInstallStream(
  taskId: string | null,
): AsyncIterable<InstallStreamEvent> {
  const queueRef = useRef<Queue | null>(null);
  if (queueRef.current === null) {
    queueRef.current = new Queue();
  }

  useEffect(() => {
    if (!taskId) return;
    queueRef.current = new Queue();
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
      const record = parsed as {
        topic: unknown;
        payload: unknown;
        emitted_at?: number;
      };
      if (typeof record.topic !== "string") return;
      if (!record.topic.startsWith("hf.model.install.")) return;
      const payload =
        typeof record.payload === "object" && record.payload !== null
          ? (record.payload as Record<string, unknown>)
          : {};
      if (payload.task_id !== taskId) return;
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
  }, [taskId]);

  return useMemo(
    () => new DelegatingIterable(queueRef as { current: Queue }),
    [],
  );
}
