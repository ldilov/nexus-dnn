import "@testing-library/jest-dom/vitest";
import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ExplainPanel } from "./ExplainPanel";
import type { PresetExplanationDto } from "../../api/generated/PresetExplanationDto";

function makeExplanation(
  overrides: Partial<PresetExplanationDto> = {},
): PresetExplanationDto {
  return {
    entries: [],
    ...overrides,
  };
}

describe("ExplainPanel", () => {
  it("shows each changed control with its value and targets", () => {
    const explanation = makeExplanation({
      entries: [
        {
          control_id: "steps",
          label: "Sampling Steps",
          final_value: 30,
          targets: ["sampler.steps", "refiner.steps"],
          source: "preset",
        },
        {
          control_id: "model",
          label: "Base Model",
          final_value: "cinematic-v2",
          targets: ["loader.model_name"],
          source: "preset",
        },
      ],
    });
    render(<ExplainPanel explanation={explanation} />);

    expect(screen.getByText("Sampling Steps")).toBeInTheDocument();
    expect(screen.getByText("Base Model")).toBeInTheDocument();

    expect(screen.getByText("30")).toBeInTheDocument();
    expect(screen.getByText("cinematic-v2")).toBeInTheDocument();

    expect(screen.getByText("sampler.steps")).toBeInTheDocument();
    expect(screen.getByText("refiner.steps")).toBeInTheDocument();
    expect(screen.getByText("loader.model_name")).toBeInTheDocument();
  });

  it("renders no target list for an entry with empty targets", () => {
    const explanation = makeExplanation({
      entries: [
        {
          control_id: "seed",
          label: "Seed",
          final_value: 42,
          targets: [],
          source: "preset",
        },
      ],
    });
    render(<ExplainPanel explanation={explanation} />);

    const entry = screen.getByTestId("explain-entry");
    expect(within(entry).getByText("Seed")).toBeInTheDocument();
    expect(within(entry).getByText("42")).toBeInTheDocument();
    expect(within(entry).queryByTestId("explain-targets")).toBeNull();
  });

  it("renders a muted empty-state line when there are no entries", () => {
    render(<ExplainPanel explanation={makeExplanation({ entries: [] })} />);
    expect(
      screen.getByText("This preset changes no controls."),
    ).toBeInTheDocument();
  });
});
