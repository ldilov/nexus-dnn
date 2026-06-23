import { describe, expect, it, vi } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useMutation } from "./use_mutation";

describe("useMutation", () => {
  it("starts idle", () => {
    const { result } = renderHook(() => useMutation(async () => 1));
    expect(result.current.isPending).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.data).toBeNull();
  });

  it("flips to pending then resolves with data", async () => {
    let release: (value: string) => void = () => {};
    const fn = vi.fn(
      () =>
        new Promise<string>((resolve) => {
          release = resolve;
        }),
    );
    const { result } = renderHook(() => useMutation(fn));

    let mutatePromise: Promise<string | undefined> = Promise.resolve(undefined);
    act(() => {
      mutatePromise = result.current.mutate();
    });
    await waitFor(() => expect(result.current.isPending).toBe(true));

    await act(async () => {
      release("ok");
      await mutatePromise;
    });
    expect(result.current.isPending).toBe(false);
    expect(result.current.data).toBe("ok");
    expect(result.current.error).toBeNull();
  });

  it("captures thrown errors and stops pending", async () => {
    const fn = vi.fn(async () => {
      throw new Error("boom");
    });
    const { result } = renderHook(() => useMutation(fn));

    let returned: unknown;
    await act(async () => {
      returned = await result.current.mutate();
    });
    expect(returned).toBeUndefined();
    expect(result.current.isPending).toBe(false);
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe("boom");
  });

  it("wraps non-Error throwables", async () => {
    const fn = vi.fn(async () => {
      throw "string failure";
    });
    const { result } = renderHook(() => useMutation(fn));
    await act(async () => {
      await result.current.mutate();
    });
    expect(result.current.error?.message).toBe("string failure");
  });

  it("ignores a stale resolution when a newer call supersedes it", async () => {
    const resolvers: Array<(value: string) => void> = [];
    const fn = vi.fn(
      () =>
        new Promise<string>((resolve) => {
          resolvers.push(resolve);
        }),
    );
    const { result } = renderHook(() => useMutation(fn));

    let firstCall: Promise<string | undefined> = Promise.resolve(undefined);
    let secondCall: Promise<string | undefined> = Promise.resolve(undefined);
    act(() => {
      firstCall = result.current.mutate();
    });
    act(() => {
      secondCall = result.current.mutate();
    });

    const [resolveFirst, resolveSecond] = resolvers;
    await act(async () => {
      resolveSecond?.("second");
      resolveFirst?.("first");
      await Promise.all([firstCall, secondCall]);
    });
    expect(result.current.data).toBe("second");
  });

  it("reset returns to idle", async () => {
    const fn = vi.fn(async () => 7);
    const { result } = renderHook(() => useMutation(fn));
    await act(async () => {
      await result.current.mutate();
    });
    expect(result.current.data).toBe(7);
    act(() => result.current.reset());
    expect(result.current.data).toBeNull();
    expect(result.current.isPending).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
