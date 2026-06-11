import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { type ReactElement, act } from "react";
import { afterEach, describe, expect, test } from "vitest";
import { validateRenderParams } from "../../src/domain/validation";
import { RenderRequestProvider, useRenderRequest } from "../../src/store/render_request_store";
import { AnchorInputs } from "../../src/views/recipe/components/anchor_inputs";
import { GenerationModeToggle } from "../../src/views/recipe/components/generation_mode_toggle";

let captured: ReturnType<typeof useRenderRequest> | null = null;

function Probe(): null {
  captured = useRenderRequest();
  return null;
}

function ModeHarness(): ReactElement {
  const { params, setMode } = useRenderRequest();
  const mode = params.mode ?? "image_to_video";
  return (
    <>
      <GenerationModeToggle value={mode} onChange={setMode} />
      <AnchorInputs refImageRequired={mode !== "text_to_video"} lastImageRequired={false} />
    </>
  );
}

function Harness(): ReactElement {
  return (
    <RenderRequestProvider>
      <Probe />
      <ModeHarness />
    </RenderRequestProvider>
  );
}

afterEach(() => {
  captured = null;
  cleanup();
});

function selectMode(label: string): void {
  fireEvent.click(screen.getByRole("radio", { name: label }));
}

describe("GenerationModeToggle", () => {
  test("defaults to image-to-video with the reference image marked required", () => {
    render(<Harness />);
    expect(captured?.params.mode).toBe("image_to_video");
    expect(screen.getByRole("radio", { name: "Image-to-Video" }).getAttribute("aria-checked")).toBe(
      "true",
    );
    expect(screen.getByText("required")).toBeDefined();
  });

  test("switching to text-to-video flips the reference image required affordance off", () => {
    render(<Harness />);
    expect(screen.getByText("required")).toBeDefined();

    selectMode("Text-to-Video");
    expect(captured?.params.mode).toBe("text_to_video");
    expect(screen.queryByText("required")).toBeNull();
    expect(screen.getAllByText("optional").length).toBeGreaterThan(0);
  });

  test("text-to-video mode removes the missing-reference blocking error", () => {
    render(<Harness />);
    selectMode("Text-to-Video");

    const issues = validateRenderParams(
      { mode: "text_to_video", ref_image_path: "", prompts: [""] },
      {
        presetId: null,
        hasRefImage: false,
        hasLastImage: false,
      },
    );
    expect(issues.some((i) => i.field === "ref_image_path" && i.severity === "error")).toBe(false);
  });

  test("the selected mode is included in the render params", () => {
    render(<Harness />);
    selectMode("Text-to-Video");
    expect(captured?.params.mode).toBe("text_to_video");

    selectMode("Image-to-Video");
    expect(captured?.params.mode).toBe("image_to_video");
  });

  test("shared field values survive a mode toggle", () => {
    render(<Harness />);
    act(() => captured?.setPrompts(["a slow dolly across the room"]));
    act(() => captured?.setRefImage("anchor.png", "/up/anchor.png"));

    selectMode("Text-to-Video");

    expect(captured?.params.prompts).toEqual(["a slow dolly across the room"]);
    expect(captured?.params.ref_image_path).toBe("/up/anchor.png");

    selectMode("Image-to-Video");
    expect(captured?.params.prompts).toEqual(["a slow dolly across the room"]);
    expect(captured?.params.ref_image_path).toBe("/up/anchor.png");
  });

  test("arrow keys move the selection within the radiogroup", () => {
    render(<Harness />);
    const group = screen.getByRole("radiogroup");

    fireEvent.keyDown(group, { key: "ArrowRight" });
    expect(captured?.params.mode).toBe("text_to_video");
    expect(screen.getByRole("radio", { name: "Text-to-Video" }).getAttribute("tabindex")).toBe("0");
    expect(screen.getByRole("radio", { name: "Image-to-Video" }).getAttribute("tabindex")).toBe(
      "-1",
    );

    fireEvent.keyDown(group, { key: "ArrowLeft" });
    expect(captured?.params.mode).toBe("image_to_video");
  });

  test("the expectation note renders only in text-to-video mode", () => {
    render(<Harness />);
    expect(screen.queryByText(/appearance is locked to the synthesized seed/i)).toBeNull();

    selectMode("Text-to-Video");
    expect(screen.getByText(/appearance is locked to the synthesized seed/i)).toBeDefined();

    selectMode("Image-to-Video");
    expect(screen.queryByText(/appearance is locked to the synthesized seed/i)).toBeNull();
  });
});
