export interface UserLora { path: string; weight: number; }

export const MAX_LORAS = 4;

export function addLora(list: UserLora[]): UserLora[] {
  return list.length >= MAX_LORAS ? list : [...list, { path: "", weight: 1.0 }];
}

export function removeLora(list: UserLora[], index: number): UserLora[] {
  return list.filter((_, i) => i !== index);
}

export function setLoraPath(list: UserLora[], index: number, path: string): UserLora[] {
  return list.map((e, i) => (i === index ? { ...e, path } : e));
}

export function setLoraWeight(list: UserLora[], index: number, weight: number): UserLora[] {
  return list.map((e, i) => (i === index ? { ...e, weight } : e));
}
