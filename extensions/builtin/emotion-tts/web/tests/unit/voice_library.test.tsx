import { describe, expect, it, vi, beforeEach } from "vitest";
import { act, render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Popover } from "../../src/components/popover";
import { VoiceCard } from "../../src/views/recipe/components/voice_library/voice_card";
import type { VoiceAsset } from "../../src/services/voice_assets_client";

vi.mock("../../src/services/voice_assets_client", async () => {
  const actual = await vi.importActual<typeof import("../../src/services/voice_assets_client")>(
    "../../src/services/voice_assets_client",
  );
  return {
    ...actual,
    getVoiceAssetStreamUrl: () => null,
  };
});

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Popover primitive", () => {
  it("toggles open on click and closes on Escape", () => {
    render(
      <Popover label="Syntax">
        <p>Hello popover content</p>
      </Popover>,
    );

    const trigger = screen.getByRole("button", { name: /syntax/i });
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByText("Hello popover content")).toBeNull();

    act(() => {
      trigger.click();
    });
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByText("Hello popover content")).toBeTruthy();

    act(() => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
  });

  it("closes when a click lands outside the anchor", () => {
    render(
      <div>
        <Popover label="Syntax">
          <p>Body</p>
        </Popover>
        <div data-testid="outside">outside</div>
      </div>,
    );

    const trigger = screen.getByRole("button", { name: /syntax/i });
    act(() => {
      trigger.click();
    });
    expect(trigger.getAttribute("aria-expanded")).toBe("true");

    act(() => {
      const outside = screen.getByTestId("outside");
      outside.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
  });
});

const ASSET_FIXTURE: VoiceAsset = {
  voiceAssetId: "voice_alpha",
  deploymentId: "dep_x",
  displayName: "elena_session_03",
  kind: "speaker",
  audioArtifactRef: "artifact://mem/x",
  contentSha256: "a".repeat(64),
  referenceText: null,
  sampleRate: 48000,
  durationMs: 42000,
  sourceType: "upload",
  isActive: true,
  createdAt: 0,
  updatedAt: 0,
};

describe("VoiceCard rename UX", () => {
  it("commits a rename via Enter and surfaces it to the parent", async () => {
    const onRename = vi.fn(async () => undefined);

    render(
      <VoiceCard
        asset={ASSET_FIXTURE}
        presentation="upload"
        usedBy={[]}
        isPlaying={false}
        onTogglePlay={() => undefined}
        onRename={onRename}
        onCopyName={() => undefined}
      />,
    );

    const title = screen.getByRole("button", { name: /elena_session_03/i });
    fireEvent.doubleClick(title);

    const input = await screen.findByLabelText(/rename elena_session_03/i);
    fireEvent.change(input, { target: { value: "Elena (warm take)" } });
    fireEvent.keyDown(input, { key: "Enter" });

    await waitFor(() => {
      expect(onRename).toHaveBeenCalledWith("Elena (warm take)");
    });
  });

  it("escapes out of rename without firing the rename handler", async () => {
    const onRename = vi.fn();
    render(
      <VoiceCard
        asset={ASSET_FIXTURE}
        presentation="upload"
        usedBy={[]}
        isPlaying={false}
        onTogglePlay={() => undefined}
        onRename={onRename}
        onCopyName={() => undefined}
      />,
    );

    const title = screen.getByRole("button", { name: /elena_session_03/i });
    fireEvent.doubleClick(title);
    const input = await screen.findByLabelText(/rename elena_session_03/i);
    fireEvent.change(input, { target: { value: "should not commit" } });
    fireEvent.keyDown(input, { key: "Escape" });
    expect(onRename).not.toHaveBeenCalled();
  });
});
