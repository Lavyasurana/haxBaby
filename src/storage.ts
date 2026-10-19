// Keep interactions usable for the current page even when browser storage is blocked.
const memory = new Map<string, string>();

export function readStored<T>(key: string, fallback: T): T {
  try {
    const value = memory.has(key) ? memory.get(key) : localStorage.getItem(key);
    return value == null ? fallback : JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function writeStored(key: string, value: unknown): boolean {
  const serialized = JSON.stringify(value);
  memory.set(key, serialized);
  try { localStorage.setItem(key, serialized); return true; } catch { return false; }
}

export function removeStored(key: string): boolean {
  memory.set(key, 'null');
  try { localStorage.removeItem(key); return true; } catch { return false; }
}
