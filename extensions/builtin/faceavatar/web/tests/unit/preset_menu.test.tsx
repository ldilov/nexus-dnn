import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { PRESETS } from "../../src/domain/presets";
import { PresetMenu } from "../../src/views/generate/components/preset_menu";

describe("PresetMenu", () => {
  test("is collapsed until the trigger is clicked", () => {
    render(<PresetMenu presets={PRESETS} activeId="balanced" disabled={false} onApply={() => {}} />);
    expect(screen.queryByRole("menu")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: /Presets/ }));
    expect(screen.getByRole("menu")).toBeTruthy();
    expect(screen.getAllByRole("menuitemradio")).toHaveLength(PRESETS.length);
  });

  test("applies the chosen preset and closes", () => {
    const onApply = vi.fn();
    render(<PresetMenu presets={PRESETS} activeId="balanced" disabled={false} onApply={onApply} />);

    fireEvent.click(screen.getByRole("button", { name: /Presets/ }));
    fireEvent.click(screen.getByRole("menuitemradio", { name: /Fast/ }));

    expect(onApply).toHaveBeenCalledTimes(1);
    expect(onApply.mock.calls[0]?.[0]?.id).toBe("fast");
    expect(screen.queryByRole("menu")).toBeNull();
  });

  test("marks the active preset checked and surfaces its label on the trigger", () => {
    render(<PresetMenu presets={PRESETS} activeId="max" disabled={false} onApply={() => {}} />);
    expect(screen.getByRole("button", { name: /Presets/ }).textContent).toContain("Max identity");

    fireEvent.click(screen.getByRole("button", { name: /Presets/ }));
    expect(
      screen.getByRole("menuitemradio", { name: /Max identity/ }).getAttribute("aria-checked"),
    ).toBe("true");
  });

  test("shows Custom and checks nothing when no preset matches", () => {
    render(<PresetMenu presets={PRESETS} activeId={null} disabled={false} onApply={() => {}} />);
    expect(screen.getByRole("button", { name: /Presets/ }).textContent).toContain("Custom");

    fireEvent.click(screen.getByRole("button", { name: /Presets/ }));
    for (const item of screen.getAllByRole("menuitemradio")) {
      expect(item.getAttribute("aria-checked")).toBe("false");
    }
  });

  test("disables the trigger while a job is running", () => {
    render(<PresetMenu presets={PRESETS} activeId={null} disabled={true} onApply={() => {}} />);
    expect((screen.getByRole("button", { name: /Presets/ }) as HTMLButtonElement).disabled).toBe(
      true,
    );
  });
});
