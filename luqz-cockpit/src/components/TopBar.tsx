interface Props {
  lastUpdated: Date | null;
  fromCache:   boolean;
  loading:     boolean;
  onRefresh:   () => void;
  clienteLabel?: string;
}

function fmt(d: Date) {
  return d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export function TopBar({ lastUpdated, fromCache, loading, onRefresh, clienteLabel }: Props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        height: 44,
        borderBottom: "1px solid #2a2a3e",
        background: "#141422",
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 0.3 }}>LUQZ Cockpit</span>
        {clienteLabel ? (
          <span style={{ fontSize: 11, color: "#555570" }}>· {clienteLabel}</span>
        ) : (
          <span style={{ fontSize: 11, color: "#555570", fontWeight: 400 }}>Performance 360</span>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {lastUpdated && (
          <span style={{ fontSize: 11, color: "#555570" }}>
            {fromCache ? "cache · " : ""}atualizado às {fmt(lastUpdated)}
          </span>
        )}
        <button
          onClick={onRefresh}
          disabled={loading}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "4px 12px",
            borderRadius: 6,
            border: "1px solid #2a2a3e",
            background: "transparent",
            color: loading ? "#444" : "#aaa",
            fontSize: 11,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          <span style={{ display: "inline-block", animation: loading ? "spin 1s linear infinite" : "none" }}>
            ↻
          </span>
          Atualizar
        </button>
      </div>
    </div>
  );
}
