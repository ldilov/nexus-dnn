import { afterEach, describe, expect, it } from "vitest";
import {
  getDesiredWarmup,
  setDesiredWarmup,
} from "../../src/services/worker_pref";

describe("worker_pref warmup preference", () => {
  afterEach(() => {
    setDesiredWarmup(true);
  });

  it("defaults to true", () => {
    expect(getDesiredWarmup()).toBe(true);
  });

  it("round-trips a set value", () => {
    setDesiredWarmup(false);
    expect(getDesiredWarmup()).toBe(false);
    setDesiredWarmup(true);
    expect(getDesiredWarmup()).toBe(true);
  });
});
