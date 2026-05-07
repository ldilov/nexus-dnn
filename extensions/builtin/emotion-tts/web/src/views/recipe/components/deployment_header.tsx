import { useEffect, useState } from "react";
import type { Deployment } from "../../../services/deployments_client";
import { ExtensionApiError } from "../../../services/http";
import {
  badgeLabel,
  getRuntimeHealth,
  type RuntimeHealth,
} from "../../../services/runtime_client";
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

  const badge = health?.badge ?? "not_installed";
  const modelMissing = error?.includes("model_missing") ?? false;

  return (
    <output className={css.controlRow} aria-live="polite">
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
