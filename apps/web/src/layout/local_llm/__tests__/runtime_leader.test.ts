import "fake-indexeddb/auto";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { renderHook, act } from "@testing-library/react";
import {
  claimLeader,
  releaseLeader,
} from "../../../services/idb/runtime_leaders";
import { isLockSupported, useRuntimeLeader } from "../runtime_leader";

let testCounter = 0;
let dep = "";
let modelKey = "";

beforeEach(() => {
  testCounter += 1;
  dep = `dep-${testCounter}`;
  modelKey = `family-${testCounter}/Q4`;
});

afterEach(async () => {
  await releaseLeader(dep, modelKey, "tab-other").catch(() => {});
});

describe("useRuntimeLeader", () => {
  it("returns null when no leader has claimed (initial state)", async () => {
    const { result } = renderHook(() => useRuntimeLeader(dep, modelKey));
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });
    expect(result.current.leader).toBeNull();
    expect(result.current.isLeader).toBe(false);
  });

  it("returns the existing leader row from IDB on mount", async () => {
    await claimLeader({
      deploymentId: dep,
      modelKey,
      leaderTabId: "tab-a",
      port: 8001,
      pid: 4242,
      claimedAt: Date.now(),
      heartbeatAt: Date.now(),
    });
    const { result } = renderHook(() => useRuntimeLeader(dep, modelKey));
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });
    expect(result.current.leader?.leaderTabId).toBe("tab-a");
    expect(result.current.leader?.port).toBe(8001);
    expect(result.current.hasFreshLeader).toBe(true);
    expect(result.current.isLeader).toBe(false);
  });

  it("treats a stale leader (heartbeat > 30s old) as not-fresh", async () => {
    await claimLeader({
      deploymentId: dep,
      modelKey,
      leaderTabId: "tab-stale",
      port: 8001,
      pid: null,
      claimedAt: Date.now() - 60_000,
      heartbeatAt: Date.now() - 60_000,
    });
    const { result } = renderHook(() => useRuntimeLeader(dep, modelKey));
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });
    expect(result.current.leader).not.toBeNull();
    expect(result.current.hasFreshLeader).toBe(false);
  });

  it("returns null leader when deploymentId or modelKey is null", async () => {
    const { result } = renderHook(() => useRuntimeLeader(null, modelKey));
    await act(async () => {
      await Promise.resolve();
    });
    expect(result.current.leader).toBeNull();
  });
});

describe("isLockSupported", () => {
  it("reports support based on navigator.locks", () => {
    expect(typeof isLockSupported()).toBe("boolean");
  });
});
