import { useState } from "react";
import useSWR from "swr";
import {
  listInstalls,
  listLeases,
  restartInstall,
  startLease,
  stopLeases,
  uninstallInstall,
  type InstallRow,
  type LeaseRow,
} from "../../../services/backend_runtimes_client";
import * as css from "../backend_runtimes.css";

const INSTALLS_POLL_MS = 5_000;
const LEASES_POLL_MS = 4_000;

interface Props {
  runtimeId: string;
}

type PendingAction = null | "start" | "stop" | "restart" | "uninstall";

const STATUS_CLASSES: Record<string, string> = {
  validated: css.installStatusValidated,
  failed: css.installStatusFailed,
  pending: css.installStatusPending,
  downloading: css.installStatusPending,
  validating: css.installStatusPending,
  abandoned: css.installStatusAbandoned,
};

/**
 * Per-runtime install actions panel. Lists every install row for the
 * runtime, surfacing Start / Stop / Restart / Uninstall based on the
 * row's terminal status and any live leases held against it.
 */
export function InstallActions({ runtimeId }: Props) {
  const installsKey = ["installs", runtimeId] as const;
  const { data: installs, mutate: mutateInstalls } = useSWR<InstallRow[]>(
    installsKey,
    () => listInstalls(runtimeId),
    { refreshInterval: INSTALLS_POLL_MS, revalidateOnFocus: true },
  );

  if (!installs) {
    return null;
  }
  if (installs.length === 0) {
    return null;
  }

  const refresh = () => {
    void mutateInstalls();
  };

  return (
    <div className={css.pillRow} aria-label="installs">
      {installs.map((install) => (
        <InstallRowView
          key={install.runtime_install_id}
          install={install}
          onChanged={refresh}
        />
      ))}
    </div>
  );
}

function InstallRowView({
  install,
  onChanged,
}: {
  install: InstallRow;
  onChanged: () => void;
}) {
  const { data: leases, mutate: mutateLeases } = useSWR<LeaseRow[]>(
    ["leases", install.runtime_install_id],
    () =>
      listLeases({
        runtime_install_id: install.runtime_install_id,
        live_only: true,
      }),
    { refreshInterval: LEASES_POLL_MS, revalidateOnFocus: true },
  );
  const [pending, setPending] = useState<PendingAction>(null);
  const [error, setError] = useState<string | null>(null);

  const liveLeaseCount = leases?.length ?? 0;
  const hasLiveLease = liveLeaseCount > 0;
  const canStart = install.status === "validated" && !hasLiveLease;
  const canStop = install.status === "validated" && hasLiveLease;
  const canRestart = install.status === "validated";
  const canUninstall =
    install.status !== "abandoned" && install.status !== "pending";

  const run = async (action: PendingAction, exec: () => Promise<unknown>) => {
    setPending(action);
    setError(null);
    try {
      await exec();
      await mutateLeases();
      onChanged();
    } catch (e) {
      setError(e instanceof Error ? e.message : "unknown error");
    } finally {
      setPending(null);
    }
  };

  const onStart = () =>
    run("start", () => startLease(install.runtime_install_id));
  const onStop = () =>
    run("stop", () => stopLeases(install.runtime_install_id));
  const onRestart = () =>
    run("restart", () => restartInstall(install.runtime_install_id));
  const onUninstall = () => {
    if (
      !window.confirm(
        `Uninstall ${install.runtime_install_id.slice(0, 8)}… ?\n\nThis abandons the install row. Live leases will block the action.`,
      )
    ) {
      return;
    }
    void run("uninstall", () => uninstallInstall(install.runtime_install_id));
  };

  const statusClass =
    STATUS_CLASSES[install.status] ?? css.installStatusPending;

  return (
    <div className={css.installRow}>
      <div className={css.installRowHeader}>
        <span className={`${css.installStatusBadge} ${statusClass}`}>
          {install.status}
        </span>
        <span className={css.installId}>
          {install.release_id} · {install.platform} · {install.accelerator_profile}
        </span>
        {hasLiveLease && (
          <span className={css.liveLeaseBadge} title="live lease held">
            <span className={css.liveLeaseDot} aria-hidden="true" />
            {liveLeaseCount === 1 ? "live" : `${liveLeaseCount} live`}
          </span>
        )}
      </div>

      {install.status === "failed" && install.last_failure_detail && (
        <div className={css.failureNote}>
          {install.last_failure_category}: {install.last_failure_detail}
        </div>
      )}

      <div className={css.actionsRow}>
        <button
          type="button"
          className={`${css.actionButton} ${css.actionButtonPrimary}`}
          onClick={onStart}
          disabled={!canStart || pending !== null}
        >
          {pending === "start" ? "Starting…" : "Start"}
        </button>
        <button
          type="button"
          className={css.actionButton}
          onClick={onStop}
          disabled={!canStop || pending !== null}
        >
          {pending === "stop" ? "Stopping…" : "Stop"}
        </button>
        <button
          type="button"
          className={css.actionButton}
          onClick={onRestart}
          disabled={!canRestart || pending !== null}
        >
          {pending === "restart" ? "Restarting…" : "Restart"}
        </button>
        <button
          type="button"
          className={`${css.actionButton} ${css.actionButtonDanger}`}
          onClick={onUninstall}
          disabled={!canUninstall || pending !== null}
        >
          {pending === "uninstall" ? "Uninstalling…" : "Uninstall"}
        </button>
      </div>

      {error && <div className={css.failureNote}>{error}</div>}
    </div>
  );
}
