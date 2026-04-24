import React from "react";
import type { ClientePerformance } from "@/types/cockpit";
import { StatusPill } from "@/components/StatusPill";

interface Props {
  cliente: ClientePerformance;
  onBack:  () => void;
}

export function PainelCliente({ cliente: c, onBack }: Props) {
  const statusColor = { saudavel: "#00c37a", atencao: "#f5a623", critico: "#f04b4b" }[c.status];

  const kpiLabel = c.kpis?.principal?.nome === 'CPL' ? 'Leads' : 
                   c.kpis?.principal?.nome === 'CAC' ? 'Vendas' :
                   c.kpis?.principal?.nome === 'CPS' ? 'Seguidores' :
                   c.kpis?.principal?.nome === 'CPV' ? 'Visualizações' : 'Resultados';

  return (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24, maxWidth: 800, margin: "0 auto" }}>
      <button
        onClick={onBack}
        style={{
          alignSelf: "flex-start",
          background: "none",
          border: "none",
          color: "#555570",
          fontSize: 12,
          cursor: "pointer",
          padding: 0
        }}
      >
        ← Retornar
      </button>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "#fff" }}>{c.cliente}</h2>
          <p style={{ fontSize: 14, color: "#666" }}>Performance do Funil: {c.funil}</p>
        </div>
        <StatusPill status={c.status} />
      </div>

      {/* Resumo Executivo em destaque */}
      <div style={{
        padding: "24px",
        borderRadius: 16,
        background: "#16162a",
        border: `1px solid ${statusColor}44`,
        boxShadow: `0 4px 20px ${statusColor}11`
      }}>
        <p style={{ fontSize: 11, color: "#555570", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>
          Resumo da Operação
        </p>
        <p style={{ fontSize: 18, color: "#e0e0e0", lineHeight: 1.6, fontWeight: 500 }}>
          {c.resumoExecutivo}
        </p>
      </div>

      {/* Métricas Principais */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ padding: 20, background: "#16162a", borderRadius: 12, border: "1px solid #2a2a3e" }}>
          <p style={{ fontSize: 11, color: "#555570", textTransform: "uppercase", marginBottom: 6 }}>{c.kpis?.principal?.nome} Atual</p>
          <p style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>
            R$ {(c.kpis?.principal?.valorAtual ?? 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div style={{ padding: 20, background: "#16162a", borderRadius: 12, border: "1px solid #2a2a3e" }}>
          <p style={{ fontSize: 11, color: "#555570", textTransform: "uppercase", marginBottom: 6 }}>Meta do Plano</p>
          <p style={{ fontSize: 28, fontWeight: 800, color: "#888" }}>
            R$ {(c.kpis?.principal?.meta ?? 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      <div style={{ padding: 20, background: "#16162a", borderRadius: 12, border: "1px solid #2a2a3e", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p style={{ fontSize: 11, color: "#555570", textTransform: "uppercase", marginBottom: 4 }}>{kpiLabel} Gerados</p>
          <p style={{ fontSize: 24, fontWeight: 700, color: "#e0e0e0" }}>{(c.resultados ?? 0).toLocaleString("pt-BR")}</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: 11, color: "#555570", textTransform: "uppercase", marginBottom: 4 }}>Investimento no Período</p>
          <p style={{ fontSize: 20, fontWeight: 600, color: "#ccc" }}>
            R$ {(c.investimento ?? 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>
    </div>
  );
}
