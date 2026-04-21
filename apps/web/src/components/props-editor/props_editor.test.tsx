import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { PropsEditor } from "./props_editor";
import type { ComponentMetadata } from "../../services/ui_catalog";

function buildMeta(
  overrides: Partial<ComponentMetadata> = {},
): ComponentMetadata {
  return {
    name: "split_panel",
    display_name: "Split Panel",
    category: "layout",
    description: "Two-pane layout with a draggable divider.",
    props_schema: {
      version: "2020-12",
      schema: {
        type: "object",
        properties: {
          direction: {
            type: "string",
            enum: ["horizontal", "vertical"],
            default: "horizontal",
          },
          count: { type: "integer", minimum: 1, maximum: 5 },
          title: { type: "string", description: "Optional heading" },
        },
        required: ["direction"],
      },
    },
    examples: [
      {
        title: "Default",
        yaml: "type: split_panel\nprops:\n  direction: horizontal\n",
        tag: null,
      },
    ],
    docs_href: null,
    ...overrides,
  };
}

describe("PropsEditor", () => {
  afterEach(() => cleanup());

  it("renders empty state when schema declares no properties", () => {
    const meta = buildMeta({
      props_schema: {
        version: "2020-12",
        schema: { type: "object", properties: {}, additionalProperties: true },
      },
    });
    render(
      <PropsEditor
        metadata={meta}
        values={{}}
        errors={{}}
        onChange={() => {}}
      />,
    );
    expect(
      screen.getByText(/takes no configurable props/i),
    ).toBeInTheDocument();
  });

  it("renders one widget per schema property and marks required ones", () => {
    render(
      <PropsEditor
        metadata={buildMeta()}
        values={{}}
        errors={{}}
        onChange={() => {}}
      />,
    );
    expect(screen.getByRole("combobox")).toBeInTheDocument(); // direction (enum)
    expect(screen.getByRole("spinbutton")).toBeInTheDocument(); // count (number)
    expect(screen.getByRole("textbox")).toBeInTheDocument(); // title (string)
    expect(
      screen.getByRole("form", { name: /props editor for split_panel/i }),
    ).toBeInTheDocument();
    const requiredMarker = screen.getByLabelText("required");
    expect(requiredMarker).toBeInTheDocument();
  });

  it("emits immutable onChange with the new value", () => {
    const onChange = vi.fn();
    render(
      <PropsEditor
        metadata={buildMeta()}
        values={{ direction: "horizontal" }}
        errors={{}}
        onChange={onChange}
      />,
    );
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "vertical" },
    });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0]![0]).toEqual({ direction: "vertical" });
  });

  it("renders a field-level error next to the offending input", () => {
    render(
      <PropsEditor
        metadata={buildMeta()}
        values={{ direction: "" }}
        errors={{ direction: "Required" }}
        onChange={() => {}}
      />,
    );
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Required");
  });

  it("removes a prop from the emitted values when widget returns undefined", () => {
    const onChange = vi.fn();
    render(
      <PropsEditor
        metadata={buildMeta()}
        values={{ direction: "horizontal", count: 2 }}
        errors={{}}
        onChange={onChange}
      />,
    );
    fireEvent.change(screen.getByRole("spinbutton"), {
      target: { value: "" },
    });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0]![0]).toEqual({ direction: "horizontal" });
  });
});
