import { describe, expect, it } from "vitest";
import {
  computeTransferRate,
  nextSample,
  type TransferSample,
} from "../use_transfer_rate";

describe("use_transfer_rate — nextSample", () => {
  it("returns a zero-speed sample for the first observation", () => {
    const sample = nextSample(null, 1000, 10_000);
    expect(sample).toEqual({
      reportedBytes: 1000,
      reportedAt: 10_000,
      speedBps: 0,
    });
  });

  it("computes instantaneous speed on the second observation", () => {
    const first = nextSample(null, 0, 0);
    const second = nextSample(first, 2_000_000, 1000);
    expect(second.reportedBytes).toBe(2_000_000);
    expect(second.speedBps).toBeCloseTo(2_000_000, 0);
  });

  it("EWMA-smooths speed across successive observations", () => {
    const a = nextSample(null, 0, 0);
    const b = nextSample(a, 1_000_000, 1000);
    const c = nextSample(b, 1_500_000, 2000);
    expect(b.speedBps).toBeCloseTo(1_000_000, 0);
    expect(c.speedBps).toBeGreaterThan(500_000);
    expect(c.speedBps).toBeLessThan(1_000_000);
  });

  it("never lowers speed for a non-advancing observation", () => {
    const a = nextSample(null, 0, 0);
    const b = nextSample(a, 1_000_000, 1000);
    const c = nextSample(b, 1_000_000, 2000);
    expect(c.speedBps).toBe(b.speedBps);
  });
});

describe("use_transfer_rate — computeTransferRate", () => {
  const sample: TransferSample = {
    reportedBytes: 1_000_000,
    reportedAt: 1000,
    speedBps: 500_000,
  };

  it("returns zeros for a null sample", () => {
    const rate = computeTransferRate(null, 10_000_000, 2000);
    expect(rate).toEqual({
      speedBps: 0,
      etaSeconds: null,
      extrapolatedBytes: 0,
    });
  });

  it("derives ETA from remaining bytes and speed when total is known", () => {
    // 2_000_000 of 10_000_000 done, 8_000_000 left at 500_000 B/s ≈ 16s.
    const rate = computeTransferRate(sample, 10_000_000, 3000);
    expect(rate.speedBps).toBe(500_000);
    expect(rate.extrapolatedBytes).toBeCloseTo(2_000_000, 0);
    expect(rate.etaSeconds).toBeCloseTo(16, 0);
  });

  it("clamps extrapolated bytes to the known total", () => {
    const rate = computeTransferRate(sample, 1_100_000, 100_000);
    expect(rate.extrapolatedBytes).toBe(1_100_000);
    expect(rate.etaSeconds).toBeNull();
  });

  it("reports speed but no ETA when total is unknown", () => {
    const rate = computeTransferRate(sample, null, 3000);
    expect(rate.speedBps).toBe(500_000);
    expect(rate.etaSeconds).toBeNull();
    expect(rate.extrapolatedBytes).toBeGreaterThanOrEqual(1_000_000);
  });

  it("emits no ETA when speed is zero", () => {
    const stalled: TransferSample = {
      reportedBytes: 500,
      reportedAt: 0,
      speedBps: 0,
    };
    const rate = computeTransferRate(stalled, 1000, 0);
    expect(rate.etaSeconds).toBeNull();
  });
});
