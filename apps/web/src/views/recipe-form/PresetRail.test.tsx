import "@testing-library/jest-dom/vitest";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { PresetRail } from "./PresetRail";
import type { Preset } from "../../api/generated/Preset";

function makePreset(overrides: Partial<Preset> = {}): Preset {
  return {
    preset_id: "p1",
    label: "Cinematic",
    description: null,
    source: "recipe",
    values: {},
    ...overrides,
  };
}

describe("PresetRail", () => {
  it("renders preset labels", () => {
    const presets = [
      makePreset({ preset_id: "p1", label: "Fast" }),
      makePreset({ preset_id: "p2", label: "Quality" }),
    ];
    render(
      <PresetRail
        presets={presets}
        selectedPresetId={null}
        onSelect={vi.fn()}
      />,
    );
    expect(screen.getByText("Fast")).toBeInTheDocument();
    expect(screen.getByText("Quality")).toBeInTheDocument();
  });

  it("reports the correct preset_id when a preset is selected", () => {
    const onSelect = vi.fn();
    const presets = [makePreset({ preset_id: "p1", label: "Draft" })];
    render(
      <PresetRail
        presets={presets}
        selectedPresetId={null}
        onSelect={onSelect}
      />,
    );
    fireEvent.click(screen.getByText("Draft"));
    expect(onSelect).toHaveBeenCalledWith("p1");
  });

  it("marks the selected preset visually (aria-pressed=true)", () => {
    const presets = [
      makePreset({ preset_id: "p1", label: "Fast" }),
      makePreset({ preset_id: "p2", label: "Quality" }),
    ];
    render(
      <PresetRail
        presets={presets}
        selectedPresetId="p2"
        onSelect={vi.fn()}
      />,
    );
    const buttons = screen.getAllByRole("button");
    const fast = buttons.find((b) => b.textContent?.includes("Fast"))!;
    const quality = buttons.find((b) => b.textContent?.includes("Quality"))!;
    expect(fast.getAttribute("aria-pressed")).toBe("false");
    expect(quality.getAttribute("aria-pressed")).toBe("true");
  });

  it("renders nothing when presets array is empty", () => {
    const { container } = render(
      <PresetRail
        presets={[]}
        selectedPresetId={null}
        onSelect={vi.fn()}
      />,
    );
    // Rail should render its wrapper but no buttons
    expect(screen.queryByRole("button")).toBeNull();
    expect(container.firstChild).toBeInTheDocument();
  });
});
