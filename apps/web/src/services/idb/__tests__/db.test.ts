import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { resetIdb } from "./helper";
import { openNexusDb, NEXUS_IDB_VERSION } from "../db";

describe("openNexusDb", () => {
  beforeEach(async () => {
    await resetIdb();
  });
  afterEach(async () => {
    await resetIdb();
  });

  it("creates all five object stores at version 1", async () => {
    const db = await openNexusDb();
    expect(db.version).toBe(NEXUS_IDB_VERSION);
    const expected = [
      "nexus-chat-threads",
      "nexus-chat-messages",
      "nexus-composer-drafts",
      "nexus-stream-deltas",
      "nexus-runtime-leaders",
    ] as const;
    for (const name of expected) {
      expect(db.objectStoreNames.contains(name)).toBe(true);
    }
  });

  it("creates the by_thread_created index on nexus-chat-messages", async () => {
    const db = await openNexusDb();
    const tx = db.transaction("nexus-chat-messages", "readonly");
    const indexNames = Array.from(tx.store.indexNames);
    expect(indexNames).toContain("by_thread_created");
  });

  it("creates the by_request index on nexus-stream-deltas", async () => {
    const db = await openNexusDb();
    const tx = db.transaction("nexus-stream-deltas", "readonly");
    const indexNames = Array.from(tx.store.indexNames);
    expect(indexNames).toContain("by_request");
  });

  it("returns the same handle on repeated openNexusDb calls", async () => {
    const a = await openNexusDb();
    const b = await openNexusDb();
    expect(a).toBe(b);
  });
});
