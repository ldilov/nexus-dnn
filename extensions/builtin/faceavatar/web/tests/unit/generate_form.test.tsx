import { fireEvent, render, screen } from "@testing-library/react";
import { type ReactElement, useEffect } from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

interface StartBody {
  image: string;
  params: Record<string, unknown>;
}

const { startGenerate, cancelGenerate, subscribeGenerateStream } = vi.hoisted(() => ({
  startGenerate: vi.fn(async (_body: StartBody) => ({ jobId: "job-test" })),
  cancelGenerate: vi.fn(async () => ({ status: "cancelled" as const })),
  subscribeGenerateStream: vi.fn(() => () => undefined),
}));

vi.mock("../../src/services/generate_client", () => ({
  startGenerate,
  cancelGenerate,
  subscribeGenerateStream,
}));

vi.mock("../../src/services/history_client", () => ({
  getGenerationJob: vi.fn(async () => {
    throw new Error("no job");
  }),
}));

import { DEFAULT_PARAMS } from "../../src/domain/defaults";
import {
  GenerateRequestProvider,
  useGenerateRequest,
} from "../../src/store/generate_request_store";
import { GenerateForm } from "../../src/views/generate/components/generate_form";

function SeedImage({ ref, name }: { ref: string; name: string }): null {
  const { setImage } = useGenerateRequest();
  useEffect(() => {
    setImage(ref, name);
  }, [setImage, ref, name]);
  return null;
}

function StartButton(): ReactElement {
  const { startJob } = useGenerateRequest();
  return (
    <button type="button" onClick={() => void startJob()}>
      run
    </button>
  );
}

function firstCall(): [StartBody] {
  const call = startGenerate.mock.calls[0];
  if (!call) throw new Error("startGenerate was not called");
  return call;
}

function renderForm(withImage = false): void {
  render(
    <GenerateRequestProvider>
      {withImage ? <SeedImage ref="img-ref-1" name="face.png" /> : null}
      <GenerateForm />
      <StartButton />
    </GenerateRequestProvider>,
  );
}

describe("GenerateForm", () => {
  beforeEach(() => {
    startGenerate.mockClear();
    sessionStorage.clear();
  });
  afterEach(() => {
    sessionStorage.clear();
  });

  test("renders primary controls and hides advanced fields by default", () => {
    renderForm();
    expect(screen.getByText("Seed")).toBeTruthy();
    expect(screen.getByText("Expression")).toBeTruthy();
    expect(screen.getByText("Crop")).toBeTruthy();
    expect(screen.queryByText("Identity iters")).toBeNull();
    expect(screen.queryByText("Residency")).toBeNull();
  });

  test("expands the Advanced / Quality section to reveal the new controls", () => {
    renderForm();
    const header = screen.getByRole("button", { name: /Advanced \/ Quality/ });
    expect(header.getAttribute("aria-expanded")).toBe("false");

    fireEvent.click(header);

    expect(header.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByText("Identity iters")).toBeTruthy();
    expect(screen.getByText("Residency")).toBeTruthy();
  });

  test("sends the full default param set when nothing is changed", async () => {
    renderForm(true);
    fireEvent.click(screen.getByRole("button", { name: "run" }));
    await vi.waitFor(() => expect(startGenerate).toHaveBeenCalledTimes(1));

    const [body] = firstCall();
    expect(body.image).toBe("img-ref-1");
    expect(body.params).toEqual(DEFAULT_PARAMS);
  });

  test("changed advanced fields flow into the payload with correct types", async () => {
    renderForm(true);
    fireEvent.click(screen.getByRole("button", { name: /Advanced \/ Quality/ }));

    const residency = screen.getByLabelText("Residency") as HTMLSelectElement;
    fireEvent.change(residency, { target: { value: "low_vram" } });

    fireEvent.click(screen.getByRole("button", { name: "run" }));
    await vi.waitFor(() => expect(startGenerate).toHaveBeenCalledTimes(1));

    const [{ params }] = firstCall();
    expect(params.residency).toBe("low_vram");
  });

  test("changed primary select fields flow into the payload", async () => {
    renderForm(true);
    const expression = screen.getByLabelText("Expression") as HTMLSelectElement;
    fireEvent.change(expression, { target: { value: "source" } });

    fireEvent.click(screen.getByRole("button", { name: "run" }));
    await vi.waitFor(() => expect(startGenerate).toHaveBeenCalledTimes(1));

    const [{ params }] = firstCall();
    expect(params.expression).toBe("source");
  });

  test("applies a quality preset to the whole param set", async () => {
    renderForm(true);
    fireEvent.click(screen.getByRole("button", { name: /Presets/ }));
    fireEvent.click(screen.getByRole("menuitemradio", { name: /Fast/ }));

    fireEvent.click(screen.getByRole("button", { name: "run" }));
    await vi.waitFor(() => expect(startGenerate).toHaveBeenCalledTimes(1));

    const [{ params }] = firstCall();
    expect(params.arc_iters).toBe(250);
    expect(params.crop).toBe("bust");
    expect(params.expression).toBe("neutral");
  });

  test("toggling the texture switch flows into the payload", async () => {
    renderForm(true);
    const toggle = screen.getByRole("switch", { name: "Project photo as texture" });
    fireEvent.click(toggle);

    fireEvent.click(screen.getByRole("button", { name: "run" }));
    await vi.waitFor(() => expect(startGenerate).toHaveBeenCalledTimes(1));

    const [{ params }] = firstCall();
    expect(params.texture).toBe(false);
  });
});
