/**
 * Spec 035 — Dependencies tab.
 *
 * Generic step-list driven entirely by the host's `GET /dependencies` response.
 * Renders any extension's plan with no per-extension code paths.
 */
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";

import {
  cancelInstall,
  fetchDependencies,
  retryStep,
  startInstall,
  uninstallExtension,
} from "../../../services/extension_dependencies_client";
import {
  buildStepGroups,
  estimateUninstallImpact,
  formatSpeed,
  shortenSize,
} from "../step_type_presentation";
import { useInstallProgress, type InstallCompletedDetail } from "../use_install_progress";
import { PlanStrip } from "../components/plan_strip";
import { StepRow } from "../components/step_row";
import { ConfirmDialog } from "../../../components/base/confirm_dialog";
import * as s from "./dependencies.tab.css";

export interface DependenciesTabProps {
  extensionId: string;
}

export function DependenciesTab({ extensionId }: DependenciesTabProps) {
  const swrKey = `/extensions/${extensionId}/dependencies`;
  // audit-allow: io-boundary — direct fetch outside services/* layer, scoped to feature
  const { data, error, isLoading, mutate } = useSWR(swrKey, () =>
    fetchDependencies(extensionId),
  );

  const handleCompleted = useCallback(
    (detail: InstallCompletedDetail) => {
      if (detail.outcome === "success") {
        toast.success("Install complete", { description: extensionId });
      } else if (detail.outcome === "cancelled") {
        toast("Install cancelled", { description: extensionId });
      } else {
        const failed = detail.failedStep;
        toast.error(
          failed ? `Install failed at "${failed.stepId}"` : "Install failed",
          {
            description: failed
              ? `${failed.category}: ${failed.message}`
              : extensionId,
            duration: 10_000,
          },
        );
      }
    },
    [extensionId],
  );

  const progress = useInstallProgress(extensionId, swrKey, {
    onCompleted: handleCompleted,
  });
  const [busy, setBusy] = useState(false);
  const [uninstallOpen, setUninstallOpen] = useState(false);
  const [uninstalling, setUninstalling] = useState(false);

  const handleUninstall = useCallback(async () => {
    setUninstalling(true);
    try {
      const summary = await uninstallExtension(extensionId);
      const freed = summary.freed_bytes > 0 ? ` · ${shortenSize(summary.freed_bytes)} freed` : "";
      const kept =
        summary.kept_shared_models > 0
          ? ` · ${summary.kept_shared_models} shared kept`
          : "";
      toast.success("Extension uninstalled", {
        description: `${summary.removed_models} model${summary.removed_models === 1 ? "" : "s"} removed${freed}${kept}`,
      });
      setUninstallOpen(false);
      void mutate();
    } catch (err: unknown) {
      toast.error("Uninstall failed", {
        description: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setUninstalling(false);
    }
  }, [extensionId, mutate]);

  const handleInstallAll = useCallback(async () => {
    setBusy(true);
    try {
      await startInstall(extensionId);
      toast.success("Install started", { description: extensionId });
      void mutate();
    } catch (err: unknown) {
      toast.error("Failed to start install", {
        description: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setBusy(false);
    }
  }, [extensionId, mutate]);

  const handleReinstallAll = useCallback(async () => {
    const ok = window.confirm(
      "Reinstall every dependency from scratch?\n\nThis re-runs every step, including downloads — it can take a while and re-fetches model artifacts even if they're already on disk.",
    );
    if (!ok) return;
    setBusy(true);
    try {
      await startInstall(extensionId, { force: true });
      toast.success("Reinstall started", { description: extensionId });
      void mutate();
    } catch (err: unknown) {
      toast.error("Failed to start reinstall", {
        description: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setBusy(false);
    }
  }, [extensionId, mutate]);

  const handleCancel = useCallback(async () => {
    setBusy(true);
    try {
      await cancelInstall(extensionId);
      toast("Cancellation requested");
      void mutate();
    } catch (err: unknown) {
      toast.error("Cancel failed", {
        description: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setBusy(false);
    }
  }, [extensionId, mutate]);

  const handleRetry = useCallback(
    async (stepId: string) => {
      setBusy(true);
      try {
        await retryStep(extensionId, stepId);
        toast.success(`Retrying ${stepId}`);
        void mutate();
      } catch (err: unknown) {
        toast.error("Retry failed", {
          description: err instanceof Error ? err.message : String(err),
        });
      } finally {
        setBusy(false);
      }
    },
    [extensionId, mutate],
  );

  const installActive =
    progress.active ||
    (data?.install_active ?? false) ||
    data?.steps.some((step) => step.status === "running") ||
    false;

  const satisfiedById = useMemo(() => {
    const map: Record<string, boolean> = {};
    if (data) for (const step of data.steps) map[step.id] = step.satisfied;
    return map;
  }, [data]);

  if (isLoading) {
    return <div className={s.emptyState}>Loading dependencies…</div>;
  }
  if (error) {
    return (
      <div className={s.emptyState}>
        Could not load dependencies: {error instanceof Error ? error.message : String(error)}
      </div>
    );
  }
  if (!data || data.steps.length === 0) {
    return (
      <div className={s.emptyState}>
        This extension declares no managed dependencies.
      </div>
    );
  }

  const aggregateSpeed = Object.values(progress.liveByStep).reduce(
    (sum, live) => sum + live.speedBps,
    0,
  );
  const remainingLabel =
    data.total_remaining_bytes > 0
      ? aggregateSpeed > 0
        ? `${shortenSize(data.total_remaining_bytes)} remaining · ↓ ${formatSpeed(aggregateSpeed)}`
        : `${shortenSize(data.total_remaining_bytes)} remaining`
      : data.all_satisfied
        ? "All dependencies satisfied"
        : "Some steps need attention";
  const satisfiedCount = data.steps.filter((step) => step.satisfied).length;
  const totalSteps = data.steps.length;
  const planEyebrow = `Dependency plan · ${totalSteps} step${totalSteps === 1 ? "" : "s"}`;
  // A paused, partially-downloaded install (e.g. parked by a host restart).
  // Triggering install resumes from the persisted partial bytes, not from zero.
  const resumable = !installActive && Boolean(data.install_resumable);

  const impact = estimateUninstallImpact(data.steps);
  const anySatisfied = data.steps.some((step) => step.satisfied);
  const uninstallImpactLines = [
    "The extension runtime and virtual environment (venv)",
    impact.modelCount > 0
      ? `${impact.modelCount} model${impact.modelCount === 1 ? "" : "s"} used only by this extension${impact.modelBytes > 0 ? ` (≈ ${shortenSize(impact.modelBytes)})` : ""}`
      : "No exclusive model weights to remove",
    "Models shared with another extension are kept",
  ];

  return (
    <div className={s.root}>
      <header
        className={`${s.banner}${data.all_satisfied ? ` ${s.allSatisfied}` : ""}`}
      >
        <div className={s.bannerRow}>
          <span className={s.bannerFraction}>
            {satisfiedCount}
            <span className={s.bannerDenominator}>/{totalSteps}</span>
          </span>
          <div className={s.bannerText}>
            <span className={s.bannerEyebrow}>{planEyebrow}</span>
            <span className={s.bannerHeadline}>{remainingLabel}</span>
            {resumable && (
              <span className={s.bannerNote}>paused — resume to continue</span>
            )}
          </div>
          <div className={s.bannerActions}>
            {installActive ? (
              <button
                type="button"
                className={s.cancelButton}
                onClick={handleCancel}
                disabled={busy}
              >
                Cancel
              </button>
            ) : (
              <>
                {anySatisfied && (
                  <button
                    type="button"
                    className={s.uninstallButton}
                    onClick={() => setUninstallOpen(true)}
                    disabled={busy}
                    title="Remove this extension's runtime, venv, and exclusive models"
                  >
                    Uninstall
                  </button>
                )}
                <button
                  type="button"
                  className={s.reinstallButton}
                  onClick={handleReinstallAll}
                  disabled={busy}
                  title="Re-run every step from scratch, ignoring already-installed state"
                >
                  Reinstall everything
                </button>
                <button
                  type="button"
                  className={s.installButton}
                  onClick={handleInstallAll}
                  disabled={busy || data.all_satisfied}
                  title={
                    resumable
                      ? "Resume the paused download from where it stopped"
                      : "Install all dependencies"
                  }
                >
                  {data.all_satisfied
                    ? "All set"
                    : resumable
                      ? "Resume install"
                      : "Install all"}
                </button>
              </>
            )}
          </div>
        </div>
        <PlanStrip steps={data.steps} />
      </header>

      <ConfirmDialog
        open={uninstallOpen}
        eyebrow="Uninstall extension"
        title={`Uninstall ${extensionId}?`}
        description="This reverses the install. It releases any running leases, then removes the extension's files and the models only it uses."
        impactLines={uninstallImpactLines}
        confirmLabel="Uninstall"
        destructive
        busy={uninstalling}
        onConfirm={handleUninstall}
        onCancel={() => setUninstallOpen(false)}
      />

      <div className={s.stepList}>
        {buildStepGroups(data.steps).map((group) => (
          <section key={group.id} className={s.group} aria-label={group.title}>
            <div className={s.groupHead}>
              <span className={s.groupIndex}>{group.index}</span>
              <h3 className={s.groupTitle}>{group.title}</h3>
              <span className={s.groupMeta}>{group.meta}</span>
            </div>
            <div className={s.groupCard}>
              {group.steps.map((step) => {
                const upstreamSatisfied = step.requires.every(
                  (req) => satisfiedById[req] ?? false,
                );
                return (
                  <StepRow
                    key={step.id}
                    step={step}
                    grouped
                    upstreamSatisfied={upstreamSatisfied}
                    installActive={installActive}
                    resumable={resumable}
                    live={progress.liveByStep[step.id]}
                    onInstallOnly={handleRetry}
                    onRetry={handleRetry}
                    onReinstall={handleRetry}
                  />
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
