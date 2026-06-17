import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { subscribeSse } from "../../src/services/http";

interface CapturedListener {
  name: string;
  handler: (ev: MessageEvent) => void;
}

/** Minimal EventSource double that records `addEventListener` registrations and
 * the `onmessage`/`onerror`/`close` interactions, and lets a test push a named
 * or default SSE frame into whichever handler subscribed for it. */
class FakeEventSource {
  static last: FakeEventSource | null = null;

  readonly url: string;
  onmessage: ((ev: MessageEvent) => void) | null = null;
  onerror: ((ev: Event) => void) | null = null;
  closed = false;
  readonly listeners: CapturedListener[] = [];

  constructor(url: string) {
    this.url = url;
    FakeEventSource.last = this;
  }

  addEventListener(name: string, handler: (ev: MessageEvent) => void): void {
    this.listeners.push({ name, handler });
  }

  close(): void {
    this.closed = true;
  }

  /** Dispatch a named SSE frame to every addEventListener handler bound to it. */
  dispatchNamed(name: string, data: string): void {
    for (const l of this.listeners) {
      if (l.name === name) l.handler({ data } as MessageEvent);
    }
  }

  /** Dispatch a default (unnamed / "message") SSE frame via onmessage. */
  dispatchMessage(data: string): void {
    this.onmessage?.({ data } as MessageEvent);
  }

  dispatchError(): void {
    this.onerror?.(new Event("error"));
  }
}

const RealEventSource = globalThis.EventSource;

beforeEach(() => {
  FakeEventSource.last = null;
  (globalThis as { EventSource: unknown }).EventSource = FakeEventSource;
});

afterEach(() => {
  (globalThis as { EventSource: unknown }).EventSource = RealEventSource;
});

interface SampleEvent {
  type: string;
  runId: string;
  globalIndex: number;
}

describe("subscribeSse named events", () => {
  it("invokes onEvent for a named segment_completed frame", () => {
    const received: SampleEvent[] = [];
    subscribeSse<SampleEvent>("/some/progress", (e) => received.push(e));

    const es = FakeEventSource.last;
    expect(es).not.toBeNull();
    es?.dispatchNamed(
      "segment_completed",
      JSON.stringify({ type: "segment_completed", runId: "runA", globalIndex: 2 }),
    );

    expect(received).toHaveLength(1);
    expect(received[0]).toEqual({ type: "segment_completed", runId: "runA", globalIndex: 2 });
  });

  it("still invokes onEvent for a default (unnamed) message frame", () => {
    const received: SampleEvent[] = [];
    subscribeSse<SampleEvent>("/some/progress", (e) => received.push(e));

    FakeEventSource.last?.dispatchMessage(
      JSON.stringify({ type: "segment_started", runId: "runB", globalIndex: 1 }),
    );

    expect(received).toHaveLength(1);
    expect(received[0]).toEqual({ type: "segment_started", runId: "runB", globalIndex: 1 });
  });

  it("registers listeners for every per-segment named event", () => {
    subscribeSse<SampleEvent>("/some/progress", () => {});
    const names = new Set(FakeEventSource.last?.listeners.map((l) => l.name));
    expect(names.has("segment_started")).toBe(true);
    expect(names.has("segment_completed")).toBe(true);
    expect(names.has("segment_failed")).toBe(true);
    expect(names.has("run_terminal")).toBe(true);
  });

  it("forwards errors to onError and closes on cleanup", () => {
    let errored = false;
    const close = subscribeSse<SampleEvent>("/some/progress", () => {}, () => {
      errored = true;
    });

    FakeEventSource.last?.dispatchError();
    expect(errored).toBe(true);

    close();
    expect(FakeEventSource.last?.closed).toBe(true);
  });

  it("drops malformed named frames without throwing", () => {
    const received: SampleEvent[] = [];
    subscribeSse<SampleEvent>("/some/progress", (e) => received.push(e));

    expect(() => FakeEventSource.last?.dispatchNamed("segment_started", "not-json")).not.toThrow();
    expect(received).toHaveLength(0);
  });
});
