import { useEffect, useMemo, useRef } from "react";
import type { InstallStreamEvent } from "../install_modal";
import {
  subscribeInstallProgress,
  type BackendEventRecord,
} from "../../services/event_streams";

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

function matchesBackend(record: BackendEventRecord, backendId: string): boolean {
  const candidate = record.backend ?? record.family;
  return typeof candidate === "string" && candidate === backendId;
}

function isRelevantTopic(topic: string): boolean {
  return topic.startsWith("llm.backend.install.") || topic === "llm.backend.log";
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
    const subscription = subscribeInstallProgress(backendId, (record) => {
      if (!isRelevantTopic(record.topic)) return;
      if (!matchesBackend(record, backendId)) return;
      queue.push({
        topic: record.topic,
        payload: record.payload ?? {},
        emitted_at:
          typeof record.emitted_at === "number" ? record.emitted_at : Date.now(),
      });
    });

    return () => {
      subscription.close();
      queue.close();
    };
  }, [backendId]);

  return useMemo(
    () => new DelegatingIterable(queueRef as { current: InstallEventQueue }),
    [],
  );
}
