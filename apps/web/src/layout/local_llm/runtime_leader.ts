import { useEffect, useState } from "react";
import {
  claimLeader,
  getLeader,
  releaseLeader,
  updateHeartbeat,
} from "../../services/idb/runtime_leaders";
import type { RuntimeLeaderRow } from "../../services/idb/schemas";

const LEADER_BROADCAST_TOPIC = "nexus-runtime-leader";
const HEARTBEAT_INTERVAL_MS = 5_000;
const STALE_HEARTBEAT_MS = 30_000;

interface LeaderClaim {
  readonly deploymentId: string;
  readonly modelKey: string;
  readonly leaderTabId: string;
  readonly port: number;
  readonly pid: number | null;
}

interface LeaderBroadcastMessage {
  readonly type: "leader_claimed" | "leader_released" | "heartbeat";
  readonly deploymentId: string;
  readonly modelKey: string;
  readonly leaderTabId: string;
  readonly port?: number;
  readonly pid?: number | null;
  readonly heartbeatAt?: number;
}

function lockName(deploymentId: string, modelKey: string): string {
  return `nexus-runtime:${deploymentId}:${modelKey}`;
}

function makeTabId(): string {
  return `tab-${Math.random().toString(36).slice(2, 10)}-${Date.now()}`;
}

const localTabId = makeTabId();

export function getLocalTabId(): string {
  return localTabId;
}

export function isLockSupported(): boolean {
  return typeof navigator !== "undefined" && "locks" in navigator;
}

export interface ClaimedLeader {
  readonly release: () => Promise<void>;
}

export async function claimRuntimeLeader(
  claim: LeaderClaim,
): Promise<ClaimedLeader | null> {
  if (!isLockSupported()) return null;
  const leaderTabId = claim.leaderTabId;
  let releaseLockResolver: (() => void) | null = null;
  let heartbeatTimer: ReturnType<typeof setInterval> | null = null;
  const broadcast = new BroadcastChannel(LEADER_BROADCAST_TOPIC);
  const lockPromise = navigator.locks.request(
    lockName(claim.deploymentId, claim.modelKey),
    { mode: "exclusive" },
    () =>
      new Promise<void>((resolve) => {
        releaseLockResolver = resolve;
        const now = Date.now();
        const row: RuntimeLeaderRow = {
          deploymentId: claim.deploymentId,
          modelKey: claim.modelKey,
          leaderTabId,
          port: claim.port,
          pid: claim.pid,
          claimedAt: now,
          heartbeatAt: now,
        };
        void claimLeader(row).then(() => {
          broadcast.postMessage({
            type: "leader_claimed",
            deploymentId: claim.deploymentId,
            modelKey: claim.modelKey,
            leaderTabId,
            port: claim.port,
            pid: claim.pid,
          } satisfies LeaderBroadcastMessage);
          heartbeatTimer = setInterval(() => {
            const ts = Date.now();
            void updateHeartbeat(
              claim.deploymentId,
              claim.modelKey,
              leaderTabId,
              ts,
            );
            broadcast.postMessage({
              type: "heartbeat",
              deploymentId: claim.deploymentId,
              modelKey: claim.modelKey,
              leaderTabId,
              heartbeatAt: ts,
            } satisfies LeaderBroadcastMessage);
          }, HEARTBEAT_INTERVAL_MS);
        });
      }),
  );
  void lockPromise.then(() => {
    if (heartbeatTimer) clearInterval(heartbeatTimer);
    void releaseLeader(claim.deploymentId, claim.modelKey, leaderTabId).then(() => {
      broadcast.postMessage({
        type: "leader_released",
        deploymentId: claim.deploymentId,
        modelKey: claim.modelKey,
        leaderTabId,
      } satisfies LeaderBroadcastMessage);
      broadcast.close();
    });
  });
  return {
    release: async () => {
      if (releaseLockResolver) releaseLockResolver();
      releaseLockResolver = null;
    },
  };
}

export interface RuntimeLeaderObservation {
  readonly leader: RuntimeLeaderRow | null;
  readonly isLeader: boolean;
  readonly hasFreshLeader: boolean;
}

export function useRuntimeLeader(
  deploymentId: string | null,
  modelKey: string | null,
): RuntimeLeaderObservation {
  const [leader, setLeader] = useState<RuntimeLeaderRow | null>(null);

  useEffect(() => {
    if (!deploymentId || !modelKey) {
      setLeader(null);
      return;
    }
    let cancelled = false;
    const broadcast = new BroadcastChannel(LEADER_BROADCAST_TOPIC);
    const refresh = () => {
      void getLeader(deploymentId, modelKey).then((row) => {
        if (!cancelled) setLeader(row);
      });
    };
    const handler = (event: MessageEvent<LeaderBroadcastMessage>) => {
      const data = event.data;
      if (
        data.deploymentId !== deploymentId ||
        data.modelKey !== modelKey
      ) {
        return;
      }
      if (data.type === "leader_released") {
        if (!cancelled) setLeader(null);
        return;
      }
      refresh();
    };
    broadcast.addEventListener("message", handler);
    refresh();
    return () => {
      cancelled = true;
      broadcast.removeEventListener("message", handler);
      broadcast.close();
    };
  }, [deploymentId, modelKey]);

  const now = Date.now();
  const hasFreshLeader =
    leader !== null && now - leader.heartbeatAt <= STALE_HEARTBEAT_MS;
  const isLeader =
    leader !== null && leader.leaderTabId === localTabId && hasFreshLeader;

  return { leader, isLeader, hasFreshLeader };
}
