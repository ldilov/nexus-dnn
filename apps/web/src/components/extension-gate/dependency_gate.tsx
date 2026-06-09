/**
 * Spec 053 — DependencyGate.
 *
 * Generic, host-owned install-gate shown before an extension app mounts. It is
 * keyed purely by `:id` and carries zero extension-id literals and zero
 * per-step-type business logic — step-type knowledge lives in
 * `step_type_presentation.ts`, delegated through the reused `DependenciesTab`.
 */
import { useCallback, useState, type ReactNode } from "react";
import { Link } from "react-router";
import useSWR from "swr";

import { fetchDependencies } from "../../services/extension_dependencies_client";
import { useInstallProgress } from "../../views/extension-settings/use_install_progress";
import { DependenciesTab } from "../../views/extension-settings/tabs/dependencies.tab";
import * as s from "./dependency_gate.css";

export interface DependencyGateProps {
  extensionId: string;
  children: ReactNode;
}

function dismissalKey(extensionId: string): string {
  return `nexus.depgate.dismissed:${extensionId}`;
}

function readDismissed(extensionId: string): boolean {
  try {
    return window.sessionStorage.getItem(dismissalKey(extensionId)) === "1";
  } catch {
    return false;
  }
}

function persistDismissed(extensionId: string): void {
  try {
    window.sessionStorage.setItem(dismissalKey(extensionId), "1");
  } catch {
    // sessionStorage may be unavailable; the in-memory flag still applies.
  }
}

export function DependencyGate({ extensionId, children }: DependencyGateProps) {
  const swrKey = `/extensions/${extensionId}/dependencies`;
  const { data, error, isLoading } = useSWR(swrKey, () =>
    fetchDependencies(extensionId),
  );
  useInstallProgress(extensionId, swrKey);

  const [dismissed, setDismissed] = useState(() => readDismissed(extensionId));
  const [bannerHidden, setBannerHidden] = useState(false);

  const handleContinueAnyway = useCallback(() => {
    persistDismissed(extensionId);
    setDismissed(true);
  }, [extensionId]);

  const settingsHref = `/extensions/${encodeURIComponent(extensionId)}/settings?tab=dependencies`;

  if (dismissed) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className={s.stateShell} role="status" aria-live="polite">
        <span className={s.stateMessage}>Checking dependencies…</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={s.stateShell} role="alert">
        <span className={s.stateMessage}>
          Could not check dependencies:{" "}
          {error instanceof Error ? error.message : String(error ?? "unknown error")}
        </span>
        <Link to={settingsHref} className={s.link}>
          Open dependency settings
        </Link>
      </div>
    );
  }

  const steps = data.steps;
  const noneSatisfied = steps.length > 0 && !steps.some((step) => step.satisfied);

  if (steps.length === 0 || data.all_satisfied) {
    return <>{children}</>;
  }

  if (noneSatisfied) {
    return (
      <div className={s.fullScreen}>
        <header className={s.heading}>
          <span className={s.eyebrow}>Setup required</span>
          <h1 className={s.title}>Install dependencies to continue</h1>
          <p className={s.subtitle}>
            This extension needs the steps below before it can run.
          </p>
        </header>
        <DependenciesTab extensionId={extensionId} />
        <div className={s.escapeRow}>
          <button
            type="button"
            className={s.ghostButton}
            onClick={handleContinueAnyway}
          >
            Continue anyway
          </button>
        </div>
      </div>
    );
  }

  const satisfiedCount = steps.filter((step) => step.satisfied).length;

  return (
    <>
      {!bannerHidden ? (
        <div className={s.banner} role="status">
          <div className={s.bannerText}>
            <span className={s.bannerTitle}>
              {satisfiedCount} of {steps.length} ready
            </span>
            <span className={s.bannerSubtitle}>
              Finish setup to unlock every feature.
            </span>
          </div>
          <div className={s.bannerActions}>
            <Link to={settingsHref} className={s.link}>
              Finish setup
            </Link>
            <button
              type="button"
              className={s.ghostButton}
              aria-label="Dismiss setup banner"
              onClick={() => setBannerHidden(true)}
            >
              Dismiss
            </button>
          </div>
        </div>
      ) : null}
      {children}
    </>
  );
}
