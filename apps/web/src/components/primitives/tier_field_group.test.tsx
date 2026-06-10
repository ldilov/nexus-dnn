import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TierFieldGroup } from "./tier_field_group";

describe("TierFieldGroup", () => {
  it("renders the title and children expanded by default", () => {
    render(
      <TierFieldGroup title="Core">
        <input aria-label="frames" />
      </TierFieldGroup>,
    );
    expect(screen.getByText("Core")).toBeInTheDocument();
    expect(screen.getByLabelText("frames")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /core/i }).getAttribute("aria-expanded")).toBe("true");
  });

  it("renders an optional description and badge", () => {
    render(
      <TierFieldGroup title="Quality" description="denoise settings" badge={<span>3</span>}>
        <div />
      </TierFieldGroup>,
    );
    expect(screen.getByText("denoise settings")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("hides children when defaultCollapsed is set", () => {
    render(
      <TierFieldGroup title="Advanced" defaultCollapsed>
        <input aria-label="hidden field" />
      </TierFieldGroup>,
    );
    expect(screen.queryByLabelText("hidden field")).toBeNull();
    expect(screen.getByRole("button", { name: /advanced/i }).getAttribute("aria-expanded")).toBe("false");
  });

  it("toggles open and closed on header click", () => {
    render(
      <TierFieldGroup title="Perf" defaultCollapsed>
        <input aria-label="swap field" />
      </TierFieldGroup>,
    );
    const header = screen.getByRole("button", { name: /perf/i });
    fireEvent.click(header);
    expect(screen.getByLabelText("swap field")).toBeInTheDocument();
    fireEvent.click(header);
    expect(screen.queryByLabelText("swap field")).toBeNull();
  });

  it("stays open and disables the header when collapsible is false", () => {
    render(
      <TierFieldGroup title="Pinned" collapsible={false}>
        <input aria-label="always visible" />
      </TierFieldGroup>,
    );
    const header = screen.getByRole("button", { name: /pinned/i });
    expect(header.hasAttribute("disabled")).toBe(true);
    expect(screen.getByLabelText("always visible")).toBeInTheDocument();
  });
});
