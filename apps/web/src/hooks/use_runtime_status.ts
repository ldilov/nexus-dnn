import { useEffect, useState } from "react";
import {
  fetchHostBackends,
  fetchLiveLeases,
  type LeaseSummary,
} from "../services/backends";
import type { RuntimeChipKind } from "../layout/top_bar";

const POLL_INTERVAL_MS = 5000;

export interface RuntimeStatus {
  kind: RuntimeChipKind;
  label: string;
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

export function useRuntimeStatus(): RuntimeStatus {
  const [status, setStatus] = useState<RuntimeStatus>({
    kind: "idle",
    label: "Host offline",
    readyCount: 0,
    leasedCount: 0,
  });

  useEffect(() => {
    let active = true;

    const poll = async () => {
      try {
        const [backends, leases] = await Promise.all([
          fetchHostBackends(),
          fetchLiveLeases().catch(() => [] as LeaseSummary[]),
        ]);
        if (!active) return;

        const leasedCount = leases.filter(isActiveLease).length;
        const readyCount = backends.backends.filter(
          (b) => b.card_state === "ready",
        ).length;

        if (leasedCount > 0) {
          const label =
            leasedCount === 1 ? "1 backend leased" : `${leasedCount} backends leased`;
          setStatus({ kind: "live", label, readyCount, leasedCount });
          return;
        }
        if (backends.summary.issues > 0) {
          setStatus({
            kind: "failed",
            label: `${backends.summary.issues} backend issue${backends.summary.issues === 1 ? "" : "s"}`,
            readyCount,
            leasedCount: 0,
          });
          return;
        }
        if (readyCount > 0) {
          const label =
            readyCount === 1 ? "1 runtime ready" : `${readyCount} runtimes ready`;
          setStatus({ kind: "idle", label, readyCount, leasedCount: 0 });
          return;
        }
        setStatus({
          kind: "idle",
          label: "No runtime ready",
          readyCount: 0,
          leasedCount: 0,
        });
      } catch {
        if (!active) return;
        setStatus({
          kind: "idle",
          label: "Host offline",
          readyCount: 0,
          leasedCount: 0,
        });
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
