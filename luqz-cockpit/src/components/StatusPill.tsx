import type { StatusCor } from "@/types/cockpit";

const MAP: Record<StatusCor, { label: string; color: string; bg: string }> = {
  verde:    { label: "Verde",   color: "#00c37a", bg: "rgba(0,195,122,.12)" },
  amarelo:  { label: "Atenção", color: "#f5a623", bg: "rgba(245,166,35,.12)" },
  vermelho: { label: "Crítico", color: "#f04b4b", bg: "rgba(240,75,75,.12)" },
};

export function StatusPill({ status }: { status: StatusCor }) {
  const { label, color, bg } = MAP[status];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "2px 10px",
        borderRadius: 99,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: 0.4,
        color,
        background: bg,
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0 }} />
      {label}
    </span>
  );
}
