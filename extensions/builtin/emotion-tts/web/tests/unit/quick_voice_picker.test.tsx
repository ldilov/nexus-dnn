import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import { useState } from "react";
import { QuickVoicePicker } from "../../src/views/recipe/components/quick_voice_picker";

vi.mock("../../src/services/voice_assets_client", () => ({
  listVoiceAssets: vi.fn(async () => ({
    voiceAssets: [
      {
        voiceAssetId: "voice_alpha",
        deploymentId: "dep_x",
        displayName: "Alpha",
        kind: "speaker",
        contentSha256: "a".repeat(64),
        sampleRate: 24000,
        durationMs: 4200,
        sourceType: "upload",
        notes: null,
        createdAt: 0,
        updatedAt: 0,
      },
      {
        voiceAssetId: "voice_beta",
        deploymentId: "dep_x",
        displayName: "Beta",
        kind: "speaker",
        contentSha256: "b".repeat(64),
        sampleRate: 24000,
        durationMs: 6100,
        sourceType: "upload",
        notes: null,
        createdAt: 0,
        updatedAt: 0,
      },
    ],
  })),
  uploadVoiceAsset: vi.fn(),
}));

vi.mock("../../src/services/deployments_client", () => ({
  setDefaultVoice: vi.fn(async () => undefined),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("QuickVoicePicker → recipe state mirroring (HIGH-3)", () => {
  it("fires onChange with the picked voice id so the recipe view sees the live default", async () => {
    const onChange = vi.fn<(id: string | null) => void>();

    render(
      <QuickVoicePicker
        deploymentId="dep_x"
        initialVoiceAssetId={null}
        onChange={onChange}
      />,
    );

    // Wait for the radio cards to render after the async listVoiceAssets resolves.
    const betaCard = await screen.findByRole("radio", { name: /Beta/i });

    await act(async () => {
      betaCard.click();
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith("voice_beta");
    });
  });

  it("propagates the new id into a recipe-style harness so unmappedCount-style derivations re-evaluate", async () => {
    // Recipe view's contract: it lifts defaultVoiceAssetId into local state and
    // passes setter as onChange. Anything derived from defaultVoiceAssetId
    // (like the Quick voice diagnostic + unmappedCount) must observe the new
    // id without a loader refetch.
    function Harness(): JSX.Element {
      const [defaultVoiceAssetId, setDefaultVoiceAssetId] = useState<string | null>(null);
      return (
        <>
          <div data-testid="mirrored-id">{defaultVoiceAssetId ?? "(none)"}</div>
          <QuickVoicePicker
            deploymentId="dep_x"
            initialVoiceAssetId={defaultVoiceAssetId}
            onChange={setDefaultVoiceAssetId}
          />
        </>
      );
    }

    render(<Harness />);

    expect(screen.getByTestId("mirrored-id").textContent).toBe("(none)");

    const alphaCard = await screen.findByRole("radio", { name: /Alpha/i });
    await act(async () => {
      alphaCard.click();
    });

    await waitFor(() => {
      expect(screen.getByTestId("mirrored-id").textContent).toBe("voice_alpha");
    });
  });
});
