import { useMemo } from "react";
import type { ClientePerformance } from "@/types/cockpit";
import { StatusPill } from "@/components/StatusPill";
import { SkeletonCard } from "@/components/Skeleton";
import { EmptyState, ErrorState } from "@/components/EmptyState";
import { calculateKPIStatus } from "@/services/performanceService";

interface Props {
  data:     ClientePerformance[];
  loading:  boolean;
  error:    string | null;
  onRetry:  () => void;
  onSelect: (c: ClientePerformance) => void;
}

const FUNIS: { kpi: string; rotulo: string }[] = [
  { kpi: "CPL", rotulo: "Leads"      },
  { kpi: "CPS", rotulo: "Seguidores" },
  { kpi: "CAC", rotulo: "Vendas"     },
  { kpi: "CPV", rotulo: "Visualizações" },
];

const TIPO_LABEL: Record<string, string> = {
  captacao:    "Captação",
  crescimento: "Crescimento",
  vendas:      "Vendas",
  engajamento: "Engajamento",
};


function KpiCard({ label, value, accent }: { label: string; value: string | number; accent?: string }) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 140,
        padding: "16px 20px",
        border: "1px solid #2a2a3e",
        borderRadius: 10,
        background: "#16162a",
      }}
    >
      <p style={{ fontSize: 11, color: "#666", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>
        {label}
      </p>
      <p style={{ fontSize: 22, fontWeight: 700, color: accent ?? "#e0e0e0" }}>{value}</p>
    </div>
  );
}

export function Dashboard({ data, loading, error, onRetry, onSelect }: Props) {
  const stats = useMemo(() => {
    const criticos  = data.filter((d) => d.status === "critico").length;
    const atencao   = data.filter((d) => d.status === "atencao").length;
    const saudaveis = data.filter((d) => d.status === "saudavel").length;

    const grupos: Record<string, { resultados: number; investimento: number; count: number }> = {
      CPL: { resultados: 0, investimento: 0, count: 0 },
      CPS: { resultados: 0, investimento: 0, count: 0 },
      CAC: { resultados: 0, investimento: 0, count: 0 },
      CPV: { resultados: 0, investimento: 0, count: 0 },
    };

    for (const d of data) {
      const kpi = d.kpis.principal.nome;
      if (!(kpi in grupos)) continue;
      grupos[kpi].resultados   += d.resultados ?? 0;
      grupos[kpi].investimento += d.investimento ?? 0;
      grupos[kpi].count++;
    }

    return { criticos, atencao, saudaveis, grupos };
  }, [data]);

  const ranking = useMemo(
    () =>
      [...data].sort((a, b) => {
        const o = { critico: 0, atencao: 1, saudavel: 2 } as const;
        return o[a.status] - o[b.status];
      }),
    [data]
  );

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
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <KpiCard label="Clientes Críticos" value={stats.criticos}  accent="#f04b4b" />
        <KpiCard label="Em Atenção"        value={stats.atencao}   accent="#f5a623" />
        <KpiCard label="Saudáveis"         value={stats.saudaveis} accent="#00c37a" />
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {FUNIS.map(({ kpi, rotulo }) => {
          const g = stats.grupos[kpi];
          if (g.count === 0) return null;
          const custoMedio = g.resultados > 0 ? g.investimento / g.resultados : null;
          return (
            <div
              key={kpi}
              style={{
                flex: 1,
                minWidth: 200,
                padding: "16px 20px",
                border: "1px solid #2a2a3e",
                borderRadius: 10,
                background: "#16162a",
              }}
            >
              <p style={{ fontSize: 11, color: "#666", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>
                {rotulo} · {kpi}
              </p>
              <p style={{ fontSize: 22, fontWeight: 700, color: "#e0e0e0" }}>
                {custoMedio !== null
                  ? `R$ ${custoMedio.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                  : "—"}
              </p>
              <p style={{ fontSize: 11, color: "#777", marginTop: 6 }}>
                {g.resultados.toLocaleString("pt-BR")} {rotulo.toLowerCase()} ·{"向"}
                R$ {g.investimento.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          );
        })}
      </div>

      <div>
        <p style={{ fontSize: 11, color: "#555570", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>
          Ranking por criticidade — {ranking.length} clientes
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
          {ranking.map((c) => (
            <button
              key={`${c.cliente}-${c.funil}`}
              onClick={() => onSelect(c)}
              style={{
                textAlign: "left",
                padding: "14px 16px",
                border: "1px solid #2a2a3e",
                borderRadius: 10,
                background: "#16162a",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = "#444460")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = "#2a2a3e")}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#e0e0e0" }}>{c.cliente}</p>
                  <p style={{ fontSize: 11, color: "#666", marginTop: 2 }}>
                    {c.funil} {c.tipoFunil ? `· ${TIPO_LABEL[c.tipoFunil] ?? c.tipoFunil}` : ""}
                  </p>
                </div>
                <StatusPill status={c.status} />
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                <div>
                  {(() => {
                    const { status, label } = calculateKPIStatus({
                      value: c.kpis.principal.valorAtual ?? 0,
                      target: c.kpis.principal.meta ?? 0,
                      direction: "lower_is_better",
                    });
                    const statusColor =
                      status === "good" ? "#00c37a" :
                      status === "warning" ? "#f5a623" :
                      status === "critical" ? "#f04b4b" : "#666";
                    return (
                      <>
                        <p style={{ fontSize: 10, color: "#555570" }}>{c.kpis.principal.nome} atual</p>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                          <p style={{ fontSize: 15, fontWeight: 700, color: "#ccc" }}>
                            R$ {(c.kpis.principal.valorAtual ?? 0).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </p>
                          {status !== "no_target" && (
                            <span style={{ fontSize: 10, fontWeight: 600, color: statusColor }}>
                              {label}
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: 10, color: "#444460", marginTop: 2 }}>
                          Meta: R$ {(c.kpis.principal.meta ?? 0).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                      </>
                    );
                  })()}
                </div>
                <div>
                  <p style={{ fontSize: 10, color: "#555570" }}>
                    {FUNIS.find(f => f.kpi === c.kpis.principal.nome)?.rotulo || "Resultados"}
                  </p>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#ccc" }}>{c.resultados ?? 0}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
