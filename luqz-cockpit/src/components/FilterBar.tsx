import type { CSSProperties } from "react";
import type { CockpitFiltros, StatusInteligencia, TipoFunil } from "@/types/cockpit";

interface Props {
  filtros:  CockpitFiltros;
  onChange: (f: Partial<CockpitFiltros>) => void;
}

const SELECT: CSSProperties = {
  padding: "5px 10px",
  borderRadius: 6,
  border: "1px solid #2a2a3e",
  background: "#1a1a2e",
  color: "#ccc",
  fontSize: 12,
  cursor: "pointer",
  outline: "none",
};

const INPUT: CSSProperties = { ...SELECT, padding: "5px 12px", width: 180 };

export function FilterBar({ filtros, onChange }: Props) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
      <input
        type="text"
        placeholder="Buscar cliente..."
        value={filtros.busca}
        onChange={(e) => onChange({ busca: e.target.value })}
        style={INPUT}
      />
      <select
        value={filtros.tipoFunil}
        onChange={(e) => onChange({ tipoFunil: e.target.value as TipoFunil | "todos" })}
        style={SELECT}
      >
        <option value="todos">Todos os funis</option>
        <option value="topo">Topo</option>
        <option value="captacao">Captação</option>
        <option value="consideracao">Consideração</option>
        <option value="venda">Venda</option>
      </select>
      <select
        value={filtros.status}
        onChange={(e) => onChange({ status: e.target.value as StatusInteligencia | "todos" })}
        style={SELECT}
      >
        <option value="todos">Todos os status</option>
        <option value="saudavel">Saudável</option>
        <option value="atencao">Atenção</option>
        <option value="critico">Crítico</option>
      </select>
    </div>
  );
}
