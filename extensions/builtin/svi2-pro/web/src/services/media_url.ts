import { EXTENSION_PREFIX } from "./http";

export function mediaUrlForPath(path: string | null): string | null {
  if (!path) return null;
  return `${EXTENSION_PREFIX}/media?path=${encodeURIComponent(path)}`;
}

export function mediaUrlForOutput(outputPath: string | null): string | null {
  return mediaUrlForPath(outputPath);
}

/** Probe whether a media path still exists on disk via a bodyless HEAD request.
 * Returns false on a 404 (or any network/error response) so callers can clear a
 * stale anchor path without throwing. */
export async function mediaExists(path: string | null): Promise<boolean> {
  const url = mediaUrlForPath(path);
  if (!url) return false;
  try {
    const resp = await fetch(url, { method: "HEAD" });
    return resp.ok;
  } catch {
    return false;
  }
}
