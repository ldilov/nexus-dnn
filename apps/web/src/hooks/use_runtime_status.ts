import { useEffect, useState } from "react";
import {
  fetchHostBackends,
  fetchLiveLeases,
  type LeaseSummary,
} from "../services/backends";
import type { RuntimeChipKind } from "../layout/top_bar";

const POLL_INTERVAL_MS = 5000;

export interface BadgeState {
  kind: RuntimeChipKind;
  label: string;
}

export interface RuntimeStatus {
  host: BadgeState;
  runtimes: BadgeState;
  readyCount: number;
  leasedCount: number;
}

const ACTIVE_LEASE_STATES: ReadonlyArray<LeaseSummary["state"]> = [
  "starting",
  "ready",
  "busy",
];

function isActiveLease(lease: LeaseSummary): boolean {
  return ACTIVE_LEASE_STATES.includes(lease.state);
}

const INITIAL: RuntimeStatus = {
  host: { kind: "failed", label: "Host offline" },
  runtimes: { kind: "failed", label: "No runtimes ready" },
  readyCount: 0,
  leasedCount: 0,
};

export function useRuntimeStatus(): RuntimeStatus {
  const [status, setStatus] = useState<RuntimeStatus>(INITIAL);

  useEffect(() => {
    let active = true;

    const poll = async () => {
      try {
        const backends = await fetchHostBackends();
        const leases = await fetchLiveLeases().catch(() => [] as LeaseSummary[]);
        if (!active) return;

        const leasedCount = leases.filter(isActiveLease).length;
        const readyCount = backends.backends.filter(
          (b) => b.card_state === "ready",
        ).length;

        const runtimesReady = readyCount > 0 || leasedCount > 0;
        const runtimesLabel = leasedCount > 0
          ? `${leasedCount} leased`
          : readyCount === 1
            ? "1 runtime ready"
            : `${readyCount} runtimes ready`;

        setStatus({
          host: { kind: "live", label: "Host online" },
          runtimes: {
            kind: runtimesReady ? "live" : "failed",
            label: runtimesReady ? runtimesLabel : "No runtimes ready",
          },
          readyCount,
          leasedCount,
        });
      } catch {
        if (!active) return;
        setStatus(INITIAL);
      }
    };

    void poll();
    const interval = setInterval(() => {
      void poll();
    }, POLL_INTERVAL_MS);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  return status;
}
