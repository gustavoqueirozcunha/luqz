import { useState, useMemo } from "react";
import type { CSSProperties } from "react";
import type { ClientePerformance, CockpitFiltros } from "@/types/cockpit";
import { StatusPill } from "@/components/StatusPill";
import { FilterBar } from "@/components/FilterBar";
import { SkeletonTable } from "@/components/Skeleton";
import { EmptyState, ErrorState } from "@/components/EmptyState";

interface Props {
  data:     ClientePerformance[];
  loading:  boolean;
  error:    string | null;
  onRetry:  () => void;
  onSelect: (c: ClientePerformance) => void;
}

const TH: CSSProperties = {
  fontSize: 11,
  color: "#555570",
  fontWeight: 500,
  textAlign: "left",
  padding: "10px 16px",
  textTransform: "uppercase",
  letterSpacing: 0.4,
  borderBottom: "1px solid #2a2a3e",
  whiteSpace: "nowrap",
};

const TD: CSSProperties = {
  fontSize: 13,
  color: "#ccc",
  padding: "13px 16px",
  borderBottom: "1px solid #1e1e2e",
  whiteSpace: "nowrap",
};

export function Operacao({ data, loading, error, onRetry, onSelect }: Props) {
  const [filtros, setFiltros] = useState<CockpitFiltros>({
    busca: "", tipoFunil: "todos", status: "todos",
  });

  const filtered = useMemo(
    () =>
      data.filter((c) => {
        if (filtros.busca && !c.cliente.toLowerCase().includes(filtros.busca.toLowerCase())) return false;
        if (filtros.tipoFunil !== "todos" && c.tipoFunil !== filtros.tipoFunil) return false;
        if (filtros.status !== "todos" && c.status !== filtros.status) return false;
        return true;
      }),
    [data, filtros]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      <div style={{ padding: "14px 20px", borderBottom: "1px solid #2a2a3e", flexShrink: 0 }}>
        <FilterBar filtros={filtros} onChange={(p) => setFiltros((f) => ({ ...f, ...p }))} />
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {loading ? (
          <SkeletonTable rows={8} />
        ) : error ? (
          <ErrorState message={error} onRetry={onRetry} />
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ position: "sticky", top: 0, background: "#101018", zIndex: 1 }}>
              <tr>
                <th style={TH}>Projeto</th>
                <th style={TH}>Funil</th>
                <th style={TH}>Tipo</th>
                <th style={TH}>KPI</th>
                <th style={TH}>Volume</th>
                <th style={TH}>Investimento</th>
                <th style={TH}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <EmptyState message="Nenhum item de operação corresponde aos filtros." />
                  </td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr
                    key={`${c.cliente}-${c.funil}`}
                    onClick={() => onSelect(c)}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#16162a")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ ...TD, color: "#e0e0e0", fontWeight: 500 }}>{c.cliente}</td>
                    <td style={TD}>{c.funil}</td>
                    <td style={{ ...TD, textTransform: "capitalize" }}>{c.tipoFunil || ""}</td>
                    <td style={TD}>
                      <span style={{ fontSize: 11, color: "#555570", marginRight: 4 }}>{c.kpis.principal.nome}</span>
                      R$ {(c.kpis.principal.valorAtual ?? 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </td>
                    <td style={TD}>{(c.resultados ?? 0).toLocaleString("pt-BR")}</td>
                    <td style={TD}>R$ {(c.investimento ?? 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                    <td style={TD}><StatusPill status={c.status} /></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {!loading && !error && (
        <div style={{ padding: "8px 20px", borderTop: "1px solid #1e1e2e", fontSize: 11, color: "#555570", flexShrink: 0 }}>
          {filtered.length} de {data.length} funis em operação
        </div>
      )}
    </div>
  );
}
