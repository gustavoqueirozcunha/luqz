// performance.ts — Tipos do sistema de performance LUQZ Dashboard
// Consumido pelo performancePlugin (backend) e pelo frontend (Claude Design)

// ── Status de performance ────────────────────────────────────────────────────

export type PerformanceStatus = "green" | "yellow" | "red" | "sem_dados";

// ── Ponto da série histórica ─────────────────────────────────────────────────

export interface SerieDiaria {
  data: string;        // YYYY-MM-DD
  valor: number;
}

// ── Bloco de performance (vindo do Google Sheets via GAS) ────────────────────

export interface PerformanceData {
  total: number;
  media: number;        // média diária (apenas dias preenchidos)
  dias: number;         // quantidade de dias com valor válido
  status: PerformanceStatus;
  serie: SerieDiaria[]; // histórico completo (só dias válidos)
  ultimoValor: number | null;
  ultimaData: string | null; // YYYY-MM-DD
}

// ── Bloco operacional (vindo da leitura do /clientes/) ───────────────────────

export interface OperacionalData {
  tem_contexto: boolean;
  tem_design: boolean;
  tem_projetos: boolean;
  arquivos_contexto: number;
  arquivos_design: number;
  arquivos_projetos: number;
}

// ── Tipo de alerta ───────────────────────────────────────────────────────────

export type AlertaTipo =
  | "performance_baixa"   // média < threshold red
  | "sem_dados"           // cliente sem nenhum dado na planilha
  | "sem_contexto"        // pasta contexto/ ausente
  | "sem_design"          // pasta design/ ausente
  | "sem_projetos";       // pasta projetos/ ausente

export interface Alerta {
  cliente: string;
  tipo: AlertaTipo;
  mensagem: string;
}

// ── Objeto de cliente consolidado ────────────────────────────────────────────

export interface ClienteConsolidado {
  id: string;              // slug do nome (ex: "dr-cassio-goulart")
  cliente: string;         // nome original
  gestor: string;
  performance: PerformanceData;
  operacional: OperacionalData;
  alertas: Alerta[];
}

// ── Entrada no ranking ───────────────────────────────────────────────────────

export interface RankingEntry {
  posicao: number;
  cliente: string;
  gestor: string;
  media: number;
  status: PerformanceStatus;
}

// ── Payload completo retornado por /api/performance ─────────────────────────

export interface PerformancePayload {
  meta: {
    geradoEm: string;         // ISO timestamp
    totalClientes: number;
    fontes: {
      planilha: boolean;      // GAS respondeu com sucesso?
      repositorio: boolean;   // /clientes/ lido com sucesso?
    };
  };
  clientes: ClienteConsolidado[];
  ranking: RankingEntry[];
  alertas: Alerta[];          // alertas globais (todos os clientes)
}

// ── Formato cru retornado pelo Google Apps Script ────────────────────────────

export interface GasClienteRaw {
  cliente: string;
  gestor: string;
  total: number;
  media: number;
  dias: number;
  status: PerformanceStatus;
  serie: SerieDiaria[];
  ultimoValor: number | null;
  ultimaData: string | null;
}

export interface GasPayload {
  geradoEm: string;
  clientes: GasClienteRaw[];
}
