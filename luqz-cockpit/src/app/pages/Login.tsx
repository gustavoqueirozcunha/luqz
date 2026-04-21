import { useState } from "react";

interface Props {
  onLogin: (email: string, password: string) => Promise<void>;
  loading: boolean;
  error:   string | null;
}

export function Login({ onLogin, loading, error }: Props) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) return;
    await onLogin(email, password);
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        background: "#101018",
        fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          width: 340,
          padding: 32,
          borderRadius: 14,
          border: "1px solid #2a2a3e",
          background: "#16162a",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <span
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#e0e0e0",
              letterSpacing: 1,
            }}
          >
            LUQZ
          </span>
          <p
            style={{
              fontSize: 12,
              color: "#555570",
              marginTop: 4,
            }}
          >
            Cockpit de Performance
          </p>
        </div>

        {/* Email */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label
            htmlFor="login-email"
            style={{
              fontSize: 11,
              color: "#555570",
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            Email
          </label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            autoFocus
            required
            style={{
              padding: "10px 14px",
              borderRadius: 8,
              border: "1px solid #2a2a3e",
              background: "#101018",
              color: "#e0e0e0",
              fontSize: 14,
              outline: "none",
            }}
          />
        </div>

        {/* Senha */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label
            htmlFor="login-password"
            style={{
              fontSize: 11,
              color: "#555570",
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            Senha
          </label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            style={{
              padding: "10px 14px",
              borderRadius: 8,
              border: "1px solid #2a2a3e",
              background: "#101018",
              color: "#e0e0e0",
              fontSize: 14,
              outline: "none",
            }}
          />
        </div>

        {/* Erro */}
        {error && (
          <p
            style={{
              fontSize: 12,
              color: "#f04b4b",
              padding: "8px 12px",
              borderRadius: 6,
              background: "rgba(240,75,75,.08)",
              border: "1px solid rgba(240,75,75,.2)",
              margin: 0,
            }}
          >
            {error}
          </p>
        )}

        {/* Botão */}
        <button
          type="submit"
          disabled={loading || !email || !password}
          style={{
            padding: "11px 0",
            borderRadius: 8,
            border: "none",
            background: loading ? "#2a2a3e" : "#3a3a6e",
            color: loading ? "#666" : "#e0e0e0",
            fontSize: 13,
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background .15s",
            marginTop: 4,
          }}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
