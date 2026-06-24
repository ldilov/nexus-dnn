import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Spinner } from "./spinner";
import { ProgressBar } from "./progress_bar";

describe("Spinner", () => {
  it("is decorative without a label", () => {
    const { container } = render(<Spinner />);
    const glyph = container.querySelector("[aria-hidden='true']");
    expect(glyph).toBeTruthy();
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("announces itself when labelled", () => {
    render(<Spinner label="Loading runtimes" />);
    expect(screen.getByRole("status", { name: "Loading runtimes" })).toBeTruthy();
  });
});

describe("ProgressBar", () => {
  it("reports a clamped percentage for determinate values", () => {
    render(<ProgressBar value={0.42} label="Download" />);
    const bar = screen.getByRole("progressbar", { name: "Download" });
    expect(bar.getAttribute("aria-valuenow")).toBe("42");
  });

  it("omits aria-valuenow when indeterminate", () => {
    render(<ProgressBar value={null} label="Working" />);
    const bar = screen.getByRole("progressbar", { name: "Working" });
    expect(bar.getAttribute("aria-valuenow")).toBeNull();
  });

  it("clamps out-of-range values", () => {
    render(<ProgressBar value={5} label="Over" />);
    expect(
      screen.getByRole("progressbar", { name: "Over" }).getAttribute("aria-valuenow"),
    ).toBe("100");
  });
});
