import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { resetIdb } from "./helper";
import {
  appendDelta,
  evictDeltasOlderThan,
  getDeltasByRequest,
  setRequestStatus,
} from "../stream_deltas";
import type { StreamDeltaRow } from "../schemas";

const dep = "deployment-1";
const thread = "thread-a";
const request = "req-1";

function makeDelta(
  sequenceNumber: number,
  chunk: string,
  timestamp: number,
): StreamDeltaRow {
  return {
    deploymentId: dep,
    threadId: thread,
    requestId: request,
    sequenceNumber,
    chunk,
    timestamp,
    status: "in_progress",
  };
}

describe("stream_deltas IDB store", () => {
  beforeEach(async () => {
    await resetIdb();
  });
  afterEach(async () => {
    await resetIdb();
  });

  it("returns appended deltas in sequenceNumber order regardless of insert order", async () => {
    await appendDelta(makeDelta(2, "two", 100));
    await appendDelta(makeDelta(0, "zero", 100));
    await appendDelta(makeDelta(1, "one", 100));
    const rows = await getDeltasByRequest(dep, thread, request);
    expect(rows.map((row) => row.chunk)).toEqual(["zero", "one", "two"]);
  });

  it("scopes deltas by requestId", async () => {
    await appendDelta(makeDelta(0, "alpha", 100));
    await appendDelta({ ...makeDelta(0, "beta", 100), requestId: "req-2" });
    const rows = await getDeltasByRequest(dep, thread, request);
    expect(rows.map((row) => row.chunk)).toEqual(["alpha"]);
  });

  it("setRequestStatus updates every row in the request and reports the count", async () => {
    await appendDelta(makeDelta(0, "a", 100));
    await appendDelta(makeDelta(1, "b", 100));
    await appendDelta(makeDelta(2, "c", 100));
    const updated = await setRequestStatus(dep, thread, request, "completed");
    expect(updated).toBe(3);
    const rows = await getDeltasByRequest(dep, thread, request);
    expect(rows.every((row) => row.status === "completed")).toBe(true);
  });

  it("setRequestStatus is a no-op for already-matching status", async () => {
    await appendDelta({ ...makeDelta(0, "a", 100), status: "completed" });
    const updated = await setRequestStatus(dep, thread, request, "completed");
    expect(updated).toBe(0);
  });

  it("evictDeltasOlderThan removes only stale rows", async () => {
    await appendDelta(makeDelta(0, "old", 100));
    await appendDelta(makeDelta(1, "new", 1000));
    const removed = await evictDeltasOlderThan(500);
    expect(removed).toBe(1);
    const rows = await getDeltasByRequest(dep, thread, request);
    expect(rows.map((row) => row.chunk)).toEqual(["new"]);
  });
});
