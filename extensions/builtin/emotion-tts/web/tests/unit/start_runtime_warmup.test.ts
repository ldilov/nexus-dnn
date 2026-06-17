import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const apiFetch = vi.fn<(path: string, init?: RequestInit) => Promise<unknown>>();

vi.mock("../../src/services/http", () => ({
  apiFetch: (path: string, init?: RequestInit) => apiFetch(path, init),
}));

function bodyOf(init: RequestInit | undefined): Record<string, unknown> | null {
  if (!init || typeof init.body !== "string") return null;
  return JSON.parse(init.body) as Record<string, unknown>;
}

describe("startRuntime warmup wiring", () => {
  beforeEach(() => {
    apiFetch.mockReset();
    apiFetch.mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.resetModules();
  });

  it("POSTs numWorkers + warmup:false when both provided", async () => {
    const { startRuntime } = await import("../../src/services/runtime_client");
    await startRuntime(2, false);

    expect(apiFetch).toHaveBeenCalledTimes(1);
    const [path, init] = apiFetch.mock.calls[0];
    expect(path).toBe("/runtime/start");
    expect((init as RequestInit).method).toBe("POST");
    expect(bodyOf(init as RequestInit)).toEqual({ numWorkers: 2, warmup: false });
  });

  it("POSTs warmup:true when warmup enabled", async () => {
    const { startRuntime } = await import("../../src/services/runtime_client");
    await startRuntime(2, true);

    expect(bodyOf(apiFetch.mock.calls[0][1] as RequestInit)).toEqual({
      numWorkers: 2,
      warmup: true,
    });
  });

  it("includes warmup alone when numWorkers omitted", async () => {
    const { startRuntime } = await import("../../src/services/runtime_client");
    await startRuntime(undefined, true);

    expect(bodyOf(apiFetch.mock.calls[0][1] as RequestInit)).toEqual({ warmup: true });
  });

  it("sends no body when neither field is provided", async () => {
    const { startRuntime } = await import("../../src/services/runtime_client");
    await startRuntime();

    const init = apiFetch.mock.calls[0][1] as RequestInit;
    expect(init.method).toBe("POST");
    expect(bodyOf(init)).toBeNull();
  });
});
