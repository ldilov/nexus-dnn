import type { UserLoraParam } from "../../../services/types";

export const MAX_LORAS = 4;
export const MAX_LORA_WEIGHT = 4;

export function loraWeightHigh(e: UserLoraParam): number {
  return e.weight_high ?? e.weight ?? 1.0;
}

export function loraWeightLow(e: UserLoraParam): number {
  return e.weight_low ?? e.weight ?? 1.0;
}

export function addLora(list: UserLoraParam[]): UserLoraParam[] {
  return list.length >= MAX_LORAS
    ? list
    : [...list, { path: "", weight_high: 1.0, weight_low: 1.0 }];
}

export function removeLora(list: UserLoraParam[], index: number): UserLoraParam[] {
  return list.filter((_, i) => i !== index);
}

export function setLoraPath(
  list: UserLoraParam[],
  index: number,
  path: string,
): UserLoraParam[] {
  return list.map((e, i) => (i === index ? { ...e, path } : e));
}

export function setLoraWeightHigh(
  list: UserLoraParam[],
  index: number,
  weight: number,
): UserLoraParam[] {
  return list.map((e, i) => (i === index ? { ...e, weight_high: weight } : e));
}

export function setLoraWeightLow(
  list: UserLoraParam[],
  index: number,
  weight: number,
): UserLoraParam[] {
  return list.map((e, i) => (i === index ? { ...e, weight_low: weight } : e));
}
