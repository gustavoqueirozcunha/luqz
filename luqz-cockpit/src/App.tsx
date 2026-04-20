import { useState, useMemo } from "react";
import { readAuthFromUrl, isAuthenticated } from "@/lib/auth";
import { usePerformance } from "@/hooks/usePerformance";
import type { ClientePerformance } from "@/types/cockpit";
import { TopBar } from "@/components/TopBar";
import { Dashboard } from "@/app/pages/Dashboard";
import { Clientes } from "@/app/pages/Clientes";
import { Alertas } from "@/app/pages/Alertas";
import { DetalheCliente } from "@/app/pages/DetalheCliente";
import { Unauthenticated } from "@/app/pages/Unauthenticated";

type Tab = "dashboard" | "clientes" | "alertas";

const NAV_BASE: React.CSSProperties = {
  padding: "6px 14px",
  fontSize: 12,
  fontWeight: 500,
  borderRadius: 6,
  cursor: "pointer",
  border: "none",
  background: "transparent",
  color: "#666",
};

const NAV_ACTIVE: React.CSSProperties = {
  ...NAV_BASE,
  background: "#1e1e2e",
  color: "#e0e0e0",
};

export function App() {
  const auth = useMemo(() => readAuthFromUrl(), []);
  const authenticated = isAuthenticated(auth);

  const { data, totalGrupos, loadState, error, lastUpdated, fromCache, refresh } =
    usePerformance(authenticated ? auth : undefined);

  const [tab, setTab]         = useState<Tab>("dashboard");
  const [detalhe, setDetalhe] = useState<ClientePerformance | null>(null);

  const loading = loadState === "loading" || loadState === "idle";
  const alertas = data.filter((d) => d.status !== "verde");

  if (!authenticated) {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#101018" }}>
        <TopBar lastUpdated={null} fromCache={false} loading={false} onRefresh={() => {}} />
        <Unauthenticated />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#101018", color: "#e0e0e0" }}>
      <TopBar
        lastUpdated={lastUpdated}
        fromCache={fromCache}
        loading={loading}
        onRefresh={refresh}
        clienteLabel={auth.cliente ?? undefined}
      />

      {!detalhe && (
        <nav style={{ display: "flex", alignItems: "center", gap: 4, padding: "8px 20px", borderBottom: "1px solid #2a2a3e", flexShrink: 0 }}>
          {(["dashboard", "clientes", "alertas"] as Tab[]).map((t) => (
            <button key={t} onClick={() => setTab(t)} style={tab === t ? NAV_ACTIVE : NAV_BASE}>
              {t === "dashboard" && "Dashboard"}
              {t === "clientes"  && `Clientes${totalGrupos ? ` (${totalGrupos})` : ""}`}
              {t === "alertas"   && (
                <>
                  Alertas
                  {alertas.length > 0 && (
                    <span style={{ marginLeft: 5, fontSize: 10, fontWeight: 700, padding: "0 5px", borderRadius: 99, background: "rgba(240,75,75,.2)", color: "#f04b4b" }}>
                      {alertas.length}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>
      )}

      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {detalhe ? (
          <div style={{ flex: 1, overflowY: "auto" }}>
            <DetalheCliente cliente={detalhe} onBack={() => setDetalhe(null)} />
          </div>
        ) : tab === "dashboard" ? (
          <div style={{ flex: 1, overflowY: "auto" }}>
            <Dashboard data={data} loading={loading} error={error} onRetry={refresh} onSelect={setDetalhe} />
          </div>
        ) : tab === "clientes" ? (
          <Clientes data={data} loading={loading} error={error} onRetry={refresh} onSelect={setDetalhe} />
        ) : (
          <div style={{ flex: 1, overflowY: "auto" }}>
            <Alertas data={data} loading={loading} error={error} onRetry={refresh} onSelect={setDetalhe} />
          </div>
        )}
      </div>
    </div>
  );
}
