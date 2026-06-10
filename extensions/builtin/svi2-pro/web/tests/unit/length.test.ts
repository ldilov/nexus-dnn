import { describe, expect, test } from "vitest";
import {
  CUSTOM_LENGTH,
  DEFAULT_LENGTH_SECONDS,
  LENGTH_OPTIONS_SECONDS,
  actualSeconds,
  deriveNumClips,
  lengthSummary,
  matchLengthOption,
  segmentDefaults,
  stitchedFrames,
} from "../../src/domain/length";

const CANONICAL = { framesPerClip: 85, fps: 16, overlap: 5 };

describe("deriveNumClips", () => {
  test("30s at canonical defaults derives 6 clips", () => {
    expect(deriveNumClips(30, CANONICAL)).toBe(6);
  });

  test("60s at canonical defaults derives 12 clips", () => {
    expect(deriveNumClips(60, CANONICAL)).toBe(12);
  });

  test("derived duration always covers the requested duration", () => {
    for (const seconds of [...LENGTH_OPTIONS_SECONDS, 7, 45, 90, 600]) {
      const clips = deriveNumClips(seconds, CANONICAL);
      expect(actualSeconds(clips, CANONICAL)).toBeGreaterThanOrEqual(seconds);
    }
  });

  test("tiny durations clamp to one clip", () => {
    expect(deriveNumClips(1, CANONICAL)).toBe(1);
  });

  test("default length option is 30s", () => {
    expect(DEFAULT_LENGTH_SECONDS).toBe(30);
    expect(LENGTH_OPTIONS_SECONDS).toContain(30);
  });
});

describe("stitchedFrames / actualSeconds", () => {
  test("6 clips of 85 frames with overlap 5 stitch to 485 frames ≈ 30.3s", () => {
    expect(stitchedFrames(6, CANONICAL)).toBe(485);
    expect(actualSeconds(6, CANONICAL)).toBeCloseTo(30.3125, 3);
  });

  test("12 clips stitch to 965 frames ≈ 60.3s", () => {
    expect(stitchedFrames(12, CANONICAL)).toBe(965);
    expect(actualSeconds(12, CANONICAL)).toBeCloseTo(60.3125, 3);
  });
});

describe("matchLengthOption", () => {
  test("each preset option round-trips to itself", () => {
    for (const seconds of LENGTH_OPTIONS_SECONDS) {
      const clips = deriveNumClips(seconds, CANONICAL);
      expect(matchLengthOption(clips, CANONICAL)).toBe(seconds);
    }
  });

  test("a manual clip count outside the options reports custom", () => {
    expect(matchLengthOption(100, CANONICAL)).toBe(CUSTOM_LENGTH);
  });

  test("recomputes when frames_per_clip changes", () => {
    const smaller = { ...CANONICAL, framesPerClip: 49 };
    expect(deriveNumClips(30, smaller)).not.toBe(deriveNumClips(30, CANONICAL));
    expect(matchLengthOption(deriveNumClips(30, smaller), smaller)).toBe(30);
  });
});

describe("segmentDefaults / lengthSummary", () => {
  test("reads current params with canonical fallbacks", () => {
    expect(segmentDefaults({})).toEqual(CANONICAL);
    expect(segmentDefaults({ frames_per_clip: 49, fps: 24, num_overlap_frame: 4 })).toEqual({
      framesPerClip: 49,
      fps: 24,
      overlap: 4,
    });
  });

  test("summary names clips, frames, fps, native seconds and RIFE target", () => {
    const summary = lengthSummary({
      num_clips: 6,
      frames_per_clip: 85,
      fps: 16,
      num_overlap_frame: 5,
      interpolate_fps: 48,
    });
    expect(summary).toBe("6 × 85 frames @ 16 fps → 30.3s native (RIFE → 48 fps)");
  });

  test("summary drops the RIFE suffix when interpolation is off", () => {
    const summary = lengthSummary({
      num_clips: 6,
      frames_per_clip: 85,
      fps: 16,
      num_overlap_frame: 5,
      interpolate_fps: 0,
    });
    expect(summary).toBe("6 × 85 frames @ 16 fps → 30.3s native");
  });
});
