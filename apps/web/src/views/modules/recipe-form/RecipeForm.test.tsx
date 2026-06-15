import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { RecipeForm } from "./RecipeForm";
import type { RecipeFormDto } from "../../../api/generated/RecipeFormDto";
import type { FormControlDto } from "../../../api/generated/FormControlDto";

const runRecipe = vi.fn();
vi.mock("../../../services/api_client", () => ({
  runRecipe: (...args: unknown[]) => runRecipe(...args),
}));
vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

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

const form = (controls: FormControlDto[]): RecipeFormDto => ({
  recipe_id: "r1",
  display_name: "Recipe",
  summary: "s",
  status: null,
  sections: [],
  controls,
  presets: [],
});

describe("RecipeForm", () => {
  beforeEach(() => {
    runRecipe.mockReset();
    runRecipe.mockResolvedValue({ run_id: "run-9" });
  });

  it("stays runnable when a locked control carries a fixed default", () => {
    render(
      <RecipeForm
        form={form([
          ctrl({ control_id: "locked", label: "Locked", mode: "locked", default_value: "fixed" }),
          ctrl({ control_id: "open", label: "Open", mode: "basic", default_value: "edit me" }),
        ])}
        onLaunched={() => {}}
      />,
    );
    const run = screen.getByRole("button", { name: "Run" });
    expect(run).not.toBeDisabled();
  });

  it("displays the locked default in its disabled widget", () => {
    render(
      <RecipeForm
        form={form([ctrl({ control_id: "locked", label: "Locked", mode: "locked", default_value: "fixed" })])}
        onLaunched={() => {}}
      />,
    );
    const widget = screen.getByLabelText("Locked") as HTMLTextAreaElement;
    expect(widget.disabled).toBe(true);
    expect(widget.value).toBe("fixed");
  });

  it("omits locked defaults from the submitted control_values", async () => {
    const onLaunched = vi.fn();
    render(
      <RecipeForm
        form={form([
          ctrl({ control_id: "locked", label: "Locked", mode: "locked", default_value: "fixed" }),
          ctrl({ control_id: "open", label: "Open", mode: "basic", default_value: "edit me" }),
        ])}
        onLaunched={onLaunched}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Run" }));
    await waitFor(() => expect(runRecipe).toHaveBeenCalledTimes(1));
    expect(runRecipe).toHaveBeenCalledWith("r1", {
      control_values: { open: "edit me" },
      preset_id: undefined,
    });
    await waitFor(() => expect(onLaunched).toHaveBeenCalledWith("run-9"));
  });

  it("gates Run on an out-of-range editable value and recovers when fixed", () => {
    render(
      <RecipeForm
        form={form([
          ctrl({
            control_id: "num",
            label: "Num",
            kind: "int",
            mode: "basic",
            default_value: 3,
            schema_hint: { value_type: "integer", enum_values: null, minimum: 1, maximum: 10 },
          }),
        ])}
        onLaunched={() => {}}
      />,
    );
    const run = screen.getByRole("button", { name: "Run" });
    expect(run).not.toBeDisabled();
    fireEvent.change(screen.getByLabelText("Num"), { target: { value: "99" } });
    expect(run).toBeDisabled();
    fireEvent.change(screen.getByLabelText("Num"), { target: { value: "5" } });
    expect(run).not.toBeDisabled();
  });
});
