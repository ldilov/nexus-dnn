import { afterEach, describe, expect, it, vi } from "vitest";
import {
  activateKillSwitch,
  registerServiceWorker,
  SW_DEFAULT_URL,
  SW_KILL_SWITCH_URL,
  unregisterAllServiceWorkers,
} from "../sw_registration";

interface FakeRegistration {
  scope: string;
  installing: ServiceWorker | null;
  addEventListener: (type: string, listener: () => void) => void;
  unregister: () => Promise<boolean>;
}

interface FakeContainer {
  register: (url: string, options: { scope: string }) => Promise<FakeRegistration>;
  getRegistrations: () => Promise<FakeRegistration[]>;
}

function makeRegistration(scope: string): FakeRegistration {
  return {
    scope,
    installing: null,
    addEventListener: () => {},
    unregister: async () => true,
  };
}

function setNavigatorServiceWorker(value: FakeContainer | undefined): void {
  Object.defineProperty(globalThis, "navigator", {
    configurable: true,
    value: value === undefined ? {} : { serviceWorker: value },
  });
}

const originalNavigator = globalThis.navigator;

afterEach(() => {
  Object.defineProperty(globalThis, "navigator", {
    configurable: true,
    value: originalNavigator,
  });
});

describe("registerServiceWorker", () => {
  it("returns 'unsupported' when navigator.serviceWorker is missing", async () => {
    setNavigatorServiceWorker(undefined);
    const status = await registerServiceWorker({ enabled: true });
    expect(status).toEqual({ kind: "unsupported" });
  });

  it("returns 'disabled' when enabled flag is false", async () => {
    setNavigatorServiceWorker({
      register: async () => makeRegistration("/"),
      getRegistrations: async () => [],
    });
    const status = await registerServiceWorker({ enabled: false });
    expect(status).toEqual({ kind: "disabled" });
  });

  it("returns 'registered' on success and uses default sw.js URL", async () => {
    const registerSpy = vi.fn(async (url: string, options: { scope: string }) => {
      expect(url).toBe(SW_DEFAULT_URL);
      expect(options.scope).toBe("/");
      return makeRegistration("/");
    });
    setNavigatorServiceWorker({
      register: registerSpy,
      getRegistrations: async () => [],
    });
    const status = await registerServiceWorker({ enabled: true });
    expect(status).toEqual({ kind: "registered", scope: "/" });
    expect(registerSpy).toHaveBeenCalledOnce();
  });

  it("returns 'error' kind without throwing when register rejects", async () => {
    setNavigatorServiceWorker({
      register: async () => {
        throw new Error("boom");
      },
      getRegistrations: async () => [],
    });
    const status = await registerServiceWorker({ enabled: true });
    expect(status).toEqual({ kind: "error", message: "boom" });
  });

  it("activateKillSwitch routes to the kill-switch URL", async () => {
    const registerSpy = vi.fn(async (url: string) => {
      expect(url).toBe(SW_KILL_SWITCH_URL);
      return makeRegistration("/");
    });
    setNavigatorServiceWorker({
      register: registerSpy,
      getRegistrations: async () => [],
    });
    await activateKillSwitch();
    expect(registerSpy).toHaveBeenCalledOnce();
  });

  it("unregisterAllServiceWorkers iterates every registration", async () => {
    const a = makeRegistration("/scope-a/");
    const b = makeRegistration("/scope-b/");
    const removed: string[] = [];
    a.unregister = async () => {
      removed.push(a.scope);
      return true;
    };
    b.unregister = async () => {
      removed.push(b.scope);
      return true;
    };
    setNavigatorServiceWorker({
      register: async () => a,
      getRegistrations: async () => [a, b],
    });
    const count = await unregisterAllServiceWorkers();
    expect(count).toBe(2);
    expect(removed).toEqual(["/scope-a/", "/scope-b/"]);
  });
});
