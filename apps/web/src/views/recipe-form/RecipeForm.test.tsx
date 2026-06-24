import "@testing-library/jest-dom/vitest";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { fireEvent, render, screen, waitFor, act } from "@testing-library/react";
import { SWRConfig } from "swr";
import { RecipeForm } from "./RecipeForm";
import type { RecipeProjection } from "../../api/generated/RecipeProjection";
import type { ControlHintDto } from "../../api/generated/ControlHintDto";
import type { Control } from "../../api/generated/Control";
import type { RecipeFormDto } from "../../api/generated/RecipeFormDto";

// ─── Module mocks ──────────────────────────────────────────────────────────

vi.mock("../../api/client", () => ({
  fetchRecipeForm: vi.fn(),
  submitRecipeRun: vi.fn(),
}));

vi.mock("../../root_layout", () => ({
  useRootOutletContext: vi.fn(),
}));

vi.mock("./RecipePinnedGraph", () => ({
  RecipePinnedGraph: ({
    workflowId,
    workflowVersion,
  }: {
    workflowId: string;
    workflowVersion: string;
  }) => (
    <div data-testid="recipe-pinned-graph">
      {workflowId}@{workflowVersion}
    </div>
  ),
}));

// scrollIntoView / matchMedia stubs for jsdom
Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
  value: vi.fn(),
  writable: true,
});
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

import { fetchRecipeForm, submitRecipeRun } from "../../api/client";
import { useRootOutletContext } from "../../root_layout";

// ─── Shared fixtures ───────────────────────────────────────────────────────

function makeControl(overrides: Partial<Control> = {}): Control {
  return {
    control_id: "prompt",
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
    control_id: "prompt",
    kind: "string",
    min: null,
    max: null,
    step: null,
    enum_values: null,
    required: true,
    ...overrides,
  };
}

function makeProjection(overrides: Partial<RecipeProjection> = {}): RecipeProjection {
  return {
    schema_version: 1,
    sections: [
      { id: "s_basic", title: "Basic", order: BigInt(0), control_ids: ["prompt"] },
      { id: "s_advanced", title: "Advanced", order: BigInt(1), control_ids: ["steps"] },
    ],
    controls: [
      makeControl({ control_id: "prompt", label: "Prompt", mode: "basic" }),
      makeControl({
        control_id: "steps",
        kind: "int",
        label: "Steps",
        mode: "advanced",
        default_value: 20,
      }),
    ],
    presets: [
      {
        preset_id: "preset_fast",
        label: "Fast",
        description: null,
        source: "recipe" as const,
        values: { prompt: "fast preset prompt", steps: 5 },
      },
    ],
    output: {
      primary_artifact: "output_video",
      secondary: [],
      preview_style: "player",
      show_intermediate: false,
    },
    custom_ui: null,
    ...overrides,
  };
}

function makeFormDto(overrides: Partial<RecipeFormDto> = {}): RecipeFormDto {
  return {
    projection: makeProjection(),
    control_hints: [
      makeHint({ control_id: "prompt", required: true }),
      makeHint({ control_id: "steps", kind: "int", required: false, min: 1, max: 100 }),
    ],
    workflow_id: "wf-1",
    workflow_version: "v1",
    ...overrides,
  };
}

/** Wraps in SWR provider with no caching (dedupingInterval=0) for predictable tests. */
function renderWithSwr(ui: React.ReactElement) {
  return render(
    <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
      {ui}
    </SWRConfig>,
  );
}

// ─── Tests ─────────────────────────────────────────────────────────────────

describe("RecipeForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useRootOutletContext as ReturnType<typeof vi.fn>).mockReturnValue({
      runId: null,
      nodeProgress: {},
    });
    (fetchRecipeForm as ReturnType<typeof vi.fn>).mockResolvedValue(makeFormDto());
    (submitRecipeRun as ReturnType<typeof vi.fn>).mockResolvedValue({ run_id: "r1" });
  });

  it("renders sections with advanced collapsed", async () => {
    renderWithSwr(<RecipeForm recipeId="rec1" />);

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText("Basic")).toBeInTheDocument();
    });

    // Basic section is visible and open
    expect(screen.getByText("Basic")).toBeInTheDocument();
    // Advanced section exists but its <details> should be collapsed by default
    expect(screen.getByText("Advanced")).toBeInTheDocument();

    // The advanced control (Steps) should be inside a collapsed <details>
    const advancedDetails = screen
      .getByText("Advanced")
      .closest("details") as HTMLDetailsElement | null;
    expect(advancedDetails).not.toBeNull();
    expect(advancedDetails?.open).toBe(false);
  });

  it("disables submit while validation errors exist", async () => {
    renderWithSwr(<RecipeForm recipeId="rec1" />);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /run/i })).toBeInTheDocument();
    });

    // "prompt" has required=true, default_value="", so form is invalid
    const submitBtn = screen.getByRole("button", { name: /run/i });
    expect(submitBtn).toBeDisabled();
  });

  it("selecting a preset overlays its values onto controls", async () => {
    renderWithSwr(<RecipeForm recipeId="rec1" />);

    await waitFor(() => {
      expect(screen.getByText("Fast")).toBeInTheDocument();
    });

    // Click the "Fast" preset chip
    fireEvent.click(screen.getByText("Fast"));

    // Prompt input should now show the preset value
    await waitFor(() => {
      const promptInput = screen.getByLabelText("Prompt") as HTMLInputElement;
      expect(promptInput.value).toBe("fast preset prompt");
    });
  });

  it("locked controls are not overridden by preset selection", async () => {
    const formDto = makeFormDto({
      projection: makeProjection({
        controls: [
          makeControl({ control_id: "prompt", label: "Prompt", mode: "basic", default_value: "locked-default" }),
          makeControl({
            control_id: "steps",
            kind: "int",
            label: "Steps",
            mode: "locked",
            default_value: 42,
          }),
        ],
        presets: [
          {
            preset_id: "p_fast",
            label: "Fast",
            description: null,
            source: "recipe" as const,
            values: { prompt: "preset prompt", steps: 5 },
          },
        ],
      }),
      control_hints: [
        makeHint({ control_id: "prompt", required: false }),
        makeHint({ control_id: "steps", kind: "int", required: false }),
      ],
    });
    (fetchRecipeForm as ReturnType<typeof vi.fn>).mockResolvedValue(formDto);

    renderWithSwr(<RecipeForm recipeId="rec1" />);

    await waitFor(() => {
      expect(screen.getByText("Fast")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Fast"));

    await waitFor(() => {
      // locked control keeps its default, never the preset value
      const stepsInput = screen.getByLabelText("Steps") as HTMLInputElement;
      expect(stepsInput.disabled).toBe(true);
      // Its value should remain 42 (default), not 5 (preset)
      expect(stepsInput.value).toBe("42");
    });
  });

  it("on valid submit posts control_values + preset_id and transitions to run progress", async () => {
    (useRootOutletContext as ReturnType<typeof vi.fn>).mockReturnValue({
      runId: "r1",
      nodeProgress: { node_a: { status: "running", progress: 0.5 } },
    });

    renderWithSwr(<RecipeForm recipeId="rec1" />);

    await waitFor(() => {
      expect(screen.getByText("Fast")).toBeInTheDocument();
    });

    // Select preset to fill required "prompt"
    fireEvent.click(screen.getByText("Fast"));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /run/i })).not.toBeDisabled();
    });

    // Submit the form
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /run/i }));
    });

    await waitFor(() => {
      expect(submitRecipeRun).toHaveBeenCalledWith("rec1", {
        control_values: expect.objectContaining({ prompt: "fast preset prompt" }),
        preset_id: "preset_fast",
      });
    });

    // Progress panel should appear
    await waitFor(() => {
      expect(screen.getByTestId("recipe-run-progress")).toBeInTheDocument();
    });
  });

  it("shows empty-form note when projection has no controls", async () => {
    (fetchRecipeForm as ReturnType<typeof vi.fn>).mockResolvedValue(
      makeFormDto({
        projection: makeProjection({ controls: [], sections: [] }),
        control_hints: [],
      }),
    );

    renderWithSwr(<RecipeForm recipeId="rec1" />);

    await waitFor(() => {
      expect(screen.getByTestId("recipe-form-empty")).toBeInTheDocument();
    });
  });

  it("renders the pinned graph when the DTO carries a workflow pin", async () => {
    renderWithSwr(<RecipeForm recipeId="rec1" />);

    await waitFor(() => {
      expect(screen.getByText("Basic")).toBeInTheDocument();
    });

    const pinned = screen.getByTestId("recipe-pinned-graph");
    expect(pinned).toBeInTheDocument();
    expect(pinned).toHaveTextContent("wf-1@v1");
  });

  it("does not render the pinned graph when the pin is null", async () => {
    (fetchRecipeForm as ReturnType<typeof vi.fn>).mockResolvedValue(
      makeFormDto({ workflow_id: null, workflow_version: null }),
    );

    renderWithSwr(<RecipeForm recipeId="rec1" />);

    await waitFor(() => {
      expect(screen.getByText("Basic")).toBeInTheDocument();
    });

    expect(screen.queryByTestId("recipe-pinned-graph")).not.toBeInTheDocument();
  });
});
