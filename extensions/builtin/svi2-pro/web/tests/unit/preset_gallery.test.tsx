import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { PresetGallery } from "../../src/views/recipe/components/preset_gallery";
import type { PresetSummary } from "../../src/services/types";

const presets: PresetSummary[] = [
  {
    id: "svi-canonical",
    label: "SVI canonical",
    description: "reference-faithful baseline",
    params: { width: 832, height: 480, fps: 16, num_clips: 5, frames_per_clip: 69, blocks_to_swap: 40 },
  },
  {
    id: "flf2v-morph-lowvram",
    label: "FLF2V morph",
    description: "start to end morph",
    params: { width: 960, height: 544, fps: 16, num_clips: 1, frames_per_clip: 65, blocks_to_swap: 40 },
  },
];

afterEach(cleanup);

describe("PresetGallery", () => {
  test("renders a card per preset", () => {
    render(<PresetGallery presets={presets} selectedId={null} onSelect={() => undefined} />);
    expect(screen.getByText("SVI canonical")).toBeDefined();
    expect(screen.getByText("FLF2V morph")).toBeDefined();
  });

  test("marks the canonical preset as default and recommended", () => {
    render(<PresetGallery presets={presets} selectedId="svi-canonical" onSelect={() => undefined} />);
    expect(screen.getByText("Recommended baseline")).toBeDefined();
    expect(screen.getByText("Default")).toBeDefined();
  });

  test("shows resolution and last-image badges", () => {
    render(<PresetGallery presets={presets} selectedId={null} onSelect={() => undefined} />);
    expect(screen.getByText("832×480")).toBeDefined();
    expect(screen.getByText("needs last image")).toBeDefined();
  });

  test("invokes onSelect with the chosen preset", () => {
    const onSelect = vi.fn();
    render(<PresetGallery presets={presets} selectedId={null} onSelect={onSelect} />);
    fireEvent.click(screen.getByText("FLF2V morph"));
    expect(onSelect).toHaveBeenCalledWith(presets[1]);
  });

  test("marks selected preset via aria-checked", () => {
    render(<PresetGallery presets={presets} selectedId="svi-canonical" onSelect={() => undefined} />);
    const radios = screen.getAllByRole("radio");
    const checked = radios.filter((r) => r.getAttribute("aria-checked") === "true");
    expect(checked).toHaveLength(1);
  });

  test("renders an empty state when no presets", () => {
    render(<PresetGallery presets={[]} selectedId={null} onSelect={() => undefined} />);
    expect(screen.getByText("No presets available")).toBeDefined();
  });
});
