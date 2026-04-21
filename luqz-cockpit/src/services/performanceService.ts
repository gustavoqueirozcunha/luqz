import type { CockpitAuth, PerformanceResponse } from "@/types/cockpit";

// ── KPI variance calculation ─────────────────────────────────────────────

export type KPI = {
  value: number;
  target: number;
  direction: "lower_is_better" | "higher_is_better";
};

export type KPIStatusResult = {
  variance: number | null;
  status: "good" | "neutral" | "warning" | "critical" | "no_target";
  label: string;
};

export function calculateKPIStatus(kpi: KPI): KPIStatusResult {
  const { value, target, direction } = kpi;

  if (!target || target === 0) {
    return { variance: null, status: "no_target", label: "Sem meta" };
  }

  let variance = (value - target) / target;

  if (direction === "higher_is_better") {
    variance = variance * -1;
  }

  let status: KPIStatusResult["status"] = "neutral";
  if (variance <= -0.1) status = "good";
  else if (variance > 0.1 && variance <= 0.3) status = "warning";
  else if (variance > 0.3) status = "critical";

  const percent = Math.round(variance * 100);
  const label =
    variance > 0
      ? `+${percent}% acima da meta`
      : `${percent}% abaixo da meta`;

  return { variance, status, label };
}

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
