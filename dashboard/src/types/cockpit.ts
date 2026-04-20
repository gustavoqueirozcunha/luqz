// cockpit.ts — Contrato do backend n8n (cockpit/performance)

export type StatusCor = "verde" | "amarelo" | "vermelho";
export type TipoFunil = "topo" | "captacao" | "consideracao" | "venda";
export type NomeKpi   = "CPS" | "CPL" | "CAC";

export interface ClientePerformance {
  cliente:     string;
  funil:       string;
  leads:       number;
  investimento: number;
  cpl:         number;
  status:      StatusCor;
  tipoFunil:   TipoFunil;
  kpi:         number;
  nomeKpi:     NomeKpi;
}

export interface PerformanceResponse {
  status:      "ok" | "error";
  totalGrupos: number;
  data:        ClientePerformance[];
}

// ── Estados da UI ─────────────────────────────────────────────────────────────

export type LoadState = "idle" | "loading" | "success" | "error";

export interface PerformanceState {
  loadState:    LoadState;
  data:         ClientePerformance[];
  totalGrupos:  number;
  error:        string | null;
  lastUpdated:  Date | null;
  fromCache:    boolean;
}

// ── Filtros ───────────────────────────────────────────────────────────────────

export interface CockpitFiltros {
  busca:     string;
  tipoFunil: TipoFunil | "todos";
  status:    StatusCor | "todos";
}
