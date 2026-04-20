import { useMemo } from "react";
import type { ClientePerformance } from "@/types/cockpit";
import { StatusPill } from "@/components/StatusPill";
import { SkeletonCard } from "@/components/Skeleton";
import { EmptyState, ErrorState } from "@/components/EmptyState";

interface Props {
  data:     ClientePerformance[];
  loading:  boolean;
  error:    string | null;
  onRetry:  () => void;
  onSelect: (c: ClientePerformance) => void;
}

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
  const stats = useMemo(() => ({
    criticos:  data.filter((d) => d.status === "vermelho").length,
    atencao:   data.filter((d) => d.status === "amarelo").length,
    saudaveis: data.filter((d) => d.status === "verde").length,
    totalLeads: data.reduce((s, d) => s + (d.resultados ?? 0), 0),
    totalInv:   data.reduce((s, d) => s + d.investimento, 0),
  }), [data]);

  const ranking = useMemo(
    () =>
      [...data].sort((a, b) => {
        const o = { vermelho: 0, amarelo: 1, verde: 2 } as const;
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
        <KpiCard label="Clientes Críticos"   value={stats.criticos}  accent="#f04b4b" />
        <KpiCard label="Em Atenção"           value={stats.atencao}   accent="#f5a623" />
        <KpiCard label="Saudáveis"            value={stats.saudaveis} accent="#00c37a" />
        <KpiCard label="Total de Leads"       value={stats.totalLeads.toLocaleString("pt-BR")} />
        <KpiCard
          label="Investimento Total"
          value={`R$ ${stats.totalInv.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
        />
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
                  <p style={{ fontSize: 11, color: "#666", marginTop: 2 }}>{c.funil}</p>
                </div>
                <StatusPill status={c.status} />
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                <div>
                  <p style={{ fontSize: 10, color: "#555570" }}>{c.nomeKpi}</p>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#ccc" }}>
                    R$ {(c.kpi ?? 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: 10, color: "#555570" }}>Leads</p>
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
