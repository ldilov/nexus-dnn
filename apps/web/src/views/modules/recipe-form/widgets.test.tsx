import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ControlWidget } from "./widgets";
import type { FormControlDto } from "../../../api/generated/FormControlDto";

const ctrl = (over: Partial<FormControlDto>): FormControlDto => ({
  control_id: "c",
  kind: "string",
  label: "C",
  help_text: null,
  mode: "basic",
  default_value: null,
  widget_hint: null,
  schema_hint: null,
  ...over,
});

describe("ControlWidget", () => {
  it("renders a select for enum hints", () => {
    render(
      <ControlWidget
        control={ctrl({ schema_hint: { value_type: "string", enum_values: ["a", "b"], minimum: null, maximum: null } })}
        value="a"
        onChange={() => {}}
      />,
    );
    expect(screen.getByRole("combobox")).toBeTruthy();
  });
  it("locked control is disabled", () => {
    render(<ControlWidget control={ctrl({ mode: "locked" })} value="x" onChange={() => {}} />);
    expect((screen.getByLabelText("C") as HTMLTextAreaElement).disabled).toBe(true);
  });
  it("number widget emits numbers", () => {
    const onChange = vi.fn();
    render(<ControlWidget control={ctrl({ kind: "int" })} value={1} onChange={onChange} />);
    fireEvent.change(screen.getByLabelText("C"), { target: { value: "5" } });
    expect(onChange).toHaveBeenCalledWith(5);
  });
  it("bool widget emits a checkbox change", () => {
    const onChange = vi.fn();
    render(<ControlWidget control={ctrl({ kind: "bool" })} value={false} onChange={onChange} />);
    fireEvent.click(screen.getByLabelText("C"));
    expect(onChange).toHaveBeenCalledWith(true);
  });
  it("number widget emits null when cleared", () => {
    const onChange = vi.fn();
    render(<ControlWidget control={ctrl({ kind: "float" })} value={2} onChange={onChange} />);
    fireEvent.change(screen.getByLabelText("C"), { target: { value: "" } });
    expect(onChange).toHaveBeenCalledWith(null);
  });
});
