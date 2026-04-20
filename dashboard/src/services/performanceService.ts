import type { PerformanceResponse } from "@/types/cockpit";

const API_URL  = "https://editor.luqz.com.br/webhook/cockpit/performance";
const CACHE_TTL = 120_000; // 2 min — espelha o TTL do n8n

interface CacheEntry {
  data:      PerformanceResponse;
  fetchedAt: number;
}

let _cache: CacheEntry | null = null;
let _inflight: Promise<PerformanceResponse> | null = null;

export async function getPerformanceData(
  opts: { forceRefresh?: boolean; gestor?: string } = {}
): Promise<PerformanceResponse> {
  const now = Date.now();

  if (
    !opts.forceRefresh &&
    _cache &&
    now - _cache.fetchedAt < CACHE_TTL
  ) {
    return _cache.data;
  }

  // Deduplica chamadas simultâneas (ex: múltiplos componentes montando juntos)
  if (_inflight) return _inflight;

  const url = opts.gestor
    ? `${API_URL}?gestor=${encodeURIComponent(opts.gestor)}`
    : API_URL;

  _inflight = fetch(url, {
    method:  "GET",
    headers: { Accept: "application/json" },
    signal:  AbortSignal.timeout(10_000),
  })
    .then(async (res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const payload = (await res.json()) as PerformanceResponse;
      if (payload.status !== "ok") throw new Error("Backend retornou status !== ok");
      _cache = { data: payload, fetchedAt: Date.now() };
      return payload;
    })
    .finally(() => {
      _inflight = null;
    });

  return _inflight;
}

export function getCacheAge(): number | null {
  return _cache ? Date.now() - _cache.fetchedAt : null;
}

export function invalidateCache(): void {
  _cache = null;
}
