import type { ClientePerformance, NomeKpi } from "@/types/cockpit";
import { StatusPill } from "../components/StatusPill";

interface Props {
  cliente: ClientePerformance;
  onBack:  () => void;
}

function MetricBlock({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div
      style={{
        padding: "16px 20px",
        border: "1px solid #2a2a3e",
        borderRadius: 10,
        background: "#16162a",
      }}
    >
      <p style={{ fontSize: 10, color: "#555570", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>
        {label}
      </p>
      <p style={{ fontSize: 20, fontWeight: 700, color: accent ?? "#e0e0e0" }}>{value}</p>
    </div>
  );
}

const RESULTADO_LABEL: Record<NomeKpi, string> = {
  CPL: "Leads gerados",
  CPS: "Seguidores gerados",
  CAC: "Vendas realizadas",
};

const TIPO_LABEL: Record<string, string> = {
  topo:         "Topo de Funil",
  captacao:     "Captação",
  consideracao: "Consideração",
  venda:        "Venda",
};

export function DetalheCliente({ cliente: c, onBack }: Props) {
  const statusColor = { verde: "#00c37a", amarelo: "#f5a623", vermelho: "#f04b4b" }[c.status];

  return (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24, overflowY: "auto" }}>
      {/* Back */}
      <button
        onClick={onBack}
        style={{
          alignSelf: "flex-start",
          background: "none",
          border: "none",
          color: "#555570",
          fontSize: 12,
          cursor: "pointer",
          padding: 0,
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        ← Voltar
      </button>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#e0e0e0", marginBottom: 4 }}>{c.cliente}</h2>
          <p style={{ fontSize: 13, color: "#666" }}>
            {c.funil} · {TIPO_LABEL[c.tipoFunil] ?? c.tipoFunil}
          </p>
        </div>
        <StatusPill status={c.status} />
      </div>

      {/* KPI destaque */}
      <div
        style={{
          padding: "20px 24px",
          borderRadius: 12,
          border: `1px solid ${statusColor}33`,
          background: `${statusColor}08`,
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}
      >
        <div>
          <p style={{ fontSize: 11, color: "#555570", textTransform: "uppercase", letterSpacing: 0.5 }}>
            {c.nomeKpi} atual
          </p>
          <p style={{ fontSize: 32, fontWeight: 800, color: statusColor }}>
            R$ {c.kpi.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div style={{ width: 1, height: 40, background: "#2a2a3e" }} />
        <p style={{ fontSize: 12, color: "#666", maxWidth: 240, lineHeight: 1.6 }}>
          {c.status === "vermelho" &&
            `${c.nomeKpi} acima da meta. Requer ação imediata para reduzir o custo de ${c.nomeKpi === "CPL" ? "lead" : "aquisição"}.`}
          {c.status === "amarelo" &&
            `${c.nomeKpi} próximo do limite aceitável. Monitorar de perto nas próximas campanhas.`}
          {c.status === "verde" &&
            `${c.nomeKpi} dentro da meta. Campanha operando com eficiência.`}
        </p>
      </div>

      {/* Métricas */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10 }}>
        <MetricBlock
          label={RESULTADO_LABEL[c.nomeKpi] ?? "Resultados"}
          value={c.resultados.toLocaleString("pt-BR")}
        />
        <MetricBlock
          label="Investimento"
          value={`R$ ${c.investimento.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
        />
        <MetricBlock
          label="CPL"
          value={`R$ ${c.cpl.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
        />
        <MetricBlock
          label={c.nomeKpi}
          value={`R$ ${c.kpi.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
          accent={statusColor}
        />
      </div>

      {/* Classificação */}
      <div style={{ padding: "14px 18px", border: "1px solid #2a2a3e", borderRadius: 10, background: "#16162a" }}>
        <p style={{ fontSize: 11, color: "#555570", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>
          Classificação
        </p>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: 10, color: "#444" }}>Tipo de funil</p>
            <p style={{ fontSize: 13, color: "#ccc", textTransform: "capitalize", marginTop: 2 }}>
              {TIPO_LABEL[c.tipoFunil] ?? c.tipoFunil}
            </p>
          </div>
          <div>
            <p style={{ fontSize: 10, color: "#444" }}>Funil</p>
            <p style={{ fontSize: 13, color: "#ccc", marginTop: 2 }}>{c.funil}</p>
          </div>
          <div>
            <p style={{ fontSize: 10, color: "#444" }}>Métrica principal</p>
            <p style={{ fontSize: 13, color: "#ccc", marginTop: 2 }}>{c.nomeKpi}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
