import { describe, expect, test } from "vitest";
import {
  CUSTOM_LENGTH,
  DEFAULT_LENGTH_SECONDS,
  FLF2V_MAX_FRAMES,
  FLF2V_MIN_FRAMES,
  LENGTH_OPTIONS_SECONDS,
  actualSeconds,
  deriveLengthPlan,
  deriveNumClips,
  flf2vFramesForSeconds,
  flf2vMaxSeconds,
  flf2vSeconds,
  flf2vSummary,
  lengthSummary,
  matchLengthOption,
  segmentDefaults,
  snapToValidFrames,
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

describe("deriveLengthPlan", () => {
  test("sub-clip durations shrink frames on a single clip", () => {
    expect(deriveLengthPlan(1, CANONICAL)).toEqual({ numClips: 1, framesPerClip: 17 });
    expect(deriveLengthPlan(2, CANONICAL)).toEqual({ numClips: 1, framesPerClip: 33 });
  });

  test("a full native clip keeps frames at 85", () => {
    expect(deriveLengthPlan(5, CANONICAL)).toEqual({ numClips: 1, framesPerClip: 81 });
    expect(deriveLengthPlan(5.3, CANONICAL)).toEqual({ numClips: 1, framesPerClip: 85 });
  });

  test("durations past one clip add clips at full frames, matching deriveNumClips", () => {
    for (const seconds of [10, 30, 60, 120]) {
      const plan = deriveLengthPlan(seconds, CANONICAL);
      expect(plan.framesPerClip).toBe(85);
      expect(plan.numClips).toBe(deriveNumClips(seconds, CANONICAL));
    }
  });

  test("every plan produces 4n+1 frames and covers the requested duration", () => {
    for (const seconds of [0.5, 1, 2, 3, 5, 7, 45, 90]) {
      const plan = deriveLengthPlan(seconds, CANONICAL);
      expect((plan.framesPerClip - 1) % 4).toBe(0);
      const realized = actualSeconds(plan.numClips, { ...CANONICAL, framesPerClip: plan.framesPerClip });
      expect(realized).toBeGreaterThan(0);
    }
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

describe("snapToValidFrames", () => {
  test("snaps to nearest 4n+1", () => {
    expect(snapToValidFrames(80)).toBe(81);
    expect(snapToValidFrames(81)).toBe(81);
    expect(snapToValidFrames(64)).toBe(65);
    expect(snapToValidFrames(66)).toBe(65);
  });

  test("clamps to the FLF2V frame range", () => {
    expect(snapToValidFrames(1)).toBe(FLF2V_MIN_FRAMES);
    expect(snapToValidFrames(500)).toBe(FLF2V_MAX_FRAMES);
  });

  test("always produces 4n+1 within bounds", () => {
    for (let frames = 0; frames <= 200; frames += 1) {
      const snapped = snapToValidFrames(frames);
      expect((snapped - 1) % 4).toBe(0);
      expect(snapped).toBeGreaterThanOrEqual(FLF2V_MIN_FRAMES);
      expect(snapped).toBeLessThanOrEqual(FLF2V_MAX_FRAMES);
    }
  });
});

describe("flf2v length helpers", () => {
  test("frames = fps × seconds snapped to 4n+1", () => {
    expect(flf2vFramesForSeconds(5, 16)).toBe(81);
    expect(flf2vFramesForSeconds(4, 16)).toBe(65);
    expect(flf2vFramesForSeconds(20, 16)).toBe(FLF2V_MAX_FRAMES);
  });

  test("max seconds derives from the frame cap", () => {
    expect(flf2vMaxSeconds(16)).toBe(8);
    expect(flf2vMaxSeconds(0)).toBe(0);
  });

  test("seconds round-trips from params", () => {
    expect(flf2vSeconds({ frames_per_clip: 65, fps: 16 })).toBeCloseTo(4.0625, 4);
  });

  test("summary names single clip, frames, fps, morph seconds and RIFE target", () => {
    const summary = flf2vSummary({
      frames_per_clip: 65,
      fps: 16,
      interpolate_fps: 48,
    });
    expect(summary).toBe("1 × 65 frames @ 16 fps → 4.1s morph (RIFE → 48 fps)");
  });
});
