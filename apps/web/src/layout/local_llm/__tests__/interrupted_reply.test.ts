import "fake-indexeddb/auto";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { appendDelta, setRequestStatus } from "../../../services/idb/stream_deltas";
import { loadInterruptedReply } from "../chat_history_cache";

let testCounter = 0;
let dep = "";
let thread = "";

beforeEach(() => {
  testCounter += 1;
  dep = `dep-${testCounter}`;
  thread = `thread-${testCounter}`;
});

afterEach(() => {
  /* no-op — fake-indexeddb resets on module re-import in next file */
});

function sseDataFrame(content: string): string {
  return `data: ${JSON.stringify({ choices: [{ delta: { content } }] })}\n\n`;
}

describe("loadInterruptedReply", () => {
  it("returns null when there are no deltas for the thread", async () => {
    const result = await loadInterruptedReply(dep, thread);
    expect(result).toBeNull();
  });

  it("returns null when the only request has been marked completed", async () => {
    await appendDelta({
      deploymentId: dep,
      threadId: thread,
      requestId: "req-1",
      sequenceNumber: 0,
      chunk: sseDataFrame("hello"),
      timestamp: 100,
      status: "in_progress",
    });
    await setRequestStatus(dep, thread, "req-1", "completed");
    const result = await loadInterruptedReply(dep, thread);
    expect(result).toBeNull();
  });

  it("assembles SSE delta content for an in-progress request", async () => {
    const chunks = ["partial ", "reply ", "stops"];
    for (let i = 0; i < chunks.length; i += 1) {
      await appendDelta({
        deploymentId: dep,
        threadId: thread,
        requestId: "req-stuck",
        sequenceNumber: i,
        chunk: sseDataFrame(chunks[i]!),
        timestamp: 100 + i,
        status: "in_progress",
      });
    }
    const result = await loadInterruptedReply(dep, thread);
    expect(result?.requestId).toBe("req-stuck");
    expect(result?.text).toBe("partial reply stops");
    expect(result?.lastTimestamp).toBe(102);
  });

  it("picks the most recent in-progress request when multiple exist", async () => {
    await appendDelta({
      deploymentId: dep,
      threadId: thread,
      requestId: "req-old",
      sequenceNumber: 0,
      chunk: sseDataFrame("older"),
      timestamp: 50,
      status: "in_progress",
    });
    await appendDelta({
      deploymentId: dep,
      threadId: thread,
      requestId: "req-recent",
      sequenceNumber: 0,
      chunk: sseDataFrame("newer"),
      timestamp: 200,
      status: "in_progress",
    });
    const result = await loadInterruptedReply(dep, thread);
    expect(result?.requestId).toBe("req-recent");
    expect(result?.text).toBe("newer");
  });

  it("ignores in-progress requests whose deltas decode to empty text", async () => {
    await appendDelta({
      deploymentId: dep,
      threadId: thread,
      requestId: "req-empty",
      sequenceNumber: 0,
      chunk: "data: [DONE]\n\n",
      timestamp: 100,
      status: "in_progress",
    });
    const result = await loadInterruptedReply(dep, thread);
    expect(result).toBeNull();
  });
});
