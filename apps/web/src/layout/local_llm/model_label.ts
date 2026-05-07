const HF_PREFIX = /^huggingface[:/]/i;
const KNOWN_SUFFIXES = /-(?:GGUF|gguf|EXL2|exl2|AWQ|awq|GPTQ|gptq|MLX|mlx)$/;

export function prettyModelLabel(raw: string | null | undefined): string {
  if (!raw) return "";
  const stripped = raw.replace(HF_PREFIX, "");
  const atIdx = stripped.indexOf("@");
  const head = atIdx === -1 ? stripped : stripped.slice(0, atIdx);
  const variant = atIdx === -1 ? "" : stripped.slice(atIdx + 1);
  const slashIdx = head.lastIndexOf("/");
  const tail = slashIdx === -1 ? head : head.slice(slashIdx + 1);
  const cleanTail = tail.replace(KNOWN_SUFFIXES, "");
  return variant ? `${cleanTail} · ${variant}` : cleanTail;
}

export function modelOrgFromLabel(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const stripped = raw.replace(HF_PREFIX, "");
  const atIdx = stripped.indexOf("@");
  const head = atIdx === -1 ? stripped : stripped.slice(0, atIdx);
  const slashIdx = head.indexOf("/");
  if (slashIdx === -1) return null;
  return head.slice(0, slashIdx);
}
