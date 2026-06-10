import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { type ReactElement } from "react";
import { afterEach, describe, expect, test } from "vitest";
import { RenderRequestProvider, useRenderRequest } from "../../src/store/render_request_store";
import { GenerationModeToggle } from "../../src/views/recipe/components/generation_mode_toggle";
import { SeedControl } from "../../src/views/recipe/components/seed_control";

let captured: ReturnType<typeof useRenderRequest> | null = null;

function Probe(): null {
  captured = useRenderRequest();
  return null;
}

function Harness(): ReactElement {
  const { params, setMode } = useRenderRequest();
  const mode = params.mode ?? "image_to_video";
  return (
    <>
      <GenerationModeToggle value={mode} onChange={setMode} />
      {mode === "text_to_video" && <SeedControl />}
    </>
  );
}

function Root(): ReactElement {
  return (
    <RenderRequestProvider>
      <Probe />
      <Harness />
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

describe("SeedControl", () => {
  test("seed input is hidden in image-to-video mode", () => {
    render(<Root />);
    expect(screen.queryByRole("spinbutton", { name: "Seed" })).toBeNull();
  });

  test("seed input surfaces only in text-to-video mode", () => {
    render(<Root />);
    selectMode("Text-to-Video");
    expect(screen.getByRole("spinbutton", { name: "Seed" })).toBeDefined();
  });

  test("defaults to an unset seed", () => {
    render(<Root />);
    selectMode("Text-to-Video");
    expect(captured?.params.seed).toBeUndefined();
  });

  test("a numeric entry writes the seed into render params", () => {
    render(<Root />);
    selectMode("Text-to-Video");
    fireEvent.change(screen.getByRole("spinbutton", { name: "Seed" }), {
      target: { value: "98765" },
    });
    expect(captured?.params.seed).toBe(98765);
  });

  test("clearing the input removes the seed from render params", () => {
    render(<Root />);
    selectMode("Text-to-Video");
    const input = screen.getByRole("spinbutton", { name: "Seed" });
    fireEvent.change(input, { target: { value: "42" } });
    expect(captured?.params.seed).toBe(42);
    fireEvent.change(input, { target: { value: "" } });
    expect(captured?.params.seed).toBeUndefined();
  });
});
