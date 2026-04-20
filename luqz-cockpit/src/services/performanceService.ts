import type { CockpitAuth, PerformanceResponse } from "@/types/cockpit";

const API_URL  = "https://editor.luqz.com.br/webhook/cockpit/performance";
const CACHE_TTL = 120_000;

interface CacheEntry {
  data:      PerformanceResponse;
  fetchedAt: number;
}

let _cache: CacheEntry | null = null;
let _inflight: Promise<PerformanceResponse> | null = null;

export async function getPerformanceData(
  opts: { forceRefresh?: boolean; auth?: CockpitAuth } = {}
): Promise<PerformanceResponse> {
  const now = Date.now();

  if (!opts.forceRefresh && _cache && now - _cache.fetchedAt < CACHE_TTL) {
    return _cache.data;
  }

  if (_inflight) return _inflight;

  const params = new URLSearchParams();
  if (opts.auth?.cliente) params.set("cliente", opts.auth.cliente);
  if (opts.auth?.token)   params.set("token",   opts.auth.token);

  const url = params.toString() ? `${API_URL}?${params}` : API_URL;

  const headers: HeadersInit = { Accept: "application/json" };

  _inflight = fetch(url, {
    method:  "GET",
    headers,
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

export function invalidateCache(): void {
  _cache = null;
}

export function getCacheAge(): number | null {
  return _cache ? Date.now() - _cache.fetchedAt : null;
}
