import "@testing-library/jest-dom/vitest";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { RecipeFieldWidget } from "./RecipeFieldWidget";
import type { Control } from "../../api/generated/Control";
import type { ControlHintDto } from "../../api/generated/ControlHintDto";

function makeControl(overrides: Partial<Control> = {}): Control {
  return {
    control_id: "ctrl_1",
    kind: "string",
    label: "Prompt",
    help_text: null,
    mode: "basic",
    default_value: "",
    widget_hint: null,
    bindings: ["node_a.param"],
    ...overrides,
  };
}

function makeHint(overrides: Partial<ControlHintDto> = {}): ControlHintDto {
  return {
    control_id: "ctrl_1",
    kind: null,
    min: null,
    max: null,
    step: null,
    enum_values: null,
    required: null,
    ...overrides,
  };
}

describe("RecipeFieldWidget", () => {
  it("maps string kind to a text input", () => {
    const onChange = vi.fn();
    render(
      <RecipeFieldWidget
        control={makeControl({ kind: "string" })}
        value=""
        onChange={onChange}
      />,
    );
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("maps int kind to a number input", () => {
    render(
      <RecipeFieldWidget
        control={makeControl({ kind: "int" })}
        value={0}
        onChange={vi.fn()}
      />,
    );
    const input = screen.getByRole("spinbutton");
    expect(input).toBeInTheDocument();
  });

  it("maps float kind to a number input", () => {
    render(
      <RecipeFieldWidget
        control={makeControl({ kind: "float" })}
        value={0.5}
        onChange={vi.fn()}
      />,
    );
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
  });

  it("maps bool kind to a checkbox", () => {
    render(
      <RecipeFieldWidget
        control={makeControl({ kind: "bool" })}
        value={false}
        onChange={vi.fn()}
      />,
    );
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("maps enum kind to a select", () => {
    render(
      <RecipeFieldWidget
        control={makeControl({ kind: "enum" })}
        hint={makeHint({ enum_values: ["a", "b"] })}
        value="a"
        onChange={vi.fn()}
      />,
    );
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("maps asset kind to a file input stub", () => {
    render(
      <RecipeFieldWidget
        control={makeControl({ kind: "asset" })}
        value={null}
        onChange={vi.fn()}
      />,
    );
    // asset stub is an <input type="file"> — no ARIA role but has data-testid
    expect(screen.getByTestId("asset-picker")).toBeInTheDocument();
  });

  it("renders nothing for preset_selector kind", () => {
    const { container } = render(
      <RecipeFieldWidget
        control={makeControl({ kind: "preset_selector" })}
        value={null}
        onChange={vi.fn()}
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("applies min, max, step from hint to number input", () => {
    render(
      <RecipeFieldWidget
        control={makeControl({ kind: "int" })}
        hint={makeHint({ min: 1, max: 100, step: 5 })}
        value={50}
        onChange={vi.fn()}
      />,
    );
    const input = screen.getByRole("spinbutton") as HTMLInputElement;
    expect(input.min).toBe("1");
    expect(input.max).toBe("100");
    expect(input.step).toBe("5");
  });

  it("renders enum options from hint enum_values", () => {
    render(
      <RecipeFieldWidget
        control={makeControl({ kind: "enum" })}
        hint={makeHint({ enum_values: ["fast", "balanced", "quality"] })}
        value="balanced"
        onChange={vi.fn()}
      />,
    );
    const options = screen.getAllByRole("option");
    expect(options.map((o) => o.textContent)).toEqual(["fast", "balanced", "quality"]);
  });

  it("renders nothing for hidden mode", () => {
    const { container } = render(
      <RecipeFieldWidget
        control={makeControl({ kind: "string", mode: "hidden" })}
        value=""
        onChange={vi.fn()}
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders the widget disabled for locked mode", () => {
    render(
      <RecipeFieldWidget
        control={makeControl({ kind: "string", mode: "locked" })}
        value="fixed"
        onChange={vi.fn()}
      />,
    );
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it("calls onChange when value changes on a text input", () => {
    const onChange = vi.fn();
    render(
      <RecipeFieldWidget
        control={makeControl({ kind: "string" })}
        value=""
        onChange={onChange}
      />,
    );
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "hello" } });
    expect(onChange).toHaveBeenCalledWith("hello");
  });
});
