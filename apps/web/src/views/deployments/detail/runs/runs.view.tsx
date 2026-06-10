import useSWR from "swr";
import { StatusChip, type StatusKind } from "../../../../components/base/status_chip";
import * as s from "./runs.css";

/** Generic run row served by any extension that implements the
 * `/api/v1/extensions/{ext-id}/deployments/{dep}/runs` convention —
 * the host shell stays opaque about what a "run" is per extension. */
interface RunRow {
  readonly id: string;
  readonly label: string;
  readonly status: string;
  readonly startedAt: number | null;
  readonly finishedAt: number | null;
  readonly durationMs: number | null;
  readonly detail: string | null;
}

interface RunsResponse {
  readonly runs: readonly RunRow[];
  readonly total: number;
}

const STATUS_KIND: Record<string, StatusKind> = {
  succeeded: "live",
  running: "live",
  queued: "draft",
  failed: "failed",
  cancelled: "idle",
};

async function fetchRuns(path: string): Promise<RunsResponse> {
  const resp = await fetch(path, { headers: { accept: "application/json" } });
  if (!resp.ok) {
    throw new Error(`Failed to load runs (HTTP ${resp.status})`);
  }
  return (await resp.json()) as RunsResponse;
}

function formatTimestamp(ms: number | null): string {
  if (ms === null) return "—";
  return new Date(ms).toLocaleString();
}

function formatDuration(ms: number | null): string {
  if (ms === null) return "—";
  const total = Math.round(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const sec = total % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${sec}s`;
  return `${sec}s`;
}

export interface RunsViewProps {
  readonly deploymentId: string;
  readonly extensionId: string | null;
}

export function RunsView({ deploymentId, extensionId }: RunsViewProps) {
  const swrKey = extensionId
    ? `/api/v1/extensions/${extensionId}/deployments/${deploymentId}/runs`
    : null;
  const { data, error, isLoading } = useSWR<RunsResponse>(swrKey, fetchRuns, {
    refreshInterval: 5000,
  });

  if (!extensionId) {
    return (
      <div className={s.note}>
        This deployment isn't bound to an extension — runs are only recorded by
        extension-driven renders.
      </div>
    );
  }
  if (isLoading && !data) {
    return <div className={s.note}>Loading runs…</div>;
  }
  if (error) {
    return (
      <div className={s.note}>
        {error instanceof Error ? error.message : "Failed to load runs."}
      </div>
    );
  }
  const runs = data?.runs ?? [];
  if (runs.length === 0) {
    return <div className={s.note}>No runs yet — start a render from the Recipe tab.</div>;
  }

  return (
    <div className={s.tableWrap}>
      <table className={s.table}>
        <thead>
          <tr>
            <th className={s.th}>Run</th>
            <th className={s.th}>Status</th>
            <th className={s.th}>Started</th>
            <th className={s.th}>Duration</th>
            <th className={s.th}>Detail</th>
          </tr>
        </thead>
        <tbody>
          {runs.map((run) => (
            <tr key={run.id} className={s.row}>
              <td className={s.td}>
                <div className={s.runLabel}>{run.label}</div>
                <div className={s.runId}>{run.id}</div>
              </td>
              <td className={s.td}>
                <StatusChip
                  kind={STATUS_KIND[run.status] ?? "idle"}
                  label={run.status}
                  pulse={run.status === "running"}
                />
              </td>
              <td className={s.td}>{formatTimestamp(run.startedAt)}</td>
              <td className={s.td}>{formatDuration(run.durationMs)}</td>
              <td className={s.tdDetail} title={run.detail ?? undefined}>
                {run.detail ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
