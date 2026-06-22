import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { PresetMenu } from "./preset_menu";
import type { PresetSummary } from "../../../services/deployment_presets";

afterEach(cleanup);

const presets: PresetSummary[] = [
  {
    id: "p1",
    name: "Cinematic",
    description: null,
    recipe_key: "rk",
    source_extension_id: "rk",
    created_at: "t",
    updated_at: "t",
  },
];

describe("PresetMenu", () => {
  it("opens, applies a preset, and saves current", () => {
    const onApply = vi.fn();
    const onSaveCurrent = vi.fn();
    const onDelete = vi.fn();
    render(
      <PresetMenu
        presets={presets}
        busy={false}
        onApply={onApply}
        onDelete={onDelete}
        onSaveCurrent={onSaveCurrent}
      />,
    );

    // List is closed initially.
    expect(screen.queryByRole("menu")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: /presets/i }));
    expect(screen.getByRole("menu")).toBeTruthy();

    fireEvent.click(screen.getByRole("menuitem", { name: "Cinematic" }));
    expect(onApply).toHaveBeenCalledWith(presets[0]);

    fireEvent.click(screen.getByRole("button", { name: /presets/i }));
    fireEvent.click(screen.getByRole("menuitem", { name: /save current/i }));
    expect(onSaveCurrent).toHaveBeenCalledTimes(1);
  });

  it("shows an empty state when there are no presets", () => {
    render(
      <PresetMenu
        presets={[]}
        busy={false}
        onApply={vi.fn()}
        onDelete={vi.fn()}
        onSaveCurrent={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /presets/i }));
    expect(screen.getByText(/no presets yet/i)).toBeTruthy();
  });
});
