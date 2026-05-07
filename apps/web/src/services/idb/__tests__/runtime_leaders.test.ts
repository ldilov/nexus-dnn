import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { resetIdb } from "./helper";
import {
  claimLeader,
  getLeader,
  releaseLeader,
  updateHeartbeat,
} from "../runtime_leaders";
import type { RuntimeLeaderRow } from "../schemas";

const dep = "deployment-1";
const modelKey = "llama-8b/Q4_K_M";

function makeLeader(
  leaderTabId: string,
  port: number,
  pid: number | null,
  claimedAt: number,
  heartbeatAt: number = claimedAt,
): RuntimeLeaderRow {
  return {
    deploymentId: dep,
    modelKey,
    leaderTabId,
    port,
    pid,
    claimedAt,
    heartbeatAt,
  };
}

describe("runtime_leaders IDB store", () => {
  beforeEach(async () => {
    await resetIdb();
  });
  afterEach(async () => {
    await resetIdb();
  });

  it("getLeader returns null before any claim", async () => {
    expect(await getLeader(dep, modelKey)).toBeNull();
  });

  it("claimLeader upserts and getLeader returns the row", async () => {
    await claimLeader(makeLeader("tab-a", 8001, 12345, 100));
    const row = await getLeader(dep, modelKey);
    expect(row?.leaderTabId).toBe("tab-a");
    expect(row?.port).toBe(8001);
  });

  it("updateHeartbeat only updates heartbeatAt", async () => {
    await claimLeader(makeLeader("tab-a", 8001, 12345, 100, 100));
    const ok = await updateHeartbeat(dep, modelKey, "tab-a", 200);
    expect(ok).toBe(true);
    const row = await getLeader(dep, modelKey);
    expect(row?.heartbeatAt).toBe(200);
    expect(row?.claimedAt).toBe(100);
    expect(row?.port).toBe(8001);
  });

  it("updateHeartbeat refuses to update a different leader's row", async () => {
    await claimLeader(makeLeader("tab-a", 8001, null, 100));
    const ok = await updateHeartbeat(dep, modelKey, "tab-impostor", 200);
    expect(ok).toBe(false);
    const row = await getLeader(dep, modelKey);
    expect(row?.heartbeatAt).toBe(100);
  });

  it("releaseLeader deletes the row when leaderTabId matches", async () => {
    await claimLeader(makeLeader("tab-a", 8001, null, 100));
    const ok = await releaseLeader(dep, modelKey, "tab-a");
    expect(ok).toBe(true);
    expect(await getLeader(dep, modelKey)).toBeNull();
  });

  it("releaseLeader refuses to delete when leaderTabId does not match", async () => {
    await claimLeader(makeLeader("tab-a", 8001, null, 100));
    const ok = await releaseLeader(dep, modelKey, "tab-impostor");
    expect(ok).toBe(false);
    const row = await getLeader(dep, modelKey);
    expect(row?.leaderTabId).toBe("tab-a");
  });
});
