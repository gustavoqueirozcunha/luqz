export function Unauthenticated() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: 16,
        color: "#555570",
        textAlign: "center",
        padding: 24,
      }}
    >
      <span style={{ fontSize: 40, opacity: 0.4 }}>⬡</span>
      <div>
        <p style={{ fontSize: 16, fontWeight: 600, color: "#e0e0e0", marginBottom: 6 }}>Acesso restrito</p>
        <p style={{ fontSize: 13, color: "#666", maxWidth: 300, lineHeight: 1.6 }}>
          Adicione seu token de acesso na URL para visualizar os dados do cockpit.
        </p>
        <p style={{ fontSize: 11, color: "#444", marginTop: 12, fontFamily: "monospace" }}>
          ?token=SEU_TOKEN
        </p>
      </div>
    </div>
  );
}
