import { useState } from "react";
import { usePerformance } from "@/hooks/usePerformance";
import type { ClientePerformance } from "@/types/cockpit";
import { TopBar } from "./components/TopBar";
import { Dashboard } from "./views/Dashboard";
import { Clientes } from "./views/Clientes";
import { Alertas } from "./views/Alertas";
import { DetalheCliente } from "./views/DetalheCliente";

type Tab = "dashboard" | "clientes" | "alertas";

const NAV_ITEM: React.CSSProperties = {
  padding: "6px 14px",
  fontSize: 12,
  fontWeight: 500,
  borderRadius: 6,
  cursor: "pointer",
  border: "none",
  background: "transparent",
  color: "#666",
  transition: "color .15s, background .15s",
};

const NAV_ACTIVE: React.CSSProperties = {
  ...NAV_ITEM,
  background: "#1e1e2e",
  color: "#e0e0e0",
};

export function CockpitApp() {
  const { data, totalGrupos, loadState, error, lastUpdated, fromCache, refresh } =
    usePerformance();

  const [tab, setTab]                     = useState<Tab>("dashboard");
  const [detalhe, setDetalhe]             = useState<ClientePerformance | null>(null);

  const loading  = loadState === "loading" || loadState === "idle";
  const alertas  = data.filter((d) => d.status !== "verde");

  function handleSelect(c: ClientePerformance) {
    setDetalhe(c);
  }

  function handleBack() {
    setDetalhe(null);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        background: "#101018",
        color: "#e0e0e0",
        fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
        fontSize: 13,
      }}
    >
      {/* Top bar */}
      <TopBar
        lastUpdated={lastUpdated}
        fromCache={fromCache}
        loading={loading}
        onRefresh={refresh}
      />

      {/* Nav */}
      {!detalhe && (
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "8px 20px",
            borderBottom: "1px solid #2a2a3e",
            flexShrink: 0,
          }}
        >
          {(["dashboard", "clientes", "alertas"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={tab === t ? NAV_ACTIVE : NAV_ITEM}
            >
              {t === "dashboard" && "Dashboard"}
              {t === "clientes"  && `Clientes ${totalGrupos ? `(${totalGrupos})` : ""}`}
              {t === "alertas"   && (
                <>
                  Alertas
                  {alertas.length > 0 && (
                    <span
                      style={{
                        marginLeft: 5,
                        fontSize: 10,
                        fontWeight: 700,
                        padding: "0 5px",
                        borderRadius: 99,
                        background: "rgba(240,75,75,.2)",
                        color: "#f04b4b",
                      }}
                    >
                      {alertas.length}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>
      )}

      {/* Content */}
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {detalhe ? (
          <div style={{ flex: 1, overflowY: "auto" }}>
            <DetalheCliente cliente={detalhe} onBack={handleBack} />
          </div>
        ) : tab === "dashboard" ? (
          <div style={{ flex: 1, overflowY: "auto" }}>
            <Dashboard
              data={data}
              loading={loading}
              error={error}
              onRetry={refresh}
              onSelect={handleSelect}
            />
          </div>
        ) : tab === "clientes" ? (
          <Clientes
            data={data}
            loading={loading}
            error={error}
            onRetry={refresh}
            onSelect={handleSelect}
          />
        ) : (
          <div style={{ flex: 1, overflowY: "auto" }}>
            <Alertas
              data={data}
              loading={loading}
              error={error}
              onRetry={refresh}
              onSelect={handleSelect}
            />
          </div>
        )}
      </div>
    </div>
  );
}
