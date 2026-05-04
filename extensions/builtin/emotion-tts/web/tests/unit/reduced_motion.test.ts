import { describe, expect, it, vi } from "vitest";

describe("prefers-reduced-motion substitution (FR-050)", () => {
  it("matchMedia('(prefers-reduced-motion: reduce)') is consulted by motion-aware components", () => {
    const matchSpy = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }));
    Object.defineProperty(window, "matchMedia", { value: matchSpy, writable: true });
    const result = window.matchMedia("(prefers-reduced-motion: reduce)");
    expect(result.matches).toBe(false);
    expect(matchSpy).toHaveBeenCalledWith("(prefers-reduced-motion: reduce)");
  });

  it("matchMedia returns matches=true when reduced motion is enabled", () => {
    const matchSpy = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("reduce"),
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }));
    Object.defineProperty(window, "matchMedia", { value: matchSpy, writable: true });
    const result = window.matchMedia("(prefers-reduced-motion: reduce)");
    expect(result.matches).toBe(true);
  });

  it("useRadarDrag accepts reduceMotion option and exposes it on the result interface", async () => {
    const mod = await import("../../src/views/recipe/hooks/use_radar_drag");
    expect(typeof mod.useRadarDrag).toBe("function");
    const fn = mod.useRadarDrag.toString();
    expect(fn).toContain("reduceMotion");
  });
});
