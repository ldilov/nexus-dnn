import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { act } from "react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { DEFAULT_SETTINGS } from "../../src/domain/settings_defaults";
import {
  RenderRequestProvider,
  useRenderRequest,
} from "../../src/store/render_request_store";
import { SettingsView } from "../../src/views/settings/settings.view";

vi.mock("../../src/services/settings_client", () => ({
  saveSettings: vi.fn().mockResolvedValue(DEFAULT_SETTINGS),
}));

vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

let captured: ReturnType<typeof useRenderRequest> | null = null;

function Probe(): null {
  captured = useRenderRequest();
  return null;
}

afterEach(() => {
  captured = null;
  cleanup();
  vi.clearAllMocks();
});

function switchByLabel(name: RegExp): HTMLButtonElement {
  return screen.getByRole("switch", { name }) as HTMLButtonElement;
}

describe("SettingsView fast-parallel toggles", () => {
  test("renders both toggles reflecting the default settings (fast on, batch off)", () => {
    render(
      <RenderRequestProvider>
        <Probe />
        <SettingsView />
      </RenderRequestProvider>,
    );

    const fast = switchByLabel(/fast parallel/i);
    const batch = switchByLabel(/batch prompt encoding/i);
    expect(fast.getAttribute("aria-checked")).toBe("true");
    expect(batch.getAttribute("aria-checked")).toBe("false");
  });

  test("clicking a toggle flips its checked state in the draft", () => {
    render(
      <RenderRequestProvider>
        <Probe />
        <SettingsView />
      </RenderRequestProvider>,
    );

    const batch = switchByLabel(/batch prompt encoding/i);
    expect(batch.getAttribute("aria-checked")).toBe("false");
    act(() => {
      fireEvent.click(batch);
    });
    expect(switchByLabel(/batch prompt encoding/i).getAttribute("aria-checked")).toBe("true");
  });

  test("clicking fast-parallel flips it off without touching batch", () => {
    render(
      <RenderRequestProvider>
        <Probe />
        <SettingsView />
      </RenderRequestProvider>,
    );

    const fast = switchByLabel(/fast parallel/i);
    expect(fast.getAttribute("aria-checked")).toBe("true");
    act(() => {
      fireEvent.click(fast);
    });
    expect(switchByLabel(/fast parallel/i).getAttribute("aria-checked")).toBe("false");
    expect(switchByLabel(/batch prompt encoding/i).getAttribute("aria-checked")).toBe("false");
  });
});
