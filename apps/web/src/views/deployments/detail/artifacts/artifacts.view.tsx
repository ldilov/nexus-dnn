import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";
import { ConfirmDialog } from "../../../../components/base/confirm_dialog";
import { ArtifactsUI, type ArtifactRow } from "./artifacts.ui";

interface ArtifactsResponse {
  readonly artifacts: readonly ArtifactRow[];
  readonly total: number;
}

interface DeleteResponse {
  readonly deleted: number;
}

function buildArtifactPath(extensionId: string, deploymentId: string, suffix = ""): string {
  return `/api/v1/extensions/${extensionId}/deployments/${deploymentId}/artifacts${suffix}`;
}

/**
 * Subset filter for bulk operations. The backend treats the `utteranceIds`
 * query param as an OPT-IN filter on the existing bulk endpoints — when it
 * is absent the operation acts on the full deployment, preserving the
 * "delete all / download all" semantics.
 *
 * IDs are constrained to `[A-Za-z0-9\-_]` server-side so plain `,`-joined
 * concatenation is safe — `URLSearchParams.toString()` would percent-encode
 * commas as `%2C`, and a transparent proxy that re-encodes once more would
 * silently break the split on the receiving end.
 */
function appendIdsParam(url: string, ids: ReadonlySet<string>): string {
  if (ids.size === 0) return url;
  const joined = Array.from(ids).join(",");
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}utteranceIds=${joined}`;
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
  const [confirmDeleteSelectedOpen, setConfirmDeleteSelectedOpen] = useState(false);
  const [deleteSelectedBusy, setDeleteSelectedBusy] = useState(false);
  const [selected, setSelected] = useState<ReadonlySet<string>>(() => new Set());

  const swrKey = extensionId ? buildArtifactPath(extensionId, deploymentId) : null;
  const { data, error, isLoading, mutate } = useSWR<ArtifactsResponse>(
    swrKey,
    fetchArtifacts,
    { revalidateOnFocus: false },
  );

  const artifacts = data?.artifacts ?? [];

  // Drop selection IDs that no longer exist in the latest artifact list
  // (e.g. after a single delete or a server-side prune). Pure derivation —
  // no extra effects needed.
  const visibleSelected = useMemo(() => {
    if (selected.size === 0) return selected;
    const present = new Set<string>();
    for (const a of artifacts) {
      if (selected.has(a.utteranceId)) present.add(a.utteranceId);
    }
    return present.size === selected.size ? selected : present;
  }, [artifacts, selected]);

  const handleToggleSelect = useCallback((utteranceId: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(utteranceId)) next.delete(utteranceId);
      else next.add(utteranceId);
      return next;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    setSelected(new Set(artifacts.map((a) => a.utteranceId)));
  }, [artifacts]);

  const handleClearSelection = useCallback(() => {
    setSelected(new Set());
  }, []);

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
        setSelected((prev) => {
          if (!prev.has(utteranceId)) return prev;
          const next = new Set(prev);
          next.delete(utteranceId);
          return next;
        });
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
      const body = (await resp.json()) as DeleteResponse;
      toast.success(
        body.deleted > 0
          ? `Deleted ${body.deleted} artifact${body.deleted === 1 ? "" : "s"}`
          : "Nothing to delete",
      );
      setConfirmDeleteAllOpen(false);
      setPlayingId(null);
      setSelected(new Set());
      await mutate();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete-all failed");
    } finally {
      setDeleteAllBusy(false);
    }
  }, [deploymentId, extensionId, mutate]);

  const handleConfirmDeleteSelected = useCallback(async () => {
    if (!extensionId || visibleSelected.size === 0) return;
    setDeleteSelectedBusy(true);
    const path = appendIdsParam(
      buildArtifactPath(extensionId, deploymentId),
      visibleSelected,
    );
    try {
      const resp = await fetch(path, { method: "DELETE" });
      if (!resp.ok) {
        const detail = await safeJson(resp);
        throw new Error(
          detail?.message ?? `Failed to delete selection (HTTP ${resp.status})`,
        );
      }
      const body = (await resp.json()) as DeleteResponse;
      toast.success(
        body.deleted > 0
          ? `Deleted ${body.deleted} artifact${body.deleted === 1 ? "" : "s"}`
          : "Nothing to delete",
      );
      setConfirmDeleteSelectedOpen(false);
      if (playingId && visibleSelected.has(playingId)) setPlayingId(null);
      setSelected(new Set());
      await mutate();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete-selected failed");
    } finally {
      setDeleteSelectedBusy(false);
    }
  }, [deploymentId, extensionId, mutate, playingId, visibleSelected]);

  const handleDownloadZip = useCallback(() => {
    if (!extensionId) return;
    const path = buildArtifactPath(extensionId, deploymentId, ".zip");
    window.location.href = path;
  }, [deploymentId, extensionId]);

  const handleDownloadSelected = useCallback(() => {
    if (!extensionId || visibleSelected.size === 0) return;
    const path = appendIdsParam(
      buildArtifactPath(extensionId, deploymentId, ".zip"),
      visibleSelected,
    );
    window.location.href = path;
  }, [deploymentId, extensionId, visibleSelected]);

  const buildDownloadUrl = useCallback(
    (utteranceId: string) =>
      extensionId
        ? buildArtifactPath(extensionId, deploymentId, `/${utteranceId}/download`)
        : "",
    [deploymentId, extensionId],
  );

  if (!extensionId) {
    const noop = () => {};
    return (
      <ArtifactsUI
        artifacts={[]}
        loading={false}
        error={
          "This deployment isn't bound to an extension — artifacts are only produced by extension-driven runs."
        }
        playingId={null}
        selected={new Set()}
        onPlayToggle={noop}
        onDelete={noop}
        onDeleteAll={noop}
        onDownloadZip={noop}
        onToggleSelect={noop}
        onSelectAll={noop}
        onClearSelection={noop}
        onDeleteSelected={noop}
        onDownloadSelected={noop}
        buildDownloadUrl={() => ""}
      />
    );
  }

  return (
    <>
      <ArtifactsUI
        artifacts={artifacts}
        loading={isLoading}
        error={error instanceof Error ? error.message : null}
        playingId={playingId}
        selected={visibleSelected}
        onPlayToggle={(id) => setPlayingId((prev) => (prev === id ? null : id))}
        onDelete={handleDelete}
        onDeleteAll={() => setConfirmDeleteAllOpen(true)}
        onDownloadZip={handleDownloadZip}
        onToggleSelect={handleToggleSelect}
        onSelectAll={handleSelectAll}
        onClearSelection={handleClearSelection}
        onDeleteSelected={() => setConfirmDeleteSelectedOpen(true)}
        onDownloadSelected={handleDownloadSelected}
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
      <ConfirmDialog
        open={confirmDeleteSelectedOpen}
        eyebrow="Destructive action"
        title={`Delete ${visibleSelected.size} selected artifact${visibleSelected.size === 1 ? "" : "s"}?`}
        description="Selected audio artifacts will be detached from the listing. The underlying run rows are kept so you can still see what was generated."
        impactLines={[
          `${visibleSelected.size} artifact reference${visibleSelected.size === 1 ? " is" : "s are"} cleared.`,
          "Other artifacts in this deployment are untouched.",
          "Run history and per-utterance metadata stay.",
        ]}
        confirmLabel={`Delete ${visibleSelected.size}`}
        destructive
        busy={deleteSelectedBusy}
        onConfirm={handleConfirmDeleteSelected}
        onCancel={() => {
          if (!deleteSelectedBusy) setConfirmDeleteSelectedOpen(false);
        }}
      />
    </>
  );
}
