import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { resetIdb } from "./helper";
import {
  getCachedMessages,
  getCachedThreads,
  putCachedMessages,
  putCachedThreads,
  removeCachedThread,
} from "../chat_history";
import type { ChatMessageCacheRow, ChatThreadCacheRow } from "../schemas";

const dep = "deployment-1";

function makeThread(threadId: string, title: string): ChatThreadCacheRow {
  return {
    deploymentId: dep,
    threadId,
    title,
    createdAt: "2026-05-07T00:00:00Z",
    updatedAt: "2026-05-07T00:00:00Z",
    cachedAt: 1_700_000_000,
  };
}

function makeMessage(
  threadId: string,
  messageId: string,
  createdAt: string,
): ChatMessageCacheRow {
  return {
    deploymentId: dep,
    threadId,
    messageId,
    role: "user",
    content: `m-${messageId}`,
    createdAt,
    cachedAt: 1_700_000_000,
  };
}

describe("chat_history IDB store", () => {
  beforeEach(async () => {
    await resetIdb();
  });
  afterEach(async () => {
    await resetIdb();
  });

  it("round-trips threads filtered by deploymentId", async () => {
    await putCachedThreads([
      makeThread("t-a", "Alpha"),
      makeThread("t-b", "Beta"),
      { ...makeThread("t-c", "Gamma"), deploymentId: "other-dep" },
    ]);
    const rows = await getCachedThreads(dep);
    expect(rows.map((row) => row.threadId).sort()).toEqual(["t-a", "t-b"]);
  });

  it("returns messages ordered by createdAt via the by_thread_created index", async () => {
    const inserted = [
      makeMessage("t-a", "m1", "2026-05-07T00:03:00Z"),
      makeMessage("t-a", "m2", "2026-05-07T00:01:00Z"),
      makeMessage("t-a", "m3", "2026-05-07T00:02:00Z"),
    ];
    await putCachedMessages(inserted);
    const rows = await getCachedMessages(dep, "t-a");
    expect(rows.map((row) => row.messageId)).toEqual(["m2", "m3", "m1"]);
  });

  it("removeCachedThread cascades to messages", async () => {
    await putCachedThreads([makeThread("t-a", "Alpha")]);
    await putCachedMessages([
      makeMessage("t-a", "m1", "2026-05-07T00:01:00Z"),
      makeMessage("t-a", "m2", "2026-05-07T00:02:00Z"),
    ]);
    await removeCachedThread(dep, "t-a");
    const threads = await getCachedThreads(dep);
    const messages = await getCachedMessages(dep, "t-a");
    expect(threads).toEqual([]);
    expect(messages).toEqual([]);
  });

  it("removeCachedThread leaves other threads' messages alone", async () => {
    await putCachedMessages([
      makeMessage("t-a", "m1", "2026-05-07T00:01:00Z"),
      makeMessage("t-b", "m1", "2026-05-07T00:01:00Z"),
    ]);
    await removeCachedThread(dep, "t-a");
    const remaining = await getCachedMessages(dep, "t-b");
    expect(remaining.map((row) => row.messageId)).toEqual(["m1"]);
  });
});
