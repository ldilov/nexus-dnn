import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Storyboard } from "./storyboard";
import type { RunProgress } from "./storyboard_data";
import type { StoryboardJob } from "../run_panel_items";
import type { VoiceAsset } from "../../../../services/voice_assets_client";

function renderBoard(text = "First phrase here. Second phrase too.\n\nThird stands alone.") {
  const onChange = (): void => {};
  return render(
    <Storyboard voiceAssets={[]} presets={[]} storyText={text} onStoryTextChange={onChange} />,
  );
}

function word(name: string): HTMLElement {
  return screen.getByRole("button", { name });
}

describe("Storyboard interaction flow", () => {
  it("seeds the demo cast when no real voices (AC-2.2) and shows the empty carousel (AC-3)", () => {
    renderBoard();
    expect(screen.getByText("No segments cast yet. Select a phrase above to begin.")).toBeTruthy();
    // demo cast voice present in the library footer
    expect(screen.getByText("Aether_v4")).toBeTruthy();
  });

  it("does NOT open the overlay without a selection (AC-6.4 / AC-8.3)", () => {
    renderBoard();
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("selecting a single word opens the casting overlay (AC-1.2 / AC-1.3)", () => {
    renderBoard();
    fireEvent.click(word("First"));
    const dialog = screen.getByRole("dialog", { name: "Cast voice" });
    expect(dialog).toBeTruthy();
    expect(within(dialog).getByRole("radio", { name: /Aether/ })).toBeTruthy();
  });

  it("shift-click selects a contiguous subset of words (AC-1.2)", () => {
    renderBoard();
    fireEvent.click(word("First"));
    fireEvent.click(word("here."), { shiftKey: true });
    const dialog = screen.getByRole("dialog");
    fireEvent.click(within(dialog).getByRole("button", { name: "Cast" }));
    // the cast covers exactly "First phrase here." — not the trailing sentence
    expect(screen.getByText(/^First phrase here\.\s*$/)).toBeTruthy();
    expect(screen.getByText("SEG-001")).toBeTruthy();
  });

  it("casting a word creates a segment card labelled SEG-001 (AC-0.1 / AC-4.1)", () => {
    renderBoard();
    fireEvent.click(word("First"));
    const dialog = screen.getByRole("dialog");
    fireEvent.click(within(dialog).getByRole("button", { name: "Cast" }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.getByText("SEG-001")).toBeTruthy();
    expect(screen.getByRole("button", { name: /Aether SEG-001/ })).toBeTruthy();
  });

  it("clicking an assigned word reopens the editor (AC-1.5)", () => {
    renderBoard();
    fireEvent.click(word("First"));
    fireEvent.click(within(screen.getByRole("dialog")).getByRole("button", { name: "Cast" }));
    // the assigned word now carries the voice in its accessible name
    fireEvent.click(word("Aether · First"));
    expect(screen.getByRole("dialog", { name: "Edit casting" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Update" })).toBeTruthy();
  });

  it("removing a casting deletes both card and marker (AC-4.5)", () => {
    renderBoard();
    fireEvent.click(word("First"));
    fireEvent.click(within(screen.getByRole("dialog")).getByRole("button", { name: "Cast" }));
    expect(screen.getByText("SEG-001")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /Remove SEG-001/ }));
    expect(screen.queryByText("SEG-001")).toBeNull();
    expect(screen.getByText("No segments cast yet. Select a phrase above to begin.")).toBeTruthy();
  });

  it("opens the overlay via keyboard Enter on a word (AC-2.5)", () => {
    renderBoard();
    fireEvent.keyDown(word("First"), { key: "Enter" });
    expect(screen.getByRole("dialog", { name: "Cast voice" })).toBeTruthy();
  });

  it("arrow keys cycle the active voice in the overlay (AC-2.5)", () => {
    renderBoard();
    fireEvent.click(word("First"));
    const group = screen.getByRole("radiogroup", { name: "Voice" });
    expect(within(group).getByRole("radio", { name: /Aether/ }).getAttribute("aria-checked")).toBe("true");
    fireEvent.keyDown(group, { key: "ArrowRight" });
    expect(within(group).getByRole("radio", { name: /Vesper/ }).getAttribute("aria-checked")).toBe("true");
    fireEvent.keyDown(group, { key: "ArrowLeft" });
    expect(within(group).getByRole("radio", { name: /Aether/ }).getAttribute("aria-checked")).toBe("true");
  });

  it("changing the voice then updating re-casts the same segment (AC-4.4)", () => {
    renderBoard();
    fireEvent.click(word("First"));
    fireEvent.click(within(screen.getByRole("dialog")).getByRole("button", { name: "Cast" }));
    // reopen via the assigned segment card (card → text bidirectional, AC-4.2)
    fireEvent.click(screen.getByRole("button", { name: /Aether SEG-001/ }));
    const dialog = screen.getByRole("dialog", { name: "Edit casting" });
    fireEvent.click(within(dialog).getByRole("radio", { name: /Vesper/ }));
    fireEvent.click(within(dialog).getByRole("button", { name: "Update" }));
    expect(screen.getByText("SEG-001")).toBeTruthy();
    const cards = screen.getAllByText("Vesper");
    expect(cards.length).toBeGreaterThan(0);
  });
});

const VOICE: VoiceAsset = {
  voiceAssetId: "voice_alpha",
  deploymentId: "dep_x",
  displayName: "Alpha",
  kind: "speaker",
  audioArtifactRef: "artifact://mem/x",
  contentSha256: "a".repeat(64),
  referenceText: null,
  sampleRate: 48000,
  durationMs: 1000,
  sourceType: "upload",
  isActive: true,
  createdAt: 0,
  updatedAt: 0,
};

/** Cast the first word, capturing the generated job id the storyboard emits via
 * `onJobsChange` so the test can key a live `jobProgress` entry to it. */
function castFirstWord(): { jobId: string; rerender: (progress: ReadonlyMap<string, RunProgress>) => void } {
  let captured: StoryboardJob[] = [];
  const props = {
    voiceAssets: [VOICE],
    presets: [],
    storyText: "Alpha word here.",
    onStoryTextChange: () => {},
    deploymentId: "dep_x",
    onJobsChange: (jobs: StoryboardJob[]) => {
      captured = jobs;
    },
  };
  const view = render(<Storyboard {...props} />);
  fireEvent.click(screen.getByRole("button", { name: "Alpha" }));
  fireEvent.click(within(screen.getByRole("dialog")).getByRole("button", { name: "Cast" }));
  const jobId = captured[0]?.jobId ?? "";
  expect(jobId).not.toBe("");
  return {
    jobId,
    rerender: (progress) => view.rerender(<Storyboard {...props} jobProgress={progress} />),
  };
}

describe("Storyboard preview playback (FIX-4)", () => {
  it("disables Preview while the segment is queued / not yet rendered", () => {
    castFirstWord();
    const preview = screen.getByRole("button", { name: /Preview audio/ });
    expect((preview as HTMLButtonElement).disabled).toBe(true);
  });

  it("disables Preview while generating (no audio yet)", () => {
    const { jobId, rerender } = castFirstWord();
    rerender(new Map([[jobId, { jobId, runId: "runA", status: "generating" }]]));
    const preview = screen.getByRole("button", { name: /Preview audio/ });
    expect((preview as HTMLButtonElement).disabled).toBe(true);
  });

  it("enables Preview and plays the artifact audio once the segment is done", () => {
    const playSpy = vi
      .spyOn(window.HTMLMediaElement.prototype, "play")
      .mockResolvedValue(undefined);
    const { jobId, rerender } = castFirstWord();
    rerender(
      new Map([
        [jobId, { jobId, runId: "runA", status: "done", durationMs: 100, utteranceId: "utt_1" }],
      ]),
    );

    const preview = screen.getByRole("button", { name: /Preview audio/ });
    expect((preview as HTMLButtonElement).disabled).toBe(false);
    fireEvent.click(preview);

    const audio = document.querySelector("audio");
    expect(audio).not.toBeNull();
    expect(audio?.getAttribute("src") ?? audio?.src ?? "").toContain(
      "/deployments/dep_x/artifacts/utt_1/download",
    );
    playSpy.mockRestore();
  });

  it("disables Preview when done but lacking an artifact handle", () => {
    const { jobId, rerender } = castFirstWord();
    rerender(new Map([[jobId, { jobId, runId: "runA", status: "done", durationMs: 100 }]]));
    const preview = screen.getByRole("button", { name: /Preview audio/ });
    expect((preview as HTMLButtonElement).disabled).toBe(true);
  });
});
