import { useEffect, useState } from "react";
import { apiFetch } from "../../services/http";

interface QueueEntry {
  runId: string;
  deploymentId: string;
  deploymentName?: string;
  kind: "batch" | "test_line" | "resume";
  position: number;
  utteranceTotal?: number;
  etaSeconds?: number;
}

export function RuntimeQueueView(): JSX.Element {
  const [entries, setEntries] = useState<QueueEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const data = await apiFetch<{ entries: QueueEntry[] }>("/runtime/queue");
        if (!cancelled) setEntries(data.entries);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "failed");
      }
    };
    load();
    const id = setInterval(load, 3000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  if (error) return <main><p>{error}</p></main>;

  return (
    <main>
      <h1>Runtime queue</h1>
      {entries.length === 0 ? (
        <p>No runs in the queue.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Position</th>
              <th>Deployment</th>
              <th>Kind</th>
              <th>Utterances</th>
              <th>ETA</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.runId}>
                <td>{e.position}</td>
                <td>{e.deploymentName ?? e.deploymentId}</td>
                <td>{e.kind}</td>
                <td>{e.utteranceTotal ?? "—"}</td>
                <td>{e.etaSeconds ? `${e.etaSeconds}s` : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
