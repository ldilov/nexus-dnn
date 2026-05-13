import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MediaArtifactPlayer } from "./media_artifact_player";

describe("MediaArtifactPlayer", () => {
  it("renders a <video> element for video mime types", () => {
    render(<MediaArtifactPlayer artifactId="art_001" mime="video/mp4" />);
    const video = screen.getByLabelText(/video artifact art_001/i);
    expect(video.tagName).toBe("VIDEO");
  });

  it("renders an <audio> element for audio mime types", () => {
    render(<MediaArtifactPlayer artifactId="aud_001" mime="audio/mpeg" />);
    const audio = screen.getByLabelText(/audio artifact aud_001/i);
    expect(audio.tagName).toBe("AUDIO");
  });

  it("uses src prop verbatim when provided", () => {
    render(
      <MediaArtifactPlayer
        artifactId="art_002"
        mime="video/mp4"
        src="https://example.test/preview.mp4"
      />,
    );
    const video = screen.getByLabelText(/video artifact/i) as HTMLVideoElement;
    expect(video.getAttribute("src")).toBe("https://example.test/preview.mp4");
  });

  it("defaults src to /api/v1/artifacts/{id} when not provided", () => {
    render(<MediaArtifactPlayer artifactId="art_003" mime="video/mp4" />);
    const video = screen.getByLabelText(/video artifact/i) as HTMLVideoElement;
    expect(video.getAttribute("src")).toBe("/api/v1/artifacts/art_003");
  });

  it("hides download link until media is ready", () => {
    render(<MediaArtifactPlayer artifactId="art_004" mime="video/mp4" />);
    expect(screen.queryByLabelText(/^download$/i)).toBeNull();
  });

  it("shows download link after loadeddata event fires", async () => {
    render(<MediaArtifactPlayer artifactId="art_005" mime="video/mp4" />);
    const video = screen.getByLabelText(/video artifact/i) as HTMLVideoElement;
    fireEvent.loadedData(video);
    await waitFor(() =>
      expect(screen.getByLabelText(/^download$/i)).toBeInTheDocument(),
    );
  });

  it("can disable download via prop", async () => {
    render(
      <MediaArtifactPlayer
        artifactId="art_006"
        mime="video/mp4"
        downloadEnabled={false}
      />,
    );
    const video = screen.getByLabelText(/video artifact/i) as HTMLVideoElement;
    fireEvent.loadedData(video);
    await waitFor(() =>
      expect(screen.queryByLabelText(/^download$/i)).toBeNull(),
    );
  });

  it("renders error panel + download fallback on media error", async () => {
    const onError = vi.fn();
    render(
      <MediaArtifactPlayer
        artifactId="art_007"
        mime="video/mp4"
        onError={onError}
      />,
    );
    const video = screen.getByLabelText(/video artifact/i) as HTMLVideoElement;
    // Simulate error
    Object.defineProperty(video, "error", {
      value: { code: 4, message: "format not supported" },
      configurable: true,
    });
    fireEvent.error(video);
    await waitFor(() =>
      expect(screen.getByRole("alert")).toBeInTheDocument(),
    );
    expect(screen.getByText(/format not supported/i)).toBeInTheDocument();
    expect(screen.getByText(/download instead/i)).toBeInTheDocument();
    expect(onError).toHaveBeenCalledTimes(1);
  });

  it("uses posterArtifactId for video poster", () => {
    render(
      <MediaArtifactPlayer
        artifactId="art_008"
        mime="video/mp4"
        posterArtifactId="thumb_001"
      />,
    );
    const video = screen.getByLabelText(/video artifact/i) as HTMLVideoElement;
    expect(video.getAttribute("poster")).toBe("/api/v1/artifacts/thumb_001");
  });

  it("custom downloadFilename is honoured", async () => {
    render(
      <MediaArtifactPlayer
        artifactId="art_009"
        mime="video/mp4"
        downloadFilename="my-render.mp4"
      />,
    );
    const video = screen.getByLabelText(/video artifact/i) as HTMLVideoElement;
    fireEvent.loadedData(video);
    await waitFor(() => {
      const link = screen.getByLabelText(/^download$/i);
      expect(link.getAttribute("download")).toBe("my-render.mp4");
    });
  });
});
