import { useState, useEffect, useCallback } from "react";
import { isAuthenticated, login, verifySession, logout } from "@/lib/auth";
import { usePerformance } from "@/hooks/usePerformance";
import type { ClientePerformance, AuthUser, AuthCompany } from "@/types/cockpit";
import { TopBar } from "@/components/TopBar";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/app/pages/Dashboard";
import { Operacao } from "@/app/pages/Operacao";
import { Alertas } from "@/app/pages/Alertas";
import { Documentos } from "@/app/pages/Documentos";
import { DetalheCliente } from "@/app/pages/DetalheCliente";
import { Login } from "@/app/pages/Login";

type Tab = "dashboard" | "clientes" | "alertas" | "documentos";

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
  // ── Auth state ───────────────────────────────────────────────────────────
  const [authed, setAuthed]         = useState(isAuthenticated());
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError]   = useState<string | null>(null);
  const [user, setUser]             = useState<AuthUser | null>(null);
  const [company, setCompany]       = useState<AuthCompany | null>(null);

  // Verificar sessão existente ao montar
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!isAuthenticated()) {
        setAuthLoading(false);
        return;
      }
      const session = await verifySession();
      if (cancelled) return;
      if (session) {
        setUser(session.user);
        setCompany(session.company);
        setAuthed(true);
      } else {
        setAuthed(false);
      }
      setAuthLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  // Escutar evento de logout (disparado pelo api.ts em 401)
  useEffect(() => {
    function handleLogout() {
      setAuthed(false);
      setUser(null);
      setCompany(null);
    }
    window.addEventListener("luqz:logout", handleLogout);
    return () => window.removeEventListener("luqz:logout", handleLogout);
  }, []);

  // ── Login handler ────────────────────────────────────────────────────────
  const handleLogin = useCallback(async (email: string, password: string) => {
    setAuthError(null);
    setAuthLoading(true);
    try {
      const result = await login(email, password);
      setUser(result.user);
      setCompany(result.company);
      setAuthed(true);
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Erro ao entrar");
    } finally {
      setAuthLoading(false);
    }
  }, []);

  // ── Logout handler ───────────────────────────────────────────────────────
  const handleLogout = useCallback(() => {
    logout();
    setAuthed(false);
    setUser(null);
    setCompany(null);
  }, []);

  // ── Auth loading splash ──────────────────────────────────────────────────
  if (authLoading && !authed) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          background: "#101018",
          color: "#555570",
          fontSize: 13,
        }}
      >
        Verificando sessão...
      </div>
    );
  }

  // ── Login gate ───────────────────────────────────────────────────────────
  if (!authed) {
    return <Login onLogin={handleLogin} loading={authLoading} error={authError} />;
  }

  // ── Authenticated app ────────────────────────────────────────────────────
  return (
    <AuthenticatedApp
      user={user}
      company={company}
      onLogout={handleLogout}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Componente interno: app autenticado (separado para isolar usePerformance)
// ═══════════════════════════════════════════════════════════════════════════

function AuthenticatedApp({
  user,
  company,
  onLogout,
}: {
  user: AuthUser | null;
  company: AuthCompany | null;
  onLogout: () => void;
}) {
  const { data, totalGrupos, loadState, error, lastUpdated, fromCache, refresh } =
    usePerformance();

  // ── UI state ─────────────────────────────────────────────────────────────
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [tab, setTab]         = useState<Tab>("dashboard");
  const [detalhe, setDetalhe] = useState<ClientePerformance | null>(null);

  // Expor toggle para o TopBar via window (hack simples para evitar prop drilling complexo agora)
  useEffect(() => {
    (window as any).luqz_toggleSidebar = () => setSidebarCollapsed(s => !s);
    return () => { delete (window as any).luqz_toggleSidebar; };
  }, []);

  const loading = loadState === "loading" || loadState === "idle";
  const alertas = data.filter((d) => d.status !== "saudavel");

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        background: "#101018",
        color: "#e0e0e0",
        fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
        fontSize: 13,
      }}
    >
      <Sidebar 
        activeTab={tab} 
        collapsed={sidebarCollapsed} 
        onTabChange={(t) => { setTab(t); setDetalhe(null); }} 
        alertCount={alertas.length} 
      />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Top bar com info do user/company */}
        <TopBar
          lastUpdated={lastUpdated}
          fromCache={fromCache}
          loading={loading}
          onRefresh={refresh}
          clienteLabel={company?.name ?? undefined}
          userName={user?.name ?? user?.email ?? undefined}
          onLogout={onLogout}
        />

        {/* Content */}
        <div
          style={{
            flex: 1,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {detalhe ? (
            <div style={{ flex: 1, overflowY: "auto" }}>
              <DetalheCliente
                cliente={detalhe}
                onBack={() => setDetalhe(null)}
              />
            </div>
          ) : tab === "dashboard" ? (
            <div style={{ flex: 1, overflowY: "auto" }}>
              <Dashboard
                data={data}
                loading={loading}
                error={error}
                onRetry={refresh}
                onSelect={setDetalhe}
              />
            </div>
          ) : tab === "clientes" ? (
            <Operacao
              data={data}
              loading={loading}
              error={error}
              onRetry={refresh}
              onSelect={setDetalhe}
            />
          ) : tab === "documentos" ? (
            <Documentos projects={data} />
          ) : (
            <div style={{ flex: 1, overflowY: "auto" }}>
              <Alertas
                data={data}
                loading={loading}
                error={error}
                onRetry={refresh}
                onSelect={setDetalhe}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
