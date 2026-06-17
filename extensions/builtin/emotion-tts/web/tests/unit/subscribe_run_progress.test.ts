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
 * the EventSource layer the function-boundary mocks in run_panel tests skip.
 * Frames carry the SNAKE_CASE wire shape the Rust producer actually emits, so
 * this exercises the snake→camel normalization end-to-end. */
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

describe("subscribeRunProgress → reducer integration (snake_case wire)", () => {
  it("flows snake_case frames through to drive an item queued → generating → done", () => {
    const jobs: StoryboardJob[] = [job("j0")];
    const chunks: RunChunk[] = [{ runId: "runA", jobs }];
    let items = initialItems(jobs);
    expect(items.get("j0")?.status).toBe("queued");

    subscribeRunProgress("dep_x", "runA", (event: ProgressEvent) => {
      items = applyEvent(items, chunks, event);
    });

    const es = FakeEventSource.last;
    expect(es).not.toBeNull();

    // Producer emits a 1-based global_index per run; chunk runA = [j0] → idx 1.
    es?.dispatchNamed(
      "segment_started",
      JSON.stringify({ type: "segment_started", run_id: "runA", global_index: 1 }),
    );
    expect(items.get("j0")?.status).toBe("generating");

    es?.dispatchNamed(
      "segment_completed",
      JSON.stringify({
        type: "segment_completed",
        run_id: "runA",
        global_index: 1,
        duration_ms: 1234,
        cache_hit: false,
        audio_artifact_ref: "ref",
      }),
    );

    const item = items.get("j0");
    expect(item?.status).toBe("done");
    expect(item?.durationMs).toBe(1234);
  });

  it("flows a snake_case segment_failed frame through to a failed item", () => {
    const jobs: StoryboardJob[] = [job("j0")];
    const chunks: RunChunk[] = [{ runId: "runA", jobs }];
    let items = initialItems(jobs);

    subscribeRunProgress("dep_x", "runA", (event: ProgressEvent) => {
      items = applyEvent(items, chunks, event);
    });

    FakeEventSource.last?.dispatchNamed(
      "segment_failed",
      JSON.stringify({
        type: "segment_failed",
        run_id: "runA",
        global_index: 1,
        failure_category: "synthesis",
        failure_detail: "boom",
      }),
    );

    const item = items.get("j0");
    expect(item?.status).toBe("failed");
    expect(item?.failureCategory).toBe("synthesis");
  });

  it("ignores a snake_case run_terminal frame in the reducer (no item regression)", () => {
    const jobs: StoryboardJob[] = [job("j0")];
    const chunks: RunChunk[] = [{ runId: "runA", jobs }];
    let items = initialItems(jobs);

    subscribeRunProgress("dep_x", "runA", (event: ProgressEvent) => {
      items = applyEvent(items, chunks, event);
    });

    FakeEventSource.last?.dispatchNamed(
      "run_terminal",
      JSON.stringify({ type: "run_terminal", run_id: "runA", status: "completed" }),
    );

    expect(items.get("j0")?.status).toBe("queued");
  });
});
