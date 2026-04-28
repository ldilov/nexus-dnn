import { useCallback, useEffect, useMemo, useState } from "react";
import {
  disableExtension,
  enableExtension,
  fetchExtensions,
  type Extension,
} from "../../../api/client";
import { fetchDependencies } from "../../../services/extension_dependencies_client";
import {
  ExtensionsGalleryUI,
  type GalleryActionState,
} from "./gallery.ui";

const IDLE: GalleryActionState = { loading: false, targetId: null };

export interface ExtensionsGalleryProps {
  onExtensionToggled?: () => void;
}

export function ExtensionsGallery({
  onExtensionToggled,
}: ExtensionsGalleryProps = {}) {
  const [extensions, setExtensions] = useState<Extension[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [action, setAction] = useState<GalleryActionState>(IDLE);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [setupRequired, setSetupRequired] = useState<Record<string, boolean>>({});

  const refresh = useCallback(() => {
    fetchExtensions()
      .then((items) => {
        setExtensions(items);
        setError(null);
      })
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : "Failed to load extensions"),
      );
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Fan out dependency probes per extension. Best-effort: a failure on any one
  // extension just leaves it out of the setupRequired map (gallery falls back
  // to "no badge").
  useEffect(() => {
    let cancelled = false;
    if (extensions.length === 0) {
      setSetupRequired({});
      return () => {
        cancelled = true;
      };
    }
    Promise.all(
      extensions.map(async (ext) => {
        try {
          const resp = await fetchDependencies(ext.id);
          return [ext.id, !resp.all_satisfied] as const;
        } catch {
          return [ext.id, false] as const;
        }
      }),
    ).then((results) => {
      if (cancelled) return;
      const next: Record<string, boolean> = {};
      for (const [id, needsSetup] of results) next[id] = needsSetup;
      setSetupRequired(next);
    });
    return () => {
      cancelled = true;
    };
  }, [extensions]);

  const setStatus = useCallback(
    (id: string, enable: boolean) => {
      setAction({ loading: true, targetId: id });
      const op = enable ? enableExtension(id) : disableExtension(id);
      op.then(() => {
        refresh();
        onExtensionToggled?.();
      })
        .catch((err: unknown) =>
          setError(err instanceof Error ? err.message : "Failed to update extension"),
        )
        .finally(() => setAction(IDLE));
    },
    [refresh, onExtensionToggled],
  );

  const { builtins, externals } = useMemo(() => {
    const b: Extension[] = [];
    const x: Extension[] = [];
    for (const ext of extensions) {
      if (ext.source === "builtin") b.push(ext);
      else x.push(ext);
    }
    return { builtins: b, externals: x };
  }, [extensions]);

  return (
    <ExtensionsGalleryUI
      builtins={builtins}
      externals={externals}
      totalCount={extensions.length}
      action={action}
      onToggle={setStatus}
      errorMessage={error}
      drawerOpen={drawerOpen}
      onOpenDrawer={() => setDrawerOpen(true)}
      onCloseDrawer={() => setDrawerOpen(false)}
      onInstalled={() => {
        refresh();
        onExtensionToggled?.();
      }}
      setupRequired={setupRequired}
    />
  );
}
