// ── Status e KPIs ────────────────────────────────────────────────────────

export type StatusInteligencia = "saudavel" | "atencao" | "critico";
export type Tendencia = "subindo" | "caindo" | "estavel" | "indisponivel";
export type Prioridade = "alta" | "media" | "baixa";
export type TipoFunil = "captacao" | "crescimento" | "vendas" | "engajamento";

export interface KpiDetail {
  nome: string;
  valorAtual: number;
  meta: number;
  variacaoPercentual: number;
}

export interface ClientePerformance {
  cliente: string;
  funil: string;
  tipoFunil: TipoFunil | string;
  investimento: number;
  resultados: number;
  kpis?: {
    principal?: KpiDetail;
  };
  status: StatusInteligencia;
  tendencia: {
    valor: Tendencia;
    historicoDisponivel: boolean;
  };
  alertas: string[];
  causas: string[];
  diagnostico: string;
  resumoExecutivo: string;
  impactoFinanceiroEstimado: number;
  acaoImediata: boolean;
  prioridade: Prioridade;
  sugestaoAcao: string;
  _raw?: any;
}

export interface DashboardResponse {
  status:      "ok" | "error";
  totalGrupos: number;
  data:        ClientePerformance[];
  meta: {
    companyId: string;
    userId:    string;
    role:      string;
    source:    string;
    cached:    boolean;
    fetchedAt: string;
  };
}

// ── Estados da UI ────────────────────────────────────────────────────────

export type LoadState = "idle" | "loading" | "success" | "error";

export interface PerformanceState {
  loadState:   LoadState;
  data:        ClientePerformance[];
  totalGrupos: number;
  error:       string | null;
  lastUpdated: Date | null;
  fromCache:   boolean;
}

// ── Filtros ──────────────────────────────────────────────────────────────

export interface CockpitFiltros {
  busca:     string;
  tipoFunil: TipoFunil | "todos";
  status:    StatusInteligencia | "todos";
}

// ── Auth ─────────────────────────────────────────────────────────────────

export interface AuthUser {
  id:     string;
  email:  string;
  name:   string | null;
  avatar: string | null;
}

export interface AuthCompany {
  id:   string;
  name: string | null;
  slug: string | null;
  role: string;
}

export interface LoginResponse {
  token:   string;
  user:    AuthUser;
  company: AuthCompany | null;
}

export interface MeResponse {
  user:    AuthUser;
  company: AuthCompany | null;
}

export interface ClientDocument {
  id: string;
  company_id: string;
  cliente: string;
  title: string;
  category: string;
  description?: string;
  source_type: 'clickup' | 'drive' | 'internal_link' | 'file';
  external_url: string;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  token:   string | null;
  user:    AuthUser | null;
  company: AuthCompany | null;
  loading: boolean;
}
