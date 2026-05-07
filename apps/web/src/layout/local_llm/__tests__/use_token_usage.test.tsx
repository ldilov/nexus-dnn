import { describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useTokenUsage } from "../use_token_usage";

describe("useTokenUsage", () => {
  it("accumulates_prompt_plus_completion_tokens_from_latest_record", () => {
    const { result } = renderHook(() => useTokenUsage("t1", 8192));

    act(() => {
      result.current.record({ promptTokens: 100, completionTokens: 50, tokensPerSec: 12 });
    });
    expect(result.current.tokensUsed).toBe(150);

    act(() => {
      result.current.record({ promptTokens: 400, completionTokens: 200, tokensPerSec: 18 });
    });
    expect(result.current.tokensUsed).toBe(600);
    expect(result.current.lastTps).toBe(18);
  });

  it("contextUsedPct_computes_correctly", () => {
    const { result } = renderHook(() => useTokenUsage("t1", 8192));

    act(() => {
      result.current.record({ promptTokens: 500, completionTokens: 200 });
    });

    expect(result.current.contextUsedPct).toBeCloseTo(700 / 8192, 6);
  });

  it("contextUsedPct_zero_when_maxContext_zero", () => {
    const { result } = renderHook(() => useTokenUsage("t1", 0));

    act(() => {
      result.current.record({ promptTokens: 500, completionTokens: 200 });
    });

    expect(result.current.contextUsedPct).toBe(0);
    expect(result.current.tokensUsed).toBe(700);
  });

  it("reset_clears_state_on_threadId_change", () => {
    const { result, rerender } = renderHook(
      ({ threadId }: { threadId: string | null }) => useTokenUsage(threadId, 8192),
      { initialProps: { threadId: "thread-a" } },
    );

    act(() => {
      result.current.record({ promptTokens: 300, completionTokens: 100, tokensPerSec: 20 });
    });
    expect(result.current.tokensUsed).toBe(400);

    rerender({ threadId: "thread-b" });

    expect(result.current.tokensUsed).toBe(0);
    expect(result.current.lastTps).toBe(0);
  });

  it("null_threadId_treated_as_thread_change", () => {
    const { result, rerender } = renderHook(
      ({ threadId }: { threadId: string | null }) => useTokenUsage(threadId, 8192),
      { initialProps: { threadId: "t1" as string | null } },
    );

    act(() => {
      result.current.record({ promptTokens: 200, completionTokens: 50 });
    });
    expect(result.current.tokensUsed).toBe(250);

    rerender({ threadId: null });

    expect(result.current.tokensUsed).toBe(0);
  });
});
