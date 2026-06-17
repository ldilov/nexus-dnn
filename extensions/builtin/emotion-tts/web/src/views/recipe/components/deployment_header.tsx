import { useEffect, useState, type CSSProperties } from "react";
import type { Deployment } from "../../../services/deployments_client";
import { ExtensionApiError } from "../../../services/http";
import {
  badgeLabel,
  getRuntimeHealth,
  type RuntimeHealth,
} from "../../../services/runtime_client";
import {
  getDesiredWarmup,
  setDesiredWarmup,
  setDesiredWorkers,
} from "../../../services/worker_pref";
import * as css from "../recipe.css";
import { Banner } from "../../../components/banner";
import { StatusPill } from "../../../components/status_pill";

interface Props {
  deployment: Deployment;
}

const HEALTH_POLL_MS = 4000;

export function DeploymentHeader({ deployment }: Props): JSX.Element {
  const [health, setHealth] = useState<RuntimeHealth | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Desired worker count for the *next* start. Seeded from the active cap the
  // first time health reports it, then user-owned.
  const [workers, setWorkers] = useState(1);
  const seededWorkers = useState({ done: false })[0];
  // Preload-on-start preference, mirrored into worker_pref for the host bridge.
  const [warmup, setWarmup] = useState(getDesiredWarmup());

  useEffect(() => {
    let cancelled = false;
    const poll = async () => {
      try {
        const h = await getRuntimeHealth();
        if (!cancelled) {
          setHealth(h);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) setError(extract(err));
      }
    };
    poll();
    const id = setInterval(poll, HEALTH_POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    const active = health?.workersActive;
    if (active != null && !seededWorkers.done) {
      seededWorkers.done = true;
      setWorkers(active);
      setDesiredWorkers(active);
    }
  }, [health?.workersActive, seededWorkers]);

  const badge = health?.badge ?? "not_installed";
  const modelMissing = error?.includes("model_missing") ?? false;
  const workersCeiling = health?.workersCeiling ?? 1;
  const workersActive = health?.workersActive ?? 1;
  const runtimeUp = badge === "ready" || badge === "running" || badge === "starting";
  const workersWarming = health?.workersWarming ?? 0;
  const workersWarm = health?.workersWarm ?? 0;

  return (
    <output className={css.controlRow} aria-live="polite">
      <span className={css.label}>Runtime</span>
      <span>{deployment.backendRuntimePreference ?? "indextts.python"}</span>

      <span className={css.label}>Badge</span>
      <StatusPill tone={toneFor(badge)} pulse={badge === "starting" || badge === "installing"}>
        {badgeLabel(badge)}
      </StatusPill>

      {workersWarming > 0 && (
        <span style={WARMING_INDICATOR} aria-live="polite">
          Warming {workersWarm}/{workersActive}…
        </span>
      )}

      {health && (
        <>
          <span className={css.label}>Uptime</span>
          <span>{formatUptime(health.uptimeSeconds)}</span>
          <span className={css.label}>VRAM</span>
          <span>
            {health.vramUsedMb} / {health.vramTotalMb} MB
          </span>
        </>
      )}

      {workersCeiling > 1 && (
        <>
          <span className={css.label}>Workers</span>
          <span style={WORKERS_WRAP}>
            <select
              value={workers}
              aria-label="Concurrent workers for the next runtime start"
              onChange={(e) => {
                const n = Number(e.target.value);
                setWorkers(n);
                setDesiredWorkers(n);
              }}
              style={WORKERS_SELECT}
            >
              {Array.from({ length: workersCeiling }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <span style={WORKERS_HINT}>
              {runtimeUp && workers !== workersActive
                ? `restart to apply · active ${workersActive}`
                : `~${workers}× model VRAM`}
            </span>
          </span>

          <span className={css.label}>Preload</span>
          <label style={WARMUP_LABEL}>
            <input
              type="checkbox"
              checked={warmup}
              aria-label="Preload models on start"
              onChange={(e) => {
                const on = e.target.checked;
                setWarmup(on);
                setDesiredWarmup(on);
              }}
              style={WARMUP_CHECKBOX}
            />
            <span style={WORKERS_HINT}>Preload models on start</span>
          </label>
        </>
      )}

      {modelMissing && (
        <Banner severity="warning">
          <strong>IndexTTS-2 model is not installed.</strong>{" "}
          Open <em>Settings → Dependencies → Install all</em> to download the required artifacts, then retry.
        </Banner>
      )}
      {error && !modelMissing && <Banner severity="error">{error}</Banner>}
    </output>
  );
}

const WORKERS_WRAP: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
};

const WORKERS_SELECT: CSSProperties = {
  height: 24,
  padding: "0 6px",
  background: "var(--surface-floor, #0c0e10)",
  border: "1px solid rgba(70,72,74,0.4)",
  borderRadius: 6,
  color: "var(--on-surface)",
  fontFamily: "var(--font-mono)",
  fontSize: 12,
  outline: "none",
  cursor: "pointer",
};

const WORKERS_HINT: CSSProperties = {
  fontSize: 11,
  color: "var(--on-surface-variant, #c4c7c5)",
};

const WARMUP_LABEL: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  cursor: "pointer",
};

const WARMUP_CHECKBOX: CSSProperties = {
  width: 14,
  height: 14,
  margin: 0,
  cursor: "pointer",
  accentColor: "var(--accent, #7aa2f7)",
};

const WARMING_INDICATOR: CSSProperties = {
  fontSize: 11,
  color: "var(--on-surface-variant, #c4c7c5)",
  fontFamily: "var(--font-mono)",
};

function toneFor(badge: string): "success" | "accent" | "danger" | "neutral" {
  switch (badge) {
    case "ready":
    case "running":
      return "success";
    case "starting":
    case "stopping":
    case "installing":
      return "accent";
    case "failed":
      return "danger";
    default:
      return "neutral";
  }
}

function formatUptime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  if (m < 60) return `${m}m ${seconds % 60}s`;
  const h = Math.floor(m / 60);
  return `${h}h ${m % 60}m`;
}

function extract(err: unknown): string {
  if (err instanceof ExtensionApiError) return err.message;
  if (err instanceof Error) return err.message;
  return "unknown error";
}
