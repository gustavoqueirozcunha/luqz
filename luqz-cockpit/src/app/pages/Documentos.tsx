import React, { useState, useEffect, useMemo } from "react";
import type { ClientDocument, ClientePerformance } from "@/types/cockpit";
import { api } from "@/services/api";
import { SkeletonTable } from "@/components/Skeleton";
import { ErrorState, EmptyState } from "@/components/EmptyState";

const CATEGORIES = [
  "Estratégia",
  "Planejamento",
  "Operação",
  "Criativo",
  "Acessos",
  "Torre de Controle",
];

const SOURCE_ICONS: Record<string, string> = {
  clickup: "🎯",
  drive: "📁",
  internal_link: "🔗",
  file: "📄",
};

interface Props {
  projects: ClientePerformance[];
}

import { DocumentForm } from "@/components/DocumentForm";

export function Documentos({ projects }: Props) {
  const [docs, setDocs] = useState<ClientDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterCliente, setFilterCliente] = useState("todos");
  const [isManaging, setIsManaging] = useState(false);

  const fetchDocs = async () => {
    setLoading(true);
    try {
      const data = await api<ClientDocument[]>("/client/documents");
      setDocs(data);
    } catch (err) {
      setError("Erro ao carregar documentos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const filtered = useMemo(() => {
    if (filterCliente === "todos") return docs;
    return docs.filter((d) => d.cliente === filterCliente);
  }, [docs, filterCliente]);

  const grouped = useMemo(() => {
    const res: Record<string, ClientDocument[]> = {};
    CATEGORIES.forEach((cat) => (res[cat] = []));
    filtered.forEach((d) => {
      if (res[d.category] !== undefined) {
        res[d.category].push(d);
      } else {
        if (!res["Operação"]) res["Operação"] = [];
        res["Operação"].push(d);
      }
    });
    return res;
  }, [filtered]);

  if (loading) return <div style={{ padding: 24 }}><SkeletonTable rows={10} /></div>;
  if (error) return <ErrorState message={error} onRetry={fetchDocs} />;

  return (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24, height: "100%", overflowY: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#fff" }}>Diretório de Documentos</h1>
          <p style={{ color: "#555570", marginTop: 4 }}>Ativos estratégicos e operacionais vinculados aos projetos.</p>
        </div>
        
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
           <button 
             onClick={() => setIsManaging(!isManaging)}
             style={{
               background: isManaging ? "#1e1e2e" : "#f04b4b",
               color: "#fff",
               border: "none",
               padding: "8px 16px",
               borderRadius: 8,
               fontSize: 12,
               fontWeight: 600,
               cursor: "pointer",
               marginRight: 12
             }}
           >
             {isManaging ? "Sair da Gestão" : "Gerenciar Catálogo"}
           </button>

           <span style={{ fontSize: 12, color: "#555570" }}>Filtrar Projeto:</span>
           <select 
             value={filterCliente} 
             onChange={(e) => setFilterCliente(e.target.value)}
             style={{
               background: "#16162a",
               color: "#e0e0e0",
               border: "1px solid #2a2a3e",
               padding: "6px 12px",
               borderRadius: 6,
               outline: "none"
             }}
           >
             <option value="todos">Todos os Projetos</option>
             {projects.map(p => (
               <option key={p.cliente} value={p.cliente}>{p.cliente}</option>
             ))}
           </select>
        </div>
      </div>

      {isManaging && (
        <div style={{ padding: 24, background: "#16162a", border: "1px solid #f04b4b44", borderRadius: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 20 }}>Novo Documento no Catálogo</h2>
          <DocumentForm 
            projects={projects} 
            onSuccess={() => { setIsManaging(false); fetchDocs(); }} 
            onCancel={() => setIsManaging(false)} 
          />
        </div>
      )}

      {docs.length === 0 ? (
        <EmptyState message="Nenhum documento catalogado nesta empresa." />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {CATEGORIES.map(cat => {
            const items = grouped[cat];
            if (items.length === 0) return null;
            return (
              <div key={cat}>
                <h3 style={{ 
                  fontSize: 12, 
                  textTransform: "uppercase", 
                  letterSpacing: 1, 
                  color: "#444460", 
                  marginBottom: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 8
                }}>
                  {cat} <span style={{ fontSize: 10, background: "#1e1e2e", padding: "2px 6px", borderRadius: 10 }}>{items.length}</span>
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
                  {items.map(doc => (
                    <div 
                      key={doc.id}
                      style={{
                        padding: 16,
                        background: "#16162a",
                        border: "1px solid #2a2a3e",
                        borderRadius: 12,
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                        transition: "border-color 0.2s",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div style={{ display: "flex", gap: 12 }}>
                          <div style={{ 
                            width: 36, 
                            height: 36, 
                            background: "#1e1e2e", 
                            borderRadius: 8, 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center",
                            fontSize: 18
                          }}>
                            {SOURCE_ICONS[doc.source_type] || "📄"}
                          </div>
                          <div>
                            <h4 style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{doc.title}</h4>
                            <p style={{ fontSize: 11, color: "#555570", marginTop: 2 }}>{doc.cliente}</p>
                          </div>
                        </div>
                      </div>
                      
                      {doc.description && (
                        <p style={{ fontSize: 13, color: "#888", lineHeight: 1.4 }}>{doc.description}</p>
                      )}

                      <a 
                        href={doc.external_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                          marginTop: 4,
                          padding: "8px 16px",
                          background: "#1e1e2e",
                          color: "#e0e0e0",
                          borderRadius: 8,
                          fontSize: 12,
                          fontWeight: 500,
                          textAlign: "center",
                          textDecoration: "none",
                          border: "1px solid #2a2a3e"
                        }}
                      >
                        Abrir Documento
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
