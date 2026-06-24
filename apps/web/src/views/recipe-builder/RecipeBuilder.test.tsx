import "@testing-library/jest-dom/vitest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ExposableTargetsResponseDto } from "../../api/generated/ExposableTargetsResponseDto";

vi.mock("../../api/client", () => ({
  fetchWorkflowVersions: vi.fn(),
  fetchExposableTargets: vi.fn(),
  createRecipe: vi.fn(),
}));

import {
  createRecipe,
  fetchExposableTargets,
  fetchWorkflowVersions,
} from "../../api/client";
import { RecipeBuilder } from "./RecipeBuilder";

const SCAN: ExposableTargetsResponseDto = {
  workflow_id: "wf-1",
  workflow_version: "v1",
  inputs: [
    {
      target: "input:prompt",
      kind: "input",
      label: "prompt",
      schema: null,
      node_id: null,
      port_type: "string",
      required: false,
      current_default: null,
    },
  ],
  node_configs: [
    {
      target: "node:gen.config.steps",
      kind: "node_config",
      label: "steps",
      schema: { type: "integer" },
      node_id: "gen",
      port_type: null,
      required: true,
      current_default: 16,
    },
  ],
};

function renderBuilder() {
  return render(<RecipeBuilder workflowId="wf-1" initialVersion="v1" />);
}

async function scan() {
  fireEvent.click(screen.getByTestId("scan-targets"));
  await waitFor(() =>
    expect(screen.getByTestId("expose-input:prompt")).toBeInTheDocument(),
  );
}

beforeEach(() => {
  vi.mocked(fetchWorkflowVersions).mockReset();
  vi.mocked(fetchExposableTargets).mockReset();
  vi.mocked(createRecipe).mockReset();
  vi.mocked(fetchWorkflowVersions).mockResolvedValue([
    { version: "v1", label: "1.0.0" },
  ] as never);
  vi.mocked(fetchExposableTargets).mockResolvedValue(SCAN);
  vi.mocked(createRecipe).mockResolvedValue({
    id: "recipe-123",
  } as never);
});

describe("RecipeBuilder", () => {
  it("renders an expose control for every scanned target", async () => {
    renderBuilder();
    await scan();
    expect(screen.getByTestId("expose-input:prompt")).toBeInTheDocument();
    expect(
      screen.getByTestId("expose-node:gen.config.steps"),
    ).toBeInTheDocument();
  });

  it("flags a lock-conflict and disables Save when a preset writes a locked control", async () => {
    renderBuilder();
    await scan();
    fireEvent.click(screen.getByTestId("expose-node:gen.config.steps"));
    // Lock the exposed control, then capture a preset that snapshots it.
    fireEvent.change(screen.getByTestId("mode-steps"), {
      target: { value: "locked" },
    });
    fireEvent.change(screen.getByTestId("preset-label"), {
      target: { value: "Fast" },
    });
    fireEvent.click(screen.getByTestId("capture-preset"));

    expect(screen.getByTestId("lock-conflict")).toBeInTheDocument();
    expect(screen.getByTestId("save-recipe")).toBeDisabled();
  });

  it("does not call createRecipe when nothing is exposed", () => {
    renderBuilder();
    fireEvent.click(screen.getByTestId("save-recipe"));
    expect(createRecipe).not.toHaveBeenCalled();
  });

  it("POSTs the full projection on save", async () => {
    renderBuilder();
    await scan();
    fireEvent.click(screen.getByTestId("expose-node:gen.config.steps"));
    fireEvent.change(screen.getByLabelText("Display name"), {
      target: { value: "My Recipe" },
    });
    fireEvent.change(screen.getByLabelText("Primary artifact"), {
      target: { value: "image" },
    });

    await waitFor(() =>
      expect(screen.getByTestId("save-recipe")).not.toBeDisabled(),
    );
    fireEvent.click(screen.getByTestId("save-recipe"));

    await waitFor(() => expect(createRecipe).toHaveBeenCalledTimes(1));
    const body = vi.mocked(createRecipe).mock.calls[0]![0];
    expect(body.display_name).toBe("My Recipe");
    expect(body.workflow_id).toBe("wf-1");
    expect(body.workflow_version).toBe("v1");
    expect(body.projection.controls).toHaveLength(1);
    expect(body.projection.controls[0]!.bindings).toEqual([
      "node:gen.config.steps",
    ]);
    expect(body.projection.output.primary_artifact).toBe("image");
    await waitFor(() =>
      expect(screen.getByTestId("save-success")).toBeInTheDocument(),
    );
  });
});
