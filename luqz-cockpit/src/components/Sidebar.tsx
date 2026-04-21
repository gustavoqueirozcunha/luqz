import React from "react";

interface Props {
  activeTab:   string;
  collapsed:   boolean;
  onTabChange: (tab: any) => void;
  alertCount:  number;
}

const SIDEBAR_WIDTH = 220;
const COLLAPSED_WIDTH = 64;

export function Sidebar({ activeTab, collapsed, onTabChange, alertCount }: Props) {
  const width = collapsed ? COLLAPSED_WIDTH : SIDEBAR_WIDTH;

  const navItem = (id: string, label: string, icon: string) => {
    const isActive = activeTab === id;
    return (
      <button
        onClick={() => onTabChange(id)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "10px 16px",
          width: "100%",
          background: isActive ? "rgba(255,255,255,0.05)" : "transparent",
          border: "none",
          borderLeft: `3px solid ${isActive ? "#f04b4b" : "transparent"}`,
          color: isActive ? "#fff" : "#888",
          cursor: "pointer",
          fontSize: 13,
          fontWeight: isActive ? 600 : 400,
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ fontSize: 16 }}>{icon}</span>
        {!collapsed && <span>{label}</span>}
        {!collapsed && id === "alertas" && alertCount > 0 && (
          <span style={{
            marginLeft: "auto",
            fontSize: 10,
            background: "#f04b4b",
            color: "#fff",
            padding: "1px 6px",
            borderRadius: 10,
            fontWeight: 700
          }}>
            {alertCount}
          </span>
        )}
      </button>
    );
  };

  const sectionLabel = (label: string) => (
    !collapsed && (
      <p style={{
        fontSize: 10,
        color: "#444460",
        textTransform: "uppercase",
        letterSpacing: 1.5,
        padding: "20px 16px 8px 16px",
        fontWeight: 600
      }}>
        {label}
      </p>
    )
  );

  return (
    <div
      style={{
        width,
        height: "100%",
        background: "#141422",
        borderRight: "1px solid #2a2a3e",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        flexShrink: 0,
        overflowX: "hidden"
      }}
    >
      {/* Brand area */}
      <div style={{
        padding: "16px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        height: 60,
        borderBottom: "1px solid #1e1e2e",
        marginBottom: 8
      }}>
        <div style={{
          width: 32,
          height: 32,
          background: "linear-gradient(135deg, #f04b4b 0%, #8b1d1d 100%)",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontWeight: 800,
          fontSize: 18,
          flexShrink: 0
        }}>
          L
        </div>
        {!collapsed && (
          <span style={{ fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: -0.2 }}>
            LUQZ Cockpit
          </span>
        )}
      </div>

      {sectionLabel("Visão")}
      {navItem("dashboard", "Dashboard", "📊")}
      
      {sectionLabel("Operação")}
      {navItem("clientes", "Operação", "🎯")}
      {navItem("documentos", "Documentos", "📂")}
      
      {sectionLabel("Ação")}
      {navItem("alertas", "Alertas", "🔔")}

      {/* Footer / User placeholder if needed */}
      <div style={{ marginTop: "auto", padding: "16px", borderTop: "1px solid #1e1e2e" }}>
        {!collapsed && (
          <p style={{ fontSize: 10, color: "#444" }}>v1.0.0 Stable</p>
        )}
      </div>
    </div>
  );
}
