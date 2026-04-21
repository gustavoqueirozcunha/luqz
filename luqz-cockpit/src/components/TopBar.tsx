interface Props {
  lastUpdated:  Date | null;
  fromCache:    boolean;
  loading:      boolean;
  onRefresh:    () => void;
  clienteLabel?: string;
  userName?:    string;
  onLogout?:    () => void;
}

function fmt(d: Date) {
  return d.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function TopBar({
  lastUpdated,
  fromCache,
  loading,
  onRefresh,
  clienteLabel,
  userName,
  onLogout,
}: Props) {
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
      {/* Left: Sidebar Toggle + context */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button
          onClick={() => (window as any).luqz_toggleSidebar?.()}
          style={{
            background: "none",
            border: "none",
            color: "#888",
            fontSize: 18,
            cursor: "pointer",
            padding: 4,
            display: "flex",
            alignItems: "center"
          }}
        >
          ☰
        </button>
        {clienteLabel && (
          <span
            style={{
              fontSize: 12,
              color: "#e0e0e0",
              fontWeight: 600,
              padding: "2px 10px",
              borderRadius: 6,
              background: "#1e1e2e",
              border: "1px solid #2a2a3e"
            }}
          >
            {clienteLabel}
          </span>
        )}
      </div>

      {/* Right: status + user + actions */}
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
            transition: "color .15s",
          }}
        >
          <span
            style={{
              display: "inline-block",
              animation: loading ? "spin 1s linear infinite" : "none",
            }}
          >
            ↻
          </span>
          Atualizar
        </button>

        {/* User info + logout */}
        {userName && (
          <span style={{ fontSize: 11, color: "#666", marginLeft: 4 }}>
            {userName}
          </span>
        )}
        {onLogout && (
          <button
            onClick={onLogout}
            style={{
              padding: "4px 10px",
              borderRadius: 6,
              border: "1px solid #2a2a3e",
              background: "transparent",
              color: "#666",
              fontSize: 11,
              cursor: "pointer",
              transition: "color .15s",
            }}
          >
            Sair
          </button>
        )}
      </div>
    </div>
  );
}
