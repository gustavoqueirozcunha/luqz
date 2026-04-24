import type { StatusInteligencia } from "@/types/cockpit";

const MAP: Record<StatusInteligencia, { label: string; color: string; bg: string }> = {
  saudavel: { label: "Saudável", color: "#00c37a", bg: "rgba(0,195,122,.12)" },
  atencao:  { label: "Atenção",  color: "#f5a623", bg: "rgba(245,166,35,.12)" },
  critico:  { label: "Crítico",  color: "#f04b4b", bg: "rgba(240,75,75,.12)" },
};

const FALLBACK = { label: "—", color: "#888", bg: "rgba(136,136,136,.12)" };

export function StatusPill({ status }: { status: string }) {
  const { label, color, bg } = MAP[status as StatusInteligencia] ?? FALLBACK;
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
