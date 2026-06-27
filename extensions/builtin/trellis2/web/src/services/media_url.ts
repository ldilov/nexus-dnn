import { EXTENSION_PREFIX } from "./http";

/** Build the host media URL for an output artifact ref. LANE A's contract is
 * `GET /api/v1/extensions/nexus.3d.trellis2/media/:ref` (path-segment form). */
export function mediaUrlForRef(ref: string | null): string | null {
  if (!ref) return null;
  const path = ref.split("/").map(encodeURIComponent).join("/");
  return `${EXTENSION_PREFIX}/media/${path}`;
}

/** Probe whether a media ref still resolves via a bodyless HEAD request.
 * Returns false on any non-ok / network error so callers can clear a stale ref
 * without throwing. */
export async function mediaExists(ref: string | null): Promise<boolean> {
  const url = mediaUrlForRef(ref);
  if (!url) return false;
  try {
    const resp = await fetch(url, { method: "HEAD" });
    return resp.ok;
  } catch {
    return false;
  }
}
