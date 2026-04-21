export function formatGpuLayersLabel(
  value: number,
  max: number,
  known: boolean,
): string {
  if (value === max) {
    return "max";
  }
  if (value === 0) {
    return "CPU";
  }
  if (known) {
    return `${value} of ${max} layers`;
  }
  return `${value} layers`;
}
