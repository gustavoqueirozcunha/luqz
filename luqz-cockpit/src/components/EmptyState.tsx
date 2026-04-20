export function EmptyState({ message = "Nenhum dado encontrado." }: { message?: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "48px 24px",
        color: "#555570",
        textAlign: "center",
      }}
    >
      <span style={{ fontSize: 32 }}>○</span>
      <p style={{ fontSize: 13, lineHeight: 1.5, maxWidth: 280 }}>{message}</p>
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: "48px 24px",
        color: "#f04b4b",
        textAlign: "center",
      }}
    >
      <span style={{ fontSize: 28 }}>⚠</span>
      <p style={{ fontSize: 13, color: "#888", maxWidth: 300 }}>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            marginTop: 4,
            padding: "6px 16px",
            borderRadius: 6,
            border: "1px solid #2a2a3e",
            background: "transparent",
            color: "#ccc",
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}
