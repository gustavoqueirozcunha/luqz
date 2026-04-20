import { useState } from "react";
import { useSquadSocket } from "@/hooks/useSquadSocket";
import { SquadSelector } from "@/components/SquadSelector";
import { PhaserGame } from "@/office/PhaserGame";
import { StatusBar } from "@/components/StatusBar";
import { CockpitApp } from "@/cockpit/CockpitApp";

export function App() {
  useSquadSocket();
  const [view, setView] = useState<"squad" | "cockpit">("squad");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          height: 40,
          minHeight: 40,
          borderBottom: "1px solid var(--border)",
          background: "var(--bg-sidebar)",
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: 0.5,
          flexShrink: 0,
        }}
      >
        <span>opensquad Dashboard</span>
        <div style={{ display: "flex", gap: 4 }}>
          {(["squad", "cockpit"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                padding: "3px 10px",
                borderRadius: 5,
                border: "1px solid",
                borderColor: view === v ? "#3a3a5e" : "transparent",
                background: view === v ? "#1e1e2e" : "transparent",
                color: view === v ? "#e0e0e0" : "#666",
                fontSize: 11,
                cursor: "pointer",
              }}
            >
              {v === "squad" ? "Squad" : "Cockpit"}
            </button>
          ))}
        </div>
      </header>

      {/* Main content */}
      {view === "cockpit" ? (
        <CockpitApp />
      ) : (
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          <SquadSelector />
          <PhaserGame />
        </div>
      )}

      {/* Footer */}
      {view === "squad" && <StatusBar />}
    </div>
  );
}
