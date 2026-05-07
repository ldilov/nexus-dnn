import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { ContextMeter } from "../context_meter";

afterEach(() => {
  cleanup();
});

describe("ContextMeter", () => {
  it("renders_percentage_label", () => {
    render(<ContextMeter used={4096} max={8192} />);
    const bar = screen.getByRole("progressbar");
    const wrap = bar.parentElement;
    expect(wrap?.textContent ?? "").toContain("4,096");
    expect(wrap?.textContent ?? "").toContain("8,192");
    expect(wrap?.textContent ?? "").toContain("(50%)");
  });

  it("progressbar_role_with_aria_values", () => {
    render(<ContextMeter used={4096} max={8192} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "50");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
  });

  it("data_tone_ok_under_60_pct", () => {
    render(<ContextMeter used={1000} max={8192} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("data-tone", "ok");
  });

  it("data_tone_warn_at_60_pct", () => {
    render(<ContextMeter used={4916} max={8192} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("data-tone", "warn");
  });

  it("data_tone_danger_above_85_pct", () => {
    render(<ContextMeter used={7000} max={8192} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("data-tone", "danger");
  });

  it("clamps_at_100_pct", () => {
    render(<ContextMeter used={10000} max={8192} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "100");
  });

  it("zero_max_shows_zero_pct", () => {
    render(<ContextMeter used={500} max={0} />);
    const bar = screen.getByRole("progressbar");
    expect(bar.parentElement?.textContent ?? "").toContain("(0%)");
    expect(bar).toHaveAttribute("aria-valuenow", "0");
  });
});
