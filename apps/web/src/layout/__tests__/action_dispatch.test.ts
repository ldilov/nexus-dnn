import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    message: vi.fn(),
  },
}));

import { dispatchLayoutAction } from "../action_dispatch";

describe("dispatchLayoutAction", () => {
  let dispatched: Event[];
  let originalDispatch: typeof window.dispatchEvent;

  beforeEach(() => {
    dispatched = [];
    originalDispatch = window.dispatchEvent.bind(window);
    window.dispatchEvent = ((event: Event) => {
      dispatched.push(event);
      return true;
    }) as typeof window.dispatchEvent;
  });

  afterEach(() => {
    window.dispatchEvent = originalDispatch;
  });

  it("llm.open_model_browser dispatches local-llm/model-load-dialog:open", async () => {
    await dispatchLayoutAction("llm.open_model_browser");
    expect(dispatched.some((e) => e.type === "local-llm/model-load-dialog:open")).toBe(true);
  });

  it("does not fire the legacy model-picker:open event", async () => {
    await dispatchLayoutAction("llm.open_model_browser");
    expect(dispatched.some((e) => e.type === "local-llm/model-picker:open")).toBe(false);
  });
});
