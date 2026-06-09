import { useState, useEffect } from "react";

const _cache = new Map<string, unknown>();

/**
 * Fetch content from /content/<key>.json at runtime.
 * Falls back to `fallback` if the file is missing or fetch fails.
 * Results are cached in memory for the session.
 */
export function useContent<T>(key: string, fallback: T): T {
  const [data, setData] = useState<T>(() => {
    const cached = _cache.get(key);
    return cached !== undefined ? (cached as T) : fallback;
  });

  useEffect(() => {
    const cached = _cache.get(key);
    if (cached !== undefined) {
      setData(cached as T);
      return;
    }

    let cancelled = false;

    fetch(`/content/${key}.json`, { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<T>;
      })
      .then((d) => {
        if (!cancelled) {
          _cache.set(key, d);
          setData(d);
        }
      })
      .catch(() => {
        /* silently use fallback — content file missing in dev is expected */
      });

    return () => {
      cancelled = true;
    };
  }, [key]);

  return data;
}
