import "fake-indexeddb/auto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { putDraft, getDraft, deleteDraft } from "../../../services/idb/composer_drafts";
import { useComposerDraft } from "../use_composer_draft";

let testCounter = 0;
let dep = "";

beforeEach(() => {
  testCounter += 1;
  dep = `dep-${testCounter}`;
  window.sessionStorage.clear();
});

afterEach(() => {
  vi.useRealTimers();
  window.sessionStorage.clear();
});

describe("useComposerDraft", () => {
  it("hydrates initialValue from a stored IDB draft", async () => {
    await putDraft({
      deploymentId: dep,
      threadId: "thread-a",
      text: "previously typed",
      updatedAt: 1,
    });

    const { result } = renderHook(() =>
      useComposerDraft({ deploymentId: dep, threadId: "thread-a" }),
    );

    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });
    expect(result.current.hydrated).toBe(true);
    expect(result.current.initialValue).toBe("previously typed");
  });

  it("debounces writes to IDB", async () => {
    const { result } = renderHook(() =>
      useComposerDraft({ deploymentId: dep, threadId: "thread-a", debounceMs: 10 }),
    );
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });

    act(() => {
      result.current.notifyValueChange("a");
      result.current.notifyValueChange("ab");
      result.current.notifyValueChange("abc");
    });

    expect(await getDraft(dep, "thread-a")).toBeNull();

    await new Promise((r) => setTimeout(r, 30));
    const stored = await getDraft(dep, "thread-a");
    expect(stored?.text).toBe("abc");
  });

  it("clear() removes the IDB row immediately", async () => {
    await putDraft({
      deploymentId: dep,
      threadId: "thread-a",
      text: "content",
      updatedAt: 1,
    });
    const { result } = renderHook(() =>
      useComposerDraft({ deploymentId: dep, threadId: "thread-a" }),
    );
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });

    await act(async () => {
      await result.current.clear();
    });

    expect(await getDraft(dep, "thread-a")).toBeNull();
  });

  it("falls back to sessionStorage when IDB read returns nothing", async () => {
    await deleteDraft(dep, "thread-a");
    window.sessionStorage.setItem(
      `nexus.composer.draft:${dep}:thread-a`,
      "from session",
    );
    const { result } = renderHook(() =>
      useComposerDraft({ deploymentId: dep, threadId: "thread-a" }),
    );
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });
    expect(result.current.initialValue).toBe("from session");
  });

  it("returns hydrated=true with empty initialValue when deploymentId is null", async () => {
    const { result } = renderHook(() =>
      useComposerDraft({ deploymentId: null, threadId: "thread-a" }),
    );
    await act(async () => {
      await Promise.resolve();
    });
    expect(result.current.hydrated).toBe(true);
    expect(result.current.initialValue).toBe("");
  });
});
