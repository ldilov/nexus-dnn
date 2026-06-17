import { describe, it, expect, vi, beforeEach } from "vitest";
import { act, renderHook } from "@testing-library/react";

type EventHandler = (event: unknown) => void;
type OpenHandler = () => void;

const captured: {
  handler: EventHandler | null;
  onOpen: OpenHandler | null;
  closed: boolean;
} = {
  handler: null,
  onOpen: null,
  closed: false,
};

vi.mock("../../services/event_streams", () => ({
  subscribeEvents: (onEvent: EventHandler, opts?: { onOpen?: OpenHandler }) => {
    captured.handler = onEvent;
    captured.onOpen = opts?.onOpen ?? null;
    return {
      close: () => {
        captured.closed = true;
      },
    };
  },
}));

const mutateMock = vi.fn();
vi.mock("swr", () => ({
  useSWRConfig: () => ({ mutate: mutateMock }),
}));

import { useInstallProgress } from "./use_install_progress";

function emit(event: Record<string, unknown>) {
  act(() => {
    captured.handler?.(event);
  });
}

describe("useInstallProgress mapping (AC-3.5)", () => {
  beforeEach(() => {
    captured.handler = null;
    captured.onOpen = null;
    captured.closed = false;
    mutateMock.mockReset();
  });

  it("maps byte counts, speed, and derived pct without dropping fields", () => {
    const { result } = renderHook(() =>
      useInstallProgress("ext.demo", "/key"),
    );

    emit({
      type: "extension_install_step_progress",
      extension_id: "ext.demo",
      step_id: "model",
      phase: "downloading",
      current_bytes: 500,
      total_bytes: 1000,
      message: "downloading weights",
    });

    const live = result.current.liveByStep["model"]!;
    expect(live).toBeDefined();
    expect(live.totalBytes).toBe(1000);
    expect(live.currentBytes).toBeGreaterThanOrEqual(500);
    expect(live.pct).toBeGreaterThanOrEqual(50);
    expect(live.phase).toBe("downloading");
    expect(live.message).toBe("downloading weights");
  });

  it("maps backend pct for phase-only events with no bytes", () => {
    const { result } = renderHook(() =>
      useInstallProgress("ext.demo", "/key"),
    );

    emit({
      type: "extension_install_step_progress",
      extension_id: "ext.demo",
      step_id: "pkgs",
      phase: "installing",
      message: "12/40 packages",
      current_bytes: 0,
      total_bytes: 0,
      pct: 30,
    });

    const live = result.current.liveByStep["pkgs"]!;
    expect(live).toBeDefined();
    expect(live.totalBytes).toBe(0);
    expect(live.reportedPct).toBe(30);
    expect(live.phase).toBe("installing");
    expect(live.message).toBe("12/40 packages");
  });

  it("never yields NaN reportedPct for malformed pct", () => {
    const { result } = renderHook(() =>
      useInstallProgress("ext.demo", "/key"),
    );

    emit({
      type: "extension_install_step_progress",
      extension_id: "ext.demo",
      step_id: "rt",
      phase: "resolving",
      current_bytes: 0,
      total_bytes: 0,
      pct: Number.NaN,
    });

    const live = result.current.liveByStep["rt"]!;
    expect(live.reportedPct).toBeNull();
  });

  it("ignores events for other extensions", () => {
    const { result } = renderHook(() =>
      useInstallProgress("ext.demo", "/key"),
    );

    emit({
      type: "extension_install_step_progress",
      extension_id: "ext.other",
      step_id: "x",
      phase: "downloading",
      current_bytes: 1,
      total_bytes: 2,
    });

    expect(result.current.liveByStep["x"]).toBeUndefined();
  });

  it("Gap-B: onOpen on first connect does NOT call mutate", () => {
    renderHook(() => useInstallProgress("ext.demo", "/key"));
    act(() => { captured.onOpen?.(); });
    expect(mutateMock).not.toHaveBeenCalled();
  });

  it("Gap-B: onOpen on second connect (reconnect) calls mutate with the swrKey", () => {
    renderHook(() => useInstallProgress("ext.demo", "/key"));
    act(() => { captured.onOpen?.(); });
    act(() => { captured.onOpen?.(); });
    expect(mutateMock).toHaveBeenCalledWith("/key");
  });
});
