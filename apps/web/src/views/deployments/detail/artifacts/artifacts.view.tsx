import { useCallback, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";
import { ConfirmDialog } from "../../../../components/base/confirm_dialog";
import { ArtifactsUI, type ArtifactRow } from "./artifacts.ui";

interface ArtifactsResponse {
  readonly artifacts: readonly ArtifactRow[];
  readonly total: number;
}

interface DeleteAllResponse {
  readonly deleted: number;
}

function buildArtifactPath(extensionId: string, deploymentId: string, suffix = ""): string {
  return `/api/v1/extensions/${extensionId}/deployments/${deploymentId}/artifacts${suffix}`;
}

async function fetchArtifacts(path: string): Promise<ArtifactsResponse> {
  const resp = await fetch(path, { headers: { accept: "application/json" } });
  if (!resp.ok) {
    const detail = await safeJson(resp);
    throw new Error(detail?.message ?? `Failed to load artifacts (HTTP ${resp.status})`);
  }
  return (await resp.json()) as ArtifactsResponse;
}

async function safeJson(resp: Response): Promise<{ message?: string } | null> {
  try {
    return (await resp.json()) as { message?: string };
  } catch {
    return null;
  }
}

export interface ArtifactsViewProps {
  readonly deploymentId: string;
  readonly extensionId: string | null;
}

export function ArtifactsView({ deploymentId, extensionId }: ArtifactsViewProps) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [confirmDeleteAllOpen, setConfirmDeleteAllOpen] = useState(false);
  const [deleteAllBusy, setDeleteAllBusy] = useState(false);

  const swrKey = extensionId ? buildArtifactPath(extensionId, deploymentId) : null;
  const { data, error, isLoading, mutate } = useSWR<ArtifactsResponse>(
    swrKey,
    fetchArtifacts,
    { revalidateOnFocus: false },
  );

  const handleDelete = useCallback(
    async (utteranceId: string) => {
      if (!extensionId) return;
      const path = buildArtifactPath(
        extensionId,
        deploymentId,
        `/${utteranceId}`,
      );
      try {
        const resp = await fetch(path, { method: "DELETE" });
        if (!resp.ok && resp.status !== 204) {
          const detail = await safeJson(resp);
          throw new Error(
            detail?.message ?? `Failed to delete (HTTP ${resp.status})`,
          );
        }
        toast.success("Artifact deleted");
        if (playingId === utteranceId) setPlayingId(null);
        await mutate();
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Delete failed");
      }
    },
    [deploymentId, extensionId, mutate, playingId],
  );

  const handleConfirmDeleteAll = useCallback(async () => {
    if (!extensionId) return;
    setDeleteAllBusy(true);
    const path = buildArtifactPath(extensionId, deploymentId);
    try {
      const resp = await fetch(path, { method: "DELETE" });
      if (!resp.ok) {
        const detail = await safeJson(resp);
        throw new Error(
          detail?.message ?? `Failed to delete all (HTTP ${resp.status})`,
        );
      }
      const body = (await resp.json()) as DeleteAllResponse;
      toast.success(
        body.deleted > 0
          ? `Deleted ${body.deleted} artifact${body.deleted === 1 ? "" : "s"}`
          : "Nothing to delete",
      );
      setConfirmDeleteAllOpen(false);
      setPlayingId(null);
      await mutate();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete-all failed");
    } finally {
      setDeleteAllBusy(false);
    }
  }, [deploymentId, extensionId, mutate]);

  const handleDownloadZip = useCallback(() => {
    if (!extensionId) return;
    const path = buildArtifactPath(extensionId, deploymentId, ".zip");
    window.location.href = path;
  }, [deploymentId, extensionId]);

  const buildDownloadUrl = useCallback(
    (utteranceId: string) =>
      extensionId
        ? buildArtifactPath(extensionId, deploymentId, `/${utteranceId}/download`)
        : "",
    [deploymentId, extensionId],
  );

  if (!extensionId) {
    return (
      <ArtifactsUI
        artifacts={[]}
        loading={false}
        error={
          "This deployment isn't bound to an extension — artifacts are only produced by extension-driven runs."
        }
        playingId={null}
        onPlayToggle={() => {}}
        onDelete={() => {}}
        onDeleteAll={() => {}}
        onDownloadZip={() => {}}
        buildDownloadUrl={() => ""}
      />
    );
  }

  return (
    <>
      <ArtifactsUI
        artifacts={data?.artifacts ?? []}
        loading={isLoading}
        error={error instanceof Error ? error.message : null}
        playingId={playingId}
        onPlayToggle={(id) => setPlayingId((prev) => (prev === id ? null : id))}
        onDelete={handleDelete}
        onDeleteAll={() => setConfirmDeleteAllOpen(true)}
        onDownloadZip={handleDownloadZip}
        buildDownloadUrl={buildDownloadUrl}
      />
      <ConfirmDialog
        open={confirmDeleteAllOpen}
        eyebrow="Destructive action"
        title="Delete all artifacts?"
        description="Every produced audio artifact for this deployment will be detached from the listing. The underlying run rows are kept so you can still see what was generated."
        impactLines={[
          "All artifact references are cleared.",
          "Run history and per-utterance metadata stay.",
          "Voice assets and mappings are untouched.",
        ]}
        confirmLabel="Delete all"
        destructive
        busy={deleteAllBusy}
        onConfirm={handleConfirmDeleteAll}
        onCancel={() => {
          if (!deleteAllBusy) setConfirmDeleteAllOpen(false);
        }}
      />
    </>
  );
}
