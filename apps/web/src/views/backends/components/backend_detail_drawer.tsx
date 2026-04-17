import { useEffect, useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";
import { LogConsole, type LogLine } from "./log_console";
import type { BackendSummary, ValidationReport } from "../types";
import {
  fetchBackendLogs,
  uninstallBackend,
  validateBackend,
} from "../../../services/backends";
import * as s from "./backend_detail_drawer.css";

interface Props {
  backend: BackendSummary;
  onClose: () => void;
  onRepair: (backend: BackendSummary) => void;
  onValidated?: () => void;
}

type ValidateState =
  | { kind: "idle" }
  | { kind: "running" }
  | { kind: "ok"; report: ValidationReport }
  | { kind: "fail"; report: ValidationReport }
  | { kind: "error"; message: string };

type UninstallState = "idle" | "confirm" | "running";

export function BackendDetailDrawer({
  backend,
  onClose,
  onRepair,
  onValidated,
}: Props) {
  const [validate, setValidate] = useState<ValidateState>({ kind: "idle" });
  const [uninstall, setUninstall] = useState<UninstallState>("idle");
  const [logs, setLogs] = useState<LogLine[]>([]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    let alive = true;
    const ac = new AbortController();
    const load = async () => {
      try {
        const lines = await fetchBackendLogs(backend.id, ac.signal);
        if (!alive) return;
        setLogs(lines as unknown as LogLine[]);
      } catch {
        return;
      }
    };
    void load();
    return () => {
      alive = false;
      ac.abort();
    };
  }, [backend.id]);

  const handleValidate = async () => {
    setValidate({ kind: "running" });
    try {
      const result = await validateBackend(backend.id);
      const body = result.body as {
        data?: ValidationReport;
        error?: { message: string };
      } | null;
      if (!result.ok) {
        setValidate({
          kind: "error",
          message: body?.error?.message ?? `HTTP ${result.status}`,
        });
        return;
      }
      const report = body?.data as ValidationReport;
      setValidate(report.overall_ok ? { kind: "ok", report } : { kind: "fail", report });
      void mutate("host-backends");
      onValidated?.();
    } catch (e) {
      setValidate({
        kind: "error",
        message: e instanceof Error ? e.message : "validation failed",
      });
    }
  };

  const handleUninstall = async () => {
    const installId = backend.install?.runtime_install_id;
    if (!installId) {
      toast.error("No install to remove.");
      return;
    }
    if (uninstall === "idle") {
      setUninstall("confirm");
      return;
    }
    setUninstall("running");
    try {
      await uninstallBackend(installId);
      toast.success(`${backend.display_name} uninstalled.`);
      void mutate("host-backends");
      onClose();
    } catch (e) {
      toast.error(
        `Uninstall failed: ${e instanceof Error ? e.message : "unknown error"}`,
      );
      setUninstall("idle");
    }
  };

  const scrimClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const showRepair = backend.card_state === "broken";
  const showValidate =
    backend.card_state === "installed_unvalidated" || backend.card_state === "ready";
  const showUninstall = backend.install !== null;

  return (
    <div className={s.scrim} onClick={scrimClick} role="presentation">
      <aside
        className={s.drawer}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`detail-title-${backend.id}`}
      >
        <header className={s.header}>
          <span className={s.eyebrow}>Details</span>
          <div className={s.headerRow}>
            <h2 className={s.title} id={`detail-title-${backend.id}`}>
              {backend.display_name}
            </h2>
            <span className={s.stateChip}>{backend.card_state.replace(/_/g, " ")}</span>
          </div>
        </header>

        <div className={s.body}>
          <section className={s.section}>
            <span className={s.sectionLabel}>Install</span>
            {backend.install ? (
              <div className={s.metaGrid}>
                <span className={s.metaLabel}>release_id</span>
                <span className={s.metaValue}>{backend.install.release_id}</span>
                <span className={s.metaLabel}>platform</span>
                <span className={s.metaValue}>{backend.install.platform}</span>
                <span className={s.metaLabel}>accelerator</span>
                <span className={s.metaValue}>{backend.install.accelerator_profile}</span>
                <span className={s.metaLabel}>runtime_install_id</span>
                <span className={s.metaValue}>{backend.install.runtime_install_id}</span>
                <span className={s.metaLabel}>installed_at</span>
                <span className={s.metaValue}>
                  {new Date(backend.install.installed_at * 1000).toLocaleString()}
                </span>
                {backend.install.validated_at !== null && (
                  <>
                    <span className={s.metaLabel}>validated_at</span>
                    <span className={s.metaValue}>
                      {new Date(backend.install.validated_at * 1000).toLocaleString()}
                    </span>
                  </>
                )}
              </div>
            ) : (
              <div className={s.metaValue}>Not installed.</div>
            )}
          </section>

          {backend.last_failure_category && (
            <section className={s.section}>
              <span className={s.sectionLabel}>Last failure</span>
              <div className={`${s.validationBanner} ${s.bannerError}`}>
                {backend.last_failure_category}
              </div>
            </section>
          )}

          {validate.kind === "ok" && (
            <section className={s.section}>
              <div className={`${s.validationBanner} ${s.bannerSuccess}`}>
                <strong>Validation passed</strong>
                <span>
                  {validate.report.checks.length} checks in{" "}
                  {validate.report.checks.reduce((a, c) => a + c.duration_ms, 0)}
                  ms
                </span>
              </div>
            </section>
          )}

          {validate.kind === "fail" && (
            <section className={s.section}>
              <div className={`${s.validationBanner} ${s.bannerError}`}>
                <strong>
                  Validation failed
                  {validate.report.failure_category
                    ? ` — ${validate.report.failure_category}`
                    : ""}
                </strong>
                {validate.report.checks
                  .filter((c) => !c.ok)
                  .map((c) => (
                    <span key={c.check_id}>
                      {c.check_id}: {c.message}
                    </span>
                  ))}
              </div>
            </section>
          )}

          {validate.kind === "error" && (
            <section className={s.section}>
              <div className={`${s.validationBanner} ${s.bannerError}`}>
                {validate.message}
              </div>
            </section>
          )}

          <section className={s.section}>
            <span className={s.sectionLabel}>Runtime logs</span>
            <div className={s.logWrap}>
              <LogConsole lines={logs} />
            </div>
          </section>
        </div>

        <footer className={s.footer}>
          {showValidate && (
            <button
              type="button"
              className={s.primaryButton}
              onClick={handleValidate}
              disabled={validate.kind === "running"}
            >
              {validate.kind === "running" ? "Validating…" : "Validate"}
            </button>
          )}
          {showRepair && (
            <button
              type="button"
              className={s.primaryButton}
              onClick={() => onRepair(backend)}
            >
              Repair
            </button>
          )}
          {showUninstall && (
            <button
              type="button"
              className={s.destructiveButton}
              onClick={handleUninstall}
              disabled={uninstall === "running"}
            >
              {uninstall === "confirm"
                ? "Click again to confirm"
                : uninstall === "running"
                  ? "Uninstalling…"
                  : "Uninstall"}
            </button>
          )}
          <button type="button" className={s.secondaryButton} onClick={onClose}>
            Close
          </button>
        </footer>
      </aside>
    </div>
  );
}
