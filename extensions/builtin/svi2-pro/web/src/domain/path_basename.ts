/** Return the final path segment of a Windows- or POSIX-style path.
 * Used to derive a display filename for a restored anchor image from its
 * stored server path (the original upload filename is not persisted). */
export function basenameOfPath(path: string): string {
  const parts = path.split(/[\\/]/);
  return parts[parts.length - 1] || path;
}
