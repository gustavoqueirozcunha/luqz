import type { CSSProperties } from "react";

const pulse: CSSProperties = {
  background: "linear-gradient(90deg, #1e1e2e 25%, #252535 50%, #1e1e2e 75%)",
  backgroundSize: "200% 100%",
  animation: "shimmer 1.5s infinite",
  borderRadius: 6,
};

export function Skeleton({ w = "100%", h = 18 }: { w?: string | number; h?: number }) {
  return <div style={{ ...pulse, width: w, height: h }} />;
}

export function SkeletonCard() {
  return (
    <div
      style={{
        padding: "16px 20px",
        border: "1px solid #2a2a3e",
        borderRadius: 10,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <Skeleton w="55%" h={14} />
      <Skeleton w="35%" h={12} />
      <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
        <Skeleton w={64} h={22} />
        <Skeleton w={80} h={22} />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
            gap: 16,
            padding: "14px 20px",
            borderBottom: "1px solid #1e1e2e",
          }}
        >
          <Skeleton h={13} />
          <Skeleton h={13} />
          <Skeleton h={13} />
          <Skeleton h={13} />
          <Skeleton w={60} h={22} />
        </div>
      ))}
    </div>
  );
}
