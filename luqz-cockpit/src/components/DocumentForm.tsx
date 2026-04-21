import React, { useState } from "react";
import type { ClientDocument, ClientePerformance } from "@/types/cockpit";
import { api } from "@/services/api";

interface Props {
  projects: ClientePerformance[];
  onSuccess: () => void;
  onCancel: () => void;
  editingDoc?: ClientDocument;
}

export function DocumentForm({ projects, onSuccess, onCancel, editingDoc }: Props) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<ClientDocument>>(
    editingDoc || {
      title: "",
      cliente: projects[0]?.cliente || "",
      category: "Estratégia",
      source_type: "clickup",
      external_url: "",
      description: "",
      is_published: true,
      sort_order: 0,
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingDoc) {
        await api(`/client/documents/${editingDoc.id}`, { method: "PATCH", body: formData });
      } else {
        await api("/client/documents", { method: "POST", body: formData });
      }
      onSuccess();
    } catch (err) {
      alert("Erro ao salvar documento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={FIELD_GROUP}>
          <label style={LABEL}>Projeto / Cliente</label>
          <select 
            value={formData.cliente}
            onChange={e => setFormData({...formData, cliente: e.target.value})}
            style={INPUT}
            required
          >
            {projects.map(p => <option key={p.cliente} value={p.cliente}>{p.cliente}</option>)}
          </select>
        </div>
        <div style={FIELD_GROUP}>
          <label style={LABEL}>Categoria</label>
          <select 
            value={formData.category}
            onChange={e => setFormData({...formData, category: e.target.value})}
            style={INPUT}
            required
          >
            {["Estratégia", "Planejamento", "Operação", "Criativo", "Acessos", "Torre de Controle"].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={FIELD_GROUP}>
        <label style={LABEL}>Título do Documento</label>
        <input 
          type="text" 
          value={formData.title}
          onChange={e => setFormData({...formData, title: e.target.value})}
          placeholder="Ex: Torre de Controle - Clínica Sorriso"
          style={INPUT}
          required
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={FIELD_GROUP}>
          <label style={LABEL}>Tipo de Fonte</label>
          <select 
            value={formData.source_type}
            onChange={e => setFormData({...formData, source_type: e.target.value as any})}
            style={INPUT}
            required
          >
            <option value="clickup">ClickUp</option>
            <option value="drive">Google Drive</option>
            <option value="internal_link">Link Interno</option>
            <option value="file">Arquivo / PDF</option>
          </select>
        </div>
        <div style={FIELD_GROUP}>
          <label style={LABEL}>URL Externa</label>
          <input 
            type="url" 
            value={formData.external_url}
            onChange={e => setFormData({...formData, external_url: e.target.value})}
            placeholder="https://app.clickup.com/..."
            style={INPUT}
            required
          />
        </div>
      </div>

      <div style={FIELD_GROUP}>
        <label style={LABEL}>Descrição (opcional)</label>
        <textarea 
          value={formData.description}
          onChange={e => setFormData({...formData, description: e.target.value})}
          style={{ ...INPUT, minHeight: 80, resize: "vertical" }}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <input 
          type="checkbox" 
          id="is_pub"
          checked={formData.is_published}
          onChange={e => setFormData({...formData, is_published: e.target.checked})}
        />
        <label htmlFor="is_pub" style={{ fontSize: 13, color: "#e0e0e0" }}>Publicar imediatamente (visível para o cliente)</label>
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
        <button 
          type="submit" 
          disabled={loading}
          style={{ flex: 1, padding: "10px", background: "#f04b4b", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}
        >
          {loading ? "Salvando..." : editingDoc ? "Salvar Alterações" : "Adicionar ao Catálogo"}
        </button>
        <button 
          type="button" 
          onClick={onCancel}
          style={{ flex: 0.5, padding: "10px", background: "#1e1e2e", color: "#888", border: "none", borderRadius: 8, fontWeight: 500, cursor: "pointer" }}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

const FIELD_GROUP: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 6 };
const LABEL: React.CSSProperties = { fontSize: 11, color: "#555570", textTransform: "uppercase", fontWeight: 600 };
const INPUT: React.CSSProperties = { 
  background: "#101018", 
  color: "#e0e0e0", 
  border: "1px solid #2a2a3e", 
  padding: "10px 12px", 
  borderRadius: 8, 
  fontSize: 13,
  outline: "none"
};
