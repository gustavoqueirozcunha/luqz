import React, { useState, useEffect } from "react";
import type { ClientePerformance, ClientDocument } from "@/types/cockpit";
import { StatusPill } from "@/components/StatusPill";
import { api } from "@/services/api";

interface Props {
  cliente: ClientePerformance;
  onBack:  () => void;
}

const TIPO_LABEL: Record<string, string> = {
  captacao:    "Captação",
  crescimento: "Crescimento",
  vendas:      "Vendas",
  engajamento: "Engajamento",
};

function MetricBlock({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div style={{ padding: "16px 20px", border: "1px solid #2a2a3e", borderRadius: 10, background: "#16162a" }}>
      <p style={{ fontSize: 10, color: "#555570", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>
        {label}
      </p>
      <p style={{ fontSize: 20, fontWeight: 700, color: accent ?? "#e0e0e0" }}>{value}</p>
    </div>
  );
}

export function DetalheCliente({ cliente: c, onBack }: Props) {
  const statusColor = { saudavel: "#00c37a", atencao: "#f5a623", critico: "#f04b4b" }[c.status];

  const kpiLabel = c.kpis?.principal?.nome === 'CPL' ? 'Leads' : 
                   c.kpis?.principal?.nome === 'CAC' ? 'Vendas' :
                   c.kpis?.principal?.nome === 'CPS' ? 'Seguidores' :
                   c.kpis?.principal?.nome === 'CPV' ? 'Visualizações' : 'Resultados';

  return (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
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

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#e0e0e0", marginBottom: 4 }}>{c.cliente}</h2>
          <p style={{ fontSize: 13, color: "#666" }}>{c.funil} {c.tipoFunil ? `· ${TIPO_LABEL[c.tipoFunil] ?? c.tipoFunil}` : ""}</p>
        </div>
        <StatusPill status={c.status} />
      </div>

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
            {c.kpis?.principal?.nome} atual
          </p>
          <p style={{ fontSize: 32, fontWeight: 800, color: statusColor }}>
            R$ {(c.kpis?.principal?.valorAtual ?? 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div style={{ width: 1, height: 40, background: "#2a2a3e" }} />
        <p style={{ fontSize: 12, color: "#666", maxWidth: 280, lineHeight: 1.6 }}>
          {c.diagnostico}
          <br /><br />
          <span style={{ color: "#aaa" }}>Sugestão:</span> {c.sugestaoAcao}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10 }}>
        <MetricBlock label={`Prioridade (${c.prioridade})`} value={c.prioridade === 'baixa' ? 'Normal' : 'Atenção Requerida'} accent={c.prioridade === 'alta' ? '#f04b4b' : c.prioridade === 'media' ? '#f5a623' : '#e0e0e0'} />
        <MetricBlock label={kpiLabel}     value={(c.resultados ?? 0).toLocaleString("pt-BR")} />
        <MetricBlock label="Investimento"   value={`R$ ${(c.investimento ?? 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`} />
        <MetricBlock label={(c.kpis?.principal?.nome ?? "KPI") + " (Meta)"} value={`R$ ${(c.kpis?.principal?.meta ?? 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`} accent={statusColor} />
      </div>

      <div style={{ padding: "14px 18px", border: "1px solid #2a2a3e", borderRadius: 10, background: "#16162a" }}>
        <p style={{ fontSize: 11, color: "#555570", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>
          Classificação
        </p>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: 10, color: "#444" }}>Tipo de funil</p>
            <p style={{ fontSize: 13, color: "#ccc", textTransform: "capitalize", marginTop: 2 }}>
              {c.tipoFunil ? (TIPO_LABEL[c.tipoFunil] ?? c.tipoFunil) : "Não especificado"}
            </p>
          </div>
          <div>
            <p style={{ fontSize: 10, color: "#444" }}>Funil</p>
            <p style={{ fontSize: 13, color: "#ccc", marginTop: 2 }}>{c.funil}</p>
          </div>
          <div>
            <p style={{ fontSize: 10, color: "#444" }}>Métrica principal</p>
            <p style={{ fontSize: 13, color: "#ccc", marginTop: 2 }}>{c.kpis?.principal?.nome}</p>
          </div>
        </div>
      </div>

      {/* ── Documentos Vinculados ── */}
      <LinkedDocuments cliente={c.cliente} />

      <div style={{ height: 40 }} />
    </div>
  );
}

function LinkedDocuments({ cliente }: { cliente: string }) {
  const [docs, setDocs] = useState<ClientDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await api<ClientDocument[]>(`/client/documents?cliente=${encodeURIComponent(cliente)}`);
        setDocs(data);
      } catch (err) {
        console.error("Erro ao carregar docs vinculados", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [cliente]);

  if (loading) return null;
  if (docs.length === 0) return null;

  return (
    <div style={{ marginTop: 40, borderTop: "1px solid #2a2a3e", paddingTop: 32 }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
        📂 Documentos do Projeto
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {docs.map(doc => (
          <a 
            key={doc.id}
            href={doc.external_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: 16,
              background: "#16162a",
              border: "1px solid #2a2a3e",
              borderRadius: 12,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 12,
              transition: "border-color 0.2s"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#444460")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#2a2a3e")}
          >
            <div style={{ fontSize: 20 }}>
              {doc.source_type === 'clickup' ? '🎯' : doc.source_type === 'drive' ? '📁' : '🔗'}
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 2 }}>{doc.title}</p>
              <p style={{ fontSize: 11, color: "#555570" }}>{doc.category}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
