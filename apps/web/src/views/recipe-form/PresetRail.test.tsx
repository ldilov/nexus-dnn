import "@testing-library/jest-dom/vitest";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
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

  it("groups presets by source into labeled sections", () => {
    const presets = [
      makePreset({ preset_id: "e1", label: "Stock", source: "extension" }),
      makePreset({ preset_id: "r1", label: "Cinematic", source: "recipe" }),
      makePreset({ preset_id: "u1", label: "My Custom", source: "user" }),
    ];
    render(
      <PresetRail
        presets={presets}
        selectedPresetId={null}
        onSelect={vi.fn()}
      />,
    );

    const ext = screen.getByRole("group", { name: "Extension" });
    expect(within(ext).getByRole("button", { name: "Stock" })).toBeInTheDocument();
    expect(within(ext).queryByRole("button", { name: "Cinematic" })).toBeNull();
    expect(within(ext).queryByRole("button", { name: "My Custom" })).toBeNull();

    const recipe = screen.getByRole("group", { name: "Recipe" });
    expect(
      within(recipe).getByRole("button", { name: "Cinematic" }),
    ).toBeInTheDocument();
    expect(within(recipe).queryByRole("button", { name: "Stock" })).toBeNull();
    expect(within(recipe).queryByRole("button", { name: "My Custom" })).toBeNull();

    const user = screen.getByRole("group", { name: "User" });
    expect(
      within(user).getByRole("button", { name: "My Custom" }),
    ).toBeInTheDocument();
    expect(within(user).queryByRole("button", { name: "Stock" })).toBeNull();
    expect(within(user).queryByRole("button", { name: "Cinematic" })).toBeNull();
  });
});
