export type StatusCor = "verde" | "amarelo" | "vermelho";
export type TipoFunil = "topo" | "captacao" | "consideracao" | "venda";
export type NomeKpi   = "CPS" | "CPL" | "CAC";

export interface ClientePerformance {
  cliente:      string;
  funil:        string;
  resultados:   number;
  investimento: number;
  status:       StatusCor;
  tipoFunil:    TipoFunil;
  kpi:          number;
  nomeKpi:      NomeKpi;
}

export interface PerformanceResponse {
  status:      "ok" | "error";
  totalGrupos: number;
  data:        ClientePerformance[];
}

export type LoadState = "idle" | "loading" | "success" | "error";

export interface PerformanceState {
  loadState:   LoadState;
  data:        ClientePerformance[];
  totalGrupos: number;
  error:       string | null;
  lastUpdated: Date | null;
  fromCache:   boolean;
}

export interface CockpitFiltros {
  busca:     string;
  tipoFunil: TipoFunil | "todos";
  status:    StatusCor | "todos";
}

export interface CockpitAuth {
  token:   string | null;
  cliente: string | null;
}
