import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { VideoPlayer } from "./video_player";

describe("VideoPlayer", () => {
  it("renders an empty panel when src is missing", () => {
    render(<VideoPlayer src={null} />);
    expect(screen.getByLabelText(/no video/i)).toBeInTheDocument();
    expect(screen.getByText(/no video to display/i)).toBeInTheDocument();
  });

  it("renders a <video> element with the provided src", () => {
    render(<VideoPlayer src="https://example.test/clip.mp4" ariaLabel="render output" />);
    const video = screen.getByLabelText("render output") as HTMLVideoElement;
    expect(video.tagName).toBe("VIDEO");
    expect(video.getAttribute("src")).toBe("https://example.test/clip.mp4");
  });

  it("shows the fps label badge when provided", () => {
    render(<VideoPlayer src="https://example.test/clip.mp4" fpsLabel="48 fps" />);
    expect(screen.getByText("48 fps")).toBeInTheDocument();
  });

  it("fires onEnded when the video ends", () => {
    const onEnded = vi.fn();
    render(<VideoPlayer src="https://example.test/clip.mp4" onEnded={onEnded} />);
    const video = screen.getByLabelText(/video player/i) as HTMLVideoElement;
    fireEvent.ended(video);
    expect(onEnded).toHaveBeenCalledTimes(1);
  });

  it("fires onReady after loadeddata", () => {
    const onReady = vi.fn();
    render(<VideoPlayer src="https://example.test/clip.mp4" onReady={onReady} />);
    const video = screen.getByLabelText(/video player/i) as HTMLVideoElement;
    fireEvent.loadedData(video);
    expect(onReady).toHaveBeenCalledTimes(1);
  });

  it("renders error panel and calls onError on media error", async () => {
    const onError = vi.fn();
    render(<VideoPlayer src="https://example.test/clip.mp4" onError={onError} />);
    const video = screen.getByLabelText(/video player/i) as HTMLVideoElement;
    Object.defineProperty(video, "error", {
      value: { code: 4, message: "format not supported" },
      configurable: true,
    });
    fireEvent.error(video);
    await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
    expect(screen.getByText(/format not supported/i)).toBeInTheDocument();
    expect(onError).toHaveBeenCalledTimes(1);
  });

  it("respects controls=false", () => {
    render(<VideoPlayer src="https://example.test/clip.mp4" controls={false} />);
    const video = screen.getByLabelText(/video player/i) as HTMLVideoElement;
    expect(video.hasAttribute("controls")).toBe(false);
  });
});
