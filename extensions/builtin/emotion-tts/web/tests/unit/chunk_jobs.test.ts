import { describe, expect, it } from "vitest";
import { chunkJobs } from "../../src/services/runs_client";

describe("chunkJobs", () => {
  it("12 jobs / 3 workers → [4,4,4]", () => {
    const jobs = Array.from({ length: 12 }, (_, i) => i);
    expect(chunkJobs(jobs, 3).map((c) => c.length)).toEqual([4, 4, 4]);
  });

  it("5 jobs / 3 workers → [2,2,1]", () => {
    const jobs = [0, 1, 2, 3, 4];
    expect(chunkJobs(jobs, 3).map((c) => c.length)).toEqual([2, 2, 1]);
  });

  it("2 jobs / 4 workers → [1,1] (never more chunks than jobs)", () => {
    expect(chunkJobs([0, 1], 4).map((c) => c.length)).toEqual([1, 1]);
  });

  it("0 jobs → []", () => {
    expect(chunkJobs([], 3)).toEqual([]);
  });

  it("workers <= 0 clamps to 1 chunk", () => {
    expect(chunkJobs([0, 1, 2], 0).map((c) => c.length)).toEqual([3]);
    expect(chunkJobs([0, 1, 2], -5).map((c) => c.length)).toEqual([3]);
  });

  it("preserves order and is contiguous (no interleave)", () => {
    const jobs = ["a", "b", "c", "d", "e"];
    expect(chunkJobs(jobs, 2)).toEqual([
      ["a", "b", "c"],
      ["d", "e"],
    ]);
  });

  it("1 worker → single chunk with all jobs (today's single-batch mode)", () => {
    const jobs = [0, 1, 2, 3, 4, 5];
    expect(chunkJobs(jobs, 1)).toEqual([[0, 1, 2, 3, 4, 5]]);
  });

  it("workers equal to jobs → one job per chunk", () => {
    expect(chunkJobs([0, 1, 2], 3).map((c) => c.length)).toEqual([1, 1, 1]);
  });
});
