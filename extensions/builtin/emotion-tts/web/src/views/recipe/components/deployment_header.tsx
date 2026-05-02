import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { Deployment } from "../../../services/deployments_client";
import { ExtensionApiError } from "../../../services/http";
import { INDEXTTS_FAMILY_ID, startModelDownload } from "../../../services/model_store_client";
import {
  badgeLabel,
  getRuntimeHealth,
  restartRuntime,
  startRuntime,
  stopRuntime,
  type RuntimeHealth,
} from "../../../services/runtime_client";
import * as css from "../recipe.css";
import { Banner } from "../../../components/banner";
import { Button } from "../../../components/button";
import { StatusPill } from "../../../components/status_pill";

interface Props {
  deployment: Deployment;
}

const HEALTH_POLL_MS = 4000;

export function DeploymentHeader({ deployment }: Props): JSX.Element {
  const navigate = useNavigate();
  const [health, setHealth] = useState<RuntimeHealth | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

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

  const install = useCallback(async () => {
    setBusy(true);
    setError(null);
    try {
      await startRuntime();
    } catch (err) {
      setError(extract(err));
    } finally {
      setBusy(false);
    }
  }, []);

  const stop = useCallback(async () => {
    setBusy(true);
    try {
      await stopRuntime();
    } catch (err) {
      setError(extract(err));
    } finally {
      setBusy(false);
    }
  }, []);

  const restart = useCallback(async () => {
    setBusy(true);
    try {
      await restartRuntime();
    } catch (err) {
      setError(extract(err));
    } finally {
      setBusy(false);
    }
  }, []);

  const downloadModel = useCallback(async () => {
    setBusy(true);
    try {
      await startModelDownload(INDEXTTS_FAMILY_ID);
    } catch (err) {
      setError(extract(err));
    } finally {
      setBusy(false);
    }
  }, []);

  const badge = health?.badge ?? "not_installed";
  const isStopped = badge === "stopped" || badge === "not_installed";
  const isRunning = badge === "ready" || badge === "running" || badge === "starting";
  const modelMissing = error?.includes("model_missing") ?? false;

  return (
    <div className={css.controlRow} role="status" aria-live="polite">
      <span className={css.label}>Runtime</span>
      <span>{deployment.backendRuntimePreference ?? "indextts.python"}</span>

      <span className={css.label}>Badge</span>
      <StatusPill tone={toneFor(badge)} pulse={badge === "starting" || badge === "installing"}>
        {badgeLabel(badge)}
      </StatusPill>

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

      {isStopped && (
        <Button disabled={busy} onClick={install}>
          Install / Start runtime
        </Button>
      )}
      {isRunning && (
        <>
          <Button variant="danger" disabled={busy} onClick={stop}>
            Stop backend
          </Button>
          <Button variant="secondary" disabled={busy} onClick={restart}>
            Restart
          </Button>
        </>
      )}
      {modelMissing && (
        <Button disabled={busy} onClick={downloadModel}>
          Download IndexTTS-2 model
        </Button>
      )}

      <Button
        variant="secondary"
        onClick={() => navigate(`/${deployment.deploymentId}/mappings`)}
        title="Manage character → voice mappings (upload voice samples, edit emotion defaults)"
      >
        Mappings
      </Button>

      {error && !modelMissing && <Banner severity="error">{error}</Banner>}
    </div>
  );
}

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
