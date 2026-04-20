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

const PRIORIDADE = { vermelho: 0, amarelo: 1, verde: 2 } as const;

export function Alertas({ data, loading, error, onRetry, onSelect }: Props) {
  const alertas = useMemo(
    () =>
      [...data]
        .filter((c) => c.status !== "verde")
        .sort((a, b) => PRIORIDADE[a.status] - PRIORIDADE[b.status]),
    [data]
  );

  if (loading) {
    return (
      <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 10 }}>
        {[0, 1, 2, 3].map((i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (error) return <ErrorState message={error} onRetry={onRetry} />;

  return (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <p style={{ fontSize: 11, color: "#555570", textTransform: "uppercase", letterSpacing: 0.5 }}>
          Alertas ativos
        </p>
        {alertas.length > 0 && (
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              padding: "1px 7px",
              borderRadius: 99,
              background: "rgba(240,75,75,.15)",
              color: "#f04b4b",
            }}
          >
            {alertas.length}
          </span>
        )}
      </div>

      {alertas.length === 0 ? (
        <EmptyState message="Todos os clientes estão dentro da meta. Nenhum alerta ativo." />
      ) : (
        alertas.map((c) => (
          <button
            key={`${c.cliente}-${c.funil}`}
            onClick={() => onSelect(c)}
            style={{
              textAlign: "left",
              padding: "14px 18px",
              border: `1px solid ${c.status === "vermelho" ? "rgba(240,75,75,.25)" : "rgba(245,166,35,.2)"}`,
              borderRadius: 10,
              background: c.status === "vermelho" ? "rgba(240,75,75,.04)" : "rgba(245,166,35,.04)",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#e0e0e0" }}>{c.cliente}</p>
                <StatusPill status={c.status} />
              </div>
              <p style={{ fontSize: 11, color: "#666" }}>{c.funil} · {c.tipoFunil}</p>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <p style={{ fontSize: 10, color: "#555570" }}>{c.nomeKpi}</p>
              <p style={{ fontSize: 16, fontWeight: 700, color: c.status === "vermelho" ? "#f04b4b" : "#f5a623" }}>
                R$ {(c.kpi ?? 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
          </button>
        ))
      )}
    </div>
  );
}
