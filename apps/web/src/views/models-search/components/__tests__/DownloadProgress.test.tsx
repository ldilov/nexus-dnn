import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import {
  DownloadProgress,
  formatEta,
  formatSpeed,
} from "../DownloadProgress";

afterEach(() => cleanup());

describe("DownloadProgress — ETA / speed formatting", () => {
  it("formats seconds-scale ETA", () => {
    expect(formatEta(3)).toBe("3s");
    expect(formatEta(45)).toBe("45s");
  });

  it("formats minute-scale ETA with zero-padded seconds", () => {
    expect(formatEta(65)).toBe("1m 05s");
    expect(formatEta(245)).toBe("4m 05s");
  });

  it("formats hour-scale ETA with zero-padded minutes", () => {
    expect(formatEta(3720)).toBe("1h 02m");
  });

  it("returns empty for a null or invalid ETA", () => {
    expect(formatEta(null)).toBe("");
    expect(formatEta(-5)).toBe("");
    expect(formatEta(Number.NaN)).toBe("");
  });

  it("formats speed with a per-second suffix and empty for non-positive", () => {
    expect(formatSpeed(1024 * 1024)).toMatch(/MB\/s$/);
    expect(formatSpeed(0)).toBe("");
    expect(formatSpeed(-1)).toBe("");
  });
});

describe("DownloadProgress — queued (back-compat)", () => {
  it("renders the queued badge with no progressbar", () => {
    render(
      <DownloadProgress state="queued" progressBytes={0} totalBytes={null} />,
    );
    expect(
      screen.getByRole("status", { name: /download queued/i }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });
});

describe("DownloadProgress — known total (determinate)", () => {
  it("exposes percent via aria-valuenow and renders bytes counter", () => {
    render(
      <DownloadProgress
        state="downloading"
        progressBytes={250}
        totalBytes={1000}
      />,
    );
    const bar = screen.getByRole("progressbar");
    expect(bar.getAttribute("aria-valuenow")).toBe("25");
    expect(bar.getAttribute("aria-valuemin")).toBe("0");
    expect(bar.getAttribute("aria-valuemax")).toBe("100");
    expect(screen.getByText(/25%/)).toBeInTheDocument();
  });

  it("shows speed and ETA once a second sample is observed", () => {
    vi.useFakeTimers();
    vi.setSystemTime(0);
    try {
      const { rerender } = render(
        <DownloadProgress
          state="downloading"
          progressBytes={0}
          totalBytes={10_000_000}
          jobId="job-eta"
        />,
      );
      // Second observation 1s later → ~2 MB/s, ~4s ETA.
      vi.setSystemTime(1000);
      rerender(
        <DownloadProgress
          state="downloading"
          progressBytes={2_000_000}
          totalBytes={10_000_000}
          jobId="job-eta"
        />,
      );
      act(() => {
        vi.advanceTimersByTime(300);
      });
      expect(screen.getByText(/\/s$/)).toBeInTheDocument();
      expect(screen.getByText(/left$/)).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });
});

describe("DownloadProgress — unknown total (indeterminate)", () => {
  it("omits aria-valuenow and never renders a fake percent", () => {
    render(
      <DownloadProgress
        state="downloading"
        progressBytes={500_000}
        totalBytes={null}
      />,
    );
    const bar = screen.getByRole("progressbar");
    expect(bar.hasAttribute("aria-valuenow")).toBe(false);
    expect(bar.hasAttribute("aria-valuemax")).toBe(false);
    expect(bar.getAttribute("aria-label")).toMatch(/size unknown/i);
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
  });

  it("shows bytes downloaded and a speed once sampling kicks in", () => {
    vi.useFakeTimers();
    vi.setSystemTime(0);
    try {
      const { rerender } = render(
        <DownloadProgress
          state="downloading"
          progressBytes={0}
          totalBytes={null}
          jobId="job-unknown"
        />,
      );
      vi.setSystemTime(1000);
      rerender(
        <DownloadProgress
          state="downloading"
          progressBytes={3_000_000}
          totalBytes={null}
          jobId="job-unknown"
        />,
      );
      act(() => {
        vi.advanceTimersByTime(300);
      });
      expect(screen.getByText(/downloaded$/)).toBeInTheDocument();
      expect(screen.getByText(/\/s$/)).toBeInTheDocument();
      // No ETA can be derived without a total.
      expect(screen.queryByText(/left$/)).not.toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });
});

describe("DownloadProgress — pause / resume controls", () => {
  it("fires onPause while downloading", () => {
    const onPause = vi.fn();
    render(
      <DownloadProgress
        state="downloading"
        progressBytes={100}
        totalBytes={1000}
        onPause={onPause}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /pause download/i }));
    expect(onPause).toHaveBeenCalledTimes(1);
  });

  it("fires onResume and shows a static bar (no animation) when paused", () => {
    const onResume = vi.fn();
    render(
      <DownloadProgress
        state="paused"
        progressBytes={500}
        totalBytes={1000}
        onResume={onResume}
      />,
    );
    const bar = screen.getByRole("progressbar");
    expect(bar.getAttribute("aria-label")).toMatch(/paused/i);
    expect(bar.getAttribute("aria-valuenow")).toBe("50");
    fireEvent.click(screen.getByRole("button", { name: /resume download/i }));
    expect(onResume).toHaveBeenCalledTimes(1);
  });
});
