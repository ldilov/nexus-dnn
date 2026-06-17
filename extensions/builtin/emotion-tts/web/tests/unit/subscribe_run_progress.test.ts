import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { subscribeRunProgress } from "../../src/services/runs_client";
import {
  applyEvent,
  initialItems,
  type RunChunk,
  type StoryboardJob,
} from "../../src/views/recipe/components/run_panel_items";
import type { ProgressEvent } from "../../src/services/types";

interface CapturedListener {
  name: string;
  handler: (ev: MessageEvent) => void;
}

/** Records the named SSE listeners the real `subscribeSse` registers and lets
 * the test push a named frame straight through `subscribeRunProgress` — i.e.
 * the EventSource layer the function-boundary mocks in run_panel tests skip. */
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

  dispatchNamed(name: string, data: string): void {
    for (const l of this.listeners) {
      if (l.name === name) l.handler({ data } as MessageEvent);
    }
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

function job(jobId: string): StoryboardJob {
  return { jobId, label: jobId, segment: { text: jobId, voice_asset_id: "v1" } };
}

describe("subscribeRunProgress → reducer integration", () => {
  it("flows a named segment_started frame through to applyEvent (item → generating)", () => {
    const jobs: StoryboardJob[] = [job("j0")];
    const chunks: RunChunk[] = [{ runId: "runA", jobs }];
    let items = initialItems(jobs);
    expect(items.get("j0")?.status).toBe("queued");

    subscribeRunProgress("dep_x", "runA", (event: ProgressEvent) => {
      items = applyEvent(items, chunks, event);
    });

    // Producer emits a 1-based global_index per run; chunk runA = [j0] → idx 1.
    FakeEventSource.last?.dispatchNamed(
      "segment_started",
      JSON.stringify({ type: "segment_started", runId: "runA", globalIndex: 1 }),
    );

    expect(items.get("j0")?.status).toBe("generating");
  });

  it("flows a named segment_completed frame through to a done item with duration", () => {
    const jobs: StoryboardJob[] = [job("j0")];
    const chunks: RunChunk[] = [{ runId: "runA", jobs }];
    let items = initialItems(jobs);

    subscribeRunProgress("dep_x", "runA", (event: ProgressEvent) => {
      items = applyEvent(items, chunks, event);
    });

    FakeEventSource.last?.dispatchNamed(
      "segment_completed",
      JSON.stringify({
        type: "segment_completed",
        runId: "runA",
        globalIndex: 1,
        durationMs: 123,
        cacheHit: false,
        audioArtifactRef: "ref",
      }),
    );

    const item = items.get("j0");
    expect(item?.status).toBe("done");
    expect(item?.durationMs).toBe(123);
  });
});
