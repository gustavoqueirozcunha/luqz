import { useMemo } from "react";
import type { ClientePerformance, NomeKpi, StatusCor } from "@/types/cockpit";
import { StatusPill } from "../components/StatusPill";
import { SkeletonCard } from "../components/Skeleton";
import { EmptyState, ErrorState } from "../components/EmptyState";

// Converte número BRL ou JS para float seguro.
// Cobre: number, "1.200,50" (BRL), "1200.50" (EN), NaN, null, undefined.
function parseNum(v: unknown): number {
  if (typeof v === "number") return isFinite(v) ? v : 0;
  if (typeof v === "string") {
    const s = v.trim();
    // BRL: "1.200,50" → remove pontos de milhar, troca vírgula por ponto
    const normalized = s.includes(",")
      ? s.replace(/\./g, "").replace(",", ".")
      : s;
    const n = parseFloat(normalized);
    return isFinite(n) ? n : 0;
  }
  return 0;
}

// Fonte única de verdade para todos os mapeamentos de KPI
const KPI_GRUPOS: { kpi: NomeKpi; rotulo: string; labelLongo: string }[] = [
  { kpi: "CPL", rotulo: "Leads",      labelLongo: "Custo por lead"     },
  { kpi: "CPS", rotulo: "Seguidores", labelLongo: "Custo por seguidor" },
  { kpi: "CAC", rotulo: "Vendas",     labelLongo: "Custo por venda"    },
];

const KPI_ROTULO     = Object.fromEntries(KPI_GRUPOS.map(({ kpi, rotulo })     => [kpi, rotulo]))     as Record<NomeKpi, string>;
const KPI_LABEL_LONGO = Object.fromEntries(KPI_GRUPOS.map(({ kpi, labelLongo }) => [kpi, labelLongo])) as Record<NomeKpi, string>;

// Fonte única de verdade para cores de status
const STATUS_COR: Record<StatusCor, string> = {
  vermelho: "#f04b4b",
  amarelo:  "#f5a623",
  verde:    "#00c37a",
};

// Normalização de nomeKpi — usada em todos os loops de agregação
function normalizeKpi(raw: unknown): string {
  return typeof raw === "string" ? raw.trim().toUpperCase() : "";
}

interface Props {
  data:      ClientePerformance[];
  loading:   boolean;
  error:     string | null;
  onRetry:   () => void;
  onSelect:  (cliente: ClientePerformance) => void;
}

// Card de status da carteira (Críticos / Em Atenção / Saudáveis)
// Borda esquerda colorida = urgência estrutural, não só cromática no número
function StatusCard({
  label, value, total, accent,
}: { label: string; value: number; total: number; accent: string }) {
  return (
    <div style={{
      flex: 1, minWidth: 140, padding: "16px 20px",
      border: "1px solid #2a2a3e",
      borderLeft: `3px solid ${value > 0 ? accent : "#2a2a3e"}`,
      borderRadius: 10, background: "#16162a",
    }}>
      <p style={{ fontSize: 11, color: "#888", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>
        {label}
      </p>
      <p style={{ fontSize: 26, fontWeight: 700, color: accent, lineHeight: 1 }}>{value}</p>
      <p style={{ fontSize: 11, color: "#555570", marginTop: 4 }}>de {total} clientes</p>
    </div>
  );
}

// Card de resultado por canal (Leads / Seguidores / Vendas)
// Hierarquia: custo médio (decisão) > volume > investimento + saúde do grupo
function CanalCard({
  rotulo, sigla, resultados, investimento, custoMedio, count, criticos, atencao,
}: {
  rotulo: string; sigla: string; resultados: number;
  investimento: number; custoMedio: number | null;
  count: number; criticos: number; atencao: number;
}) {
  const unidade = rotulo.toLowerCase().replace(/s$/, "");
  const bordaCor = criticos > 0 ? STATUS_COR.vermelho : atencao > 0 ? STATUS_COR.amarelo : null;
  return (
    <div style={{
      flex: 1, minWidth: 200, padding: "16px 20px",
      border: "1px solid #2a2a3e",
      borderLeft: bordaCor ? `3px solid ${bordaCor}` : "1px solid #2a2a3e",
      borderRadius: 10, background: "#16162a",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <p style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 0.5 }}>{rotulo}</p>
        <span style={{
          fontSize: 10, color: "#555570", background: "#1e1e2e",
          padding: "2px 6px", borderRadius: 4, letterSpacing: 0.3,
        }}>{sigla}</span>
      </div>

      {/* Custo médio é a métrica de decisão — número principal */}
      {custoMedio !== null ? (
        <p style={{ fontSize: 26, fontWeight: 700, color: "#e0e0e0", lineHeight: 1 }}>
          R$ {custoMedio.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          <span style={{ fontSize: 12, fontWeight: 400, color: "#666", marginLeft: 4 }}>/ {unidade}</span>
        </p>
      ) : (
        <p style={{ fontSize: 16, color: "#555570", lineHeight: 1 }}>Sem dados</p>
      )}

      {/* Volume e investimento como contexto secundário */}
      <p style={{ fontSize: 12, color: "#777", marginTop: 8 }}>
        {resultados.toLocaleString("pt-BR")} {rotulo.toLowerCase()} ·{" "}
        R$ {investimento.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} investidos
      </p>

      {/* Saúde do grupo — contexto crítico para interpretar o custo médio */}
      <p style={{ fontSize: 11, color: bordaCor ?? "#555570", marginTop: 4 }}>
        {count} {count === 1 ? "cliente" : "clientes"}
        {criticos > 0 && ` · ${criticos} ${criticos === 1 ? "crítico" : "críticos"}`}
        {criticos === 0 && atencao > 0 && ` · ${atencao} em atenção`}
      </p>
    </div>
  );
}

export function Dashboard({ data, loading, error, onRetry, onSelect }: Props) {
  const stats = useMemo(() => {
    const criticos  = data.filter((d) => d.status === "vermelho").length;
    const atencao   = data.filter((d) => d.status === "amarelo").length;
    const saudaveis = data.filter((d) => d.status === "verde").length;

    // Nunca misturar CPL (leads), CPS (seguidores) e CAC (vendas)
    const grupos: Record<NomeKpi, { resultados: number; investimento: number; count: number }> = {
      CPL: { resultados: 0, investimento: 0, count: 0 },
      CPS: { resultados: 0, investimento: 0, count: 0 },
      CAC: { resultados: 0, investimento: 0, count: 0 },
    };

    const criticosPorKpi: Record<NomeKpi, number> = { CPL: 0, CPS: 0, CAC: 0 };
    const atencaoPorKpi:  Record<NomeKpi, number> = { CPL: 0, CPS: 0, CAC: 0 };

    for (const d of data) {
      const kpi = normalizeKpi(d.nomeKpi) as NomeKpi;
      if (!(kpi in grupos)) continue;

      grupos[kpi].resultados   += parseNum(d.resultados);
      grupos[kpi].investimento += parseNum(d.investimento);
      grupos[kpi].count++;

      if (d.status === "vermelho")     criticosPorKpi[kpi]++;
      else if (d.status === "amarelo") atencaoPorKpi[kpi]++;
    }

    // Custo médio por resultado em cada grupo
    const custoMedio: Record<NomeKpi, number | null> = {
      CPL: grupos.CPL.resultados > 0 ? grupos.CPL.investimento / grupos.CPL.resultados : null,
      CPS: grupos.CPS.resultados > 0 ? grupos.CPS.investimento / grupos.CPS.resultados : null,
      CAC: grupos.CAC.resultados > 0 ? grupos.CAC.investimento / grupos.CAC.resultados : null,
    };

    return { criticos, atencao, saudaveis, grupos, custoMedio, criticosPorKpi, atencaoPorKpi };
  }, [data]);

  // Ranking agrupado por tipo de KPI — impede comparação visual entre métricas incomparáveis
  // Dentro de cada grupo: piores status primeiro
  const rankingPorKpi = useMemo(() => {
    const order = { vermelho: 0, amarelo: 1, verde: 2 } as const;
    const sorted = [...data].sort((a, b) => order[a.status] - order[b.status]);
    return KPI_GRUPOS
      .map(({ kpi, rotulo }) => ({
        kpi,
        rotulo,
        clientes: sorted.filter((d) => normalizeKpi(d.nomeKpi) === kpi),
      }))
      .filter(({ clientes }) => clientes.length > 0);
  }, [data]);

  if (loading) {
    return (
      <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", gap: 12 }}>
          {[0, 1, 2, 3].map((i) => <SkeletonCard key={i} />)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 12 }}>
          {[0, 1, 2, 3, 4, 5].map((i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  if (error) return <ErrorState message={error} onRetry={onRetry} />;
  if (!data.length) return <EmptyState message="Nenhum dado de performance disponível." />;

  return (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24, overflowY: "auto" }}>
      {/* Bloco 1 — Saúde da carteira */}
      <div>
        <p style={{ fontSize: 11, color: "#6a6a8a", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.7, fontWeight: 500 }}>
          Carteira
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <StatusCard label="Críticos"   value={stats.criticos}  total={data.length} accent={STATUS_COR.vermelho} />
          <StatusCard label="Em Atenção" value={stats.atencao}   total={data.length} accent={STATUS_COR.amarelo} />
          <StatusCard label="Saudáveis"  value={stats.saudaveis} total={data.length} accent={STATUS_COR.verde} />
        </div>
      </div>

      {/* Bloco 2 — Resultados por canal (só exibe grupos com dados) */}
      <div>
        <p style={{ fontSize: 11, color: "#6a6a8a", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.7, fontWeight: 500 }}>
          Resultados por canal
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {KPI_GRUPOS.map(({ kpi, rotulo }) => {
            const g = stats.grupos[kpi];
            if (g.count === 0) return null;
            return (
              <CanalCard
                key={kpi}
                rotulo={rotulo}
                sigla={kpi}
                resultados={g.resultados}
                investimento={g.investimento}
                custoMedio={stats.custoMedio[kpi]}
                count={g.count}
                criticos={stats.criticosPorKpi[kpi]}
                atencao={stats.atencaoPorKpi[kpi]}
              />
            );
          })}
        </div>
      </div>

      {/* Ranking agrupado por tipo de KPI */}
      {rankingPorKpi.map(({ kpi, rotulo, clientes }) => (
        <div key={kpi}>
          <p style={{ fontSize: 11, color: "#6a6a8a", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.7, fontWeight: 500 }}>
            {rotulo} <span style={{ color: "#444460" }}>·</span> {KPI_LABEL_LONGO[kpi]} — {clientes.length} {clientes.length === 1 ? "cliente" : "clientes"}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
            {clientes.map((c) => (
              <button
                key={`${c.cliente}-${c.funil}`}
                onClick={() => onSelect(c)}
                style={{
                  textAlign: "left",
                  padding: "14px 16px",
                  border: "1px solid #2a2a3e",
                  borderLeft: `3px solid ${STATUS_COR[c.status]}`,
                  borderRadius: 10,
                  background: "#16162a",
                  cursor: "pointer",
                  transition: "background .15s",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background = "#1e1e30")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background = "#16162a")
                }
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#e0e0e0" }}>{c.cliente}</p>
                    <p style={{ fontSize: 11, color: "#666", marginTop: 2 }}>{c.funil}</p>
                  </div>
                  <StatusPill status={c.status} />
                </div>
                <div style={{ display: "flex", gap: 16 }}>
                  <div>
                    <p style={{ fontSize: 10, color: "#555570" }}>{KPI_LABEL_LONGO[kpi]}</p>
                    <p style={{ fontSize: 15, fontWeight: 700, color: "#ccc" }}>
                      R$ {(Number(c.kpi) || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: 10, color: "#555570" }}>{rotulo}</p>
                    <p style={{ fontSize: 15, fontWeight: 700, color: "#ccc" }}>
                      {(Number(c.resultados) || 0).toLocaleString("pt-BR")}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
